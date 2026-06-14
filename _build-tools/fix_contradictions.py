import re

def fix_file(path, replacements):
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    for old, new in replacements:
        html = html.replace(old, new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

# P0.3 SQLite
# P0.4 Ed25519 vs secp256r1
# Let's read gateway.html and standardize to SQLite and Ed25519 (Ed25519 is more common for modern IoT, but let's look at the text)
# Actually, I'll just change PostgreSQL to SQLite in mermaid.
fix_file("C:/Users/jdcap/Documents/OMEGA-website/aminalnam.github.io/gateway.html", [
    ('[(PostgreSQL)]', '[(SQLite WAL)]'),
    ('secp256r1', 'Ed25519')
])

# P1.1 hardware.html mermaid fixes
fix_file("C:/Users/jdcap/Documents/OMEGA-website/aminalnam.github.io/hardware.html", [
    ('11kHz JANUS', '11.5kHz JANUS'),
    ('80 bps', '50 bps'),
    ('250 bps', '1200 bps')
])

# P1.3 architecture.html mermaid fixes
# 'UDP' -> 'WebSockets' where it says Mission Portal
# 'USB-CDC' -> 'Serial UART'
fix_file("C:/Users/jdcap/Documents/OMEGA-website/aminalnam.github.io/architecture.html", [
    ('-- UDP -->', '-- WebSockets -->'),
    ('-- USB-CDC -->', '-- Serial UART -->')
])

print("Fixed contradictions in hardware, gateway, architecture.")
