'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const plans = [
  {
    id: 'essential',
    name: 'Polish Exterior',
    tagline: 'Paint correction finish',
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
    name: 'Ceramic Coating',
    tagline: 'Long-term gloss protection',
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
    name: 'PPF Wrapping',
    tagline: 'Impact protection layer',
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
  return (
    <section
      id="pricing"
      className="relative py-20 md:py-24 overflow-hidden"
      style={{ background: 'var(--carbon-900)' }}
    >
      {/* Subtle technical grid */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        {/* Section header */}
        <div className="mb-10 md:mb-12 text-center md:text-left">
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
            style={{ background: 'rgba(201,168,76,0.45)' }}
          />
          <p
            className="text-sm max-w-md mx-auto md:mx-0"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Select the package that matches your vehicle goals.
          </p>
        </div>

        {/* Premium card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="relative flex flex-col min-h-[540px]"
              style={{
                background: plan.highlight
                  ? 'linear-gradient(180deg, rgba(24,24,34,0.95) 0%, rgba(16,16,24,0.96) 100%)'
                  : 'linear-gradient(180deg, rgba(18,18,28,0.95) 0%, rgba(12,12,18,0.96) 100%)',
                border: plan.highlight
                  ? '1px solid rgba(201,168,76,0.48)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: plan.highlight
                  ? '0 14px 45px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.12)'
                  : '0 12px 36px rgba(0,0,0,0.34)',
              }}
            >
              {/* subtle top accent */}
              <div
                className="absolute left-0 top-0 right-0 h-px"
                style={{
                  background: plan.highlight
                    ? 'linear-gradient(90deg, transparent, rgba(201,168,76,0.85), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              />

              {plan.badge && (
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] uppercase"
                  style={{
                    color: plan.highlight ? '#C9A84C' : 'var(--text-muted)',
                    border: `1px solid ${plan.highlight ? 'rgba(201,168,76,0.34)' : 'rgba(255,255,255,0.16)'}`,
                    background: plan.highlight ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.04)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="flex flex-col flex-1 p-6 lg:p-7">
                <p
                  className="text-[10px] font-bold tracking-[0.26em] uppercase mb-2"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Package
                </p>

                <h3
                  className="text-4xl font-black leading-[0.9] mb-2"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    letterSpacing: '0.05em',
                    color: plan.highlight ? '#C9A84C' : 'white',
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

                <div className="flex items-end gap-1 mb-1">
                  <span
                    className="text-xs mb-2"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    {plan.currency}
                  </span>
                  <span
                    className="text-5xl font-black leading-none tabular-nums"
                    style={{ color: 'white', fontFamily: 'var(--font-orbitron)' }}
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

                <div
                  className="h-px w-full mb-5"
                  style={{ background: plan.highlight ? 'rgba(201,168,76,0.24)' : 'rgba(255,255,255,0.09)' }}
                />

                <p
                  className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                  style={{ color: plan.highlight ? '#C9A84C' : 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Included Services
                </p>
                <ul className="space-y-2.5 flex-1">
                  {plan.services.slice(0, 6).map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <Check
                        className="w-3.5 h-3.5 mt-0.5 shrink-0"
                        style={{ color: plan.highlight ? '#C9A84C' : '#7d7d95' }}
                      />
                      <span
                        className="text-sm leading-snug"
                        style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-inter)' }}
                      >
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.services.length > 6 && (
                  <p
                    className="mt-3 text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    +{plan.services.length - 6} more items included
                  </p>
                )}

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-7 w-full flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase cursor-pointer transition-all duration-300"
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(135deg, #C9A84C, #FFD700)'
                      : 'transparent',
                    color: plan.highlight ? '#070709' : '#C9A84C',
                    border: plan.highlight
                      ? 'none'
                      : '1px solid rgba(201,168,76,0.3)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Book {plan.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}

          {/* Custom package card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: plans.length * 0.08, duration: 0.55 }}
            className="flex flex-col items-center justify-center text-center p-8 md:p-10 min-h-[540px]"
            style={{
              border: '1px dashed rgba(201,168,76,0.24)',
              background: 'linear-gradient(180deg, rgba(14,14,20,0.7) 0%, rgba(10,10,14,0.78) 100%)',
            }}
          >
            <div
              className="text-6xl mb-3"
              style={{ color: 'rgba(201,168,76,0.32)', fontFamily: 'var(--font-bebas)' }}
            >
              ?
            </div>
            <h3
              className="text-2xl font-black mb-3"
              style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'var(--font-bebas)', letterSpacing: '0.08em' }}
            >
              CUSTOM
            </h3>
            <p
              className="text-sm leading-relaxed max-w-68 mb-6"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              Fleet vehicles, special projects, or multi-car packages. We can build a tailored quote for your needs.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-bold tracking-[0.14em] uppercase flex items-center gap-1 cursor-pointer"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)', background: 'none', border: 'none' }}
            >
              Get Quote <ArrowRight className="w-3 h-3" />
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
