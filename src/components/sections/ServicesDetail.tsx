'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ─── Service-specific large SVG icons ─────────────────────────────────── */

function PolishIcon() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="polishGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="70" fill="url(#polishGlow)" />
      {/* Polishing pad */}
      <circle cx="80" cy="80" r="40" stroke="#C9A84C" strokeWidth="2" fill="none" />
      <circle cx="80" cy="80" r="28" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="80" r="14" stroke="rgba(201,168,76,0.3)" strokeWidth="1" fill="rgba(201,168,76,0.05)" />
      {/* Orbital shine particles — fixed coords (no trig) to avoid SSR/client float hydration mismatches */}
      {(
        [
          [132, 80],
          [106, 125.03],
          [54, 125.03],
          [28, 80],
          [54, 34.97],
          [106, 34.97],
        ] as const
      ).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#C9A84C" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Tool handle */}
      <rect x="76" y="16" width="8" height="28" rx="4" fill="#C9A84C" opacity="0.8" />
      {/* Sparkle lines */}
      <path d="M120 30 L128 22M124 40 L134 38M114 24 L118 14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function CeramicIcon() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="ceramicGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8D4DE" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C8D4DE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="70" fill="url(#ceramicGlow)" />
      {/* Water bead drop — main */}
      <path d="M80 30 Q95 55 95 72 Q95 90 80 95 Q65 90 65 72 Q65 55 80 30Z" fill="rgba(200,212,222,0.15)" stroke="#C8D4DE" strokeWidth="1.5" />
      {/* Inner highlight */}
      <path d="M73 50 Q78 42 82 50" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Smaller beads */}
      {[[115, 60, 14], [40, 75, 10], [110, 105, 8], [50, 110, 12]].map(([cx, cy, r], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.2} fill="rgba(200,212,222,0.1)" stroke="#C8D4DE" strokeWidth="1" />
          <animate attributeName="cy" values={`${cy};${cy + 4};${cy}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </g>
      ))}
      {/* Hydrophobic surface lines */}
      <path d="M20 130 Q80 118 140 130" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 140 Q80 128 130 140" stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function PPFIcon() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="ppfGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="70" fill="url(#ppfGlow)" />
      {/* Shield */}
      <path d="M80 18 L126 38 L126 85 Q126 120 80 142 Q34 120 34 85 L34 38 Z" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.06)" />
      {/* Inner shield */}
      <path d="M80 30 L114 46 L114 82 Q114 110 80 128 Q46 110 46 82 L46 46 Z" stroke="rgba(201,168,76,0.4)" strokeWidth="1" fill="none" strokeDasharray="3 5" />
      {/* Check / film layer lines */}
      <path d="M56 80 L72 96 L108 60" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dashoffset" from="80" to="0" dur="1.5s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="80 80" to="80 0" dur="1.5s" fill="freeze" />
      </path>
      {/* Corner peeled film */}
      <path d="M108 32 Q120 20 128 28 Q120 36 108 44 Z" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="1" />
    </svg>
  );
}

/* ─── Service data ─────────────────────────────────────────────────────── */
const services = [
  {
    number: '01',
    title: 'Polish\nExterior',
    subtitle: 'Machine paint correction',
    description: 'Multi-stage machine polishing removes swirl marks, scratches, and oxidation down to the clear coat. The result is a mirror-like finish with depth, clarity, and true reflectivity — impossible to achieve by hand.',
    tags: ['Single-stage', 'Multi-stage', 'DA Polishing'],
    icon: <PolishIcon />,
    flip: false,
  },
  {
    number: '02',
    title: 'Ceramic\nCoating',
    subtitle: 'Nano-ceramic protection',
    description: 'SiO₂ nano-ceramic technology bonds permanently to the paint surface, creating a hydrophobic, UV-resistant, self-cleaning layer that outlasts any wax or sealant — by years, not weeks.',
    tags: ['SiO₂ Based', '3-Year Warranty', 'Hydrophobic'],
    icon: <CeramicIcon />,
    flip: true,
  },
  {
    number: '03',
    title: 'PPF\nWrapping',
    subtitle: 'Paint protection film',
    description: 'Military-grade polyurethane film absorbs rock chips, door dings, and chemical stains before they ever reach your paint. Self-healing at low temperatures. Applied with zero visible edges.',
    tags: ['Self-Healing', 'Clear or Matte', '10-Year Film'],
    icon: <PPFIcon />,
    flip: false,
  },
];

interface ServiceRowProps {
  service: typeof services[0];
}

function ServiceRow({ service }: ServiceRowProps) {
  const fromLeft = !service.flip;

  return (
    <div
      className="relative flex flex-col lg:flex-row overflow-hidden"
      style={{ minHeight: 'clamp(340px, 52vh, 700px)' }}
    >
      {/* Icon panel */}
      <motion.div
        className={`relative flex items-center justify-center flex-1 ${service.flip ? 'lg:order-2 svc-clip-left' : 'lg:order-1 svc-clip-right'}`}
        style={{
          background: service.flip
            ? 'linear-gradient(135deg, #0d0d14 0%, #14141c 100%)'
            : 'linear-gradient(225deg, #0d0d14 0%, #12121e 100%)',
          minHeight: '220px',
        }}
        initial={{ x: fromLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        {/* Radial bg glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44">
          {service.icon}
        </div>
      </motion.div>

      {/* Text panel */}
      <motion.div
        className={`flex-1 flex items-center px-6 sm:px-8 md:px-14 lg:px-16 py-8 lg:py-12 ${service.flip ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ background: 'var(--carbon-950)' }}
        initial={{ x: fromLeft ? 80 : -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="max-w-md">
          {/* Step number */}
          <div
            className="text-[5rem] leading-none font-black mb-2 select-none"
            style={{
              fontFamily: 'var(--font-bebas)',
              color: 'rgba(201,168,76,0.12)',
              letterSpacing: '-0.02em',
            }}
          >
            {service.number}
          </div>

          {/* Title */}
          <h2
            className="text-5xl md:text-6xl font-black leading-none mb-3"
            style={{
              fontFamily: 'var(--font-bebas)',
              background: 'linear-gradient(135deg, #E8EEF4 0%, #C8D4DE 30%, #fff 50%, #C8D4DE 70%, #8E9EAB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'pre-line',
            }}
          >
            {service.title}
          </h2>

          {/* Subtitle */}
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-5"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
          >
            {service.subtitle}
          </p>

          {/* Gold thin line */}
          <div className="w-12 h-px mb-6" style={{ background: '#C9A84C' }} />

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed mb-6"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#C9A84C',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#FFD700')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
          >
            Get a Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesDetail() {
  return (
    <section id="services" className="relative" style={{ background: 'var(--carbon-950)' }}>
      {/* Section label — top left */}
      <div className="px-8 md:px-14 pt-16 pb-8 flex flex-col md:flex-row md:items-center items-center gap-3 md:gap-4 text-center md:text-left">
        <span
          className="text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
        >
          Our Services
        </span>
        <div
          className="h-px w-28 md:flex-1 md:w-auto"
          style={{ background: 'rgba(201,168,76,0.15)' }}
        />
        <span className="text-premium-micro" style={{ fontFamily: 'var(--font-inter)' }}>
          {String(services.length).padStart(2, '0')} Specializations
        </span>
      </div>

      {/* Service rows */}
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {services.map((s) => (
          <ServiceRow key={s.number} service={s} />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 md:px-14 py-10"
        style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}
      >
        <p className="text-sm md:text-[0.95rem] leading-relaxed text-on-texture" style={{ fontFamily: 'var(--font-inter)' }}>
          Also offering: Interior Detailing · Leather Restoration · Wheel & Caliper Paint · Engine Bay
        </p>
        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-shimmer flex items-center gap-2 px-8 py-3 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
            color: '#070709',
            fontFamily: 'var(--font-inter)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
          }}
        >
          View All Services
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </section>
  );
}
