'use server';

import { createServerClient } from '@fortius/database';
import { createAdminClient } from '@fortius/database';
import { redirect } from 'next/navigation';

const IEAM_ORG_SLUG = 'ieam';
const ADMIN_ROLES = ['editor', 'admin', 'super_admin'] as const;

export interface AdminUser {
    id: string;
    email: string | undefined;
    role: string;
    orgId: string;
}

/** Validates session and editor/admin role. Redirects to login if fails. */
export async function requireAdminUser(): Promise<AdminUser> {
    const supabase = await createServerClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect('/admin/login');
    }

    const admin = createAdminClient();

    const { data: org } = await admin
        .from('organizations')
        .select('id')
        .eq('slug', IEAM_ORG_SLUG)
        .single();

    if (!org) redirect('/admin/login');

    const { data: membership } = await admin
        .from('user_memberships')
        .select('role')
        .eq('user_id', user.id)
        .eq('organization_id', org.id)
        .eq('status', 'active')
        .single();

    if (!membership || !ADMIN_ROLES.includes(membership.role as (typeof ADMIN_ROLES)[number])) {
        redirect('/admin/unauthorized');
    }

    return {
        id: user.id,
        email: user.email,
        role: membership.role!,
        orgId: org.id,
    };
}

export async function signInAdmin(email: string, password: string) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
}

export async function signOutAdmin() {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
}
