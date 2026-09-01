import { getDoc, resolveContentFile } from '@/lib/content';
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

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">{doc.frontmatter.title}</h1>
      {doc.frontmatter.description ? (
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{doc.frontmatter.description}</p>
      ) : null}
      <article className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: doc.body }} />
      </article>
    </main>
  );
}
