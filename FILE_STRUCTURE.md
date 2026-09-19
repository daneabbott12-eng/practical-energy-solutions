# File Structure

Practical Energy Solutions — Next.js (App Router) + TypeScript + Tailwind CSS.
Mobile-first. This document reflects the actual layout; see `README.md` for
what the project is and how to run it.

```
practical-energy-solutions/
├── next.config.mjs            # Next.js config
├── postcss.config.mjs         # PostCSS (tailwindcss + autoprefixer)
├── tailwind.config.ts         # Tailwind theme (brand colors) + content globs
├── tsconfig.json              # strict mode, "@/*" -> "src/*" path alias
├── package.json
├── drop-in/                   # JSON-LD + notes intended for the LIVE codebase,
│                              # which is not this repo (see README)
└── src/
    ├── app/                   # App Router routes
    │   ├── layout.tsx         # Root layout: metadata defaults, sitewide JSON-LD,
    │   │                      # Header/Footer/StickyCallBar
    │   ├── globals.css        # Tailwind directives + base styles
    │   ├── page.tsx           # Home: hero, services, service areas, FAQ, quote form
    │   ├── [slug]/            # Service pages: /troubleshooting, /panel-upgrades,
    │   │   └── page.tsx       # /rewiring, /lighting, /ev-charging, /remodels,
    │   │                      # /new-construction — generated from services.ts
    │   ├── services/page.tsx  # /services index
    │   ├── service-areas/
    │   │   ├── page.tsx       # /service-areas index
    │   │   └── [city]/        # /service-areas/edmond, … (14 cities)
    │   │       └── page.tsx
    │   ├── faq/page.tsx       # /faq
    │   ├── contact/page.tsx   # /contact
    │   ├── api/quote/route.ts # Lead intake (POST)
    │   ├── sitemap.ts         # /sitemap.xml, generated from the registries
    │   └── robots.ts          # /robots.txt
    ├── components/
    │   ├── Header.tsx          # Sticky nav with persistent click-to-call
    │   ├── Footer.tsx          # NAP block + internal-linking hub
    │   ├── StickyCallBar.tsx   # Mobile bottom call bar, sitewide
    │   ├── CallButton.tsx      # tel: link, >=44px tap target
    │   ├── CtaSection.tsx      # Dual CTA: call now / free quote
    │   ├── FaqSection.tsx      # <details> FAQ + FAQPage JSON-LD
    │   ├── TrustBar.tsx        # Licensed / insured / code-compliant signals
    │   ├── JsonLd.tsx          # Escaped JSON-LD script tag
    │   ├── ServiceDetail.tsx   # Shared service page body
    │   └── QuoteForm.tsx       # Client component, posts to /api/quote
    └── lib/
        ├── business.ts         # NAP, hours, licence, 14 service areas
        ├── services.ts         # Service registry + STRICT solar/wind gatekeeper
        ├── faqs.ts             # FAQ content, tagged per service
        ├── seo.ts              # buildMetadata() + all JSON-LD builders
        ├── scraper.js          # Local bid-file ingest (ops-side, not used by the site)
        └── leadFilter.js       # Local lead keyword filter (ops-side)
```

## Conventions

- **Registries are the single source of truth:** `business.ts`, `services.ts`,
  and `faqs.ts` own all business facts and copy. Pages, components, the
  sitemap, and the schema builders read from them and never hardcode. Adding a
  service or a city is one entry, not a new folder.
- **Gatekeeper:** every service is validated by `assertInScope` at module load.
  A service with a slug outside the allowlist, or whose copy references
  solar/wind terms, throws and fails the build. Solar and wind are out of scope.
- **Metadata goes through `buildMetadata()`** (`src/lib/seo.ts`) so no page can
  ship without a canonical URL or an Open Graph card.
- **Mobile-first:** base styles target small screens; `sm:` / `lg:` prefixes add
  layout for larger viewports. Interactive elements clear a 44px tap target.
- **Path alias:** import internal modules with `@/...` (maps to `src/`).
