import os
for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        content = content.replace('href="style.css?v=3"', 'href="style.css"')
        content = content.replace('href="style.css?v=2"', 'href="style.css"')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
