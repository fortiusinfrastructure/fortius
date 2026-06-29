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

type OrgRow = { id: string };
type MembershipRow = { role: string | null; tier: string | null; status: string | null };
type ProfileRow = { full_name: string | null };

async function lookupOrg(): Promise<OrgRow | null> {
  const admin = createAdminClient();

  const { data: byDomain } = await admin
    .from("organizations")
    .select("id")
    .eq("domain", ORG_DOMAIN)
    .maybeSingle();
  if (byDomain?.id) return byDomain as OrgRow;

  const { data: bySlug } = await admin
    .from("organizations")
    .select("id")
    .eq("slug", ORG_SLUG_FALLBACK)
    .maybeSingle();
  return (bySlug as OrgRow | null) ?? null;
}

export async function requireFoundationPrivateUser(): Promise<FoundationPrivateUser> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const org = await lookupOrg();
  if (!org) redirect("/login");

  const membershipRes = await supabase
    .from("user_memberships")
    .select("role, tier, status")
    .eq("user_id", user.id)
    .eq("organization_id", org.id)
    .eq("status", "active")
    .maybeSingle();
  const membership = membershipRes.data as MembershipRow | null;
  if (!membership) redirect("/login?error=sin-acceso");

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
    role: membership.role ?? "beneficiario",
    tier: membership.tier,
    status: membership.status,
    orgId: org.id,
  };
}
