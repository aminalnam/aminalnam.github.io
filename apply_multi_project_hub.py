import os
import re
import glob
import shutil

NEW_NAV = """      <nav class="nav" aria-label="Main Navigation">
        <a href="index.html">Home</a>
        <div class="dropdown">
          <button class="dropbtn" style="background: none; border: none; color: #fff; font-family: inherit; font-size: inherit; cursor: pointer;">OMEGA &#9662;</button>
          <div class="dropdown-content">
            <a href="architecture.html">Architecture</a>
            <a href="hardware.html">Hardware & Mesh</a>
            <a href="gateway.html">Backend Gateway</a>
            <a href="mission-portal.html">Mission Portal</a>
            <a href="engineering-journal.html">Journal</a>
          </div>
        </div>
        <a href="beta-overview.html">BETA</a>
        <div class="dropdown">
          <button class="dropbtn" style="background: none; border: none; color: #fff; font-family: inherit; font-size: inherit; cursor: pointer;">Other Projects &#9662;</button>
          <div class="dropdown-content">
            <a href="cosnfx.html">CosNFX (Android)</a>
            <a href="weather-globe.html">Weather Globe</a>
            <a href="visual-timer.html">Visual Timer</a>
            <a href="bathymetry.html">Legacy Bathymetry</a>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; margin-left: 0.5rem; border-left: 1px solid rgba(255,255,255,0.15); padding-left: 1.5rem;">
          <a href="https://jonathancapone.art" target="_blank" style="font-weight: 600; color: var(--ink-soft);">Art Portfolio</a>
        </div>
      </nav>"""

NEW_INDEX_GRID = """<section class="section section-block fade-up" style="padding-top: 0; padding-bottom: 2rem;">
        <span class="section-kicker">Portfolio</span>
        <h2 class="scramble-text" style="font-family: var(--font-serif); font-size: 2.5rem; margin: 0 0 2rem;">Projects Hub</h2>

        <div class="grid-3" style="gap: 1.5rem;">
          <a href="architecture.html" class="panel" style="padding: 2rem; display: block; text-decoration: none;">
            <span class="status-label status-implemented">Flagship</span>
            <h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">OMEGA-wave</h3>
            <p style="font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.5rem;">A mixed-bearer environmental sensor, maritime operations, and field gateway platform. Built over ~3 weeks (105k LOC Python, 52k LOC JS).</p>
          </a>

          <a href="beta-overview.html" class="panel" style="padding: 2rem; display: block; text-decoration: none;">
            <span class="status-label status-implemented">Evaluation</span>
            <h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">BETA Framework</h3>
            <p style="font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.5rem;">A comprehensive deterministic evaluation framework built for testing and validation.</p>
          </a>
          
          <a href="cosnfx.html" class="panel" style="padding: 2rem; display: block; text-decoration: none;">
            <span class="status-label status-implemented">Android Studio</span>
            <h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">CosNFX</h3>
            <p style="font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.5rem;">An Android application developed natively using Gemini integration in Android Studio.</p>
          </a>

          <a href="weather-globe.html" class="panel" style="padding: 2rem; display: block; text-decoration: none;">
            <span class="status-label status-implemented">Web App</span>
            <h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">Weather Globe</h3>
            <p style="font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.5rem;">A real-time weather visualization engine built with Claude.</p>
          </a>

          <a href="visual-timer.html" class="panel" style="padding: 2rem; display: block; text-decoration: none;">
            <span class="status-label status-implemented">Utility App</span>
            <h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">Visual Timer</h3>
            <p style="font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.5rem;">A specialized time-management application developed with Claude.</p>
          </a>
          
          <a href="bathymetry.html" class="panel" style="padding: 2rem; display: block; text-decoration: none;">
            <span class="status-label status-implemented">Legacy</span>
            <h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">Bathymetry Mapping</h3>
            <p style="font-size: 0.95rem; color: var(--ink-soft); margin-top: 0.5rem;">A legacy Arduino Mega platform for generating high-resolution depth maps.</p>
          </a>
        </div>
      </section>"""

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

def create_placeholder_page(target_file, title, hero_eyebrow, hero_p):
    # Copy from architecture.html as a shell
    html = read_file('architecture.html')
    
    # Replace the main inner content
    main_pattern = re.compile(r'(<main[^>]*>\s*<div class="main-inner">).*?(</div>\s*</main>)', re.DOTALL)
    placeholder_content = f"""
      <section class="section">
        <div class="section-content">
          <span class="section-kicker">Project Info</span>
          <h2>{title}.</h2>
          <p>Detailed documentation for this project is currently being compiled. Please check back soon for full technical specifications, architecture diagrams, and source code links.</p>
        </div>
      </section>
    """
    html = main_pattern.sub(r'\1' + placeholder_content + r'\2', html)
    
    # Update title tags and hero
    html = re.sub(r'<title>.*?</title>', f'<title>Jonathan Capone — {title}</title>', html)
    html = re.sub(r'<span class="eyebrow">.*?</span>', f'<span class="eyebrow">{hero_eyebrow}</span>', html, count=1)
    html = re.sub(r'<h1>.*?</h1>', f'<h1>{title}.</h1>', html, count=1)
    html = re.sub(r'<p>.*?</p>', f'<p>{hero_p}</p>', html, count=1)
    
    write_file(target_file, html)

def main():
    # 1. Update Index to Hub
    index_html = read_file('index.html')
    # Replace the existing OMEGA modules grid
    grid_pattern = re.compile(r'<section class="section section-block fade-up"[^>]*>.*?<span class="section-kicker">Project 1</span>.*?</section>', re.DOTALL)
    if grid_pattern.search(index_html):
        index_html = grid_pattern.sub(NEW_INDEX_GRID, index_html)
    else:
        # Fallback if pattern misses
        print("Warning: Could not find exact grid in index.html to replace. Appending.")
        main_pattern = re.compile(r'(<main[^>]*>\s*<div class="main-inner">)')
        index_html = main_pattern.sub(r'\1\n' + NEW_INDEX_GRID + '\n', index_html)
        
    write_file('index.html', index_html)
    
    # 2. Create Placeholders
    create_placeholder_page('cosnfx.html', 'CosNFX', 'Android Studio / Gemini', 'An Android application developed natively using Gemini integration in Android Studio.')
    create_placeholder_page('weather-globe.html', 'Weather Globe', 'Claude Assistant', 'A real-time weather visualization engine built with Claude.')
    create_placeholder_page('visual-timer.html', 'Visual Timer', 'Claude Assistant', 'A specialized time-management application developed with Claude.')
    
    # 3. Replace Navigation on ALL html files
    all_html = glob.glob('*.html')
    for f in all_html:
        html = read_file(f)
        html = replace_nav(html)
        write_file(f, html)
        print(f"Updated {f}")

if __name__ == '__main__':
    main()
