import type { ReactNode } from 'react';

/** Offset for the fixed navbar on inner pages: 76px mobile, 88px desktop */
export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen pt-[76px] lg:pt-[88px]">{children}</div>;
}
