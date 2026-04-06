import type { GalleryComparisonCase, GalleryOutcome, GalleryPanel } from '@/data/gallery-cases';

export type ResultFilterId = 'all' | 'correction' | 'coating' | 'ppf' | 'interior';

export const RESULT_FILTERS: { id: ResultFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'correction', label: 'Correction' },
  { id: 'coating', label: 'Ceramic' },
  { id: 'ppf', label: 'PPF' },
  { id: 'interior', label: 'Interior' },
];

/** Map gallery panel label to filter for comparison items */
export function panelFilter(panel: GalleryPanel): Exclude<ResultFilterId, 'all'> {
  if (panel.label === 'Polish') return 'correction';
  if (panel.label === 'Ceramic') return 'coating';
  if (panel.label === 'PPF') return 'ppf';
  if (panel.label === 'Interior') return 'interior';
  return 'correction';
}

export function outcomeCategory(outcome: GalleryOutcome): Exclude<ResultFilterId, 'all'> {
  if (outcome.kind === 'video') return outcome.filter;
  return panelFilter(outcome);
}

export function filterOutcomes(outcomes: GalleryOutcome[], filter: ResultFilterId): GalleryOutcome[] {
  if (filter === 'all') return outcomes;
  return outcomes.filter((o) => outcomeCategory(o) === filter);
}

function isComparison(o: GalleryOutcome): o is GalleryComparisonCase {
  return o.kind === 'comparison';
}

/** First comparison in filtered list, or first comparison in full list (fallback). */
export function featuredComparison(
  outcomes: GalleryOutcome[],
  filtered: GalleryOutcome[],
): GalleryPanel | null {
  const fromFiltered = filtered.find(isComparison);
  if (fromFiltered) return fromFiltered;
  const fallback = outcomes.find(isComparison);
  return fallback ?? null;
}

/** Legacy: filter comparison-only panels */
export function filterPanels(panels: GalleryPanel[], filter: ResultFilterId): GalleryPanel[] {
  if (filter === 'all') return panels;
  return panels.filter((p) => panelFilter(p) === filter);
}
