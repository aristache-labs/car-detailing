'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const isLargeScreen = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    const hasFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    const isWindows =
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.includes('Windows') || navigator.platform.toLowerCase().includes('win'));
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isWindows || prefersReducedMotion || !isLargeScreen || !hasFinePointer) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    const startLoop = () => {
      if (rafId === 0) {
        rafId = requestAnimationFrame(raf);
      }
    };
    const stopLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopLoop();
        return;
      }
      startLoop();
    };

    startLoop();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopLoop();
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
