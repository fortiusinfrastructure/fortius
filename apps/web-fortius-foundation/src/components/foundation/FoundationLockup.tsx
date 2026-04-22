interface FoundationLockupProps {
    tone?: "default" | "compact";
    className?: string;
}

export function FoundationLockup({ tone = "default", className = "" }: FoundationLockupProps) {
    const size = tone === "compact" ? "text-[0.82rem]" : "text-[0.95rem]";
    const sub = tone === "compact" ? "text-[0.5rem]" : "text-[0.58rem]";

    return (
        <span className={`inline-flex items-center gap-1 ${className}`}>
            <span className="text-[var(--color-accent-400)] text-lg font-light">[</span>
            <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
                <span
                    className={`font-sans font-normal tracking-[0.22em] text-[var(--text-primary)] uppercase ${size}`}
                >
                    Fortius
                </span>
                <span
                    className={`font-display tracking-[0.18em] text-[var(--text-secondary)] uppercase ${sub}`}
                >
                    Fundación
                </span>
            </span>
            <span className="text-[var(--color-accent-400)] text-lg font-light">]</span>
        </span>
    );
}
