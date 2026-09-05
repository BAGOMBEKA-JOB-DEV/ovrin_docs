import { describe, expect, it } from 'vitest';
import {
  getDoc,
  listAllContentRoutes,
  renderMarkdownWithHighlight,
  resolveContentFile,
  stripLeadingTitle,
} from '@/lib/content';

describe('resolveContentFile', () => {
  it('resolves a page to its .mdx file', () => {
    expect(resolveContentFile('/learn/pipeline')).toMatch(/learn\/pipeline\.mdx$/);
  });

  it('falls back to index.mdx for a section root', () => {
    expect(resolveContentFile('/learn')).toMatch(/learn\/index\.mdx$/);
  });

  it('returns undefined for a route with no file', () => {
    expect(resolveContentFile('/learn/does-not-exist')).toBeUndefined();
  });
});

describe('getDoc', () => {
  it('reads frontmatter and body', () => {
    const doc = getDoc('/learn/pipeline');
    expect(doc.frontmatter.title).toBeTruthy();
    expect(doc.body.length).toBeGreaterThan(0);
  });

  it('throws for a route with no file', () => {
    expect(() => getDoc('/learn/does-not-exist')).toThrow(/No MDX file/);
  });

  it('every content page has a title', () => {
    for (const route of listAllContentRoutes()) {
      expect(() => getDoc(route), route).not.toThrow();
    }
  });
});

describe('renderMarkdownWithHighlight', () => {
  it('highlights a fence and leaves no raw fence markers', async () => {
    const html = await renderMarkdownWithHighlight('# T\n\n```go\nfmt.Println("hi")\n```\n');
    expect(html).toContain('<pre');
    expect(html).not.toContain('```');
  });

  it('highlights every fence when two are identical', async () => {
    const fence = '```go\nx := 1\n```';
    const html = await renderMarkdownWithHighlight(`${fence}\n\ntext between\n\n${fence}\n`);
    expect(html.match(/<pre/g) ?? []).toHaveLength(2);
    expect(html).not.toContain('```');
  });

  // `$&`, `` $` `` and `$'` are String.replace substitution patterns. Building
  // the output with a string-argument replace re-injected the surrounding
  // document wherever one appeared in the highlighted code.
  it('does not treat $ sequences in code as replacement patterns', async () => {
    const html = await renderMarkdownWithHighlight(
      'intro\n\n```bash\nsed "s/a/$&/" && echo "$`" && echo "$\'"\n```\n\noutro\n',
    );
    expect(html).not.toContain('```');
    expect(html.match(/intro/g) ?? []).toHaveLength(1);
    expect(html.match(/outro/g) ?? []).toHaveLength(1);
  });

  it('falls back to plain text for an unknown fence language', async () => {
    const html = await renderMarkdownWithHighlight('```wat\nnot a real language\n```\n');
    expect(html).toContain('not a real language');
    expect(html).not.toContain('```');
  });
});

describe('stripLeadingTitle', () => {
  // DocsShell renders the title from frontmatter, so any leading h1 in the body
  // is a second one on the page.
  it('drops a leading h1', () => {
    expect(stripLeadingTitle('# Result[T]\n\nBody.')).toBe('Body.');
  });

  it('drops a leading h1 even when it differs from the frontmatter title', () => {
    // /learn opened with `# Ovrin` under `title: Overview` and shipped both.
    expect(stripLeadingTitle('# Ovrin\n\nBody.')).toBe('Body.');
  });

  it('leaves a body that starts with prose alone', () => {
    expect(stripLeadingTitle('Body.')).toBe('Body.');
  });

  it('leaves an h2 alone', () => {
    expect(stripLeadingTitle('## Section\n\nBody.')).toBe('## Section\n\nBody.');
  });

  it('leaves every real page with no leading h1', () => {
    for (const route of listAllContentRoutes()) {
      expect(getDoc(route).body.startsWith('# '), route).toBe(false);
    }
  });
});

describe('internal links', () => {
  // trailingSlash is on, so a link without one costs a 308 redirect.
  it('adds the trailing slash Markdown authors omit', async () => {
    const html = await renderMarkdownWithHighlight('[Schemas](/learn/schemas)');
    expect(html).toContain('href="/learn/schemas/"');
  });

  it('leaves external links, anchors and files untouched', async () => {
    const html = await renderMarkdownWithHighlight(
      '[gh](https://example.com/x) [a](#section) [f](/spec.pdf) [ok](/learn/)',
    );
    expect(html).toContain('href="https://example.com/x"');
    expect(html).toContain('href="#section"');
    expect(html).toContain('href="/spec.pdf"');
    expect(html).toContain('href="/learn/"');
  });

  it('keeps the slash before a hash or query', async () => {
    const html = await renderMarkdownWithHighlight('[x](/learn/schemas#tags)');
    expect(html).toContain('href="/learn/schemas/#tags"');
  });

  it('every in-content link across the site resolves without a redirect', async () => {
    for (const route of listAllContentRoutes()) {
      const html = await renderMarkdownWithHighlight(getDoc(route).body);
      for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
        expect(href.endsWith('/'), `${route} -> ${href}`).toBe(true);
      }
    }
  });
});

describe('heading anchors', () => {
  it('gives h2 and h3 ids matching the extracted headings', async () => {
    const doc = getDoc('/learn/pipeline');
    const html = await renderMarkdownWithHighlight(doc.body);

    for (const heading of doc.headings) {
      expect(html, heading.text).toContain(`id="${heading.id}"`);
    }
    expect(doc.headings.length).toBeGreaterThan(0);
  });
});

describe('code themes', () => {
  it('emits both themes so code follows the page appearance', async () => {
    const html = await renderMarkdownWithHighlight('```go\nvar x = 1\n```\n');
    expect(html).toContain('shiki-themes');
    expect(html).toContain('--shiki-dark:');
  });
});
