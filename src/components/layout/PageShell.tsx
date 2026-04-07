import type { ReactNode } from 'react';

/** Offset for fixed navbar (76px) on inner pages */
export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen pt-[76px] lg:pt-[88px]">{children}</div>;
}
