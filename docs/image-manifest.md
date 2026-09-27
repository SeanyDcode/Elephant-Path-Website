# Image manifest

A list of every illustration and photo slot on the site. Each slot shows a
labelled placeholder until the real image arrives. Phase 2 will add the slots
for the other pages.

**Style for all illustrations (brief, section 7.4):** watercolour; elephants and
their babies, soft paths and grasses; soft edges and low saturation. The colours
should sit comfortably with the M2 "River stone" palette (cream, stone grey,
olive, soft yellow). No stock photos of people in therapy.

**How to deliver them:** a high-resolution PNG or JPG at least 2× the display
size listed below (for example 1600 px wide for an 800 px slot). The site
automatically makes the small, fast web versions (AVIF/WebP).

| File name | Page, section | Shape (aspect ratio) | Shown at up to | Subject |
|---|---|---|---|---|
| `illus-home-welcome-4x3.webp` | Home, Welcome | 4:3 landscape | 480 × 360 px | Mother elephant and her baby walking together on a soft path |
| `headshot-sandra-1x1.webp` | Home, Meet Sandra (also About) | 1:1 square, shown as a circle | 320 × 320 px | Headshot of Sandra: a warm, natural photo with plain or soft background (owner to provide) |

## Logo files

| File | Where it's used | Status |
|---|---|---|
| `src/assets/brand/logo-full-transparent.png` | Source file supplied by the owner (2748 × 2040) | Received |
| `src/assets/brand/logo-full.png` | Home hero and footer (derived, trimmed) | Generated |
| `src/assets/brand/logo-mark.png` | Header, next to the name (derived: elephant, butterfly and path) | Generated |
| `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-512.png` | Browser tab and phone home-screen icons (derived: elephant only) | Generated |
| Logo on white background | Printed/other uses, and for comparison | **Still needed** |
| Original or vector logo file (AI, EPS, SVG or PDF), if one exists | Sharper small icons and social images | **Still needed** |

To regenerate the derived logo files after replacing the source, run
`npm run brand:derive`.
