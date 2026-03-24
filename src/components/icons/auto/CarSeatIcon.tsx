import type { AutoIconProps } from './types';

/** Interior detailing — seat with premium clean accent */
export function CarSeatIcon({
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
      <rect x="12.8" y="3.2" width="3.4" height="3.2" rx="1" />
      <path d="M11.9 6.4h2.4c2.8 0 4.7 1.9 4.7 4.8v2.2" />
      <path d="M12.1 13.5c-1.8 0-3.2.8-4.2 2.2" />
      <path d="M7.9 15.7v2c0 1 .8 1.8 1.8 1.8h8.1" />
      <path d="M16 19.5h1.9c.5 0 .9-.1 1.2-.4" />
      <path d="M6.2 6.2v1.1" />
      <path d="M5.65 6.75h1.1" />
    </svg>
  );
}