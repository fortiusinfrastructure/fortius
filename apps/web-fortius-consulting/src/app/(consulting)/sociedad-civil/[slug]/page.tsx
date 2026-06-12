import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    ArticleDetailPage,
    buildArticleMetadata,
} from "@/components/consulting-v2/ArticleDetailPage";
import { fetchArticleBySlug } from "@/lib/articles-db";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);
    if (!article || article.category !== "sociedad-civil") {
        return { title: "Artículo no encontrado" };
    }
    return buildArticleMetadata(article);
}

export default async function SociedadCivilArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);
    if (!article || article.category !== "sociedad-civil") notFound();
    return (
        <ArticleDetailPage
            article={article}
            backHref="/sociedad-civil#analisis"
            backLabel="Volver a Sociedad Civil"
            membershipHref="/sociedad-civil#membresias"
        />
    );
}
