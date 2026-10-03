# Launch day: connecting walktheelephantpath.com

Do these in order. Steps marked **(you)** are done in a web dashboard;
steps marked **(Claude Code)** are changes Claude Code makes and you merge.
Before applying each value, Claude Code re-checks it against GitHub's current
documentation and tells you if anything has changed.

Before you start, make sure the Notice of Privacy Practices is live on the
prototype site (it is, once the October 2026 update is merged).

---

## 1. (you) Verify the domain with GitHub

This proves you own the domain, so no one else can claim it.

1. On GitHub, click your profile picture (top right), then **Settings**.
2. In the left menu, click **Pages**.
3. Click **Add a domain**, type `walktheelephantpath.com`, and click **Add domain**.
4. GitHub shows a **TXT record** (a name and a value). Keep this page open.
5. In a new tab, sign in to **Cloudflare**, open `walktheelephantpath.com`, and go to **DNS → Records**.
6. Click **Add record**, choose type **TXT**, paste the **Name** and **Content** from GitHub, and click **Save**.
7. Back on GitHub, click **Verify**. It can take a few minutes; if it fails, wait 10 minutes and try again.

## 2. (you) Point the domain at GitHub Pages in Cloudflare

Still in Cloudflare, **DNS → Records**. Add each record below with **Add record**.
For every record, set the **Proxy status** to **DNS only** (the grey cloud, not orange).

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `seanydcode.github.io` |

If Cloudflare already has other A, AAAA, or `www` records for the domain,
delete those first.

## 3. (you) Set the custom domain on the repository

1. Open the repository on GitHub, then **Settings → Pages**.
2. Under **Custom domain**, type `walktheelephantpath.com` and click **Save**.
3. Wait for the DNS check to show a green tick. GitHub then requests a security
   certificate; this can take up to an hour.
4. When the **Enforce HTTPS** box becomes clickable, tick it.
5. Visit `https://www.walktheelephantpath.com`; it should move you to
   `https://walktheelephantpath.com` on its own.

## 4. (Claude Code) Switch the site to the new address

Claude Code sets `CUSTOM_DOMAIN_LIVE` to `true` in `site.config.mjs`, adds
`public/CNAME`, and opens a pull request. After you merge it:

- the "hide from search engines" tag is removed;
- the sitemap, robots.txt, link preview image, and business details for Google
  all use `https://walktheelephantpath.com`.

## 5. (you) Email protection records

These tell email providers that no email is ever sent from this domain, so fake
messages pretending to be from it are rejected. They do **not** affect the
proton.me address. If you ever start sending email from this domain, these
must be changed first.

In Cloudflare, **DNS → Records → Add record**, add two **TXT** records:

| Type | Name | Content |
|---|---|---|
| TXT | `walktheelephantpath.com` (or `@`) | `v=spf1 -all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject;` |

## 6. (you) Require the checks before merging

1. Repository **Settings → Branches** (or **Rules → Rulesets**).
2. Add a rule for the `main` branch.
3. Turn on **Require status checks to pass before merging**, and choose
   **build-and-test** (the "Checks" workflow).
4. Save.

## 7. Dependency updates

- **(Claude Code)** adds `.github/dependabot.yml` for weekly updates to the
  site's packages and GitHub Actions.
- **(you)** Repository **Settings → Code security** (or **Security**): turn on
  **Dependabot alerts**.

## After launch

- Submit `https://walktheelephantpath.com/sitemap-index.xml` in Google Search Console.
- Add the website link to the Google Business Profile and Psychology Today profile.
