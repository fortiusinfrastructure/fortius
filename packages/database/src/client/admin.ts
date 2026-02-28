import { createClient } from '@supabase/supabase-js';

// ONLY use this from secure server environments like API routes
// This bypasses Row Level Security!
// Intentionally untyped — the admin client operates on tables that may not
// be reflected in the auto-generated Database types (e.g. stripe_events).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}

