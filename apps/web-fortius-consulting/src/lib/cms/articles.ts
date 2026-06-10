import { estimateReadTime, listArticles, type Article, type ArticleAccess } from "@/lib/articles";

export type CmsVisibility = "open" | "private";

export interface ConsultingCmsArticleRecord {
    slug: string;
    title_es: string;
    excerpt_es: string;
    content_es: string;
    content_kind: string;
    category: string;
    access: ArticleAccess;
    visibility: CmsVisibility;
    status: "published";
    published_at: string | null;
    read_time: string;
    featured_image: string | null;
    source_file: string;
}

export function toConsultingCmsArticleRecord(article: Article): ConsultingCmsArticleRecord {
    return {
        slug: article.slug,
        title_es: article.title,
        excerpt_es: article.excerpt,
        content_es: article.content_markdown,
        content_kind: article.kind,
        category: article.category,
        access: article.access,
        visibility: article.access === "paid" ? "private" : "open",
        status: "published",
        published_at: article.published_at,
        read_time: estimateReadTime(article.content_markdown),
        featured_image: article.cover_image ?? null,
        source_file: article.source_file,
    };
}

export function listConsultingCmsArticleRecords(): ConsultingCmsArticleRecord[] {
    return listArticles().map(toConsultingCmsArticleRecord);
}
