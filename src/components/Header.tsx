import Link from "next/link";
import { getAllServices } from "@/lib/services";

export default function Header() {
  const services = getAllServices();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand">
          Practical Energy Solutions
        </Link>

        {/* Mobile-first: links wrap and stay tappable; spread out on larger screens. */}
        <ul className="hidden gap-6 text-sm font-medium text-gray-700 sm:flex">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className="transition-colors hover:text-brand"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Compact horizontal scroll nav for small screens. */}
      <div className="flex gap-4 overflow-x-auto border-t border-gray-100 px-4 py-2 text-sm sm:hidden">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="whitespace-nowrap font-medium text-gray-700"
          >
            {service.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
