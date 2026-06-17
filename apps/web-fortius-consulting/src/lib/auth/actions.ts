'use server';

import { createServerClient, createAdminClient } from '@fortius/database';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SITE_URL } from '@/lib/site-config';

export type AuthResult = {
    error?: string;
    success?: boolean;
};

/**
 * Self-service signup is intentionally disabled in Consulting.
 *
 * Accounts are provisioned only by the Stripe checkout webhook:
 *   /api/webhooks/stripe → resolveOrInviteUser(email)
 * which calls `admin.auth.admin.inviteUserByEmail` after a successful
 * `checkout.session.completed`. Supabase then emails the user a magic
 * link to set their password.
 *
 * This stub is kept so any orphan import does not break the build, but
 * it rejects every call. The /registro route also redirects to /login.
 */
export async function signUp(_formData: FormData): Promise<AuthResult> {
    console.warn('[auth/actions] signUp invoked but is disabled (Stripe-gated provisioning).');
    return {
        error: 'El registro directo está deshabilitado. El acceso se activa al contratar una suscripción.',
    };
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
