import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import { SiteFooter } from '@/components/site-footer';

describe('HomePage', () => {
  // HomePage is an async server component now — it awaits Shiki at build time,
  // so the test awaits the same call rather than rendering an element.
  it('renders the hero content and primary actions', async () => {
    render(await HomePage());

    expect(
      screen.getByRole('heading', { name: /turn documents into trusted structured data/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the guide/i })).toHaveAttribute('href', '/learn');
    expect(screen.getByRole('link', { name: /api reference/i })).toHaveAttribute(
      'href',
      '/reference/extract',
    );
  });

  it('highlights every sample at build time, with both themes', async () => {
    const { container } = render(await HomePage());
    const plates = container.querySelectorAll('.code-plate pre.shiki');

    expect(plates).toHaveLength(4);
    for (const plate of plates) {
      expect(plate.className).toContain('shiki-themes');
    }
  });

  it('renders the footer credit', () => {
    render(<SiteFooter />);

    expect(screen.getByText(/developed and maintained by/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bagombeka job/i })).toHaveAttribute(
      'href',
      'https://github.com/BAGOMBEKA-JOB-DEV',
    );
  });
});
