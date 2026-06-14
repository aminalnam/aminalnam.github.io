import sys
from PIL import Image

def remove_white_bg(input_path, output_path, threshold=220):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # If the pixel is close to white, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # We can also feather the alpha based on how close to white it is for smoother edges,
            # but a simple cutoff is a start. Let's do a smooth gradient.
            avg = sum(item[:3]) / 3
            if avg > 250:
                new_data.append((255, 255, 255, 0))
            else:
                # partial transparency for anti-aliasing
                alpha = int(255 - (avg - threshold) * (255 / (255 - threshold)))
                alpha = max(0, min(255, alpha))
                new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Let's crop the image to remove excess transparent borders
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved processed logo to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\jdcap\.gemini\antigravity-ide\brain\06c3eee1-da9b-4717-a66f-354caa2b35e3\media__1780287641440.jpg"
    output_file = r"c:\Users\jdcap\Documents\OMEGA-website\aminalnam.github.io\assets\images\logo.png"
    remove_white_bg(input_file, output_file, threshold=200)
