import type { ShikiTransformer } from 'shiki';

/** Class on the copy button written into every highlighted `<pre>`. */
export const COPY_BUTTON_CLASS = 'code-copy';

/**
 * Set on `<html>` once the copy handler is listening. The buttons stay hidden
 * until then, so a visitor without JavaScript never meets a button that does
 * nothing.
 */
export const COPY_READY_ATTRIBUTE = 'data-code-copy';

type HastElement = Parameters<NonNullable<ShikiTransformer['pre']>>[0];

function shape(tagName: string, properties: HastElement['properties']): HastElement {
  return { type: 'element', tagName, properties, children: [] };
}

function icon(state: 'idle' | 'done', children: HastElement[]): HastElement {
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: [`${COPY_BUTTON_CLASS}__${state}`],
      width: '16',
      height: '16',
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ariaHidden: 'true',
    },
    children,
  };
}

/**
 * Writes a copy button into every snippet Shiki highlights.
 *
 * It is done here, at build time, because every code block on the site passes
 * through `highlightCode`, so no page can end up without one. The button holds
 * SVGs only: the dark-theme rule recolours every `.shiki span`, and a span in
 * here would lose its colour.
 *
 * The `<code>` element becomes the scrolling region (see globals.css), so it
 * takes the keyboard focus the `<pre>` would otherwise have had.
 */
export const copyButtonTransformer: ShikiTransformer = {
  name: 'ovrin:copy-button',

  pre(node) {
    delete node.properties.tabindex;
    delete node.properties.tabIndex;

    node.children.unshift({
      type: 'element',
      tagName: 'button',
      properties: {
        type: 'button',
        className: [COPY_BUTTON_CLASS],
        ariaLabel: 'Copy code',
        title: 'Copy code',
      },
      children: [
        icon('idle', [
          shape('rect', { x: '5.5', y: '5.5', width: '8', height: '8', rx: '1.5' }),
          shape('path', { d: 'M10.5 5.5v-2A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2' }),
        ]),
        icon('done', [shape('path', { d: 'M3.5 8.5l3 3 6-7' })]),
      ],
    });
  },

  code(node) {
    node.properties.tabIndex = 0;
  },
};
