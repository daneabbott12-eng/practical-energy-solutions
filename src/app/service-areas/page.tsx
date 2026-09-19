import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import TrustBar from "@/components/TrustBar";
import { SERVICE_AREAS } from "@/lib/business";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Electrician Service Areas Across the OKC Metro",
  description:
    "Practical Energy Solutions serves Oklahoma City, Edmond, Norman, Moore, Midwest City, Yukon, Mustang, Piedmont, and Muskogee with licensed electrical work.",
  path: "/service-areas",
});

export default function ServiceAreasIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
        ])}
      />

      <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Where We Work
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Licensed electrical service across the Oklahoma City metro and
            beyond. Pick your city to see what we handle there.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-500/60 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-slate-900">
                Electrician in {area.name}, OK
              </h2>
              <p className="mt-1 text-sm font-semibold text-amber-700">
                {area.county}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {area.note}
              </p>
              <span className="mt-4 text-sm font-bold text-slate-900 group-hover:text-amber-700">
                {area.name} electricians &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        heading="Not sure if you're in our service area?"
        subheading="Call and ask. We'll give you a straight answer rather than booking a visit we can't make."
        location="service-areas-index"
      />
    </>
  );
}
