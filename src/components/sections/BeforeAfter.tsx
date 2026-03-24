'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const panels = [
  {
    id: 0,
    label: 'Polish',
    service: 'Paint Correction',
    beforeLabel: 'Swirl Marks',
    afterLabel: 'Mirror Finish',
    beforeBg: 'linear-gradient(135deg, #1a1a24 0%, #0d0d12 100%)',
    afterBg: 'linear-gradient(135deg, #1e2030 0%, #0d1020 100%)',
    beforeAccent: '#3a3a4a',
    afterAccent: '#C9A84C',
  },
  {
    id: 1,
    label: 'Ceramic',
    service: 'Ceramic Coating',
    beforeLabel: 'Dull Paint',
    afterLabel: 'Hydrophobic Shield',
    beforeBg: 'linear-gradient(135deg, #1a1820 0%, #0e0c14 100%)',
    afterBg: 'linear-gradient(135deg, #101828 0%, #0a1018 100%)',
    beforeAccent: '#3a3848',
    afterAccent: '#4a8aa0',
  },
  {
    id: 2,
    label: 'PPF',
    service: 'Paint Protection Film',
    beforeLabel: 'Unprotected',
    afterLabel: 'Invisible Armour',
    beforeBg: 'linear-gradient(135deg, #1c1a18 0%, #100e0c 100%)',
    afterBg: 'linear-gradient(135deg, #1a1c18 0%, #0e100c 100%)',
    beforeAccent: '#3a3830',
    afterAccent: '#6a8a50',
  },
  {
    id: 3,
    label: 'Interior',
    service: 'Interior Detailing',
    beforeLabel: 'Stained',
    afterLabel: 'Showroom Ready',
    beforeBg: 'linear-gradient(135deg, #1a1410 0%, #0e0c08 100%)',
    afterBg: 'linear-gradient(135deg, #1a1814 0%, #0e0c0a 100%)',
    beforeAccent: '#5a4030',
    afterAccent: '#C9A84C',
  },
];

/* ── Inner drag slider ── */
interface SliderProps {
  panel: typeof panels[0];
}

function DragSlider({ panel }: SliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    setPos(pct);
  }, []);

  const onMouseDown = () => {
    dragging.current = true;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => { if (dragging.current) update(e.clientX); };
  const onMouseUp = () => {
    dragging.current = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  const onTouchMove = (e: React.TouchEvent) => update(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none"
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => update(e.touches[0].clientX)}
    >
      {/* BEFORE layer */}
      <div
        className="absolute inset-0 flex items-end p-4"
        style={{ background: panel.beforeBg }}
      >
        {/* Placeholder visual — swirl marks simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: `${60 + i * 20}px`,
                  height: '1px',
                  background: panel.beforeAccent,
                  top: `${30 + i * 6}%`,
                  left: '10%',
                  transform: `rotate(${-10 + i * 3}deg)`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
        <span
          className="relative z-10 px-2 py-1 text-[10px] font-bold tracking-widest uppercase"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-inter)',
          }}
        >
          {panel.beforeLabel}
        </span>
      </div>

      {/* AFTER layer — clipped */}
      <div
        className="absolute inset-0 flex items-end p-4"
        style={{
          background: panel.afterBg,
          clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Gloss effect simulation */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 40% 40%, ${panel.afterAccent}22 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute w-1/3 h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
              left: '30%',
            }}
          />
        </div>
        <span
          className="relative z-10 px-2 py-1 text-[10px] font-bold tracking-widest uppercase ml-auto"
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: panel.afterAccent,
            fontFamily: 'var(--font-inter)',
          }}
        >
          {panel.afterLabel}
        </span>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 z-20"
        style={{
          left: `${pos}%`,
          background: '#C9A84C',
          boxShadow: '0 0 8px rgba(201,168,76,0.6)',
        }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center"
          style={{ background: '#C9A84C', borderColor: '#FFD700' }}
          onMouseDown={onMouseDown}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
            <path d="M5 4L2 8L5 12M11 4L14 8L11 12" stroke="#070709" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="gallery"
      className="relative py-16 overflow-hidden"
      style={{ background: 'var(--carbon-900)' }}
    >
      {/* Section label */}
      <div className="px-4 sm:px-8 md:px-14 mb-8 flex items-end justify-between gap-4">
        <div>
          <h2
            className="text-5xl md:text-6xl font-black leading-none"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.04em' }}
          >
            BEFORE{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              & AFTER
            </span>
          </h2>
          <p
            className="text-sm mt-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            Drag the slider to reveal the transformation
          </p>
        </div>
        <span
          className="hidden md:block text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
        >
          Click any panel to expand
        </span>
      </div>

      {/* ── Mobile: full-width single active panel ── */}
      <div className="md:hidden px-4">
        <div
          className="relative overflow-hidden"
          style={{
            height: '70vw',
            maxHeight: '360px',
            background: panels[active].beforeBg,
            border: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <DragSlider panel={panels[active]} />
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-3 z-30 px-3 py-1"
            style={{
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
            >
              {panels[active].service}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Desktop: filmstrip ── */}
      <div className="hidden md:flex h-[520px] px-14 gap-2">
        {panels.map((panel) => {
          const isActive = panel.id === active;
          return (
            <motion.div
              key={panel.id}
              onClick={() => setActive(panel.id)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? '4 0 0%' : '1 0 0%',
                transition: 'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'skewX(-2deg)',
                transformOrigin: 'bottom',
                background: panel.beforeBg,
                border: isActive ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.04)',
                boxShadow: isActive ? '0 0 30px rgba(201,168,76,0.1)' : 'none',
              }}
            >
              {/* Inner content — unskew it */}
              <div
                className="absolute inset-0"
                style={{ transform: 'skewX(2deg)' }}
              >
                {isActive ? (
                  <DragSlider panel={panel} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 gap-2">
                    <div
                      className="w-px flex-1"
                      style={{ background: 'rgba(201,168,76,0.2)', maxHeight: 80 }}
                    />
                    <span
                      className="text-xs font-bold tracking-[0.2em] uppercase"
                      style={{
                        color: 'rgba(201,168,76,0.7)',
                        fontFamily: 'var(--font-orbitron)',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {panel.label}
                    </span>
                  </div>
                )}
              </div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 z-30 px-3 py-1"
                  style={{
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
                  >
                    {panel.service}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Panel selector dots */}
      <div className="flex items-center gap-3 px-4 sm:px-8 md:px-14 mt-5">
        {panels.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className="transition-all duration-300"
            style={{
              width: active === p.id ? 32 : 8,
              height: 3,
              background: active === p.id ? '#C9A84C' : 'rgba(255,255,255,0.15)',
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </section>
  );
}
