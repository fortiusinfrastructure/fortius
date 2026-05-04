/**
 * Generates the HTML for a payment receipt email.
 */
export function getPaymentReceiptTemplate({
    fullName,
    amount,
    currency,
    date,
    reference,
    description,
}: {
    fullName: string;
    amount: number;
    currency: string;
    date: string;
    reference: string;
    description: string;
}) {
    const formattedAmount = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency.toUpperCase(),
    }).format(amount / 100);

    return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Recibo de Pago</h2>
      <p>Estimado/a ${fullName},</p>
      <p>Confirmamos la recepción de su pago. A continuación, encontrará los detalles de la transacción:</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Concepto:</strong> ${description}</p>
        <p style="margin: 5px 0;"><strong>Importe:</strong> ${formattedAmount}</p>
        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${date}</p>
        <p style="margin: 5px 0; font-size: 14px; color: #666;"><strong>Referencia de transacción:</strong> ${reference}</p>
      </div>
      
      <p>Le agradecemos su compromiso y apoyo a la labor de Escuela Hispánica.</p>
      <p style="margin-top: 30px;"><strong>Secretaría</strong><br>Escuela Hispánica</p>
    </div>
  `;
}

/**
 * Generates the HTML for an academic payment reminder email.
 */
export function getAcademicReminderTemplate({
    fullName,
    paymentUrl,
    reminderNumber,
}: {
    fullName: string;
    paymentUrl: string;
    reminderNumber: number;
}) {
    const urgencyLabels: Record<number, string> = {
        1: 'Recordatorio — Membresía Académica',
        2: 'Segundo recordatorio — Membresía Académica',
        3: 'Último recordatorio — Membresía Académica',
    };

    const title = urgencyLabels[reminderNumber] || 'Recordatorio — Membresía Académica';

    return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">${title}</h2>
      <p>Estimado/a ${fullName},</p>
      <p>Nos ponemos en contacto con usted para recordarle que su candidatura como <strong>Miembro Académico de Escuela Hispánica</strong> ha sido <strong>aprobada</strong>, pero aún no hemos recibido la confirmación de pago necesaria para activar su membresía.</p>

      <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #c5a059;">
        <p style="margin: 5px 0;"><strong>Estado:</strong> Aprobado, pendiente de pago</p>
      </div>

      <p>Para formalizar su membresía, por favor complete el pago a través del siguiente enlace seguro:</p>
      <div style="margin: 30px 0; text-align: center;">
        <a href="${paymentUrl}" style="display: inline-block; background: #c5a059; color: #050a14; padding: 16px 40px; text-decoration: none; font-weight: bold; font-size: 14px;">COMPLETAR PAGO</a>
      </div>
      <p style="font-size: 13px; color: #666;">Este enlace es personal y no caduca. Puede utilizarlo cuando lo desee.</p>
      ${reminderNumber === 3 ? '<p style="color: #d32f2f; font-weight: bold;">Este es nuestro último recordatorio. Si no completamos el pago, su solicitud quedará archivada.</p>' : ''}
      <p>Si tiene alguna dificultad o pregunta, no dude en contactar con nuestra Secretaría respondiendo a este correo.</p>
      <p style="margin-top: 30px;">Reciba un cordial saludo,</p>
      <p><strong>Secretaría</strong><br>Escuela Hispánica</p>
    </div>
  `;
}

/**
 * Generates the HTML for a failed payment notification email.
 */
export function getPaymentFailedTemplate({
    fullName,
    description,
}: {
    fullName: string;
    description: string;
}) {
    return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #d32f2f; padding-bottom: 12px;">Aviso de Pago Fallido</h2>
      <p>Estimado/a ${fullName},</p>
      <p>Le informamos que no hemos podido procesar el cobro automático correspondiente a su suscripción:</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Concepto:</strong> ${description}</p>
        <p style="margin: 5px 0; color: #d32f2f;"><strong>Estado:</strong> Pago no procesado</p>
      </div>
      
      <p>Para asegurar la continuidad de sus beneficios como miembro, le rogamos que actualice su método de pago a la mayor brevedad posible.</p>
      <p>Si experimenta alguna dificultad o requiere asistencia, no dude en contactarnos respondiendo a este correo.</p>
      
      <p style="margin-top: 30px;">Reciba un cordial saludo,</p>
      <p><strong>Secretaría</strong><br>Escuela Hispánica</p>
    </div>
  `;
}
