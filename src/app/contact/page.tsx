import type { Metadata } from "next";
import { getAllServices } from "@/lib/services";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free quote from Practical Energy Solutions for troubleshooting, remodels, or EV charging.",
};

export default function ContactPage() {
  const services = getAllServices();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Request a quote
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Tell us about your project and we&apos;ll get back to you with a free,
        no-obligation quote.
      </p>

      <div className="mt-8">
        <QuoteForm services={services} />
      </div>
    </div>
  );
}
