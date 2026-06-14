import os
import glob
import re

def read_file(path):
    if not os.path.exists(path): return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    all_html = glob.glob('*.html')
    # Regex to match anchor tags linking to the OMEGA repo.
    # We use DOTALL so it matches across newlines.
    pattern = re.compile(r'\s*<a[^>]*href="https://github\.com/aminalnam/OMEGA-bath"[^>]*>.*?</a>\s*', re.DOTALL)
    
    for f in all_html:
        html = read_file(f)
        original_html = html
        
        # Remove the matched anchor tags
        html = pattern.sub('\n', html)
        
        if html != original_html:
            write_file(f, html)
            print(f"Removed GitHub links from {f}")

if __name__ == '__main__':
    main()
