import Link from "next/link";
import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import { BUSINESS, SERVICE_AREAS } from "@/lib/business";
import { generalFaqs } from "@/lib/faqs";
import { buildMetadata } from "@/lib/seo";
import { getAllServices } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Licensed Electrician in Oklahoma City, OK",
  description:
    "Licensed, insured, code-compliant electrical contractor serving Oklahoma City, Edmond, Norman, and the OKC metro. Panel upgrades, rewiring, EV chargers, and same-week troubleshooting. Free quotes.",
  path: "/",
  // Root page shares a route segment with the root layout, so the title
  // template doesn't apply — see buildMetadata.
  absoluteTitle: true,
});

export default function HomePage() {
  // Services come from the registry in src/lib/services.ts — the home page no
  // longer keeps its own copy of the list. One source of truth means the nav,
  // footer, sitemap, and schema can never disagree with what's on this page.
  const services = getAllServices();

  return (
    <>
      {/* Hero — leads with credentials and locality, not the company name.
          "Licensed Electrician in Oklahoma City" is what people search; the
          brand name is what they read after they've decided to trust it. */}
      <section className="bg-slate-900 px-4 py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Licensed · Bonded · Insured · Oklahoma CIB Contractor
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            Licensed Electrician in Oklahoma City
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
            Code-compliant electrical work for homes and businesses across the
            OKC metro — panel upgrades, rewiring, EV chargers, lighting, and
            troubleshooting, with fast dispatch and free quotes on planned work.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CallButton
              location="hero"
              label={`Call Now: ${BUSINESS.phone.display}`}
            />
            <Link
              href="/contact"
              data-cta="quote"
              data-cta-location="hero"
              className="inline-flex min-h-[44px] items-center justify-center rounded border-2 border-white/80 px-6 py-3 font-bold tracking-wide text-white transition hover:bg-white hover:text-slate-900"
            >
              Get a Free Quote
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            {BUSINESS.hoursSummary} · Serving OKC, Edmond, Norman, Moore & the
            surrounding metro
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Services */}
      <section id="services" className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Electrical Services We Provide
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Every job is permitted where required, wired to the National
            Electrical Code, and inspected before we call it finished.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-500/60 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-amber-700">
                  {service.tagline}
                </p>
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

      {/* Service areas — internal links that give the location pages crawl
          equity from the highest-authority page on the site. */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Serving the Oklahoma City Metro
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Local crews, local drive times. Pick your city for details on what we
            do there.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="flex min-h-[44px] items-center rounded-full border border-slate-300 px-5 font-medium text-slate-700 transition hover:border-amber-500 hover:text-amber-700"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        heading="No power? Breaker tripping? Planning an upgrade?"
        subheading="Call for same-week dispatch, or send us the details and we'll come back with a free, fixed-price quote."
        location="home-mid"
      />

      <FaqSection faqs={generalFaqs()} />

      {/* Quote form */}
      <section id="quote" className="bg-slate-100 px-4 py-16">
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-slate-300 bg-white p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Request a Free Quote
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              Tell us about your project. We review every request and get back to
              you with next steps.
            </p>
            <div className="mt-6">
              <QuoteForm services={services} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
