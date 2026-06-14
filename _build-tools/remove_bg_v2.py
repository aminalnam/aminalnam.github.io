import sys
from PIL import Image

def remove_bg_floodfill(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # We will do a BFS from the corners to find all background pixels
    # Background is assumed to be the color at (0,0)
    bg_color = img.getpixel((0,0))
    
    # To handle JPEG artifacts, we use a tolerance
    def is_similar(c1, c2):
        return abs(c1[0]-c2[0]) < tolerance and abs(c1[1]-c2[1]) < tolerance and abs(c1[2]-c2[2]) < tolerance

    visited = set()
    queue = [(0,0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    for start_node in queue:
        if start_node not in visited and is_similar(img.getpixel(start_node), bg_color):
            visited.add(start_node)
    
    # BFS
    head = 0
    while head < len(queue):
        x, y = queue[head]
        head += 1
        
        # Check neighbors
        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    if is_similar(img.getpixel((nx, ny)), bg_color):
                        visited.add((nx, ny))
                        queue.append((nx, ny))

    # Now we modify the image: set visited pixels to transparent
    # We also won't touch the color of ANY non-visited pixel (preserving the logo exactly)
    pixels = img.load()
    for x in range(width):
        for y in range(height):
            if (x, y) in visited:
                pixels[x, y] = (255, 255, 255, 0)

    # Let's crop the image to remove excess transparent borders
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img.save(output_path, "PNG")
    print(f"Saved processed logo to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\jdcap\.gemini\antigravity-ide\brain\06c3eee1-da9b-4717-a66f-354caa2b35e3\media__1780287641440.jpg"
    output_file = r"c:\Users\jdcap\Documents\OMEGA-website\aminalnam.github.io\assets\images\logo.png"
    remove_bg_floodfill(input_file, output_file, tolerance=40)
