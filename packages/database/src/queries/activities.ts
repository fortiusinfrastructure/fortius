import { createAdminClient } from '../client/admin';
import type { Database } from '../types/database';

type Activity = Database['public']['Tables']['activities']['Row'];
type ActivityInsert = Database['public']['Tables']['activities']['Insert'];
type ActivityUpdate = Database['public']['Tables']['activities']['Update'];
type ActivitySpeaker = Database['public']['Tables']['activity_speakers']['Row'];
type ActivitySpeakerInsert = Database['public']['Tables']['activity_speakers']['Insert'];

export type ActivityWithSpeakers = Activity & { activity_speakers: ActivitySpeaker[] };

export interface ActivityListOptions {
    status?: 'published' | 'draft' | 'archived';
    limit?: number;
    offset?: number;
    upcoming?: boolean;
    isFeatured?: boolean;
}

async function fetchActivitiesWithSpeakers(
    orgId: string,
    filters: { status?: string; upcoming?: boolean; limit?: number; offset?: number; isFeatured?: boolean }
): Promise<ActivityWithSpeakers[]> {
    const admin = createAdminClient();
    const { status = 'published', limit = 20, offset = 0, upcoming, isFeatured } = filters;
    const today = new Date().toISOString().split('T')[0];

    let q = admin
        .from('activities')
        .select('*')
        .eq('organization_id', orgId)
        .eq('status', status)
        .range(offset, offset + limit - 1);

    if (upcoming === true) {
        q = q.gte('event_date', today).order('event_date', { ascending: true });
    } else if (upcoming === false) {
        q = q.lt('event_date', today).order('event_date', { ascending: false });
    } else {
        q = q.order('event_date', { ascending: false });
    }

    if (isFeatured !== undefined) {
        q = q.eq('is_featured', isFeatured);
    }

    const { data: activityRows } = (await q) as { data: Activity[] | null; error: unknown };
    if (!activityRows || activityRows.length === 0) return [];

    const ids = activityRows.map((a) => a.id);
    const { data: speakerRows } = (await admin
        .from('activity_speakers')
        .select('*')
        .in('activity_id', ids)
        .order('display_order', { ascending: true })) as { data: ActivitySpeaker[] | null; error: unknown };

    const bySpeaker = new Map<string, ActivitySpeaker[]>();
    for (const s of speakerRows ?? []) {
        const list = bySpeaker.get(s.activity_id) ?? [];
        list.push(s);
        bySpeaker.set(s.activity_id, list);
    }

    return activityRows.map((a) => ({ ...a, activity_speakers: bySpeaker.get(a.id) ?? [] }));
}

export async function getActivitiesByOrg(
    orgSlug: string,
    options: ActivityListOptions = {}
): Promise<ActivityWithSpeakers[]> {
    const admin = createAdminClient();
    const { data: orgRow } = (await admin
        .from('organizations')
        .select('id')
        .eq('slug', orgSlug)
        .single()) as { data: { id: string } | null; error: unknown };

    if (!orgRow) return [];
    return fetchActivitiesWithSpeakers(orgRow.id, options);
}

export async function getActivityBySlug(
    orgSlug: string,
    slug: string
): Promise<ActivityWithSpeakers | null> {
    const admin = createAdminClient();

    const { data: orgRow } = (await admin
        .from('organizations')
        .select('id')
        .eq('slug', orgSlug)
        .single()) as { data: { id: string } | null; error: unknown };

    if (!orgRow) return null;

    const { data: activity } = (await admin
        .from('activities')
        .select('*')
        .eq('organization_id', orgRow.id)
        .eq('slug', slug)
        .single()) as { data: Activity | null; error: unknown };

    if (!activity) return null;

    const { data: speakers } = (await admin
        .from('activity_speakers')
        .select('*')
        .eq('activity_id', activity.id)
        .order('display_order', { ascending: true })) as { data: ActivitySpeaker[] | null; error: unknown };

    return { ...activity, activity_speakers: speakers ?? [] };
}

export async function getActivitiesForAdmin(orgSlug: string): Promise<ActivityWithSpeakers[]> {
    const admin = createAdminClient();

    const { data: orgRow } = (await admin
        .from('organizations')
        .select('id')
        .eq('slug', orgSlug)
        .single()) as { data: { id: string } | null; error: unknown };

    if (!orgRow) return [];

    const { data: activityRows } = (await admin
        .from('activities')
        .select('*')
        .eq('organization_id', orgRow.id)
        .order('event_date', { ascending: false })) as { data: Activity[] | null; error: unknown };

    if (!activityRows || activityRows.length === 0) return [];

    const ids = activityRows.map((a) => a.id);
    const { data: speakerRows } = (await admin
        .from('activity_speakers')
        .select('*')
        .in('activity_id', ids)
        .order('display_order', { ascending: true })) as { data: ActivitySpeaker[] | null; error: unknown };

    const bySpeaker = new Map<string, ActivitySpeaker[]>();
    for (const s of speakerRows ?? []) {
        const list = bySpeaker.get(s.activity_id) ?? [];
        list.push(s);
        bySpeaker.set(s.activity_id, list);
    }

    return activityRows.map((a) => ({ ...a, activity_speakers: bySpeaker.get(a.id) ?? [] }));
}

export async function createActivity(
    orgId: string,
    activityData: Omit<ActivityInsert, 'organization_id'>,
    speakers: Omit<ActivitySpeakerInsert, 'activity_id'>[]
): Promise<Activity | null> {
    const admin = createAdminClient();

    const { data: activity, error } = (await admin
        .from('activities')
        .insert({ ...activityData, organization_id: orgId })
        .select()
        .single()) as { data: Activity | null; error: unknown };

    if (error || !activity) return null;

    if (speakers.length > 0) {
        await admin.from('activity_speakers').insert(
            speakers.map((s, i) => ({
                ...s,
                activity_id: activity.id,
                display_order: s.display_order ?? i,
            }))
        );
    }

    return activity;
}

export async function updateActivity(
    activityId: string,
    activityData: ActivityUpdate,
    speakers?: Omit<ActivitySpeakerInsert, 'activity_id'>[]
): Promise<Activity | null> {
    const admin = createAdminClient();

    const { data: activity, error } = (await admin
        .from('activities')
        .update({ ...activityData, updated_at: new Date().toISOString() })
        .eq('id', activityId)
        .select()
        .single()) as { data: Activity | null; error: unknown };

    if (error || !activity) return null;

    if (speakers !== undefined) {
        await admin.from('activity_speakers').delete().eq('activity_id', activityId);
        if (speakers.length > 0) {
            await admin.from('activity_speakers').insert(
                speakers.map((s, i) => ({
                    ...s,
                    activity_id: activityId,
                    display_order: s.display_order ?? i,
                }))
            );
        }
    }

    return activity;
}

export async function deleteActivity(activityId: string): Promise<boolean> {
    const admin = createAdminClient();
    const { error } = await admin.from('activities').delete().eq('id', activityId);
    return !error;
}
