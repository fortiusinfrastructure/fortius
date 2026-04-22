"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Linkedin } from "lucide-react";
import { PersonPortrait } from "./PersonPortrait";

export interface PersonDialogData {
    name: string;
    role: string;
    area?: string;
    department?: string;
    bio: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    photo?: string;
    sectionLabel?: string;
}

interface PersonDialogProps {
    person: PersonDialogData | null;
    onClose: () => void;
}

const ease = [0.22, 0.61, 0.36, 1] as const;

export function PersonDialog({ person, onClose }: PersonDialogProps) {
    useEffect(() => {
        if (!person) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [person, onClose]);

    return (
        <AnimatePresence>
            {person && (
                <motion.div
                    key="person-dialog"
                    className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Perfil de ${person.name}`}
                >
                    <div
                        className="absolute inset-0 bg-[rgba(2,5,8,0.85)] backdrop-blur-sm"
                        aria-hidden
                    />
                    <motion.div
                        className="relative z-10 w-full max-w-2xl bg-[var(--surface-secondary)] border border-[var(--border-default)] shadow-[var(--shadow-xl)]"
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.35, ease }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Cerrar"
                            className="absolute top-4 right-4 p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                            <PersonPortrait
                                name={person.name}
                                photo={person.photo}
                                size="lg"
                            />
                            <div className="flex-1 min-w-0 space-y-4">
                                {person.sectionLabel && (
                                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-accent-300)]">
                                        <span className="text-[var(--color-accent-400)]">[</span>
                                        <span className="px-1">{person.sectionLabel}</span>
                                        <span className="text-[var(--color-accent-400)]">]</span>
                                    </p>
                                )}
                                <div className="space-y-1.5">
                                    <h3 className="font-display text-2xl md:text-[1.75rem] font-light leading-tight text-[var(--text-primary)]">
                                        {person.name}
                                    </h3>
                                    <p className="text-[0.9rem] text-[var(--text-secondary)]">
                                        {person.role}
                                    </p>
                                    {(person.area || person.department) && (
                                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)] pt-1">
                                            {person.area ?? person.department}
                                        </p>
                                    )}
                                </div>
                                <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed pt-2">
                                    {person.bio}
                                </p>

                                {(person.email || person.linkedin || person.twitter) && (
                                    <div className="pt-4 flex flex-wrap gap-3">
                                        {person.email && (
                                            <a
                                                href={`mailto:${person.email}`}
                                                className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.15em] px-3 py-2 border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-400)] transition-colors"
                                            >
                                                <Mail size={14} />
                                                Email
                                            </a>
                                        )}
                                        {person.linkedin && (
                                            <a
                                                href={person.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.15em] px-3 py-2 border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-400)] transition-colors"
                                            >
                                                <Linkedin size={14} />
                                                LinkedIn
                                            </a>
                                        )}
                                        {person.twitter && (
                                            <a
                                                href={person.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.15em] px-3 py-2 border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-accent-400)] transition-colors"
                                            >
                                                <span className="font-semibold">X</span>
                                                Perfil
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
