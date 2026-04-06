'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

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
        <div className="mb-8 text-center md:mb-10 md:text-left">
          <span
            className="mb-3 inline-flex px-4 py-2 text-sm font-black uppercase tracking-[0.2em] md:text-base"
            style={{
              color: '#E2C06A',
              fontFamily: 'var(--font-orbitron)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
              border: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            Quick quote
          </span>
          <h2
            className="text-4xl font-black leading-none md:text-6xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
          >
            REQUEST A{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F0D892 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CALLBACK
            </span>
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl text-sm leading-relaxed md:mx-0"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Short form for a fast reply — full details and photo uploads on the{' '}
            <Link href="/contact" className="font-medium text-[#C9A84C] underline-offset-2 hover:text-[#e8d49a]">
              contact page
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/8 bg-[linear-gradient(160deg,rgba(17,17,26,0.92)_0%,rgba(10,10,15,0.96)_100%)] shadow-[0_16px_48px_rgba(0,0,0,0.38)]">
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
                  <select
                    id="compact-service"
                    name="service"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={inputBase}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
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
    </section>
  );
}
