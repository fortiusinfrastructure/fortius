'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { updatePassword } from '@/lib/auth/actions';

const inputClass = 'w-full rounded-lg px-4 py-2.5 text-sm border transition-colors duration-150 outline-none placeholder:opacity-40';
const inputStyle = { background: 'var(--surface-secondary)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' };
const inputFocusStyle = { borderColor: 'var(--color-accent-500)', boxShadow: '0 0 0 3px rgba(233,71,72,0.15)' };

export default function NuevaContrasenaForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [focused, setFocused] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updatePassword(formData);
            // On success, updatePassword() calls redirect() server-side → this line never runs
            if (result?.error) setError(result.error);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* New password */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Nueva contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    autoFocus
                    placeholder="Mínimo 8 caracteres"
                    className={inputClass}
                    style={focused === 'password' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                />
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Confirmar contraseña
                </label>
                <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Repite la contraseña"
                    className={inputClass}
                    style={focused === 'confirm' ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
                    onFocus={() => setFocused('confirm')}
                    onBlur={() => setFocused(null)}
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
