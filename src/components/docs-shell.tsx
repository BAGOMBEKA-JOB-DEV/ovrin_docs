'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import type { Heading } from '@/lib/content';
import { sidebarCommunity, sidebarLearn, sidebarReference, trackForPath } from '@/sidebars';

/** Below this many sections an "on this page" rail is noise, not navigation. */
const MIN_HEADINGS_FOR_RAIL = 3;

function sidebarForPath(path: string) {
  switch (trackForPath(path)) {
    case 'reference':
      return sidebarReference;
    case 'community':
      return sidebarCommunity;
    case 'learn':
    default:
      return sidebarLearn;
  }
}

function NavLink({
  href,
  active,
  nested = false,
  children,
  onNavigate,
}: {
  href: string;
  active: boolean;
  nested?: boolean;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={[
        'block border-l py-1.5 text-caption transition-colors',
        nested ? 'pl-6' : 'pl-4',
        // Active state is weight, colour and a rule — not a filled pill.
        active
          ? 'border-accent font-semibold text-accent'
          : 'border-transparent text-ink-secondary hover:text-ink',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

export function DocsShell({
  title,
  description,
  currentPath,
  headings = [],
  children,
}: {
  title: string;
  description?: string;
  currentPath: string;
  headings?: Heading[];
  children: React.ReactNode;
}) {
  const sidebar = sidebarForPath(currentPath);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showRail = headings.length >= MIN_HEADINGS_FOR_RAIL;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <div className="mx-auto flex max-w-[1400px] gap-0 px-[22px]">
        {/* Sidebar. Separated by a hairline, not a card. */}
        <aside
          className={[
            'fixed inset-y-0 left-0 z-40 w-[86vw] max-w-[320px] overflow-y-auto',
            'border-r border-hairline bg-canvas px-[22px] py-8',
            'transition-transform duration-300 ease-apple',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:sticky lg:top-11 lg:z-auto lg:h-[calc(100vh-2.75rem)] lg:w-64 lg:shrink-0',
            'lg:translate-x-0 lg:px-0 lg:pr-8',
          ].join(' ')}
        >
          <nav aria-label="Documentation">
            {sidebar.map((section) => (
              <div key={section.title} className="mb-8 last:mb-0">
                <h2 className="mb-2 pl-4 text-micro font-semibold tracking-wide text-ink-secondary uppercase">
                  {section.title}
                </h2>
                <ul>
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        href={item.path}
                        active={currentPath === item.path}
                        onNavigate={closeSidebar}
                      >
                        {item.title}
                      </NavLink>
                      {item.children?.length ? (
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                href={child.path}
                                active={currentPath === child.path}
                                nested
                                onNavigate={closeSidebar}
                              >
                                {child.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeSidebar}
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          />
        )}

        <main className="min-w-0 flex-1 py-10 lg:py-14 lg:pl-10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mb-6 text-caption text-accent lg:hidden"
          >
            Documentation menu
          </button>

          <div className="max-w-(--container-measure)">
            <h1 className="text-title-2 text-balance">{title}</h1>
            {description ? (
              <p className="mt-3 text-lede text-ink-secondary">{description}</p>
            ) : null}
            <div className="mt-10">{children}</div>
          </div>
        </main>

        {showRail && (
          <aside className="hidden w-56 shrink-0 py-14 pl-8 xl:block">
            <nav aria-label="On this page" className="sticky top-24">
              <h2 className="mb-3 text-micro font-semibold tracking-wide text-ink-secondary uppercase">
                On this page
              </h2>
              <ul className="space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={[
                        'block text-caption text-ink-secondary transition-colors hover:text-ink',
                        heading.depth === 3 ? 'pl-3' : '',
                      ].join(' ')}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
