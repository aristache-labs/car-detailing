'use client';

import { motion } from 'framer-motion';
import SectionBadge from '@/components/ui/SectionBadge';

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
  const centered = align === 'center';
  const alignClass = centered ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-14`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-3 ${centered ? 'justify-center' : 'justify-start'}`}>
          <span className="h-px w-8 bg-[rgba(201,168,76,0.36)]" aria-hidden />
          <SectionBadge>{eyebrow}</SectionBadge>
          <span className="h-px w-8 bg-[rgba(201,168,76,0.36)]" aria-hidden />
        </div>
      )}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
        style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.04em' }}
      >
        <span className="text-white">{title} </span>
        {highlight && <span className="text-gold">{highlight}</span>}
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
