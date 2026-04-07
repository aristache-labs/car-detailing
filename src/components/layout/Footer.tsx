'use client';

import Link from 'next/link';
import { Clock, Mail, MapPin, Phone, Zap } from 'lucide-react';
import { SITE_CONTACT } from '@/data/site-config';

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Services', href: '/services' },
  { label: 'Results', href: '/results' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
] as const;

const SERVICE_LINKS = [
  { label: 'Ceramic Coating', href: '/services' },
  { label: 'PPF', href: '/services' },
  { label: 'Paint Correction', href: '/services' },
  { label: 'Interior Detailing', href: '/services' },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookies Policy', href: '/cookies' },
] as const;

/** Brand marks (currentColor) — set hrefs in SOCIAL_LINKS to your live profiles */
const SOCIAL_LINKS: {
  label: string;
  href: string;
  path: string;
}[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.647.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.647-.061-4.859 0-3.212.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.07 4.859-.07zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/',
    path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const BODY = 'var(--font-inter)';

const sectionLabel =
  'mb-3 border-l-2 border-[rgba(201,168,76,0.45)] pl-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-soft sm:mb-3.5';

const linkClass =
  'block rounded-sm py-1.5 text-[13px] leading-snug text-white/80 transition-colors duration-200 hover:bg-white/[0.03] hover:text-[var(--gold-soft)] active:bg-white/[0.05] sm:py-1';

const noiseBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
} as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--carbon-950)' }}>
      <div className="gold-divider" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        aria-hidden
        style={noiseBg}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-8 md:px-14" style={{ fontFamily: BODY }}>
        {/* Desktop: 3 + 4 + 5. Mobile: brand → contact card → 2-col nav → legal */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          {/* Brand — icon + title on one line; tagline & socials share text column alignment */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 sm:gap-x-3.5 sm:gap-y-2.5">
              <div
                className="row-span-2 flex items-start justify-center self-start pt-0.5 sm:pt-1"
                aria-hidden
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-[0_0_0_1px_rgba(201,168,76,0.25)] sm:h-9 sm:w-9"
                  style={{ background: 'linear-gradient(145deg, #d4b86a 0%, #9a7b2e 100%)' }}
                >
                  <Zap className="h-4 w-4 fill-black text-black sm:h-3.5 sm:w-3.5" />
                </div>
              </div>
              <p
              className="col-start-2 min-w-0 text-[clamp(0.8125rem,2.8vw,0.875rem)] font-bold uppercase leading-[1.15] tracking-[0.12em] sm:text-sm sm:tracking-[0.14em]"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                <span style={{ color: 'var(--gold-soft)' }}>APEX</span>
                <span className="text-white/95"> DETAILING</span>
              </p>
              <p className="col-start-2 max-w-[20rem] text-[13px] leading-[1.55] text-white/66 sm:text-[12px] sm:leading-relaxed">
                Premium detailing, correction, ceramic coating, and protection — built for vehicles that deserve more
                than a wash.
              </p>
              <div className="col-start-2 flex flex-wrap gap-2.5 pt-1" aria-label="Social media">
                {SOCIAL_LINKS.map(({ label, href, path }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-[rgba(201,168,76,0.14)] bg-[rgba(201,168,76,0.04)] text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[rgba(201,168,76,0.35)] hover:bg-[rgba(201,168,76,0.08)] hover:text-[#d4b86a] sm:h-9 sm:w-9"
                  >
                    <svg className="h-[15px] w-[15px] sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact — card, 2×2 on mobile for density */}
          <div className="rounded-sm border border-[rgba(201,168,76,0.12)] bg-[linear-gradient(165deg,rgba(201,168,76,0.06)_0%,rgba(8,8,10,0.92)_38%,rgba(6,6,8,0.98)_100%)] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5 lg:col-span-4">
            <h2
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              Studio &amp; hours
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-dark">
                  <Phone className="h-3 w-3 shrink-0 text-[#C9A84C]/90" aria-hidden />
                  Phone
                </div>
                <a href={SITE_CONTACT.phoneHref} className="text-[13px] font-medium text-white/90 transition-colors hover:text-gold-soft">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-dark">
                  <Mail className="h-3 w-3 shrink-0 text-[#C9A84C]/90" aria-hidden />
                  Email
                </div>
                <a
                  href={SITE_CONTACT.emailHref}
                  className="break-all text-[12px] font-medium leading-snug text-white/90 transition-colors hover:text-gold-soft sm:text-[13px]"
                >
                  {SITE_CONTACT.email}
                </a>
              </div>
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-dark">
                  <MapPin className="h-3 w-3 shrink-0 text-[#C9A84C]/90" aria-hidden />
                  Area
                </div>
                <p className="text-[12px] font-medium leading-snug text-white/84 sm:text-[13px]">{SITE_CONTACT.area}</p>
              </div>
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-dark">
                  <Clock className="h-3 w-3 shrink-0 text-[#C9A84C]/90" aria-hidden />
                  Hours
                </div>
                <p className="text-[12px] font-medium leading-snug text-white/84 sm:text-[13px]">{SITE_CONTACT.hoursCompact}</p>
              </div>
            </div>
          </div>

          {/* Explore + Services + Legal — 2 col on mobile, 3 on lg */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:col-span-5 lg:grid-cols-3 lg:gap-x-6">
            <nav aria-label="Site">
              <h2 className={sectionLabel} style={{ fontFamily: 'var(--font-orbitron)' }}>
                Explore
              </h2>
              <ul className="space-y-0.5">
                {EXPLORE_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Services">
              <h2 className={sectionLabel} style={{ fontFamily: 'var(--font-orbitron)' }}>
                Services
              </h2>
              <ul className="space-y-0.5">
                {SERVICE_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="col-span-2 border-t border-white/6 pt-6 lg:col-span-1 lg:border-t-0 lg:pt-0" aria-label="Legal">
              <h2 className={sectionLabel} style={{ fontFamily: 'var(--font-orbitron)' }}>
                Legal
              </h2>
              <ul className="flex flex-col gap-0.5">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[rgba(201,168,76,0.08)] pt-6 sm:flex-row sm:items-center">
          <p className="text-center text-[11px] tracking-[0.02em] text-white/45 sm:text-left">
            © {new Date().getFullYear()} Apex Detailing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
