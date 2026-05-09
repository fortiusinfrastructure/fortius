import { createAdminClient, type Database } from '@fortius/database';
import { getAdminOrganization } from './org';

type Membership = Database['public']['Tables']['user_memberships']['Row'];
type Profile = Database['public']['Tables']['user_profiles']['Row'];

export type MembershipDisplayStatus =
    | 'pending'
    | 'approved'
    | 'active'
    | 'expired'
    | 'inactive'
    | 'rejected'
    | 'past_due';

export interface MembershipRecord {
    id: string;
    userId: string;
    email: string;
    fullName: string;
    institution: string | null;
    tier: string | null;
    rawStatus: string | null;
    displayStatus: MembershipDisplayStatus;
    expiresAt: string | null;
    approvedAt: string | null;
    reminderCount: number;
    lastReminderSentAt: string | null;
    createdAt: string | null;
}

export async function getMembershipDashboard(filters: { status?: string; tier?: string } = {}) {
    const admin = createAdminClient();
    const org = await getAdminOrganization();
    const { data } = await admin
        .from('user_memberships')
        .select('id, user_id, tier, status, expires_at, approved_at, reminder_count, last_reminder_sent_at, created_at')
        .eq('organization_id', org.id)
        .order('created_at', { ascending: false });

    const memberships = (data ?? []) as Pick<Membership, 'id' | 'user_id' | 'tier' | 'status' | 'expires_at' | 'approved_at' | 'reminder_count' | 'last_reminder_sent_at' | 'created_at'>[];
    const summary = buildSummary(memberships);
    const filtered = memberships.filter((membership) => {
        const displayStatus = getDisplayStatus(membership.status, membership.expires_at);
        const statusMatch = !filters.status || filters.status === 'all' || displayStatus === filters.status;
        const tierMatch = !filters.tier || filters.tier === 'all' || membership.tier === filters.tier;
        return statusMatch && tierMatch;
    });

    const userIds = filtered.map((membership) => membership.user_id);
    const { data: profilesData } = userIds.length === 0
        ? { data: [] }
        : await admin.from('user_profiles').select('user_id, full_name, institution').in('user_id', userIds);

    const profiles = new Map(
        ((profilesData ?? []) as Pick<Profile, 'user_id' | 'full_name' | 'institution'>[]).map((profile) => [profile.user_id, profile]),
    );

    const records = await Promise.all(
        filtered.map(async (membership) => {
            const authUser = await admin.auth.admin.getUserById(membership.user_id);
            const profile = profiles.get(membership.user_id);
            const email = authUser.data.user?.email || 'Sin email';
            return {
                id: membership.id,
                userId: membership.user_id,
                email,
                fullName: profile?.full_name || authUser.data.user?.user_metadata?.full_name || email,
                institution: profile?.institution || null,
                tier: membership.tier,
                rawStatus: membership.status,
                displayStatus: getDisplayStatus(membership.status, membership.expires_at),
                expiresAt: membership.expires_at,
                approvedAt: membership.approved_at,
                reminderCount: membership.reminder_count,
                lastReminderSentAt: membership.last_reminder_sent_at,
                createdAt: membership.created_at,
            } satisfies MembershipRecord;
        }),
    );

    return { org, summary, records };
}

function buildSummary(memberships: Pick<Membership, 'status' | 'expires_at'>[]) {
    return memberships.reduce(
        (acc, membership) => {
            const displayStatus = getDisplayStatus(membership.status, membership.expires_at);
            acc.total += 1;
            acc[displayStatus] += 1;
            return acc;
        },
        { total: 0, pending: 0, approved: 0, active: 0, expired: 0, inactive: 0, rejected: 0, past_due: 0 },
    );
}

function getDisplayStatus(status: string | null, expiresAt: string | null): MembershipDisplayStatus {
    if (status === 'active' && expiresAt && new Date(expiresAt) < new Date()) return 'expired';
    if (status === 'pending') return 'pending';
    if (status === 'approved') return 'approved';
    if (status === 'inactive') return 'inactive';
    if (status === 'rejected') return 'rejected';
    if (status === 'past_due') return 'past_due';
    return 'active';
}