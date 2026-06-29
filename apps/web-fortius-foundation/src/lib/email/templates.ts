function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getContactNotificationHtml(input: {
  name: string;
  email: string;
  subject: string;
  organization?: string;
  message: string;
  attachmentName?: string;
}) {
  const escapedMessage = escapeHtml(input.message).replaceAll("\n", "<br />");
  return `
    <div style="font-family: Georgia, serif; max-width: 720px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(input.subject)}</p>
      <p><strong>Organización:</strong> ${escapeHtml(input.organization || "No indicada")}</p>
      <p><strong>Adjunto:</strong> ${escapeHtml(input.attachmentName || "No adjunto")}</p>
      <div style="margin-top: 20px; border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; line-height: 1.7;">
        ${escapedMessage}
      </div>
    </div>
  `;
}

export function getContactConfirmationHtml(input: {
  name: string;
  subject: string;
}) {
  return `
    <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Hemos recibido tu mensaje</h2>
      <p>Hola ${escapeHtml(input.name)},</p>
      <p>Te confirmamos que hemos recibido correctamente tu mensaje sobre <strong>${escapeHtml(input.subject)}</strong>.</p>
      <p>El equipo de Fortius Foundation lo revisará y te responderá en breve.</p>
      <p style="margin-top: 24px;">Si necesitas ampliar información, puedes responder a este correo.</p>
      <p style="margin-top: 24px;"><strong>Fortius Foundation</strong></p>
    </div>
  `;
}

export function getDonationNotificationHtml(input: {
  name: string;
  email: string;
  entity: string;
  target: string;
  amount: string;
  organization?: string;
  notes?: string;
}) {
  return `
    <div style="font-family: Georgia, serif; max-width: 720px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 4px; color: #14532d;">Nuevo interés de donación</h2>
      <p style="margin: 0 0 20px; font-size: 13px; color: #6b7280;">Fundación Fortius — formulario /donaciones</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 160px; font-size: 13px;">Nombre</td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${escapeHtml(input.email)}</td></tr>
        ${input.organization ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Organización</td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${escapeHtml(input.organization)}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Entidad</td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${escapeHtml(input.entity)}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Destino</td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${escapeHtml(input.target)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Importe orientativo</td><td style="padding: 8px 0; font-size: 14px; font-weight: bold;">${escapeHtml(input.amount || "No indicado")}</td></tr>
      </table>
      ${input.notes ? `<div style="margin-top: 20px; border: 1px solid #e5e7eb; background: #f9fafb; padding: 16px; line-height: 1.7; font-size: 14px;">${escapeHtml(input.notes).replaceAll("\n", "<br />")}</div>` : ""}
    </div>
  `;
}

export function getDonationConfirmationHtml(input: { name: string; entity: string; target: string }) {
  return `
    <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Gracias por tu interés en donar</h2>
      <p>Hola ${escapeHtml(input.name)},</p>
      <p>Hemos recibido tu expresión de interés para apoyar a <strong>${escapeHtml(input.entity)}</strong> con destino a <strong>${escapeHtml(input.target)}</strong>.</p>
      <p>El equipo de Fundación Fortius revisará tu solicitud y se pondrá en contacto contigo a la mayor brevedad para coordinar los detalles de la donación.</p>
      <p style="margin-top: 24px;">Si tienes cualquier pregunta, puedes responder a este correo o escribirnos directamente a <a href="mailto:info@fundacionfortius.org" style="color: #16a34a;">info@fundacionfortius.org</a>.</p>
      <p style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #9ca3af;">Fundación Fortius España · Fortius Foundation United States</p>
    </div>
  `;
}

export function getNewsletterNotificationHtml(email: string) {
  return `
    <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Nueva suscripción al boletín</h2>
      <p>Se ha registrado una nueva suscripción al boletín de Fortius Foundation.</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    </div>
  `;
}

export function getNewsletterConfirmationHtml(email: string) {
  return `
    <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #14532d;">Suscripción confirmada</h2>
      <p>Hemos dado de alta el email <strong>${escapeHtml(email)}</strong> en el boletín de Fortius Foundation.</p>
      <p>Recibirás nuestras próximas actualizaciones en este correo.</p>
      <p style="margin-top: 24px;"><strong>Fortius Foundation</strong></p>
    </div>
  `;
}
