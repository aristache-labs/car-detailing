'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import DarkSelect from '@/components/ui/DarkSelect';
import { SITE_CONTACT } from '@/data/site-config';
import { buildLeadMailtoHref, buildLeadRequest, buildLeadWhatsAppHref, type LeadRequest } from '@/lib/lead-intake';

const SERVICE_OPTIONS = [
  'Exterior Detailing',
  'Paint Correction',
  'Ceramic Coating',
  'PPF',
  'Interior Detailing',
  'Leather Restoration',
  'Wheel & Caliper',
  'Engine Bay Detail',
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

/** Pricing-aligned micro-labels — Included Services / section eyebrow family */
const FIELD_LABEL_CLASS =
  'mb-2.5 block text-[12px] font-medium uppercase tracking-[0.12em] text-[#c3aa68]';

const BODY_FONT = 'var(--font-contact-body, var(--font-inter))';

const HELPER_TEXT_CLASS =
  'mt-2 max-w-[min(100%,36rem)] text-[11px] leading-relaxed text-[#aeb8c6]';

const inputBase =
  'w-full min-h-[2.75rem] rounded-sm border border-[rgba(201,168,76,0.12)] bg-[rgba(6,6,8,0.88)] px-3.5 py-2.5 text-[13px] leading-normal text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-[border-color,background-color,box-shadow] [color-scheme:dark] placeholder:text-white/38 hover:border-[rgba(201,168,76,0.2)] focus:border-[#a88b42] focus:bg-[rgba(255,255,255,0.04)] focus:ring-1 focus:ring-[#C9A84C]/20';

const trustAsideSectionTitle =
  'mb-3 flex w-full items-center justify-center gap-3 text-center';

/** Phone & Address: icon before copy, top-aligned, full-width row (left-aligned) */
const asideInlineIconRowClass = 'flex flex-row items-start justify-start gap-3.5 text-left';

/** Opening hours: icon left of copy, left-aligned (all breakpoints) */
const asideHoursRowClass = 'flex flex-row items-start gap-3.5 text-left';

/** Stronger sidebar section labels on small screens */
const asideSectionLabelClass =
  'shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#cfb77a] md:text-[11px] md:tracking-[0.11em] md:text-[#bea774]';

/** Phone + Opening hours sub-labels — higher contrast than body meta */
const asideFieldLabelClass =
  'text-[11px] font-semibold uppercase tracking-[0.1em] text-[#cfb77a] md:text-[11px] md:tracking-[0.09em] md:text-[#bea774]';

const asidePhoneScheduleClass =
  'mt-1.5 text-[12px] font-medium leading-snug text-[#c4ccd6]';

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
      className={FIELD_LABEL_CLASS}
      style={{ fontFamily: BODY_FONT }}
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-[#d4b45c]/90" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

const CURRENT_YEAR = new Date().getFullYear();
const MAX_PHOTO_SIZE_MB = 8;
const MAX_PHOTO_SIZE_BYTES = MAX_PHOTO_SIZE_MB * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export default function Contact({ showIntro = true }: { showIntro?: boolean }) {
  const [preparedLead, setPreparedLead] = useState<LeadRequest | null>(null);
  const [fileHint, setFileHint] = useState('');
  const [service, setService] = useState('');
  const [condition, setCondition] = useState('');
  const [serviceError, setServiceError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    if (submitting) return;
    if (!service) {
      setServiceError(true);
      return;
    }
    if (!e.currentTarget.reportValidity()) {
      return;
    }
    setServiceError(false);
    setSubmitting(true);
    try {
      setPreparedLead(buildLeadRequest(new FormData(e.currentTarget)));
    } finally {
      setSubmitting(false);
    }
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
    const oversized = Array.from(f).find((file) => file.size > MAX_PHOTO_SIZE_BYTES);
    if (oversized) {
      setFileHint(`"${oversized.name}" exceeds ${MAX_PHOTO_SIZE_MB} MB. Please choose a smaller file.`);
      e.target.value = '';
      return;
    }
    const badType = Array.from(f).find(
      (file) => file.type && !ALLOWED_PHOTO_TYPES.includes(file.type),
    );
    if (badType) {
      setFileHint(`"${badType.name}" isn't a supported image type. Use JPEG, PNG, WebP, or HEIC.`);
      e.target.value = '';
      return;
    }
    setFileHint('');
  };

  const mailtoHref = preparedLead ? buildLeadMailtoHref(SITE_CONTACT.emailHref, preparedLead) : SITE_CONTACT.emailHref;
  const whatsappHref = preparedLead
    ? buildLeadWhatsAppHref(SITE_CONTACT.whatsappHref, preparedLead)
    : SITE_CONTACT.whatsappHref;

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
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        {showIntro ? (
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
                style={{ fontFamily: BODY_FONT }}
              >
                Tell us what your vehicle needs and we&apos;ll reply with a tailored recommendation within 24
                hours.
              </span>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex min-h-0 overflow-hidden rounded-sm border border-[rgba(201,168,76,0.13)] bg-[rgba(8,8,10,0.98)] shadow-[0_14px_44px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.04)] lg:col-span-7 lg:h-full"
          >
            <div
              className="relative hidden w-12 shrink-0 flex-col items-center justify-center border-r border-[rgba(201,168,76,0.14)] bg-[linear-gradient(180deg,rgba(201,168,76,0.07)_0%,rgba(6,6,8,0.98)_45%,rgba(4,4,6,0.99)_100%)] lg:flex"
              aria-hidden
            >
              <span
                className="select-none text-[9px] font-extrabold uppercase tracking-[0.42em] text-[#9a8060]"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                Intake
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
            <div
              className="h-[2px] w-full shrink-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.55) 50%, transparent 100%)',
              }}
            />

            {preparedLead ? (
               <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                 className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10"
                 role="status"
                 aria-live="polite"
               >
                 <div
                   className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm"
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
                   Request ready to send
                 </h3>
                 <p className="max-w-xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: BODY_FONT }}>
                   Your details are ready. Choose how you&apos;d like to send them, and we&apos;ll reply with a tailored
                   recommendation within 24 business hours.
                 </p>
                 <p className="mt-3 max-w-lg text-[11px] leading-relaxed text-[#aeb8c6]" style={{ fontFamily: BODY_FONT }}>
                   We don&apos;t submit this form silently in the background yet, so the handoff always stays visible and
                   easy to verify.
                 </p>
                 {preparedLead.photoCount ? (
                   <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-[#d4b45c]" style={{ fontFamily: BODY_FONT }}>
                     {preparedLead.photoCount} photo{preparedLead.photoCount > 1 ? 's were' : ' was'} selected. Please attach
                     them when your email or WhatsApp window opens.
                   </p>
                 ) : null}
                 <div className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                   <a
                     href={mailtoHref}
                     className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[rgba(201,168,76,0.24)] bg-[rgba(201,168,76,0.08)] px-5 text-[12px] font-semibold uppercase tracking-widest text-[#e4c77e] transition-colors hover:border-[rgba(201,168,76,0.34)] hover:bg-[rgba(201,168,76,0.11)]"
                     style={{ fontFamily: BODY_FONT }}
                   >
                     Email request
                   </a>
                   <a
                     href={whatsappHref}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[rgba(201,168,76,0.24)] bg-[rgba(201,168,76,0.05)] px-5 text-[12px] font-semibold uppercase tracking-widest text-[#ddbb70] transition-colors hover:border-[rgba(201,168,76,0.34)] hover:bg-[rgba(201,168,76,0.08)]"
                     style={{ fontFamily: BODY_FONT }}
                   >
                     WhatsApp request
                   </a>
                   <a
                     href={SITE_CONTACT.phoneHref}
                     className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/10 bg-white/3 px-5 text-[12px] font-semibold uppercase tracking-[0.09em] text-white/88 transition-colors hover:border-white/18 hover:bg-white/5"
                     style={{ fontFamily: BODY_FONT }}
                   >
                     Call studio
                   </a>
                   <button
                     type="button"
                     onClick={() => setPreparedLead(null)}
                     className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/10 px-5 text-[12px] font-semibold uppercase tracking-[0.09em] text-white/70 transition-colors hover:border-white/18 hover:text-white/90"
                     style={{ fontFamily: BODY_FONT }}
                   >
                     Edit details
                   </button>
                 </div>
               </motion.div>
             ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-7 lg:p-8">
                <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
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
                      max={CURRENT_YEAR + 1}
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
                       <p id="contact-service-error" className="mt-1.5 text-[11px] font-medium text-[#d4a84a]" role="alert">
                         Choose the service you want quoted so we can prepare the right handoff.
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
                    <input
                      id="contact-date"
                      name="preferredDate"
                      type="date"
                      className={`${inputBase} tabular-nums`}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <FieldLabel htmlFor="contact-message">Message / Goals</FieldLabel>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className={`${inputBase} min-h-28 resize-y py-3`}
                    placeholder=""
                  />
                   <p className={HELPER_TEXT_CLASS} style={{ fontFamily: BODY_FONT }}>
                     Tell us what you want improved, protected, or restored. We&apos;ll carry this into your email or
                     WhatsApp handoff.
                   </p>
                </div>

                <div className="mt-5">
                  <FieldLabel htmlFor="contact-photos">Photos</FieldLabel>
                  <div className="w-full min-w-0 max-w-full rounded-sm border border-[rgba(201,168,76,0.12)] bg-[rgba(6,6,8,0.75)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-[rgba(201,168,76,0.2)] focus-within:border-[#a88b42] focus-within:ring-1 focus-within:ring-[#C9A84C]/20 sm:w-1/2">
                    <input
                      id="contact-photos"
                      name="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFiles}
                      className="w-full min-w-0 cursor-pointer bg-transparent text-[12px] leading-normal text-white/80 file:mr-3 file:cursor-pointer file:rounded-[2px] file:border file:border-[rgba(201,168,76,0.24)] file:bg-[rgba(201,168,76,0.08)] file:px-2.5 file:py-1.5 file:text-[11px] file:font-semibold file:uppercase file:tracking-widest file:text-[#ddbb70] hover:file:border-[rgba(201,168,76,0.32)] hover:file:bg-[rgba(201,168,76,0.1)]"
                    />
                  </div>
                   <p className={HELPER_TEXT_CLASS} style={{ fontFamily: BODY_FONT }}>
                     Optional: choose 2-3 photos for a more accurate estimate. They stay on this device until you attach
                     them in your message.
                   </p>
                  {fileHint ? (
                    <p className="mt-1.5 text-[11px] font-medium text-[#d4a84a]" role="status">
                      {fileHint}
                    </p>
                  ) : null}
                </div>

                <div className="mt-8 border-t border-white/6 pt-7">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      className="relative w-auto cursor-pointer overflow-hidden rounded-sm border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,#ddc48a_0%,#c79e52_52%,#a57d3e_100%)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#070709] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-px hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                      style={{
                        fontFamily: BODY_FONT,
                        boxShadow:
                          'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(80,56,22,0.14), 0 8px 22px rgba(0,0,0,0.34)',
                      }}
                    >
                      <span className="relative z-10">{submitting ? 'Preparing…' : 'Request your quote'}</span>
                    </button>
                  </div>
                  <p
                    className="mx-auto mt-3 max-w-[min(100%,36rem)] text-center text-[11px] leading-relaxed text-[#aeb8c6]"
                    style={{ fontFamily: BODY_FONT }}
                  >
                     Next step: we prepare the request, then you choose email or WhatsApp to send it through the channel
                     you prefer.
                  </p>
                </div>
              </form>
            )}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="flex min-h-0 h-full flex-col overflow-hidden rounded-sm border border-[rgba(201,168,76,0.12)] bg-[rgba(8,8,10,0.98)] shadow-[0_14px_44px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.035)] lg:col-span-5"
            aria-label="Why book with us and contact details"
          >
            <div
              className="h-[2px] w-full shrink-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)',
              }}
            />

            <div className="flex min-h-0 flex-1 flex-col p-6 sm:p-7 lg:p-8">
              <div
                className="md:border-l md:border-[rgba(201,168,76,0.22)] md:pl-5"
                style={{ fontFamily: BODY_FONT }}
              >
                <header className="pr-1 text-center md:text-left">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#c3aa68]">
                    Why clients book with us
                  </p>
                  <h3 className="mt-2.5 text-[1.45rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white/95 sm:text-[1.55rem]">
                    Fast
                    <span className="mx-1.5 text-[#9a8060]/90" aria-hidden>
                      ·
                    </span>
                    Clear
                    <span className="mx-1.5 text-[#9a8060]/90" aria-hidden>
                      ·
                    </span>
                    Professional
                  </h3>
                </header>

                <ul className="mt-6 space-y-3">
                  {TRUST_BULLETS.map((line) => (
                    <li
                      key={line}
                      className="relative pl-3.5 text-[13px] leading-normal text-[#c4ccd6] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[rgba(201,168,76,0.45)] before:content-['']"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fills extra height so contact/address align visually when sidebar matches form height */}
              <div className="hidden min-h-0 lg:flex lg:flex-1" aria-hidden />

              <div
                className="my-8 h-px w-full shrink-0 bg-[rgba(201,168,76,0.1)] lg:my-0"
                aria-hidden
              />

              <div className="space-y-8 lg:mt-6" style={{ fontFamily: BODY_FONT }}>
                <div>
                  <div className={trustAsideSectionTitle}>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                    <p className={asideSectionLabelClass}>Contact</p>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                  </div>
                  <div className={`mt-1 ${asideInlineIconRowClass}`}>
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.18)] bg-[rgba(201,168,76,0.06)]"
                      aria-hidden
                    >
                      <Phone className="h-4 w-4 text-[#c9a84c]/95" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className={asideFieldLabelClass}>Phone</p>
                      <a
                        href={SITE_CONTACT.phoneHref}
                        className="mt-1 block text-[15px] font-semibold tracking-wide text-white transition-colors hover:text-[#e8d8b8]"
                      >
                        {SITE_CONTACT.phoneDisplay}
                      </a>
                      <p className={asidePhoneScheduleClass}>{SITE_CONTACT.hoursCompact}</p>
                    </div>
                  </div>

                  <a
                    href={SITE_CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.05)] px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#ddbb70] transition-colors hover:border-[rgba(201,168,76,0.3)] hover:bg-[rgba(201,168,76,0.07)]"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#c9a84c]/90" strokeWidth={1.75} aria-hidden />
                    WhatsApp — quick message
                  </a>
                </div>

                <div className="border-t border-white/6 pt-8">
                  <div className={trustAsideSectionTitle}>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                    <p className={asideSectionLabelClass}>Address</p>
                    <div
                      className="h-px w-10 max-w-[32%] shrink-0"
                      style={{ background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.65))' }}
                      aria-hidden
                    />
                  </div>
                  <div className={`mt-1 ${asideInlineIconRowClass}`}>
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.18)] bg-[rgba(201,168,76,0.06)]"
                      aria-hidden
                    >
                      <MapPin className="h-4 w-4 text-[#c9a84c]/95" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-[14px] font-semibold text-white/95">{SITE_CONTACT.area.replace('Bucharest', 'București')}</p>
                      <p className="mt-0.5 text-[12px] text-[#8b939e]">{SITE_CONTACT.appointmentNote}</p>
                      <p className="mt-2 text-[12px] leading-snug text-[#aeb8c6]">
                        {SITE_CONTACT.addressLine}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-7 ${asideHoursRowClass}`}>
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.18)] bg-[rgba(201,168,76,0.06)]"
                      aria-hidden
                    >
                      <Clock className="h-4 w-4 text-[#c9a84c]/95" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className={asideFieldLabelClass}>Opening hours</p>
                      <ul className="mt-2 space-y-2 text-left">
                        {TRUST_STUDIO_HOURS.map(({ label, time }) => (
                          <li
                            key={label}
                            className="flex items-baseline justify-between gap-4 border-b border-white/4 pb-2 text-[12px] leading-snug last:border-b-0 last:pb-0 sm:gap-6"
                          >
                            <span className="text-[#9aa3ae]">{label}</span>
                            <span className="shrink-0 tabular-nums text-[13px] font-medium text-white/88">{time}</span>
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
