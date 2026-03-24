import type { AutoIconProps } from './types';

/** Wheel & caliper — premium rim silhouette */
export function WheelRimIcon({
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
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.2v4.8" />
      <path d="M12 15v4.8" />
      <path d="M4.2 12h4.8" />
      <path d="M15 12h4.8" />
      <path d="M6.7 6.7 9.5 9.5" opacity="0.45" />
      <path d="M14.5 14.5 17.3 17.3" opacity="0.45" />
      <path d="M17.3 6.7 14.5 9.5" opacity="0.45" />
      <path d="M9.5 14.5 6.7 17.3" opacity="0.45" />
    </svg>
  );
}