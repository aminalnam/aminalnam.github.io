import glob

def purge_cbor():
    html_files = glob.glob('*.html')
    
    count = 0
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        
        # Simple string replacements
        replacements = {
            'CBOR packet': 'Binary TLV packet',
            'CBOR payload': 'Binary TLV payload',
            'CBOR compression': 'TLV compression',
            'CBOR Encoding': 'TLV Encoding',
            'CBOR frames': 'TLV frames',
            'CBOR serialization': 'TLV serialization',
            'compress to CBOR': 'compress to TLV',
            'enqueue_cbor_payload': 'enqueue_tlv_payload',
            'CBOR vs JSON Compression': 'TLV vs JSON Compression',
            'CBOR Hex': 'TLV Hex',
            'lora_cbor_bridge.py': 'lora_tlv_bridge.py',
            'JSON/CBOR': 'JSON/TLV',
            'CBOR/Protobuf': 'TLV/Protobuf',
            'JSON/CBOR': 'JSON/TLV'
        }
        
        for old, new in replacements.items():
            if old in content:
                content = content.replace(old, new)
                modified = True

        if modified:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            
    print(f"Purged CBOR references in {count} HTML files.")

if __name__ == '__main__':
    purge_cbor()
