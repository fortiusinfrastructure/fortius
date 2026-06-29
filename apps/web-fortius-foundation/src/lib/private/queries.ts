/**
 * Server-side queries for Foundation /area-privada dashboards.
 * Uses createAdminClient to bypass RLS — called directly from Server Components,
 * never from client code. No 'use server' directive here.
 */
import { createAdminClient } from "@fortius/database";

// ─── Donation history (Donante) ───────────────────────────────────────────────

export interface DonationRecord {
  id: string;
  amountCents: number;
  currency: string;
  status: string;
  description: string | null;
  createdAt: string | null;
}

export async function getDonationHistory(userId: string): Promise<DonationRecord[]> {
  const admin = createAdminClient();

  const { data } = await admin
    .from("payment_history")
    .select("id, amount_cents, currency, status, description, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    amountCents: row.amount_cents,
    currency: row.currency ?? "eur",
    status: row.status,
    description: row.description ?? null,
    createdAt: row.created_at ?? null,
  }));
}

// ─── Admin dashboard ──────────────────────────────────────────────────────────

export interface FoundationMemberRecord {
  userId: string;
  email: string;
  fullName: string | null;
  role: string | null;
  status: string | null;
  joinedAt: string | null;
}

export interface FoundationAdminData {
  members: FoundationMemberRecord[];
  totalBeneficiarios: number;
  totalDonantes: number;
  totalActive: number;
}

export async function getFoundationAdminData(orgId: string): Promise<FoundationAdminData> {
  const admin = createAdminClient();

  const { data: memberships } = await admin
    .from("user_memberships")
    .select("user_id, role, status, joined_at")
    .eq("organization_id", orgId)
    .order("joined_at", { ascending: false });

  const memberList = memberships ?? [];
  const userIds = memberList.map((m) => m.user_id);

  if (userIds.length === 0) {
    return { members: [], totalBeneficiarios: 0, totalDonantes: 0, totalActive: 0 };
  }

  const [profilesResult, authResult] = await Promise.all([
    admin.from("user_profiles").select("user_id, full_name").in("user_id", userIds),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  const nameMap = new Map(
    (profilesResult.data ?? []).map((p) => [p.user_id, p.full_name as string | null]),
  );
  const emailMap = new Map(
    (authResult.data?.users ?? []).map((u) => [u.id, u.email ?? "—"]),
  );

  const members: FoundationMemberRecord[] = memberList.map((m) => ({
    userId: m.user_id,
    email: emailMap.get(m.user_id) ?? "—",
    fullName: nameMap.get(m.user_id) ?? null,
    role: m.role,
    status: m.status,
    joinedAt: m.joined_at,
  }));

  const active = members.filter((m) => m.status === "active");

  return {
    members,
    totalBeneficiarios: active.filter((m) => m.role === "beneficiario").length,
    totalDonantes: active.filter((m) => m.role === "donante").length,
    totalActive: active.length,
  };
}
