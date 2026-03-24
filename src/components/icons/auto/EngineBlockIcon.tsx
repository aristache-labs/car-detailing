import type { AutoIconProps } from './types';

/** Engine bay — simplified engine block */
export function EngineBlockIcon({
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
      <path d="M6.5 12h11v6h-11z" />
      <path d="M8 12V9.2h8V12" />
      <path d="M9 9.2V6.8h2v2.4" />
      <path d="M13 9.2V6.8h2v2.4" />
      <path d="M9.5 15h5" opacity="0.45" />
    </svg>
  );
}