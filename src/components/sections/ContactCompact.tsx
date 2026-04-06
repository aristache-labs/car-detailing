'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import DarkSelect from '@/components/ui/DarkSelect';

const SERVICE_OPTIONS = [
  'Exterior Detailing',
  'Paint Correction',
  'Ceramic Coating',
  'PPF Protection',
  'Interior Detailing',
  'Leather Care & Restoration',
  'Wheel & Caliper Detailing',
  'Engine Bay Detailing',
  'Not Sure / Need Guidance',
] as const;

const SERVICE_SELECT_OPTIONS = SERVICE_OPTIONS.map((s) => ({ value: s, label: s }));

const inputBase =
  'w-full rounded-sm border border-white/12 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition-[border-color,box-shadow] [color-scheme:dark] placeholder:text-white/25 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/35';

const labelBase = 'mb-1.5 block text-[9px] font-bold uppercase tracking-[0.16em]';

/** Homepage compact lead form — full intake on /contact */
export default function ContactCompact() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!service) return;
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section id="contact-compact" className="relative overflow-hidden py-12 md:py-14" style={{ background: 'var(--carbon-950)' }}>
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:gap-x-14">
          {/* Copy + form share one grid: no “floating” headline vs centered card */}
          <div className="relative pl-5 text-left sm:pl-6 lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-8 xl:pr-10">
            <div
              className="absolute left-0 top-1.5 h-[min(100%,14rem)] w-[3px] rounded-full bg-linear-to-b from-[#e8c768] via-[#C9A84C] to-transparent"
              aria-hidden
            />
            <span
              className="inline-flex items-center px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] md:text-xs"
              style={{
                color: '#E2C06A',
                fontFamily: 'var(--font-orbitron)',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
                border: '1px solid rgba(201,168,76,0.28)',
              }}
            >
              Quick quote
            </span>
            <h2
              className="mt-5 text-[clamp(2.5rem,6vw,4.25rem)] font-black leading-[0.88] tracking-[0.06em] sm:mt-6"
              style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
            >
              <span className="block text-white">REQUEST A</span>
              <span className="mt-1 block bg-linear-to-br from-[#F5E6B8] via-[#D4B05C] to-[#9a7630] bg-clip-text text-transparent sm:mt-0">
                CALLBACK
              </span>
            </h2>

            <div
              className="mt-7 h-px w-14 bg-linear-to-r from-[#C9A84C]/70 to-transparent sm:mt-8"
              aria-hidden
            />
            <p
              className="mt-5 max-w-88 text-[13px] leading-[1.75] text-white/58 sm:text-sm"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Short form for a fast reply — full details and photo uploads on the{' '}
              <Link href="/contact" className="font-semibold text-[#d4b86a] underline decoration-[#C9A84C]/35 underline-offset-[3px] transition-colors hover:text-[#e8d49a]">
                contact page
              </Link>
              .
            </p>
            <ul
              className="mt-7 max-w-md space-y-3 text-[12px] leading-relaxed text-white/48 sm:text-[13px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A84C]/80" aria-hidden />
                Response within 24h on business days
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A84C]/80" aria-hidden />
                No spam — your details stay with Apex
              </li>
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="overflow-visible rounded-xl border border-white/8 bg-[linear-gradient(160deg,rgba(17,17,26,0.92)_0%,rgba(10,10,15,0.96)_100%)] shadow-[0_16px_48px_rgba(0,0,0,0.38)]">
              <div
                className="h-[2px] w-full"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.55) 50%, transparent 100%)' }}
              />
              {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center px-6 py-12 text-center"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.35)',
                }}
              >
                <ShieldCheck className="h-6 w-6" style={{ color: '#C9A84C' }} />
              </div>
              <p className="text-lg font-black tracking-[0.06em]" style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}>
                Received
              </p>
              <p className="mt-2 max-w-sm text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                We&apos;ll get back within 24 hours with next steps.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
                <div className="sm:col-span-1">
                  <label htmlFor="compact-name" className={labelBase} style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}>
                    Full name<span className="ml-0.5 text-[#C9A84C]">*</span>
                  </label>
                  <input id="compact-name" name="name" type="text" autoComplete="name" required className={inputBase} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="compact-phone" className={labelBase} style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}>
                    Phone<span className="ml-0.5 text-[#C9A84C]">*</span>
                  </label>
                  <input id="compact-phone" name="phone" type="tel" autoComplete="tel" required className={inputBase} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="compact-email" className={labelBase} style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}>
                    Email<span className="ml-0.5 text-[#C9A84C]">*</span>
                  </label>
                  <input id="compact-email" name="email" type="email" autoComplete="email" required className={inputBase} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="compact-vehicle" className={labelBase} style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}>
                    Vehicle<span className="ml-0.5 text-[#C9A84C]">*</span>
                  </label>
                  <input id="compact-vehicle" name="vehicle" type="text" required placeholder="Make / model" className={inputBase} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="compact-service" className={labelBase} style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}>
                    Service interest<span className="ml-0.5 text-[#C9A84C]">*</span>
                  </label>
                  <DarkSelect
                    id="compact-service"
                    name="service"
                    value={service}
                    onChange={setService}
                    options={SERVICE_SELECT_OPTIONS}
                    placeholder="Select a service"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="compact-message" className={labelBase} style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}>
                    Goals / notes
                  </label>
                  <textarea
                    id="compact-message"
                    name="message"
                    rows={3}
                    className={`${inputBase} min-h-20 resize-y`}
                    placeholder="Briefly describe what you want improved or protected."
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="btn-shimmer cursor-pointer px-8 py-3 text-[11px] font-black uppercase tracking-[0.18em]"
                  style={{
                    background: 'linear-gradient(165deg, #e1c98e 0%, #cfa85a 46%, #b18a45 100%)',
                    color: '#070709',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  Submit request
                </button>
                <Link
                  href="/contact"
                  className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C]/90 hover:text-[#e8d49a] sm:text-left"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Full form with photos →
                </Link>
              </div>
            </form>
          )}
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
