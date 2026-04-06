import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WHY_US_DIFFERENTIATORS } from '@/components/sections/WhyUs';

/** Compact homepage block — same structure as Why Us page intro + grid; links to full Why Us + PIT STOP */
export default function WhyUsPreview() {
  return (
    <section
      id="why-us-preview"
      className="relative border-y border-white/6 py-8 md:py-10"
      style={{ background: 'var(--carbon-900)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="text-center lg:col-span-2 lg:text-left">
            <span
              className="inline-flex items-center px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] md:text-xs"
              style={{
                color: '#E2C06A',
                fontFamily: 'var(--font-orbitron)',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.05) 100%)',
                border: '1px solid rgba(201,168,76,0.32)',
              }}
            >
              Why Apex Detailing
            </span>
            <h2
              className="mt-3 text-3xl font-black leading-[0.95] tracking-[0.03em] md:text-4xl lg:text-[2.75rem]"
              style={{ fontFamily: 'var(--font-bebas)', color: 'var(--text-primary)' }}
            >
              WHY CLIENTS TRUST
              <br />
              OUR PROCESS
            </h2>
            <p
              className="mx-auto mt-3 max-w-sm text-sm leading-relaxed lg:mx-0"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
            >
              Premium detailing built on method, materials, and measurable results.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link
                href="/why-us"
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                  color: '#070709',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                Explore why us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/#process"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/90 transition-colors hover:text-[#e8d49a]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                See our process
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-2">
              {WHY_US_DIFFERENTIATORS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="pb-2.5 pt-0.5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon className="mt-px h-[22px] w-[22px] shrink-0" style={{ color: '#DFC16D' }} />
                      <div>
                        <h3
                          className="text-[11px] font-bold uppercase tracking-[0.12em] md:text-[12px]"
                          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-orbitron)' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="mt-1 text-[11px] leading-relaxed md:text-xs"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
