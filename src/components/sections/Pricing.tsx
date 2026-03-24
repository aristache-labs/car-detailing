'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const plans = [
  {
    name: 'Essential',
    price: '199',
    unit: 'RON',
    description: 'Perfect for regular maintenance and keeping your car fresh between full details.',
    features: [
      'Exterior hand wash & dry',
      'Interior vacuum & wipe down',
      'Window cleaning (in & out)',
      'Tyre dressing',
      'Air freshener',
    ],
    excluded: [
      'Paint correction',
      'Ceramic coating',
      'Leather conditioning',
    ],
    cta: 'Book Essential',
    highlight: false,
    badge: null,
  },
  {
    name: 'Premium',
    price: '599',
    unit: 'RON',
    description: 'Our most popular package — a comprehensive detail that restores your vehicle to showroom condition.',
    features: [
      'Full exterior detail & decontamination',
      'Single-stage machine polish',
      'Interior deep clean & steam',
      'Leather cleaning & conditioning',
      'Engine bay clean',
      'Tyre & rim dressing',
      '6-month sealant protection',
    ],
    excluded: [],
    cta: 'Book Premium',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Elite',
    price: 'Custom',
    unit: '',
    description: 'The full elite experience — multi-stage correction, ceramic coating, and PPF for ultimate protection.',
    features: [
      'Multi-stage paint correction',
      'Ceramic coating (3-year warranty)',
      'PPF on high-impact zones',
      'Full interior detail & restoration',
      'Leather restoration & colour repair',
      'Headlight restoration',
      'Priority scheduling',
      'Annual maintenance plan',
    ],
    excluded: [],
    cta: 'Get a Quote',
    highlight: false,
    badge: 'Ultimate',
  },
];

export default function Pricing() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-28 px-6 carbon-texture-dark">
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Packages"
          title="Transparent"
          highlight="Pricing"
          subtitle="Choose the package that fits your needs. All prices are starting points — final quotes depend on vehicle size and condition."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: plan.highlight ? -16 : 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
              className="relative rounded-2xl p-8 flex flex-col transition-all duration-300"
              style={{
                background: plan.highlight
                  ? 'linear-gradient(145deg, rgba(201,168,76,0.08) 0%, rgba(20,20,28,0.95) 50%)'
                  : 'var(--carbon-800)',
                border: plan.highlight
                  ? '2px solid rgba(201,168,76,0.6)'
                  : '1px solid rgba(255,255,255,0.05)',
                boxShadow: plan.highlight
                  ? '0 0 40px rgba(201,168,76,0.15), 0 0 80px rgba(201,168,76,0.06)'
                  : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                    color: '#070709',
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '0.6rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{
                  color: plan.highlight ? '#C9A84C' : 'var(--text-muted)',
                  fontFamily: 'var(--font-orbitron)',
                }}
              >
                {plan.name}
              </div>

              {/* Price */}
              <div className="mb-4">
                {plan.price === 'Custom' ? (
                  <span
                    className="text-4xl font-black"
                    style={{ fontFamily: 'var(--font-orbitron)', color: 'white' }}
                  >
                    Custom Quote
                  </span>
                ) : (
                  <div className="flex items-end gap-1">
                    <span
                      className="text-5xl font-black"
                      style={{ fontFamily: 'var(--font-orbitron)', color: plan.highlight ? '#FFD700' : 'white', lineHeight: 1 }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-lg font-semibold mb-1"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                    >
                      {plan.unit}
                    </span>
                  </div>
                )}
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  Starting from — sedans
                </p>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6 pb-6"
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-inter)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: plan.highlight ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.06)',
                        border: `1px solid ${plan.highlight ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: plan.highlight ? '#C9A84C' : '#8E9EAB' }} />
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: plan.highlight ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.excluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 opacity-40">
                    <div className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-2 h-px bg-gray-600" />
                    </div>
                    <span className="text-sm line-through" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className="btn-shimmer w-full py-3.5 rounded-lg text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group"
                style={{
                  background: plan.highlight
                    ? 'linear-gradient(135deg, #C9A84C, #FFD700)'
                    : 'transparent',
                  color: plan.highlight ? '#070709' : '#C9A84C',
                  border: plan.highlight ? 'none' : '1px solid rgba(201,168,76,0.35)',
                  fontFamily: 'var(--font-inter)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!plan.highlight) {
                    el.style.background = 'rgba(201,168,76,0.08)';
                    el.style.borderColor = '#C9A84C';
                  } else {
                    el.style.boxShadow = '0 0 25px rgba(201,168,76,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (!plan.highlight) {
                    el.style.background = 'transparent';
                    el.style.borderColor = 'rgba(201,168,76,0.35)';
                  } else {
                    el.style.boxShadow = 'none';
                  }
                }}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-xs mt-8"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Prices may vary based on vehicle size, condition, and selected add-ons. Contact us for an exact quote.
        </motion.p>
      </div>
    </section>
  );
}
