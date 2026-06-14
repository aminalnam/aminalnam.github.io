import os

mesh_core_html = r"c:\Users\jdcap\Documents\OMEGA-website\aminalnam.github.io\mesh-core.html"

with open(mesh_core_html, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Resilient Telemetry block
old_dtn_block = '''      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">Resilient Telemetry</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Store & Forward Mechanics</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">A
          true Delay Tolerant Network (DTN) assumes that the physical link will constantly break. OMEGA edge nodes use
          localized SQLite buffers to mathematically guarantee zero data loss during prolonged RF blackouts.</p>

        <div class="section-visual" style="padding: 1.5rem;">
          <div class="mermaid">
            sequenceDiagram
            participant SENS as Deep Water Sensor
            participant NODE as Floating Buoy
            participant RF as LoRa RF Link
            participant GATE as Shore Gateway

            SENS->>NODE: 1. High-Freq Telemetry stream
            NODE->>RF: 2. Transmit Binary TLV packet
            RF--xNODE: 3. FAIL: Link dropped (Wave interference)
            Note over NODE: Link state: OFFLINE
            NODE->>NODE: 4. Route to local SQLite NVRAM buffer
            Note right of SENS: Node continues collecting 10,000+ points
            NODE->>RF: 5. Probe RF Link (10 min later)
            RF-->>NODE: 6. SUCCESS: Link re-established
            Note over NODE: Link state: ONLINE
            NODE->>GATE: 7. Bulk sync 10,000 points via Zstd compression
            GATE-->>NODE: 8. ACK received
            NODE->>NODE: 9. Flush local SQLite buffer
          </div>
        </div>
      </section>'''

new_dtn_block = '''      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">Resilient Telemetry</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">The "Mule" Store & Forward Model.</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">A true Delay Tolerant Network (DTN) assumes that end-to-end paths may never exist simultaneously. OMEGA shifts from connection-oriented routing to self-contained <strong>bundle</strong> routing.</p>

        <div class="grid-3" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Bounded Spread</span>
            <h3 style="font-size: 1.2rem;">Store & Carry</h3>
            <p style="font-size: 0.85rem;">When a node captures a mesh frame, it deduplicates the payload via its origin/sequence and places it in a finite <strong>carry buffer</strong>. Mobile nodes (like boats or ASVs) physically <em>carry</em> these stored bundles as they travel, physically acting as network links across disconnected regions.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Identity</span>
            <h3 style="font-size: 1.2rem;">ed25519 Trust Model</h3>
            <p style="font-size: 0.85rem;">Trust lives entirely in the data, not the carrier. Because each bundle is cryptographically signed with the origin node's <code>ed25519</code> public key, anyone can run an OMEGA gateway or act as a mule. A malicious carrier can delay a bundle, but they can never forge or tamper with the payload.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Delivery</span>
            <h3 style="font-size: 1.2rem;">Opportunistic Offload</h3>
            <p style="font-size: 0.85rem;">The instant any mule or relay detects IP reachability—whether via its own cellular modem, a Wi-Fi HaLow link to shore, or an open hotspot—it completely flushes its buffered bundles to the central <code>POST /v1/ingest/frame</code> contract, completing the data's journey home.</p>
          </div>
        </div>
      </section>
      
      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Distributed Systems</span>
          <h2>DTN Command Versioning.</h2>
          <p>Uplink telemetry is inherently order-independent, but bidirectional <em>downlink commands</em> (like telling a node to change its transmission power) are stateful. In a store-and-forward network, a delayed command might arrive at a node days after a newer command was already applied.</p>
          <p><strong>The Newest-Wins Rule:</strong> OMEGA solves this by enforcing declarative, versioned commands. Every command carries a monotonic operator version and a target key. The node tracks the applied version per-key in Non-Volatile Storage (NVS). When a command arrives, it only executes if <code>cmd.version > applied[key]</code>. Older arrivals are instantly dropped as stale, completely eliminating rollback issues under extreme packet loss or reordering.</p>
        </div>
      </section>'''

if old_dtn_block in content:
    content = content.replace(old_dtn_block, new_dtn_block)
else:
    print("WARNING: Old DTN block not found in mesh-core.html")

with open(mesh_core_html, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated mesh-core.html successfully.")
