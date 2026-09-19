import Link from "next/link";
import CallButton from "@/components/CallButton";
import { BUSINESS } from "@/lib/business";

/**
 * The dual-CTA block: call now (for urgent work) and request a free quote (for
 * planned work). Both intents appear on every service and location page —
 * a homeowner with no power and a GC pricing a build-out are different
 * visitors, and a single CTA loses one of them.
 */
export default function CtaSection({
  heading,
  subheading,
  location,
}: {
  heading: string;
  subheading?: string;
  /** Analytics attribution for the buttons in this block. */
  location: string;
}) {
  return (
    <section className="bg-slate-900 px-4 py-14 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>
        {subheading && (
          <p className="mx-auto mt-3 max-w-xl text-slate-300">{subheading}</p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CallButton location={location} label={`Call ${BUSINESS.phone.display}`} />
          <Link
            href="/contact"
            data-cta="quote"
            data-cta-location={location}
            className="inline-flex min-h-[44px] items-center justify-center rounded border-2 border-white/80 px-6 py-3 font-bold tracking-wide text-white transition hover:bg-white hover:text-slate-900"
          >
            Get a Free Quote
          </Link>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          {BUSINESS.hoursSummary} · Fast dispatch across the OKC metro
        </p>
      </div>
    </section>
  );
}
