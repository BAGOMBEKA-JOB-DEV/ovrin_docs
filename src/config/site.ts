const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ovrin-docs.vercel.app';

export const siteConfig = {
  name: 'Ovrin Docs',
  tagline: 'Document extraction for typed Go data',
  description: 'MDX documentation for Ovrin, a Go library for turning documents into structured data.',
  url: siteUrl,
  repo: 'https://github.com/BAGOMBEKA-JOB-DEV/ovrin',
  repoDocs: 'https://github.com/BAGOMBEKA-JOB-DEV/ovrin_docs',
  keywords: [
    'Ovrin',
    'document extraction',
    'Go library',
    'structured data',
    'OCR',
    'schema validation',
    'document processing',
  ],
};
