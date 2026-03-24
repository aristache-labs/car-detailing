'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M24 6v4M24 38v4M6 24h4M38 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 14l3 3M31 31l3 3M14 34l3-3M31 17l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Polish Exterior',
    description: 'Machine polishing eliminates swirl marks, scratches, and oxidation — restoring a mirror-like, showroom finish.',
    tag: 'Most Popular',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="16" width="36" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 16V12a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2" />
        <path d="M15 27h18M15 33h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="33" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Interior Detailing',
    description: 'Deep cleaning of every surface, seat, carpet, and crevice. Steam treatment and premium conditioning.',
    tag: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 32c0-8 5-15 16-15s16 7 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="32" rx="16" ry="5" stroke="currentColor" strokeWidth="2" />
        <path d="M24 17v-7M20 13h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 26c0 0 2-3 8-3s8 3 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Ceramic Coating',
    description: 'Nano-ceramic protection that bonds to the paint, repelling water, UV, and contaminants for years.',
    tag: 'Premium',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M6 20h36" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 28v2M24 34v2M20 32h2M26 32h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: 'PPF Wrapping',
    description: 'Paint Protection Film applied with precision, shielding against stone chips, scratches, and chemical damage.',
    tag: 'Ultimate Protection',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M12 36V22a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 36h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 18v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 28h12M18 32h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Leather Restoration',
    description: 'Professional cleaning, conditioning, and color restoration for all leather surfaces. Cracks and fading reversed.',
    tag: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14.93 14.93l2.83 2.83M30.24 30.24l2.83 2.83M14.93 33.07l2.83-2.83M30.24 17.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Wheel & Caliper Paint',
    description: 'Professional powder coating and caliper painting that transforms wheels into a bold visual statement.',
    tag: null,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 carbon-texture">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Premium"
          highlight="Services"
          subtitle="From a single stage polish to full ceramic coating packages — every service is carried out with meticulous attention and professional-grade products."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative rounded-xl p-7 cursor-pointer transition-all duration-300"
              style={{
                background: 'var(--carbon-800)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: '2px solid rgba(201,168,76,0.4)',
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 20px 50px rgba(201,168,76,0.15), 0 0 30px rgba(201,168,76,0.08)';
                el.style.borderTopColor = '#C9A84C';
                el.style.borderColor = 'rgba(201,168,76,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'none';
                el.style.borderTopColor = 'rgba(201,168,76,0.4)';
                el.style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              {/* Tag badge */}
              {service.tag && (
                <span
                  className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded"
                  style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: '#C9A84C',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {service.tag}
                </span>
              )}

              {/* Icon */}
              <div
                className="mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ color: '#C9A84C' }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-black mb-3 transition-colors duration-200 group-hover:text-yellow-400"
                style={{ fontFamily: 'var(--font-orbitron)', color: 'white', fontSize: '1.05rem' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
              >
                {service.description}
              </p>

              {/* Hover arrow */}
              <div
                className="mt-5 flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}
              >
                Learn More
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
