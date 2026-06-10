"use server";

import { createClient } from "@supabase/supabase-js";
import { getNewsletterConfirmationHtml, getNewsletterNotificationHtml } from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";

const ORG_SLUG = "fortius-consulting";
const NOTIFICATION_EMAIL = "info@fortiusconsulting.org";
const NEWSLETTER_ERROR_MESSAGE = "No hemos podido completar la suscripción. Inténtalo de nuevo.";

type NewsletterResult = {
    success: boolean;
    message: string;
};

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

async function saveNewsletterSubscription({
    admin,
    organizationId,
    email,
}: {
    admin: ReturnType<typeof createAdminClient>;
    organizationId: string;
    email: string;
}) {
    const now = new Date().toISOString();
    const subscriptionData = {
        organization_id: organizationId,
        email,
        status: "active",
        source: "website",
        metadata: { source: "web-fortius-consulting" },
        confirmed_at: now,
        updated_at: now,
    };

    const { data: existingRows, error: findError } = await admin
        .from("newsletter_subscriptions")
        .select("id")
        .eq("organization_id", organizationId)
        .eq("email", email)
        .order("updated_at", { ascending: false })
        .limit(1);

    if (findError) {
        console.error("[subscribeToNewsletter] subscription lookup failed", findError);
        throw new Error("Newsletter lookup failed.");
    }

    const existingSubscription = existingRows?.[0];
    if (existingSubscription) {
        const { data: updatedSubscription, error: updateError } = await admin
            .from("newsletter_subscriptions")
            .update(subscriptionData)
            .eq("id", existingSubscription.id)
            .select("id")
            .single();

        if (updateError || !updatedSubscription) {
            console.error("[subscribeToNewsletter] update failed", updateError);
            throw new Error("Newsletter update failed.");
        }

        return updatedSubscription;
    }

    const { data: insertedSubscription, error: insertError } = await admin
        .from("newsletter_subscriptions")
        .insert(subscriptionData)
        .select("id")
        .single();

    if (insertError || !insertedSubscription) {
        console.error("[subscribeToNewsletter] insert failed", insertError);
        throw new Error("Newsletter insert failed.");
    }

    return insertedSubscription;
}

export async function subscribeToNewsletter(formData: FormData): Promise<NewsletterResult> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    if (!isValidEmail(email)) {
        return {
            success: false,
            message: "Introduce un email válido.",
        };
    }

    try {
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

        const subscription = await saveNewsletterSubscription({
            admin,
            organizationId: organizationRow.id,
            email,
        });

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
    } catch (error) {
        console.error("[subscribeToNewsletter] failed", error);
        return {
            success: false,
            message: NEWSLETTER_ERROR_MESSAGE,
        };
    }
}