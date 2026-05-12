"use client";

import { useMemo, useState } from "react";

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

    return (
        <img
            src={sources[index]}
            alt={alt}
            className={className}
            onError={() => {
                setIndex((current) => (current < sources.length - 1 ? current + 1 : current));
            }}
        />
    );
}