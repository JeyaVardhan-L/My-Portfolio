export type Side = 'software' | 'hardware';

const root = document.documentElement;
const KEY = 'side';

export const getSide = (): Side => (root.dataset.side === 'hardware' ? 'hardware' : 'software');
export const otherSide = (): Side => (getSide() === 'hardware' ? 'software' : 'hardware');

// A cloud of ink with soft, billowing edges, like a drop spreading in water.
// It is the first of two mask layers on the incoming view; the second is a
// plain soft-edged disc that grows behind it so the screen always fills.
const INK = (() => {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
    "<defs><radialGradient id='g'><stop offset='0.4' stop-color='#000'/><stop offset='1' stop-color='#000' stop-opacity='0'/></radialGradient>" +
    "<filter id='f' x='-50%' y='-50%' width='200%' height='200%'>" +
    "<feTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='4' seed='7'/>" +
    "<feDisplacementMap in='SourceGraphic' scale='64' xChannelSelector='R' yChannelSelector='B'/>" +
    "<feGaussianBlur stdDeviation='1.6'/></filter></defs>" +
    "<g filter='url(#f)'>" +
    "<circle cx='100' cy='100' r='58' fill='url(#g)'/>" +
    "<ellipse cx='150' cy='68' rx='30' ry='16' fill='url(#g)'/>" +
    "<ellipse cx='56' cy='150' rx='20' ry='32' fill='url(#g)'/>" +
    "<ellipse cx='146' cy='152' rx='22' ry='14' fill='url(#g)'/>" +
    "<ellipse cx='52' cy='56' rx='16' ry='22' fill='url(#g)'/>" +
    '</g></svg>';
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

function syncUI() {
  const hw = getSide() === 'hardware';
  document.querySelectorAll('[data-side-switch]').forEach((b) => b.setAttribute('aria-checked', String(hw)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', hw ? '#07080c' : '#fcfbf8');
}

function apply(next: Side) {
  root.dataset.side = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  syncUI();
}

export function setSide(next: Side, origin?: { x: number; y: number }) {
  if (next === getSide()) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) {
    apply(next);
    return;
  }

  const w = innerWidth;
  const h = innerHeight;
  const x = origin?.x ?? w - 60;
  const y = origin?.y ?? 40;
  const far = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
  // the soft disc is solid out to 35% of its box, so 2.9x the farthest
  // distance covers the screen; the ink cloud runs ahead of it
  const disc = Math.ceil(far * 2.9);
  const ink = Math.ceil(disc * 1.3);

  const frame = (k: number, j: number) => {
    const s = ink * k;
    const d = disc * j;
    return {
      size: `${s}px ${s}px, ${d}px ${d}px`,
      pos: `${x - s / 2}px ${y - s / 2}px, ${x - d / 2}px ${y - d / 2}px`,
    };
  };
  const frames = [
    { offset: 0, ...frame(0, 0) },
    { offset: 0.55, ...frame(0.62, 0.34) },
    { offset: 1, ...frame(1, 1) },
  ].map((f) => ({
    offset: f.offset,
    maskSize: f.size,
    maskPosition: f.pos,
    webkitMaskSize: f.size,
    webkitMaskPosition: f.pos,
  }));

  root.style.setProperty('--ink-mask', INK);
  root.classList.add('inking');
  const t = document.startViewTransition(() => apply(next));

  t.ready
    .then(() => {
      root.animate(frames as unknown as Keyframe[], {
        duration: 1600,
        easing: 'cubic-bezier(0.3, 0.15, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
        fill: 'both',
      });
    })
    .catch(() => {});

  t.finished.finally(() => root.classList.remove('inking'));
}

const centre = (el: Element) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

document.addEventListener('click', (e) => {
  const target = e.target as Element | null;
  const toggle = target?.closest('[data-side-switch]');
  if (toggle) {
    setSide(otherSide(), centre(toggle));
    return;
  }
  const set = target?.closest<HTMLElement>('[data-side-set]');
  if (set) {
    const next = set.dataset.sideSet === 'hardware' ? 'hardware' : 'software';
    setSide(next, centre(set));
  }
});

// coming back through the history cache: pick up a switch made on another page
addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  try {
    const s = localStorage.getItem(KEY);
    if (s === 'hardware' || s === 'software') root.dataset.side = s;
  } catch {}
  syncUI();
});

syncUI();
