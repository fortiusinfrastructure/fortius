"use client";

import { Plus } from "lucide-react";
import { PersonPortrait } from "./PersonPortrait";

interface PersonCardProps {
    name: string;
    role: string;
    area?: string;
    photo?: string;
    onOpen: () => void;
    variant?: "compact" | "full";
}

export function PersonCard({
    name,
    role,
    area,
    photo,
    onOpen,
    variant = "compact",
}: PersonCardProps) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group relative text-left bg-[var(--surface-primary)] p-5 flex items-start gap-4 hover:bg-[var(--surface-secondary)] transition-colors w-full"
        >
            <PersonPortrait
                name={name}
                photo={photo}
                size={variant === "full" ? "md" : "sm"}
            />
            <div className="space-y-1 min-w-0 flex-1">
                <p className="text-[0.95rem] font-medium text-[var(--text-primary)] leading-tight">
                    {name}
                </p>
                <p className="text-[0.78rem] text-[var(--text-secondary)] leading-snug">
                    {role}
                </p>
                {area && (
                    <p className="text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text-tertiary)] pt-1">
                        {area}
                    </p>
                )}
            </div>
            <span
                className="shrink-0 inline-flex items-center justify-center w-7 h-7 border border-[var(--border-default)] text-[var(--text-tertiary)] group-hover:text-[var(--color-accent-400)] group-hover:border-[var(--color-accent-500)] transition-colors"
                aria-hidden
            >
                <Plus size={14} />
            </span>
        </button>
    );
}
