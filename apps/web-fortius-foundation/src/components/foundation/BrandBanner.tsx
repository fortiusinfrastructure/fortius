interface BrandBannerProps {
    children: string;
    variant?: "brand" | "contrast";
}

export function BrandBanner({ children, variant = "brand" }: BrandBannerProps) {
    const isContrast = variant === "contrast";
    return (
        <div
            className="w-full py-5"
            style={{
                backgroundColor: isContrast
                    ? "var(--color-neutral-950)"
                    : "var(--surface-brand)",
            }}
        >
            <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
                <p className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-light text-center text-[var(--text-primary)]">
                    {children}
                </p>
            </div>
        </div>
    );
}
