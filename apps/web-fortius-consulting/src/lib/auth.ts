import { createServerClient, createAdminClient, getCurrentOrg, getUserMembership } from "@fortius/database";
import { redirect } from "next/navigation";

export interface ClientUser {
    id: string;
    email: string | undefined;
    planId: string;
    status: string;
}

export async function requireClientUser(): Promise<ClientUser> {
    const supabase = await createServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const org = await getCurrentOrg();
    const membership = org ? await getUserMembership(user.id, org.id) : null;

    return {
        id: user.id,
        email: user.email,
        planId: membership?.tier ?? "sin-plan",
        status: membership?.status ?? "inactive",
    };
}

/**
 * Used by /area-privada pages.
 * Fetches auth session + active membership (with role) using the admin client
 * to bypass RLS. Redirects to /login if not authenticated or no active membership.
 */
export interface PrivateUser {
    id: string;
    email: string | undefined;
    fullName: string | null;
    role: string;       // "admin" | "member" | etc.
    tier: string | null;
    status: string | null;
    orgId: string;
}

export async function requirePrivateUser(): Promise<PrivateUser> {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const admin = createAdminClient();
    const orgSlug = process.env.NEXT_PUBLIC_ORG_SLUG ?? "fortius-consulting";

    const { data: org } = await admin
        .from("organizations")
        .select("id")
        .eq("slug", orgSlug)
        .single();

    if (!org) redirect("/login");

    const { data: membership } = await admin
        .from("user_memberships")
        .select("role, tier, status")
        .eq("user_id", user.id)
        .eq("organization_id", org.id)
        .eq("status", "active")
        .maybeSingle();

    // No active membership → redirect with context
    if (!membership) redirect("/login?error=sin-acceso");

    // Fetch display name from user_profiles (auto-created by trigger on signup)
    const { data: profile } = await admin
        .from("user_profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();

    return {
        id: user.id,
        email: user.email,
        fullName: profile?.full_name ?? null,
        role: membership.role ?? "member",
        tier: membership.tier,
        status: membership.status,
        orgId: org.id,
    };
}

