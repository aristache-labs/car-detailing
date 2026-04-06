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
  outcome: string;
  beforeBg: string;
  afterBg: string;
  beforeAccent: string;
  afterAccent: string;
};

/** Before/after gallery entries — single source for Home preview and Results page */
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
    beforeBg: 'linear-gradient(135deg, #17120e 0%, #0d0b08 100%)',
    afterBg: 'linear-gradient(135deg, #1a1814 0%, #0e0c0a 100%)',
    beforeAccent: '#5a4030',
    afterAccent: '#C9A84C',
  },
];
