'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { sidebarCommunity, sidebarLearn, sidebarReference, trackForPath } from '@/sidebars';

function useSidebarForPath(path: string) {
  const track = trackForPath(path);
  switch (track) {
    case 'reference':
      return sidebarReference;
    case 'community':
      return sidebarCommunity;
    case 'learn':
    default:
      return sidebarLearn;
  }
}

export function DocsShell({
  title,
  description,
  currentPath,
  children,
}: {
  title: string;
  description?: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  const sidebar = useSidebarForPath(currentPath);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#efefeb] text-slate-900 transition-colors duration-200 dark:bg-[#0b1220] dark:text-slate-100">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {sidebarOpen ? 'Hide sections' : 'Show sections'}
          </button>

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
            Documentation
          </span>
        </div>

        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-[1px] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside
            className={[
              'fixed inset-y-0 left-0 z-40 w-[82vw] max-w-[320px] transform overflow-y-auto border-r border-slate-200 bg-[#f5f5f3] p-5 shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-[#101b2d] lg:static lg:z-auto lg:w-auto lg:max-w-none lg:translate-x-0 lg:rounded-[24px] lg:border lg:shadow-[0_12px_30px_rgba(15,23,42,0.04)]',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full',
              'lg:translate-x-0',
            ].join(' ')}
          >
            <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 lg:border-none lg:pb-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Navigation
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
              >
                ✕
              </button>
            </div>

            {sidebar.map((section) => (
              <div key={section.title} className="mb-7 last:mb-0">
                <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {section.title}
                </div>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <div className={currentPath === item.path ? 'rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white' : 'rounded-xl text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'}>
                        <Link
                          href={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className="block px-3 py-2 text-sm font-medium"
                        >
                          {item.title}
                        </Link>
                      </div>

                      {item.children?.length ? (
                        <ul className="mt-1.5 space-y-1 pl-3">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <Link
                                href={child.path}
                                onClick={() => setSidebarOpen(false)}
                                className={
                                  currentPath === child.path
                                    ? 'block rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white'
                                    : 'block rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100'
                                }
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          <main className="rounded-[24px] border border-slate-200 bg-[#f7f7f5] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#101b2d] sm:p-8 lg:rounded-[24px]">
            <div className="max-w-3xl">
              <div className="mb-4 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300 lg:block">
                Documentation
              </div>
              <h1 className="text-4xl font-black tracking-[-0.06em] text-slate-950 dark:text-white sm:text-5xl">
                {title}
              </h1>
              {description ? <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{description}</p> : null}
            </div>

            <div className="mt-8 max-w-3xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
