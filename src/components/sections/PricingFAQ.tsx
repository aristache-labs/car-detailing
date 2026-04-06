'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'Why do the cards show starting prices instead of fixed totals?',
    a: 'They give you a real baseline for each service while still leaving room for vehicle size, paint condition, interior wear, or added protection work discovered during inspection.',
  },
  {
    q: 'What usually changes the final quote?',
    a: 'Vehicle size, defect severity, contamination level, leather condition, PPF coverage area, and whether services are combined into one studio booking can all change the final scope.',
  },
  {
    q: 'Can I combine multiple services into one visit?',
    a: 'Yes. Many vehicles need correction, coating, interior work, and specialty detailing together. We can build one tailored quote and recommend the right service order.',
  },
  {
    q: 'Is PPF priced the same way as the other services?',
    a: 'PPF is still presented with a starting point, but final pricing depends more heavily on coverage, film type, edge complexity, and the exact panels being protected.',
  },
] as const;

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-white/[0.07] py-12 md:py-16" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-14">
        <div className="mb-8 text-center md:mb-10 md:text-left">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d2b872]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Pricing FAQ
          </p>
          <h2
            className="mt-2 text-[2.4rem] font-black uppercase leading-[0.92] tracking-[0.04em] text-white md:text-[3rem]"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            Clear pricing, <span className="text-[#C9A84C]">without guesswork</span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8c2d0] md:text-[15px]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            The pricing page sets direction. Inspection confirms the exact service scope, final quote, and the right combination for your vehicle.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-sm border border-white/8 bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left md:px-5"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="text-sm font-semibold leading-relaxed text-white/92 md:text-[15px]">{item.q}</span>
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
                        className="border-t border-white/8 px-4 pb-4 pt-3 text-sm leading-relaxed text-[#c6cfdb] md:px-5 md:text-[15px]"
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
