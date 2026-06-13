import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <Link href="/" className="text-sm font-medium text-brand">
        &larr; All services
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {service.title}
      </h1>
      <p className="mt-2 text-lg font-medium text-brand">{service.tagline}</p>
      <p className="mt-4 text-base text-gray-700">{service.description}</p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">
        What&apos;s included
      </h2>
      <ul className="mt-3 space-y-2">
        {service.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-gray-700">
            <span aria-hidden className="text-brand">
              &#10003;
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-xl bg-gray-50 p-6">
        <p className="font-semibold text-gray-900">Ready to get started?</p>
        <p className="mt-1 text-sm text-gray-600">
          Contact Practical Energy Solutions for a quote on {service.title}.
        </p>
      </div>
    </div>
  );
}
