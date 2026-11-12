import subprocess
import os
import time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"c:\Users\user\Downloads\Porfolio_Website\My-Portfolio\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

targets = [
    ("01-desktop-homepage.png", "http://127.0.0.1:3000/", 1280, 1300),
    ("02-mobile-320px.png", "http://127.0.0.1:3000/", 320, 680),
    ("03-mobile-360px.png", "http://127.0.0.1:3000/", 360, 740),
    ("04-mobile-390px.png", "http://127.0.0.1:3000/", 390, 844),
    ("05-mobile-430px.png", "http://127.0.0.1:3000/", 430, 932),
    ("06-projects-index.png", "http://127.0.0.1:3000/projects", 1280, 1300),
    ("07-writings-index.png", "http://127.0.0.1:3000/blog", 1280, 1100),
    ("08-individual-project.png", "http://127.0.0.1:3000/projects/forgeshell", 1280, 1200),
    ("09-individual-article.png", "http://127.0.0.1:3000/blog/building-a-unix-shell-from-scratch", 1280, 1200),
]

for filename, url, width, height in targets:
    out_path = os.path.join(OUTPUT_DIR, filename)
    cmd = [
        CHROME,
        "--headless=new",
        f"--screenshot={out_path}",
        f"--window-size={width},{height}",
        "--hide-scrollbars",
        "--disable-gpu",
        "--no-sandbox",
        url
    ]
    print(f"Capturing {filename} ({width}x{height}) from {url}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(out_path):
        size = os.path.getsize(out_path)
        print(f"  -> SUCCESS: {filename} ({size} bytes)")
    else:
        print(f"  -> FAILED: {res.stderr}")

print("Screenshot capture complete.")
