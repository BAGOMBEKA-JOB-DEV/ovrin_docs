'use client';

import { useEffect, useState } from 'react';
import { COPY_BUTTON_CLASS, COPY_READY_ATTRIBUTE } from '@/lib/code-copy';

/** How long a button shows its check mark before returning to "Copy". */
const RESET_AFTER_MS = 2000;

async function writeToClipboard(text: string): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or unavailable: try the older route below.
    }
  }

  // The Clipboard API needs a secure context. Outside one, copying a selected
  // textarea still works in every browser.
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    area.remove();
  }
}

/**
 * Makes the copy buttons in every code snippet work.
 *
 * The buttons are written into the static HTML at build time, inside
 * `dangerouslySetInnerHTML`, so there is no component per snippet to attach a
 * handler to. One delegated listener covers every snippet on every page,
 * including pages reached by client-side navigation.
 */
export function CodeCopy() {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute(COPY_READY_ATTRIBUTE, 'ready');

    const timers = new WeakMap<HTMLButtonElement, number>();

    const onClick = async (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest?.(`button.${COPY_BUTTON_CLASS}`);
      if (!(button instanceof HTMLButtonElement)) return;

      // The code element, not the pre, so the button's own content is never
      // part of what gets copied.
      const code = button.closest('pre')?.querySelector('code');
      if (!code) return;

      const text = (code.textContent ?? '').replace(/\n$/, '');
      if (!(await writeToClipboard(text))) {
        setAnnouncement('Copy failed');
        return;
      }

      window.clearTimeout(timers.get(button));
      button.dataset.copied = 'true';
      button.setAttribute('aria-label', 'Copied');
      setAnnouncement('Copied to clipboard');

      timers.set(
        button,
        window.setTimeout(() => {
          delete button.dataset.copied;
          button.setAttribute('aria-label', 'Copy code');
          setAnnouncement('');
        }, RESET_AFTER_MS),
      );
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      root.removeAttribute(COPY_READY_ATTRIBUTE);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="sr-only">
      {announcement}
    </div>
  );
}
