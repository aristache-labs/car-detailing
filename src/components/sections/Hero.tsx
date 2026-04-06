'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Eye } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '@/components/providers/LanguageProvider';

const HERO_CAR = '/images/hero-car-no-bg.png';

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      titleRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    )
      .fromTo(
        subRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        carRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
        '-=0.8'
      );
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col lg:flex-row lg:items-center min-h-screen"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Subtle left radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Diagonal slash separator — visible on desktop */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, var(--carbon-950) 52%, transparent 52%)',
          zIndex: 2,
        }}
      />

      {/* Right panel background — desktop only */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:block lg:w-1/2"
        style={{
          background: 'linear-gradient(135deg, #0d0d14 0%, #12121e 50%, #0a0a12 100%)',
        }}
      />

      {/* ── LEFT PANEL — editorial; desktop: content block nudged toward car ── */}
      <div className="relative z-10 w-full lg:w-[52%] xl:w-[50%] px-6 sm:px-8 md:px-14 lg:pl-10 lg:pr-4 xl:pl-14 xl:pr-8 pt-28 pb-6 lg:py-0">
        <div className="lg:max-w-xl xl:max-w-2xl lg:ml-auto lg:mr-2 xl:mr-6 2xl:mr-10">
        {/* Main headline — two-line premium value proposition */}
        <div
          ref={titleRef}
          className="filter-[drop-shadow(0_6px_24px_rgba(0,0,0,0.45))] text-center lg:text-left"
          style={{ opacity: 0 }}
        >
          <h1
            className="leading-[0.94] tracking-[0.01em] mb-0"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            <span
              className="block text-[clamp(3.5rem,6vw,7rem)]"
              style={{
                background:
                  'linear-gradient(165deg, #f0f4f8 0%, #dce0e0 35%, #ffffff 48%, #c8d0d0 58%, #8a9aa8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.92,
              }}
            >
              {t.hero.headlineTop}
            </span>
            <span
              className="block text-[clamp(2.8rem,4.5vw,5.5rem)]"
              style={{
                background:
                  'linear-gradient(165deg, #ead8b8 0%, #d6b36a 28%, #cfa85a 52%, #b8924a 78%, #8a6a38 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.92,
              }}
            >
              {t.hero.headlineBottom}
            </span>
          </h1>
        </div>

        {/* Tagline — editorial width, elegant contrast */}
        <p
          ref={subRef}
          className="mt-4 mb-8 mx-auto lg:mx-0 max-w-[min(100%,28rem)] lg:max-w-104 leading-[1.7] text-[15px] lg:text-[15px] xl:text-[0.97rem] text-center lg:text-left"
          style={{
            color: 'rgba(210, 212, 222, 0.82)',
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            opacity: 0,
          }}
        >
          {t.hero.description}
        </p>

        {/* CTAs — paired premium system */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row lg:flex-row lg:items-stretch gap-3 sm:gap-3.5 justify-center lg:justify-start"
          style={{ opacity: 0 }}
        >
          <Link href="/contact" className="hero-cta-primary group inline-flex items-center justify-center">
            {t.hero.primaryCta}
            <ArrowRight className="w-[15px] h-[15px] shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
          </Link>

          <Link href="/results" className="hero-cta-secondary group inline-flex items-center justify-center">
            <Eye className="w-[15px] h-[15px] shrink-0 opacity-90" strokeWidth={2} />
            {t.hero.secondaryCta}
          </Link>
        </div>

        {/* Trust bullets */}
        <ul className="flex flex-col gap-2.5 mt-10 lg:mt-12">
          {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((item) => (
            <li
              key={item}
              className="flex items-center justify-center lg:justify-start gap-2.5 text-[13px]"
              style={{
                color: 'rgba(210, 212, 222, 0.82)',
                fontFamily: 'var(--font-inter)',
                letterSpacing: '0.01em',
              }}
            >
              <CheckCircle className="w-3.5 h-3.5 shrink-0 text-[#cfa85a]" strokeWidth={2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        </div>
      </div>

      {/* ── RIGHT PANEL — cutout car (PNG w/ alpha) ── */}
      {/* Mobile: in-flow block; Desktop: absolute right half */}
      <div
        ref={carRef}
        className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 w-full lg:w-[50%] flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-10 lg:pb-0"
        style={{ zIndex: 3, opacity: 0 }}
      >
        {/* Soft spotlight behind the car */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 72% 58% at 50% 52%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 48%, transparent 75%)',
          }}
        />

        <div className="relative flex h-[56vw] sm:h-[48vw] lg:h-[min(82vh,760px)] xl:h-[min(88vh,820px)] w-full max-w-[min(96vw,900px)] items-center justify-center overflow-hidden">
          <Image
            src={HERO_CAR}
            alt="Premium detailed sports car"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) min(88vw, 560px), (max-width: 1024px) 86vw, (max-width: 1536px) 40vw, 608px"
            className="relative z-0 object-contain object-center drop-shadow-[0_16px_56px_rgba(0,0,0,0.5)]"
          />
          {/* Decorative shine constrained to car area (no image mask request) */}
          <div
            className="hero-shine-mask pointer-events-none absolute inset-0 z-1 overflow-hidden"
            aria-hidden
          >
            <div className="hero-shine-core">
              <div className="shine-sweep shine-sweep--hero" />
              <div className="shine-sweep shine-sweep--hero-delayed" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom left corner tag — desktop only */}
      <div
        className="hidden lg:flex absolute bottom-8 left-10 xl:left-14 items-center gap-3 z-10"
      >
        <div className="w-6 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
        <span
          className="text-premium-micro tracking-[0.3em]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {t.hero.scroll}
        </span>
        <div
          className="hero-scroll-pulse w-px h-8"
          style={{ background: 'linear-gradient(180deg, #C9A84C, transparent)' }}
        />
      </div>
    </section>
  );
}
