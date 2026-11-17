/* Whole-game character choreography. Callbacks belong to one cancellable trip. */
const WalkScene = (() => {
  const world = document.getElementById('sceneWorld');
  const layer = document.getElementById('actorLayer');
  const status = document.getElementById('walkStatus');
  const marker = document.getElementById('walkMarker');
  const reveal = document.getElementById('revealObjects');

  const actors = {};
  let mounted = false, mountedScene = null, frame = 0, timeout = 0, ticket = 0, job = null, locked = false;
  function sceneKey() { return state.phase === 'case' ? ['daycare','charity','seniors'][state.activeCaseIndex] : state.phase; }
  function enabled() { return Boolean(WalkScenes[sceneKey()]); }
  function blocked() { return !enabled() || locked || getActiveDialog() || CaseCinema.active || !document.getElementById('caseTransition').classList.contains('hidden'); }
  function sprite(actor, pose) {
    actor.el.style.setProperty('--col', `${(pose % 4) * 100 / 3}%`);
    actor.el.style.setProperty('--row', pose < 4 ? '0%' : '100%');
  }
  function paint(actor) {
    actor.el.style.left = `${actor.x}%`; actor.el.style.top = `${actor.y}%`;
    actor.el.style.setProperty('--depth', .86 + (actor.y - 70) * .009);
    actor.el.style.setProperty('--facing', actor.facing);
    actor.el.style.zIndex = Math.round(actor.y);
  }
  function cancel() {
    ticket++; cancelAnimationFrame(frame); clearTimeout(timeout);
    job = null; locked = false;
    layer.classList.remove('scanning-scene', 'auditing-scene'); marker.hidden = true;
    Object.values(actors).forEach(a => { sprite(a,4); a.el.classList.remove('walking'); });
    status.textContent = status.dataset.idleMessage || 'Click a person or object. Double-click to hurry.';
  }
  function render() {
    const key = sceneKey();
    world.classList.toggle('walkable', enabled());
    world.dataset.walkScene = key;
    if (mountedScene !== key) { cancel(); mounted=false; layer.replaceChildren(); mountedScene=key; }
    if (!enabled()) { if (mounted) cancel(); mounted = false; layer.replaceChildren(); return; }
    if (!mounted) {
      mounted = true;
      for (const [id,x,y] of [['nik',22,88],['david',36,91]]) {
        const el = document.createElement('div'); el.className = `scene-actor actor-${id}`;
        el.setAttribute('aria-hidden','true'); el.innerHTML = '<div class="actor-shadow"></div><div class="actor-sprite"></div><span class="actor-name"></span>';
        el.querySelector('span').textContent = id === 'nik' ? 'Nik' : 'David';
        layer.appendChild(el); actors[id] = {el,x,y,facing:1}; sprite(actors[id],4); paint(actors[id]);
      }
      const beam = document.createElement('div'); beam.className = 'scene-scan-beam'; layer.appendChild(beam);
    }
    Object.entries(actors).forEach(([id,a]) => a.el.classList.toggle('selected',id === state.firstCase.agent));
    world.querySelectorAll('[data-item-id]').forEach(el => {
      const t = WalkScenes[key][el.dataset.itemId]; if (!t) return;
      el.style.left = `${t[0]}%`; el.style.top = `${t[1]}%`;
      el.style.width = `${t[4]}%`; el.style.height = `${t[5]}%`;
    });
    for (const role of ['owner','witness']) {
      const npc = world.querySelector(`.npc-${role}`); if (!npc) continue;
      const t = WalkScenes[key][role]; if (!t) continue; npc.style.left = `${key === 'daycare' && role === 'owner' && state.firstCase.distracted ? 85 : t[0]}%`; npc.style.top = `${t[1]}%`;
    }
  }
  function travel(to, label, done, hurry = false, pose = 5, faceX = to.x) {
    if (blocked()) return;
    cancel(); const id = ticket, startScene = sceneKey(), actor = actors[state.firstCase.agent];
    if (!actor) { done?.(); return; }
    const path = WalkModel.route(actor,to);
    job = { hurry }; status.textContent = `${state.firstCase.agent === 'nik' ? 'Nik' : 'David'} → ${label}`;
    marker.style.left = `${to.x}%`; marker.style.top = `${to.y}%`; marker.hidden = false;
    actor.el.classList.add('walking');
    let previous = performance.now(), walked = 0;
    function arrive() {
      actor.el.classList.remove('walking'); marker.hidden = true;
      if (Math.abs(faceX - actor.x) > .1) actor.facing = faceX >= actor.x ? 1 : -1;
      paint(actor); sprite(actor,done ? pose : 4);
      status.textContent = done ? `${pose === 7 ? 'Talking to' : 'Examining'} ${label}…` : status.dataset.idleMessage;
      timeout = setTimeout(() => {
        if (id !== ticket || startScene !== sceneKey() || !enabled() || getActiveDialog() || CaseCinema.active) { cancel(); return; }
        sprite(actor,4); job = null; done?.();
      }, reducedMotion.matches || !done ? 0 : 420);
    }
    function tick(now) {
      if (id !== ticket) return;
      if (startScene !== sceneKey() || !enabled() || getActiveDialog() || CaseCinema.active) { cancel(); return; }
      let distance = Math.min((now-previous)/1000,.05) * (job.hurry ? 55 : 29); previous = now;
      if (reducedMotion.matches) distance = 1000;
      while (path.length && distance > 0) {
        const p = path[0], dx = p.x-actor.x, dy = (p.y-actor.y)*.5625, length = Math.hypot(dx,dy);
        if (Math.abs(dx) > .1) actor.facing = dx > 0 ? 1 : -1;
        const step = Math.min(distance,length), ratio = length ? step/length : 1;
        actor.x += dx*ratio; actor.y += (p.y-actor.y)*ratio; walked += step; distance -= step;
        if (length <= step + .001) path.shift();
      }
      paint(actor); sprite(actor,Math.floor(walked/2.1)%4);
      if (!path.length) arrive(); else frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  function approach(id, done, hurry) {
    if (!enabled()) { done(); return; }
    const key = sceneKey(), t = WalkScenes[key][id]; if (!t) { done(); return; }
    const movedOwner = key === 'daycare' && id === 'owner' && state.firstCase.distracted;
    travel({x:movedOwner ? 77:t[2],y:t[3]},t[6],done,hurry,id === 'owner' || id === 'witness' ? 7:5,movedOwner?85:t[0]);
  }
  function scan(done, effect = 'scanning-scene') {
    cancel(); locked = true; const id = ticket, startScene = sceneKey();
    const david = actors.david; sprite(david,6); david.facing=1; paint(david);
    layer.classList.add(effect); status.textContent = effect === 'scanning-scene' ? 'David · ultraviolet scan in progress…' : 'David · cross-checking the records…';
    timeout = setTimeout(() => {
      if (id !== ticket || startScene !== sceneKey() || !enabled()) { cancel(); return; }
      locked = false; layer.classList.remove('scanning-scene', 'auditing-scene'); sprite(david,4);
      status.textContent = 'Records checked. Ready to file the evidence.'; done();
    }, reducedMotion.matches ? 0 : 1700);
  }
  world.addEventListener('click', event => {
    if (event.target.closest('button') || blocked()) return;
    const r = world.getBoundingClientRect(); const x=(event.clientX-r.left)/r.width*100,y=(event.clientY-r.top)/r.height*100;
    if (y < 70) return;
    travel(WalkModel.ground(x,y),'the floor',null,event.detail>1);
  });
  reveal.addEventListener('click', () => {
    const on = !world.classList.contains('show-objects'); world.classList.toggle('show-objects',on); reveal.setAttribute('aria-pressed',String(on));
  });
  document.addEventListener('keydown',event => {
    if (blocked() || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key.toLowerCase() === 'h') reveal.click();
    if (event.key === 'Escape') cancel();
  });
  document.addEventListener('visibilitychange',() => { if (document.hidden) cancel(); });
  return { enabled, sceneKey, render, approach, scan, cancel, get moving(){return Boolean(job);}, get busy(){return locked;}, reset(){cancel();mounted=false;layer.replaceChildren();} };
})();
