import type { AutoIconProps } from './types';

/** Orbital polisher — paint correction / machine refinement */
export function PolisherIcon({
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
      <circle cx="8" cy="16" r="3.25" />
      <path d="M10.8 13.8 15 9.6c.8-.8 2-.8 2.8 0l1 1c.7.7.7 1.9 0 2.6l-3.7 3.7" />
      <path d="M15.8 8.8 17.6 7" />
      <path d="M13.6 15.8 15.5 17.7" opacity="0.45" />
    </svg>
  );
}