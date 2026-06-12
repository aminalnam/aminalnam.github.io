import re

with open('external-data.html', 'r', encoding='utf-8') as f:
    data = f.read()

target1 = """    <div class="main-inner">"""

replacement1 = """    <div class="main-inner">

          <section class="section">
            <div class="section-content">
              <span class="section-kicker">Public Ocean Data Integration</span>
              <h2>NOAA & Open-Meteo Ingestion.</h2>
              <p>The OMEGA-wave gateway is designed to integrate seamlessly with the broader oceanographic ecosystem. It features a built-in <strong>Public Ocean + Weather Data Loader</strong> that pulls live data directly into the OMEGA observation store alongside the fleet's own telemetry.</p>
              <p><strong>Supported Sources:</strong> The gateway dynamically ingests NOAA NDBC buoy observations, NOAA CO-OPS tide and met products, Open-Meteo marine/weather context, and NWS weather alerts. This allows the Map Portal to display high-resolution external ground-truth alongside the OMEGA mesh data on the exact same WebGL canvas.</p>
            </div>
          </section>"""

data = data.replace(target1, replacement1)

with open('external-data.html', 'w', encoding='utf-8') as f:
    f.write(data)
print("Updated external-data.html")
