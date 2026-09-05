'use client';

import { useEffect, useState } from 'react';
import { THEME_KEY } from '@/lib/theme';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    const nextTheme =
      savedTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.style.colorScheme = nextTheme;
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={mounted ? toggleTheme : undefined}
      aria-label="Toggle appearance"
      title={theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance'}
      className="text-ink transition-opacity hover:opacity-70"
    >
      {/* Rendered identically until mounted, so the markup never shifts. */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        aria-hidden="true"
        className={mounted ? undefined : 'opacity-0'}
      >
        {theme === 'dark' ? (
          <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
        ) : (
          <>
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1m10.9-4.9-1 1M5.1 10.9l-1 1m0-7.8 1 1m5.8 5.8 1 1" />
          </>
        )}
      </svg>
    </button>
  );
}
