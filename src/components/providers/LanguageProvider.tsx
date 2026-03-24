'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'ro';

type TranslationShape = {
  nav: {
    services: string;
    stats: string;
    gallery: string;
    process: string;
    pricing: string;
    contact: string;
    bookNow: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    carsDetailed: string;
    rating: string;
    experience: string;
    scroll: string;
  };
};

const translations: Record<Language, TranslationShape> = {
  en: {
    nav: {
      services: 'Services',
      stats: 'Stats',
      gallery: 'Gallery',
      process: 'Process',
      pricing: 'Pricing',
      contact: 'Contact',
      bookNow: 'Book Now',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Auto Detailing Studio',
      description:
        'Polish. Protect. Perfect. — Professional auto detailing that makes every vehicle impossible to ignore.',
      primaryCta: 'Book a Service',
      secondaryCta: 'Our Services',
      carsDetailed: 'Cars Detailed',
      rating: 'Rating',
      experience: 'Experience',
      scroll: 'Scroll to explore',
    },
  },
  ro: {
    nav: {
      services: 'Servicii',
      stats: 'Statistici',
      gallery: 'Galerie',
      process: 'Proces',
      pricing: 'Preturi',
      contact: 'Contact',
      bookNow: 'Programeaza',
      language: 'Limba',
    },
    hero: {
      eyebrow: 'Studio de detailing auto',
      description:
        'Polisare. Protectie. Perfectiune. — Servicii profesionale de detailing auto care fac orice masina imposibil de ignorat.',
      primaryCta: 'Programeaza',
      secondaryCta: 'Serviciile Noastre',
      carsDetailed: 'Masini Detaliate',
      rating: 'Rating',
      experience: 'Experienta',
      scroll: 'Deruleaza pentru explorare',
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationShape;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const saved = window.localStorage.getItem('apex-language');
    return saved === 'en' || saved === 'ro' ? saved : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('apex-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
