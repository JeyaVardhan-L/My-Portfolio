// The local clock in the footer, and SVG diagrams that only animate while on screen.

const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
if (clocks.length) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const tick = () => clocks.forEach((c) => (c.textContent = fmt.format(new Date())));
  tick();
  setInterval(tick, 15_000);
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const svgs = [...document.querySelectorAll<SVGSVGElement>('svg.anim')];
if (svgs.length) {
  const visible = new Set<Element>();
  const apply = () =>
    svgs.forEach((s) => (reduce.matches || !visible.has(s) ? s.pauseAnimations() : s.unpauseAnimations()));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    apply();
  });
  svgs.forEach((s) => io.observe(s));
  reduce.addEventListener('change', apply);
  apply();
}
