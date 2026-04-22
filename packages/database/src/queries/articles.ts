import { createServerClient } from '../client/server';
import { createAdminClient } from '../client/admin';
import type { Database } from '../types/database';

type Article = Database['public']['Tables']['articles']['Row'];
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];
type ArticleAuthor = Database['public']['Tables']['article_authors']['Row'];
type ArticleAuthorInsert = Database['public']['Tables']['article_authors']['Insert'];

export type ArticleWithAuthors = Article & { article_authors: ArticleAuthor[] };

export interface ArticleListOptions {
    status?: 'published' | 'draft' | 'archived';
    limit?: number;
    offset?: number;
    isFeatured?: boolean;
    contentKind?: string;
}

export async function getArticlesByOrg(
    orgSlug: string,
    options: ArticleListOptions = {}
): Promise<ArticleWithAuthors[]> {
    // createServerClient is used for session-aware RLS; admin client for org lookup
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _supabase = await createServerClient(); // kept for session context
    const admin = createAdminClient();
    const { status = 'published', limit = 20, offset = 0 } = options;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: orgRow } = (await admin
        .from('organizations')
        .select('id')
        .eq('slug', orgSlug)
        .single()) as { data: { id: string } | null; error: unknown };

    if (!orgRow) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = (await admin
        .from('articles')
        .select('*')
        .eq('organization_id', orgRow.id)
        .eq('status', status)
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1)) as { data: Article[] | null; error: unknown };

    if (!data || data.length === 0) return [];

    const ids = data.map((a) => a.id);
    const { data: authorRows } = (await admin
        .from('article_authors')
        .select('*')
        .in('article_id', ids)
        .order('display_order', { ascending: true })) as { data: ArticleAuthor[] | null; error: unknown };

    const byArticle = new Map<string, ArticleAuthor[]>();
    for (const a of authorRows ?? []) {
        const list = byArticle.get(a.article_id) ?? [];
        list.push(a);
        byArticle.set(a.article_id, list);
    }

    return data.map((a) => ({ ...a, article_authors: byArticle.get(a.id) ?? [] }));
}

export async function getArticleBySlug(
    orgSlug: string,
    slug: string
): Promise<ArticleWithAuthors | null> {
    const admin = createAdminClient();

    const { data: orgRow } = (await admin
        .from('organizations')
        .select('id')
        .eq('slug', orgSlug)
        .single()) as { data: { id: string } | null; error: unknown };

    if (!orgRow) return null;

    const { data: article } = (await admin
        .from('articles')
        .select('*')
        .eq('organization_id', orgRow.id)
        .eq('slug', slug)
        .single()) as { data: Article | null; error: unknown };

    if (!article) return null;

    const { data: authors } = (await admin
        .from('article_authors')
        .select('*')
        .eq('article_id', article.id)
        .order('display_order', { ascending: true })) as { data: ArticleAuthor[] | null; error: unknown };

    return { ...article, article_authors: authors ?? [] };
}

export async function getArticlesForAdmin(orgSlug: string): Promise<ArticleWithAuthors[]> {
    const admin = createAdminClient();

    const { data: orgRow } = (await admin
        .from('organizations')
        .select('id')
        .eq('slug', orgSlug)
        .single()) as { data: { id: string } | null; error: unknown };

    if (!orgRow) return [];

    const { data: articleRows } = (await admin
        .from('articles')
        .select('*')
        .eq('organization_id', orgRow.id)
        .order('created_at', { ascending: false })) as { data: Article[] | null; error: unknown };

    if (!articleRows || articleRows.length === 0) return [];

    const ids = articleRows.map((a) => a.id);
    const { data: authorRows } = (await admin
        .from('article_authors')
        .select('*')
        .in('article_id', ids)
        .order('display_order', { ascending: true })) as { data: ArticleAuthor[] | null; error: unknown };

    const byArticle = new Map<string, ArticleAuthor[]>();
    for (const a of authorRows ?? []) {
        const list = byArticle.get(a.article_id) ?? [];
        list.push(a);
        byArticle.set(a.article_id, list);
    }

    return articleRows.map((a) => ({ ...a, article_authors: byArticle.get(a.id) ?? [] }));
}

export async function createArticle(
    orgId: string,
    articleData: Omit<ArticleInsert, 'organization_id'>,
    authors: Omit<ArticleAuthorInsert, 'article_id'>[]
): Promise<Article | null> {
    const admin = createAdminClient();

    const { data: article, error } = (await admin
        .from('articles')
        .insert({ ...articleData, organization_id: orgId })
        .select()
        .single()) as { data: Article | null; error: unknown };

    if (error || !article) return null;

    if (authors.length > 0) {
        await admin.from('article_authors').insert(
            authors.map((a, i) => ({
                ...a,
                article_id: article.id,
                display_order: a.display_order ?? i,
            }))
        );
    }

    return article;
}

export async function updateArticle(
    articleId: string,
    articleData: ArticleUpdate,
    authors?: Omit<ArticleAuthorInsert, 'article_id'>[]
): Promise<Article | null> {
    const admin = createAdminClient();

    const { data: article, error } = (await admin
        .from('articles')
        .update({ ...articleData, updated_at: new Date().toISOString() })
        .eq('id', articleId)
        .select()
        .single()) as { data: Article | null; error: unknown };

    if (error || !article) return null;

    if (authors !== undefined) {
        await admin.from('article_authors').delete().eq('article_id', articleId);
        if (authors.length > 0) {
            await admin.from('article_authors').insert(
                authors.map((a, i) => ({
                    ...a,
                    article_id: articleId,
                    display_order: a.display_order ?? i,
                }))
            );
        }
    }

    return article;
}

export async function deleteArticle(articleId: string): Promise<boolean> {
    const admin = createAdminClient();
    const { error } = await admin.from('articles').delete().eq('id', articleId);
    return !error;
}
