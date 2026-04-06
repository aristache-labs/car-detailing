'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, X, ArrowRight } from 'lucide-react';
import {
  SERVICE_FILTER_LABELS,
  servicesCatalog,
  type ServiceCatalogItem,
  type ServiceCatalogFilter,
} from '@/data/services-catalog';

/**
 * Single card — vertical stack: full-width image + content (accordion expand below).
 * CSS columns masonry on desktop; see `.services-grid` / `.service-card` in globals.css.
 */
function ServiceCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: ServiceCatalogItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const expandStyle: CSSProperties = {
    maxHeight: isOpen ? 400 : 0,
    opacity: isOpen ? 1 : 0,
    overflow: 'hidden',
    transition: isOpen
      ? 'max-height 450ms cubic-bezier(0.4, 0, 0.2, 1), opacity 350ms ease'
      : 'max-height 450ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`service-card group relative max-w-full min-w-0 overflow-hidden rounded-lg border bg-[#0f0f0f] transition-all duration-300 ${
        isOpen
          ? 'border-[#C9A84C]/50 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,76,0.2)]'
          : 'border-[#1a1a1a] hover:-translate-y-0.5 hover:border-[#C9A84C]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
      }`}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <div className="flex min-h-0 flex-col">
        <div
          className={`relative w-full shrink-0 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'h-[200px] md:h-[240px]' : 'h-[140px] md:h-[180px]'
          }`}
        >
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className={`object-cover object-center transition-all duration-300 ${
              !isOpen ? 'group-hover:brightness-110' : ''
            }`}
            sizes="(max-width:768px) 100vw, min(50vw, 28rem)"
            priority={index === 0}
          />
          <span
            className="pointer-events-none absolute right-3 top-3 z-10 select-none rounded-sm bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-white/50"
            aria-hidden
          >
            {item.number}
          </span>
        </div>

        <div className="flex flex-col p-4">
          <h2
            className={`font-bold uppercase tracking-wide text-white ${
              isOpen ? 'text-base' : 'text-sm'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {item.title}
          </h2>
          <p
            className={`mt-1 uppercase tracking-[0.15em] text-[#C9A84C] ${
              isOpen ? 'text-[11px]' : 'text-[10px]'
            }`}
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {item.subtitle}
          </p>

          {!isOpen ? (
            <p
              className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75 transition-all duration-300"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {item.idealFor}
            </p>
          ) : null}

          <div
            className={!isOpen ? 'pointer-events-none' : undefined}
            style={expandStyle}
            aria-hidden={!isOpen}
          >
            <div className="pt-3">
              <p
                className="text-sm leading-relaxed text-white/75"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-sm border border-[#C9A84C]/25 bg-[#C9A84C]/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Premium action row — DETAILS / CLOSE share one family; REQUEST QUOTE primary, expanded only */}
          <div
            className={`flex w-full items-center gap-3 ${isOpen ? 'mt-5' : 'mt-4'} ${isOpen ? '' : 'justify-start'}`}
          >
            {/* iOS-safe: both buttons stay mounted; CSS opacity crossfade only (no exit/enter remount, no x-transform flicker) */}
            <div className="relative isolate h-[34px] w-max shrink-0">
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={false}
                aria-hidden={isOpen}
                tabIndex={isOpen ? -1 : 0}
                className={`group/btn absolute left-0 top-0 z-1 inline-flex touch-manipulation cursor-pointer items-center gap-1.5 rounded-sm border border-[#C9A84C]/28 bg-[rgba(0,0,0,0.45)] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d4c49a] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[opacity,transform] duration-200 ease-out select-none hover:border-[#C9A84C]/55 hover:bg-[#C9A84C]/10 hover:text-[#ebe4cf] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(201,168,76,0.12)] ${
                  isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
                style={{ fontFamily: 'var(--font-inter)', WebkitTapHighlightColor: 'transparent' }}
              >
                DETAILS
                <ChevronDown
                  size={11}
                  strokeWidth={2}
                  className="transition-transform duration-200 ease-out group-hover/btn:translate-y-px"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={true}
                aria-hidden={!isOpen}
                tabIndex={isOpen ? 0 : -1}
                className={`group/close absolute left-0 top-0 z-2 inline-flex touch-manipulation cursor-pointer items-center gap-1.5 rounded-sm border border-[#C9A84C]/22 bg-[rgba(0,0,0,0.45)] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c8c4bc] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[opacity,transform] duration-200 ease-out select-none hover:border-[#C9A84C]/45 hover:bg-[#C9A84C]/8 hover:text-[#f0ede6] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
                  isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                style={{ fontFamily: 'var(--font-inter)', WebkitTapHighlightColor: 'transparent' }}
              >
                CLOSE
                <X size={11} strokeWidth={2} className="opacity-90" aria-hidden />
              </button>
            </div>

            {isOpen ? (
              <>
                <div className="min-w-0 flex-1" aria-hidden />
                <div className="shrink-0 opacity-100 transition-opacity duration-200 ease-out">
                  <Link
                    href="/contact"
                    className="group/quote inline-flex touch-manipulation cursor-pointer items-center gap-2 rounded-sm border border-[#b8964a]/60 bg-linear-to-b from-[#e4d4a8] from-0% via-[#cfa85a] via-48% to-[#9a7430] to-100% px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_4px_14px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-200 ease-out select-none hover:-translate-y-px hover:border-[#a07d32] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_22px_rgba(0,0,0,0.4)] active:translate-y-0"
                    style={{ fontFamily: 'var(--font-inter)', WebkitTapHighlightColor: 'transparent' }}
                  >
                    REQUEST QUOTE
                    <ArrowRight
                      size={12}
                      strokeWidth={2.25}
                      className="opacity-95 transition-transform duration-200 ease-out group-hover/quote:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesCatalog() {
  const [filter, setFilter] = useState<ServiceCatalogFilter>('all');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return servicesCatalog;
    return servicesCatalog.filter((s) => s.filter === filter);
  }, [filter]);

  const handleToggle = (id: string) => {
    setActiveCard((prev) => {
      if (prev === id) return null;
      if (prev !== null) {
        setTimeout(() => setActiveCard(id), 180);
        return null;
      }
      return id;
    });
  };

  return (
    <div className="pb-14 pt-3 md:pb-20 md:pt-5" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="relative mb-7 md:mb-8">
          <div className="-mx-4 flex max-md:flex-nowrap max-md:gap-2.5 max-md:overflow-x-auto max-md:scroll-smooth max-md:px-4 max-md:pb-2 max-md:[scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-2.5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {SERVICE_FILTER_LABELS.map(({ id, label }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setFilter(id);
                    setActiveCard(null);
                  }}
                  className={`max-md:shrink-0 inline-flex min-h-10 items-center justify-center rounded-sm px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(207,168,90,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709] sm:min-h-[44px] sm:px-5 ${
                    active
                      ? 'border border-transparent bg-linear-to-b from-[#ddc48a] from-0% via-[#cfa85a] via-48% to-[#b8924a] to-100% text-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35)] hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.35)] active:translate-y-0'
                      : 'border border-[rgba(207,168,90,0.2)] bg-[rgba(0,0,0,0.35)] text-[#d6b36a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-px hover:border-[rgba(207,168,90,0.42)] hover:bg-[rgba(207,168,90,0.05)] hover:text-[#e0c088] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(207,168,90,0.08)] active:translate-y-0'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="services-grid columns-1 md:columns-2">
          {filtered.map((item, i) => {
            const isOpen = activeCard === item.id;
            return (
              <ServiceCard
                key={item.id}
                item={item}
                index={i}
                isOpen={isOpen}
                onToggle={() => handleToggle(item.id)}
              />
            );
          })}
        </div>

        <div className="mt-6 rounded-lg border border-[#1a1a1a] bg-[#0f0f0f] px-4 py-4 sm:mt-8 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                Not sure what fits your vehicle?
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#666] sm:mt-1 sm:text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                Book a free inspection and we&apos;ll recommend the right service.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center rounded-sm border border-[#C9A84C]/40 py-2.5 text-center text-[11px] font-semibold uppercase tracking-widest text-[#C9A84C] transition-colors duration-200 hover:border-[#C9A84C] sm:w-auto sm:px-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                View packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-sm bg-[#C9A84C] py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-black transition-colors duration-200 hover:bg-[#b8963e] sm:w-auto sm:px-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
