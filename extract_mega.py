import subprocess

def search_history():
    result = subprocess.run(['git', 'log', '-p', '-G', 'Arduino Mega'], capture_output=True, text=True, encoding='utf-8', errors='ignore')
    with open('extracted_mega.txt', 'w', encoding='utf-8') as f:
        f.write(result.stdout[:20000])  # Write first 20k chars
    print("Done")

search_history()
