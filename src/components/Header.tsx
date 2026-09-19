import Link from "next/link";
import CallButton from "@/components/CallButton";
import { BUSINESS } from "@/lib/business";
import { getAllServices } from "@/lib/services";

/**
 * Sticky site header with a persistent click-to-call button.
 *
 * The call button is rendered at every breakpoint — on mobile it sits beside
 * the wordmark, on desktop it anchors the right edge of the nav. It is the one
 * control that must never scroll out of reach.
 *
 * Nav links are padded to a 44px minimum tap height. The previous version used
 * unpadded 14px text links in a horizontal scroller, which were roughly 20px
 * tall and easy to miss on a phone.
 */
export default function Header() {
  const services = getAllServices();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5"
      >
        <Link
          href="/"
          className="flex min-h-[44px] items-center text-base font-bold leading-tight tracking-tight text-slate-900 sm:text-lg"
        >
          Practical Energy&nbsp;Solutions
        </Link>

        <ul className="hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex">
          <li>
            <Link
              href="/services"
              className="flex min-h-[44px] items-center rounded px-3 transition-colors hover:text-amber-700"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/service-areas"
              className="flex min-h-[44px] items-center rounded px-3 transition-colors hover:text-amber-700"
            >
              Service Areas
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="flex min-h-[44px] items-center rounded px-3 transition-colors hover:text-amber-700"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              data-cta="quote"
              data-cta-location="header"
              className="flex min-h-[44px] items-center rounded border-2 border-slate-900 px-4 font-bold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
            >
              Free Quote
            </Link>
          </li>
        </ul>

        {/* Persistent click-to-call — present at every breakpoint. */}
        <CallButton
          variant="compact"
          location="header"
          className="shrink-0"
          label={BUSINESS.phone.display}
        />
      </nav>

      {/* Service shortcuts for small screens. */}
      <div className="border-t border-slate-100 lg:hidden">
        <div className="flex gap-1 overflow-x-auto px-3 py-1 text-sm">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="flex min-h-[44px] shrink-0 items-center whitespace-nowrap px-3 font-medium text-slate-700"
            >
              {service.shortLabel}
            </Link>
          ))}
          <Link
            href="/service-areas"
            className="flex min-h-[44px] shrink-0 items-center whitespace-nowrap px-3 font-medium text-slate-700"
          >
            Service Areas
          </Link>
        </div>
      </div>
    </header>
  );
}
