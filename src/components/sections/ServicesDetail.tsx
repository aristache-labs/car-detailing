'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

/* ─── Icons ────────────────────────────────────────────────────────────── */

function ExteriorDetailingIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="extGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#extGlow)" />
      {/* Car body */}
      <path d="M14 70 L102 70 L102 80 L14 80 Z" fill="rgba(201,168,76,0.06)" stroke="#C9A84C" strokeWidth="1.5" />
      <path d="M22 70 L36 50 L84 50 L98 70" fill="rgba(201,168,76,0.06)" stroke="#C9A84C" strokeWidth="1.5" />
      <path d="M38 50 L46 36 L74 36 L82 50" fill="rgba(200,212,222,0.06)" stroke="rgba(200,212,222,0.35)" strokeWidth="1" />
      {/* Wheels */}
      <circle cx="34" cy="80" r="11" fill="rgba(201,168,76,0.05)" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="34" cy="80" r="5" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      <circle cx="86" cy="80" r="11" fill="rgba(201,168,76,0.05)" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="86" cy="80" r="5" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
      {/* Shine sparks */}
      <path d="M52 24 L53 20M60 22 L60 18M68 24 L69 20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" />
      </path>
      {/* Water drops on roof */}
      <path d="M50 37 Q52 33 54 37 Q52 40 50 37Z" fill="rgba(200,212,222,0.25)" stroke="rgba(200,212,222,0.4)" strokeWidth="0.8" />
      <path d="M64 35 Q66 31 68 35 Q66 38 64 35Z" fill="rgba(200,212,222,0.25)" stroke="rgba(200,212,222,0.4)" strokeWidth="0.8" />
    </svg>
  );
}

function PaintCorrectionIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="pcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#pcGlow)" />
      <circle cx="60" cy="68" r="32" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="68" r="22" stroke="rgba(201,168,76,0.5)" strokeWidth="1" fill="none" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 60 68" to="360 60 68" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="68" r="10" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
      {/* Handle */}
      <rect x="56" y="18" width="8" height="22" rx="4" fill="#C9A84C" opacity="0.8" />
      <rect x="52" y="34" width="16" height="8" rx="2" fill="rgba(201,168,76,0.4)" />
      {/* Orbital dots */}
      {([
        [92, 68], [76, 95.3], [44, 95.3], [28, 68], [44, 40.7], [76, 40.7],
      ] as const).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#C9A84C" opacity="0.5">
          <animate attributeName="opacity" values="0.15;0.9;0.15" dur="2s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Sparkles */}
      <path d="M90 22 L96 16M94 32 L101 30M84 18 L87 11" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function CeramicCoatingIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="ccGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8D4DE" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C8D4DE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#ccGlow)" />
      {/* Main bead */}
      <path d="M60 22 Q72 42 72 56 Q72 72 60 76 Q48 72 48 56 Q48 42 60 22Z" fill="rgba(200,212,222,0.12)" stroke="#C8D4DE" strokeWidth="1.5" />
      <path d="M55 38 Q59 32 63 38" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      {/* Small beads */}
      {([[86, 46, 10], [30, 57, 8], [82, 80, 6], [38, 83, 9]] as const).map(([cx, cy, r], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 1.2} fill="rgba(200,212,222,0.08)" stroke="#C8D4DE" strokeWidth="1">
          <animate attributeName="cy" values={`${cy};${cy + 3};${cy}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
      {/* Surface lines */}
      <path d="M15 100 Q60 90 105 100" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 108 Q60 98 98 108" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function PPFProtectionIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="ppfGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#ppfGlow)" />
      <path d="M60 14 L96 30 L96 66 Q96 94 60 110 Q24 94 24 66 L24 30 Z" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.05)" />
      <path d="M60 24 L86 37 L86 64 Q86 86 60 100 Q34 86 34 64 L34 37 Z" stroke="rgba(201,168,76,0.35)" strokeWidth="1" fill="none" strokeDasharray="3 4" />
      <path d="M42 62 L54 74 L82 46" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" from="80 80" to="80 0" dur="1.5s" fill="freeze" />
        <animate attributeName="stroke-dashoffset" from="80" to="0" dur="1.5s" fill="freeze" />
      </path>
      {/* Peeled corner */}
      <path d="M82 24 Q92 14 98 20 Q90 28 82 34 Z" fill="rgba(201,168,76,0.18)" stroke="#C9A84C" strokeWidth="1" />
    </svg>
  );
}

function InteriorDetailingIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="intGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#intGlow)" />
      {/* Seat back */}
      <rect x="28" y="32" width="40" height="52" rx="8" fill="rgba(201,168,76,0.06)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Seat headrest */}
      <rect x="35" y="24" width="26" height="16" rx="6" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Seat base */}
      <rect x="26" y="82" width="44" height="16" rx="6" fill="rgba(201,168,76,0.06)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Stitch lines */}
      <path d="M36 45 L60 45M36 56 L60 56M36 67 L60 67" stroke="rgba(201,168,76,0.35)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Vacuum / detail wand */}
      <path d="M74 40 L98 64" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="98" cy="64" r="6" fill="rgba(201,168,76,0.12)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Dust particles */}
      <circle cx="90" cy="50" r="1.5" fill="#C9A84C" opacity="0.5">
        <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="cy" values="50;44;38" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="84" cy="54" r="1" fill="#C9A84C" opacity="0.4">
        <animate attributeName="opacity" values="0;0.6;0" dur="2.1s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="54;48;42" dur="2.1s" begin="0.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function LeatherCareIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="leatherGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#leatherGlow)" />
      {/* Leather panel */}
      <rect x="22" y="28" width="76" height="64" rx="6" fill="rgba(201,168,76,0.05)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Diamond stitch pattern */}
      {([
        [60, 44], [44, 60], [60, 60], [76, 60], [44, 76], [60, 76], [76, 76],
      ] as const).map(([cx, cy], i) => (
        <path
          key={i}
          d={`M${cx} ${cy - 10} L${cx + 10} ${cy} L${cx} ${cy + 10} L${cx - 10} ${cy} Z`}
          stroke="rgba(201,168,76,0.3)"
          strokeWidth="1"
          fill="none"
        />
      ))}
      {/* Stitch dots */}
      {([
        [60, 34], [76, 44], [44, 44], [92, 60], [28, 60], [76, 86], [44, 86], [60, 92],
      ] as const).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(201,168,76,0.45)" />
      ))}
      {/* Shine */}
      <path d="M30 36 Q36 30 44 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function WheelCaliperIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#wheelGlow)" />
      {/* Outer rim */}
      <circle cx="60" cy="60" r="44" stroke="#C9A84C" strokeWidth="2" fill="none" />
      {/* Tire edge */}
      <circle cx="60" cy="60" r="50" stroke="rgba(201,168,76,0.2)" strokeWidth="4" fill="none" />
      {/* Inner hub */}
      <circle cx="60" cy="60" r="14" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.08)" />
      <circle cx="60" cy="60" r="6" fill="#C9A84C" opacity="0.5" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 60 + 14 * Math.cos(rad);
        const y1 = 60 + 14 * Math.sin(rad);
        const x2 = 60 + 44 * Math.cos(rad);
        const y2 = 60 + 44 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth="1.5" />;
      })}
      {/* Brake caliper */}
      <path d="M88 38 Q100 48 98 62 Q96 70 88 74" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="84" y="44" width="12" height="24" rx="3" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="1" />
      {/* Rotation animation hint */}
      <circle cx="60" cy="16" r="2.5" fill="#C9A84C" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function EngineBayIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="engGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#engGlow)" />
      {/* Engine block */}
      <rect x="24" y="46" width="72" height="44" rx="4" fill="rgba(201,168,76,0.06)" stroke="#C9A84C" strokeWidth="1.5" />
      {/* Cylinder heads */}
      {[34, 50, 66, 82].map((x, i) => (
        <rect key={i} x={x} y="32" width="14" height="18" rx="3" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeWidth="1" />
      ))}
      {/* Pipes */}
      <path d="M24 62 L14 62 L14 82 L24 82" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M96 58 L106 58 L106 72 L96 72" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Bolts */}
      {([30, 60, 90] as const).map((x, i) => (
        <circle key={i} cx={x} cy="68" r="3" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="1" />
      ))}
      {/* Steam/vapor */}
      {[40, 57, 74, 91].map((x, i) => (
        <path key={i} d={`M${x} 32 Q${x + 3} 26 ${x} 20`} stroke="rgba(200,212,222,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
          <animate attributeName="d" values={`M${x} 32 Q${x + 3} 26 ${x} 20;M${x} 32 Q${x - 3} 26 ${x} 20;M${x} 32 Q${x + 3} 26 ${x} 20`} dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

/* ─── Service data ─────────────────────────────────────────────────────── */

interface Service {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: ReactNode;
  flip: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

const services: Service[] = [
  {
    number: '01',
    title: 'Exterior\nDetailing',
    subtitle: 'Full-surface hand wash & decontamination',
    description: 'Multi-step decontamination removes bonded contaminants, iron fallout, and road grime at the molecular level before any protection is applied. Every panel hand-finished.',
    tags: ['Iron Decon', 'Clay Bar', 'Hand Polish'],
    imageSrc: '/images/services/exterior-detailing.png',
    imageAlt: 'Black luxury sedan after premium exterior detailing',
    icon: <ExteriorDetailingIcon />,
    flip: false,
  },
  {
    number: '02',
    title: 'Paint\nCorrection',
    subtitle: 'Machine polishing & swirl removal',
    description: 'Multi-stage machine polishing removes swirl marks, scratches, and oxidation down to the clear coat — delivering mirror depth and true reflectivity impossible to achieve by hand.',
    tags: ['Single-Stage', 'Multi-Stage', 'DA Polishing'],
    imageSrc: '/images/services/paint-correction.png',
    imageAlt: 'Machine paint correction polishing on black vehicle',
    icon: <PaintCorrectionIcon />,
    flip: true,
  },
  {
    number: '03',
    title: 'Ceramic\nCoating',
    subtitle: 'Nano-ceramic surface protection',
    description: 'SiO₂ ceramic technology bonds permanently to the paint surface, creating a hydrophobic, UV-resistant, self-cleaning layer that outlasts any wax or sealant — by years, not weeks.',
    tags: ['SiO₂ Based', '3-Year Warranty', 'Hydrophobic'],
    imageSrc: '/images/services/ceramic-coating.png',
    imageAlt: 'Black sports car with ceramic coating finish',
    icon: <CeramicCoatingIcon />,
    flip: false,
  },
  {
    number: '04',
    title: 'PPF\nProtection',
    subtitle: 'Paint protection film application',
    description: 'Military-grade polyurethane film absorbs rock chips, door dings, and chemical stains before they ever reach your paint. Self-healing at low temperatures. Zero visible edges.',
    tags: ['Self-Healing', 'Clear or Matte', '10-Year Film'],
    imageSrc: '/images/services/PPF-protection.png',
    imageAlt: 'Black sports car during PPF film protection application',
    icon: <PPFProtectionIcon />,
    flip: true,
  },
  {
    number: '05',
    title: 'Interior\nDetailing',
    subtitle: 'Deep clean, steam & fabric treatment',
    description: 'Steam extraction, enzyme treatment, and precision detailing across every surface — seats, carpets, headliner, vents, and trim — leaving the cabin spotless and odor-free.',
    tags: ['Steam Clean', 'Enzyme Treat', 'Odor Removal'],
    imageSrc: '/images/services/Interior-Detailing.png',
    imageAlt: 'Premium black leather vehicle interior after detailing',
    icon: <InteriorDetailingIcon />,
    flip: false,
  },
  {
    number: '06',
    title: 'Leather Care\n& Restoration',
    subtitle: 'Conditioning, repair & color renewal',
    description: 'Professional-grade leather cleaner, deep conditioner, and color restoration compound revives faded, cracked, or stained hides. Protective coating seals the finish long-term.',
    tags: ['Deep Condition', 'Color Match', 'UV Guard'],
    imageSrc: '/images/services/Leather-Care-Restoration.png',
    imageAlt: 'Premium vehicle finish after leather care and restoration service',
    icon: <LeatherCareIcon />,
    flip: true,
  },
  {
    number: '07',
    title: 'Wheel & Caliper\nDetailing',
    subtitle: 'Precision rim & brake finish',
    description: 'Iron fallout removal, acid-safe decontamination, and high-heat caliper paint or coating. Every spoke, barrel, and lug seat detailed to a showroom standard.',
    tags: ['Iron Decon', 'Caliper Coat', 'Sealant'],
    imageSrc: '/images/services/Wheel & Caliper.png',
    imageAlt: 'Wheel and caliper detailing on premium performance car',
    icon: <WheelCaliperIcon />,
    flip: false,
  },
  {
    number: '08',
    title: 'Engine Bay\nDetailing',
    subtitle: 'Degreasing, detailing & protection',
    description: 'Controlled degreasing removes years of grime and oil residue. All plastics dressed, metal surfaces protected, and wiring shielded — leaving the engine bay concours-clean.',
    tags: ['Degreasing', 'Plastic Dress', 'Wiring Safe'],
    imageSrc: '/images/services/Engine-Bay-Detailing.png',
    imageAlt: 'White performance car with detailed engine bay open',
    icon: <EngineBayIcon />,
    flip: true,
  },
];

interface ServiceRowProps {
  service: Service;
}

function ServiceRow({ service }: ServiceRowProps) {
  const fromLeft = !service.flip;

  return (
    <div
      className="relative flex flex-col lg:flex-row overflow-hidden"
      style={{ minHeight: 'clamp(220px, 34vh, 420px)' }}
    >
      {/* Icon panel */}
      <motion.div
        className={`relative flex items-center justify-center flex-1 ${service.flip ? 'lg:order-2 svc-clip-left' : 'lg:order-1 svc-clip-right'}`}
        style={{
          background: service.flip
            ? 'linear-gradient(135deg, #0d0d14 0%, #14141c 100%)'
            : 'linear-gradient(225deg, #0d0d14 0%, #12121e 100%)',
          minHeight: '180px',
        }}
        initial={{ x: fromLeft ? -80 : 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        {service.imageSrc ? (
          <>
            <Image
              src={service.imageSrc}
              alt={service.imageAlt ?? service.title.replace('\n', ' ')}
              className="absolute inset-0 w-full h-full object-cover"
              fill
              sizes="(max-width: 1024px) 92vw, (max-width: 1536px) 48vw, 42vw"
              quality={65}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(7,7,9,0.16) 0%, rgba(7,7,9,0.08) 45%, rgba(7,7,9,0.20) 100%)',
              }}
            />
          </>
        ) : null}
        {!service.imageSrc ? (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
            }}
          />
        ) : null}
        {!service.imageSrc ? (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(201,168,76,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201,168,76,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
          />
        ) : null}
        {!service.imageSrc ? (
          <div className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36">
            {service.icon}
          </div>
        ) : null}
      </motion.div>

      {/* Text panel */}
      <motion.div
        className={`flex-1 flex items-center px-6 sm:px-8 md:px-12 lg:px-14 py-7 lg:py-10 ${service.flip ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ background: 'var(--carbon-950)' }}
        initial={{ x: fromLeft ? 80 : -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
          {/* Ghost number */}
          <div
            className="text-[3.5rem] leading-none font-black mb-1 select-none"
            style={{
              fontFamily: 'var(--font-bebas)',
              color: 'rgba(201,168,76,0.10)',
              letterSpacing: '-0.02em',
            }}
          >
            {service.number}
          </div>

          {/* Title */}
          <h2
            className="text-4xl md:text-5xl font-black leading-none mb-2"
            style={{
              fontFamily: 'var(--font-bebas)',
              background: 'linear-gradient(135deg, #E8EEF4 0%, #C8D4DE 30%, #fff 50%, #C8D4DE 70%, #8E9EAB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'pre-line',
            }}
          >
            {service.title}
          </h2>

          {/* Subtitle */}
          <p
            className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4"
            style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}
          >
            {service.subtitle}
          </p>

          {/* Gold rule */}
          <div className="w-10 h-px mb-4 mx-auto lg:mx-0" style={{ background: '#C9A84C' }} />

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6 justify-center lg:justify-start">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                style={{
                  background: 'rgba(201,168,76,0.07)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  color: '#C9A84C',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-4 py-2 mx-auto lg:mx-0 text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer transition-all duration-300"
            style={{
              color: '#E7C979',
              fontFamily: 'var(--font-inter)',
              border: '1px solid rgba(201,168,76,0.45)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.06) 100%)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#0A0A0D';
              (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #C9A84C 0%, #E8C768 100%)';
              (e.currentTarget as HTMLElement).style.borderColor = '#E8C768';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#E7C979';
              (e.currentTarget as HTMLElement).style.background =
                'linear-gradient(135deg, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.06) 100%)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)';
            }}
          >
            Request Consultation
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesDetail({
  variant = 'full',
  previewCount = 3,
}: {
  variant?: 'full' | 'preview';
  previewCount?: number;
} = {}) {
  const visibleServices =
    variant === 'preview' ? services.slice(0, previewCount) : services;

  return (
    <section id="services" className="relative" style={{ background: 'var(--carbon-950)' }}>
      {/* Section header */}
      <div className="px-8 md:px-14 pt-16 pb-8 flex flex-col md:flex-row md:items-center items-center gap-4 md:gap-5 text-center md:text-left">
        <span
          className="px-4 py-2 text-sm md:text-base font-black tracking-[0.2em] uppercase"
          style={{
            color: '#E2C06A',
            fontFamily: 'var(--font-orbitron)',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
            border: '1px solid rgba(201,168,76,0.35)',
          }}
        >
          Our Services
        </span>
        <div
          className="h-px w-32 md:flex-1 md:w-auto"
          style={{ background: 'rgba(201,168,76,0.28)' }}
        />
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.22em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
          {String(services.length).padStart(2, '0')} Specializations
        </span>
      </div>

      {/* Service rows */}
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {visibleServices.map((s) => (
          <ServiceRow key={s.number} service={s} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-14 py-4 md:py-5"
        style={{
          borderTop: '1px solid rgba(201,168,76,0.14)',
          background: 'linear-gradient(180deg, rgba(201,168,76,0.03) 0%, rgba(7,7,9,0.0) 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 md:gap-6 flex-wrap">
          <div className="text-center">
            <p
              className="text-sm md:text-base font-black tracking-[0.14em] uppercase"
              style={{ color: '#E2C06A', fontFamily: 'var(--font-orbitron)' }}
            >
              Premium Detail Consultation
            </p>
            <p
              className="text-[11px] md:text-xs mt-1"
              style={{ color: 'var(--text-micro)', fontFamily: 'var(--font-inter)' }}
            >
              Tailored package for your vehicle and finish goals.
            </p>
          </div>
          {variant === 'preview' ? (
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs font-bold tracking-[0.16em] uppercase border border-[#C9A84C]/40 text-[#E7C979] hover:bg-[#C9A84C]/10 transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View all services
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : null}
          <Link
            href="/contact"
            className="btn-shimmer flex items-center gap-2 px-6 py-2.5 text-[10px] md:text-xs font-bold tracking-[0.16em] uppercase cursor-pointer transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
              color: '#070709',
              fontFamily: 'var(--font-inter)',
              border: '1px solid rgba(255,215,0,0.35)',
              boxShadow: '0 0 24px rgba(201,168,76,0.2)',
              clipPath: 'polygon(0 0, calc(100% - 9px) 0, 100% 100%, 0 100%)',
            }}
          >
            Book a Service
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
