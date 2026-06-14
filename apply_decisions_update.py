import re

def update_file(filename, replacements):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for old, new in replacements:
            if isinstance(old, re.Pattern):
                new_content = old.sub(new, new_content)
            else:
                new_content = new_content.replace(old, new)
                
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes in {filename} (maybe already updated or string not found)")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

# software-decisions.html updates
new_sd_sections = '''      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">
        <span class="section-kicker">Trust Model</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Absolute Data Purity &amp; Float-Free Signing.</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">An ocean instrument that conflates a forecast with a measurement is scientifically useless. OMEGA enforces an "Absolute Data Purity" axiom: the live map shows <strong>only</strong> real, deployed hardware and real measurements. Missing data renders as an honest gap, never imputed.</p>
        
        <div class="grid-2" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">The Problem</span>
            <h3 style="font-size: 1.2rem;">Cross-Language Float Bugs</h3>
            <p style="font-size: 0.85rem;">Cryptographically signing a JSON payload containing floating-point numbers is notoriously brittle. Python might serialize a coordinate as <code>1e-07</code> while a JavaScript node emits <code>0.0000001</code>. The data is identical, but the string representation differs, breaking the signature verification and making cross-platform trust impossible.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">The Solution</span>
            <h3 style="font-size: 1.2rem;">Float-Free Ed25519 Envelopes</h3>
            <p style="font-size: 0.85rem;">OMEGA utilizes Ed25519 signatures over a deterministic, <strong>float-free signing view</strong>. Measurements are converted to integer epoch seconds, microdegrees, and millimeters. The canonical serializer strictly rejects any floating-point numbers. This guarantees that signed bytes are 100% reproducible on a $30 microcontroller and a cloud server alike, securing the federation against spoofed readings.</p>
          </div>
        </div>
      </section>

      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">
        <span class="section-kicker">Operator Self-Service</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">SafeFormula AST vs. eval().</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">Operators frequently need custom derived metrics (e.g., dewpoint, heat index, density) calculated on the fly without writing backend code. The naive approach is running Python's <code>eval()</code> on the server, which is a massive code-injection vulnerability on a public gateway.</p>
        <p style="color: var(--ink-soft); font-size: 1rem; line-height: 1.6; max-width: 800px;">
          <strong>The Solution:</strong> The backend implements a custom Abstract Syntax Tree (AST) interpreter for derived metrics. It parses and validates mathematical formulas at <strong>definition time</strong>, explicitly allowing only numeric literals and a whitelisted set of math operations (<code>sqrt</code>, <code>sin</code>, <code>log</code>). It actively rejects attribute access, function calls, and import tricks at parse time. This provides operators full mathematical expressiveness while guaranteeing complete safety.
        </p>
      </section>

    </div>
  </main>'''

update_file('software-decisions.html', [
    ('    </div>\n  </main>', new_sd_sections)
])

# system-architecture.html updates
layer2_new = '''<section class="section">
        <div class="section-content">
          <span class="section-kicker">Layer 2: Transport</span>
          <h2>The Bidirectional DTN &amp; Bearer Arbitrage.</h2>
          <p>Standard IoT relies on persistent MQTT or HTTP connections. Over the ocean, those connections do not exist. OMEGA operates a <strong>Delay Tolerant Network (DTN)</strong> utilizing a Custom Binary TLV Protocol that crushes a 283B JSON payload into a highly dense 84B frame.</p>
          <p><strong>Bearer Arbitrage & QoS:</strong> A single edge node might have LoRa, HaLow, and cellular radios available simultaneously. OMEGA dynamically routes packets by message priority (alarm vs. bulk) rather than fixed links. Critical alarms are routed instantly over cellular/low-latency bearers, while bulk telemetry utilizes LoRa store-and-forward.</p>
          <p><strong>Foreign-Mesh Last Resort:</strong> When OMEGA's native bearers fail, the network can route envelopes over foreign open meshes (like Meshtastic). To ensure legal compliance and protect shared airtime, a strict, firmware-enforced duty-cycle guardrail governs exactly how much traffic is permitted over these external channels.</p>
        </div>
      </section>'''

layer3_new = '''<section class="section">
        <div class="section-content">
          <span class="section-kicker">Layer 3: Gateway</span>
          <h2>The Federated Data Broker &amp; Universal Contract.</h2>
          <p>The OMEGA Gateway acts as the translation boundary between the physical RF mesh and the 3D Digital Twin. Crucially, the gateway is defined by a <strong>protocol contract</strong>, not a physical hardware box. Any community member can safely deploy their own gateway that simply captures raw frames and forwards them via IP.</p>
          <p><strong>Universal Ingest:</strong> The network layer handles all deduplication and identity resolution centrally. The gateway accepts observations from an array of heterogeneous networks—including a native SignalK bridge for cruising vessels, TTN/LoRaWAN integrations, and the SX1302 concentrator. They all feed into the same unified <code>/v1/ingest/frame</code> contract, instantly turning boats and third-party meshes into first-class OMEGA stations.</p>
          <p><strong>High-Throughput Caching & IO:</strong> To support a lag-free 3D WebGL globe, the broker caches macro-APIs as <strong>Cloud-Optimized GeoTIFFs (COG)</strong>. Furthermore, to prevent database locking when edge nodes are spamming telemetry, the backend enforces <strong>Write-Ahead Logging (WAL)</strong> on its SQLite storage, completely decoupling read/write locks.</p>
        </div>
      </section>'''

update_file('system-architecture.html', [
    (re.compile(r'<section class="section">\s*<div class="section-content">\s*<span class="section-kicker">Layer 2: Transport</span>.*?</div>\s*</section>', re.DOTALL), layer2_new),
    (re.compile(r'<section class="section">\s*<div class="section-content">\s*<span class="section-kicker">Layer 3: Gateway</span>.*?</div>\s*</section>', re.DOTALL), layer3_new)
])
