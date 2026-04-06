import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import BeforeAfter from '@/components/sections/BeforeAfter';

export const metadata: Metadata = {
  title: 'Results — Apex Detailing',
  description:
    'Before and after paint correction, ceramic coating, PPF, and interior detailing. Real outcomes from real vehicles.',
};

export default function ResultsPage() {
  return (
    <PageShell>
      <BeforeAfter variant="full" />
    </PageShell>
  );
}
