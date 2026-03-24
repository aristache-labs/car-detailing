'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const gauges = [
  { value: 500, max: 500, label: 'Cars Detailed', suffix: '+', unit: 'vehicles' },
  { value: 5, max: 10, label: 'Years Active', suffix: '', unit: 'of experience' },
  { value: 98, max: 100, label: 'Satisfaction', suffix: '%', unit: 'client return rate' },
  { value: 100, max: 100, label: 'Premium Grade', suffix: '%', unit: 'certified materials' },
];

const features = [
  {
    title: 'Written Warranty',
    desc: 'Every service backed by a real guarantee — not just words.',
  },
  {
    title: 'Certified Products',
    desc: 'Professional-grade materials from accredited suppliers only.',
  },
  {
    title: 'Same-Day Quotes',
    desc: 'Transparent pricing delivered within hours of your enquiry.',
  },
];

/* SVG Arc Gauge */
interface GaugeProps {
  value: number;
  max: number;
  label: string;
  suffix: string;
  unit: string;
  animate: boolean;
}

function ArcGauge({ value, max, label, suffix, unit, animate }: GaugeProps) {
  const [displayed, setDisplayed] = useState(0);
  const pct = value / max;

  // Arc math: 220° sweep, starting from 200° (bottom-left)
  const R = 52;
  const CX = 70;
  const CY = 78;
  const startAngle = 200; // degrees
  const totalArc = 220;   // degrees
  const endAngle = startAngle + (animate ? pct * totalArc : 0);

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (angle: number) => {
    const x = CX + R * Math.cos(toRad(angle));
    const y = CY + R * Math.sin(toRad(angle));
    const large = angle - startAngle > 180 ? 1 : 0;
    const sx = CX + R * Math.cos(toRad(startAngle));
    const sy = CY + R * Math.sin(toRad(startAngle));
    return `M ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${x} ${y}`;
  };

  // Count-up
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
    <div className="flex flex-col items-center">
      <svg width="140" height="120" viewBox="0 0 140 120">
        {/* Track arc */}
        <path
          d={arcPath(startAngle + totalArc)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={arcPath(animate ? endAngle : startAngle)}
          stroke="url(#arcGrad)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          style={{
            transition: animate ? 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        />
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9A7B2E" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        {/* Center value */}
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          fill="#FFD700"
          fontSize="22"
          fontFamily="var(--font-orbitron)"
          fontWeight="900"
        >
          {displayed}{suffix}
        </text>
        {/* Needle dot */}
        {animate && (
          <circle
            cx={CX + R * Math.cos(toRad(endAngle))}
            cy={CY + R * Math.sin(toRad(endAngle))}
            r="5"
            fill="#FFD700"
            filter="url(#needleDot)"
          />
        )}
        <defs>
          <filter id="needleDot">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
      <div
        className="text-xs font-bold tracking-[0.2em] uppercase mt-1"
        style={{ color: 'white', fontFamily: 'var(--font-orbitron)', fontSize: '0.65rem' }}
      >
        {label}
      </div>
      <div
        className="text-[10px] mt-0.5"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
      >
        {unit}
      </div>
    </div>
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
      <div
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden"
      >
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
        {/* Section label — flush left, no SectionHeading */}
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

        {/* Gauges row */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
          {gauges.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rounded-xl p-4 flex justify-center"
              style={{
                background: 'var(--carbon-800)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '2px solid rgba(201,168,76,0.3)',
              }}
            >
              <ArcGauge {...g} animate={inView} />
            </motion.div>
          ))}
        </div>

        {/* Feature pillars — horizontal row, left-border style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              className="pl-5 py-2"
              style={{ borderLeft: '3px solid #C9A84C' }}
            >
              <h3
                className="font-black text-base mb-2"
                style={{ color: 'white', fontFamily: 'var(--font-orbitron)', fontSize: '0.8rem', letterSpacing: '0.05em' }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
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
