'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') ?? '/admin';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError(authError.message === 'Invalid login credentials'
                    ? 'Credenciales incorrectas. Verifica tu email y contraseña.'
                    : authError.message);
                return;
            }

            router.push(redirectTo);
            router.refresh();
        } catch {
            setError('Error inesperado. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-xl mb-4">
                        <span className="text-white font-bold text-lg">IE</span>
                    </div>
                    <h1 className="text-white text-xl font-bold">IEAM Admin</h1>
                    <p className="text-slate-400 text-sm mt-1">Acceso restringido a editores</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-6 space-y-4 shadow-2xl"
                >
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#1a3a5c] text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 transition-colors"
                    >
                        {loading && <Loader2 size={15} className="animate-spin" />}
                        {loading ? 'Accediendo…' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}
