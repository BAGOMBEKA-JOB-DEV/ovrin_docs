import { siteConfig } from '@/config/site';

/** Absolute URL for a site-relative route, with the trailing slash the export uses. */
function absolute(route: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  if (route === '/') return `${base}/`;
  return `${base}${route.endsWith('/') ? route : `${route}/`}`;
}

const publisher = {
  '@type': 'Organization',
  name: siteConfig.name,
  url: absolute('/'),
};

/** The site itself, for the homepage. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: absolute('/'),
    description: siteConfig.description,
    publisher,
  };
}

/** The library the documentation is about. */
export function softwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'Ovrin',
    description:
      'A Go library that turns documents into typed, validated structured data, with confidence ' +
      'scores and provenance for every extracted value.',
    codeRepository: siteConfig.repo,
    programmingLanguage: 'Go',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    url: absolute('/'),
  };
}

/** One documentation page. */
export function techArticleSchema({
  title,
  description,
  route,
}: {
  title: string;
  description?: string;
  route: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    ...(description ? { description } : {}),
    url: absolute(route),
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: absolute('/') },
    publisher,
  };
}

/**
 * The trail to a page. `/learn/pipeline` becomes Home → Learn → the page, which
 * is the hierarchy the URL already implies but nothing currently states.
 */
export function breadcrumbSchema({ title, route }: { title: string; route: string }) {
  const [track] = route.replace(/^\//, '').split('/');
  const items: { name: string; url: string }[] = [{ name: 'Home', url: absolute('/') }];

  if (track) {
    const label = track.charAt(0).toUpperCase() + track.slice(1);
    items.push({ name: label, url: absolute(`/${track}`) });
  }
  // A track root is already its own second entry; don't repeat it.
  if (route !== `/${track}`) {
    items.push({ name: title, url: absolute(route) });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
