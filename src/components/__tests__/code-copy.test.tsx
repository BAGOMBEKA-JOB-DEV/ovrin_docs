import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CodeCopy } from '@/components/code-copy';

/** A snippet shaped the way the Shiki transformer writes one. */
function addSnippet() {
  const pre = document.createElement('pre');
  pre.innerHTML =
    '<button type="button" class="code-copy" aria-label="Copy code">' +
    '<svg class="code-copy__idle"></svg><svg class="code-copy__done"></svg></button>' +
    '<code tabindex="0"><span class="line">a := 1</span>\n<span class="line">b := 2</span>\n</code>';
  document.body.appendChild(pre);
  return pre.querySelector('button') as HTMLButtonElement;
}

/** Lets the async click handler run to completion under fake timers. */
async function settle() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

function stubClipboard(available: boolean) {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(window, 'isSecureContext', { value: available, configurable: true });
  Object.defineProperty(navigator, 'clipboard', {
    value: available ? { writeText } : undefined,
    configurable: true,
  });
  return writeText;
}

describe('CodeCopy', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.querySelectorAll('pre').forEach((pre) => pre.remove());
  });

  it('marks the page ready, so the buttons only show once they can work', () => {
    render(<CodeCopy />);
    expect(document.documentElement.getAttribute('data-code-copy')).toBe('ready');
  });

  it('copies the code exactly, without the button or a trailing newline', async () => {
    const writeText = stubClipboard(true);
    render(<CodeCopy />);
    const button = addSnippet();

    fireEvent.click(button);
    await settle();

    expect(writeText).toHaveBeenCalledWith('a := 1\nb := 2');
  });

  it('shows it was copied, announces it, then resets', async () => {
    stubClipboard(true);
    render(<CodeCopy />);
    const button = addSnippet();

    fireEvent.click(button);
    await settle();

    expect(button.dataset.copied).toBe('true');
    expect(button).toHaveAttribute('aria-label', 'Copied');
    expect(screen.getByRole('status')).toHaveTextContent('Copied to clipboard');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(button.dataset.copied).toBeUndefined();
    expect(button).toHaveAttribute('aria-label', 'Copy code');
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('falls back to execCommand where the Clipboard API is unavailable', async () => {
    stubClipboard(false);
    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', { value: execCommand, configurable: true });
    render(<CodeCopy />);
    const button = addSnippet();

    fireEvent.click(button);
    await settle();

    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(button.dataset.copied).toBe('true');
  });

  it('ignores clicks that are not on a copy button', async () => {
    const writeText = stubClipboard(true);
    render(<CodeCopy />);
    addSnippet();

    fireEvent.click(document.body);
    await settle();

    expect(writeText).not.toHaveBeenCalled();
  });
});
