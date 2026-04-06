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
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 0;
            border: 1px solid rgba(201, 168, 76, 0.36);
            box-shadow: none;
            font-family: var(--font-inter), system-ui, sans-serif;
          }
          .popular-ribbon {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 90px;
            height: 90px;
            overflow: hidden;
            z-index: 10;
            pointer-events: none;
            border-top-right-radius: inherit;
          }
          .popular-ribbon::before {
            content: 'MOST REQUESTED';
            position: absolute;
            top: 18px;
            right: -22px;
            width: 100px;
            padding: 5px 0;
            background: #c9a227;
            color: #0a0a0a;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-align: center;
            transform: rotate(45deg);
            transform-origin: center;
            font-family: var(--font-inter), system-ui, sans-serif;
            box-shadow: none;
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
                  className="mt-0 text-[1.78rem] font-black uppercase leading-[0.9] tracking-[0.035em] text-white"
                  style={{ fontFamily: 'var(--font-bebas)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-1.5 min-h-[2.6rem] text-[11px] leading-relaxed text-[#d5dce7]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.subtitle}
                </p>

                <div className="mt-4 rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.02)] px-4 py-3.5">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/42"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {card.priceLabel}
                  </p>
                  <div className="mt-1.5 flex items-end gap-1.5">
                    <span
                      className="text-[1.7rem] font-black leading-none tabular-nums"
                      style={{
                        fontFamily: 'var(--font-orbitron)',
                        color: card.featured ? '#e7ce88' : '#eef3fa',
                      }}
                    >
                      {card.startingPrice}
                    </span>
                    <span
                      className="pb-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#c9a84c]"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      RON
                    </span>
                  </div>
                  <p
                    className="mt-2 text-[11px] leading-relaxed text-[#aab5c4]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Final quote confirmed after inspection.
                  </p>
                </div>

                <p
                  className="mt-4 text-[13px] leading-relaxed text-[#b8c2d0]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.summary}
                </p>

                <div className="mt-4">
                  <p
                    className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d2b872]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Typical Scope
                  </p>
                  <ul className="space-y-2">
                    {card.includedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#c9a84c]"
                          strokeWidth={2.4}
                        />
                        <span
                          className="text-[12px] leading-relaxed text-[#e0e6ef]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4">
                  <div
                    aria-hidden
                    className="mb-3.5 h-px w-full"
                    style={{
                      background: card.featured
                        ? 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)'
                        : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)',
                    }}
                  />
                  <Link
                    href="/contact"
                    className={`group inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-[transform,box-shadow,border-color,background,color] duration-200 ease-out ${
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
