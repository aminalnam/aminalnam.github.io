# CLAUDE.md

Portfolio website for **jonathancapone.com**. Static multi-page HTML (shared `style.css` + `main.js`, **no build step**).

**📖 Read [AGENTS.md](AGENTS.md) before editing — it's the full working guide.** The essentials:

- **Deploy:** the live site is a **DigitalOcean droplet (nginx), NOT GitHub Pages.** It auto-pulls this repo and re-syncs every ~2 min (no GitHub Actions). So just **commit + push to `main` → live in ~2 minutes.** **Never edit the server directly** (the sync overwrites it). Push with: `git -c credential.helper='!gh auth git-credential' push origin main`.
- **Accuracy is sacred.** Verify every fact/metric/feature against the project's **actual GitHub repo/code** (not the docs — they lag). Never fabricate. When unsure, omit.
- **Honest, jargon-light voice.** No marketing fluff or superlatives. No vanity metrics (LOC/commits) — say what it *does* and why it matters; define jargon on first use.
- **Status labels:** `status-implemented` / `status-partial` / `status-planned` only. Don't mislabel in-development work as shipped.
- **Structure:** keep the nav identical on every page; adding a page means updating nav on all pages + a homepage card + `sitemap.xml`. `/omega/` is a subfolder → root-absolute asset paths.
- **Concurrency:** other agents may edit this repo — `git fetch`+rebase before pushing, and only `git add` your own files.
- No LinkedIn. Don't re-add the removed "63/100 audit."
