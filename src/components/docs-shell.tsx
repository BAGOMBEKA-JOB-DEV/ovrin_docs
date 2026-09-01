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

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100">
      <SiteHeader />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-[26px] border border-slate-200 bg-white/80 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.03)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Navigation
          </div>

          {sidebar.map((section) => (
            <div key={section.title} className="mb-7 last:mb-0">
              <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {section.title}
              </div>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <div className={currentPath === item.path ? 'rounded-xl border border-blue-200 bg-blue-50 text-slate-900 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-white' : 'rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/80'}>
                      <Link href={item.path} className="block px-3 py-2 text-sm font-medium">
                        {item.title}
                      </Link>
                    </div>

                    {item.children?.length ? (
                      <ul className="mt-1.5 space-y-1 pl-3">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <Link
                              href={child.path}
                              className={
                                currentPath === child.path
                                  ? 'block rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-slate-900 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-white'
                                  : 'block rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100'
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

        <main className="rounded-[26px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.03)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
          <div className="max-w-3xl">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
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
  );
}
