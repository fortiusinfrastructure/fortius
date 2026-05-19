import type { Metadata } from "next";
import { HeroEditorial } from "@/components/consulting-v2/HeroEditorial";
import { VerticalSection } from "@/components/consulting-v2/VerticalSection";
import { FoundationBridge } from "@/components/consulting-v2/FoundationBridge";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Consultoría estratégica para organizaciones con principios`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  foundingDate: "2010",
  areaServed: "Global",
  knowsAbout: [
    "Strategic consulting",
    "Public affairs",
    "Impact measurement",
    "Geopolitical intelligence",
    "Organizational development",
  ],
};

export default function ConsultingPage() {
  const [civil, intelligence] = VERTICALS;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <HeroEditorial />
        <VerticalSection vertical={civil} accentSide="left" summaryOnly />
        <VerticalSection vertical={intelligence} accentSide="right" summaryOnly />
        <FoundationBridge />
        <NewsletterCTA />
      </main>
    </>
  );
}
