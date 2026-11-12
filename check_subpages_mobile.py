import asyncio
import websockets
import json
import subprocess
import time
import urllib.request
import base64
import os

targets = [
    ('10-mobile-320px-article.png', 'http://127.0.0.1:3000/blog/building-a-unix-shell-from-scratch'),
    ('11-mobile-320px-project.png', 'http://127.0.0.1:3000/projects/forgeshell')
]

cmd = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    '--headless=new',
    '--remote-debugging-port=9230',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
]
proc = subprocess.Popen(cmd)
time.sleep(2)

async def check():
    tabs = json.loads(urllib.request.urlopen('http://127.0.0.1:9230/json').read())
    page_tab = [t for t in tabs if t['type'] == 'page'][0]
    ws_url = page_tab['webSocketDebuggerUrl']
    async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
        msg_id = 1
        async def call(method, params=None):
            nonlocal msg_id
            cid = msg_id
            msg_id += 1
            p = {'id': cid, 'method': method}
            if params: p['params'] = params
            await ws.send(json.dumps(p))
            while True:
                r = json.loads(await ws.recv())
                if r.get('id') == cid: return r.get('result', {})

        await call('Page.enable')
        await call('Emulation.setDeviceMetricsOverride', {
            'width': 320, 'height': 680, 'deviceScaleFactor': 1, 'mobile': True
        })

        for fname, url in targets:
            await call('Page.navigate', {'url': url})
            await asyncio.sleep(1.2)
            eval_res = await call('Runtime.evaluate', {
                'expression': 'JSON.stringify({ inner: window.innerWidth, bodyScroll: document.body.scrollWidth })',
                'returnByValue': True
            })
            print(fname, 'Metrics:', eval_res.get('result', {}).get('value'))
            res = await call('Page.captureScreenshot', {'format': 'png'})
            with open(os.path.join('screenshots', fname), 'wb') as f:
                f.write(base64.b64decode(res.get('data')))
            print('  -> Saved', fname)

try:
    asyncio.run(check())
finally:
    proc.terminate()

