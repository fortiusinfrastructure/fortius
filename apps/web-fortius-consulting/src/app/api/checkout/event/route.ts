import { NextResponse } from "next/server";
import { createAdminClient, createServerClient } from "@fortius/database";
import { fetchArticleBySlug } from "@/lib/articles-db";
import { createCheckoutSession } from "@/lib/stripe";
import { CONSULTING_ORG_SLUG } from "@/lib/billing/plans";

const EVENT_PURCHASE_AMOUNT_CENTS = 1000;

function getBaseUrl(request: Request) {
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    return `${protocol}://${host}`;
}

export async function POST(request: Request) {
    const baseUrl = getBaseUrl(request);
    let fallbackPath = "/area-privada";

    try {
        const formData = await request.formData();
        const slug = formData.get("slug");

        if (typeof slug !== "string") {
            return NextResponse.redirect(`${baseUrl}/area-privada`, 303);
        }

        const article = await fetchArticleBySlug(slug, "es");
        if (!article || article.kind !== "evento") {
            return NextResponse.redirect(`${baseUrl}/area-privada`, 303);
        }

        fallbackPath = `/${article.category}/${article.slug}`;

        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) {
            return NextResponse.redirect(`${baseUrl}/login?redirect=${encodeURIComponent(fallbackPath)}`, 303);
        }

        const admin = createAdminClient();
        const { data: org } = await admin
            .from("organizations")
            .select("id")
            .eq("slug", CONSULTING_ORG_SLUG)
            .single();

        if (!org) throw new Error("Organization not found");

        const [{ data: membership }, { data: subscription }, { data: existingPurchase }] = await Promise.all([
            admin
                .from("user_memberships")
                .select("id, status")
                .eq("user_id", user.id)
                .eq("organization_id", org.id)
                .eq("status", "active")
                .maybeSingle(),
            admin
                .from("subscriptions")
                .select("status")
                .eq("user_id", user.id)
                .eq("organization_id", org.id)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle(),
            admin
                .from("event_purchases")
                .select("id")
                .eq("user_id", user.id)
                .eq("organization_id", org.id)
                .eq("event_slug", article.slug)
                .eq("status", "paid")
                .maybeSingle(),
        ]);

        if (existingPurchase) {
            return NextResponse.redirect(`${baseUrl}${fallbackPath}?compra=ya-adquirida`, 303);
        }

        if (!membership || subscription?.status !== "active") {
            return NextResponse.redirect(`${baseUrl}${fallbackPath}?error=suscripcion-requerida`, 303);
        }

        const session = await createCheckoutSession({
            mode: "payment",
            amount: EVENT_PURCHASE_AMOUNT_CENTS,
            productName: `Oportunidad Fortius: ${article.title}`,
            customerEmail: user.email,
            clientReferenceId: user.id,
            successUrl: `${baseUrl}${fallbackPath}?compra=ok&session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${baseUrl}${fallbackPath}?compra=cancelada`,
            locale: "es",
            metadata: {
                productType: "event_purchase",
                source: "web-fortius-consulting",
                orgSlug: CONSULTING_ORG_SLUG,
                userId: user.id,
                eventSlug: article.slug,
                eventTitle: article.title,
                category: article.category,
            },
        });

        if (!session.url) throw new Error("Stripe no devolvió una URL de checkout");

        return NextResponse.redirect(session.url, 303);
    } catch (error) {
        console.error("[checkout/event]", error);
        return NextResponse.redirect(`${baseUrl}${fallbackPath}?error=checkout`, 303);
    }
}