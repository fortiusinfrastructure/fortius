import { TEAM } from "@/content/team";
import { notFound } from "next/navigation";
import { JuanClient } from "./JuanClient";
import type { Metadata } from "next";
import { listArticles, formatPublishedDate, kindLabel } from "@/lib/articles";
import { getArticleLeadData } from "@/lib/article-display";

export const metadata: Metadata = {
    title: "Juan Ángel Soto — Fortius Consulting",
    description: "Founder & CEO de Fortius. Trayectoria académica, ejecutiva e institucional de Juan Ángel Soto Gómez.",
};

export default function JuanSotoPage() {
    const member = TEAM.find((m) => m.slug === "juan-angel-soto");
    
    if (!member) {
        notFound();
    }

    const normalize = (value: string) =>
        value
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .trim();

    const publications = listArticles()
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
