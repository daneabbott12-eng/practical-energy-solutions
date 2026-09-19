import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { allFaqs } from "@/lib/faqs";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Electrical FAQ for Oklahoma Homeowners",
  description:
    "Straight answers on panel upgrades, rewire costs, permits, tripping breakers, EV charger installation, and licensing from a licensed OKC electrical contractor.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <section className="bg-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Electrical Questions, Answered
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            What OKC-metro homeowners and property managers ask us most — costs,
            permits, panels, and when to actually worry.
          </p>
        </div>
      </section>

      <FaqSection
        faqs={allFaqs()}
        heading="Common questions"
        intro="Pricing shown is a typical OKC-metro range. Every quote we give is specific to your property."
      />

      <CtaSection
        heading="Still have a question?"
        subheading="Call and talk to an electrician — not a call center."
        location="faq-page"
      />
    </>
  );
}
