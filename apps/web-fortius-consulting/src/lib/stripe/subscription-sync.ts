/**
 * Stripe subscription sync for Fortius Consulting.
 *
 * Aligns with web-escuela-hispanica's pattern with one key difference:
 * when no membership exists, we CREATE it (EH requires pre-existing membership).
 * After creation, we write the membershipId back to Stripe so future renewal
 * events use the fast lookup path (EH's membershipId pattern).
 */

import type Stripe from "stripe";
import { createAdminClient } from "@fortius/database";
import { stripe } from "./index";
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
        await recordStripeSyncIssue({ ...issueBase, issueType: "missing_price_id", severity: "error", message: "La suscripción de Stripe no tiene price_id utilizable." });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    // 1. Resolve plan from membership_plans (seeded by plans:seed)
    const { data: plan } = await admin
        .from("membership_plans")
        .select("id, tier")
        .eq("organization_id", organizationId)
        .eq("stripe_price_id", priceId)
        .single();

    if (!plan) {
        await recordStripeSyncIssue({ ...issueBase, issueType: "unmapped_price_id", severity: "error", message: `No existe un membership_plan enlazado al price_id ${priceId}. Ejecuta plans:seed.` });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    // 2. Require a valid userId in metadata
    if (!metadata.userId || metadata.userId === "anonymous") {
        await recordStripeSyncIssue({ ...issueBase, issueType: "missing_user_id", severity: "error", message: "La suscripción no trae un userId válido en metadata." });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    // 3. Tier mismatch guard — metadata.tier must match plan.tier from DB (EH pattern)
    if (metadata.tier && metadata.tier !== plan.tier) {
        await recordStripeSyncIssue({ ...issueBase, issueType: "metadata_tier_mismatch", severity: "error", message: `El tier en metadata (${metadata.tier}) no coincide con el plan (${plan.tier}).` });
        return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
    }

    // 4. Resolve membership: fast-path by membershipId, fallback by userId+tier, or create
    let membership: { id: string; user_id: string; organization_id: string; tier: string; joined_at: string | null } | null = null;

    if (metadata.membershipId) {
        // Fast path (set on first payment)
        const { data } = await admin
            .from("user_memberships")
            .select("id, user_id, organization_id, tier, joined_at")
            .eq("id", metadata.membershipId)
            .single();

        membership = data ?? null;

        if (!membership) {
            await recordStripeSyncIssue({ ...issueBase, issueType: "membership_not_found", severity: "error", message: `No existe la membership ${metadata.membershipId} indicada por Stripe.` });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }
    } else {
        // Fallback: look up by userId + tier
        const { data } = await admin
            .from("user_memberships")
            .select("id, user_id, organization_id, tier, joined_at")
            .eq("organization_id", organizationId)
            .eq("user_id", metadata.userId)
            .eq("tier", plan.tier);

        if (data && data.length === 1) {
            membership = data[0];
            await recordStripeSyncIssue({
                ...issueBase,
                issueType: "missing_membership_id_recovered",
                severity: "warning",
                message: "No había membershipId en metadata; se recuperó una membership única por userId+tier.",
                metadata: { ...issueBase.metadata, recovered_membership_id: membership.id },
            });
        }
        // If no membership found → create below (consulting-only behavior)
    }

    const normalizedStatus = normalizeSubscriptionStatus(subscription.status);
    const membershipStatus = normalizeMembershipStatus(normalizedStatus);
    const periodEnd = new Date(subscription.items.data[0]!.current_period_end * 1000).toISOString();

    let membershipId: string;

    if (membership) {
        // Cross-validation (EH pattern — prevents data corruption)
        if (membership.organization_id !== organizationId) {
            await recordStripeSyncIssue({ ...issueBase, issueType: "membership_org_mismatch", severity: "error", message: "La membership encontrada pertenece a otra organización." });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }
        if (membership.user_id !== metadata.userId) {
            await recordStripeSyncIssue({ ...issueBase, issueType: "membership_user_mismatch", severity: "error", message: "La membership encontrada no pertenece al userId de Stripe." });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }
        if (membership.tier !== plan.tier) {
            await recordStripeSyncIssue({ ...issueBase, issueType: "membership_tier_mismatch", severity: "error", message: `La membership (${membership.tier}) no coincide con el plan de Stripe (${plan.tier}).` });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }

        await admin.from("user_memberships").update({
            status: membershipStatus,
            expires_at: periodEnd,
            joined_at: membership.joined_at ?? (membershipStatus === "active" ? new Date().toISOString() : null),
        }).eq("id", membership.id);

        membershipId = membership.id;
    } else {
        // Consulting-only: create membership on first payment
        const { data: created } = await admin
            .from("user_memberships")
            .insert({
                user_id: metadata.userId,
                organization_id: organizationId,
                tier: plan.tier,
                role: "member",
                status: membershipStatus,
                joined_at: membershipStatus === "active" ? new Date().toISOString() : null,
                expires_at: periodEnd,
            })
            .select("id")
            .single();

        if (!created) {
            await recordStripeSyncIssue({ ...issueBase, issueType: "membership_create_failed", severity: "error", message: "No se pudo crear la user_membership." });
            return { resolved: false, organizationId, subscriptionId: null, membershipId: null };
        }

        membershipId = created.id;

        // Write membershipId back to Stripe so renewal events use the fast path
        stripe.subscriptions
            .update(subscription.id, { metadata: { ...metadata, membershipId } })
            .catch((e) => console.warn("[stripe-sync] Could not update Stripe metadata with membershipId:", e));
    }

    // 5. Upsert subscription row
    const { data: savedSubscription } = await admin
        .from("subscriptions")
        .upsert(
            {
                user_id: metadata.userId,
                organization_id: organizationId,
                membership_id: membershipId,
                plan_id: plan.id,
                stripe_subscription_id: subscription.id,
                stripe_customer_id: customerId,
                status: normalizedStatus,
                current_period_start: new Date(subscription.items.data[0]!.current_period_start * 1000).toISOString(),
                current_period_end: periodEnd,
                cancel_at_period_end: subscription.cancel_at_period_end,
                canceled_at: subscription.canceled_at
                    ? new Date(subscription.canceled_at * 1000).toISOString()
                    : null,
                metadata,
            },
            { onConflict: "stripe_subscription_id" },
        )
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
