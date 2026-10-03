# Image manifest

A list of every illustration and photo slot on the site. A slot shows a
labelled placeholder until its image arrives.

**Style for all illustrations (brief, section 7.4):** watercolour; elephants and
their babies, soft paths and grasses; soft edges and low saturation. The colours
should sit comfortably with the M2 "River stone" palette (cream, stone grey,
olive, soft yellow). No stock photos of people in therapy.

**How to deliver them:** a high-resolution PNG or JPG at least 2× the display
size listed below (for example 1600 px wide for an 800 px slot). The site
automatically makes the small, fast web versions (AVIF/WebP).

| File | Page, section | Shape | Subject | Status |
|---|---|---|---|---|
| `src/assets/illustrations/side-by-side-elephants.png` | Home, Welcome | 4:3 landscape | Mother elephant and calf walking side by side | Received, in place |
| `src/assets/illustrations/walking-family-elephants.png` | About, Why elephants? | 16:9 wide | Elephant family walking along a path | Received, in place |
| `src/assets/illustrations/head-to-head-elephants.png` | Services & Fees, top of page | 3:2 landscape | Mother elephant and calf resting their heads together | Received, in place |
| `src/assets/illustrations/hugging-elephants.png` | Get started, top of page | 4:3 landscape | Mother elephant wrapping her trunk around her calf | Received, in place |
| `src/assets/photos/sandra-headshot.png` | About, Meet Sandra | 1:1, already cropped to a circle | Headshot of Sandra | Received, in place |
| `public/og-image.png` | Link previews when the site is shared | 1.91:1 (1200 × 630 px) | The full logo on the cream background, made by `npm run brand:derive` | Generated |

To add or swap an illustration, put the image in `src/assets/illustrations/` and
point the page at it. The site makes the small, fast web versions automatically.

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
