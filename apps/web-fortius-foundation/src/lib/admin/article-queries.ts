/**
 * Read-only article queries for the admin CMS.
 *
 * Uses createAdminClient to see *all* statuses (draft/published/archived),
 * unlike articles-server.ts which only reads published rows.
 * No 'use server' — these are called from Server Components, not invoked
 * as Server Actions.
 */
import { createAdminClient } from "@fortius/database";

const ORG_SLUG = "fortius-foundation";

export interface AdminArticleListItem {
    id: string;
    slug: string;
    title: string;
    status: "draft" | "published" | "archived";
    isFeatured: boolean;
    publishedAt: string | null;
    updatedAt: string | null;
}

export interface AdminArticleRecord {
    id: string;
    slug: string;
    title_es: string;
    excerpt_es: string;
    content_es: string;
    title_en: string;
    excerpt_en: string;
    content_en: string;
    status: "draft" | "published" | "archived";
    is_featured: boolean;
    featured_image: string;
    published_at: string;
    read_time: string;
}

interface ArticleRowList {
    id: string;
    slug: string;
    title_es: string | null;
    status: string | null;
    is_featured: boolean | null;
    published_at: string | null;
    updated_at: string | null;
}

interface ArticleRowFull extends ArticleRowList {
    excerpt_es: string | null;
    content_es: string | null;
    title_en: string | null;
    excerpt_en: string | null;
    content_en: string | null;
    featured_image: string | null;
    read_time: string | null;
}

async function getOrgId(): Promise<string | null> {
    const admin = createAdminClient();
    const { data } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
    return data?.id ?? null;
}

export async function listAdminArticles(): Promise<AdminArticleListItem[]> {
    const orgId = await getOrgId();
    if (!orgId) return [];

    const admin = createAdminClient();
    const { data } = await admin
        .from("articles")
        .select("id, slug, title_es, status, is_featured, published_at, updated_at")
        .eq("organization_id", orgId)
        .order("updated_at", { ascending: false });

    const rows = (data as ArticleRowList[] | null) ?? [];

    return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title_es ?? "(Sin título)",
        status: (row.status as AdminArticleListItem["status"]) ?? "draft",
        isFeatured: row.is_featured ?? false,
        publishedAt: row.published_at,
        updatedAt: row.updated_at,
    }));
}

export async function getAdminArticleById(id: string): Promise<AdminArticleRecord | null> {
    const orgId = await getOrgId();
    if (!orgId) return null;

    const admin = createAdminClient();
    const { data } = await admin
        .from("articles")
        .select(
            "id, slug, title_es, excerpt_es, content_es, title_en, excerpt_en, content_en, status, is_featured, published_at, updated_at, featured_image, read_time",
        )
        .eq("organization_id", orgId)
        .eq("id", id)
        .maybeSingle();

    const row = data as ArticleRowFull | null;
    if (!row) return null;

    return {
        id: row.id,
        slug: row.slug,
        title_es: row.title_es ?? "",
        excerpt_es: row.excerpt_es ?? "",
        content_es: row.content_es ?? "",
        title_en: row.title_en ?? "",
        excerpt_en: row.excerpt_en ?? "",
        content_en: row.content_en ?? "",
        status: (row.status as AdminArticleRecord["status"]) ?? "draft",
        is_featured: row.is_featured ?? false,
        featured_image: row.featured_image ?? "",
        published_at: row.published_at ? row.published_at.split("T")[0] : "",
        read_time: row.read_time ?? "",
    };
}
