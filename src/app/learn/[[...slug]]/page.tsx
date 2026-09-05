import type { Metadata } from 'next';
import { DocsShell } from '@/components/docs-shell';
import { getDoc, renderMarkdownWithHighlight, resolveContentFile } from '@/lib/content';
import { flattenSidebar, sidebarLearn } from '@/sidebars';

export function generateStaticParams() {
  const root = '/learn';

  // A sidebar may link across tracks — "Tag grammar" lives under /reference but
  // is listed in the Learn tree. Only paths belonging to this track are built
  // here; the rest are ordinary links owned by their own route.
  return flattenSidebar(sidebarLearn)
    .map((item) => item.path)
    .filter((path) => path === root || path.startsWith(`${root}/`))
    .filter((path) => resolveContentFile(path))
    .map((path) => ({ slug: path.slice(root.length).split('/').filter(Boolean) }));
}

function routeFor(slug: string[] | undefined): string {
  return slug?.length ? `/learn/${slug.join('/')}` : '/learn';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = routeFor(slug);
  const { title, description } = getDoc(route).frontmatter;

  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: { type: 'article', url: route, title, description },
    twitter: { title, description },
  };
}

export default async function LearnPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const route = routeFor(slug);
  const doc = getDoc(route);
  const html = await renderMarkdownWithHighlight(doc.body);

  return (
    <DocsShell title={doc.frontmatter.title} description={doc.frontmatter.description} currentPath={route}>
      <article className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
    </DocsShell>
  );
}
