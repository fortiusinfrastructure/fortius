'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { requestPasswordReset } from '@/lib/auth/actions';

const inputClass = 'w-full rounded-lg px-4 py-2.5 text-sm border transition-colors duration-150 outline-none placeholder:opacity-40';
const inputStyle = { background: 'var(--surface-secondary)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' };
const inputFocusStyle = { borderColor: 'var(--color-accent-500)', boxShadow: '0 0 0 3px rgba(233,71,72,0.15)' };

export default function RecuperarForm() {
    const [isPending, startTransition] = useTransition();
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [focused, setFocused] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await requestPasswordReset(formData);
            if (result?.error) {
                setError(result.error);
            } else {
                setSent(true);
            }
        });
    }

    if (sent) {
        return (
            <div className="flex flex-col gap-4 text-center">
                <div className="rounded-lg px-4 py-5 text-sm leading-relaxed"
                    style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--text-primary)' }}>
                    <p className="font-medium" style={{ color: '#10b981' }}>Correo enviado</p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Si tu email está registrado, recibirás un enlace para restablecer tu contraseña en los próximos minutos.
                        Revisa también la carpeta de spam.
                    </p>
                </div>
                <Link href="/login" className="text-xs hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-accent-400)' }}>
                    ← Volver al inicio de sesión
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                    autoFocus
                    placeholder="tu@email.com"
                    className={inputClass}
                    style={focused ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </div>

            {error && (
                <p className="rounded-lg px-3 py-2 text-xs"
                    style={{ background: 'rgba(233,71,72,0.1)', color: 'var(--color-accent-300)', border: '1px solid rgba(233,71,72,0.2)' }}>
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="mt-1 w-full rounded-lg py-2.5 text-sm font-medium tracking-wide transition-opacity duration-150 disabled:opacity-50"
                style={{ background: 'var(--color-accent-500)', color: '#fff' }}
            >
                {isPending ? 'Enviando…' : 'Enviar enlace de recuperación'}
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
