'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Loader2 } from 'lucide-react';

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
    const router = useRouter();
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
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            );
            const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

            if (authError) {
                setError(authError.message === 'Invalid login credentials' ? 'Credenciales incorrectas.' : authError.message);
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
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>

            {error ? <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{error}</p> : null}

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#050a14] hover:bg-[#162235] text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 transition-colors">
                {loading ? <Loader2 size={15} className="animate-spin" /> : null}
                {loading ? 'Accediendo…' : 'Iniciar sesión'}
            </button>
        </form>
    );
}