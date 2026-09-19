import JsonLd from "@/components/JsonLd";
import { faqSchema, type Faq } from "@/lib/seo";

/**
 * Visible FAQ list plus the matching `FAQPage` JSON-LD.
 *
 * Built on native <details>/<summary> rather than a JS accordion: no client
 * bundle, no hydration cost, and the answer text is in the DOM on first paint,
 * which is what Google requires for FAQ rich results. Summaries are padded to
 * clear a 44px tap target.
 */
export default function FaqSection({
  faqs,
  heading = "Frequently asked questions",
  intro,
}: {
  faqs: Faq[];
  heading?: string;
  intro?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-white px-4 py-16" aria-labelledby="faq-heading">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="text-3xl font-bold text-slate-900">
          {heading}
        </h2>
        {intro && <p className="mt-3 text-slate-600">{intro}</p>}

        <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <details className="group">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-slate-900 marker:content-none hover:text-amber-700">
                  <dt>{faq.question}</dt>
                  <span
                    aria-hidden
                    className="shrink-0 text-xl leading-none text-amber-600 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="pb-5 pr-8 leading-relaxed text-slate-700">
                  {faq.answer}
                </dd>
              </details>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
