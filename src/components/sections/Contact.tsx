'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const services = [
  'Polish Exterior',
  'Ceramic Coating',
  'PPF Wrapping',
  'Interior Detailing',
  'Paint Correction',
  'Full Package',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--carbon-950)' }}
    >
      {/* Blueprint grid bg */}
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

      {/* Decorative BOOK text — vertical, left side */}
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

      <div className="max-w-6xl mx-auto px-8 md:px-14 lg:pl-32 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
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
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-px" style={{ background: '#C9A84C' }} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              Response within 24 hours
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* ── FORM — 60% ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div
                  className="text-6xl mb-4"
                  style={{ fontFamily: 'var(--font-bebas)', color: '#C9A84C' }}
                >
                  ✓
                </div>
                <h3
                  className="text-3xl font-black mb-2"
                  style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
                >
                  Request Received
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                >
                    We&apos;ll confirm your booking details within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="float-input-wrap">
                    <input type="text" id="name" placeholder=" " required />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  <div className="float-input-wrap">
                    <input type="tel" id="phone" placeholder=" " required />
                    <label htmlFor="phone">Phone Number</label>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="float-input-wrap">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>

                {/* Row 3 */}
                <div className="float-input-wrap">
                  <input type="text" id="car" placeholder=" " />
                  <label htmlFor="car">Car Make & Model (optional)</label>
                </div>

                {/* Service select */}
                <div className="float-input-wrap">
                  <select id="service" defaultValue="">
                    <option value="" disabled> </option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <label htmlFor="service">Service Required</label>
                </div>

                {/* Message */}
                <div className="float-input-wrap">
                  <textarea id="message" rows={3} placeholder=" " />
                  <label htmlFor="message">Additional Notes</label>
                </div>

                {/* Submit — paint-spray button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="relative w-full py-5 text-sm font-black tracking-[0.2em] uppercase overflow-hidden cursor-pointer transition-all duration-300 group"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                      color: '#070709',
                      fontFamily: 'var(--font-inter)',
                      border: 'none',
                      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(201,168,76,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {/* Paint-spray sweep on hover */}
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse 80% 100% at -10% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.5s ease',
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 group-hover:[--spray-tx:100%]">
                      Book My Appointment
                    </span>
                    {/* Additional shimmer */}
                    <span
                      className="absolute top-0 left-[-60%] w-[40%] h-full pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                        transform: 'skewX(-15deg)',
                        animation: 'none',
                        transition: 'opacity 0s',
                      }}
                      aria-hidden="true"
                    />
                  </button>
                  <p
                    className="text-center text-xs mt-3"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    No commitment. Free inspection included.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── CONTACT INFO — 40% ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Contact cards */}
            {[
              { icon: Phone, label: 'Phone', value: '+40 721 000 000', sub: 'Mon–Sat, 9:00–18:00' },
              { icon: Mail, label: 'Email', value: 'contact@apexdetail.ro', sub: '24h response guaranteed' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="shrink-0 w-11 h-11 flex items-center justify-center"
                  style={{
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'white', fontFamily: 'var(--font-inter)' }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  >
                    {sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Location — stylised, no map embed */}
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-11 h-11 flex items-center justify-center"
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <MapPin className="w-4 h-4" style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <p
                  className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Location
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'white', fontFamily: 'var(--font-inter)' }}
                >
                  Str. Industriei 14, București
                </p>
                {/* Stylised location marker SVG */}
                <div className="mt-4">
                  <svg viewBox="0 0 220 120" className="w-full max-w-[220px]" fill="none">
                    {/* Map grid */}
                    <rect x="0" y="0" width="220" height="120" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    {[20, 40, 60, 80, 100].map((y) => (
                      <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
                    ))}
                    {[44, 88, 132, 176].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
                    ))}
                    {/* Road lines */}
                    <line x1="0" y1="60" x2="220" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    <line x1="110" y1="0" x2="110" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    {/* Pin */}
                    <path d="M110 10 Q124 10 124 24 Q124 38 110 55 Q96 38 96 24 Q96 10 110 10Z" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="1.5" />
                    <circle cx="110" cy="26" r="5" fill="#C9A84C" />
                    {/* Pulse ring */}
                    <circle cx="110" cy="26" r="10" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.4">
                      <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-11 h-11 flex items-center justify-center"
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <Clock className="w-4 h-4" style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <p
                  className="text-[10px] font-bold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                >
                  Working Hours
                </p>
                {[
                  { day: 'Mon – Fri', time: '09:00 – 19:00' },
                  { day: 'Saturday', time: '09:00 – 16:00' },
                  { day: 'Sunday', time: 'By appointment' },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between gap-6 mb-1">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                    >
                      {day}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: 'white', fontFamily: 'var(--font-inter)' }}
                    >
                      {time}
                    </span>
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
