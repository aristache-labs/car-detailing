'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '@/components/providers/LanguageProvider';

const HERO_CAR = '/images/hero-car-no-bg.png';

/** Matches <Image fill className="object-contain object-center" /> — shine only on car pixels */
const shineMaskStyle: CSSProperties = {
  WebkitMaskImage: `url(${HERO_CAR})`,
  maskImage: `url(${HERO_CAR})`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
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
      {/* Carbon grid bg */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
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

      {/* Speed lines behind car — desktop only */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
        {[20, 35, 50, 65, 75].map((top, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: `${top}%`,
              right: 0,
              width: `${40 + i * 10}%`,
              background: `rgba(201,168,76,${0.04 + i * 0.015})`,
              animation: `speed-slide ${3 + i * 0.4}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── LEFT PANEL — editorial; desktop: content block nudged toward car ── */}
      <div
        ref={leftRef}
        className="relative z-10 w-full lg:w-[52%] xl:w-[50%] px-6 sm:px-8 md:px-14 lg:pl-10 lg:pr-4 xl:pl-14 xl:pr-8 pt-28 pb-6 lg:py-0"
      >
        <div className="lg:max-w-xl xl:max-w-2xl lg:ml-auto lg:mr-2 xl:mr-6 2xl:mr-10">
        {/* Eyebrow — refined metallic divider */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center lg:justify-start gap-3 mb-8 lg:mb-9"
        >
          <div className="flex items-center gap-2 shrink-0" aria-hidden>
            <span
              className="block h-px w-8 bg-[#CFA85A]/40"
              style={{ boxShadow: '0 0 20px rgba(207,168,90,0.12)' }}
            />
            <span
              className="block h-px w-10 bg-linear-to-r from-[#CFA85A]/40 to-transparent"
            />
          </div>
          <span
            className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#B8924A]/90"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {t.hero.eyebrow}
          </span>
        </motion.div>

        {/* Main headline — single-line chrome + warm metallic */}
        <div
          ref={titleRef}
          className="filter-[drop-shadow(0_6px_24px_rgba(0,0,0,0.45))] text-center lg:text-left"
          style={{ opacity: 0 }}
        >
          <h1
            className="leading-[0.92] tracking-[0.01em] mb-0 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            <span
              className="inline-block text-[clamp(5rem,13vw,12rem)] lg:text-[clamp(4.75rem,7.5vw,10.5rem)]"
              style={{
                background:
                  'linear-gradient(165deg, #f0f4f8 0%, #dce0e0 35%, #ffffff 48%, #c8d0d0 58%, #8a9aa8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.92,
              }}
            >
              APEX
            </span>
            <span className="relative inline-block ml-[2.0em] lg:ml-[2.0em]">
              <span
                className="inline-block text-[clamp(5rem,13vw,12rem)] lg:text-[clamp(4.75rem,7.5vw,10.5rem)]"
                style={{
                  background:
                    'linear-gradient(165deg, #ead8b8 0%, #d6b36a 28%, #cfa85a 52%, #b8924a 78%, #8a6a38 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 0.92,
                }}
              >
                DETAIL
              </span>
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '10%',
                  left: '-4%',
                  width: '108%',
                  height: '8px',
                  background: 'linear-gradient(90deg, transparent, rgba(207,168,90,0.22), transparent)',
                  transform: 'rotate(-6deg)',
                  filter: 'blur(1px)',
                }}
              />
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
          <button
            type="button"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-cta-primary group"
          >
            {t.hero.primaryCta}
            <ArrowRight className="w-[15px] h-[15px] shrink-0 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.25} />
          </button>

          <button
            type="button"
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-cta-secondary group"
          >
            <PhoneCall className="w-[15px] h-[15px] shrink-0 opacity-90" strokeWidth={2} />
            {t.hero.secondaryCta}
          </button>
        </div>

        {/* Stats — editorial rhythm, not dashboard widgets */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-10 mt-12 lg:mt-14">
          {[
            { v: '500+', l: t.hero.carsDetailed },
            { v: '5★', l: t.hero.rating },
            { v: '5 Yrs', l: t.hero.experience },
          ].map((stat, i) => (
            <div key={stat.l} className="flex items-center">
              {i > 0 && (
                <div
                  className="hidden sm:block w-px h-11 mr-8 sm:mr-10 shrink-0 bg-linear-to-b from-transparent via-white/15 to-transparent"
                  aria-hidden
                />
              )}
              <div className="min-w-0 text-center lg:text-left">
                <p
                  className="text-[1.75rem] sm:text-[1.875rem] font-semibold tabular-nums tracking-tight text-[#cfa85a]"
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                  {stat.v}
                </p>
                <p
                  className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6a6a7a]"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {stat.l}
                </p>
              </div>
            </div>
          ))}
        </div>
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
            unoptimized
            sizes="(max-width: 1024px) 96vw, 900px"
            className="relative z-0 object-contain object-center drop-shadow-[0_16px_56px_rgba(0,0,0,0.5)]"
          />
          {/* Shine sweeps — masked to car alpha (no rectangular box) */}
          <div
            className="pointer-events-none absolute inset-0 z-1 overflow-hidden"
            style={shineMaskStyle}
            aria-hidden
          >
            <div className="shine-sweep shine-sweep--hero" />
            <div className="shine-sweep shine-sweep--hero-delayed" />
          </div>
        </div>
      </div>

      {/* Bottom left corner tag — desktop only */}
      <div
        className="hidden lg:flex absolute bottom-8 left-10 xl:left-14 items-center gap-3 z-10"
      >
        <div className="w-6 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
        >
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(180deg, #C9A84C, transparent)' }}
        />
      </div>
    </section>
  );
}
