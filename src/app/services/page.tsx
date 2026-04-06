import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import ServicesCatalog from '@/components/pages/ServicesCatalog';

/** Homepage Hero h1 gradient styles — silver top line + gold bottom line, single-row layout */
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
  title: 'Services | Apex Detailing',
  description:
    "Explore Apex Detailing's full range of services — ceramic coating, PPF, paint correction, interior detailing and more.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <InnerPageHeader
        variant="premium"
        eyebrow="SCOPE & FIT"
        title={
          <>
            <span
              className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
              style={TITLE_SILVER}
            >
              Our
            </span>
            <span
              className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
              style={TITLE_GOLD}
            >
              Services
            </span>
          </>
        }
        description={
          <>
            Browse by category, expand any card for what&apos;s included, and request a quote when you&apos;re ready.{' '}
            Full packages and add-ons are on{' '}
            <span className="whitespace-nowrap">
              <Link href="/pricing" className="text-[#C9A84C] underline-offset-4 transition-colors hover:underline">
                Pricing
              </Link>
              .
            </span>
          </>
        }
      />
      <ServicesCatalog />
    </PageShell>
  );
}
