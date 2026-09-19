'use client';

import React, { useState } from 'react';
import type { Service } from '@/lib/services';

/**
 * Quote request form.
 *
 * Mobile conversion details that matter here:
 * - every control clears a 44px tap height
 * - `inputMode` / `autoComplete` / `type` are set so phones show the right
 *   keyboard and offer autofill, which measurably cuts abandonment
 * - `text-base` (16px) on inputs stops iOS Safari from zooming on focus
 * - the submit button reports its own state and never silently no-ops
 */
export default function QuoteForm({
  services,
  defaultService,
}: {
  services: Service[];
  /** Preselects the dropdown, e.g. on a specific service's page. */
  defaultService?: string;
}) {
  const initialService = defaultService ?? services[0]?.title ?? '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: initialService,
    description: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: "Request received — we'll call you back shortly. Need it sooner? Call us directly.",
        });
        // Reset back to the page's own default service, not a hardcoded one.
        setFormData({
          name: '',
          phone: '',
          email: '',
          projectType: initialService,
          description: '',
        });
      } else {
        throw new Error(data.error || 'Failed to submit request.');
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err instanceof Error && err.message
            ? `${err.message} Please call us instead — we don't want to lose your request.`
            : "Something went wrong. Please call us instead — we don't want to lose your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const field =
    'w-full min-h-[44px] rounded border border-slate-300 p-2.5 text-base text-slate-900 outline-none focus:ring-2 focus:ring-amber-500';
  const labelClass =
    'mb-1 block text-xs font-bold uppercase tracking-wide text-slate-700';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
      <div>
        <label className={labelClass} htmlFor="quote-name">
          Your Name
        </label>
        <input
          id="quote-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={field}
          placeholder="First and Last Name"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="quote-phone">
            Phone Number
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={field}
            placeholder="(405) 555-0123"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="quote-email">
            Email Address
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={field}
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-service">
          Project Type
        </label>
        <select
          id="quote-service"
          name="projectType"
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          className={`${field} bg-white`}
        >
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-description">
          Project Description
        </label>
        <textarea
          id="quote-description"
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={field}
          placeholder="Describe the electrical work you need, and your address or city…"
        />
      </div>

      {status.type && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded border p-3 text-sm font-medium ${
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        data-cta="quote-submit"
        className="min-h-[48px] w-full rounded bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? 'Submitting…' : 'Request My Free Quote'}
      </button>

      <p className="text-center text-xs text-slate-500">
        Free quotes on planned work. No obligation.
      </p>
    </form>
  );
}
