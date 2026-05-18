type BrandVariant = "consulting" | "foundation";

interface BrandLockupProps {
    variant: BrandVariant;
    tone?: "default" | "compact";
    className?: string;
}

const BRAND_CONFIG: Record<
    BrandVariant,
    { sub: string; label: string; accentColor: string; hoverColor: string }
> = {
    consulting: {
        sub: "consulting",
        label: "Fortius Consulting",
        accentColor: "var(--color-accent-500)",
        hoverColor: "var(--color-accent-400)",
    },
    foundation: {
        sub: "foundation",
        label: "Fortius Foundation",
        accentColor: "var(--color-foundation-400)",
        hoverColor: "var(--color-foundation-300)",
    },
};

export function BrandLockup({
    variant,
    tone = "default",
    className = "",
}: BrandLockupProps) {
    const config = BRAND_CONFIG[variant];
    const size = tone === "compact" ? "text-[0.86rem]" : "text-[1rem]";
    const sub = tone === "compact" ? "text-[0.5rem]" : "text-[0.6rem]";

    return (
        <span
            className={`group inline-flex items-center gap-1 ${className}`}
            aria-label={config.label}
            style={
                {
                    "--brand-accent": config.accentColor,
                    "--brand-hover": config.hoverColor,
                } as React.CSSProperties
            }
        >
            <span className="text-lg font-light text-[var(--brand-accent)] transition-colors duration-200 group-hover:text-[var(--brand-hover)]">[</span>
            <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
                <span
                    className={`font-display font-light tracking-[0.18em] uppercase text-[var(--text-primary)] ${size}`}
                >
                    Fortius
                </span>
                <span
                    className={`font-sans font-medium tracking-[0.22em] uppercase text-[var(--brand-accent)] transition-colors duration-200 group-hover:text-[var(--brand-hover)] ${sub}`}
                >
                    {config.sub}
                </span>
            </span>
            <span className="text-lg font-light text-[var(--brand-accent)] transition-colors duration-200 group-hover:text-[var(--brand-hover)]">]</span>
        </span>
    );
}
