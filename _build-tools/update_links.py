import os
import glob

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the URLs and the text
    content = content.replace('https://github.com/aminalnam/OMEGA"', 'https://github.com/aminalnam/OMEGA-wave"')
    content = content.replace('View OMEGA on GitHub', 'View OMEGA-wave on GitHub')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print(f"Updated links in {len(html_files)} files.")
