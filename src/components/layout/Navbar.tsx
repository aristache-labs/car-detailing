'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Menu, X, Zap } from 'lucide-react';
import { useLanguage, type Language } from '@/components/providers/LanguageProvider';
import Image from 'next/image';
import Link from 'next/link';

const LANGUAGE_META: Record<Language, { code: string; flagSrc: string }> = {
  en: { code: 'En', flagSrc: '/images/flags/en.svg' },
  ro: { code: 'Ro', flagSrc: '/images/flags/ro.svg' },
};

// Centralised gold palette so changes propagate everywhere
const GOLD = '#C6A35A';
const GOLD_HOVER = '#D0AE68';
const TEXT_MUTED = 'var(--text-secondary)';

// ── Language Dropdown ─────────────────────────────────────────────────────────
function LanguageDropdown({
  language,
  langOpen,
  setLangOpen,
  langRef,
  ariaLabel,
  onSelect,
}: {
  language: Language;
  langOpen: boolean;
  setLangOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  langRef: React.RefObject<HTMLDivElement | null>;
  ariaLabel: string;
  onSelect: (lang: Language) => void;
}) {
  return (
    <div ref={langRef} className="relative">
      <button
        type="button"
        onClick={() => setLangOpen((v) => !v)}
        aria-label={ariaLabel}
        aria-expanded={langOpen}
        className="flex items-center gap-1.5 cursor-pointer py-1.5 px-2 rounded transition-colors duration-200"
        style={{ color: TEXT_MUTED, fontFamily: 'var(--font-inter)', fontSize: '0.8125rem' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#d0d0d0')}
        onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
      >
        <Image
          src={LANGUAGE_META[language].flagSrc}
          alt=""
          aria-hidden
          width={16}
          height={11}
          className="rounded-[2px] object-cover"
          style={{ width: 16, height: 11 }}
        />
        <span style={{ letterSpacing: '0.02em' }}>{LANGUAGE_META[language].code}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
          style={{ width: 12, height: 12, opacity: 0.45 }}
        />
      </button>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 min-w-[100px] overflow-hidden rounded-[6px]"
            style={{
              background: '#17171a',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {(['en', 'ro'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left cursor-pointer transition-colors duration-150"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.8125rem',
                  color: language === option ? GOLD : TEXT_MUTED,
                  background: 'transparent',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <span className="flex items-center gap-2">
                  <Image
                    src={LANGUAGE_META[option].flagSrc}
                    alt=""
                    aria-hidden
                    width={16}
                    height={11}
                    className="rounded-[2px] object-cover"
                    style={{ width: 16, height: 11 }}
                  />
                  <span>{LANGUAGE_META[option].code}</span>
                </span>
                {language === option && <Check style={{ width: 12, height: 12, color: GOLD }} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.services, href: '/services' },
    { label: t.nav.results, href: '/results' },
    { label: t.nav.pricing, href: '/pricing' },
    { label: t.nav.whyUs, href: '/why-us' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const ctaLabel = language === 'ro' ? 'Solicită ofertă' : 'Get a Quote';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  const closeOverlays = () => {
    setMenuOpen(false);
    setLangOpen(false);
  };

  const handleLanguage = (next: Language) => {
    setLanguage(next);
    setLangOpen(false);
  };

  const langDropdownProps = {
    language,
    langOpen,
    setLangOpen,
    langRef,
    ariaLabel: t.nav.language,
    onSelect: handleLanguage,
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(9,9,11,0.97)' : 'rgba(9,9,11,0.88)',
          backdropFilter: scrolled ? 'blur(6px)' : 'none',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[76px] flex items-center justify-between gap-8">

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
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop right controls ── */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <LanguageDropdown {...langDropdownProps} />
            <Link
              href="/contact"
              className="cursor-pointer rounded-[8px] transition-colors duration-200"
              style={{
                background: GOLD,
                color: '#0a0a0c',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                padding: '10px 20px',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = GOLD_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = GOLD)}
            >
              {ctaLabel}
            </Link>
          </div>

          {/* ── Mobile controls ── */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageDropdown {...langDropdownProps} />
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeOverlays}
                  className="text-left cursor-pointer py-3 transition-colors duration-150"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: TEXT_MUTED,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e8e8e8')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = TEXT_MUTED)}
                >
                  {link.label}
                </Link>
              ))}
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
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="cursor-pointer pb-px border-b border-transparent hover:border-[rgba(201,168,76,0.5)] hover:text-[#e3e3e3] transition-[color,border-color] duration-200"
      style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'rgba(212,212,212,0.88)',
        background: 'none',
      }}
    >
      {children}
    </Link>
  );
}
