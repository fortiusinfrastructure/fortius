import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    ArticleDetailPage,
    buildArticleMetadata,
} from "@/components/consulting-v2/ArticleDetailPage";
import {
    getArticleBySlug,
    listArticlesByCategory,
} from "@/lib/articles";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return listArticlesByCategory("politica").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article || article.category !== "politica") {
        return { title: "Artículo no encontrado" };
    }
    return buildArticleMetadata(article);
}

export default async function PoliticaArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article || article.category !== "politica") notFound();
    return (
        <ArticleDetailPage
            article={article}
            backHref="/politica#analisis"
            backLabel="Volver a Política"
            membershipHref="/politica#membresias"
        />
    );
}
