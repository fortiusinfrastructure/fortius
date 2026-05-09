import { createAdminClient, type Database } from '@fortius/database';
import { getAdminOrganization } from './org';

type CommunicationLog = Database['public']['Tables']['communication_logs']['Row'];
type StripeEvent = Database['public']['Tables']['stripe_events']['Row'];
type StripeSyncIssue = Database['public']['Tables']['stripe_sync_issues']['Row'];

export async function getCommunicationDashboard(filters: { kind?: string; status?: string } = {}) {
    const admin = createAdminClient();
    const org = await getAdminOrganization();

    const [logsResult, stripeEventsResult, syncIssuesResult] = await Promise.all([
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
        admin
            .from('stripe_sync_issues')
            .select('*')
            .eq('organization_id', org.id)
            .order('created_at', { ascending: false })
            .limit(50),
    ]);

    const logs = ((logsResult.data ?? []) as CommunicationLog[]).filter((log) => {
        const kindMatch = !filters.kind || filters.kind === 'all' || log.kind === filters.kind;
        const statusMatch = !filters.status || filters.status === 'all' || log.status === filters.status;
        return kindMatch && statusMatch;
    });

    const stripeEvents = (stripeEventsResult.data ?? []) as StripeEvent[];
    const syncIssues = (syncIssuesResult.data ?? []) as StripeSyncIssue[];
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

    const syncSummary = {
        total: syncIssues.length,
        unresolved: syncIssues.filter((issue) => !issue.resolved_at).length,
        errors: syncIssues.filter((issue) => issue.severity === 'error' && !issue.resolved_at).length,
        warnings: syncIssues.filter((issue) => issue.severity === 'warning' && !issue.resolved_at).length,
    };

    return { org, logs, stripeEvents, syncIssues, logSummary, stripeSummary, syncSummary };
}