import Link from "next/link";
import { BUSINESS, SERVICE_AREAS } from "@/lib/business";
import { getAllServices } from "@/lib/services";

/**
 * Footer doubles as the internal-linking hub: every service page and every
 * location page is one click from anywhere on the site, which is how crawlers
 * discover and weight them. It also repeats the NAP block — name, phone, hours,
 * areas served — which must stay identical to the Google Business Profile.
 */
export default function Footer() {
  const services = getAllServices();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-bold text-slate-900">{BUSINESS.legalName}</p>
          <p className="mt-1 text-sm text-slate-600">{BUSINESS.trade}</p>
          <a
            href={`tel:${BUSINESS.phone.tel}`}
            data-cta="call"
            data-cta-location="footer"
            className="mt-3 flex min-h-[44px] items-center text-lg font-bold text-slate-900 hover:text-amber-700"
          >
            {BUSINESS.phone.display}
          </a>
          <p className="text-sm text-slate-600">{BUSINESS.hoursSummary}</p>
          {BUSINESS.email && (
            <a
              href={`mailto:${BUSINESS.email}`}
              data-cta="email"
              data-cta-location="footer"
              className="flex min-h-[44px] items-center text-sm text-slate-600 hover:text-amber-700"
            >
              {BUSINESS.email}
            </a>
          )}
          {BUSINESS.license && (
            <p className="mt-2 text-sm text-slate-600">
              OK {BUSINESS.license.type} License #{BUSINESS.license.number}
            </p>
          )}
        </div>

        <nav aria-label="Services">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Services
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${service.slug}`}
                  className="flex min-h-[44px] items-center text-slate-600 hover:text-amber-700"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Service Areas
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="flex min-h-[44px] items-center text-slate-600 hover:text-amber-700"
                >
                  Electrician in {area.name}, OK
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Company
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link
                href="/contact"
                className="flex min-h-[44px] items-center text-slate-600 hover:text-amber-700"
              >
                Request a Free Quote
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="flex min-h-[44px] items-center text-slate-600 hover:text-amber-700"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="flex min-h-[44px] items-center text-slate-600 hover:text-amber-700"
              >
                All Services
              </Link>
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-xs text-slate-500">
            {BUSINESS.trustSignals.map((signal) => (
              <li key={signal}>✓ {signal}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-6">
        <p className="mx-auto max-w-6xl text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {BUSINESS.legalName}. All rights
          reserved. Serving Oklahoma City and the surrounding metro.
        </p>
      </div>
    </footer>
  );
}
