import glob

html_files = glob.glob('*.html')
fixed_count = 0

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for duplication: if there's a </body> followed by another <header> or <section> etc.
    # Actually, a valid HTML file should end with </body>\n</html> (plus maybe some whitespace)
    # We can just find the FIRST </body> and discard everything after it, then append </html>
    
    parts = content.split('</body>')
    if len(parts) > 1:
        # Check if the part after the first </body> contains significant content
        remainder = parts[1].strip()
        if remainder != '</html>' and remainder != '':
            print(f"Fixing duplication in {file_path}")
            # The file has garbage or duplicate content after the first </body>
            new_content = parts[0] + '</body>\n</html>\n'
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            fixed_count += 1

print(f"Fixed {fixed_count} corrupted HTML files.")
