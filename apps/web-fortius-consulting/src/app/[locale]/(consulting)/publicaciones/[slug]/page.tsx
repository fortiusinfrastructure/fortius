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
    const article = await fetchArticleBySlug(slug);
    if (!article) {
        const t = await getTranslations({ locale, namespace: "article" });
        return { title: t("not-found") };
    }
    return buildArticleMetadata(article);
}

export default async function PublicacionPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const article = await fetchArticleBySlug(slug);
    if (!article) notFound();

    const t = await getTranslations({ locale, namespace: "article" });

    const backHref = article.category === "sociedad-civil" ? "/sociedad-civil#analisis" : "/politica#analisis";
    const backLabel = article.category === "sociedad-civil" ? t("back-civil") : t("back-politica");
    const membershipHref = article.category === "sociedad-civil" ? "/sociedad-civil#membresias" : "/politica#membresias";

    return (
        <ArticleDetailPage
            article={article}
            backHref={backHref}
            backLabel={backLabel}
            membershipHref={membershipHref}
        />
    );
}
