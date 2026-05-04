import { NextResponse, type NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { createAdminClient } from '@fortius/database';
import { verifyApprovalToken } from '@/lib/stripe/tokens';
import {
    createAcademicPaymentToken,
    buildAcademicPaymentUrl,
} from '@/lib/stripe/academic-payment';
import { sendEmail } from '@/lib/email';

/**
 * GET /api/admin/approve?token=xxx
 *
 * Called when the approver clicks "APROBAR" in their email.
 * 1. Verifies the HMAC token
 * 2. Updates membership status to 'approved'
 * 3. Creates a Stripe Checkout Session for the académico subscription
 * 4. Sends the applicant an email with the payment link
 * 5. Shows a confirmation page
 */
export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
        return new NextResponse(renderPage('Error', 'Token no proporcionado.'), {
            status: 400,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    const decoded = verifyApprovalToken(token);

    if (!decoded || decoded.action !== 'approve') {
        return new NextResponse(
            renderPage('Token Inválido', 'Este enlace ha expirado o ya fue utilizado.'),
            { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        );
    }

    const admin = createAdminClient();

    // Get the membership and associated user
    const { data: membership } = await admin
        .from('user_memberships')
        .select('*')
        .eq('id', decoded.membershipId)
        .single();

    if (!membership || membership.status !== 'pending') {
        return new NextResponse(
            renderPage('Ya procesado', 'Esta solicitud ya fue procesada anteriormente.'),
            { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        );
    }

    // Generate a long-lived payment token for the intermediate page
    const paymentToken = createAcademicPaymentToken(decoded.membershipId);

    // Update status to approved and store payment token
    await admin
        .from('user_memberships')
        .update({
            status: 'approved',
            approved_at: new Date().toISOString(),
            payment_link_id: paymentToken,
        })
        .eq('id', decoded.membershipId);

    // Get user email from auth
    const { data: authUser } = await admin.auth.admin.getUserById(
        membership.user_id,
    );

    if (!authUser?.user) {
        return new NextResponse(
            renderPage('Error', 'No se encontró el usuario asociado.'),
            { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        );
    }

    const userEmail = authUser.user.email!;
    const fullName = authUser.user.user_metadata?.full_name || userEmail;

    // Build the intermediate payment page URL (never expires — generates fresh Stripe session on demand)
    const paymentUrl = buildAcademicPaymentUrl(decoded.membershipId, paymentToken);

    // Send approval email to the applicant (Académico II — Aprobación)
    await sendEmail({
        to: userEmail,
        subject: 'Resultado de su solicitud como Miembro Académico',
        html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Candidatura Aceptada</h2>
        <p>Estimado/a ${fullName},</p>
        <p>Nos complace informarle que su candidatura como Miembro Académico de Escuela Hispánica ha sido aceptada por nuestro comité científico.</p>
        <p>Está ahora a un paso de convertirse en miembro pleno y comenzar a participar activamente en nuestra comunidad, un espacio de referencia donde investigadores y académicos intercambian ideas, reflexionan y colaboran en proyectos de alto nivel.</p>
        <p>Para formalizar su membresía anual, complete su suscripción en el siguiente enlace:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${paymentUrl}" style="display: inline-block; background: #c5a059; color: #050a14; padding: 16px 40px; text-decoration: none; font-weight: bold; font-size: 14px;">FORMALIZAR MI MEMBRESÍA</a>
        </div>
        <p style="font-size: 13px; color: #666;">Una vez completada la suscripción, podrá disfrutar de los beneficios exclusivos de miembro.</p>
        <p>Le damos la bienvenida a este proyecto y esperamos que su participación enriquezca tanto su experiencia como la de toda nuestra comunidad académica.</p>
        <p style="margin-top: 30px;">Reciba un cordial saludo,</p>
        <p><strong>Secretaría</strong><br>Escuela Hispánica</p>
      </div>
    `,
    });

    return new NextResponse(
        renderPage(
            'Candidatura Aprobada ✓',
            `Se ha aprobado la candidatura de <strong>${fullName}</strong> (${userEmail}).<br><br>Se le ha enviado un email con el enlace de pago para activar su membresía.`,
        ),
        { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
}

function renderPage(title: string, message: string): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Escuela Hispánica</title>
  <style>
    body { font-family: Georgia, serif; background: #050a14; color: #e8e0d4; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { max-width: 500px; text-align: center; border: 1px solid rgba(197,160,89,0.3); padding: 48px 36px; }
    h1 { color: #c5a059; font-size: 24px; margin-bottom: 16px; }
    p { line-height: 1.6; color: #e8e0d4bb; font-size: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
