import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Metadata for one documentation page.
 *
 * Next replaces nested metadata objects rather than merging them, so a page
 * that sets `openGraph` loses everything the layout put there — siteName, the
 * image, the twitter card. Building the whole object in one place is what stops
 * that happening again silently.
 */
const TRACK_LABELS: Record<string, string> = {
  learn: 'Learn',
  reference: 'Reference',
  community: 'Community',
};

/**
 * Qualifies a short page title with its track.
 *
 * A reference page called "OCR" produced `OCR — Ovrin Docs`, which is almost
 * no query surface. `OCR — Reference — Ovrin Docs` says what kind of page it
 * is without touching the h1, which should stay the bare type name. A track
 * root is already named after its track, so it is left alone.
 */
function qualifiedTitle(title: string, route: string): string {
  const [track] = route.replace(/^\//, '').split('/');
  const label = track ? TRACK_LABELS[track] : undefined;
  if (!label || route === `/${track}`) return title;
  return `${title} — ${label}`;
}

export function docMetadata({
  title,
  description,
  route,
}: {
  title: string;
  description?: string;
  route: string;
}): Metadata {
  const pageTitle = qualifiedTitle(title, route);

  return {
    title: pageTitle,
    description,
    alternates: { canonical: route },
    openGraph: {
      type: 'article',
      url: route,
      siteName: siteConfig.name,
      title,
      description,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}
