'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';

export function EventRegistrationForm({ 
    eventName, 
    eventId,
    amount = 0,
    currency = 'eur'
}: { 
    eventName: string; 
    eventId: string;
    amount?: number;
    currency?: string;
}) {
    const t = useTranslations('EventRegistration');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const isPaidEvent = amount > 0;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        const body = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
            institution: formData.get('institution') as string,
            message: formData.get('message') as string,
            event_slug: eventId,
            event_name: eventName,
            amount: amount,
            currency: currency,
            locale: window.location.pathname.split('/')[1] || 'es',
        };

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit');
            }

            const data = await res.json();

            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
                return; // Browser redirects, stop execution
            }

            setStatus('success');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error('Registration error:', message);
            setErrorMessage(message);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-[#050a14] border border-[#c5a059]/30 p-8 text-center animate-fade-in shadow-[0_0_30px_rgba(197,160,89,0.05)]">
                <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">{t('successTitle')}</h3>
                <p className="text-white/60 font-light mb-6">
                    {t.rich('successMessage', {
                        eventName,
                        strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 border rounded-md border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-cinzel text-xs tracking-widest uppercase transition-all"
                >
                    {t('successBack')}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#050a14] border border-white/5 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/10 blur-3xl -z-10 rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl -z-10 rounded-full mix-blend-screen" />

            <div className="mb-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <h3 className="font-serif text-2xl text-white mb-2">{t('title')}</h3>
                        <p className="text-[#c5a059] font-cinzel text-xs tracking-widest uppercase mb-1">{eventName}</p>
                    </div>
                    {/* Payment badge — only rendered for paid events */}
                    {isPaidEvent && (
                        <div className="flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-sm shrink-0">
                            <Lock className="w-3 h-3 text-[#c5a059]" />
                            <span className="font-cinzel text-[#c5a059] text-xs tracking-widest uppercase font-semibold">
                                {amount}{currency.toUpperCase() === 'EUR' ? '€' : currency.toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>
                <div className="w-12 h-[1px] bg-white/20 mt-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                        <label htmlFor="first_name" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">{t('firstName')}</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder={t('firstNamePlaceholder')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="last_name" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">{t('lastName')}</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder={t('lastNamePlaceholder')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">{t('email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder={t('emailPlaceholder')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="institution" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">{t('institution')}</label>
                        <input
                            type="text"
                            id="institution"
                            name="institution"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder={t('institutionPlaceholder')}
                        />
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <label htmlFor="message" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">{t('message')}</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors resize-none"
                        placeholder={t('messagePlaceholder')}
                    />
                </div>

                {status === 'error' && (
                    <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-200 text-sm">
                        {errorMessage || t('errorDefault')}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-[#c5a059] hover:bg-[#d4b475] disabled:opacity-50 disabled:cursor-not-allowed text-[#050a14] font-cinzel text-sm tracking-widest uppercase py-4 transition-all"
                >
                    {status === 'loading' ? t('submitting') : (
                        isPaidEvent 
                            ? <>{t('submit')} ({amount}€) <Lock className="w-4 h-4 ml-1" /></>
                            : t('submit')
                    )}
                </button>

                <p className="text-xs text-white/40 font-light text-center mt-4">
                    {isPaidEvent 
                        ? 'Será redirigido a Stripe para completar el pago de forma segura.' 
                        : t('disclaimer')}
                </p>
            </form>
        </div>
    );
}
