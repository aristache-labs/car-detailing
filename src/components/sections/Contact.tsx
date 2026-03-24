'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Clock, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';

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

const CONDITION_OPTIONS = [
  'Excellent / Well Maintained',
  'Light Swirls / Minor Wear',
  'Moderate Defects / Visible Wear',
  'Heavy Defects / Needs Assessment',
  'Not Sure',
] as const;

const TRUST_BULLETS = [
  'Free inspection available',
  'Quote within 24 hours',
  'No obligation',
  'Premium products only',
  'Written warranty on selected services',
];

const TRUST_STUDIO_HOURS = [
  { label: 'Mon – Fri', time: '09:00 – 19:00' },
  { label: 'Saturday', time: '09:00 – 16:00' },
  { label: 'Sunday', time: 'By appointment' },
] as const;

const SERVICE_SELECT_OPTIONS = SERVICE_OPTIONS.map((s) => ({ value: s, label: s }));

const CONDITION_SELECT_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Optional — select condition' },
  ...CONDITION_OPTIONS.map((c) => ({ value: c, label: c })),
];

const inputBase =
  'w-full rounded-sm border border-white/[0.12] bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition-[border-color,box-shadow] [color-scheme:dark] placeholder:text-white/25 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/35';

const labelBase =
  'mb-1.5 block text-[9px] font-bold uppercase tracking-[0.16em]';

