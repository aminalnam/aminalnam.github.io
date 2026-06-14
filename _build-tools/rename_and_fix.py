import os
import glob

footer_html = """  <footer class="footer wrap">
    <span>© Jonathan Capone — Technical Portfolio. OMEGA.</span>
  </footer>
  <script src="main.js"></script>
</body>"""

def fix_files():
    # Fix the missing footer and main.js in the 3 new pages
    pages_to_fix = ['visual-timer.html', 'weather-globe.html', 'thruster.html']
    for p in pages_to_fix:
        if os.path.exists(p):
            with open(p, 'r', encoding='utf-8') as f:
                content = f.read()
            if '<script src="main.js"></script>' not in content:
                content = content.replace('</body>', footer_html)
                with open(p, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Added footer/js to {p}")

    # Rename Thruster to T-Thruster in all navs
    all_html = glob.glob('*.html')
    for p in all_html:
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content.replace('<a href="thruster.html">Thruster</a>', '<a href="thruster.html">T-Thruster</a>')
        if new_content != content:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated nav in {p}")
            
    # Update specific mentions in index.html
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            idx = f.read()
        idx = idx.replace('<h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">Thruster</h3>', 
                          '<h3 style="font-size: 1.6rem; color: #fff; margin-top: 1rem; margin-bottom: 0.5rem;">T-Thruster</h3>')
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(idx)
        print("Updated index.html title")

    # Update thruster.html specific titles
    if os.path.exists('thruster.html'):
        with open('thruster.html', 'r', encoding='utf-8') as f:
            t = f.read()
        t = t.replace('Jonathan Capone — Thruster', 'Jonathan Capone — T-Thruster')
        t = t.replace('<h1>Thruster.</h1>', '<h1>T-Thruster.</h1>')
        with open('thruster.html', 'w', encoding='utf-8') as f:
            f.write(t)
        print("Updated thruster.html metadata")
        
if __name__ == '__main__':
    fix_files()
