'use client';

import { motion } from 'framer-motion';
import { Phone, Search, Wrench, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Contact Us',
    description: 'Reach out by phone, WhatsApp, or our booking form. We respond within hours and schedule at your convenience.',
    color: 'rgba(201,168,76,0.9)',
  },
  {
    number: '02',
    icon: Search,
    title: 'Free Inspection',
    description: 'We assess your vehicle in person — paint condition, interior state, and your goals — then provide a transparent quote.',
    color: 'rgba(200,212,222,0.9)',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'We Work',
    description: 'Our specialists execute the agreed services with certified products and professional equipment. No shortcuts.',
    color: 'rgba(201,168,76,0.9)',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Perfect Result',
    description: 'Receive a detailed walkthrough of everything done, care instructions, and your vehicle — immaculate.',
    color: 'rgba(200,212,222,0.9)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function Process() {
  return (
    <section id="process" className="relative py-28 px-6 carbon-texture">
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How It Works"
          title="Simple Process,"
          highlight="Perfect Results"
          subtitle="Four straightforward steps — from first contact to your transformed vehicle."
        />

        {/* Steps container */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Connector line — desktop only */}
          <div
            className="absolute top-16 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px hidden lg:block"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 15%, rgba(201,168,76,0.3) 85%, transparent)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Number + icon circle */}
                  <div className="relative mb-6">
                    {/* Outer glow ring */}
                    <div
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{
                        background: step.color,
                        filter: 'blur(12px)',
                        transform: 'scale(1.4)',
                      }}
                    />
                    {/* Circle */}
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: 'var(--carbon-800)',
                        border: `2px solid ${step.color}`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                      style={{
                        background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                        color: '#070709',
                        fontFamily: 'var(--font-orbitron)',
                        fontSize: '0.6rem',
                      }}
                    >
                      {step.number.replace('0', '')}
                    </div>
                  </div>

                  {/* Step number text */}
                  <span
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: 'rgba(201,168,76,0.5)', fontFamily: 'var(--font-orbitron)' }}
                  >
                    Step {step.number}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-xl font-black mb-3"
                    style={{ color: 'white', fontFamily: 'var(--font-orbitron)', fontSize: '1rem' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed max-w-xs"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                  >
                    {step.description}
                  </p>

                  {/* Connector dots for mobile */}
                  {i < steps.length - 1 && (
                    <div className="flex flex-col items-center gap-1 mt-6 sm:hidden">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className="w-1 h-1 rounded-full"
                          style={{ background: 'rgba(201,168,76,0.3)' }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shimmer flex items-center gap-2 px-8 py-3.5 rounded text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300"
            style={{
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#C9A84C',
              background: 'transparent',
              fontFamily: 'var(--font-inter)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(201,168,76,0.08)';
              el.style.borderColor = '#C9A84C';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(201,168,76,0.4)';
            }}
          >
            Start Your Booking
          </button>
        </motion.div>
      </div>
    </section>
  );
}
