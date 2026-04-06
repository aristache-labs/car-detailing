'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { GalleryPanel } from '@/data/gallery-cases';
import { galleryPanels } from '@/data/gallery-cases';

/* ── Inner drag slider ── */
interface SliderProps {
  panel: GalleryPanel;
  /** Eager-load when section is near viewport (improves LCP for hero imagery) */
  imagePriority?: boolean;
}

function DragSlider({ panel, imagePriority }: SliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRectRef = useRef<DOMRect | null>(null);
  const dragging = useRef(false);

  const captureRect = useCallback(() => {
    if (!containerRef.current) return;
    containerRectRef.current = containerRef.current.getBoundingClientRect();
  }, []);

  const update = useCallback((clientX: number) => {
    const rect = containerRectRef.current;
    if (!rect) return;
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPos(pct);
  }, []);

  /** Active window listeners for drag — cleared on mouseup or unmount */
  const dragListenersRef = useRef<{
    move: (e: MouseEvent) => void;
    up: () => void;
  } | null>(null);

  const onMouseDown = () => {
    dragging.current = true;
    captureRect();
    const move = (e: MouseEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      dragListenersRef.current = null;
    };
    dragListenersRef.current = { move, up };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const onTouchMove = (e: React.TouchEvent) => update(e.touches[0].clientX);

  useEffect(() => {
    captureRect();
    window.addEventListener('resize', captureRect, { passive: true });
    return () => {
      window.removeEventListener('resize', captureRect);
      const d = dragListenersRef.current;
      if (d) {
        window.removeEventListener('mousemove', d.move);
        window.removeEventListener('mouseup', d.up);
        dragListenersRef.current = null;
      }
    };
  }, [captureRect]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none"
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => {
        captureRect();
        update(e.touches[0].clientX);
      }}
    >
      {/* BEFORE layer */}
      <div className="absolute inset-0 flex items-end p-4">
        <Image
          src={panel.beforeImage}
          alt={`${panel.service} before`}
          fill
          priority={imagePriority}
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 78vw, 50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(5,5,8,0.08), rgba(5,5,8,0.4))' }}
          aria-hidden
        />
        <span
          className="relative z-10 px-2 py-1 text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-inter)',
          }}
        >
          {panel.beforeLabel}
        </span>
      </div>

      {/* AFTER layer — clipped */}
      <div
        className="absolute inset-0 flex items-end p-4"
        style={{
          clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`,
        }}
      >
        <Image
          src={panel.afterImage}
          alt={`${panel.service} after`}
          fill
          priority={imagePriority}
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 78vw, 50vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(5,5,8,0.04), rgba(5,5,8,0.3))' }}
          aria-hidden
        />
        <span
          className="relative z-10 px-2 py-1 text-[10px] font-bold tracking-widest uppercase ml-auto"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: panel.afterAccent,
            fontFamily: 'var(--font-inter)',
          }}
        >
          {panel.afterLabel}
        </span>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 z-20"
        style={{
          left: `${pos}%`,
          background: '#C9A84C',
          boxShadow: '0 0 8px rgba(201,168,76,0.6)',
        }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center"
          style={{ background: '#C9A84C', borderColor: '#FFD700' }}
          onMouseDown={onMouseDown}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
            <path d="M5 4L2 8L5 12M11 4L14 8L11 12" stroke="#070709" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter({
  variant = 'full',
  previewCount = 3,
}: {
  variant?: 'full' | 'preview';
  previewCount?: number;
}) {
  const displayPanels =
    variant === 'preview' ? galleryPanels.slice(0, previewCount) : galleryPanels;
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isNearViewport = useInView(sectionRef, { once: true, margin: '280px 0px' });
  const currentPanel = displayPanels[active];

  return (
    <section
      ref={sectionRef}
      id={variant === 'full' ? 'results' : undefined}
      className="relative py-12 md:py-13 overflow-hidden"
      style={{ background: 'var(--carbon-900)' }}
    >
      {/* Section label */}
      <div className="px-4 sm:px-8 md:px-14 mb-5 md:mb-6 flex items-end justify-between gap-4">
        <div className="text-center md:text-left mx-auto md:mx-0">
          <span
            className="inline-flex px-4 py-2 text-sm md:text-base font-black tracking-[0.2em] uppercase mb-2"
            style={{
              color: '#E2C06A',
              fontFamily: 'var(--font-orbitron)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
              border: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            Real Results
          </span>
          <h2
            className="text-5xl font-black leading-none md:text-7xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
          >
            BEFORE & AFTER{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F0D892 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RESULTS
            </span>
          </h2>
          <div className="mt-4 flex flex-row items-center justify-center md:justify-start gap-2.5 md:gap-3">
            <div className="h-px w-10 md:w-14 shrink-0" style={{ background: 'rgba(201,168,76,0.55)' }} />
            <span
              className="text-[10px] leading-snug tracking-[0.14em] md:text-premium-micro md:tracking-[0.26em] max-w-[290px] md:max-w-none text-left md:text-left"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              See how proper correction, coating, and detailing transform the finish.
            </span>
          </div>
        </div>
        <span
          className="hidden md:block text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Click any panel to expand
        </span>
      </div>

      {/* ── Mobile: full-width single active panel ── */}
      <div className="md:hidden px-4">
        {/* Mobile service switcher */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {displayPanels.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className="px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] uppercase transition-all duration-200"
              style={{
                color: active === p.id ? '#C9A84C' : 'rgba(154,154,176,0.9)',
                background: active === p.id ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${active === p.id ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)'}`,
                fontFamily: 'var(--font-inter)',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            height: '88vw',
            minHeight: '280px',
            maxHeight: '470px',
            background: displayPanels[active].beforeBg,
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.32)',
          }}
        >
          {isNearViewport ? (
            <DragSlider panel={displayPanels[active]} imagePriority={isNearViewport} />
          ) : null}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-3 z-30 px-3 py-1"
            style={{
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
            >
              {displayPanels[active].service}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Desktop: filmstrip ── */}
      <div className="hidden md:flex h-[500px] px-14 gap-1.5">
        {displayPanels.map((panel) => {
          const isActive = panel.id === active;
          return (
            <motion.div
              key={panel.id}
              onClick={() => setActive(panel.id)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? '3.2 0 0%' : '1.2 0 0%',
                transition: 'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'skewX(-2deg)',
                transformOrigin: 'bottom',
                background: panel.beforeBg,
                border: isActive ? '1px solid rgba(201,168,76,0.24)' : '1px solid rgba(255,255,255,0.03)',
                boxShadow: isActive ? '0 0 18px rgba(201,168,76,0.07)' : 'none',
              }}
            >
              {/* Inner content — unskew it */}
              <div
                className="absolute inset-0"
                style={{ transform: 'skewX(2deg)' }}
              >
                {isActive && isNearViewport ? (
                  <DragSlider panel={panel} imagePriority={isNearViewport} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 gap-2">
                    <div
                      className="w-px flex-1"
                      style={{ background: 'rgba(201,168,76,0.2)', maxHeight: 80 }}
                    />
                    <span
                      className="text-xs font-bold tracking-[0.2em] uppercase"
                      style={{
                        color: 'rgba(201,168,76,0.58)',
                        fontFamily: 'var(--font-orbitron)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {panel.label}
                    </span>
                  </div>
                )}
              </div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-3 left-3 z-30 px-2.5 py-1"
                  style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.28)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
                  >
                    {panel.service}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Panel selector dots */}
      <div className="hidden md:flex items-center gap-2.5 px-4 sm:px-8 md:px-14 mt-3">
        {displayPanels.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className="transition-all duration-300 flex items-center justify-center min-w-10 min-h-10"
            aria-label={`Show ${p.service} panel`}
            aria-current={active === p.id}
            style={{
              width: active === p.id ? 32 : 24,
              height: 3,
              background: active === p.id ? '#C9A84C' : 'rgba(255,255,255,0.15)',
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Slim proof strip */}
      <div className="px-4 sm:px-8 md:px-14 mt-4">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[
            { label: 'Vehicle', value: currentPanel.vehicle },
            { label: 'Service', value: currentPanel.proofService },
            { label: 'Time', value: currentPanel.time },
            { label: 'Outcome', value: currentPanel.outcome },
          ].map((item) => (
            <div key={item.label} className="min-w-0 text-center">
              <p
                className="inline-flex px-2.5 py-1 text-[9px] font-black tracking-[0.18em] uppercase"
                style={{
                  color: '#E2C06A',
                  fontFamily: 'var(--font-orbitron)',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
                  border: '1px solid rgba(201,168,76,0.32)',
                }}
              >
                {item.label}
              </p>
              <p className="text-[11px] md:text-xs mt-1 leading-relaxed text-center" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {variant === 'preview' ? (
        <div className="px-4 sm:px-8 md:px-14 mt-6 flex justify-center">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 border border-[#C9A84C]/45 text-[#E7C979] hover:bg-[#C9A84C]/10"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View full results gallery
          </Link>
        </div>
      ) : null}
    </section>
  );
}
