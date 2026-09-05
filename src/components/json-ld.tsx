/**
 * Emits JSON-LD.
 *
 * The escape matters: a `<` inside the serialised JSON would otherwise be able
 * to close this script element. Content here comes from frontmatter at build
 * time, but escaping costs nothing and removes the question.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
