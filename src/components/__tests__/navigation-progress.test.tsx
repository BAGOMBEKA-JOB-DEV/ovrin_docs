import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { NavigationProgress } from '@/components/navigation-progress';

vi.mock('next/navigation', () => ({ usePathname: () => '/learn' }));

function clickAnchor(attrs: Record<string, string>, init: MouseEventInit = {}) {
  const anchor = document.createElement('a');
  for (const [key, value] of Object.entries(attrs)) anchor.setAttribute(key, value);
  document.body.appendChild(anchor);
  // The listener is a plain DOM handler, so the state update it triggers is
  // outside React's event batching and needs flushing explicitly.
  act(() => {
    anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0, ...init }));
  });
  return anchor;
}

const isPending = () => screen.getByTestId('nav-progress').getAttribute('data-pending');

describe('NavigationProgress', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.history.replaceState({}, '', '/learn');
  });

  it('is idle until something navigates', () => {
    render(<NavigationProgress />);
    expect(isPending()).toBe('false');
  });

  it('starts on a same-origin link click', () => {
    render(<NavigationProgress />);
    clickAnchor({ href: '/reference/extract' });
    expect(isPending()).toBe('true');
  });

  // Each of these leaves the current page in place, so a bar would stick on.
  it.each([
    ['an external link', { href: 'https://example.com/x' }, {}],
    ['a new-tab link', { href: '/reference', target: '_blank' }, {}],
    ['a download link', { href: '/file.pdf', download: '' }, {}],
    ['a same-page anchor', { href: '#section' }, {}],
    ['the page you are on', { href: '/learn' }, {}],
    ['a modifier-click', { href: '/reference' }, { metaKey: true }],
    ['a middle-click', { href: '/reference' }, { button: 1 }],
  ])('does not start for %s', (_label, attrs, init) => {
    render(<NavigationProgress />);
    clickAnchor(attrs as Record<string, string>, init as MouseEventInit);
    expect(isPending()).toBe('false');
  });

  it('announces loading to assistive tech only while pending', () => {
    render(<NavigationProgress />);
    expect(screen.getByRole('status')).toHaveTextContent('');
    clickAnchor({ href: '/reference/extract' });
    expect(screen.getByRole('status')).toHaveTextContent('Loading page');
  });
});
