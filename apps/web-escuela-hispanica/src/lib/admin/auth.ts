'use server';

import { createAdminClient, createServerClient } from '@fortius/database';
import { redirect } from 'next/navigation';
import { getAdminOrganization } from './org';

const ADMIN_ROLES = ['editor', 'admin', 'super_admin'] as const;

export interface AdminUser {
    id: string;
    email: string | undefined;
    role: string;
    orgId: string;
}

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
    const org = await getAdminOrganization();
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

export async function signOutAdmin() {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
    redirect('/admin/login');
}