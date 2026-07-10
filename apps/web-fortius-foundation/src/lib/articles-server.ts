/**
 * Server-only article queries — read from Supabase, fall back to local content.
 * Import this in Server Components / Route Handlers; never in client components.
 */

import { createAdminClient } from "@fortius/database";
import { FOUNDATION_ARTICLES, type FoundationArticle } from "@/content/articles";

const ORG_SLUG = "fortius-foundation";

function dbRowToArticle(row: Record<string, unknown>, locale: string): FoundationArticle {
  const meta = (row.metadata as Record<string, unknown>) ?? {};
  const isEn = locale === "en";

  const titleEn = row.title_en as string | null;
  const excerptEn = row.excerpt_en as string | null;
  const contentEn = row.content_en as string | null;

  return {
    slug: row.slug as string,
    title: (isEn && titleEn ? titleEn : (row.title_es as string)) ?? "",
    category: "foundation",
    kind: "articulo",
    published_at: row.published_at ? (row.published_at as string).slice(0, 10) : "",
    author: (meta.author as string) ?? null,
    excerpt: (isEn && excerptEn ? excerptEn : (row.excerpt_es as string)) ?? "",
    content: (isEn && contentEn ? contentEn : (row.content_es as string)) ?? "",
    content_format: meta.content_format === "html" ? "html" : "text",
    source_file: (meta.source_file as string) ?? "",
  };
}

async function getOrgId(): Promise<string | null> {
  try {
    const admin = createAdminClient();
    const { data } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
    return data?.id ?? null;
  } catch {
    return null;
  }
}

/** All published articles: DB first, local as fallback & complement. */
export async function listArticlesDB(locale = "es"): Promise<FoundationArticle[]> {
  const orgId = await getOrgId();
  if (!orgId) return FOUNDATION_ARTICLES;

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("articles")
      .select("slug, title_es, excerpt_es, content_es, title_en, excerpt_en, content_en, published_at, metadata")
      .eq("organization_id", orgId)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!data?.length) return FOUNDATION_ARTICLES;

    const dbArticles = data.map((row) => dbRowToArticle(row, locale));
    const dbSlugs = new Set(dbArticles.map((a) => a.slug));
    const localOnly = FOUNDATION_ARTICLES.filter((a) => !dbSlugs.has(a.slug));
    return [...dbArticles, ...localOnly];
  } catch {
    return FOUNDATION_ARTICLES;
  }
}

/** Single article by slug: DB first, then local. */
export async function getArticleBySlugDB(slug: string, locale = "es"): Promise<FoundationArticle | null> {
  const orgId = await getOrgId();
  if (!orgId) return FOUNDATION_ARTICLES.find((a) => a.slug === slug) ?? null;

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("articles")
      .select("slug, title_es, excerpt_es, content_es, title_en, excerpt_en, content_en, published_at, metadata")
      .eq("organization_id", orgId)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (data) return dbRowToArticle(data, locale);
  } catch {
    // fall through to local
  }

  return FOUNDATION_ARTICLES.find((a) => a.slug === slug) ?? null;
}
