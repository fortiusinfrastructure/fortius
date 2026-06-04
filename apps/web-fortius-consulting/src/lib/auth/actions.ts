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
