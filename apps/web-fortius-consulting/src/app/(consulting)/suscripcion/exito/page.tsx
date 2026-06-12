import type { Metadata } from "next";
import { getConsultingBillingPlan } from "@/lib/billing/plans";
import { createServerClient } from "@fortius/database";

export const metadata: Metadata = {
    title: "Suscripción confirmada — Fortius Consulting",
    robots: { index: false, follow: false },
};

interface PageProps {
    searchParams: Promise<{ plan?: string }>;
}

export default async function SuscripcionExitoPage({ searchParams }: PageProps) {
    const { plan: planKey } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;

    // Check if user is already logged in to show the right CTA
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isLoggedIn = !!user;

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            <section className="border-t border-[var(--border-subtle)] py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-[var(--container-px)] text-center space-y-6">

                    {/* Check icon */}
                    <div className="flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full"
                            style={{ background: 'rgba(233,71,72,0.12)', border: '1px solid rgba(233,71,72,0.25)' }}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                style={{ color: 'var(--color-accent-400)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-500)]">
                        Suscripción confirmada
                    </p>

                    <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light tracking-tight text-[var(--text-primary)]">
                        Gracias por suscribirte{plan ? ` a ${plan.displayName}` : ""}.
                    </h1>

                    {/* Contextual message based on auth state */}
                    {isLoggedIn ? (
                        <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                            Tu membresía ya está activa. Accede al área privada para consultar tu suscripción y los recursos disponibles.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                                Tu pago se ha procesado correctamente. Te hemos enviado un email de invitación:
                                ábrelo y sigue el enlace para crear tu contraseña y acceder al área privada.
                            </p>
                            <p className="text-[0.85rem] text-[var(--text-tertiary)]">
                                Si no lo recibes en unos minutos, revisa tu carpeta de spam.
                                Si ya creaste tu contraseña, inicia sesión directamente.
                            </p>
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
                        {isLoggedIn ? (
                            <a href="/area-privada"
                                className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                                style={{ background: 'var(--color-accent-500)', color: '#fff' }}>
                                Ir al área privada
                            </a>
                        ) : (
                            <a href="/login?redirect=%2Farea-privada"
                                className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                                style={{ background: 'var(--color-accent-500)', color: '#fff' }}>
                                Iniciar sesión
                            </a>
                        )}
                        <a href="/"
                            className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] border transition-colors"
                            style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
                            Volver al inicio
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}