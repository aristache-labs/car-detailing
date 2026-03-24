'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { GripVertical } from 'lucide-react';

interface SliderPair {
  label: string;
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

// Using gradient placeholders — replace src values with real before/after images
const pairs: SliderPair[] = [
  {
    label: 'Paint Correction',
    before: '',
    after: '',
    beforeLabel: 'Before Polish',
    afterLabel: 'After Polish',
  },
  {
    label: 'Interior Detail',
    before: '',
    after: '',
    beforeLabel: 'Before Detail',
    afterLabel: 'After Detail',
  },
  {
    label: 'Ceramic Coating',
    before: '',
    after: '',
    beforeLabel: 'Before Ceramic',
    afterLabel: 'After Ceramic',
  },
];

function BeforeAfterSlider({ pair }: { pair: SliderPair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const getPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    setPosition(getPosition(clientX));
  }, [getPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);

  const stopDrag = useCallback(() => { isDragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [handleMouseMove, handleTouchMove, stopDrag]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-4/3 rounded-xl overflow-hidden cursor-col-resize select-none"
      style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      onMouseDown={(e) => {
        isDragging.current = true;
        setPosition(getPosition(e.clientX));
      }}
      onTouchStart={(e) => {
        isDragging.current = true;
        setPosition(getPosition(e.touches[0].clientX));
      }}
    >
      {/* BEFORE panel */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a24 0%, #2d2d3d 50%, #14141c 100%)',
        }}
      >
        {/* Simulated "dirty/dull" car surface */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 40% at 50% 60%, rgba(100,80,40,0.25) 0%, transparent 70%),
              repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, transparent 2px, transparent 20px)
            `,
          }}
        />
        <span
          className="text-7xl font-black opacity-5 select-none"
          style={{ fontFamily: 'var(--font-bebas)', color: '#8E9EAB', letterSpacing: '0.1em' }}
        >
          BEFORE
        </span>
      </div>

      {/* AFTER panel — clipped by position */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background: 'linear-gradient(135deg, #0d0d12 0%, #1a1a28 50%, #0a0a10 100%)',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 50% at 50% 55%, rgba(201,168,76,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 30% 40%, rgba(200,212,222,0.08) 0%, transparent 50%)
            `,
          }}
        />
        <span
          className="text-7xl font-black opacity-5 select-none"
          style={{ fontFamily: 'var(--font-bebas)', color: '#C9A84C', letterSpacing: '0.1em' }}
        >
          AFTER
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{
          left: `${position}%`,
          background: 'linear-gradient(180deg, transparent, #C9A84C 20%, #FFD700 50%, #C9A84C 80%, transparent)',
          boxShadow: '0 0 12px rgba(201,168,76,0.6)',
          pointerEvents: 'none',
        }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          left: `${position}%`,
          background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
          boxShadow: '0 0 20px rgba(201,168,76,0.6)',
          pointerEvents: 'none',
        }}
      >
        <GripVertical className="w-5 h-5 text-black" />
      </div>

      {/* Labels */}
      <div
        className="absolute top-4 left-4 px-2.5 py-1 text-xs font-bold tracking-widest uppercase rounded"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-inter)',
          opacity: position > 15 ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        {pair.beforeLabel}
      </div>
      <div
        className="absolute top-4 right-4 px-2.5 py-1 text-xs font-bold tracking-widest uppercase rounded"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(201,168,76,0.3)',
          color: '#C9A84C',
          fontFamily: 'var(--font-inter)',
          opacity: position < 85 ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        {pair.afterLabel}
      </div>

      {/* Instruction hint (fades after interaction) */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 text-xs tracking-widest rounded-full pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.5)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-inter)',
          opacity: position === 50 ? 0.8 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        ← Drag to compare →
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="gallery" className="relative py-28 px-6" style={{ background: 'var(--carbon-900)' }}>
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Our Work"
          title="The Difference"
          highlight="Speaks Itself"
          subtitle="Drag the handle to compare before and after. The proof is in the finish."
        />

        {/* Tab selectors */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {pairs.map((pair, i) => (
            <button
              key={pair.label}
              onClick={() => setActiveIndex(i)}
              className="px-5 py-2 rounded text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                background: activeIndex === i ? 'linear-gradient(135deg, #C9A84C, #FFD700)' : 'var(--carbon-800)',
                color: activeIndex === i ? '#070709' : 'var(--text-secondary)',
                border: activeIndex === i ? 'none' : '1px solid rgba(201,168,76,0.15)',
              }}
            >
              {pair.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <BeforeAfterSlider pair={pairs[activeIndex]} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            Ready to see this transformation on your vehicle?
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(201,168,76,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Get Your Car Transformed
          </button>
        </motion.div>
      </div>
    </section>
  );
}
