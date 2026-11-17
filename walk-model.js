/* The pavement is a safe horizontal lane; approach legs lead up to each prop. */
const WalkModel = (() => {
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  function ground(x, y) { return { x: clamp(x, 8, 94), y: clamp(y, 78, 94) }; }
  function route(from, to) {
    if (Math.abs(from.x - to.x) < 3) return [to];
    const lane = Math.max(82, from.y, to.y);
    return [{ x: from.x, y: lane }, { x: to.x, y: lane }, to].filter((p, i, a) => {
      const prev = i ? a[i - 1] : from;
      return Math.hypot(p.x - prev.x, p.y - prev.y) > .2;
    });
  }
  return { ground, route };
})();
if (typeof module !== 'undefined') module.exports = WalkModel;
