/**
 * Single source of truth for Practical Energy Solutions' NAP (Name, Address,
 * Phone) and other business facts used by structured data, metadata, and UI.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Local SEO depends on NAP consistency: the name, phone, and service areas
 * emitted in JSON-LD must match the Google Business Profile character for
 * character. Keeping them in one module means there is exactly one place to
 * change them, and no component can drift.
 *
 * !! VERIFY BEFORE RELYING ON THESE VALUES !!
 * Fields marked TODO(verify) were not present anywhere in the codebase. Do not
 * publish invented license numbers or hours — Google treats mismatched NAP as a
 * trust signal failure, and a wrong license number on a contractor site is a
 * regulatory liability. Leave them `null` until confirmed; the schema builders
 * omit null fields rather than emitting placeholders.
 */

export interface ServiceArea {
  /** URL slug for /service-areas/[city]. */
  slug: string;
  /** City name as it should read in copy and titles. */
  name: string;
  /** County, for schema + local relevance copy. */
  county: string;
  /** One line on what this market needs, used in landing-page copy. */
  note: string;
}

export const BUSINESS = {
  /**
   * Legal entity name. Must match the Google Business Profile exactly.
   * Sourced from the live site's own Electrician schema.
   */
  legalName: "Practical Energy Solutions LLC",
  /** Trading name used in nav, titles, and copy. */
  shortName: "Practical Energy Solutions",
  /** Owner / license holder. */
  founder: "Dane Abbott",
  /** Primary trade descriptor. */
  trade: "Licensed Electrical Contractor",

  /** Canonical production origin — no trailing slash. */
  url: "https://www.practicalenergyok.com",

  /**
   * Published business phone. Sourced from the live site at
   * practicalenergyok.com. `tel` is the E.164 form used by click-to-call links.
   */
  phone: {
    display: "(405) 816-7292",
    tel: "+14058167292",
  },

  email: "dane.abbott12@gmail.com" as string | null,

  /**
   * Service-area business: PES travels to customers rather than serving them at
   * a storefront. Google supports this — the GBP should be configured as a
   * service-area business with the address hidden. `LocalBusiness` schema
   * therefore omits `address` and relies on `areaServed`.
   *
   * TODO(verify): if there IS a public shop address customers can visit, add it
   * here and to the GBP; a hidden-address SAB and a listed address are
   * different GBP configurations and must not be mixed.
   */
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  },

  /** Geographic centre of the service radius (OKC), for `geoRadius` schema. */
  geo: {
    latitude: 35.4676,
    longitude: -97.5164,
    /** Radius in metres. ~80km covers the OKC metro comfortably. */
    radiusMeters: 80000,
  },

  /**
   * Oklahoma electrical contractor license, as published on the live site.
   * Verify against the CIB record before changing.
   */
  license: {
    type: "Electrical Contractor",
    number: "00196169",
  } as null | { type: string; number: string },

  /** Scheduled hours, matching the live site's schema. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
    { days: ["Saturday"], opens: "09:00", closes: "17:00" },
  ],

  /** Human-readable hours summary for the UI. */
  hoursSummary: "Mon–Fri 7am–5pm, Sat 9am–5pm",

  /**
   * Commercial emergency line is answered outside scheduled hours. Kept
   * separate from `hours` because `openingHoursSpecification` describes when
   * the business is normally open, not when an emergency line is staffed.
   */
  emergencyNote: "Commercial emergency calls answered 24/7",

  /** TODO(verify): confirm what PES actually accepts before publishing. */
  paymentAccepted: ["Cash", "Check", "Credit Card", "Debit Card", "Invoice"],
  currenciesAccepted: "USD",
  priceRange: "$$",

  /**
   * `sameAs` is how Google connects this site to the Google Business Profile.
   * The share.google link is the GBP short link already used on the live site.
   * TODO(verify): replace with the canonical maps.google.com/?cid=… URL if
   * available — a stable CID link is a stronger entity signal than a shortlink.
   */
  sameAs: ["https://share.google/CqsyXEmo4I8RzmMug"] as string[],

  /** Trust signals reused across headlines and CTAs. */
  trustSignals: [
    "Licensed & Insured",
    "Oklahoma CIB Licensed Contractor",
    "NEC Code Compliant",
    "Fast Dispatch Across the OKC Metro",
  ],
} as const;

