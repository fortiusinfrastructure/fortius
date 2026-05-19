import type { Metadata } from "next";
import { VerticalIntro } from "@/components/consulting-v2/VerticalIntro";
import { Subverticals } from "@/components/consulting-v2/Subverticals";
import { WorkAreaSection } from "@/components/consulting-v2/WorkAreaSection";
import { ServicesPortfolio } from "@/components/consulting-v2/ServicesPortfolio";
import { ExpertsSection } from "@/components/consulting-v2/ExpertsSection";
import { MembershipTiers } from "@/components/consulting-v2/MembershipTiers";
import { AccessPrivateAreaCTA } from "@/components/consulting-v2/AccessPrivateAreaCTA";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";
import {
    POLITICA_INTRO,
    POLITICA_SUBVERTICALS,
    POLITICA_MEMBERSHIP_TIERS,
} from "@/content/politica";

export const metadata: Metadata = {
    title: "Política — Fortius Consulting",
    description:
        "Inteligencia política y análisis de riesgos geopolíticos para líderes que asumen la responsabilidad de decidir y de servir.",
};

export default function PoliticaPage() {
    const politica = VERTICALS.find((v) => v.id === "intelligence");
    if (!politica) return null;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <VerticalIntro
                kicker={POLITICA_INTRO.kicker}
                hero={POLITICA_INTRO.hero}
                subcopy={POLITICA_INTRO.subcopy}
                description={POLITICA_INTRO.description}
            />

            <Subverticals
                kicker="ÁREAS DE TRABAJO"
                title="Dos lecturas complementarias para decisiones de alto impacto."
                items={POLITICA_SUBVERTICALS}
            />

            <WorkAreaSection
                vertical={politica}
                title="El contexto y criterio que necesitas para decidir bien"
            />

            <ServicesPortfolio
                kicker={`Portafolio · ${politica.label}`}
                title="Seis servicios para anticipar, interpretar y decidir."
                description="De la monitorización legislativa al análisis de escenarios geopolíticos: cobertura completa para entornos de alta complejidad."
                services={politica.services}
            />

            <ExpertsSection vertical={politica} />

            <MembershipTiers
                kicker="Darse de Alta"
                title="Membresías para acompañamiento continuo."
                description="Acceso al Área Privada y a herramientas, conocimiento y comunidad. Para organizaciones con vocación de impacto. Dos planes diseñados para distintos niveles de exigencia y profundidad."
                tiers={POLITICA_MEMBERSHIP_TIERS}
                contactVertical="Política"
            />

            <AccessPrivateAreaCTA
                eyebrow="¿Ya eres cliente?"
                label="Accede al Área Privada"
                description="Inicia sesión o solicita acceso para acceder a todas tus ventajas y consultar informes y notas exclusivas."
            />

            <NewsletterCTA />
        </main>
    );
}
