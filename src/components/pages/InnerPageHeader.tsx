/**
 * Shared editorial top band for inner pages — distinct from homepage section headers.
 */
export default function InnerPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section
      className="border-b border-white/[0.07] pt-8 pb-10 md:pt-11 md:pb-12"
      style={{ background: 'var(--carbon-950)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        {eyebrow ? (
          <span
            className="mb-3 inline-flex px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] md:text-xs"
            style={{
              color: '#E2C06A',
              fontFamily: 'var(--font-orbitron)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
              border: '1px solid rgba(201,168,76,0.28)',
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        <h1
          className="max-w-4xl text-4xl font-black leading-[0.95] tracking-[0.04em] md:text-6xl"
          style={{ fontFamily: 'var(--font-bebas)', color: 'var(--text-primary)' }}
        >
          {title}
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm leading-relaxed md:text-[15px]"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
