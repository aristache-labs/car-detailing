import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import ServicesCatalog from '@/components/pages/ServicesCatalog';

export const metadata: Metadata = {
  title: 'Services — Apex Detailing',
  description:
    'Exterior detailing, paint correction, ceramic coating, PPF, interior detailing, and more. Scope and inclusions for each specialization.',
};

export default function ServicesPage() {
  return (
    <PageShell>
      <InnerPageHeader
        eyebrow="Scope & fit"
        title="Services"
        description="Browse by category, expand any card for what’s included, and request a quote when you’re ready. Full packages and add-ons are on Pricing."
      />
      <ServicesCatalog />
    </PageShell>
  );
}
