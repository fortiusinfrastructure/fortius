import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
    ArticleDetailPage,
    buildArticleMetadata,
} from "@/components/consulting-v2/ArticleDetailPage";
import { fetchArticleBySlug } from "@/lib/articles-db";

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const article = await fetchArticleBySlug(slug, locale);
    if (!article || article.category !== "politica") {
        return { title: "Artículo no encontrado" };
    }
    return buildArticleMetadata(article);
}

export default async function PoliticaArticlePage({ params }: PageProps) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: "article" });
    const article = await fetchArticleBySlug(slug, locale);
    if (!article || article.category !== "politica") notFound();
    return (
        <ArticleDetailPage
            article={article}
            backHref="/politica#analisis"
            backLabel={t("back-politica")}
            membershipHref="/politica#membresias"
        />
    );
}
