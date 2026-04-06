import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import ContactPageExtras from '@/components/pages/ContactPageExtras';
import Contact from '@/components/sections/Contact';

const TITLE_SILVER: CSSProperties = {
  background:
    'linear-gradient(165deg, #f0f4f8 0%, #dce0e0 35%, #ffffff 48%, #c8d0d0 58%, #8a9aa8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const TITLE_GOLD: CSSProperties = {
  background:
    'linear-gradient(165deg, #ead8b8 0%, #d6b36a 28%, #cfa85a 52%, #b8924a 78%, #8a6a38 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export const metadata: Metadata = {
  title: 'Contact & Quote — Apex Detailing',
  description:
    'Request a tailored quote for your vehicle. Response within 24 hours. Bucharest · Ilfov — by appointment.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <InnerPageHeader
        variant="premium"
        eyebrow="CONTACT"
        title={
          <>
            <span
              className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
              style={TITLE_SILVER}
            >
              REQUEST A
            </span>
            <span
              className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
              style={TITLE_GOLD}
            >
              QUOTE
            </span>
          </>
        }
        description="Full intake, optional photos, and how to reach us — we reply with a clear recommendation."
      />
      <Contact showIntro={false} />
      <ContactPageExtras />
    </PageShell>
  );
}
