// The M2 "River stone" colour palette, as listed in the build brief.
// Used by the style tile page and by scripts/check-contrast.mjs.
// If you change a colour, change it in src/styles/tokens.css too.

export const colors = [
  { token: '--bg', hex: '#F8F7F3', use: 'Page background (cream)' },
  { token: '--surface', hex: '#FFFFFF', use: 'Cards, form fields' },
  { token: '--stone-100', hex: '#E6E6E2', use: 'Section bands, card fills' },
  { token: '--stone-400', hex: '#A9ABA6', use: 'Decorative only: dividers, illustration tints', decorative: true },
  { token: '--charcoal', hex: '#45484A', use: 'Secondary text, secondary button outline, form field borders' },
  { token: '--ink', hex: '#35383A', use: 'Headings and body text' },
  { token: '--olive', hex: '#55683A', use: 'Primary buttons, links, focus ring' },
  { token: '--olive-dark', hex: '#465630', use: 'Primary button hover and active' },
  { token: '--sage-100', hex: '#DDE3CF', use: 'Soft highlight bands (text on it: #34402A)' },
  { token: '--yellow-200', hex: '#F0E4A0', use: 'Small highlights and tags only (text on it: #5A4E1A)' },
  { token: '--logo-green', hex: '#6B7F4E', use: 'Decorative only, matches the logo lettering', decorative: true },
];

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG contrast ratio between two hex colours, e.g. 4.5 means 4.5:1.
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
