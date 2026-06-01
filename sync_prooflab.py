import json
import os
import re
import shutil
from pathlib import Path

SOURCE_SITE_DIR = r"C:\Users\jdcap\OneDrive\Documents\OMEGA Proof\omega-proof-lab\.prooflab\site"
TARGET_SITE_DIR = Path(__file__).parent / "crucible-site"

def sanitize_json(data):
    """Recursively sanitize absolute Windows paths to prevent leaking PII."""
    if isinstance(data, dict):
        return {k: sanitize_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [sanitize_json(v) for v in data]
    elif isinstance(data, str):
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
    if not os.path.exists(SOURCE_SITE_DIR):
        print(f"Error: Could not find Crucible site at {SOURCE_SITE_DIR}")
        return

    print(f"Syncing Crucible site from {SOURCE_SITE_DIR} to {TARGET_SITE_DIR}...")
    
    # Remove existing target to ensure clean copy
    if os.path.exists(TARGET_SITE_DIR):
        shutil.rmtree(TARGET_SITE_DIR)
        
    # Copy directory tree
    shutil.copytree(SOURCE_SITE_DIR, TARGET_SITE_DIR)
    print("Site files copied successfully.")

    # Sanitize data.json inside the copied directory
    target_data_json = TARGET_SITE_DIR / "data.json"
    if os.path.exists(target_data_json):
        print("Sanitizing data.json...")
        with open(target_data_json, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        clean_data = sanitize_json(data)
        
        with open(target_data_json, "w", encoding="utf-8") as f:
            json.dump(clean_data, f, indent=2)
            
    print("Sync complete.")

if __name__ == "__main__":
    main()
