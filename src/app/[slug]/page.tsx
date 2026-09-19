import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { DEFAULT_CITY, buildMetadata, pageTitle } from "@/lib/seo";
import { allServiceSlugs, getService } from "@/lib/services";

/**
 * Dynamic service pages at the site root: /troubleshooting, /panel-upgrades, …
 *
 * This replaces the three hand-written route folders that existed before. URLs
 * are unchanged, so nothing that was already indexed breaks — but adding a
 * service is now a single entry in src/lib/services.ts instead of a new folder,
 * a new metadata block, and a new component.
 *
 * Static routes (/contact, /faq, /services, /service-areas) take precedence
 * over this dynamic segment in Next.js routing, so they are unaffected.
 */

// Only the known service slugs exist; anything else 404s instead of rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return allServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: pageTitle(service.seoName, DEFAULT_CITY),
    description: `${service.description} Licensed and insured electricians serving Oklahoma City and the surrounding metro. Free quotes on planned work.`,
    path: `/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
