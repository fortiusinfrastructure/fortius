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

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Error al enviar el mensaje');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Error de conexión con el servidor');
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
                    className="mt-8 font-cinzel text-[10px] tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors"
                >
                    ENVIAR OTRO MENSAJE
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#0a111e] border border-white/5 p-8 shadow-2xl">
            <h2 className="font-cinzel text-xl tracking-wider mb-8 text-white/90">{t('title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('nameLabel')}</label>
                        <input
                            name="first_name"
                            type="text"
                            required
                            className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all"
                            placeholder={t('namePlaceholder')}
                        />
                    </div>
                    <div>
                        <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">Apellido</label>
                        <input
                            name="last_name"
                            type="text"
                            required
                            className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all"
                            placeholder="Tu apellido"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('emailLabel')}</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all"
                        placeholder="tu@email.com"
                    />
                </div>
                <div>
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('subjectLabel')}</label>
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
                    <label className="block font-cinzel text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">{t('messageLabel')}</label>
                    <textarea
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-[#050a14] border border-white/10 px-4 py-3 text-white font-serif text-sm focus:border-[#c5a059] outline-none transition-all resize-none"
                        placeholder={t('messagePlaceholder')}
                    />
                </div>

                {status === 'error' && (
                    <p className="text-red-400 text-xs font-serif italic">{errorMsg}</p>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#c5a059] text-[#050a14] py-4 font-cinzel text-[10px] font-bold tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#050a14]" />
                    ) : null}
                    {status === 'loading' ? 'ENVIANDO...' : t('submit')}
                </button>
            </form>
        </div>
    );
}
