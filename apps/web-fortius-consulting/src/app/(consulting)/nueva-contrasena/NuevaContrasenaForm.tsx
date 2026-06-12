'use client';

/**
 * NuevaContrasenaForm
 *
 * After the user clicks the recovery link in their email, Supabase verifies
 * the OTP and redirects to /nueva-contrasena with the session tokens in the
 * URL hash: #access_token=...&refresh_token=...&type=recovery
 *
 * The Supabase browser client reads the hash automatically and fires the
 * PASSWORD_RECOVERY event via onAuthStateChange. We wait for that event
 * before showing the form, so we know we have a valid recovery session.
 * On submit we call supabase.auth.updateUser() directly (client-side)
 * because the session lives in the browser at this point.
 */

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

const inputClass = 'w-full rounded-lg px-4 py-2.5 text-sm border transition-colors duration-150 outline-none placeholder:opacity-40';
const inputStyle = { background: 'var(--surface-secondary)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' };
const inputFocusStyle = { borderColor: 'var(--color-accent-500)', boxShadow: '0 0 0 3px rgba(233,71,72,0.15)' };

type State = 'checking' | 'ready' | 'invalid';

export default function NuevaContrasenaForm() {
    const [state, setState] = useState<State>('checking');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [focused, setFocused] = useState<string | null>(null);

    useEffect(() => {
        // Parse the URL hash manually — createBrowserClient (@supabase/ssr) uses
        // cookie storage and does NOT auto-process hash tokens, so we can't rely
        // on the PASSWORD_RECOVERY event. Instead we call setSession() directly.
        const params = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');

        if (!accessToken || !refreshToken || type !== 'recovery') {
            setState('invalid');
            return;
        }

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );

        supabase.auth
            .setSession({ access_token: accessToken, refresh_token: refreshToken })
            .then(({ error }) => setState(error ? 'invalid' : 'ready'));
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const data = new FormData(e.currentTarget);
        const password = data.get('password') as string;
        const confirm = data.get('confirm') as string;

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        if (password !== confirm) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        startTransition(async () => {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            );
            const { error: updateError } = await supabase.auth.updateUser({ password });
            if (updateError) {
                setError('No se pudo actualizar la contraseña. Solicita un nuevo enlace.');
                return;
            }
            await supabase.auth.signOut();
            window.location.href = '/login?reset=ok';
        });
    }

    // Loading state while Supabase reads the hash tokens
    if (state === 'checking') {
        return (
            <p className="text-center text-sm py-4" style={{ color: 'var(--text-tertiary)' }}>
                Verificando enlace…
            </p>
        );
    }

    // Expired or invalid link
    if (state === 'invalid') {
        return (
            <div className="flex flex-col gap-4 text-center">
                <p className="rounded-lg px-3 py-3 text-xs"
                    style={{ background: 'rgba(233,71,72,0.1)', color: 'var(--color-accent-300)', border: '1px solid rgba(233,71,72,0.2)' }}>
                    El enlace ha expirado o no es válido. Solicita uno nuevo.
                </p>
                <Link href="/recuperar-contrasena"
                    className="text-xs font-medium hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-accent-400)' }}>
                    Solicitar nuevo enlace →
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Nueva contraseña
                </label>
                <input
                    id="password" name="password" type="password"
                    required minLength={8} autoComplete="new-password" autoFocus
                    placeholder="Mínimo 8 caracteres"
                    className={inputClass}
                    style={focused === 'password' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Confirmar contraseña
                </label>
                <input
                    id="confirm" name="confirm" type="password"
                    required minLength={8} autoComplete="new-password"
                    placeholder="Repite la contraseña"
                    className={inputClass}
                    style={focused === 'confirm' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocused('confirm')} onBlur={() => setFocused(null)}
                />
            </div>

            {error && (
                <p className="rounded-lg px-3 py-2 text-xs"
                    style={{ background: 'rgba(233,71,72,0.1)', color: 'var(--color-accent-300)', border: '1px solid rgba(233,71,72,0.2)' }}>
                    {error}
                </p>
            )}

            <button type="submit" disabled={isPending}
                className="mt-1 w-full rounded-lg py-2.5 text-sm font-medium tracking-wide transition-opacity duration-150 disabled:opacity-50"
                style={{ background: 'var(--color-accent-500)', color: '#fff' }}>
                {isPending ? 'Guardando…' : 'Guardar nueva contraseña'}
            </button>

            <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/login" className="hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-accent-400)' }}>
                    ← Volver al inicio de sesión
                </Link>
            </p>
        </form>
    );
}
