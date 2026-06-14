import os
import glob
import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def remove_beta_from_index():
    path = 'index.html'
    if not os.path.exists(path):
        return
    content = read_file(path)
    
    # Use regex to remove the OMEGA BETA Link block completely
    pattern = re.compile(r'\s*<!-- OMEGA BETA Link -->\s*<a href="simulation\.html" class="panel bento-item".*?OMEGA BETA Analytics.*?</a>', re.DOTALL)
    new_content, count = pattern.subn('', content)
    if count > 0:
        write_file(path, new_content)
        print(f"Removed OMEGA BETA Link from {path}")

def clean_nav_comments():
    html_files = glob.glob('*.html') + glob.glob('*/*.html')
    for path in html_files:
        content = read_file(path)
        new_content = content.replace('<!-- BETA Nav Group Removed (Honest Portfolio) -->', '<!-- Evaluation Nav Group Removed -->')
        if new_content != content:
            write_file(path, new_content)
            print(f"Cleaned nav comment in {path}")

def main():
    remove_beta_from_index()
    clean_nav_comments()
    print("Cleanup complete.")

if __name__ == '__main__':
    main()
