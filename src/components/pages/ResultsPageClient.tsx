'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';
import {
  GALLERY_FILTERS,
  beforeAfterItems,
  featuredBeforeAfter,
  galleryCategoryBadge,
  galleryItems,
  videoItems,
  type GalleryFilterId,
  type MainTab,
  type VideoItem,
} from '@/data/results-page-data';

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

function BeforeAfterDragSlider({ before, after }: { before: string; after: string }) {
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
      className="relative aspect-video w-full cursor-ew-resize select-none overflow-hidden rounded-sm border border-white/[0.07] bg-black"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
      role="img"
      aria-label="Before and after comparison, drag to adjust"
    >
      <Image src={before} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
      <div className="absolute inset-0 z-1" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image src={after} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-2 w-px bg-[#C9A84C]/90"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        aria-hidden
      />
      <div
        className="absolute top-2.5 z-3 flex w-full justify-between px-2.5 text-[9px] font-bold uppercase tracking-widest"
        style={{ pointerEvents: 'none' }}
      >
        <span className="text-white/75">Before</span>
        <span className="text-[#C9A84C]/90">After</span>
      </div>
      <button
        type="button"
        className="pointer-events-none absolute top-1/2 z-4 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/25 bg-[#C9A84C] text-black shadow-sm"
        style={{ left: `${pos}%` }}
        aria-hidden
        tabIndex={-1}
      >
        <ArrowLeftRight className="h-4 w-4" aria-hidden />
      </button>
      <p className="pointer-events-none absolute bottom-2.5 left-0 right-0 z-3 text-center text-[9px] font-bold uppercase tracking-widest text-white/35">
        Drag to compare
      </p>
    </div>
  );
}

const MAIN_TAB_LABELS: { id: MainTab; label: string }[] = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'beforeAfter', label: 'Before & After' },
  { id: 'video', label: 'Video' },
];

