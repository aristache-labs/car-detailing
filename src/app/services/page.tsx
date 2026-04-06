import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import ServicesCatalog from '@/components/pages/ServicesCatalog';

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
        title="SERVICES"
        description={
          <>
            Browse by category, expand any card for what&apos;s included, and request a quote when you&apos;re ready.
            Full packages and add-ons are on{' '}
            <Link href="/pricing" className="text-[#C9A84C] underline-offset-4 transition-colors hover:underline">
              Pricing
            </Link>
            .
          </>
        }
      />
      <ServicesCatalog />
    </PageShell>
  );
}
