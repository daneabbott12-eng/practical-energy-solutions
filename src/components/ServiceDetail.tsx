import Link from "next/link";
import CallButton from "@/components/CallButton";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import { BUSINESS, SERVICE_AREAS, type ServiceArea } from "@/lib/business";
import { faqsForService } from "@/lib/faqs";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { getAllServices, type Service } from "@/lib/services";

/**
 * Shared body for a service page. Renders the same way whether the page is a
 * plain service page (/panel-upgrades) or a service scoped to a city, so
 * location landing pages reuse this rather than duplicating markup.
 */
export default function ServiceDetail({
  service,
  area,
}: {
  service: Service;
  /** When set, the copy and schema are scoped to this city. */
  area?: ServiceArea;
}) {
  const heading = area
    ? `${service.seoName} in ${area.name}, OK`
    : `${service.title} in the OKC Metro`;

  const faqs = faqsForService(service.slug);
  const otherServices = getAllServices().filter((s) => s.slug !== service.slug);

  const crumbs = area
    ? [
        { name: "Home", path: "/" },
        { name: "Service Areas", path: "/service-areas" },
        { name: area.name, path: `/service-areas/${area.slug}` },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/${service.slug}` },
      ];

  return (
    <>
      <JsonLd data={[serviceSchema(service, area), breadcrumbSchema(crumbs)]} />

      <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-amber-400">
              Home
            </Link>
            <span aria-hidden> / </span>
            <Link href="/services" className="hover:text-amber-400">
              Services
            </Link>
          </nav>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Licensed &amp; Insured · NEC Code Compliant
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {heading}
          </h1>
          <p className="mt-3 text-lg font-medium text-amber-400">
            {service.tagline}
          </p>
          <p className="mt-4 text-lg text-slate-300">{service.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton
              location={`service-hero-${service.slug}`}
              label={`Call ${BUSINESS.phone.display}`}
            />
            <Link
              href="/contact"
              data-cta="quote"
              data-cta-location={`service-hero-${service.slug}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded border-2 border-white/80 px-6 py-3 font-bold tracking-wide text-white transition hover:bg-white hover:text-slate-900"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">
            What&apos;s included
          </h2>
          <ul className="mt-5 space-y-3">
            {service.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-slate-700">
                <span aria-hidden className="font-bold text-amber-600">
                  ✓
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {area && (
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                {service.seoName} in {area.name}
              </h2>
              <p className="mt-2 text-slate-700">{area.note}</p>
              <p className="mt-3 text-sm text-slate-600">
                Serving {area.name} and the rest of {area.county}.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaSection
        heading={`Need ${service.seoName.toLowerCase()}?`}
        subheading="Call for scheduling, or send project details and we'll come back with a free, fixed-price quote."
        location={`service-cta-${service.slug}`}
      />

      <FaqSection faqs={faqs} />

      {/* Cross-links keep crawl depth shallow and give visitors the next step. */}
      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-slate-900">Other services</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${other.slug}`}
                  className="flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
                >
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-bold text-slate-900">
            Areas we serve
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SERVICE_AREAS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-14">
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-slate-300 bg-white p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Request a Free Quote
            </h2>
            <div className="mt-6">
              <QuoteForm services={getAllServices()} defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
