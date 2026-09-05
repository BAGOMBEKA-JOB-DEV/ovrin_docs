import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Reveal } from '@/components/reveal';

describe('Reveal', () => {
  it('falls back to visible where IntersectionObserver is unavailable', () => {
    // jsdom provides none, which is also the real no-support path: content
    // must end up visible rather than stranded hidden.
    render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );

    expect(screen.getByText('content').parentElement).toHaveAttribute('data-shown', 'true');
  });

  it('shows immediately when the visitor asked for reduced motion', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => {},
      removeEventListener: () => {},
    } as unknown as MediaQueryList);

    render(
      <Reveal>
        <p>reduced</p>
      </Reveal>,
    );

    expect(screen.getByText('reduced').parentElement).toHaveAttribute('data-shown', 'true');
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
});
