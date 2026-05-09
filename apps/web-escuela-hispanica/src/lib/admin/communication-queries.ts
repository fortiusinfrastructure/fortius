import { createAdminClient, type Database } from '@fortius/database';
import { getAdminOrganization } from './org';

type CommunicationLog = Database['public']['Tables']['communication_logs']['Row'];
type StripeEvent = Database['public']['Tables']['stripe_events']['Row'];

export async function getCommunicationDashboard(filters: { kind?: string; status?: string } = {}) {
    const admin = createAdminClient();
    const org = await getAdminOrganization();

    const [logsResult, stripeEventsResult] = await Promise.all([
        admin
            .from('communication_logs')
            .select('*')
            .eq('organization_id', org.id)
            .order('created_at', { ascending: false })
            .limit(100),
        admin
            .from('stripe_events')
            .select('*')
            .eq('organization_id', org.id)
            .order('processed_at', { ascending: false })
            .limit(100),
    ]);

    const logs = ((logsResult.data ?? []) as CommunicationLog[]).filter((log) => {
        const kindMatch = !filters.kind || filters.kind === 'all' || log.kind === filters.kind;
        const statusMatch = !filters.status || filters.status === 'all' || log.status === filters.status;
        return kindMatch && statusMatch;
    });

    const stripeEvents = (stripeEventsResult.data ?? []) as StripeEvent[];
    const stripeSummary = {
        completed: stripeEvents.filter((event) => event.event_type === 'checkout.session.completed').length,
        expired: stripeEvents.filter((event) => event.event_type === 'checkout.session.expired').length,
        invoicesPaid: stripeEvents.filter((event) => event.event_type === 'invoice.payment_succeeded').length,
        invoicesFailed: stripeEvents.filter((event) => event.event_type === 'invoice.payment_failed').length,
    };

    const logSummary = {
        total: logs.length,
        sent: logs.filter((log) => log.status === 'sent').length,
        failed: logs.filter((log) => log.status === 'failed').length,
    };

    return { org, logs, stripeEvents, logSummary, stripeSummary };
}