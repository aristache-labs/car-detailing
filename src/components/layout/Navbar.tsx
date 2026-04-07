'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GOLD = '#C6A35A';
const GOLD_HOVER = '#D0AE68';
const TEXT_MUTED = 'var(--text-muted)';

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.whyUs, href: '/why-us' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.results, href: '/results' },
    { label: t.nav.pricing, href: '/pricing' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const linkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const ctaLabel = language === 'ro' ? 'Solicită ofertă' : 'Get a Quote';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeOverlays = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        data-scrolled={scrolled ? 'true' : 'false'}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/6.5 bg-carbon-950 transition-[box-shadow,border-color] duration-300 data-[scrolled=true]:border-white/10 data-[scrolled=true]:shadow-[0_10px_36px_rgba(0,0,0,0.42)]"
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-6 lg:h-[88px] lg:gap-8 lg:px-8">

          {/* ── Logo (matches footer: gradient mark + Orbitron wordmark) ── */}
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Apex Detailing — Home">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #FFD700)' }}
              aria-hidden
            >
              <Zap className="h-3.5 w-3.5 fill-black text-black" />
            </div>
            <span
              className="text-base font-black uppercase tracking-[0.18em] md:text-[1.05rem]"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              <span style={{ color: '#C9A84C' }}>APEX</span>
              <span className="ml-1 text-white">DETAILING</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden items-center gap-7 lg:flex xl:gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={linkActive(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop right controls ── */}
          <div className="hidden shrink-0 items-center lg:flex">
            <Link
              href="/contact"
              className="nav-cta-desktop btn-shimmer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-mid/40 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon-950"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* ── Mobile controls ── */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="cursor-pointer p-1.5 rounded"
              style={{ color: '#c8c8c8', lineHeight: 0 }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
        <div className="gold-divider pointer-events-none opacity-[0.38]" aria-hidden />
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.55)' }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0, 0.67, 0], duration: 0.22 }}
            className="fixed inset-y-0 right-0 z-40 w-[86vw] max-w-[320px] flex flex-col"
            style={{
              background: '#0d0d10',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-6 shrink-0"
              style={{ height: 76, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span />
              <button
                className="cursor-pointer p-1 rounded"
                style={{ color: '#c8c8c8', lineHeight: 0 }}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = linkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeOverlays}
                    className="text-left cursor-pointer py-3 transition-colors duration-150"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '1rem',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#f0f0f0' : TEXT_MUTED,
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e8e8e8')}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = active ? '#f0f0f0' : TEXT_MUTED;
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer CTA */}
            <div className="px-6 pb-10">
              <Link
                href="/contact"
                onClick={closeOverlays}
                className="flex w-full cursor-pointer justify-center rounded-[8px] transition-colors duration-200"
                style={{
                  background: GOLD,
                  color: '#0a0a0c',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  padding: '12px 0',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = GOLD_HOVER)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = GOLD)}
              >
                {ctaLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Extracted NavLink to avoid repeated inline style logic ──
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-active={active ? 'true' : 'false'}
      className="nav-link-desktop"
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
