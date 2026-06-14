import re

path = "C:/Users/jdcap/Documents/OMEGA-website/aminalnam.github.io/hardware.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Pattern for the second occurrence (lines 565-594 approx)
second_occurrence_pattern = r'<section class="section section-block" style="background: rgba\(0,0,0,0\.4\);">\s*<span class="section-kicker">Electromagnetics</span>\s*<h2 style="font-family: var\(--font-serif\); font-size: 2\.5rem; margin: 0 0 1rem;">Saltwater Fresnel Zones\.</h2>\s*<p.*?</div>\s*</div>\s*</section>'

# Replace the second occurrence with empty string
html = re.sub(second_occurrence_pattern, '', html, flags=re.DOTALL)

# Now, enhance the first occurrence
# We will just insert the "15-kilometer range" into the first paragraph, and add the missing panels.
first_intro_pattern = r'(<h2 style="font-family: var\(--font-serif\); font-size: 2\.5rem; margin: 0 0 1rem;">Saltwater Fresnel Zones\.</h2>\s*<p[^>]*>)(.*?)(</p>)'

def replace_intro(m):
    original_text = m.group(2)
    new_text = "LoRa specifies a 15-kilometer range, but that assumes a clear Line-of-Sight (LoS) through air. " + original_text
    return m.group(1) + new_text + m.group(3)

html = re.sub(first_intro_pattern, replace_intro, html, count=1)

# Now, add the 3 panels from the second occurrence into the first occurrence's grid.
# The first occurrence grid ends with:
#             <p style="font-size: 0.85rem;">Radio waves do not travel in a perfectly straight line; they bounce off the conductive saltwater. When these reflected ghost signals hit the receiving antenna out-of-phase with the direct signal, they destructively interfere, driving the Signal-to-Noise Ratio (SNR) below the noise floor.</p>
#           </div>
#         </div>

extra_panels = """
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">Fresnel Clearance</span>
            <h3 style="font-size: 1.2rem;">Physical Blocking</h3>
            <p style="font-size: 0.85rem;">The Fresnel Zone is the 3D elliptical area between two antennas. When a 6-foot wave rolls between two buoys, it physically blocks the Fresnel zone, temporarily breaking the LoS.</p>
          </div>
          <div class="panel" style="padding: 1.5rem;">
            <span class="status-label status-implemented">DTN Solution</span>
            <h3 style="font-size: 1.2rem;">Buffered Retries</h3>
            <p style="font-size: 0.85rem;">Because the RF link drops every few seconds due to rolling waves, OMEGA doesn't rely on continuous streams. It buffers data into SQLite and blasts it during the 3-second window when the buoy crests a wave.</p>
          </div>
"""

# inject before the closing div of the grid
grid_end_pattern = r'(<h3 style="font-size: 1\.2rem;">Multi-path Fading</h3>.*?</div>)(\s*</div>\s*</section>)'

html = re.sub(grid_end_pattern, r'\1' + extra_panels + r'\2', html, flags=re.DOTALL)

# Fix JANUS frequency prose
janus_pattern = r'audio chirps at exactly 11\.5 kHz\.'
html = re.sub(janus_pattern, r'audio chirps centered at 11.5 kHz.', html)

with open(path, "w", encoding="utf-8") as f:
    f.write(html)

print("Merged Saltwater Fresnel Zones and fixed JANUS frequency.")
