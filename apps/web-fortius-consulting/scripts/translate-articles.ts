/**
 * One-time batch translation script: ES → EN for all Consulting articles.
 *
 * Uso (desde la raíz del monorepo):
 *   pnpm tsx apps/web-fortius-consulting/scripts/translate-articles.ts
 *
 * Requiere en apps/web-fortius-consulting/.env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ANTHROPIC_API_KEY
 *
 * Idempotente: solo procesa artículos donde title_en IS NULL.
 * Seguro re-ejecutar si falla a mitad.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const ORG_SLUG = 'fortius-consulting';

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}
if (!ANTHROPIC_API_KEY) {
    console.error('❌  Missing ANTHROPIC_API_KEY — add it to apps/web-fortius-consulting/.env.local');
    process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

interface ArticleRow {
    id: string;
    slug: string;
    title_es: string | null;
    excerpt_es: string | null;
    content_es: string | null;
}

interface Translation {
    title: string;
    excerpt: string;
    content: string;
}

function buildPrompt(title: string, excerpt: string, content: string): string {
    return `Translate the following three fields from Spanish to English for a political consulting firm's editorial website.

Rules:
- Preserve ALL HTML tags, attributes, and Markdown syntax exactly as-is
- Only translate human-readable text inside tags or between Markdown elements
- Keep proper nouns, party names, country names, and acronyms unless they have a standard English form
- Use formal, professional register appropriate for political analysis
- Return ONLY valid JSON with exactly these keys: title, excerpt, content

TITLE:
${title}

EXCERPT:
${excerpt}

CONTENT:
${content}`;
}

async function callClaude(prompt: string, model = 'claude-haiku-4-5-20251001', max_tokens = 8192): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model,
            max_tokens,
            messages: [{ role: 'user', content: prompt }],
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Anthropic API error ${response.status}: ${err}`);
    }

    const data = await response.json() as { content: Array<{ text: string }> };
    return data.content[0]?.text ?? '';
}

async function translateField(text: string): Promise<string> {
    if (!text.trim()) return '';
    const raw = await callClaude(
        `Translate the following from Spanish to English for a political consulting firm's editorial website.\nPreserve ALL HTML tags, attributes, and Markdown syntax exactly as-is.\nReturn ONLY the translated text with no explanation.\n\n${text}`,
        'claude-sonnet-4-6',
        16000,
    );
    return raw.trim();
}

async function translateArticle(row: ArticleRow): Promise<Translation | null> {
    const title_es = row.title_es ?? '';
    const excerpt_es = row.excerpt_es ?? '';
    const content_es = row.content_es ?? '';

    if (!title_es && !excerpt_es && !content_es) return null;

    // Primary: combined call (1 API call, fast)
    try {
        const raw = await callClaude(buildPrompt(title_es, excerpt_es, content_es));
        const cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```\s*$/, '').trim();
        return JSON.parse(cleaned) as Translation;
    } catch {
        // Fallback: translate each field separately with Sonnet (handles long content)
        process.stdout.write('(retrying with Sonnet) ');
        const [title, excerpt, content] = await Promise.all([
            translateField(title_es),
            translateField(excerpt_es),
            translateField(content_es),
        ]);
        return { title, excerpt, content };
    }
}

async function main() {
    console.log('🔍  Looking up org…');

    const { data: org, error: orgError } = await admin
        .from('organizations')
        .select('id')
        .eq('slug', ORG_SLUG)
        .maybeSingle();

    if (orgError || !org) {
        console.error('❌  Could not find org', ORG_SLUG, orgError);
        process.exit(1);
    }

    console.log(`✅  Org ID: ${org.id}`);

    const { data: articles, error: fetchError } = await admin
        .from('articles')
        .select('id, slug, title_es, excerpt_es, content_es')
        .eq('organization_id', org.id)
        .is('title_en', null);

    if (fetchError) {
        console.error('❌  Could not fetch articles:', fetchError);
        process.exit(1);
    }

    if (!articles || articles.length === 0) {
        console.log('✅  No untranslated articles found. All done!');
        return;
    }

    console.log(`\n📄  ${articles.length} article(s) to translate\n`);

    let success = 0;
    let skipped = 0;
    let failed = 0;

    for (const article of articles as ArticleRow[]) {
        process.stdout.write(`  → [${article.slug}] translating… `);

        try {
            const translation = await translateArticle(article);

            if (!translation) {
                console.log('skipped (empty source)');
                skipped++;
                continue;
            }

            const { error: updateError } = await admin
                .from('articles')
                .update({
                    title_en: translation.title,
                    excerpt_en: translation.excerpt,
                    content_en: translation.content,
                })
                .eq('id', article.id);

            if (updateError) {
                console.log(`❌  DB update failed: ${updateError.message}`);
                failed++;
            } else {
                console.log('✅');
                success++;
            }
        } catch (err) {
            console.log(`❌  ${err instanceof Error ? err.message : String(err)}`);
            failed++;
        }
    }

    console.log(`\n────────────────────────────`);
    console.log(`✅  Translated:  ${success}`);
    console.log(`⏭   Skipped:     ${skipped}`);
    console.log(`❌  Failed:      ${failed}`);
    console.log(`────────────────────────────`);

    if (failed > 0) {
        console.log('\nRe-run the script to retry failed articles.');
        process.exit(1);
    }
}

main().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
