import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getWebhookOrganizationId, recordStripeEvent } from "@/lib/stripe-webhook-db";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: Request) {
    const signature = (await headers()).get("stripe-signature");
    if (!signature) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    if (!endpointSecret) {
        return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET not configured" }, { status: 500 });
    }

    const rawBody = await request.text();

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown_error";
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    const metadata = ((event.data.object as { metadata?: Record<string, string> }).metadata || {});
    const orgSlug = metadata.orgSlug || "fortius-consulting";
    const organizationId = await getWebhookOrganizationId(orgSlug);
    const recorded = await recordStripeEvent(event.id, event.type, organizationId);

    if (!recorded) {
        return NextResponse.json({ received: true, duplicate: true });
    }

    return NextResponse.json({ received: true });
}