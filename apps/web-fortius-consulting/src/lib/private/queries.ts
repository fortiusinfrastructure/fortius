/**
 * Server-side queries for /area-privada dashboards.
 * Always uses createAdminClient to bypass RLS.
 * No 'use server' — called directly from Server Components.
 */

import { createAdminClient } from "@fortius/database";

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
}

export async function getMemberDashboardData(
    userId: string,
    orgId: string,
): Promise<MemberDashboardData> {
    const admin = createAdminClient();

    const [{ data: membership }, { data: subscription }] = await Promise.all([
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
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
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
