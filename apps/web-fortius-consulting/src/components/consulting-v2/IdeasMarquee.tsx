import { Bracketed } from "@/components/system/Bracketed";
import { ALLIES } from "@/content/home-v2";

interface IdeasMarqueeProps {
    kicker?: string;
    ariaLabel?: string;
}

export function IdeasMarquee({
    kicker = "ALGUNOS DE NUESTROS ALIADOS",
    ariaLabel,
}: IdeasMarqueeProps = {}) {
    return (
        <section
            aria-label={ariaLabel ?? kicker}
            className="relative py-20 md:py-24 border-t border-[var(--border-subtle)]"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <Bracketed variant="kicker">{kicker}</Bracketed>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-px border border-[var(--border-default)] bg-[var(--border-default)]">
                    {ALLIES.map((ally) => (
                        <article
                            key={ally}
                            className="min-h-[122px] bg-[var(--surface-secondary)] p-5 transition-colors hover:bg-[var(--surface-primary)]"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-500)]/25 px-2.5 py-1 text-[var(--color-accent-400)]">
                                <span className="font-display text-[0.95rem] font-light leading-none">
                                    {ally
                                        .split(" ")
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .map((part) => part[0])
                                        .join("")}
                                </span>
                                <span className="text-[0.58rem] uppercase tracking-[0.18em]">
                                    aliado
                                </span>
                            </div>
                            <p className="mt-4 font-display text-[1.05rem] font-light leading-snug text-[var(--text-primary)]">
                                {ally}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
