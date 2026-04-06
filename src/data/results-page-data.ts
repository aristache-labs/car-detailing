export type MainTab = 'gallery' | 'beforeAfter' | 'video';

export type GalleryFilterId = 'all' | 'correction' | 'ceramic' | 'ppf' | 'interior' | 'engine';

export type GalleryItem = {
  id: string;
  category: Exclude<GalleryFilterId, 'all'>;
  vehicle: string;
  service: string;
  result: string;
  image: string;
};

export type BeforeAfterItem = {
  id: string;
  vehicle: string;
  service: string;
  before: string;
  after: string;
  tags: string[];
  studioTime: string;
  /** Combined service line for featured editorial block (optional) */
  editorialSubtitle?: string;
  /** Single meta line for featured block, e.g. "Correction · Ceramic · 14h studio time" */
  featuredMetaLine?: string;
  /** Treatment / steps line below the main title (featured block, v2 layout) */
  featuredTreatmentLine?: string;
  /** Optional caption line under the compare hero (featured only) */
  featuredSupportingLine?: string;
  /** Small editorial label above featured compare (e.g. “Signature Transformation”) */
  featuredEyebrow?: string;
  /** Short portfolio line under service (More transformations cards) */
  portfolioResult?: string;
};

export type VideoItem = {
  id: string;
  vehicle: string;
  service: string;
  thumbnail: string;
  duration: string;
  label: string;
  /** Optional per-item video file in /public */
  src?: string;
};

export const GALLERY_FILTERS: { id: GalleryFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'correction', label: 'Correction' },
  { id: 'ceramic', label: 'Ceramic' },
  { id: 'ppf', label: 'PPF' },
  { id: 'interior', label: 'Interior' },
  { id: 'engine', label: 'Engine' },
];

const categoryLabel: Record<Exclude<GalleryFilterId, 'all'>, string> = {
  correction: 'Correction',
  ceramic: 'Ceramic',
  ppf: 'PPF',
  interior: 'Interior',
  engine: 'Engine',
};

export function galleryCategoryBadge(cat: Exclude<GalleryFilterId, 'all'>): string {
  return categoryLabel[cat];
}

/**
 * Image paths align with `gallery-cases.ts` / home Before–After assets under
 * `public/images/before-after/`. Add those files (or swap URLs) if you see 404s.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    category: 'correction',
    vehicle: 'Infiniti Q60',
    service: 'Paint Correction',
    result: 'Refined defect removal with deep gloss clarity.',
    image: '/images/before-after/after-paint-correction.png',
  },
  {
    id: 'g2',
    category: 'ceramic',
    vehicle: 'BMW 3 Series',
    service: 'Ceramic Coating',
    result: 'Surface protection with stronger depth and water behavior.',
    image: '/images/before-after/after-ceramic-coating.png',
  },
  {
    id: 'g3',
    category: 'ppf',
    vehicle: 'BMW M4',
    service: 'Front-End PPF',
    result: 'Clear film over high-wear zones with minimal visual weight.',
    image: '/images/before-after/after-PPF.png',
  },
  {
    id: 'g4',
    category: 'interior',
    vehicle: 'Mercedes-Benz GLC',
    service: 'Interior Detail',
    result: 'Cabin refresh with leather conditioning and a quiet finish.',
    image: '/images/before-after/after-Interior-deep-clean.png',
  },
  {
    id: 'g5',
    category: 'engine',
    vehicle: 'Audi S4',
    service: 'Engine Bay Detail',
    result: 'Engine bay presented clean, dressed, and controlled.',
    image: '/images/before-after/before-paint-correction.png',
  },
  {
    id: 'g6',
    category: 'correction',
    vehicle: 'Porsche 911',
    service: 'Multi-Stage Polish',
    result: 'Clarity and gloss dialed for a sharper paint read.',
    image: '/images/before-after/before-ceramic-coating.png',
  },
];

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: 'ba1',
    vehicle: 'Infiniti Q60',
    service: 'Paint Correction',
    before: '/images/before-after/before-paint-correction.png',
    after: '/images/before-after/after-paint-correction.png',
    tags: ['Correction', 'Ceramic'],
    studioTime: '14 hours',
    featuredEyebrow: 'Signature Transformation',
    editorialSubtitle: 'Multi-Stage Paint Correction & Ceramic Protection',
    featuredTreatmentLine: 'Defect removal · Gloss refinement · Long-term protection',
  },
  {
    id: 'ba2',
    vehicle: 'BMW 3 Series',
    service: 'Ceramic Coating',
    before: '/images/before-after/before-ceramic-coating.png',
    after: '/images/before-after/after-ceramic-coating.png',
    tags: ['Ceramic', 'Decon'],
    studioTime: '11 hours',
    portfolioResult: 'Hydrophobic finish with calibrated gloss depth.',
  },
  {
    id: 'ba3',
    vehicle: 'BMW M4',
    service: 'PPF + polish prep',
    before: '/images/before-after/before-PPF.png',
    after: '/images/before-after/after-PPF.png',
    tags: ['PPF'],
    studioTime: '16 hours',
    portfolioResult: 'Film laid with clean edges and high-wear coverage.',
  },
  {
    id: 'ba4',
    vehicle: 'Mercedes-Benz GLC',
    service: 'Interior detail',
    before: '/images/before-after/before-Interior-deep-clean.png',
    after: '/images/before-after/after-Interior-deep-clean.png',
    tags: ['Interior'],
    studioTime: '6 hours',
    portfolioResult: 'Surfaces reset for a composed, presentation-ready cabin.',
  },
];

/** Featured case uses first before/after entry */
export const featuredBeforeAfter = beforeAfterItems[0];

export const videoItems: VideoItem[] = [
  {
    id: 'v1',
    vehicle: 'BMW M4',
    service: 'Process reel',
    thumbnail: '/images/before-after/after-PPF.png',
    duration: '0:45',
    label: 'Highlight',
    src: '/videos/showcase.mp4',
  },
  {
    id: 'v2',
    vehicle: 'Porsche 911',
    service: 'Ceramic + correction',
    thumbnail: '/images/before-after/after-ceramic-coating.png',
    duration: '1:12',
    label: 'Walkthrough',
    src: '/videos/showcase.mp4',
  },
];
