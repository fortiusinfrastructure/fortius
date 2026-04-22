import { Bracketed } from "@/components/system/Bracketed";
import { Marquee } from "@/components/system/Marquee";
import { RADICAL_IDEAS } from "@/content/home-v2";

export function IdeasMarquee() {
    return (
        <section
            aria-label="Ideas que movemos"
            className="relative py-20 md:py-24 border-t border-[var(--border-subtle)] space-y-10"
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <Bracketed variant="kicker">Ideas que movemos</Bracketed>
            </div>
            <Marquee speed={50} className="py-4">
                {RADICAL_IDEAS.map((idea) => (
                    <span
                        key={idea}
                        className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light italic text-[var(--text-primary)] px-2"
                    >
                        {idea}
                        <span className="text-[var(--color-accent-500)] not-italic font-normal mx-4">[·]</span>
                    </span>
                ))}
            </Marquee>
        </section>
    );
}
