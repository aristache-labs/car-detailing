import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Pricing from '@/components/sections/Pricing';

export const metadata: Metadata = {
  title: 'Packages & Pricing — Apex Detailing',
  description:
    'Essential, protection, and correction packages in RON. Clear package direction — final quotes after inspection.',
};

export default function PricingPage() {
  return (
    <PageShell>
      <Pricing variant="full" />
    </PageShell>
  );
}
