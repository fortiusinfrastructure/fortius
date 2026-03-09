import { NextResponse, type NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { createAdminClient } from '@fortius/database';
import { verifyApprovalToken } from '@/lib/stripe/tokens';
import { sendEmail } from '@/lib/email';

/**
 * GET /api/admin/reject?token=xxx
 *
 * Called when the approver clicks "RECHAZAR" in their email.
 * 1. Verifies the HMAC token
 * 2. Updates membership status to 'rejected'
 * 3. Sends the applicant a rejection email
 * 4. Shows a confirmation page
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

    if (!decoded || decoded.action !== 'reject') {
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

    // Update status to rejected
    await admin
        .from('user_memberships')
        .update({ status: 'rejected' })
        .eq('id', decoded.membershipId);

    // Get user info for email
    const { data: authUser } = await admin.auth.admin.getUserById(
        membership.user_id,
    );

    if (authUser?.user) {
        const fullName = authUser.user.user_metadata?.full_name || authUser.user.email;

        // Académico III — Rechazo
        await sendEmail({
            to: authUser.user.email!,
            subject: 'Resultado de su solicitud como Miembro Académico',
            html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Resultado de su Solicitud</h2>
          <p>Estimado/a ${fullName},</p>
          <p>Nos dirigimos a usted para informarle que, tras la evaluación de su candidatura, el comité científico de Escuela Hispánica ha decidido rechazar su solicitud como Miembro Académico en esta ocasión.</p>
          <p>No obstante, le animamos a que considere volver a postular pasado un lapso de seis meses. Asimismo, le invitamos a participar en alguno de los eventos organizados por Escuela Hispánica. Estos espacios ofrecen una excelente oportunidad para compartir ideas, dialogar y estrechar vínculos con los miembros de nuestra comunidad.</p>
          <p>Agradecemos sinceramente el interés mostrado en formar parte de la Escuela y esperamos contar con su participación en nuestras actividades más adelante.</p>
          <p style="margin-top: 30px;"><strong>Secretaría</strong><br>Escuela Hispánica</p>
        </div>
      `,
        });
    }

    const userEmail = authUser?.user?.email || 'desconocido';

    return new NextResponse(
        renderPage(
            'Candidatura Rechazada',
            `Se ha rechazado la candidatura de <strong>${userEmail}</strong>.<br><br>Se le ha enviado un email informándole.`,
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
