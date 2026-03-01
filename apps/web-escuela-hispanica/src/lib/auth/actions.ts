'use server';

import { createServerClient, createAdminClient } from '@fortius/database';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
        type: 'signup',
        email,
        password,
        options: {
            data: { full_name: fullName },
            redirectTo: `${siteUrl}/api/auth/callback`,
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
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #c5a059;">Bienvenido a Escuela Hispánica</h2>
            <p>Estimado/a ${fullName},</p>
            <p>Gracias por unirte a nuestra comunidad. Para activar tu cuenta y acceder a la plataforma, por favor haz clic en el siguiente enlace:</p>
            <div style="margin: 30px 0;">
                <a href="${linkData.properties.action_link}" style="background-color: #c5a059; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px;">VERIFICAR MI CUENTA</a>
            </div>
            <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p style="font-size: 12px; color: #666; word-break: break-all;">${linkData.properties.action_link}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #999;">Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>
    `;

    const emailResult = await sendEmail({
        to: email,
        subject: 'Verifica tu cuenta en Escuela Hispánica',
        html: emailHtml,
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

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

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
    redirect('/');
}
