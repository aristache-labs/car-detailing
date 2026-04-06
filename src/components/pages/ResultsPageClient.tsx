'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

/** Same gradient title treatment as /services (Our Services). */
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

const tabBtnBase =
  'rounded-sm border px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-200 sm:py-3.5 sm:text-xs';

const tabBtnInactive = 'border-white/20 text-white/60 hover:border-[#C9A84C]/50 hover:text-white';

const tabBtnActive = 'border-[#C9A84C] bg-[#C9A84C] text-black shadow-[inset_0_-3px_0_0_rgba(0,0,0,0.15)]';

const filterBtnBase =
  'shrink-0 rounded-sm px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 sm:px-4 sm:py-2.5';

const filterInactive = 'border border-white/20 text-white/60 hover:border-[#C9A84C]/50 hover:text-white';

const filterActive = 'border border-[#C9A84C] bg-[#C9A84C] text-black';

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
      className="relative aspect-video w-full cursor-ew-resize select-none overflow-hidden rounded-sm border border-white/8 bg-black"
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
      <div
        className="absolute inset-0 z-1"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image src={after} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-2 w-px bg-[#C9A84C]"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        aria-hidden
      />
      <div
        className="absolute top-3 z-3 flex w-full justify-between px-3 text-[10px] font-bold uppercase tracking-widest"
        style={{ pointerEvents: 'none' }}
      >
        <span className="rounded-sm border border-white/20 bg-black/70 px-2 py-1 text-white/90">Before</span>
        <span className="rounded-sm border border-[#C9A84C]/50 bg-black/70 px-2 py-1 text-[#C9A84C]">After</span>
      </div>
      <button
        type="button"
        className="pointer-events-none absolute top-1/2 z-4 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/30 bg-[#C9A84C] text-black shadow-lg"
        style={{ left: `${pos}%` }}
        aria-hidden
        tabIndex={-1}
      >
        <ArrowLeftRight className="h-5 w-5" aria-hidden />
      </button>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 z-3 text-center text-[10px] font-bold uppercase tracking-widest text-white/40">
        ← Drag to compare →
      </p>
    </div>
  );
}

