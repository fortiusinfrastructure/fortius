/**
 * Server-side queries for /area-privada dashboards.
 * Uses createAdminClient for cross-user views (admin dashboard) and
 * createServerClient for caller-scoped reads where RLS is the contract.
 * No 'use server' — called directly from Server Components.
 */

import { createAdminClient, createServerClient } from "@fortius/database";

// ─── Member (client) dashboard ───────────────────────────────────────────────

export interface MemberDashboardData {
    tier: string | null;
    status: string | null;
    joinedAt: string | null;
    expiresAt: string | null;
    subscription: {
        stripeStatus: string;
        currentPeriodEnd: string | null;
        cancelAtPeriodEnd: boolean | null;
    } | null;
    eventPurchases: EventPurchaseRecord[];
}

export interface EventPurchaseRecord {
    eventSlug: string;
    eventTitle: string;
    amountCents: number;
    currency: string;
    purchasedAt: string | null;
}

export async function getMemberDashboardData(
    userId: string,
    orgId: string,
): Promise<MemberDashboardData> {
    const admin = createAdminClient();

    const [{ data: membership }, { data: subscription }, { data: eventPurchases }] = await Promise.all([
        admin
            .from("user_memberships")
            .select("tier, status, joined_at, expires_at")
            .eq("user_id", userId)
            .eq("organization_id", orgId)
            .maybeSingle(),
        admin
            .from("subscriptions")
            .select("status, current_period_end, cancel_at_period_end")
            .eq("user_id", userId)
            .eq("organization_id", orgId)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        admin
            .from("event_purchases")
            .select("event_slug, event_title, amount_cents, currency, purchased_at")
            .eq("user_id", userId)
            .eq("organization_id", orgId)
            .eq("status", "paid")
            .order("purchased_at", { ascending: false }),
    ]);

    return {
        tier: membership?.tier ?? null,
        status: membership?.status ?? null,
        joinedAt: membership?.joined_at ?? null,
        expiresAt: membership?.expires_at ?? null,
        subscription: subscription
            ? {
                  stripeStatus: subscription.status,
                  currentPeriodEnd: subscription.current_period_end ?? null,
                  cancelAtPeriodEnd: subscription.cancel_at_period_end ?? null,
              }
            : null,
        eventPurchases: (eventPurchases ?? []).map((purchase) => ({
            eventSlug: purchase.event_slug,
            eventTitle: purchase.event_title,
            amountCents: purchase.amount_cents,
            currency: purchase.currency,
            purchasedAt: purchase.purchased_at,
        })),
    };
}

// ─── Admin (CEO) dashboard ────────────────────────────────────────────────────

export interface AdminMemberRecord {
    userId: string;
    email: string;
    fullName: string | null;
    role: string | null;
    tier: string | null;
    status: string | null;
    joinedAt: string | null;
    subscriptionStatus: string | null;
}

export interface AdminDashboardData {
    members: AdminMemberRecord[];
    totalActive: number;
    totalClients: number;
}

export async function getAdminDashboardData(orgId: string): Promise<AdminDashboardData> {
    const admin = createAdminClient();

    // Fetch memberships, profiles and subscriptions in parallel
    const { data: memberships } = await admin
        .from("user_memberships")
        .select("user_id, role, tier, status, joined_at")
        .eq("organization_id", orgId)
        .order("joined_at", { ascending: false });

    const memberList = memberships ?? [];
    const userIds = memberList.map((m) => m.user_id);

    const [profilesResult, authUsersResult, subscriptionsResult] = await Promise.all([
        userIds.length > 0
            ? admin.from("user_profiles").select("user_id, full_name").in("user_id", userIds)
            : Promise.resolve({ data: [] }),
        admin.auth.admin.listUsers({ perPage: 500 }),
        userIds.length > 0
            ? admin
                  .from("subscriptions")
                  .select("user_id, status")
                  .in("user_id", userIds)
                  .order("created_at", { ascending: false })
            : Promise.resolve({ data: [] }),
    ]);

    // Build lookup maps for O(1) access
    const profileMap = new Map(
        (profilesResult.data ?? []).map((p) => [p.user_id, p.full_name]),
    );
    const emailMap = new Map(
        (authUsersResult.data?.users ?? []).map((u) => [u.id, u.email ?? "—"]),
    );
    // One subscription per user: only keep the first (most recent) per user_id
    const subMap = new Map<string, string>();
    for (const s of subscriptionsResult.data ?? []) {
        if (!subMap.has(s.user_id)) subMap.set(s.user_id, s.status);
    }

    const members: AdminMemberRecord[] = memberList.map((m) => ({
        userId: m.user_id,
        email: emailMap.get(m.user_id) ?? "—",
        fullName: profileMap.get(m.user_id) ?? null,
        role: m.role,
        tier: m.tier,
        status: m.status,
        joinedAt: m.joined_at,
        subscriptionStatus: subMap.get(m.user_id) ?? null,
    }));

    const activeMembers = members.filter((m) => m.status === "active");

    return {
        members,
        totalActive: activeMembers.length,
        totalClients: activeMembers.filter((m) => m.role === "member").length,
    };
}

// ─── Client projects (RLS-scoped) ─────────────────────────────────────────────

export interface ClientProjectKpi {
    label: string;
    value: string | number | null;
    target: string | number | null;
    unit: string | null;
}

export interface ClientProjectRecord {
    id: string;
    title: string;
    summary: string | null;
    status: string;
    clientUserId: string;
    consultantUserId: string | null;
    kpis: ClientProjectKpi[];
    startedAt: string | null;
    endedAt: string | null;
    updatedAt: string | null;
}

type ClientProjectRow = {
    id: string;
    title: string;
    summary: string | null;
    status: string;
    client_user_id: string;
    consultant_user_id: string | null;
    kpis: unknown;
    started_at: string | null;
    ended_at: string | null;
    updated_at: string | null;
};

function normalizeKpis(value: unknown): ClientProjectKpi[] {
    if (!Array.isArray(value)) return [];
    return value
        .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
        .map((item) => ({
            label: typeof item.label === "string" ? item.label : "",
            value: (item.value as string | number | null) ?? null,
            target: (item.target as string | number | null) ?? null,
            unit: typeof item.unit === "string" ? item.unit : null,
        }));
}

/**
 * Returns client_projects visible to the current authenticated viewer.
 * RLS decides scope: clients see their own; consultants see assigned;
 * admins see all in the org. Returns [] if no session or no rows.
 */
export async function getMyClientProjects(orgId: string): Promise<ClientProjectRecord[]> {
    const supabase = await createServerClient();

    const res = await supabase
        .from("client_projects")
        .select("id, title, summary, status, client_user_id, consultant_user_id, kpis, started_at, ended_at, updated_at")
        .eq("organization_id", orgId)
        .order("updated_at", { ascending: false });

    const rows = (res.data as ClientProjectRow[] | null) ?? [];

    return rows.map((row) => ({
        id: row.id,
        title: row.title,
        summary: row.summary,
        status: row.status,
        clientUserId: row.client_user_id,
        consultantUserId: row.consultant_user_id,
        kpis: normalizeKpis(row.kpis),
        startedAt: row.started_at,
        endedAt: row.ended_at,
        updatedAt: row.updated_at,
    }));
}
