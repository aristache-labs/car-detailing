import type { ReactNode } from 'react';

export default function SectionBadge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`section-badge ${className}`}
    >
      {children}
    </span>
  );
}
