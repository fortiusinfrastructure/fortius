import type Stripe from 'stripe';
import { createAdminClient } from '@fortius/database';
import { getWebhookOrganizationId } from './webhook-db';
import { recordStripeSyncIssue, resolveStripeSyncIssues } from './sync-issues';

interface SyncContext {
    orgSlug?: string;
    eventId?: string;
    eventType?: string;
}

export async function syncSubscriptionFromStripe(
    subscription: Stripe.Subscription,
    context: SyncContext = {},
) {
    const admin = createAdminClient();
    const orgSlug = context.orgSlug || 'escuela-hispanica';
    const organizationId = await getWebhookOrganizationId(orgSlug);
    const customerId =
        typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id;
    const metadata = subscription.metadata || {};
    const priceId = subscription.items.data[0]?.price?.id || null;

    const issueBase = {
        organizationId,
        eventId: context.eventId ?? null,
        eventType: context.eventType ?? null,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        metadata: {
            subscription_status: subscription.status,
            metadata,
            price_id: priceId,
        },
    };

    if (!organizationId) {
        console.error('[stripe-sync] Organization not found for', orgSlug);
        return { resolved: false, organizationId: null, subscriptionId: null, membershipId: null };
    }

    if (!priceId) {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'missing_price_id',
            severity: 'error',
            message: 'La suscripción de Stripe no tiene price_id utilizable.',
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    const { data: plan } = await admin
        .from('membership_plans')
        .select('id, tier')
        .eq('organization_id', organizationId)
        .eq('stripe_price_id', priceId)
        .single();

    if (!plan) {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'unmapped_price_id',
            severity: 'error',
            message: `No existe un membership_plan enlazado al price_id ${priceId}.`,
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    if (!metadata.userId || metadata.userId === 'anonymous') {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'missing_user_id',
            severity: 'error',
            message: 'La suscripción no trae un userId válido en metadata.',
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    if (metadata.tier && metadata.tier !== plan.tier) {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'metadata_tier_mismatch',
            severity: 'error',
            message: `El tier en metadata (${metadata.tier}) no coincide con el plan (${plan.tier}).`,
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    let membership = null;

    if (metadata.membershipId) {
        const { data } = await admin
            .from('user_memberships')
            .select('id, user_id, organization_id, tier, status, joined_at')
            .eq('id', metadata.membershipId)
            .single();

        membership = data;
        if (!membership) {
            await recordStripeSyncIssue({
                ...issueBase,
                issueType: 'membership_not_found',
                severity: 'error',
                message: `No existe la membership ${metadata.membershipId} indicada por Stripe.`,
            });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }
    } else {
        const { data } = await admin
            .from('user_memberships')
            .select('id, user_id, organization_id, tier, status, joined_at')
            .eq('organization_id', organizationId)
            .eq('user_id', metadata.userId)
            .eq('tier', plan.tier);

        if (!data || data.length !== 1) {
            await recordStripeSyncIssue({
                ...issueBase,
                issueType: 'missing_membership_id',
                severity: 'error',
                message:
                    'La suscripción no trae membershipId y no pudo recuperarse una membership única por userId+tier.',
            });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }

        membership = data[0];
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'missing_membership_id_recovered',
            severity: 'warning',
            message:
                'La suscripción no traía membershipId, pero se recuperó una membership única por userId+tier.',
            metadata: {
                ...issueBase.metadata,
                recovered_membership_id: membership.id,
            },
        });
    }

    if (membership.organization_id !== organizationId) {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'membership_org_mismatch',
            severity: 'error',
            message: 'La membership encontrada pertenece a otra organización.',
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    if (membership.user_id !== metadata.userId) {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'membership_user_mismatch',
            severity: 'error',
            message: 'La membership encontrada no pertenece al userId indicado en Stripe.',
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    if (membership.tier !== plan.tier) {
        await recordStripeSyncIssue({
            ...issueBase,
            issueType: 'membership_tier_mismatch',
            severity: 'error',
            message: `La membership (${membership.tier}) no coincide con el plan de Stripe (${plan.tier}).`,
        });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    const normalizedStatus = normalizeSubscriptionStatus(subscription.status);
    const { data: savedSubscription } = await admin
        .from('subscriptions')
        .upsert(
            {
                user_id: metadata.userId,
                organization_id: organizationId,
                membership_id: membership.id,
                plan_id: plan.id,
                stripe_subscription_id: subscription.id,
                stripe_customer_id: customerId,
                status: normalizedStatus,
                current_period_start: new Date(subscription.items.data[0].current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
                cancel_at_period_end: subscription.cancel_at_period_end,
                canceled_at: subscription.canceled_at
                    ? new Date(subscription.canceled_at * 1000).toISOString()
                    : null,
                metadata,
            },
            { onConflict: 'stripe_subscription_id' },
        )
        .select('id')
        .single();

    await admin
        .from('user_memberships')
        .update({
            status: normalizeMembershipStatus(normalizedStatus),
            joined_at:
                membership.joined_at
                    ? membership.joined_at
                    : normalizedStatus === 'active' || normalizedStatus === 'trialing'
                      ? new Date().toISOString()
                      : undefined,
            expires_at: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
        })
        .eq('id', membership.id);

    await resolveStripeSyncIssues({
        organizationId,
        stripeSubscriptionId: subscription.id,
    });

    return {
        resolved: true,
        organizationId,
        subscriptionId: savedSubscription?.id ?? null,
        membershipId: membership.id,
    };
}

function normalizeSubscriptionStatus(status: Stripe.Subscription.Status) {
    if (status === 'unpaid') return 'past_due';
    if (status === 'incomplete_expired') return 'canceled';
    if (status === 'paused') return 'past_due';
    return status;
}

function normalizeMembershipStatus(status: ReturnType<typeof normalizeSubscriptionStatus>) {
    if (status === 'active' || status === 'trialing') return 'active';
    if (status === 'past_due' || status === 'incomplete') return 'past_due';
    return 'inactive';
}