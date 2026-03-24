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
    beforeImage: '/images/before-after/before-paint-correction.png',
    afterImage: '/images/before-after/after-paint-correction.png',
    vehicle: 'BMW 530e',
    proofService: '2-stage paint correction + ceramic coating',
    time: '14 hours',
    outcome: 'Swirl removal, deeper gloss, hydrophobic finish',
    beforeBg: 'linear-gradient(135deg, #121218 0%, #0c0c10 100%)',
    afterBg: 'linear-gradient(135deg, #151720 0%, #0d0f16 100%)',
    beforeAccent: '#3a3a4a',
    afterAccent: '#C9A84C',
  },
  {
    id: 1,
    label: 'Ceramic',
    service: 'Ceramic Coating',
    beforeLabel: 'Dull Paint',
    afterLabel: 'Hydrophobic Shield',
    beforeImage: '/images/before-after/before-ceramic-coating.png',
    afterImage: '/images/before-after/after-ceramic-coating.png',
    vehicle: 'Audi RS5',
    proofService: 'Paint decontamination + ceramic coating',
    time: '11 hours',
    outcome: 'Higher gloss, smoother finish, durable water repellency',
    beforeBg: 'linear-gradient(135deg, #171521 0%, #0d0b14 100%)',
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
    beforeImage: '/images/before-after/before-PPF.png',
    afterImage: '/images/before-after/after-PPF.png',
    vehicle: 'Porsche 911',
    proofService: 'Front-end PPF + finish correction prep',
    time: '16 hours',
    outcome: 'Impact protection, cleaner reflections, protected high-wear zones',
    beforeBg: 'linear-gradient(135deg, #161411 0%, #0f0d0b 100%)',
    afterBg: 'linear-gradient(135deg, #171a14 0%, #0d100b 100%)',
    beforeAccent: '#3a3830',
    afterAccent: '#6a8a50',
  },
  {
    id: 3,
    label: 'Interior',
    service: 'Interior Detailing',
    beforeLabel: 'Stained',
    afterLabel: 'Showroom Ready',
    beforeImage: '/images/before-after/before-Interior-deep-clean.png',
    afterImage: '/images/before-after/after-Interior-deep-clean.png',
    vehicle: 'Mercedes C-Class',
    proofService: 'Interior deep clean + leather conditioning',
    time: '6 hours',
    outcome: 'Restored cabin finish, improved texture, refreshed interior feel',
    beforeBg: 'linear-gradient(135deg, #17120e 0%, #0d0b08 100%)',
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
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,5,8,0.08), rgba(5,5,8,0.4)), url(${panel.beforeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
          backgroundImage: `linear-gradient(180deg, rgba(5,5,8,0.04), rgba(5,5,8,0.3)), url(${panel.afterImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`,
        }}
      >
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
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center"
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
  const currentPanel = panels[active];

  return (
    <section
      id="gallery"
      className="relative py-12 md:py-13 overflow-hidden"
      style={{ background: 'var(--carbon-900)' }}
    >
      {/* Section label */}
      <div className="px-4 sm:px-8 md:px-14 mb-5 md:mb-6 flex items-end justify-between gap-4">
        <div className="text-center md:text-left mx-auto md:mx-0">
          <span
            className="inline-flex px-4 py-2 text-sm md:text-base font-black tracking-[0.2em] uppercase mb-2"
            style={{
              color: '#E2C06A',
              fontFamily: 'var(--font-orbitron)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
              border: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            Real Results
          </span>
          <h2
            className="text-5xl md:text-6xl font-black leading-none"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white', letterSpacing: '0.04em' }}
          >
            BEFORE & AFTER{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              RESULTS
            </span>
          </h2>
          <div
            className="h-px w-16 mx-auto md:mx-0 mt-2 mb-2"
            style={{ background: 'rgba(201,168,76,0.42)' }}
          />
          <p
            className="text-sm"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
          >
            See how proper correction, coating, and detailing transform the finish.
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
        {/* Mobile service switcher */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {panels.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className="px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] uppercase transition-all duration-200"
              style={{
                color: active === p.id ? '#C9A84C' : 'rgba(154,154,176,0.9)',
                background: active === p.id ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${active === p.id ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.08)'}`,
                fontFamily: 'var(--font-inter)',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            height: '88vw',
            minHeight: '280px',
            maxHeight: '470px',
            background: panels[active].beforeBg,
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.32)',
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
      <div className="hidden md:flex h-[500px] px-14 gap-1.5">
        {panels.map((panel) => {
          const isActive = panel.id === active;
          return (
            <motion.div
              key={panel.id}
              onClick={() => setActive(panel.id)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? '3.2 0 0%' : '1.2 0 0%',
                transition: 'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'skewX(-2deg)',
                transformOrigin: 'bottom',
                background: panel.beforeBg,
                border: isActive ? '1px solid rgba(201,168,76,0.24)' : '1px solid rgba(255,255,255,0.03)',
                boxShadow: isActive ? '0 0 18px rgba(201,168,76,0.07)' : 'none',
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
                        color: 'rgba(201,168,76,0.58)',
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
                  className="absolute top-3 left-3 z-30 px-2.5 py-1"
                  style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.28)',
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
      <div className="hidden md:flex items-center gap-2.5 px-4 sm:px-8 md:px-14 mt-3">
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

      {/* Slim proof strip */}
      <div className="px-4 sm:px-8 md:px-14 mt-4">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[
            { label: 'Vehicle', value: currentPanel.vehicle },
            { label: 'Service', value: currentPanel.proofService },
            { label: 'Time', value: currentPanel.time },
            { label: 'Outcome', value: currentPanel.outcome },
          ].map((item) => (
            <div key={item.label} className="min-w-0">
              <p
                className="inline-flex px-2.5 py-1 text-[9px] font-black tracking-[0.18em] uppercase"
                style={{
                  color: '#E2C06A',
                  fontFamily: 'var(--font-orbitron)',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
                  border: '1px solid rgba(201,168,76,0.32)',
                }}
              >
                {item.label}
              </p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
