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
    for f in all_html:
        html = read_file(f)
        original_html = html
        
        # Replace the URL
        html = html.replace('https://github.com/aminalnam/OMEGA-wave', 'https://github.com/aminalnam/OMEGA-bath')
        html = html.replace('https://github.com/aminalnam/OMEGA"', 'https://github.com/aminalnam/OMEGA-bath"')
        
        # Replace the button text to just say OMEGA
        html = html.replace('View OMEGA-wave on GitHub', 'View OMEGA on GitHub')
        html = html.replace('View OMEGA-bath on GitHub', 'View OMEGA on GitHub') # In case it was already replaced
        
        # For the placeholders, let's remove the github button if it doesn't belong.
        # But actually, leaving it pointing to OMEGA-bath might be wrong for CosNFX etc.
        # Let's just fix the links as requested.
        
        if html != original_html:
            write_file(f, html)
            print(f"Updated GitHub links in {f}")

if __name__ == '__main__':
    main()
