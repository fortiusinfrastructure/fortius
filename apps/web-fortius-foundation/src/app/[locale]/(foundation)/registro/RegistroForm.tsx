'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
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
    boxShadow: '0 0 0 3px rgba(22,163,74,0.15)',
};

export default function RegistroForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [focusedField, setFocusedField] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(false);
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
            <div className="text-center">
                <p className="rounded-lg px-4 py-3 text-sm"
                    style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
                    ¡Registro exitoso! Revisa tu correo electrónico para verificar tu cuenta.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Nombre */}
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
                    autoComplete="name"
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
                    placeholder="••••••••"
                    minLength={8}
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
                className="mt-1 w-full rounded-lg py-2.5 text-sm font-medium tracking-wide uppercase transition-opacity duration-150 disabled:opacity-50"
                style={{ background: 'var(--color-accent-500)', color: '#fff' }}
            >
                {isPending ? 'Registrando…' : 'Registrarse'}
            </button>
        </form>
    );
}
