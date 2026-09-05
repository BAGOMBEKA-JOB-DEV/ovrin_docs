import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { codeToHtml } from 'shiki';
import { marked } from 'marked';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

export interface Frontmatter {
  title: string;
  description?: string;
}

export interface Doc {
  route: string;
  filePath: string;
  frontmatter: Frontmatter;
  body: string;
  headings: Heading[];
}

export interface Heading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function resolveContentFile(route: string): string | undefined {
  const rel = route.replace(/^\//, '');
  const candidates = [
    path.join(CONTENT_ROOT, `${rel}.mdx`),
    path.join(CONTENT_ROOT, rel, 'index.mdx'),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

export function extractHeadings(body: string): Heading[] {
  const withoutCode = body.replace(/^```[\s\S]*?^```/gm, '');
  const slugger = new GithubSlugger();
  const out: Heading[] = [];

  for (const line of withoutCode.split('\n')) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match?.[1] || !match[2]) continue;
    const depth = match[1].length === 2 ? 2 : 3;
    const text = match[2]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .trim();
    out.push({ depth, text, id: slugger.slug(text) });
  }
  return out;
}

export function getDoc(route: string): Doc {
  const filePath = resolveContentFile(route);
  if (!filePath) {
    throw new Error(`No MDX file for route "${route}".`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;

  if (!frontmatter.title) {
    throw new Error(`${filePath} has no title in frontmatter.`);
  }

  return {
    route,
    filePath,
    frontmatter,
    body: content,
    headings: extractHeadings(content),
  };
}

export async function renderMarkdownWithHighlight(markdown: string): Promise<string> {
  const codeFencePattern = /```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g;

  // Rebuild the string positionally. A string-argument String.replace would
  // substitute the first occurrence rather than this one, so two identical
  // fences in a file would render wrongly, and `$&` sequences in Shiki's
  // output would be treated as replacement patterns.
  let out = '';
  let cursor = 0;

  for (const match of Array.from(markdown.matchAll(codeFencePattern))) {
    const [full, language = 'text', code = ''] = match;
    const start = match.index ?? 0;

    let replacement: string;
    try {
      replacement = await codeToHtml(code, { lang: language, theme: 'github-dark' });
    } catch {
      // An unlabelled or unknown fence language should not fail the build.
      replacement = await codeToHtml(code, { lang: 'text', theme: 'github-dark' });
    }

    out += markdown.slice(cursor, start) + replacement;
    cursor = start + full.length;
  }

  out += markdown.slice(cursor);

  return String(marked.parse(out, { breaks: true, gfm: true }));
}

export function listAllContentRoutes(): string[] {
  const out: string[] = [];
  const walk = (dir: string, prefix: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, `${prefix}/${entry.name}`);
      } else if (entry.name.endsWith('.mdx')) {
        const base = entry.name.replace(/\.mdx$/, '');
        out.push(base === 'index' ? prefix : `${prefix}/${base}`);
      }
    }
  };
  walk(CONTENT_ROOT, '');
  return out;
}
