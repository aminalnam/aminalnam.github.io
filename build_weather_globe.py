import os

html_content = """<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Jonathan Capone — Weather Globe</title>

  <meta name="description" content="A live, sun-synchronous desk globe on a 466x466 AMOLED ESP32-S3." />
  <meta property="og:title" content="Jonathan Capone — Weather Globe" />
  <meta property="og:description"
    content="A live, sun-synchronous desk globe on a 466x466 AMOLED ESP32-S3." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://jonathancapone.com/weather-globe.html" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Jonathan Capone — Weather Globe" />
  <meta name="twitter:description"
    content="A live, sun-synchronous desk globe on a 466x466 AMOLED ESP32-S3." />

  <link rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌍</text></svg>">

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
    <span class="eyebrow">Embedded Systems</span>
    <h1>Weather Globe.</h1>
    <p>A live, sun-synchronous desk globe on a 466×466 AMOLED ESP32-S3.</p>
    <div class="hero-actions">
        <a class="btn btn-secondary" href="https://jonathancapone.art" target="_blank">Art Portfolio</a>
    </div>
  </section>

  <main class="main-shell wrap" role="main">
    <div class="main-inner">

      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">At A Glance</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">The Hardware & Constraints</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">A standalone, giftable desk globe that shows Earth from space in real time — live day/night, NASA clouds, and city lights — on a 1.75" round AMOLED. It is a scientifically honest object built for a non-technical user.</p>

        <div class="grid-3" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Scale</span>
            <h3 style="font-size: 1.2rem;">~1,460 LOC</h3>
            <p style="font-size: 0.85rem;">Intensive 2-day core build resulting in ~1,460 lines of C++ firmware on a single <code>main.cpp</code> file, and ~3,460 lines of Python host tooling.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Target</span>
            <h3 style="font-size: 1.2rem;">LilyGo T-Display-S3</h3>
            <p style="font-size: 0.85rem;">Running on the ESP32-S3 with a 466x466 CO5300 QSPI AMOLED display. Leveraging 8 MB PSRAM, 16 MB flash, and 3 FreeRTOS tasks spanning 2 cores.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Data</span>
            <h3 style="font-size: 1.2rem;">4 External Services</h3>
            <p style="font-size: 0.85rem;">Pulling keyless data from NASA GIBS/VIIRS, ip-api, Open-Meteo, and NTP with zero API keys required by the end user.</p>
          </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <img src="images/weather-globe/weather-globe_01_live-earth-with-clouds.png" alt="Live Earth with NASA clouds" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Core Philosophy</span>
          <h2>Scientific Honesty vs. Non-Technical Setup.</h2>
          <p>Most "Earth globe" gadgets show a pretty but fake planet. I wanted a desk object that shows the planet <em>as it actually is right now</em>: the real day/night line for this date and time, <strong>real cloud cover pulled from NASA satellites</strong>, and the real glow of cities after dark.</p>
          <p>But because it's a gift, a non-technical owner must get from power-on to a working globe with a phone and no instructions beyond "join this hotspot." Every choice in the WiFi path bends toward that — multi-network memory, a captive portal, and a setup hotspot that works anywhere.</p>
        </div>
      </section>

      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">
        <span class="section-kicker">Engineering Highlight</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Real-time Graphics & Concurrency</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">A complete, multi-core ESP32-S3 firmware: a real-time renderer on core 1, network fetchers on core 0, NVS-persisted settings, and a WiFi captive-portal stack.</p>

        <div class="grid-2" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Graphics</span>
            <h3 style="font-size: 1.2rem;">Constrained Real-Time Render</h3>
            <p style="font-size: 0.85rem;">A per-pixel spherization lookup table maps screen pixels to texture samples once at boot. The frame loop only samples and shades using real subsolar day/night lighting, an 8x8 Bayer dithering matrix to kill RGB565 banding, additive Black Marble city lights, and 32-row strip rendering into fast internal RAM.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Concurrency</span>
            <h3 style="font-size: 1.2rem;">Lock-Free Handoff</h3>
            <p style="font-size: 0.85rem;">Double-buffered cloud textures published by an atomic pointer swap. A self-consistent weather snapshot published the same way. The hot render path never blocks on core 1, and never sees a torn frame while core 0 handles heavy JPEG decoding.</p>
          </div>
        </div>
        
        <div class="grid-2" style="gap: 1rem;">
            <img src="images/weather-globe/weather-globe_03_day-night-terminator.png" alt="Day Night Terminator" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
            <img src="images/weather-globe/weather-globe_04_city-lights-night-side.png" alt="City Lights on Night Side" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Hardware Diagnostics</span>
          <h2>The Display Corruption Deep Dive.</h2>
          <p>I root-caused a <strong>device-only</strong> display corruption to the CO5300 controller's handling of partial writes. Any partial write whose x, y, width, or height was odd resulted in catastrophic shifting and corruption.</p>
          <p>Because the AMOLED cannot be screenshotted, I built <strong>Python render-replicas</strong> that reproduced the device's math on the desktop. The bug was invisible to the replica because the replica doesn't model the physical panel's constraints. After ~7 debugging rounds, I turned the root cause into a standing even-alignment rule, designing the full-screen black time/weather card <em>around</em> the constraint instead of fighting it.</p>
          <img src="images/weather-globe/weather-globe_07_time-and-weather-card.png" alt="Time and Weather Card" style="width: 100%; max-width: 400px; border-radius: 8px; border: 1px solid var(--line); margin-top: 1.5rem;">
        </div>
      </section>

      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">Field Fixes</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Networking & Real-Time Numerics</h2>
        
        <div class="grid-2" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Clock Drift vs. Judder</span>
            <h3 style="font-size: 1.2rem;">Real-time Clocks</h3>
            <p style="font-size: 0.85rem;">Designed a time-lapse clock that is both NTP-anchored (drift-free, no millis wrap) and sub-second smooth. I hardened it against a cross-core read race, a live-speed-change orientation snap, and a backward NTP step.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">The Ghost Network</span>
            <h3 style="font-size: 1.2rem;">Captive Portal Pathing</h3>
            <p style="font-size: 0.85rem;">A field-grade fix for a SoftAP that was unreachable at a new location. Fixed by serving the portal AP-only on a fixed channel and erasing the WiFi driver's own persisted credentials to stop the radio from hunting for a ghost network.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Data Pipeline</span>
          <h2>NASA VIIRS & Data Honesty.</h2>
          <p>Live NASA VIIRS clouds are ingested with a completeness detection system that measures mid-latitude gaps instead of total darkness (so polar night isn't mistaken for missing data). It includes a 7-day fallback for unfinished daily mosaics and a Blue Marble base fill so the globe never shows an invented cloud or a black void. All external data is keyless and rate-limit-respectful.</p>
          <div style="margin-top: 2rem;">
            <img src="images/weather-globe/weather-globe_02_live-earth-six-views-rotation.png" alt="Earth views" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Feature Expansion</span>
          <h2>Ten Selectable Bodies.</h2>
          <p>The globe is capable of displaying multiple high-resolution celestial bodies, backed by LittleFS flash assets. The user can switch between the Earth, Moon, Mars, and others seamlessly via the web setup portal.</p>
          <div class="grid-2" style="margin-top: 2rem; gap: 1rem;">
            <img src="images/weather-globe/weather-globe_05_selectable-planets.png" alt="Selectable Planets" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
            <img src="images/weather-globe/weather-globe_06_body-texture-set.png" alt="Texture Sets" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);">
          </div>
        </div>
      </section>

    </div>
  </main>
</body>
</html>
"""

def main():
    target_path = os.path.join(os.getcwd(), 'weather-globe.html')
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Successfully wrote {target_path}")

if __name__ == "__main__":
    main()
