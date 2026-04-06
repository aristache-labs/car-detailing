import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ServicesMarquee from '@/components/sections/ServicesMarquee';
import ServicesDetail from '@/components/sections/ServicesDetail';

export const metadata: Metadata = {
  title: 'Services — Apex Detailing',
  description:
    'Exterior detailing, paint correction, ceramic coating, PPF, interior detailing, and more. Scope and inclusions for each specialization.',
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesMarquee />
      <ServicesDetail />
    </PageShell>
  );
}
