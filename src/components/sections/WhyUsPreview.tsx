'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { WHY_US_DIFFERENTIATORS } from '@/components/sections/WhyUs';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
  },
};

const headVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** Compact homepage block — same structure as Why Us page intro + grid; links to full Why Us + PIT STOP */
export default function WhyUsPreview() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="why-us-preview"
      className="relative border-y border-white/6 py-8 md:py-10"
      style={{ background: 'var(--carbon-900)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            className="text-center lg:col-span-2 lg:text-left"
            variants={headVariants}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link
                href="/why-us"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-[#C9A84C]/40 bg-[rgba(201,168,76,0.05)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e1c273] transition-colors duration-200 hover:bg-[rgba(201,168,76,0.1)]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Explore why us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/#process"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C9A84C]/90 transition-colors hover:text-[#e8d49a]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                See our process
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial={reducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-2">
              {WHY_US_DIFFERENTIATORS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={rowVariants}
                    className="pb-2.5 pt-0.5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon className="mt-px h-[22px] w-[22px] shrink-0" style={{ color: '#DFC16D' }} />
                      <div>
                        <h3
                          className="text-[11px] font-bold uppercase tracking-[0.12em] md:text-[12px]"
                          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-orbitron)' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="mt-1 text-[11px] leading-relaxed md:text-xs"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
