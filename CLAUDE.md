# CLAUDE.md

Website for **The Elephant Path, PLLC**, a private pay telehealth counseling practice
in Michigan. The owner is not a developer: explain changes in plain language.

**Source of truth:** [`build-brief.md`](build-brief.md). Read it in full before
starting work. If something is unclear or conflicts, ask the owner rather than
guessing. Build in the phases in section 12 and stop at each checkpoint.

## Key rules

- **Workflow:** never commit straight to `main`. Work on a branch per phase or
  feature, write small, clearly described commits, then open a pull request
  into `main` with a plain-language summary. Merging to `main` deploys the live site.
- **Accessibility:** WCAG 2.1 AA is non-negotiable (brief, section 8). Before
  finishing, run `npm run build`, `npm run check:contrast` and `npm run check:a11y`
  and fix every issue. (Locally: `CHROMIUM_PATH=/opt/pw-browsers/chromium npm run check:a11y`.)
- **Colours:** use only the M2 "River stone" tokens in `src/styles/tokens.css`
  (mirrored in `src/lib/tokens.js`). `--stone-400` and `--logo-green` are
  decorative only. Add any new text/background pairing to
  `scripts/check-contrast.mjs`.
- **Public repo:** never commit secrets, API keys, client information, the
  owner's handwritten notes or photos of them, or unpublished personal drafts.
- **Accuracy:** don't invent credentials, modalities, education, experience or
  policies. Mark anything not in the sources with `[TO CONFIRM]` (use the
  `ToConfirm` component). Legal pages carry `[DRAFT – owner to review; not legal advice]`.
- **Voice:** first person, warm, plain language (about 8th-grade level), "clients"
  not "patients", "care/support" not "treatment/services", no exclamation points.
  Always use the Oxford comma. Say "electronic health record (EHR)", never EMR.
- **Privacy:** self-hosted fonts only, no trackers or ad pixels; Cloudflare Web
  Analytics (cookieless) is the only permitted analytics.

## Where things live

- Practice details (phone, email, links, focus areas): `src/config/site.ts`
- Internal links must use `url()` from `src/lib/url.ts` so they work with the
  temporary `/Elephant-Path-Website` base path.
- Launch switch (custom domain, removes base path): `CUSTOM_DOMAIN_LIVE` in `astro.config.mjs`.
- Illustration slots: `docs/image-manifest.md`.
- Blog and library: Markdown content collections in `src/content/`
  (schema in `src/content.config.ts`). Categories are the focus-area ids.
- There are no forms. Clients call, text, or email; blog topics are suggested
  by a mailto link with the subject "Suggested Blog Topic".
- Illustrations: `src/assets/illustrations/`, shown with the `Illustration` component.
- Page structure is owner-approved: keep repeated info to the header and footer.
  No closing call-to-action bands, guides or Resources hub unless asked.

## Gotchas

- Astro 7 drops the space where a line of text ends and the next line starts
  with an inline element (`<a>`, `<strong>`, a component). Add `{' '}` in those
  spots, then check the built HTML for words run together.
- Markdown uses Astro's Sätteri processor; plugins go in `astro.config.mjs`
  (`satteri({ hastPlugins })`), not `rehypePlugins`.
