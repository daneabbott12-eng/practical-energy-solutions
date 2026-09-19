import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import TrustBar from "@/components/TrustBar";
import { BUSINESS, SERVICE_AREAS } from "@/lib/business";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getAllServices } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Free Electrical Quote in Oklahoma City, OK",
  description:
    "Request a free, no-obligation quote from Practical Energy Solutions — licensed, insured electricians serving the OKC metro. Or call (405) 816-7292 for fast dispatch.",
  path: "/contact",
});

export default function ContactPage() {
  const services = getAllServices();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Get a Free Quote
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Urgent problem? Call — we triage no-power, arcing, and burning-smell
            calls ahead of scheduled work. Planning a project? Send the details
            and we&apos;ll come back with a fixed price.
          </p>
          <div className="mt-8 flex justify-center">
            <CallButton
              location="contact-hero"
              label={`Call ${BUSINESS.phone.display}`}
            />
          </div>
          <p className="mt-4 text-sm text-slate-400">{BUSINESS.hoursSummary}</p>
        </div>
      </section>

      <TrustBar />

      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-slate-300 bg-white p-8 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900">
              Request a quote
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Tell us about your project and we&apos;ll get back to you with a
              free, no-obligation quote.
            </p>
            <div className="mt-6">
              <QuoteForm services={services} />
            </div>
          </div>

          {/* NAP block — must stay identical to the Google Business Profile. */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Contact
              </h2>
              <p className="mt-3 font-bold text-slate-900">
                {BUSINESS.legalName}
              </p>
              <p className="text-sm text-slate-600">{BUSINESS.trade}</p>
              <a
                href={`tel:${BUSINESS.phone.tel}`}
                data-cta="call"
                data-cta-location="contact-sidebar"
                className="mt-3 flex min-h-[44px] items-center text-lg font-bold text-slate-900 hover:text-amber-700"
              >
                {BUSINESS.phone.display}
              </a>
              <p className="mt-1 text-sm text-slate-600">
                {BUSINESS.hoursSummary}
              </p>
              {BUSINESS.email && (
                <a
                  href={`mailto:${BUSINESS.email}`}
                  data-cta="email"
                  data-cta-location="contact-sidebar"
                  className="mt-2 flex min-h-[44px] items-center text-sm font-medium text-slate-700 hover:text-amber-700"
                >
                  {BUSINESS.email}
                </a>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Areas served
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {SERVICE_AREAS.map((area) => area.name).join(" · ")}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Why PES
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {BUSINESS.trustSignals.map((signal) => (
                  <li key={signal} className="flex gap-2">
                    <span aria-hidden className="text-amber-600">
                      ✓
                    </span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
