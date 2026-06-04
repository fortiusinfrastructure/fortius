import type Stripe from "stripe";
import { createAdminClient } from "@fortius/database";
import { getWebhookOrganizationId } from "./webhook-db";
import { recordStripeSyncIssue, resolveStripeSyncIssues } from "./sync-issues";

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
    const orgSlug = context.orgSlug || "fortius-consulting";
    const organizationId = await getWebhookOrganizationId(orgSlug);
    const customerId =
        typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;
    const metadata = subscription.metadata || {};
    const priceId = subscription.items.data[0]?.price?.id ?? null;

    const issueBase = {
        organizationId,
        eventId: context.eventId ?? null,
        eventType: context.eventType ?? null,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        metadata: { subscription_status: subscription.status, metadata, price_id: priceId },
    };

    if (!organizationId) {
        console.error("[stripe-sync] Organization not found for", orgSlug);
        return { resolved: false, organizationId: null, subscriptionId: null, membershipId: null };
    }

    if (!priceId) {
        await recordStripeSyncIssue({ ...issueBase, issueType: "missing_price_id", severity: "error", message: "Suscripción sin price_id." });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    // Look up membership_plans by stripe_price_id (seeded by plans:seed script)
    const { data: plan } = await admin
        .from("membership_plans")
        .select("id, tier")
        .eq("organization_id", organizationId)
        .eq("stripe_price_id", priceId)
        .single();

    if (!plan) {
        await recordStripeSyncIssue({ ...issueBase, issueType: "unmapped_price_id", severity: "error", message: `No membership_plan for price_id ${priceId}. Run plans:seed.` });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    const userId = metadata.userId;
    if (!userId || userId === "anonymous") {
        await recordStripeSyncIssue({ ...issueBase, issueType: "missing_user_id", severity: "error", message: "Suscripción sin userId en metadata." });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    // Consulting difference vs EH: upsert membership instead of failing when missing
    const { data: existing } = await admin
        .from("user_memberships")
        .select("id, joined_at")
        .eq("organization_id", organizationId)
        .eq("user_id", userId)
        .eq("tier", plan.tier)
        .maybeSingle();

    const normalizedStatus = normalizeSubscriptionStatus(subscription.status);
    const membershipStatus = normalizeMembershipStatus(normalizedStatus);
    const periodEnd = new Date(subscription.items.data[0]!.current_period_end * 1000).toISOString();

    let membershipId: string;

    if (existing) {
        await admin.from("user_memberships").update({
            status: membershipStatus,
            expires_at: periodEnd,
            joined_at: existing.joined_at ?? (membershipStatus === "active" ? new Date().toISOString() : null),
        }).eq("id", existing.id);
        membershipId = existing.id;
    } else {
        // First payment: create the membership
        const { data: created } = await admin.from("user_memberships").insert({
            user_id: userId,
            organization_id: organizationId,
            tier: plan.tier,
            role: "member",
            status: membershipStatus,
            joined_at: membershipStatus === "active" ? new Date().toISOString() : null,
            expires_at: periodEnd,
        }).select("id").single();

        if (!created) {
            await recordStripeSyncIssue({ ...issueBase, issueType: "membership_create_failed", severity: "error", message: "Failed to create user_membership." });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }
        membershipId = created.id;
    }

    const { data: savedSubscription } = await admin
        .from("subscriptions")
        .upsert({
            user_id: userId,
            organization_id: organizationId,
            membership_id: membershipId,
            plan_id: plan.id,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: customerId,
            status: normalizedStatus,
            current_period_start: new Date(subscription.items.data[0]!.current_period_start * 1000).toISOString(),
            current_period_end: periodEnd,
            cancel_at_period_end: subscription.cancel_at_period_end,
            canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
            metadata,
        }, { onConflict: "stripe_subscription_id" })
        .select("id")
        .single();

    await resolveStripeSyncIssues({ organizationId, stripeSubscriptionId: subscription.id });

    return {
        resolved: true,
        organizationId,
        subscriptionId: savedSubscription?.id ?? null,
        membershipId,
    };
}

function normalizeSubscriptionStatus(status: Stripe.Subscription.Status) {
    if (status === "unpaid") return "past_due";
    if (status === "incomplete_expired") return "canceled";
    if (status === "paused") return "past_due";
    return status;
}

function normalizeMembershipStatus(status: ReturnType<typeof normalizeSubscriptionStatus>) {
    if (status === "active" || status === "trialing") return "active";
    if (status === "past_due" || status === "incomplete") return "past_due";
    return "inactive";
}
