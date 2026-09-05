const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ovrin-docs.vercel.app';

export const siteConfig = {
  name: 'Ovrin Docs',
  tagline: 'Document extraction for typed Go data',
  description:
    'Documentation for Ovrin, a Go library that turns documents into typed, validated data — with a confidence score and provenance for every value.',
  url: siteUrl,
  repo: 'https://github.com/BAGOMBEKA-JOB-DEV/ovrin',
  repoDocs: 'https://github.com/BAGOMBEKA-JOB-DEV/ovrin_docs',
};
