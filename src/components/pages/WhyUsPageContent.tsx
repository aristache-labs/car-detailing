'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
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
        className="relative overflow-hidden px-4 py-10 sm:px-8 md:px-14 md:py-16 lg:py-20"
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
        <div className="relative mx-auto w-full max-w-5xl pt-2">
          <ScrollReveal>
            <span
              className="mb-3 inline-flex items-center px-4 py-2 text-sm font-black uppercase tracking-[0.2em] md:mb-4 md:text-base"
              style={BADGE_STYLE}
            >
              Trust
            </span>
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
              className="mt-5 max-w-xl text-base leading-relaxed text-[#A0A0A0] md:mt-6 md:text-lg"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Standards, materials, and how we work — so you know exactly what you&apos;re booking
              before we touch your paint.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6 PILLARS ── */}
      <section className="relative py-10 md:py-16 lg:py-20" style={{ background: '#0d0d0d' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#C9A84C] sm:text-left">
              Our standards
            </p>
            <h2
              className="text-center text-3xl font-black uppercase tracking-[0.05em] sm:text-left md:text-4xl"
              style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
            >
              Built on method, not guesswork
            </h2>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={p.title} delayMs={i * 80}>
                  <div className="group h-full rounded-lg border border-[#1e1e1e] bg-[#111111] p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.35)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(201,168,76,0.2)] bg-[#1a1a1a]">
                      <Icon className="h-5 w-5 shrink-0 text-[#C9A84C]" strokeWidth={2} />
                    </div>
                    <h3 className="mt-3 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#8a8a8a]" style={{ fontFamily: 'var(--font-inter)' }}>
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
      <section className="relative bg-[#0a0a0a] px-4 py-10 sm:px-8 md:px-14 md:py-12">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#1a1a1a] border-l-2 border-l-[#C9A84C] bg-[#0f0f0f] py-6 pl-5 pr-6 md:px-8 md:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
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
      <section className="py-10 md:py-16" style={{ background: '#0d0d0d' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <p
              className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#C9A84C] md:mb-8"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              By the numbers
            </p>
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

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-10 md:py-16" style={{ background: '#0a0a0a' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <span
              className="mx-auto mb-4 inline-flex items-center px-4 py-2 text-sm font-black uppercase tracking-[0.2em] sm:mx-0 md:text-base"
              style={BADGE_STYLE}
            >
              Verified owner reviews
            </span>
            <h2
              className="text-center text-3xl font-black uppercase tracking-[0.05em] sm:text-left md:text-4xl"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              <span style={{ color: '#FFFFFF' }}>Client </span>
              <span style={{ color: GOLD }}>Voices</span>
            </h2>
            <p
              className="mt-3 text-center text-sm sm:text-left"
              style={{ color: '#A0A0A0', fontFamily: 'var(--font-inter)' }}
            >
              Real feedback from owners who expect premium results.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-2">
                <StarRow />
                <span className="text-sm font-semibold text-white">4.9 / 5</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A0A0A0]">
                Ceramic · PPF · Correction
              </span>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delayMs={i * 100}>
                <div className="flex h-full flex-col rounded-lg border border-[#1e1e1e] bg-[#0f0f0f] p-5 transition-colors duration-300 ease-out hover:border-[#C9A84C]/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#1a1a1a] text-xs font-bold uppercase text-[#C9A84C]">
                      {t.initials}
                    </div>
                    <StarRow />
                  </div>
                  <span
                    className="mt-3 inline-flex w-fit rounded-sm border border-[rgba(201,168,76,0.18)] bg-[rgba(201,168,76,0.07)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#C9A84C]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {t.badge.toUpperCase()}
                  </span>
                  <p
                    className="mb-4 mt-3 flex-1 text-sm italic leading-relaxed text-[#d0d0d0]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {t.quote}
                  </p>
                  <div className="mt-auto border-t border-white/6 pt-4">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-[#666]">{t.car}</p>
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
                      <ShieldCheck className="h-2.5 w-2.5 shrink-0" strokeWidth={2} aria-hidden />
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
      <section className="py-10 md:py-16" style={{ background: '#0d0d0d' }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-8 md:px-14">
          <ScrollReveal>
            <p
              className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#C9A84C] sm:text-left"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              The difference
            </p>
            <h2
              className="text-center text-3xl font-black uppercase tracking-[0.05em] sm:text-left md:text-4xl"
              style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
            >
              Apex vs the rest
            </h2>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <div className="mt-8 overflow-x-auto rounded-lg border border-[#1e1e1e] md:mt-10">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#111]">
                    <th
                      className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-[#666]"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      Feature
                    </th>
                    <th
                      className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#C9A84C]"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      Apex Detailing
                    </th>
                    <th
                      className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-[#555]"
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
                      className={`transition-colors duration-150 ease-out hover:bg-[#C9A84C]/5 ${
                        i % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0f0f0f]'
                      }`}
                    >
                      <td
                        className="border-t border-white/6 px-4 py-3 text-sm text-[#c0c0c0]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {row.feature}
                      </td>
                      <td className="border-t border-white/6 px-4 py-3">
                        {row.apex ? (
                          <CheckCircle2 className="h-[18px] w-[18px] text-[#C9A84C]" strokeWidth={2.25} />
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </td>
                      <td className="border-t border-white/6 px-4 py-3">
                        {row.typical ? (
                          <CheckCircle2 className="h-[18px] w-[18px] text-white/25" strokeWidth={2} />
                        ) : (
                          <X className="h-4 w-4 text-[#3a3a3a]" strokeWidth={2.25} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-[#0a0a0a] py-12 md:py-20">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(85vw,480px)] w-[min(95vw,800px)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8 md:px-14">
          <ScrollReveal>
            <h2
              className="text-3xl font-black uppercase tracking-[0.06em] md:text-4xl"
              style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
            >
              Ready to see the difference?
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#888]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Book a free inspection or request a callback — same-day response guaranteed.
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="hero-cta-primary group inline-flex items-center justify-center"
              >
                Book free inspection →
                <ArrowRight className="h-[15px] w-[15px] shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
              </Link>
              <Link href="/contact" className="hero-cta-secondary group inline-flex items-center justify-center">
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
