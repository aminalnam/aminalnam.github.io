import os
import glob

def inject_logo():
    html_files = glob.glob('*.html')
    
    old_brand_str = """      <a class="brand" href="index.html">
        <span class="brand-title">Jonathan Capone</span>
        <span class="brand-sub">Technical Portfolio</span>
      </a>"""

    new_brand_str = """      <a class="brand" href="index.html" style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="assets/images/logo.png" alt="OMEGA Logo" style="height: 48px; width: auto; object-fit: contain;">
        <div>
          <span class="brand-title" style="letter-spacing: 0.05em;">OMEGA</span>
          <span class="brand-sub">Technical Portfolio</span>
        </div>
      </a>"""

    count = 0
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if old_brand_str in content:
            new_content = content.replace(old_brand_str, new_brand_str)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            
    print(f"Injected logo into {count} HTML files.")

if __name__ == '__main__':
    inject_logo()
