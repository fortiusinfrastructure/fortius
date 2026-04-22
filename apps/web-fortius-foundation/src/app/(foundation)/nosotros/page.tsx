import type { Metadata } from "next";
import { NosotrosClient } from "./NosotrosClient";

export const metadata: Metadata = {
    title: "Nosotros — Fortius Fundación",
    description:
        "Patronato, Consejo Asesor y equipo de la Fundación Fortius (España y Estados Unidos).",
};

export default function NosotrosPage() {
    return <NosotrosClient />;
}
