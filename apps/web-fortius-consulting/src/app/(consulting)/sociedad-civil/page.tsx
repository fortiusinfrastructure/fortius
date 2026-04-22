import type { Metadata } from "next";
import { VerticalSection } from "@/components/consulting-v2/VerticalSection";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";

export const metadata: Metadata = {
    title: "Sociedad Civil — Fortius Consulting",
    description:
        "Acompañamos a think tanks, fundaciones, ONGs y plataformas ciudadanas para maximizar el impacto de sus valores.",
};

export default function SociedadCivilPage() {
    const civil = VERTICALS.find((v) => v.id === "civil");
    if (!civil) return null;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <VerticalSection vertical={civil} accentSide="left" />
            <NewsletterCTA />
        </main>
    );
}
