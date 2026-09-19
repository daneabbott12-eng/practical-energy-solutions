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

export type ServiceSlug =
  | "troubleshooting"
  | "remodels"
  | "ev-charging"
  | "panel-upgrades"
  | "rewiring"
  | "lighting"
  | "new-construction";

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** Short label for nav and breadcrumbs, where the full title is too long. */
  shortLabel: string;
  /**
   * The keyword-bearing noun phrase used to build page titles in the
   * "[Service Name] in [City], OK | Practical Energy Solutions" format. Keep it
   * short enough that the whole title stays under ~60 characters.
   */
  seoName: string;
  tagline: string;
  description: string;
  highlights: string[];
}

/** The only service slugs PES is allowed to offer. */
export const ALLOWED_SLUGS: readonly ServiceSlug[] = [
  "troubleshooting",
  "remodels",
  "ev-charging",
  "panel-upgrades",
  "rewiring",
  "lighting",
  "new-construction",
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
    service.shortLabel,
    service.seoName,
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
    title: "Electrical Troubleshooting & Repairs",
    shortLabel: "Troubleshooting",
    seoName: "Electrical Troubleshooting",
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
    slug: "panel-upgrades",
    title: "Electrical Panel Upgrades",
    shortLabel: "Panel Upgrades",
    seoName: "Electrical Panel Upgrades",
    tagline: "More capacity. Safer service.",
    description:
      "Upgrading from 100A to 200A service opens the door to EV charging, " +
      "electric HVAC, and shop circuits — and replaces the failure-prone " +
      "panels still in service across the OKC metro.",
    highlights: [
      "100A to 200A service upgrades",
      "Federal Pacific and Zinsco panel replacement",
      "Meter base, mast, and grounding electrode work",
      "Permit pulled and inspection coordinated for you",
    ],
  },
  {
    slug: "rewiring",
    title: "Commercial & Residential Rewiring",
    shortLabel: "Rewiring",
    seoName: "Home & Commercial Rewiring",
    tagline: "Old circuits out. Code-compliant copper in.",
    description:
      "Cloth-insulated, knob-and-tube, and aluminum branch circuits are the " +
      "hazards we replace most. We rewire occupied homes and working " +
      "businesses in stages so you keep power while the work gets done.",
    highlights: [
      "Whole-home and partial rewires",
      "Aluminum branch circuit remediation",
      "Tenant-improvement and retail build-out wiring",
      "Staged phasing to minimize downtime",
    ],
  },
  {
    slug: "lighting",
    title: "Lighting Upgrades",
    shortLabel: "Lighting",
    seoName: "Lighting Upgrades",
    tagline: "Better light. Lower bills.",
    description:
      "From recessed cans and under-cabinet runs to warehouse high-bay " +
      "retrofits, we design and install lighting that fits the space and " +
      "cuts what you spend to keep it lit.",
    highlights: [
      "Recessed, under-cabinet, and accent lighting",
      "LED retrofits for shops, offices, and warehouses",
      "Exterior, security, and landscape lighting",
      "Dimmer, sensor, and smart-switch installation",
    ],
  },
  {
    slug: "ev-charging",
    title: "EV Charger Installation",
    shortLabel: "EV Charging",
    seoName: "EV Charger Installation",
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
  {
    slug: "remodels",
    title: "Remodels & Renovations",
    shortLabel: "Remodels",
    seoName: "Remodel Electrical Work",
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
    slug: "new-construction",
    title: "New Construction Wiring",
    shortLabel: "New Construction",
    seoName: "New Construction Wiring",
    tagline: "Built right from the rough-in.",
    description:
      "Precision rough-ins, service panel builds, and conduit routing for " +
      "custom homes and commercial shells — coordinated with your general " +
      "contractor's schedule and inspected without callbacks.",
    highlights: [
      "Residential and commercial rough-in",
      "Service panel builds and temporary power",
      "Structured conduit routing to NEC standards",
      "GC schedule coordination and inspection sign-off",
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

/** Slugs only — used by `generateStaticParams` and the sitemap. */
export function allServiceSlugs(): ServiceSlug[] {
  return SERVICES.map((service) => service.slug);
}
