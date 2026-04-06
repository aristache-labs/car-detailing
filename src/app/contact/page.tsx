import type { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import ContactPageExtras from '@/components/pages/ContactPageExtras';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact & Quote — Apex Detailing',
  description:
    'Request a tailored quote for your vehicle. Response within 24 hours. Bucharest · Ilfov — by appointment.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <InnerPageHeader
        eyebrow="Quote"
        title="Contact"
        description="Full intake, optional photos, and how to reach us — we reply with a clear recommendation."
      />
      <Contact showIntro={false} />
      <ContactPageExtras />
    </PageShell>
  );
}
