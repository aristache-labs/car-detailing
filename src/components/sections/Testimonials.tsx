'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: "The ceramic coating they applied is genuinely unbelievable. Six months later and water still beads like the day I picked it up. No exaggeration.",
    name: 'Andrei M.',
    car: 'BMW M4 Competition',
    service: 'Ceramic Coating',
    rating: 5,
  },
  {
    quote: "I've been to three detailing shops before. None of them came close. The paint correction removed swirl marks I'd had for two years in a single session.",
    name: 'Cristina V.',
    car: 'Mercedes GLC 300',
    service: 'Paint Correction',
    rating: 5,
  },
  {
    quote: "Brought in a company car that looked ten years old. Got it back looking like it just rolled out of the showroom. Worth every leu.",
    name: 'Bogdan T.',
    car: 'Audi A6 Avant',
    service: 'Full Detail Package',
    rating: 5,
  },
  {
    quote: "The PPF application is invisible — exactly what I wanted. Not a single visible edge, and the hood feels like it has a skin of glass over it.",
    name: 'Radu I.',
    car: 'Porsche Cayenne',
    service: 'PPF Full Front',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const dragStartRef = useRef<number | null>(null);

  const advance = () => {
    setDir(1);
    setCurrent((c: number) => (c + 1) % testimonials.length);
  };

  const back = () => {
    setDir(-1);
    setCurrent((c: number) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStartRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartRef.current === null) return;
    const end = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = end - dragStartRef.current;
    if (delta < -50) advance();
    else if (delta > 50) back();
    dragStartRef.current = null;
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Diagonal gold stripe watermark */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute"
          style={{
            width: '200%',
            height: '120px',
            top: '30%',
            left: '-50%',
            background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.025), transparent)',
            transform: 'rotate(-6deg)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-8 md:px-14 relative">
        {/* Section header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2
              className="text-5xl md:text-7xl font-black leading-none"
              style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.04em' }}
            >
              CLIENT{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                VOICES
              </span>
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-12 h-px" style={{ background: '#C9A84C' }} />
              <span
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
              >
                {current + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Arrow navigation */}
          <button
            onClick={advance}
            className="group flex items-center gap-2 px-5 py-3 transition-all duration-200 cursor-pointer"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'transparent',
              color: '#C9A84C',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <span
              className="text-xs font-bold tracking-widest uppercase hidden sm:block"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Next
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stacked deck */}
        <div
          className="relative cursor-grab active:cursor-grabbing select-none"
          style={{ height: '320px', perspective: '1000px' }}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          {/* Peek cards behind — 2 ghost cards */}
          {[2, 1].map((offset) => (
            <div
              key={offset}
              className="absolute inset-0"
              style={{
                background: 'var(--carbon-800)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '2px solid rgba(201,168,76,0.15)',
                transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.025})`,
                zIndex: 10 - offset,
                borderRadius: '2px',
              }}
            />
          ))}

          {/* Active card */}
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ x: dir * 60, opacity: 0, scale: 0.97 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: dir * -60, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between"
              style={{
                background: 'var(--carbon-800)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderTop: '2px solid rgba(201,168,76,0.5)',
                zIndex: 20,
                borderRadius: '2px',
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} viewBox="0 0 16 16" className="w-4 h-4" fill="#C9A84C">
                    <path d="M8 1l1.854 3.759L14 5.528l-3 2.922.708 4.128L8 10.545l-3.708 2.033L5 8.45 2 5.528l4.146-.769L8 1z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="flex-1 text-lg md:text-2xl italic leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Georgia, serif' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Footer */}
              <div className="flex items-end justify-between">
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: 'white', fontFamily: 'var(--font-orbitron)', fontSize: '0.75rem', letterSpacing: '0.08em' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs mt-0.5 font-bold tracking-wider"
                    style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
                  >
                    {t.car}
                  </p>
                </div>
                <span
                  className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: 'rgba(201,168,76,0.7)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {t.service}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div
          className="mt-8 h-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="h-full"
            style={{ background: '#C9A84C' }}
            animate={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
}
