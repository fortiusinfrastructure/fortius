'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function EventRegistrationForm({ eventName, eventId }: { eventName: string, eventId: string }) {
    const t = useTranslations('Common');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit');
            }

            setStatus('success');
        } catch (error: any) {
            console.error('Registration error:', error);
            setErrorMessage(error.message);
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
                <h3 className="font-serif text-2xl text-white mb-2">Registro Confirmado</h3>
                <p className="text-white/60 font-light mb-6">
                    Hemos recibido correctamente su solicitud de asitencia para <strong>{eventName}</strong>. Su petición será evaluada y nos pondremos in contacto con usted a la brevedad con más detalles.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 border rounded-md border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-cinzel text-xs tracking-widest uppercase transition-all"
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#050a14] border border-white/5 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/10 blur-3xl -z-10 rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl -z-10 rounded-full mix-blend-screen" />

            <div className="mb-8">
                <h3 className="font-serif text-2xl text-white mb-2">Registro de Asistencia</h3>
                <p className="text-[#c5a059] font-cinzel text-xs tracking-widest uppercase mb-1">{eventName}</p>
                <div className="w-12 h-[1px] bg-white/20 mt-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
                <input type="hidden" name="subject" value={`Registro de Evento: ${eventName} (${eventId})`} />
                <input type="hidden" name="form_type" value="event_registration" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                        <label htmlFor="first_name" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">Nombre</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder="Su nombre"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="last_name" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">Apellidos</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder="Sus apellidos"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="institution" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">Institución u Organización</label>
                        <input
                            type="text"
                            id="institution"
                            name="institution"
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                            placeholder="Opcional"
                        />
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <label htmlFor="message" className="block text-xs font-cinzel tracking-widest text-white/60 uppercase">Mensaje Adicional</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#c5a059] transition-colors resize-none"
                        placeholder="Intereses particulares in el evento, cargo, títulos académicos, etc."
                    />
                </div>

                {status === 'error' && (
                    <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-200 text-sm">
                        {errorMessage || 'Ha ocurrido un error inesperado al procesar su registro. Por favor, inténtelo de nuevo más tarde.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center rounded-md bg-[#c5a059] hover:bg-[#d4b475] disabled:opacity-50 disabled:cursor-not-allowed text-[#050a14] font-cinzel text-sm tracking-widest uppercase py-4 transition-all"
                >
                    {status === 'loading' ? 'Procesando...' : 'Confirmar Asistencia'}
                </button>

                <p className="text-xs text-white/40 font-light text-center mt-4">
                    Al confirmar, sus datos serán procesados para la organización del evento por Escuela Hispánica.
                </p>
            </form>
        </div>
    );
}
