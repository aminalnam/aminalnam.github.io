import re

def rebuild():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the start of the hero
    hero_start = html.find('<section class="hero wrap">')
    
    # Find the end of main
    main_end = html.find('</main>') + len('</main>')
    
    if hero_start == -1 or main_end == -1:
        print("Could not find hero or main tags.")
        return

    new_content = """<section class="hero wrap">
    <span class="eyebrow">Technical Portfolio</span>
    <h1>OMEGA Platform.</h1>
    <p style="max-width: 800px; font-size: 1.25rem; color: var(--ink-soft); line-height: 1.7; margin-bottom: 2rem;">
      A mixed-bearer environmental sensing and maritime operations platform. OMEGA connects field devices, stationary sensor nodes, relays, and gateways into one resilient observation network using the Custom Binary TLV Protocol over LoRa.
    </p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="overview.html">Read The Architecture Overview</a>
      <a class="btn btn-secondary" href="https://github.com/aminalnam/OMEGA" target="_blank">View GitHub Repository</a>
    </div>
  </section>

  <main class="main-shell wrap">
    <div class="main-inner">

      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">Platform Capabilities</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin: 0 0 2rem;">System Modules</h3>
        
        <div class="grid-3">
          <a href="gateway.html" class="panel">
            <span class="status-label status-implemented">Implemented</span>
            <h3>Gateway Firmware</h3>
            <p>The core Python edge router handling HTTP ingest, SQLite normalization, and OpenAPI.</p>
          </a>
          <a href="mesh-core.html" class="panel">
            <span class="status-label status-implemented">Mesh Core</span>
            <h3>Relay Firmware</h3>
            <p>Delay Tolerant Network (DTN) overlay using LoRa CSS and Custom Binary TLV compression.</p>
          </a>
          <a href="mission-portal.html" class="panel">
            <span class="status-label status-implemented">Mission Portal</span>
            <h3>Portal Software</h3>
            <p>WebGL mapping dashboard, live tiles, and real-time operations overview.</p>
          </a>
          <a href="edge-nodes.html" class="panel">
            <span class="status-label status-implemented">Hardware</span>
            <h3>Sensor Nodes</h3>
            <p>Hardware provisioning, lithium battery science, MPPT solar controllers, and thermodynamics.</p>
          </a>
          <a href="data-providers.html" class="panel">
            <span class="status-label status-implemented">Data Providers</span>
            <h3>Data Providers</h3>
            <p>External federation with ERDDAP, NOAA, and Copernicus Marine services.</p>
          </a>
          <a href="janus-acoustic.html" class="panel">
            <span class="status-label status-partial">Partial</span>
            <h3>JANUS Acoustics</h3>
            <p>NATO-standard acoustic modulation bridge for underwater nodes.</p>
          </a>
          <a href="simulation.html" class="panel">
            <span class="status-label status-implemented">Simulation</span>
            <h3>Simulation</h3>
            <p>Procedural test harness for synthetic mesh traffic and Digital Twins.</p>
          </a>
          <a href="bathymetry.html" class="panel">
            <span class="status-label status-implemented">Bathymetry</span>
            <h3>Bathymetry</h3>
            <p>Inverse Distance Weighting (IDW) interpolation module for depth mapping.</p>
          </a>
        </div>
      </section>

      <section class="section section-block">
        <span class="section-kicker">Geospatial & Data Tools</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Ocean Sensors.</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
          A repository and documentation hub for underwater sensing, data logging, bathymetric mapping, and geospatial visualization workflows. Features Python algorithms for contour generation and Google Earth overlays.
        </p>
        
        <div class="grid-3">
          <a href="https://github.com/aminalnam/Ocean-Sensors" target="_blank" class="panel">
            <span class="status-label status-implemented">Open Source Python</span>
            <h3>Bathymetric Mapping</h3>
            <p>Python scripts for Inverse Distance Weighting (IDW) interpolation, generating topographic depth contours from sparse acoustic soundings.</p>
          </a>
        </div>
      </section>

    </div>
  </main>"""

    final_html = html[:hero_start] + new_content + html[main_end:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print("Successfully refocused index.html.")

if __name__ == '__main__':
    rebuild()
