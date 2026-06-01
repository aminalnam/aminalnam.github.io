import os
import re
import glob

def clean_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Navigation Bar
    # Remove wayfinding link
    content = re.sub(r'\s*<a href="wayfinding\.html"[^>]*>Wayfinding</a>', '', content)
    
    # Add Art Portfolio to nav if not already there
    if 'Art Portfolio' not in content and '</nav>' in content:
        content = content.replace('</nav>', '  <a href="https://jonathancapone.art" target="_blank" style="margin-left: auto; color: var(--accent);">Art Portfolio</a>\n      </nav>')

    # 2. Scrub ASV terminology
    replacements = {
        r'(?i)autonomous vessels?': 'stationary nodes',
        r'(?i)autonomous ROV': 'stationary sensor',
        r'(?i)autonomous assets?': 'hardware nodes',
        r'(?i)autonomous relays?': 'hardware relays',
        r'(?i)autonomous safety': 'Hardware Safety',
        r'(?i)autonomous loop': 'firmware loop',
        r'(?i)autonomously query': 'automatically query',
        r'(?i)autonomously executes?': 'automatically executes',
        r'(?i)autonomously routes': 'automatically routes',
        r'(?i)autonomous evasion maneuver': 'automatic power-down sequence',
        r'(?i)propulsion RPM': 'sensor polling rate',
        r'(?i)inject false waypoints into': 'inject false commands into',
        r'(?i)plan autonomous survey routes': 'plan stationary deployment locations',
        r'(?i)execute strict mathematical coordinate sequences completely autonomously': 'execute strict sensor polling schedules completely independently',
        r'(?i)driving a boat': 'deploying a node',
        r'(?i)waypoint execution': 'sensor polling',
        r'(?i)kinematic scenario generation': 'power envelope modeling',
        r'(?i)real-time fluid dynamics and currents': 'solar charge states and lithium depletion',
        r'(?i)autonomous fleets': 'sensor networks',
        r'(?i)A\* routing engine': 'power management system',
        r'(?i)mathematically punishes counter-currents': 'throttles telemetry transmissions'
    }

    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)

    # Re-write file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    # Delete wayfinding.html
    if os.path.exists('wayfinding.html'):
        os.remove('wayfinding.html')
        print("Deleted wayfinding.html")

    # Clean all HTML files
    html_files = glob.glob('*.html')
    for filepath in html_files:
        clean_html_file(filepath)
        print(f"Cleaned {filepath}")

if __name__ == '__main__':
    main()
