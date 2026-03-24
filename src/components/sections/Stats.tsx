'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const items = [
  { text: '500+ Vehicles Refined', iconSrc: '/images/trust-icons/car.png' },
  { text: '5+ Years Experience', iconSrc: '/images/trust-icons/calendar.png' },
  { text: 'Certified Premium Products', iconSrc: '/images/trust-icons/premium.png' },
  { text: 'Response Within 24h', iconSrc: '/images/trust-icons/time.png' },
];

// Border logic per index:
// mobile (2-col grid): right border on col 0 (even), bottom border on row 0 (i < 2)
// md+ (4-col grid):    right border on i < 3, no bottom border
const borderClass = (i: number) => {
  const right = i % 2 === 0 ? 'border-r' : '';
  const rightMd = i < 3 ? 'md:border-r' : 'md:border-r-0';
  const bottom = i < 2 ? 'border-b md:border-b-0' : '';
  return [right, rightMd, bottom].filter(Boolean).join(' ');
};

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      id="trust"
      className="mb-3 md:mb-5"
      style={{
        background: 'var(--carbon-900)',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        borderBottom: '1px solid rgba(255,255,255,0.045)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
                  fontSize: '0.78rem',
                  letterSpacing: '0.03em',
                  color: 'white',
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
