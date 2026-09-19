import { NextResponse } from 'next/server';

/**
 * Quote intake endpoint.
 *
 * !!! READ THIS BEFORE TRUSTING THIS ENDPOINT IN PRODUCTION !!!
 * ------------------------------------------------------------
 * The original implementation wrote every lead to
 * `C:\Users\danea\Desktop\PES_Operations\validated_leads`. That works on the
 * dev machine and CANNOT work on Vercel or any other serverless host: the
 * filesystem is read-only apart from /tmp, and /tmp is wiped between
 * invocations. In production that meant every submitted lead either threw
 * EROFS (visitor saw an error) or vanished. For a contractor site, a silently
 * dropped lead is the single most expensive bug on the site.
 *
 * This version:
 *   1. validates the payload,
 *   2. ALWAYS emits the lead as a single structured JSON log line, so it is
 *      recoverable from the host's runtime logs even with no other sink,
 *   3. additionally writes the local ops-folder file when running somewhere
 *      that actually has a writable disk (i.e. local dev).
 *
 * TODO(owner): logs are a safety net, not a lead pipeline. Wire a real sink —
 * an email to the business inbox (Resend/SendGrid), a database row, or a CRM
 * webhook — and alert on failures. Until then, check runtime logs daily.
 */

export const runtime = 'nodejs';
/** Never cache an intake endpoint. */
export const dynamic = 'force-dynamic';

interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  description: string;
}

function asTrimmedString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/**
 * Writes the lead to the local ops folder. No-ops on serverless hosts.
 *
 * `fs`/`path` are imported lazily inside this function so the bundler doesn't
 * statically trace filesystem access from the route module — a top-level `fs`
 * import plus a dynamic `path.join` made Turbopack trace the entire project
 * into the function bundle.
 */
async function writeToLocalOpsFolder(record: unknown): Promise<boolean> {
  // Vercel and most serverless platforms set this. Bail out rather than
  // attempting a write that will throw on a read-only filesystem.
  if (process.env.VERCEL) return false;

  const configured = process.env.PES_OPS_DIR;
  const home = process.env.USERPROFILE ?? process.env.HOME;
  if (!configured && !home) return false;

  try {
    const [{ mkdirSync, writeFileSync }, { join }] = await Promise.all([
      import('node:fs'),
      import('node:path'),
    ]);

    const dir =
      configured ??
      join(home as string, 'Desktop', 'PES_Operations', 'validated_leads');

    mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    writeFileSync(join(dir, `WEB_LEAD_${stamp}.json`), JSON.stringify(record, null, 2));
    return true;
  } catch (error) {
    console.error('[quote] local ops-folder write failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const raw = body as Partial<Record<keyof LeadPayload, unknown>>;
  const lead: LeadPayload = {
    name: asTrimmedString(raw.name, 120),
    phone: asTrimmedString(raw.phone, 40),
    email: asTrimmedString(raw.email, 200),
    projectType: asTrimmedString(raw.projectType, 120),
    description: asTrimmedString(raw.description, 5000),
  };

  if (!lead.name || !lead.description || (!lead.phone && !lead.email)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Please include your name, a way to reach you, and a description.',
      },
      { status: 400 },
    );
  }

  const record = {
    type: 'WEB_LEAD',
    source: 'Website Direct Intake',
    receivedAt: new Date().toISOString(),
    client: { name: lead.name, phone: lead.phone, email: lead.email },
    projectType: lead.projectType,
    description: lead.description,
  };

  // (2) Structured log first — this runs everywhere and is the safety net.
  console.log(JSON.stringify(record));

  // (3) Best-effort local file for the dev/ops workflow. A failure here must
  // never fail the request: the lead is already captured above.
  const persistedToDisk = await writeToLocalOpsFolder(record);

  return NextResponse.json(
    { success: true, persistedToDisk },
    { status: 200 },
  );
}
