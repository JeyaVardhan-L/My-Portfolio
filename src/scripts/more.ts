// "See more" buttons: expand or collapse the list they control.

document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-more]');
  if (!btn) return;
  const target = document.getElementById(btn.dataset.more ?? '');
  if (!target) return;
  const open = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(open));
  target.classList.toggle('open', open);
});
