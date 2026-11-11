from PIL import Image, ImageDraw, ImageFont
import math

def get_fonts():
    try:
        font_header = ImageFont.truetype('segoeuib.ttf', 20)
        font_badge = ImageFont.truetype('segoeuib.ttf', 13)
        font_title = ImageFont.truetype('segoeuib.ttf', 16)
        font_sub = ImageFont.truetype('segoeui.ttf', 14)
        font_code = ImageFont.truetype('consola.ttf', 13)
        font_hero = ImageFont.truetype('segoeuib.ttf', 28)
    except Exception:
        font_header = ImageFont.load_default()
        font_badge = font_header
        font_title = font_header
        font_sub = font_header
        font_code = font_header
        font_hero = font_header
    return font_header, font_badge, font_title, font_sub, font_code, font_hero

def draw_canvas(w=800, h=450, title="ARCHITECTURE", tag="SPECIFICATION"):
    img = Image.new('RGB', (w, h), (14, 16, 20))
    d = ImageDraw.Draw(img)
    fh, fb, ft, fs, fc, fhero = get_fonts()
    
    # Subtle background grid
    for x in range(0, w, 40):
        d.line([(x, 0), (x, h)], fill=(24, 27, 34), width=1)
    for y in range(0, h, 40):
        d.line([(0, y), (w, y)], fill=(24, 27, 34), width=1)
        
    # Outer frame
    d.rounded_rectangle([12, 12, w-12, h-12], radius=8, outline=(40, 45, 56), width=1)
    
    # Header bar
    d.rectangle([13, 13, w-13, 56], fill=(20, 23, 30))
    d.line([(13, 56), (w-13, 56)], fill=(40, 45, 56), width=1)
    d.text((28, 23), title, fill=(235, 240, 245), font=fh)
    
    # Tag badge
    tag_bbox = d.textbbox((0, 0), tag, font=fb)
    tw = tag_bbox[2] - tag_bbox[0]
    bx = w - 36 - tw
    d.rounded_rectangle([bx - 8, 20, w - 24, 46], radius=4, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
    d.text((bx, 25), tag, fill=(56, 189, 248), font=fb)
    
    return img, d, (fh, fb, ft, fs, fc, fhero)

def draw_arrow(d, p1, p2, color=(56, 189, 248), width=3):
    x1, y1 = p1
    x2, y2 = p2
    d.line([p1, p2], fill=color, width=width)
    # Arrowhead
    d.polygon([(x2, y2), (x2 - 10, y2 - 6), (x2 - 10, y2 + 6)], fill=color)

# 1. autonav-pipeline.png
def make_autonav():
    w, h = 800, 450
    img, d, fonts = draw_canvas(w, h, "AUTONAV-BASELINE // SENSOR-TO-POSE PIPELINE", "10HZ FEASIBILITY")
    fh, fb, ft, fs, fc, fhero = fonts
    
    # 3 Large Cards
    card_w = 216
    cards = [
        ("STAGE 1", "Point Cloud Input", ["Ouster OS1-64 LiDAR", "28,400 raw pts / frame", "Range clip & voxel filter"], (56, 189, 248)),
        ("STAGE 2", "ICP Registration", ["KD-Tree nearest match", "Cross-covariance H", "SVD closed-form (R, t)"], (74, 222, 128)),
        ("STAGE 3", "6-DoF Odometry", ["Accumulated pose path", "100ms cycle budget", "35 passing unit tests"], (251, 191, 36)),
    ]
    
    for i, (stage, name, bullets, col) in enumerate(cards):
        cx = 32 + i * 252
        cy = 82
        cw = card_w
        ch = 324
        
        # Card body
        d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=8, fill=(20, 24, 32), outline=(45, 52, 66), width=1)
        # Card header pill
        d.rounded_rectangle([cx + 16, cy + 18, cx + cw - 16, cy + 52], radius=6, fill=(26, 32, 44), outline=col, width=1)
        d.text((cx + 26, cy + 24), stage, fill=col, font=fb)
        d.text((cx + 16, cy + 68), name, fill=(240, 245, 250), font=ft)
        
        # Mini graphic in card center
        gy = cy + 110
        gh = 96
        d.rounded_rectangle([cx + 16, gy, cx + cw - 16, gy + gh], radius=6, fill=(14, 17, 23), outline=(35, 40, 52), width=1)
        
        if i == 0:
            # 3D points graphic
            for px, py in [(45, 25), (75, 45), (110, 30), (145, 55), (60, 75), (130, 80), (95, 60), (160, 35)]:
                d.ellipse([cx + 16 + px - 3, gy + py - 3, cx + 16 + px + 3, gy + py + 3], fill=(56, 189, 248))
            d.text((cx + 30, gy + gh - 22), "raw sensor points", fill=(120, 130, 145), font=fc)
        elif i == 1:
            # Coordinate frame axes
            ox, oy = cx + 16 + 92, gy + 52
            d.line([(ox, oy), (ox + 45, oy)], fill=(248, 113, 113), width=2) # X
            d.line([(ox, oy), (ox, oy - 35)], fill=(74, 222, 128), width=2) # Y
            d.line([(ox, oy), (ox - 25, oy + 25)], fill=(96, 165, 250), width=2) # Z
            d.text((cx + 36, gy + gh - 22), "R * p + t", fill=(74, 222, 128), font=fc)
        else:
            # Trajectory line
            points = [(cx + 30, gy + 70), (cx + 65, gy + 45), (cx + 105, gy + 55), (cx + 145, gy + 25), (cx + 175, gy + 35)]
            d.line(points, fill=(251, 191, 36), width=2)
            for pt in points:
                d.ellipse([pt[0]-3, pt[1]-3, pt[0]+3, pt[1]+3], fill=(251, 191, 36))
            d.text((cx + 32, gy + gh - 22), "P95 < 100ms", fill=(251, 191, 36), font=fc)
            
        # Bullets
        by = gy + gh + 18
        for b in bullets:
            d.text((cx + 20, by), f"• {b}", fill=(185, 195, 205), font=fs)
            by += 24
            
        # Connecting arrow to next card
        if i < 2:
            ax1 = cx + cw + 4
            ax2 = cx + cw + 32
            ay = cy + 158
            draw_arrow(d, (ax1, ay), (ax2, ay), color=(90, 105, 130), width=2)

    img.save('Jey.com/public/projects/autonav-pipeline.png', 'PNG')
    print('Generated clean autonav-pipeline.png')

