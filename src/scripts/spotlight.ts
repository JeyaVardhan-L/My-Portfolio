// A soft light that follows the pointer across the inspiration wall.

const room = document.querySelector<HTMLElement>('[data-spotlight]');

if (room) {
  let tx = innerWidth / 2;
  let ty = innerHeight * 0.4;
  let x = tx;
  let y = ty;
  let raf = 0;

  const set = () => {
    room.style.setProperty('--mx', `${x}px`);
    room.style.setProperty('--my', `${y}px`);
  };

  const tick = () => {
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    set();
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
  };

  const move = (e: PointerEvent) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  addEventListener('pointermove', move, { passive: true });
  addEventListener('pointerdown', move, { passive: true });
  set();
}
