import { createAdminClient } from '@fortius/database';

export interface StripeSyncIssueInput {
    organizationId: string | null;
    eventId?: string | null;
    eventType?: string | null;
    stripeSubscriptionId?: string | null;
    stripeCustomerId?: string | null;
    issueType: string;
    severity?: 'warning' | 'error';
    message: string;
    metadata?: Record<string, unknown>;
}

export async function recordStripeSyncIssue({
    organizationId,
    eventId = null,
    eventType = null,
    stripeSubscriptionId = null,
    stripeCustomerId = null,
    issueType,
    severity = 'warning',
    message,
    metadata = {},
}: StripeSyncIssueInput) {
    if (!organizationId) {
        console.error('[stripe-sync-issues] Missing organizationId:', issueType, message);
        return;
    }

    try {
        await createAdminClient().from('stripe_sync_issues').insert({
            organization_id: organizationId,
            event_id: eventId,
            event_type: eventType,
            stripe_subscription_id: stripeSubscriptionId,
            stripe_customer_id: stripeCustomerId,
            issue_type: issueType,
            severity,
            message,
            metadata,
        });
    } catch (error) {
        console.error('[stripe-sync-issues] Failed to persist issue:', error);
    }
}

export async function resolveStripeSyncIssues({
    organizationId,
    stripeSubscriptionId,
}: {
    organizationId: string;
    stripeSubscriptionId: string;
}) {
    try {
        await createAdminClient()
            .from('stripe_sync_issues')
            .update({ resolved_at: new Date().toISOString() })
            .eq('organization_id', organizationId)
            .eq('stripe_subscription_id', stripeSubscriptionId)
            .is('resolved_at', null);
    } catch (error) {
        console.error('[stripe-sync-issues] Failed to resolve issues:', error);
    }
}