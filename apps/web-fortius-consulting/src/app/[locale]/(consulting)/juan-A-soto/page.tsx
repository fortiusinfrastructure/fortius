import { TEAM } from "@/content/team";
import { notFound } from "next/navigation";
import { JuanClient } from "./JuanClient";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { formatPublishedDate, kindLabel } from "@/lib/articles";
import { fetchArticles } from "@/lib/articles-db";
import { getArticleLeadData } from "@/lib/article-display";
import { getPersonSocialImage } from "@/lib/person-social-image";

export const revalidate = 600;

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "juan-soto" });
    const member = TEAM.find((item) => item.slug === "juan-angel-soto");
    const title = "Juan Ángel Soto | Fortius Consulting";
    const description = t("meta-desc");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: getPersonSocialImage(member?.photo) }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [getPersonSocialImage(member?.photo)],
        },
    };
}

export default async function JuanSotoPage({ params }: Props) {
    const { locale } = await params;
    const member = TEAM.find((m) => m.slug === "juan-angel-soto");

    if (!member) {
        notFound();
    }

    const articles = await fetchArticles(locale);

    const normalize = (value: string) =>
        value
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .trim();

    const publications = articles
        .filter((article) => {
            const author = getArticleLeadData(article).author;
            if (!author) return false;
            return [
                "juan angel soto",
                "juan angel soto gomez",
            ].includes(normalize(author));
        })
        .slice(0, 4)
        .map((article) => ({
            slug: article.slug,
            href: `/${article.category}/${article.slug}`,
            title: article.title,
            type: kindLabel(article.kind),
            date: formatPublishedDate(article.published_at),
        }));

    return <JuanClient member={member} publications={publications} />;
}
