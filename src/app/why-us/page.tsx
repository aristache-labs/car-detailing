import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import InnerPageHeader from '@/components/pages/InnerPageHeader';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';

export const metadata: Metadata = {
  title: 'Why Us — Apex Detailing',
  description:
    'Precision-first process, professional-grade materials, tailored recommendations, and transparent pricing.',
};

export default function WhyUsPage() {
  return (
    <PageShell>
      <InnerPageHeader
        eyebrow="Trust"
        title="Why Apex"
        description="Standards, materials, and how we work — so you know what you’re booking before we touch the paint."
      />
      <WhyUs leadColumn={false} />
      <section
        className="border-t border-white/6 py-10 md:py-12"
        style={{ background: 'var(--carbon-950)' }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8 md:px-14 md:text-left">
          <p
            className="text-sm leading-relaxed md:max-w-2xl"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Every service follows the same on-ramp: inspection, safe prep, correction or protection as needed, then
            final review. See the full{' '}
            <Link href="/#process" className="font-semibold text-[#C9A84C] underline-offset-2 hover:text-[#e8d49a]">
              PIT STOP process on the homepage
            </Link>
            .
          </p>
        </div>
      </section>
      <Testimonials />
    </PageShell>
  );
}
