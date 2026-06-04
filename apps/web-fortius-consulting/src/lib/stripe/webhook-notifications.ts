/**
 * Stripe webhook email notifications for Fortius Consulting.
 * Pattern ported from web-escuela-hispanica.
 * Sends confirmations to the subscriber and internal alerts to APPROVER_EMAIL.
 */

import type Stripe from 'stripe';
import { sendEmail } from '@/lib/email';

const NOTIFICATION_EMAIL =
    process.env.APPROVER_EMAIL || 'info@fortiusconsulting.org';

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
    const inv = invoice as Stripe.Invoice & { subscription?: string | null };
    return typeof inv.subscription === 'string' ? inv.subscription : undefined;
}

function formatAmount(cents: number, currency: string) {
    return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

/** Sent to subscriber + internal alert when a subscription checkout succeeds. */
export async function sendMembershipCheckoutEmails(session: Stripe.Checkout.Session) {
    const email = session.customer_details?.email || session.customer_email;
    if (!email) return;

    const fullName = session.customer_details?.name || email;
    const tier = session.metadata?.tier || 'suscripción';
    const amount = session.amount_total ?? 0;
    const currency = session.currency || 'eur';

    await sendEmail({
        to: email,
        subject: '✅ Pago confirmado — Fortius Consulting',
        html: getPaymentReceiptHtml({ fullName, amount, currency, reference: session.id, description: `Alta de ${tier} en Fortius Consulting` }),
        kind: 'confirmation',
        relatedTable: 'user_memberships',
        relatedId: session.metadata?.membershipId,
        metadata: { tier, stripe_session_id: session.id },
    });

    await sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: `💰 Nueva suscripción activada — ${tier}`,
        html: `<h2>Nueva suscripción activada</h2><p><strong>Tier:</strong> ${tier}</p><p><strong>Email:</strong> ${email}</p><p><strong>Importe:</strong> ${formatAmount(amount, currency)}</p><p><strong>Stripe Session:</strong> ${session.id}</p>`,
        kind: 'notification',
        relatedTable: 'user_memberships',
        relatedId: session.metadata?.membershipId,
        metadata: { tier, stripe_session_id: session.id },
    });
}

/** Sent on successful recurring charge (not the first one — that's sendMembershipCheckoutEmails). */
export async function sendInvoiceReceiptEmails(invoice: Stripe.Invoice) {
    if (!invoice.customer_email) return;

    const description = invoice.lines.data[0]?.description || 'Renovación de suscripción';
    const subscriptionId = getInvoiceSubscriptionId(invoice);

    await sendEmail({
        to: invoice.customer_email,
        subject: '✅ Cobro recurrente confirmado — Fortius Consulting',
        html: getPaymentReceiptHtml({
            fullName: invoice.customer_name || invoice.customer_email,
            amount: invoice.amount_paid,
            currency: invoice.currency || 'eur',
            reference: invoice.number || invoice.id,
            description,
        }),
        kind: 'receipt',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });

    await sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: '💳 Pago recurrente recibido — Fortius Consulting',
        html: `<h2>Pago recurrente recibido</h2><p><strong>Email:</strong> ${invoice.customer_email}</p><p><strong>Importe:</strong> ${formatAmount(invoice.amount_paid, invoice.currency || 'eur')}</p><p><strong>Concepto:</strong> ${description}</p>`,
        kind: 'notification',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });
}

/** Sent when a recurring charge fails. Alerts subscriber and internal team. */
export async function sendInvoiceFailedEmails(invoice: Stripe.Invoice) {
    if (!invoice.customer_email) return;

    const description = invoice.lines.data[0]?.description || 'Suscripción Fortius Consulting';
    const subscriptionId = getInvoiceSubscriptionId(invoice);

    await sendEmail({
        to: invoice.customer_email,
        subject: '⚠️ No se pudo procesar tu renovación — Fortius Consulting',
        html: getPaymentFailedHtml({ fullName: invoice.customer_name || invoice.customer_email, description }),
        kind: 'failure',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });

    await sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: '⚠️ Pago recurrente fallido — Fortius Consulting',
        html: `<h2>Pago recurrente fallido</h2><p><strong>Email:</strong> ${invoice.customer_email}</p><p><strong>Concepto:</strong> ${description}</p><p><strong>Importe:</strong> ${formatAmount(invoice.amount_due, invoice.currency || 'eur')}</p>`,
        kind: 'notification',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });
}

// ── HTML templates (inline, Fortius Consulting style) ──────────────────────

function getPaymentReceiptHtml({ fullName, amount, currency, reference, description }: {
    fullName: string;
    amount: number;
    currency: string;
    reference: string;
    description: string;
}) {
    const formatted = formatAmount(amount, currency);
    const date = new Date().toLocaleDateString('es-ES');
    return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#111827;">
<h2 style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;">Confirmación de pago</h2>
<p>Estimado/a <strong>${fullName}</strong>,</p>
<p>Tu pago ha sido procesado correctamente.</p>
<table style="width:100%;border-collapse:collapse;margin:24px 0;">
<tr><td style="padding:8px 0;color:#6b7280;">Concepto</td><td style="padding:8px 0;text-align:right;">${description}</td></tr>
<tr><td style="padding:8px 0;color:#6b7280;">Importe</td><td style="padding:8px 0;text-align:right;font-weight:bold;">${formatted}</td></tr>
<tr><td style="padding:8px 0;color:#6b7280;">Fecha</td><td style="padding:8px 0;text-align:right;">${date}</td></tr>
<tr><td style="padding:8px 0;color:#6b7280;">Referencia</td><td style="padding:8px 0;text-align:right;font-size:12px;color:#9ca3af;">${reference}</td></tr>
</table>
<p>Accede a tu área privada en <a href="https://fortiusconsulting.org/area-privada">fortiusconsulting.org/area-privada</a>.</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;"/>
<p style="font-size:12px;color:#9ca3af;">Fortius Consulting · Mensaje automático.</p>
</div>`;
}

function getPaymentFailedHtml({ fullName, description }: { fullName: string; description: string }) {
    return `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#111827;">
<h2 style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;color:#b91c1c;">Aviso: pago no procesado</h2>
<p>Estimado/a <strong>${fullName}</strong>,</p>
<p>No hemos podido procesar el cobro de: <strong>${description}</strong>.</p>
<p>Para evitar la interrupción del servicio, actualiza tu método de pago o contacta con tu banco.</p>
<p style="margin-top:24px;">Si necesitas ayuda, escríbenos a <a href="mailto:info@fortiusconsulting.org">info@fortiusconsulting.org</a>.</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;"/>
<p style="font-size:12px;color:#9ca3af;">Fortius Consulting · Mensaje automático.</p>
</div>`;
}
