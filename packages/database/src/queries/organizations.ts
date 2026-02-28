import { createServerClient } from '../client/server';
import type { Database } from '../types/database';

type Organization = Database['public']['Tables']['organizations']['Row'];
type Membership = Database['public']['Tables']['user_memberships']['Row'];

/**
 * Gets the current organization details based on the environment slug.
 * This is cached per request in Next.js.
 */
export async function getCurrentOrg(): Promise<Organization | null> {
    const supabase = await createServerClient();
    const slug = process.env.NEXT_PUBLIC_ORG_SLUG;

    if (!slug) return null;

    const { data } = await supabase
        .from('organizations')
        .select('*')
        .eq('slug', slug)
        .single();

    return data;
}

/**
 * Checks if the given user is an active member of the organization.
 */
export async function getUserMembership(userId: string, orgId: string): Promise<Membership | null> {
    const supabase = await createServerClient();

    // Using supabase admin client here might be necessary if RLS blocks reads,
    // but since we added "Users can read own memberships" policy, the server client
    // (which passes the user's cookies) will work correctly.
    const { data } = await supabase
        .from('user_memberships')
        .select('*')
        .eq('user_id', userId)
        .eq('organization_id', orgId)
        .eq('status', 'active')
        .single();

    return data;
}
