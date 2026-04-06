import { MapPin } from 'lucide-react';

const STEPS = [
  { title: 'We review your request', detail: 'Usually within a few hours on business days.' },
  { title: 'We confirm scope', detail: 'Optional inspection or clarifying questions if needed.' },
  { title: 'You get a clear quote', detail: 'Timeline, package, and next steps — no pressure.' },
] as const;

/** Below-the-fold trust + logistics — complements full Contact form */
export default function ContactPageExtras() {
  return (
    <div className="border-t border-white/[0.07]" style={{ background: 'var(--carbon-950)' }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:grid-cols-2 md:gap-14 md:px-14 md:py-16">
        <section className="min-w-0 text-center md:text-left">
          <h2
            className="mb-6 text-[clamp(1.25rem,2.2vw,1.65rem)] font-black uppercase leading-[1.02] tracking-[0.04em] text-white/95 md:mb-7 md:text-[1.75rem]"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            WHAT HAPPENS <span className="text-[#cab06a]">NEXT</span>
          </h2>
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex justify-center md:justify-start">
                <div className="flex w-full max-w-[min(100%,22rem)] gap-4 text-left md:max-w-none">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.38)] bg-[rgba(201,168,76,0.1)] text-[12px] font-bold text-[#ddbb70] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p
                    className="text-[14px] font-semibold leading-snug tracking-[0.01em] text-white/95 md:text-[15px]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="mt-1.5 text-[13px] leading-normal text-[#aeb8c6]"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {s.detail}
                  </p>
                </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="min-w-0 text-center md:text-left">
          <h2
            className="mb-6 text-[clamp(1.25rem,2.2vw,1.65rem)] font-black uppercase leading-[1.02] tracking-[0.04em] text-white/95 md:mb-7 md:text-[1.75rem]"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            STUDIO <span className="text-[#cab06a]">LOCATION</span>
          </h2>
          <div className="relative mx-auto mb-5 aspect-video w-full min-h-44 max-w-md overflow-hidden rounded-sm border border-[rgba(201,168,76,0.14)] bg-[rgba(6,6,8,0.98)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_28px_rgba(0,0,0,0.35)] md:max-w-none">
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  'linear-gradient(145deg, rgba(201,168,76,0.07) 0%, rgba(8,8,10,0.97) 48%, rgba(4,4,6,0.99) 100%)',
              }}
            />
            <div className="relative flex h-full min-h-[inherit] flex-col items-center justify-center gap-3 px-5 py-7 text-center sm:px-8">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.07)]"
                aria-hidden
              >
                <MapPin className="h-5 w-5 text-[#c9a84c]/95" strokeWidth={1.75} />
              </div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b8a574]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Map preview
              </p>
              <p
                className="max-w-[min(100%,19rem)] text-[12px] leading-[1.55] text-[#aeb8c6]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Embed Google Maps here when ready.
              </p>
            </div>
          </div>
          <p
            className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b939e] md:text-left"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Visits by appointment only
          </p>
        </section>
      </div>
    </div>
  );
}
