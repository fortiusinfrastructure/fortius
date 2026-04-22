import Link from "next/link";
import { Bracketed } from "@/components/system/Bracketed";

export function DonacionesCTA() {
    return (
        <section
            aria-labelledby="donaciones-title"
            className="relative border-t border-[var(--border-subtle)] py-24 md:py-28"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5 space-y-4">
                        <Bracketed variant="kicker">Donaciones</Bracketed>
                        <h2
                            id="donaciones-title"
                            className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.08] tracking-tight text-[var(--text-primary)]"
                        >
                            Necesitamos tu ayuda para{" "}
                            <span
                                className="italic"
                                style={{ color: "var(--color-accent-300)" }}
                            >
                                sostener el ecosistema.
                            </span>
                        </h2>
                    </div>
                    <div className="lg:col-span-7 space-y-8">
                        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                            Nos dedicamos a ayudar a que todo un ecosistema de
                            organizaciones cumpla con su misión fundacional. Y a que lo
                            haga mejor, con más impacto. Sin embargo, no podemos hacerlo
                            solos.{" "}
                            <span className="text-[var(--text-primary)]">
                                Necesitamos tu ayuda.
                            </span>
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/donaciones"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors"
                                style={{ backgroundColor: "var(--color-accent-500)" }}
                            >
                                [ Donar a la fundación ]
                            </Link>
                            <Link
                                href="/incubadora"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] border text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
                                style={{ borderColor: "var(--color-accent-400)" }}
                            >
                                [ Donar a un proyecto ]
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
