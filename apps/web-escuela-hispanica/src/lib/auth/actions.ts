'use server';

import { createServerClient } from '@fortius/database';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export type AuthResult = {
    error?: string;
    success?: boolean;
};

export async function signUp(formData: FormData): Promise<AuthResult> {
    const supabase = await createServerClient();

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || !fullName) {
        return { error: 'Todos los campos son obligatorios.' };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName },
            emailRedirectTo: `${siteUrl}/auth/callback`,
        },
    });

    if (error) {
        if (error.message.includes('already registered')) {
            return { error: 'Este email ya está registrado.' };
        }
        return { error: error.message };
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
