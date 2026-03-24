'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  Mail,
  MapPinned,
  Clock3,
  CarFront,
  ClipboardCheck,
  ShieldCheck,
  ArrowRight,
  Route,
} from 'lucide-react';

const SERVICE_CHIPS = [
  'Exterior Detail',
  'Interior Detail',
  'Ceramic Coating',
  'PPF',
  'Paint Correction',
  'Bespoke Quote',
];

const NEXT_STEPS = [
  {
    icon: CarFront,
    label: 'Tell us your vehicle',
    desc: 'Share your car details and the service you have in mind.',
  },
  {
    icon: ClipboardCheck,
    label: 'We review & recommend',
    desc: 'We assess your request and confirm the right package.',
  },
  {
    icon: ShieldCheck,
    label: 'Confirmed within 24h',
    desc: 'Receive a tailored quote with free inspection included.',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedChip, setSelectedChip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChipClick = (chip: string) => {
    setSelectedChip(prev => prev === chip ? '' : chip);
    const sel = document.getElementById('service') as HTMLSelectElement | null;
    if (sel) sel.value = chip === selectedChip ? '' : chip;
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Decorative vertical BOOK text */}
      <div
        className="absolute left-0 top-0 bottom-0 hidden lg:flex items-center justify-center pointer-events-none select-none"
        style={{ width: '8rem' }}
        aria-hidden="true"
      >
        <span
          className="font-black"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '8rem',
            lineHeight: 1,
            color: 'rgba(201,168,76,0.04)',
            letterSpacing: '0.02em',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          BOOK
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 lg:pl-32 relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center lg:text-left"
        >
          <h2
            className="text-5xl md:text-7xl font-black leading-none"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.04em' }}
          >
            BOOK YOUR{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SESSION
            </span>
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 mt-2.5">
            <div className="w-16 lg:w-10 h-px" style={{ background: '#C9A84C' }} />
            <span className="text-premium-micro tracking-[0.22em]" style={{ fontFamily: 'var(--font-inter)' }}>
              Tell us your vehicle and goals — we&apos;ll recommend the right package within 24 hours.
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">

          {/* ── LEFT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-3 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(17,17,26,0.92) 0%, rgba(10,10,15,0.96) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.38)',
            }}
          >
            {/* Top gold accent line */}
            <div
              className="absolute left-0 top-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 50%, transparent 100%)',
              }}
            />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 px-8 text-center"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.35)',
                  }}
                >
                  <ShieldCheck className="w-6 h-6" style={{ color: '#C9A84C' }} />
                </div>
                <h3
                  className="text-3xl font-black mb-2"
                  style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
                >
                  Request Received
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                  We&apos;ll review your vehicle and confirm the best package within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3">
                <p
                  className="text-[8px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}
                >
                  Service Request
                </p>

                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="float-input-wrap">
                    <input type="text" id="name" placeholder=" " required />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  <div className="float-input-wrap">
                    <input type="tel" id="phone" placeholder=" " required />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="float-input-wrap">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>

                {/* Row 3: Vehicle */}
                <div className="float-input-wrap">
                  <input type="text" id="car" placeholder=" " />
                  <label htmlFor="car">Vehicle Make &amp; Model</label>
                </div>

                {/* Service chips */}
                <div>
                  <p
                    className="text-[8px] font-bold tracking-[0.2em] uppercase mb-1.5"
                    style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}
                  >
                    Quick select
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {SERVICE_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className="px-2 py-[3px] text-[9px] font-semibold tracking-[0.12em] uppercase cursor-pointer transition-all duration-200"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          background: selectedChip === chip ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.01)',
                          border: `1px solid ${selectedChip === chip ? 'rgba(201,168,76,0.45)' : 'rgba(255,255,255,0.08)'}`,
                          color: selectedChip === chip ? '#d8bb6c' : 'var(--text-soft)',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedChip !== chip) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = 'rgba(201,168,76,0.22)';
                            el.style.background = 'rgba(201,168,76,0.04)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedChip !== chip) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = 'rgba(255,255,255,0.08)';
                            el.style.background = 'rgba(255,255,255,0.01)';
                          }
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service select */}
                <div className="float-input-wrap">
                  <select id="service" defaultValue="">
                    <option value="" disabled> </option>
                    {SERVICE_CHIPS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <label htmlFor="service">Requested Service</label>
                </div>

                {/* Notes */}
                <div className="float-input-wrap">
                  <textarea id="message" rows={2} placeholder=" " />
                  <label htmlFor="message">Project Notes</label>
                </div>

                {/* Submit */}
                <div className="pt-0.5">
                  <button
                    type="submit"
                    className="btn-shimmer relative w-full py-3 text-[11px] font-black tracking-[0.18em] uppercase overflow-hidden cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(165deg, #e1c98e 0%, #cfa85a 46%, #b18a45 100%)',
                      color: '#070709',
                      fontFamily: 'var(--font-inter)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(80,56,22,0.22), 0 6px 20px rgba(0,0,0,0.4)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(80,56,22,0.24), 0 8px 24px rgba(0,0,0,0.46), 0 0 16px rgba(201,168,76,0.16)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(80,56,22,0.22), 0 6px 20px rgba(0,0,0,0.4)';
                    }}
                  >
                    <span className="relative z-10">Request My Appointment</span>
                    <ArrowRight className="relative z-10 w-3.5 h-3.5 shrink-0 translate-y-[0.5px]" />
                  </button>
                  <p
                    className="text-center mt-2 text-readable-muted"
                    style={{ fontSize: '0.67rem', fontFamily: 'var(--font-inter)' }}
                  >
                    No commitment · Free visual inspection included
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── RIGHT: 3 PREMIUM PANELS ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="lg:col-span-2 flex flex-col gap-2.5"
          >

            {/* Panel 1: Direct Line */}
            <div
              className="p-3.5 sm:p-4.5"
              style={{
                background: 'linear-gradient(160deg, rgba(17,17,26,0.88) 0%, rgba(10,10,15,0.92) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className="w-8 h-8 shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.22)' }}
                >
                  <PhoneCall className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                </div>
                <p className="text-premium-micro tracking-[0.18em]" style={{ fontFamily: 'var(--font-inter)' }}>
                  Direct Line
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(201,168,76,0.55)' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'white', fontFamily: 'var(--font-inter)' }}>+40 721 000 000</p>
                    <p className="text-readable-muted" style={{ fontSize: '0.68rem', fontFamily: 'var(--font-inter)' }}>Mon – Sat, 09:00 – 18:00</p>
                  </div>
                </div>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(201,168,76,0.55)' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'white', fontFamily: 'var(--font-inter)' }}>contact@apexdetail.ro</p>
                    <p className="text-readable-muted" style={{ fontSize: '0.68rem', fontFamily: 'var(--font-inter)' }}>24h response guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Visit the Studio */}
            <div
              className="p-3.5 sm:p-4.5"
              style={{
                background: 'linear-gradient(160deg, rgba(17,17,26,0.88) 0%, rgba(10,10,15,0.92) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className="w-8 h-8 shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.22)' }}
                >
                  <MapPinned className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                </div>
                <p className="text-premium-micro tracking-[0.18em]" style={{ fontFamily: 'var(--font-inter)' }}>
                  Visit the Studio
                </p>
              </div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: 'white', fontFamily: 'var(--font-inter)' }}>
                Str. Industriei 14, București
              </p>
              <div className="space-y-0.5 mb-2.5">
                {[
                  { day: 'Mon – Fri', time: '09:00 – 19:00' },
                  { day: 'Saturday', time: '09:00 – 16:00' },
                  { day: 'Sunday', time: 'By appointment' },
                ].map(({ day, time }) => (
                  <div key={day} className="flex items-center justify-between gap-4">
                    <span className="text-readable-muted" style={{ fontSize: '0.7rem', fontFamily: 'var(--font-inter)' }}>{day}</span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>{time}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase group transition-colors duration-200"
                style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
              >
                <Route className="w-3 h-3" />
                Plan Your Visit
                <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Panel 3: What Happens Next */}
            <div
              className="p-3.5 sm:p-4.5"
              style={{
                background: 'linear-gradient(160deg, rgba(17,17,26,0.88) 0%, rgba(10,10,15,0.92) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.22)' }}
                >
                  <Clock3 className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                </div>
                <p className="text-premium-micro tracking-[0.18em]" style={{ fontFamily: 'var(--font-inter)' }}>
                  What Happens Next
                </p>
              </div>
              <div className="space-y-2.5">
                {NEXT_STEPS.map(({ icon: Icon, label, desc }, idx) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div className="flex flex-col items-center shrink-0 pt-0.5">
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.2)' }}
                      >
                        <Icon className="w-2.5 h-2.5" style={{ color: '#C9A84C' }} />
                      </div>
                      {idx < NEXT_STEPS.length - 1 && (
                        <div className="w-px flex-1 mt-1.5" style={{ background: 'rgba(201,168,76,0.15)', minHeight: '12px' }} />
                      )}
                    </div>
                    <div className="pb-1.5">
                      <p className="text-[11px] font-semibold mb-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                        {label}
                      </p>
                      <p className="text-readable-muted leading-relaxed" style={{ fontSize: '0.67rem', fontFamily: 'var(--font-inter)' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
