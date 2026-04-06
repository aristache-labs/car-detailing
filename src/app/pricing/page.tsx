import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import PricingFAQ from '@/components/sections/PricingFAQ';
import Pricing from '@/components/sections/Pricing';

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
  title: 'Pricing | Apex Detailing',
  description:
    'Starting prices for exterior, correction, ceramic, PPF, interior, leather, wheel, and engine bay detailing. Final quotes follow inspection.',
};

export default function PricingPage() {
  return (
    <PageShell>
      <InnerPageHeader
        variant="premium"
        eyebrow="INVESTMENT"
        title={
          <>
            <span
              className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
              style={TITLE_SILVER}
            >
              Service
            </span>
            <span
              className="shrink-0 font-black leading-[0.92] text-[clamp(2.75rem,9vw,4.5rem)] md:text-[clamp(3.25rem,5vw,4rem)]"
              style={TITLE_GOLD}
            >
              Pricing
            </span>
          </>
        }
        description="Review starting prices for all eight services, compare the scope of each one, and request a quote once you know which finish path fits your car."
      />
      <Pricing variant="full" showHeader={false} />
      <PricingFAQ />
    </PageShell>
  );
}
