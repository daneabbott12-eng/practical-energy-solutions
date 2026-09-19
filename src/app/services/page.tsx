import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import TrustBar from "@/components/TrustBar";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getAllServices } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Electrical Services in Oklahoma City, OK",
  description:
    "Panel upgrades, rewiring, EV charger installation, lighting, remodels, new construction wiring, and troubleshooting — from a licensed, insured OKC electrical contractor.",
  path: "/services",
});

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Electrical Services in Oklahoma City
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Residential and commercial electrical work across the OKC metro —
            permitted, code-compliant, and inspected.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-500/60 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-slate-900">
                {service.title}
              </h2>
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
      </section>

      <CtaSection
        heading="Not sure which service you need?"
        subheading="Describe the problem and we'll tell you what it takes to fix it — no charge for the conversation."
        location="services-index"
      />
    </>
  );
}
