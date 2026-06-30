import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getConsultingBillingPlan } from "@/lib/billing/plans";
import { createServerClient } from "@fortius/database";

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ plan?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "suscripcion" });
    return { title: t("meta-title-success"), robots: { index: false, follow: false } };
}

export default async function SuscripcionExitoPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { plan: planKey } = await searchParams;
    const plan = planKey ? getConsultingBillingPlan(planKey) : null;

    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isLoggedIn = !!user;

    const t = await getTranslations({ locale, namespace: "suscripcion" });

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
                        {t("confirmed-kicker")}
                    </p>

                    <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light tracking-tight text-[var(--text-primary)]">
                        {plan ? t("confirmed-h1-plan", { plan: plan.displayName }) : t("confirmed-h1")}.
                    </h1>

                    {isLoggedIn ? (
                        <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                            {t("confirmed-logged")}
                        </p>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                                {t("confirmed-guest")}
                            </p>
                            <p className="text-[0.85rem] text-[var(--text-tertiary)]">
                                {t("confirmed-spam")}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
                        {isLoggedIn ? (
                            <Link href="/area-privada"
                                className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                                style={{ background: 'var(--color-accent-500)', color: '#fff' }}>
                                {t("go-private")}
                            </Link>
                        ) : (
                            <Link href="/login?redirect=%2Farea-privada"
                                className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors"
                                style={{ background: 'var(--color-accent-500)', color: '#fff' }}>
                                {t("login")}
                            </Link>
                        )}
                        <Link href="/"
                            className="inline-flex items-center justify-center px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] border transition-colors"
                            style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
                            {t("back-home")}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
