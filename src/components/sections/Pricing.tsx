'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { servicePricingItems } from '@/data/service-pricing';
import { useLanguage } from '@/components/providers/LanguageProvider';

const SUPPORT_BLOCKS = {
  en: [
    {
      id: 'ppf',
      title: 'PPF Coverage Planning',
      description:
        'Front-end, partial, and full-body film options are scoped around coverage goals, panel complexity, and finish type.',
      meta: 'Quoted after inspection',
    },
    {
      id: 'combo',
      title: 'Multi-Service Combinations',
      description:
        'Correction, coating, interior, and specialty work can be combined into one studio plan when the vehicle needs a fuller reset.',
      meta: 'Built around your priorities',
    },
    {
      id: 'bespoke',
      title: 'Bespoke Quote Support',
      description:
        'If the car has heavier defects, restoration needs, or multiple problem areas, we build a custom recommendation with final timing and pricing.',
      meta: 'Tailored after assessment',
    },
  ],
  ro: [
    {
      id: 'ppf',
      title: 'Planificare Acoperire PPF',
      description:
        'Opțiunile front-end, parțiale sau full-body se stabilesc după zona dorită, complexitatea panourilor și tipul de finisaj.',
      meta: 'Cotat după inspecție',
    },
    {
      id: 'combo',
      title: 'Pachete Multi-Serviciu',
      description:
        'Corecția, coating-ul, interiorul și serviciile speciale pot fi combinate într-un plan unic pentru un rezultat complet.',
      meta: 'Construit după priorități',
    },
    {
      id: 'bespoke',
      title: 'Ofertă Personalizată',
      description:
        'Dacă mașina are defecte accentuate, nevoi de restaurare sau mai multe zone critice, construim o recomandare cu durată și cost final.',
      meta: 'Adaptat după evaluare',
    },
  ],
} as const;

const PRICING_COPY = {
  en: {
    eyebrow: 'Service Pricing',
    headingA: 'Pricing',
    headingB: 'By Service',
    intro:
      'Eight service cards, matched to the same lineup on Services. Every figure is a starting point, and final quotes are confirmed after inspection.',
    includedLabel: 'Included Services',
    quoteNote: 'Final quote confirmed after inspection.',
    requestQuote: 'Request Quote',
    requestQuoteAria: 'Request quote for',
    viewAll: 'View all service pricing',
    supportBadge: 'Guidance',
  },
  ro: {
    eyebrow: 'Prețuri Servicii',
    headingA: 'Prețuri',
    headingB: 'Pe Serviciu',
    intro:
      'Opt servicii, în aceeași structură ca în pagina Services. Fiecare preț este orientativ, iar oferta finală se confirmă după inspecție.',
    includedLabel: 'Servicii Incluse',
    quoteNote: 'Oferta finală se confirmă după inspecție.',
    requestQuote: 'Solicită ofertă',
    requestQuoteAria: 'Solicită ofertă pentru',
    viewAll: 'Vezi toate prețurile',
    supportBadge: 'Ghidaj',
  },
} as const;

/** Matches Results gallery service badge (`ResultsPageClient` `serviceBadgeClass`). */
const SERVICE_BADGE_CLASS =
  'inline-flex max-w-[min(100%,10.5rem)] shrink-0 items-center rounded-[2px] border border-[rgba(201,168,76,0.24)] bg-[rgba(201,168,76,0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.09em] text-[#ddbb70] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:max-w-[min(100%,16rem)] md:px-3 md:py-1 md:text-[11px] md:tracking-[0.1em]';

