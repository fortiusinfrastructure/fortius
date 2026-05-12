import type { Metadata } from "next";
import { HeroFoundation } from "@/components/foundation/HeroFoundation";
import { IncubadoraTeaser } from "@/components/foundation/IncubadoraTeaser";
import { BrandBanner } from "@/components/foundation/BrandBanner";
import { AyudasTeaser } from "@/components/foundation/AyudasTeaser";
import { BlogPreview } from "@/components/foundation/BlogPreview";
import { DonacionesCTA } from "@/components/foundation/DonacionesCTA";
import { NewsletterCTA } from "@/components/foundation/NewsletterCTA";
import { FOUNDATION_QUOTES } from "@/content/site";

export const metadata: Metadata = {
  title: "Fundación Fortius — Servimos a quienes han elegido servir",
  description:
    "Fortius Foundation fortalece personas, organizaciones e instituciones que entienden el liderazgo como servicio y aspiran a dejar legado.",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Fortius Fundación",
    description:
        "Fundación dedicada a fortalecer causas, liderazgos e instituciones con vocación de servicio e impacto duradero.",
    url: "https://fundacionfortius.org",
    foundingDate: "2023",
};

export default function FoundationHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <HeroFoundation />
        <IncubadoraTeaser />
        <BrandBanner>{FOUNDATION_QUOTES[1]!}</BrandBanner>
        <AyudasTeaser />
        <BlogPreview />
        <BrandBanner>{FOUNDATION_QUOTES[3]!}</BrandBanner>
        <DonacionesCTA />
        <NewsletterCTA />
      </main>
    </>
  );
}
