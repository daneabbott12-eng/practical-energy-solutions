/**
 * Metadata and structured-data builders.
 *
 * TITLE CONVENTION
 * ----------------
 * Every indexable page renders as:
 *
 *   "[Service Name] in [City], OK | Practical Energy Solutions"
 *
 * The " | Practical Energy Solutions" suffix comes from the `title.template`
 * in the root layout, so page-level `title` values pass only the
 * "[Service Name] in [City], OK" part. Use `pageTitle()` rather than building
 * these strings by hand.
 */

import type { Metadata } from "next";
import { BUSINESS, SERVICE_AREAS, serviceAreaNames, type ServiceArea } from "./business";
import { SERVICES, type Service } from "./services";

/** Default city when a page is not city-specific. */
export const DEFAULT_CITY = "Oklahoma City";

/**
 * "[Service Name] in [City], OK" — the layout template appends the business
 * name. Returns the bare service name when no city applies.
 */
export function pageTitle(serviceName: string, city?: string): string {
  return city ? `${serviceName} in ${city}, OK` : serviceName;
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, BUSINESS.url).toString();
}

/**
 * Builds a full `Metadata` object with canonical URL and Open Graph / Twitter
 * defaults filled in. Pages should call this rather than hand-rolling metadata
 * so no page ships without a canonical or an OG card.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** Set false for pages that should not be indexed (thank-you pages, etc). */
  index?: boolean;
  /**
   * Set for `app/page.tsx` only. Next.js applies `title.template` to child
   * route segments, and the root page shares a segment with the root layout —
   * so the home page would otherwise render without the " | Practical Energy
   * Solutions" suffix. `absolute` bakes the full title in instead.
   */
  absoluteTitle?: boolean;
}): Metadata {
  const { title, description, path, index = true, absoluteTitle = false } = opts;
  const url = absoluteUrl(path);
  // The OG title needs the suffix baked in — templates don't apply to OG.
  // Titles use the trading name, not "… LLC": the legal name belongs in schema
  // (name/legalName) but costs 4 characters of a ~60-char SERP title.
  const ogTitle = `${title} | ${BUSINESS.shortName}`;

  return {
    title: absoluteTitle ? { absolute: ogTitle } : title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: BUSINESS.shortName,
      locale: "en_US",
      url,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

// --- Structured data ---------------------------------------------------------

type Json = Record<string, unknown>;

/** Stable @id so every schema block references one business entity. */
const BUSINESS_ID = `${BUSINESS.url}/#business`;

/** `openingHoursSpecification` from the configured hours. */
function openingHours(): Json[] {
  return BUSINESS.hours.map((block) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: block.days.map((day) => `https://schema.org/${day}`),
    opens: block.opens,
    closes: block.closes,
  }));
}

/**
 * Drops keys whose value is null/undefined/empty-array. This is what keeps
 * unverified fields (license, address, email) out of the emitted JSON-LD
 * instead of shipping placeholder values — see the warning in business.ts.
 */
function compact(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

/**
 * The primary LocalBusiness node. Typed as both `Electrician` and
 * `LocalBusiness` so Google can match the specific trade type while still
 * reading it as a local business.
 */
export function localBusinessSchema(): Json {
  return compact({
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: BUSINESS.legalName,
    legalName: BUSINESS.legalName,
    description: `${BUSINESS.trade} serving the Oklahoma City metro. ${BUSINESS.trustSignals.join(". ")}.`,
    url: BUSINESS.url,
    telephone: BUSINESS.phone.tel,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    paymentAccepted: [...BUSINESS.paymentAccepted].join(", "),
    currenciesAccepted: BUSINESS.currenciesAccepted,
    sameAs: [...BUSINESS.sameAs],

    // Service-area business: no street address is published. `areaServed` plus
    // `serviceArea` is the correct pairing for a business that travels to
    // customers.
    address: BUSINESS.address
      ? { "@type": "PostalAddress", ...BUSINESS.address, addressCountry: "US" }
      : null,
    areaServed: serviceAreaNames().map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Oklahoma" },
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      geoRadius: BUSINESS.geo.radiusMeters,
    },

    openingHoursSpecification: openingHours(),

    // Emitted only once a real CIB number is filled in.
    hasCredential: BUSINESS.license
      ? {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: `Oklahoma ${BUSINESS.license.type} License`,
          identifier: BUSINESS.license.number,
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "Oklahoma Construction Industries Board",
          },
        }
      : null,

    knowsAbout: SERVICES.map((service) => service.seoName),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.seoName,
          description: service.description,
          url: absoluteUrl(`/${service.slug}`),
        },
      })),
    },
  });
}

/** Per-service `Service` node, optionally scoped to one city. */
export function serviceSchema(service: Service, area?: ServiceArea): Json {
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name: area ? `${service.seoName} in ${area.name}, OK` : service.seoName,
    description: service.description,
    serviceType: service.seoName,
    provider: { "@id": BUSINESS_ID },
    areaServed: area
      ? { "@type": "City", name: area.name, containedInPlace: { "@type": "State", name: "Oklahoma" } }
      : serviceAreaNames().map((name) => ({ "@type": "City", name })),
    url: area
      ? absoluteUrl(`/service-areas/${area.slug}`)
      : absoluteUrl(`/${service.slug}`),
  });
}

export interface Faq {
  question: string;
  answer: string;
}

/** `FAQPage` node. Only emit this on pages that visibly render the same Q&A. */
export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Breadcrumb trail. `items` are ordered root-first. */
export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** WebSite node, enabling a sitelinks search box if search is ever added. */
export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.url}/#website`,
    url: BUSINESS.url,
    name: BUSINESS.legalName,
    publisher: { "@id": BUSINESS_ID },
  };
}

export { SERVICE_AREAS };
