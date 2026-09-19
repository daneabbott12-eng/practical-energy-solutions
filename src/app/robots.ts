import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { absoluteUrl } from "@/lib/seo";

/**
 * Generated robots.txt. `/api/` is disallowed because the quote endpoint has no
 * business being crawled; everything else is open.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: BUSINESS.url,
  };
}
