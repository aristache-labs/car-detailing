import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import ResultsGallery from '@/components/pages/ResultsGallery';

export const metadata: Metadata = {
  title: 'Results — Apex Detailing',
  description:
    'Before and after paint correction, ceramic coating, PPF, and interior detailing. Real outcomes from real vehicles.',
};

export default function ResultsPage() {
  return (
    <PageShell>
      <InnerPageHeader
        eyebrow="Proof"
        title="Results"
        description="Featured comparison plus a filterable gallery — ceramic, correction, PPF, interior, and more."
      />
      <ResultsGallery />
    </PageShell>
  );
}
