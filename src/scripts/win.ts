// Writing opens in a window that unfolds out of the row you clicked.
// The post is fetched from its own page, so every piece also has a real URL.

const dlg = document.querySelector<HTMLDialogElement>('[data-win]');

if (dlg) {
  const frame = dlg.querySelector<HTMLElement>('[data-win-frame]')!;
  const body = dlg.querySelector<HTMLElement>('[data-win-body]')!;
  const titleEl = dlg.querySelector<HTMLElement>('[data-win-title]')!;
  const openEl = dlg.querySelector<HTMLAnchorElement>('[data-win-open]')!;
  const cache = new Map<string, Promise<string>>();
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  let origin: HTMLElement | null = null;
  let busy = false;
  let pushed = false;
  let pageTitle = document.title;

  const load = (href: string) => {
    let p = cache.get(href);
    if (!p) {
      p = fetch(href)
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.text();
        })
        .then((html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const art = doc.querySelector('[data-article]');
          if (!art) throw new Error('no article');
          return art.innerHTML;
        });
      p.catch(() => cache.delete(href));
      cache.set(href, p);
    }
    return p;
  };

  const flip = (from: DOMRect, to: DOMRect) =>
    `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${Math.max(from.height, 24) / to.height})`;

  async function open(link: HTMLAnchorElement) {
    if (busy || dlg!.open) return;
    busy = true;
    origin = link;
    const href = link.href;
    const title = link.dataset.winTitle ?? '';
    pageTitle = document.title;

    titleEl.textContent = title;
    openEl.href = href;
    body.innerHTML = '<p class="win-loading label">Opening…</p>';
    dlg!.showModal();
    requestAnimationFrame(() => dlg!.classList.add('open'));

    const content = load(href);

    if (!reduce()) {
      const to = frame.getBoundingClientRect();
      const from = link.getBoundingClientRect();
      await frame
        .animate(
          [
            { transform: flip(from, to), opacity: 0.35, borderRadius: '6px' },
            { transform: 'none', opacity: 1, borderRadius: '12px' },
          ],
          { duration: 620, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        )
        .finished.catch(() => {});
    }

    if (location.href !== href) {
      history.pushState({ win: href }, '', href);
      pushed = true;
    }
    document.title = title;

    try {
      body.innerHTML = await content;
      body.scrollTop = 0;
      if (!reduce()) {
        body.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      }
      body.focus({ preventScroll: true });
    } catch {
      location.href = href;
    } finally {
      busy = false;
    }
  }

  async function close(fromHistory = false) {
    if (!dlg!.open || busy) return;
    busy = true;
    dlg!.classList.remove('open');

    if (!reduce()) {
      const to = frame.getBoundingClientRect();
      const target = origin?.isConnected ? origin.getBoundingClientRect() : null;
      const visible = target && target.bottom > 0 && target.top < innerHeight;
      await frame
        .animate(
          visible
            ? [
                { transform: 'none', opacity: 1 },
                { transform: flip(target!, to), opacity: 0 },
              ]
            : [
                { transform: 'none', opacity: 1 },
                { transform: 'scale(0.96)', opacity: 0 },
              ],
          { duration: 420, easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)' },
        )
        .finished.catch(() => {});
    }

    dlg!.close();
    document.title = pageTitle;
    if (pushed && !fromHistory) history.back();
    pushed = false;
    busy = false;
    origin?.focus({ preventScroll: true });
  }

  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-win-link]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(link);
  });

  document.addEventListener('pointerenter', (e) => {
    const link = (e.target as Element).closest?.<HTMLAnchorElement>('a[data-win-link]');
    if (link) load(link.href).catch(() => {});
  }, true);

  dlg.querySelector('[data-win-close]')!.addEventListener('click', () => close());
  dlg.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) close();
  });
  addEventListener('popstate', () => {
    if (dlg.open) {
      pushed = false;
      close(true);
    }
  });
}
