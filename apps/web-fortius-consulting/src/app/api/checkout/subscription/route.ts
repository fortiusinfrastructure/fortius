import { NextResponse } from "next/server";
import { getConsultingBillingPlan, getConsultingPriceId, CONSULTING_ORG_SLUG } from "@/lib/billing/plans";
import { createCheckoutSession } from "@/lib/stripe";
import { buildSubscriptionMetadata } from "@/lib/stripe/checkout-metadata";
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

        const plan = getConsultingBillingPlan(planKey);
        if (!plan) {
            return NextResponse.redirect(`${baseUrl}/contacto?subject=Suscripción`, 303);
        }

        // Try to get an authenticated user, but do NOT require it.
        // If the user is not logged in, Stripe will collect their email at checkout.
        // The webhook resolves / creates the Supabase user after payment.
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        const priceId = getConsultingPriceId(plan, interval);
        const successUrl = `${baseUrl}/suscripcion/exito?plan=${plan.key}&session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${baseUrl}/suscribirse?plan=${plan.key}`;

        // Build metadata — userId is optional (pay-first flow)
        const metadata = buildSubscriptionMetadata({
            tier: plan.key,          // "politica-premium" etc. — matches membership_plans.tier
            userId: user?.id,        // undefined if not logged in
            orgSlug: CONSULTING_ORG_SLUG,
            interval,
            planKey: plan.key,
            vertical: plan.vertical,
        });

        const session = await createCheckoutSession({
            mode: "subscription",
            priceId,
            customerEmail: user?.email ?? undefined,   // Stripe asks for email if absent
            metadata,
            successUrl,
            cancelUrl,
            clientReferenceId: user?.id,
            billingAddressCollection: "auto",
            allowPromotionCodes: true,
            locale: "es",
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