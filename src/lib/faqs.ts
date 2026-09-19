/**
 * High-intent FAQ content.
 *
 * These are the questions OKC homeowners and property managers actually type
 * into Google before they call an electrician. Each one is rendered visibly on
 * the page AND emitted as `FAQPage` schema — Google requires the answer text to
 * be present on-page, so never add an entry here without rendering it.
 *
 * !! PRICING DISCLOSURE !!
 * The dollar figures below come from the OKC 2026 market pricing reference in
 * the internal ops specs (diagnostic $89–149, 100→200A panel upgrade
 * $1,800–4,000). The rewire and EV-charger ranges are market estimates and are
 * marked TODO(verify) — confirm them against real PES job costing before
 * launch. Published prices that undercut your actual pricing generate leads you
 * lose money on; prices that overshoot lose the call outright.
 */

import type { Faq } from "./seo";
import type { ServiceSlug } from "./services";

export type { Faq };

interface FaqEntry extends Faq {
  /** Service pages this question should appear on. Empty = general/home only. */
  services: ServiceSlug[];
}

const ENTRIES: FaqEntry[] = [
  {
    question: "When should I upgrade a 100A panel to 200A service?",
    answer:
      "Upgrade when you are adding load the existing service cannot carry: an EV charger, an electric range or dryer conversion, a heat pump, a hot tub, or a finished shop or garage. You should also upgrade if the panel is full with no room for breakers, if it is a Federal Pacific Stab-Lok or Zinsco panel (both have documented failure-to-trip problems), or if you see scorching, buzzing, or breakers that trip under normal load. A licensed electrician performs an NEC Article 220 load calculation to confirm what your home actually needs before any work is quoted.",
    services: ["panel-upgrades", "ev-charging"],
  },
  {
    question: "How much does a 100A to 200A panel upgrade cost in Oklahoma?",
    answer:
      "Most 100A to 200A service upgrades in the Oklahoma City metro run $1,800 to $4,000. The spread comes down to whether the meter base and service mast are replaced, how far the panel sits from the meter, whether the grounding electrode system needs to be brought up to current code, and whether the utility has to disconnect and reconnect the service drop. The permit and inspection are included in a proper quote — if a bid does not mention a permit, that is a red flag.",
    services: ["panel-upgrades"],
  },
  {
    // TODO(verify): confirm this range against actual PES rewire job costing.
    question: "How much does it cost to rewire a house in Oklahoma?",
    answer:
      "A whole-home rewire in the OKC metro typically falls between $8,000 and $20,000 for a single-story home, driven mostly by square footage, attic and crawlspace access, plaster versus drywall, and how much of the original wiring must be abandoned in place. Partial rewires — replacing just the aluminum branch circuits or the knob-and-tube runs a home inspector flagged — are far less. We walk the house, count the circuits and devices, and give you a fixed price rather than an hourly guess.",
    services: ["rewiring", "remodels"],
  },
  {
    question: "Do I need a permit for electrical work in Oklahoma City?",
    answer:
      "Yes, for most work beyond simple like-for-like device replacement. Panel upgrades, service changes, new circuits, rewires, and EV charger installations all require a permit and inspection in OKC and the surrounding metro cities. Only a licensed electrical contractor can pull that permit. Practical Energy Solutions pulls the permit and coordinates the inspection as part of the job — you should never be asked to pull a homeowner permit for work a contractor is performing.",
    services: [],
  },
  {
    question: "Is my Federal Pacific or Zinsco panel actually dangerous?",
    answer:
      "Both are known-defective designs. Federal Pacific Stab-Lok breakers have a documented rate of failing to trip under overload, and Zinsco breakers can weld themselves to the bus bar. A breaker that does not trip leaves the wiring in your walls as the only thing standing between a fault and a fire. Many insurers now surcharge or decline coverage on homes with either panel. Replacement is the only real remedy — these panels cannot be repaired to a safe condition.",
    services: ["panel-upgrades", "troubleshooting"],
  },
  {
    question: "Why does my breaker keep tripping?",
    answer:
      "A breaker that trips repeatedly is doing its job — something is wrong. The three usual causes are an overloaded circuit (too much plugged into one branch), a short circuit (a damaged conductor or a failed appliance), or a ground fault (current leaking to ground, common in kitchens, baths, garages, and outdoor circuits). Resetting it over and over is the one thing you should not do. We trace the fault to the specific circuit, device, or appliance rather than replacing the breaker and hoping.",
    services: ["troubleshooting"],
  },
  {
    question: "How much does it cost to install a Level 2 EV charger at home?",
    answer:
      // TODO(verify): confirm installed-price range against real PES EV jobs.
      "A straightforward Level 2 installation — panel with spare capacity, charger mounted in the garage near the panel — commonly runs $800 to $2,000 installed, not counting the charger unit itself. Cost climbs when the run is long, when the route goes through finished walls or under a slab, or when the panel is full and needs a subpanel or a service upgrade first. We start with a load calculation so you know up front which situation you are in.",
    services: ["ev-charging"],
  },
  {
    question: "Do you charge for a diagnostic or service call?",
    answer:
      "Yes — a diagnostic fee of $89 to $149 covers the trip and the time to actually find the fault, and it is credited toward the repair when you approve the work. Troubleshooting is skilled labor: the value is in correctly identifying the problem, which is exactly what a free-estimate model cannot pay for. Quotes on planned work like panel upgrades, rewires, remodels, and EV chargers are always free.",
    services: ["troubleshooting"],
  },
  {
    question: "Are you licensed and insured in Oklahoma?",
    answer:
      "Yes. Practical Energy Solutions is a licensed electrical contractor through the Oklahoma Construction Industries Board (CIB), and we carry liability insurance and workers' compensation coverage. Every job is performed to the National Electrical Code as adopted by the State of Oklahoma. You can verify any Oklahoma electrical contractor's license status directly through the CIB's public license search before you hire.",
    services: [],
  },
  {
    question: "How fast can you get out to my property?",
    answer:
      "We hold capacity for same-week dispatch across the OKC metro, and we triage true emergencies — no power, burning smell, arcing, water contact with electrical equipment — ahead of scheduled work. Call and we will tell you honestly when we can be there rather than booking you and sliding the date.",
    services: [],
  },
  {
    question: "What areas around Oklahoma City do you serve?",
    answer:
      "We serve Oklahoma City and the surrounding metro, including Edmond, Norman, Moore, Midwest City, Yukon, Mustang, and Piedmont, with service extending east to Muskogee. If you are not sure whether you are in range, call — we will tell you straight rather than driving out and adding a trip charge.",
    services: [],
  },
];

/** FAQs shown on the home page: the general-intent set. */
export function generalFaqs(): Faq[] {
  return ENTRIES.filter((entry) => entry.services.length === 0).map(strip);
}

/** FAQs relevant to one service, padded with general questions. */
export function faqsForService(slug: ServiceSlug): Faq[] {
  const specific = ENTRIES.filter((entry) => entry.services.includes(slug));
  const general = ENTRIES.filter((entry) => entry.services.length === 0).slice(0, 2);
  return [...specific, ...general].map(strip);
}

/** Every question — used on the dedicated FAQ page. */
export function allFaqs(): Faq[] {
  return ENTRIES.map(strip);
}

function strip(entry: FaqEntry): Faq {
  return { question: entry.question, answer: entry.answer };
}
