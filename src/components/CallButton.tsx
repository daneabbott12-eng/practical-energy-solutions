import { BUSINESS } from "@/lib/business";

/**
 * Click-to-call link. Every tap target here clears the 44x44px minimum from the
 * WCAG 2.5.5 / iOS HIG guidance — on a contractor site the phone button is the
 * single highest-value control on the page and must never be a small link.
 *
 * `data-cta` is set so call clicks can be wired to an analytics event later
 * without hunting for selectors.
 */
export default function CallButton({
  variant = "primary",
  className = "",
  label,
  location,
}: {
  variant?: "primary" | "inverse" | "compact";
  className?: string;
  /** Overrides the default "Call (405) …" text. */
  label?: string;
  /** Where on the site this button lives, for analytics attribution. */
  location: string;
}) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded font-bold tracking-wide transition active:scale-95";

  const variants = {
    primary: "bg-amber-500 px-6 py-3 text-base text-slate-950 hover:bg-amber-400",
    inverse:
      "border-2 border-white/80 px-6 py-3 text-base text-white hover:bg-white hover:text-slate-900",
    compact: "bg-amber-500 px-4 py-2 text-sm text-slate-950 hover:bg-amber-400",
  } as const;

  return (
    <a
      href={`tel:${BUSINESS.phone.tel}`}
      data-cta="call"
      data-cta-location={location}
      aria-label={`Call Practical Energy Solutions at ${BUSINESS.phone.display}`}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span aria-hidden>📞</span>
      <span>{label ?? BUSINESS.phone.display}</span>
    </a>
  );
}
