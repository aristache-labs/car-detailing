'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { galleryPanels, type GalleryPanel } from '@/data/gallery-cases';
import { RESULT_FILTERS, filterPanels, type ResultFilterId } from '@/data/gallery-filters';

function SplitCompare({ panel, className }: { panel: GalleryPanel; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-[#C9A84C]/25 ${className ?? ''}`}>
      <div className="relative aspect-16/10 w-full md:aspect-21/9">
        <div className="absolute inset-0 flex">
          <div className="relative w-1/2">
            <Image src={panel.beforeImage} alt={`${panel.service} before`} fill className="object-cover" sizes="(max-width:768px) 50vw, 40vw" />
          </div>
          <div className="relative w-1/2">
            <Image src={panel.afterImage} alt={`${panel.service} after`} fill className="object-cover" sizes="(max-width:768px) 50vw, 40vw" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-px -translate-x-px"
          style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }}
          aria-hidden
        />
        <div className="absolute left-3 top-3 z-10 rounded-sm bg-black/65 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/80">
          Before
        </div>
        <div className="absolute right-3 top-3 z-10 rounded-sm bg-black/65 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#C9A84C]">
          After
        </div>
      </div>
    </div>
  );
}

export default function ResultsGallery() {
  const [filter, setFilter] = useState<ResultFilterId>('all');
  const filtered = useMemo(() => filterPanels(galleryPanels, filter), [filter]);
  const featured = filtered[0] ?? galleryPanels[0];
  const gridItems = useMemo(() => {
    const tail = filtered.slice(1);
    if (tail.length > 0) return tail;
    return galleryPanels.filter((p) => p.id !== featured.id);
  }, [filtered, featured.id]);

  return (
    <div className="pb-16 pt-6 md:pb-20" style={{ background: 'var(--carbon-900)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="mb-6 flex flex-wrap gap-2">
          {RESULT_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
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

        {featured ? (
          <section className="mb-12">
            <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Featured
                </p>
                <h2 className="text-2xl font-black tracking-[0.04em] md:text-4xl" style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}>
                  {featured.service}
                </h2>
                <p className="mt-1 text-sm text-white/70" style={{ fontFamily: 'var(--font-inter)' }}>
                  {featured.vehicle} · {featured.proofService}
                </p>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
                {featured.outcome}
              </p>
            </div>
            <SplitCompare panel={featured} />
          </section>
        ) : null}

        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]" style={{ fontFamily: 'var(--font-orbitron)' }}>
          More outcomes
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((panel, i) => (
            <motion.article
              key={panel.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-lg border border-white/8 bg-carbon-950"
            >
              <div className="relative aspect-4/3">
                <Image src={panel.afterImage} alt={panel.service} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white/90" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  {panel.label}
                </span>
              </div>
              <div className="space-y-1 px-3 py-3">
                <p className="text-[11px] font-semibold text-white/90" style={{ fontFamily: 'var(--font-inter)' }}>
                  {panel.vehicle}
                </p>
                <p className="text-[10px] leading-snug text-white/55" style={{ fontFamily: 'var(--font-inter)' }}>
                  {panel.outcome}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-[#C9A84C]/80">{panel.service}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-center text-sm text-white/65 sm:text-left" style={{ fontFamily: 'var(--font-inter)' }}>
            Want this level of finish on your vehicle? Start with an inspection.
          </p>
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Book a quote
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
