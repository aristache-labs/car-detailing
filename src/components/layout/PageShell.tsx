import type { ReactNode } from 'react';

/** Offset for fixed navbar (76px) on inner pages */
export default function PageShell({ children }: { children: ReactNode }) {
  return <div className="pt-[76px] min-h-screen">{children}</div>;
}
