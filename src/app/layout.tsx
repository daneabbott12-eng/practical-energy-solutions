import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import JsonLd from "@/components/JsonLd";
import { BUSINESS } from "@/lib/business";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

// `display: swap` keeps text painted during font load — this is the single
// biggest font-related Core Web Vitals win (no invisible-text flash, no CLS).
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // Required for `alternates.canonical` and Open Graph URLs to resolve to
  // absolute URLs. Without it Next emits relative OG URLs, which crawlers and
  // social scrapers cannot follow.
  metadataBase: new URL(BUSINESS.url),
  title: {
    // Page titles supply "[Service Name] in [City], OK"; this appends the brand.
    default: `${BUSINESS.trade} in Oklahoma City, OK | ${BUSINESS.shortName}`,
    template: `%s | ${BUSINESS.shortName}`,
  },
  description:
    "Licensed and insured electrical contractor serving Oklahoma City, Edmond, Norman, and the OKC metro. Panel upgrades, rewiring, EV chargers, lighting, and fast troubleshooting. Free quotes.",
  applicationName: BUSINESS.legalName,
  authors: [{ name: BUSINESS.legalName, url: BUSINESS.url }],
  creator: BUSINESS.legalName,
  publisher: BUSINESS.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: BUSINESS.shortName,
    locale: "en_US",
    url: BUSINESS.url,
    title: `${BUSINESS.trade} in Oklahoma City, OK | ${BUSINESS.shortName}`,
    description:
      "Licensed, insured, code-compliant electrical work across the OKC metro. Fast dispatch and free quotes.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.trade} in Oklahoma City, OK | ${BUSINESS.shortName}`,
    description:
      "Licensed, insured, code-compliant electrical work across the OKC metro. Fast dispatch and free quotes.",
  },
  // Tells iOS Safari to render bare phone numbers as-is; our own tel: links
  // handle click-to-call, and autodetection otherwise breaks layout and styling.
  formatDetection: { telephone: false },
  category: "Electrical Contractor",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-white pb-20 md:pb-0`}>
        {/* Site-wide business identity. Page-level Service/FAQ/Breadcrumb nodes
            reference this one by @id rather than redefining the business. */}
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallBar />
        <Analytics />
      </body>
    </html>
  );
}
