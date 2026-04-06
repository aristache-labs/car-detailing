import type { ReactNode } from 'react';
import SectionBadge from '@/components/ui/SectionBadge';

/**
 * Shared editorial top band for inner pages — distinct from homepage section headers.
 * Use `variant="premium"` for Why Us–aligned badge + heading scale (e.g. /services).
 */
export default function InnerPageHeader({
  eyebrow,
  title,
  description,
  variant = 'default',
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  variant?: 'default' | 'premium';
}) {
  if (variant === 'premium') {
    return (
      <section
        className="border-b border-white/[0.07] pt-16 pb-6 md:pt-20 md:pb-8"
        style={{ background: 'var(--carbon-950)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            {eyebrow ? (
              <SectionBadge className="mb-3 md:mb-4">{eyebrow}</SectionBadge>
            ) : null}
            <h1
              className="text-5xl font-black uppercase leading-[0.92] tracking-[0.04em] md:text-6xl"
              style={{ fontFamily: 'var(--font-bebas)', color: '#FFFFFF' }}
            >
              {title}
            </h1>
            <div
              className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#A0A0A0] md:mx-0 md:mt-6 md:max-w-lg md:text-base"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {description}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-b border-white/[0.07] pt-8 pb-10 md:pt-11 md:pb-12"
      style={{ background: 'var(--carbon-950)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        {eyebrow ? (
          <span
            className="mb-3 inline-flex px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] md:text-xs"
            style={{
              color: '#E2C06A',
              fontFamily: 'var(--font-orbitron)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
              border: '1px solid rgba(201,168,76,0.28)',
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        <h1
          className="max-w-4xl text-4xl font-black leading-[0.95] tracking-[0.04em] md:text-6xl"
          style={{ fontFamily: 'var(--font-bebas)', color: 'var(--text-primary)' }}
        >
          {title}
        </h1>
        <div
          className="mt-3 max-w-2xl text-sm leading-relaxed md:text-[15px]"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          {description}
        </div>
      </div>
    </section>
  );
}
