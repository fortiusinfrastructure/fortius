'use server';

import { createServerClient, createAdminClient } from '@fortius/database';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SITE_URL } from '@/lib/site-config';

export type AuthResult = {
    error?: string;
    success?: boolean;
};

export async function signUp(formData: FormData): Promise<AuthResult> {
    const admin = createAdminClient();

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !fullName) {
        return { error: 'Todos los campos son obligatorios.' };
    }

    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
        type: 'signup',
        email,
        password,
        options: {
            data: { full_name: fullName },
            redirectTo: `${SITE_URL}/api/auth/callback`,
        },
    });

    if (linkError) {
        if (linkError.message.includes('already registered')) {
            return { error: 'Este email ya está registrado.' };
        }
        return { error: linkError.message };
    }

    if (!linkData?.properties?.action_link) {
        return { error: 'Error al generar el enlace de verificación.' };
    }

    const { sendEmail } = await import('@/lib/email');

    const emailHtml = `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <h2 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px;">Bienvenido a Fortius Consulting</h2>
            <p>Estimado/a ${fullName},</p>
            <p>Gracias por unirte a nuestra plataforma. Para activar tu cuenta y proceder con tu suscripción, por favor haz clic en el siguiente enlace:</p>
            <div style="margin: 35px 0; text-align: center;">
                <a href="${linkData.properties.action_link}" style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: bold; display: inline-block;">VERIFICAR MI CUENTA</a>
            </div>
            <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${linkData.properties.action_link}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 11px; color: #999;">Este es un mensaje automático de Fortius Consulting. Por favor, no respondas a este correo.</p>
        </div>
    `;

    const emailResult = await sendEmail({
        to: email,
        subject: 'Verifica tu cuenta — Fortius Consulting',
        html: emailHtml,
        kind: 'auth_signup',
    });

    if (!emailResult.success) {
        console.error('[auth/actions] Failed to send verification email', emailResult.error);
        return { error: 'Error al enviar el correo de verificación. Por favor, intenta de nuevo.' };
    }

    return { success: true };
}

export async function signIn(formData: FormData): Promise<AuthResult> {
    const supabase = await createServerClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email y contraseña son obligatorios.' };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error: 'Credenciales incorrectas.' };
    }

    revalidatePath('/', 'layout');
    return { success: true };
}

export async function signOut(): Promise<void> {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/login');
}

/**
 * Step 1 of password recovery: generate a recovery link and email it.
 * Always returns success to prevent email enumeration.
 */
export async function requestPasswordReset(formData: FormData): Promise<AuthResult> {
    const email = (formData.get('email') as string)?.trim();
    if (!email) return { error: 'El email es obligatorio.' };

    const admin = createAdminClient();
    const { data: linkData } = await admin.auth.admin.generateLink({
        type: 'recovery',
        email,
        options: {
            // Redirects directly to /nueva-contrasena with tokens in the URL hash.
            // The Supabase browser client reads the hash and fires PASSWORD_RECOVERY.
            // NOTE: this URL must be in the Supabase Auth → Redirect URLs allowlist.
            redirectTo: `${SITE_URL}/nueva-contrasena`,
        },
    });

    // Only send email if the account exists; always return success to the client
    if (linkData?.properties?.action_link) {
        const { sendEmail } = await import('@/lib/email');
        const html = `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                <h2 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px;">Recupera tu contraseña</h2>
                <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Fortius Consulting.</p>
                <p>Haz clic en el siguiente enlace para crear una nueva contraseña. El enlace caduca en <strong>1 hora</strong>.</p>
                <div style="margin: 35px 0; text-align: center;">
                    <a href="${linkData.properties.action_link}"
                       style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: bold; display: inline-block;">
                        RESTABLECER CONTRASEÑA
                    </a>
                </div>
                <p>Si el botón no funciona, copia y pega esta URL en tu navegador:</p>
                <p style="font-size: 12px; color: #666; word-break: break-all;">${linkData.properties.action_link}</p>
                <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                <p style="font-size: 11px; color: #999;">Mensaje automático de Fortius Consulting. No respondas a este correo.</p>
            </div>
        `;
        await sendEmail({
            to: email,
            subject: 'Restablece tu contraseña — Fortius Consulting',
            html,
            kind: 'auth_password_reset',
        });
    }

    return { success: true };
}

/**
 * Step 2 of password recovery: save the new password.
 * Called after the user has a valid session (via /api/auth/callback).
 */
export async function updatePassword(formData: FormData): Promise<AuthResult> {
    const password = formData.get('password') as string;
    const confirm = formData.get('confirm') as string;

    if (!password || password.length < 8) {
        return { error: 'La contraseña debe tener al menos 8 caracteres.' };
    }
    if (password !== confirm) {
        return { error: 'Las contraseñas no coinciden.' };
    }

    const supabase = await createServerClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        return { error: 'No se pudo actualizar la contraseña. El enlace puede haber expirado.' };
    }

    revalidatePath('/', 'layout');
    redirect('/login?reset=ok');
}
