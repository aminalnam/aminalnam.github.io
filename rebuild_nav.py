import os
import re

NAV_TEMPLATE = """      <nav class="nav" aria-label="Main Navigation">
        <a href="index.html">Home</a>
        <a href="manifesto.html">Manifesto</a>
        <a href="overview.html">Overview</a>
        <a href="beta.html" style="color: var(--accent-ocean); font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">BETA</a>
        
        <div class="dropdown">
          <button class="dropbtn">Hardware & Physics &#9662;</button>
          <div class="dropdown-content">
            <a href="hardware.html">Hardware & Firmware</a>
            <a href="power-systems.html">Power & Thermodynamics</a>
            <a href="mechanical-engineering.html">Mechanical & Buoyancy</a>
            <a href="rf-physics.html">RF Physics & Propagation</a>
            <a href="biofouling.html">Marine Biology (Fouling)</a>
            <a href="edge-nodes.html">Edge Nodes</a>
          </div>
        </div>
        
        <div class="dropdown">
          <button class="dropbtn">Software & Arch &#9662;</button>
          <div class="dropdown-content">
            <a href="system-architecture.html">System Architecture</a>
            <a href="gateway.html">Gateway</a>
            <a href="mesh-core.html">Mesh Core</a>
            <a href="software-decisions.html">Software Architecture</a>
            <a href="event-bus.html">Event Bus & Watches</a>
            <a href="security.html">Security & RBAC</a>
          </div>
        </div>

        <div class="dropdown">
          <button class="dropbtn">Data & AI &#9662;</button>
          <div class="dropdown-content">
            <a href="analytics.html">Analytics Pipeline</a>
            <a href="copilot.html">Honu AI Copilot</a>
            <a href="machine-learning.html">Machine Learning</a>
            <a href="qc-eval.html">Data Quality (QARTOD)</a>
            <a href="bathymetry.html">Bathymetry</a>
            <a href="calibration.html">Sensor Calibration</a>
            <a href="economic-model.html">Economic Model</a>
          </div>
        </div>
        
        <div class="dropdown">
          <button class="dropbtn">Tools & API &#9662;</button>
          <div class="dropdown-content">
            <a href="mission-portal.html">Mission Portal</a>
            <a href="janus-acoustic.html">JANUS Acoustics</a>
            <a href="simulation.html">Simulation</a>
            <a href="data-providers.html">Data Providers</a>
            <a href="external-data.html">External Integrations</a>
            <a href="examples.html">Data Examples</a>
            <a href="cloud-infrastructure.html">Cloud Infrastructure</a>
            <a href="api-reference.html">API Reference</a>
          </div>
        </div>
        
        <div class="dropdown">
          <button class="dropbtn">Guides & Ops &#9662;</button>
          <div class="dropdown-content">
            <a href="getting-started.html">Getting Started</a>
            <a href="build-guide.html">Build Guide</a>
            <a href="deployment-scenarios.html">Deployment Scenarios</a>
            <a href="marine-operations.html">Marine Operations</a>
            <a href="teaching-documentation.html">Education & Guides</a>
            <a href="compliance.html">Legal & Compliance</a>
            <a href="roadmap.html">Roadmap</a>
          </div>
        </div>
      </nav>"""

def generate_nav(current_file):
    nav_html = NAV_TEMPLATE
    
    # 1. Clear default states
    nav_html = nav_html.replace('href="index.html" class="is-current"', 'href="index.html"')
    
    # 2. Add current state to active file
    if current_file == 'index.html':
        nav_html = nav_html.replace('href="index.html"', 'href="index.html" class="is-current"')
    elif current_file == 'manifesto.html':
        nav_html = nav_html.replace('href="manifesto.html"', 'href="manifesto.html" class="is-current"')
    elif current_file == 'overview.html':
        nav_html = nav_html.replace('href="overview.html"', 'href="overview.html" class="is-current"')
    elif current_file in ['beta.html', 'beta-dashboard.html']:
        nav_html = nav_html.replace('href="beta.html"', 'href="beta.html" class="is-current"')
    else:
        # Standard dropdown highlight
        target = f'href="{current_file}"'
        replacement = f'href="{current_file}" class="is-current"'
        nav_html = nav_html.replace(target, replacement)
    return nav_html

def rebuild_nav(directory="."):
    for root, _, files in os.walk(directory):
        if "beta" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Find the old nav block
                nav_pattern = re.compile(r'^[ \t]*<nav.*?class="nav".*?</nav>', re.DOTALL | re.MULTILINE | re.IGNORECASE)
                
                if nav_pattern.search(content):
                    # Customize template for current file
                    custom_nav = generate_nav(file)
                    
                    new_content = nav_pattern.sub(custom_nav, content)
                    
                    if new_content != content:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Rebuilt nav in {file}")
                else:
                    print(f"Warning: No nav found in {file}")

if __name__ == "__main__":
    rebuild_nav()
