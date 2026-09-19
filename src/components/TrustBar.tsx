import { BUSINESS } from "@/lib/business";

/**
 * Trust signals rendered as text (not images), so they are crawlable and cost
 * nothing to load. These are the four claims that move a homeowner from
 * "browsing" to "calling": licensed, code-compliant, insured, and fast.
 */
export default function TrustBar() {
  return (
    <section aria-label="Credentials" className="border-y border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm font-semibold text-slate-700">
        {BUSINESS.trustSignals.map((signal) => (
          <li key={signal} className="flex items-center gap-2">
            <span aria-hidden className="text-amber-600">
              ✓
            </span>
            {signal}
          </li>
        ))}
      </ul>
    </section>
  );
}
