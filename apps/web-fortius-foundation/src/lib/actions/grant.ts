"use server";

import { sendEmail } from "@/lib/email";

const NOTIFICATION_EMAIL = "info@fundacionfortius.org";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export interface GrantApplicationResult {
  success: boolean;
  error?: string;
}

export async function submitGrantApplication(
  formData: FormData,
): Promise<GrantApplicationResult> {
  const grantSlug = String(formData.get("grantSlug") ?? "").trim();
  const grantTitle = String(formData.get("grantTitle") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const amount = String(formData.get("amount") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const motivation = String(formData.get("motivation") ?? "").trim();

  if (!name || !email || !description || !motivation) {
    return { success: false, error: "Por favor, completa todos los campos obligatorios." };
  }

  const notificationHtml = `
    <div style="font-family: Georgia, serif; max-width: 720px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Nueva solicitud de ayuda</h2>
      <p style="margin: 4px 0;"><strong>Convocatoria:</strong> ${escapeHtml(grantTitle)} (${escapeHtml(grantSlug)})</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
      <p style="margin: 4px 0;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p style="margin: 4px 0;"><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${organization ? `<p style="margin: 4px 0;"><strong>Organización:</strong> ${escapeHtml(organization)}</p>` : ""}
      ${amount ? `<p style="margin: 4px 0;"><strong>Importe solicitado:</strong> ${escapeHtml(amount)}</p>` : ""}
      <div style="margin-top: 20px;">
        <p><strong>Descripción del proyecto / situación:</strong></p>
        <div style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(description)}</div>
      </div>
      <div style="margin-top: 20px;">
        <p><strong>Motivación / Uso de fondos:</strong></p>
        <div style="border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(motivation)}</div>
      </div>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Solicitud recibida — Fundación Fortius</h2>
      <p>Estimado/a ${escapeHtml(name)},</p>
      <p>Hemos recibido tu solicitud para la convocatoria <strong>${escapeHtml(grantTitle)}</strong>.</p>
      <p>El equipo de Fundación Fortius la revisará y se pondrá en contacto contigo en los próximos días.</p>
      <p>Si tienes cualquier consulta, puedes escribirnos a <a href="mailto:${NOTIFICATION_EMAIL}" style="color: #16a34a;">${NOTIFICATION_EMAIL}</a>.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">Mensaje automático de Fundación Fortius. No respondas a este correo.</p>
    </div>
  `;

  const [notifResult, confirmResult] = await Promise.all([
    sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `Nueva solicitud de ayuda · ${grantTitle}`,
      html: notificationHtml,
      kind: "grant_application_notification",
      metadata: { grantSlug, applicantEmail: email },
    }),
    sendEmail({
      to: email,
      replyTo: NOTIFICATION_EMAIL,
      subject: `Tu solicitud ha sido recibida — ${grantTitle}`,
      html: confirmationHtml,
      kind: "grant_application_confirmation",
      metadata: { grantSlug },
    }),
  ]);

  if (!notifResult.success) {
    console.error("[grant/submitApplication] notification failed", notifResult.error);
    return {
      success: false,
      error: "No hemos podido enviar tu solicitud. Por favor, inténtalo de nuevo.",
    };
  }

  if (!confirmResult.success) {
    console.error("[grant/submitApplication] confirmation email failed", confirmResult.error);
  }

  return { success: true };
}
