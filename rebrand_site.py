import os
import re

BRAND_TEMPLATE = """<a class="brand" href="index.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
        <div>
          <span class="brand-title" style="letter-spacing: 0.1em; color: var(--white); display: block; font-family: var(--font-serif); font-size: 1.5rem;">JONATHAN CAPONE</span>
          <span class="brand-sub" style="display: block; font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); font-family: var(--font-mono); opacity: 0.9;">Systems Architecture Portfolio</span>
        </div>
      </a>"""

def main():
    directory = "."
    for root, _, files in os.walk(directory):
        if "omega-beta-site" in root or "assets" in root or ".git" in root:
            continue
            
        for file in files:
            if file.endswith(".html"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace brand block
                content = re.sub(r'<a class="brand".*?</a>', BRAND_TEMPLATE, content, flags=re.DOTALL)
                
                # Replace <title>OMEGA — .*?</title>
                content = re.sub(r'<title>OMEGA\s*—\s*(.*?)</title>', r'<title>Jonathan Capone — \1</title>', content)
                
                # Replace meta tags containing OMEGA —
                content = re.sub(r'content="OMEGA\s*—\s*(.*?)"', r'content="Jonathan Capone — \1"', content)

                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Rebranded {file}")

if __name__ == "__main__":
    main()
