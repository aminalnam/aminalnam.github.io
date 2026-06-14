import re

def rebuild():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Inject Mission Statement, Architecture, and Engineering Feats before the "Platform Capabilities"
    capabilities_marker = '<section class="section section-block" style="background: rgba(0,0,0,0.4); padding-bottom: 2rem;">'
    cap_idx = html.find(capabilities_marker)
    
    if cap_idx == -1:
        print("Could not find capabilities marker")
        return

    pitch_html = """
      <!-- MISSION & PITCH -->
      <section class="section section-block" style="padding-top: 0; padding-bottom: 2rem;">
        <span class="section-kicker">Mission Statement</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.8rem; margin: 0 0 1.5rem; letter-spacing: -0.02em;">Connectivity where cellular networks fail.</h2>
        <p style="color: var(--ink-soft); font-size: 1.25rem; margin-bottom: 2.5rem; max-width: 850px; line-height: 1.7;">
          The ocean is a disconnected, hostile environment. Standard IoT paradigms rely on persistent MQTT or HTTP connections, which do not exist offshore. 
          OMEGA bridges the gap by deploying an ultra-low-power, <strong>Delay Tolerant Network (DTN)</strong> that links deep-sea acoustic sensors and drifting buoys directly to a shore-based Python gateway using +22dBm LoRa RF links.
        </p>
        
        <div class="grid-3" style="margin-bottom: 4rem;">
          <div class="panel" style="padding: 2rem;">
            <span class="status-label status-implemented">Deep Sleep</span>
            <h3 style="font-size: 1.4rem;">15µA Thermodynamics</h3>
            <p style="font-size: 0.95rem;">Edge nodes mathematically budget incoming solar joules, physically cutting power rails to drop into 15µA deep-sleep cycles to survive 14-hour winter nights.</p>
          </div>
          <div class="panel" style="padding: 2rem;">
            <span class="status-label status-implemented">DTN Mesh</span>
            <h3 style="font-size: 1.4rem;">Binary TLV Compression</h3>
            <p style="font-size: 0.95rem;">JSON is too heavy for the ocean. OMEGA crushes 283B payloads into highly dense 84B Custom Binary TLV frames, vastly increasing network throughput.</p>
          </div>
          <div class="panel" style="padding: 2rem;">
            <span class="status-label status-implemented">Security</span>
            <h3 style="font-size: 1.4rem;">Cryptographic Logging</h3>
            <p style="font-size: 0.95rem;">Marine networks operate in untrusted environments. A strict Role-Based Access Control (RBAC) loop enforces immutable cryptographic audit trails for every physical command.</p>
          </div>
        </div>

        <span class="section-kicker">System Architecture</span>
        <h3 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0 0 2rem;">The 4-Layer Stack.</h3>
        
        <div class="section-visual" style="margin-bottom: 2rem;">
          <div class="mermaid">
            flowchart TD
                subgraph L1 [Layer 1: Physical / Hardware]
                    E1(Buoy: T-Beam Supreme)
                    E2(Relay: LR1121)
                end
                subgraph L2 [Layer 2: Mesh Transport]
                    DTN{DTN: Binary TLV + Batching}
                end
                subgraph L3 [Layer 3: Gateway]
                    USB(USB-CDC Serial Bridge)
                    ASGI[FastAPI / SQLite WAL]
                end
                subgraph L4 [Layer 4: Presentation]
                    UI((React WebGL Portal))
                end

                E1 <-->|LoRa 900MHz| L2
                E2 <-->|LoRa 900MHz| L2
                L2 <-->|LoRa / CSMA-CA| USB
                USB <-->|JSON Stream| ASGI
                ASGI <-->|HTTP Long-Polling| UI

                classDef default fill:#0a0f1d,stroke:#9aa2b1,stroke-width:1px,color:#9aa2b1;
                classDef node fill:#101529,stroke:#3b82f6,stroke-width:2px,color:#fff;
                class E1,E2,USB,ASGI,UI node;
          </div>
        </div>
      </section>
"""

    # 2. Inject Tech Stack Footer before the final footer
    footer_marker = '<footer class="footer wrap">'
    footer_idx = html.find(footer_marker)
    
    if footer_idx == -1:
        print("Could not find footer marker")
        return

    tech_stack_html = """
      <!-- TECH STACK -->
      <section class="section section-block" style="border-top: 1px solid var(--line); padding-top: 4rem; padding-bottom: 2rem; margin-top: 2rem;">
        <span class="section-kicker">Built With</span>
        <h3 style="font-family: var(--font-mono); font-size: 1.2rem; margin: 0 0 1.5rem; text-transform: uppercase; letter-spacing: 0.15em;">Raw Technologies</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">Python 3.12+</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">FastAPI & ASGI</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">Embedded C++</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">PlatformIO</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">SQLite (WAL Mode)</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">React & WebGL</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">LoRa CSS Modulation</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">Binary TLV</span>
          <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--line); padding: 0.5rem 1rem; border-radius: 99px; font-family: var(--font-mono); font-size: 0.85rem;">IETF SenML</span>
        </div>
      </section>
"""

    html = html[:cap_idx] + pitch_html + html[cap_idx:footer_idx] + tech_stack_html + html[footer_idx:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    print("Successfully injected Pitch and Tech Stack into index.html")

if __name__ == '__main__':
    rebuild()
