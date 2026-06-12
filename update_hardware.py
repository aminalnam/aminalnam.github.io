import os

html_file = r"c:\Users\jdcap\Documents\OMEGA-website\aminalnam.github.io\hardware.html"

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the Grid-2 with Grid-3 for the three boards.
old_grid = '''        <div class="grid-2" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">The Engineering Tradeoff</span>
            <h3 style="font-size: 1.2rem;">Time to Deployment</h3>
            <p style="font-size: 0.85rem;">Designing custom RF hardware for the 915 MHz band requires rigorous impedance
              matching, Vector Network Analyzer (VNA) tuning, and FCC certification testing. By utilizing pre-certified
              COTS boards like the LILYGO T-Beam Supreme, we bypass months of hardware iteration and immediately focus
              on the core value: the firmware and mesh protocol.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Platform Selection</span>
            <h3 style="font-size: 1.2rem;">The T-Beam Supreme</h3>
            <p style="font-size: 0.85rem;">The T-Beam Supreme, along with the T-Beam 1W and T3-S3 LR1121, were selected because it perfectly integrates our required
              triad into a single tested package: an ESP32-S3 microcontroller, a Semtech SX1262 LoRa transceiver, and a
              u-blox MAX-M10S GNSS module, all backed by an AXP2101 power management unit.</p>
          </div>
        </div>'''

new_grid = '''        <div class="grid-3" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Sensor Node</span>
            <h3 style="font-size: 1.2rem;">T-Beam Supreme</h3>
            <p style="font-size: 0.85rem;">The core data collection node. Integrates an ESP32-S3, an AXP2101 PMU, and a Semtech SX1262. During integration, we bypassed manufacturer specification errors to map the correct SX1261 pinmap (NSS 41, DIO1 40) directly.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Long Range Node</span>
            <h3 style="font-size: 1.2rem;">T-Beam 1W</h3>
            <p style="font-size: 0.85rem;">The high-power variant featuring an external HPA for +30 dBm EIRP. Firmware-level cooldown algorithms run the cooling fan after transmissions to dissipate residual heat. Its upside-down OLED requires custom rotation logic.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Mesh Relay</span>
            <h3 style="font-size: 1.2rem;">T3-S3 LR1121</h3>
            <p style="font-size: 0.85rem;">A sensor-less mesh router capable of communicating simultaneously across Sub-GHz and 2.4 GHz LoRa bands, crucial for establishing high-bandwidth bulk-transfer handshakes across disparate networks.</p>
          </div>
        </div>'''

content = content.replace(old_grid, new_grid)

# 2. Insert Cross-Family Mesh Interoperability after the COTS section.
cots_end = '''      </section>

      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">'''

cross_family = '''      </section>

      <section class="section">
        <div class="section-content">
          <span class="section-kicker">RF Physics & Networking</span>
          <h2>Cross-Family Mesh Interoperability.</h2>
          <p>Getting the Semtech SX126x (Supreme/1W) and LR11x0 (T3-S3) chip families to communicate over a LoRa mesh presents massive engineering challenges. Despite matching bandwidth, spreading factors, coding rates, and preambles across both architectures, the LR1121 would consistently drop packets from the Supreme, throwing hardware-level <code>HEADER_ERR</code> interrupts.</p>
          <p>The root cause was isolated to <strong>Sync-Word Encoding Asymmetry</strong>. The SX126x's standard "PRIVATE" <code>0x12</code> sync word is encoded asymmetrically on the physical layer (resulting in over-air bytes <code>[0x14, 0x24]</code>). The LR1121's hardware demodulator attempts to read this as a single byte and fails to validate the header.</p>
          <p><strong>The Solution:</strong> The OMEGA firmware standardizes the entire mesh federation on the LoRaWAN "PUBLIC" <code>0x34</code> sync word. Because both the SX126x and LR11x0 families encode this public sync word identically on the physical layer, cross-chip packet drops are completely eliminated, allowing heterogeneous fleets of edge nodes to relay packets flawlessly.</p>
        </div>
      </section>

      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">'''

content = content.replace(cots_end, cross_family)


# 3. Insert Predictive Batching under Embedded C++
embedded_c_end = '''          <p><strong>Thermodynamics:</strong> A remote sensor floating in the Pacific cannot plug into a wall outlet.
            The ESP32-S3 draws roughly 100mA while active, draining a standard 18650 lithium battery in two days. By
            forcing the hardware into the ULP (Ultra Low Power) sleep state, the draw drops to 15µA.</p>
        </div>'''

predictive_batching = embedded_c_end + '''
        
        <div class="section-content" style="margin-top: 3rem;">
          <span class="section-kicker">Advanced Encoding</span>
          <h2>Lossless Predictive Batching.</h2>
          <p>Transmitting every single temperature sample individually across a low-bandwidth LoRa link introduces massive overhead from packet headers, leading to duty-cycle violations. The OMEGA firmware employs <strong>Phase 1 Predictive Batching</strong> to completely eliminate this overhead.</p>
          <p>The edge node samples its BME280 sensor every 3 seconds into a fast internal ring buffer. Once 10 readings are collected, it encodes them using first-order predictive coding: it transmits the very first reading as a full 32-bit integer, and subsequent readings as tightly packed 4-bit or 8-bit residuals (the delta from the previous reading). This mathematically guarantees a <strong>lossless reconstruction</strong> of the original high-frequency data array while drastically crushing the packet size.</p>
        </div>'''

content = content.replace(embedded_c_end, predictive_batching)


# 4. Insert Hardware Quirks Compendium at the end
quirks_section = '''      <section class="section section-block" style="background: rgba(0,0,0,0.4); margin-top: 2rem;">
        <span class="section-kicker">Bare-Metal Realities</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 1rem;">Hardware Quirks Compendium.</h2>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
          Working close to the metal inevitably exposes manufacturing anomalies, physical tolerance limits, and undocumented chip behavior. OMEGA's firmware handles these extreme edge cases automatically.</p>
          
        <div class="grid-3" style="margin-bottom: 2rem;">
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Voltage Fallback</span>
            <h3 style="font-size: 1.2rem;">TCXO Initialization</h3>
            <p style="font-size: 0.85rem;">While standard RadioLib drivers default to a 1.6V TCXO logic level, the Supreme boards require exactly 1.8V to initialize the SX1262 oscillator. The firmware implements an automatic fallback cascade (1.8V &rarr; 1.6V &rarr; XTAL) to prevent fatal radio panics.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Bootloader Limits</span>
            <h3 style="font-size: 1.2rem;">4MB vs 8MB Partitioning</h3>
            <p style="font-size: 0.85rem;">The T-Beam 1W hardware ships with only 4MB of flash memory, whereas its binary header mistakenly defaults to 8MB. This mismatch triggers an infinite boot-loop. Custom PlatformIO partition rules (<code>default.csv</code>) explicitly clamp the addressing logic to 4MB.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">HPA Clamping</span>
            <h3 style="font-size: 1.2rem;">Amplifier Protection</h3>
            <p style="font-size: 0.85rem;">The SX1262 can only internally generate +22 dBm. If a user queries for +30 dBm, the chip will throw an initialization error. The firmware dynamically clamps requests to +22 dBm inside the SX1262, allowing the 1W's external High Power Amplifier (HPA) to cleanly boost the signal over the horizon.</p>
          </div>
        </div>
      </section>'''

end_tag = '''    </div>
  </main>'''

content = content.replace(end_tag, quirks_section + '\n\n' + end_tag)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated hardware.html successfully.")
