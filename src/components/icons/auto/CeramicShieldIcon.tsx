import type { AutoIconProps } from './types';

/** Ceramic coating — droplet over protective shield */
export function CeramicShieldIcon({
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
      <path d="M12 3.2c-1.7 0-3.1 1.4-3.1 3.1 0 1.8 1.4 3.4 3.1 4.5 1.7-1.1 3.1-2.7 3.1-4.5 0-1.7-1.4-3.1-3.1-3.1Z" />
      <path d="M12 11.4 18 14v4.2c0 1.5-1 2.8-2.4 3.3L12 22.8l-3.6-1.3C7 21 6 19.7 6 18.2V14l6-2.6Z" />
      <path d="M12 14.2v5.1" opacity="0.45" />
    </svg>
  );
}