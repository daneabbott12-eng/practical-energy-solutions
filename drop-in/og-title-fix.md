# Fixing the sitewide `og:title`

## The problem

All 89 pages on practicalenergyok.com emit the same Open Graph title:

```html
<meta property="og:title" content="Practical Energy Solutions — Licensed OKC Electrician &amp; Electrical Contractor"/>
```

The `<title>` tags are already correct and per-page (`EV Charger Installation in
Edmond, OK`), so this is purely that `openGraph.title` was set once in the root
layout and never overridden per page. Every shared link, Google Business Profile
post, text message preview and Facebook card shows the generic string instead of
the page's actual subject.

## Why it happens in Next.js

`metadata.title.template` applies the `%s | Brand` pattern to child segments
automatically. **`openGraph.title` has no such template.** A value set in the
root layout is simply inherited by every page unless each page sets its own. So
a site can have perfect `<title>` tags and completely broken OG tags — which is
exactly what happened here.

## The fix

Wherever the live codebase generates per-page metadata, set `openGraph.title`
(and `twitter.title`) alongside `title`. The cleanest form is a helper every
page calls, so no page can ship without one:

```ts
// lib/seo.ts
const BRAND = "Practical Energy Solutions";

export function buildMetadata(opts: {
  title: string;        // "EV Charger Installation in Edmond, OK"
  description: string;
  path: string;         // "/service-areas/ev-charging/edmond"
}): Metadata {
  const url = new URL(opts.path, "https://www.practicalenergyok.com").toString();
  const ogTitle = `${opts.title} | ${BRAND}`;   // OG needs the suffix baked in

  return {
    title: opts.title,                          // template adds the brand
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: "en_US",
      url,
      title: ogTitle,
      description: opts.description,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: opts.description },
  };
}
```

Then each page:

```ts
export async function generateMetadata({ params }) {
  const { service, city } = await params;
  return buildMetadata({
    title: `${serviceName(service)} in ${cityName(city)}, OK`,
    description: `…`,
    path: `/service-areas/${service}/${city}`,
  });
}
```

## One gotcha that will bite you

`title.template` does **not** apply to `app/page.tsx` — the root page shares a
route segment with the root layout, so the home page renders without the brand
suffix while every other page has it. Use an absolute title there:

```ts
title: { absolute: `Licensed Electrician in Oklahoma City, OK | ${BRAND}` }
```

This is implemented and verified in this repo — see `src/lib/seo.ts`
(`buildMetadata`, `absoluteTitle`) and `src/app/page.tsx`.

## Keep titles short

Use the trading name "Practical Energy Solutions" in titles, not "Practical
Energy Solutions LLC" — the legal name belongs in `schema.org` `name` /
`legalName`, where length doesn't matter. Google truncates SERP titles around
60 characters, so the brand suffix is usually what gets cut; that is fine, but
don't spend four extra characters on "LLC" to make it happen sooner.
