'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface EventGalleryProps {
  gallery: string[];
  title: string;
  isEn: boolean;
}

export default function EventGallery({ gallery, title, isEn }: EventGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0));
      }
    },
    [lightboxIndex, gallery.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {gallery.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group overflow-hidden border hairline focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-900)] focus:ring-offset-2"
            aria-label={`${isEn ? 'Open photo' : 'Abrir foto'} ${idx + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} — ${idx + 1}`}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? 'Photo gallery' : 'Galería de fotos'}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors z-10"
            aria-label={isEn ? 'Close' : 'Cerrar'}
          >
            <X className="w-8 h-8" />
          </button>

          {gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
              }}
              className="absolute left-4 text-white/80 hover:text-white transition-colors z-10 p-2"
              aria-label={isEn ? 'Previous' : 'Anterior'}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gallery[lightboxIndex]}
            alt={`${title} — ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % gallery.length);
              }}
              className="absolute right-4 text-white/80 hover:text-white transition-colors z-10 p-2"
              aria-label={isEn ? 'Next' : 'Siguiente'}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono tracking-widest">
            {lightboxIndex + 1} / {gallery.length}
          </div>
        </div>
      )}
    </>
  );
}
