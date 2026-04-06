import { servicesCatalog } from '@/data/services-catalog';

export type ServicePricingItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  startingPrice: string;
  priceLabel: string;
  summary: string;
  includedItems: string[];
  badge: string;
  featured?: boolean;
  ctaLabel: string;
};

const pricingMeta: Record<
  string,
  Omit<ServicePricingItem, 'id' | 'number' | 'title' | 'subtitle'>
> = {
  'exterior-detailing': {
    startingPrice: '180',
    priceLabel: 'From',
    summary: 'A clean exterior reset for vehicles that need safer maintenance and a sharper finish.',
    includedItems: ['Safe wash', 'Iron decon', 'Clay treatment', 'Gloss enhancement'],
    badge: 'Exterior',
    ctaLabel: 'Book Exterior Quote',
  },
  'paint-correction': {
    startingPrice: '450',
    priceLabel: 'From',
    summary: 'For dull, swirled, or lightly marked paint that needs clarity, depth, and refinement.',
    includedItems: ['Paint inspection', 'Machine polishing', 'Gloss refinement', 'Panel-by-panel finish'],
    badge: 'Paint',
    ctaLabel: 'Book Correction Quote',
  },
  'ceramic-coating': {
    startingPrice: '650',
    priceLabel: 'From',
    summary: 'Long-term protection for owners who want easier maintenance and a richer final gloss.',
    includedItems: ['Surface prep', 'Ceramic application', 'Hydrophobic protection', 'Aftercare guidance'],
    badge: 'Protection',
    featured: true,
    ctaLabel: 'Book Coating Quote',
  },
  ppf: {
    startingPrice: '900',
    priceLabel: 'From',
    summary: 'Front-end and high-impact protection designed around coverage, film type, and vehicle shape.',
    includedItems: ['Coverage planning', 'Film templating', 'Edge-wrapped fit', 'Inspection handoff'],
    badge: 'Protection',
    ctaLabel: 'Book PPF Quote',
  },
  'interior-detailing': {
    startingPrice: '220',
    priceLabel: 'From',
    summary: 'A deeper cabin refresh for daily-driven cars that need cleanliness, comfort, and reset.',
    includedItems: ['Vacuum and blowout', 'Steam clean', 'Surface detailing', 'Odor reduction'],
    badge: 'Interior',
    ctaLabel: 'Book Interior Quote',
  },
  'leather-care': {
    startingPrice: '280',
    priceLabel: 'From',
    summary: 'Targeted care for worn, dry, or marked leather that needs restoration and protection.',
    includedItems: ['Leather clean', 'Conditioning', 'Color refresh', 'Protective finish'],
    badge: 'Interior',
    ctaLabel: 'Book Leather Quote',
  },
  wheels: {
    startingPrice: '160',
    priceLabel: 'From',
    summary: 'Precision wheel and caliper work for cleaner barrels, sharper detail, and show-ready finish.',
    includedItems: ['Wheel-face clean', 'Iron decon', 'Barrel detailing', 'Protection applied'],
    badge: 'Specialty',
    ctaLabel: 'Book Wheel Quote',
  },
  'engine-bay': {
    startingPrice: '150',
    priceLabel: 'From',
    summary: 'Controlled engine-bay detailing for cleaner presentation, safer upkeep, and sale prep.',
    includedItems: ['Safe degreasing', 'Trim dressing', 'Protected surfaces', 'Final wipe-down'],
    badge: 'Specialty',
    ctaLabel: 'Book Engine Quote',
  },
};

export const servicePricingItems: ServicePricingItem[] = servicesCatalog.map((service) => ({
  id: service.id,
  number: service.number,
  title: service.title,
  subtitle: service.subtitle,
  ...pricingMeta[service.id],
}));
