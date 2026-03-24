'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Menu, X, Zap } from 'lucide-react';
import { useLanguage, type Language } from '@/components/providers/LanguageProvider';
import Image from 'next/image';

const LANGUAGE_META: Record<Language, { code: string; flagSrc: string }> = {
  en: { code: 'EN', flagSrc: '/images/flags/en.svg' },
  ro: { code: 'RO', flagSrc: '/images/flags/ro.svg' },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.stats, href: '#stats' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    setLangOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setLangOpen(false);
  };

  const renderLanguageDropdown = () => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setLangOpen((open) => !open)}
        className="flex items-center gap-2 rounded border px-3 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer"
        style={{
          borderColor: 'rgba(201,168,76,0.22)',
          color: '#C9A84C',
          background: 'rgba(7,7,9,0.65)',
          fontFamily: 'var(--font-inter)',
        }}
        aria-label={t.nav.language}
        aria-expanded={langOpen}
      >
        <Image
          src={LANGUAGE_META[language].flagSrc}
          alt=""
          aria-hidden
          width={18}
          height={12}
          className="h-3 w-[18px] rounded-[2px] object-cover"
        />
        <span>{LANGUAGE_META[language].code}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 min-w-[110px] overflow-hidden rounded border"
            style={{
              background: 'rgba(13,13,18,0.98)',
              borderColor: 'rgba(201,168,76,0.15)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {(['en', 'ro'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleLanguage(option)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200 cursor-pointer"
                style={{
                  color: language === option ? '#C9A84C' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <span className="flex items-center gap-2">
                  <Image
                    src={LANGUAGE_META[option].flagSrc}
                    alt=""
                    aria-hidden
                    width={18}
                    height={12}
                    className="h-3 w-[18px] rounded-[2px] object-cover"
                  />
                  <span>{LANGUAGE_META[option].code}</span>
                </span>
                {language === option && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(7,7,9,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #FFD700)' }}>
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>
            <span
              className="text-xl font-black tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-orbitron)', letterSpacing: '0.15em' }}
            >
              <span style={{ color: '#C9A84C' }}>APEX</span>
              <span className="text-white ml-1">DETAIL</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="text-sm font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '0.1em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {renderLanguageDropdown()}
            <button
              onClick={() => handleLink('#contact')}
              className="btn-shimmer px-6 py-2.5 text-sm font-semibold tracking-widest uppercase rounded cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                color: '#070709',
                fontFamily: 'var(--font-inter)',
                letterSpacing: '0.1em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(201,168,76,0.5)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {t.nav.bookNow}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {renderLanguageDropdown()}
            <button
              className="p-2 cursor-pointer"
              style={{ color: '#C9A84C' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-100 w-72 flex flex-col pt-24 pb-8 px-8"
            style={{
              background: 'rgba(13,13,18,0.98)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid rgba(201,168,76,0.15)',
            }}
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleLink(link.href)}
                  className="text-left text-lg font-medium tracking-widest uppercase cursor-pointer"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-auto">
              <button
                onClick={() => handleLink('#contact')}
                className="btn-shimmer w-full py-3 text-sm font-semibold tracking-widest uppercase rounded cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                  color: '#070709',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {t.nav.bookNow}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
