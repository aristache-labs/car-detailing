'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Search, Wrench, Sparkles, CheckCircle } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tag: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Inspection & Quote',
    desc: 'We assess paint condition, contamination level, and client goals. A detailed quote is issued within hours — no surprises.',
    icon: Search,
    tag: 'Assessment',
  },
  {
    number: '02',
    title: 'Prep & Decon',
    desc: 'Full wash, iron decontamination, clay bar treatment, and paint measurement before any polish or coating touches the vehicle.',
    icon: Wrench,
    tag: 'Preparation',
  },
  {
    number: '03',
    title: 'Treatment Applied',
    desc: 'Multi-stage machine polishing, ceramic coating cure, or PPF installation — executed with professional equipment and zero shortcuts.',
    icon: Sparkles,
    tag: 'Execution',
  },
  {
    number: '04',
    title: 'Final Review',
    desc: "Post-treatment inspection under LED and natural light. We don't release the vehicle until it meets our standard — and yours.",
    icon: CheckCircle,
    tag: 'Delivery',
  },
];

/* Hexagonal bolt marker */
function HexBolt({ active }: { active: boolean }) {
  return (
    <div
      className="hex-bolt w-10 h-10 flex items-center justify-center shrink-0"
      style={{
        background: active ? 'linear-gradient(135deg, #C9A84C, #FFD700)' : 'var(--carbon-700)',
        border: active ? 'none' : '1px solid rgba(201,168,76,0.3)',
        transition: 'background 0.3s',
      }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: active ? '#070709' : 'rgba(201,168,76,0.5)' }}
      />
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--carbon-800)' }}
    >
      {/* Dashed race track line — vertical, centered left of content */}
      <div
        className="absolute hidden lg:block"
        style={{
          top: '10%',
          bottom: '10%',
          left: '18%',
          width: '2px',
          backgroundImage: 'repeating-linear-gradient(180deg, #C9A84C 0px, #C9A84C 14px, transparent 14px, transparent 26px)',
          opacity: 0.35,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-14 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2
            className="text-5xl md:text-7xl font-black leading-none"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.04em' }}
          >
            PIT STOP{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PROCESS
            </span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mt-3">
            <div className="w-20 md:w-12 h-px" style={{ background: '#C9A84C' }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              From booking to keys in hand
            </span>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.08 }}
                className="relative flex items-start gap-6 lg:gap-10"
              >
                {/* Large race number — ghost behind */}
                <div
                  className="shrink-0 select-none hidden sm:block"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                    lineHeight: 1,
                    color: i === 0 ? 'rgba(201,168,76,0.18)' : 'rgba(255,255,255,0.05)',
                    letterSpacing: '-0.02em',
                    minWidth: '5rem',
                    textAlign: 'right',
                  }}
                >
                  {step.number}
                </div>

                {/* Connector line + hex bolt */}
                <div className="flex flex-col items-center shrink-0 pt-3">
                  <HexBolt active={i === 0} />
                  {i < steps.length - 1 && (
                    <div
                      className="w-px mt-1"
                      style={{
                        height: '90px',
                        backgroundImage: 'repeating-linear-gradient(180deg, rgba(201,168,76,0.4) 0px, rgba(201,168,76,0.4) 8px, transparent 8px, transparent 16px)',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-10 lg:pb-14 pt-2">
                  {/* Tag */}
                  <span
                    className="inline-block px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase mb-3"
                    style={{
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: '#C9A84C',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {step.tag}
                  </span>

                  {/* Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3
                      className="text-2xl md:text-3xl font-black"
                      style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
                    >
                      {step.title}
                    </h3>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: '#C9A84C' }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base leading-relaxed max-w-lg"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shimmer px-10 py-4 text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)',
            }}
          >
            Start Your Booking
          </button>
          <span
            className="text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Same-day response guaranteed
          </span>
        </motion.div>
      </div>
    </section>
  );
}
