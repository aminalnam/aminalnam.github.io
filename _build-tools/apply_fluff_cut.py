import os
import glob
import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def create_engineering_journal():
    if not os.path.exists('software-decisions.html'):
        return
    content = read_file('software-decisions.html')
    
    # Replace title and hero
    content = content.replace('<title>Jonathan Capone — Software Architecture</title>', '<title>Jonathan Capone — Debugging & Journal</title>')
    content = content.replace('<h1>Software Architecture</h1>', '<h1>Debugging & War Stories</h1>')
    content = content.replace('<p>Understanding why OMEGA is built with Python, SQLite, and React, and the hard constraints that forced these choices.</p>', '<p>The real engineering isn\'t in the features—it\'s in how the bugs were found and killed.</p>')
    
    # Replace the main content inner
    main_start = '<div class="main-inner">'
    main_end = '</div>\n  </main>'
    
    idx_start = content.find(main_start) + len(main_start)
    idx_end = content.find(main_end)
    
    journal_html = """
      <section class="section section-block" style="background: rgba(0,0,0,0.4);">
        <span class="section-kicker">Embedded Systems</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">1. The "Transmits but never receives" LR1121 Bug</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">A T3-S3 LR1121 relay transmitted perfectly but never received anything. Every sign pointed at dead hardware.</p>
        <div class="panel" style="padding: 1.5rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.2rem;">The Investigation & Fix</h3>
          <p style="font-size: 0.95rem; line-height: 1.6;">I mapped the <strong>entire RX chain interrupts</strong> instead of just <code>RX_DONE</code>. Zero partial detections meant the state machine never engaged. Root cause: RadioLib's <code>startReceive()</code> only arms continuous RX cleanly from <code>STANDBY</code>. Post-boot, it silently failed to arm. I fixed it with a single line: <code>radio.standby()</code> before the boot-time arm. <strong>Lesson: Map the whole signal chain, not just the success interrupt.</strong></p>
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">C++ Undefined Behavior</span>
          <h2>2. SX1302 `-1` GPIO Sentinel.</h2>
          <p>SPI reads worked but writes to the SX1302 front-end were ignored. Tracing the reset path into the ESP32 port revealed that the reset mask was computed using a `-1` sentinel for an unconnected pin.</p>
          <p><strong>The Fix:</strong> <code>(1 << -1)</code> is undefined behavior in C. The corrupted mask meant the radio was never actually reset. I added explicit guards before shifting the mask. The board became production-ready.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Full-Stack Networking</span>
          <h2>3. HTTP/1.1 Socket Starvation.</h2>
          <p>Over the field Pi, the portal hung with an empty map—yet `curl` answered the endpoints in under 0.1s.</p>
          <p><strong>The Fix:</strong> DevTools showed exactly 6 ESTABLISHED sockets. HTTP/1.1 browsers cap at 6 connections per host, and I had wired two permanent Server-Sent-Events streams onto every page, eating the entire pool. I made the data-stream SSE <strong>lazy</strong>, opening it only when needed.</p>
        </div>
      </section>
      
      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Spatial Algorithms</span>
          <h2>4. The Fiji → Hawaii Dateline Bug.</h2>
          <p>The global A* ocean router sent a 2,700-nm Pacific crossing 13,000 nm around the world.</p>
          <p><strong>The Fix:</strong> The cost landscape was a single -180 to +180 grid that clipped at the boundary. I solved it by searching a <strong>wrapped longitude space</strong>—replicating water cells at L ± 360° so the geodesically short path across the dateline became reachable.</p>
        </div>
      </section>
      
      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Performance</span>
          <h2>5. The GZip Compression Storm.</h2>
          <p>Cold loads took 6.4 seconds because <code>GZipMiddleware</code> recompressed multi-MB static bundles on the event loop for every request.</p>
          <p><strong>The Fix:</strong> I pre-compressed <code>*.gz</code> siblings once at startup and served them directly. Cold-boot DOMContentLoaded dropped from 6,400 ms to <strong>516 ms</strong>.</p>
        </div>
      </section>
"""
    
    new_content = content[:idx_start] + journal_html + content[idx_end:]
    write_file('engineering-journal.html', new_content)
    print("Created engineering-journal.html")

def update_global_nav():
    html_files = glob.glob('*.html') + glob.glob('*/*.html')
    for path in html_files:
        content = read_file(path)
        nav_target = '<a href="software-decisions.html">Software Architecture</a>'
        nav_current = '<a href="software-decisions.html" class="is-current">Software Architecture</a>'
        
        replacement = '<a href="engineering-journal.html">Debugging & Journal</a>'
        
        if replacement not in content:
            if nav_target in content:
                content = content.replace(nav_target, nav_target + f'\n            {replacement}')
            elif nav_current in content:
                content = content.replace(nav_current, nav_current + f'\n            {replacement}')
            
            write_file(path, content)

