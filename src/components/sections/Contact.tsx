'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const services = [
  'Polish Exterior',
  'Interior Detailing',
  'Ceramic Coating',
  'PPF Wrapping',
  'Leather Restoration',
  'Wheel & Caliper Paint',
  'Full Detail Package',
  'Other / Custom',
];

const inputStyle = {
  background: 'var(--carbon-800)',
  border: '1px solid rgba(255,255,255,0.07)',
  color: 'white',
  fontFamily: 'var(--font-inter)',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    car: '',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-6 carbon-texture">
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Book a Service"
          title="Get In"
          highlight="Touch"
          subtitle="Fill out the form and we will respond within 2 hours during business hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center py-20 rounded-2xl"
                style={{ background: 'var(--carbon-800)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <CheckCircle className="w-14 h-14 mb-5" style={{ color: '#C9A84C' }} />
                <h3
                  className="text-2xl font-black mb-3"
                  style={{ fontFamily: 'var(--font-orbitron)', color: 'white' }}
                >
                  Message Sent!
                </h3>
                <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                  Thank you! We will contact you within 2 hours to confirm your booking.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                  style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 flex flex-col gap-5"
                style={{ background: 'var(--carbon-800)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {/* Row: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="px-4 py-3 rounded-lg"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+40 700 000 000"
                      className="px-4 py-3 rounded-lg"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="px-4 py-3 rounded-lg"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                  />
                </div>

                {/* Row: Service + Car */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                      Service *
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 rounded-lg appearance-none cursor-pointer"
                      style={{ ...inputStyle, color: form.service ? 'white' : 'rgba(154,154,176,0.6)' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                    >
                      <option value="" disabled>Select service</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: '#14141c' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                      Car Model
                    </label>
                    <input
                      type="text"
                      name="car"
                      value={form.car}
                      onChange={handleChange}
                      placeholder="BMW M4 2022"
                      className="px-4 py-3 rounded-lg"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg"
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your vehicle and what you need..."
                    className="px-4 py-3 rounded-lg resize-none"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.07)')}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-shimmer w-full py-4 rounded-lg text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                    color: '#070709',
                    fontFamily: 'var(--font-inter)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(201,168,76,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  Send Booking Request
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  We respond within 2 hours during business hours.
                </p>
              </form>
            )}
          </motion.div>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+40 700 000 000',
                  href: 'tel:+40700000000',
                },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: 'Chat instantly',
                  href: 'https://wa.me/40700000000',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'contact@apexdetail.ro',
                  href: 'mailto:contact@apexdetail.ro',
                },
                {
                  icon: Clock,
                  label: 'Hours',
                  value: 'Mon–Sat 8:00–19:00',
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-xl transition-all duration-200"
                  style={{
                    background: 'var(--carbon-800)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: 'white', fontFamily: 'var(--font-inter)' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'white')}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium" style={{ color: 'white', fontFamily: 'var(--font-inter)' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{ background: 'var(--carbon-800)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <MapPin className="w-5 h-5" style={{ color: '#C9A84C' }} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  Location
                </div>
                <p className="text-sm font-medium" style={{ color: 'white', fontFamily: 'var(--font-inter)' }}>
                  Str. Exemplu nr. 1, Sector 1<br />
                  București, România
                </p>
              </div>
            </div>

            {/* Map embed placeholder */}
            <div
              className="rounded-xl overflow-hidden relative"
              style={{ height: '260px', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91433.44268432696!2d25.9489!3d44.4268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b7%3A0x58125b2a1f8a0de9!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sro!4v1711234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) brightness(0.6)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              />
              {/* Map overlay for style */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(7,7,9,0.6)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
