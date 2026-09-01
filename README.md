# Ovrin Docs

A polished documentation website for Ovrin, built with Next.js and MDX. This repository contains the public-facing docs experience for the Ovrin ecosystem, helping developers understand the product, install it, explore the API, and integrate it into real document-processing workflows.

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
- MDX
- Tailwind CSS
- App Router

## Features

- MDX-based documentation content
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
│   │   └── ...route pages
│   ├── components/
│   │   ├── docs-shell.tsx
│   │   ├── site-header.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ui/
│   ├── content/
│   │   ├── learn/
│   │   ├── reference/
│   │   └── community/
│   ├── lib/
│   ├── sidebars/
│   ├── styles/
│   └── config/
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── LICENSE
├── README.md
└── docs-plan.md
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

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the project in your browser:

   ```text
   http://localhost:3000
   ```

## Production build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Quality checks

Run linting:

```bash
npm run lint
```

Run TypeScript validation:

```bash
npm run typecheck
```

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
