import type { Metadata } from 'next';
import { docMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, techArticleSchema } from '@/lib/structured-data';
import { DocsShell } from '@/components/docs-shell';
import { getDoc, renderMarkdownWithHighlight, resolveContentFile } from '@/lib/content';
import { flattenSidebar, sidebarCommunity } from '@/sidebars';

export function generateStaticParams() {
  const root = '/community';

  // A sidebar may link across tracks — "Tag grammar" lives under /reference but
  // is listed in the Learn tree. Only paths belonging to this track are built
  // here; the rest are ordinary links owned by their own route.
  return flattenSidebar(sidebarCommunity)
    .map((item) => item.path)
    .filter((path) => path === root || path.startsWith(`${root}/`))
    .filter((path) => resolveContentFile(path))
    .map((path) => ({ slug: path.slice(root.length).split('/').filter(Boolean) }));
}

function routeFor(slug: string[] | undefined): string {
  return slug?.length ? `/community/${slug.join('/')}` : '/community';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = routeFor(slug);
  const { title, description } = getDoc(route).frontmatter;

  return docMetadata({ title, description, route });
}

export default async function CommunityPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const route = routeFor(slug);
  const doc = getDoc(route);
  const html = await renderMarkdownWithHighlight(doc.body);

  const { title, description } = doc.frontmatter;

  return (
    <>
      <JsonLd
        data={[
          techArticleSchema({ title, description, route }),
          breadcrumbSchema({ title, route }),
        ]}
      />
      <DocsShell
        title={title}
        description={description}
        currentPath={route}
        headings={doc.headings}
      >
        <article className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
      </DocsShell>
    </>
  );
}
