/**
 * Server-only data layer for articles.
 *
 * Source of truth: Supabase `articles` table (org fortius-consulting),
 * with the local JSON snapshot as fallback if the DB is unreachable or empty.
 * Consulting-specific fields (access, kind, subproducts…) live in the
 * `metadata` JSONB column — same shape written by scripts/seed-articles.mjs
 * and /api/admin/articulos/convert.
 */
import { cache } from "react";
import { createAdminClient } from "@fortius/database";
import articlesJson from "@/data/articles.json";
import type {
    Article,
    ArticleAccess,
    ArticleCategory,
    ArticleContentFormat,
    ArticleKind,
    ArticleSubproduct,
} from "./articles";

const ORG_SLUG = "fortius-consulting";

const FALLBACK = articlesJson as Article[];

const CATEGORIES: ArticleCategory[] = ["politica", "sociedad-civil", "home"];
const KINDS: ArticleKind[] = ["comentario", "informe", "nota", "evento", "noticia", "articulo"];

interface ArticleRow {
    slug: string;
    title_es: string | null;
    excerpt_es: string | null;
    content_es: string | null;
    category: string | null;
    published_at: string | null;
    metadata: Record<string, unknown> | null;
}

function sortByPublishedDateDesc(a: Article, b: Article) {
    return (b.published_at ?? "").localeCompare(a.published_at ?? "");
}

function mergeWithFallback(primary: Article[]): Article[] {
    const bySlug = new Map(primary.map((article) => [article.slug, article]));

    for (const fallbackArticle of FALLBACK) {
        if (!bySlug.has(fallbackArticle.slug)) {
            bySlug.set(fallbackArticle.slug, fallbackArticle);
        }
    }

    return [...bySlug.values()].sort(sortByPublishedDateDesc);
}

function rowToArticle(row: ArticleRow): Article | null {
    if (!CATEGORIES.includes(row.category as ArticleCategory)) return null;

    const meta = row.metadata ?? {};
    const kind: ArticleKind = KINDS.includes(meta.kind as ArticleKind)
        ? (meta.kind as ArticleKind)
        : "articulo";
    // Fail closed: anything without an explicit "public" marker is treated as paid.
    const access: ArticleAccess = meta.access_level === "public" ? "public" : "paid";

    const contentFormat: ArticleContentFormat =
        meta.content_format === "html" ? "html" : "markdown";

    return {
        slug: row.slug,
        title: row.title_es ?? row.slug,
        category: row.category as ArticleCategory,
        kind,
        access,
        published_at: row.published_at ? row.published_at.slice(0, 10) : null,
        excerpt: row.excerpt_es ?? "",
        content_markdown: row.content_es ?? "",
        content_format: contentFormat,
        subproducts: Array.isArray(meta.subproducts)
            ? (meta.subproducts as ArticleSubproduct[])
            : [],
        source_file: typeof meta.source_file === "string" ? meta.source_file : "",
        cover_image: typeof meta.cover_image === "string" ? meta.cover_image : undefined,
    };
}

/**
 * All published consulting articles, newest first.
 * Deduplicated per request via React cache(); merges Supabase rows with the
 * local JSON snapshot so local editorial fallbacks (like home noticias) do
 * not disappear when the DB is only partially seeded.
 */
export const fetchArticles = cache(async (): Promise<Article[]> => {
    try {
        const admin = createAdminClient();

        const { data: org } = await admin
            .from("organizations")
            .select("id")
            .eq("slug", ORG_SLUG)
            .maybeSingle();
        if (!org) return FALLBACK;

        const { data, error } = await admin
            .from("articles")
            .select("slug, title_es, excerpt_es, content_es, category, published_at, metadata")
            .eq("organization_id", org.id)
            .eq("status", "published")
            .order("published_at", { ascending: false, nullsFirst: false });

        if (error || !data || data.length === 0) return FALLBACK;

        const mapped = data
            .map((row) => rowToArticle(row as ArticleRow))
            .filter((a): a is Article => a !== null);

        return mapped.length > 0 ? mergeWithFallback(mapped) : FALLBACK;
    } catch {
        return FALLBACK;
    }
});

export async function fetchArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
    return (await fetchArticles()).filter((a) => a.category === category);
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
    return (await fetchArticles()).find((a) => a.slug === slug) ?? null;
}
