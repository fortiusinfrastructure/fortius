import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NosotrosClient } from "./NosotrosClient";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "nosotros" });
    const desc = locale === "en"
        ? "A multidisciplinary team serving principle-driven organisations and high-impact decisions."
        : "Un equipo multidisciplinar al servicio de organizaciones con principios y decisiones de alto impacto.";
    return {
        title: `${t("tag")} | Fortius Consulting`,
        description: desc,
    };
}

export default function NosotrosPage() {
    return <NosotrosClient />;
}
