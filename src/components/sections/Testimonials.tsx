'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const STAR_PATH = 'M8 1l1.854 3.759L14 5.528l-3 2.922.708 4.128L8 10.545l-3.708 2.033L5 8.45 2 5.528l4.146-.769L8 1z';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const advance = useCallback(() => {
    setDir(1);
    setCurrent(c => (c + 1) % testimonials.length);
  }, []);

  const back = useCallback(() => {
    setDir(-1);
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setDir(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  const onPointerDown = (e: React.PointerEvent) => setDragStart(e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart === null) return;
    const delta = e.clientX - dragStart;
    if (delta < -50) advance();
    else if (delta > 50) back();
    setDragStart(null);
  };

  const t = testimonials[current];
  const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-24 overflow-hidden"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Ambient diagonal stripe */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute"
          style={{
            width: '200%',
            height: '140px',
            top: '35%',
            left: '-50%',
            background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.022), transparent)',
            transform: 'rotate(-5deg)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-center">

          {/* ── LEFT: header + counter + nav ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <div className="h-px w-6" style={{ background: '#C9A84C' }} />
              <span className="text-premium-micro tracking-[0.22em]" style={{ fontFamily: 'var(--font-inter)' }}>
                Verified Reviews
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-5xl md:text-6xl xl:text-7xl font-black leading-none mb-6"
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

            {/* Premium counter */}
            <div className="flex items-end gap-3 mb-8">
              <span
                className="font-black leading-none tabular-nums"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(2.4rem, 4vw, 3rem)',
                  background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {String(current + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col items-start gap-0.5 mb-1.5">
                <div className="h-px w-8" style={{ background: 'rgba(255,255,255,0.14)' }} />
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '0.7rem',
                    color: 'var(--text-soft)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {String(testimonials.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={back}
                className="w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  border: '1px solid rgba(201,168,76,0.25)',
                  background: 'transparent',
                  color: '#C9A84C',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.08)';
                  el.style.borderColor = 'rgba(201,168,76,0.48)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'transparent';
                  el.style.borderColor = 'rgba(201,168,76,0.25)';
                }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      width: i === current ? '20px' : '6px',
                      height: '6px',
                      background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.28)',
                      border: 'none',
                      borderRadius: '3px',
                    }}
                    aria-label={`Go to ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={advance}
                className="w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  border: '1px solid rgba(201,168,76,0.25)',
                  background: 'transparent',
                  color: '#C9A84C',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.08)';
                  el.style.borderColor = 'rgba(201,168,76,0.48)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'transparent';
                  el.style.borderColor = 'rgba(201,168,76,0.25)';
                }}
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT: quote card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 relative"
          >
            {/* Large decorative quote mark */}
            <div
              className="absolute -top-5 -left-2 pointer-events-none select-none leading-none font-black"
              aria-hidden="true"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(7rem, 14vw, 11rem)',
                color: 'rgba(201,168,76,0.07)',
                lineHeight: 1,
              }}
            >
              &ldquo;
            </div>

            {/* Swipeable card area */}
            <div
              className="relative cursor-grab active:cursor-grabbing select-none"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <AnimatePresence mode="popLayout" custom={dir}>
                <motion.div
                  key={current}
                  custom={dir}
                  initial={{ x: dir * 48, opacity: 0, scale: 0.98 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: dir * -48, opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(160deg, rgba(20,20,30,0.95) 0%, rgba(13,13,18,0.97) 100%)',
                    border: '1px solid rgba(201,168,76,0.16)',
                    borderTop: '2px solid rgba(201,168,76,0.52)',
                    boxShadow: '0 22px 56px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}
                >
                  {/* Subtle top-right glow */}
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: '200px',
                      height: '120px',
                      background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.06), transparent 70%)',
                    }}
                  />

                  <div className="relative p-7 md:p-10">
                    {/* Top row: stars + service tag */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="#C9A84C">
                            <path d={STAR_PATH} />
                          </svg>
                        ))}
                      </div>
                      <span
                        className="px-2.5 py-[3px] text-[9px] font-bold tracking-[0.16em] uppercase shrink-0"
                        style={{
                          background: 'rgba(201,168,76,0.07)',
                          border: '1px solid rgba(201,168,76,0.2)',
                          color: 'rgba(201,168,76,0.85)',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {t.service}
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="leading-relaxed mb-8"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 'clamp(1rem, 2vw, 1.22rem)',
                        color: 'rgba(255,255,255,0.88)',
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {t.quote}
                    </blockquote>

                    {/* Divider */}
                    <div
                      className="mb-5"
                      style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0.06) 60%, transparent 100%)',
                      }}
                    />

                    {/* Author block */}
                    <div className="flex items-center gap-3">
                      {/* Initials avatar */}
                      <div
                        className="w-10 h-10 shrink-0 flex items-center justify-center font-black text-[11px] tracking-wider"
                        style={{
                          background: 'rgba(201,168,76,0.1)',
                          border: '1px solid rgba(201,168,76,0.28)',
                          color: '#C9A84C',
                          fontFamily: 'var(--font-orbitron)',
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p
                          className="font-bold text-[11px] tracking-widest uppercase"
                          style={{ color: 'white', fontFamily: 'var(--font-orbitron)' }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-xs mt-0.5 font-medium"
                          style={{ color: 'rgba(201,168,76,0.75)', fontFamily: 'var(--font-inter)' }}
                        >
                          {t.car}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress track */}
            <div className="mt-5 h-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #FFD700)' }}
                animate={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
