# The Elephant Path: Website Build Brief (v1)

Prepared for Claude Code. Read this whole document before starting. Build in the phases in section 12, and stop at each **checkpoint** so the owner can review before you continue.

---

## 1. Practice overview

- **Business:** The Elephant Path, PLLC, a private pay counseling practice.
- **Clinician:** Sandra Dougherty, LMSW (Michigan license #6801089986).
- **Location:** Clarkston, MI 48348. Telehealth only; no street address is shown.
- **Phone:** (248) 795-5517.
- **Hours:** Monday through Thursday, 9am to 5pm.
- **Tagline (from the owner's notes):** "Mental wellness for the modern world." Supporting line: "Simple. Accessible. Individualized care."
- **Delivery:** Telehealth only. Serves clients anywhere in **Michigan**. Clients must be physically in Michigan during each session.
- **Who she serves:** Teens and adults of all ages. Individuals and families.
- **Focus areas:** Grief and loss (death and non-death losses), chronic and terminal illness, life-limiting disease, end-of-life care, caregiver support (especially primary caregivers), parenting, and life transitions.
- **Values:** An affirming space and an ally to the LGBTQ+ community.
- **Payment model:** Private pay only, with no insurance participation.
  - Payment is due at the time of service through the TherapyNotes client portal.
  - Superbills are **not** provided.
  - Accepts Visa, Mastercard, American Express, Discover and HSA cards.
  - A limited number of sliding-scale spots are available. These are discussed during the free consultation.
- **Fees:**

  | Session | Fee |
  |---|---|
  | Free phone consultation | 15 min, $0 |
  | 30-minute session | $70 |
  | 45-minute session | $100 |
  | 60-minute session | $130 |

- **Client portal (TherapyNotes).** Clients use it to:
  - complete paperwork
  - send secure messages
  - view statements and make payments
- **TherapyNotes is not used for** appointment reminders or telehealth. Don't list those as portal features.
- **Telehealth platform:** Doxy.me, a secure, HIPAA-compliant platform that runs in the browser. Clients join from a link, with no app download or account needed. Verify the current details with Doxy.me before stating them. The owner supplies the practice's Doxy.me room link, if she wants it shown on the site.

## 2. Goals and audiences

1. **Prospective clients** should quickly understand the practice, why private pay may serve them better, and how to take the first step.
2. **Current clients** need one-click access to the Client Portal.
3. **The community**, including clients, caregivers and families, should find trustworthy resources on grief and loss, illness, end of life, caregiving and parenting.
4. **The feel** of the site should be soothing, welcoming and grounding: calm, uncluttered, warm, and never clinical or salesy.

**Primary action:** "Request a free 15-minute consultation." The flow is:

1. The visitor fills out a short form.
2. Sandra calls within one business day.
3. They have the free consult.
4. The client begins care through the portal.

## 3. Decisions log

| Topic | Decision |
|---|---|
| Palette | **M2 "River stone"**: cream, cool stone greys, charcoal, olive, soft yellow (section 7) |
| Imagery | Logo used throughout. Watercolor-style illustrations, especially elephants with their babies. Illustrations come from outside the build (see section 11). Use tasteful placeholders until then. |
| Site map | Approved (section 5) |
| Consult flow | Simple contact form (name, email, phone) that leads to a callback within one business day |
| Content editing | A browser-based editor that a **non-technical person** can use with **no GitHub account** (section 4) |
| Code and version control | The owner's GitHub repository is the single source of truth for all code, content and assets |
| Hosting | **GitHub Pages**, deployed by GitHub Actions |
| Domain | **walktheelephantpath.com**, bought through Cloudflare. Cloudflare manages DNS only and points the domain at GitHub Pages. |
| Copy | Claude Code drafts all copy in the voice of the welcome letter (section 6). The owner edits after. |
| Launch | As soon as possible once the design is viable |

## 4. Technical stack

- **Framework:** Astro as a static site, with content collections for the blog, library and guides. Keep dependencies minimal.
- **Repository and version control (GitHub):**
  - The repository is **https://github.com/seanydcode/Elephant-Path-Website** (`seanydcode/Elephant-Path-Website`). The owner does the technical work and prefers web and mobile access over desktop apps.
  - Commit **every** code, content and asset change to this repo. Never leave work only on a local machine.
  - Work on a branch for each phase or feature, then open a pull request into `main` with a plain-language summary. Merging to `main` deploys the live site.
  - Write small, clearly described commits.
  - The repo will likely be **public**, because GitHub Pages is free only for public repos (private repos need a paid GitHub plan). So never commit secrets, API keys, client information, the owner's handwritten notes or photos of them, or unpublished personal drafts. Use a `.gitignore` for local and environment files.
  - Keep a `README.md` for the owner covering how the site is organized, how to preview it locally, how deploys work, and where content lives.
- **Hosting (GitHub Pages):**
  - Deploy from GitHub Actions using the official Astro GitHub Pages workflow. The build runs on every push to `main`.
  - Set `site: 'https://walktheelephantpath.com'` in the Astro config. Don't set a `base` path once the custom domain is live.
  - Add `public/CNAME` containing `walktheelephantpath.com`.
  - Previews: GitHub Pages has no per-branch previews. Review branches locally with `astro preview` and describe any visual changes in the pull request. Optionally, the owner can view a pull request's build output as an Actions artifact.
- **Domain (Cloudflare DNS, pointed at GitHub Pages):**
  - Apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
  - Apex `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
  - `CNAME` record: `www` → `seanydcode.github.io`.
  - Set these records to **DNS only** (grey cloud) so GitHub can issue the HTTPS certificate. Proxying can be revisited later.
  - In GitHub, **verify the domain** in account settings (this adds a TXT record in Cloudflare) to prevent domain takeover.
  - Set the custom domain in the repo's Pages settings, then turn on **Enforce HTTPS**.
  - GitHub redirects `www` to the apex domain automatically.
  - Check each value against GitHub's current documentation before applying, and give the owner step-by-step instructions for the Cloudflare dashboard.
- **Content editor (hard requirements):**
  - The blog writer logs in with an email address. They need no GitHub account and never see git.
  - Works on a phone and a laptop.
  - WYSIWYG or friendly markdown editing, image upload, and a draft/publish flow.
  - Can edit the blog, library entries and resource guides.
  - It must commit content to the GitHub repo. That commit triggers the GitHub Actions rebuild, so a post goes live a few minutes after it's published.
  - **TinaCMS (Tina Cloud)** is the leading candidate. It works with a static site on GitHub Pages. Before building, check the current free tier and options, then confirm the choice with the owner.
  - Deliver a **one-page plain-language editor guide** covering how to log in, write a post, add an image, publish, and add a book to the library.
- **Contact forms** (the consult request and the blog topic suggestion):
  - GitHub Pages can't run server code, so the forms submit to a **third-party form service** such as Formspree, Basin or Web3Forms.
  - Choose the service by these criteria: built-in spam protection plus a honeypot field, email delivery, adjustable data retention, and a BAA if one is available. Recommend one to the owner before wiring it up.
  - The form endpoint is public and isn't a secret. Keep any service API keys out of the repo.
  - Collect only the listed fields. Don't store submissions longer than needed.
  - Submissions go to the practice email. **Open item:** the owner may move to Google Workspace with a signed BAA before launch, so make the destination address a single config value.
- **Privacy:**
  - No Meta or Google ad pixels, and no third-party trackers.
  - For analytics, use cookieless **Cloudflare Web Analytics** only, via its JS snippet (it works with GitHub Pages hosting).
  - **Self-host the fonts**, with no calls to Google Fonts.
  - No cookie banner should be needed. Keep it that way.
- **Performance targets:** Lighthouse Performance ≥ 90 and Accessibility, Best Practices and SEO all at 100. Use responsive images in AVIF/WebP with an explicit width and height.

## 5. Site map and page specifications

**Header (every page):**
- Logo (the wide/horizontal version), linking to Home.
- Navigation: Home · About · Services & Fees · Resources · Contact.
- A "Client Portal" text link to `https://www.therapyportal.com/p/sandradougherty/`. It opens in a new tab and is labeled as doing so.
- A primary "Get started" button that goes to /contact.
- On mobile, use an accessible menu button (a disclosure pattern) and keep "Get started" visible.

**Footer (every page):**
- Crisis notice: "This site is not for emergencies. If you are in crisis, call or text **988** (Suicide & Crisis Lifeline) or call **911**."
- Telehealth across Michigan.
- Contact email and phone.
- Links to the Google Business Profile and Psychology Today profile.
- Links to the Good Faith Estimate notice, Privacy Policy and Accessibility Statement.
- © The Elephant Path, PLLC.

### Home
1. **Hero.** Full logo artwork, the tagline, and one warm sentence. Primary button: "Request a free consultation". Secondary: "Why private pay?", linking to the About anchor.
2. **Welcome.** A short welcome in Sandra's voice: individualized, accessible, affordable, client-centered.
3. **How I can help.** One card per focus area (7), each linking to Services and a related resource category.
4. **Getting started is simple.** Three steps: request, a call within one business day, the free 15-minute consult.
5. **Why private pay.** A teaser covering direct care, protected information and transparent cost, linking to About.
6. **An affirming space.** An LGBTQ+ ally statement.
7. **Meet Sandra.** A headshot placeholder and a two-line intro, linking to About.
8. **From the blog.** The latest three posts, hidden if there are none.
9. **Closing call to action.**

### About
- **Meet Sandra Dougherty, LMSW.** Write the bio from section 6.4 (her Psychology Today profile). Mark any claim not found in the sources as `[TO CONFIRM]`. Include:
  - Her path: years as a medical social worker in oncology and hospice, then outpatient mental health, then founding The Elephant Path. This path is the heart of her story and connects directly to "Why elephants?"
  - About 18 years of experience.
  - Education.
  - Her approach and modalities, written in plain language (for example, "I draw on…") and not as a jargon list.
  - Her Michigan license number, shown in small print.
- **Mission.**
- **How the practice works.**
  - Telehealth across Michigan.
  - The TherapyNotes portal and its features, as a list: paperwork, secure messages, statements and payments.
  - Sessions take place on Doxy.me: a secure link, joined from the browser.
  - Payment at the time of service.
  - The sliding scale.
- **Why private pay?** (anchor `#why-private-pay`). Built from the owner's notes (section 6.3). Opening line: the practice "offers numerous benefits and protections not available through typical insurance-participating practices." Then three items:
  1. A direct care contract.
  2. Protected information.
  3. Transparent cost.

  Also weave in "transparency and rapport." Present this section as a gentle, non-defensive explanation.
- **Why elephants?** (anchor `#why-elephants`)
  - Elephants form deep bonds with their herd.
  - When one dies, elephants have been seen gathering around the body, witnessing and supporting one another's grief. This mirrors the work of the practice.
  - Elephants matter in cancer research, especially childhood cancer. Elephants carry about 20 copies of the tumor-suppressing gene TP53, and researchers are studying it for cancer treatment. **Verify with a reputable source before writing, and cite it.**
  - Leave a clearly marked slot for Sandra's personal story, which she will expand later.
  - This section is a good place for the gentle "winding path" motion described in section 7.
- **Closing call to action.**

### Services & Fees
- **Who I work with:** teens, adults of all ages, individuals and families. Telehealth only, within Michigan.
- **Focus areas:** The seven areas, each with a short description. Life-limiting disease gets its own card, separate from chronic and terminal illness, because it covers people living with a serious diagnosis over time and not only at the end of life. Draft the wording, then mark it `[TO CONFIRM]` so the owner can check the distinction.
- **Fees:**
  - The fee table from section 1, with the free consult highlighted.
  - "Payment is due at the time of service and is securely processed through the client portal."
  - Sliding scale: "A limited number of reduced-fee appointments are available… we can discuss options during your free consultation."
  - "The Elephant Path does not bill insurance or provide superbills." Say this plainly and kindly.
- **Working with teens:** Consent and parent involvement. Use a placeholder paragraph marked `[OWNER TO PROVIDE POLICY WORDING]`.
- **Good Faith Estimate notice:** Use the standard No Surprises Act notice ("You have the right to receive a Good Faith Estimate…"), linking to cms.gov/nosurprises. Also make it a standalone page linked from the footer.
- **FAQ:** An accordion covering insurance, telehealth technology (Doxy.me: what you need and how to join), being located in Michigan, what happens in the consult, cancellations `[TO CONFIRM policy]`, and crisis support.

### Resources (hub)
- **Blog.** Posts are planned monthly. Include category filters that match the focus areas, and a "Suggest a topic" form (name optional, email optional, topic) with a note not to include personal health details.
- **Library.** Recommended reading by category, filterable. Each entry has a title, author, category, a one-line note and an optional link. Seed it with an empty structure plus 2–3 sample entries marked `[SAMPLE]`.
- **Guides:**
  - Grief and loss, covering both death and non-death losses.
  - Primary caregivers.
  - Chronic, terminal and life-limiting illness, and end of life.
  - Parenting.
- **Documents:** Downloadable handouts. Any PDFs must be accessible (tagged).
- **Crisis and support lines box:**
  - 988.
  - Crisis Text Line (text HOME to 741741).
  - The Trevor Project for LGBTQ+ young people.
  - **Verify the current details of each.**

### Contact / Get Started (/contact)
- Intro, then the three-step "what happens next" section.
- **Form:**
  - Name, email and phone (all required).
  - "Is it OK to leave a voicemail or text?" (yes/no).
  - Best time to reach you (optional).
- Note by the submit button: "Please don't include health details here. We'll talk by phone."
- **Confirmation message:** "Thank you. I'll reach out within one business day." Show it on the page and announce it to screen readers.
- Show the email and phone as alternatives, along with the directory profile links.
- A crisis notice next to the form.

### Legal pages
- **Privacy Policy.** Cover what the form collects, cookieless analytics, no trackers, and that clinical records are held in TherapyNotes.
- **Good Faith Estimate.**
- **Accessibility Statement.** State WCAG 2.1 AA as the target and give a contact for problems.

Mark every legal page `[DRAFT – owner to review; not legal advice]`.

## 6. Voice, copy and source material

### 6.1 Voice guide (modeled on the Client Welcome Letter)
- First person ("I"), warm, grateful and humble. "It is an honor…", "walking alongside you."
- Plain language and short paragraphs. Reassuring and transparent. Acknowledge that change and cost can be hard ("I understand that this is a change…").
- Use "clients," not "patients." Say "care" and "support," not "treatment" or "services."
- Use these key phrases: *individualized, accessible, and affordable*; *client centered care*; *a more personal and transparent experience*; *compassionate and evidence-based care*; *secure, HIPAA-compliant*.
- Avoid hype, jargon, fear, urgency tactics, exclamation points and clichés.
- Aim for about an 8th-grade reading level.

### 6.2 Client Welcome Letter (source text, lightly condensed)

> Welcome to The Elephant Path, PLLC! … The Elephant Path was created with the goal of providing care that is individualized, accessible, and affordable. By operating as an independent private pay practice, I am better able to focus on providing client centered care, while reducing many of the limitations that can accompany managed care. My hope is that this practice model creates a more personal and transparent experience for every client.
>
> The Elephant Path is a private pay practice, meaning I will no longer be participating with insurance plans. Payment is due at the time of service and will be securely processed through my electronic health record (EHR) system. I understand that this is a change for many clients. To help make therapy as accessible as possible, a limited number of reduced fee appointments are available through a sliding fee scale for individuals experiencing financial hardship. If cost is a concern, please feel free to reach out so we can discuss available options.
>
> My practice is managed through a secure, HIPAA-compliant electronic health record (EHR) platform designed to simplify your experience. Through the Therapy Notes client portal, you will be able to: complete paperwork electronically; receive appointment reminders; send secure messages; participate in telehealth sessions; view statements and make payments. This system allows us to communicate efficiently while keeping your personal health information secure.
>
> *[Outdated: this letter's list of portal features no longer applies. Reminders and telehealth are not handled in TherapyNotes, and telehealth uses Doxy.me. Follow section 1.]*
>
> My commitment to providing compassionate and evidence-based care remains unchanged. I am honored by the trust you place in me and appreciate the opportunity to continue walking alongside you as you work toward your goals. … In Gratitude, Sandra Dougherty, LMSW

### 6.3 Owner's notes: "Why private pay?" (transcribed)

> **Why cash pay only? / How does a cash pay only practice benefit me?**
> The Elephant Path practice offers numerous benefits and protections not available through typical, insurance-participating practices, including:
> 1. **A direct care contract** created between the client and clinician: explore needs, establish goals, and create a care schedule with your therapist. No billers, office managers, front desk staff, insurance companies, or employers involved in your care.
> 2. **Protected information:** a direct care contract removes the requirement of sharing your information. No more access by insurance companies or office staff. Only two people see your documents: me and you.
> 3. **Transparent cost:** cost is established prior to receiving care. No waiting weeks for insurance companies to process claims and determine cost, and no offices presenting large, unexpected bills. (Good Faith Estimate provided; payment at time of service.)
> Also noted: "transparency & rapport."

**Accuracy guardrail:** Don't state or imply that private pay removes all record keeping or legal disclosure duties. Word item 2 as: *no insurance company or third party sees your information in order to pay for your care.* Keep "only you and me" framed around who is involved in your care.

### 6.4 Psychology Today profile (source for the bio)

Source: https://www.psychologytoday.com/us/therapists/sandra-dougherty-clarkston-mi/1849683

- **Statement (excerpt):** "After several years of working in oncology and hospice as a Medical Social Worker, I transitioned to serving my community in outpatient mental health." She works with "individuals and families experiencing and seeking support for grief and loss, chronic and terminal illness, death and dying, caregiver support, and life transitions." Re-read the full statement from the live profile when drafting.
- **Top specialties:** Grief, Death and Dying, Caregiver Support.
- **Additional expertise:**
  - Cancer, Chronic Illness, Chronic Pain
  - Coping Skills, Stress, Life Transitions, Parenting, Divorce
  - First Responders, Geriatric and Seniors
- **Approaches:**
  - Cognitive Behavioral (CBT), Mindfulness-Based (MBCT), Narrative, Solution Focused Brief (SFBT)
  - Integrative, Strength-Based
  - Psychoeducation, Resource Connection
- **Client focus:** Preteens, teens, adults, elders (65+); individuals and families.
- **Experience:** 18 years in practice.
- **Education:**
  - MSW, University of Michigan (2007)
  - BS in Clinical Psychology with a dual focus in Cultural Anthropology, University of Michigan–Flint (2005)

**Use on the site:**
- On Services, add a secondary "I also support…" list: cancer, chronic pain, coping skills, stress, divorce, first responders, older adults.
- Add a Psychology Today "Verified" link or badge on the About and Contact pages.

**Discrepancy:** The profile lists **preteens** as clients, but the owner said teens and adults. Use "teens and adults" and mark it `[TO CONFIRM: preteens?]`.

### 6.5 Owner's notes: site sketch (transcribed)
- **Home:** welcome, summary, mission, "Ally to LGBTQ+."
- **About:** how the practice works; cash/direct care contract, protected info, transparency and rapport; get started; why elephants?
- **Services:** list, more coming, cost.
- **Resources:** losses (death, non-death), PCG (primary caregiver), docs; client portal link.
- **Library:** recommended reading by category.
- **Blog:** monthly? Invite topic ideas.
- **Online presence:** Google, Psychology Today.

## 7. Visual design system

### 7.1 Color tokens: M2 "River stone" (contrast verified)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F8F7F3` | Page background (cream) |
| `--surface` | `#FFFFFF` | Cards, form fields |
| `--stone-100` | `#E6E6E2` | Section bands, card fills |
| `--stone-400` | `#A9ABA6` | **Decorative only** (2.2:1). Dividers, illustration tints. Never text, never a form border. |
| `--charcoal` | `#45484A` | Secondary text, secondary button outline, **form field borders** |
| `--ink` | `#35383A` | Headings and body text (11:1 on bg) |
| `--olive` | `#55683A` | Primary buttons, links, focus accents (5.7:1 on bg; white on olive 6.1:1) |
| `--olive-dark` | `#465630` | Primary button hover and active state |
| `--sage-100` | `#DDE3CF` | Soft highlight bands; text on it uses `#34402A` |
| `--yellow-200` | `#F0E4A0` | Small highlights and tags only; text on it uses `#5A4E1A` |
| `--logo-green` | `#6B7F4E` (approx.) | Decorative only, matching the logo lettering |

Contrast rules:
- Links are olive and underlined.
- Verify every text/background pair programmatically. Body text needs ≥ 4.5:1. UI components and focus indicators need ≥ 3:1.
- Light theme only for v1.

### 7.2 Typography
- **Headings:** A warm serif, such as *Lora* or *Fraunces* (soft optical size).
- **Body:** A humanist sans, such as *Nunito Sans* or *Source Sans 3*.
- Self-host both fonts.
- Base size 18px, line-height 1.6, line length 60–75 characters.
- The script lettering appears **only inside the logo artwork**. Never set text in a script font.

### 7.3 Logo usage
- **Assets:** The source files are the owner's logo PNGs, one transparent and one on white. Put them in `/src/assets/brand/`. Ask the owner for them if missing.
- **Derive these variants:**
  - The full stacked logo, for the Home hero and the footer.
  - A horizontal header lockup: the elephant mark plus the name in the heading serif. The script lettering isn't readable at header size.
  - The elephant-only mark, for the favicon, app icons and social image.
- **Alt text:** The logo image gets `alt="The Elephant Path"`.
- **Recurring motifs:** Reuse the butterfly and the winding path from the logo as subtle section dividers.

### 7.4 Imagery
- **Style:** Watercolor. Elephants and their babies, soft paths, grasses. Soft edges and low saturation.
- **Until illustrations arrive:**
  - Use soft CSS/SVG watercolor-wash background shapes.
  - Use labeled placeholder frames with the target aspect ratio and a filename, such as `illus-home-hero-2x1.webp`.
  - Output an image manifest listing each slot, its size and its intended subject.
- **Headshot:** A placeholder until the owner supplies one.
- **No generic stock photos** of people in therapy.

### 7.5 Layout and motion
- Generous whitespace, one idea per section, rounded corners, soft shadows at most. Mobile first.
- **Motion:**
  - Gentle and slow, 300–600ms.
  - Fade or rise as content enters the view.
  - An optional SVG "winding path" that draws itself along the Why elephants section.
  - Everything is disabled under `prefers-reduced-motion`.
  - No autoplaying carousels, no parallax, no pop-ups.

## 8. Accessibility requirements (WCAG 2.1 AA, non-negotiable)
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, logical heading order, and a skip link.
- Everything works by keyboard, with a visible focus ring (≥ 3:1, at least 2px) and no keyboard traps.
- The mobile menu and FAQ accordion use correct ARIA and are fully usable by keyboard.
- Forms:
  - Every field has a visible label.
  - Required fields are marked in text, not by color alone.
  - Errors appear inline and are linked with `aria-describedby`.
  - An error summary receives focus when the form is submitted with errors.
  - Success is announced through a live region.
  - Autocomplete attributes are set.
- Touch targets are ≥ 44×44px.
- The layout reflows at 320px with no horizontal scroll and works at 200% zoom.
- Meaningful images get alt text. Decorative images get `alt=""`.
- External and new-tab links are labeled as such.
- `lang="en"` is set, and each page has a descriptive title.
- **Testing:**
  - axe or Pa11y in CI.
  - Lighthouse.
  - A manual keyboard pass.
  - A VoiceOver or NVDA spot check of the Home and Contact pages.
  - Report the results at each checkpoint.

## 9. Compliance and safety
- The crisis notice appears on every page, as specified in section 5.
- The Good Faith Estimate notice is posted prominently: in the footer link, on the Services page and as its own page.
- The forms collect no clinical information, and none of the copy invites people to share it.
- No tracking pixels.
- State plainly that care is limited to Michigan.
- Credentials are "LMSW." Don't invent credentials, modalities, education or experience; use `[TO CONFIRM]` instead.
- Any clinical or health claims in resources must be accurate and cite reputable sources.

## 10. SEO
- Each page gets a unique title and meta description.
- Target phrases include:
  - "online grief counseling Michigan"
  - "telehealth therapist Michigan"
  - "caregiver support counseling Michigan"
  - "end of life counseling Michigan"
- Add Open Graph images built from the logo.
- Add `sitemap.xml` and `robots.txt`.
- Add schema.org structured data: `ProfessionalService` or `MedicalBusiness`, with `areaServed: Michigan` and no street address unless the owner provides one.
- Blog posts get Article schema.

## 11. Assets and information needed from the owner
- [ ] Logo files (the highest resolution available, plus the original or vector file if one exists)
- [ ] Headshot
- [ ] Bio details: education, experience, approach and modalities, personal note
- [ ] The personal "why elephants" story
- [x] TherapyNotes client portal URL
- [x] Phone: (248) 795-5517
- [ ] Doxy.me room link (only if it should be shown on the site)
- [ ] How appointment reminders are sent, if clients should be told
- [ ] Practice email (ideally Google Workspace with a BAA) and phone
- [ ] Google Business Profile and Psychology Today URLs
- [ ] Wording for the teen consent and parent involvement policy
- [ ] Cancellation policy
- [ ] Initial library book list
- [ ] Watercolor illustrations, following the image manifest Claude Code produces
- [x] Domain purchased: walktheelephantpath.com (Cloudflare)
- [x] GitHub repository: seanydcode/Elephant-Path-Website (Claude Code still needs access)
- [ ] Confirm whether preteens are served

## 12. Build phases and checkpoints
1. **Foundation.**
   - Connect to the owner's GitHub repo and set up the GitHub Actions deploy to Pages. The site can live at `seanydcode.github.io/Elephant-Path-Website` until DNS is connected. If so, use a temporary `base` path and remove it at launch.
   - Astro, design tokens, fonts, base layout, header and footer, mobile menu.
   - A style tile page showing the colors, type, buttons, form fields and cards.
   - The `README.md`.
   - **Checkpoint:** The owner reviews the look and feel.
2. **Pages and copy.** All pages with drafted copy, the illustration placeholders and the image manifest. **Checkpoint:** The owner reviews the copy and marks up the `[TO CONFIRM]` items.
3. **Forms.** The consult request and topic suggestion forms, with spam protection and email delivery. Test end to end.
4. **Content editor.** Set up the chosen editor with email login, and write the plain-language editor guide. **Checkpoint:** The blog writer does a trial post.
5. **Quality pass.** The accessibility, performance and SEO audits from sections 4 and 8, plus cross-browser and device checks (iOS Safari, Android Chrome, desktop). Fix everything.
6. **Launch.**
   - Connect **walktheelephantpath.com**: set the Cloudflare DNS records, verify the domain in GitHub, set the custom domain, and turn on Enforce HTTPS (see section 4).
   - Confirm that `www` redirects to the apex domain.
   - Submit the sitemap to Google Search Console.
   - Update the Google and Psychology Today profiles with the site link.

## 13. Later / parking lot
- Evaluate the content editor after real use.
- A blog topic calendar.
- Commission or finalize the illustration set.
- A possible move to the TherapyNotes online appointment request widget.
- Newsletter (only if wanted).
