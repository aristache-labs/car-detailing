'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  CircleCheck,
  Droplets,
  Eye,
  FileCheck2,
  FlaskConical,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';

const GOLD = '#C9A84C';

const BADGE_STYLE: CSSProperties = {
  color: '#E2C06A',
  fontFamily: 'var(--font-orbitron)',
  background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
  border: '1px solid rgba(201,168,76,0.35)',
};

const PILLARS = [
  {
    icon: ClipboardCheck,
    title: 'Precision-First Process',
    description:
      'Every service follows a defined sequence. No rushed steps, no guesswork.',
  },
  {
    icon: FlaskConical,
    title: 'Professional-Grade Materials',
    description:
      'We use certified coatings, safe chemicals, and proven protection systems only.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Tailored Recommendations',
    description:
      'Each vehicle gets a plan based on its condition, usage, and your finish goals.',
  },
  {
    icon: Droplets,
    title: 'Paint-Safe Methods',
    description:
      'Measured correction and safe techniques designed to preserve your clear coat — always.',
  },
  {
    icon: FileCheck2,
    title: 'Documented Results',
    description:
      'Before/after references and clear service outcomes so you always know what changed.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Pricing',
    description:
      'Clear package structure, honest recommendations, and zero surprise upsells. Ever.',
  },
] as const;

const TESTIMONIALS = [
  {
    name: 'Andrei M.',
    car: 'BMW M4 Competition',
    badge: 'Ceramic + Correction',
    quote: 'Attention to detail was exceptional. The finish and depth of gloss exceeded expectations.',
    initials: 'AM',
  },
  {
    name: 'Mihai T.',
    car: 'Audi RS6',
    badge: 'PPF Protection',
    quote: 'Professional from start to finish. I knew exactly what they were doing at every step.',
    initials: 'MT',
  },
  {
    name: 'Razvan D.',
    car: 'Porsche Macan',
    badge: 'Interior Detailing',
    quote: 'Never seen my interior look this clean. The results speak for themselves.',
    initials: 'RD',
  },
] as const;

const COMPARISON_ROWS: { feature: string; apex: boolean; typical: boolean }[] = [
  { feature: 'Professional-grade certified products', apex: true, typical: false },
  { feature: 'Defined service sequence (no rushing)', apex: true, typical: false },
  { feature: 'Before/after photo documentation', apex: true, typical: false },
  { feature: 'Paint thickness measurements', apex: true, typical: false },
  { feature: 'Clear coat safe techniques', apex: true, typical: false },
  { feature: 'Written service summary provided', apex: true, typical: false },
  { feature: 'No upsells or surprise charges', apex: true, typical: false },
  { feature: 'Verified owner reviews', apex: true, typical: false },
];

const STANDARD_POINTS = [
  'No rushed workflows — every step earns the next.',
  'No aggressive correction by default — we preserve clear coat first.',
  'No generic upsells — only what your vehicle actually needs.',
  'Recommendations driven by paint condition, use case, and your finish goals.',
] as const;

