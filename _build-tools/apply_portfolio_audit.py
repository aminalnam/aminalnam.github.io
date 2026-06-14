import os
import re
import glob

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def update_index():
    path = 'index.html'
    if not os.path.exists(path):
        return
    content = read_file(path)
    
    # 1. Add scale metrics below hero
    if 'A technical portfolio showcasing massive-scale systems engineering' in content and '762 commits' not in content:
        scale_html = '''
      <div class="fade-up" style="animation-delay: 0.4s; display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; justify-content: center;">
        <div style="text-align: center;"><div style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff;">~3</div><div style="font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em;">Weeks Build</div></div>
        <div style="text-align: center; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 1rem;"><div style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff;">~157k</div><div style="font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em;">Lines of Code</div></div>
        <div style="text-align: center; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 1rem;"><div style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff;">762</div><div style="font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em;">Commits</div></div>
        <div style="text-align: center; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 1rem;"><div style="font-family: var(--font-serif); font-size: 1.5rem; color: #fff;">14</div><div style="font-size: 0.7rem; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em;">Hardware Targets</div></div>
      </div>
'''
        content = content.replace('</div>\n  </section>', scale_html + '    </div>\n  </section>', 1)
        
    # 2. Replace BETA Framework with Readiness Audit
    beta_section_start = '<!-- New BETA Framework Section -->'
    next_section_start = '<section class="section section-block fade-up" style="padding-top: 2rem;">'
    
    if beta_section_start in content and next_section_start in content:
        start_idx = content.find(beta_section_start)
        end_idx = content.find(next_section_start)
        
        readiness_html = '''<!-- Readiness & Evaluation Section -->
      <section class="section section-block fade-up" style="margin-top: 4rem; padding-bottom: 2rem;">
        <span class="section-kicker" style="color: var(--accent-ocean);">Project 2</span>
        <h2 class="scramble-text" style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 2rem;">Honest Evaluation & Readiness.</h2>

        <div class="bento-grid">

          <a href="simulation.html" class="panel bento-item beta-panel-hover glitch-hover" style="grid-column: 1 / -1;">
            <div class="bento-icon">🔬</div>
            <h3 class="bento-title">Absolute Data Purity</h3>
            <p class="bento-desc">The live map shows only real, deployed hardware. Synthetic data and forecasts are treated as overlays, never ground-truth. The simulation engine strictly purges fabricated rows to protect scientific integrity.</p>
          </a>

          <a href="simulation.html" class="panel bento-item beta-panel-hover glitch-hover" style="grid-column: 1 / -1;">
            <div class="bento-icon">⚙️</div>
            <h3 class="bento-title">Zero-Install Smoke Gate</h3>
            <p class="bento-desc">A relentless evaluation engine that spins up a throwaway SQLite database in `/tmp`, continuously generating highly complex synthetic payload injections to stress-test the OMEGA core without polluting production.</p>
          </a>

          <div class="panel bento-item beta-panel-hover glitch-hover" style="grid-column: 1 / -1;">
            <div class="bento-icon">📋</div>
            <h3 class="bento-title">13-Agent Readiness Audit (63/100)</h3>
            <p class="bento-desc">Instead of marketing "100% complete", we built a 13-agent AI committee to aggressively review the deployment logs against adversarial vectors. It scored the hardware-agnostic stack an honest 63/100, dictating the remaining firmware blockers.</p>
          </div>

        </div>
      </section>

      '''
        content = content[:start_idx] + readiness_html + content[end_idx:]
        
    # 3. Update the OMEGA BETA Analytics bento item in the first grid
    content = content.replace(
        '<h3 class="bento-title">OMEGA BETA Analytics</h3>\n            <p class="bento-desc">Live dashboard proving OMEGA\'s resilience. The BETA framework bombarding the OMEGA gateway with synthetic telemetry.</p>',
        '<h3 class="bento-title">Engineering Honesty</h3>\n            <p class="bento-desc">A deep-dive into the 13-agent readiness audit and the rigorous "Zero-Install Smoke Gate" CI/CD evaluation framework.</p>'
    )
    content = content.replace('href="omega-beta.html" class="panel bento-item"\n            style="grid-column: 1 / -1; border: 1px solid var(--accent-ocean); background: rgba(59, 130, 246, 0.05);"',
                              'href="simulation.html" class="panel bento-item"\n            style="grid-column: 1 / -1; border: 1px solid var(--accent-ocean); background: rgba(59, 130, 246, 0.05);"')
    
    write_file(path, content)
    print("Updated index.html")

def update_copilot():
    path = 'copilot.html'
    if not os.path.exists(path):
        return
    content = read_file(path)
    
    content = content.replace('The 46-Tool Action Registry', 'The ~100-Tool Action Registry')
    content = content.replace('240KB Python tool registry', 'massive ~100-tool action registry')
    content = content.replace('46 different functions', '~100 different tools')
    content = content.replace('46-tool registry', '~100-tool registry')
    content = content.replace('46-Tool Action Registry', '~100-Tool Action Registry')
    
    write_file(path, content)
    print("Updated copilot.html")

def update_simulation():
    path = 'simulation.html'
    if not os.path.exists(path):
        return
    content = read_file(path)
    
    purity_text = '<p><strong>Absolute Data Purity:</strong> Modeled data is context, never ground truth. Every simulation writes to a temporary database or strictly purges its fabricated rows before commit. Simulated data is NEVER rendered on the live map. An ocean instrument that conflates a forecast with a physical measurement is worse than useless.</p>'
    
    if purity_text not in content:
        content = content.replace(
            '<p><strong>Procedural Generation:</strong> The Python engine dynamically seeds',
            purity_text + '\n              <p><strong>Procedural Generation:</strong> The Python engine dynamically seeds'
        )
        
    # Also fix the text "The simulator logically injects these physical chips into the cloud matrix"
    content = content.replace(
        'The simulator logically injects these physical chips into the cloud matrix.',
        'The simulator logically injects these physical chips into the isolated test matrix (never production).'
    )
    
    write_file(path, content)
    print("Updated simulation.html")

def update_data_providers():
    path = 'data-providers.html'
    if not os.path.exists(path):
        return
    content = read_file(path)
    
    if '<p>External APIs, NOAA, and Copernicus fusion.</p>' in content:
        content = content.replace(
            '<p>External APIs, NOAA, and Copernicus fusion.</p>',
            '<p>A global federation of ~55 external data providers integrated into the gateway\'s ~390 HTTP endpoints.</p>'
        )
    
    write_file(path, content)
    print("Updated data-providers.html")

def remove_beta_nav():
    # Regex to match the BETA Project Group in the nav
    beta_regex = re.compile(r'<!--\s*BETA Project Group\s*-->\s*<div[^>]*>\s*<span[^>]*>Project</span>\s*<a href="beta-overview\.html"[^>]*>BETA</a>\s*<a href="omega-beta\.html"[^>]*>Live Dashboard</a>\s*</div>', re.MULTILINE)
    
    html_files = glob.glob('*.html') + glob.glob('*/*.html')
    for path in html_files:
        content = read_file(path)
        new_content, count = beta_regex.subn('<!-- BETA Nav Group Removed (Honest Portfolio) -->', content)
        if count > 0:
            write_file(path, new_content)
            print(f"Removed BETA nav from {path}")

def main():
    update_index()
    update_copilot()
    update_simulation()
    update_data_providers()
    remove_beta_nav()
    print("All updates complete.")

if __name__ == '__main__':
    main()
