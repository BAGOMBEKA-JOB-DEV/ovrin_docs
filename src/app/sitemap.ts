import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { listAllContentRoutes } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const lastModified = new Date();

  // Every route is derived from the content tree, so a page cannot be
  // advertised to crawlers unless it was actually built. `trailingSlash` is on
  // in next.config.mjs, so the canonical URLs carry one.
  const routes = ['/', ...listAllContentRoutes()].sort();

  return routes.map((route) => ({
    url: route === '/' ? `${base}/` : `${base}${route}/`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.7,
  }));
}
