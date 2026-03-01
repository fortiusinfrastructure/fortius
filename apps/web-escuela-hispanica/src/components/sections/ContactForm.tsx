'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, CheckCircle } from 'lucide-react';

export default function ContactForm() {
    const t = useTranslations('Contacto.Form');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Client-side validation
        const firstName = formData.get('first_name') as string;
        const lastName = formData.get('last_name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
            setStatus('error');
            setErrorMsg('Por favor, completa todos los campos requeridos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setStatus('error');
            setErrorMsg('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Error de conexión. Revisa tu conexión a internet e intenta nuevamente.');
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-[#0a111e] border border-[#c5a059]/30 p-12 text-center animate-fade-in shadow-[0_0_50px_-12px_rgba(197,160,89,0.1)]">
                <CheckCircle className="w-16 h-16 text-[#c5a059] mx-auto mb-6 stroke-1" />
                <h3 className="font-serif text-2xl text-white mb-4">¡Mensaje Enviado!</h3>
                <p className="font-serif text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                    Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos a la mayor brevedad posible.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors uppercase"
                >
                    ENVIAR OTRO MENSAJE
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#0a111e] border border-white/5 p-8 shadow-2xl relative">
            <h2 className="font-cinzel text-xl tracking-wider mb-8 text-white/90">{t('title')}</h2>

            {status === 'error' && (
                <div className="mb-6 border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400 font-serif">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('nameLabel')} *</label>
                        <input
                            name="first_name"
                            type="text"
                            required
                            className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all placeholder-white/20"
                            placeholder={t('namePlaceholder')}
                        />
                    </div>
                    <div>
                        <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">Apellido *</label>
                        <input
                            name="last_name"
                            type="text"
                            required
                            className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all placeholder-white/20"
                            placeholder="Tu apellido"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('emailLabel')} *</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all placeholder-white/20"
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('subjectLabel')} *</label>
                    <select
                        name="subject"
                        className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="general">{t('subjectGeneral')}</option>
                        <option value="memberships">{t('subjectMemberships')}</option>
                        <option value="research">{t('subjectResearch')}</option>
                        <option value="press">{t('subjectPress')}</option>
                    </select>
                </div>
                <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('messageLabel')} *</label>
                    <textarea
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all resize-none placeholder-white/20"
                        placeholder={t('messagePlaceholder')}
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-[#c5a059] text-[#050a14] py-4 font-cinzel text-[10px] font-bold tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 group uppercase"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#050a14]" />
                        ) : null}
                        {status === 'loading' ? 'ENVIANDO...' : t('submit')}
                    </button>
                </div>
            </form>
        </div>
    );
}
