import { createAdminClient, type Database } from '@fortius/database';
import { activities as mockActivities } from '@/lib/mock-data';
import type { Activity as MockActivity, LocalizedText } from '@/types';
import { getAdminOrganization } from './org';

type Activity = Database['public']['Tables']['activities']['Row'];
type Registration = Database['public']['Tables']['event_registrations']['Row'];

interface DashboardEvent {
    slug: string;
    title: string;
    date: string;
    location: string | null;
    publishedStatus: string | null;
    registrations: number;
    paid: number;
    pending: number;
    attended: number;
    source: 'database' | 'mock' | 'registrations';
    registrationOpen: boolean;
}

function localizedValue(value?: string | LocalizedText | null): string {
    if (!value) return '';
    return typeof value === 'string' ? value : value.es;
}

function buildMockEvents(): DashboardEvent[] {
    return mockActivities.map((activity: MockActivity) => ({
        slug: activity.slug,
        title: localizedValue(activity.title),
        date: activity.sortDate ?? activity.date,
        location: localizedValue(activity.location) || null,
        publishedStatus: 'published',
        registrations: 0,
        paid: 0,
        pending: 0,
        attended: 0,
        source: 'mock',
        registrationOpen: Boolean(activity.showRegistrationForm),
    }));
}

function buildRegistrationOnlyEvents(registrations: Registration[]): DashboardEvent[] {
    return [...new Set(registrations.map((registration) => registration.event_slug).filter(Boolean))].map((slug) => ({
        slug,
        title: slug,
        date: 'Sin fecha en catálogo',
        location: null,
        publishedStatus: 'published',
        registrations: 0,
        paid: 0,
        pending: 0,
        attended: 0,
        source: 'registrations',
        registrationOpen: true,
    }));
}

function byDateDesc(a: DashboardEvent, b: DashboardEvent) {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return (Number.isFinite(bTime) ? bTime : 0) - (Number.isFinite(aTime) ? aTime : 0);
}

export async function getEventDashboard(filters: {
    event?: string;
    status?: string;
    attendance?: string;
    q?: string;
} = {}) {
    const admin = createAdminClient();
    const org = await getAdminOrganization();

    const [activitiesResult, registrationsResult] = await Promise.all([
        admin
            .from('activities')
            .select('id, slug, title_es, event_date, location, status')
            .eq('organization_id', org.id)
            .order('event_date', { ascending: false }),
        admin
            .from('event_registrations')
            .select('*')
            .eq('organization_id', org.id)
            .order('created_at', { ascending: false }),
    ]);

    const activities = (activitiesResult.data ?? []) as Pick<Activity, 'id' | 'slug' | 'title_es' | 'event_date' | 'location' | 'status'>[];
    const allRegistrations = (registrationsResult.data ?? []) as Registration[];

    const dbEvents: DashboardEvent[] = activities.map((activity) => {
        const byEvent = allRegistrations.filter((registration) => registration.event_slug === activity.slug);
        return {
            slug: activity.slug,
            title: activity.title_es,
            date: activity.event_date,
            location: activity.location,
            publishedStatus: activity.status,
            registrations: byEvent.length,
            paid: byEvent.filter((registration) => registration.status === 'paid').length,
            pending: byEvent.filter((registration) => registration.status === 'pending').length,
            attended: byEvent.filter((registration) => registration.attendance_status === 'attended').length,
            source: 'database',
            registrationOpen: true,
        };
    });

    const merged = new Map<string, DashboardEvent>();

    for (const mockEvent of buildMockEvents()) {
        merged.set(mockEvent.slug, mockEvent);
    }

    for (const registrationEvent of buildRegistrationOnlyEvents(allRegistrations)) {
        if (!merged.has(registrationEvent.slug)) {
            merged.set(registrationEvent.slug, registrationEvent);
        }
    }

    for (const dbEvent of dbEvents) {
        merged.set(dbEvent.slug, dbEvent);
    }

    const metricsByEvent = [...merged.values()].map((event) => {
        const byEvent = allRegistrations.filter((registration) => registration.event_slug === event.slug);
        return {
            ...event,
            registrations: byEvent.length,
            paid: byEvent.filter((registration) => registration.status === 'paid').length,
            pending: byEvent.filter((registration) => registration.status === 'pending').length,
            attended: byEvent.filter((registration) => registration.attendance_status === 'attended').length,
        };
    }).sort(byDateDesc);

    const selectedEvent = filters.event && filters.event !== 'all'
        ? metricsByEvent.find((event) => event.slug === filters.event) ?? null
        : null;

    const query = filters.q?.trim().toLowerCase() ?? '';

    const registrations = allRegistrations.filter((registration) => {
        const eventMatch = !selectedEvent || registration.event_slug === selectedEvent.slug;
        const statusMatch = !filters.status || filters.status === 'all' || registration.status === filters.status;
        const attendanceMatch = !filters.attendance || filters.attendance === 'all' || registration.attendance_status === filters.attendance;
        const searchHaystack = [
            registration.first_name,
            registration.last_name,
            registration.email,
            registration.institution,
            registration.message,
            registration.event_slug,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
        const queryMatch = !query || searchHaystack.includes(query);
        return eventMatch && statusMatch && attendanceMatch && queryMatch;
    });

    const totals = {
        activities: metricsByEvent.length,
        registrations: allRegistrations.length,
        paid: allRegistrations.filter((registration) => registration.status === 'paid').length,
        attended: allRegistrations.filter((registration) => registration.attendance_status === 'attended').length,
    };

    return { org, totals, metricsByEvent, registrations, selectedEvent };
}