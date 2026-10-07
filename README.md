# The Elephant Path website

The website for **The Elephant Path, PLLC**, a private pay telehealth counseling
practice serving clients across Michigan.

- **Live site:** https://walktheelephantpath.com

The plan for the whole site is in [`build-brief.md`](build-brief.md).

---

## How the site works, in plain language

- The site is built with **Astro**, a tool that turns the files in this
  repository into a fast, simple website with no database or server to maintain.
- This GitHub repository is the **single source of truth**. Every page, word,
  picture and setting lives here.
- **GitHub Pages** hosts the site for free. Every time a change is merged into
  the `main` branch, GitHub automatically rebuilds and republishes the site.
  This takes about 2 to 3 minutes. You can watch it on the **Actions** tab.

## How changes get made

1. Work happens on a separate **branch** (a safe copy), never directly on `main`.
2. When the work is ready, a **pull request** is opened. It explains what
   changed, in plain language.
3. GitHub automatically runs **Checks** on the pull request: it builds the site
   and tests every page for accessibility and colour contrast. A green tick
   means everything passed.
4. You review it and click **Merge**. The live site updates a few minutes later.

## Where things live

| What | Where |
|---|---|
| Pages (Home, About, and so on) | `src/pages/` (each file is one page) |
| Notice of Privacy Practices | `src/pages/privacy.astro` (the owner's document, word for word) |
| Blog posts | `src/content/blog/` (one Markdown file per post) |
| Library books | `src/content/library/` (one file per book) |
| Phone, email, links, fees, focus areas, crisis lines, menu | `src/config/site.ts`, one place for all of them |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| General look (buttons, cards, panels) | `src/styles/global.css` |
| Header, footer and other building blocks | `src/components/` |
| Page frame shared by every page | `src/layouts/BaseLayout.astro` |
| Logo files | `src/assets/brand/` |
| Watercolour illustrations | `src/assets/illustrations/` |
| Browser tab icon, phone icons | `public/` |
| List of illustrations needed | `docs/image-manifest.md` |
| Automatic publishing and checks | `.github/workflows/` |
| Helper scripts (logo cropping, checks) | `scripts/` |

Blog posts and library books are plain text files in `src/content/`. Content
is updated through Claude Code: describe the change, and it edits these files
and opens a pull request for you to review.

### Notes marked [TO CONFIRM]

Anything the brief didn't give a firm answer for shows on the page in a yellow
**[TO CONFIRM]** tag, so it's easy to spot. These are all removed before launch.

## Previewing the site on a computer (optional)

You don't need to do this. The Checks and the prototype link cover everyday
review. For anyone who wants to run it locally:

1. Install [Node.js](https://nodejs.org) version 22.12 or newer (24 recommended).
2. In a terminal, in this folder, run `npm install` once.
3. Run `npm run dev` and open the address it prints (usually
   http://localhost:4321/Elephant-Path-Website/). Pages refresh as you edit.
4. To see the finished build exactly as it will be published: `npm run build`,
   then `npm run preview`.

Other commands:

| Command | What it does |
|---|---|
| `npm run check:contrast` | Checks every colour pairing is readable (WCAG 2.1 AA) |
| `npm run check:a11y` | After a build, tests every page with axe for accessibility problems, sideways scrolling on small phones and keyboard use of the menu |
| `npm run brand:derive` | Re-creates the header mark and icons from the logo file |

## Accessibility

The site targets **WCAG 2.1 AA**. Every pull request is tested automatically
with axe. Manual checks (keyboard, screen reader and Lighthouse) are done at
each checkpoint.

## Privacy and safety

- This repository is **public**. Never add passwords, API keys, client
  information, handwritten notes or personal drafts to it.
- Fonts are stored in the site itself (no calls to Google). There are no ad
  pixels or trackers.

## The live address

The site is served at https://walktheelephantpath.com. Cloudflare handles the
domain's DNS (set to "DNS only"), and the domain is set in the repository's
**Settings → Pages**. `CUSTOM_DOMAIN_LIVE` in `site.config.mjs` is `true`, which
serves the site from the domain root and lets search engines index it. No
`CNAME` file is needed because the site is published by GitHub Actions. The
full setup is written down in `docs/launch-day.md`.
