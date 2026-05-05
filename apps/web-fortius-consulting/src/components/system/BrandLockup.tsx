type BrandVariant = "consulting" | "foundation";

interface BrandLockupProps {
    variant: BrandVariant;
    tone?: "default" | "compact";
    className?: string;
}

const BRAND_CONFIG: Record<
    BrandVariant,
    { sub: string; label: string; baseColor: string; hoverColor: string }
> = {
    consulting: {
        sub: "Consulting",
        label: "Fortius Consulting",
        baseColor: "var(--color-accent-500)",
        hoverColor: "var(--color-accent-400)",
    },
    foundation: {
        sub: "Foundation",
        label: "Fortius Foundation",
        baseColor: "#ffffff",
        hoverColor: "#2d7a5b",
    },
};

export function BrandLockup({
    variant,
    tone = "default",
    className = "",
}: BrandLockupProps) {
    const config = BRAND_CONFIG[variant];
    const size = tone === "compact" ? "text-[0.82rem]" : "text-[0.95rem]";
    const sub = tone === "compact" ? "text-[0.5rem]" : "text-[0.58rem]";

    return (
        <span
            className={`group inline-flex items-center gap-1 transition-colors duration-200 [color:var(--brand-base)] hover:[color:var(--brand-hover)] ${className}`}
            aria-label={config.label}
            style={
                {
                    "--brand-base": config.baseColor,
                    "--brand-hover": config.hoverColor,
                } as React.CSSProperties
            }
        >
            <span className="text-lg font-light">[</span>
            <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
                <span
                    className={`font-sans font-normal tracking-[0.22em] uppercase ${size}`}
                >
                    Fortius
                </span>
                <span
                    className={`font-display tracking-[0.18em] uppercase ${sub}`}
                >
                    {config.sub}
                </span>
            </span>
            <span className="text-lg font-light">]</span>
        </span>
    );
}
