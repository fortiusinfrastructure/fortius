import { FOUNDATION_ARTICLES, type FoundationArticle } from "@/content/articles";

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

export function splitArticleContent(content: string): string[] {
  return content
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function getFeaturedArticles(limit = 4): FoundationArticle[] {
  return FOUNDATION_ARTICLES.slice(0, limit);
}