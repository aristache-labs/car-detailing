'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { servicePricingItems } from '@/data/service-pricing';

const SUPPORT_BLOCKS = [
  {
    title: 'PPF Coverage Planning',
    description:
      'Front-end, partial, and full-body film options are scoped around coverage goals, panel complexity, and finish type.',
    meta: 'Quoted after inspection',
  },
  {
    title: 'Multi-Service Combinations',
    description:
      'Correction, coating, interior, and specialty work can be combined into one studio plan when the vehicle needs a fuller reset.',
    meta: 'Built around your priorities',
  },
  {
    title: 'Bespoke Quote Support',
    description:
      'If the car has heavier defects, restoration needs, or multiple problem areas, we build a custom recommendation with final timing and pricing.',
    meta: 'Tailored after assessment',
  },
];

export default function Pricing({
  variant = 'full',
  showHeader = true,
}: {
  variant?: 'full' | 'preview';
  showHeader?: boolean;
} = {}) {
  const isPreview = variant === 'preview';
  const cards = isPreview ? servicePricingItems.slice(0, 4) : servicePricingItems;

  return (
    <section
      id={isPreview ? 'pricing-preview' : 'pricing'}
      className="relative overflow-hidden py-14 md:py-18"
      style={{ background: 'var(--carbon-950)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top center, rgba(201,168,76,0.08), transparent 45%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <style>{`
          .service-badge {
            position: absolute;
            top: 0;
            left: 20px;
            transform: translateY(-50%);
            z-index: 2;
            background: rgba(16, 16, 16, 0.96);
            color: #d9b45a;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 0;
            border: 1px solid rgba(201, 168, 76, 0.36);
            box-shadow: none;
            font-family: var(--font-inter), system-ui, sans-serif;
            line-height: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .popular-ribbon {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 136px;
            height: 136px;
            overflow: hidden;
            z-index: 10;
            pointer-events: none;
            border-top-right-radius: inherit;
          }
.popular-ribbon::before {
  content: 'TOP PICKS';
  position: absolute;
  top: 28px;
  right: -36px;
  width: 160px;
  min-height: 30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #f2dd96 0%, #d2aa2f 52%, #bc9522 100%);
  color: #130f08;
  font-size: 11px;
  font-weight: 900;
  font-variation-settings: 'wght' 900;
  letter-spacing: 0.08em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  transform: rotate(45deg);
  transform-origin: center;
  font-family: var(--font-inter), system-ui, sans-serif;
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  text-shadow: none;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
        `}</style>
        {showHeader ? (
          <div className="mb-8 text-center md:mb-10 md:text-left">
            <span
              className="mb-3 inline-flex px-4 py-2 text-sm font-black uppercase tracking-[0.2em] md:mb-4 md:text-base"
              style={{
                color: '#E2C06A',
                fontFamily: 'var(--font-orbitron)',
                background:
                  'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
                border: '1px solid rgba(201,168,76,0.35)',
              }}
            >
              Service Pricing
            </span>
            <h2
              className="flex flex-wrap items-baseline justify-center gap-x-2 uppercase leading-[0.92] tracking-[0.04em] md:justify-start md:gap-x-3"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              <span
                className="shrink-0 font-black text-[clamp(2.25rem,8vw,4.25rem)]"
                style={{
                  background:
                    'linear-gradient(165deg, #f0f4f8 0%, #dce0e0 35%, #ffffff 48%, #c8d0d0 58%, #8a9aa8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Pricing
              </span>
              <span
                className="shrink-0 font-black text-[clamp(2.25rem,8vw,4.25rem)]"
                style={{
                  background:
                    'linear-gradient(165deg, #ead8b8 0%, #d6b36a 28%, #cfa85a 52%, #b8924a 78%, #8a6a38 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                By Service
              </span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#aeb8c6] md:mx-0 md:mt-5 md:text-[15px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Eight service cards, matched to the same lineup on Services. Every figure is a starting point,
              and final quotes are confirmed after inspection.
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-x-4 gap-y-7 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: Math.min(index * 0.05, 0.18), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="group relative flex min-h-110 flex-col overflow-visible rounded-[1.35rem] border bg-[rgba(15,15,15,0.96)]"
              style={{
                borderColor: card.featured ? '#c9a227' : '#2a2a2a',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {card.featured ? <div className="popular-ribbon" aria-hidden /> : null}

              <div
                className="absolute inset-0 z-0 rounded-[inherit] pointer-events-none"
                style={{
                  background: card.featured
                    ? 'radial-gradient(ellipse at top right, rgba(201,168,76,0.06), transparent 58%)'
                    : 'radial-gradient(ellipse at top right, rgba(255,255,255,0.035), transparent 62%)',
                }}
              />

              <span className="service-badge">{card.badge}</span>

              <div className="relative z-10 flex h-full flex-col p-4 pt-6 sm:p-5 sm:pt-7">
                <h3
                  className="mt-0 text-center text-[clamp(1.125rem,2.8vw,1.3rem)] font-bold uppercase leading-[1.15] tracking-[0.14em] text-white/95"
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="mx-auto mt-2 max-w-[20rem] text-center text-[12px] leading-snug text-[#b9c5d4]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.subtitle}
                </p>

                <div className="relative mx-auto mt-5 w-full max-w-48 min-h-20.5 rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.02)] px-3 py-3 md:mx-0 md:max-w-none md:min-h-19 md:px-4 md:py-3.5">
                  <p
                    className="absolute left-3 top-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55 md:left-4 md:top-3.5"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {card.priceLabel}
                  </p>
                  <span
                    className="absolute left-1/2 top-[51%] max-w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 text-center text-[2.25rem] font-bold leading-none tabular-nums tracking-tight md:top-1/2 md:max-w-[calc(100%-2rem)] md:text-[clamp(1.5rem,4.5vw,1.75rem)]"
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      color: card.featured ? '#e7ce88' : '#eef3fa',
                    }}
                  >
                    {card.startingPrice}
                  </span>
                  <span
                    className="absolute bottom-2.5 right-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9a84c] md:bottom-3.5 md:right-4"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    RON
                  </span>
                </div>

                <p
                  className="mt-4 text-center text-[13px] leading-[1.55] text-[#aeb8c6] md:text-left"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.summary}
                </p>

                <div className="mt-5">
                  <p
                    className="mb-3 border-b border-[#c9a84c]/28 pb-2 pl-0 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8a574] md:border-b-0 md:border-l md:border-[#c9a84c]/28 md:pb-0 md:pl-3 md:text-left"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Included Services
                  </p>
                  <ul className="mx-auto w-fit max-w-full space-y-2.5 text-left md:mx-0 md:w-full">
                    {card.includedItems.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check
                          className="mt-[0.35em] h-3 w-3 shrink-0 text-[#c9a84c]/85"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span
                          className="text-[12px] font-normal leading-normal tracking-[0.01em] text-[#c4ccd8]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-3">
                  <div
                    aria-hidden
                    className="mb-3 h-px w-full"
                    style={{
                      background: card.featured
                        ? 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)'
                        : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    }}
                  />
                  <p
                    className="mb-3.5 text-center text-[11px] font-medium leading-relaxed text-[#94a3b8]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Final quote confirmed after inspection.
                  </p>
                  <Link
                    href="/contact"
                    className={`group inline-flex min-h-10.5 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-[transform,box-shadow,border-color,background,color] duration-200 ease-out ${
                      card.featured
                        ? 'border-[#b8964a]/60 bg-linear-to-b from-[#e4d4a8] from-0% via-[#cfa85a] via-48% to-[#9a7430] to-100% text-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_14px_rgba(0,0,0,0.35)] hover:-translate-y-px hover:border-[#a07d32] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_22px_rgba(0,0,0,0.4)]'
                        : 'border-[#C9A84C]/26 bg-[rgba(0,0,0,0.42)] text-[#ddc27a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-px hover:border-[#C9A84C]/48 hover:bg-[#C9A84C]/8 hover:text-[#f0ddab] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,168,76,0.1)]'
                    }`}
                    style={{ fontFamily: 'var(--font-inter)', WebkitTapHighlightColor: 'transparent' }}
                  >
                    Request Quote
                    <ArrowRight
                      className="h-[14px] w-[14px] shrink-0 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.25}
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {isPreview ? (
          <div className="mt-8 flex justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-sm border border-[#C9A84C]/40 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7C979] transition-colors hover:bg-[#C9A84C]/10"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View all service pricing
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-8 md:grid-cols-3">
              {SUPPORT_BLOCKS.map((block) => (
                <div
                  key={block.title}
                  className="relative overflow-hidden rounded-sm border border-[rgba(201,168,76,0.16)] bg-[rgba(255,255,255,0.02)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-sm border border-[#C9A84C]/22 bg-[#C9A84C]/8">
                    <Sparkles className="h-4 w-4 text-[#C9A84C]" />
                  </div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d2b872]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Support
                  </p>
                  <h3
                    className="mt-3 max-w-56 text-[1.6rem] font-black uppercase leading-[0.94] tracking-[0.04em] text-white"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    {block.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-[#d5dce7]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {block.description}
                  </p>
                  <p
                    className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {block.meta}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-sm border border-[rgba(201,168,76,0.18)] bg-[rgba(12,12,14,0.95)] px-5 py-6 shadow-[0_16px_44px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.03)] md:px-7 md:py-7">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl text-center md:text-left">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d2b872]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Next Step
                  </p>
                  <h3
                    className="mt-2 text-[2rem] font-black uppercase leading-[0.92] tracking-[0.04em] text-white"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    Need help choosing the right service?
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-[#c8d1de] md:text-[15px]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    If you are deciding between correction, coating, interior work, or a combined detail,
                    we will recommend the right service path after a quick inspection.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2.5 sm:flex-row md:w-auto">
                  <Link href="/services" className="hero-cta-secondary w-full md:w-auto">
                    View Services
                  </Link>
                  <Link href="/contact" className="hero-cta-primary w-full md:w-auto">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
