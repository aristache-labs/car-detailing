'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';
import {
  beforeAfterItems,
  featuredBeforeAfter,
  galleryCategoryBadge,
  galleryItems,
  videoItems,
  type GalleryFilterId,
  type MainTab,
  type VideoItem,
} from '@/data/results-page-data';

/** Mobile filter chips — labels uppercase; map to `GalleryFilterId`. */
const MOBILE_GALLERY_FILTERS: { label: string; id: GalleryFilterId }[] = [
  { label: 'ALL', id: 'all' },
  { label: 'CORRECTION', id: 'correction' },
  { label: 'CERAMIC', id: 'ceramic' },
  { label: 'PPF', id: 'ppf' },
  { label: 'INTERIOR', id: 'interior' },
  { label: 'ENGINE', id: 'engine' },
];

/** Nav ids — map to `MainTab` for existing content blocks. */
type ResultsNavTab = 'GALLERY' | 'BEFORE_AFTER' | 'VIDEO';

const TABS: { id: ResultsNavTab; label: string }[] = [
  { id: 'GALLERY', label: 'Gallery' },
  { id: 'BEFORE_AFTER', label: 'Before & After' },
  { id: 'VIDEO', label: 'Video' },
];

function navTabToMainTab(id: ResultsNavTab): MainTab {
  switch (id) {
    case 'GALLERY':
      return 'gallery';
    case 'BEFORE_AFTER':
      return 'beforeAfter';
    case 'VIDEO':
      return 'video';
  }
}

