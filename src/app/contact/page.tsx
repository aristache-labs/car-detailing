import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact & Quote — Apex Detailing',
  description:
    'Request a tailored quote for your vehicle. Response within 24 hours. Bucharest · Ilfov — by appointment.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}
