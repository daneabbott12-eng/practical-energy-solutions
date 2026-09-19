# Practical Energy Solutions

Marketing site for an Oklahoma City electrical contractor, built with the
Next.js App Router. It doubles as a worked example of local SEO for a
service-area business: structured data, per-page metadata, and service ×
location landing pages generated from a single registry.

> **This repository is not the deployed site.**
> The live site at practicalenergyok.com builds from a different codebase with
> a different URL structure. Changes here do not reach it. See
> [Relationship to the live site](#relationship-to-the-live-site).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 3 ·
Vercel Analytics. No database — the site is fully static apart from one
intake route.

## Getting started

```bash
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build (30 static pages) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `next lint` |

## How it's organised

Three registries in `src/lib` drive everything. Pages read from them; they
never hardcode business facts or service copy.

| File | Owns |
|---|---|
| `business.ts` | NAP — name, phone, email, hours, licence, 14 service areas |
| `services.ts` | The 7 services, with a build-time scope gatekeeper |
| `faqs.ts` | FAQ content, tagged by which service each question belongs to |

```
src/
├── app/
│   ├── layout.tsx              # metadata defaults + sitewide JSON-LD
│   ├── page.tsx                # home
│   ├── [slug]/                 # /troubleshooting, /panel-upgrades, …
│   ├── service-areas/
│   │   ├── page.tsx            # index
│   │   └── [city]/             # /service-areas/edmond, …
│   ├── services/ · faq/ · contact/
│   ├── api/quote/route.ts      # lead intake
│   ├── sitemap.ts · robots.ts  # generated from the registries
│   └── globals.css
├── components/                 # CallButton, StickyCallBar, FaqSection, …
└── lib/                        # business.ts · services.ts · faqs.ts · seo.ts
```

Adding a service is one entry in `services.ts` — the route, nav, footer,
sitemap, and schema all follow. Same for a city in `business.ts`.

### The services gatekeeper

Solar and wind work are out of scope for this contractor. `services.ts`
enforces that at module load: every service is run through `assertInScope()`,
which throws if the slug is off the allowlist or if any copy matches an
excluded term. A violation **fails the build** rather than quietly shipping
out-of-scope copy. Matching is word-boundary based, so "window" and "rewind"
don't trip it.

## SEO implementation

- **`Electrician` + `LocalBusiness` JSON-LD** sitewide, with a stable `@id`
  that per-page `Service`, `FAQPage`, and `BreadcrumbList` nodes reference
  rather than redefining the business.
- **Service-area business**: no street address is published. `areaServed`
  plus a `GeoCircle` is the correct pairing for a contractor who travels to
  customers, and it matches a hidden-address Google Business Profile.
- **Titles** follow `[Service] in [City], OK | Practical Energy Solutions`.
- **Unverified fields are omitted, not faked.** `business.ts` keeps anything
  unconfirmed as `null`, and the schema builders drop null keys. A wrong
  licence number on a contractor's site is a regulatory problem, not a
  formatting one.
- **FAQ answers are rendered on-page** via native `<details>` — no client JS,
  and Google requires the answer text to be present to award rich results.

### Two Next.js metadata traps

Both of these are live on production sites everywhere, including this one's:

1. **`openGraph.title` has no template.** `metadata.title.template`
   automatically appends your brand to `<title>`, but there is no equivalent
   for Open Graph. Set it once in a root layout and *every* page inherits that
   one string — you get perfect title tags and identical OG cards sitewide.
   Set it per page. See `buildMetadata()` in `src/lib/seo.ts`.
2. **`title.template` does not apply to `app/page.tsx`.** The root page shares
   a route segment with the root layout, so the template is skipped and the
   home page renders without the brand suffix while every other page has it.
   Use `title: { absolute: … }` there — the `absoluteTitle` flag on
   `buildMetadata()`.

## Known limitations

- **`api/quote` has no real delivery.** It validates the submission and writes
  a structured log line, plus a local file in development. On a serverless
  host nothing emails or notifies you — the log is a safety net, not a
  pipeline. Wire an email provider or CRM before relying on it.
- **Some FAQ pricing is estimated.** Panel upgrade and diagnostic figures come
  from a 2026 OKC market reference; the rewire and EV charger ranges are
  marked `TODO(verify)` and need checking against real job costing.
- **No test suite.** Verification so far has been build checks and DOM
  inspection of the rendered output.

## Relationship to the live site

practicalenergyok.com is a real, well-built site that this repository does not
deploy. It has ~89 pages against this repo's 30, and a finer-grained URL
scheme — `/service-areas/[service]/[city]` rather than
`/service-areas/[city]`, and `/remodels-construction` rather than separate
`/remodels` and `/new-construction`.

Pointing the domain at this codebase would therefore be a migration requiring
redirects for roughly 70 indexed URLs, not a deploy.

The `drop-in/` directory holds work intended for the live codebase instead:
corrected JSON-LD (`pes-schema.json`, `pes-faq.json`) and a writeup of the
sitewide `og:title` bug and its fix (`og-title-fix.md`).

## License

MIT — see [LICENSE](LICENSE).
