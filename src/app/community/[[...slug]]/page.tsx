import { marked } from 'marked';
import { DocsShell } from '@/components/docs-shell';
import { getDoc, resolveContentFile } from '@/lib/content';
import { flattenSidebar, sidebarCommunity } from '@/sidebars';

export function generateStaticParams() {
  return flattenSidebar(sidebarCommunity)
    .filter((item) => resolveContentFile(item.path as string))
    .map((item) => ({
      slug: (item.path as string).replace('/community', '').split('/').filter(Boolean),
    }));
}

function routeFor(slug: string[] | undefined): string {
  return slug?.length ? `/community/${slug.join('/')}` : '/community';
}

export default async function CommunityPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const route = routeFor(slug);
  const doc = getDoc(route);
  const html = marked.parse(doc.body, { breaks: true, gfm: true });

  return (
    <DocsShell title={doc.frontmatter.title} description={doc.frontmatter.description} currentPath={route}>
      <article className="article-content" dangerouslySetInnerHTML={{ __html: String(html) }} />
    </DocsShell>
  );
}
