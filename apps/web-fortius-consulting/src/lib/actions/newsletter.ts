"use server";

import { createClient } from "@supabase/supabase-js";
import { getNewsletterConfirmationHtml, getNewsletterNotificationHtml } from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";

const ORG_SLUG = "fortius-consulting";
const NOTIFICATION_EMAIL = "info@fortiusconsulting.org";

function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        },
    );
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeToNewsletter(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    if (!isValidEmail(email)) {
        throw new Error("Invalid email.");
    }

    const admin = createAdminClient();
    const { data: organizationRow, error: orgError } = await admin
        .from("organizations")
        .select("id")
        .eq("slug", ORG_SLUG)
        .single();

    if (orgError || !organizationRow) {
        console.error("[subscribeToNewsletter] organization lookup failed", orgError);
        throw new Error("Organization lookup failed.");
    }

    const { data: subscription, error: upsertError } = await admin
        .from("newsletter_subscriptions")
        .upsert({
            organization_id: organizationRow.id,
            email,
            status: "active",
            source: "website",
            metadata: { source: "web-fortius-consulting" },
            confirmed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }, { onConflict: "organization_id,email" })
        .select("id")
        .single();

    if (upsertError || !subscription) {
        console.error("[subscribeToNewsletter] upsert failed", upsertError);
        throw new Error("Newsletter upsert failed.");
    }

    const [internalResult, confirmationResult] = await Promise.all([
        sendEmail({
            to: NOTIFICATION_EMAIL,
            replyTo: email,
            subject: "Nueva suscripción al boletín — Fortius Consulting",
            html: getNewsletterNotificationHtml(email),
            kind: "newsletter_notification",
            relatedTable: "newsletter_subscriptions",
            relatedId: subscription.id,
            metadata: { source: "web-fortius-consulting" },
        }),
        sendEmail({
            to: email,
            replyTo: NOTIFICATION_EMAIL,
            subject: "Suscripción confirmada — Fortius Consulting",
            html: getNewsletterConfirmationHtml(email),
            kind: "newsletter_confirmation",
            relatedTable: "newsletter_subscriptions",
            relatedId: subscription.id,
            metadata: { source: "web-fortius-consulting" },
        }),
    ]);

    if (!internalResult.success) {
        console.error("[subscribeToNewsletter] internal notification failed", internalResult.error);
    }

    if (!confirmationResult.success) {
        console.error("[subscribeToNewsletter] confirmation failed", confirmationResult.error);
    }

    return {
        success: true,
        message: confirmationResult.success
            ? "Te hemos suscrito al boletín y te hemos enviado un email de confirmación."
            : "Te hemos suscrito al boletín correctamente.",
    };
}