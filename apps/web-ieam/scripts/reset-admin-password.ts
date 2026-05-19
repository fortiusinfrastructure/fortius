/**
 * Reset admin password using Supabase Service Role Key.
 *
 * Uso:
 *   pnpm tsx apps/web-ieam/scripts/reset-admin-password.ts <email> <newPassword>
 *
 * Ejemplo:
 *   pnpm tsx apps/web-ieam/scripts/reset-admin-password.ts camille.dock@ieam.es "NuevaClaveSegura123!"
 *
 * Requiere en apps/web-ieam/.env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const [, , email, newPassword] = process.argv;

if (!email || !newPassword) {
    console.error('❌ Usage: pnpm tsx scripts/reset-admin-password.ts <email> <newPassword>');
    process.exit(1);
}

if (newPassword.length < 8) {
    console.error('❌ Password must be at least 8 characters.');
    process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
    console.log(`🔐 Resetting password for ${email}...`);

    // 1. Find user by email
    const { data: list, error: listErr } = await admin.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
    });

    if (listErr) {
        console.error('❌ Failed to list users:', listErr.message);
        process.exit(1);
    }

    const user = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
        console.error(`❌ User not found: ${email}`);
        process.exit(1);
    }

    console.log(`   Found user id: ${user.id}`);

    // 2. Update password
    const { error: updErr } = await admin.auth.admin.updateUserById(user.id, {
        password: newPassword,
        email_confirm: true,
    });

    if (updErr) {
        console.error('❌ Failed to update password:', updErr.message);
        process.exit(1);
    }

    console.log('✅ Password updated successfully.');
    console.log(`   Login at /admin/login with ${email}`);
}

main().catch((err) => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
});
