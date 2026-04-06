import type { GalleryPanel } from '@/data/gallery-cases';

export type ResultFilterId = 'all' | 'correction' | 'coating' | 'ppf' | 'interior';

export const RESULT_FILTERS: { id: ResultFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'correction', label: 'Correction' },
  { id: 'coating', label: 'Ceramic' },
  { id: 'ppf', label: 'PPF' },
  { id: 'interior', label: 'Interior' },
];

/** Map gallery panel id to filter for chips */
export function panelFilter(panel: GalleryPanel): Exclude<ResultFilterId, 'all'> {
  if (panel.label === 'Polish') return 'correction';
  if (panel.label === 'Ceramic') return 'coating';
  if (panel.label === 'PPF') return 'ppf';
  if (panel.label === 'Interior') return 'interior';
  return 'correction';
}

export function filterPanels(panels: GalleryPanel[], filter: ResultFilterId): GalleryPanel[] {
  if (filter === 'all') return panels;
  return panels.filter((p) => panelFilter(p) === filter);
}
