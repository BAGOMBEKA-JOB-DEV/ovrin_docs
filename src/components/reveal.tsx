'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades its children in once, when they first scroll into view.
 *
 * Children arrive as a prop, so they stay server-rendered — this component
 * never pulls the subtree it wraps across the client boundary.
 */
export function Reveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      // A section can be taller than the viewport, in which case it would never
      // reach a fractional threshold. "Its top edge has crossed 85% of the
      // viewport" behaves the same at any height.
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    );

    const element = ref.current;
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? 'true' : 'false'}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal ${className}`.trim()}
    >
      {children}
    </div>
  );
}
