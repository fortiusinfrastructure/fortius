'use client';

/**
 * NuevaContrasenaForm
 *
 * Used for both flows that land here with session tokens in the URL hash:
 *   * Password recovery: `#access_token=...&refresh_token=...&type=recovery`
 *   * Invite (post Stripe checkout): same shape with `type=invite`
 *
 * We parse the hash manually because `createBrowserClient` (`@supabase/ssr`)
 * uses cookie storage and does NOT auto-process hash tokens. `setSession()`
 * activates the session client-side so `updateUser({ password })` works.
 */

import { useState, useEffect, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { createBrowserClient } from '@supabase/ssr';

const inputClass = 'w-full rounded-lg px-4 py-2.5 text-sm border transition-colors duration-150 outline-none placeholder:opacity-40';
const inputStyle = { background: 'var(--surface-secondary)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' };
const inputFocusStyle = { borderColor: 'var(--color-accent-500)', boxShadow: '0 0 0 3px rgba(233,71,72,0.15)' };

type State = 'checking' | 'ready' | 'invalid';
type Flow = 'recovery' | 'invite';

export default function NuevaContrasenaForm() {
    const t = useTranslations('nueva-contrasena');
    const [state, setState] = useState<State>('checking');
    const [flow, setFlow] = useState<Flow>('recovery');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [focused, setFocused] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');

        if (!accessToken || !refreshToken || (type !== 'recovery' && type !== 'invite')) {
            setState('invalid');
            return;
        }

        setFlow(type);

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
            setError(t('error-short'));
            return;
        }
        if (password !== confirm) {
            setError(t('error-mismatch'));
            return;
        }

        startTransition(async () => {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            );
            const { error: updateError } = await supabase.auth.updateUser({ password });
            if (updateError) {
                setError(t('error-update'));
                return;
            }
            await supabase.auth.signOut();
            window.location.href = flow === 'invite' ? '/login?activated=ok' : '/login?reset=ok';
        });
    }

    if (state === 'checking') {
        return (
            <p className="text-center text-sm py-4" style={{ color: 'var(--text-tertiary)' }}>
                {t('checking')}
            </p>
        );
    }

    if (state === 'invalid') {
        return (
            <div className="flex flex-col gap-4 text-center">
                <p className="rounded-lg px-3 py-3 text-xs"
                    style={{ background: 'rgba(233,71,72,0.1)', color: 'var(--color-accent-300)', border: '1px solid rgba(233,71,72,0.2)' }}>
                    {t('invalid')}
                </p>
                <Link href="/recuperar-contrasena"
                    className="text-xs font-medium hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-accent-400)' }}>
                    {t('request-new')}
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    {t('new-password')}
                </label>
                <input
                    id="password" name="password" type="password"
                    required minLength={8} autoComplete="new-password" autoFocus
                    placeholder={t('placeholder-new')}
                    className={inputClass}
                    style={focused === 'password' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    {t('confirm')}
                </label>
                <input
                    id="confirm" name="confirm" type="password"
                    required minLength={8} autoComplete="new-password"
                    placeholder={t('placeholder-confirm')}
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
                {isPending ? t('pending') : t('submit')}
            </button>

            <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <Link href="/login" className="hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-accent-400)' }}>
                    {t('back-login')}
                </Link>
            </p>
        </form>
    );
}
