import os
import glob

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
        if 'OMEGA-Alpha' in html:
            html = html.replace('OMEGA-Alpha', 'OMEGA-bath')
            write_file(f, html)
            print(f"Updated {f}")

if __name__ == '__main__':
    main()
