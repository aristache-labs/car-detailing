'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-14`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4"
          style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
        >
          <span className="w-8 h-px" style={{ background: '#C9A84C' }} />
          {eyebrow}
          <span className="w-8 h-px" style={{ background: '#C9A84C' }} />
        </span>
      )}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
        style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.04em' }}
      >
        <span className="text-white">{title} </span>
        {highlight && (
          <span
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 50%, #9A7B2E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
