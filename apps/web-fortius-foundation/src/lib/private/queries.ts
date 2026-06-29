/**
 * Server-side queries for Foundation /area-privada dashboards.
 * No 'use server' — called directly from Server Components.
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
