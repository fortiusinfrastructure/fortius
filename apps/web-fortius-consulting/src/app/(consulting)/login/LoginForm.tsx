'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get('redirect');
    // Only allow internal paths (avoid open redirects)
    const redirectTo = redirectParam?.startsWith('/') && !redirectParam.startsWith('//')
        ? redirectParam
        : '/area-privada';

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
            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Correo electrónico
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
                <label htmlFor="password" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Contraseña
                </label>
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
                {isPending ? 'Accediendo…' : 'Acceder'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
                <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>o</span>
                <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
            </div>

            {/* Register link */}
            <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                ¿Sin cuenta?{' '}
                <Link href={`/registro${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}
                    className="font-medium transition-colors hover:opacity-80"
                    style={{ color: 'var(--color-accent-400)' }}>
                    Créala aquí
                </Link>
            </p>
        </form>
    );
}
