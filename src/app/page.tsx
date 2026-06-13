import { getAllServices } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";

export default function HomePage() {
  const services = getAllServices();

  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero — mobile-first single column, centered. */}
      <section className="py-12 sm:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Power you can rely on.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
          Practical Energy Solutions is a licensed electrical contractor
          specializing in troubleshooting, remodels, and EV charging
          installation for homes and businesses.
        </p>
        <a
          href="#services"
          className="mt-6 inline-block rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Explore our services
        </a>
      </section>

      {/* Services grid — one column on mobile, three on desktop. */}
      <section id="services" className="pb-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our services
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
