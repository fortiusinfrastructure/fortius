import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import SignupForm from './SignupForm';
import { SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
    title: `Crear cuenta | ${SITE_NAME}`,
    description: 'Activa tu suscripción de Fortius Consulting y accede a análisis e inteligencia de alto impacto.',
};

export default function SignupPage() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16"
            style={{ background: 'var(--surface-primary)' }}>

            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div className="absolute left-1/2 top-0 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(ellipse at center, var(--color-accent-700) 0%, transparent 70%)' }} />
            </div>

            {/* Brand */}
            <Link href="/" className="mb-10 flex flex-col items-center gap-1 group" aria-label="Volver al inicio">
                <span className="font-serif text-[0.55rem] tracking-[0.35em] uppercase"
                    style={{ color: 'var(--color-accent-400)' }}>
                    [ Fortius Consulting ]
                </span>
            </Link>

            {/* Card */}
            <div className="w-full max-w-sm rounded-2xl border p-8"
                style={{
                    background: 'var(--surface-elevated)',
                    borderColor: 'var(--border-default)',
                    boxShadow: 'var(--shadow-lg)',
                }}>

                <div className="mb-7 text-center">
                    <h1 className="font-serif text-2xl font-light italic"
                        style={{ color: 'var(--text-primary)' }}>
                        Activar cuenta
                    </h1>
                    <p className="mt-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        Define tus datos de acceso al área privada
                    </p>
                </div>

                <Suspense>
                    <SignupForm />
                </Suspense>
            </div>

            {/* Legal */}
            <p className="mt-8 text-center text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                Al registrarte aceptas nuestros{' '}
                <Link href="/aviso-legal" className="underline underline-offset-2 hover:opacity-80">términos</Link>
                {' '}y{' '}
                <Link href="/politica-de-privacidad" className="underline underline-offset-2 hover:opacity-80">privacidad</Link>.
            </p>
        </main>
    );
}
