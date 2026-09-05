'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '/learn', label: 'Learn' },
  { href: '/reference', label: 'Reference' },
  { href: '/community', label: 'Community' },
];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
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
    <header
      className={[
        'sticky top-0 z-40 border-b border-slate-200/80 bg-[#f8f7f4]/90 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0d1625]/90',
        compact ? 'top-0' : '',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-100 dark:text-slate-900">
            O
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-[-0.06em] text-slate-900 dark:text-slate-100">ovrin</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              docs
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/BAGOMBEKA-JOB-DEV/ovrin"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white sm:inline-flex"
          >
            GitHub
          </a>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-base text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white md:hidden"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close mobile menu"
          className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div
        className={[
          'fixed inset-y-0 left-0 z-40 w-[82vw] max-w-[320px] transform border-r border-slate-200 bg-[#f8f7f4] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.28)] transition-transform duration-300 ease-out md:hidden dark:border-slate-800 dark:bg-[#0d1625]',
          mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
        ].join(' ')}
      >
        <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://github.com/BAGOMBEKA-JOB-DEV/ovrin"
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            GitHub
          </a>

          <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
