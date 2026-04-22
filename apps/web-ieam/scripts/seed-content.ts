/**
 * Seed script: migra mock data de IEAM a Supabase.
 *
 * Uso:
 *   pnpm tsx apps/web-ieam/scripts/seed-content.ts
 *
 * Requiere las variables de entorno en apps/web-ieam/.env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Es IDEMPOTENTE: usa ON CONFLICT DO NOTHING via slug único.
 */

import { createClient } from '@supabase/supabase-js';
import { articles } from '../src/lib/mock-data/articles';
import { events } from '../src/lib/mock-data/events';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ORG_SLUG = 'ieam';

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function getOrgId(): Promise<string> {
    const { data, error } = await admin.from('organizations').select('id').eq('slug', ORG_SLUG).single();
    if (error || !data) throw new Error(`Org '${ORG_SLUG}' not found. Run migrations first.`);
    return data.id;
}

function parseDateToISO(dateStr: string): string {
    // Handles "14 Abr 2026" format
    const MONTHS: Record<string, string> = {
        ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06',
        jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12',
        jan: '01', apr: '04', aug: '08', dec: '12',
    };

    const parts = dateStr.toLowerCase().split(/\s+/);
    if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = MONTHS[parts[1].slice(0, 3)] ?? '01';
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }

    // Try direct parsing
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];

    return new Date().toISOString().split('T')[0];
}

async function seedArticles(orgId: string) {
    console.log(`\n📄 Seeding ${articles.length} articles...`);
    let inserted = 0;
    let skipped = 0;

    for (const article of articles) {
        // Upsert article
        const { data: upserted, error } = await admin
            .from('articles')
            .upsert(
                {
                    organization_id: orgId,
                    slug: article.slug,
                    title_es: article.title,
                    title_en: article.title_en ?? null,
                    subtitle_es: article.subtitle ?? null,
                    subtitle_en: article.subtitle_en ?? null,
                    excerpt_es: null,
                    excerpt_en: null,
                    content_es: article.content,
                    content_en: article.content_en ?? null,
                    content_kind: article.contentKind,
                    category: article.category,
                    read_time: article.readTime ?? null,
                    featured_image: article.heroImage ?? null,
                    pull_quote_es: article.pullQuote ?? null,
                    pull_quote_en: article.pullQuote_en ?? null,
                    main_image_caption_es: article.mainImageCaption ?? null,
                    main_image_caption_en: article.mainImageCaption_en ?? null,
                    is_featured: false,
                    status: 'published',
                    published_at: parseDateToISO(article.publishDate) + 'T00:00:00Z',
                    materials: article.materials && article.materials.length > 0
                        ? article.materials
                        : null,
                    metadata: {
                        featured_image_en: article.heroImage_en ?? null,
                        main_image: article.mainImage ?? null,
                        main_image_en: article.mainImage_en ?? null,
                    },
                },
                { onConflict: 'organization_id,slug', ignoreDuplicates: false }
            )
            .select('id')
            .single();

        if (error) {
            console.error(`  ✗ ${article.slug}: ${error.message}`);
            skipped++;
            continue;
        }

        // Upsert authors
        if (upserted) {
            await admin.from('article_authors').delete().eq('article_id', upserted.id);

            const authorsList = article.authors ?? [article.author];
            if (authorsList.length > 0) {
                await admin.from('article_authors').insert(
                    authorsList.map((author, i) => ({
                        article_id: upserted.id,
                        name: author.name,
                        name_en: author.name_en ?? null,
                        role_es: author.role,
                        role_en: author.role_en ?? null,
                        bio_es: author.bio ?? null,
                        bio_en: author.bio_en ?? null,
                        image_url: author.image ?? null,
                        display_order: i,
                    }))
                );
            }
        }

        console.log(`  ✓ ${article.slug}`);
        inserted++;
    }

    console.log(`  Done: ${inserted} inserted/updated, ${skipped} errors.`);
}

async function seedEvents(orgId: string) {
    console.log(`\n📅 Seeding ${events.length} events...`);
    let inserted = 0;
    let skipped = 0;

    for (const event of events) {
        const { data: upserted, error } = await admin
            .from('activities')
            .upsert(
                {
                    organization_id: orgId,
                    slug: event.slug,
                    title_es: event.title,
                    title_en: event.title_en ?? null,
                    subtitle_es: event.subtitle ?? null,
                    subtitle_en: event.subtitle_en ?? null,
                    excerpt_es: event.summary ?? null,
                    excerpt_en: event.summary_en ?? null,
                    content_es: event.content ?? '',
                    content_en: event.content_en ?? null,
                    type: event.category ?? null,
                    format: event.format ?? null,
                    format_en: event.format_en ?? null,
                    event_date: parseDateToISO(event.date),
                    location: event.location ?? null,
                    organizer: 'IEAM',
                    image_url: event.heroImage ?? null,
                    highlight_image_url: event.highlightImage ?? null,
                    agenda_title_es: event.agendaTitle ?? 'Programa del evento',
                    agenda_title_en: event.agendaTitle_en ?? 'Event Programme',
                    agenda: event.agenda && event.agenda.length > 0 ? event.agenda : null,
                    is_featured: false,
                    registration_open: false,
                    status: 'published',
                    metadata: {
                        hero_image_en: event.heroImage_en ?? null,
                    },
                },
                { onConflict: 'organization_id,slug', ignoreDuplicates: false }
            )
            .select('id')
            .single();

        if (error) {
            console.error(`  ✗ ${event.slug}: ${error.message}`);
            skipped++;
            continue;
        }

        // Upsert speakers
        if (upserted && event.speakers.length > 0) {
            await admin.from('activity_speakers').delete().eq('activity_id', upserted.id);
            await admin.from('activity_speakers').insert(
                event.speakers.map((s, i) => ({
                    activity_id: upserted.id,
                    name: s.name,
                    role_es: s.role ?? null,
                    role_en: s.role_en ?? null,
                    group_name_es: s.group ?? null,
                    group_name_en: s.group_en ?? null,
                    display_order: i,
                }))
            );
        }

        console.log(`  ✓ ${event.slug}`);
        inserted++;
    }

    console.log(`  Done: ${inserted} inserted/updated, ${skipped} errors.`);
}

async function main() {
    console.log('🚀 IEAM Content Seed Script');
    console.log(`   Supabase: ${SUPABASE_URL}`);

    const orgId = await getOrgId();
    console.log(`   Org ID: ${orgId}`);

    await seedArticles(orgId);
    await seedEvents(orgId);

    console.log('\n✅ Seed complete!');
    console.log('   Next step: verify data in Supabase table editor.');
}

main().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
