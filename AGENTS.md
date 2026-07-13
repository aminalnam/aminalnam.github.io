# Working on this site — agent guide

This repo is **Jonathan Capone's portfolio website** (jonathancapone.com). Read this before editing anything.

---

## 1. What this is

- A **static multi-page site**: plain `.html` files sharing `style.css` + `main.js`. **No build step, no framework, no bundler.** You edit the HTML directly.
- Styling is heavily **inline** (`style="..."`) plus `style.css` for shared bits. Match the surrounding style; don't introduce a framework or a build tool.
- It's a **systems-architecture / engineering portfolio**, not a marketing site. Tone is honest and technical, but written to be understood.

---

## 2. ⚠️ How it deploys — READ THIS FIRST

**The live site is NOT GitHub Pages.** `jonathancapone.com` is served by a self-managed **DigitalOcean droplet running nginx**, from a webroot on that server.

- The **source of truth is this GitHub repo** (`aminalnam/aminalnam.github.io`).
- The droplet **auto-pulls this repo and re-syncs its webroot every ~2 minutes** (a cron on the server; **no GitHub Actions** — that's deliberate, to avoid CI cost).
- So the workflow is simply: **edit here → commit → push to `origin/main` → it's live in ~2 minutes.** Nothing else.

**Rules that follow from this:**
- ✅ Make every change **in this repo** and push.
- ❌ **Never edit files directly on the server.** The 2-minute sync overwrites the webroot from the repo, so any on-server edit is lost.
- **Pushing:** plain `git push` fails non-interactively here (`/dev/tty: No such device`). Use the gh credential helper:
  ```
  git -c credential.helper='!gh auth git-credential' push origin main
  ```
- **Check what's live:** `curl -I https://jonathancapone.com/<page>` (the real server). `aminalnam.github.io/<page>` is a GitHub Pages mirror of the same repo, useful for confirming a push landed.
- **Immediate deploy** (skip the ≤2-min wait) or any **server access**: ask Jonathan. Server/SSH specifics are intentionally not in this file.

---

## 3. Content rules (non-negotiable)

1. **Accuracy is sacred.** Every claim, metric, and feature must match the project's **actual GitHub repo / source code** — *not* the markdown docs, which lag. Verify with `gh repo clone` / `gh api`. If you can't verify it, **omit it**. Never fabricate a number or a feature. This site was explicitly purged of invented metrics once; don't reintroduce any.
2. **Honest framing, no fluff.** No marketing superlatives ("cutting-edge", "revolutionary", "seamless", "powerful", "leverage"). Say what a thing *does* and *why it matters*.
3. **Meaningful over vanity.** Don't headline lines-of-code, commit counts, or "hardware targets" — they're meaningless to a reader. Prefer real validation and capability (e.g. "0.97 correlation with NOAA buoys", "runs offline for days at sea").
4. **Plain-language voice.** For any feature: a plain hook → how it works in human terms → the hard part & how it was solved. **Define jargon the first time it appears.** A smart non-specialist should understand it; a technical reader should still respect it.
5. **Status must be truthful.** Use the status labels to distinguish shipped vs designed. The only CSS classes that exist are:
   - `status-implemented` — shipped / working
   - `status-partial` — partly built / in development
   - `status-planned` — designed / roadmap / not built yet
   (There is **no** `status-in-progress`.) Muted "planned" inline style: `background: rgba(154,162,177,0.15); color: var(--ink-soft);`
6. **No LinkedIn** anywhere (Jonathan doesn't use it).
7. **Do not re-add the "63/100 readiness audit"** — it was removed deliberately. The factual "honest gaps" caveats (kept without any score) are fine.

---

## 4. Structure conventions

- **Shared shell.** Every page has the same skeleton: `<head>` meta (`title`, `description`, `og:*`, `twitter:*`, `canonical`, emoji favicon), the topbar + `<nav>`, a `hero`, `section`s, a `footer`, and `<script src="main.js">`.
- **The nav must be identical on every page.** If you add, rename, or remove a page, update the nav **on all pages** — plus the homepage Projects-Hub card and `sitemap.xml`.
- **The OMEGA page lives at `/omega/`** (`omega/index.html`). Because it's in a subfolder, **all its asset/link refs are root-absolute** (`/style.css`, `/main.js`, `/hardware.html`, …). Don't use relative paths there.
- **Renames** leave a redirect stub at the old filename: a `noindex` meta-refresh page with a `<link rel="canonical">` to the new URL (see `architecture.html`, `weather-globe*.html`, `visual-timer.html`).

### Adding a project page — checklist
1. Create `<name>.html` from the shared template (copy an existing page's head/nav/footer verbatim so it matches).
2. Add its link to the `<nav>` on **every** page.
3. Add a card to the **homepage Projects Hub** grid (`index.html`).
4. Add a `<url>` to **`sitemap.xml`**.
5. **Verify all facts** against the project's GitHub repo.
6. Commit + push → auto-deploys.

---

## 5. Project → source repo map (verify facts against these)

Always run `gh repo list aminalnam` first — repos get renamed.

| Site page(s) | Project | Repo / source | Status notes |
|---|---|---|---|
| `/omega/`, `hardware`, `gateway`, `mission-portal` | OMEGA (flagship ocean-sensing mesh) | `aminalnam/OMEGA` (renamed from `OMEGA-wave`) | private |
| `bathymetry.html` | OMEGA-bath (ROV depth mapping) | `aminalnam/OMEGA-bath` | **public** |
| `cosnfx.html` | CosNFX (Wear OS motion SFX) | `aminalnam/CosNFX` | **active beta** — don't call it "shipped/released" |
| `choreographer.html` | CosNFX Choreographer (prop controller) | `aminalnam/CosNFX_Prop_Controller` (may be local-only) | **in development** — don't imply it's for sale |
| `planetaria.html` | Planetaria (Earth desk display) | `aminalnam/planetaria` (was `ai_eye_globe` / "Weather Globe") | sold at cosnfx.store/planetaria |
| `lunaria.html` | Lunaria (Moon desk display) | LUNA project | **coming soon / waitlist** |
| `past-time.html` | Past Time (e-paper timer) | `aminalnam/past-time` (was "Visual Timer") | shipped |
| `slime.html` | Slime in the Coconut (store) | `aminalnam/slimer-store` | live at slimer.store |
| `beta-overview.html` + `omega-beta-site/` | BETA (evaluation tracker) | `aminalnam/BETA` | `omega-beta-site/` is a static export |

Do **not** add CosNFX iOS / Apple Watch to the site — that port is parked, not in development.

---

## 6. Concurrency (multiple agents)

Several agents may touch this repo at once.
- **`git fetch` + rebase onto `origin/main` before you push.**
- **Only `git add` the specific files you changed** — never a blind `git add -A` (you'll sweep up another agent's in-progress work).
- Don't edit a page another agent is actively working on; coordinate first.

---

## 7. TL;DR

Edit HTML here → verify every fact against the real repo → keep it honest and jargon-light → commit only your files → `git -c credential.helper='!gh auth git-credential' push origin main` → live on jonathancapone.com in ~2 minutes. Never edit the server directly. Never fabricate.
