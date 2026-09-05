import type { Sidebar } from './types';

export const sidebarReference: Sidebar = [
  {
    title: 'Core API',
    items: [
      {
        title: 'API reference',
        path: '/reference',
        description: 'The public surface, and where to start.',
      },
      {
        title: 'Extract[T]',
        path: '/reference/extract',
        description: 'Extract typed data from a file or document source.',
      },
      {
        title: 'Client',
        path: '/reference/client',
        description: 'Construct a client with your model, OCR, and rendering options.',
      },
      {
        title: 'Result[T]',
        path: '/reference/result',
        description: 'The result object with typed data, validation, and reasoning.',
      },
      {
        title: 'FieldResult',
        path: '/reference/field-result',
        description: 'Per-field content, provenance, and validation status.',
      },
    ],
  },
  {
    title: 'Interfaces',
    items: [
      { title: 'Model', path: '/reference/model', description: 'The model seam contract.' },
      { title: 'OCR', path: '/reference/ocr', description: 'The OCR seam contract.' },
      { title: 'Renderer', path: '/reference/renderer', description: 'The renderer seam contract.' },
    ],
  },
  {
    title: 'Schema and rules',
    items: [
      { title: 'Tag grammar', path: '/reference/schema-tags', description: 'Struct tags used for extraction rules.' },
      { title: 'Validation rules', path: '/reference/validation-rules', description: 'Requirements, enums, ranges, and forms.' },
      { title: 'Provider matrix', path: '/reference/provider-matrix', description: 'What providers support and what they ignore.' },
    ],
  },
];
