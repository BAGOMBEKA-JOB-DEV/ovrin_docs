import Link from 'next/link';
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
    <div className="docs-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">O</div>
          <div>
            <div className="brand-name">ovrin</div>
            <div className="brand-tag">docs</div>
          </div>
        </div>

        <nav className="topnav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/learn">Learn</Link>
          <Link href="/reference/extract">Reference</Link>
          <Link href="/community/contributing">Community</Link>
        </nav>

        <Link href={"https://github.com/BAGOMBEKA-JOB-DEV/ovrin"} className="topbar-button" target="_blank" rel="noreferrer">
          GitHub
        </Link>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="sidebar-label">Navigation</div>
          {sidebar.map((section) => (
            <div key={section.title} className="nav-section">
              <div className="nav-section-title">{section.title}</div>
              <ul>
                {section.items.map((item) => (
                  <li key={item.path} className={currentPath === item.path ? 'active' : ''}>
                    <Link href={item.path}>{item.title}</Link>
                    {item.children?.length ? (
                      <ul className="nav-children">
                        {item.children.map((child) => (
                          <li key={child.path} className={currentPath === child.path ? 'active-child' : ''}>
                            <Link href={child.path}>{child.title}</Link>
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

        <main className="doc-main">
          <div className="doc-header">
            <span className="doc-kicker">Documentation</span>
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>

          <div className="doc-body">{children}</div>
        </main>
      </div>
    </div>
  );
}
