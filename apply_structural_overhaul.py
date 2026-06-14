import os
import re
import glob
import shutil

# The new clean navigation block
NEW_NAV = """      <nav class="nav" aria-label="Main Navigation">
        <a href="index.html" class="nav-link {index_active}">Home</a>
        <a href="architecture.html" class="nav-link {architecture_active}">Architecture</a>
        <a href="hardware.html" class="nav-link {hardware_active}">Hardware & Mesh</a>
        <a href="gateway.html" class="nav-link {gateway_active}">Backend Gateway</a>
        <a href="mission-portal.html" class="nav-link {mission_portal_active}">Mission Portal</a>
        <a href="engineering-journal.html" class="nav-link {journal_active}">Engineering Journal</a>
        
        <div style="display: flex; align-items: center; margin-left: 0.5rem; border-left: 1px solid rgba(255,255,255,0.15); padding-left: 1.5rem;">
          <a href="https://jonathancapone.art" target="_blank" style="font-weight: 600; color: var(--ink-soft);">Art Portfolio</a>
        </div>
      </nav>"""

def read_file(path):
    if not os.path.exists(path): return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_main_content(html):
    # Extracts the content inside <main ...><div class="main-inner"> ... </div></main>
    match = re.search(r'<main[^>]*>\s*<div class="main-inner">(.*?)</div>\s*</main>', html, re.DOTALL)
    if match:
        return match.group(1).strip()
    
    # Fallback to just sections
    sections = re.findall(r'(<section class="section.*?</section>)', html, re.DOTALL)
    return "\n\n".join(sections)

def replace_nav(html, current_page):
    # Regex to find the old nav block
    pattern = re.compile(r'<nav class="nav" aria-label="Main Navigation">.*?</nav>', re.DOTALL)
    
    nav = NEW_NAV.format(
        index_active='is-current' if current_page == 'index' else '',
        architecture_active='is-current' if current_page == 'architecture' else '',
        hardware_active='is-current' if current_page == 'hardware' else '',
        gateway_active='is-current' if current_page == 'gateway' else '',
        mission_portal_active='is-current' if current_page == 'mission-portal' else '',
        journal_active='is-current' if current_page == 'engineering-journal' else ''
    )
    
    # If the pattern doesn't match perfectly, try a looser match
    if not pattern.search(html):
        pattern = re.compile(r'<nav class="nav".*?</nav>', re.DOTALL)
        
    return pattern.sub(nav, html)

def build_pillar_page(base_file, target_file, merge_files, title, hero_eyebrow, hero_title, hero_p):
    print(f"Building {target_file} from {base_file} + {merge_files}")
    if not os.path.exists(base_file):
        print(f"Base file {base_file} not found!")
        return

    html = read_file(base_file)
    
    # Extract sections from merge_files
    merged_content = ""
    for mf in merge_files:
        mf_html = read_file(mf)
        merged_content += "\n\n" + extract_main_content(mf_html)
        
    # Inject merged content into the base file's main-inner
    main_pattern = re.compile(r'(<main[^>]*>\s*<div class="main-inner">.*?)(</div>\s*</main>)', re.DOTALL)
    html = main_pattern.sub(lambda m: m.group(1) + merged_content + "\n" + m.group(2), html)
    
    # Update title tags
    html = re.sub(r'<title>.*?</title>', f'<title>Jonathan Capone — {title}</title>', html)
    
    # Update Hero if needed
    if hero_title:
        html = re.sub(r'<span class="eyebrow">.*?</span>', f'<span class="eyebrow">{hero_eyebrow}</span>', html, count=1)
        html = re.sub(r'<h1>.*?</h1>', f'<h1>{hero_title}</h1>', html, count=1)
        html = re.sub(r'<p>.*?</p>', f'<p>{hero_p}</p>', html, count=1) # First p in hero
        
    # Replace Nav
    page_id = target_file.replace('.html', '')
    html = replace_nav(html, page_id)
    
    write_file(target_file, html)

def main():
    # 1. Copy overview to architecture
    if os.path.exists('overview.html'):
        shutil.copy('overview.html', 'architecture.html')
        
    # 2. Build Pillar Pages
    build_pillar_page(
        base_file='architecture.html',
        target_file='architecture.html',
        merge_files=['system-architecture.html', 'software-decisions.html'],
        title='Architecture & Design',
        hero_eyebrow='System Design',
        hero_title='Architecture & Design.',
        hero_p='The Bearer-Agnostic observation protocol and 4-Layer architectural division.'
    )
    
    build_pillar_page(
        base_file='hardware.html',
        target_file='hardware.html',
        merge_files=['edge-nodes.html', 'rf-physics.html', 'mesh-core.html', 'janus-acoustic.html'],
        title='Hardware & Mesh',
        hero_eyebrow='Physical Layer',
        hero_title='Hardware & Mesh.',
        hero_p='Silicon constraints, cross-family LoRa interop, and Delay Tolerant Networking (DTN).'
    )
    
    build_pillar_page(
        base_file='gateway.html',
        target_file='gateway.html',
        merge_files=['event-bus.html', 'security.html', 'data-providers.html'],
        title='Backend Gateway',
        hero_eyebrow='Ingest Layer',
        hero_title='Backend Gateway.',
        hero_p='The ~105,500 LOC Python FastAPI service, SQLite WAL provenance, and Ed25519 Security.'
    )
    
    build_pillar_page(
        base_file='mission-portal.html',
        target_file='mission-portal.html',
        merge_files=['analytics.html', 'copilot.html', 'bathymetry.html'],
        title='Mission Portal & AI',
        hero_eyebrow='Presentation Layer',
        hero_title='Mission Portal & AI.',
        hero_p='The ~52,500 LOC Vanilla JS 3D digital twin and the offline-capable Honu AI.'
    )
    
    # 3. Update Nav on standalone pages
    for page in ['index.html', 'engineering-journal.html']:
        if os.path.exists(page):
            html = read_file(page)
            html = replace_nav(html, page.replace('.html', ''))
            write_file(page, html)
            print(f"Updated nav on {page}")
            
    # 4. Delete the fragmented files
    surviving_files = ['index.html', 'architecture.html', 'hardware.html', 'gateway.html', 'mission-portal.html', 'engineering-journal.html']
    all_html = glob.glob('*.html')
    
    deleted_count = 0
    for f in all_html:
        if f not in surviving_files:
            os.remove(f)
            print(f"Deleted {f}")
            deleted_count += 1
            
    print(f"Consolidation complete. Built 5 pillars, kept Journal, deleted {deleted_count} fragmented files.")

if __name__ == '__main__':
    main()
