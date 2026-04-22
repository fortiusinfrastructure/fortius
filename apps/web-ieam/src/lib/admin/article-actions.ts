'use server';

import { createAdminClient } from '@fortius/database';
import { createArticle, updateArticle, deleteArticle } from '@fortius/database';
import type { ArticleFormData } from '@fortius/admin-ui';
import { requireAdminUser } from './auth';

const ORG_SLUG = 'ieam';

async function getOrgId(): Promise<string> {
    const admin = createAdminClient();
    const { data } = await admin.from('organizations').select('id').eq('slug', ORG_SLUG).single();
    if (!data) throw new Error('IEAM org not found');
    return data.id;
}

export async function createArticleAction(data: ArticleFormData) {
    const user = await requireAdminUser();
    const orgId = await getOrgId();

    const article = await createArticle(
        orgId,
        {
            slug: data.slug,
            title_es: data.title_es,
            title_en: data.title_en || null,
            subtitle_es: data.subtitle_es || null,
            subtitle_en: data.subtitle_en || null,
            excerpt_es: data.excerpt_es || null,
            excerpt_en: data.excerpt_en || null,
            content_es: data.content_es,
            content_en: data.content_en || null,
            content_kind: data.content_kind || null,
            category: data.category,
            read_time: data.read_time || null,
            featured_image: data.featured_image || null,
            pull_quote_es: data.pull_quote_es || null,
            pull_quote_en: data.pull_quote_en || null,
            main_image_caption_es: data.main_image_caption_es || null,
            main_image_caption_en: data.main_image_caption_en || null,
            is_featured: data.is_featured,
            status: data.status,
            published_at: data.status === 'published' ? new Date(data.published_at).toISOString() : null,
            materials: data.materials.length > 0 ? (data.materials as unknown as import('@fortius/database').Json) : null,
            author_id: user.id,
        },
        data.authors.map((a, i) => ({
            name: a.name,
            name_en: a.name_en || null,
            role_es: a.role_es || null,
            role_en: a.role_en || null,
            bio_es: a.bio_es || null,
            bio_en: a.bio_en || null,
            image_url: a.image_url || null,
            linkedin: a.linkedin || null,
            email: a.email || null,
            display_order: i,
        }))
    );

    if (!article) throw new Error('Error al crear el artículo.');
    return article;
}

export async function updateArticleAction(articleId: string, data: ArticleFormData) {
    await requireAdminUser();

    const article = await updateArticle(
        articleId,
        {
            slug: data.slug,
            title_es: data.title_es,
            title_en: data.title_en || null,
            subtitle_es: data.subtitle_es || null,
            subtitle_en: data.subtitle_en || null,
            excerpt_es: data.excerpt_es || null,
            excerpt_en: data.excerpt_en || null,
            content_es: data.content_es,
            content_en: data.content_en || null,
            content_kind: data.content_kind || null,
            category: data.category,
            read_time: data.read_time || null,
            featured_image: data.featured_image || null,
            pull_quote_es: data.pull_quote_es || null,
            pull_quote_en: data.pull_quote_en || null,
            main_image_caption_es: data.main_image_caption_es || null,
            main_image_caption_en: data.main_image_caption_en || null,
            is_featured: data.is_featured,
            status: data.status,
            published_at: data.status === 'published' ? new Date(data.published_at).toISOString() : null,
            materials: data.materials.length > 0 ? (data.materials as unknown as import('@fortius/database').Json) : null,
        },
        data.authors.map((a, i) => ({
            name: a.name,
            name_en: a.name_en || null,
            role_es: a.role_es || null,
            role_en: a.role_en || null,
            bio_es: a.bio_es || null,
            bio_en: a.bio_en || null,
            image_url: a.image_url || null,
            linkedin: a.linkedin || null,
            email: a.email || null,
            display_order: i,
        }))
    );

    if (!article) throw new Error('Error al actualizar el artículo.');
    return article;
}

export async function deleteArticleAction(articleId: string) {
    await requireAdminUser();
    const ok = await deleteArticle(articleId);
    if (!ok) throw new Error('Error al eliminar el artículo.');
}

/** Fetches a single article with authors, mapped to ArticleFormData shape */
export async function getArticleById(articleId: string): Promise<Partial<ArticleFormData> | null> {
    const admin = createAdminClient();
    const { data } = await admin
        .from('articles')
        .select('*, article_authors(*)')
        .eq('id', articleId)
        .single();

    if (!data) return null;

    type RawAuthor = {
        name: string;
        name_en: string | null;
        role_es: string | null;
        role_en: string | null;
        bio_es: string | null;
        bio_en: string | null;
        image_url: string | null;
        linkedin: string | null;
        email: string | null;
    };

    const rawMaterials = Array.isArray(data.materials) ? data.materials : [];

    return {
        slug: data.slug,
        title_es: data.title_es,
        title_en: data.title_en ?? '',
        subtitle_es: data.subtitle_es ?? '',
        subtitle_en: data.subtitle_en ?? '',
        excerpt_es: data.excerpt_es ?? '',
        excerpt_en: data.excerpt_en ?? '',
        content_es: data.content_es,
        content_en: data.content_en ?? '',
        content_kind: data.content_kind ?? 'analisis',
        category: data.category,
        read_time: data.read_time ?? '',
        featured_image: data.featured_image ?? '',
        pull_quote_es: data.pull_quote_es ?? '',
        pull_quote_en: data.pull_quote_en ?? '',
        main_image_caption_es: data.main_image_caption_es ?? '',
        main_image_caption_en: data.main_image_caption_en ?? '',
        is_featured: data.is_featured ?? false,
        status: (data.status as 'draft' | 'published' | 'archived') ?? 'draft',
        published_at: data.published_at
            ? new Date(data.published_at).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
        authors: (data.article_authors as RawAuthor[]).map((a) => ({
            name: a.name,
            name_en: a.name_en ?? '',
            role_es: a.role_es ?? '',
            role_en: a.role_en ?? '',
            bio_es: a.bio_es ?? '',
            bio_en: a.bio_en ?? '',
            image_url: a.image_url ?? '',
            linkedin: a.linkedin ?? '',
            email: a.email ?? '',
        })),
        materials: rawMaterials.map((m: { label?: string; label_en?: string; url?: string }) => ({
            label: m.label ?? '',
            label_en: m.label_en ?? '',
            url: m.url ?? '',
        })),
    };
}
