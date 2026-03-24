import type { AutoIconProps } from './types';

/** Exterior gloss — panel reflection with sparkle */
export function GlossPanelIcon({
  className,
  size = 24,
  strokeWidth = 2,
  ...props
}: AutoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 16.2c4.2-3.5 8.9-5 18-3.5" />
      <path d="M17.3 5.2v2.3" />
      <path d="M16.15 6.35h2.3" />
      <path d="M19.55 4v1.4" opacity="0.65" />
      <path d="M18.85 4.7h1.4" opacity="0.65" />
    </svg>
  );
}