import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import RegistroForm from './RegistroForm';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "registro" });
    return { title: t("meta-title"), description: t("meta-desc") };
}

export default async function RegistroPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "registro" });

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 pt-[var(--nav-height)]"
            style={{ background: 'var(--surface-primary)' }}>

            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div className="absolute left-1/2 top-0 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(ellipse at center, var(--color-accent-400) 0%, transparent 70%)' }} />
            </div>

            <Link href="/" className="mb-10 flex flex-col items-center gap-1 group" aria-label="Fortius Foundation">
                <span className="font-display text-[0.68rem] tracking-[0.35em] uppercase"
                    style={{ color: 'var(--color-accent-500)' }}>
                    [ Fundación Fortius ]
                </span>
            </Link>

            <div className="w-full max-w-sm rounded-2xl border p-8 bg-[var(--surface-primary)] border-[var(--border-subtle)]"
                style={{ boxShadow: 'var(--shadow-lg)' }}>

                <div className="mb-7 text-center">
                    <h1 className="font-display text-2xl font-light" style={{ color: 'var(--text-primary)' }}>
                        {t("h1")}
                    </h1>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--text-tertiary)' }}>
                        {t("tag")}
                    </p>
                </div>

                <Suspense>
                    <RegistroForm />
                </Suspense>

                <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {t("login-link").split('?')[0]}
                    {' '}
                    <Link href="/login" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--color-accent-500)' }}>
                        {locale === "en" ? "Sign in" : "Inicia sesión"}
                    </Link>
                </p>
            </div>
        </main>
    );
}
