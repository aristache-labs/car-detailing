'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    q: 'Why are final prices quoted after inspection?',
    a: 'Paint condition, vehicle size, and your protection goals all change the scope. Inspection keeps recommendations honest and avoids guesswork pricing.',
  },
  {
    q: 'What typically changes the price?',
    a: 'Heavy defects, larger paint surfaces, multi-stage correction, PPF coverage, and interior condition can all increase time and materials versus a baseline package.',
  },
  {
    q: 'How does PPF quoting work?',
    a: 'PPF is quoted by coverage: front-end, partial, or full-body. Film type (clear vs matte) and panel complexity are confirmed during inspection.',
  },
  {
    q: 'Do packages include ceramic coating?',
    a: 'Our Protection-oriented packages include ceramic application where listed. Correction-focused work may pair correction stages with coating — your quote will spell it out.',
  },
] as const;

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-white/[0.07] py-12 md:py-16" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-8 md:px-14">
        <h2
          className="mb-8 text-center text-2xl font-black tracking-[0.06em] md:text-left md:text-3xl"
          style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
        >
          PRICING <span style={{ color: '#C9A84C' }}>FAQ</span>
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-lg border border-white/8 bg-white/2"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="text-sm font-semibold text-white/90">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#C9A84C] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p
                        className="border-t border-white/6 px-4 pb-3 pt-2 text-sm leading-relaxed text-white/65"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
