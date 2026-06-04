import { NextResponse } from "next/server";
import { getConsultingBillingPlan, getConsultingPriceId } from "@/lib/billing/plans";
import { SITE_URL } from "@/lib/site-config";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@fortius/database";

export async function POST(request: Request) {
    let fallbackPlan = "";
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const baseUrl = `${protocol}://${host}`;

    try {
        const formData = await request.formData();
        const planKey = formData.get("plan");
        const interval = formData.get("interval");

        fallbackPlan = typeof planKey === "string" ? planKey : "";

        if (typeof planKey !== "string" || (interval !== "monthly" && interval !== "annual")) {
            return NextResponse.redirect(`${baseUrl}/contacto?subject=Suscripción`, 303);
        }

        // Require authenticated user — userId is needed for membership sync
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user?.id) {
            const loginUrl = `${baseUrl}/login?redirect=${encodeURIComponent(`/suscribirse?plan=${planKey}`)}`;
            return NextResponse.redirect(loginUrl, 303);
        }

        const plan = getConsultingBillingPlan(planKey);
        if (!plan) {
            return NextResponse.redirect(`${baseUrl}/contacto?subject=Suscripción`, 303);
        }

        const priceId = getConsultingPriceId(plan, interval);
        const successUrl = `${baseUrl}/suscripcion/exito?plan=${plan.key}&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl}/suscribirse?plan=${plan.key}`;

        // tier = plan.key (e.g. "politica-premium") — matches what plans:seed stores in membership_plans.tier
        const metadata = {
            orgSlug: process.env.NEXT_PUBLIC_ORG_SLUG || "fortius-consulting",
            source: "web-fortius-consulting",
            planKey: plan.key,
            vertical: plan.vertical,
            tier: plan.key,
            interval,
            userId: user.id,
        };

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            billing_address_collection: "auto",
            allow_promotion_codes: true,
            line_items: [{ price: priceId, quantity: 1 }],
            locale: "es",
            client_reference_id: user.id,
            customer_email: user.email ?? undefined,
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata,
            subscription_data: { metadata },
        });

        if (!session.url) {
            throw new Error("Stripe no devolvió una URL de checkout");
        }

        return NextResponse.redirect(session.url, 303);
    } catch (error) {
        console.error("[checkout/subscription]", error);
        const suffix = fallbackPlan ? `?plan=${encodeURIComponent(fallbackPlan)}&error=checkout` : "?error=checkout";
        return NextResponse.redirect(`${baseUrl}/suscribirse${suffix}`, 303);
    }
}