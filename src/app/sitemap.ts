import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/business";
import { absoluteUrl } from "@/lib/seo";
import { allServiceSlugs } from "@/lib/services";

/**
 * Generated sitemap at /sitemap.xml.
 *
 * Built from the same registries the pages render from, so a new service or
 * service area appears in the sitemap automatically — a hand-maintained sitemap
 * always drifts, and a sitemap listing URLs that 404 costs crawl budget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/service-areas", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...allServiceSlugs().map((slug) => ({
      url: absoluteUrl(`/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SERVICE_AREAS.map((area) => ({
      url: absoluteUrl(`/service-areas/${area.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
