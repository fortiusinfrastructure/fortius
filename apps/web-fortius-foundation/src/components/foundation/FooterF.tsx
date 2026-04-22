import { FoundationLockup } from "./FoundationLockup";

const LEGAL = [
    { label: "Aviso legal", href: "/legal" },
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Política de cookies", href: "/cookies" },
];

export function FooterF() {
    return (
        <footer className="border-t border-[var(--border-subtle)]">
            <div className="bg-[var(--color-neutral-550)]/30">
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-2">
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                            Socio de
                        </p>
                        <a
                            href="https://www.together.eu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-2xl text-[var(--text-primary)] hover:text-[var(--color-accent-300)] transition-colors"
                        >
                            together.eu
                        </a>
                    </div>
                    <div className="space-y-2 md:text-right">
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                            Miembro español de
                        </p>
                        <a
                            href="https://www.trustbridgeglobal.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-2xl text-[var(--text-primary)] hover:text-[var(--color-accent-300)] transition-colors"
                        >
                            TrustBridge <span className="italic text-[var(--color-accent-400)]">global</span>
                        </a>
                    </div>
                </div>
            </div>

            <div
                className="border-t border-[var(--border-subtle)]"
                style={{ backgroundColor: "var(--surface-brand)" }}
            >
                <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-6 flex items-center gap-6">
                        <a href="/" aria-label="Fortius Fundación">
                            <FoundationLockup />
                        </a>
                        <a
                            href="https://fortiusconsulting.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Fortius Consulting"
                            className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                        >
                            <span
                                className="text-lg font-light"
                                style={{ color: "var(--color-sibling-500)" }}
                            >
                                [
                            </span>
                            <span className="flex flex-col items-center leading-none -space-y-0.5 px-1">
                                <span className="font-sans font-normal tracking-[0.22em] text-[var(--text-primary)] uppercase text-[0.82rem]">
                                    Fortius
                                </span>
                                <span className="font-display tracking-[0.18em] text-[0.5rem] text-[var(--text-secondary)] uppercase">
                                    Consulting
                                </span>
                            </span>
                            <span
                                className="text-lg font-light"
                                style={{ color: "var(--color-sibling-500)" }}
                            >
                                ]
                            </span>
                        </a>
                    </div>

                    <ul className="md:col-span-6 md:justify-self-end flex flex-wrap gap-x-6 gap-y-2">
                        {LEGAL.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                                >
                                    [{l.label}]
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
