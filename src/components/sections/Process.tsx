'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, ChevronDown, Droplets, Search, ShieldCheck } from 'lucide-react';

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
    title: 'Inspection & Quote',
    desc: 'We assess paint condition, contamination level, and client goals. A detailed quote is issued within hours - no surprises.',
    icon: Search,
    tag: 'Assessment',
    cue: 'START',
  },
  {
    number: '02',
    title: 'Prep & Decon',
    desc: 'Full wash, iron decontamination, clay bar treatment, and paint measurement before any polish or coating touches the vehicle.',
    icon: Droplets,
    tag: 'Preparation',
  },
  {
    number: '03',
    title: 'Treatment Applied',
    desc: 'Multi-stage machine polishing, ceramic coating cure, or PPF installation - executed with professional equipment and zero shortcuts.',
    icon: ShieldCheck,
    tag: 'Execution',
  },
  {
    number: '04',
    title: 'Final Review',
    desc: "Post-treatment inspection under LED and natural light. We don't release the vehicle until it meets our standard - and yours.",
    icon: CheckCircle2,
    tag: 'Delivery',
    cue: 'FINISH',
  },
];

const desktopNodeX = [136, 102, 132, 112];

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
  compact = false,
  reduceMotion,
}: {
  left: number;
  isLast: boolean;
  compact?: boolean;
  reduceMotion: boolean;
}) {
  const size = compact ? 30 : 40;
  const innerSize = compact ? 7 : 9;

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
        <div
          className="rounded-full"
          style={{
            width: innerSize,
            height: innerSize,
            background: isLast ? '#d8bb6c' : 'rgba(201,168,76,0.74)',
            boxShadow: isLast ? '0 0 16px rgba(201,168,76,0.14)' : 'none',
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
  cue,
  isLast,
  reduceMotion,
}: {
  index: number;
  total: number;
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
            className="absolute text-[9px] uppercase tracking-[0.32em]"
            style={{
              left: 28,
              transform: 'translateX(-50%)',
              top: index === 0 ? '0.1rem' : 'auto',
              bottom: isLast ? '0.1rem' : 'auto',
              color: 'rgba(201,168,76,0.62)',
              fontFamily: 'var(--font-inter)',
            }}
          >
            {cue}
          </span>
        )}

        <ProcessNode left={28} isLast={isLast} compact reduceMotion={reduceMotion} />

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
            className="absolute text-[10px] uppercase tracking-[0.34em]"
            style={{
              left: desktopLeft,
              transform: 'translateX(-50%)',
              top: index === 0 ? '0.25rem' : 'auto',
              bottom: isLast ? '0.5rem' : 'auto',
              color: 'rgba(201,168,76,0.62)',
              fontFamily: 'var(--font-inter)',
            }}
          >
            {cue}
          </span>
        )}

        <ProcessNode left={desktopLeft} isLast={isLast} reduceMotion={reduceMotion} />

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
      className="relative overflow-hidden py-24"
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
        <div
          className="absolute inset-x-0 top-[58%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0.3 : 0.55 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12" style={{ background: 'rgba(201,168,76,0.7)' }} />
            <span
              className="text-[11px] uppercase tracking-[0.32em]"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              Technical workflow
            </span>
          </div>

          <h2
            className="text-5xl font-black leading-none md:text-7xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
          >
            PIT STOP{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F0D892 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PROCESS
            </span>
          </h2>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="h-px w-20 md:w-14" style={{ background: 'rgba(201,168,76,0.55)' }} />
            <span
              className="text-xs uppercase tracking-[0.26em]"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              From booking to keys in hand
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
                  className={`relative py-8 lg:py-10 ${index === 0 ? '' : 'border-t border-white/5'}`}
                >
                  <div
                    className="pointer-events-none absolute right-0 top-4 select-none"
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: 'clamp(4.2rem, 9vw, 7.8rem)',
                      lineHeight: 0.9,
                      letterSpacing: '0.02em',
                      color: index === 0 ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.045)',
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="relative z-10 max-w-2xl">
                    <span
                      className="mb-4 inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]"
                      style={{
                        color: '#cfb15d',
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.18)',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      <span className="h-1 w-1 rounded-full bg-[#cfb15d]" />
                      {step.tag}
                    </span>

                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center"
                        style={{
                          background: 'linear-gradient(180deg, rgba(201,168,76,0.13), rgba(201,168,76,0.04))',
                          border: '1px solid rgba(201,168,76,0.16)',
                          clipPath: 'polygon(18% 0, 100% 0, 82% 100%, 0 100%)',
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: '#d8bb6c' }} />
                      </div>

                      <h3
                        className="text-2xl font-black md:text-3xl"
                        style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className="max-w-xl text-sm leading-relaxed md:text-base"
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
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shimmer cursor-pointer px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
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
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Same-day response guaranteed
          </span>
        </motion.div>
      </div>
    </section>
  );
}
