import type Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { getPaymentFailedTemplate, getPaymentReceiptTemplate } from '@/lib/email/templates';

const APPROVER_EMAIL = process.env.APPROVER_EMAIL || 'info@escuelahispanica.org';

function getInvoiceSubscriptionId(invoice: Stripe.Invoice) {
    const invoiceWithLegacyFields = invoice as Stripe.Invoice & {
        subscription?: string | null;
    };
    return typeof invoiceWithLegacyFields.subscription === 'string'
        ? invoiceWithLegacyFields.subscription
        : undefined;
}

export async function sendEventRegistrationEmails(registration: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    event_slug: string;
    amount: number | null;
}) {
    const fullName = `${registration.first_name} ${registration.last_name}`;

    await sendEmail({
        to: registration.email,
        subject: `✅ Confirmación de inscripción — ${registration.event_slug}`,
        html: getPaymentReceiptTemplate({
            fullName,
            amount: Math.round((registration.amount ?? 0) * 100),
            currency: 'eur',
            date: new Date().toLocaleDateString('es-ES'),
            reference: registration.id,
            description: `Inscripción al evento ${registration.event_slug}`,
        }),
        kind: 'confirmation',
        relatedTable: 'event_registrations',
        relatedId: registration.id,
        metadata: { event_slug: registration.event_slug },
    });

    await sendEmail({
        to: APPROVER_EMAIL,
        subject: `💰 Nueva inscripción pagada — ${registration.event_slug}`,
        html: `<h2>Nueva inscripción pagada</h2><p><strong>Evento:</strong> ${registration.event_slug}</p><p><strong>Nombre:</strong> ${fullName}</p><p><strong>Email:</strong> ${registration.email}</p>`,
        kind: 'notification',
        relatedTable: 'event_registrations',
        relatedId: registration.id,
        metadata: { event_slug: registration.event_slug },
    });
}

export async function sendMembershipCheckoutEmails(session: Stripe.Checkout.Session) {
    const email = session.customer_details?.email || session.customer_email;
    if (!email) return;

    const fullName = session.customer_details?.name || email;
    const tier = session.metadata?.tier || 'membresía';

    await sendEmail({
        to: email,
        subject: `✅ Pago confirmado — ${tier}`,
        html: getPaymentReceiptTemplate({
            fullName,
            amount: session.amount_total ?? 0,
            currency: session.currency || 'eur',
            date: new Date().toLocaleDateString('es-ES'),
            reference: session.id,
            description: `Alta de ${tier} en Escuela Hispánica`,
        }),
        kind: 'confirmation',
        relatedTable: 'user_memberships',
        relatedId: session.metadata?.membershipId,
        metadata: { tier, stripe_session_id: session.id },
    });

    await sendEmail({
        to: APPROVER_EMAIL,
        subject: `💰 Nueva suscripción activada — ${tier}`,
        html: `<h2>Nueva suscripción activada</h2><p><strong>Tier:</strong> ${tier}</p><p><strong>Email:</strong> ${email}</p><p><strong>Stripe Session:</strong> ${session.id}</p>`,
        kind: 'notification',
        relatedTable: 'user_memberships',
        relatedId: session.metadata?.membershipId,
        metadata: { tier, stripe_session_id: session.id },
    });
}

export async function sendInvoiceReceiptEmails(invoice: Stripe.Invoice) {
    if (!invoice.customer_email) return;

    const description = invoice.lines.data[0]?.description || 'Renovación de suscripción';
    const subscriptionId = getInvoiceSubscriptionId(invoice);
    await sendEmail({
        to: invoice.customer_email,
        subject: '✅ Cobro recurrente confirmado',
        html: getPaymentReceiptTemplate({
            fullName: invoice.customer_name || invoice.customer_email,
            amount: invoice.amount_paid,
            currency: invoice.currency || 'eur',
            date: new Date().toLocaleDateString('es-ES'),
            reference: invoice.number || invoice.id,
            description,
        }),
        kind: 'receipt',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });

    await sendEmail({
        to: APPROVER_EMAIL,
        subject: '💳 Pago recurrente recibido',
        html: `<h2>Pago recurrente recibido</h2><p><strong>Email:</strong> ${invoice.customer_email}</p><p><strong>Importe:</strong> ${(invoice.amount_paid / 100).toFixed(2)} ${(invoice.currency || 'eur').toUpperCase()}</p>`,
        kind: 'notification',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });
}

export async function sendInvoiceFailedEmails(invoice: Stripe.Invoice) {
    if (!invoice.customer_email) return;

    const description = invoice.lines.data[0]?.description || 'Suscripción Escuela Hispánica';
    const subscriptionId = getInvoiceSubscriptionId(invoice);
    await sendEmail({
        to: invoice.customer_email,
        subject: '⚠️ No se pudo procesar tu renovación',
        html: getPaymentFailedTemplate({
            fullName: invoice.customer_name || invoice.customer_email,
            description,
        }),
        kind: 'failure',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });

    await sendEmail({
        to: APPROVER_EMAIL,
        subject: '⚠️ Pago recurrente fallido',
        html: `<h2>Pago recurrente fallido</h2><p><strong>Email:</strong> ${invoice.customer_email}</p><p><strong>Concepto:</strong> ${description}</p>`,
        kind: 'notification',
        relatedTable: 'subscriptions',
        relatedId: subscriptionId,
        metadata: { invoice_id: invoice.id },
    });
}

export async function sendEventRecoveryEmail({
    email,
    recoveryUrl,
    registrationId,
    eventSlug,
}: {
    email: string;
    recoveryUrl: string;
    registrationId: string;
    eventSlug: string;
}) {
    await sendEmail({
        to: email,
        subject: '💡 Tu enlace de inscripción ha expirado',
        html: `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;"><h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Enlace de pago expirado</h2><p>Hemos generado un enlace nuevo para completar tu inscripción al evento <strong>${eventSlug}</strong>.</p><div style="text-align: center; margin: 32px 0;"><a href="${recoveryUrl}" style="background-color: #c5a059; color: #050a14; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 4px;">Continuar con el pago</a></div></div>`,
        kind: 'reminder',
        relatedTable: 'event_registrations',
        relatedId: registrationId,
        metadata: { event_slug: eventSlug },
    });
}