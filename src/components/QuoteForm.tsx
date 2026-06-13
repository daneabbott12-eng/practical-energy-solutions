"use client";

import { useState } from "react";
import type { Service } from "@/lib/services";

type Status = "idle" | "submitting" | "success";

export default function QuoteForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    // No backend yet: simulate a successful submission. Swap this for a real
    // server action / API route when the lead pipeline is ready.
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand/30 bg-brand/5 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Thanks, {form.name || "there"}!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your quote request has been received. A Practical Energy Solutions
          electrician will reach out
          {form.email ? ` at ${form.email}` : ""} shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: "", email: "", phone: "", service: "", message: "" });
            setStatus("idle");
          }}
          className="mt-4 text-sm font-medium text-brand hover:text-brand-dark"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service
        </label>
        <select
          id="service"
          name="service"
          required
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        >
          <option value="" disabled>
            Select a service&hellip;
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}
