import os
import glob

def rename_omega():
    html_files = glob.glob('*.html')
    
    count = 0
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        
        if '<h1>OMEGA Platform.</h1>' in content:
            content = content.replace('<h1>OMEGA Platform.</h1>', '<h1>OMEGA.</h1>')
            modified = True
            
        if 'A mixed-bearer environmental sensing and maritime operations platform.' in content:
            content = content.replace(
                'A mixed-bearer environmental sensing and maritime operations platform.',
                'The Oceanic Measurement and Environmental Geospatial Array (OMEGA) is a mixed-bearer environmental sensing network.'
            )
            modified = True
            
        if '<span class="eyebrow">OMEGA Platform</span>' in content:
            content = content.replace('<span class="eyebrow">OMEGA Platform</span>', '<span class="eyebrow">Oceanic Measurement Array</span>')
            modified = True
            
        if 'the OMEGA platform.' in content:
            content = content.replace('the OMEGA platform.', 'the OMEGA network.')
            modified = True
            
        if 'the OMEGA platform ' in content:
            content = content.replace('the OMEGA platform ', 'the OMEGA network ')
            modified = True

        if modified:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            
    print(f"Updated {count} HTML files.")

if __name__ == '__main__':
    rename_omega()
