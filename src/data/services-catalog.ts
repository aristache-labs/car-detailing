/** Serializable service catalog for Services page (grid / filters) — no React nodes */
export type ServiceCatalogFilter = 'all' | 'exterior' | 'paint' | 'protection' | 'interior' | 'specialty';

export type ServiceCatalogItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  filter: Exclude<ServiceCatalogFilter, 'all'>;
  /** Short line for cards */
  idealFor: string;
};

export const SERVICE_FILTER_LABELS: { id: ServiceCatalogFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'paint', label: 'Paint' },
  { id: 'protection', label: 'Protection' },
  { id: 'interior', label: 'Interior' },
  { id: 'specialty', label: 'Wheels & specialty' },
];

export const servicesCatalog: ServiceCatalogItem[] = [
  {
    id: 'exterior-detailing',
    number: '01',
    title: 'Exterior Detailing',
    subtitle: 'Full-surface hand wash & decontamination',
    description:
      'Multi-step decontamination removes bonded contaminants, iron fallout, and road grime at the molecular level before any protection is applied. Every panel hand-finished.',
    tags: ['Iron Decon', 'Clay Bar', 'Hand Polish'],
    imageSrc: '/images/services/exterior-detailing.png',
    imageAlt: 'Black luxury sedan after premium exterior detailing',
    filter: 'exterior',
    idealFor: 'Maintenance washes and prep before protection.',
  },
  {
    id: 'paint-correction',
    number: '02',
    title: 'Paint Correction',
    subtitle: 'Machine polishing & swirl removal',
    description:
      'Multi-stage machine polishing removes swirl marks, scratches, and oxidation down to the clear coat — delivering mirror depth and true reflectivity impossible to achieve by hand.',
    tags: ['Single-Stage', 'Multi-Stage', 'DA Polishing'],
    imageSrc: '/images/services/paint-correction.png',
    imageAlt: 'Machine paint correction polishing on black vehicle',
    filter: 'paint',
    idealFor: 'Swirls, oxidation, and gloss recovery.',
  },
  {
    id: 'ceramic-coating',
    number: '03',
    title: 'Ceramic Coating',
    subtitle: 'Nano-ceramic surface protection',
    description:
      'SiO₂ ceramic technology bonds permanently to the paint surface, creating a hydrophobic, UV-resistant, self-cleaning layer that outlasts any wax or sealant — by years, not weeks.',
    tags: ['SiO₂ Based', '3-Year Warranty', 'Hydrophobic'],
    imageSrc: '/images/services/ceramic-coating.png',
    imageAlt: 'Black sports car with ceramic coating finish',
    filter: 'protection',
    idealFor: 'Long-term gloss and easier washing.',
  },
  {
    id: 'ppf',
    number: '04',
    title: 'PPF',
    subtitle: 'Paint protection film application',
    description:
      'Military-grade polyurethane film absorbs rock chips, door dings, and chemical stains before they ever reach your paint. Self-healing at low temperatures. Zero visible edges.',
    tags: ['Self-Healing', 'Clear or Matte', '10-Year Film'],
    imageSrc: '/images/services/PPF-protection.png',
    imageAlt: 'Black sports car during PPF film protection application',
    filter: 'protection',
    idealFor: 'High-wear zones and front-end packages.',
  },
  {
    id: 'interior-detailing',
    number: '05',
    title: 'Interior Detailing',
    subtitle: 'Deep clean, steam & fabric treatment',
    description:
      'Steam extraction, enzyme treatment, and precision detailing across every surface — seats, carpets, headliner, vents, and trim — leaving the cabin spotless and odor-free.',
    tags: ['Steam Clean', 'Enzyme Treat', 'Odor Removal'],
    imageSrc: '/images/services/Interior-Detailing.png',
    imageAlt: 'Premium black leather vehicle interior after detailing',
    filter: 'interior',
    idealFor: 'Daily drivers and cabin refresh.',
  },
  {
    id: 'leather-care',
    number: '06',
    title: 'Leather Restoration',
    subtitle: 'Conditioning, repair & color renewal',
    description:
      'Professional-grade leather cleaner, deep conditioner, and color restoration compound revives faded, cracked, or stained hides. Protective coating seals the finish long-term.',
    tags: ['Deep Condition', 'Color Match', 'UV Guard'],
    imageSrc: '/images/services/Leather-Care-Restoration.png',
    imageAlt: 'Premium vehicle finish after leather care and restoration service',
    filter: 'interior',
    idealFor: 'Worn or sun-damaged leather.',
  },
  {
    id: 'wheels',
    number: '07',
    title: 'Wheel & Caliper',
    subtitle: 'Precision rim & brake finish',
    description:
      'Iron fallout removal, acid-safe decontamination, and high-heat caliper paint or coating. Every spoke, barrel, and lug seat detailed to a showroom standard.',
    tags: ['Iron Decon', 'Caliper Coat', 'Sealant'],
    imageSrc: '/images/services/Wheel & Caliper.png',
    imageAlt: 'Wheel and caliper detailing on premium performance car',
    filter: 'specialty',
    idealFor: 'Brake dust buildup and show finish.',
  },
  {
    id: 'engine-bay',
    number: '08',
    title: 'Engine Bay Detail',
    subtitle: 'Degreasing, detailing & protection',
    description:
      'Controlled degreasing removes years of grime and oil residue. All plastics dressed, metal surfaces protected, and wiring shielded — leaving the engine bay concours-clean.',
    tags: ['Degreasing', 'Plastic Dress', 'Wiring Safe'],
    imageSrc: '/images/services/Engine-Bay-Detailing.png',
    imageAlt: 'White performance car with detailed engine bay open',
    filter: 'specialty',
    idealFor: 'Shows, sales prep, and long-term upkeep.',
  },
];
