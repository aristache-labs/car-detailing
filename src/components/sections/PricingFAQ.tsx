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
    <section className="border-t border-white/[0.07] py-10 md:py-14" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-14">
        <div className="mb-10 text-center md:mb-11 md:text-left">
          <div className="flex justify-center md:justify-start">
            <span className={FAQ_BADGE_CLASS} style={{ fontFamily: 'var(--font-inter)' }}>
              Pricing FAQ
            </span>
          </div>
          <h2
            className="mt-3 font-black uppercase leading-[0.96] tracking-[0.028em] text-white/92 max-md:text-[clamp(1.5rem,5.2vw,1.8rem)] md:mt-3.5 md:text-[clamp(1.8rem,3vw,2.2rem)]"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            Clear pricing, <span className="text-[#cab06a]">without guesswork</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-[min(100%,26rem)] text-[13px] leading-[1.58] text-[#a4adb8] md:mx-0 md:mt-5 md:text-[14px] md:leading-[1.62]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            The pricing page sets direction. Inspection confirms the exact service scope, final quote, and the right combination for your vehicle.
          </p>
        </div>

        <div className="space-y-1.5">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-sm border border-[rgba(201,168,76,0.15)] bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors duration-200 hover:bg-[rgba(255,255,255,0.028)] active:bg-[rgba(255,255,255,0.04)] md:px-5 md:py-[0.9rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]/35"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug tracking-[0.015em] text-white/93 md:text-[14px]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#b89a4a]/95 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2}
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
                        className="border-t border-[rgba(201,168,76,0.1)] bg-[rgba(5,5,7,0.45)] px-4 pb-[1.1rem] pt-4 text-[13px] leading-[1.62] text-[#aeb6c2] md:px-5 md:pb-5 md:text-[14px] md:leading-[1.65]"
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
