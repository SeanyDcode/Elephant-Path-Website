// Checks every text/background colour pairing used on the site against
// WCAG 2.1 AA. Run with: npm run check:contrast
// The colours here must match src/styles/tokens.css.
import { contrast } from '../src/lib/tokens.js';

const t = {
  bg: '#F8F7F3',
  surface: '#FFFFFF',
  stone100: '#E6E6E2',
  stone400: '#A9ABA6',
  charcoal: '#45484A',
  ink: '#35383A',
  olive: '#55683A',
  oliveDark: '#465630',
  sage100: '#DDE3CF',
  onSage: '#34402A',
  yellow200: '#F0E4A0',
  onYellow: '#5A4E1A',
  white: '#FFFFFF',
  error: '#9B3A2E', // form error text and invalid field border (not in the brief's palette)
};

// [foreground, background, minimum ratio, what it is]
// 4.5 = normal text, 3 = UI components, borders and focus rings.
const pairs = [
  ['ink', 'bg', 4.5, 'Body text on page'],
  ['ink', 'surface', 4.5, 'Body text on cards'],
  ['ink', 'stone100', 4.5, 'Body text on stone band'],
  ['charcoal', 'bg', 4.5, 'Secondary text on page'],
  ['charcoal', 'surface', 4.5, 'Secondary text on cards'],
  ['charcoal', 'stone100', 4.5, 'Secondary text on stone band'],
  ['olive', 'bg', 4.5, 'Links on page'],
  ['olive', 'surface', 4.5, 'Links on cards'],
  ['olive', 'stone100', 4.5, 'Links on stone band'],
  ['oliveDark', 'sage100', 4.5, 'Links on sage band'],
  ['white', 'olive', 4.5, 'Primary button text'],
  ['white', 'oliveDark', 4.5, 'Primary button text (hover)'],
  ['onSage', 'sage100', 4.5, 'Text on sage band'],
  ['onYellow', 'yellow200', 4.5, 'Text on yellow tag'],
  ['error', 'surface', 4.5, 'Error message on white'],
  ['error', 'bg', 4.5, 'Error message on page'],
  ['charcoal', 'surface', 3, 'Form field border'],
  ['error', 'surface', 3, 'Invalid field border'],
  ['charcoal', 'bg', 3, 'Secondary button outline'],
  ['olive', 'bg', 3, 'Focus ring on page'],
  ['olive', 'surface', 3, 'Focus ring on cards'],
  ['olive', 'stone100', 3, 'Focus ring on stone band'],
  ['olive', 'sage100', 3, 'Focus ring on sage band'],
];

const ratio = contrast;

let failed = 0;
for (const [fg, bg, min, label] of pairs) {
  const r = ratio(t[fg], t[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1 (needs ${min})  ${label}  [${fg} on ${bg}]`);
}
console.log(
  `stone-400 on bg is ${ratio(t.stone400, t.bg).toFixed(2)}:1, so it stays decorative only.`
);
if (failed) {
  console.error(`\n${failed} pairing(s) failed.`);
  process.exit(1);
}
console.log('\nAll colour pairings pass WCAG 2.1 AA.');
