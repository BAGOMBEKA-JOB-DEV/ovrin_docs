import { describe, expect, it } from 'vitest';
import {
  getDoc,
  listAllContentRoutes,
  renderMarkdownWithHighlight,
  resolveContentFile,
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
