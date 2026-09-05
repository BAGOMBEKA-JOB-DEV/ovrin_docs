'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { siteConfig } from '@/config/site';

const navItems = [
  { href: '/learn', label: 'Learn' },
  { href: '/reference', label: 'Reference' },
  { href: '/community', label: 'Community' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Apple's nav is 44px, translucent, and saturates what passes behind it.
          Separation is one hairline — never a shadow. */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-nav backdrop-blur-nav">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-11 max-w-(--container-story) items-center justify-between px-[22px]"
        >
          <Link
            href="/"
            className="text-micro font-semibold text-ink transition-opacity hover:opacity-70"
          >
            Ovrin
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-micro text-ink transition-opacity hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.repo}
                target="_blank"
                rel="noreferrer"
                className="text-micro text-ink transition-opacity hover:opacity-70"
              >
                GitHub
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="text-micro text-ink transition-opacity hover:opacity-70 md:hidden"
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-11 bottom-0 z-30 bg-nav backdrop-blur-nav md:hidden">
          <ul className="mx-auto flex max-w-(--container-story) flex-col px-[22px]">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-hairline">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-title-3 text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-hairline">
              <a
                href={siteConfig.repo}
                target="_blank"
                rel="noreferrer"
                className="block py-4 text-title-3 text-ink"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
