import os
import glob
import re

html_files = glob.glob('*.html')

new_core_nav = """        <div class="dropdown">
          <button class="dropbtn">Core &#9662;</button>
          <div class="dropdown-content">
            <a href="getting-started.html">Getting Started</a>
            <a href="system-architecture.html">System Architecture</a>
            <a href="gateway.html">Gateway</a>
            <a href="mesh-core.html">Mesh Core</a>
            <a href="security.html">Security & RBAC</a>
            <a href="edge-nodes.html">Edge Nodes</a>
          </div>
        </div>"""

# Regex to match the entire Core dropdown block
pattern = re.compile(r'<div class="dropdown">\s*<button class="dropbtn">Core &#9662;</button>\s*<div class="dropdown-content">.*?</div>\s*</div>', re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    updated_content = pattern.sub(new_core_nav, content)
    
    # Ensure current page has is-current class for getting-started
    if file == 'getting-started.html':
        updated_content = updated_content.replace('<a href="getting-started.html">Getting Started</a>', '<a href="getting-started.html" class="is-current">Getting Started</a>')
    elif file == 'system-architecture.html':
        updated_content = updated_content.replace('<a href="system-architecture.html">System Architecture</a>', '<a href="system-architecture.html" class="is-current">System Architecture</a>')
    elif file == 'gateway.html':
        updated_content = updated_content.replace('<a href="gateway.html">Gateway</a>', '<a href="gateway.html" class="is-current">Gateway</a>')
    elif file == 'mesh-core.html':
        updated_content = updated_content.replace('<a href="mesh-core.html">Mesh Core</a>', '<a href="mesh-core.html" class="is-current">Mesh Core</a>')
    elif file == 'security.html':
        updated_content = updated_content.replace('<a href="security.html">Security & RBAC</a>', '<a href="security.html" class="is-current">Security & RBAC</a>')
    elif file == 'edge-nodes.html':
        updated_content = updated_content.replace('<a href="edge-nodes.html">Edge Nodes</a>', '<a href="edge-nodes.html" class="is-current">Edge Nodes</a>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(updated_content)

print("Navigation updated successfully!")
