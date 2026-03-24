'use client';

import { Clock, Mail, MapPin, Phone, Zap } from 'lucide-react';

const SERVICE_LINKS = [
  { label: 'Ceramic Coating', href: '#services' },
  { label: 'PPF Protection', href: '#services' },
  { label: 'Paint Correction', href: '#services' },
  { label: 'Interior Detailing', href: '#services' },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookies Policy', href: '/cookies' },
] as const;

const colHeading =
  'mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]';

const linkClass =
  'text-[13px] leading-snug text-white/55 transition-colors duration-200 hover:text-[#d8bb6c]';

export default function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--carbon-950)' }}>
      <div className="gold-divider" />

      <div className="mx-auto max-w-7xl px-4 pb-5 pt-9 sm:px-8 md:px-14">
        <div
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-10 lg:gap-y-0"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {/* 1 — Brand */}
          <div className="order-1 lg:order-0">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #FFD700)' }}
              >
                <Zap className="h-3.5 w-3.5 fill-black text-black" />
              </div>
              <span className="text-base font-black uppercase tracking-[0.18em]" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span style={{ color: '#C9A84C' }}>APEX</span>
                <span className="ml-1 text-white">DETAILING</span>
              </span>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-white/60">
              Premium auto detailing, paint correction, ceramic coating, and protective finishes for vehicles that
              deserve more.
            </p>
            <p className="mt-3 text-[11px] tracking-wide text-white/35">By appointment only</p>
          </div>

          {/* 3 — Services (order 3 on mobile) */}
          <nav className="order-3 lg:order-0" aria-label="Services">
            <h2 className={colHeading}>Services</h2>
            <ul className="space-y-2">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 2 — Contact (order 2 on mobile) */}
          <div className="order-2 lg:order-0">
            <h2 className={colHeading}>Contact</h2>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <a href="tel:+40721000000" className={`${linkClass} block`}>
                  +40 721 000 000
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <a href="mailto:info@apexdetailing.ro" className={`${linkClass} block`}>
                  info@apexdetailing.ro
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <span className="leading-snug">Bucharest · Ilfov</span>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]/80" aria-hidden />
                <span className="leading-snug">Mon–Sat · 09:00–18:00</span>
              </li>
            </ul>
          </div>

          {/* 4 — Legal */}
          <nav className="order-4 lg:order-0" aria-label="Legal">
            <h2 className={colHeading}>Legal</h2>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 border-t border-white/8 pt-4"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <p className="text-center text-[11px] text-white/40 md:text-left">
            © {new Date().getFullYear()} Apex Detailing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
