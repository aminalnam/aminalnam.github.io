import os
import re

def update_nav(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                # Skip the files I just created with the correct nav
                if file in ["mechanical-engineering.html", "compliance.html", "qc-eval.html"]:
                    continue
                    
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Insert mechanical-engineering into Systems dropdown after power-systems
                systems_pattern = re.compile(
                    r'(<a href="power-systems\.html"[^>]*>Power & Thermodynamics</a>)',
                    re.IGNORECASE
                )
                
                # Insert qc-eval into Data dropdown after analytics
                data_pattern = re.compile(
                    r'(<a href="analytics\.html"[^>]*>Analytics Pipeline</a>)',
                    re.IGNORECASE
                )
                
                # Insert proof-lab into Data dropdown after api-reference
                proof_lab_pattern = re.compile(
                    r'(<a href="api-reference\.html"[^>]*>API Reference</a>)',
                    re.IGNORECASE
                )
                
                # Insert compliance into Docs dropdown after deployment-scenarios
                docs_pattern = re.compile(
                    r'(<a href="deployment-scenarios\.html"[^>]*>Deployment Scenarios</a>)',
                    re.IGNORECASE
                )
                
                original_content = content
                
                if 'mechanical-engineering.html' not in content:
                    content = systems_pattern.sub(r'\1\n            <a href="mechanical-engineering.html">Mechanical & Buoyancy</a>', content)
                
                if 'qc-eval.html' not in content:
                    content = data_pattern.sub(r'\1\n            <a href="qc-eval.html">Data Quality (QARTOD)</a>', content)
                    
                if 'proof-lab.html' not in content:
                    content = proof_lab_pattern.sub(r'\1\n            <a href="proof-lab.html">Proof Lab Output</a>', content)
                
                if 'compliance.html' not in content:
                    content = docs_pattern.sub(r'\1\n            <a href="compliance.html">Legal & Compliance</a>', content)

                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Updated nav in {file}")

if __name__ == "__main__":
    update_nav(".")
    print("Done.")
