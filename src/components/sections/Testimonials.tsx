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
  const progress = ((current + 1) / testimonials.length) * 100;

  return (
    <section
      id="testimonials"
      className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">

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
                Verified Owner Reviews
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

            <p
              className="text-sm leading-relaxed max-w-120 mb-8"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Real feedback from clients who trust us with high-value vehicles and expect flawless results.
            </p>

            {/* Premium counter */}
            <div className="mb-6">
              <p
                className="font-black tabular-nums"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(2.15rem, 3.9vw, 3rem)',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: 'white',
                }}
              >
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {String(current + 1).padStart(2, '0')}
                </span>{' '}
                <span style={{ color: 'rgba(255,255,255,0.42)' }}>/</span>{' '}
                <span style={{ color: 'var(--text-soft)' }}>
                  {String(testimonials.length).padStart(2, '0')}
                </span>
              </p>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={back}
                className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  border: '1px solid rgba(201,168,76,0.25)',
                  background: 'linear-gradient(180deg, rgba(22,22,30,0.72), rgba(13,13,18,0.72))',
                  color: '#C9A84C',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.08)';
                  el.style.borderColor = 'rgba(201,168,76,0.48)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'linear-gradient(180deg, rgba(22,22,30,0.72), rgba(13,13,18,0.72))';
                  el.style.borderColor = 'rgba(201,168,76,0.25)';
                }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      width: i === current ? '24px' : '6px',
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
                className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{
                  border: '1px solid rgba(201,168,76,0.25)',
                  background: 'linear-gradient(180deg, rgba(22,22,30,0.72), rgba(13,13,18,0.72))',
                  color: '#C9A84C',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.08)';
                  el.style.borderColor = 'rgba(201,168,76,0.48)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'linear-gradient(180deg, rgba(22,22,30,0.72), rgba(13,13,18,0.72))';
                  el.style.borderColor = 'rgba(201,168,76,0.25)';
                }}
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p
              className="mt-5 text-xs"
              style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)', letterSpacing: '0.04em' }}
            >
              4.9 / 5 average · Ceramic · PPF · Correction
            </p>

            {/* Progress track */}
            <div className="mt-5 h-px w-full max-w-xs" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #FFD700)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
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
            {/* Ambient glow behind showcase card */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse at 70% 45%, rgba(201,168,76,0.08), transparent 62%)',
                filter: 'blur(8px)',
                transform: 'scale(1.02)',
              }}
            />

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
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(162deg, rgba(20,20,30,0.97) 0%, rgba(12,12,18,0.985) 100%)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderTop: '2px solid rgba(201,168,76,0.52)',
                    boxShadow: '0 30px 72px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.045)',
                    minHeight: '360px',
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

                  <div className="relative p-7 md:p-12">
                    {/* Top row: stars + service tag */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <motion.div
                        className="flex gap-1"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 }}
                      >
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="#C9A84C">
                            <path d={STAR_PATH} />
                          </svg>
                        ))}
                      </motion.div>
                      <motion.span
                        className="px-2.5 py-[3px] text-[9px] font-bold tracking-[0.16em] uppercase shrink-0"
                        style={{
                          background: 'rgba(201,168,76,0.07)',
                          border: '1px solid rgba(201,168,76,0.2)',
                          color: 'rgba(201,168,76,0.85)',
                          fontFamily: 'var(--font-inter)',
                        }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.14 }}
                      >
                        {t.service.toUpperCase()}
                      </motion.span>
                    </div>

                    {/* Quote */}
                    <motion.blockquote
                      className="leading-relaxed mb-8 max-w-3xl"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 'clamp(1.08rem, 2.2vw, 1.36rem)',
                        color: 'rgba(255,255,255,0.88)',
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                        lineHeight: 1.75,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.18 }}
                    >
                      {t.quote}
                    </motion.blockquote>

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
                      <motion.div
                        className="w-10 h-10 shrink-0 flex items-center justify-center font-black text-[11px] tracking-wider"
                        style={{
                          background: 'rgba(201,168,76,0.1)',
                          border: '1px solid rgba(201,168,76,0.28)',
                          color: '#C9A84C',
                          fontFamily: 'var(--font-orbitron)',
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.24 }}
                      >
                        {initials}
                      </motion.div>
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
                        <p
                          className="text-[10px] mt-1 uppercase tracking-[0.12em]"
                          style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)' }}
                        >
                          {t.service} · Verified Owner
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
