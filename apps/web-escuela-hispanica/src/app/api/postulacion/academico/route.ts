import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, createAdminClient } from '@fortius/database';
import { createApprovalToken } from '@/lib/stripe/tokens';
import { sendEmail } from '@/lib/email';

/**
 * POST /api/postulacion/academico
 *
 * Handles academic membership applications.
 * 1. Validates the user is authenticated
 * 2. Creates a pending membership record
 * 3. Uploads CV to Supabase Storage (optional for now)
 * 4. Sends notification email to the approver
 * 5. Sends confirmation email to the applicant
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const motivation = formData.get('motivation') as string;
        const cv = formData.get('cv') as File | null;
        const name = formData.get('name') as string;
        const email = (formData.get('email') as string)?.toLowerCase();

        const admin = createAdminClient();
        const supabase = await createServerClient();

        let targetUser;
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (currentUser) {
            targetUser = currentUser;
        } else {
            if (!email || !name) {
                return NextResponse.json(
                    { error: 'Email y nombre son requeridos' },
                    { status: 400 },
                );
            }

            // Check if user exists
            const { data: existingUser } = await admin.auth.admin.listUsers();
            const foundUser = existingUser.users.find(u => u.email === email);

            if (foundUser) {
                targetUser = foundUser;
            } else {
                // Create shadow user
                const { data: newUser, error: createError } = await admin.auth.admin.createUser({
                    email,
                    user_metadata: { full_name: name },
                    email_confirm: true, // No password yet, will activate later
                });

                if (createError) throw createError;
                targetUser = newUser.user;
            }
        }

        // Get EH organization
        const { data: org } = await admin
            .from('organizations')
            .select('id')
            .eq('slug', 'escuela-hispanica')
            .single();

        if (!org) {
            return NextResponse.json(
                { error: 'Organización no encontrada' },
                { status: 500 },
            );
        }

        // Check for existing membership
        const { data: existingMembership } = await admin
            .from('user_memberships')
            .select('id, status, tier')
            .eq('user_id', targetUser.id)
            .eq('organization_id', org.id)
            .single();

        if (existingMembership) {
            if (existingMembership.status === 'active') {
                return NextResponse.json(
                    { error: 'Ya existe una membresía activa para este correo' },
                    { status: 400 },
                );
            }
            if (existingMembership.status === 'pending') {
                return NextResponse.json(
                    { error: 'Ya tienes una postulación pendiente' },
                    { status: 400 },
                );
            }
        }

        // Upload CV if provided
        let cvUrl: string | null = null;
        if (cv && cv.size > 0) {
            const fileExt = cv.name.split('.').pop();
            const filePath = `academico/${targetUser.id}/cv.${fileExt}`;

            const { error: uploadError } = await admin.storage
                .from('postulaciones')
                .upload(filePath, cv, { upsert: true });

            if (!uploadError) {
                const { data: publicUrl } = admin.storage
                    .from('postulaciones')
                    .getPublicUrl(filePath);
                cvUrl = publicUrl.publicUrl;
            }
        }

        // Create pending membership
        const { data: membership, error: membershipError } = await admin
            .from('user_memberships')
            .insert({
                user_id: targetUser.id,
                organization_id: org.id,
                role: 'member',
                tier: 'academico',
                status: 'pending',
            })
            .select()
            .single();

        if (membershipError) {
            console.error('[postulacion/academico] membership error:', membershipError);
            return NextResponse.json(
                { error: 'Error al registrar la postulación' },
                { status: 500 },
            );
        }

        // Generate approval/rejection tokens
        const approveToken = createApprovalToken(membership.id, 'approve');
        const rejectToken = createApprovalToken(membership.id, 'reject');

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const approveUrl = `${siteUrl}/api/admin/approve?token=${encodeURIComponent(approveToken)}`;
        const rejectUrl = `${siteUrl}/api/admin/reject?token=${encodeURIComponent(rejectToken)}`;

        const fullName = targetUser.user_metadata?.full_name || name || targetUser.email;
        const targetEmail = targetUser.email || email;

        // Send email to approver
        const approverEmail = process.env.APPROVER_EMAIL;
        if (approverEmail) {
            await sendEmail({
                to: approverEmail,
                subject: `Nueva solicitud académica: ${fullName}`,
                html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
            <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Nueva Solicitud de Miembro Académico</h2>
            <p><strong>Nombre:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${targetEmail}</p>
            ${motivation ? `<p><strong>Motivación:</strong> ${motivation}</p>` : ''}
            ${cvUrl ? `<p><strong>CV:</strong> <a href="${cvUrl}" style="color: #c5a059;">Descargar CV</a></p>` : ''}
            <div style="margin-top: 30px; display: flex; gap: 12px;">
              <a href="${approveUrl}" style="display: inline-block; background: #2d6a4f; color: white; padding: 12px 32px; text-decoration: none; font-weight: bold; margin-right: 12px;">✓ APROBAR</a>
              <a href="${rejectUrl}" style="display: inline-block; background: #d32f2f; color: white; padding: 12px 32px; text-decoration: none; font-weight: bold;">✗ RECHAZAR</a>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #999;">Estos enlaces son de un solo uso y expiran en 30 días.</p>
          </div>
        `,
            });
        }

        // Send confirmation to applicant
        if (targetEmail) {
            await sendEmail({
                to: targetEmail,
                subject: 'Solicitud recibida — Escuela Hispánica',
                html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
              <h2 style="color: #1a1a2e; border-bottom: 2px solid #c5a059; padding-bottom: 12px;">Solicitud Recibida</h2>
              <p>Estimado/a ${fullName},</p>
              <p>Hemos recibido su solicitud para el programa de <strong>Miembro Académico</strong> de la Escuela Hispánica.</p>
              <p>Nuestro comité revisará su perfil y le notificaremos el resultado a la brevedad.</p>
              <p style="margin-top: 30px; color: #666;">Atentamente,<br>Secretaría — Escuela Hispánica</p>
            </div>
          `,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[postulacion/academico]', error);
        return NextResponse.json(
            { error: 'Error al procesar la solicitud' },
            { status: 500 },
        );
    }
}
