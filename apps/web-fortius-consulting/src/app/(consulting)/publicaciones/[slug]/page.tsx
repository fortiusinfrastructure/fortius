import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    ArticleDetailPage,
    buildArticleMetadata,
} from "@/components/consulting-v2/ArticleDetailPage";
import { getArticleBySlug, listArticles } from "@/lib/articles";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return listArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) {
        return { title: "Publicación no encontrada" };
    }
    return buildArticleMetadata(article);
}

export default async function PublicacionPage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
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
