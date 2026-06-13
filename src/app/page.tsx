import React from 'react';
import QuoteForm from '@/components/QuoteForm';

export default function HomePage() {
  const services = [
    {
      title: 'Electrical Troubleshooting',
      desc: 'Expert diagnostic services for flickering lights, tripped breakers, and complex commercial or residential electrical faults.',
      icon: '⚡'
    },
    {
      title: 'Commercial & Residential Remodels',
      desc: 'Complete electrical system overhauls, custom lighting layouts, and panel upgrades tailored to your home or business renovation.',
      icon: '🏗️'
    },
    {
      title: 'Dedicated EV Charger Installation',
      desc: 'Professional Level 2 EV charging station installations with complete load calculations and dedicated safety breakers.',
      icon: '🔌'
    },
    {
      title: 'New Construction Wiring',
      desc: 'Precision rough-ins, comprehensive service panel builds, and structural conduit routing built strictly to NEC code compliance.',
      icon: '🏢'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-4 text-center md:py-24">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block mb-3">
            Licensed, Bonded & Insured OKC Electrical Contractor
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Practical Energy Solutions
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Providing professional, safety-conscious commercial and residential electrical services across the Oklahoma City metropolitan area.
          </p>
          <a
            href="tel:4055550199"
            className="inline-block bg-amber-500 text-slate-950 px-8 py-4 rounded font-bold text-lg hover:bg-amber-400 transition"
          >
            Call Now: (405) 555-0199
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Our Services</h2>
        <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
          Professional craftsmanship engineered for safety and absolute code compliance.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:border-amber-500/50 transition">
              <div className="text-3xl mb-4">{svc.icon}</div>
              <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
              <p className="text-slate-600 leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intake / Quote Form Section */}
      <section className="bg-slate-200 py-16 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-slate-300">
            <h2 className="text-2xl font-bold mb-2 text-slate-900 text-center">Request a Quote</h2>
            <p className="text-slate-600 text-sm text-center mb-6">
              Tell us about your project or troubleshooting needs. We'll review your details and reach out shortly.
            </p>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Sticky Mobile Tap-To-Call Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-between z-50 md:hidden">
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Need Service?</p>
          <p className="text-sm font-bold text-white">Practical Energy Solutions</p>
        </div>
        <a
          href="tel:4055550199"
          className="bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded text-sm tracking-wide shadow-lg active:scale-95 transition"
        >
          📞 TAP TO CALL
        </a>
      </div>
    </div>
  );
}
