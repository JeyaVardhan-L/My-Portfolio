import { otherSide, setSide } from './side';

type Item = { group: string; label: string; href?: string; action?: string; value?: string; hint?: string };

const pal = document.querySelector<HTMLDialogElement>('[data-pal]');
const dataEl = document.getElementById('pal-data');

if (pal && dataEl) {
  const items: Item[] = JSON.parse(dataEl.textContent || '[]');
  const input = pal.querySelector<HTMLInputElement>('[data-pal-input]')!;
  const list = pal.querySelector<HTMLUListElement>('[data-pal-list]')!;
  const note = pal.querySelector<HTMLElement>('[data-pal-note]')!;
  let shown: Item[] = [];
  let active = 0;

  const labelOf = (it: Item) => (it.action === 'switch' ? `Switch to the ${otherSide()} side` : it.label);

  const matches = (it: Item, q: string) => {
    const hay = `${labelOf(it)} ${it.group} ${it.hint ?? ''}`.toLowerCase();
    return q.split(/\s+/).every((w) => hay.includes(w));
  };

  const mark = () => {
    list.querySelectorAll('.pal-item').forEach((el) => {
      el.setAttribute('aria-selected', String(el.id === `pal-${active}`));
    });
    list.querySelector(`#pal-${active}`)?.scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', `pal-${active}`);
  };

  const render = () => {
    const q = input.value.trim().toLowerCase();
    shown = items.filter((it) => !q || matches(it, q));
    active = Math.min(active, Math.max(0, shown.length - 1));
    list.replaceChildren();
    if (!shown.length) {
      const li = document.createElement('li');
      li.className = 'pal-empty';
      li.textContent = 'Nothing matches that.';
      list.append(li);
      return;
    }
    let group = '';
    shown.forEach((it, i) => {
      if (it.group !== group) {
        group = it.group;
        const h = document.createElement('li');
        h.className = 'pal-group label';
        h.setAttribute('role', 'presentation');
        h.textContent = group;
        list.append(h);
      }
      const li = document.createElement('li');
      li.className = 'pal-item';
      li.id = `pal-${i}`;
      li.setAttribute('role', 'option');
      li.textContent = labelOf(it);
      if (it.hint) {
        const s = document.createElement('span');
        s.className = 'label';
        s.textContent = it.hint;
        li.append(s);
      }
      li.addEventListener('click', () => run(it));
      li.addEventListener('pointermove', () => {
        if (active !== i) {
          active = i;
          mark();
        }
      });
      list.append(li);
    });
    mark();
  };

  const open = () => {
    if (pal.open) return;
    input.value = '';
    note.textContent = '';
    active = 0;
    render();
    pal.showModal();
    input.focus();
  };

  const run = (it: Item) => {
    if (it.action === 'switch') {
      pal.close();
      requestAnimationFrame(() => setSide(otherSide()));
      return;
    }
    if (it.action === 'copy' && it.value) {
      navigator.clipboard?.writeText(it.value).then(() => (note.textContent = 'Copied'));
      return;
    }
    if (it.href) {
      pal.close();
      if (/^https?:/.test(it.href) && !it.href.startsWith(location.origin)) window.open(it.href, '_blank', 'noopener');
      else location.href = it.href;
    }
  };

  input.addEventListener('input', () => {
    active = 0;
    render();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active = Math.min(active + 1, shown.length - 1);
      mark();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active = Math.max(active - 1, 0);
      mark();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const it = shown[active];
      if (it) run(it);
    }
  });

  pal.addEventListener('click', (e) => {
    if (e.target === pal) pal.close();
  });

  document.addEventListener('click', (e) => {
    if ((e.target as Element).closest('[data-palette-open]')) open();
  });

  document.addEventListener('keydown', (e) => {
    const typing = (e.target as HTMLElement).closest?.('input, textarea, [contenteditable]');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (pal.open) pal.close();
      else open();
    } else if (e.key === '/' && !typing && !document.querySelector('dialog[open]')) {
      e.preventDefault();
      open();
    }
  });
}
