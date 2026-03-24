import type { AutoIconProps } from './types';

/** Inspection / paint check — handheld detailing lamp */
export function InspectionLampIcon({
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
      <rect x="16.5" y="5.5" width="3.2" height="8" rx="0.9" />
      <path d="M16.5 13.5 11 16v3.6l5.5-2.4v-3.7Z" />
      <path d="M7 16.1 10.1 14.8" opacity="0.45" />
      <path d="M14 7.6h-2.3" opacity="0.45" />
      <path d="M14 10h-3.3" opacity="0.45" />
    </svg>
  );
}