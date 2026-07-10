"use server";

/**
 * Server Actions for the Foundation blog CMS.
 *
 * Each mutation gates with requireFoundationAdminUser() (admin | super_admin)
 * and revalidates every public route that reads articles via articles-server.ts
 * so editors see their changes immediately.
 */
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@fortius/database";
import { requireFoundationAdminUser } from "@/lib/private/auth";

const ORG_SLUG = "fortius-foundation";
const CATEGORY = "foundation";

export interface FoundationArticleInput {
    slug: string;
    title_es: string;
    excerpt_es: string;
    content_es: string;
    title_en?: string;
    excerpt_en?: string;
    content_en?: string;
    status: "draft" | "published" | "archived";
    is_featured: boolean;
    featured_image: string;
    published_at: string;
    read_time: string;
}

async function getOrgId(): Promise<string> {
    const admin = createAdminClient();
    const { data } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
    if (!data) throw new Error("Organización Fortius Foundation no encontrada.");
    return data.id;
}

function buildMetadata(existingMeta: Record<string, unknown> = {}) {
    return {
        ...existingMeta,
        content_format: "html" as const,
    };
}

function publishedAtToIso(input: FoundationArticleInput): string | null {
    if (input.status !== "published") return null;
    if (!input.published_at) return new Date().toISOString();
    return `${input.published_at}T00:00:00Z`;
}

function revalidatePublicRoutes(slug: string) {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/area-privada/admin/articulos");
}

export async function createArticleAction(input: FoundationArticleInput): Promise<{ id: string }> {
    const user = await requireFoundationAdminUser();
    const orgId = await getOrgId();
    const admin = createAdminClient();

    const { data, error } = await admin
        .from("articles")
        .insert({
            organization_id: orgId,
            slug: input.slug,
            title_es: input.title_es,
            excerpt_es: input.excerpt_es || null,
            content_es: input.content_es,
            title_en: input.title_en || null,
            excerpt_en: input.excerpt_en || null,
            content_en: input.content_en || null,
            category: CATEGORY,
            status: input.status,
            is_featured: input.is_featured,
            featured_image: input.featured_image || null,
            published_at: publishedAtToIso(input),
            read_time: input.read_time || null,
            author_id: user.id,
            metadata: buildMetadata(),
        })
        .select("id")
        .single();

    if (error || !data) {
        throw new Error(error?.message ?? "Error al crear el artículo.");
    }

    revalidatePublicRoutes(input.slug);
    return { id: data.id };
}

export async function updateArticleAction(id: string, input: FoundationArticleInput): Promise<void> {
    await requireFoundationAdminUser();
    const orgId = await getOrgId();
    const admin = createAdminClient();

    const { data: existing } = await admin
        .from("articles")
        .select("metadata, slug")
        .eq("id", id)
        .eq("organization_id", orgId)
        .maybeSingle();

    const existingMeta = (existing?.metadata as Record<string, unknown> | null) ?? {};

    const { error } = await admin
        .from("articles")
        .update({
            slug: input.slug,
            title_es: input.title_es,
            excerpt_es: input.excerpt_es || null,
            content_es: input.content_es,
            title_en: input.title_en || null,
            excerpt_en: input.excerpt_en || null,
            content_en: input.content_en || null,
            category: CATEGORY,
            status: input.status,
            is_featured: input.is_featured,
            featured_image: input.featured_image || null,
            published_at: publishedAtToIso(input),
            read_time: input.read_time || null,
            metadata: buildMetadata(existingMeta),
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("organization_id", orgId);

    if (error) throw new Error(error.message);

    revalidatePublicRoutes(input.slug);
    if (existing?.slug && existing.slug !== input.slug) {
        revalidatePath(`/blog/${existing.slug}`);
    }
}

export async function deleteArticleAction(id: string): Promise<void> {
    await requireFoundationAdminUser();
    const orgId = await getOrgId();
    const admin = createAdminClient();

    const { data: row } = await admin
        .from("articles")
        .select("slug")
        .eq("id", id)
        .eq("organization_id", orgId)
        .maybeSingle();

    const { error } = await admin.from("articles").delete().eq("id", id).eq("organization_id", orgId);
    if (error) throw new Error(error.message);

    if (row?.slug) revalidatePublicRoutes(row.slug);
}
