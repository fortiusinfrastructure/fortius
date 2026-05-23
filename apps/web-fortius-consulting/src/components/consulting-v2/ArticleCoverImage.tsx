"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface ArticleCoverImageProps {
    primarySrc: string;
    fallbackSources?: string[];
    alt: string;
    className?: string;
}

export function ArticleCoverImage({
    primarySrc,
    fallbackSources = [],
    alt,
    className,
}: ArticleCoverImageProps) {
    const sources = useMemo(() => [primarySrc, ...fallbackSources], [primarySrc, fallbackSources]);
    const [index, setIndex] = useState(0);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // If the first source failed before hydration, advance to the next fallback.
    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        if (img.complete && img.naturalWidth === 0 && index < sources.length - 1) {
            setIndex((current) => (current < sources.length - 1 ? current + 1 : current));
        }
    }, [index, sources]);

    useEffect(() => {
        setIndex(0);
    }, [sources]);

    return (
        <img
            ref={imgRef}
            src={sources[index]}
            alt={alt}
            className={className}
            onError={() => {
                setIndex((current) => (current < sources.length - 1 ? current + 1 : current));
            }}
        />
    );
}