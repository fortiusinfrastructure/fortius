import type { Metadata } from "next";
import { NosotrosClient } from "./NosotrosClient";

export const metadata: Metadata = {
    title: "Nosotros — Fortius Consulting",
    description:
        "Un equipo multidisciplinar al servicio de organizaciones con principios y decisiones de alto impacto.",
};

export default function NosotrosPage() {
    return <NosotrosClient />;
}