/** Split-gradient title tokens — same clamps as /services (via `InnerPageHeader` premium). */
const TITLE_SILVER: CSSProperties = {
  background:
    'linear-gradient(165deg, #f0f4f8 0%, #dce0e0 35%, #ffffff 48%, #c8d0d0 58%, #8a9aa8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const TITLE_GOLD: CSSProperties = {
  background:
    'linear-gradient(165deg, #ead8b8 0%, #d6b36a 28%, #cfa85a 52%, #b8924a 78%, #8a6a38 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/** Shared surface language — image-led, minimal boxiness. */
const mediaCardFrame =
  'overflow-hidden rounded-sm border border-white/[0.08] transition-[border-color] duration-300 hover:border-[#C9A84C]/22';

const metaGold = 'text-[9px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]/75';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(201,168,76,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';

function studioTimeShort(studioTime: string): string {
  const m = studioTime.match(/^(\d+)/);
  return m ? `${m[1]}h` : studioTime.replace(/\s*hours?$/i, 'h').trim();
}

function BeforeAfterDragSlider({
  before,
  after,
  featured = false,
}: {
  before: string;
  after: string;
  /** Larger ratio + premium chrome for the featured editorial block. */
  featured?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  useEffect(() => {
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full cursor-ew-resize select-none overflow-hidden rounded-sm border border-white/10 bg-black ${
        featured ? 'aspect-4/3 md:aspect-16/10' : 'aspect-video'
      }`}
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
      role="img"
      aria-label="Before and after comparison, slide to compare"
    >
      <Image
        src={before}
        alt=""
        fill
        className="object-cover"
        sizes={featured ? '(max-width:768px) 100vw, min(1100px, 72vw)' : '(max-width:768px) 100vw, 50vw'}
        priority
      />
      <div className="absolute inset-0 z-1" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image
          src={after}
          alt=""
          fill
          className="object-cover"
          sizes={featured ? '(max-width:768px) 100vw, min(1100px, 72vw)' : '(max-width:768px) 100vw, 50vw'}
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-3 h-14 bg-linear-to-b from-black/45 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-2 w-px bg-[#C9A84C]/88"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        aria-hidden
      />
      <div
        className="absolute top-3 z-4 flex w-full justify-between px-4 text-[8px] font-semibold uppercase tracking-[0.16em]"
        style={{ pointerEvents: 'none' }}
      >
        <span className="text-white/72">Before</span>
        <span className="text-[#C9A84C]/88">After</span>
      </div>
      <div
        className="pointer-events-none absolute top-1/2 z-4 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A84C]/55 bg-[#0a0a0a]/95 text-[#C9A84C]"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <ArrowLeftRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      </div>
      <p
        className={`pointer-events-none absolute left-0 right-0 z-3 text-center font-semibold uppercase tracking-[0.2em] text-white/32 ${
          featured ? 'bottom-3 text-[8px]' : 'bottom-2.5 text-[9px]'
        }`}
      >
        {featured ? 'Slide to compare' : 'Drag to compare'}
      </p>
    </div>
  );
}

export default function ResultsPageClient() {
  const [activeTab, setActiveTab] = useState<ResultsNavTab>('GALLERY');
  const [mobileGalleryFilter, setMobileGalleryFilter] = useState<GalleryFilterId>('all');
  const mainTab = navTabToMainTab(activeTab);

  const galleryItemsForDisplay = useMemo(() => {
    if (activeTab !== 'GALLERY') return galleryItems;
    if (mobileGalleryFilter === 'all') return galleryItems;
    return galleryItems.filter((g) => g.category === mobileGalleryFilter);
  }, [activeTab, mobileGalleryFilter]);

  const goToTab = (id: ResultsNavTab) => {
    setActiveTab(id);
    setMobileGalleryFilter('all');
  };

  return (
    <div className="results-page min-h-screen bg-[#0a0a0a]">
      {/* Page intro — same structure + classes as Services `InnerPageHeader` premium (client-safe duplicate). */}
      <section
        className="border-b border-white/[0.07] pt-20 pb-8 md:pt-24 md:pb-10"
        style={{ background: 'var(--carbon-950)' }}
      >
        <div className="mx-auto max-w-5xl px-4 md:max-w-7xl md:px-14">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <SectionBadge className="mb-3 md:mb-4">PROOF</SectionBadge>
            <h1
              className="flex flex-nowrap items-baseline gap-x-2 text-nowrap uppercase leading-[0.92] tracking-[0.04em] md:gap-x-3"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              <span
                className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
                style={TITLE_SILVER}
              >
                Our
              </span>
              <span
                className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
                style={TITLE_GOLD}
              >
                Results
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Mobile: mode tabs (centered) + gallery filter row */}
      <section className="border-b border-white/[0.07] bg-[#0a0a0a] md:hidden">
        <div className="mx-auto max-w-7xl px-4 pt-7 pb-2">
          <div className="-mx-4 mb-7 flex justify-center overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-0 shrink-0 items-end justify-center gap-7 sm:gap-8">
              {TABS.map(({ id, label }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goToTab(id)}
                    className={`relative shrink-0 pb-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${focusRing} ${
                      active ? 'text-white' : 'text-white/32 hover:text-white/55'
                    }`}
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                    {active ? (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C]/90" aria-hidden />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {activeTab === 'GALLERY' ? (
            <div className="relative mb-7">
              {/* Right-only fade: very subtle; no left fade so “ALL” stays fully legible */}
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-linear-to-l from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent opacity-50"
              />
              <div
                className="-mx-4 flex gap-2 overflow-x-auto scroll-py-1 pl-4 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
              >
                {MOBILE_GALLERY_FILTERS.map(({ label, id }) => {
                  const on = mobileGalleryFilter === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMobileGalleryFilter(id)}
                      className={`shrink-0 rounded-sm border px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${focusRing} ${
                        on
                          ? 'border-[#C9A84C]/35 bg-[#C9A84C]/6 text-[#C9A84C]'
                          : 'border-white/9 text-white/38 hover:border-white/18 hover:text-white/55'
                      }`}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Main: desktop side nav + content */}
      <section className="bg-[#0a0a0a] px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto flex max-w-7xl items-start gap-8 px-0 md:gap-12 md:px-0">
          {/* Desktop: premium vertical tab stack */}
          <nav
            aria-label="Results content"
            className="sticky top-32 hidden w-45 shrink-0 flex-col gap-0.5 rounded-sm border border-white/9 bg-[#0c0c0c] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:flex"
          >
            {TABS.map(({ id, label }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goToTab(id)}
                  className={`relative min-h-11 w-full rounded-[3px] border border-transparent px-3 py-2.5 text-left text-[10px] font-bold uppercase leading-snug tracking-[0.12em] transition-[color,background-color,border-color] duration-200 ${focusRing} ${
                    active
                      ? 'border-white/[0.07] bg-[#121212] text-white shadow-[inset_2px_0_0_0_#C9A84C]'
                      : 'text-white/38 hover:bg-white/2.5 hover:text-white/62'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          <div
            key={activeTab}
            className="min-w-0 flex-1"
            style={{ animation: 'fadeUp 0.2s ease-out' }}
          >
            {mainTab === 'gallery' && (
              <div>
                <div className="mb-7 hidden flex-wrap items-center gap-2.5 md:flex">
                  {MOBILE_GALLERY_FILTERS.map(({ label, id }) => {
                    const on = mobileGalleryFilter === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMobileGalleryFilter(id)}
                        className={`rounded-sm border px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${focusRing} ${
                          on
                            ? 'border-[#C9A84C]/40 bg-[#C9A84C]/6 text-[#C9A84C]'
                            : 'border-white/9 text-white/34 hover:border-white/18 hover:text-white/58'
                        }`}
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2.5 md:grid-cols-2 md:gap-7 lg:gap-8">
                  {galleryItemsForDisplay.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(index * 0.02, 0.12),
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                      className="group overflow-hidden rounded-sm border-0 bg-transparent md:border md:border-white/8 md:bg-white/2 md:transition-[border-color] md:duration-300 md:hover:border-[#C9A84C]/22"
                    >
                      <div className="relative aspect-3/2 overflow-hidden rounded-sm md:aspect-video md:rounded-none">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          priority={index === 0}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(max-width:768px) 50vw, 50vw"
                        />
                        <span className="absolute left-2 top-2 rounded-sm border border-[#C9A84C]/45 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-widest text-[#C9A84C] md:hidden">
                          {galleryCategoryBadge(item.category)}
                        </span>
                        <span className="absolute right-2 top-2 font-mono text-[9px] text-[#C9A84C]/70 tabular-nums md:hidden">
                          {item.number}
                        </span>
                      </div>
                      <div className="space-y-0 pt-2.5 pb-1 md:space-y-2 md:px-4 md:pb-5 md:pt-4">
                        <div className="hidden items-baseline justify-between gap-3 border-b border-white/6 pb-2 md:flex">
                          <span className={metaGold}>{galleryCategoryBadge(item.category)}</span>
                          <span className="font-mono text-[10px] text-white/20 tabular-nums">{item.number}</span>
                        </div>
                        <p className="mb-0.5 text-[8px] font-bold uppercase tracking-widest text-[#C9A84C] md:hidden">
                          {galleryCategoryBadge(item.category)}
                        </p>
                        <h3
                          className="mb-0.5 text-[11px] font-bold uppercase leading-tight tracking-wide text-white md:mb-0 md:font-semibold md:text-[15px] md:leading-normal md:text-text-primary"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {item.vehicle}
                        </h3>
                        <p className="mb-0 text-[8px] font-bold uppercase tracking-widest text-white/40 md:text-[9px] md:tracking-[0.12em] md:text-[#C9A84C]/75">
                          {item.service}
                        </p>
                        <p
                          className="hidden text-[13px] leading-relaxed text-text-secondary md:block"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {item.result}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}

            {mainTab === 'beforeAfter' && (
              <div className="space-y-10 md:space-y-12">
                {/* Featured showcase: light intro above hero → compare → caption signature below */}
                <div className="w-full min-w-0">
                  {/* Editorial project header (v2): meta line → title → treatment — no uppercase eyebrow */}
                  <header className="mb-8">
                    <div
                      className="mb-2.5 flex flex-wrap items-center gap-2 text-[13px] leading-normal"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      <span className="font-semibold text-[#d4af37]">
                        {featuredBeforeAfter.featuredEyebrow ?? 'Signature Transformation'}
                      </span>
                      <span className="text-white/30" aria-hidden>
                        ·
                      </span>
                      <span className="font-normal text-white/50">
                        {studioTimeShort(featuredBeforeAfter.studioTime)} studio time
                      </span>
                    </div>
                    <h2
                      className="mb-2 max-w-[600px] text-[22px] font-semibold leading-tight tracking-[-0.03em] text-white md:text-[32px]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {featuredBeforeAfter.editorialSubtitle ?? featuredBeforeAfter.service}
                    </h2>
                    <p
                      className="m-0 text-[15px] font-normal leading-relaxed text-white/45"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {featuredBeforeAfter.featuredTreatmentLine ??
                        featuredBeforeAfter.featuredMetaLine ??
                        `${featuredBeforeAfter.tags.join(' · ')} · ${studioTimeShort(featuredBeforeAfter.studioTime)} studio time`}
                    </p>
                  </header>
                  <div className="rounded-sm border border-white/10 bg-white/2 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:p-1.5">
                    <BeforeAfterDragSlider
                      featured
                      before={featuredBeforeAfter.before}
                      after={featuredBeforeAfter.after}
                    />
                  </div>
                  <div className="mt-4 md:mt-5">
                    <p
                      className="text-[clamp(1.35rem,2.8vw,1.65rem)] font-bold uppercase leading-tight tracking-[0.04em] text-white"
                      style={{ fontFamily: 'var(--font-bebas)' }}
                    >
                      {featuredBeforeAfter.vehicle}
                    </p>
                    {featuredBeforeAfter.featuredSupportingLine ? (
                      <p
                        className="mt-1.5 max-w-xl text-[12px] font-normal leading-relaxed text-white/42"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {featuredBeforeAfter.featuredSupportingLine}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="border-t border-white/[0.07] pt-10 md:pt-11">
                  <p
                    className="mb-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/38"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    More transformations
                  </p>
                  <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
                    {beforeAfterItems.slice(1).map((ba) => (
                      <article
                        key={ba.id}
                        className="overflow-hidden rounded-sm border border-white/8 bg-white/2 transition-[border-color] duration-300 hover:border-[#C9A84C]/22"
                      >
                        <div className="relative aspect-video w-full">
                          <div className="absolute inset-0 flex">
                            <div className="relative h-full w-1/2">
                              <Image src={ba.before} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
                            </div>
                            <div className="relative h-full w-1/2 border-l border-white/8">
                              <Image src={ba.after} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5 px-4 pb-5 pt-4">
                          <h3
                            className="text-[15px] font-semibold uppercase tracking-wide text-text-primary"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {ba.vehicle}
                          </h3>
                          <p
                            className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/52"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {ba.service}
                          </p>
                          <p
                            className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/34"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            Studio time · {studioTimeShort(ba.studioTime)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mainTab === 'video' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
                {videoItems.map((v) => (
                  <VideoCard key={v.id} item={v} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA — flat band, hands off to footer carbon + gold-divider */}
      <section className="border-t border-white/6 bg-carbon-950 pb-16 pt-10 md:pb-20 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-base font-semibold text-text-primary" style={{ fontFamily: 'var(--font-inter)' }}>
                Ready for the same finish?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-[15px]" style={{ fontFamily: 'var(--font-inter)' }}>
                Book an inspection or explore services — we&apos;ll match the right package to your goals.
              </p>
            </div>
            <div className="mt-4 flex w-full shrink-0 flex-col gap-2.5 sm:flex-row md:mt-0 md:w-auto md:justify-end">
              <Link
                href="/services"
                className={`inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-[#C9A84C]/45 px-5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C] transition-colors duration-200 hover:border-[#C9A84C] hover:bg-[#C9A84C]/6 sm:w-auto ${focusRing}`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                VIEW SERVICES
              </Link>
              <Link
                href="/contact"
                className={`inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#C9A84C] px-5 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors duration-200 hover:bg-[#b8963e] sm:w-auto ${focusRing}`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                BOOK A QUOTE →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <article className={mediaCardFrame}>
      <div className="group relative aspect-video bg-black">
        {!playing ? (
          <>
            <Image
              src={item.thumbnail}
              alt=""
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              sizes="50vw"
            />
            <button
              type="button"
              onClick={() => {
                setPlaying(true);
                requestAnimationFrame(() => void videoRef.current?.play());
              }}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${item.label}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-[#C9A84C] text-black shadow-sm transition-opacity duration-300 group-hover:opacity-95">
                <span className="ml-0.5 border-y-[6px] border-l-10 border-y-transparent border-l-black" aria-hidden />
              </span>
            </button>
          </>
        ) : (
          <video ref={videoRef} className="h-full w-full object-cover" controls playsInline poster={item.thumbnail}>
            <source src={item.src ?? '/videos/showcase.mp4'} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="space-y-2 px-4 pb-5 pt-3">
        <div className="flex items-center justify-between gap-2 border-b border-white/6 pb-2 text-[9px] font-bold uppercase tracking-[0.18em]">
          <span className="text-[#C9A84C]/75">Video</span>
          <span className="text-white/40">{item.duration}</span>
        </div>
        <h3
          className="text-[15px] font-semibold uppercase tracking-wide text-text-primary"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {item.vehicle}
        </h3>
        <p className={metaGold}>{item.service}</p>
      </div>
    </article>
  );
}