def cut_index_fluff():
    path = 'index.html'
    if not os.path.exists(path): return
    content = read_file(path)
    
    # Replace fluff string
    fluff = "A globally distributed, ultra-low-power environmental sensing network. Built from scratch with custom IoT hardware, resilient mesh networking, and high-frequency edge analytics. OMEGA democratizes oceanographic telemetry."
    reality = "A multi-operator mesh network for marine sensing: ESP32/LoRa sensor firmware → a Python/FastAPI gateway → a web portal, tied together by a versioned, signed observation protocol."
    content = content.replace(fluff, reality)
    
    # Add bento link to journal
    target = '<!-- Gateway -->'
    bento = """<!-- Journal -->
          <a href="engineering-journal.html" class="panel row-span-2" style="border: 1px solid var(--accent); background: rgba(59, 130, 246, 0.05);">
            <div class="bento-content">
              <span class="status-label status-implemented" style="background: rgba(59, 130, 246, 0.2); color: var(--accent);">Engineering Deep-Dives</span>
              <h3 style="font-size: 1.8rem; color: #fff;">Debugging & Journal</h3>
              <p>Read the actual post-mortems: from C++ undefined behavior bit-shifts to HTTP/1.1 socket starvation.</p>
            </div>
          </a>
          
          """
    if "Debugging & Journal" not in content and target in content:
        content = content.replace(target, bento + target)
        
    write_file(path, content)
    print("Updated index fluff")

def inject_mesh_core():
    path = 'mesh-core.html'
    if not os.path.exists(path): return
    content = read_file(path)
    inject = """
          <div class="panel" style="margin-top: 2rem; border-left: 4px solid var(--accent);">
            <h4 style="margin: 0 0 0.5rem; color: #fff;">Engineering Reality: The LR1121 RX Bug</h4>
            <p style="font-size: 0.9rem; color: var(--ink-soft); margin: 0;">During bring-up, the LR1121 transmitted but never received. By mapping the entire RX interrupt chain instead of just <code>RX_DONE</code>, I proved the demodulator state-machine never armed due to a RadioLib timing edge, fixing a seemingly dead board with a single <code>radio.standby()</code> call. <a href="engineering-journal.html" style="color: var(--accent);">Read the full journal &rarr;</a></p>
          </div>"""
    if "Engineering Reality: The LR1121" not in content:
        content = content.replace('<!-- Phase 2: Binary TLV Compression -->', inject + '\n\n          <!-- Phase 2: Binary TLV Compression -->')
        write_file(path, content)

def inject_gateway():
    path = 'gateway.html'
    if not os.path.exists(path): return
    content = read_file(path)
    inject = """
          <div class="panel" style="margin-top: 2rem; border-left: 4px solid var(--accent);">
            <h4 style="margin: 0 0 0.5rem; color: #fff;">Engineering Reality: HTTP/1.1 Socket Starvation</h4>
            <p style="font-size: 0.9rem; color: var(--ink-soft); margin: 0;">The portal initially hung over field connections. Debugging DevTools revealed exactly 6 ESTABLISHED sockets—HTTP/1.1's limit—eaten entirely by dual permanent Server-Sent-Events streams. Fixing it required lazy-loading the SSE streams to unblock the map fetches. <a href="engineering-journal.html" style="color: var(--accent);">Read the full journal &rarr;</a></p>
          </div>"""
    if "Engineering Reality: HTTP/1.1" not in content:
        content = content.replace('<section class="section section-block" style="background: rgba(0,0,0,0.4);">', inject + '\n\n      <section class="section section-block" style="background: rgba(0,0,0,0.4);">', 1)
        write_file(path, content)

def inject_hardware():
    path = 'hardware.html'
    if not os.path.exists(path): return
    content = read_file(path)
    inject = """
          <div class="panel" style="margin-top: 2rem; border-left: 4px solid var(--accent);">
            <h4 style="margin: 0 0 0.5rem; color: #fff;">Engineering Reality: The SX1302 <code>-1</code> Sentinel Bug</h4>
            <p style="font-size: 0.9rem; color: var(--ink-soft); margin: 0;">During SX1302 concentrator bring-up, SPI reads worked but writes failed silently. Tracing the reset path in C revealed an undefined behavior bit-shift: <code>(1 << -1)</code> caused by an unconnected GPIO sentinel. <a href="engineering-journal.html" style="color: var(--accent);">Read the full journal &rarr;</a></p>
          </div>"""
    if "Engineering Reality: The SX1302" not in content:
        content = content.replace('<!-- The LoRa Radios -->', inject + '\n\n          <!-- The LoRa Radios -->')
        write_file(path, content)

def inject_mission_portal():
    path = 'mission-portal.html'
    if not os.path.exists(path): return
    content = read_file(path)
    inject = """
          <div class="panel" style="margin-top: 2rem; border-left: 4px solid var(--accent);">
            <h4 style="margin: 0 0 0.5rem; color: #fff;">Engineering Reality: The Fiji &rarr; Hawaii Dateline Bug</h4>
            <p style="font-size: 0.9rem; color: var(--ink-soft); margin: 0;">The global A* ocean router originally routed a 2,700-nm Pacific crossing 13,000 nm around the world. The fix required extending the cost landscape to a wrapped longitude space (replicating cells at L ± 360°) so the geodesically short path across the antimeridian became reachable. <a href="engineering-journal.html" style="color: var(--accent);">Read the full journal &rarr;</a></p>
          </div>"""
    if "Engineering Reality: The Fiji" not in content:
        content = content.replace('<section class="section">', inject + '\n\n          <section class="section">', 1)
        write_file(path, content)

def main():
    create_engineering_journal()
    update_global_nav()
    cut_index_fluff()
    inject_mesh_core()
    inject_gateway()
    inject_hardware()
    inject_mission_portal()
    print("All fluff cut and reality injected.")

if __name__ == '__main__':
    main()
