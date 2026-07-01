import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NosotrosClient } from "./NosotrosClient";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "nosotros" });
    return {
        title: t("meta-title"),
        description: t("meta-desc"),
    };
}

export default function NosotrosPage() {
    return <NosotrosClient />;
}
