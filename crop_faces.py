from PIL import Image, ImageChops

def find_faces(image_path):
    img = Image.open(image_path)
    img = img.convert("L")  # Convert to grayscale
    
    # Let's try to project the pixels onto X and Y axes to find gaps
    # E-ink is mostly white or black. Let's assume the background is white (255).
    # We will invert so background is 0, ink is >0
    import PIL.ImageOps
    inverted = PIL.ImageOps.invert(img)
    
    bbox = inverted.getbbox()
    print("Content bounding box:", bbox)
    
    # We will crop to the content bbox first
    if bbox:
        img = img.crop(bbox)
        inverted = inverted.crop(bbox)
    
    width, height = img.size
    
    # Calculate row sums and col sums to find gaps
    row_sums = [sum(inverted.getpixel((x, y)) for x in range(width)) for y in range(height)]
    col_sums = [sum(inverted.getpixel((x, y)) for y in range(height)) for x in range(width)]
    
    # Find gaps in Y
    y_gaps = []
    in_gap = True
    gap_start = 0
    y_ranges = []
    
    for y, s in enumerate(row_sums):
        if s == 0 and not in_gap:
            in_gap = True
            gap_start = y
        elif s > 0 and in_gap:
            in_gap = False
            y_gaps.append((gap_start, y))
            y_ranges.append(y) # Start of content
            
    # Do similar for X
    # Actually, a simpler way: just split the image evenly if we know the size.
    # What's the size of the gaps?
    print("Y ranges start at:", y_ranges[:10])
    
    # Let's save a test crop of 250x122 at 0,0 and see if it's right?
    # No, let's just find the first face bounding box.
    # We can use connected components or just find the first block of non-zero pixels.
    # Let's just output the row_sums and col_sums gap sizes to infer the grid.
    
    y_content_starts = []
    in_content = False
    start = 0
    for y, s in enumerate(row_sums):
        if s > 0 and not in_content:
            in_content = True
            start = y
        elif s == 0 and in_content:
            in_content = False
            y_content_starts.append((start, y))
            
    x_content_starts = []
    in_content = False
    start = 0
    for x, s in enumerate(col_sums):
        if s > 0 and not in_content:
            in_content = True
            start = x
        elif s == 0 and in_content:
            in_content = False
            x_content_starts.append((start, x))
            
    print("X content blocks:", x_content_starts[:5])
    print("Y content blocks:", y_content_starts[:5])

find_faces("images/visual-timer/visual-clock_all-faces-contact-sheet.png")
