"use server";

/**
 * Server Actions for the Consulting article CMS.
 *
 * Each mutation gates with requireConsultantUser() (super_admin | admin | consultant)
 * and revalidates every public route that reads articles via articles-db.ts so
 * editors see their changes without waiting for the 10-min ISR window.
 */
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@fortius/database";
import { requireConsultantUser } from "@/lib/auth";

const ORG_SLUG = "fortius-consulting";

export interface ConsultingArticleInput {
    slug: string;
    title_es: string;
    excerpt_es: string;
    content_es: string;
    category: "politica" | "sociedad-civil" | "home";
    kind: "comentario" | "informe" | "nota" | "evento" | "noticia" | "articulo";
    access: "public" | "paid";
    status: "draft" | "published" | "archived";
    is_featured: boolean;
    featured_image: string;
    published_at: string;
    read_time: string;
}

async function getOrgId(): Promise<string> {
    const admin = createAdminClient();
    const { data } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
    if (!data) throw new Error("Organización Consulting no encontrada.");
    return data.id;
}

function buildMetadata(input: ConsultingArticleInput, existingMeta: Record<string, unknown> = {}) {
    return {
        ...existingMeta,
        access_level: input.access,
        kind: input.kind,
        content_format: "html" as const,
    };
}

function publishedAtToIso(input: ConsultingArticleInput): string | null {
    if (input.status !== "published") return null;
    if (!input.published_at) return new Date().toISOString();
    return `${input.published_at}T00:00:00Z`;
}

function revalidatePublicRoutes(slug: string) {
    revalidatePath("/");
    revalidatePath("/publicaciones");
    revalidatePath(`/publicaciones/${slug}`);
    revalidatePath("/politica");
    revalidatePath("/sociedad-civil");
    revalidatePath("/area-privada/admin/articulos");
}

export async function createArticleAction(input: ConsultingArticleInput): Promise<{ id: string }> {
    const user = await requireConsultantUser();
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
            category: input.category,
            status: input.status,
            is_featured: input.is_featured,
            featured_image: input.featured_image || null,
            published_at: publishedAtToIso(input),
            read_time: input.read_time || null,
            author_id: user.id,
            metadata: buildMetadata(input, { source_file: "manual-cms" }),
        })
        .select("id")
        .single();

    if (error || !data) {
        throw new Error(error?.message ?? "Error al crear el artículo.");
    }

    revalidatePublicRoutes(input.slug);
    return { id: data.id };
}

export async function updateArticleAction(id: string, input: ConsultingArticleInput): Promise<void> {
    await requireConsultantUser();
    const orgId = await getOrgId();
    const admin = createAdminClient();

    // Preserve source_file from the original row if it exists.
    const { data: existing } = await admin
        .from("articles")
        .select("metadata, slug")
        .eq("id", id)
        .eq("organization_id", orgId)
        .maybeSingle();

    const existingMeta = (existing?.metadata as Record<string, unknown> | null) ?? {};
    const sourceFile = typeof existingMeta.source_file === "string" ? existingMeta.source_file : "manual-cms";

    const { error } = await admin
        .from("articles")
        .update({
            slug: input.slug,
            title_es: input.title_es,
            excerpt_es: input.excerpt_es || null,
            content_es: input.content_es,
            category: input.category,
            status: input.status,
            is_featured: input.is_featured,
            featured_image: input.featured_image || null,
            published_at: publishedAtToIso(input),
            read_time: input.read_time || null,
            metadata: buildMetadata(input, existingMeta),
        })
        .eq("id", id)
        .eq("organization_id", orgId);

    if (error) throw new Error(error.message);

    revalidatePublicRoutes(input.slug);
    if (existing?.slug && existing.slug !== input.slug) {
        revalidatePath(`/publicaciones/${existing.slug}`);
    }
}

export async function deleteArticleAction(id: string): Promise<void> {
    await requireConsultantUser();
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
