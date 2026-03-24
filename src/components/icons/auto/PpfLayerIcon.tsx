import type { AutoIconProps } from './types';

/** PPF — layered protective film with lifted corner */
export function PpfLayerIcon({
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
      <path d="M4 17.5h12.5" />
      <path d="M6 13.8h10.5" opacity="0.75" />
      <path d="M8 10.1h8.5" opacity="0.5" />
      <path d="M16.5 17.5 20 14v-3.3" />
      <path d="M16.5 13.8 19 11.3" opacity="0.6" />
    </svg>
  );
}