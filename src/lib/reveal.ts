/**
 * Marker class for the scroll-reveal effect.
 *
 * The hidden state is scoped to this class rather than applied unconditionally,
 * so a visitor without JavaScript is never served a blank page — nothing is
 * hidden unless the script that hides it actually ran.
 */
export const REVEAL_CLASS = 'js-reveal';

/**
 * Runs before first paint, for the same reason the theme script does: applying
 * the hidden state after hydration would show the content and then snatch it
 * away.
 */
export const revealInitScript = `document.documentElement.classList.add(${JSON.stringify(
  REVEAL_CLASS,
)});`;