/**
 * Targeted service areas — these 14 cities match the `areaServed` published in
 * the live site's schema exactly. Keep them in sync: the site, this file, and
 * the Google Business Profile service area must agree, or the inconsistency
 * costs local-pack trust.
 *
 * NOTE: Muskogee was requested during the SEO brief but is NOT in the live
 * service area (it is ~140 miles from OKC). Left out deliberately. If PES does
 * serve it, add it here AND to the GBP service area at the same time.
 */
export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "oklahoma-city",
    name: "Oklahoma City",
    county: "Oklahoma County",
    note: "From downtown high-rises to mid-century homes in the Village, OKC's housing stock spans eight decades — and so do its panels and wiring methods.",
  },
  {
    slug: "edmond",
    name: "Edmond",
    county: "Oklahoma County",
    note: "Newer construction and fast-growing additions mean heavy loads: EV chargers, shop subpanels, and whole-home lighting are the common asks.",
  },
  {
    slug: "norman",
    name: "Norman",
    county: "Cleveland County",
    note: "A large rental and student-housing market where landlord code compliance and fast troubleshooting turnarounds matter most.",
  },
  {
    slug: "moore",
    name: "Moore",
    county: "Cleveland County",
    note: "Storm-rebuilt neighborhoods with a wide mix of service sizes — panel capacity checks are the usual starting point.",
  },
  {
    slug: "yukon",
    name: "Yukon",
    county: "Canadian County",
    note: "Suburban growth with plenty of additions and detached shops needing dedicated circuits and subpanels.",
  },
  {
    slug: "mustang",
    name: "Mustang",
    county: "Canadian County",
    note: "Residential expansion and acreage properties where service upgrades and long feeder runs are routine.",
  },
  {
    slug: "midwest-city",
    name: "Midwest City",
    county: "Oklahoma County",
    note: "Established postwar housing near Tinker AFB, where aging aluminum branch wiring and undersized panels are common findings.",
  },
  {
    slug: "del-city",
    name: "Del City",
    county: "Oklahoma County",
    note: "Compact postwar homes on original 60- and 100-amp services — capacity is the limiting factor on most upgrades here.",
  },
  {
    slug: "bethany",
    name: "Bethany",
    county: "Oklahoma County",
    note: "Older near-metro housing plus small commercial along NW 39th, where remodel wiring and code-update work dominate.",
  },
  {
    slug: "warr-acres",
    name: "Warr Acres",
    county: "Oklahoma County",
    note: "Mid-century homes and light commercial, with panel replacements and lighting retrofits the most frequent calls.",
  },
  {
    slug: "the-village",
    name: "The Village",
    county: "Oklahoma County",
    note: "A dense 1950s-60s neighborhood where original panels and two-wire circuits are still in service.",
  },
  {
    slug: "nichols-hills",
    name: "Nichols Hills",
    county: "Oklahoma County",
    note: "Larger custom homes with heavy loads and high finish expectations — clean remodel work and careful lighting design.",
  },
  {
    slug: "choctaw",
    name: "Choctaw",
    county: "Oklahoma County",
    note: "Acreage properties and newer builds where outbuilding power, subpanels, and long feeder runs are routine.",
  },
  {
    slug: "el-reno",
    name: "El Reno",
    county: "Canadian County",
    note: "West-metro residential and commercial work, from service upgrades to new construction rough-ins.",
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((area) => area.slug === slug);
}

/** City names only — used for `areaServed` in structured data. */
export function serviceAreaNames(): string[] {
  return SERVICE_AREAS.map((area) => area.name);
}
