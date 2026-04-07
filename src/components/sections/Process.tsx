'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, ChevronDown, Droplets, Search, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Step {
  number: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tag: string;
  cue?: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Inspection & Assessment',
    desc: 'We assess paint condition, contamination, and finish goals before any work begins.',
    icon: Search,
    tag: 'Inspection',
    cue: 'START',
  },
  {
    number: '02',
    title: 'Safe Wash & Decontamination',
    desc: 'A controlled wash, iron removal, and clay treatment prepare the surface properly.',
    icon: Droplets,
    tag: 'Wash',
  },
  {
    number: '03',
    title: 'Correction / Preparation',
    desc: 'Paint correction or surface prep is performed based on the selected treatment plan.',
    icon: Sparkles,
    tag: 'Correction',
  },
  {
    number: '04',
    title: 'Protection Application',
    desc: 'Ceramic coating, PPF, or finishing protection is applied with precise technique.',
    icon: ShieldCheck,
    tag: 'Protection',
  },
  {
    number: '05',
    title: 'Final Review',
    desc: 'The vehicle is reviewed under proper lighting and delivered only when standards are met.',
    icon: CheckCircle2,
    tag: 'Delivery',
    cue: 'FINISH',
  },
];

const desktopNodeX = [136, 102, 132, 108, 128];

function buildDesktopPath(index: number, total: number) {
  const currentX = desktopNodeX[index];
  const nextX = index === total - 1 ? currentX : desktopNodeX[index + 1];
  const topY = index === 0 ? 18 : 0;
  const bottomY = index === total - 1 ? 162 : 180;

  return `M ${currentX} ${topY}
    L ${currentX} 104
    Q ${currentX} 122 ${nextX} 138
    L ${nextX} ${bottomY}`;
}

function buildMobilePath(index: number, total: number) {
  const topY = index === 0 ? 18 : 0;
  const bottomY = index === total - 1 ? 144 : 160;
  return `M 28 ${topY} L 28 ${bottomY}`;
}

function ProcessNode({
  left,
  isLast,
  icon: Icon,
  compact = false,
  reduceMotion,
}: {
  left: number;
  isLast: boolean;
  icon: LucideIcon;
  compact?: boolean;
  reduceMotion: boolean;
}) {
  const size = compact ? 50 : 50;
  const iconSize = compact ? 25 : 25;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{
        opacity: 1,
        scale: reduceMotion ? 1 : [0.92, 1.02, 1],
      }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.45, ease: 'easeOut' }}
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ left }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
          clipPath: 'polygon(24% 0, 76% 0, 100% 50%, 76% 100%, 24% 100%, 0 50%)',
          background: 'linear-gradient(180deg, rgba(14,14,18,0.96), rgba(9,9,12,0.92))',
          border: '1px solid rgba(201,168,76,0.34)',
          boxShadow: isLast ? '0 0 0 1px rgba(201,168,76,0.16), inset 0 0 18px rgba(201,168,76,0.08)' : '0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <Icon
          style={{
            width: iconSize,
            height: iconSize,
            color: isLast ? '#e2c06a' : 'rgba(201,168,76,0.86)',
          }}
        />
      </div>

      {isLast && (
        <div className="absolute left-[calc(100%+10px)] top-1/2 flex -translate-y-1/2 items-center gap-[3px]">
          <span className="h-4 w-px bg-[#d8bb6c]/70" />
          <span className="h-4 w-px bg-[#d8bb6c]/40" />
        </div>
      )}
    </motion.div>
  );
}

