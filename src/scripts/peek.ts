// A small window that follows the cursor over project rows and shows the
// project's screenshot (or its key specs when there is no picture).

const peek = document.querySelector<HTMLElement>('[data-peek]');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (peek && fine) {
  const img = peek.querySelector<HTMLImageElement>('[data-peek-img]')!;
  const title = peek.querySelector<HTMLElement>('[data-peek-title]')!;
  const card = peek.querySelector<HTMLElement>('[data-peek-card]')!;

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let active = false;
  let raf = 0;
  let current: HTMLElement | null = null;

  const place = (cx: number, cy: number) => {
    const w = peek.offsetWidth;
    const h = peek.offsetHeight;
    let px = cx + 28;
    let py = cy + 22;
    if (px + w > innerWidth - 16) px = cx - w - 28;
    if (py + h > innerHeight - 16) py = cy - h - 22;
    tx = px;
    ty = py;
  };

  const loop = () => {
    const dx = tx - x;
    const dy = ty - y;
    x += dx * 0.15;
    y += dy * 0.15;
    const tilt = Math.max(-7, Math.min(7, dx * 0.05));
    const s = active ? 1 : 0.94;
    peek.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg) scale(${s})`;
    raf = active || Math.abs(dx) + Math.abs(dy) > 0.4 ? requestAnimationFrame(loop) : 0;
  };

  const fill = (el: HTMLElement) => {
    title.textContent = el.dataset.peekTitle ?? '';
    const src = el.dataset.peekImg;
    if (src) {
      img.src = src;
      card.classList.remove('on');
    } else {
      img.removeAttribute('src');
      const lines: string[] = JSON.parse(el.dataset.peekLines || '[]');
      card.replaceChildren();
      const b = document.createElement('b');
      b.textContent = el.dataset.peekTitle ?? '';
      card.append(b);
      for (const l of lines) {
        const s = document.createElement('span');
        s.textContent = l;
        card.append(s);
      }
      card.classList.add('on');
    }
  };

  document.addEventListener('pointerover', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-peek-title]');
    if (!el || el === current) return;
    const firstShow = !active;
    current = el;
    active = true;
    fill(el);
    place(e.clientX, e.clientY);
    if (firstShow) {
      x = tx;
      y = ty + 12;
    }
    peek.classList.add('on');
    if (!raf) raf = requestAnimationFrame(loop);
  });

  document.addEventListener('pointerout', (e) => {
    if (!current) return;
    const to = e.relatedTarget as Node | null;
    if (to && current.contains(to)) return;
    if (to && (to as Element).closest?.('[data-peek-title]')) return;
    current = null;
    active = false;
    peek.classList.remove('on');
  });

  document.addEventListener(
    'pointermove',
    (e) => {
      if (!active) return;
      place(e.clientX, e.clientY);
      if (!raf) raf = requestAnimationFrame(loop);
    },
    { passive: true },
  );

  addEventListener(
    'scroll',
    () => {
      if (!active) return;
      current = null;
      active = false;
      peek.classList.remove('on');
    },
    { passive: true },
  );
}
