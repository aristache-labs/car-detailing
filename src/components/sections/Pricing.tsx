'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

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
      className="relative pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden"
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
          <div className="h-px w-20 mx-auto md:mx-0 mt-3 mb-2" style={{ background: 'rgba(201,168,76,0.45)' }} />
          <p className="text-sm max-w-md mx-auto md:mx-0" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            Select the package that matches your vehicle goals.
          </p>
        </div>

        {/* Main package cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 items-start">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
              className={`relative flex flex-col overflow-hidden ${plan.highlight ? 'pricing-highlight-card' : ''}`}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(160deg, rgba(26,24,14,0.98) 0%, rgba(16,14,8,0.99) 100%)'
                  : 'linear-gradient(160deg, rgba(18,18,28,0.96) 0%, rgba(12,12,18,0.97) 100%)',
                ...(!plan.highlight && {
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
                }),
              }}
            >
              {/* Top accent bar */}
              <div className="absolute left-0 top-0 right-0 h-[2px] overflow-hidden">
                {plan.highlight
                  ? <div className="pricing-top-sweep" />
                  : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                }
              </div>

              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute top-2.5 right-2.5 px-2 py-[2px] text-[8px] font-bold tracking-[0.16em] uppercase"
                  style={{
                    color: plan.highlight ? '#d8bb6c' : 'var(--text-micro)',
                    border: `1px solid ${plan.highlight ? 'rgba(201,168,76,0.32)' : 'rgba(255,255,255,0.11)'}`,
                    background: plan.highlight ? 'rgba(201,168,76,0.09)' : 'rgba(255,255,255,0.03)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="flex flex-col flex-1 p-4.5 sm:p-5">
                {/* Plan name */}
                <h3
                  className="font-black leading-[0.9] mb-1"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(1.7rem, 2.9vw, 2.05rem)',
                    letterSpacing: '0.045em',
                    color: plan.highlight ? '#C9A84C' : 'white',
                  }}
                >
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-[0.68rem] leading-snug mb-3.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  {plan.tagline}
                </p>

                {/* Price block */}
                <div
                  className="flex items-end gap-1.5 pb-2.5 mb-3.5"
                  style={{
                    borderBottom: plan.highlight
                      ? '1px solid rgba(201,168,76,0.2)'
                      : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span
                    className="font-black tabular-nums leading-none"
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      fontSize: 'clamp(1.95rem, 3.5vw, 2.35rem)',
                      ...(plan.highlight
                        ? {
                            background: 'linear-gradient(135deg, #FFD700 0%, #D4A84C 55%, #b8924a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : { color: 'white' }),
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-[9px] font-semibold tracking-[0.12em] uppercase pb-[2px]"
                    style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)' }}
                  >
                    {plan.currency}
                  </span>
                </div>

                {/* Included label */}
                <p
                  className="text-[8px] font-bold tracking-[0.2em] uppercase mb-2"
                  style={{ color: plan.highlight ? '#C9A84C' : 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}
                >
                  Included
                </p>

                {/* Service list */}
                <ul className="space-y-[5px] flex-1">
                  {plan.services.slice(0, 5).map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <Check
                        className="w-[11px] h-[11px] mt-[2px] shrink-0"
                        strokeWidth={2.5}
                        style={{ color: plan.highlight ? '#C9A84C' : 'var(--text-muted)' }}
                      />
                      <span
                        className="leading-snug"
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.services.length > 5 && (
                  <p
                    className="mt-2 text-[10px]"
                    style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)' }}
                  >
                    +{plan.services.length - 5} more included
                  </p>
                )}

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[10px] font-bold tracking-[0.14em] uppercase cursor-pointer group transition-all duration-300"
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(135deg, #C9A84C, #FFD700)'
                      : 'transparent',
                    color: plan.highlight ? '#070709' : '#C9A84C',
                    border: plan.highlight ? 'none' : '1px solid rgba(201,168,76,0.28)',
                    fontFamily: 'var(--font-inter)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.highlight) {
                      el.style.boxShadow = '0 4px 18px rgba(201,168,76,0.32)';
                    } else {
                      el.style.borderColor = 'rgba(201,168,76,0.55)';
                      el.style.background = 'rgba(201,168,76,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.highlight) {
                      el.style.boxShadow = 'none';
                    } else {
                      el.style.borderColor = 'rgba(201,168,76,0.28)';
                      el.style.background = 'transparent';
                    }
                  }}
                >
                  Book {plan.name}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Fleet & bespoke strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 lg:mt-5 p-4 sm:p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{
            background: 'linear-gradient(145deg, rgba(16,16,24,0.86) 0%, rgba(11,11,16,0.92) 100%)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 12px 34px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 shrink-0 flex items-center justify-center"
              style={{
                background: 'rgba(201,168,76,0.09)',
                border: '1px solid rgba(201,168,76,0.25)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: '#C9A84C' }} />
            </div>
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
                style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}
              >
                Fleet & Bespoke
              </p>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
              >
                Tailored quotes for fleet vehicles, special projects, and multi-car packages with custom treatment scope and scheduling.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto md:min-w-52 px-5 py-2.5 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase cursor-pointer group transition-all duration-300"
            style={{
              border: '1px solid rgba(201,168,76,0.34)',
              background: 'rgba(201,168,76,0.04)',
              color: '#C9A84C',
              fontFamily: 'var(--font-inter)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(201,168,76,0.58)';
              el.style.background = 'rgba(201,168,76,0.1)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(201,168,76,0.34)';
              el.style.background = 'rgba(201,168,76,0.04)';
            }}
          >
            Request Bespoke Quote
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
