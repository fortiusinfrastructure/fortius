import type { Metadata } from "next";
import { Hero } from "@/components/consulting/Hero";
import { Method } from "@/components/consulting/Method";
import { Statement } from "@/components/consulting/Statement";
import { Services } from "@/components/consulting/Services";
import { Intelligence } from "@/components/consulting/Intelligence";
import { Experience } from "@/components/consulting/Experience";
import { CTASection } from "@/components/consulting/CTASection";

export const metadata: Metadata = {
  title: "Fortius Consulting — Consultoría estratégica para organizaciones con principios",
  description:
    "Asesoramos a organizaciones para maximizar el impacto de sus valores en la sociedad. Estrategia, ejecución y medición de resultados.",
  openGraph: {
    title: "Fortius Consulting",
    description:
      "Consultoría estratégica para organizaciones con principios. Transformamos la complejidad en ventaja estratégica.",
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

// Organization structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fortius Consulting",
  description:
    "Consultoría estratégica para organizaciones con principios que buscan maximizar el impacto de sus valores en la sociedad.",
  url: "https://fortiusconsulting.com",
  foundingDate: "2010",
  areaServed: "Global",
  knowsAbout: [
    "Strategic consulting",
    "Public affairs",
    "Impact measurement",
    "Intelligence reports",
    "Organizational development",
  ],
};

export default function ConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <Hero />
        <Method />
        <Statement />
        <Services />
        <Intelligence />
        <Experience />
        <CTASection />
      </main>
    </>
  );
}
