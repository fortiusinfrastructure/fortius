'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface GalleryImage {
    src: string;
    caption?: string | { es: string; en: string; pt: string };
}

interface PhotoGalleryProps {
    images: GalleryImage[];
    locale?: string;
}

function getCaption(caption: GalleryImage['caption'], locale: string): string {
    if (!caption) return '';
    if (typeof caption === 'string') return caption;
    return caption[locale as keyof typeof caption] ?? caption.es ?? '';
}

/** Number of images visible in the strip at a time */
const VISIBLE = 3;

export default function PhotoGallery({ images, locale = 'es' }: PhotoGalleryProps) {
    const [startIndex, setStartIndex] = useState(0);
    const [lightbox, setLightbox] = useState<number | null>(null);

    const canPrev = startIndex > 0;
    const canNext = startIndex + VISIBLE < images.length;

    const prev = useCallback(() => setStartIndex((i) => Math.max(0, i - 1)), []);
    const next = useCallback(() => setStartIndex((i) => Math.min(images.length - VISIBLE, i + 1)), [images.length]);

    const openLightbox = (idx: number) => setLightbox(idx);
    const closeLightbox = () => setLightbox(null);
    const lightboxPrev = () => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i));
    const lightboxNext = () => setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i));

    const visible = images.slice(startIndex, startIndex + VISIBLE);

    return (
        <>
            {/* ── Grid Carousel ── */}
            <div className="relative">
                {/* Prev button */}
                <button
                    onClick={prev}
                    disabled={!canPrev}
                    aria-label="Anterior"
                    className={`
                        absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10
                        w-10 h-10 rounded-full flex items-center justify-center
                        border border-white/10 bg-[#050a14]/90 backdrop-blur-sm
                        text-white/60 hover:text-[#c5a059] hover:border-[#c5a059]/40
                        transition-all duration-300 shadow-xl
                        disabled:opacity-0 disabled:pointer-events-none
                    `}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Images strip */}
                <div className="grid gap-3"
                    style={{ gridTemplateColumns: `repeat(${Math.min(visible.length, VISIBLE)}, 1fr)` }}
                >
                    {visible.map((img, i) => {
                        const globalIdx = startIndex + i;
                        const cap = getCaption(img.caption, locale);
                        return (
                            <figure key={globalIdx} className="group relative m-0">
                                <div
                                    className="relative overflow-hidden rounded-2xl cursor-zoom-in border border-white/5 shadow-2xl shadow-black/40 transition-all duration-500 group-hover:border-[#c5a059]/30 group-hover:shadow-[#c5a059]/5"
                                    onClick={() => openLightbox(globalIdx)}
                                >
                                    <img
                                        src={img.src}
                                        alt={cap || `Foto ${globalIdx + 1}`}
                                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {/* Zoom icon */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border border-white/20">
                                            <ZoomIn className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    {/* Caption overlay */}
                                    {cap && (
                                        <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <p className="text-white/90 text-xs font-serif italic leading-snug line-clamp-2">{cap}</p>
                                        </figcaption>
                                    )}
                                </div>
                                {/* Static caption below (always visible) */}
                                {cap && (
                                    <p className="mt-2 text-white/40 text-xs font-serif italic text-center leading-relaxed px-2">{cap}</p>
                                )}
                            </figure>
                        );
                    })}
                </div>

                {/* Next button */}
                <button
                    onClick={next}
                    disabled={!canNext}
                    aria-label="Siguiente"
                    className={`
                        absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10
                        w-10 h-10 rounded-full flex items-center justify-center
                        border border-white/10 bg-[#050a14]/90 backdrop-blur-sm
                        text-white/60 hover:text-[#c5a059] hover:border-[#c5a059]/40
                        transition-all duration-300 shadow-xl
                        disabled:opacity-0 disabled:pointer-events-none
                    `}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Dot indicators */}
            {images.length > VISIBLE && (
                <div className="flex items-center justify-center gap-2 mt-5">
                    {Array.from({ length: images.length - VISIBLE + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setStartIndex(i)}
                            aria-label={`Ir a imagen ${i + 1}`}
                            className={`
                                transition-all duration-300
                                ${i === startIndex
                                    ? 'w-6 h-1.5 rounded-full bg-[#c5a059]'
                                    : 'w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-white/40'
                                }
                            `}
                        />
                    ))}
                </div>
            )}

            {/* ── Lightbox ── */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
                    onClick={closeLightbox}
                >
                    {/* Close */}
                    <button
                        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10"
                        onClick={closeLightbox}
                        aria-label="Cerrar"
                    >
                        <X className="w-7 h-7" />
                    </button>

                    {/* Prev */}
                    {lightbox > 0 && (
                        <button
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#c5a059] transition-colors z-10 bg-black/40 rounded-full p-3 border border-white/10 hover:border-[#c5a059]/40"
                            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    {/* Image */}
                    <div className="max-w-5xl w-full px-16" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[lightbox].src}
                            alt={getCaption(images[lightbox].caption, locale) || `Foto ${lightbox + 1}`}
                            className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                        {getCaption(images[lightbox].caption, locale) && (
                            <p className="mt-4 text-white/50 text-sm font-serif italic text-center">
                                {getCaption(images[lightbox].caption, locale)}
                            </p>
                        )}
                        <p className="mt-2 text-white/20 text-xs font-cinzel tracking-widest text-center">
                            {lightbox + 1} / {images.length}
                        </p>
                    </div>

                    {/* Next */}
                    {lightbox < images.length - 1 && (
                        <button
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#c5a059] transition-colors z-10 bg-black/40 rounded-full p-3 border border-white/10 hover:border-[#c5a059]/40"
                            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                            aria-label="Siguiente"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
