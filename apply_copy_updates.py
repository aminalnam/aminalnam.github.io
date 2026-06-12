import glob
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
            print(f"No changes in {filename}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

# index.html updates
update_file('index.html', [
    ('Delay Tolerant Network (DTN) overlay using Custom Binary TLV compression.', 
     'Delay Tolerant Network (DTN) overlay using Custom 4-Phase Binary TLV compression (70% denser) and bidirectional LoRa commands.')
])

# mesh-core.html updates
update_file('mesh-core.html', [
    # Replace JSON-over-LoRa descriptions if any, and add 4-phase details
    ('JSON-over-LoRa', 'Binary TLV protocol'),
    ('JSON payloads', 'Binary TLV payloads'),
    (re.compile(r'<h2>Custom LoRa Mesh Protocol\.</h2>\s*<p>.*?</p>', re.DOTALL),
     '''<h2>Custom Binary LoRa Mesh Protocol.</h2>
          <p>The mesh network now operates on a dense, custom Binary TLV protocol providing a massive 70% space savings over legacy JSON-over-LoRa. The architecture includes a 4-Phase Advanced Encoding strategy: Phase 1 (Lossless predictive coding & multi-sample batching), Phase 2 (Remote channel re-tuning), Phase 3 (Derived namespaces, statistical feature bags & FFT bins), and Phase 4 (OTA TFLite model loading for edge AI).</p>
          <p>Additionally, the mesh supports bidirectional commands allowing the gateway to re-tune nodes, request telemetry, and send commands over LoRa via USB-CDC.</p>'''),
    ('OMEGA-wave mesh', 'OMEGA mesh'),
    ('OMEGA-wave network', 'OMEGA network')
])

# hardware.html updates
update_file('hardware.html', [
    ('pre-certified COTS boards like the LILYGO T-Beam Supreme', 
     'pre-certified COTS boards like the LILYGO T-Beam Supreme, T-Beam 1W, and the T3-S3 LR1121 (for 2.4GHz and Sub-GHz relays)'),
    ('The T-Beam Supreme was selected', 'The T-Beam Supreme, along with the T-Beam 1W and T3-S3 LR1121, were selected'),
    (re.compile(r'<li><strong>GPS Rendering:.*?</li>', re.DOTALL),
     '<li><strong>GPS Rendering:</strong> Latitude and longitude coordinates are painted to the display the moment the u-blox GNSS module acquires a hot fix. Hardware variants like the T-Beam 1W and LR1121 are also natively supported with specific flash configurations.</li>')
])

# edge-nodes.html updates
update_file('edge-nodes.html', [
    ('T-Beam Supreme Architecture.', 'T-Beam Supreme, 1W, & LR1121 Architecture.'),
    ('LILYGO T-Beam Supreme', 'LILYGO T-Beam Supreme, 1W, and T3-S3 LR1121'),
    ('OMEGA-wave nodes', 'OMEGA nodes')
])

# gateway.html updates
update_file('gateway.html', [
    (re.compile(r'<h2>Python FastAPI Edge Router\.</h2>\s*<p>.*?</p>', re.DOTALL),
     '''<h2>Python FastAPI Edge Router.</h2>
          <p>The gateway is a resilient Python-based edge router that manages HTTP ingest, SQLite WAL normalization, and FastAPI routing. It utilizes the new <code>mesh_command.py</code> CLI for sending bidirectional commands (such as remote channel re-tuning and model loading) over USB-CDC to the tethered firmware.</p>'''),
    ('OMEGA-wave Gateway', 'OMEGA Gateway')
])

# mission-portal.html updates
update_file('mission-portal.html', [
    (re.compile(r'<p><strong>Feature Stack:</strong>.*?</p>', re.DOTALL),
     '''<p><strong>Feature Stack:</strong> Beyond raw telemetry polling, the portal implements color-by-metric station symbols, dynamic map zoom enhancements (up to zoom 19 for street-level precision), track overlays for moving assets, and interpolated bathymetry surfaces. It also includes an intelligent 180-second freshness threshold specifically for mesh nodes to accurately report live device states.</p>''')
])

# overview.html updates
update_file('overview.html', [
    ('JSON-over-LoRa', 'Binary TLV protocol'),
    ('OMEGA-wave mesh', 'OMEGA mesh'),
    (re.compile(r'<p>\s*A globally distributed, ultra-low-power environmental sensing network.*?</p>', re.DOTALL),
     '''<p>A globally distributed, ultra-low-power environmental sensing network. Built from scratch with custom IoT hardware (including T-Beam Supreme, 1W, and LR1121), bidirectional resilient mesh networking, high-frequency edge analytics (FFT and OTA ML), and a custom 70%-denser Binary TLV protocol. OMEGA democratizes oceanographic telemetry.</p>''')
])

# Global replacements across all html files for OMEGA vs OMEGA-wave
all_htmls = glob.glob('*.html')
for html in all_htmls:
    update_file(html, [
        ('OMEGA-wave hardware', 'OMEGA hardware'),
        ('OMEGA-wave sensor', 'OMEGA sensor'),
        ('OMEGA-wave node', 'OMEGA node'),
        ('OMEGA-wave fleet', 'OMEGA fleet')
    ])
