import os
import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def overhaul_overview():
    path = 'overview.html'
    if not os.path.exists(path): return
    content = read_file(path)
    
    # Use regex to find the block from Genesis down to System Architecture
    pattern = re.compile(r'<section class="section section-block" style="background: rgba\(0,0,0,0\.4\);">\s*<span class="section-kicker">The Genesis</span>.*?<section class="section">\s*<div class="section-content">\s*<span class="section-kicker">System Architecture</span>', re.DOTALL)
    
    replacement = """<section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">The Core Axiom</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Bearer-Agnostic Observation Protocol.</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
          The true intellectual through-line of the OMEGA program is the separation of envelope <em>semantics</em> from per-bearer <em>wire forms</em>. "The standard is the protocol, not the box."
        </p>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
          This design decision is what allowed an SX1302 concentrator, SignalK marine bridges, and TTN (The Things Network) adapters to all join the mesh with absolutely zero protocol changes. The envelope standardizes identity, time, location, and payload, while the wire format seamlessly transitions from an ultra-dense 84-byte binary TLV over LoRa, to JSON over HTTP, to Semtech-UDP for concentrators.
        </p>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">System Architecture</span>"""
          
    new_content, count = pattern.subn(replacement, content)
    if count > 0:
        write_file(path, new_content)
        print(f"Updated {path}")

def overhaul_edge_nodes():
    path = 'edge-nodes.html'
    if not os.path.exists(path): return
    content = read_file(path)
    
    # 1. Replace Power/Hardware Physics with LoRa Interop
    pattern1 = re.compile(r'<section class="section">\s*<div class="section-content">\s*<span class="section-kicker">Power Engineering</span>.*?<section class="section section-block" style="background: rgba\(0,0,0,0\.4\);">', re.DOTALL)
    
    replacement1 = """<section class="section">
            <div class="section-content">
              <span class="section-kicker">Hardware Reality</span>
              <h2>Cross-Family LoRa Interop.</h2>
              <p>Getting a true multi-hop mesh to work isn't about plugging in antennas; it's about making disparate silicon families talk to each other. The network bridges Semtech's SX1262 (T-Beam Supreme) and their newer LR1121 (T3-S3).</p>
              <p><strong>Execution:</strong> To achieve seamless interop, the firmware had to manually settle sync-word mismatches (enforcing the `0x34` public sync), explicitly declare bandwidth and spreading factor settings that libraries usually abstract away, and implement aggressive polling-based RX with full-chain IRQ mapping. This allowed concurrent sensing, relaying, and USB-forwarding across completely different chipset architectures.</p>
            </div>
          </section>

          <section class="section section-block" style="background: rgba(0,0,0,0.4);">"""
          
    content, c1 = pattern1.subn(replacement1, content)
    
    # 2. Fix Store and Forward wording (remove DTO v3.0)
    content = content.replace('the DTO v3.0 firmware implements', 'Phase 2 firmware implements')
    
    # 3. Delete OTA section
    pattern2 = re.compile(r'<section class="section">\s*<div class="section-content">\s*<span class="section-kicker">Deployment Operations</span>.*?<h2>Over-The-Air \(OTA\) Pipelines\.</h2>.*?</section>', re.DOTALL)
    content, c2 = pattern2.subn('', content)
    
    if c1 > 0 or c2 > 0:
        write_file(path, content)
        print(f"Updated {path}")

def update_gateway():
    path = 'gateway.html'
    if not os.path.exists(path): return
    content = read_file(path)
    
    # Inject LOC and routes
    content = content.replace(
        'The OMEGA Gateway is not a simple REST API; it is a high-performance, asynchronous edge router built on FastAPI',
        'The OMEGA Gateway is a massive <strong>~105,500 LOC Python</strong> backend exposing <strong>~390 FastAPI routes</strong>. It acts as the master ingestion point for the entire Delay Tolerant Network.'
    )
    
    # Inject SQLite WAL provenance
    content = content.replace(
        'A fleet of 50 edge nodes transmitting telemetry every 10 seconds generates a continuous, erratic, write-heavy load on the central gateway.',
        'A distributed mesh generates continuous, erratic, write-heavy load. The gateway utilizes a SQLite store specifically designed for mesh provenance (multi-gateway sightings, dedup on `(origin, sequence)`, idempotent ingest).'
    )
    
    write_file(path, content)
    print(f"Updated {path}")

def update_mission_portal():
    path = 'mission-portal.html'
    if not os.path.exists(path): return
    content = read_file(path)
    
    content = content.replace(
        'The OMEGA-wave Mission Portal has officially evolved from a flat 2D dashboard into a high-performance <strong>3D Digital Twin</strong>.',
        'The Mission Portal is a <strong>~52,500 LOC Vanilla JS</strong> workbench built for high-performance 3D visualization. It renders <strong>79 distinct layer profiles</strong> and <strong>10 animated 4D Copernicus fields</strong> over a shared design system.'
    )
    write_file(path, content)
    print(f"Updated {path}")

def update_security():
    path = 'security.html'
    if not os.path.exists(path): return
    content = read_file(path)
    
    # Delete the Elliptic Curve Cryptography section and replace with Ed25519
    pattern1 = re.compile(r'<section class="section section-block" style="background: rgba\(0,0,0,0\.4\);">\s*<span class="section-kicker">Mathematical Cryptography</span>.*?<h2>Elliptic Curve Cryptography \(ECC\)\.</h2>.*?</section>', re.DOTALL)
    
    replacement1 = """<section class="section section-block" style="background: rgba(0,0,0,0.4);">
            <span class="section-kicker">Mathematical Cryptography</span>
            <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Ed25519 Canonical Envelopes.</h2>
            <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
              To guarantee absolute data integrity from the physical ocean to the cloud, all telemetry is secured by <strong>Ed25519 signed envelopes</strong> over a float-free canonical form.
            </p>
            
            <div class="grid-2" style="margin-bottom: 2rem;">
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Float-Free Canonical Form</span>
                <h3 style="font-size: 1.2rem;">Deterministic Byte Parity</h3>
                <p style="font-size: 0.85rem;">Floating point math varies subtly between an ESP32 C++ microcontroller and a Python backend. To ensure signatures always match, the envelope uses strict integer parsing (epochs, microdegrees, millimeters). The payload is hashed, and the signed bytes are guaranteed to be byte-identical on both ends.</p>
              </div>
              <div class="panel" style="padding: 1.5rem;">
                <span class="status-label status-implemented">Adversarial Defense</span>
                <h3 style="font-size: 1.2rem;">8/8 Security Vectors</h3>
                <p style="font-size: 0.85rem;">The system was tested against 8 adversarial vectors. It enforces TOFU (Trust On First Use) key distribution with operator confirmation, anti-replay state validation, and three runtime enforcement modes (off / advisory / strict).</p>
              </div>
            </div>
          </section>"""
          
    content, c1 = pattern1.subn(replacement1, content)
    
    # Delete Physical Anti-Tamper Protocols
    pattern2 = re.compile(r'<section class="section">\s*<div class="section-content">\s*<span class="section-kicker">Asset Protection</span>.*?<h2>Physical Anti-Tamper Protocols\.</h2>.*?</section>', re.DOTALL)
    content, c2 = pattern2.subn('', content)
    
    if c1 > 0 or c2 > 0:
        write_file(path, content)
        print(f"Updated {path}")

def main():
    overhaul_overview()
    overhaul_edge_nodes()
    update_gateway()
    update_mission_portal()
    update_security()

if __name__ == '__main__':
    main()
