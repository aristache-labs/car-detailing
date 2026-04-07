import Link from 'next/link';
import { Phone } from 'lucide-react';
import SectionBadge from '@/components/ui/SectionBadge';
import { SITE_CONTACT } from '@/data/site-config';

/** Homepage quote strip — full form lives on /contact */
export default function ContactTeaser() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden py-12 md:py-14"
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-14 text-center md:text-left">
        <SectionBadge className="mb-3">Next step</SectionBadge>
        <h2
          className="text-4xl font-black leading-none md:text-6xl"
          style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.05em' }}
        >
          READY FOR A{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #F0D892 0%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            QUOTE
          </span>
          ?
        </h2>
        <p
          className="mt-3 max-w-xl text-sm leading-relaxed md:mx-0 mx-auto"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          Tell us about your vehicle on the full request form — we reply within 24 hours with a tailored
          recommendation.
        </p>
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:justify-start justify-center">
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3 text-[11px] font-black uppercase tracking-[0.18em]"
            style={{
              background: 'linear-gradient(165deg, #e1c98e 0%, #cfa85a 46%, #b18a45 100%)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Open quote form
          </Link>
          <a
            href={SITE_CONTACT.phoneHref}
            className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:border-[#C9A84C]/45 hover:text-[#f0d892]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <Phone className="h-4 w-4 text-[#C9A84C]" aria-hidden />
            Call studio
          </a>
        </div>
      </div>
    </section>
  );
}