const trustAsideSectionTitle =
  'mb-4 flex w-full items-center justify-center gap-3 text-center';

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={labelBase}
      style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-[#C9A84C]" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

function DarkSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const display = options.find((o) => o.value === value)?.label ?? placeholder;
  const showPlaceholderStyle = value === '' && !options.some((o) => o.value === '');

  return (
    <div className="relative" ref={wrapRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        className={`${inputBase} flex w-full cursor-pointer items-center justify-between gap-2 text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        style={
          error
            ? { borderColor: 'rgba(251, 191, 36, 0.45)', boxShadow: '0 0 0 1px rgba(251, 191, 36, 0.2)' }
            : undefined
        }
      >
        <span className={showPlaceholderStyle ? 'text-white/40' : undefined}>{display}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/45 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-60 mt-1 max-h-60 overflow-auto rounded-sm border border-white/12 bg-[#0c0c10] py-1 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {options.map((opt) => (
            <li key={opt.value === '' ? '__empty' : opt.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === opt.value}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  value === opt.value
                    ? 'bg-[#C9A84C]/15 text-[#f0d892]'
                    : 'text-white/90 hover:bg-white/6'
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [fileHint, setFileHint] = useState('');
  const [service, setService] = useState('');
  const [condition, setCondition] = useState('');
  const [serviceError, setServiceError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) {
      setServiceError(true);
      return;
    }
    setServiceError(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    if (!f || f.length === 0) {
      setFileHint('');
      return;
    }
    if (f.length > 3) {
      setFileHint('Please choose up to 3 photos.');
      e.target.value = '';
      return;
    }
    setFileHint('');
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-14 md:py-18"
      style={{ background: 'var(--carbon-950)' }}
    >
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
            Request a Quote
          </span>
          <h2
            className="text-5xl font-black leading-none md:text-7xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
          >
            TELL US ABOUT YOUR{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F0D892 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              VEHICLE
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2.5 md:justify-start md:gap-3">
            <div className="h-px w-10 md:w-14" style={{ background: 'rgba(201,168,76,0.55)' }} />
            <span
              className="text-center text-premium-micro tracking-[0.2em] md:text-left"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Tell us what your vehicle needs and we&apos;ll reply with a tailored recommendation within 24
              hours.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-8 overflow-hidden rounded-xl"
            style={{
              background: 'linear-gradient(160deg, rgba(17,17,26,0.92) 0%, rgba(10,10,15,0.96) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.38)',
            }}
          >
            <div
              className="h-[2px] w-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.55) 50%, transparent 100%)',
              }}
            />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center px-6 py-14 text-center sm:px-10"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.35)',
                  }}
                >
                  <ShieldCheck className="h-7 w-7" style={{ color: '#C9A84C' }} />
                </div>
                <h3
                  className="mb-2 text-3xl font-black tracking-[0.05em]"
                  style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
                >
                  Request Received
                </h3>
                <p className="max-w-sm text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                  We&apos;ll review your request and reply with a tailored recommendation within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 lg:p-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-name" required>
                      Full Name
                    </FieldLabel>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required className={inputBase} />
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-phone" required>
                      Phone Number
                    </FieldLabel>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-email" required>
                      Email
                    </FieldLabel>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-vehicle" required>
                      Vehicle Make / Model
                    </FieldLabel>
                    <input id="contact-vehicle" name="vehicle" type="text" required className={inputBase} />
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-year">Vehicle Year</FieldLabel>
                    <input
                      id="contact-year"
                      name="year"
                      type="number"
                      inputMode="numeric"
                      min={1980}
                      max={2030}
                      placeholder=""
                      className={inputBase}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-service" required>
                      Service Needed
                    </FieldLabel>
                    <DarkSelect
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(v) => {
                        setService(v);
                        setServiceError(false);
                      }}
                      options={SERVICE_SELECT_OPTIONS}
                      placeholder="Select a service"
                      error={serviceError}
                    />
                    {serviceError ? (
                      <p className="mt-1 text-[11px] font-medium text-amber-400/95" role="alert">
                        Please select a service.
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-condition">Paint / Interior Condition</FieldLabel>
                    <DarkSelect
                      id="contact-condition"
                      name="condition"
                      value={condition}
                      onChange={setCondition}
                      options={CONDITION_SELECT_OPTIONS}
                      placeholder="Optional — select condition"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <FieldLabel htmlFor="contact-date">Preferred Date</FieldLabel>
                    <input id="contact-date" name="preferredDate" type="date" className={inputBase} />
                  </div>
                </div>

                <div className="mt-3">
                  <FieldLabel htmlFor="contact-message">Message / Goals</FieldLabel>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    className={`${inputBase} min-h-22 resize-y`}
                    placeholder=""
                  />
                  <p
                    className="mt-1.5 text-[11px] leading-snug"
                    style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)' }}
                  >
                    Tell us what you&apos;d like improved, protected, or restored.
                  </p>
                </div>

                <div className="mt-4">
                  <FieldLabel htmlFor="contact-photos">Photos</FieldLabel>
                  <input
                    id="contact-photos"
                    name="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className={`${inputBase} cursor-pointer py-2 text-xs file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-wider file:text-white`}
                  />
                  <p
                    className="mt-1.5 text-[11px] leading-snug"
                    style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)' }}
                  >
                    Optional: Upload 2–3 photos for a more accurate estimate — helpful for paint defects,
                    swirl marks, interior wear, or PPF quotes.
                  </p>
                  {fileHint ? (
                    <p className="mt-1 text-[11px] font-medium text-amber-400/90" role="status">
                      {fileHint}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="btn-shimmer relative w-full cursor-pointer overflow-hidden py-3.5 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300"
                    style={{
                      background: 'linear-gradient(165deg, #e1c98e 0%, #cfa85a 46%, #b18a45 100%)',
                      color: '#070709',
                      fontFamily: 'var(--font-inter)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(80,56,22,0.22), 0 6px 20px rgba(0,0,0,0.4)',
                    }}
                  >
                    <span className="relative z-10">Request Your Quote</span>
                  </button>
                  <p
                    className="mt-2.5 text-center text-[11px] leading-relaxed"
                    style={{ color: 'var(--text-soft)', fontFamily: 'var(--font-inter)' }}
                  >
                    We&apos;ll review your request and reply with a tailored recommendation within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="flex flex-col overflow-hidden rounded-xl lg:col-span-4"
            style={{
              background: 'linear-gradient(165deg, rgba(17,17,26,0.92) 0%, rgba(10,10,15,0.97) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.38)',
            }}
            aria-label="Why book with us and contact details"
          >
            <div
              className="h-[2px] w-full shrink-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)',
              }}
            />

            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
              <header className="mb-5">
                <p
                  className="mb-2 text-[10px] font-bold tracking-[0.22em]"
                  style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
                >
                  WHY CLIENTS BOOK WITH US
                </p>
                <h3
                  className="text-[1.65rem] font-black leading-none tracking-[0.06em] sm:text-[1.85rem]"
                  style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
                >
                  Fast, Clear, Professional
                </h3>
              </header>

              <div
                className="border-l-2 border-[#C9A84C]/35 pl-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <ul className="space-y-3">
                  {TRUST_BULLETS.map((line) => (
                    <li
                      key={line}
                      className="text-[13px] leading-snug"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="my-6 h-px w-full shrink-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
                aria-hidden
              />

              <div className="space-y-5" style={{ fontFamily: 'var(--font-inter)' }}>
                <div>
                  <div className={trustAsideSectionTitle}>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                    <p
                      className="shrink-0 text-[11px] font-bold uppercase tracking-[0.26em] text-[#E2C06A]"
                      style={{ textShadow: '0 0 24px rgba(201,168,76,0.15)' }}
                    >
                      Contact
                    </p>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                      style={{
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.22)',
                      }}
                      aria-hidden
                    >
                      <Phone className="h-4 w-4" style={{ color: '#C9A84C' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--text-soft)' }}>
                        Phone
                      </p>
                      <a
                        href="tel:+40721000000"
                        className="mt-0.5 block text-base font-semibold tracking-wide text-white transition-colors hover:text-[#f0d892]"
                      >
                        +40 721 000 000
                      </a>
                      <p className="mt-1 text-[11px]" style={{ color: 'var(--text-soft)' }}>
                        Mon – Sat · 09:00 – 18:00
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/40721000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-[#C9A84C]/28 bg-[#C9A84C]/6 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8d49a] transition-colors hover:border-[#C9A84C]/45 hover:bg-[#C9A84C]/10"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
                    WhatsApp — quick message
                  </a>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className={trustAsideSectionTitle}>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                    <p
                      className="shrink-0 text-[11px] font-bold uppercase tracking-[0.26em] text-[#E2C06A]"
                      style={{ textShadow: '0 0 24px rgba(201,168,76,0.15)' }}
                    >
                      Address
                    </p>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                      style={{
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.22)',
                      }}
                      aria-hidden
                    >
                      <MapPin className="h-4 w-4" style={{ color: '#C9A84C' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">București</p>
                      <p className="mt-0.5 text-[12px]" style={{ color: 'var(--text-soft)' }}>
                        Studio by appointment
                      </p>
                      <p className="mt-2 text-[12px] leading-snug" style={{ color: 'var(--text-secondary)' }}>
                        Str. Industriei 14
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                      style={{
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.22)',
                      }}
                      aria-hidden
                    >
                      <Clock className="h-4 w-4" style={{ color: '#C9A84C' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--text-soft)' }}>
                        Opening hours
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {TRUST_STUDIO_HOURS.map(({ label, time }) => (
                          <li
                            key={label}
                            className="flex items-baseline justify-between gap-4 text-[12px] leading-tight"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <span style={{ color: 'var(--text-soft)' }}>{label}</span>
                            <span className="shrink-0 font-medium tabular-nums text-white/85">{time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
