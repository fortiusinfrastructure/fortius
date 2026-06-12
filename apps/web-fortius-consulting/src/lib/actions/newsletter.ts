"use server";

import { createClient } from "@supabase/supabase-js";
import { getNewsletterConfirmationHtml, getNewsletterNotificationHtml } from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";
import { sendNewsletterNotificationWithWeb3Forms } from "@/lib/web3forms";

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

async function logWeb3FormsNewsletterAttempt({
    organizationId,
    email,
    status,
    relatedId,
    metadata,
}: {
    organizationId: string;
    email: string;
    status: "sent" | "failed";
    relatedId: string;
    metadata?: Record<string, unknown>;
}) {
    try {
        await createAdminClient().from("communication_logs").insert({
            organization_id: organizationId,
            channel: "email",
            kind: "newsletter_notification",
            recipient_email: NOTIFICATION_EMAIL,
            subject: "Nueva suscripción al boletín — Fortius Consulting",
            status,
            provider: "web3forms",
            provider_message_id: null,
            related_table: "newsletter_subscriptions",
            related_id: relatedId,
            metadata: {
                ...(metadata ?? {}),
                subscriberEmail: email,
            },
        });
    } catch (error) {
        console.error("[subscribeToNewsletter] web3forms log failed", error);
    }
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

        const internalResult = await sendNewsletterNotificationWithWeb3Forms(email);
        await logWeb3FormsNewsletterAttempt({
            organizationId: organizationRow.id,
            email,
            status: internalResult.success ? "sent" : "failed",
            relatedId: subscription.id,
            metadata: {
                source: "web-fortius-consulting",
                error: internalResult.success ? null : internalResult.error,
            },
        });

        if (!internalResult.success) {
            console.error("[subscribeToNewsletter] web3forms notification failed", internalResult.error);

            const fallbackResult = await sendEmail({
                to: NOTIFICATION_EMAIL,
                replyTo: email,
                subject: "Nueva suscripción al boletín — Fortius Consulting",
                html: getNewsletterNotificationHtml(email),
                kind: "newsletter_notification",
                relatedTable: "newsletter_subscriptions",
                relatedId: subscription.id,
                metadata: {
                    source: "web-fortius-consulting",
                    fallbackFor: "web3forms",
                    web3FormsError: internalResult.error ?? null,
                },
            });

            if (!fallbackResult.success) {
                console.error("[subscribeToNewsletter] resend fallback failed", fallbackResult.error);
            }
        }

        const confirmationResult = await sendEmail({
            to: email,
            replyTo: NOTIFICATION_EMAIL,
            subject: "Suscripción confirmada — Fortius Consulting",
            html: getNewsletterConfirmationHtml(email),
            kind: "newsletter_confirmation",
            relatedTable: "newsletter_subscriptions",
            relatedId: subscription.id,
            metadata: { source: "web-fortius-consulting" },
        });

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