function GalleryFilterScroll({
  value,
  onChange,
}: {
  value: GalleryFilterId;
  onChange: (id: GalleryFilterId) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ left: false, right: false });
  const skipRef = useRef(true);

  const updateFade = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = Math.max(0, scrollWidth - clientWidth);
    const eps = 2;
    setFade({
      left: scrollLeft > eps,
      right: max > eps && scrollLeft < max - eps,
    });
  }, []);

  useLayoutEffect(() => {
    updateFade();
  }, [value, updateFade]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => updateFade());
    ro.observe(el);
    window.addEventListener('resize', updateFade);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateFade);
    };
  }, [updateFade]);

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    const root = scrollerRef.current;
    if (!root) return;
    const id = requestAnimationFrame(() => {
      root.querySelector<HTMLElement>('[data-gallery-filter-active]')?.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'nearest',
      });
      updateFade();
    });
    return () => cancelAnimationFrame(id);
  }, [value, updateFade]);

  return (
    <div className="relative overflow-hidden md:hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-[#0a0a0a] to-transparent transition-opacity duration-300"
        style={{ opacity: fade.left ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-[#0a0a0a] to-transparent transition-opacity duration-300"
        style={{ opacity: fade.right ? 1 : 0 }}
      />
      <div
        ref={scrollerRef}
        onScroll={updateFade}
        className="flex gap-2 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {GALLERY_FILTERS.map(({ id, label }) => {
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              data-gallery-filter-active={active || undefined}
              onClick={() => onChange(id)}
              className={`${filterBtnBase} ${active ? filterActive : filterInactive}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ResultsPageClient() {
  const [mainTab, setMainTab] = useState<MainTab>('gallery');
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterId>('all');

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return galleryItems;
    return galleryItems.filter((g) => g.category === galleryFilter);
  }, [galleryFilter]);

  const mainTabs: { id: MainTab; label: string }[] = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'beforeAfter', label: 'Before & After' },
    { id: 'video', label: 'Video' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero — matches Services `InnerPageHeader` premium + split gradient title */}
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

      {/* Main tabs */}
      <div className="border-b border-white/5 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          {mainTabs.map(({ id, label }) => {
            const active = mainTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMainTab(id)}
                className={`${tabBtnBase} relative w-full sm:w-auto ${active ? tabBtnActive : tabBtnInactive} ${
                  active ? 'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-px after:bg-black/25' : ''
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {mainTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">Filter</p>
                <GalleryFilterScroll value={galleryFilter} onChange={setGalleryFilter} />
                <div className="mt-3 hidden flex-wrap gap-2 md:flex">
                  {GALLERY_FILTERS.map(({ id, label }) => {
                    const active = galleryFilter === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setGalleryFilter(id)}
                        className={`${filterBtnBase} ${active ? filterActive : filterInactive}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <motion.div
                  key={galleryFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mt-8"
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {filteredGallery.map((item, index) => (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: Math.min(index * 0.05, 0.3),
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        className="group overflow-hidden rounded-sm border border-white/8 bg-white/2 transition-colors duration-300 hover:border-[#C9A84C]/30"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width:768px) 100vw, 50vw"
                          />
                          <div
                            className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                            aria-hidden
                          />
                          <span className="absolute left-3 top-3 rounded-sm border border-[#C9A84C]/50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
                            {galleryCategoryBadge(item.category)}
                          </span>
                          <span className="absolute right-3 top-3 font-mono text-sm font-bold text-[#C9A84C]/70">
                            {item.number}
                          </span>
                        </div>
                        <div className="space-y-2 p-4">
                          <h3 className="text-sm font-bold uppercase tracking-wide text-white">{item.vehicle}</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">{item.service}</p>
                          <p className="text-xs leading-relaxed text-white/50">{item.result}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {mainTab === 'beforeAfter' && (
              <motion.div
                key="ba"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-10"
              >
                <div className="grid gap-8 md:grid-cols-2 md:items-start">
                  <div className="space-y-4 p-4 md:p-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Featured</p>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                      {featuredBeforeAfter.vehicle}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">{featuredBeforeAfter.service}</p>
                    <div className="flex flex-wrap gap-2">
                      {featuredBeforeAfter.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-sm border border-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                      Studio time · {featuredBeforeAfter.studioTime}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <BeforeAfterDragSlider before={featuredBeforeAfter.before} after={featuredBeforeAfter.after} />
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">More cases</p>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {beforeAfterItems.slice(1).map((ba) => (
                      <article
                        key={ba.id}
                        className="overflow-hidden rounded-sm border border-white/8 bg-white/2 transition-colors duration-300 hover:border-[#C9A84C]/30"
                      >
                        <div className="relative aspect-video w-full">
                          <div className="absolute inset-0 flex">
                            <div className="relative h-full w-1/2">
                              <Image src={ba.before} alt="" fill className="object-cover" sizes="25vw" />
                            </div>
                            <div className="relative h-full w-1/2 border-l border-white/10">
                              <Image src={ba.after} alt="" fill className="object-cover" sizes="25vw" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 p-4">
                          <h3 className="text-sm font-bold uppercase tracking-wide text-white">{ba.vehicle}</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">{ba.service}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{ba.studioTime}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {mainTab === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {videoItems.map((v) => (
                  <VideoCard key={v.id} item={v} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA — compact strip, matches ServicesCatalog bottom card */}
      <section className="border-t border-white/5 bg-[#0a0a0a] pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <div className="rounded-lg border border-[#1a1a1a] bg-[#0f0f0f] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                  Ready for the same finish?
                </p>
                <p
                  className="mt-0.5 text-[11px] leading-snug text-[#666] sm:mt-1 sm:text-xs"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Book an inspection or explore services — we&apos;ll match the right package to your goals.
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
      </section>
    </div>
  );
}

function VideoCard({ item }: { item: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <article className="overflow-hidden rounded-sm border border-white/8 bg-white/2 transition-colors duration-300 hover:border-[#C9A84C]/30">
      <div className="group relative aspect-video bg-black">
        {!playing ? (
          <>
            <Image
              src={item.thumbnail}
              alt=""
              fill
              className="object-cover transition-all duration-300 group-hover:brightness-75"
              sizes="50vw"
            />
            <span className="absolute left-3 top-3 rounded-sm border border-[#C9A84C]/50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
              Video
            </span>
            <span className="absolute right-3 top-3 rounded-sm border border-white/20 bg-black/50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
              {item.duration}
            </span>
            <button
              type="button"
              onClick={() => {
                setPlaying(true);
                requestAnimationFrame(() => void videoRef.current?.play());
              }}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${item.label}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                <span className="ml-0.5 border-y-[7px] border-l-12 border-y-transparent border-l-black" aria-hidden />
              </span>
            </button>
          </>
        ) : (
          <video ref={videoRef} className="h-full w-full object-cover" controls playsInline poster={item.thumbnail}>
            <source src={item.src ?? '/videos/showcase.mp4'} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="space-y-1 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">{item.vehicle}</h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">{item.service}</p>
      </div>
    </article>
  );
}
