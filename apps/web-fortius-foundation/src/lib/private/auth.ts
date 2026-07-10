import { createServerClient, createAdminClient } from "@fortius/database";
import { redirect } from "next/navigation";

const ORG_DOMAIN = "fundacionfortius.org";
const ORG_SLUG_FALLBACK =
  process.env.NEXT_PUBLIC_ORG_SLUG ?? "fortius-foundation";

export interface FoundationPrivateUser {
  id: string;
  email: string | undefined;
  fullName: string | null;
  role: string;
  tier: string | null;
  status: string | null;
  orgId: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isNextRedirect(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as Record<string, unknown>).digest === "string" &&
    (err as Record<string, string>).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function getFoundationOrgId(): Promise<string | null> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("organizations")
      .select("id")
      .or(`domain.eq.${ORG_DOMAIN},slug.eq.${ORG_SLUG_FALLBACK}`)
      .limit(1)
      .maybeSingle();
    return (data as { id: string } | null)?.id ?? null;
  } catch {
    return null;
  }
}

// ─── Auth guard ───────────────────────────────────────────────────────────────

/**
 * Used by all /area-privada pages.
 * Uses the admin client for DB lookups to bypass RLS, which avoids crashes
 * when the user is authenticated but the org or membership query is blocked
 * by an incomplete policy. Redirects to /login on any access issue.
 */
export async function requireFoundationPrivateUser(): Promise<FoundationPrivateUser> {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const admin = createAdminClient();

    // Org lookup
    const { data: orgData } = await admin
      .from("organizations")
      .select("id")
      .or(`domain.eq.${ORG_DOMAIN},slug.eq.${ORG_SLUG_FALLBACK}`)
      .limit(1)
      .maybeSingle();
    const orgId = (orgData as { id: string } | null)?.id ?? null;
    if (!orgId) redirect("/login");

    // Membership lookup
    const { data: membershipData } = await admin
      .from("user_memberships")
      .select("role, tier, status")
      .eq("user_id", user.id)
      .eq("organization_id", orgId)
      .eq("status", "active")
      .maybeSingle();
    const membership = membershipData as {
      role: string | null;
      tier: string | null;
      status: string | null;
    } | null;
    if (!membership) redirect("/login?error=sin-acceso");

    // Profile (non-critical)
    let fullName: string | null = null;
    try {
      const { data: profileData } = await admin
        .from("user_profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();
      fullName = (profileData as { full_name: string | null } | null)?.full_name ?? null;
    } catch {
      // Non-critical — proceed without display name
    }

    return {
      id: user.id,
      email: user.email,
      fullName,
      role: membership.role ?? "beneficiario",
      tier: membership.tier,
      status: membership.status,
      orgId,
    };
  } catch (err) {
    if (isNextRedirect(err)) throw err;
    console.error("[requireFoundationPrivateUser] unexpected error:", err);
    redirect("/login");
  }
}

/**
 * Used by /area-privada/admin pages (article CMS).
 * Wraps requireFoundationPrivateUser and additionally requires the role to be
 * 'admin' or 'super_admin'. Redirects to /area-privada otherwise.
 */
const ADMIN_ROLES = ["admin", "super_admin"] as const;

export async function requireFoundationAdminUser(): Promise<FoundationPrivateUser> {
  const user = await requireFoundationPrivateUser();
  if (!ADMIN_ROLES.includes(user.role as (typeof ADMIN_ROLES)[number])) {
    redirect("/area-privada");
  }
  return user;
}
