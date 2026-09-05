import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { listAllContentRoutes, resolveContentFile } from '@/lib/content';
import { statSync } from 'node:fs';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');

  // Build time would mark every page as changed on every deploy, which teaches
  // crawlers to ignore the field. The file's own mtime is the real answer.
  const lastModifiedFor = (route: string): Date => {
    const file = route === '/' ? undefined : resolveContentFile(route);
    try {
      return file ? statSync(file).mtime : new Date();
    } catch {
      return new Date();
    }
  };

  // Every route is derived from the content tree, so a page cannot be
  // advertised to crawlers unless it was actually built. `trailingSlash` is on
  // in next.config.mjs, so the canonical URLs carry one.
  const routes = ['/', ...listAllContentRoutes()].sort();

  return routes.map((route) => ({
    url: route === '/' ? `${base}/` : `${base}${route}/`,
    lastModified: lastModifiedFor(route),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.7,
  }));
}
