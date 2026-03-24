'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const plans = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'The clean slate',
    price: '149',
    currency: 'RON',
    duration: '~3h',
    highlight: false,
    badge: null,
    services: [
      'Exterior hand wash',
      'Wheel & tire clean',
      'Interior vacuum',
      'Dashboard wipe',
      'Glass clean (interior)',
    ],
    excludes: ['Machine polish', 'Ceramic coating', 'Engine bay', 'Leather treatment'],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Deep correction',
    price: '490',
    currency: 'RON',
    duration: '~8h',
    highlight: true,
    badge: 'Most Popular',
    services: [
      'Full exterior detail',
      'Single-stage machine polish',
      'Clay bar decontamination',
      'Full interior deep clean',
      'Leather conditioning',
      'Engine bay detail',
      'Tyre dressing',
    ],
    excludes: ['Ceramic coating', 'PPF installation'],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Full protection',
    price: '1,200',
    currency: 'RON',
    duration: '~2 days',
    highlight: false,
    badge: 'Complete Package',
    services: [
      'Multi-stage paint correction',
      'Professional ceramic coating',
      'SiO₂ nano glass coating',
      'Full interior sanitize',
      'Leather restoration',
      'Engine bay detail',
      'Wheel ceramic coating',
      '3-year warranty certificate',
    ],
    excludes: [],
  },
];

export default function Pricing() {
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const onScroll = () => {
    if (!railRef.current) return;
    const el = railRef.current;
    const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setScrollPct(pct * 100);
  };

  return (
    <section
      id="pricing"
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--carbon-900)' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section title — overlaps card rail */}
      <div className="px-4 sm:px-8 md:px-14 mb-10 relative z-10 text-center md:text-left">
        <h2
          className="text-5xl md:text-7xl font-black leading-none"
          style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.04em' }}
        >
          CHOOSE YOUR{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LEVEL
          </span>
        </h2>
        <div
          className="h-px w-20 mx-auto md:mx-0 mt-3 mb-2"
          style={{ background: 'rgba(201,168,76,0.5)' }}
        />
        <p
          className="text-sm max-w-md mx-auto md:mx-0"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Scroll to explore all packages. Hover to reveal included services.
        </p>
      </div>

      {/* Horizontal scroll rail */}
      <div
        ref={railRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto px-4 sm:px-8 md:px-14 pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {plans.map((plan, i) => {
          const isHovered = hoveredId === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(plan.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative shrink-0 flex flex-col"
              style={{
                width: isHovered ? '340px' : 'min(85vw, 300px)',
                minHeight: '520px',
                scrollSnapAlign: 'start',
                background: plan.highlight ? 'linear-gradient(180deg, #1a1a24 0%, #12121a 100%)' : 'var(--carbon-800)',
                border: plan.highlight ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(255,255,255,0.06)',
                borderTop: plan.highlight ? '3px solid #C9A84C' : '3px solid rgba(255,255,255,0.08)',
                boxShadow: plan.highlight ? '0 0 40px rgba(201,168,76,0.12)' : 'none',
                transition: 'width 0.3s ease, box-shadow 0.3s ease',
                overflow: 'hidden',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    background: plan.highlight ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${plan.highlight ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: plan.highlight ? '#C9A84C' : 'var(--text-muted)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan name */}
                <div
                  className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Package
                </div>
                <h3
                  className="text-4xl font-black mb-1"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    color: plan.highlight ? '#C9A84C' : 'white',
                    letterSpacing: '0.05em',
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                >
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)', marginBottom: '0.4rem' }}
                  >
                    {plan.currency}
                  </span>
                  <span
                    className="text-5xl font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      color: 'white',
                    }}
                  >
                    {plan.price}
                  </span>
                </div>
                <p
                  className="text-xs mb-6"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Estimated duration: {plan.duration}
                </p>

                {/* Divider */}
                <div
                  className="w-full h-px mb-6"
                  style={{ background: plan.highlight ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)' }}
                />

                {/* Services — always visible, expand on hover reveals "included" label */}
                <div className="flex-1">
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-3"
                    style={{ color: plan.highlight ? '#C9A84C' : 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    {isHovered ? '✓ Included Services' : 'Services'}
                  </p>
                  <ul className="space-y-2">
                    {plan.services.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <Check
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: plan.highlight ? '#C9A84C' : '#6a6a80' }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)' }}
                        >
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Excluded — only show on hover */}
                  {isHovered && plan.excludes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <p
                        className="text-[10px] font-bold tracking-widest uppercase mb-2"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                      >
                        Not included
                      </p>
                      <ul className="space-y-1">
                        {plan.excludes.map((s) => (
                          <li
                            key={s}
                            className="text-xs line-through"
                            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-shimmer mt-8 flex items-center justify-center gap-2 w-full py-4 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-300"
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(135deg, #C9A84C, #FFD700)'
                      : 'transparent',
                    color: plan.highlight ? '#070709' : '#C9A84C',
                    border: plan.highlight ? 'none' : '1px solid rgba(201,168,76,0.3)',
                    fontFamily: 'var(--font-inter)',
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
                  }}
                >
                  Book {plan.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Custom quote card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.36, duration: 0.6 }}
          className="shrink-0 flex flex-col items-center justify-center p-10 text-center"
          style={{
            width: 'min(85vw, 260px)',
            minHeight: '520px',
            scrollSnapAlign: 'start',
            border: '1px dashed rgba(201,168,76,0.2)',
            background: 'transparent',
          }}
        >
          <div
            className="text-5xl mb-4"
            style={{ color: 'rgba(201,168,76,0.3)', fontFamily: 'var(--font-bebas)' }}
          >
            ?
          </div>
          <h3
            className="text-xl font-black mb-3"
            style={{ fontFamily: 'var(--font-bebas)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}
          >
            CUSTOM
          </h3>
          <p
            className="text-xs leading-relaxed mb-6"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Fleet vehicles, special projects, or multi-car packages — let us build a quote for you.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs font-bold tracking-widest uppercase flex items-center gap-1 cursor-pointer"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)', background: 'none', border: 'none' }}
          >
            Get Quote <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>
      </div>

      {/* Gold scroll progress bar */}
      <div className="px-4 sm:px-8 md:px-14 mt-4">
        <div
          className="h-px w-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="h-full"
            style={{ background: '#C9A84C', width: `${scrollPct}%`, transition: 'width 0.1s ease' }}
          />
        </div>
      </div>
    </section>
  );
}
