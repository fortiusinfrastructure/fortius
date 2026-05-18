"use server";

import { createClient } from "@supabase/supabase-js";
import { sendInternalContactNotification } from "@/lib/email";

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

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
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
    const escapedMessage = escapeHtml(finalMessage).replaceAll("\n", "<br />");

    const notificationResult = await sendInternalContactNotification({
        to: NOTIFICATION_EMAIL,
        replyTo: email,
        subject: notificationSubject,
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
        html: `
            <div style="font-family: Georgia, serif; max-width: 720px; margin: 0 auto; padding: 24px; color: #111827;">
                <h2 style="margin: 0 0 16px; color: #7f1d1d;">Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
                <p><strong>Organización:</strong> ${escapeHtml(organization || "No indicada")}</p>
                <p><strong>Área:</strong> ${escapeHtml(contextVertical || "General")}</p>
                <p><strong>Plan:</strong> ${escapeHtml(contextPlan || "No indicado")}</p>
                <div style="margin-top: 20px; border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; line-height: 1.7;">
                    ${escapedMessage}
                </div>
            </div>
        `,
    });

    if (!notificationResult.success) {
        console.error("[submitContact] notification failed", notificationResult.error);
    }

    return {
        success: true,
        message:
            "Tu mensaje ha quedado registrado. El equipo de Fortius te responderá en menos de 48 horas.",
    };
}
