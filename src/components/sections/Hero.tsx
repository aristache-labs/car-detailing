'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/components/providers/LanguageProvider';

const HERO_CAR = '/images/hero-car-no-bg.png';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLUListElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const carMediaRef = useRef<HTMLDivElement>(null);
  const handoffScrimRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!heroRef.current) return;
    const heroEl = heroRef.current;

    const mm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = mm.matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Ensure all elements are visible for reduced-motion users
        gsap.set(
          [
            atmosphereRef.current,
            contentWrapRef.current,
            titleRef.current,
            subRef.current,
            ctaRef.current,
            trustRef.current,
            carRef.current,
            handoffScrimRef.current,
          ],
          { opacity: 1, x: 0, y: 0, clearProps: 'transform' }
        );
        gsap.set(handoffScrimRef.current, { opacity: 0 });
        return;
      }

      // Set initial hidden state imperatively — keeps JSX clean and ensures
      // no invisible content for non-JS / reduced-motion users
      gsap.set([titleRef.current, subRef.current, ctaRef.current, trustRef.current], {
        opacity: 0,
        y: 0,
      });
      gsap.set(carRef.current, { opacity: 0, x: 0 });

      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.08 });

      introTl
        // Atmosphere depth bleeds in first — sets the stage
        .fromTo(atmosphereRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        // Headline hits with authority while atmosphere is still settling
        .fromTo(
          titleRef.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' },
          '-=0.35'
        )
        // Supporting copy follows tight behind
        .fromTo(
          subRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.38'
        )
        // CTAs arrive as a unit
        .fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.46 },
          '-=0.3'
        )
        // Trust strip settles last in the copy column
        .fromTo(
          trustRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.22'
        )
        // Car slides in and settles — overlapping copy reveal, finishes last
        .fromTo(
          carRef.current,
          { x: 52, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.95, ease: 'power4.out' },
          '-=0.7'
        );

      gsap.to(contentWrapRef.current, {
        y: -22,
        opacity: 0.86,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: '+=48%',
          scrub: 0.85,
        },
      });

      gsap.to(carMediaRef.current, {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: '+=48%',
          scrub: 0.85,
        },
      });

      gsap.to(handoffScrimRef.current, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: '+=44%',
          scrub: 0.9,
        },
      });
    }, heroEl);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === heroEl) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-cinematic relative overflow-hidden flex flex-col lg:flex-row lg:items-center min-h-screen"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Subtle left radial accent */}
      <div
        ref={atmosphereRef}
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
        <div
          ref={contentWrapRef}
          className="hero-content-wrap lg:max-w-xl xl:max-w-2xl lg:ml-auto lg:mr-2 xl:mr-6 2xl:mr-10"
        >
        {/* Main headline — two-line premium value proposition */}
        <div
          ref={titleRef}
          className="hero-title-wrap filter-[drop-shadow(0_6px_24px_rgba(0,0,0,0.45))] text-center lg:text-left"
        >
          <h1
            className="leading-[0.92] tracking-[0.012em] mb-0"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            <span
              className="block text-[clamp(3.55rem,6vw,7rem)]"
              style={{
                color: '#f3f5f7',
                lineHeight: 0.92,
              }}
            >
              {t.hero.headlineTop}
            </span>
            <span
              className="block text-[clamp(2.8rem,4.45vw,5.4rem)]"
              style={{
                color: '#d6b36a',
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
          className="mt-5 mb-8 mx-auto lg:mx-0 max-w-[min(100%,29rem)] lg:max-w-104 leading-[1.68] text-[15px] lg:text-[15px] xl:text-[0.97rem] text-center lg:text-left"
          style={{
            color: 'rgba(214, 218, 226, 0.85)',
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
            letterSpacing: '0.018em',
          }}
        >
          {t.hero.description}
        </p>

        {/* CTAs — paired premium system */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row lg:flex-row lg:items-stretch gap-3 sm:gap-3.5 justify-center lg:justify-start"
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
        <ul
          ref={trustRef}
          className="hero-trust-strip mt-9 lg:mt-11"
        >
          {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((item, index) => (
            <li
              key={item}
              className="hero-trust-item flex items-center justify-center lg:justify-start gap-2.5 text-[12px] lg:text-[12.5px]"
              style={{
                color: 'rgba(206, 210, 218, 0.8)',
                fontFamily: 'var(--font-inter)',
                letterSpacing: '0.015em',
              }}
            >
              <CheckCircle className="w-3.5 h-3.5 shrink-0 text-[#cfa85a]" strokeWidth={1.9} />
              <span>{item}</span>
              {index < 2 ? <span className="hero-trust-separator" aria-hidden /> : null}
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
        style={{ zIndex: 3 }}
      >
        {/* Soft spotlight behind the car */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 72% 58% at 50% 52%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 48%, transparent 75%)',
          }}
        />

        <div
          ref={carMediaRef}
          className="hero-media-plane relative flex h-[56vw] sm:h-[48vw] lg:h-[min(82vh,760px)] xl:h-[min(88vh,820px)] w-full max-w-[min(96vw,900px)] items-center justify-center overflow-hidden"
        >
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

      <div
        ref={handoffScrimRef}
        className="hero-handoff-scrim pointer-events-none absolute inset-x-0 bottom-0 h-[28vh]"
        style={{ zIndex: 4 }}
        aria-hidden
      />
    </section>
  );
}
