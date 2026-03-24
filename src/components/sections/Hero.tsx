'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import gsap from 'gsap';

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

      {/* ── LEFT PANEL — flush-left editorial ── */}
      <div ref={leftRef} className="relative z-10 w-full lg:w-[55%] px-6 sm:px-8 md:px-14 lg:px-20 pt-28 pb-6 lg:py-0">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span
            className="w-10 h-px"
            style={{ background: '#C9A84C' }}
          />
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
          >
            Auto Detailing Studio
          </span>
        </motion.div>

        {/* Main headline — flush left, stacked */}
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h1
            className="leading-none mb-2"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {/* APEX — chrome */}
            <div
              className="block text-[clamp(5rem,13vw,12rem)]"
              style={{
                background: 'linear-gradient(135deg, #E8EEF4 0%, #C8D4DE 30%, #fff 50%, #C8D4DE 70%, #8E9EAB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 0.88,
              }}
            >
              APEX
            </div>
            {/* DETAIL — gold with slash accent */}
            <div className="relative inline-block">
              <span
                className="block text-[clamp(5rem,13vw,12rem)]"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 50%, #9A7B2E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 0.88,
                }}
              >
                DETAIL
              </span>
              {/* Diagonal slash through DETAIL */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: '10%',
                  left: '-4%',
                  width: '108%',
                  height: '8px',
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)',
                  transform: 'rotate(-6deg)',
                  filter: 'blur(1px)',
                }}
              />
            </div>
          </h1>
        </div>

        {/* Tagline */}
        <p
          ref={subRef}
          className="text-base md:text-lg mt-6 mb-10 max-w-md leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', opacity: 0 }}
        >
          Polish. Protect. Perfect. — Professional auto detailing that makes every vehicle impossible to ignore.
        </p>

        {/* CTAs — stacked left */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shimmer group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.12em] uppercase cursor-pointer transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(201,168,76,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Book a Service
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.12em] uppercase cursor-pointer transition-all duration-300"
            style={{
              border: '1px solid rgba(201,168,76,0.35)',
              color: '#C9A84C',
              background: 'transparent',
              fontFamily: 'var(--font-inter)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)';
              (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)';
            }}
          >
            <PhoneCall className="w-4 h-4" />
            Our Services
          </button>
        </div>

        {/* Mini stats row */}
        <div className="flex gap-6 sm:gap-8 mt-10 lg:mt-14">
          {[
            { v: '500+', l: 'Cars Detailed' },
            { v: '5★', l: 'Rating' },
            { v: '5 Yrs', l: 'Experience' },
          ].map(({ v, l }) => (
            <div key={l}>
              <div
                className="text-2xl font-black"
                style={{ fontFamily: 'var(--font-orbitron)', color: '#C9A84C' }}
              >
                {v}
              </div>
              <div
                className="text-[10px] tracking-widest uppercase mt-0.5"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
              >
                {l}
              </div>
            </div>
          ))}
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
        className="hidden lg:flex absolute bottom-8 left-20 items-center gap-3 z-10"
      >
        <div className="w-6 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Scroll to explore
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
