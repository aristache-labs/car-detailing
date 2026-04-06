'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type LightboxSlide = {
  src: string;
  title?: string;
  subtitle?: string;
};

type ImageLightboxProps = {
  open: boolean;
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function ImageLightbox({ open, slides, index, onClose, onIndexChange }: ImageLightboxProps) {
  const n = slides.length;
  const safeIndex = n === 0 ? 0 : Math.min(Math.max(0, index), n - 1);
  const slide = slides[safeIndex];

  const go = useCallback(
    (delta: number) => {
      if (n <= 1) return;
      onIndexChange((safeIndex + delta + n) % n);
    },
    [n, safeIndex, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, go]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !slide) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Enlarged image">
      {/* Full-screen backdrop: receives all taps/clicks outside the content column (pointer-events-none on overlay passes through) */}
      <button
        type="button"
        className="absolute inset-0 z-0 touch-manipulation bg-black/88"
        aria-label="Close"
        onClick={onClose}
      />

      {/* Full-screen layer: pointer-events-none except where children opt in — avoids a giant hit target blocking the backdrop */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center p-3 pt-16 pb-10 pointer-events-none sm:p-6 md:p-10">
        {/* Close: large tap target, high contrast, subtle surface */}
        <div className="pointer-events-auto absolute right-2 top-2 z-30 md:right-5 md:top-5">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-opacity active:opacity-90 md:h-11 md:w-11 md:hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(201,168,76,0.55)]"
            aria-label="Close"
          >
            <X className="h-7 w-7 text-white md:h-6 md:w-6" strokeWidth={2} />
          </button>
        </div>

        {n > 1 ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="pointer-events-auto absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-sm p-2 text-white/40 transition-colors hover:text-white/90 md:left-3"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.1} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="pointer-events-auto absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-sm p-2 text-white/40 transition-colors hover:text-white/90 md:right-3"
              aria-label="Next image"
            >
              <ChevronRight className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.1} />
            </button>
          </>
        ) : null}

        {/* Content column only — does not fill the screen; taps outside this column hit the backdrop */}
        <div className="pointer-events-auto flex w-full max-w-[min(100%,1200px)] flex-col items-center gap-3 px-1">
          <div
            className="relative h-[min(72vh,820px)] w-full"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            role="presentation"
          >
            <Image src={slide.src} alt="" fill className="object-contain" sizes="100vw" priority />
          </div>

          {(slide.title || slide.subtitle) && (
            <div className="max-w-lg text-center">
              {slide.title ? (
                <p
                  className="text-[15px] font-semibold tracking-tight text-white md:text-base"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {slide.title}
                </p>
              ) : null}
              {slide.subtitle ? (
                <p
                  className="mt-1 text-[12px] font-medium text-white/50 md:text-[13px]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {slide.subtitle}
                </p>
              ) : null}
            </div>
          )}

          {n > 1 ? (
            <p className="text-[10px] font-mono tabular-nums text-white/25">
              {safeIndex + 1} / {n}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
