import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-brand">{service.tagline}</p>
      <p className="mt-2 text-sm text-gray-600">{service.description}</p>
      <span className="mt-4 inline-block text-sm font-medium text-brand">
        Learn more &rarr;
      </span>
    </Link>
  );
}
