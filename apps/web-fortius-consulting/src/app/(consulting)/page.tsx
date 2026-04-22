import type { Metadata } from "next";
import { HeroEditorial } from "@/components/consulting-v2/HeroEditorial";
import { VerticalSection } from "@/components/consulting-v2/VerticalSection";
import { IdeasMarquee } from "@/components/consulting-v2/IdeasMarquee";
import { FoundationBridge } from "@/components/consulting-v2/FoundationBridge";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";

export const metadata: Metadata = {
  title: "Fortius Consulting — Consultoría estratégica para organizaciones con principios",
  description:
    "Acompañamos a organizaciones con principios y ofrecemos inteligencia política y geopolítica para decisiones de alto impacto.",
  openGraph: {
    title: "Fortius Consulting",
    description:
      "Sociedad civil e inteligencia: dos verticales, un mismo estándar. Estrategia, análisis y ejecución al servicio de decisiones con valores.",
    type: "website",
    locale: "es_ES",
    siteName: "Fortius Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortius Consulting",
    description: "Consultoría estratégica para organizaciones con principios.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fortius Consulting",
  description:
    "Consultoría estratégica para organizaciones con principios e inteligencia política para decisiones de alto impacto.",
  url: "https://fortiusconsulting.com",
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
        <VerticalSection vertical={civil} accentSide="left" />
        <VerticalSection vertical={intelligence} accentSide="right" />
        <IdeasMarquee />
        <FoundationBridge />
        <NewsletterCTA />
      </main>
    </>
  );
}
