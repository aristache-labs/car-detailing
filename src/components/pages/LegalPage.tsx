import PageShell from '@/components/layout/PageShell';

type LegalSection = {
  title: string;
  body: string[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell>
      <section className="bg-carbon-950 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-sm border border-[rgba(201,168,76,0.14)] bg-[rgba(8,8,10,0.96)] p-6 shadow-[0_14px_44px_rgba(0,0,0,0.34)] sm:p-8 md:p-10">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c4a85f]"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {eyebrow}
            </p>
            <h1
              className="mt-3 text-[clamp(2.4rem,6vw,4rem)] font-black uppercase leading-[0.92] tracking-[0.05em] text-white"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {title}
            </h1>
            <p
              className="mt-5 max-w-3xl text-sm leading-relaxed text-[#c4ccd6] md:text-[15px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {intro}
            </p>

            <div className="mt-8 space-y-8 border-t border-white/8 pt-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2
                    className="text-[15px] font-semibold uppercase tracking-[0.12em] text-white/92 md:text-base"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-[#aeb8c6] md:text-[15px]"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
