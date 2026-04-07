'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const items = [
  { value: 500, suffix: '+', label: 'Vehicles Refined', iconSrc: '/images/trust-icons/car.png' },
  { value: 5, suffix: '+', label: 'Years Experience', iconSrc: '/images/trust-icons/calendar.png' },
  { value: 100, suffix: '%', label: 'Certified Products', iconSrc: '/images/trust-icons/premium.png' },
  { value: 24, suffix: 'h', label: 'Response Time', iconSrc: '/images/trust-icons/time.png' },
];

function AnimatedCounter({
  value,
  suffix,
  trigger,
  reducedMotion,
}: {
  value: number;
  suffix: string;
  trigger: boolean;
  reducedMotion: boolean;
}) {
  const [display, setDisplay] = useState(reducedMotion ? value : 0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger || reducedMotion) {
      setDisplay(value);
      return;
    }
    const duration = 1100;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [trigger, value, reducedMotion]);

  return (
    <span className="tabular-nums" aria-label={`${value}${suffix}`}>
      {display}
      <span style={{ color: 'var(--gold-mid)' }}>{suffix}</span>
    </span>
  );
}

// Border logic per index:
// mobile (2-col grid): right border on col 0 (even), bottom border on row 0 (i < 2)
// md+ (4-col grid):    right border on i < 3, no bottom border
const borderClass = (i: number) => {
  const right = i % 2 === 0 ? 'border-r' : '';
  const rightMd = i < 3 ? 'md:border-r' : 'md:border-r-0';
  const bottom = i < 2 ? 'border-b md:border-b-0' : '';
  return [right, rightMd, bottom].filter(Boolean).join(' ');
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="trust"
      ref={ref}
      className="mb-3 md:mb-5"
      style={{
        background: 'var(--carbon-900)',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        borderBottom: '1px solid rgba(255,255,255,0.045)',
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className={`flex items-center gap-3 py-4 px-5 ${borderClass(i)}`}
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="shrink-0">
                <Image src={item.iconSrc} alt="" width={25} height={25} />
              </div>

              <div
                className="min-w-0"
                style={{
                  fontFamily: 'var(--font-inter)',
                  lineHeight: 1.25,
                }}
              >
                <div
                  className="text-base font-bold tracking-tight"
                  style={{ color: 'white', fontSize: '0.95rem' }}
                >
                  <AnimatedCounter
                    value={item.value}
                    suffix={item.suffix}
                    trigger={inView}
                    reducedMotion={reducedMotion}
                  />
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.03em',
                    color: 'var(--text-muted)',
                  }}
                >
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
