# Image manifest

A list of every illustration and photo slot on the site. Each slot shows a
labelled placeholder until the real image arrives.

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
| `headshot-sandra-1x1.webp` | Home, Meet Sandra; About, Meet Sandra | 1:1 square, shown as a circle | 320 × 320 px | Headshot of Sandra: a warm, natural photo with a plain or soft background (owner to provide) |
| `illus-about-elephants-16x9.webp` | About, Why elephants? | 16:9 wide | 720 × 405 px | An elephant family walking together along a winding path |
| `illus-services-3x2.webp` | Services & Fees, top of page | 3:2 landscape | 480 × 320 px | A baby elephant walking beneath its mother along a soft path |
| `illus-resources-3x2.webp` | Resources, top of page | 3:2 landscape | 480 × 320 px | Elephants resting by a quiet watering hole, a butterfly nearby |
| `illus-contact-4x3.webp` | Contact, top of page | 4:3 landscape | 480 × 360 px | An elephant calf reaching its trunk toward its mother’s trunk |
| `illus-guide-grief-3x2.webp` | Guide: Grief and loss | 3:2 landscape | 480 × 320 px | Elephants gathered close together at dusk, one resting its trunk on another |
| `illus-guide-illness-3x2.webp` | Guide: Illness and the end of life | 3:2 landscape | 480 × 320 px | A mother elephant sheltering her calf beneath her under a soft sky |
| `illus-guide-caregivers-3x2.webp` | Guide: Primary caregivers | 3:2 landscape | 480 × 320 px | An adult elephant walking slowly beside an older elephant along a winding path |
| `illus-guide-parenting-3x2.webp` | Guide: Parenting | 3:2 landscape | 480 × 320 px | A young elephant calf playing near its mother in tall grass |
| `og-image-1200x630.png` | Link previews when the site is shared (Phase 5) | 1.91:1 | 1200 × 630 px | Built from the logo; no new artwork needed unless preferred |

**Total:** 9 illustrations, 1 headshot.

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
