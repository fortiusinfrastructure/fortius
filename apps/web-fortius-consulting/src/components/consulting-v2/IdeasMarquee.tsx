import { Bracketed } from "@/components/system/Bracketed";
import { ALLIES } from "@/content/home-v2";

interface IdeasMarqueeProps {
    kicker?: string;
    title?: string;
    description?: string;
    ariaLabel?: string;
}

export function IdeasMarquee({
    kicker = "ALGUNOS DE NUESTROS ALIADOS",
    title = "Instituciones, redes y organizaciones con las que trabajamos o hemos colaborado.",
    description = "Una parte de nuestra experiencia se construye junto a aliados, universidades, fundaciones y plataformas con las que compartimos visión, criterio o agenda de trabajo.",
    ariaLabel,
}: IdeasMarqueeProps = {}) {
    return (
        <section
            aria-label={ariaLabel ?? kicker}
            className="relative py-20 md:py-24 border-t border-[var(--border-subtle)]"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <Bracketed variant="kicker">{kicker}</Bracketed>
                <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tight text-[var(--text-primary)]">
                    {title}
                </h2>
                <p className="mt-4 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
                    {description}
                </p>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
                    {ALLIES.map((ally) => (
                        <article
                            key={ally.name}
                            className="flex min-h-[122px] items-center justify-center bg-[var(--surface-secondary)] p-6 transition-colors hover:bg-[var(--surface-primary)]"
                        >
                            {ally.logo ? (
                                <img
                                    src={ally.logo}
                                    alt={ally.name}
                                    className="max-h-14 w-full max-w-[180px] object-contain object-center"
                                    style={ally.filter ? { filter: ally.filter } : undefined}
                                    loading="lazy"
                                />
                            ) : (
                                <p className="text-center font-display text-[1.05rem] font-light leading-snug text-[var(--text-primary)]">
                                    {ally.name}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
