import { createServerClient, getCurrentOrg, getUserMembership } from "@fortius/database";
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
 * Fetches auth session + active membership (with role) using the server
 * client so RLS is the security contract. Redirects to /login if not
 * authenticated or to /login?error=sin-acceso if no active membership.
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

type OrgRow = { id: string };
type MembershipRow = { role: string | null; tier: string | null; status: string | null };
type ProfileRow = { full_name: string | null };

export async function requirePrivateUser(): Promise<PrivateUser> {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const orgSlug = process.env.NEXT_PUBLIC_ORG_SLUG ?? "fortius-consulting";

    const orgRes = await supabase
        .from("organizations")
        .select("id")
        .eq("slug", orgSlug)
        .single();
    const org = orgRes.data as OrgRow | null;

    if (!org) redirect("/login");

    const membershipRes = await supabase
        .from("user_memberships")
        .select("role, tier, status")
        .eq("user_id", user.id)
        .eq("organization_id", org.id)
        .eq("status", "active")
        .maybeSingle();
    const membership = membershipRes.data as MembershipRow | null;

    // No active membership → redirect with context
    if (!membership) redirect("/login?error=sin-acceso");

    // Fetch display name from user_profiles (auto-created by trigger on signup)
    const profileRes = await supabase
        .from("user_profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();
    const profile = profileRes.data as ProfileRow | null;

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

/**
 * Used by /clients (consultant) pages.
 * Wraps requirePrivateUser and additionally requires the role to be one of:
 * 'consultant', 'admin', 'super_admin'. Redirects to /area-privada otherwise.
 */
const CONSULTANT_ROLES = ["consultant", "admin", "super_admin"] as const;

export async function requireConsultantUser(): Promise<PrivateUser> {
    const user = await requirePrivateUser();
    if (!CONSULTANT_ROLES.includes(user.role as (typeof CONSULTANT_ROLES)[number])) {
        redirect("/area-privada");
    }
    return user;
}
