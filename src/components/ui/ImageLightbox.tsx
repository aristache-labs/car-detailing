'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const scrollYRef = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  /** Touch start for horizontal swipe (mobile): swipe left → next, swipe right → previous */
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (n <= 1) return;
      onIndexChange((safeIndex + delta + n) % n);
    },
    [n, safeIndex, onIndexChange],
  );

  const onSwipeTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (n <= 1) return;
      const t = e.touches[0];
      swipeStartRef.current = { x: t.clientX, y: t.clientY };
    },
    [n],
  );

  const onSwipeTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (n <= 1 || !swipeStartRef.current) return;
      const start = swipeStartRef.current;
      swipeStartRef.current = null;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const minDist = 48;
      if (absX < minDist) return;
      if (absX < absY * 1.2) return;
      if (dx < 0) go(1);
      else go(-1);
    },
    [n, go],
  );

  const onSwipeTouchCancel = useCallback(() => {
    swipeStartRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) return;
    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', onKey);
      lastFocusedElementRef.current?.focus();
    };
  }, [open, onClose, go]);

  /** iOS: `overflow: hidden` on body alone often still allows rubber-band scroll; lock + restore scroll. */
  useEffect(() => {
    if (!open) return;
    scrollYRef.current = window.scrollY;
    const prevBody = document.body.style.cssText;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    return () => {
      document.body.style.cssText = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.scrollTo(0, scrollYRef.current);
      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, [open]);

  if (!open || !slide || typeof document === 'undefined') return null;

  const node = (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-300 flex h-dvh max-h-dvh flex-col overflow-hidden overscroll-none bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
    >
      {/* Full-viewport tap target behind UI */}
      <button
        type="button"
        className="absolute inset-0 z-0 touch-manipulation bg-black/88"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pointer-events-none">
        {/* Close — safe-area so not under notch / status bar */}
        <div className="pointer-events-auto flex shrink-0 justify-end px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/80 text-white shadow-[0_4px_24px_rgba(0,0,0,0.55)] transition-opacity active:opacity-90 md:h-11 md:w-11 md:hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(201,168,76,0.55)]"
            aria-label="Close"
          >
            <X className="h-7 w-7 text-white md:h-6 md:w-6" strokeWidth={2} />
          </button>
        </div>

        {/* Image row: fills space between header and caption */}
        <div className="relative min-h-0 flex-1 px-2 sm:px-4">
          {n > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="pointer-events-auto absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-sm p-2 text-white/50 transition-colors hover:text-white/95 md:left-1"
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
                className="pointer-events-auto absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-sm p-2 text-white/50 transition-colors hover:text-white/95 md:right-1"
                aria-label="Next image"
              >
                <ChevronRight className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.1} />
              </button>
            </>
          ) : null}

          <div
            className="pointer-events-auto relative h-full w-full min-h-0 touch-manipulation"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={onSwipeTouchStart}
            onTouchEnd={onSwipeTouchEnd}
            onTouchCancel={onSwipeTouchCancel}
            role="presentation"
          >
            <Image
              src={slide.src}
              alt={slide.title || slide.subtitle || 'Detailing result image'}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Caption + counter — panel below image (not overlaid on photo) */}
        {slide.title || slide.subtitle || n > 1 ? (
          <div
            className="pointer-events-auto shrink-0 border-t border-white/10 bg-black/55 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {(slide.title || slide.subtitle) && (
              <div className="mx-auto max-w-lg text-center">
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
                    className="mt-1 text-[12px] font-medium text-white/60 md:text-[13px]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {slide.subtitle}
                  </p>
                ) : null}
              </div>
            )}
            {n > 1 ? (
              <p
                className={`text-center text-[10px] font-mono tabular-nums text-white/30 ${slide.title || slide.subtitle ? 'mt-2' : ''}`}
              >
                {safeIndex + 1} / {n}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
