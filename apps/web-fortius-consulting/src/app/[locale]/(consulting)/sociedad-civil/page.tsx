import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { VerticalIntro } from "@/components/consulting-v2/VerticalIntro";
import { WorkAreaSection } from "@/components/consulting-v2/WorkAreaSection";
import { ServicesPortfolio } from "@/components/consulting-v2/ServicesPortfolio";
import { ExpertsSection } from "@/components/consulting-v2/ExpertsSection";
import { MembershipTiers } from "@/components/consulting-v2/MembershipTiers";
import { AccessPrivateAreaCTA } from "@/components/consulting-v2/AccessPrivateAreaCTA";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { getVerticals } from "@/content/home-v2";
import { getSociedadCivilIntro, getSociedadCivilTiers } from "@/content/sociedad-civil";
import { fetchArticles } from "@/lib/articles-db";
import { getEditorialSlots } from "@/lib/articles";

export const revalidate = 600;

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "sociedad-civil" });
    return { title: t("meta-title"), description: t("meta-desc") };
}

export default async function SociedadCivilPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "sociedad-civil" });
    const verticals = await getVerticals(locale);
    const civil = verticals.find((v) => v.id === "civil");
    if (!civil) return null;

    const intro = await getSociedadCivilIntro(locale);
    const tiers = await getSociedadCivilTiers(locale);
    const articles = await fetchArticles();
    const slots = getEditorialSlots(articles, "sociedad-civil");

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <VerticalIntro
                kicker={intro.kicker}
                hero={intro.hero}
                subcopy={intro.subcopy}
                description={intro.description}
            />

            <WorkAreaSection
                vertical={civil}
                title={t("work-title")}
                slots={slots}
            />

            <ServicesPortfolio
                kicker={`Portfolio · ${civil.label}`}
                title={t("portfolio-title")}
                description={t("portfolio-desc")}
                services={civil.services}
            />

            <ExpertsSection vertical={civil} />

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
