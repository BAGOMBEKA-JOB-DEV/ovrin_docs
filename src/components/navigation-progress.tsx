'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * A top progress bar for client-side navigation.
 *
 * Moving between pages fetches the target route's RSC payload. Until it
 * arrives the current page just sits there, and without feedback the link
 * reads as broken.
 *
 * # Why not loading.tsx
 *
 * Next's Suspense fallback replaces the whole segment, and the sidebar lives
 * inside the page rather than in a layout — so a `loading.tsx` would blank the
 * entire shell on every hop, including fast ones. It also breaks this site
 * specifically: with a statically exported async page, Next emits the fallback
 * visible and the real page inside `<div hidden>`, so a visitor without
 * JavaScript sees only the spinner. A bar leaves the current page on screen.
 *
 * # Why the delay is CSS
 *
 * The bar is always mounted and fades in on a delay (see `.nav-progress` in
 * globals.css). A navigation that finishes inside that window never paints it,
 * so there is no timer to schedule, cancel or leak — and no flash on a fast
 * click, which is worse than showing nothing at all.
 */

/** Fires when navigation starts by some route other than a link click. */
const START_EVENT = 'ovrin:navigation-start';

/**
 * Signals that a navigation has begun.
 *
 * Exported for `router.push` callers: a programmatic push dispatches no click,
 * so the listener below cannot see it.
 */
export function startNavigation(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(START_EVENT));
  }
}

/** A navigation that never resolves must not leave the bar running forever. */
const SAFETY_TIMEOUT_MS = 10_000;

export function NavigationProgress() {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();

  // The popstate handler needs the current route but must not be re-registered
  // on every navigation, so it reads through a ref.
  const pathnameRef = useRef(pathname);

  const start = useCallback(() => setPending(true), []);

  // Arrival is the completion signal: usePathname changes only once the new
  // page has rendered.
  useEffect(() => {
    pathnameRef.current = pathname;
    setPending(false);
  }, [pathname]);

  useEffect(() => {
    if (!pending) return;
    const id = window.setTimeout(() => setPending(false), SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [pending]);

  useEffect(() => {
    // One capture-phase listener rather than wrapping every <Link>: body links
    // come from rendered Markdown across 40 pages, and this catches those, the
    // sidebar, the nav and the buttons alike.
    const onClick = (event: MouseEvent) => {
      // A modified click opens a new tab; this page never navigates, so
      // starting the bar would leave it stuck on.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.('a');
      const href = anchor?.getAttribute('href');
      if (!anchor || !href) return;
      if (anchor.hasAttribute('download')) return;
      if (anchor.getAttribute('target') === '_blank') return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Leaving the site entirely.
      if (url.origin !== window.location.origin) return;
      // A same-page anchor scrolls; it does not navigate.
      if (url.pathname === window.location.pathname && url.hash) return;
      // Clicking the page you are already on does nothing.
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      start();
    };

    // Back and forward also fire for hash-only history entries — returning from
    // a table-of-contents anchor, say. There the pathname never changes, so
    // nothing would clear the bar and it would run to the safety timeout.
    const onPopState = () => {
      if (window.location.pathname !== pathnameRef.current) start();
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    window.addEventListener(START_EVENT, start);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener(START_EVENT, start);
    };
  }, [start]);

  return (
    <>
      {/* Decorative: a shimmer announced on every click is noise. The live
          region below carries the same information for assistive tech. */}
      <div
        className={`nav-progress${pending ? ' nav-progress--active' : ''}`}
        data-testid="nav-progress"
        data-pending={pending ? 'true' : 'false'}
        aria-hidden="true"
      >
        <span className="nav-progress__bar" />
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {pending ? 'Loading page' : ''}
      </div>
    </>
  );
}
