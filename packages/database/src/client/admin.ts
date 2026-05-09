import { createClient } from '@supabase/supabase-js';

// ONLY use this from secure server environments like API routes.
// This bypasses Row Level Security.
// Intentionally untyped because this client is often used against tables
// that evolve faster than the generated database helpers.
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

