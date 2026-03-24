import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <BeforeAfter />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  );
}
