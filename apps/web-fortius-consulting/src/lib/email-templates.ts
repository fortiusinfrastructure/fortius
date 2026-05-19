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
    contextVertical?: string;
    contextPlan?: string;
    message: string;
}) {
    const escapedMessage = escapeHtml(input.message).replaceAll("\n", "<br />");
    return `
        <div style="font-family: Georgia, serif; max-width: 720px; margin: 0 auto; padding: 24px; color: #111827;">
            <h2 style="margin: 0 0 16px; color: #7f1d1d;">Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${escapeHtml(input.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
            <p><strong>Asunto:</strong> ${escapeHtml(input.subject)}</p>
            <p><strong>Organización:</strong> ${escapeHtml(input.organization || "No indicada")}</p>
            <p><strong>Área:</strong> ${escapeHtml(input.contextVertical || "General")}</p>
            <p><strong>Plan:</strong> ${escapeHtml(input.contextPlan || "No indicado")}</p>
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
            <h2 style="margin: 0 0 16px; color: #7f1d1d;">Hemos recibido tu mensaje</h2>
            <p>Hola ${escapeHtml(input.name)},</p>
            <p>Te confirmamos que hemos recibido correctamente tu mensaje sobre <strong>${escapeHtml(input.subject)}</strong>.</p>
            <p>El equipo de Fortius Consulting lo revisará y te responderá en menos de 48 horas.</p>
            <p style="margin-top: 24px;">Si necesitas ampliar información, puedes responder a este correo.</p>
            <p style="margin-top: 24px;"><strong>Fortius Consulting</strong></p>
        </div>
    `;
}

export function getNewsletterNotificationHtml(email: string) {
    return `
        <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #111827;">
            <h2 style="margin: 0 0 16px; color: #7f1d1d;">Nueva suscripción al boletín</h2>
            <p>Se ha registrado una nueva suscripción al boletín de Fortius Consulting.</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        </div>
    `;
}

export function getNewsletterConfirmationHtml(email: string) {
    return `
        <div style="font-family: Georgia, serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #111827;">
            <h2 style="margin: 0 0 16px; color: #7f1d1d;">Suscripción confirmada</h2>
            <p>Hemos dado de alta el email <strong>${escapeHtml(email)}</strong> en el boletín de Fortius Consulting.</p>
            <p>Recibirás nuestras próximas notas, análisis y avisos editoriales en este correo.</p>
            <p style="margin-top: 24px;"><strong>Fortius Consulting</strong></p>
        </div>
    `;
}