import Hero from '@/components/sections/Hero';
import ServicesMarquee from '@/components/sections/ServicesMarquee';
import ServicesDetail from '@/components/sections/ServicesDetail';
import Stats from '@/components/sections/Stats';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesMarquee />
      <ServicesDetail />
      <BeforeAfter />
      <Process />
      <Testimonials />
      <WhyUs />
      <Pricing />
      <Contact />
    </>
  );
}
