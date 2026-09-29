// Marks links to other websites inside Markdown content (blog posts) the same way the ExternalLink component does: a small icon and
// "(external site)" for screen readers.

const icon = {
  type: 'element',
  tagName: 'svg',
  properties: {
    className: ['ext-icon'],
    ariaHidden: 'true',
    focusable: 'false',
    viewBox: '0 0 16 16',
    width: 14,
    height: 14,
  },
  children: [
    {
      type: 'element',
      tagName: 'path',
      properties: {
        d: 'M9 2h5v5M14 2 7.5 8.5M12 9.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3.5',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      children: [],
    },
  ],
};

const label = {
  type: 'element',
  tagName: 'span',
  properties: { className: ['visually-hidden'] },
  children: [{ type: 'text', value: ' (external site)' }],
};

// A hast plugin for Astro's default Markdown processor (Sätteri).
export const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = String(node.properties?.href ?? '');
      if (!/^https?:\/\//.test(href)) return;
      ctx.setProperty(node, 'className', ['ext']);
      ctx.appendChild(node, [structuredClone(icon), structuredClone(label)]);
    },
  },
};
