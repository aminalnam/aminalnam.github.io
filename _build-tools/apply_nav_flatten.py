import os
import re
import glob

NEW_NAV = """      <nav class="nav" aria-label="Main Navigation">
        <a href="index.html">Home</a>
        <div class="dropdown">
          <button class="dropbtn" style="background: none; border: none; color: #fff; font-family: inherit; font-size: inherit; cursor: pointer;">OMEGA &#9662;</button>
          <div class="dropdown-content">
            <a href="architecture.html">Architecture</a>
            <a href="hardware.html">Hardware & Mesh</a>
            <a href="gateway.html">Backend Gateway</a>
            <a href="mission-portal.html">Mission Portal</a>
          </div>
        </div>
        <a href="bathymetry.html">OMEGA-Alpha</a>
        <a href="beta-overview.html">BETA</a>
        <a href="cosnfx.html">CosNFX</a>
        <a href="weather-globe.html">Weather Globe</a>
        <a href="visual-timer.html">Visual Timer</a>
        <a href="engineering-journal.html">Journal</a>
        
        <div style="display: flex; align-items: center; margin-left: 0.5rem; border-left: 1px solid rgba(255,255,255,0.15); padding-left: 1.5rem;">
          <a href="https://jonathancapone.art" target="_blank" style="font-weight: 600; color: var(--ink-soft);">Art Portfolio</a>
        </div>
      </nav>"""

def read_file(path):
    if not os.path.exists(path): return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def replace_nav(html):
    pattern = re.compile(r'<nav class="nav" aria-label="Main Navigation">.*?</nav>', re.DOTALL)
    if not pattern.search(html):
        pattern = re.compile(r'<nav class="nav".*?</nav>', re.DOTALL)
    return pattern.sub(NEW_NAV, html)

def main():
    # 1. Update Index.html content
    index_html = read_file('index.html')
    
    # Change OMEGA-wave to OMEGA
    index_html = index_html.replace('OMEGA-wave', 'OMEGA')
    
    # Change Bathymetry Mapping to OMEGA-Alpha
    index_html = index_html.replace('>Bathymetry Mapping</h3>', '>OMEGA-Alpha</h3>')
    
    write_file('index.html', index_html)
    
    # 2. Also update bathymetry.html hero title if it says Bathymetry Mapping
    bathy_html = read_file('bathymetry.html')
    bathy_html = bathy_html.replace('<h1>Legacy Bathymetry Mapping.</h1>', '<h1>OMEGA-Alpha.</h1>')
    bathy_html = bathy_html.replace('<h1>Bathymetry Mapping.</h1>', '<h1>OMEGA-Alpha.</h1>')
    write_file('bathymetry.html', bathy_html)

    # 3. Replace Navigation on ALL html files
    all_html = glob.glob('*.html')
    for f in all_html:
        html = read_file(f)
        html = replace_nav(html)
        write_file(f, html)
        print(f"Updated {f}")

if __name__ == '__main__':
    main()
