import json
import os
import re
import shutil
from pathlib import Path

SOURCE_JSON = r"C:\Users\jdcap\OneDrive\Documents\OMEGA Proof\omega-proof-lab\.prooflab\site\data.json"
TARGET_DIR = Path(__file__).parent / "data"
TARGET_JS = TARGET_DIR / "prooflab_data.js"

def sanitize_json(data):
    """Recursively sanitize absolute Windows paths to prevent leaking PII."""
    if isinstance(data, dict):
        return {k: sanitize_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [sanitize_json(v) for v in data]
    elif isinstance(data, str):
        # Match standard Windows paths and replace with a generic path
        # e.g., C:\Users\jdcap\OneDrive\Documents\OMEGA Proof\... -> <OMEGA-PROOF-ENV>/\...
        sanitized = re.sub(
            r'[A-Za-z]:\\[^"]*OMEGA Proof',
            '<OMEGA-PROOF-ENV>',
            data,
            flags=re.IGNORECASE
        )
        return sanitized
    else:
        return data

def main():
    if not os.path.exists(SOURCE_JSON):
        print(f"Error: Could not find Proof Lab data at {SOURCE_JSON}")
        return

    print("Loading Proof Lab data...")
    with open(SOURCE_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("Sanitizing local file paths...")
    clean_data = sanitize_json(data)

    os.makedirs(TARGET_DIR, exist_ok=True)

    print(f"Writing to {TARGET_JS}...")
    with open(TARGET_JS, "w", encoding="utf-8") as f:
        f.write("window.proofLabData = " + json.dumps(clean_data, indent=2) + ";\n")

    print("Sync complete.")

if __name__ == "__main__":
    main()