export default function Pricing({
  variant = 'full',
  showHeader = true,
}: {
  variant?: 'full' | 'preview';
  showHeader?: boolean;
} = {}) {
  const { language } = useLanguage();
  const copy = PRICING_COPY[language];
  const supportBlocks = SUPPORT_BLOCKS[language];
  const isPreview = variant === 'preview';
  const cards = isPreview ? servicePricingItems.slice(0, 4) : servicePricingItems;
  const sectionHeadingId = isPreview ? 'pricing-preview-heading' : 'pricing-heading';

  return (
    <section
      id={isPreview ? 'pricing-preview' : 'pricing'}
      aria-labelledby={showHeader ? sectionHeadingId : undefined}
      aria-label={showHeader ? undefined : copy.headingA}
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
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 5px 11px;
            border-radius: 0;
            border: 1px solid rgba(201, 168, 76, 0.3);
            box-shadow: none;
            font-family: var(--font-inter), system-ui, sans-serif;
            line-height: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        `}</style>
        {showHeader ? (
          <div className="mb-8 text-center md:mb-10 md:text-left">
            <span
              className="section-badge mb-3 md:mb-4"
            >
              {copy.eyebrow}
            </span>
            <h2
              id={sectionHeadingId}
              className="flex flex-wrap items-baseline justify-center gap-x-2 uppercase leading-[0.92] tracking-[0.04em] md:justify-start md:gap-x-3"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              <span className="text-metal shrink-0 font-black text-[clamp(2.25rem,8vw,4.25rem)]">
                {copy.headingA}
              </span>
              <span className="text-gold-metal shrink-0 font-black text-[clamp(2.25rem,8vw,4.25rem)]">
                {copy.headingB}
              </span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:mx-0 md:mt-5 md:text-[15px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {copy.intro}
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
                  className="mx-auto mt-2 max-w-[20rem] text-center text-[12px] leading-snug text-text-muted"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.subtitle}
                </p>

                <div className="relative mx-auto mt-5 w-full max-w-48 min-h-20.5 rounded-2xl border border-white/8 bg-[rgba(255,255,255,0.02)] px-3 py-3 md:mx-0 md:max-w-none md:min-h-19 md:px-4 md:py-3.5">
                  <p
                    className="absolute left-3 top-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-white/55 md:left-4 md:top-3.5"
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
                    className="absolute bottom-2.5 right-3 text-[11px] font-semibold uppercase tracking-widest text-[#c9a84c] md:bottom-3.5 md:right-4"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    RON
                  </span>
                </div>

                <p
                  className="mt-4 text-center text-[13px] leading-[1.55] text-text-muted md:text-left"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.summary}
                </p>

                <div className="mt-5">
                  <p
                    className="mb-3 border-b border-[#c9a84c]/28 pb-2 pl-0 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-[#b8a574] md:border-b-0 md:border-l md:border-[#c9a84c]/28 md:pb-0 md:pl-3 md:text-left"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {copy.includedLabel}
                  </p>
                  <ul className="mx-auto w-fit max-w-full space-y-2.5 text-left md:mx-0 md:w-full">
                    {card.includedItems.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check
                          className="mt-[0.35em] h-3 w-3 shrink-0 text-gold-mid/85"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span
                          className="text-[12px] font-normal leading-normal tracking-[0.01em] text-text-secondary"
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
                    className="mb-3.5 text-center text-[11px] font-medium leading-relaxed text-text-soft"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {copy.quoteNote}
                  </p>
                  <Link
                    href="/contact"
                    aria-label={`${copy.requestQuoteAria} ${card.title} (${card.priceLabel} ${card.startingPrice} RON)`}
                    className={`group inline-flex min-h-10.5 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] transition-[transform,box-shadow,border-color,background,color] duration-200 ease-out ${
                      card.featured
                        ? 'border-[#b8964a]/52 bg-linear-to-b from-[#dfcca0] from-0% via-[#c89f52] via-50% to-[#a1793b] to-100% text-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_14px_rgba(0,0,0,0.32)] hover:-translate-y-px hover:border-[#a07d32] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_20px_rgba(0,0,0,0.36)]'
                        : 'border-[#C9A84C]/24 bg-[rgba(0,0,0,0.42)] text-[#ddc27a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-px hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/7 hover:text-[#f0ddab] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(201,168,76,0.08)]'
                    }`}
                    style={{ fontFamily: 'var(--font-inter)', WebkitTapHighlightColor: 'transparent' }}
                  >
                    {language === 'en' ? card.ctaLabel : copy.requestQuote}
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
              className="inline-flex items-center gap-2 rounded-sm border border-[#C9A84C]/32 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E7C979] transition-colors hover:bg-[#C9A84C]/8"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {copy.viewAll}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </Link>
          </div>
        ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-8 md:grid-cols-3">
              {supportBlocks.map((block) => (
                <div
                  key={block.id}
                  className="relative flex min-h-70 flex-col overflow-hidden rounded-sm border border-[rgba(201,168,76,0.11)] bg-[rgba(255,255,255,0.025)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="flex shrink-0 items-start justify-between gap-3">
                    <span
                      className={SERVICE_BADGE_CLASS}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {copy.supportBadge}
                    </span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-[#C9A84C]/14 bg-[rgba(201,168,76,0.05)]">
                      <Sparkles className="h-3.5 w-3.5 text-[#c9a84c]/90" strokeWidth={1.75} />
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-0.5 py-4 text-center">
                    <h3
                      className="max-w-full text-[0.875rem] font-black uppercase leading-[0.96] tracking-[0.04em] text-white/95 md:text-[clamp(1.125rem,2.6vw,1.5625rem)]"
                      style={{ fontFamily: 'var(--font-bebas)' }}
                    >
                      {block.title}
                    </h3>
                    <p
                      className="mt-3.5 max-w-88 text-[13px] leading-[1.55] text-text-secondary"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {block.description}
                    </p>
                  </div>
                  <p
                    className="shrink-0 self-start text-left text-[11px] font-medium uppercase tracking-[0.12em] text-[#b8a574]/95"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {block.meta}
                  </p>
                </div>
              ))}
            </div>
        )}
      </div>
    </section>
  );
}
