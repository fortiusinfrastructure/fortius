/**
 * Read-only article queries for the admin CMS.
 *
 * Uses createAdminClient to see *all* statuses (draft/published/archived),
 * unlike articles-db.ts which only reads published rows.
 * No 'use server' — these are called from Server Components, not invoked
 * as Server Actions.
 */
import { createAdminClient } from "@fortius/database";

const ORG_SLUG = "fortius-consulting";

export interface AdminArticleListItem {
    id: string;
    slug: string;
    title: string;
    category: string;
    kind: string;
    access: "public" | "paid";
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
    content_format: "markdown" | "html";
    category: string;
    kind: string;
    access: "public" | "paid";
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
    category: string | null;
    status: string | null;
    is_featured: boolean | null;
    published_at: string | null;
    updated_at: string | null;
    metadata: Record<string, unknown> | null;
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

function readKind(metadata: Record<string, unknown> | null): string {
    return typeof metadata?.kind === "string" ? metadata.kind : "articulo";
}

function readAccess(metadata: Record<string, unknown> | null): "public" | "paid" {
    return metadata?.access_level === "public" ? "public" : "paid";
}

function readContentFormat(metadata: Record<string, unknown> | null): "markdown" | "html" {
    return metadata?.content_format === "html" ? "html" : "markdown";
}

export async function listAdminArticles(): Promise<AdminArticleListItem[]> {
    const orgId = await getOrgId();
    if (!orgId) return [];

    const admin = createAdminClient();
    const { data } = await admin
        .from("articles")
        .select("id, slug, title_es, category, status, is_featured, published_at, updated_at, metadata")
        .eq("organization_id", orgId)
        .order("updated_at", { ascending: false });

    const rows = (data as ArticleRowList[] | null) ?? [];

    return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title_es ?? "(Sin título)",
        category: row.category ?? "—",
        kind: readKind(row.metadata),
        access: readAccess(row.metadata),
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
            "id, slug, title_es, excerpt_es, content_es, title_en, excerpt_en, content_en, category, status, is_featured, published_at, updated_at, featured_image, read_time, metadata",
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
        content_format: readContentFormat(row.metadata),
        category: row.category ?? "",
        kind: readKind(row.metadata),
        access: readAccess(row.metadata),
        status: (row.status as AdminArticleRecord["status"]) ?? "draft",
        is_featured: row.is_featured ?? false,
        featured_image: row.featured_image ?? (typeof row.metadata?.cover_image === "string" ? row.metadata.cover_image : ""),
        published_at: row.published_at ? row.published_at.split("T")[0] : "",
        read_time: row.read_time ?? "",
    };
}
