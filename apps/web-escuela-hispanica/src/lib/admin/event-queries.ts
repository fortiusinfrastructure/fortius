import { createAdminClient, type Database } from '@fortius/database';
import { getAdminOrganization } from './org';

type Activity = Database['public']['Tables']['activities']['Row'];
type Registration = Database['public']['Tables']['event_registrations']['Row'];

export async function getEventDashboard(filters: {
    event?: string;
    status?: string;
    attendance?: string;
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
    const registrations = ((registrationsResult.data ?? []) as Registration[]).filter((registration) => {
        const eventMatch = !filters.event || filters.event === 'all' || registration.event_slug === filters.event;
        const statusMatch = !filters.status || filters.status === 'all' || registration.status === filters.status;
        const attendanceMatch = !filters.attendance || filters.attendance === 'all' || registration.attendance_status === filters.attendance;
        return eventMatch && statusMatch && attendanceMatch;
    });

    const metricsByEvent = activities.map((activity) => {
        const byEvent = registrations.filter((registration) => registration.event_slug === activity.slug);
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
        };
    });

    const totals = {
        activities: activities.length,
        registrations: registrations.length,
        paid: registrations.filter((registration) => registration.status === 'paid').length,
        attended: registrations.filter((registration) => registration.attendance_status === 'attended').length,
    };

    return { org, totals, metricsByEvent, registrations };
}