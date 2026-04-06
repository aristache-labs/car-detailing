/** Category slug for video items — matches ResultFilterId minus "all" */
export type ResultCategory = 'correction' | 'coating' | 'ppf' | 'interior';

export type GalleryPanel = {
  id: number;
  label: string;
  service: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  vehicle: string;
  proofService: string;
  time: string;
  /** Full outcome line — featured / detail */
  outcome: string;
  /** Short line for gallery cards */
  outcomeShort: string;
  beforeBg: string;
  afterBg: string;
  beforeAccent: string;
  afterAccent: string;
};

export type GalleryComparisonCase = GalleryPanel & { kind: 'comparison' };

export type GalleryVideoCase = {
  kind: 'video';
  id: number;
  label: string;
  vehicle: string;
  service: string;
  outcome: string;
  poster: string;
  src: string;
  duration?: string;
  filter: ResultCategory;
};

export type GalleryOutcome = GalleryComparisonCase | GalleryVideoCase;

/** Before/after gallery entries — Home preview + building block for Results */
export const galleryPanels: GalleryPanel[] = [
  {
    id: 0,
    label: 'Polish',
    service: 'Paint Correction',
    beforeLabel: 'Swirl Marks',
    afterLabel: 'Mirror Finish',
    beforeImage: '/images/before-after/before-paint-correction.png',
    afterImage: '/images/before-after/after-paint-correction.png',
    vehicle: 'Infiniti Q60',
    proofService: '2-stage paint correction + ceramic coating',
    time: '14 hours',
    outcome: 'Swirl removal, deeper gloss, hydrophobic finish',
    outcomeShort: 'Mirror gloss, hydrophobic finish',
    beforeBg: 'linear-gradient(135deg, #121218 0%, #0c0c10 100%)',
    afterBg: 'linear-gradient(135deg, #151720 0%, #0d0f16 100%)',
    beforeAccent: '#3a3a4a',
    afterAccent: '#C9A84C',
  },
  {
    id: 1,
    label: 'Ceramic',
    service: 'Ceramic Coating',
    beforeLabel: 'Dull Paint',
    afterLabel: 'Hydrophobic Shield',
    beforeImage: '/images/before-after/before-ceramic-coating.png',
    afterImage: '/images/before-after/after-ceramic-coating.png',
    vehicle: 'BMW 3 Series',
    proofService: 'Paint decontamination + ceramic coating',
    time: '11 hours',
    outcome: 'Higher gloss, smoother finish, durable water repellency',
    outcomeShort: 'Deep gloss, lasting water repellency',
    beforeBg: 'linear-gradient(135deg, #171521 0%, #0d0b14 100%)',
    afterBg: 'linear-gradient(135deg, #101828 0%, #0a1018 100%)',
    beforeAccent: '#3a3848',
    afterAccent: '#4a8aa0',
  },
  {
    id: 2,
    label: 'PPF',
    service: 'Paint Protection Film',
    beforeLabel: 'Unprotected',
    afterLabel: 'Invisible Armour',
    beforeImage: '/images/before-after/before-PPF.png',
    afterImage: '/images/before-after/after-PPF.png',
    vehicle: 'BMW M4',
    proofService: 'Front-end PPF + finish correction prep',
    time: '16 hours',
    outcome: 'Impact protection, cleaner reflections, protected high-wear zones',
    outcomeShort: 'Protected front end, crisp reflections',
    beforeBg: 'linear-gradient(135deg, #161411 0%, #0f0d0b 100%)',
    afterBg: 'linear-gradient(135deg, #171a14 0%, #0d100b 100%)',
    beforeAccent: '#3a3830',
    afterAccent: '#6a8a50',
  },
  {
    id: 3,
    label: 'Interior',
    service: 'Interior Detailing',
    beforeLabel: 'Stained',
    afterLabel: 'Showroom Ready',
    beforeImage: '/images/before-after/before-Interior-deep-clean.png',
    afterImage: '/images/before-after/after-Interior-deep-clean.png',
    vehicle: 'Mercedes-Benz GLC-Class',
    proofService: 'Interior deep clean + leather conditioning',
    time: '6 hours',
    outcome: 'Restored cabin finish, improved texture, refreshed interior feel',
    outcomeShort: 'Refreshed cabin, conditioned leather',
    beforeBg: 'linear-gradient(135deg, #17120e 0%, #0d0b08 100%)',
    afterBg: 'linear-gradient(135deg, #1a1814 0%, #0e0c0a 100%)',
    beforeAccent: '#5a4030',
    afterAccent: '#C9A84C',
  },
];

function asComparison(p: GalleryPanel): GalleryComparisonCase {
  return { ...p, kind: 'comparison' };
}

/** Results page: comparisons + optional video highlights */
export const resultsOutcomes: GalleryOutcome[] = [
  ...galleryPanels.map(asComparison),
  {
    kind: 'video',
    id: 100,
    label: 'Highlight',
    vehicle: 'BMW M4',
    service: 'Process reel',
    outcome: 'Multi-stage correction and protection in motion',
    poster: '/images/before-after/after-PPF.png',
    src: '/videos/showcase.mp4',
    duration: '0:12',
    filter: 'ppf',
  },
];
