import Link from 'next/link';
import { ArrowRight, ClipboardCheck, Droplets, FileCheck2, FlaskConical, ShieldCheck, SlidersHorizontal } from 'lucide-react';

export const WHY_US_DIFFERENTIATORS = [
  {
    icon: ClipboardCheck,
    title: 'Precision-First Process',
    description: 'Every service follows a defined sequence - no rushed steps, no guesswork.',
  },
  {
    icon: FlaskConical,
    title: 'Professional-Grade Materials',
    description: 'We use certified coatings, safe chemicals, and proven protection systems.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Tailored Recommendations',
    description: 'Each vehicle gets a plan based on condition, usage, and finish goals.',
  },
  {
    icon: Droplets,
    title: 'Paint-Safe Methods',
    description: 'Measured correction and safe techniques designed to preserve clear coat.',
  },
  {
    icon: FileCheck2,
    title: 'Documented Results',
    description: 'Before/after references and clear service outcomes so you know what changed.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Pricing',
    description: 'Clear package structure, honest recommendations, and no surprise upsells.',
  },
] as const;

export default function WhyUs({ leadColumn = true }: { leadColumn?: boolean }) {
  const grid = (
    <div
      className={`grid grid-cols-1 gap-x-6 gap-y-3 ${leadColumn ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
    >
      {WHY_US_DIFFERENTIATORS.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start gap-2.5">
              <Icon className="w-[25px] h-[25px] mt-px shrink-0" style={{ color: 'var(--gold-soft)' }} />
              <div>
                <h3
                  className="text-[12px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-orbitron)' }}
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (!leadColumn) {
    return (
      <section className="relative py-10 md:py-12" style={{ background: 'var(--carbon-900)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">{grid}</div>
      </section>
    );
  }

  return (
    <section id="why-us" className="relative py-12 md:py-14" style={{ background: 'var(--carbon-900)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-2 text-center lg:text-left">
            <span className="section-badge">
              Why Apex Detailing
            </span>
            <h2
              className="mt-3 text-4xl md:text-5xl font-black leading-[0.95]"
              style={{ fontFamily: 'var(--font-bebas)', color: 'var(--text-primary)', letterSpacing: '0.03em' }}
            >
              WHY CLIENTS TRUST
              <br />
              OUR PROCESS
            </h2>
            <p
              className="mt-3 text-sm max-w-sm mx-auto lg:mx-0"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Premium detailing built on method, materials, and measurable results.
            </p>
            <Link
              href="/#process"
              className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer"
              style={{ color: 'rgba(201,168,76,0.9)', fontFamily: 'var(--font-inter)' }}
            >
              See our process
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-3">{grid}</div>
        </div>
      </div>
    </section>
  );
}
