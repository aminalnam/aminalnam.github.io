import sys
import codecs

def read_log(file, out_f):
    try:
        with open(file, 'r', encoding='utf-16le') as f:
            lines = f.readlines()
    except:
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
            
    out_f.write(f"--- {file} ---\n")
    for i, line in enumerate(lines):
        if "arduino mega" in line.lower() or "alpha" in line.lower() or "bath" in line.lower():
            start = max(0, i-5)
            end = min(len(lines), i+30)
            out_f.write("".join(lines[start:end]))
            out_f.write("\n\n--- MATCH END ---\n\n")

with open('parsed_logs.txt', 'w', encoding='utf-8') as out:
    read_log('old_mega.txt', out)
    read_log('old_bath.txt', out)
