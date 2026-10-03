// Derives the logo variants the site needs from the owner's full logo PNG.
// Run with: npm run brand:derive
// Re-run whenever a new source logo is dropped into src/assets/brand/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'src/assets/brand/logo-full-transparent.png';
const OUT = 'src/assets/brand';
const PUBLIC = 'public';

// Crop boxes are in pixels of the 2748 x 2040 source file.
// If the source file changes size, these need adjusting.
const CROPS = {
  // Elephant with the butterfly, no lettering. Used in the header lockup.
  mark: { left: 560, top: 40, width: 1560, height: 1085 },
  // Elephant only, for small sizes (favicon, app icons).
  icon: { left: 600, top: 60, width: 1360, height: 1065 },
};

async function crop(name) {
  return sharp(SRC).extract(CROPS[name]).trim({ threshold: 1 }).toBuffer();
}

await mkdir(PUBLIC, { recursive: true });

// Full stacked logo, trimmed of empty space.
await sharp(SRC).trim({ threshold: 1 }).png().toFile(`${OUT}/logo-full.png`);

// Header mark.
await sharp(await crop('mark')).png().toFile(`${OUT}/logo-mark.png`);

// Square icon on a cream background, padded so it reads at tiny sizes.
const iconBuf = await crop('icon');
async function squareIcon(size, pad, file) {
  const inner = Math.round(size * (1 - pad * 2));
  const resized = await sharp(iconBuf)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: '#F8F7F3' },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toFile(file);
}

await squareIcon(32, 0.02, `${PUBLIC}/favicon-32.png`);
await squareIcon(180, 0.08, `${PUBLIC}/apple-touch-icon.png`);
await squareIcon(512, 0.08, `${PUBLIC}/icon-512.png`);

// Link preview image (shown when the site is shared): the full logo
// centred on the cream page background, 1200 x 630.
const ogLogo = await sharp(SRC)
  .trim({ threshold: 1 })
  .resize({ height: 520, fit: 'inside' })
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#F8F7F3' } })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .png()
  .toFile(`${PUBLIC}/og-image.png`);

console.log('Logo variants written to', OUT, 'and', PUBLIC);
