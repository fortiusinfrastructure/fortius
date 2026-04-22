import { createAdminClient } from '@fortius/database';
import type { ArticleFormData } from '@fortius/admin-ui';

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
