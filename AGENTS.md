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
3. **Meaningful over vanity.** Don't headline lines-of-code, commit counts, or "hardware targets" — they're meaningless to a reader. Prefer real validation and capability (e.g. "0.97 correlation with NOAA buoys", "runs offline for days at sea") — explained in context, never as bare stat tiles.
4. **Never sell build speed.** Do not pitch "built in ~4 weeks / about a month / X days" anywhere — fast reads as rushed, not impressive (Jonathan's explicit rule). Depth of ownership is fine ("one engineer designed and built every layer, end to end"); duration is not.
5. **Plain-language voice.** For any feature: a plain hook → how it works in human terms → the hard part & how it was solved. **Define jargon the first time it appears.** A smart non-specialist should understand it; a technical reader should still respect it.
   **Every project page must answer, on its first screen: what is this, why does it exist, and who is it for** — before any architecture or feature list. A reader who stops after the hero should still walk away knowing the point of the project.
6. **Status must be truthful.** Use the status labels to distinguish shipped vs designed. The only CSS classes that exist are:
   - `status-implemented` — shipped / working
   - `status-partial` — partly built / in development
   - `status-planned` — designed / roadmap / not built yet
   (There is **no** `status-in-progress`.) Muted "planned" inline style: `background: rgba(154,162,177,0.15); color: var(--ink-soft);`
7. **No LinkedIn** anywhere (Jonathan doesn't use it).
8. **Do not re-add the "63/100 readiness audit"** — it was removed deliberately. The factual "honest gaps" caveats (kept without any score) are fine.

---

## 4. Structure conventions

- **Shared shell.** Every page has the same skeleton: `<head>` meta (`title`, `description`, `og:*`, `twitter:*`, `canonical`, emoji favicon), the topbar + `<nav>`, a `hero`, `section`s, a `footer`, and `<script src="main.js">`.
- **The nav must be identical on every page.** If you add, rename, or remove a page, update the nav **on all pages** — plus the homepage Projects-Hub card and `sitemap.xml`.
- **The OMEGA page lives at `/omega/`** (`omega/index.html`). Because it's in a subfolder, **all its asset/link refs are root-absolute** (`/style.css`, `/main.js`, `/hardware.html`, …). Don't use relative paths there.
- **Renames** leave a redirect stub at the old filename: a `noindex` meta-refresh page with a `<link rel="canonical">` to the new URL (see `architecture.html`, `weather-globe*.html`, `visual-timer.html`).

### Mermaid diagrams (measured 2026-07-17 — don't relearn this the hard way)
- **Author them `LR` (left-to-right) with SHORT labels.** A `flowchart TD` with subgraphs renders ~700–1000px **tall** and eats a whole screen.
- **The usable content column is only ~670px** — `main.js` injects a table-of-contents sidebar (`.main-shell.has-toc`), so `.main-inner` is ~800px, not the full 1135px. A diagram wider than ~700px natural gets scaled down and its text becomes unreadable.
- **Never cap `.mermaid svg { max-height }`.** The SVG scales via its viewBox, so a height cap shrinks the *entire diagram* — a cap at 400px produced a **3.7px font**. Fix the diagram's shape/labels instead.
- Sanity target: natural size ≲ 700×250 → renders ~90% scale, ~11–12px text.

### Changing CSS? bump the cache-buster
`style.css`/JS are served with `expires 30d` by nginx, so returning visitors keep the old file. When you edit `style.css`, bump the version query on the stylesheet link across all pages (currently `style.css?v=2`) or the change won't reach anyone. HTML is `no-cache`, so the new link is picked up immediately.

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
| `slime.html` | Slime in the Coconut (store) | `aminalnam/slimer-store` | live at **slimeinthecoconut.com** (the `slimer.store` domain is dead — never link it) |
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
