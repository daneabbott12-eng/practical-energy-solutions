# Live-site schema drop-in

Corrected JSON-LD for **practicalenergyok.com**. These two files replace the
structured data currently emitted on the live site.

They are plain JSON so they can be pasted into whatever codebase actually builds
the live site — that repo is not this one (this folder has no git remote and no
Vercel link, and its URL structure differs from live).

## Files

| File | Replaces |
|---|---|
| `pes-schema.json` | the site-wide `Electrician` block |
| `pes-faq.json` | the homepage `FAQPage` block |

Embed each as its own `<script type="application/ld+json">`. In a Next.js App
Router layout:

```tsx
import schema from "@/drop-in/pes-schema.json";

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }}
/>
```

The `.replace(/</g, "\u003c")` matters: it stops a stray `</script>` inside any
string value from breaking out of the script element.

## What changed in `pes-schema.json`

1. **`hasCredential` was malformed.** It used
   `credentialCategory: "Oklahoma Electrical Contractor License"`. Schema.org
   expects a *category* there. Now `credentialCategory: "license"`, with the
   descriptive text moved to `name` and `recognizedBy` pointing at the Oklahoma
   Construction Industries Board — which is what makes the licence verifiable to
   Google rather than an opaque string.

2. **`areaServed` city names embedded the state** (`"Oklahoma City, OK"` as a
   `City` name). Now `name: "Oklahoma City"` with `containedInPlace` → Oklahoma,
   which is how Google expects to resolve the place entity. All 14 cities kept,
   unchanged.

3. **Added `serviceArea` as a `GeoCircle`** — 80km radius centred on OKC. Backs
   up `areaServed` with an actual geography for a service-area business.

4. **Added `priceRange`, `paymentAccepted`, `currenciesAccepted`.** Standard
   LocalBusiness fields that were absent.

5. **Added `LocalBusiness` alongside `Electrician`** in `@type`. `Electrician`
   is already a subtype, so this is belt-and-braces; drop it if you prefer the
   narrower type.

6. **Added `url` and `provider` to each `Service`** in `hasOfferCatalog`, so
   each offer resolves to a real page and back to the business `@id`.
   Note: New Construction Wiring points at `/service-areas/new-construction`
   because `/new-construction` returns 404.

7. **`email` updated to `dane.abbott12@gmail.com`.**

## What changed in `pes-faq.json`

Expanded from 6 questions to 13. All six originals are kept (two lightly
edited to add the licence number and clarify scope). The eight additions target
high-intent commercial searches — "how much does it cost to rewire a house in
Oklahoma", "when should I upgrade to a 200A panel" — rather than
brand-qualifying questions someone only asks once they're already on the site.

### Two things to check before shipping this

- **Google requires FAQ answers to be visible on the page.** Marking up Q&A that
  isn't rendered is a structured-data violation. If the live FAQ section only
  renders six questions, render all thirteen, or trim the JSON to match.
- **The pricing figures need your sign-off.** Panel upgrade ($1,800–4,000) and
  diagnostic ($89–149) come from the OKC 2026 market reference in your own ops
  specs. The rewire ($8,000–20,000) and EV charger ($800–2,000) ranges are
  market estimates I have not verified against your job costing. Published
  prices that undercut your real pricing generate jobs you lose money on.

## Still outstanding on the live site

- **`og:title` is identical on all 89 pages** — every page shares
  "Practical Energy Solutions — Licensed OKC Electrician & Electrical
  Contractor". The `<title>` tags are correctly per-page; only the Open Graph
  tag was never wired. Not fixable from here: it is a metadata change in the
  live codebase, not a schema block.
- **The deployed build is stale.** As of 2026-09-19 the edge was serving a
  response with `Age: 1209905` (~14 days) on a cache HIT, so content changes
  made since then — including the email — are not live until a redeploy.
