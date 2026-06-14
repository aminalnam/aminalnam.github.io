import re

def rebuild():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the start of the section-block
    start_str = '<section class="section section-block" style="background: rgba(0,0,0,0.4);">'
    start_idx = html.find(start_str)
    
    if start_idx == -1:
        print("Could not find section-block")
        return
        
    main_end = html.find('</div>\n  </main>')
    
    new_content = """<section class="section section-block" style="background: rgba(0,0,0,0.4); padding-bottom: 2rem;">
        <span class="section-kicker">Platform Capabilities</span>
        <h3 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0 0 2.5rem; letter-spacing: -0.02em;">System Modules.</h3>
        
        <div class="bento-grid">
          <!-- Mission Portal (Large Feature) -->
          <a href="mission-portal.html" class="panel col-span-2 row-span-2">
            <img src="assets/images/portal_ui.png" class="bento-bg-img" alt="Mission Portal UI">
            <div class="bento-content">
              <span class="status-label status-implemented">Portal Software</span>
              <h3 style="font-size: 2.2rem;">Mission Portal</h3>
              <p style="font-size: 1.1rem; max-width: 500px;">WebGL mapping dashboard, live interactive telemetry tiles, and real-time operations overview for the entire mesh fleet.</p>
            </div>
          </a>

          <!-- Gateway -->
          <a href="gateway.html" class="panel row-span-2">
            <img src="assets/images/gateway.png" class="bento-bg-img" alt="Shore Gateway">
            <div class="bento-content">
              <span class="status-label status-implemented">Edge Compute</span>
              <h3 style="font-size: 1.8rem;">Gateway Firmware</h3>
              <p>The core Python edge router handling HTTP ingest, SQLite WAL normalization, and FastAPI routing.</p>
            </div>
          </a>

          <!-- Mesh Core -->
          <a href="mesh-core.html" class="panel">
            <img src="assets/images/architecture.png" class="bento-bg-img" style="opacity: 0.1;" alt="Mesh Architecture">
            <div class="bento-content">
              <span class="status-label status-implemented">Networking</span>
              <h3>Relay Firmware</h3>
              <p>Delay Tolerant Network (DTN) overlay using Custom Binary TLV compression.</p>
            </div>
          </a>

          <!-- Hardware -->
          <a href="edge-nodes.html" class="panel">
            <img src="assets/images/buoy.png" class="bento-bg-img" style="opacity: 0.2; object-position: top;" alt="Sensor Buoy">
            <div class="bento-content">
              <span class="status-label status-implemented">Hardware</span>
              <h3>Sensor Nodes</h3>
              <p>Hardware provisioning, lithium battery science, MPPT solar controllers, and thermodynamics.</p>
            </div>
          </a>

          <!-- Utilities -->
          <a href="data-providers.html" class="panel">
            <div class="bento-content">
              <span class="status-label status-implemented">Data</span>
              <h3>External Federations</h3>
              <p>Integration with ERDDAP, NOAA, and Copernicus services.</p>
            </div>
          </a>

          <a href="janus-acoustic.html" class="panel">
            <div class="bento-content">
              <span class="status-label status-partial">Protocol</span>
              <h3>JANUS Acoustics</h3>
              <p>NATO-standard acoustic modulation bridge for subsea nodes.</p>
            </div>
          </a>
          
          <a href="simulation.html" class="panel">
            <div class="bento-content">
              <span class="status-label status-implemented">Emulation</span>
              <h3>Digital Twins</h3>
              <p>Procedural test harness for synthetic mesh traffic.</p>
            </div>
          </a>

          <a href="copilot.html" class="panel">
            <div class="bento-content">
              <span class="status-label status-implemented">AI Core</span>
              <h3>Honu Copilot</h3>
              <p>Intent-based tool execution for spatial queries.</p>
            </div>
          </a>
        </div>
      </section>

      <section class="section section-block" style="padding-top: 2rem;">
        <span class="section-kicker">Geospatial & Data Tools</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.8rem; margin: 0 0 1.5rem;">Ocean Sensors.</h2>
        <p style="color: var(--ink-soft); font-size: 1.15rem; margin-bottom: 2.5rem; max-width: 800px; line-height: 1.7;">
          A repository and documentation hub for underwater sensing, data logging, bathymetric mapping, and geospatial visualization workflows. Features Python algorithms for contour generation and Google Earth overlays.
        </p>
        
        <div class="bento-grid">
          <a href="https://github.com/aminalnam/Ocean-Sensors" target="_blank" class="panel col-span-2">
            <img src="MAP00_contours.png" class="bento-bg-img" style="opacity: 0.3; object-position: right;" alt="Bathymetry Contours">
            <div class="bento-content">
              <span class="status-label status-implemented">Open Source Python</span>
              <h3 style="font-size: 2rem;">Bathymetric Mapping</h3>
              <p style="font-size: 1.1rem; max-width: 450px;">Python scripts for Inverse Distance Weighting (IDW) interpolation, generating topographic depth contours from sparse acoustic soundings.</p>
            </div>
          </a>
        </div>
      </section>
"""

    final_html = html[:start_idx] + new_content + html[main_end:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print("Successfully rebuilt index.html to Bento Box.")

if __name__ == '__main__':
    rebuild()
