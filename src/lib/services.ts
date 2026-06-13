/**
 * Single source of truth for Practical Energy Solutions service offerings.
 *
 * STRICT GATEKEEPER
 * -----------------
 * Solar and wind work are explicitly OUT OF SCOPE for PES. This module
 * enforces that at load time: every service is run through `assertInScope`,
 * which throws if a service uses a slug outside the allowlist OR if any of its
 * text references an excluded (solar/wind) term. A violation fails the build /
 * crashes the server on import rather than silently shipping out-of-scope copy.
 */

export type ServiceSlug = "troubleshooting" | "remodels" | "ev-charging";

export interface Service {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

/** The only service slugs PES is allowed to offer. */
export const ALLOWED_SLUGS: readonly ServiceSlug[] = [
  "troubleshooting",
  "remodels",
  "ev-charging",
] as const;

/**
 * Out-of-scope terms. Word-boundary matching avoids false positives such as
 * "window", "winding", or "rewind" while still catching "solar" / "wind".
 */
const EXCLUDED_PATTERNS: ReadonlyArray<{ label: string; pattern: RegExp }> = [
  { label: "solar", pattern: /\bsolar\b/i },
  { label: "photovoltaic", pattern: /\bphotovoltaics?\b/i },
  { label: "pv", pattern: /\bpv\b/i },
  { label: "wind", pattern: /\bwind\b/i },
  { label: "turbine", pattern: /\bturbines?\b/i },
];

/**
 * Throws if a service is out of scope. Returned unchanged when valid so it can
 * be used inline in a `.map`.
 */
export function assertInScope(service: Service): Service {
  if (!ALLOWED_SLUGS.includes(service.slug)) {
    throw new Error(
      `[services gatekeeper] Service slug "${service.slug}" is not on the ` +
        `allowlist ${JSON.stringify(ALLOWED_SLUGS)}.`,
    );
  }

  const haystack = [
    service.title,
    service.tagline,
    service.description,
    ...service.highlights,
  ].join(" ");

  for (const { label, pattern } of EXCLUDED_PATTERNS) {
    if (pattern.test(haystack)) {
      throw new Error(
        `[services gatekeeper] Service "${service.slug}" references ` +
          `out-of-scope term "${label}". Solar/wind content is excluded ` +
          `from Practical Energy Solutions.`,
      );
    }
  }

  return service;
}

const RAW_SERVICES: Service[] = [
  {
    slug: "troubleshooting",
    title: "Electrical Troubleshooting",
    tagline: "Find the fault. Fix it right.",
    description:
      "When a circuit trips, lights flicker, or power drops out, our " +
      "licensed electricians diagnose the root cause and restore safe, " +
      "reliable service — fast.",
    highlights: [
      "Dead-circuit and tripping-breaker diagnosis",
      "Flickering lights and intermittent faults",
      "Panel, GFCI, and wiring inspections",
      "Same-week emergency response",
    ],
  },
  {
    slug: "remodels",
    title: "Remodels & Renovations",
    tagline: "Wiring that grows with your space.",
    description:
      "Planning a kitchen, addition, or whole-home update? We design and " +
      "install the electrical infrastructure your remodel needs, to code " +
      "and on schedule.",
    highlights: [
      "Kitchen and bathroom rewiring",
      "Panel upgrades and subpanels",
      "Recessed lighting and dedicated circuits",
      "Permit-ready plans and inspections",
    ],
  },
  {
    slug: "ev-charging",
    title: "EV Charging Installation",
    tagline: "Charge at home, every night.",
    description:
      "From load calculations to a finished Level 2 charger, we install " +
      "home and commercial EV charging that's safe, permitted, and ready " +
      "for the vehicles you drive today and tomorrow.",
    highlights: [
      "Level 2 (240V) home charger installation",
      "Load calculations and panel capacity checks",
      "Dedicated EV circuits and disconnects",
      "Commercial and multi-stall charging",
    ],
  },
];

/** All in-scope services, validated at module load. */
export const SERVICES: Service[] = RAW_SERVICES.map(assertInScope);

/** Look up a single service by slug. */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/** All services, in display order. */
export function getAllServices(): Service[] {
  return SERVICES;
}
