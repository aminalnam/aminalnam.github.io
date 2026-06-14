import os
import glob

# The exact new nav bar block we want everywhere
NAV_HTML = """      <nav class="nav" aria-label="Main Navigation">
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
        <a href="bathymetry.html">OMEGA-bath</a>
        <a href="beta-overview.html">BETA</a>
        <a href="cosnfx.html">CosNFX</a>
        <a href="weather-globe.html">Weather Globe</a>
        <a href="visual-timer.html">Visual Timer</a>
        <a href="thruster.html">Thruster</a>
        <a href="engineering-journal.html">Journal</a>
        
        <div style="display: flex; align-items: center; margin-left: 0.5rem; border-left: 1px solid rgba(255,255,255,0.15); padding-left: 1.5rem;">
          <a href="https://jonathancapone.art" target="_blank" style="font-weight: 600; color: var(--ink-soft);">Art Portfolio</a>
        </div>
      </nav>"""

def update_nav_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the <nav> block
    start_tag = '<nav class="nav" aria-label="Main Navigation">'
    end_tag = '</nav>'
    
    start_idx = content.find(start_tag)
    if start_idx == -1:
        print(f"Skipping {filepath}: nav block not found")
        return False
        
    end_idx = content.find(end_tag, start_idx)
    if end_idx == -1:
        print(f"Skipping {filepath}: nav end tag not found")
        return False

    # Replace everything from start to end tag (inclusive)
    new_content = content[:start_idx] + NAV_HTML + content[end_idx + len(end_tag):]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    html_files = glob.glob("*.html")
    updated_count = 0
    for f in html_files:
        if update_nav_in_file(f):
            updated_count += 1
            print(f"Updated nav in {f}")
            
    print(f"Successfully updated {updated_count} files.")

if __name__ == "__main__":
    main()
