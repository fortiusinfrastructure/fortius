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
