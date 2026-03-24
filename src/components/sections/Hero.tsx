'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Split headline into spans for letter-by-letter animation
    const h1 = headlineRef.current;
    const words = h1.querySelectorAll('.hero-word');

    tl.fromTo(
      words,
      { y: 80, opacity: 0, skewY: 4 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      }
    )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        badgesRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );
  }, []);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background: dark gradient simulating a studio-lit car environment */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(200,212,222,0.04) 0%, transparent 60%),
            linear-gradient(180deg, #070709 0%, #0d0d12 40%, #14141c 100%)
          `,
        }}
      />

      {/* Carbon fiber overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 6px),
            repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 6px)
          `,
        }}
      />

      {/* Animated light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 top-1/3 w-px h-40 opacity-20"
          style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }}
          animate={{ y: [-100, 400], opacity: [0, 0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-1/4 top-0 w-px h-60 opacity-15"
          style={{ background: 'linear-gradient(180deg, transparent, #C8D4DE, transparent)' }}
          animate={{ y: [-200, 600], opacity: [0, 0.3, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, delay: 2, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-0 top-1/4 w-px h-32 opacity-15"
          style={{ background: 'linear-gradient(180deg, transparent, #C9A84C, transparent)' }}
          animate={{ y: [-80, 300], opacity: [0, 0.3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, delay: 1, ease: 'linear' }}
        />
      </div>

      {/* Large background text */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden pointer-events-none select-none"
        style={{ height: '40%' }}
      >
        <span
          className="text-[18vw] font-black leading-none tracking-tighter opacity-[0.025]"
          style={{ fontFamily: 'var(--font-bebas)', color: '#C9A84C' }}
        >
          DETAILING
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#C9A84C',
            fontFamily: 'var(--font-inter)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Premium Auto Detailing Studio
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="overflow-hidden mb-2"
          style={{ fontFamily: 'var(--font-bebas)', lineHeight: 0.9 }}
        >
          <div className="overflow-hidden">
            <span
              className="hero-word inline-block text-[clamp(4rem,12vw,11rem)] leading-none"
              style={{
                background: 'linear-gradient(135deg, #E8EEF4 0%, #C8D4DE 30%, #ffffff 50%, #C8D4DE 70%, #8E9EAB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              YOUR CAR
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              className="hero-word inline-block text-[clamp(4rem,12vw,11rem)] leading-none"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 40%, #9A7B2E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DESERVES
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              className="hero-word inline-block text-[clamp(4rem,12vw,11rem)] leading-none"
              style={{
                background: 'linear-gradient(135deg, #E8EEF4 0%, #C8D4DE 30%, #ffffff 50%, #C8D4DE 70%, #8E9EAB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PERFECTION
            </span>
          </div>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-lg md:text-xl max-w-2xl mx-auto mt-6 mb-8 italic"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)', opacity: 0 }}
        >
          From paint correction to ceramic coating — we restore, protect, and perfect every surface with obsessive precision.
        </p>

        {/* Trust badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
          style={{ opacity: 0 }}
        >
          {[
            { value: '500+', label: 'Cars Detailed' },
            { value: '5★', label: 'Avg Rating' },
            { value: '5 Yrs', label: 'Experience' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span
                className="text-2xl font-black"
                style={{ fontFamily: 'var(--font-orbitron)', color: '#C9A84C' }}
              >
                {value}
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={scrollToServices}
            className="btn-shimmer group flex items-center gap-2 px-8 py-4 rounded text-sm font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(201,168,76,0.5), 0 0 60px rgba(201,168,76,0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Book a Service
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-8 py-4 rounded text-sm font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            style={{
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#C9A84C',
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.1em',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Play className="w-4 h-4" />
            See Our Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
          Scroll
        </span>
        <ChevronDown className="w-5 h-5" style={{ color: '#C9A84C' }} />
      </motion.button>
    </section>
  );
}
