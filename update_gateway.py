import os

gateway_html = r"c:\Users\jdcap\Documents\OMEGA-website\aminalnam.github.io\gateway.html"

with open(gateway_html, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Hardware Interfacing block
old_hardware_block = '''          <section class="section">
            <div class="section-content">
              <span class="section-kicker">Hardware Interfacing</span>
              <h2>Bidirectional Serial Bridge.</h2>
              <p>The FastAPI gateway does not have a physical LoRa radio. Instead, it is USB-tethered to a dedicated "shore node" running the OMEGA firmware. In Phase 1, this bridge was strictly one-way (receiving telemetry). The gateway now implements a fully bidirectional <strong>Streaming State Machine</strong>.</p>
<p><strong>Execution:</strong> The Python <code>gateway.mesh_command</code> module constructs binary TLV frames and wraps them in a strict USB-CDC framing envelope (<code>0x55 0xAA len_lo len_hi</code>). It streams these bytes over serial to the tethered node. The node's C++ <code>UsbFrameReader</code> decodes the bytes on the fly. If the command's destination ID matches the tethered node, it executes it immediately (e.g., <code>set-tx-power</code>). If the destination ID belongs to a buoy 10 miles offshore, it automatically re-transmits the binary payload over the LoRa RF mesh.</p>
              
            </div>
            
          </section>'''

new_hardware_block = '''          <section class="section section-block" style="background: rgba(0,0,0,0.4);">
            <span class="section-kicker">Hardware Interfacing</span>
            <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">T-ETH-ELITE & The Ingest Contract.</h2>
            <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
              While Phase 1 relied on a single USB-tethered relay node, the OMEGA federated network now operates via specialized, headless edge gateways. These gateways are entirely "dumb pipes"—they do not decrypt or decode payloads, allowing any community member to safely operate a gateway node.</p>
              
            <div class="grid-3" style="margin-bottom: 2rem;">
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Gateway Silicon</span>
                <h3 style="font-size: 1.2rem;">T-ETH-ELITE (ESP32-S3)</h3>
                <p style="font-size: 0.85rem;">The physical gateway consists of a LilyGo T-ETH-ELITE baseboard stacked with a T-SX1302 8-channel concentrator shield. This allows the node to concurrently listen to 8 LoRa channels simultaneously, catching bursts of DTN bundles across the mesh.</p>
              </div>
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Data Transfer</span>
                <h3 style="font-size: 1.2rem;">Semtech UDP Protocol</h3>
                <p style="font-size: 0.85rem;">Operating via the custom <code>esxp1302</code> packet forwarder, the gateway captures raw RF frames using the <code>0x34</code> public sync word. It immediately wraps these raw bytes into standard Semtech UDP packets and fires them over Ethernet or Wi-Fi to the central FastAPI ingest engine.</p>
              </div>
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">The Universal API</span>
                <h3 style="font-size: 1.2rem;">The Ingest Contract</h3>
                <p style="font-size: 0.85rem;">The gateway only POSTs raw base64 data to <code>/v1/ingest/frame</code>. The centralized OMEGA database manages all deduplication by tracking the origin key and sequence, allowing 5 different community gateways to hear and forward the same packet safely.</p>
              </div>
            </div>
          </section>
          
          <section class="section">
            <div class="section-content">
              <span class="section-kicker">Resilient Downlink</span>
              <h2>Coverage-Aware Outbox Leases (CALM).</h2>
              <p>In a heterogeneous federation with hundreds of overlapping gateways, determining <em>which</em> gateway should transmit a downlink command to a distant buoy is incredibly difficult. If all gateways transmit simultaneously, the RF collisions will destroy the packet. If only a single master gateway transmits, you introduce a catastrophic single point of failure.</p>
              <p><strong>Execution:</strong> OMEGA solves this via <strong>CALM (Coverage-Aware Outbox Leases)</strong>. Every time a gateway ingests an uplink frame, the DB logs its <code>gateway_id</code> and the signal strength (RSSI/SNR). When an operator issues a downlink command, the backend calculates a routing lease. It queries the <code>gateway_sightings</code> provenance table, identifies the single gateway that "hears" the target node the best, and grants that specific gateway a temporary, exclusive lease to transmit the command. If the transmission isn't acknowledged, the lease expires and falls back to the next-best gateway automatically.</p>
            </div>
          </section>'''

if old_hardware_block in content:
    content = content.replace(old_hardware_block, new_hardware_block)
else:
    print("WARNING: Old hardware block not found in gateway.html")

with open(gateway_html, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated gateway.html successfully.")
