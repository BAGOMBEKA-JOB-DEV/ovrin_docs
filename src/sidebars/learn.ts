import type { Sidebar } from './types';

export const sidebarLearn: Sidebar = [
  {
    title: 'Get started',
    items: [
      {
        title: 'Overview',
        path: '/learn',
        description: 'What Ovrin is, what it solves, and why it exists.',
        children: [
          {
            title: 'Your first extraction',
            path: '/learn/your-first-extraction',
            description: 'Define a schema and extract a typed result.',
          },
          {
            title: 'Understanding the pipeline',
            path: '/learn/pipeline',
            description: 'Read the text layer, OCR only on demand, and validate the result.',
          },
        ],
      },
      {
        title: 'Installation',
        path: '/learn/installation',
        description: 'Install the core library and add provider modules.',
        children: [
          {
            title: 'Choosing a provider',
            path: '/learn/choosing-a-provider',
            description: 'OpenAI, Anthropic, Google, Tesseract, and custom adapters.',
          },
          {
            title: 'Setting up a client',
            path: '/learn/client-setup',
            description: 'Build a client with the right model, OCR, and renderer.',
          },
        ],
      },
    ],
  },
  {
    title: 'Core concepts',
    items: [
      {
        title: 'Schemas and validation',
        path: '/learn/schemas',
        description: 'Write Go structs, tag fields, and enforce validation rules.',
        children: [
          { title: 'Tag grammar', path: '/reference/schema-tags' },
          { title: 'Required and absent values', path: '/learn/validation' },
          { title: 'Cross-field checks', path: '/learn/cross-field-checks' },
        ],
      },
      {
        title: 'Confidence and explainability',
        path: '/learn/confidence',
        description: 'Understand how Ovrin scores and explains results.',
        children: [
          { title: 'Provenance and review', path: '/learn/provenance' },
          { title: 'Signals and scoring', path: '/learn/signals' },
          { title: 'When to route to review', path: '/learn/review' },
        ],
      },
      {
        title: 'Document handling',
        path: '/learn/document-handling',
        description: 'PDFs, scans, images, DOCX, XLSX, CSV, and OCR fallbacks.',
        children: [
          { title: 'PDF and text layers', path: '/learn/pdf-text-layers' },
          { title: 'OCR and rasterization', path: '/learn/ocr-rasterization' },
          { title: 'Image and office inputs', path: '/learn/image-office-inputs' },
        ],
      },
    ],
  },
  {
    title: 'Engineering',
    items: [
      {
        title: 'Architecture',
        path: '/learn/architecture',
        description: 'How the core, adapters, and internal packages fit together.',
        children: [
          { title: 'Seams and interfaces', path: '/learn/seams' },
          { title: 'Module boundaries', path: '/learn/module-boundaries' },
          { title: 'Release status', path: '/community/release-status' },
        ],
      },
      {
        title: 'Security and safety',
        path: '/learn/security',
        description: 'Treat documents as untrusted input and protect your extraction pipeline.',
        children: [
          { title: 'Threat model', path: '/learn/threat-model' },
          { title: 'Data handling', path: '/learn/data-handling' },
          { title: 'Evaluation and accuracy', path: '/learn/evaluation' },
        ],
      },
    ],
  },
];
