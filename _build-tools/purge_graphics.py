import os
import re

def remove_visual_anchors(directory):
    # This regex matches the exact <!-- VISUAL ANCHOR --> section we added
    anchor_pattern = re.compile(
        r'[\t ]*<!-- VISUAL ANCHOR -->\n[\t ]*<section class="section section-block"[^>]*>\n[\t ]*<img src="assets/images/[^"]+"[^>]*>\n[\t ]*</section>\n',
        re.MULTILINE
    )
    
    # This regex matches the bento box images we added to index.html
    bento_img_pattern = re.compile(
        r'[\t ]*<img src="assets/images/[^"]+" class="bento-bg-img"[^>]*>\n',
        re.MULTILINE
    )
    
    # Also remove any stray img tags for the buoys or gateways that might have been added directly
    stray_img_pattern = re.compile(
        r'[\t ]*<img src="assets/images/(buoy|gateway|architecture|portal_ui|janus_acoustic)\.png"[^>]*>\n',
        re.MULTILINE
    )

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                original_content = content
                content = anchor_pattern.sub('', content)
                content = bento_img_pattern.sub('', content)
                content = stray_img_pattern.sub('', content)

                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    print(f"Purged fake graphics from {file}")

if __name__ == "__main__":
    remove_visual_anchors(".")
    print("Done.")
