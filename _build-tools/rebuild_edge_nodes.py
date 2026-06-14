import re

def rebuild():
    with open('edge-nodes.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the start of the hero
    hero_start = html.find('<section class="hero wrap">')
    
    # Find the end of main
    main_end = html.find('</main>') + len('</main>')
    
    if hero_start == -1 or main_end == -1:
        print("Could not find hero or main tags.")
        return

    new_content = """<section class="hero wrap">
    <span class="eyebrow">Component</span>
    <h1>Sensor Nodes.</h1>
    <p>Hardware provisioning, lithium battery science, MPPT solar controllers, and environmental thermodynamics.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="https://github.com/aminalnam/OMEGA" target="_blank">View OMEGA on GitHub</a>
    </div>
  </section>

  <main class="main-shell wrap">
    <div class="main-inner">

          <section class="section">
            <div class="section-content">
              <span class="section-kicker">Power Engineering</span>
              <h2>Battery Science & MPPT Solar.</h2>
              <p>Deploying remote sensor nodes into the environment introduces severe, often fatal hardware constraints. A node cannot plug into a wall outlet; it must harvest and mathematically budget its own power.</p>
<p>The sensor node firmware integrates Maximum Power Point Tracking (MPPT) algorithms to optimize solar energy harvesting. As the sun moves, the solar panel's voltage fluctuates. The firmware actively modulates the load impedance to ensure the panel always operates at its maximum power extraction point, rapidly charging the internal lithium-ion cells.</p>
<p><strong>Relevance:</strong> A standard ESP32 draws roughly 100mA while active, draining an 18650 lithium battery in two days. The firmware must meticulously balance the incoming solar joules against the outgoing telemetry requirements, ensuring the battery never drops below its critical 3.2V threshold, which would cause permanent chemical degradation.</p>
            </div>
          </section>
    
          <section class="section">
            <div class="section-content">
              <span class="section-kicker">Hardware Physics</span>
              <h2>Thermodynamics & Heat Dissipation.</h2>
              <p>Edge nodes must be encased in completely sealed, hermetic IP67+ waterproof enclosures to survive environmental exposure. However, processors like the ESP32 and accompanying 30dBm LoRa amplifiers generate significant internal heat.</p>
<p>Because they are sealed, there is zero active ventilation. The system relies entirely on <strong>passive thermal conduction</strong> through the enclosure walls to the surrounding ambient air. If the firmware transmits data continuously, the internal ambient temperature will inevitably rise until the silicon hits its thermal throttling limit, leading to catastrophic system failure or melted PLA mounts.</p>
<p><strong>How we use this:</strong> OMEGA firmware implements rigid software limiters on radio transmit duty-cycles. It monitors the internal CPU die temperatures and aggressively throttles clock speeds or drops non-critical telemetry packets to ensure the thermal envelope of the enclosure is never breached.</p>
            </div>
          </section>

          <section class="section section-block" style="background: rgba(0,0,0,0.4);">
            <span class="section-kicker">Energy Physics</span>
            <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Power Budgets & Insolation.</h2>
            <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">A remote node operating in winter might only receive 2 hours of direct solar insolation per day. The node must mathematically budget its stored energy to survive a 14-hour night.</p>
            
            <div class="grid-3" style="margin-bottom: 2rem;">
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Dark Current</span>
                <h3 style="font-size: 1.2rem;">The Silent Killer</h3>
                <p style="font-size: 0.85rem;">Even when not actively transmitting, a spinning ESP32 processor draws a "dark current" of 100mA. Overnight, this will completely drain the lithium cell, causing the physical hardware to freeze.</p>
              </div>
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Deep Sleep</span>
                <h3 style="font-size: 1.2rem;">15µA Survival</h3>
                <p style="font-size: 0.85rem;">The firmware physically cuts the MOSFET power rail to auxiliary sensors and LoRa chips, dropping the entire board into a 15 micro-amp deep sleep state between transmissions.</p>
              </div>
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Dynamic Polling</span>
                <h3 style="font-size: 1.2rem;">Battery-Aware Rates</h3>
                <p style="font-size: 0.85rem;">If the battery voltage drops below 3.6V, the firmware automatically downscales its sample rate from every 10 minutes to every 60 minutes, mathematically guaranteeing survival until sunrise.</p>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="section-content">
              <span class="section-kicker">Deployment Operations</span>
              <h2>Over-The-Air (OTA) Pipelines.</h2>
              <p>Retrieving a deployed remote sensor from the environment simply to update a line of code is logistically prohibitive. OMEGA implements a robust Over-The-Air (OTA) flashing pipeline over its own DTN mesh network.</p>
<p><strong>How it works:</strong> The compiled firmware binaries are fragmented, heavily compressed, and signed with a cryptographic private key. The Gateway transmits these fragments sequentially over the LoRa network. The edge node receives the fragments, buffers them in its external SPI flash memory, and reassembles them.</p>
<p>Crucially, the node then mathematically verifies the cryptographic signature of the reassembled binary. It only switches the boot partition pointer to the new firmware if the validation passes perfectly, completely preventing "bricked" nodes from corrupt RF packets.</p>
            </div>
          </section>
    
    </div>
  </main>"""

    final_html = html[:hero_start] + new_content + html[main_end:]
    
    with open('edge-nodes.html', 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print("Successfully rebuilt edge-nodes.html.")

if __name__ == '__main__':
    rebuild()
