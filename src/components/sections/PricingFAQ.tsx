'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

/** Same visual language as gallery badges, slightly larger for section prominence. */
const FAQ_BADGE_CLASS =
  'inline-flex max-w-[min(100%,12rem)] shrink-0 items-center rounded-[2px] border border-[rgba(201,168,76,0.28)] bg-[rgba(201,168,76,0.1)] px-2.5 py-1 text-[10px] font-bold uppercase leading-tight tracking-[0.13em] text-[#ddbb70] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:max-w-[min(100%,18rem)] md:px-4 md:py-1.5 md:text-[11px] md:tracking-[0.15em]';

const FAQ_COPY = {
  en: {
    eyebrow: 'Pricing FAQ',
    titleLead: 'Clear pricing,',
    titleAccent: 'without guesswork',
    intro:
      'The pricing page sets direction. Inspection confirms the exact service scope, final quote, and the right combination for your vehicle.',
    cta: 'Request Inspection Quote',
    items: [
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
    ],
  },
  ro: {
    eyebrow: 'Întrebări Frecvente',
    titleLead: 'Prețuri clare,',
    titleAccent: 'fără estimări vagi',
    intro:
      'Pagina de prețuri oferă direcția inițială. Inspecția confirmă exact serviciile necesare, oferta finală și combinația potrivită pentru mașina ta.',
    cta: 'Solicită Ofertă După Inspecție',
    items: [
      {
        q: 'De ce cardurile afișează prețuri de pornire și nu totaluri fixe?',
        a: 'Oferă un reper realist pentru fiecare serviciu, dar costul final poate varia în funcție de mărimea mașinii, starea vopselei, uzura interiorului sau protecțiile suplimentare descoperite la inspecție.',
      },
      {
        q: 'Ce influențează cel mai des oferta finală?',
        a: 'Dimensiunea mașinii, severitatea defectelor, gradul de contaminare, starea pielii, zona de acoperire PPF și combinația de servicii într-o singură programare.',
      },
      {
        q: 'Pot combina mai multe servicii într-o singură vizită?',
        a: 'Da. Multe mașini au nevoie de corecție, coating, interior și servicii speciale împreună. Putem construi o ofertă unică și ordinea optimă de lucru.',
      },
      {
        q: 'PPF este tarifat la fel ca celelalte servicii?',
        a: 'PPF pornește tot de la un preț orientativ, însă oferta finală depinde mai mult de acoperire, tipul de folie, complexitatea marginilor și panourile exacte protejate.',
      },
    ],
  },
} as const;

export default function PricingFAQ() {
  const { language } = useLanguage();
  const copy = FAQ_COPY[language];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-white/[0.07] py-10 md:py-14" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-14">
        <div className="mb-10 text-center md:mb-11 md:text-left">
          <div className="flex justify-center md:justify-start">
            <span className={FAQ_BADGE_CLASS} style={{ fontFamily: 'var(--font-inter)' }}>
              {copy.eyebrow}
            </span>
          </div>
          <h2
            className="mt-3 font-black uppercase leading-[0.96] tracking-[0.028em] text-white/92 max-md:text-[clamp(1.5rem,5.2vw,1.8rem)] md:mt-3.5 md:text-[clamp(1.8rem,3vw,2.2rem)]"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {copy.titleLead} <span className="text-[#cab06a]">{copy.titleAccent}</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-[min(100%,26rem)] text-[13px] leading-[1.58] text-[#a4adb8] md:mx-0 md:mt-5 md:text-[14px] md:leading-[1.62]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {copy.intro}
          </p>
        </div>

        <div className="space-y-1.5">
          {copy.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `pricing-faq-panel-${i}`;
            const buttonId = `pricing-faq-button-${i}`;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-sm border border-[rgba(201,168,76,0.15)] bg-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
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
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
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

        <div className="mt-8 flex justify-center md:justify-start">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#C9A84C]/45 bg-[rgba(201,168,76,0.06)] px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-[#e7c979] transition-colors hover:bg-[rgba(201,168,76,0.12)]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