/** Matches homepage section badges (e.g. ServicesDetail “Our Services”, Process “Our Method”). */
function SectionBadge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-black uppercase tracking-[0.2em] md:text-base ${className}`}
      style={BADGE_STYLE}
    >
      {children}
    </span>
  );
}

function ScrollReveal({
  children,
  delayMs = 0,
  className = '',
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 600ms ease-out ${delayMs}ms, transform 600ms ease-out ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useCountUp(
  target: number,
  decimals: number,
  suffix: string,
  enabled: boolean,
  durationMs = 1400
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, durationMs]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return `${formatted}${suffix}`;
}

function StatBlock({
  display,
  label,
}: {
  display: { target: number; decimals: number; suffix: string };
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const text = useCountUp(display.target, display.decimals, display.suffix, on);

  return (
    <div ref={ref} className="flex flex-1 flex-col items-center px-3 py-4 text-center sm:px-4">
      <p
        className="text-5xl font-black leading-none tracking-[0.02em] md:text-6xl"
        style={{ fontFamily: 'var(--font-bebas)', color: GOLD }}
      >
        {text}
      </p>
      <p className="mt-1 max-w-48 text-xs font-bold uppercase tracking-widest text-[#666]">
        {label}
      </p>
    </div>
  );
}

function StarRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 shrink-0 fill-[#C9A84C] stroke-[#C9A84C]" strokeWidth={1.2} />
      ))}
    </div>
  );
}

export default function WhyUsPageContent() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:px-8 md:px-14 md:py-16 lg:py-20"
        style={{
          background: 'linear-gradient(165deg, #0a0a0a 0%, #0d0d0d 45%, #080808 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden
          style={{
            backgroundImage: `repeating-linear-gradient(
              -28deg,
              transparent,
              transparent 2px,
              rgba(201,168,76,0.02) 2px,
              rgba(201,168,76,0.02) 3px
            )`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-[min(70vh,520px)] w-[min(55vw,480px)] -translate-y-1/2 translate-x-1/4 rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 pt-2 lg:grid-cols-[minmax(0,1fr)_minmax(280px,440px)] lg:gap-12 xl:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <ScrollReveal className="flex w-full justify-center lg:justify-start">
              <SectionBadge className="mb-3 md:mb-4">Trust</SectionBadge>
            </ScrollReveal>
            <ScrollReveal delayMs={80}>
              <h1
                className="text-5xl font-black uppercase leading-[0.92] tracking-[0.04em] md:text-6xl"
                style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
              >
                <span className="block">Why Apex</span>
                <span className="block" style={{ color: GOLD }}>
                  Detailing
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delayMs={160}>
              <p
                className="mt-5 max-w-xl text-base leading-relaxed text-[#A0A0A0] md:mt-6 md:text-lg lg:mx-0 mx-auto"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Standards, materials, and how we work — so you know exactly what you&apos;re booking
                before we touch your paint.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delayMs={120} className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div
              className="relative rounded-lg border border-[#1e1e1e] p-[3px]"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.45)',
                background: 'linear-gradient(145deg, rgba(201,168,76,0.12) 0%, #0a0a0a 38%, #0a0a0a 100%)',
              }}
            >
              <div className="relative aspect-5/4 overflow-hidden rounded-md bg-[#070709]">
                <Image
                  src="/images/hero-car-no-bg.png"
                  alt="Premium detailed vehicle — Apex Detailing Bucharest"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 90vw, 440px"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/35 to-transparent"
                  aria-hidden
                />
              </div>
            </div>
            <div className="mx-auto mt-4 grid w-full max-w-sm grid-cols-2 gap-3 sm:mt-5 lg:mx-0 lg:max-w-sm xl:ml-auto">
              <div
                className="rounded-md border border-[#1e1e1e] px-3 py-2.5"
                style={{
                  background: 'linear-gradient(180deg, #121212 0%, #0c0c0c 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Vehicles refined</p>
                <p
                  className="mt-0.5 text-2xl leading-none tracking-[0.04em] text-[#C9A84C]"
                  style={{ fontFamily: 'var(--font-bebas)' }}
                >
                  500+
                </p>
              </div>
              <div
                className="rounded-md border border-[#1e1e1e] px-3 py-2.5"
                style={{
                  background: 'linear-gradient(180deg, #121212 0%, #0c0c0c 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Owner rating</p>
                <p
                  className="mt-0.5 text-2xl leading-none tracking-[0.04em] text-[#C9A84C]"
                  style={{ fontFamily: 'var(--font-bebas)' }}
                >
                  4.9<span className="text-lg text-[#8a8a8a]">/5</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6 PILLARS ── */}
      <section className="relative py-14 md:py-20 lg:py-24" style={{ background: '#0d0d0d' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-3 flex justify-center sm:justify-start">
                <SectionBadge>Our standards</SectionBadge>
              </div>
              <h2
                className="text-3xl font-black uppercase tracking-[0.05em] md:text-4xl"
                style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
              >
                Built on method, not guesswork
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-11 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              const num = String(i + 1).padStart(2, '0');
              return (
                <ScrollReveal key={p.title} delayMs={i * 80}>
                  <div
                    className="group relative h-full overflow-hidden rounded-lg border border-[#1a1a1a] bg-linear-to-b from-[#131313] to-[#0e0e0e] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.28)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                  >
                    <div
                      className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-full opacity-[0.07] transition-opacity group-hover:opacity-[0.12]"
                      style={{ background: 'radial-gradient(circle at 100% 0%, #C9A84C 0%, transparent 70%)' }}
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(201,168,76,0.22)] bg-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                        <Icon className="h-5 w-5 shrink-0 text-[#C9A84C]" strokeWidth={2} />
                      </div>
                      <span
                        className="pt-0.5 text-[10px] font-bold tabular-nums tracking-widest text-[#3a3a3a] transition-colors group-hover:text-[#5a5a5a]"
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                        aria-hidden
                      >
                        {num}
                      </span>
                    </div>
                    <h3
                      className="relative mt-4 text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-[#C9A84C] md:text-xs md:tracking-widest"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="relative mt-2.5 border-t border-white/6 pt-3 text-sm leading-relaxed text-[#8a8a8a]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {p.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section className="relative bg-[#0a0a0a] px-4 py-12 sm:px-8 md:px-14 md:py-14">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#1a1a1a] border-l-2 border-l-[#C9A84C] bg-[#0f0f0f] py-6 pl-5 pr-6 md:px-8 md:py-6">
          <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:text-left">
            <p
              className="text-sm leading-relaxed text-[#a0a0a0] md:text-base"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Every service follows the same on-ramp: inspection{' '}
              <span className="text-[#C9A84C]">→</span> safe prep <span className="text-[#C9A84C]">→</span> correction or
              protection <span className="text-[#C9A84C]">→</span> final review.
            </p>
            <Link
              href="/#process"
              className="shrink-0 text-xs font-bold uppercase tracking-widest text-[#C9A84C] transition-colors hover:underline sm:pt-0.5 sm:text-right"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              See the full PIT STOP PROCESS →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 md:py-20" style={{ background: '#0d0d0d' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <div className="mb-6 flex justify-center md:mb-8">
              <SectionBadge>By the numbers</SectionBadge>
            </div>
          </ScrollReveal>
          <div className="flex flex-col divide-y divide-[rgba(201,168,76,0.15)] sm:flex-row sm:divide-y-0">
            <StatBlock
              display={{ target: 500, decimals: 0, suffix: '+' }}
              label="Vehicles refined"
            />
            <div
              className="hidden h-[50px] w-px shrink-0 self-center bg-[rgba(201,168,76,0.2)] sm:block"
              aria-hidden
            />
            <StatBlock
              display={{ target: 5, decimals: 0, suffix: '+' }}
              label="Years experience"
            />
            <div
              className="hidden h-[50px] w-px shrink-0 self-center bg-[rgba(201,168,76,0.2)] sm:block"
              aria-hidden
            />
            <StatBlock
              display={{ target: 4.9, decimals: 1, suffix: ' / 5' }}
              label="Average rating"
            />
            <div
              className="hidden h-[50px] w-px shrink-0 self-center bg-[rgba(201,168,76,0.2)] sm:block"
              aria-hidden
            />
            <StatBlock
              display={{ target: 98, decimals: 0, suffix: '%' }}
              label="Return & referral rate"
            />
          </div>
        </div>
      </section>

      {/* ── THE STANDARD WE FOLLOW ── */}
      <section
        className="relative border-t border-white/4 py-14 md:py-20"
        style={{ background: '#0a0a0a' }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-[#C9A84C]/20 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-3 flex justify-center sm:justify-start">
                  <SectionBadge>How we protect the finish</SectionBadge>
                </div>
                <h2
                  className="text-3xl font-black uppercase leading-[0.95] tracking-[0.05em] md:text-4xl lg:text-[2.5rem]"
                  style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
                >
                  The standard
                  <br />
                  <span style={{ color: GOLD }}>we follow</span>
                </h2>
                <p
                  className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#888] sm:mx-0"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Detailing isn&apos;t a volume game — it&apos;s a discipline. Every recommendation ties back to
                  paint health, your driving context, and the finish you want.
                </p>
              </div>
            </ScrollReveal>
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {STANDARD_POINTS.map((line, i) => (
                <ScrollReveal key={line} delayMs={i * 70}>
                  <div className="group flex gap-3.5 rounded-lg border border-[#1a1a1a] bg-[#0f0f0f] px-4 py-3.5 transition-colors duration-300 ease-out hover:border-[rgba(201,168,76,0.22)]">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[rgba(201,168,76,0.15)] bg-[#141414]">
                      <CircleCheck className="h-3.5 w-3.5 text-[#C9A84C]" strokeWidth={2.25} />
                    </div>
                    <p
                      className="text-[13px] leading-relaxed text-[#b8b8b8] md:text-sm"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {line}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="relative border-t border-white/4 py-14 md:py-20"
        style={{ background: '#0d0d0d' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-5 flex justify-center sm:justify-start">
                <SectionBadge>Verified owner reviews</SectionBadge>
              </div>
              <h2
                className="text-3xl font-black uppercase tracking-[0.05em] md:text-4xl"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                <span style={{ color: '#FFFFFF' }}>Client </span>
                <span style={{ color: GOLD }}>Voices</span>
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#909090] sm:mx-0"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Real feedback from owners who expect premium results.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-2">
                <StarRow />
                <span className="text-sm font-semibold tabular-nums text-white">4.9 / 5</span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#707070]">
                Ceramic · PPF · Correction
              </span>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3 md:gap-5 lg:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delayMs={i * 100}>
                <div
                  className={`flex h-full flex-col rounded-lg border bg-[#0f0f0f] p-5 transition-all duration-300 ease-out ${
                    i === 0
                      ? 'border-[rgba(201,168,76,0.28)] shadow-[0_0_0_1px_rgba(201,168,76,0.08),0_20px_48px_rgba(0,0,0,0.35)] md:-translate-y-0.5 md:shadow-[0_0_0_1px_rgba(201,168,76,0.12),0_24px_56px_rgba(0,0,0,0.4)]'
                      : 'border-[#1e1e1e] hover:border-[#C9A84C]/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/35 bg-[#141414] text-xs font-bold uppercase text-[#C9A84C]">
                      {t.initials}
                    </div>
                    <StarRow />
                  </div>
                  <span
                    className="mt-4 inline-flex w-fit rounded-sm border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.08)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#d4b060]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {t.badge.toUpperCase()}
                  </span>
                  <p
                    className="mb-5 mt-3 flex-1 text-sm italic leading-[1.65] text-[#c8c8c8]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {t.quote}
                  </p>
                  <div className="mt-auto border-t border-white/6 pt-4">
                    <p className="text-sm font-semibold tracking-wide text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-[#666]">{t.car}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                      <ShieldCheck className="h-2.5 w-2.5 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
                      Verified owner
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="border-t border-white/4 py-14 md:py-24" style={{ background: '#080808' }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-3 flex justify-center sm:justify-start">
                <SectionBadge>The difference</SectionBadge>
              </div>
              <h2
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-black uppercase leading-[0.95] tracking-[0.06em]"
                style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
              >
                Apex vs the rest
              </h2>
              <p
                className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#707070] sm:mx-0"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                The same service category — two different philosophies. Here&apos;s how we stack up.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <Fragment>
            {/* Mobile: single premium spec panel (compact grid — desktop uses table below) */}
            <div className="mt-8 md:hidden">
              <div className="overflow-hidden rounded-lg border border-[#1e1e1e] bg-[#0c0c0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div
                  className="grid grid-cols-[minmax(0,0.62fr)_minmax(3.25rem,0.19fr)_minmax(3.25rem,0.19fr)] gap-x-1 border-b border-white/8 bg-[#111] sm:grid-cols-[minmax(0,0.62fr)_minmax(3.5rem,0.19fr)_minmax(3.5rem,0.19fr)]"
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                  <div className="min-w-0 px-2 py-2.5 pl-2.5 pr-1 text-[8px] font-bold uppercase leading-tight tracking-[0.16em] text-[#666]">
                    Feature
                  </div>
                  <div className="flex items-center justify-center border-x border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.09)] px-1 py-2.5 text-center text-[8px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#E2C06A]">
                    Apex
                  </div>
                  <div className="flex items-center justify-center px-1 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.14em] text-[#555]">
                    Typical
                  </div>
                </div>
                {COMPARISON_ROWS.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-[minmax(0,0.62fr)_minmax(3.25rem,0.19fr)_minmax(3.25rem,0.19fr)] gap-x-1 border-b border-white/6 last:border-b-0 sm:grid-cols-[minmax(0,0.62fr)_minmax(3.5rem,0.19fr)_minmax(3.5rem,0.19fr)] ${
                      i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'
                    }`}
                  >
                    <div
                      className="flex min-w-0 items-center px-2 py-2 pl-2.5 pr-1 text-[11px] font-medium leading-snug text-[#b0b0b0]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {row.feature}
                    </div>
                    <div className="flex items-center justify-center border-x border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.045)] px-1 py-2">
                      {row.apex ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C9A84C]" strokeWidth={2.25} />
                      ) : (
                        <span className="text-sm text-white/25">—</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center px-1 py-2">
                      {row.typical ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-white/22" strokeWidth={2} />
                      ) : (
                        <X className="h-3.5 w-3.5 shrink-0 text-[#3a3a3a]" strokeWidth={2.25} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: table */}
            <div className="mt-10 hidden overflow-x-auto rounded-lg border border-[#1e1e1e] shadow-[0_24px_64px_rgba(0,0,0,0.35)] md:mt-12 md:block">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#111]">
                    <th
                      className="px-4 py-4 text-left text-xs font-bold uppercase tracking-widest text-[#666] sm:px-5"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      Feature
                    </th>
                    <th
                      className="border-x border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.06)] px-4 py-4 text-center text-xs font-semibold uppercase tracking-widest text-[#E8C96A] sm:px-5"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      Apex Detailing
                    </th>
                    <th
                      className="px-4 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#555] sm:px-5"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      Typical shop
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`transition-colors duration-150 ease-out hover:bg-[rgba(201,168,76,0.07)] ${
                        i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0f0f0f]'
                      }`}
                    >
                      <td
                        className="border-t border-white/6 px-4 py-3.5 text-sm text-[#b8b8b8] sm:px-5 sm:py-4"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {row.feature}
                      </td>
                      <td className="border-x border-t border-white/6 border-x-[rgba(201,168,76,0.14)] bg-[rgba(201,168,76,0.04)] px-4 py-3.5 text-center sm:px-5 sm:py-4">
                        {row.apex ? (
                          <CheckCircle2 className="mx-auto h-[18px] w-[18px] text-[#C9A84C]" strokeWidth={2.25} />
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </td>
                      <td className="border-t border-white/6 px-4 py-3.5 text-center sm:px-5 sm:py-4">
                        {row.typical ? (
                          <CheckCircle2 className="mx-auto h-[18px] w-[18px] text-white/25" strokeWidth={2} />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-[#3a3a3a]" strokeWidth={2.25} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </Fragment>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative border-t border-white/4 bg-[#0a0a0a] py-14 md:py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(85vw,480px)] w-[min(95vw,800px)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 72%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8 md:px-14">
          <ScrollReveal>
            <h2
              className="text-[clamp(1.85rem,4.5vw,2.75rem)] font-black uppercase leading-[0.95] tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
            >
              Ready to see the difference?
            </h2>
            <p
              className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#888]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Book a free inspection or request a callback — same-day response guaranteed.
            </p>
            <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:mt-14 sm:flex-row sm:justify-center sm:gap-5">
              <Link
                href="/contact"
                className="hero-cta-primary group inline-flex min-w-[200px] items-center justify-center"
              >
                Book free inspection →
                <ArrowRight className="h-[15px] w-[15px] shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
              </Link>
              <Link
                href="/contact"
                className="hero-cta-secondary group inline-flex min-w-[200px] items-center justify-center"
              >
                <Eye className="h-[15px] w-[15px] shrink-0 opacity-90" strokeWidth={2} />
                Request a callback →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
