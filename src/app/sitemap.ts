import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ovrin-docs.vercel.app';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/learn`, lastModified: new Date() },
    { url: `${baseUrl}/reference`, lastModified: new Date() },
    { url: `${baseUrl}/community`, lastModified: new Date() },
  ];
}
