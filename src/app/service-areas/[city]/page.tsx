import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CallButton from "@/components/CallButton";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import { BUSINESS, SERVICE_AREAS, getServiceArea } from "@/lib/business";
import { generalFaqs } from "@/lib/faqs";
import {
  breadcrumbSchema,
  buildMetadata,
  pageTitle,
  serviceSchema,
} from "@/lib/seo";
import { getAllServices } from "@/lib/services";

/**
 * City landing pages: /service-areas/edmond, /service-areas/norman, …
 *
 * Each page is a real page — a city-specific H1, locally relevant copy from the
 * service-area registry, city-scoped `Service` schema, and the full service
 * list linked with city context. It is NOT a template with the city name
 * swapped in, which is what Google's doorway-page guidance penalises. If you add
 * cities later, give each one a genuine `note` in src/lib/business.ts.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) return {};

  return buildMetadata({
    title: pageTitle("Licensed Electrician", area.name),
    description: `Licensed, insured electrician serving ${area.name}, Oklahoma. Panel upgrades, rewiring, EV chargers, lighting, and fast troubleshooting in ${area.county}. Free quotes.`,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) notFound();

  const services = getAllServices();
  const otherAreas = SERVICE_AREAS.filter((a) => a.slug !== area.slug);

  return (
    <>
      <JsonLd
        data={[
          ...services.map((service) => serviceSchema(service, area)),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: area.name, path: `/service-areas/${area.slug}` },
          ]),
        ]}
      />

      <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-amber-400">
              Home
            </Link>
            <span aria-hidden> / </span>
            <Link href="/service-areas" className="hover:text-amber-400">
              Service Areas
            </Link>
          </nav>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Licensed &amp; Insured · {area.county}
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Licensed Electrician in {area.name}, OK
          </h1>
          <p className="mt-4 text-lg text-slate-300">{area.note}</p>
          <p className="mt-3 text-slate-300">
            {BUSINESS.legalName} is an Oklahoma CIB-licensed electrical
            contractor serving {area.name} and the surrounding {area.county}{" "}
            area with residential and commercial electrical work — permitted,
            code-compliant, and inspected.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton
              location={`area-hero-${area.slug}`}
              label={`Call ${BUSINESS.phone.display}`}
            />
            <Link
              href="/contact"
              data-cta="quote"
              data-cta-location={`area-hero-${area.slug}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded border-2 border-white/80 px-6 py-3 font-bold tracking-wide text-white transition hover:bg-white hover:text-slate-900"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Electrical Services in {area.name}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-500/60 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {service.seoName} in {area.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <span className="mt-4 text-sm font-bold text-slate-900 group-hover:text-amber-700">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading={`Need an electrician in ${area.name}?`}
        subheading="Call for same-week dispatch, or send project details for a free quote."
        location={`area-cta-${area.slug}`}
      />

      <FaqSection faqs={generalFaqs()} />

      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-slate-900">
            Other areas we serve
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {otherAreas.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/service-areas/${other.slug}`}
                  className="flex min-h-[44px] items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
                >
                  {other.name}
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
              Free Quote in {area.name}
            </h2>
            <div className="mt-6">
              <QuoteForm services={services} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
