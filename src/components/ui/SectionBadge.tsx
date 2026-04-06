import type { CSSProperties, ReactNode } from 'react';

/** Matches homepage / Why Us section badges (e.g. “Our Services”, “Trust”). */
export const BADGE_STYLE: CSSProperties = {
  color: '#E2C06A',
  fontFamily: 'var(--font-orbitron)',
  background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
  border: '1px solid rgba(201,168,76,0.35)',
};

export default function SectionBadge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-black uppercase tracking-[0.2em] md:text-base ${className}`}
      style={BADGE_STYLE}
    >
      {children}
    </span>
  );
}
