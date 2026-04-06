'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/** Same visual language as gallery badges, slightly larger for section prominence. */
const FAQ_BADGE_CLASS =
  'inline-flex max-w-[min(100%,12rem)] shrink-0 items-center rounded-[2px] border border-[rgba(201,168,76,0.28)] bg-[rgba(201,168,76,0.1)] px-2.5 py-1 text-[10px] font-bold uppercase leading-tight tracking-[0.13em] text-[#ddbb70] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:max-w-[min(100%,18rem)] md:px-4 md:py-1.5 md:text-[11px] md:tracking-[0.15em]';

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
        <div className="mb-9 text-center md:mb-10 md:text-left">
          <div className="flex justify-center md:justify-start">
            <span className={FAQ_BADGE_CLASS} style={{ fontFamily: 'var(--font-inter)' }}>
              Pricing FAQ
            </span>
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,6vw,2.875rem)] font-black uppercase leading-[0.94] tracking-[0.035em] text-white/95 md:mt-3.5"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            Clear pricing, <span className="text-[#d4b45c]">without guesswork</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-[13px] leading-[1.6] text-[#aeb8c6] md:mx-0 md:mt-5 md:text-[15px]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            The pricing page sets direction. Inspection confirms the exact service scope, final quote, and the right combination for your vehicle.
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-sm border border-[rgba(201,168,76,0.11)] bg-[rgba(255,255,255,0.025)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                  className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-[rgba(255,255,255,0.02)] md:px-5 md:py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]/35"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="min-w-0 flex-1 text-[14px] font-medium leading-snug tracking-[0.01em] text-white/95 md:text-[15px]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-[18px] w-[18px] shrink-0 text-[#c9a84c]/85 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.85}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p
                        className="border-t border-white/[0.07] bg-[rgba(0,0,0,0.18)] px-4 pb-4 pt-3.5 text-[13px] leading-[1.6] text-[#c4ccd6] md:px-5 md:text-[15px]"
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