# 2. forgeshell-terminal.png
def make_forgeshell():
    w, h = 800, 450
    img, d, fonts = draw_canvas(w, h, "FORGESHELL // UNIX PROCESS & PIPELINE ARCHITECTURE", "POSIX C99")
    fh, fb, ft, fs, fc, fhero = fonts
    
    card_w = 216
    cards = [
        ("MODULE 1", "REPL & AST Parser", ["Command tokenization", "Quote escaping & $VAR", "Pipeline AST creation"], (56, 189, 248)),
        ("MODULE 2", "Process Engine", ["fork() + execvp()", "File descriptors: dup2()", "tcsetpgrp() job control"], (74, 222, 128)),
        ("MODULE 3", "Linux /proc Monitor", ["/proc/[pid]/stat parser", "comm token isolation ()", "inspect & monitor builtins"], (251, 191, 36)),
    ]
    
    for i, (mod, name, bullets, col) in enumerate(cards):
        cx = 32 + i * 252
        cy = 82
        cw = card_w
        ch = 324
        
        d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=8, fill=(20, 24, 32), outline=(45, 52, 66), width=1)
        d.rounded_rectangle([cx + 16, cy + 18, cx + cw - 16, cy + 52], radius=6, fill=(26, 32, 44), outline=col, width=1)
        d.text((cx + 26, cy + 24), mod, fill=col, font=fb)
        d.text((cx + 16, cy + 68), name, fill=(240, 245, 250), font=ft)
        
        # Center visual box
        gy = cy + 110
        gh = 96
        d.rounded_rectangle([cx + 16, gy, cx + cw - 16, gy + gh], radius=6, fill=(14, 17, 23), outline=(35, 40, 52), width=1)
        
        if i == 0:
            d.text((cx + 26, gy + 22), "$ cat access.log |", fill=(210, 220, 230), font=fc)
            d.text((cx + 26, gy + 42), "  grep 404 | wc -l", fill=(56, 189, 248), font=fc)
            d.text((cx + 26, gy + 68), "[AST: 3 nodes, 2 pipes]", fill=(120, 130, 145), font=fc)
        elif i == 1:
            d.rounded_rectangle([cx + 26, gy + 16, cx + 100, gy + 48], radius=4, fill=(24, 30, 42), outline=(74, 222, 128), width=1)
            d.text((cx + 34, gy + 24), "PID: 101", fill=(74, 222, 128), font=fc)
            d.rounded_rectangle([cx + 110, gy + 16, cx + 184, gy + 48], radius=4, fill=(24, 30, 42), outline=(56, 189, 248), width=1)
            d.text((cx + 118, gy + 24), "PID: 102", fill=(56, 189, 248), font=fc)
            d.line([(cx + 100, gy + 32), (cx + 110, gy + 32)], fill=(240, 245, 250), width=2)
            d.text((cx + 34, gy + 68), "pipe(fd) + dup2()", fill=(120, 130, 145), font=fc)
        else:
            d.text((cx + 26, gy + 18), "CPU: 42.1% [40 ticks]", fill=(251, 191, 36), font=fc)
            d.text((cx + 26, gy + 38), "State: S (sleeping)", fill=(180, 190, 200), font=fc)
            d.text((cx + 26, gy + 68), "sysconf(_SC_CLK_TCK)", fill=(120, 130, 145), font=fc)
            
        by = gy + gh + 18
        for b in bullets:
            d.text((cx + 20, by), f"• {b}", fill=(185, 195, 205), font=fs)
            by += 24
            
        if i < 2:
            draw_arrow(d, (cx + cw + 4, cy + 158), (cx + cw + 32, cy + 158), color=(90, 105, 130), width=2)

    img.save('Jey.com/public/projects/forgeshell-terminal.png', 'PNG')
    print('Generated clean forgeshell-terminal.png')

