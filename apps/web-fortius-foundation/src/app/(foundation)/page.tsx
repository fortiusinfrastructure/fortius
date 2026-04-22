import type { Metadata } from "next";
import { HeroFoundation } from "@/components/foundation/HeroFoundation";
import { IncubadoraTeaser } from "@/components/foundation/IncubadoraTeaser";
import { BrandBanner } from "@/components/foundation/BrandBanner";
import { AyudasTeaser } from "@/components/foundation/AyudasTeaser";
import { DonacionesCTA } from "@/components/foundation/DonacionesCTA";
import { NewsletterCTA } from "@/components/foundation/NewsletterCTA";

export const metadata: Metadata = {
    title: "Fortius Fundación — Una sociedad más fuerte",
    description:
        "Grant-making foundation al servicio de la sociedad civil. Incubamos, aceleramos y financiamos proyectos con impacto.",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Fortius Fundación",
    description:
        "Grant-making foundation al servicio de la sociedad civil española. Incubadora y aceleradora de proyectos con principios.",
    url: "https://fortiusfoundation.org",
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
                <BrandBanner>Una sociedad civil más fuerte</BrandBanner>
                <AyudasTeaser />
                <BrandBanner>España necesita un cambio. Ayúdanos a ayudar.</BrandBanner>
                <DonacionesCTA />
                <NewsletterCTA />
            </main>
        </>
    );
}
