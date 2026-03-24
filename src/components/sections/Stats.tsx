'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Cars Detailed',
    unit: 'vehicles treated',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17h20M6 17l2.5-6h11l2.5 6" />
        <path d="M8 17v2M20 17v2" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="19" cy="20" r="1.5" />
        <path d="M10.5 11l1-3h5l1 3" />
      </svg>
    ),
  },
  {
    value: 5,
    suffix: '+',
    label: 'Years Active',
    unit: 'of precision experience',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 4.5l-1.5 1.5 6 6 1.5-1.5a3 3 0 00-6-6z" />
        <path d="M16 6L6.5 15.5l-.5 4.5 4.5-.5L20 10" />
        <path d="M6 22h6" />
      </svg>
    ),
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Return',
    unit: 'satisfaction rate',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3l2.5 5 5.5.8-4 3.9.95 5.5L14 15.5 9.05 18.2 10 12.7 6 8.8l5.5-.8L14 3z" />
        <path d="M9 22l5-2.5 5 2.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: '%',
    label: 'Premium Grade',
    unit: 'certified materials only',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4L6 7v7c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-3z" />
        <path d="M10 14l2.5 2.5L18 11" />
      </svg>
    ),
  },
];

const features = [
  {
    title: 'Written Warranty',
    desc: 'Every service backed by a real guarantee — not just words.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2L3 4v5c0 3 2.1 5.3 5 5.9 2.9-.6 5-2.9 5-5.9V4l-5-2z" />
        <path d="M5.5 8l2 2L11 6" />
      </svg>
    ),
  },
  {
    title: 'Certified Products',
    desc: 'Professional-grade materials from accredited suppliers only.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="7" r="4" />
        <path d="M5.5 13.5l2.5-1.5 2.5 1.5-.5-3 2-2h-3L8 5.5 7 8.5H4l2 2-.5 3z" />
      </svg>
    ),
  },
  {
    title: 'Same-Day Quotes',
    desc: 'Transparent pricing delivered within hours of your enquiry.',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="9" r="5" />
        <path d="M8 6v3l2 1.5" />
        <path d="M5.5 2.5h5M8 2v2" />
      </svg>
    ),
  },
];

function StatPanel({
  value,
  suffix,
  label,
  unit,
  icon,
  animate,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  unit: string;
  icon: React.ReactNode;
  animate: boolean;
  delay: number;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [animate, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center text-center px-4 py-7 overflow-hidden"
      style={{
        background: 'var(--carbon-800)',
        borderRadius: '2px',
        border: '1px solid rgba(255,255,255,0.045)',
        borderTop: 'none',
      }}
    >
      {/* Gold top accent — gradient left-to-right */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.15) 100%)',
        }}
      />

      {/* Hover glint overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Icon */}
      <div
        className="mb-4"
        style={{ color: '#C9A84C', width: 28, height: 28 }}
      >
        {icon}
      </div>

      {/* Number */}
      <div
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.75rem, 5vw, 3.75rem)',
          lineHeight: 1,
          letterSpacing: '0.03em',
          background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 55%, #9A7B2E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {displayed}{suffix}
      </div>

      {/* Hairline divider */}
      <div
        className="my-3 w-8"
        style={{ height: '1px', background: 'rgba(201,168,76,0.35)' }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-orbitron)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'white',
          fontWeight: 700,
        }}
      >
        {label}
      </div>

      {/* Descriptor */}
      <div
        className="mt-1"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.68rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.02em',
        }}
      >
        {unit}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="stats"
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal gold accent stripe */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            width: '200%',
            height: '2px',
            top: '45%',
            left: '-50%',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)',
            transform: 'rotate(-8deg)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 relative">

        {/* Section heading */}
        <div className="mb-14 text-center md:text-left">
          <h2
            className="text-5xl md:text-7xl font-black leading-none"
            style={{
              fontFamily: 'var(--font-bebas)',
              color: 'white',
              letterSpacing: '0.04em',
            }}
          >
            BY THE{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 50%, #9A7B2E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              NUMBERS
            </span>
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 mt-3">
            <div className="w-20 md:w-16 h-px" style={{ background: '#C9A84C' }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              Proof of craft
            </span>
          </div>
        </div>

        {/* Stat panels */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-20">
          {stats.map((s, i) => (
            <StatPanel key={s.label} {...s} animate={inView} delay={i * 0.12} />
          ))}
        </div>

        {/* Feature pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              className="relative pl-5 py-3"
            >
              {/* Gradient left border */}
              <div
                className="absolute left-0 top-0 bottom-0"
                style={{
                  width: '2px',
                  background: 'linear-gradient(180deg, #C9A84C 0%, rgba(201,168,76,0.1) 100%)',
                }}
              />

              {/* Title + icon */}
              <div className="flex items-center gap-2 mb-2">
                <div style={{ color: '#C9A84C', width: 16, height: 16, flexShrink: 0 }}>
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {f.title}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.8rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
