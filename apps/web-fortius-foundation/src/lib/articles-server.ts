/**
 * Server-only article queries — read from Supabase, fall back to local content.
 * Import this in Server Components / Route Handlers; never in client components.
 */

import { createAdminClient } from "@fortius/database";
import { FOUNDATION_ARTICLES, type FoundationArticle } from "@/content/articles";

const ORG_SLUG = "fortius-foundation";

function dbRowToArticle(row: Record<string, unknown>): FoundationArticle {
  const meta = (row.metadata as Record<string, unknown>) ?? {};
  return {
    slug: row.slug as string,
    title: (row.title_es as string) ?? "",
    category: "foundation",
    kind: "articulo",
    published_at: row.published_at ? (row.published_at as string).slice(0, 10) : "",
    author: (meta.author as string) ?? null,
    excerpt: (row.excerpt_es as string) ?? "",
    content: (row.content_es as string) ?? "",
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
export async function listArticlesDB(): Promise<FoundationArticle[]> {
  const orgId = await getOrgId();
  if (!orgId) return FOUNDATION_ARTICLES;

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("articles")
      .select("slug, title_es, excerpt_es, content_es, published_at, metadata")
      .eq("organization_id", orgId)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!data?.length) return FOUNDATION_ARTICLES;

    const dbArticles = data.map(dbRowToArticle);
    const dbSlugs = new Set(dbArticles.map((a) => a.slug));
    const localOnly = FOUNDATION_ARTICLES.filter((a) => !dbSlugs.has(a.slug));
    return [...dbArticles, ...localOnly];
  } catch {
    return FOUNDATION_ARTICLES;
  }
}

/** Single article by slug: DB first, then local. */
export async function getArticleBySlugDB(slug: string): Promise<FoundationArticle | null> {
  const orgId = await getOrgId();
  if (!orgId) return FOUNDATION_ARTICLES.find((a) => a.slug === slug) ?? null;

  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("articles")
      .select("slug, title_es, excerpt_es, content_es, published_at, metadata")
      .eq("organization_id", orgId)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (data) return dbRowToArticle(data);
  } catch {
    // fall through to local
  }

  return FOUNDATION_ARTICLES.find((a) => a.slug === slug) ?? null;
}
