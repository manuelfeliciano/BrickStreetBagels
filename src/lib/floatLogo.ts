import type { Action } from 'svelte/action';

type FloatOptions = { active: boolean; reducedMotion: boolean };

/** A slow, rotating screensaver with soft collisions at the viewport edges. */
export const floatLogo: Action<HTMLElement, FloatOptions> = (node, options) => {
  const viewport = node.parentElement!;
  let frame = 0;
  let previousTime = 0;
  let width = 0;
  let height = 0;
  let viewportWidth = 0;
  let viewportHeight = 0;
  let x = 0;
  let y = 0;
  let velocityX = 76;
  let velocityY = 59;
  let angle = -7;
  let scaleX = 1;
  let scaleY = 1;

  function measure() {
    width = node.offsetWidth;
    height = node.offsetHeight;
    viewportWidth = viewport.clientWidth;
    viewportHeight = viewport.clientHeight;
  }

  function paint() {
    node.style.transform = `translate3d(${x - width / 2}px, ${y - height / 2}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
  }

  function animate(time: number) {
    const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
    previousTime = time;
    x += velocityX * delta;
    y += velocityY * delta;
    angle = (angle + 6 * delta) % 360;

    // Use the rotated logo's bounds so its corners stay inside the screen.
    const radians = angle * Math.PI / 180;
    const cosine = Math.abs(Math.cos(radians));
    const sine = Math.abs(Math.sin(radians));
    const halfWidth = (width * cosine + height * sine) / 2;
    const halfHeight = (width * sine + height * cosine) / 2;
    const minX = Math.min(16 + halfWidth, viewportWidth / 2);
    const minY = Math.min(16 + halfHeight, viewportHeight / 2);
    const maxX = viewportWidth - minX;
    const maxY = viewportHeight - minY;
    const hitX = x < minX || x > maxX;
    const hitY = y < minY || y > maxY;

    if (hitX) {
      velocityX = x < minX ? Math.abs(velocityX) : -Math.abs(velocityX);
      x = Math.max(minX, Math.min(x, maxX));
    }
    if (hitY) {
      velocityY = y < minY ? Math.abs(velocityY) : -Math.abs(velocityY);
      y = Math.max(minY, Math.min(y, maxY));
    }

    if (hitX || hitY) {
      scaleX = hitX ? 0.84 : 1.08;
      scaleY = hitY ? 0.84 : 1.08;
    } else {
      const recovery = 1 - Math.exp(-12 * delta);
      scaleX += (1 - scaleX) * recovery;
      scaleY += (1 - scaleY) * recovery;
    }

    paint();
    frame = requestAnimationFrame(animate);
  }

  function start() {
    cancelAnimationFrame(frame);
    measure();
    x = viewportWidth / 2;
    y = viewportHeight / 2;
    angle = options.reducedMotion ? 0 : -7;
    scaleX = scaleY = 1;
    velocityX = 76;
    velocityY = 59;
    previousTime = 0;
    paint();
    if (options.active && !options.reducedMotion) frame = requestAnimationFrame(animate);
  }

  const observer = new ResizeObserver(() => {
    measure();
    if (options.reducedMotion) start();
  });
  observer.observe(viewport);
  observer.observe(node);
  start();

  return {
    update(next) {
      const shouldRestart = next.active && (!options.active || next.reducedMotion !== options.reducedMotion);
      options = next;
      if (shouldRestart) start();
      else if (!options.active) cancelAnimationFrame(frame);
    },
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
    }
  };
};
