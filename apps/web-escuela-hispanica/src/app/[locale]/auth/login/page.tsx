'use client';

import React, { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { signIn } from '@/lib/auth/actions';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';
    const callbackError = searchParams.get('error');
    const t = useTranslations('Auth.Login');

    const [error, setError] = useState<string | null>(
        callbackError === 'callback_failed' ? t('errorCallback') : null,
    );
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await signIn(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            router.push(redirect as any);
            router.refresh();
        }
    }

    return (
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-12">
                    <Link href="/">
                        <img
                            src="/recursos/logo.svg"
                            alt="Escuela Hispánica"
                            className="h-24 w-auto mx-auto mb-6 opacity-80"
                        />
                    </Link>
                    <p className="font-cinzel text-[10px] tracking-[0.3em] text-white/40 uppercase">
                        {t('access')}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400 font-serif">
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2"
                        >
                            {t('emailLabel')}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white font-serif text-sm placeholder-white/20 focus:border-[#c5a059]/50 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/20 transition-colors"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2"
                        >
                            {t('passwordLabel')}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white font-serif text-sm placeholder-white/20 focus:border-[#c5a059]/50 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/20 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#c5a059] text-[#050a14] font-cinzel text-[10px] tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? t('submitting') : t('submit')}
                    </button>
                </form>

                {/* Register link */}
                <div className="mt-8 text-center">
                    <p className="font-serif text-sm text-white/40">
                        {t('noAccount')}{' '}
                        <Link href="/auth/register" className="text-[#c5a059] hover:text-white transition-colors">
                            {t('register')}
                        </Link>
                    </p>
                </div>

                {/* Back to home */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="font-cinzel text-[9px] tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors uppercase"
                    >
                        {t('backHome')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
