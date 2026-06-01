import os
import re

def update_nav(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                # Skip the files I already wrote with the perfect nav
                if file in ["manifesto.html", "software-decisions.html", "build-guide.html", "teaching-documentation.html"]:
                    continue
                    
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Insert software-decisions.html into Systems dropdown after power-systems
                systems_pattern = re.compile(
                    r'(<a href="power-systems\.html"[^>]*>Power & Thermodynamics</a>)',
                    re.IGNORECASE
                )
                
                # Insert manifesto.html into Docs dropdown before teaching-documentation
                docs_pattern = re.compile(
                    r'(<div class="dropdown-content">\s*)(<a href="teaching-documentation\.html")',
                    re.IGNORECASE
                )
                
                original_content = content
                
                if 'software-decisions.html' not in content:
                    content = systems_pattern.sub(r'\1\n            <a href="software-decisions.html">Software Architecture</a>', content)
                
                if 'manifesto.html' not in content:
                    content = docs_pattern.sub(r'\1<a href="manifesto.html">The Manifesto</a>\n            \2', content)

                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Updated nav in {file}")

if __name__ == "__main__":
    update_nav(".")
    print("Done.")
