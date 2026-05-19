import { NextResponse } from "next/server";
import { getConsultingBillingPlan, getConsultingPriceId } from "@/lib/billing/plans";
import { SITE_URL } from "@/lib/site-config";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
    let fallbackPlan = "";

    try {
        const formData = await request.formData();
        const planKey = formData.get("plan");
        const interval = formData.get("interval");

        fallbackPlan = typeof planKey === "string" ? planKey : "";

        if (typeof planKey !== "string" || (interval !== "monthly" && interval !== "annual")) {
            return NextResponse.redirect(`${SITE_URL}/contacto?subject=Suscripción`, 303);
        }

        const plan = getConsultingBillingPlan(planKey);
        if (!plan) {
            return NextResponse.redirect(`${SITE_URL}/contacto?subject=Suscripción`, 303);
        }

        const priceId = getConsultingPriceId(plan, interval);
        const successUrl = `${SITE_URL}/suscripcion/exito?plan=${plan.key}&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${SITE_URL}/suscripcion/cancelada?plan=${plan.key}`;
        const metadata = {
            orgSlug: process.env.NEXT_PUBLIC_ORG_SLUG || "fortius-consulting",
            source: "web-fortius-consulting",
            planKey: plan.key,
            vertical: plan.vertical,
            tier: plan.tier,
            interval,
        };

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            billing_address_collection: "auto",
            allow_promotion_codes: true,
            line_items: [{ price: priceId, quantity: 1 }],
            locale: "es",
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
        return NextResponse.redirect(`${SITE_URL}/suscribirse${suffix}`, 303);
    }
}