# 3. batcave-cloud.png
def make_batcave():
    w, h = 800, 450
    img, d, fonts = draw_canvas(w, h, "BATCAVE_CLOUD // SELF-HOSTED PERSONAL SERVER", "RELEASE v0.5.1")
    fh, fb, ft, fs, fc, fhero = fonts
    
    card_w = 216
    cards = [
        ("LAYER 1", "Hardware Node", ["Galaxy Tab S6 Lite", "Exynos 9611 64-bit ARM", "Termux + OpenSSH LAN"], (56, 189, 248)),
        ("LAYER 2", "Backend & Storage", ["Python 3 + Flask WSGI", "Blueprint modular routes", "SQLite3 transactional db"], (74, 222, 128)),
        ("LAYER 3", "Security & Tests", ["Path traversal boundary jail", "compare_digest() CSRF", "65 passing pytest tests"], (251, 191, 36)),
    ]
    
    for i, (layer, name, bullets, col) in enumerate(cards):
        cx = 32 + i * 252
        cy = 82
        cw = card_w
        ch = 324
        
        d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=8, fill=(20, 24, 32), outline=(45, 52, 66), width=1)
        d.rounded_rectangle([cx + 16, cy + 18, cx + cw - 16, cy + 52], radius=6, fill=(26, 32, 44), outline=col, width=1)
        d.text((cx + 26, cy + 24), layer, fill=col, font=fb)
        d.text((cx + 16, cy + 68), name, fill=(240, 245, 250), font=ft)
        
        gy = cy + 110
        gh = 96
        d.rounded_rectangle([cx + 16, gy, cx + cw - 16, gy + gh], radius=6, fill=(14, 17, 23), outline=(35, 40, 52), width=1)
        
        if i == 0:
            d.rounded_rectangle([cx + 42, gy + 16, cx + cw - 42, gy + 74], radius=6, outline=(56, 189, 248), width=2)
            d.text((cx + 56, gy + 36), "ARM64 SOC", fill=(56, 189, 248), font=fc)
            d.text((cx + 46, gy + gh - 16), "battery-backed node", fill=(120, 130, 145), font=fc)
        elif i == 1:
            d.text((cx + 26, gy + 22), "GET /api/storage", fill=(74, 222, 128), font=fc)
            d.text((cx + 26, gy + 42), "DB: SQLite3 ACID", fill=(210, 220, 230), font=fc)
            d.text((cx + 26, gy + 68), "Pillow thumb engine", fill=(120, 130, 145), font=fc)
        else:
            d.text((cx + 26, gy + 20), "relative_to(root)", fill=(251, 191, 36), font=fc)
            d.text((cx + 26, gy + 40), "-> sandbox valid", fill=(74, 222, 128), font=fc)
            d.text((cx + 26, gy + 68), "tests: 65 passing", fill=(120, 130, 145), font=fc)
            
        by = gy + gh + 18
        for b in bullets:
            d.text((cx + 20, by), f"• {b}", fill=(185, 195, 205), font=fs)
            by += 24
            
        if i < 2:
            draw_arrow(d, (cx + cw + 4, cy + 158), (cx + cw + 32, cy + 158), color=(90, 105, 130), width=2)

    img.save('Jey.com/public/projects/batcave-cloud.png', 'PNG')
    print('Generated clean batcave-cloud.png')

