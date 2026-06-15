import type { Metadata } from "next";
import { InsightsGrid } from "@/components/consulting-v2/InsightsGrid";
import { Bracketed } from "@/components/system/Bracketed";
import { fetchArticles } from "@/lib/articles-db";

// Refresh the article archive every 10 minutes (ISR)
export const revalidate = 600;

export const metadata: Metadata = {
    title: "Publicaciones | Fortius Consulting",
    description:
        "Archivo completo de artículos, informes, notas y noticias de Fortius Consulting en Sociedad Civil y Política.",
};

export default async function PublicacionesPage() {
    const articles = await fetchArticles();

    return (
        <main id="main-content" className="pt-[var(--nav-height)]">
            {/* Page header */}
            <section className="border-b border-[var(--border-subtle)] py-16 md:py-24">
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                    <Bracketed variant="kicker">Publicaciones</Bracketed>
                    <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
                        Archivo completo.
                    </h1>
                    <p className="mt-4 max-w-2xl text-[1rem] text-[var(--text-secondary)] leading-relaxed">
                        Todos los artículos, informes y noticias de Fortius Consulting. Los contenidos
                        marcados con{" "}
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                            🔒 Privado
                        </span>{" "}
                        muestran una vista previa y el aviso de acceso reservado.
                    </p>

                    {/* Legend */}
                    <div className="mt-8 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2.5">
                            <span className="inline-block w-3 h-3 rounded-full bg-[var(--color-accent-500)]" />
                            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                                Acceso abierto
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="inline-block w-3 h-3 rounded-full bg-[var(--text-tertiary)] opacity-50" />
                            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                                Requiere membresía
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* All articles grid — includes private with lock indicator */}
            <InsightsGrid
                articles={articles}
                includePrivate
                kicker="Todos los contenidos"
                title="Sociedad Civil y Política."
            />
        </main>
    );
}
