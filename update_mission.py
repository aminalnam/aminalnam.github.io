import re

with open('mission-portal.html', 'r', encoding='utf-8') as f:
    data = f.read()

target1 = """      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Real-Time Data</span>
          <h2>WebSocket Firehose.</h2>
          <p>While the dashboard relies on resilient HTTP long-polling for poor field connections, it dynamically
            upgrades to a high-speed WebSocket Firehose when connected to fiber or 5G.</p>
          <p><strong>Execution:</strong> The Python FastAPI backend maintains a pub/sub event loop. The second a LoRa
            packet is received, decrypted, and validated, the `websocket_manager` pipes the parsed Binary TLV payload
            directly into the React DOM at 10Hz, instantly updating the map vectors without a single polling request.
          </p>
        </div>
      </section>"""

replacement1 = """      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Maritime Route Planning</span>
          <h2>Wayfinding Studio.</h2>
          <p>OMEGA-wave includes a built-in wayfinding layer modeled after advanced voyage optimization software. It builds multiple route scenarios between an origin and destination, comparing route offsets, speeds, and departure windows.</p>
          <p><strong>Execution:</strong> The backend scores scenarios directly against the latest OMEGA-wave environmental observations, factoring in currents, waves, wind, and shallow-water constraints. The planner routes around uploaded obstacle polygons and seeded chart barriers when land avoidance is enabled, returning a GeoJSON route collection for direct map rendering.</p>
        </div>
      </section>"""

target2 = """      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Frontend Architecture</span>
          <h2>React & Vite Mission Portal.</h2>
          <p>The <code>web/</code> directory contains the React-based Mission Portal. Built using the modern Vite build
            tool for instant Hot Module Replacement (HMR) during development, the UI architecture is completely
            decoupled from the Python gateway backend.</p>
          <p><strong>Architecture:</strong> It relies entirely on high-speed, asynchronous WebSockets and stateless HTTP
            polling established with the FastAPI edge router. This architecture allows the UI to stream live edge node
            telemetry, spatial coordinates, and critical structural alerts directly to the browser DOM at 10Hz,
            completely bypassing the need for slow, blocking REST API calls.</p>
 
        </div>
 
      </section>"""

replacement2 = """      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Frontend Architecture</span>
          <h2>React & Vite Mission Portal.</h2>
          <p>The <code>web/</code> directory contains the React-based Mission Portal, completely decoupled from the Python gateway backend. It exposes multiple interactive map modes: metric, freshness, site-overview, density-grid, track, and bathymetry.</p>
          <p><strong>Feature Stack:</strong> Beyond raw telemetry polling, the portal implements color-by-metric station symbols, freshness-aware styling, density-grid aggregation for quick regional pattern scanning, track overlays for moving assets, and interpolated bathymetry surfaces derived dynamically from georeferenced depth soundings.</p>
        </div>
      </section>"""

data = data.replace(target1, replacement1)
data = data.replace(target2, replacement2)

with open('mission-portal.html', 'w', encoding='utf-8') as f:
    f.write(data)
print("Updated mission-portal.html")
