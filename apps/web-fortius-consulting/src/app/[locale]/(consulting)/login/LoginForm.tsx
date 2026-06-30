'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { signIn } from '@/lib/auth/actions';

const inputClass = [
    'w-full rounded-lg px-4 py-2.5 text-sm',
    'border transition-colors duration-150 outline-none',
    'placeholder:opacity-40',
].join(' ');

const inputStyle = {
    background: 'var(--surface-secondary)',
    borderColor: 'var(--border-default)',
    color: 'var(--text-primary)',
};

const inputFocusStyle = {
    borderColor: 'var(--color-accent-500)',
    boxShadow: '0 0 0 3px rgba(233,71,72,0.15)',
};

export default function LoginForm() {
    const t = useTranslations("login");
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get('redirect');
    // Only allow internal paths (avoid open redirects)
    const redirectTo = redirectParam?.startsWith('/') && !redirectParam.startsWith('//')
        ? redirectParam
        : '/area-privada';

    const resetOk = searchParams.get('reset') === 'ok';
    const activatedOk = searchParams.get('activated') === 'ok';

    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [focusedField, setFocusedField] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await signIn(formData);
            if (result?.error) {
                setError(result.error);
            } else {
                router.push(redirectTo);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {resetOk && (
                <p className="rounded-lg px-3 py-2 text-xs"
                    style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
                    {t("reset-ok")}
                </p>
            )}
            {activatedOk && (
                <p className="rounded-lg px-3 py-2 text-xs"
                    style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
                    {t("activated-ok")}
                </p>
            )}
            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    {t("email-label")}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tu@email.com"
                    className={inputClass}
                    style={focusedField === 'email' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-medium tracking-wide uppercase"
                        style={{ color: 'var(--text-tertiary)' }}>
                        {t("password-label")}
                    </label>
                    <Link href="/recuperar-contrasena"
                        className="text-[10px] hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--color-accent-400)' }}>
                        {t("forgot")}
                    </Link>
                </div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={inputClass}
                    style={focusedField === 'password' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                />
            </div>

            {/* Error */}
            {error && (
                <p className="rounded-lg px-3 py-2 text-xs"
                    style={{ background: 'rgba(233,71,72,0.1)', color: 'var(--color-accent-300)', border: '1px solid rgba(233,71,72,0.2)' }}>
                    {error}
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="mt-1 w-full rounded-lg py-2.5 text-sm font-medium tracking-wide transition-opacity duration-150 disabled:opacity-50"
                style={{ background: 'var(--color-accent-500)', color: '#fff' }}
            >
                {isPending ? t("pending") : t("submit")}
            </button>
        </form>
    );
}
