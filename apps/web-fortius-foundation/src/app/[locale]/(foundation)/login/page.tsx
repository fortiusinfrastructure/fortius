import { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import LoginForm from './LoginForm';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "login" });
    return { title: t("meta-title") };
}

export default async function LoginPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "login" });

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
                        {t("tag")}
                    </h1>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--text-tertiary)' }}>
                        {t("h1")}
                    </p>
                </div>

                <Suspense>
                    <LoginForm />
                </Suspense>

                <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {locale === "en" ? "Don't have an account?" : "¿No tienes cuenta?"}
                    {' '}
                    <Link href="/registro" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--color-accent-500)' }}>
                        {locale === "en" ? "Register" : "Regístrate"}
                    </Link>
                </p>
            </div>

            <p className="mt-8 text-center text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                {locale === "en" ? "By signing in you accept our " : "Al acceder aceptas nuestros "}
                <Link href="/legal" className="underline underline-offset-2 hover:opacity-80">
                    {locale === "en" ? "terms" : "términos"}
                </Link>
                {locale === "en" ? " and " : " y "}
                <Link href="/privacidad" className="underline underline-offset-2 hover:opacity-80">
                    {locale === "en" ? "privacy policy" : "privacidad"}
                </Link>.
            </p>
        </main>
    );
}
