import os
import re

def update_nav(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                # Skip the files I just created with the correct nav
                if file in ["biofouling.html", "cloud-infrastructure.html", "machine-learning.html", "marine-operations.html", "calibration.html"]:
                    continue
                    
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Insert biofouling into Systems dropdown after mechanical-engineering
                sys_pattern = re.compile(r'(<a href="mechanical-engineering\.html"[^>]*>Mechanical & Buoyancy</a>)', re.IGNORECASE)
                # Insert cloud-infrastructure into Tools dropdown after bathymetry
                tools_pattern = re.compile(r'(<a href="bathymetry\.html"[^>]*>Bathymetry</a>)', re.IGNORECASE)
                # Insert machine-learning into Data dropdown after analytics
                data_ml_pattern = re.compile(r'(<a href="analytics\.html"[^>]*>Analytics Pipeline</a>)', re.IGNORECASE)
                # Insert calibration into Data dropdown after qc-eval
                data_cal_pattern = re.compile(r'(<a href="qc-eval\.html"[^>]*>Data Quality \(QARTOD\)</a>)', re.IGNORECASE)
                # Insert marine-operations into Docs dropdown after deployment-scenarios
                docs_pattern = re.compile(r'(<a href="deployment-scenarios\.html"[^>]*>Deployment Scenarios</a>)', re.IGNORECASE)
                
                original_content = content
                
                if 'biofouling.html' not in content:
                    content = sys_pattern.sub(r'\1\n            <a href="biofouling.html">Marine Biology (Fouling)</a>', content)
                
                if 'cloud-infrastructure.html' not in content:
                    content = tools_pattern.sub(r'\1\n            <a href="cloud-infrastructure.html">Cloud Infrastructure</a>', content)
                
                if 'machine-learning.html' not in content:
                    content = data_ml_pattern.sub(r'\1\n            <a href="machine-learning.html">Machine Learning</a>', content)
                
                if 'calibration.html' not in content:
                    content = data_cal_pattern.sub(r'\1\n            <a href="calibration.html">Sensor Calibration</a>', content)
                
                if 'marine-operations.html' not in content:
                    content = docs_pattern.sub(r'\1\n            <a href="marine-operations.html">Marine Operations</a>', content)

                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Updated nav in {file}")

if __name__ == "__main__":
    update_nav(".")
    print("Done.")
