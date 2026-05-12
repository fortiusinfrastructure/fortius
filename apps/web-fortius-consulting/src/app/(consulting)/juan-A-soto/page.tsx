import { TEAM } from "@/content/team";
import { notFound } from "next/navigation";
import { JuanClient } from "./JuanClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Juan Ángel Soto — Fortius Consulting",
    description: "Fundador de Fortius Consulting. Más de quince años acompañando a organizaciones con principios en su estrategia institucional.",
};

export default function JuanSotoPage() {
    const member = TEAM.find((m) => m.slug === "juan-angel-soto");
    
    if (!member) {
        notFound();
    }

    return <JuanClient member={member} />;
}
