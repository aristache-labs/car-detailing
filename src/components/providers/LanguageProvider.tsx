'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'ro';

type TranslationShape = {
  nav: {
    home: string;
    services: string;
    stats: string;
    gallery: string;
    results: string;
    process: string;
    pricing: string;
    whyUs: string;
    contact: string;
    bookNow: string;
    language: string;
  };
  hero: {
    headlineTop: string;
    headlineBottom: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    trust3: string;
    scroll: string;
  };
};

const translations: Record<Language, TranslationShape> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      stats: 'Stats',
      gallery: 'Gallery',
      results: 'Results',
      process: 'Process',
      pricing: 'Pricing',
      whyUs: 'Why Us',
      contact: 'Contact',
      bookNow: 'Book Now',
      language: 'Language',
    },
    hero: {
      headlineTop: 'Premium Auto',
      headlineBottom: 'Detailing & Paint Protection',
      description:
        'Paint correction, ceramic coating, PPF and interior restoration — delivered with professional-grade products and meticulous attention to detail.',
      primaryCta: 'Request a Quote',
      secondaryCta: 'See Real Results',
      trust1: 'Certified premium products',
      trust2: 'Quote within 24 hours',
      trust3: 'Written warranty available',
      scroll: 'Scroll to explore',
    },
  },
  ro: {
    nav: {
      home: 'Acasă',
      services: 'Servicii',
      stats: 'Statistici',
      gallery: 'Galerie',
      results: 'Rezultate',
      process: 'Proces',
      pricing: 'Preturi',
      whyUs: 'De ce noi',
      contact: 'Contact',
      bookNow: 'Programeaza',
      language: 'Limba',
    },
    hero: {
      headlineTop: 'Auto Premium',
      headlineBottom: 'Detailing & Protectie Vopsea',
      description:
        'Corectie lac, coating ceramic, PPF si restaurare interior — realizate cu produse profesionale premium si atentie meticuloasa la detalii.',
      primaryCta: 'Solicita oferta',
      secondaryCta: 'Vezi rezultate reale',
      trust1: 'Produse premium certificate',
      trust2: 'Oferta in maximum 24 de ore',
      trust3: 'Garantie scrisa disponibila',
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
  const [language, setLanguage] = useState<Language>('en');

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
