from PIL import Image

def crop_bottom_text(image_path):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Step 1: Scan from bottom to top to find the text
    # A pixel is considered 'solid' if its alpha is > 0
    def row_has_content(y):
        for x in range(width):
            if pixels[x, y][3] > 0:
                return True
        return False

    # Start at the bottom, move up
    y = height - 1
    
    # 1. Skip bottom empty rows
    while y >= 0 and not row_has_content(y):
        y -= 1
        
    print(f"Bottom of text found at y={y}")
    
    # 2. Skip the text rows (content rows)
    while y >= 0 and row_has_content(y):
        y -= 1
        
    print(f"Gap found at y={y}")
    
    # 3. This y is the gap between the text and the main logo.
    # We will crop everything below this y.
    # To be safe, let's crop at y
    crop_box = (0, 0, width, y)
    
    cropped_img = img.crop(crop_box)
    
    # Let's do a final tight crop to remove any extra transparent borders
    final_bbox = cropped_img.getbbox()
    if final_bbox:
        cropped_img = cropped_img.crop(final_bbox)
        
    cropped_img.save(image_path, "PNG")
    print(f"Successfully cropped text and saved to {image_path}")

if __name__ == "__main__":
    logo_path = r"c:\Users\jdcap\Documents\OMEGA-website\aminalnam.github.io\assets\images\logo.png"
    crop_bottom_text(logo_path)
