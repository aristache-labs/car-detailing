import type { SVGProps } from 'react';

export type AutoIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  /** Viewport size in px (default 24) */
  size?: number;
  /** Stroke width in px (default 2) */
  strokeWidth?: number;
};
