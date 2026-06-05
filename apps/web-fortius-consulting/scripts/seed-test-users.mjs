/**
 * Seed: creates two test users for the Fortius Consulting private area.
 *
 *   juan@fortiusconsulting.org  — role: admin  (CEO dashboard)
 *   diego@fortiusconsulting.org — role: member (Client dashboard)
 *
 * Usage:
 *   pnpm users:seed
 *
 * Requires (in .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Idempotent — safe to re-run. Uses upsert on email.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(__dirname, "..");

// Load .env.local manually (same pattern as other seed scripts)
try {
    const env = readFileSync(resolve(APP_ROOT, ".env.local"), "utf8");
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

async function getOrgId() {
    const { data } = await admin.from("organizations").select("id").eq("slug", ORG_SLUG).maybeSingle();
    if (!data) throw new Error(`Organization '${ORG_SLUG}' not found. Run seed-articles.mjs first.`);
    return data.id;
}

async function getOrCreateUser(email, password, fullName) {
    // Check if user already exists in auth
    const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 500 });
    const existing = users.find(u => u.email === email);

    if (existing) {
        console.log(`  ↺  user exists: ${email} (${existing.id})`);
        return existing.id;
    }

    // Create new user with confirmed email
    const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
    });

    if (error || !data.user) {
        throw new Error(`Failed to create ${email}: ${error?.message}`);
    }

    console.log(`  ✓  created user: ${email} (${data.user.id})`);
    return data.user.id;
}

async function upsertMembership(userId, orgId, role, tier) {
    const { data: existing } = await admin
        .from("user_memberships")
        .select("id")
        .eq("user_id", userId)
        .eq("organization_id", orgId)
        .maybeSingle();

    const row = {
        user_id: userId,
        organization_id: orgId,
        role,
        tier,
        status: "active",
        joined_at: new Date().toISOString(),
    };

    if (existing) {
        await admin.from("user_memberships").update(row).eq("id", existing.id);
        console.log(`  ↺  membership updated: role=${role}, tier=${tier}`);
    } else {
        const { error } = await admin.from("user_memberships").insert(row);
        if (error) throw new Error(`Membership insert failed: ${error.message}`);
        console.log(`  ✓  membership created: role=${role}, tier=${tier}`);
    }
}

async function upsertMockSubscription(userId, orgId) {
    // Check if a plan exists for politica-basica monthly
    const { data: plan } = await admin
        .from("membership_plans")
        .select("id")
        .eq("organization_id", orgId)
        .eq("tier", "politica-basica")
        .eq("interval", "monthly")
        .maybeSingle();

    const planId = plan?.id ?? "00000000-0000-0000-0000-000000000000";

    const { data: existing } = await admin
        .from("subscriptions")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

    if (existing) {
        console.log(`  ↺  subscription already exists for member`);
        return;
    }

    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const { error } = await admin.from("subscriptions").insert({
        user_id: userId,
        plan_id: planId,
        stripe_subscription_id: "sub_test_seed_diego",
        stripe_customer_id: "cus_test_seed_diego",
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: nextMonth.toISOString(),
        cancel_at_period_end: false,
        metadata: { source: "seed-script", tier: "politica-basica", interval: "monthly" },
    });

    if (error) {
        console.warn(`  ⚠️  subscription insert failed (may lack plan): ${error.message}`);
    } else {
        console.log(`  ✓  mock subscription created`);
    }
}

async function main() {
    console.log("🚀 Fortius Consulting — seed-test-users");
    const orgId = await getOrgId();
    console.log(`   Org ID: ${orgId}\n`);

    // --- CEO / Admin ---
    console.log("👤 juan@fortiusconsulting.org (admin)");
    const juanId = await getOrCreateUser(
        "juan@fortiusconsulting.org",
        "FortiusCEO2026!",
        "Juan Ángel Soto Gómez",
    );
    await upsertMembership(juanId, orgId, "admin", "admin");

    console.log("");

    // --- Client / Member ---
    console.log("👤 diego@fortiusconsulting.org (member)");
    const diegoId = await getOrCreateUser(
        "diego@fortiusconsulting.org",
        "FortiusCliente2026!",
        "Diego Salazar Ramírez",
    );
    await upsertMembership(diegoId, orgId, "member", "politica-basica");
    await upsertMockSubscription(diegoId, orgId);

    console.log("\n✅ Done — test users ready.");
    console.log("   CEO:    juan@fortiusconsulting.org  /  FortiusCEO2026!");
    console.log("   Client: diego@fortiusconsulting.org /  FortiusCliente2026!");
}

main().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
