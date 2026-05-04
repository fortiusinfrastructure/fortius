'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Intermediate payment page for academic memberships.
 *
 * This page solves the 24h Stripe Checkout expiry problem by generating
 * a fresh session on-demand every time the user visits.
 *
 * The user arrives here via an email link containing ?membershipId=xxx&token=yyy
 * and is redirected to Stripe after a brief loading state.
 */
export default function AcademicPaymentPage() {
    const searchParams = useSearchParams();
    const membershipId = searchParams.get('membershipId');
    const token = searchParams.get('token');

    const isValid = !!membershipId && !!token;
    const [status, setStatus] = useState<'loading' | 'error'>(
        isValid ? 'loading' : 'error',
    );
    const [errorMessage, setErrorMessage] = useState(
        isValid
            ? ''
            : 'Enlace inválido. Falta información necesaria para procesar el pago.',
    );

    useEffect(() => {
        if (!isValid) return;

        let cancelled = false;

        fetch('/api/checkout/academico', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ membershipId, token }),
        })
            .then(async (res) => {
                if (cancelled) return;
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.error || 'Error al iniciar el pago');
                }
                const data = await res.json();
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error('No se recibió URL de pago desde Stripe');
                }
            })
            .catch((err) => {
                if (cancelled) return;
                setStatus('error');
                setErrorMessage(
                    err instanceof Error
                        ? err.message
                        : 'Error inesperado. Por favor, contacte con Secretaría.',
                );
            });

        return () => {
            cancelled = true;
        };
    }, [membershipId, token, isValid]);

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050a14]">
                <div className="max-w-md w-full mx-4 p-8 border border-[#c5a059]/30 text-center">
                    <h1 className="font-serif text-2xl text-[#c5a059] mb-4">
                        No se pudo procesar el pago
                    </h1>
                    <p className="font-serif text-sm text-[#e8e0d4bb] leading-relaxed">
                        {errorMessage}
                    </p>
                    <p className="font-serif text-xs text-[#e8e0d4]/40 mt-6">
                        Si el problema persiste, contacte con{' '}
                        <a
                            href="mailto:secretaria@escuelahispanica.org"
                            className="underline hover:text-[#c5a059] transition-colors"
                        >
                            secretaria@escuelahispanica.org
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050a14]">
            <div className="max-w-md w-full mx-4 p-8 border border-[#c5a059]/30 text-center">
                <h1 className="font-serif text-2xl text-[#c5a059] mb-3">
                    Membresía Académica
                </h1>
                <p className="font-serif text-sm text-[#e8e0d4bb] leading-relaxed mb-8">
                    Estamos preparando su sesión de pago segura con Stripe. Será redirigido
                    automáticamente en unos segundos...
                </p>
                <div className="flex justify-center">
                    <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        </div>
    );
}
