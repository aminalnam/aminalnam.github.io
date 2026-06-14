import glob
import re

html_files = glob.glob('*.html')

# Regex to find the first H2 tag
h2_pattern = re.compile(r'<h2>(.*?)</h2>', re.IGNORECASE)

# Regex to find existing meta description
meta_desc_pattern = re.compile(r'<meta\s+name="description"\s+content="[^"]*"\s*/>')

for file in html_files:
    if file == 'getting-started.html' or file == 'mission-portal.html':
        continue # Already customized manually

    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the H2 to use as the page description
    match = h2_pattern.search(content)
    if match:
        raw_text = match.group(1).replace('<br>', ' ').replace('<br/>', ' ').strip()
        # Remove any HTML tags inside the text
        raw_text = re.sub(r'<[^>]+>', '', raw_text)
        
        description = f"OMEGA-wave documentation: {raw_text}"
        
        # Replace existing or insert new
        if meta_desc_pattern.search(content):
            content = meta_desc_pattern.sub(f'<meta name="description" content="{description}" />', content)
        else:
            # Insert after the title tag
            content = re.sub(r'(<title>.*?</title>)', r'\1\n  <meta name="description" content="' + description + '" />', content)

    # Add aria-label to nav if missing
    if '<nav class="nav">' in content:
        content = content.replace('<nav class="nav">', '<nav class="nav" aria-label="Main Navigation">')

    # Add main and article semantics
    if '<main class="main-shell wrap">' in content:
        content = content.replace('<main class="main-shell wrap">', '<main class="main-shell wrap" role="main">')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("SEO & A11y tags injected successfully!")
