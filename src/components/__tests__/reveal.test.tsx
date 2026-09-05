import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Reveal } from '@/components/reveal';

describe('Reveal', () => {
  it('starts hidden so the server and client markup agree', () => {
    // No IntersectionObserver in jsdom by default, which is also the
    // no-support path: it must fall back to visible rather than stay hidden.
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
