import { DocsShell } from '@/components/docs-shell';
import { getDoc, renderMarkdownWithHighlight, resolveContentFile } from '@/lib/content';
import { flattenSidebar, sidebarReference } from '@/sidebars';

export function generateStaticParams() {
  return flattenSidebar(sidebarReference)
    .filter((item) => resolveContentFile(item.path as string))
    .map((item) => ({
      slug: (item.path as string).replace('/reference', '').split('/').filter(Boolean),
    }));
}

function routeFor(slug: string[] | undefined): string {
  return slug?.length ? `/reference/${slug.join('/')}` : '/reference';
}

export default async function ReferencePage({ params }: { params: Promise<{ slug?: string[] }> }) {
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
