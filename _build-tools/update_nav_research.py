import os
import re

def update_nav(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Insert research-citations.html into Guides & Ops dropdown after compliance.html
                pattern = re.compile(
                    r'(<a href="compliance\.html"[^>]*>.*?</a>)',
                    re.IGNORECASE
                )
                
                original_content = content
                
                if 'research-citations.html' not in content:
                    content = pattern.sub(r'\1\n            <a href="research-citations.html">Research & Literature</a>', content)
                
                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Updated nav in {file}")

if __name__ == "__main__":
    update_nav(".")
    print("Done.")
