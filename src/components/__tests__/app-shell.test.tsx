import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the hero content and primary actions', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /turn documents into trusted structured data/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the guide/i })).toHaveAttribute('href', '/learn');
    expect(screen.getByRole('link', { name: /api reference/i })).toHaveAttribute('href', '/reference/extract');
  });

  it('renders the footer credit', () => {
    render(<HomePage />);

    expect(screen.getByText(/developed and maintained by/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bagombeka job/i })).toHaveAttribute('href', 'https://github.com/BAGOMBEKA-JOB-DEV');
  });
});
