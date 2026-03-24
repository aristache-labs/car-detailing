import type { ComponentType } from 'react';
import {
  CarSeatIcon,
  CeramicShieldIcon,
  EngineBlockIcon,
  GlossPanelIcon,
  InspectionLampIcon,
  PolisherIcon,
  PpfLayerIcon,
  WheelRimIcon,
} from '@/components/icons/auto';
import type { AutoIconProps } from '@/components/icons/auto';

const PREVIEW_ICONS: { name: string; Component: ComponentType<AutoIconProps> }[] = [
  { name: 'PolisherIcon', Component: PolisherIcon },
  { name: 'CeramicShieldIcon', Component: CeramicShieldIcon },
  { name: 'PpfLayerIcon', Component: PpfLayerIcon },
  { name: 'WheelRimIcon', Component: WheelRimIcon },
  { name: 'EngineBlockIcon', Component: EngineBlockIcon },
  { name: 'CarSeatIcon', Component: CarSeatIcon },
  { name: 'GlossPanelIcon', Component: GlossPanelIcon },
  { name: 'InspectionLampIcon', Component: InspectionLampIcon },
];

export default function AutoIconsPreviewPage() {
  return (
    <div
      className="min-h-screen px-6 py-10 md:px-12"
      style={{ background: 'var(--carbon-950)', fontFamily: 'var(--font-inter)' }}
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Dev preview</p>
        <h1 className="mb-2 text-2xl font-bold text-white">Automotive icon set</h1>
        <p className="mb-8 max-w-xl text-sm text-white/55">
          Open this route while running the dev server to compare icons and decide placements. Remove or protect this
          route before production if you do not want it public.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {PREVIEW_ICONS.map(({ name, Component }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center rounded-lg border border-white/8 bg-white/2 px-4 py-6"
            >
              <Component className="text-[#C9A84C]" size={32} strokeWidth={2} />
              <span className="mt-3 text-center text-[11px] font-medium text-white/50">{name}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-white/35">
          Sizes: default 24×24 — pass <code className="text-white/60">size=28</code> or{' '}
          <code className="text-white/60">size=32</code> for larger UI. Color via{' '}
          <code className="text-white/60">className=&quot;text-[#C9A84C]&quot;</code> (Tailwind) or parent{' '}
          <code className="text-white/60">color</code>.
        </p>
      </div>
    </div>
  );
}
