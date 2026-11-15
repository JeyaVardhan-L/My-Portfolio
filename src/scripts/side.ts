export type Side = 'software' | 'hardware';

const root = document.documentElement;
const KEY = 'side';

export const getSide = (): Side => (root.dataset.side === 'hardware' ? 'hardware' : 'software');
export const otherSide = (): Side => (getSide() === 'hardware' ? 'software' : 'hardware');

// An ink blot with a ragged edge and a few drops around it. It is used as a
// mask on the incoming view, scaled up from the point where the switch was hit.
const INK = (() => {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
    "<filter id='f' x='-30%' y='-30%' width='160%' height='160%'>" +
    "<feTurbulence type='fractalNoise' baseFrequency='0.045' numOctaves='3' seed='11'/>" +
    "<feDisplacementMap in='SourceGraphic' scale='24' xChannelSelector='R' yChannelSelector='G'/>" +
    '</filter>' +
    "<g filter='url(#f)'>" +
    "<circle cx='100' cy='100' r='64'/>" +
    "<circle cx='166' cy='72' r='6'/><circle cx='36' cy='140' r='4.5'/>" +
    "<circle cx='152' cy='160' r='8'/><circle cx='52' cy='42' r='3.5'/><circle cx='178' cy='120' r='3'/>" +
    '</g></svg>';
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

function syncUI() {
  const hw = getSide() === 'hardware';
  document.querySelectorAll('[data-side-switch]').forEach((b) => b.setAttribute('aria-checked', String(hw)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', hw ? '#0b0b0a' : '#f7f6f2');
}

function apply(next: Side) {
  root.dataset.side = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  syncUI();
  document.dispatchEvent(new CustomEvent('sidechange', { detail: next }));
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
  // the blot's solid core is ~30% of the mask, so the mask must be ~3.6x the
  // distance to the farthest corner to cover the screen
  const far = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
  const size = Math.ceil(far * 3.7);

  root.style.setProperty('--ink-mask', INK);
  root.classList.add('inking');
  const t = document.startViewTransition(() => apply(next));

  t.ready
    .then(() => {
      const sizes = ['0px 0px', `${size}px ${size}px`];
      const positions = [`${x}px ${y}px`, `${x - size / 2}px ${y - size / 2}px`];
      root.animate(
        {
          maskSize: sizes,
          maskPosition: positions,
          webkitMaskSize: sizes,
          webkitMaskPosition: positions,
        } as unknown as PropertyIndexedKeyframes,
        {
          duration: 1250,
          easing: 'cubic-bezier(0.62, 0, 0.28, 1)',
          pseudoElement: '::view-transition-new(root)',
          fill: 'both',
        },
      );
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
