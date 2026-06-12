import glob
import re

html_files = glob.glob('*.html')
fixed_count = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('</html>')
    
    if len(parts) > 2 or (len(parts) == 2 and parts[1].strip() != ''):
        print(f"Fixing corruption in {file_path}")
        # Take everything before the first </html>, and add exactly one </html>
        new_content = parts[0] + '</html>\n'
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        fixed_count += 1

print(f"Fixed {fixed_count} corrupted HTML files.")