export default function ResultsPageClient() {
  const [mainTab, setMainTab] = useState<MainTab>('gallery');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterId>('all');

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return galleryItems;
    return galleryItems.filter((g) => g.category === galleryFilter);
  }, [galleryFilter]);

  const setMainTabAndReset = (id: MainTab) => {
    setMainTab(id);
    setGalleryFilter('all');
  };

  return (
    <div className="results-page min-h-screen bg-[#0a0a0a]">
      {/* Page intro — same structure + classes as Services `InnerPageHeader` premium (client-safe duplicate). */}
      <section
        className="border-b border-white/[0.07] pt-16 pb-6 md:pt-20 md:pb-8"
        style={{ background: 'var(--carbon-950)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
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
            <div
              className="mx-auto mt-5 max-w-[280px] text-center text-sm leading-relaxed text-[#A0A0A0] md:mx-0 md:mt-6 md:max-w-lg md:text-left md:text-base"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Proof of workmanship — browse photos, compare transformations, and watch process reels in one place.{' '}
              Full packages and add-ons are on{' '}
              <span className="whitespace-nowrap">
                <Link
                  href="/pricing"
                  className="text-[#C9A84C] underline-offset-4 transition-colors hover:underline"
                >
                  Pricing
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Unified control bar: mode + gallery-only chips */}
      <div className="border-b border-white/6 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <div className="mb-2 pt-1">
            <div className="flex flex-wrap items-center justify-center gap-x-1 md:justify-start">
              {MAIN_TAB_LABELS.map(({ id, label }, i) => {
                const active = mainTab === id;
                return (
                  <Fragment key={id}>
                    {i > 0 && <span className="px-2.5 text-xs text-white/15 md:px-4" aria-hidden>·</span>}
                    <button
                      type="button"
                      onClick={() => setMainTabAndReset(id)}
                      className={`relative min-h-10 px-1 pb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 ${focusRing} ${
                        active ? 'text-white' : 'text-white/30 hover:text-white/55'
                      }`}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {label}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] transition-opacity duration-300 ${
                          active ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden
                      />
                    </button>
                  </Fragment>
                );
              })}
            </div>
            <div className="mb-5 mt-0 h-px w-full bg-white/8 md:mb-6" />
            <div
              className="overflow-hidden transition-all duration-300 ease-out"
              style={{
                maxHeight: mainTab === 'gallery' ? '140px' : '0px',
                opacity: mainTab === 'gallery' ? 1 : 0,
                marginBottom: mainTab === 'gallery' ? '1.25rem' : '0',
                pointerEvents: mainTab === 'gallery' ? 'auto' : 'none',
              }}
              aria-hidden={mainTab !== 'gallery'}
            >
              <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
                {GALLERY_FILTERS.map(({ id, label }) => {
                  const on = galleryFilter === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setGalleryFilter(id)}
                      className={`min-h-10 rounded-full border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-all duration-200 md:min-h-9 md:py-1.5 ${focusRing} ${
                        on
                          ? 'border-[#C9A84C]/40 bg-[#C9A84C]/8 text-[#C9A84C]'
                          : 'border-white/10 text-white/30 hover:border-white/22 hover:text-white/55'
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
        </div>
      </div>

      <div className="px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            key={mainTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {mainTab === 'gallery' && (
              <motion.div
                key={galleryFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:gap-8">
                  {filteredGallery.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(index * 0.02, 0.12),
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                      className={`group ${mediaCardFrame}`}
                    >
                      {/* aspect-video: consistent with BA/video — curated portfolio row */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          priority={index === 0}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(max-width:768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="space-y-2 px-4 pb-5 pt-4">
                        <div className="flex items-baseline justify-between gap-3 border-b border-white/6 pb-2">
                          <span className={metaGold}>{galleryCategoryBadge(item.category)}</span>
                          <span className="font-mono text-[10px] text-white/20 tabular-nums">{item.number}</span>
                        </div>
                        <h3
                          className="text-[15px] font-semibold uppercase tracking-wide text-text-primary"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {item.vehicle}
                        </h3>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#C9A84C]/75">{item.service}</p>
                        <p className="text-[13px] leading-relaxed text-text-secondary" style={{ fontFamily: 'var(--font-inter)' }}>
                          {item.result}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {mainTab === 'beforeAfter' && (
              <div className="space-y-12 md:space-y-14">
                <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
                  <div className="space-y-3 md:space-y-4 md:pt-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35" style={{ fontFamily: 'var(--font-inter)' }}>
                      Featured case
                    </p>
                    <h2
                      className="text-2xl font-bold uppercase tracking-tight text-text-primary md:text-3xl"
                      style={{ fontFamily: 'var(--font-bebas)' }}
                    >
                      {featuredBeforeAfter.vehicle}
                    </h2>
                    <p className={metaGold}>{featuredBeforeAfter.service}</p>
                    <p className="text-[13px] leading-relaxed text-text-secondary" style={{ fontFamily: 'var(--font-inter)' }}>
                      {featuredBeforeAfter.tags.join(' · ')}
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/30" style={{ fontFamily: 'var(--font-inter)' }}>
                      Studio time · {featuredBeforeAfter.studioTime}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <BeforeAfterDragSlider before={featuredBeforeAfter.before} after={featuredBeforeAfter.after} />
                  </div>
                </div>

                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35" style={{ fontFamily: 'var(--font-inter)' }}>
                    More cases
                  </p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                    {beforeAfterItems.slice(1).map((ba) => (
                      <article key={ba.id} className={`${mediaCardFrame}`}>
                        <div className="relative aspect-video w-full">
                          <div className="absolute inset-0 flex">
                            <div className="relative h-full w-1/2">
                              <Image src={ba.before} alt="" fill className="object-cover" sizes="25vw" />
                            </div>
                            <div className="relative h-full w-1/2 border-l border-white/[0.07]">
                              <Image src={ba.after} alt="" fill className="object-cover" sizes="25vw" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 px-4 pb-5 pt-4">
                          <h3
                            className="text-[15px] font-semibold uppercase tracking-wide text-text-primary"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          >
                            {ba.vehicle}
                          </h3>
                          <p className={metaGold}>{ba.service}</p>
                          <p className="text-[10px] font-medium uppercase tracking-widest text-white/30" style={{ fontFamily: 'var(--font-inter)' }}>
                            {ba.studioTime}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mainTab === 'video' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
                {videoItems.map((v) => (
                  <VideoCard key={v.id} item={v} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

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
            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center md:w-auto md:justify-end md:gap-3">
              <Link
                href="/contact"
                className={`inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#C9A84C] px-5 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-colors duration-200 hover:bg-[#b8963e] sm:w-auto ${focusRing}`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Get a quote
              </Link>
              <Link
                href="/pricing"
                className={`inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-[#C9A84C]/45 px-5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C] transition-colors duration-200 hover:border-[#C9A84C] hover:bg-[#C9A84C]/6 sm:w-auto ${focusRing}`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                View packages
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
