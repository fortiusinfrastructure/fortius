/**
 * Seed: upsert membership_plans for fortius-consulting into Supabase.
 *
 * Usage:
 *   pnpm run plans:seed
 *
 * Requires (in apps/web-fortius-consulting/.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   STRIPE_PRICE_CONSULTING_* (all 8 price env vars)
 *
 * Idempotent — upserts on stripe_price_id within the org.
 * tier = planKey (e.g. "politica-premium") to be unique per plan+interval combo.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
try {
    const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
    for (const line of env.split("\n")) {
        const [key, ...rest] = line.split("=");
        if (key && rest.length && !key.startsWith("#") && !process.env[key.trim()]) {
            process.env[key.trim()] = rest.join("=").trim();
        }
    }
} catch { /* .env.local optional in CI */ }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ORG_SLUG = "fortius-consulting";

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

/** Each entry maps a planKey+interval to DB fields + env var name for stripe_price_id */
const PLANS = [
    { tier: "sociedad-civil-basica",  interval: "monthly", name: "Sociedad Civil — Básico mensual",  priceEuros: 1000,  envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_BASICA_MONTHLY",  order: 0 },
    { tier: "sociedad-civil-basica",  interval: "annual",  name: "Sociedad Civil — Básico anual",    priceEuros: 12000, envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_BASICA_ANNUAL",   order: 1 },
    { tier: "sociedad-civil-premium", interval: "monthly", name: "Sociedad Civil — Premium mensual", priceEuros: 2000,  envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_PREMIUM_MONTHLY", order: 2 },
    { tier: "sociedad-civil-premium", interval: "annual",  name: "Sociedad Civil — Premium anual",   priceEuros: 24000, envVar: "STRIPE_PRICE_CONSULTING_SOCIEDAD_CIVIL_PREMIUM_ANNUAL",  order: 3 },
    { tier: "politica-basica",        interval: "monthly", name: "Política — Básico mensual",         priceEuros: 1500,  envVar: "STRIPE_PRICE_CONSULTING_POLITICA_BASICA_MONTHLY",        order: 4 },
    { tier: "politica-basica",        interval: "annual",  name: "Política — Básico anual",           priceEuros: 18000, envVar: "STRIPE_PRICE_CONSULTING_POLITICA_BASICA_ANNUAL",         order: 5 },
    { tier: "politica-premium",       interval: "monthly", name: "Política — Premium mensual",        priceEuros: 3000,  envVar: "STRIPE_PRICE_CONSULTING_POLITICA_PREMIUM_MONTHLY",       order: 6 },
    { tier: "politica-premium",       interval: "annual",  name: "Política — Premium anual",          priceEuros: 36000, envVar: "STRIPE_PRICE_CONSULTING_POLITICA_PREMIUM_ANNUAL",        order: 7 },
];

async function getOrgId() {
    const { data } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
    if (!data) throw new Error(`Organization '${ORG_SLUG}' not found. Run seed-articles.mjs first.`);
    return data.id;
}

async function main() {
    console.log("🚀 Fortius Consulting — membership_plans seed");
    const orgId = await getOrgId();
    console.log(`   Org ID: ${orgId}`);

    let upserted = 0, skipped = 0;

    for (const plan of PLANS) {
        const stripePrice = process.env[plan.envVar];

        if (!stripePrice) {
            console.warn(`  ⚠️  ${plan.envVar} not set — skipping "${plan.name}"`);
            skipped++;
            continue;
        }

        // Check if row already exists by stripe_price_id for this org
        const { data: existing } = await admin
            .from("membership_plans")
            .select("id")
            .eq("organization_id", orgId)
            .eq("stripe_price_id", stripePrice)
            .maybeSingle();

        const row = {
            organization_id: orgId,
            name: plan.name,
            tier: plan.tier,
            price_cents: plan.priceEuros * 100,
            currency: "eur",
            interval: plan.interval,
            stripe_price_id: stripePrice,
            is_active: true,
            display_order: plan.order,
            features: [],
        };

        if (existing) {
            await admin.from("membership_plans").update(row).eq("id", existing.id);
            console.log(`  ↺  updated: ${plan.name}`);
        } else {
            // Use crypto.randomUUID() if available (Node 19+), otherwise let DB generate
            const { error } = await admin.from("membership_plans").insert({ id: crypto.randomUUID(), ...row });
            if (error) { console.error(`  ✗  ${plan.name}: ${error.message}`); skipped++; continue; }
            console.log(`  ✓  created: ${plan.name}`);
        }
        upserted++;
    }

    console.log(`\n✅ Done — ${upserted} plans seeded, ${skipped} skipped.`);
}

main().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