# 4. robo-soccerbot.png
def make_soccerbot():
    w, h = 800, 450
    img, d, fonts = draw_canvas(w, h, "ROBO SOCCERBOT // 4WD DIFFERENTIAL CHASSIS", "HARDWARE & RF")
    fh, fb, ft, fs, fc, fhero = fonts
    
    # Left: Subsystems, Right: Chassis Diagram
    left_w = 400
    d.rounded_rectangle([32, 82, left_w, 406], radius=8, fill=(20, 24, 32), outline=(45, 52, 66), width=1)
    d.text((52, 104), "ELECTRICAL & CONTROL BUS", fill=(56, 189, 248), font=ft)
    
    bus_items = [
        ("RF Receiver", "FlySky FS-iA6B 2.4GHz (PWM decode)", (56, 189, 248)),
        ("Microcontroller", "ATmega328P MCU with deadband filtering", (74, 222, 128)),
        ("Motor Drivers", "Dual BTS7960 43A high-current H-bridges", (251, 191, 36)),
        ("Actuators", "4x High-torque DC motors (300 RPM)", (248, 113, 113)),
        ("Power Topology", "3S 11.1V LiPo battery with star ground", (192, 132, 252)),
    ]
    
    by = 142
    for title_sub, desc, col in bus_items:
        d.rounded_rectangle([52, by, left_w - 20, by + 44], radius=6, fill=(14, 17, 23), outline=(35, 40, 52), width=1)
        d.text((64, by + 6), title_sub, fill=col, font=fb)
        d.text((64, by + 24), desc, fill=(175, 185, 195), font=fs)
        by += 50

    # Right: Robot Physical Diagram
    rx1, rx2 = 428, 768
    d.rounded_rectangle([rx1, 82, rx2, 406], radius=8, fill=(20, 24, 32), outline=(45, 52, 66), width=1)
    d.text((450, 104), "4WD SKID-STEER CHASSIS", fill=(251, 191, 36), font=ft)
    
    # Draw top-down robot
    center_x = (rx1 + rx2) // 2
    center_y = 250
    rw, rh = 130, 170
    
    # Chassis body
    d.rounded_rectangle([center_x - rw//2, center_y - rh//2, center_x + rw//2, center_y + rh//2], radius=10, fill=(28, 34, 46), outline=(90, 105, 130), width=2)
    
    # 4 Wheels
    ww, wh = 20, 48
    # Front Left
    d.rounded_rectangle([center_x - rw//2 - ww, center_y - rh//2 + 10, center_x - rw//2, center_y - rh//2 + 10 + wh], radius=4, fill=(56, 189, 248))
    # Rear Left
    d.rounded_rectangle([center_x - rw//2 - ww, center_y + rh//2 - 10 - wh, center_x - rw//2, center_y + rh//2 - 10], radius=4, fill=(56, 189, 248))
    # Front Right
    d.rounded_rectangle([center_x + rw//2, center_y - rh//2 + 10, center_x + rw//2 + ww, center_y - rh//2 + 10 + wh], radius=4, fill=(56, 189, 248))
    # Rear Right
    d.rounded_rectangle([center_x + rw//2, center_y + rh//2 - 10 - wh, center_x + rw//2 + ww, center_y + rh//2 - 10], radius=4, fill=(56, 189, 248))
    
    # Forward vector arrow
    d.line([(center_x, center_y - 20), (center_x, center_y - 120)], fill=(74, 222, 128), width=3)
    d.polygon([(center_x, center_y - 130), (center_x - 8, center_y - 116), (center_x + 8, center_y - 116)], fill=(74, 222, 128))
    d.text((center_x - 38, center_y - 10), "4WD CHASSIS", fill=(210, 220, 230), font=fb)
    d.text((center_x - 30, center_y + 12), "MCU Core", fill=(120, 130, 145), font=fs)
    d.text((center_x - 48, 380), "Differential Steering", fill=(175, 185, 195), font=fc)

    img.save('Jey.com/public/projects/robo-soccerbot.png', 'PNG')
    print('Generated clean robo-soccerbot.png')

# 5. ledgerlab.png
def make_ledgerlab():
    w, h = 800, 450
    img, d, fonts = draw_canvas(w, h, "LEDGERLAB // CRYPTOGRAPHIC CHAIN SIMULATOR", "INTERACTIVE LAB")
    fh, fb, ft, fs, fc, fhero = fonts
    
    card_w = 216
    cards = [
        ("BLOCK #1", "Genesis Block", "STATE: VALID (MINED)", (74, 222, 128), "000000000000", "0000a4b7f92e"),
        ("BLOCK #2", "Tampered Block", "STATE: HASH MISMATCH", (248, 113, 113), "0000a4b7f92e", "7f89b1c8e401"),
        ("BLOCK #3", "Orphaned Block", "STATE: CHAIN BROKEN", (248, 113, 113), "7f89b1c8e401", "3b190c4e12a8"),
    ]
    
    for i, (bnum, name, state, col, prev_h, curr_h) in enumerate(cards):
        cx = 32 + i * 252
        cy = 82
        cw = card_w
        ch = 324
        
        d.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=8, fill=(20, 24, 32), outline=(45, 52, 66), width=1)
        d.rounded_rectangle([cx + 16, cy + 18, cx + cw - 16, cy + 52], radius=6, fill=(26, 32, 44), outline=col, width=1)
        d.text((cx + 26, cy + 24), bnum, fill=col, font=fb)
        d.text((cx + 16, cy + 68), name, fill=(240, 245, 250), font=ft)
        
        gy = cy + 104
        gh = 130
        d.rounded_rectangle([cx + 16, gy, cx + cw - 16, gy + gh], radius=6, fill=(14, 17, 23), outline=(35, 40, 52), width=1)
        
        d.text((cx + 26, gy + 14), "Prev Hash:", fill=(130, 140, 155), font=fs)
        d.text((cx + 26, gy + 32), f"{prev_h}...", fill=(185, 195, 205), font=fc)
        
        d.text((cx + 26, gy + 58), "SHA-256 Digest:", fill=(130, 140, 155), font=fs)
        d.text((cx + 26, gy + 76), f"{curr_h}...", fill=col, font=fc)
        
        if i == 1:
            d.text((cx + 26, gy + 102), "Payload modified!", fill=(248, 113, 113), font=fc)
        elif i == 0:
            d.text((cx + 26, gy + 102), "Nonce: 14,829", fill=(56, 189, 248), font=fc)
        else:
            d.text((cx + 26, gy + 102), "Invalid pointer", fill=(248, 113, 113), font=fc)
            
        # Status pill at bottom
        d.rounded_rectangle([cx + 16, cy + 258, cx + cw - 16, cy + 298], radius=6, fill=(20, 24, 30), outline=col, width=1)
        d.text((cx + 24, cy + 270), state, fill=col, font=fb)
        
        if i < 2:
            draw_arrow(d, (cx + cw + 4, cy + 158), (cx + cw + 32, cy + 158), color=(90, 105, 130), width=2)

    img.save('Jey.com/public/projects/ledgerlab.png', 'PNG')
    print('Generated clean ledgerlab.png')

if __name__ == '__main__':
    make_autonav()
    make_forgeshell()
    make_batcave()
    make_soccerbot()
    make_ledgerlab()
