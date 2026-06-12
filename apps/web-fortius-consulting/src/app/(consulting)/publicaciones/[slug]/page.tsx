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
    if (!article) {
        return { title: "Publicación no encontrada" };
    }
    return buildArticleMetadata(article);
}

export default async function PublicacionPage({ params }: PageProps) {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);
    if (!article) notFound();

    const backHref = article.category === "sociedad-civil" ? "/sociedad-civil#analisis" : "/politica#analisis";
    const backLabel = article.category === "sociedad-civil" ? "Volver a Sociedad Civil" : "Volver a Política";
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
