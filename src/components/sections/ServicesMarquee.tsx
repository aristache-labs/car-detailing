'use client';

import { Diamond } from 'lucide-react';

const ITEMS = [
  'Polish Exterior',
  'Ceramic Coating',
  'PPF Wrapping',
  'Interior Detailing',
  'Leather Restoration',
  'Wheel & Caliper Paint',
  'Paint Correction',
  'Engine Bay Clean',
] as const;

/** Hairline rule with centered diamond — editorial / luxury separator */
function MarqueeDivider() {
  return (
    <svg
      viewBox="0 0 88 18"
      className="h-4 w-22 shrink-0 text-[#C9A84C]"
      fill="none"
      aria-hidden
    >
      <line
        x1="2"
        y1="9"
        x2="34"
        y2="9"
        stroke="currentColor"
        strokeOpacity={0.32}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M44 5.2 48.8 9 44 12.8 39.2 9 44 5.2z"
        stroke="currentColor"
        strokeOpacity={0.88}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <line
        x1="54"
        y1="9"
        x2="86"
        y2="9"
        stroke="currentColor"
        strokeOpacity={0.32}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ServicesMarquee() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        background: 'var(--carbon-800)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
      }}
    >
      <div className="marquee-track">
        {repeated.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-4 px-8 whitespace-nowrap select-none"
          >
            <Diamond
              className="h-3 w-3 shrink-0 text-[#C9A84C]"
              strokeWidth={1.35}
              aria-hidden
            />
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {label}
            </span>
            <MarqueeDivider />
          </div>
        ))}
      </div>
    </div>
  );
}
