'use client';

const items = [
  { label: 'Polish Exterior', icon: '◈' },
  { label: 'Ceramic Coating', icon: '◆' },
  { label: 'PPF Wrapping', icon: '◉' },
  { label: 'Interior Detailing', icon: '◈' },
  { label: 'Leather Restoration', icon: '◆' },
  { label: 'Wheel & Caliper Paint', icon: '◉' },
  { label: 'Paint Correction', icon: '◈' },
  { label: 'Engine Bay Clean', icon: '◆' },
];

export default function ServicesMarquee() {
  // Duplicate items for seamless loop
  const repeated = [...items, ...items];

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
        {repeated.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-8 whitespace-nowrap select-none"
          >
            <span
              className="text-xs"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
            >
              {item.icon}
            </span>
            <span
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter)' }}
            >
              {item.label}
            </span>
            {/* Car micro-icon SVG */}
            <svg viewBox="0 0 32 16" fill="none" className="w-8 h-4 opacity-30" aria-hidden="true">
              <path
                d="M2 12 L4 7 L8 4 L20 4 L26 7 L30 10 L30 12 Z"
                stroke="#C9A84C"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="9" cy="12" r="2.5" stroke="#C9A84C" strokeWidth="1" fill="none" />
              <circle cx="23" cy="12" r="2.5" stroke="#C9A84C" strokeWidth="1" fill="none" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
