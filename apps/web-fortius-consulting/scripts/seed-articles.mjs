/**
 * Seed: import src/data/articles.json into Supabase `articles`.
 *
 * Usage:
 *   pnpm run articulos:seed
 *
 * Requires (in apps/web-fortius-consulting/.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Idempotent — upserts on (organization_id, slug).
 * Ensures the `fortius-consulting` organization exists.
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(APP_ROOT, ".env.local") });
dotenv.config({ path: path.join(APP_ROOT, ".env") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ORG_SLUG = "fortius-consulting";
const ORG_NAME = "Fortius Consulting";
const ORG_DOMAIN = "fortiusconsulting.org";

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
    process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function ensureOrg() {
    const { data: existing } = await admin
        .from("organizations")
        .select("id")
        .eq("slug", ORG_SLUG)
        .maybeSingle();
    if (existing?.id) return existing.id;

    const { data, error } = await admin
        .from("organizations")
        .insert({ slug: ORG_SLUG, name: ORG_NAME, domain: ORG_DOMAIN })
        .select("id")
        .single();
    if (error) throw new Error(`Cannot create org: ${error.message}`);
    console.log(`  + created organization ${ORG_SLUG}`);
    return data.id;
}

async function seedArticles(orgId, articles) {
    let inserted = 0;
    let skipped = 0;

    for (const a of articles) {
        const publishedAtIso = a.published_at
            ? `${a.published_at}T00:00:00Z`
            : null;

        const { error } = await admin.from("articles").upsert(
            {
                organization_id: orgId,
                slug: a.slug,
                title_es: a.title,
                excerpt_es: a.excerpt || null,
                content_es: a.content_markdown,
                category: a.category,
                published_at: publishedAtIso,
                status: "published",
                metadata: {
                    access_level: a.access,
                    kind: a.kind,
                    subproducts: a.subproducts ?? [],
                    source_file: a.source_file,
                    content_format: "markdown",
                },
            },
            { onConflict: "organization_id,slug", ignoreDuplicates: false },
        );

        if (error) {
            console.error(`  ✗ ${a.slug}: ${error.message}`);
            skipped++;
            continue;
        }
        console.log(`  ✓ ${a.slug} (${a.access})`);
        inserted++;
    }

    return { inserted, skipped };
}

async function main() {
    console.log("🚀 Fortius Consulting — articles seed");
    console.log(`   Supabase: ${SUPABASE_URL}`);

    const jsonPath = path.join(APP_ROOT, "src", "data", "articles.json");
    const raw = await fs.readFile(jsonPath, "utf8");
    const articles = JSON.parse(raw);
    console.log(`   Source:   ${path.relative(APP_ROOT, jsonPath)} (${articles.length} rows)`);

    const orgId = await ensureOrg();
    console.log(`   Org ID:   ${orgId}`);

    const { inserted, skipped } = await seedArticles(orgId, articles);
    console.log(`\n✅ Done — ${inserted} upserted, ${skipped} errors.`);
}

main().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
