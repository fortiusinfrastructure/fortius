import { ARTICLE_VISUALS, type ArticleVisual } from "@/content/article-visuals";
import { FOUNDATION_ARTICLES, type FoundationArticle } from "@/content/articles";

export interface ArticleBlock {
  type: "heading" | "paragraph";
  content: string;
}

export function listArticles(): FoundationArticle[] {
  return FOUNDATION_ARTICLES;
}

export function getArticleBySlug(slug: string): FoundationArticle | null {
  return FOUNDATION_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export function formatPublishedDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(date).replace(".", "");
}

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 220));
  return `${minutes} min`;
}

export function getArticlePreview(excerpt: string, maxLength = 220): string {
  const clean = excerpt.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength && /[.!?…]$/.test(clean)) return clean;

  const slice = clean.slice(0, maxLength).replace(/[\s.,;:!?-]*[^\s]*$/, "").trim();
  return `${slice || clean}…`;
}

export function splitArticleContent(content: string): string[] {
  return content
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function isLikelyHeading(paragraph: string): boolean {
  const clean = paragraph.trim();
  const wordCount = clean.split(/\s+/).length;

  if (clean.length > 90 || wordCount > 9) return false;
  if (/^[0-9]+\./.test(clean)) return true;
  if (/^[¿¡A-ZÁÉÍÓÚÑ]/.test(clean) && !/[.!…]$/.test(clean)) return true;
  return /[:?]$/.test(clean);
}

export function getArticleBlocks(content: string): ArticleBlock[] {
  return splitArticleContent(content).map((paragraph) => ({
    type: isLikelyHeading(paragraph) ? "heading" : "paragraph",
    content: paragraph,
  }));
}

export function getArticleAbstract(article: FoundationArticle, maxLength = 260): string {
  return getArticlePreview(article.excerpt, maxLength);
}

export function getArticleVisual(article: FoundationArticle | string): ArticleVisual {
  const slug = typeof article === "string" ? article : article.slug;
  return ARTICLE_VISUALS[slug] ?? {
    eyebrow: "Foundation",
    label: "Fortius",
    motif: "Ideas, criterio e impacto institucional.",
    theme: "emerald",
  };
}

export function getRelatedArticles(currentSlug: string, limit = 3): FoundationArticle[] {
  return FOUNDATION_ARTICLES.filter((article) => article.slug !== currentSlug).slice(0, limit);
}

export function getFeaturedArticles(limit = 4): FoundationArticle[] {
  return FOUNDATION_ARTICLES.slice(0, limit);
}