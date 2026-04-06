export type MainTab = 'gallery' | 'beforeAfter' | 'video';

export type GalleryFilterId = 'all' | 'correction' | 'ceramic' | 'ppf' | 'interior' | 'engine';

export type GalleryItem = {
  id: string;
  category: Exclude<GalleryFilterId, 'all'>;
  vehicle: string;
  service: string;
  /** One short editorial meta line under the vehicle (e.g. “Stage 2 correction • Deep gloss finish”) */
  metaLine: string;
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
  /** Short editorial meta under vehicle title (More transformations cards) */
  captionMeta?: string;
  /** Full uppercase service label for card badge (homepage-aligned naming) */
  serviceBadgeLabel: string;
};

export type VideoItem = {
  id: string;
  vehicle: string;
  service: string;
  /** Uppercase label for card badge (homepage service-chip style) */
  badgeLabel: string;
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

/** Full service names for Results cards — matches homepage service naming. */
const categoryFullServiceBadge: Record<Exclude<GalleryFilterId, 'all'>, string> = {
  correction: 'PAINT CORRECTION',
  ceramic: 'CERAMIC COATING',
  ppf: 'PPF PROTECTION',
  interior: 'INTERIOR DETAILING',
  engine: 'ENGINE BAY DETAILING',
};

export function galleryCategoryBadge(cat: Exclude<GalleryFilterId, 'all'>): string {
  return categoryFullServiceBadge[cat];
}

/** Compact badge copy for narrow breakpoints — same order as `categoryFullServiceBadge`. */
const categoryMobileShortBadge: Record<Exclude<GalleryFilterId, 'all'>, string> = {
  correction: 'PAINT',
  ceramic: 'CERAMIC',
  ppf: 'PPF',
  interior: 'INTERIOR',
  engine: 'ENGINE',
};

export function galleryCategoryBadgeMobile(cat: Exclude<GalleryFilterId, 'all'>): string {
  return categoryMobileShortBadge[cat];
}

const fullServiceBadgeToMobileShort: Record<string, string> = {
  'PAINT CORRECTION': 'PAINT',
  'CERAMIC COATING': 'CERAMIC',
  'PPF PROTECTION': 'PPF',
  'INTERIOR DETAILING': 'INTERIOR',
  'ENGINE BAY DETAILING': 'ENGINE',
};

/** Maps full `serviceBadgeLabel` strings to mobile short chips (More transformations). */
export function serviceBadgeLabelMobile(fullLabel: string): string {
  return fullServiceBadgeToMobileShort[fullLabel] ?? fullLabel;
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
    metaLine: 'Stage 2 correction • Deep gloss finish',
    image: '/images/before-after/after-paint-correction.png',
  },
  {
    id: 'g2',
    category: 'ceramic',
    vehicle: 'BMW 3 Series',
    service: 'Ceramic Coating',
    metaLine: 'Hydrophobic finish • Enhanced surface depth',
    image: '/images/before-after/after-ceramic-coating.png',
  },
  {
    id: 'g3',
    category: 'ppf',
    vehicle: 'BMW M4',
    service: 'Front-End PPF',
    metaLine: 'High-wear protection • Near-invisible finish',
    image: '/images/before-after/after-PPF.png',
  },
  {
    id: 'g4',
    category: 'interior',
    vehicle: 'Mercedes-Benz GLC',
    service: 'Interior Detail',
    metaLine: 'Cabin reset • Leather conditioning',
    image: '/images/before-after/after-Interior-deep-clean.png',
  },
  {
    id: 'g5',
    category: 'engine',
    vehicle: 'Audi S4',
    service: 'Engine Bay Detail',
    metaLine: 'Clean bay detail • Controlled factory finish',
    image: '/images/before-after/before-paint-correction.png',
  },
  {
    id: 'g6',
    category: 'correction',
    vehicle: 'Porsche 911',
    service: 'Multi-Stage Polish',
    metaLine: 'Defect refinement • Sharper gloss response',
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
    editorialSubtitle: 'Multi-Stage Paint Correction & Ceramic Protection',
    featuredTreatmentLine: 'Defect removal · Gloss refinement · Long-term protection',
    serviceBadgeLabel: 'PAINT CORRECTION',
  },
  {
    id: 'ba2',
    vehicle: 'BMW 3 Series',
    service: 'Ceramic Coating',
    before: '/images/before-after/before-ceramic-coating.png',
    after: '/images/before-after/after-ceramic-coating.png',
    tags: ['Ceramic', 'Decon'],
    studioTime: '11 hours',
    captionMeta: 'Hydrophobic finish • Calibrated gloss depth',
    serviceBadgeLabel: 'CERAMIC COATING',
  },
  {
    id: 'ba3',
    vehicle: 'BMW M4',
    service: 'PPF + polish prep',
    before: '/images/before-after/before-PPF.png',
    after: '/images/before-after/after-PPF.png',
    tags: ['PPF'],
    studioTime: '16 hours',
    captionMeta: 'Clean film edges • High-wear coverage',
    serviceBadgeLabel: 'PPF PROTECTION',
  },
  {
    id: 'ba4',
    vehicle: 'Mercedes-Benz GLC',
    service: 'Interior detail',
    before: '/images/before-after/before-Interior-deep-clean.png',
    after: '/images/before-after/after-Interior-deep-clean.png',
    tags: ['Interior'],
    studioTime: '6 hours',
    captionMeta: 'Cabin reset • Presentation-ready surfaces',
    serviceBadgeLabel: 'INTERIOR DETAILING',
  },
];

/** Featured case uses first before/after entry */
export const featuredBeforeAfter = beforeAfterItems[0];

export const videoItems: VideoItem[] = [
  {
    id: 'v1',
    vehicle: 'BMW M4',
    service: 'Process reel',
    badgeLabel: 'PROCESS REEL',
    thumbnail: '/images/before-after/after-PPF.png',
    duration: '0:45',
    label: 'Highlight',
    src: '/videos/showcase.mp4',
  },
  {
    id: 'v2',
    vehicle: 'Porsche 911',
    service: 'Ceramic + correction',
    badgeLabel: 'CERAMIC + CORRECTION',
    thumbnail: '/images/before-after/after-ceramic-coating.png',
    duration: '1:12',
    label: 'Walkthrough',
    src: '/videos/showcase.mp4',
  },
];
