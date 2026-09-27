// Automated accessibility check for every built page.
// Run after `npm run build` with: npm run check:a11y
//
// For each page it:
//   1. runs axe (WCAG 2.1 A and AA rules) on desktop and phone widths
//   2. checks there is no sideways scrolling at 320px wide
//   3. checks the mobile menu opens, closes and works with the keyboard
//
// It serves the built dist/ folder itself, the same way GitHub Pages will.
// Set CHROMIUM_PATH to use an already-installed browser.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { createServer } from 'node:http';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, relative, sep } from 'node:path';

const PORT = 4329;
const BASE = '/Elephant-Path-Website';
const ORIGIN = `http://localhost:${PORT}`;

async function findPages(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await findPages(full)));
    else if (entry.name === 'index.html') {
      const rel = relative('dist', dir).split(sep).join('/');
      out.push(rel ? `/${rel}/` : '/');
    } else if (entry.name === '404.html') out.push('/404.html');
  }
  return out.sort();
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

// A tiny static file server for dist/, mounted under the base path.
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, ORIGIN).pathname);
  let file = null;
  if (path.startsWith(`${BASE}/`) || path === BASE) {
    file = normalize(join('dist', path.slice(BASE.length)));
    if (!file.startsWith('dist')) file = null;
  }
  try {
    if (!file) throw new Error('outside base');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': TYPES['.html'] });
    res.end(await readFile('dist/404.html').catch(() => 'Not found'));
  }
});
await new Promise((r) => server.listen(PORT, r));

let problems = 0;
const report = (msg) => {
  problems++;
  console.log(`  ✗ ${msg}`);
};

try {
  const pages = await findPages('dist');
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

  const viewports = [
    { name: 'desktop', width: 1280, height: 900 },
    { name: 'phone', width: 375, height: 800 },
  ];

  for (const path of pages) {
    const url = `${ORIGIN}${BASE}${path}`;
    const before = problems;
    console.log(`\n${path}`);

    for (const vp of viewports) {
      // Reduced motion shows all content at once, so axe checks everything.
      const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      for (const v of results.violations) {
        report(`[${vp.name}] ${v.id} (${v.impact}): ${v.help}`);
        for (const node of v.nodes.slice(0, 3)) console.log(`      at ${node.target.join(' ')}`);
      }
      const h1s = await page.locator('h1').count();
      if (h1s !== 1) report(`[${vp.name}] expected exactly one h1, found ${h1s}`);
      await ctx.close();
    }

    // Reflow at 320px (WCAG 1.4.10)
    const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (overflow > 0) report(`[320px] page scrolls sideways by ${overflow}px`);

    // Mobile menu: keyboard open, Escape closes and returns focus
    const toggle = page.locator('[data-menu-toggle]');
    const menu = page.locator('#site-menu');
    if (!(await toggle.isVisible())) report('[320px] menu button not visible');
    else {
      if (await menu.isVisible()) report('[320px] menu should start closed');
      await toggle.focus();
      await page.keyboard.press('Enter');
      if ((await toggle.getAttribute('aria-expanded')) !== 'true' || !(await menu.isVisible()))
        report('[320px] menu did not open with Enter');
      await page.keyboard.press('Tab');
      const inMenu = await page.evaluate(() =>
        document.getElementById('site-menu')?.contains(document.activeElement)
      );
      if (!inMenu) report('[320px] Tab after opening the menu did not move into it');
      await page.keyboard.press('Escape');
      const focusedToggle = await page.evaluate(() =>
        document.activeElement?.hasAttribute('data-menu-toggle')
      );
      if ((await toggle.getAttribute('aria-expanded')) !== 'false' || (await menu.isVisible()))
        report('[320px] Escape did not close the menu');
      if (!focusedToggle) report('[320px] focus did not return to the menu button');
    }
    if (!(await page.getByRole('link', { name: 'Get started' }).isVisible()))
      report('[320px] "Get started" is not visible on mobile');
    await ctx.close();

    if (problems === before) console.log('  ✓ no issues');
  }

  await browser.close();
} finally {
  server.close();
}

if (problems) {
  console.log(`\n${problems} accessibility problem(s) found.`);
  process.exit(1);
}
console.log('\nAll pages passed the automated accessibility checks.');
