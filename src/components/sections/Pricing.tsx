'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

const plans = [
  {
    id: 'essential',
    name: 'Essential Detail',
    tagline: 'Regular maintenance and a refreshed overall appearance',
    price: '180',
    currency: 'RON',
    duration: '',
    highlight: false,
    badge: null,
    services: [
      'Safe wash & decontamination',
      'Exterior gloss enhancement',
      'Wheel and trim cleaning',
      'Interior refresh included',
      'Ideal for regularly driven vehicles',
    ],
    excludes: [],
  },
  {
    id: 'premium',
    name: 'Protection Package',
    tagline: 'Long-term gloss, easier maintenance, and durable protection',
    price: '350',
    currency: 'RON',
    duration: '',
    highlight: true,
    badge: 'Most Popular',
    services: [
      'Paint preparation included',
      'Ceramic coating application',
      'Hydrophobic surface protection',
      'Easier washing and upkeep',
      'Warranty available',
    ],
    excludes: [],
  },
  {
    id: 'elite',
    name: 'Correction & Protection',
    tagline: 'Swirl removal, gloss depth, and a premium long-term finish',
    price: '750',
    currency: 'RON',
    duration: '',
    highlight: false,
    badge: null,
    services: [
      'Multi-stage paint correction',
      'Surface refinement and prep',
      'Ceramic protection applied',
      'Improved clarity and gloss depth',
      'Tailored aftercare guidance',
    ],
    excludes: [],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative pt-14 pb-16 md:pt-18 md:pb-20 overflow-hidden"
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
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <span
            className="inline-flex px-4 py-2 text-sm md:text-base font-black tracking-[0.2em] uppercase mb-3"
            style={{
              color: '#E2C06A',
              fontFamily: 'var(--font-orbitron)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
              border: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            Our Packages
          </span>
          <h2
            className="text-5xl font-black leading-none md:text-7xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
          >
            CHOOSE YOUR{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F0D892 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              LEVEL
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-2.5 md:gap-3">
            <div className="h-px w-10 md:w-14" style={{ background: 'rgba(201,168,76,0.55)' }} />
            <span className="text-premium-micro tracking-[0.2em] text-center md:text-left" style={{ fontFamily: 'var(--font-inter)' }}>
              Select the package direction that best matches your finish goals.
            </span>
          </div>
        </div>

        {/* Main package cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.24, ease: 'easeOut' } }}
              className={`relative flex min-h-112 sm:min-h-120 lg:min-h-128 flex-col rounded-xl ${plan.highlight ? 'pricing-highlight-card' : ''}`}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(160deg, rgba(27,24,15,0.98) 0%, rgba(15,13,9,0.99) 100%)'
                  : 'linear-gradient(160deg, rgba(20,20,30,0.97) 0%, rgba(12,12,18,0.98) 100%)',
                ...(!plan.highlight && {
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.03)',
                }),
                ...(plan.highlight && {
                  border: '1px solid rgba(201,168,76,0.34)',
                  boxShadow: '0 14px 32px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.05)',
                }),
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: plan.highlight
                    ? 'radial-gradient(ellipse at top right, rgba(201,168,76,0.08), transparent 55%)'
                    : 'radial-gradient(ellipse at top right, rgba(255,255,255,0.03), transparent 60%)',
                }}
              />
              {/* Top accent bar */}
              <div className="absolute left-0 top-0 right-0 h-[2px] overflow-hidden rounded-t-xl">
                {plan.highlight
                  ? <div className="pricing-top-sweep" />
                  : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
                }
              </div>

              {/* Left-edge folded ribbon badge */}
{plan.badge && (
  <div
    className="absolute z-20 pointer-events-none"
    style={{
      left: '-8px',
      top: '5%',
      filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.08))',
    }}
  >
    {/* Main ribbon tab */}
    <div
      className="flex items-center"
      style={{ position: 'relative' }}
    >
      <span
        className="relative pl-4 pr-5 py-[7px] sm:py-[8px] text-[9px] sm:text-[10px] font-black uppercase"
        style={{
          color: '#3E2A08',
          background: 'linear-gradient(135deg, #F5DE98 0%, #D9B45A 50%, #B9852E 100%)',
          boxShadow: `
            0 6px 18px rgba(0,0,0,0.42),
            inset 0 1px 0 rgba(255,255,255,0.28),
            inset 0 -1px 0 rgba(90,58,14,0.20)
          `,
          textShadow: '0 1px 0 rgba(255,255,255,0.14)',
          fontFamily: 'var(--font-orbitron)',
          letterSpacing: '0.14em',
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
          display: 'block',
        }}
      >
        {plan.badge}
      </span>
    </div>
    {/* Folded corner shadow */}
    <div
      style={{
        width: 0,
        height: 0,
        borderTop: '8px solid #6B4814',
        borderLeft: '8px solid transparent',
      }}
    />
  </div>
)}

              <div className="relative z-10 flex flex-col flex-1 px-6 pb-6 pt-14 sm:px-7 sm:pb-7 sm:pt-16 md:px-8 md:pb-8 md:pt-20">
                {/* Plan name */}
                <h3
                  className="font-black leading-[0.95] mb-2 text-center"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(1.58rem, 2.55vw, 1.95rem)',
                    letterSpacing: '0.04em',
                    color: plan.highlight ? '#E2C06A' : 'rgba(238,243,250,0.95)',
                    textShadow: plan.highlight ? '0 0 12px rgba(201,168,76,0.16)' : '0 0 10px rgba(255,255,255,0.05)',
                  }}
                >
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-[0.73rem] leading-relaxed mb-5 text-center"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Best for: {plan.tagline}
                </p>

                {/* Price block */}
                <div
                  className="flex items-end justify-center gap-2 pb-4 mb-5"
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
                            background: 'linear-gradient(135deg, #F6E0A0 0%, #D4A84C 55%, #b8924a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : { color: 'rgba(238,243,250,0.95)' }),
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[12px] font-black tracking-[0.12em] uppercase pb-[5px]" style={{ color: '#E6C978', fontFamily: 'var(--font-orbitron)' }}>
                    {plan.currency}
                  </span>
                </div>

                {/* Included label */}
                <p
                  className="inline-flex items-center self-center px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase mb-3"
                  style={{
                    color: plan.highlight ? '#E2C06A' : 'rgba(207,177,93,0.9)',
                    fontFamily: 'var(--font-inter)',
                    border: '1px solid rgba(201,168,76,0.24)',
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.09), rgba(201,168,76,0.03))',
                  }}
                >
                  Package Includes
                </p>

                {/* Service list */}
                <ul className="space-y-3">
                  {plan.services.slice(0, 5).map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <Check
                        className="w-3.5 h-3.5 mt-[2px] shrink-0"
                        strokeWidth={2.5}
                        style={{ color: plan.highlight ? '#C9A84C' : 'var(--text-muted)' }}
                      />
                      <span
                        className="leading-snug"
                        style={{
                          fontSize: '0.78rem',
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

                {/* CTA — same premium system as hero CTAs */}
                <div className="mt-auto w-full pt-4">
                  <div
                    aria-hidden
                    className="mb-3.5 h-px w-full"
                    style={{
                      opacity: plan.highlight ? 0.85 : 0.55,
                      background: plan.highlight
                        ? 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 45%, rgba(240,216,146,0.35) 50%, rgba(201,168,76,0.5) 55%, transparent 100%)'
                        : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full ${plan.highlight ? 'hero-cta-primary' : 'hero-cta-secondary'} group`}
                  >
                    Request Quote
                    <ArrowRight
                      className="w-[15px] h-[15px] shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.25}
                    />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* PPF add-on card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-3 rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(20,20,30,0.97) 0%, rgba(12,12,18,0.98) 100%)',
            border: '1px solid rgba(201,168,76,0.22)',
            boxShadow: '0 10px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Subtle radial glow top-right — mirrors price cards */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.06), transparent 60%)' }}
          />
          {/* Top accent line */}
          <div
            className="absolute left-0 top-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-5 sm:p-6">
            {/* Left: icon + copy */}
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded"
                style={{
                  background: 'rgba(201,168,76,0.09)',
                  border: '1px solid rgba(201,168,76,0.28)',
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <p
                  className="inline-flex px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] mb-2"
                  style={{
                    color: '#E2C06A',
                    fontFamily: 'var(--font-orbitron)',
                    border: '1px solid rgba(201,168,76,0.26)',
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.09), rgba(201,168,76,0.03))',
                  }}
                >
                  Add-on — PPF Protection
                </p>
                <p
                  className="text-[13px] sm:text-sm leading-relaxed max-w-xl"
                  style={{ color: 'rgba(221,229,239,0.88)', fontFamily: 'var(--font-inter)' }}
                >
                  Front-end, partial, and full-body film packages are quoted after inspection.
                </p>
                <p
                  className="mt-1.5 text-[10px] tracking-[0.04em]"
                  style={{ color: 'rgba(188,197,211,0.6)', fontFamily: 'var(--font-inter)' }}
                >
                  All packages are tailored after vehicle inspection and condition assessment.
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta-secondary group w-full md:w-auto"
              >
                Request PPF Assessment
                <ArrowRight className="w-[15px] h-[15px] shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