function ProcessTrack({
  index,
  total,
  icon,
  cue,
  isLast,
  reduceMotion,
}: {
  index: number;
  total: number;
  icon: LucideIcon;
  cue?: string;
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const desktopPath = buildDesktopPath(index, total);
  const mobilePath = buildMobilePath(index, total);
  const desktopLeft = desktopNodeX[index];

  return (
    <>
      <div className="relative h-full min-h-[152px] lg:hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 160" preserveAspectRatio="none" aria-hidden="true">
          <path d={mobilePath} stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
          <path
            d={mobilePath}
            stroke="rgba(201,168,76,0.28)"
            strokeWidth="1.1"
            strokeDasharray="6 10"
            fill="none"
          />
          <motion.path
            d={mobilePath}
            initial={{ pathLength: 0, opacity: 0.5 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: reduceMotion ? 0.35 : 0.7, ease: 'easeInOut', delay: index * 0.06 }}
            stroke="rgba(216,187,108,0.72)"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>

        {cue && (
          <span
            className="absolute rounded-sm border border-[#c9a84c]/16 bg-[rgba(8,8,11,0.88)] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              left: 28,
              transform: 'translateX(-50%)',
              top: index === 0 ? '-0.8rem' : 'auto',
              bottom: isLast ? '-0.95rem' : 'auto',
              color: 'rgba(226,192,106,0.86)',
              fontFamily: 'var(--font-orbitron)',
            }}
          >
            {cue}
          </span>
        )}

        <ProcessNode left={28} isLast={isLast} icon={icon} compact reduceMotion={reduceMotion} />

        {!isLast && (
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 3, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
            className="absolute left-[20px] top-[69%]"
          >
            <ChevronDown className="h-3 w-3" style={{ color: 'rgba(201,168,76,0.48)' }} />
          </motion.div>
        )}
      </div>

      <div className="relative hidden h-full min-h-[180px] lg:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 180" preserveAspectRatio="none" aria-hidden="true">
          <path d={desktopPath} stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
          <path
            d={desktopPath}
            stroke="rgba(201,168,76,0.26)"
            strokeWidth="1.1"
            strokeDasharray="7 11"
            fill="none"
          />
          <motion.path
            d={desktopPath}
            initial={{ pathLength: 0, opacity: 0.45 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: reduceMotion ? 0.35 : 0.85, ease: 'easeInOut', delay: index * 0.07 }}
            stroke="rgba(216,187,108,0.76)"
            strokeWidth="1.3"
            fill="none"
          />
        </svg>

        {cue && (
          <span
            className="absolute rounded-sm border border-[#c9a84c]/16 bg-[rgba(8,8,11,0.9)] px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              left: desktopLeft,
              transform: 'translateX(-50%)',
              top: index === 0 ? '-0.85rem' : 'auto',
              bottom: isLast ? '-1.05rem' : 'auto',
              color: 'rgba(226,192,106,0.86)',
              fontFamily: 'var(--font-orbitron)',
            }}
          >
            {cue}
          </span>
        )}

        <ProcessNode left={desktopLeft} isLast={isLast} icon={icon} reduceMotion={reduceMotion} />

        {!isLast && (
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 4, 0], opacity: [0.22, 0.58, 0.22] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 }}
            className="absolute top-[68%]"
            style={{ left: desktopLeft - 6 }}
          >
            <ChevronDown className="h-3.5 w-3.5" style={{ color: 'rgba(201,168,76,0.42)' }} />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default function Process() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="process"
      className="relative overflow-hidden py-20 md:py-22"
      style={{ background: 'var(--carbon-800)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)' }}
        />
        <div
          className="absolute inset-x-0 top-[22%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.3 : 0.55 }}
          className="mb-10 md:mb-12 max-w-3xl text-center md:text-left"
        >
          <span className="section-badge mb-2">
            Our Method
          </span>
          <h2
            className="text-5xl font-black leading-none md:text-7xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
          >
            PIT STOP{' '}
            <span style={{ color: 'var(--gold-soft)' }}>PROCESS</span>
          </h2>

          <div className="mt-4 flex items-center justify-center md:justify-start gap-2.5 md:gap-3">
            <div className="h-px w-10 md:w-14" style={{ background: 'rgba(201,168,76,0.55)' }} />
            <span className="text-center text-[11px] uppercase tracking-widest text-text-muted md:text-left md:text-[12px]" style={{ fontFamily: 'var(--font-inter)' }}>
              From inspection to final delivery
            </span>
          </div>
        </motion.div>

        <div className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.number}
                className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10"
              >
                <div className={index === 0 ? '' : 'border-t border-white/5'}>
                  <ProcessTrack
                    index={index}
                    total={steps.length}
                    icon={Icon}
                    cue={step.cue}
                    isLast={isLast}
                    reduceMotion={reduceMotion}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: index * 0.06, ease: 'easeOut' }}
                  className={`relative py-6 lg:py-8 flex items-center ${index === 0 ? '' : 'border-t border-white/5'}`}
                >
                  <div
                    className="pointer-events-none absolute right-0 top-4 select-none"
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: 'clamp(4.2rem, 9vw, 7.8rem)',
                      lineHeight: 0.9,
                      letterSpacing: '0.02em',
                      color: index === 0 ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.045)',
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="relative z-10 max-w-2xl">
                    <div className="mb-2 flex items-center gap-3">
                      <h3
                        className="text-xl font-black md:text-3xl"
                        style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className="max-w-xl text-[0.95rem] md:text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.3 : 0.55, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center gap-4 lg:ml-[220px]"
        >
          <Link
            href="/contact"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-sm border border-[#C9A84C]/40 bg-[rgba(201,168,76,0.06)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#e1c273] transition-colors duration-200 hover:bg-[rgba(201,168,76,0.1)]"
            style={{
              fontFamily: 'var(--font-inter)',
            }}
          >
            Start Your Booking
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-text-muted md:text-[12px]" style={{ fontFamily: 'var(--font-inter)' }}>
            Same-day response guaranteed
          </span>
        </motion.div>
      </div>
    </section>
  );
}
