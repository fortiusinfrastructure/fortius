'use client';

import { useState, useTransition } from 'react';
import { signUp } from '@/lib/auth/actions';
import Link from 'next/link';

export default function SignupForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

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
            <div className="flex flex-col gap-4 text-center">
                <div className="rounded-full bg-green-100 p-3 self-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium">¡Registro casi completado!</h3>
                <p className="text-sm text-gray-600">
                    Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revísalo para activar tu cuenta.
                </p>
                <Link
                    href="/login"
                    className="mt-2 text-sm font-medium text-black hover:underline"
                >
                    Volver al inicio de sesión
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="text-sm font-medium">
                    Nombre completo
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    minLength={6}
                    className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={isPending}
                className="mt-2 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
                {isPending ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>

            <p className="text-center text-xs text-gray-500 mt-2">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="font-medium text-black hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </form>
    );
}
