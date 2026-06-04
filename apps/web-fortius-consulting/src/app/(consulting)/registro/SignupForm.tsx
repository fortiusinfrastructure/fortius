'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth/actions';

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

export default function SignupForm() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [focusedField, setFocusedField] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await signUp(formData);
            if (result?.error) {
                setError(result.error);
            } else {
                setSuccess(true);
            }
        });
    }

    if (success) {
        return (
            <div className="flex flex-col items-center gap-5 text-center py-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: 'rgba(233,71,72,0.12)', border: '1px solid rgba(233,71,72,0.25)' }}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        style={{ color: 'var(--color-accent-400)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-serif text-lg font-light italic" style={{ color: 'var(--text-primary)' }}>
                        ¡Cuenta creada!
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Hemos enviado un enlace de verificación a tu correo.<br />
                        Revísalo para activar el acceso.
                    </p>
                </div>
                <Link href="/login"
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: 'var(--color-accent-400)' }}>
                    Ir al acceso →
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Nombre completo
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className={inputClass}
                    style={focusedField === 'fullName' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                />
            </div>

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
                    autoComplete="new-password"
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
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
                {isPending ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
                <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>o</span>
                <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
            </div>

            {/* Login link */}
            <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                ¿Ya tienes cuenta?{' '}
                <Link href={`/login${searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : ''}`}
                    className="font-medium transition-colors hover:opacity-80"
                    style={{ color: 'var(--color-accent-400)' }}>
                    Inicia sesión
                </Link>
            </p>
        </form>
    );
}
