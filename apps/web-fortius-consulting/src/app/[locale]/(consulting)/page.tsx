import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroEditorial } from "@/components/consulting-v2/HeroEditorial";
import { VerticalSection } from "@/components/consulting-v2/VerticalSection";
import { NoticiasSection } from "@/components/consulting-v2/NoticiasSection";
import { FoundationBridge } from "@/components/consulting-v2/FoundationBridge";
import { NewsletterCTA } from "@/components/consulting-v2/NewsletterCTA";
import { getVerticals } from "@/content/home-v2";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { fetchArticles } from "@/lib/articles-db";
import { getEditorialSlots, getLatestNoticias } from "@/lib/articles";

export const revalidate = 600;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  foundingDate: "2010",
  areaServed: "Global",
  knowsAbout: [
    "Strategic consulting",
    "Public affairs",
    "Impact measurement",
    "Geopolitical intelligence",
    "Organizational development",
  ],
};

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const desc = locale === "en"
    ? "Strategic consulting for principle-driven organisations and high-impact political intelligence."
    : SITE_DESCRIPTION;
  return {
    title: `${SITE_NAME} | ${t("line1")} ${t("line2")}`,
    description: desc,
    openGraph: {
      title: SITE_NAME,
      description: desc,
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      siteName: SITE_NAME,
      url: SITE_URL,
    },
    twitter: { card: "summary_large_image", title: SITE_NAME, description: desc },
  };
}

export default async function ConsultingPage({ params }: Props) {
  const { locale } = await params;
  const articles = await fetchArticles(locale);
  const verticals = await getVerticals(locale);
  const [civil, intelligence] = verticals;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <HeroEditorial />
        <VerticalSection vertical={civil} accentSide="left" summaryOnly slots={getEditorialSlots(articles, "sociedad-civil")} />
        <VerticalSection vertical={intelligence} accentSide="right" summaryOnly slots={getEditorialSlots(articles, "politica")} />
        <NoticiasSection noticias={getLatestNoticias(articles, 6)} />
        <FoundationBridge />
        <NewsletterCTA />
      </main>
    </>
  );
}
