export type ArticleAccess = "public" | "paid";

export type ArticleCategory = "politica" | "sociedad-civil" | "home";

export type ArticleKind =
    | "comentario"
    | "informe"
    | "nota"
    | "evento"
    | "noticia"
    | "articulo";

export interface ArticleSubproduct {
    title: string;
    content: string;
}

export interface Article {
    slug: string;
    title: string;
    category: ArticleCategory;
    kind: ArticleKind;
    access: ArticleAccess;
    published_at: string | null;
    excerpt: string;
    content_markdown: string;
    subproducts: ArticleSubproduct[];
    source_file: string;
    cover_image?: string;
}

export interface ArticleOriginalSource {
    url: string;
    label: string;
}
// Data fetching lives in lib/articles-db.ts (server-only, Supabase + fallback).
// The helpers below are pure: they operate on the article arrays they receive,
// so they are safe to use in both Server and Client Components.

export function listArticlesByCategory(articles: Article[], category: ArticleCategory): Article[] {
    return articles.filter((a) => a.category === category);
}

function extractLastExternalUrl(markdown: string): string | null {
    const markdownLinks = [...markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g)];
    if (markdownLinks.length > 0) {
        return markdownLinks.at(-1)?.[1] ?? null;
    }

    const bareUrls = [...markdown.matchAll(/https?:\/\/[^\s)]+/g)];
    return bareUrls.at(-1)?.[0] ?? null;
}

function extractOriginalSourceLabel(markdown: string, url: string) {
    const index = markdown.lastIndexOf(url);
    const snippet = markdown.slice(Math.max(0, index - 320), index + url.length);
    const patterns = [
        /publicad[ao][^\n.]* en [_*“"]?([^:\n_*”"]+?)[_*”"]?(?:\s+bajo|\s+el|\s+con|:|\.|,)/i,
        /versi[oó]n[^\n.]* en [_*“"]?([^:\n_*”"]+?)[_*”"]?(?:\s+bajo|\s+el|\s+con|:|\.|,)/i,
    ];

    for (const pattern of patterns) {
        const match = snippet.match(pattern)?.[1]?.trim();
        if (match) return match;
    }

    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return "fuente original";
    }
}

export function getArticleOriginalSource(article: Article): ArticleOriginalSource | null {
    const url = extractLastExternalUrl(article.content_markdown);
    if (!url) return null;
    return { url, label: extractOriginalSourceLabel(article.content_markdown, url) };
}

const KIND_LABEL: Record<ArticleKind, string> = {
    comentario: "Comentario",
    informe: "Informe",
    nota: "Nota de Inteligencia",
    evento: "Oportunidad & Evento",
    noticia: "Noticia",
    articulo: "Artículo",
};

export function kindLabel(kind: ArticleKind): string {
    return KIND_LABEL[kind] ?? "Artículo";
}
const CATEGORY_LABEL: Record<ArticleCategory, string> = {
    politica: "Política",
    "sociedad-civil": "Sociedad Civil",
    home: "Fortius",
};

export function categoryLabel(category: ArticleCategory): string {
    return CATEGORY_LABEL[category] ?? "Fortius";
}

export function formatPublishedDate(iso: string | null): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(d);
}

/**
 * Returns a truncated Markdown preview for paid articles.
 * Used by the paywall gate to show enough content to entice subscription.
 */
export function paidPreview(markdown: string, paragraphs = 2): string {
    const blocks = markdown.split(/\n\n+/);
    return blocks.slice(0, paragraphs).join("\n\n");
}

/**
 * Approximate reading time in minutes from the Markdown body.
 * Used to populate the "X min" label in the editorial cards.
 */
export function estimateReadTime(markdown: string): string {
    const words = markdown.trim().split(/\s+/).length;
    const minutes = Math.max(3, Math.round(words / 220));
    return `${minutes} min`;
}

/**
 * Shorter date label ("18 mar") used by the inline list inside the editorial card.
 */
export function formatShortDate(iso: string | null): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
    }).format(d).replace(".", "");
}

/**
 * Long date label ("Marzo 2026") used by the locked-article card.
 */
export function formatMonthYear(iso: string | null): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("es-ES", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(d);
}

/**
 * Adapts real articles into the editorial slots used by VerticalSection / WorkAreaSection:
 *   - `featured`: most recent public article
 *   - `rest`:     next 2 public articles (compact list)
 *   - `locked`:   most recent paid article (gated card)
 *
 * Returns null for any slot when no article exists, so callers can fall back to mock data.
 */
export interface EditorialSlots {
    featured: Article | null;
    rest: Article[];
    locked: Article | null;
}

/**
 * Returns the most-recent public noticias across all categories, sorted by date descending.
 */
export function getLatestNoticias(articles: Article[], limit = 6): Article[] {
    return articles
        .filter((a) => a.kind === "noticia" && a.access === "public")
        .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))
        .slice(0, limit);
}

export function getEditorialSlots(articles: Article[], category: ArticleCategory): EditorialSlots {
    const all = listArticlesByCategory(articles, category);
    const publics = all.filter((a) => a.access === "public" && a.kind !== "evento" && a.kind !== "noticia");
    const restricted = all.filter((a) => a.access === "paid" || a.kind === "evento");

    const featured = publics[0] ?? null;
    const rest = publics
        .filter((a) => a.slug !== featured?.slug)
        .slice(0, 2);
    const locked = restricted[0] ?? null;

    return { featured, rest, locked };
}
