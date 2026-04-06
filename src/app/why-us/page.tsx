import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import WhyUsPageContent from '@/components/pages/WhyUsPageContent';

export const metadata: Metadata = {
  title: 'Why Apex Detailing | Standards & Process',
  description:
    'Learn why Apex Detailing clients trust our precision process, professional materials, and transparent pricing.',
};

export default function WhyUsPage() {
  return (
    <PageShell>
      <WhyUsPageContent />
    </PageShell>
  );
}
