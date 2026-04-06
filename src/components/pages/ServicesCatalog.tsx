'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  SERVICE_FILTER_LABELS,
  servicesCatalog,
  type ServiceCatalogFilter,
} from '@/data/services-catalog';

function firstOpenIdForFilter(f: ServiceCatalogFilter): string | null {
  const list = f === 'all' ? servicesCatalog : servicesCatalog.filter((s) => s.filter === f);
  return list[0]?.id ?? null;
}

export default function ServicesCatalog() {
  const [filter, setFilter] = useState<ServiceCatalogFilter>('all');
  const [openId, setOpenId] = useState<string | null>(firstOpenIdForFilter('all'));

  const filtered = useMemo(() => {
    if (filter === 'all') return servicesCatalog;
    return servicesCatalog.filter((s) => s.filter === filter);
  }, [filter]);

  return (
    <div className="pb-16 pt-6 md:pb-20" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {SERVICE_FILTER_LABELS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setFilter(id);
                setOpenId(firstOpenIdForFilter(id));
              }}
              className="rounded-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors md:text-[11px]"
              style={{
                fontFamily: 'var(--font-inter)',
                color: filter === id ? '#0a0a0c' : 'rgba(212,212,212,0.85)',
                background: filter === id ? 'linear-gradient(135deg, #C9A84C, #e8c768)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === id ? 'rgba(255,215,0,0.35)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {filtered.map((item, i) => {
            const expanded = openId === item.id;
            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="overflow-hidden rounded-lg border border-white/8 bg-[linear-gradient(165deg,rgba(18,18,24,0.96)_0%,rgba(10,10,14,0.98)_100%)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                  className="flex w-full text-left"
                >
                  <div className="relative h-36 w-32 shrink-0 sm:h-40 sm:w-40">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, rgba(7,7,9,0.1) 0%, rgba(7,7,9,0.45) 100%)',
                      }}
                    />
                    <span
                      className="absolute bottom-2 left-2 text-[10px] font-black text-white/50"
                      style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.08em' }}
                    >
                      {item.number}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                    <h2
                      className="text-xl font-black leading-none tracking-[0.04em] sm:text-2xl"
                      style={{ fontFamily: 'var(--font-bebas)', color: 'var(--text-primary)' }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
                    >
                      {item.subtitle}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/70" style={{ fontFamily: 'var(--font-inter)' }}>
                      {item.idealFor}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                      {expanded ? 'Less' : 'Details'}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-white/6"
                    >
                      <div className="space-y-3 px-4 pb-4 pt-3 sm:px-5">
                        <p className="text-sm leading-relaxed text-white/75" style={{ fontFamily: 'var(--font-inter)' }}>
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#C9A84C]"
                              style={{
                                fontFamily: 'var(--font-inter)',
                                border: '1px solid rgba(201,168,76,0.2)',
                                background: 'rgba(201,168,76,0.06)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#E7C979]"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          Request quote for this service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-center text-sm text-white/65 sm:text-left" style={{ fontFamily: 'var(--font-inter)' }}>
            Not sure what you need? Book a free inspection — we&apos;ll recommend the right package.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]/90 hover:text-[#e8d49a]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View packages →
            </Link>
            <Link
              href="/contact"
              className="btn-shimmer px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                color: '#070709',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
