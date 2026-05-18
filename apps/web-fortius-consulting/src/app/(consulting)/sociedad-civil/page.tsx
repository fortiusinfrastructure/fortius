import type { Metadata } from "next";
import { VerticalIntro } from "@/components/consulting-v2/VerticalIntro";
import { WorkAreaSection } from "@/components/consulting-v2/WorkAreaSection";
import { ServicesPortfolio } from "@/components/consulting-v2/ServicesPortfolio";
import { ExpertsSection } from "@/components/consulting-v2/ExpertsSection";
import { MembershipTiers } from "@/components/consulting-v2/MembershipTiers";
import { AccessPrivateAreaCTA } from "@/components/consulting-v2/AccessPrivateAreaCTA";
import { IdeasMarquee } from "@/components/consulting-v2/IdeasMarquee";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";
import {
    SOCIEDAD_CIVIL_INTRO,
    MEMBERSHIP_TIERS,
} from "@/content/sociedad-civil";

export const metadata: Metadata = {
    title: "Sociedad Civil — Fortius Consulting",
    description:
        "Acompañamos a fundaciones, think tanks, asociaciones y plataformas ciudadanas para convertir convicciones en estructura, influencia e impacto.",
};

export default function SociedadCivilPage() {
    const civil = VERTICALS.find((v) => v.id === "civil");
    if (!civil) return null;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <VerticalIntro
                kicker={SOCIEDAD_CIVIL_INTRO.kicker}
                hero={SOCIEDAD_CIVIL_INTRO.hero}
                subcopy={SOCIEDAD_CIVIL_INTRO.subcopy}
                description={SOCIEDAD_CIVIL_INTRO.description}
                claim={SOCIEDAD_CIVIL_INTRO.claim}
            />

            <WorkAreaSection vertical={civil} />

            <ServicesPortfolio
                kicker={`Portafolio · ${civil.label}`}
                title="Nueve servicios para construir, profesionalizar y escalar."
                description="Cubrimos todo el ciclo: del diseño organizativo a la ejecución operativa, sin diluir el rigor estratégico."
                services={civil.services}
            />

            <ExpertsSection vertical={civil} />

            <MembershipTiers
                kicker="Darse de Alta"
                title="Membresías para acompañamiento continuo."
                description="Acceso al Área clientes y a la inteligencia institucional de Fortius. Dos planes diseñados para distintos niveles de exigencia y profundidad."
                tiers={MEMBERSHIP_TIERS}
                contactVertical="Sociedad Civil"
            />

            <AccessPrivateAreaCTA />

            <IdeasMarquee
                kicker="Experiencia"
                ariaLabel="Experiencia — organizaciones e ideas que movemos"
            />

            <NewsletterCTA />
        </main>
    );
}
