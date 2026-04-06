import type { Metadata } from 'next';
import BeforeAfter from '@/components/sections/BeforeAfter';
import ContactCompact from '@/components/sections/ContactCompact';
import Hero from '@/components/sections/Hero';
import Pricing from '@/components/sections/Pricing';
import Process from '@/components/sections/Process';
import ServicesDetail from '@/components/sections/ServicesDetail';
import ServicesMarquee from '@/components/sections/ServicesMarquee';
import Stats from '@/components/sections/Stats';
import WhyUsPreview from '@/components/sections/WhyUsPreview';

export const metadata: Metadata = {
  title: 'Apex Detailing — Premium Car Detailing',
  description:
    'Luxury car detailing, ceramic coating, PPF wrapping, and leather restoration. Transform your vehicle with precision craftsmanship.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesMarquee />
      <ServicesDetail variant="preview" previewCount={3} />
      <BeforeAfter variant="preview" previewCount={3} />
      <Process />
      <WhyUsPreview />
      <Pricing variant="preview" />
      <ContactCompact />
    </>
  );
}
