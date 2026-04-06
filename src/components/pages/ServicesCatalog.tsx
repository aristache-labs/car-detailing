'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import {
  SERVICE_FILTER_LABELS,
  servicesCatalog,
  type ServiceCatalogItem,
  type ServiceCatalogFilter,
} from '@/data/services-catalog';

function firstOpenIdForFilter(f: ServiceCatalogFilter): string | null {
  const list = f === 'all' ? servicesCatalog : servicesCatalog.filter((s) => s.filter === f);
  return list[0]?.id ?? null;
}

/**
 * Single card component — identical markup for all services / filters.
 * Collapsed: horizontal row, Details only.
 * Expanded: vertical stack, full-width image, X close, tags + full-width CTA.
 */
function ServiceCard({
  item,
  index,
  isOpen,
  onOpen,
  onClose,
}: {
  item: ServiceCatalogItem;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`relative flex w-full min-w-0 overflow-hidden rounded-lg border bg-[#0f0f0f] transition-[flex-direction] duration-300 ease-in-out ${
        isOpen ? 'flex-col border-[#C9A84C]/40 shadow-[0_0_0_1px_rgba(201,168,76,0.12)]' : 'flex-row border-[#1a1a1a] hover:border-[#C9A84C]/25'
      }`}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {!isOpen ? (
        <>
          <div className="relative h-full min-h-[110px] w-[140px] shrink-0 self-stretch sm:w-[160px] md:w-[180px]">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 160px, 180px"
              priority={index === 0}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between p-3 md:p-4">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2
                  className="text-xs font-bold uppercase leading-tight tracking-wide text-white md:text-sm"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {item.title}
                </h2>
                <span
                  className="shrink-0 text-[10px] font-black text-white/35 md:text-[11px]"
                  style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}
                >
                  {item.number}
                </span>
              </div>
              <p
                className="mt-1 text-[9px] uppercase leading-snug tracking-widest text-[#C9A84C] md:text-[10px]"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                {item.subtitle}
              </p>
              <p
                className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#888]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {item.idealFor}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpen}
              className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-sm border border-[#C9A84C]/35 bg-[#C9A84C]/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C] transition-colors hover:border-[#C9A84C]/60 hover:text-white"
              style={{ fontFamily: 'var(--font-inter)' }}
              aria-expanded={false}
            >
              Details
              <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 cursor-pointer rounded-sm p-1 text-[#444] transition-colors hover:text-white"
            aria-label="Close details"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="relative w-full shrink-0">
            <div className="relative h-[200px] w-full md:h-[220px]">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
                priority={index === 0}
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
                style={{
                  background: 'linear-gradient(to top, #0d0d0d, transparent)',
                }}
              />
            </div>
          </div>

          <motion.div
            className="w-full p-4 md:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pr-8">
              <h2
                className="text-sm font-bold uppercase leading-tight tracking-wide text-white md:text-base"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {item.title}
              </h2>
            </div>
            <p
              className="mt-1 text-[10px] uppercase leading-snug tracking-widest text-[#C9A84C] md:text-[11px]"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {item.subtitle}
            </p>
            <p
              className="mt-3 text-sm leading-relaxed text-[#a0a0a0]"
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
            <Link
              href="/contact"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-[#C9A84C] py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] transition-all duration-200 hover:bg-[#C9A84C] hover:text-black"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Request quote for this service
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </motion.div>
        </>
      )}
    </motion.article>
  );
}

export default function ServicesCatalog() {
  const [filter, setFilter] = useState<ServiceCatalogFilter>('all');
  const [openId, setOpenId] = useState<string | null>(firstOpenIdForFilter('all'));

  const filtered = useMemo(() => {
    if (filter === 'all') return servicesCatalog;
    return servicesCatalog.filter((s) => s.filter === filter);
  }, [filter]);

  return (
    <div className="pb-14 pt-3 md:pb-20 md:pt-5" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="relative mb-7 md:mb-8">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-[#070709] to-transparent md:hidden"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-[#070709] to-transparent md:hidden"
            aria-hidden
          />
          <div className="-mx-4 flex max-md:flex-nowrap max-md:gap-2 max-md:overflow-x-auto max-md:scroll-smooth max-md:px-4 max-md:pb-1.5 max-md:[scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-2 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {SERVICE_FILTER_LABELS.map(({ id, label }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setFilter(id);
                    setOpenId(firstOpenIdForFilter(id));
                  }}
                  className={`max-md:shrink-0 rounded-sm border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-widest transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C]/50 sm:px-4 sm:text-[11px] ${
                    active
                      ? 'border-[#C9A84C] bg-[#C9A84C] font-bold text-black shadow-[0_0_0_1px_rgba(201,168,76,0.25)]'
                      : 'border-[#1e1e1e] bg-[#0f0f0f] text-[#666] hover:border-[#C9A84C]/40 hover:text-[#C9A84C]'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="services-grid grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          {filtered.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <ServiceCard
                key={item.id}
                item={item}
                index={i}
                isOpen={isOpen}
                onOpen={() => setOpenId(item.id)}
                onClose={() => setOpenId(null)}
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
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-sm border border-[#C9A84C]/40 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-widest text-[#C9A84C] transition-colors duration-200 hover:border-[#C9A84C] sm:px-4 sm:text-[11px]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                View packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-[#C9A84C] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-black transition-colors duration-200 hover:bg-[#b8963e] sm:px-4 sm:text-[11px]"
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
