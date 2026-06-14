import os
import re

def update_nav(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                # We skip the two new files because we already manually wrote their exact perfect navs
                if file in ["power-systems.html", "economic-model.html"]:
                    continue
                    
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Insert power-systems into Systems dropdown
                # We look for hardware.html (could have class="is-current")
                systems_pattern = re.compile(
                    r'(<a href="hardware\.html"[^>]*>Hardware & Firmware</a>)',
                    re.IGNORECASE
                )
                
                # Insert economic-model into Data dropdown
                data_pattern = re.compile(
                    r'(<a href="data-providers\.html"[^>]*>Data Providers</a>)',
                    re.IGNORECASE
                )
                
                original_content = content
                
                # Avoid double inserting
                if 'power-systems.html' not in content:
                    content = systems_pattern.sub(r'\1\n            <a href="power-systems.html">Power & Thermodynamics</a>', content)
                
                if 'economic-model.html' not in content:
                    content = data_pattern.sub(r'\1\n            <a href="economic-model.html">Economic Model</a>', content)

                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Updated nav in {file}")

if __name__ == "__main__":
    update_nav(".")
    print("Done.")
