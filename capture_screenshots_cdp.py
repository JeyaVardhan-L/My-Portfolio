import asyncio
import websockets
import json
import subprocess
import time
import urllib.request
import base64
import os

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"c:\Users\user\Downloads\Porfolio_Website\My-Portfolio\screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

targets = [
    ("01-desktop-homepage.png", "http://127.0.0.1:3000/", 1280, 1300, False),
    ("02-mobile-320px.png", "http://127.0.0.1:3000/", 320, 680, True),
    ("03-mobile-360px.png", "http://127.0.0.1:3000/", 360, 740, True),
    ("04-mobile-390px.png", "http://127.0.0.1:3000/", 390, 844, True),
    ("05-mobile-430px.png", "http://127.0.0.1:3000/", 430, 932, True),
    ("06-projects-index.png", "http://127.0.0.1:3000/projects", 1280, 1300, False),
    ("07-writings-index.png", "http://127.0.0.1:3000/blog", 1280, 1100, False),
    ("08-individual-project.png", "http://127.0.0.1:3000/projects/forgeshell", 1280, 1200, False),
    ("09-individual-article.png", "http://127.0.0.1:3000/blog/building-a-unix-shell-from-scratch", 1280, 1200, False),
]

cmd = [
    CHROME,
    "--headless=new",
    "--remote-debugging-port=9229",
    "--hide-scrollbars",
    "--disable-gpu",
    "--no-sandbox",
    "about:blank"
]

proc = subprocess.Popen(cmd)
time.sleep(2)

async def capture_all():
    tabs = json.loads(urllib.request.urlopen("http://127.0.0.1:9229/json").read())
    page_tab = [t for t in tabs if t["type"] == "page"][0]
    ws_url = page_tab["webSocketDebuggerUrl"]
    
    async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
        msg_id = 1
        
        async def call(method, params=None):
            nonlocal msg_id
            curr_id = msg_id
            msg_id += 1
            payload = {"id": curr_id, "method": method}
            if params:
                payload["params"] = params
            await ws.send(json.dumps(payload))
            while True:
                resp = json.loads(await ws.recv())
                if resp.get("id") == curr_id:
                    return resp.get("result", {})

        await call("Page.enable")
        
        for filename, url, width, height, is_mobile in targets:
            print(f"Capturing {filename} ({width}x{height}, mobile={is_mobile}) from {url}...")
            
            # Set viewport metrics
            await call("Emulation.setDeviceMetricsOverride", {
                "width": width,
                "height": height,
                "deviceScaleFactor": 1,
                "mobile": is_mobile
            })
            
            # Navigate
            await call("Page.navigate", {"url": url})
            
            # Wait for page load
            await asyncio.sleep(1.2)
            
            # Capture screenshot
            res = await call("Page.captureScreenshot", {"format": "png"})
            data = res.get("data")
            if data:
                out_path = os.path.join(OUTPUT_DIR, filename)
                with open(out_path, "wb") as f:
                    f.write(base64.b64decode(data))
                print(f"  -> SUCCESS: {filename} ({len(data)} b64 bytes)")
            else:
                print(f"  -> FAILED: {filename}")

try:
    asyncio.run(capture_all())
finally:
    proc.terminate()

print("All screenshots captured successfully via CDP.")

