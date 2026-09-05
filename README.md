# Ovrin Docs

A polished documentation website for Ovrin, built with Next.js. Content is authored as Markdown and rendered at build time with `marked` and Shiki. This repository contains the public-facing docs experience for the Ovrin ecosystem, helping developers understand the product, install it, explore the API, and integrate it into real document-processing workflows.

## Overview

Ovrin is a Go library for turning documents into typed, validated, reviewable structured data. It is designed for real-world extraction workflows where values matter: invoices, receipts, forms, health records, contracts, tax documents, and other document types where correctness, provenance, and explainability are essential.

This documentation repo translates the product into a cleaner developer experience with:

- overview and onboarding content
- installation and setup guidance
- conceptual learning material
- API reference pages
- contribution and project governance docs
- a professional docs site layout inspired by modern documentation systems

## Related repositories

- Backend / core project: https://github.com/BAGOMBEKA-JOB-DEV/ovrin
- This docs site: https://github.com/BAGOMBEKA-JOB-DEV/ovrin_docs

## Why this repo exists

The Ovrin project is a technical product with strong architecture and meaningful documentation in its upstream codebase, but the developer experience benefits from a dedicated docs site. This repository presents that content in an easy-to-navigate structure focused on:

- understanding what Ovrin is
- seeing how it differs from generic PDF-to-JSON prompting
- learning the staged extraction pipeline
- configuring providers and dependencies correctly
- integrating extraction into application code
- reviewing validation, confidence, and provenance signals

## Stack

This project uses:

- Next.js 15
- React 19
- TypeScript
- Markdown content (`marked` + `gray-matter`)
- Shiki syntax highlighting
- Tailwind CSS
- App Router

## Features

- Markdown documentation content, rendered and highlighted at build time
- route-based docs organization
- learning, reference, and community sections
- sidebar navigation and docs-shell layout
- dark mode with a premium enterprise-style theme
- responsive mobile navigation
- reusable UI components
- static export for a clean deployment model

## Project structure

```text
ovrin_docs/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── icon.svg
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── {learn,reference,community}/[[...slug]]/page.tsx
│   ├── components/
│   │   ├── docs-shell.tsx
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── ui/button.tsx
│   │   └── __tests__/
│   ├── content/
│   │   ├── learn/
│   │   ├── reference/
│   │   └── community/
│   ├── lib/          # content loading, markdown rendering, theme bootstrap
│   ├── sidebars/     # hand-maintained navigation trees
│   ├── styles/
│   └── config/
├── .github/workflows/ci.yml
├── .env.example
├── eslint.config.mjs
├── vitest.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```

## Prerequisites

Before running this project locally, make sure you have:

- Node.js 20 or newer
- npm 10 or newer

## Local development

1. Clone the repository:

   ```bash
   git clone https://github.com/BAGOMBEKA-JOB-DEV/ovrin_docs.git
   cd ovrin_docs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Update the site URL if needed for your environment.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the project in your browser:

   ```text
   http://localhost:3000
   ```

## Production build and deployment

To create a production build:

```bash
npm run build
```

To preview the production build locally, serve the exported files. `next start` does not
work with `output: 'export'`, so serve `out/` with any static file server:

```bash
npx serve out
```

For deployment, set the production site URL in the hosting environment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example.com
```

This project is configured for static export (`output: 'export'`) and is suitable for deployment to hosts such as Vercel, Netlify, or a static web host.

## Quality checks

Run linting:

```bash
npm run lint
```

Run TypeScript validation:

```bash
npm run typecheck
```

Run the test suite:

```bash
npm test
```

CI runs all four — lint, typecheck, test, build — on every push and pull request.

## Documentation structure

The content is organized into three main sections:

### Learn

Introduction and conceptual onboarding for Ovrin, including:

- what Ovrin is and why it exists
- installation and setup
- pipeline architecture
- validation, provenance, and confidence signals
- provider selection and integration patterns

### Reference

Technical API and implementation details, including:

- client setup
- extraction usage
- result structures
- schema tags
- validation rules
- provider matrix

### Community

Project governance and contributor-facing guidance:

- contributing guide
- roadmap information
- rules and standards
- release status

## Contributing

Contributions are welcome.

If you want to improve the docs:

1. create a feature branch
2. update or add MDX content under the appropriate section
3. keep documentation consistent with the project architecture
4. validate with the local build and lint checks

Suggested contributions include:

- clarifying onboarding sections
- improving API examples
- refining installation steps
- adding missing edge-case documentation
- improving layout, accessibility, or mobile UX

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Notes

This repo is the documentation frontend for Ovrin. The actual backend / engine work lives in the Ovrin project repository linked above. This docs site is meant to make that product easier to understand, adopt, and contribute to.
