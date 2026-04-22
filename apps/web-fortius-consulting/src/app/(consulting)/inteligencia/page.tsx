import type { Metadata } from "next";
import { VerticalSection } from "@/components/consulting-v2/VerticalSection";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { VERTICALS } from "@/content/home-v2";

export const metadata: Metadata = {
    title: "Inteligencia — Fortius Consulting",
    description:
        "Inteligencia política y análisis de riesgos geopolíticos para líderes que necesitan contexto antes de actuar.",
};

export default function InteligenciaPage() {
    const intelligence = VERTICALS.find((v) => v.id === "intelligence");
    if (!intelligence) return null;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <VerticalSection vertical={intelligence} accentSide="right" />
            <NewsletterCTA />
        </main>
    );
}
