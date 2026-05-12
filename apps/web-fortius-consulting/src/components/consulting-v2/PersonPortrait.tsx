"use client";

import { useMemo, useState } from "react";
import { getInitials } from "@/content/team";

interface PersonPortraitProps {
    name: string;
    photo?: string | string[];
    size?: "sm" | "md" | "lg";
    className?: string;
    fit?: "cover" | "contain";
}

const SIZE_CLASS: Record<NonNullable<PersonPortraitProps["size"]>, string> = {
    sm: "w-12 h-12 text-[0.7rem]",
    md: "w-20 h-20 text-sm",
    lg: "w-32 h-32 text-xl",
};

export function PersonPortrait({
    name,
    photo,
    size = "md",
    className = "",
    fit = "cover",
}: PersonPortraitProps) {
    const sources = useMemo(() => {
        if (!photo) return [];
        return Array.isArray(photo) ? photo : [photo];
    }, [photo]);

    const [sourceIndex, setSourceIndex] = useState(0);
    const currentPhoto = sources[sourceIndex];

    return (
        <div
            className={`relative shrink-0 overflow-hidden border border-[var(--border-strong)] ${SIZE_CLASS[size]} ${className}`}
            style={{
                background:
                    "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.10) 0%, transparent 55%), linear-gradient(145deg, rgba(28,20,18,0.95) 0%, rgba(10,8,7,1) 100%)",
            }}
            aria-hidden={Boolean(currentPhoto)}
        >
            {currentPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={currentPhoto}
                    alt={name}
                    className={`absolute inset-0 w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
                    style={{ filter: "grayscale(1) contrast(1.05) sepia(0.35)" }}
                    onError={() => {
                        setSourceIndex((current) => current + 1);
                    }}
                />
            ) : (
                <>
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
                            mixBlendMode: "overlay",
                        }}
                    />
                    <span
                        className="absolute inset-0 flex items-center justify-center font-display font-light tracking-wider"
                        style={{ color: "rgba(231,229,228,0.55)" }}
                    >
                        {getInitials(name)}
                    </span>
                </>
            )}
        </div>
    );
}
