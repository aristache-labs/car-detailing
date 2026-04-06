'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import ImageLightbox, { type LightboxSlide } from '@/components/ui/ImageLightbox';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import {
  beforeAfterItems,
  featuredBeforeAfter,
  galleryCategoryBadge,
  galleryCategoryBadgeMobile,
  galleryItems,
  serviceBadgeLabelMobile,
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

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(201,168,76,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';

/** Same tokens as `ServicesCatalog` filter row — gradient fill when active, gold outline when idle. */
const SERVICE_FILTER_BTN_ACTIVE =
  'border border-transparent bg-linear-to-b from-[#ddc48a] from-0% via-[#cfa85a] via-48% to-[#b8924a] to-100% text-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35)] hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.35)] active:translate-y-0';

const SERVICE_FILTER_BTN_INACTIVE =
  'border border-[rgba(207,168,90,0.2)] bg-[rgba(0,0,0,0.35)] text-[#d6b36a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-px hover:border-[rgba(207,168,90,0.42)] hover:bg-[rgba(207,168,90,0.05)] hover:text-[#e0c088] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(207,168,90,0.08)] active:translate-y-0';

/** Service badge — smaller on narrow columns; full size from `md:` up (desktop unchanged). */
const serviceBadgeClass =
  'inline-flex max-w-[min(100%,9.5rem)] shrink-0 items-center rounded-[2px] border border-[rgba(201,168,76,0.28)] bg-[rgba(201,168,76,0.1)] px-2 py-0.5 text-[8px] font-bold uppercase leading-tight tracking-[0.12em] text-[#ddbb70] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:max-w-[min(100%,16rem)] md:px-3 md:py-1 md:text-[10px] md:tracking-[0.15em]';

/** Caption meta — compact on mobile grid; relaxed from `md:` up. */
const cardCaptionMetaClass =
  'text-[10px] font-medium leading-snug tracking-[0.01em] text-[#cfc9bf] md:text-[11px] md:leading-[1.5]';

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
      className={`relative w-full cursor-ew-resize select-none overflow-hidden rounded-sm bg-black ${
        featured ? 'aspect-4/3 border-0 md:aspect-16/10' : 'aspect-video border border-white/10'
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
      <span
        className="pointer-events-none absolute left-3 top-3 z-5 rounded-[2px] border border-white/22 bg-[rgba(8,8,10,0.9)] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/92 shadow-[0_1px_10px_rgba(0,0,0,0.45)]"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 z-5 rounded-[2px] border border-[#C9A84C]/38 bg-[rgba(8,8,10,0.9)] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#e8d8b8] shadow-[0_1px_10px_rgba(0,0,0,0.45)]"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        After
      </span>
      <div
        className="pointer-events-none absolute top-1/2 z-4 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A84C]/55 bg-[#0a0a0a]/95 text-[#C9A84C]"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <ArrowLeftRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      </div>
      <p
        className={`pointer-events-none absolute left-0 right-0 z-3 text-center text-white/30 ${
          featured ? 'bottom-3 text-[8px] font-medium tracking-[0.08em]' : 'bottom-2.5 text-[9px] font-semibold uppercase tracking-[0.2em]'
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState<LightboxSlide[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const moreTransformItems = useMemo(() => beforeAfterItems.slice(1), []);
  const featuredCaseBadge = (featuredBeforeAfter.featuredEyebrow ?? 'Featured case').toUpperCase();
  const featuredMetaAll = (
    `${studioTimeShort(featuredBeforeAfter.studioTime)} studio time · ${
      featuredBeforeAfter.featuredTreatmentLine ??
      featuredBeforeAfter.featuredMetaLine ??
      featuredBeforeAfter.tags.join(' · ')
    }`
  )
    .split('·')
    .map((token) => token.trim())
    .filter(Boolean);
  /** Mobile: first three segments on one centered row; remainder on a second centered row */
  const featuredMetaPrimary = featuredMetaAll.slice(0, 3);
  const featuredMetaTail =
    featuredMetaAll.length > 3 ? featuredMetaAll.slice(3).join(' · ') : null;

  const openGalleryLightbox = useCallback(
    (clickedIndex: number) => {
      setLightboxSlides(
        galleryItemsForDisplay.map((item) => ({
          src: item.image,
          title: item.vehicle,
          subtitle: item.metaLine,
        })),
      );
      setLightboxIndex(clickedIndex);
      setLightboxOpen(true);
    },
    [galleryItemsForDisplay],
  );

  const openMoreTransformLightbox = useCallback(
    (clickedIndex: number) => {
      setLightboxSlides(
        moreTransformItems.map((ba) => ({
          src: ba.after,
          title: ba.vehicle,
          subtitle: ba.captionMeta ?? ba.service,
        })),
      );
      setLightboxIndex(clickedIndex);
      setLightboxOpen(true);
    },
    [moreTransformItems],
  );

  return (
    <div className="results-page min-h-screen bg-[#0a0a0a]">
      {/* Page intro — same `InnerPageHeader` premium band as /services (badge, title scale, body). */}
      <InnerPageHeader
        variant="premium"
        eyebrow="PROOF"
        title={
          <>
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
          </>
        }
        description={
          <>
            Browse gallery work, compare before-and-afters, and watch short reels from the studio. Explore full scope
            on{' '}
            <Link href="/services" className="text-[#C9A84C] underline-offset-4 transition-colors hover:underline">
              Services
            </Link>
            , and packages on{' '}
            <Link href="/pricing" className="text-[#C9A84C] underline-offset-4 transition-colors hover:underline">
              Pricing
            </Link>
            .
          </>
        }
      />

      {/* Mobile: mode tabs (centered) + gallery filter row */}
      <section className="border-b border-white/[0.07] bg-[#0a0a0a] md:hidden">
        <div className="mx-auto max-w-7xl px-4 pt-7 pb-2">
          <div className="mb-7 flex justify-center">
            <div className="w-fit max-w-full rounded-md border border-[#1a1a1a] bg-[#0f0f0f] p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {TABS.map(({ id, label }) => {
                  const active = activeTab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => goToTab(id)}
                      className={`shrink-0 rounded-sm px-2.5 py-1.5 text-center text-[10px] font-bold uppercase leading-snug tracking-[0.14em] transition-all duration-300 ease-out ${focusRing} ${
                        active ? SERVICE_FILTER_BTN_ACTIVE : SERVICE_FILTER_BTN_INACTIVE
                      }`}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
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
                      className={`shrink-0 rounded-sm px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ease-out ${focusRing} ${
                        on ? SERVICE_FILTER_BTN_ACTIVE : SERVICE_FILTER_BTN_INACTIVE
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
          {/* Desktop: mode switches — grouped panel + Services-matched chip fills */}
          <nav
            aria-label="Results content"
            className="sticky top-32 hidden w-[min(100%,10.5rem)] shrink-0 md:flex"
          >
            <div className="flex w-full flex-col gap-2.5 rounded-md border border-[#1a1a1a] bg-[#0f0f0f] p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              {TABS.map(({ id, label }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goToTab(id)}
                    className={`w-full rounded-sm px-3 py-2 text-left text-[9px] font-bold uppercase leading-snug tracking-[0.14em] transition-all duration-300 ease-out ${focusRing} ${
                      active ? SERVICE_FILTER_BTN_ACTIVE : SERVICE_FILTER_BTN_INACTIVE
                    }`}
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
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
                        className={`rounded-sm px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ease-out ${focusRing} ${
                          on ? SERVICE_FILTER_BTN_ACTIVE : SERVICE_FILTER_BTN_INACTIVE
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
                      className="group overflow-hidden rounded-sm border border-white/8 bg-white/2 transition-[border-color] duration-300 hover:border-[#C9A84C]/22"
                    >
                      <button
                        type="button"
                        onClick={() => openGalleryLightbox(index)}
                        className={`relative block w-full cursor-zoom-in overflow-hidden rounded-sm text-left md:rounded-none ${focusRing}`}
                        aria-label={`View ${item.vehicle} larger`}
                      >
                        <div className="relative aspect-3/2 md:aspect-video">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            priority={index < 2}
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            sizes="(max-width:768px) 50vw, 50vw"
                          />
                        </div>
                      </button>
                      <div className="text-left px-4 pb-2.5 pt-3.5 md:px-5 md:pb-6 md:pt-5">
                        {/* Mobile: model left, short badge right, meta below — all left-aligned */}
                        <div className="md:hidden">
                          <div className="flex min-w-0 items-start justify-between gap-1.5">
                            <h3
                              className="min-w-0 flex-1 pr-1 text-left text-[13px] font-semibold leading-snug tracking-[-0.01em] text-white/95"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {item.vehicle}
                            </h3>
                            <span
                              className={`${serviceBadgeClass} max-w-none shrink-0 self-start whitespace-nowrap`}
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {galleryCategoryBadgeMobile(item.category)}
                            </span>
                          </div>
                          <p
                            className={`mt-1.5 text-left ${cardCaptionMetaClass}`}
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {item.metaLine}
                          </p>
                        </div>
                        {/* Desktop: model + full badge row, then meta */}
                        <div className="hidden md:block">
                          <div className="mb-1.5 flex min-w-0 items-start justify-between gap-3 md:mb-2">
                            <h3
                              className="min-w-0 flex-1 pt-0.5 text-[15px] font-semibold tracking-[-0.01em] text-white/95"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {item.vehicle}
                            </h3>
                            <span className={serviceBadgeClass} style={{ fontFamily: 'var(--font-inter)' }}>
                              {galleryCategoryBadge(item.category)}
                            </span>
                          </div>
                          <p
                            className={`mt-1.5 max-w-88 text-left ${cardCaptionMetaClass}`}
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {item.metaLine}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}

            {mainTab === 'beforeAfter' && (
              <div className="space-y-10 md:space-y-12">
                {/* Featured compare: image-first; copy in integrated caption panel (same frame) */}
                <div className="w-full min-w-0">
                  <div className="overflow-hidden rounded-sm border border-white/10 bg-white/2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                    <div className="p-1 md:p-1.5">
                      <BeforeAfterDragSlider
                        featured
                        before={featuredBeforeAfter.before}
                        after={featuredBeforeAfter.after}
                      />
                    </div>
                    <div className="border-t border-white/10 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
                      <div className="mb-2 flex items-center justify-between gap-1.5 md:mb-3 md:gap-3">
                        <p
                          className="min-w-0 flex-1 text-[clamp(1.2rem,5.5vw,1.65rem)] font-bold uppercase leading-[0.98] tracking-[0.03em] text-white md:text-[clamp(1.5rem,4.2vw,2.125rem)]"
                          style={{ fontFamily: 'var(--font-bebas)' }}
                        >
                          {featuredBeforeAfter.vehicle}
                        </p>
                        <span
                          className={`${serviceBadgeClass} max-w-none shrink-0 whitespace-nowrap`}
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {featuredCaseBadge}
                        </span>
                      </div>
                      <p
                        className="max-w-2xl text-left text-[12px] font-medium leading-snug text-white/82 sm:text-[13px] md:text-[14px] md:leading-relaxed"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {featuredBeforeAfter.editorialSubtitle ?? featuredBeforeAfter.service}
                      </p>
                      {/* Desktop: single metadata row — flush left (no horizontal centering) */}
                      <div
                        className="mt-3 hidden text-[10px] leading-[1.55] text-[#d5c8ac] sm:text-[11px] md:block"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        <div className="flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-1 text-left">
                          {featuredMetaAll.map((token, idx) => (
                            <span key={`${token}-${idx}`} className="inline-flex items-center">
                              {idx > 0 ? <span className="mr-2 text-white/25">•</span> : null}
                              <span className={idx === 0 ? 'tabular-nums' : ''}>{token}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Mobile: same segments as desktop, left-aligned editorial stack */}
                      <div className="mt-3 md:hidden" style={{ fontFamily: 'var(--font-inter)' }}>
                        <p className="text-left text-[10px] leading-relaxed text-[#d5c8ac] sm:text-[11px]">
                          {featuredMetaPrimary.map((token, idx) => (
                            <span key={`m-${token}-${idx}`}>
                              {idx > 0 ? <span className="text-white/25"> · </span> : null}
                              <span className={idx === 0 ? 'tabular-nums' : ''}>{token}</span>
                            </span>
                          ))}
                        </p>
                        {featuredMetaTail ? (
                          <p className="mt-2 text-left text-[10px] leading-relaxed text-[#d5c8ac] sm:text-[11px]">
                            {featuredMetaTail}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.07] pt-12 md:pt-14">
                  <h2
                    className="mb-8 flex flex-wrap items-baseline justify-center gap-x-2 uppercase leading-[0.92] tracking-[0.04em] md:mb-10 md:justify-start md:gap-x-3"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    <span
                      className="shrink-0 font-black text-[clamp(1.75rem,4.2vw,2.5rem)]"
                      style={TITLE_SILVER}
                    >
                      More
                    </span>
                    <span
                      className="shrink-0 font-black text-[clamp(1.75rem,4.2vw,2.5rem)]"
                      style={TITLE_GOLD}
                    >
                      Transformations
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">
                    {moreTransformItems.map((ba, idx) => (
                      <article
                        key={ba.id}
                        className="overflow-hidden rounded-sm border border-white/8 bg-white/2 transition-[border-color] duration-300 hover:border-[#C9A84C]/22"
                      >
                        <button
                          type="button"
                          onClick={() => openMoreTransformLightbox(idx)}
                          className={`relative block aspect-video w-full cursor-zoom-in overflow-hidden text-left ${focusRing}`}
                          aria-label={`View ${ba.vehicle} result larger`}
                        >
                          <div className="absolute inset-0 flex">
                            <div className="relative h-full w-1/2">
                              <Image src={ba.before} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
                            </div>
                            <div className="relative h-full w-1/2 border-l border-white/8">
                              <Image src={ba.after} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 40vw" />
                            </div>
                          </div>
                        </button>
                        <div className="border-t border-white/8 px-4 py-3.5 text-left md:px-5 md:py-5">
                          <div className="md:hidden">
                            <div className="flex min-w-0 items-start justify-between gap-1.5">
                              <h3
                                className="min-w-0 flex-1 pr-1 text-left text-[13px] font-semibold leading-snug tracking-[-0.01em] text-white/95"
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                {ba.vehicle}
                              </h3>
                              <span
                                className={`${serviceBadgeClass} max-w-none shrink-0 self-start whitespace-nowrap`}
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                {serviceBadgeLabelMobile(ba.serviceBadgeLabel)}
                              </span>
                            </div>
                            {ba.captionMeta ? (
                              <p
                                className={`mt-1.5 text-left ${cardCaptionMetaClass}`}
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                {ba.captionMeta}
                              </p>
                            ) : null}
                          </div>
                          <div className="hidden md:block">
                            <div className="mb-1.5 flex min-w-0 items-start justify-between gap-3 md:mb-2">
                              <h3
                                className="min-w-0 flex-1 text-[15px] font-semibold tracking-[-0.01em] text-white/95"
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                {ba.vehicle}
                              </h3>
                              <span className={serviceBadgeClass} style={{ fontFamily: 'var(--font-inter)' }}>
                                {ba.serviceBadgeLabel}
                              </span>
                            </div>
                            {ba.captionMeta ? (
                              <p
                                className={`mt-1.5 max-w-lg text-left ${cardCaptionMetaClass}`}
                                style={{ fontFamily: 'var(--font-inter)' }}
                              >
                                {ba.captionMeta}
                              </p>
                            ) : null}
                          </div>
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

      <ImageLightbox
        open={lightboxOpen}
        slides={lightboxSlides}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <article className={mediaCardFrame}>
      <div className="group relative aspect-video bg-black">
        <span
          className="pointer-events-none absolute right-2 top-2 z-30 rounded-[2px] border border-white/15 bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/85 tabular-nums backdrop-blur-[2px] md:right-2.5 md:top-2.5 md:text-[10px]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {item.duration}
        </span>
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
              className="absolute inset-0 z-10 flex items-center justify-center"
              aria-label={`Play ${item.label}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-[#C9A84C] text-black shadow-sm transition-opacity duration-300 group-hover:opacity-95">
                <span className="ml-0.5 border-y-[6px] border-l-10 border-y-transparent border-l-black" aria-hidden />
              </span>
            </button>
          </>
        ) : (
          <video ref={videoRef} className="relative z-0 h-full w-full object-cover" controls playsInline poster={item.thumbnail}>
            <source src={item.src ?? '/videos/showcase.mp4'} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="px-4 pb-5 pt-3">
        <div className="flex min-w-0 items-start justify-between gap-2 md:gap-3">
          <h3
            className="min-w-0 flex-1 pr-1 text-left text-[14px] font-semibold uppercase tracking-wide text-text-primary md:text-[15px]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {item.vehicle}
          </h3>
          <span
            className={`${serviceBadgeClass} max-w-none shrink-0 self-start whitespace-nowrap`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {item.badgeLabel}
          </span>
        </div>
      </div>
    </article>
  );
}