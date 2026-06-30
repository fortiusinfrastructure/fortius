import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { VerticalIntro } from "@/components/consulting-v2/VerticalIntro";
import { Subverticals } from "@/components/consulting-v2/Subverticals";
import { WorkAreaSection } from "@/components/consulting-v2/WorkAreaSection";
import { ServicesPortfolio } from "@/components/consulting-v2/ServicesPortfolio";
import { ExpertsSection } from "@/components/consulting-v2/ExpertsSection";
import { MembershipTiers } from "@/components/consulting-v2/MembershipTiers";
import { AccessPrivateAreaCTA } from "@/components/consulting-v2/AccessPrivateAreaCTA";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { getVerticals } from "@/content/home-v2";
import { getPoliticaIntro, getPoliticaSubverticals, getPoliticaTiers } from "@/content/politica";
import { fetchArticles } from "@/lib/articles-db";
import { getEditorialSlots } from "@/lib/articles";

export const revalidate = 600;

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "politica" });
    return { title: t("meta-title"), description: t("meta-desc") };
}

export default async function PoliticaPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "politica" });
    const verticals = await getVerticals(locale);
    const politica = verticals.find((v) => v.id === "intelligence");
    if (!politica) return null;

    const intro = await getPoliticaIntro(locale);
    const subverticals = await getPoliticaSubverticals(locale);
    const tiers = await getPoliticaTiers(locale);
    const articles = await fetchArticles();
    const slots = getEditorialSlots(articles, "politica");

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <VerticalIntro
                kicker={intro.kicker}
                hero={intro.hero}
                subcopy={intro.subcopy}
                description={intro.description}
            />

            <Subverticals
                kicker={t("subverticals-kicker")}
                title={t("subverticals-title")}
                items={subverticals}
            />

            <WorkAreaSection
                vertical={politica}
                title={t("work-title")}
                slots={slots}
            />

            <ServicesPortfolio
                kicker={`Portfolio · ${politica.label}`}
                title={t("portfolio-title")}
                description={t("portfolio-desc")}
                services={politica.services}
            />

            <ExpertsSection vertical={politica} />

            <MembershipTiers
                kicker={t("membership-kicker")}
                title={t("membership-title")}
                description={t("membership-desc")}
                tiers={tiers}
                contactVertical={t("membership-vertical")}
            />

            <AccessPrivateAreaCTA
                eyebrow={t("access-eyebrow")}
                label={t("access-label")}
                description={t("access-desc")}
            />

            <NewsletterCTA />
        </main>
    );
}
