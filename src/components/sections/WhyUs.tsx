'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Star, Wrench, Eye, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Cars Detailed', description: 'Successfully completed projects' },
  { value: 5, suffix: ' Yrs', label: 'Experience', description: 'Professional detailing expertise' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Clients who return for more' },
  { value: 100, suffix: '%', label: 'Premium Materials', description: 'Only certified-grade products' },
];

const features = [
  {
    icon: Shield,
    title: 'Real Warranty',
    description: 'We stand behind every service with a written quality guarantee. Not just words — real accountability.',
  },
  {
    icon: Eye,
    title: 'Obsessive Detail',
    description: 'We do not stop until the result is flawless. Every panel, seam, and surface receives the same care.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: 'Premium results delivered efficiently. Respect for your time is part of the service.',
  },
  {
    icon: Star,
    title: 'Certified Products',
    description: 'We use only professional-grade, industry-certified products from trusted brands worldwide.',
  },
  {
    icon: Wrench,
    title: 'Advanced Techniques',
    description: 'Paint decontamination, machine polishing, ceramic nano-technology — the full professional arsenal.',
  },
  {
    icon: Award,
    title: 'Transparent Pricing',
    description: 'No hidden fees. You receive a clear quote before any work begins. Always.',
  },
];

function StatCard({ value, suffix, label, description, index }: typeof stats[0] & { index: number }) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!countRef.current) return;
    const el = countRef.current;

    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: value,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          el.textContent = Math.round(Number(el.textContent)).toString();
        },
      }
    );
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative text-center px-6 py-8 rounded-xl"
      style={{
        background: 'var(--carbon-800)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderTop: '3px solid rgba(201,168,76,0.6)',
      }}
    >
      <div
        className="text-5xl md:text-6xl font-black mb-1 tabular-nums"
        style={{ fontFamily: 'var(--font-orbitron)', color: '#C9A84C' }}
      >
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div
        className="text-sm font-bold tracking-widest uppercase mb-2"
        style={{ color: 'white', fontFamily: 'var(--font-orbitron)', fontSize: '0.7rem' }}
      >
        {label}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
        {description}
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 px-6 carbon-texture-dark">
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The Standard For"
          highlight="Excellence"
          subtitle="Every vehicle we touch receives the same obsessive level of care regardless of make, model, or budget."
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group flex gap-5 p-6 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(20,20,28,0.8)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <h3
                    className="text-base font-bold mb-1.5"
                    style={{ color: 'white', fontFamily: 'var(--font-orbitron)', fontSize: '0.85rem' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
