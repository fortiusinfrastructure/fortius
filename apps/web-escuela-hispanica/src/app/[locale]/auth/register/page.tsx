'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { signUp } from '@/lib/auth/actions';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
    const t = useTranslations('Auth.Register');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        const password = formData.get('password') as string;
        if (password.length < 8) {
            setError(t('passwordError'));
            setLoading(false);
            return;
        }

        const result = await signUp(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#050a14] flex items-center justify-center px-4">
                <div className="w-full max-w-md text-center">
                    <div className="mb-8">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#c5a059]/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-2xl text-white mb-4">{t('successTitle')}</h2>
                        <p className="font-serif text-sm text-white/50 leading-relaxed">
                            {t('successMessage')}
                        </p>
                    </div>

                    <Link
                        href="/auth/login"
                        className="font-cinzel text-[9px] tracking-[0.15em] text-[#c5a059] hover:text-white transition-colors uppercase"
                    >
                        {t('goToLogin')}
                    </Link>
                </div>
            </div>
        );
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
                        {t('join')}
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
                            htmlFor="fullName"
                            className="block font-cinzel text-[9px] tracking-[0.2em] text-white/50 uppercase mb-2"
                        >
                            {t('fullNameLabel')}
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white font-serif text-sm placeholder-white/20 focus:border-[#c5a059]/50 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/20 transition-colors"
                            placeholder={t('fullNamePlaceholder')}
                        />
                    </div>

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
                            autoComplete="new-password"
                            minLength={8}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white font-serif text-sm placeholder-white/20 focus:border-[#c5a059]/50 focus:outline-none focus:ring-1 focus:ring-[#c5a059]/20 transition-colors"
                            placeholder={t('passwordPlaceholder')}
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

                {/* Login link */}
                <div className="mt-8 text-center">
                    <p className="font-serif text-sm text-white/40">
                        {t('hasAccount')}{' '}
                        <Link href="/auth/login" className="text-[#c5a059] hover:text-white transition-colors">
                            {t('login')}
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
