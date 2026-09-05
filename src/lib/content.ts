import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { codeToHtml } from 'shiki';
import { marked, Renderer } from 'marked';

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

/** Strips inline markup so a heading slug matches the text a reader sees. */
function headingText(raw: string): string {
  return raw
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .trim();
}

export function extractHeadings(body: string): Heading[] {
  const withoutCode = body.replace(/^```[\s\S]*?^```/gm, '');
  const slugger = new GithubSlugger();
  const out: Heading[] = [];

  for (const line of withoutCode.split('\n')) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match?.[1] || !match[2]) continue;
    const depth = match[1].length === 2 ? 2 : 3;
    const text = headingText(match[2]);
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

  const body = stripLeadingTitle(content, frontmatter.title);

  return {
    route,
    filePath,
    frontmatter,
    body,
    headings: extractHeadings(body),
  };
}

/** The one place in the repo that names a syntax theme. */
export const CODE_THEMES = { light: 'github-light', dark: 'github-dark' } as const;

/**
 * Highlights a block of code at build time. Both themes are emitted — the light
 * one inline, the dark one as custom properties — so code follows the page
 * appearance instead of a single compiled-in theme looking identical in both.
 */
export async function highlightCode(code: string, lang = 'text'): Promise<string> {
  const options = { themes: CODE_THEMES, defaultColor: 'light' } as const;
  try {
    return await codeToHtml(code, { lang, ...options });
  } catch {
    // An unlabelled or unknown fence language must not fail the build.
    return await codeToHtml(code, { lang: 'text', ...options });
  }
}

/**
 * Removes a leading `# Title` when it just repeats the frontmatter title.
 *
 * Every content file opens with one, and DocsShell already renders the title
 * from frontmatter, so keeping both puts two <h1> elements on every page.
 */
export function stripLeadingTitle(body: string, title: string): string {
  const match = /^\s*#\s+(.+?)\s*(?:\n|$)/.exec(body);
  if (!match?.[1] || headingText(match[1]) !== headingText(title)) {
    return body;
  }
  return body.slice(match[0].length).replace(/^\n+/, '');
}

/**
 * marked emits no heading ids, so nothing on the page can be linked to and an
 * "on this page" rail has no anchors. Ids are assigned only at the depths
 * extractHeadings collects, so the two agree slug for slug.
 */
function headingIdRenderer(): Renderer {
  const slugger = new GithubSlugger();
  const renderer = new Renderer();

  renderer.heading = function heading({ tokens, depth }) {
    const inner = this.parser.parseInline(tokens);
    if (depth < 2 || depth > 3) {
      return `<h${depth}>${inner}</h${depth}>\n`;
    }
    const raw = tokens.map((token) => ('raw' in token ? token.raw : '')).join('');
    return `<h${depth} id="${slugger.slug(headingText(raw))}">${inner}</h${depth}>\n`;
  };

  return renderer;
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

    out += markdown.slice(cursor, start) + (await highlightCode(code, language));
    cursor = start + full.length;
  }

  out += markdown.slice(cursor);

  return String(marked.parse(out, { breaks: true, gfm: true, renderer: headingIdRenderer() }));
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
