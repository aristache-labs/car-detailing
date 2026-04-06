import { Clock, MapPin, Route } from 'lucide-react';

const STEPS = [
  { title: 'We review your request', detail: 'Usually within a few hours on business days.' },
  { title: 'We confirm scope', detail: 'Optional inspection or clarifying questions if needed.' },
  { title: 'You get a clear quote', detail: 'Timeline, package, and next steps — no pressure.' },
] as const;

/** Below-the-fold trust + logistics — complements full Contact form */
export default function ContactPageExtras() {
  return (
    <div className="border-t border-white/[0.07]" style={{ background: 'var(--carbon-900)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-14 md:py-16">
        <section>
          <h2
            className="mb-4 text-xl font-black tracking-[0.06em] md:text-2xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
          >
            WHAT HAPPENS <span style={{ color: '#C9A84C' }}>NEXT</span>
          </h2>
          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-xs font-black text-[#0a0a0c]"
                  style={{
                    fontFamily: 'var(--font-orbitron)',
                    background: 'linear-gradient(135deg, #C9A84C, #e8c768)',
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/60" style={{ fontFamily: 'var(--font-inter)' }}>
                    {s.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2
            className="mb-4 text-xl font-black tracking-[0.06em] md:text-2xl"
            style={{ fontFamily: 'var(--font-bebas)', color: 'white' }}
          >
            STUDIO <span style={{ color: '#C9A84C' }}>LOCATION</span>
          </h2>
          <div
            className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/40"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(10,10,14,0.9) 100%)',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
              <MapPin className="h-8 w-8 text-[#C9A84C]/80" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: 'var(--font-inter)' }}>
                Map preview
              </p>
              <p className="max-w-xs text-xs text-white/55" style={{ fontFamily: 'var(--font-inter)' }}>
                Embed Google Maps here when ready. Service by appointment — address shown in the contact column.
              </p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/70" style={{ fontFamily: 'var(--font-inter)' }}>
            <li className="flex items-start gap-2">
              <Route className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]/80" aria-hidden />
              <span>Bucharest · Ilfov — by appointment</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]/80" aria-hidden />
              <span>Mon–Sat · 09:00–18:00 (see form sidebar for detailed hours)</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
