"use server";

import { createClient } from "@supabase/supabase-js";
import { getContactConfirmationHtml, getContactNotificationHtml } from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";
import { sendContactNotificationWithWeb3Forms } from "@/lib/web3forms";

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

function splitName(fullName: string) {
    const parts = fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) {
        return { firstName: "", lastName: "" };
    }

    if (parts.length === 1) {
        return { firstName: parts[0], lastName: "-" };
    }

    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
    };
}

async function logWeb3FormsAttempt({
    organizationId,
    to,
    subject,
    status,
    relatedId,
    metadata,
}: {
    organizationId: string;
    to: string;
    subject: string;
    status: "sent" | "failed";
    relatedId: string;
    metadata?: Record<string, unknown>;
}) {
    try {
        await createAdminClient().from("communication_logs").insert({
            organization_id: organizationId,
            channel: "email",
            kind: "contact_notification",
            recipient_email: to,
            subject,
            status,
            provider: "web3forms",
            provider_message_id: null,
            related_table: "contact_submissions",
            related_id: relatedId,
            metadata: metadata ?? {},
        });
    } catch (error) {
        console.error("[submitContact] web3forms log failed", error);
    }
}

export async function submitContact(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const organization = String(formData.get("organization") ?? "").trim();
    const expertSlug = String(formData.get("expertSlug") ?? "").trim();
    const contextPlan = String(formData.get("contextPlan") ?? "").trim();
    const contextVertical = String(formData.get("contextVertical") ?? "").trim();

    if (!name || !email || !subject || !message) {
        throw new Error("Missing required contact fields.");
    }

    const { firstName, lastName } = splitName(name);
    const admin = createAdminClient();

    const { data: organizationRow, error: orgError } = await admin
        .from("organizations")
        .select("id")
        .eq("slug", ORG_SLUG)
        .single();

    if (orgError || !organizationRow) {
        console.error("[submitContact] organization lookup failed", orgError);
        throw new Error("Organization lookup failed.");
    }

    const metadataLines = [
        organization ? `Organización: ${organization}` : null,
        contextVertical ? `Área de interés: ${contextVertical}` : null,
        contextPlan ? `Plan de interés: ${contextPlan}` : null,
        expertSlug && expertSlug !== "contacto-web"
            ? `Destino interno: ${expertSlug}`
            : null,
    ].filter(Boolean);

    const finalMessage = [
        ...metadataLines,
        metadataLines.length > 0 ? "" : null,
        message,
    ]
        .filter(Boolean)
        .join("\n");

    const { data: submission, error: insertError } = await admin
        .from("contact_submissions")
        .insert({
            organization_id: organizationRow.id,
            first_name: firstName,
            last_name: lastName,
            email,
            subject,
            message: finalMessage,
            status: "new",
        })
        .select("id")
        .single();

    if (insertError || !submission) {
        console.error("[submitContact] insert failed", insertError);
        throw new Error("Contact insert failed.");
    }

    const notificationSubject = `Nuevo contacto web · ${subject}`;

    const notificationResult = await sendEmail({
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: notificationSubject,
        kind: "contact_notification",
        relatedTable: "contact_submissions",
        relatedId: submission.id,
        metadata: {
            source: "web-fortius-consulting",
            contactEmail: email,
            contactSubject: subject,
            organization: organization || null,
            contextPlan: contextPlan || null,
            contextVertical: contextVertical || null,
            expertSlug: expertSlug || null,
        },
        html: getContactNotificationHtml({
            name,
            email,
            subject,
            organization,
            contextVertical,
            contextPlan,
            message: finalMessage,
        }),
    });

    let fallbackNotificationResult: { success: boolean; error?: unknown } | null = null;

    if (!notificationResult.success) {
        fallbackNotificationResult = await sendContactNotificationWithWeb3Forms({
            name,
            email,
            subject,
            organization,
            contextVertical,
            contextPlan,
            message: finalMessage,
        });

        await logWeb3FormsAttempt({
            organizationId: organizationRow.id,
            to: NOTIFICATION_EMAIL,
            subject: notificationSubject,
            status: fallbackNotificationResult.success ? "sent" : "failed",
            relatedId: submission.id,
            metadata: {
                source: "web-fortius-consulting",
                fallbackFor: "resend",
                resendError: notificationResult.error ?? null,
                error: fallbackNotificationResult.success ? null : fallbackNotificationResult.error,
            },
        });
    }

    const confirmationResult = await sendEmail({
        to: email,
        replyTo: NOTIFICATION_EMAIL,
        subject: "Hemos recibido tu mensaje — Fortius Consulting",
        html: getContactConfirmationHtml({ name, subject }),
        kind: "contact_confirmation",
        relatedTable: "contact_submissions",
        relatedId: submission.id,
        metadata: {
            source: "web-fortius-consulting",
            contactSubject: subject,
        },
    });

    if (!notificationResult.success) {
        console.error("[submitContact] notification failed", notificationResult.error);
    }

    if (fallbackNotificationResult && !fallbackNotificationResult.success) {
        console.error("[submitContact] web3forms fallback failed", fallbackNotificationResult.error);
    }

    if (!confirmationResult.success) {
        console.error("[submitContact] confirmation failed", confirmationResult.error);
    }

    return {
        success: true,
        message: confirmationResult.success
            ? "Tu mensaje ha quedado registrado. Te hemos enviado un email de confirmación."
            : "Tu mensaje ha quedado registrado. El equipo de Fortius te responderá en menos de 48 horas.",
    };
}

