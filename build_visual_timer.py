import os

html_content = """<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Jonathan Capone — Ultimate Visual Timer</title>

  <meta name="description" content="A configurable, glanceable e-ink timer for the ESP32-S3 CrowPanel." />
  <meta property="og:title" content="Jonathan Capone — Ultimate Visual Timer" />
  <meta property="og:description"
    content="A configurable, glanceable e-ink timer for the ESP32-S3 CrowPanel." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://jonathancapone.com/visual-timer.html" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Jonathan Capone — Ultimate Visual Timer" />
  <meta name="twitter:description"
    content="A configurable, glanceable e-ink timer for the ESP32-S3 CrowPanel." />

  <link rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⏳</text></svg>">

  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="brand" href="index.html"
        style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
        <div>
          <span class="brand-title"
            style="letter-spacing: 0.1em; color: var(--white); display: block; font-family: var(--font-serif); font-size: 1.5rem;">JONATHAN
            CAPONE</span>
          <span class="brand-sub"
            style="display: block; font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); font-family: var(--font-mono); opacity: 0.9;">Systems
            Architecture Portfolio</span>
        </div>
      </a>
      <nav class="nav" aria-label="Main Navigation">
        <a href="index.html">Home</a>
        <div class="dropdown">
          <button class="dropbtn" style="background: none; border: none; color: #fff; font-family: inherit; font-size: inherit; cursor: pointer;">OMEGA &#9662;</button>
          <div class="dropdown-content">
            <a href="architecture.html">Architecture</a>
            <a href="hardware.html">Hardware & Mesh</a>
            <a href="gateway.html">Backend Gateway</a>
            <a href="mission-portal.html">Mission Portal</a>
          </div>
        </div>
        <a href="bathymetry.html">OMEGA-bath</a>
        <a href="beta-overview.html">BETA</a>
        <a href="cosnfx.html">CosNFX</a>
        <a href="weather-globe.html">Weather Globe</a>
        <a href="visual-timer.html">Visual Timer</a>
        <a href="engineering-journal.html">Journal</a>
        
        <div style="display: flex; align-items: center; margin-left: 0.5rem; border-left: 1px solid rgba(255,255,255,0.15); padding-left: 1.5rem;">
          <a href="https://jonathancapone.art" target="_blank" style="font-weight: 600; color: var(--ink-soft);">Art Portfolio</a>
        </div>
      </nav>
    </div>
  </header>

  <section class="hero wrap">
    <span class="eyebrow">Embedded UI</span>
    <h1>Ultimate Visual Timer.</h1>
    <p>A configurable, glanceable e‑ink timer for the ESP32‑S3 CrowPanel.</p>
    <div class="hero-actions">
        <a class="btn btn-secondary" href="https://jonathancapone.art" target="_blank">Art Portfolio</a>
    </div>
  </section>

  <main class="main-shell wrap" role="main">
    <div class="main-inner">

      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">At A Glance</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">E-Ink UI Constraints</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">The Ultimate Visual Timer is an embedded firmware built for the Elecrow CrowPanel ESP32‑S3 2.13" E‑Paper HMI. It replaces traditional hardcoded digit widgets with 41 dynamic, full-screen animated faces running on a complex deep-sleep power model.</p>

        <div class="grid-3" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Visuals</span>
            <h3 style="font-size: 1.2rem;">41 Animated Faces</h3>
            <p style="font-size: 0.85rem;">Every face is a pure stateless function that draws a scene—like a rising tide, an eclipsed moon, or a Rube Goldberg machine—that resolves exactly as time hits zero.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Power</span>
            <h3 style="font-size: 1.2rem;">Micro-amp Standby</h3>
            <p style="font-size: 0.85rem;">Leverages the bistable nature of E-ink. The board deep-sleeps completely between updates or when idle, keeping the image on screen with zero power. Survives weeks on a tiny Li-Po battery.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Connectivity</span>
            <h3 style="font-size: 1.2rem;">Local Web Remote</h3>
            <p style="font-size: 0.85rem;">Features an embedded captive portal and an HTTP endpoint (<code>uvt.local</code>) allowing full configuration of the timer from a phone without requiring a firmware reflash.</p>
          </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <img src="images/visual-timer/00_art_contact.png" alt="Visual Timer Faces" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Graphics Architecture</span>
          <h2>Stateless Functional Rendering.</h2>
          <p>Rather than loading heavy bitmaps into memory, every visual face is a pure C++ function that calculates a single frame based on a <code>FaceCtx</code> snapshot (containing remaining seconds and fractional progress). Because it never touches global state, the firmware can safely transition into deep-sleep and wake up to render the exact correct pixel field instantly.</p>
          <div class="grid-2" style="margin-top: 2rem; gap: 1rem;">
            <img src="images/visual-timer/art_tide.png" alt="Tide Face" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
            <img src="images/visual-timer/art_eclipse.png" alt="Eclipse Face" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
          </div>
        </div>
      </section>

      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">
        <span class="section-kicker">Power Engineering</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">The E-Ink Lifecycle</h2>
        
        <div class="grid-2" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Graceful Sleep</span>
            <h3 style="font-size: 1.2rem;">Deep-Sleep Cycling</h3>
            <p style="font-size: 0.85rem;">When paused or finished, the ESP32-S3 enters deep-sleep mode, drawing only tens of microamps. The bistable display controller retains the final image frame infinitely with zero power.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Ghosting Mitigation</span>
            <h3 style="font-size: 1.2rem;">Partial vs Full Refreshes</h3>
            <p style="font-size: 0.85rem;">To avoid the jarring black-and-white flash of an E-ink screen, the timer utilizes fast partial refreshes. To prevent pigment ghosting over long timers, it enforces a mathematical clean full-refresh every 30 partial updates.</p>
          </div>
        </div>
      </section>

    </div>
  </main>
</body>
</html>
"""

def main():
    target_path = os.path.join(os.getcwd(), 'visual-timer.html')
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Successfully wrote {target_path}")

if __name__ == "__main__":
    main()
