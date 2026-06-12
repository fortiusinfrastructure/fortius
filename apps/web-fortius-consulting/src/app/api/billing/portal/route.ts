/**
 * POST /api/billing/portal
 * Creates a Stripe Customer Portal session for the logged-in user so they
 * can manage their subscription (payment method, invoices, cancellation).
 * Designed to be called from a plain <form method="POST"> — responds with
 * 303 redirects so it works without client-side JS.
 */

import { NextResponse } from "next/server";
import { createServerClient, createAdminClient } from "@fortius/database";
import { stripe } from "@/lib/stripe";
import { SITE_URL } from "@/lib/site-config";

export async function POST() {
    const cuentaUrl = new URL("/area-privada/cuenta", SITE_URL);

    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        const loginUrl = new URL("/login", SITE_URL);
        loginUrl.searchParams.set("redirect", "/area-privada/cuenta");
        return NextResponse.redirect(loginUrl, 303);
    }

    const admin = createAdminClient();
    const orgSlug = process.env.NEXT_PUBLIC_ORG_SLUG ?? "fortius-consulting";
    const { data: org } = await admin
        .from("organizations")
        .select("id")
        .eq("slug", orgSlug)
        .single();

    if (!org) {
        cuentaUrl.searchParams.set("error", "portal");
        return NextResponse.redirect(cuentaUrl, 303);
    }

    const { data: subscription } = await admin
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .eq("organization_id", org.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (!subscription?.stripe_customer_id) {
        cuentaUrl.searchParams.set("error", "sin-suscripcion");
        return NextResponse.redirect(cuentaUrl, 303);
    }

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: subscription.stripe_customer_id,
            return_url: cuentaUrl.toString(),
        });
        return NextResponse.redirect(session.url, 303);
    } catch (error) {
        console.error("[billing/portal] Failed to create portal session:", error);
        cuentaUrl.searchParams.set("error", "portal");
        return NextResponse.redirect(cuentaUrl, 303);
    }
}
