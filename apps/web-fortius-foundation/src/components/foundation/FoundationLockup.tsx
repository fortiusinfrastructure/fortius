interface FoundationLockupProps {
    tone?: "default" | "compact";
    className?: string;
}

export function FoundationLockup({ tone = "default", className = "" }: FoundationLockupProps) {
    const size = tone === "compact" ? "text-[0.82rem]" : "text-[0.98rem]";
    const sub = tone === "compact" ? "text-[0.48rem]" : "text-[0.56rem]";

    return (
        <span className={`group inline-flex items-center gap-1 ${className}`}>
            <span className="text-lg font-light text-[var(--color-accent-400)] transition-colors duration-200 group-hover:text-[var(--color-accent-300)]">[</span>
            <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
                <span
                    className={`font-display font-light tracking-[0.18em] text-[var(--text-primary)] uppercase ${size}`}
                >
                    Fortius
                </span>
                <span
                    className={`font-sans font-semibold tracking-[0.24em] text-[var(--color-accent-300)] lowercase ${sub}`}
                >
                    foundation
                </span>
            </span>
            <span className="text-lg font-light text-[var(--color-accent-400)] transition-colors duration-200 group-hover:text-[var(--color-accent-300)]">]</span>
        </span>
    );
}
