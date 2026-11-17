/* Short, captioned comic scenes. The game never waits for a video download. */
const CaseCinema = (() => {
  const art = {
    hq: 'assets/hq-walkable.png', tower: 'assets/tower-walkable.png',
    daycare: 'assets/daycare-walkable.png', charity: 'assets/charity-walkable.png', seniors: 'assets/seniors-walkable.png'
  };
  const names = { nik: 'Nik', david: 'David', timmy: 'Timmy', villain: 'Dr. Swindlah' };
  const scenes = {
    opening: { title: 'Operation: Paper Trail', end: 'Start investigating', lead: 'FIRST MOVE: ANSWER THE RED HOTLINE AT HQ', shots: [
      { bg:'hq', cast:['nik','david'], who:'nik', line:'I’m Nik. I ask questions. David follows the money.', ms:4000, prop:'agency', beat:0, slate:'MEET THE FRAUD BUSTERS', action:'Nik · talk & distract. David · inspect & scan.' },
      { bg:'hq', cast:['timmy','nik'], who:'timmy', line:'Quality Learing Center gets paid for fifty kids. Neighbors say it’s empty.', ms:6000, video:'assets/daycare-cinematic.mp4', audio:true, prop:'daycare-tip', beat:0, slate:'THE TIP · QUALITY LEARING CENTER', action:'Childcare money is being paid out. Are any children being cared for?', sound:'hint' },
      { bg:'hq', cast:['nik','david'], who:'david', line:'If those kids are imaginary, where’s the real money going?', ms:4500, prop:'daycare-tip', beat:1, slate:'THE QUESTION · WHERE DOES THE MONEY GO?', action:'A tip is a lead. We still need evidence.' },
      { bg:'daycare', cast:['nik','david'], who:'nik', line:'First stop: the daycare. Talk to witnesses. Find the receipts.', ms:4500, prop:'mission', beat:0, slate:'YOUR FIRST CASE', action:'Investigate Quality Learing Center. Collect proof before confronting the owner.', sound:'clue' },
      { bg:'hq', cast:['nik','david'], who:'david', line:'I’ve packed the stapler. Try to look less excited.', ms:4000, prop:'field-kit', beat:0, action:'At HQ, click the red hotline to take the tip.', sound:'gag' }
    ]},
    interlude: { title: 'Rescue yacht', end: 'Back to HQ', lead: 'NEXT: FEEDING OUR FURRY FRIENDS', shots: [
      { bg:'tower', cast:['villain'], who:'villain', line:'Move the money to the dog charity.', ms:4000, prop:'boat', beat:0, action:'A rescue operation. Technically.' },
      { bg:'charity', cast:['nik','david'], who:'nik', line:'Their rescue dog has a sundeck.', ms:5500, prop:'boat', beat:1, action:'A yacht in a dog bed. Very good buoy.', video:'assets/rescue-yacht.mp4', sound:'gag' },
      { bg:'charity', cast:['nik','david'], who:'david', line:'Fetch the bank statements.', ms:3500, prop:'boat', beat:2, action:'Breed: offshore. Training: minimal.', sound:'stamp' }
    ]},
    charityAfter: { title: 'The lunch special', end: 'Back to HQ', lead: 'NEXT: SUNNY DAYS SENIOR CENTER', shots: [
      { bg:'hq', cast:['timmy','nik'], who:'timmy', line:'Sunny Days billed for a hundred lunches.', ms:4000, prop:'meal', beat:0, action:'Today’s special: suspicious paperwork.', sound:'hint' },
      { bg:'seniors', cast:['nik','david'], who:'nik', line:'The kitchen’s empty. What’s cooking?', ms:4000, prop:'meal', beat:1, action:'Fresh from the printer. Piping hot.' },
      { bg:'seniors', cast:['nik','david'], who:'david', line:'The books.', ms:4000, prop:'meal', beat:2, action:'Now with 100% more cooked accounts.', sound:'gag' }
    ]},
    towerBefore: { title: 'Damage control', end: 'Back to HQ', lead: 'NEXT: SWINDLAH TOWER', shots: [
      { bg:'tower', cast:['villain'], who:'david', line:'Three fronts. One owner. Swindlah.', ms:6000, video:'assets/swindlah-reveal.mp4', audio:true, prop:'shredder', beat:0, action:'All three paper trails point upstairs.', sound:'clue' },
      { bg:'tower', cast:['villain'], who:'villain', line:'Deploy the emergency shredder!', ms:5500, prop:'shredder', beat:1, action:'Office equipment. Poorly specified.', video:'assets/party-shredder.mp4' },
      { bg:'tower', cast:['villain'], who:'villain', line:'Why does it have a party mode?', ms:4500, prop:'shredder', beat:2, action:'Congratulations on your upcoming audit.', sound:'gag' }
    ]},
    ending: { title: 'Liquid assets', end: 'See your case report', lead: 'CASE CLOSED. PROBABLY.', shots: [
      { bg:'tower', cast:['villain','david'], who:'villain', line:'You can’t repossess atmosphere!', ms:5000, prop:'fog', beat:0, action:'Accounts frozen. Fog machine impounded.', video:'assets/accounts-frozen.mp4' },
      { bg:'tower', cast:['villain','david'], who:'david', line:'It’s on the invoice.', ms:3000, prop:'fog', beat:2, action:'Even the dramatic entrance was financed.', sound:'stamp' },
      { bg:'hq', cast:['timmy','david'], who:'timmy', line:'Next call: an emotional-support submarine.', ms:3500, prop:'sub', beat:0, action:'The hotline has developed a sinking feeling.', sound:'hint' },
      { bg:'hq', cast:['nik','david'], who:'david', line:'Get the waterproof folder.', ms:3500, prop:'sub', beat:2, action:'Nik & David will return. Once the folder dries.', sound:'finale' }
    ]}
  };

  // Small theatrical props keep the gag legible even offline or with motion disabled.
  const props = {
    agency: '<path d="M46 64h118l23 20h186v177H46z" fill="#c99447"/><path d="M42 101h336v164H42z" fill="#f1cd81"/><path d="M89 130h242v79H89z" fill="#234551"/><text x="210" y="160" fill="#fff" class="brief-title">FRAUD BUSTERS</text><text x="210" y="188" fill="#fff">FOLLOW THE MONEY.</text><text x="210" y="237">NIK + DAVID</text><circle cx="210" cy="61" r="32" fill="#fff0bb"/><path d="M200 43v36m17-29c-22-15-36 13-12 13s9 29-11 14" fill="none" stroke="#35646b"/>',
    'daycare-tip': '<path d="M27 16h366v267H27z" fill="#fff2d0"/><text x="210" y="45" class="brief-title">QUALITY LEARING CENTER</text><image href="assets/daycare-walkable.png" x="44" y="60" width="332" height="128" preserveAspectRatio="xMidYMid slice"/><path d="M44 60h332v128H44z" fill="none"/><text x="122" y="215">PAID FOR</text><text x="122" y="246" class="big-number">50 KIDS</text><path d="M211 203v53" stroke="#bdab7d" stroke-width="2"/><text x="291" y="215">NEIGHBORS SAY</text><text x="291" y="244" class="brief-title">“EMPTY”</text><g class="tip-question"><circle cx="328" cy="156" r="33" fill="#e6b757"/><text x="328" y="169" class="big-number">?</text></g>',
    mission: '<path d="M61 18h298v261H61z" fill="#fff2d0"/><path d="M119 10h182v37H119z" fill="#d4a449"/><text x="210" y="83" class="brief-title">CASE 01 · THE DAYCARE</text><path d="M90 99h240" stroke="#c5b186" stroke-width="2"/><circle cx="104" cy="130" r="15" fill="#234551"/><text x="104" y="135" fill="#fff">1</text><text x="233" y="135">TALK TO WITNESSES</text><circle cx="104" cy="181" r="15" fill="#234551"/><text x="104" y="186" fill="#fff">2</text><text x="233" y="186">FIND THE RECEIPTS</text><circle cx="104" cy="232" r="15" fill="#234551"/><text x="104" y="237" fill="#fff">3</text><text x="233" y="237">FOLLOW THE MONEY</text>',
    'field-kit': '<g class="briefing-phone"><path d="M66 116h128l31 78H39z" fill="#b93f3e"/><path d="M50 106q0-43 81-43t81 43l-35 11-12-22h-69l-12 22z" fill="#e56750"/><circle cx="130" cy="144" r="26" fill="#f5d390"/><circle cx="130" cy="144" r="12" fill="#934536"/><path d="M211 171q30 1 20 24t20 20" fill="none" stroke="#d5a379" stroke-width="5"/></g><text x="131" y="226" fill="#fff">RED HOTLINE</text><g class="gadget"><path d="M225 169h163v29H225z" fill="#314f62"/><path d="M236 117h97l45 46H228z" fill="#e8b640"/><path d="M248 132h68l18 17h-91z" fill="#243c50"/><circle cx="259" cy="141" r="4" fill="#c3a2ff"/></g><text x="304" y="226" fill="#fff">FIELD KIT</text><text x="210" y="269" fill="#fff">CALL FIRST. STAPLE LATER.</text>',
    scanner: '<g class="paper"><path d="M120 18h180v190H120z" fill="#fff4d2"/><text x="210" y="49">ENROLLMENT</text><path d="M145 69h130M145 80h100"/><text x="210" y="113" class="big-number">50</text><text x="210" y="142">CHILDREN</text><g class="prop-reveal"><path d="M128 85h164v88H128z" fill="#7950aa"/><text x="210" y="115" fill="#fff">ACTUAL CHILDREN</text><text x="210" y="150" fill="#fff" class="big-number">0</text></g></g><g class="gadget"><path d="M70 230h280v28H70z" fill="#314f62"/><path d="M87 179h172l72 44H77z" fill="#e8b640"/><path d="M103 190h133l30 20H99z" fill="#243c50"/><circle cx="120" cy="200" r="5" fill="#c3a2ff"/><text x="215" y="247" fill="#fff">STAPLE-O-MATIC</text></g><path class="scan-light" d="M110 185L125 40h170l-44 145z" fill="#b78cfb66" stroke="none"/>',
    boat: '<ellipse cx="210" cy="236" rx="171" ry="31" fill="#aa4144"/><ellipse cx="210" cy="225" rx="147" ry="22" fill="#e49b84"/><g class="toy-boat"><path d="M72 164h280l-43 64H117z" fill="#fbf6df"/><path d="M152 105h101l42 59H131z" fill="#e6eee6"/><path d="M167 120h70l24 31H158z" fill="#77bcc6"/><path d="M199 69h18v36h-18z" fill="#ddaa39"/><path d="M100 185h222" stroke="#4b899c" stroke-width="10"/><path d="M162 163l4 64h29l-7-64" fill="#cb5975"/><circle cx="181" cy="208" r="15" fill="#e1b446"/><text x="263" y="211">FIDO</text></g><g class="prop-reveal"><path d="M303 49l31-8 31 8-9 57-22 12-23-12z" fill="#e8b640"/><text x="334" y="72">GOOD</text><text x="334" y="90">BUOY</text></g>',
    meal: '<g class="printer"><path d="M82 60h256v122H82z" fill="#718d85"/><path d="M103 42h211v63H103z" fill="#d4daca"/><path d="M115 57h186v28H115z" fill="#24424c"/><path d="M119 123h181v25H119z" fill="#192c39"/><circle cx="316" cy="122" r="7" fill="#80d888"/></g><ellipse cx="210" cy="250" rx="150" ry="30" fill="#e2d4aa"/><ellipse cx="210" cy="245" rx="125" ry="19" fill="#fff6dc"/><g class="meal-paper"><path d="M136 142h144v83l-23 10-23-10-24 10-24-10-24 10-26-10z" fill="#fff8dc"/><text x="208" y="166">LUNCH × 100</text><path d="M158 182h100M158 193h78"/><text x="208" y="216">$2,400</text></g><g class="prop-reveal"><path d="M273 15l99 23-19 74-100-25z" fill="#cc5d42"/><text x="313" y="63" fill="#fff" transform="rotate(13 313 63)">WELL DONE</text></g>',
    shredder: '<path d="M113 97h194v151H113z" fill="#bda355"/><path d="M100 91h220v42H100z" fill="#e0be64"/><path d="M132 105h154v12H132z" fill="#182d38"/><g class="shred-paper"><path d="M162 15h97v92h-97z" fill="#fff4d9"/><text x="210" y="44">EVIDENCE</text><path d="M177 62h67M177 75h50"/></g><path d="M153 157h113v62H153z" fill="#3f5960"/><g class="shredder-default"><text x="210" y="185" fill="#fff">SECURE</text><text x="210" y="204" fill="#fff">DISPOSAL</text></g><g class="prop-reveal"><path d="M146 218h128v40l-15-8-18 8-18-8-18 8-18-8-17 8-24-8z" fill="#fff4d9"/><text x="210" y="240">ORIGINAL RECEIPT</text></g><g class="confetti"><path d="M65 57l15 20M338 29l-12 21M298 13l12 17" stroke="#ed8390" stroke-width="9"/><path d="M92 11l15 14M355 86l-18 9M134 35l-10 11" stroke="#73cfbc" stroke-width="9"/><path d="M37 111l22-3M289 53l16-10M215 7l10 14" stroke="#eebc55" stroke-width="9"/></g>',
    fog: '<g class="fog-cloud"><ellipse cx="215" cy="114" rx="118" ry="47" fill="#dfd9f0bb" stroke="none"/><ellipse cx="304" cy="89" rx="68" ry="42" fill="#dfd9f0bb" stroke="none"/></g><path d="M93 179h211v80H93z" fill="#52676e"/><path d="M277 169h64v48h-37" fill="#718b8f"/><circle cx="133" cy="203" r="10" fill="#a46cbe"/><text x="202" y="237" fill="#fff">ATMOSPHERE™</text><g class="prop-reveal"><path d="M76 112h235v51H76z" fill="#be443f" transform="rotate(-9 194 137)"/><text x="194" y="145" fill="#fff" transform="rotate(-9 194 137)">REPOSSESSED</text></g>',
    sub: '<g class="submarine"><path d="M179 79v-25h55v23" fill="none" stroke="#e0ab31" stroke-width="16"/><path d="M142 89h136l-13 39H153z" fill="#eac14c"/><path d="M70 136h239l51-20v97l-51-20H70a30 30 0 0 1 0-57z" fill="#eac14c"/><circle cx="133" cy="164" r="19" fill="#81c9cf"/><circle cx="199" cy="164" r="19" fill="#81c9cf"/><path d="M283 145v38" stroke="#bb8837" stroke-width="8"/></g><g class="prop-reveal"><path d="M151 219l10-28h71l17 15h61v60H150z" fill="#e6aa4f"/><path d="M156 216h148v46H156z" fill="#98dfe4" fill-opacity=".7"/><text x="230" y="244">WATERPROOF</text></g><path d="M39 276q30-20 60 0t60 0t60 0t60 0t60 0t60 0" fill="none" stroke="#73afbc" stroke-width="6"/>'
  };
  const get = id => document.getElementById(id);
  const overlay = get('cinemaOverlay'), video = get('cinemaVideo'), insert = get('cinemaInsert');
  const motion = get('cinemaMotion'), next = get('cinemaNext'), back = get('cinemaBack');
  const replay = get('cinemaReplay'), skip = get('cinemaSkip');
  const actors = [get('cinemaActorLeft'), get('cinemaActorRight')];
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = null, currentId = '', index = 0, done = null, endLabel = '', previousFocus = null, inertElements = [];
  let paused = false, elapsed = 0, frame = 0, lastTime = null, revision = 0, mediaFailed = false;
  let wasPlayingBeforeHidden = false;

  function total() { return current.shots.reduce((sum, shot) => sum + shot.ms, 0); }
  function syncSound() {
    const muted = typeof state !== 'undefined' && state.muted;
    video.muted = Boolean(muted || !current?.shots[index].audio);
    video.volume = .65;
    get('cinemaSound').textContent = muted ? 'Sound: Off' : 'Sound: On';
    get('cinemaSound').setAttribute('aria-pressed', String(Boolean(muted)));
  }
  function syncMotion() {
    overlay.classList.toggle('cinema-paused', paused);
    motion.textContent = paused ? 'Play' : 'Pause';
    motion.setAttribute('aria-pressed', String(paused));
    motion.setAttribute('aria-label', paused ? 'Play scene automatically' : 'Pause scene to read');
    if (paused) video.pause();
    else startVideo();
  }
  function startVideo() {
    if (!current || !current.shots[index].video || mediaFailed || mediaQuery.matches || paused) return;
    const token = revision;
    const fallback = () => { if (token === revision) { mediaFailed = true; insert.classList.add('hidden'); } };
    video.play()?.catch(() => {
      if (token !== revision) return;
      // Some browsers allow muted video after declining audible autoplay.
      if (!video.muted) { video.muted = true; video.play()?.catch(fallback); }
      else fallback();
    });
  }
  function render() {
    const shot = current.shots[index];
    revision++;
    video.pause();
    mediaFailed = false;
    insert.classList.add('hidden');
    insert.classList.remove('video-ready');
    overlay.classList.toggle('cinema-manual-frame', paused);
    if (shot.video && !mediaQuery.matches) {
      if (video.getAttribute('src') !== shot.video) video.src = shot.video;
      video.currentTime = 0;
      video.setAttribute('aria-label', shot.action);
      insert.classList.remove('hidden');
    } else {
      // Warm only this scene's next insert. A failed/slow download leaves the prop visible.
      const upcoming = current.shots.slice(index + 1).find(item => item.video);
      if (upcoming && !mediaQuery.matches && video.getAttribute('src') !== upcoming.video) { video.src = upcoming.video; video.preload = 'auto'; }
    }
    get('cinemaBackground').src = art[shot.bg];
    get('cinemaLocation').textContent = { hq:'FRAUD BUSTERS HQ', tower:'SWINDLAH TOWER', daycare:'QUALITY LEARING CENTER', charity:'THE DOG CHARITY', seniors:'SUNNY DAYS' }[shot.bg];
    get('cinemaHeadline').textContent = index === current.shots.length - 1 ? current.lead : (shot.slate || 'MEANWHILE…');
    get('cinemaFrame').dataset.scene = currentId;
    get('cinemaFrame').dataset.beat = String(shot.beat);
    get('cinemaFrame').dataset.prop = shot.prop;
    get('cinemaAction').textContent = shot.action;
    get('cinemaProp').innerHTML = `<svg viewBox="0 0 420 300" fill="none" stroke="#18313d" stroke-width="5" stroke-linejoin="round">${props[shot.prop]}</svg>`;
    actors.forEach((actor, side) => {
      const character = shot.cast[side];
      actor.dataset.character = character || '';
      actor.classList.toggle('hidden', !character);
      actor.classList.toggle('speaking', character === shot.who);
    });
    get('cinemaSpeaker').textContent = names[shot.who];
    get('cinemaText').textContent = shot.line;
    get('cinemaProgress').textContent = `${index + 1} / ${current.shots.length}`;
    back.disabled = index === 0;
    next.textContent = index === current.shots.length - 1 ? endLabel : 'Next →';
    overlay.classList.remove('cinema-enter');
    void overlay.offsetWidth;
    overlay.classList.add('cinema-enter');
    if (!paused && typeof playSfx === 'function' && shot.sound) playSfx(shot.sound);
    syncSound();
    syncMotion();
    paintProgress();
  }
  function paintProgress() {
    const before = current.shots.slice(0,index).reduce((sum, shot) => sum + shot.ms, 0);
    get('cinemaTimelineFill').style.width = `${(before + elapsed) / total() * 100}%`;
  }
  function tick(time) {
    if (!current) return;
    if (lastTime !== null && !paused && document.visibilityState !== 'hidden') elapsed += Math.min(time - lastTime, 100);
    lastTime = time;
    if (elapsed >= current.shots[index].ms) {
      if (index + 1 === current.shots.length) { close(); return; }
      index++; elapsed = 0; render();
    }
    paintProgress();
    frame = requestAnimationFrame(tick);
  }
  function pause(value) {
    if (!current) return;
    paused = value; lastTime = null;
    syncMotion();
  }
  function step(direction) {
    if (!current) return;
    if (direction > 0 && index + 1 === current.shots.length) { close(); return; }
    if (index + direction < 0) return;
    pause(true); index += direction; elapsed = 0; render();
  }
  function close(runCallback = true) {
    if (!current) return;
    cancelAnimationFrame(frame); revision++;
    video.pause(); insert.classList.add('hidden');
    video.removeAttribute('src'); video.load();
    const callback = done;
    current = null; done = null; lastTime = null; wasPlayingBeforeHidden = false;
    overlay.classList.add('hidden');
    overlay.classList.remove('cinema-enter');
    for (const [element, wasInert] of inertElements) element.inert = wasInert;
    inertElements = [];
    if (previousFocus?.isConnected && previousFocus.offsetParent !== null) previousFocus.focus();
    else get(!get('gameScreen').classList.contains('hidden') ? 'hintButton' : 'startButton').focus();
    if (runCallback && callback) callback();
  }
  function play(id, onDone, isReplay = false) {
    if (!scenes[id]) return;
    close(false);
    previousFocus = document.activeElement;
    current = scenes[id]; currentId = id; done = onDone || null;
    endLabel = isReplay ? 'Back to screening room' : current.end;
    index = 0; elapsed = 0; lastTime = null; paused = mediaQuery.matches;
    get('cinemaTitle').textContent = current.title;
    get('cinemaRuntime').textContent = `${Math.round(total()/1000)} SEC CAPER`;
    inertElements = [...document.body.children].filter(element => element !== overlay && element.tagName !== 'SCRIPT').map(element => [element, element.inert]);
    for (const [element] of inertElements) element.inert = true;
    overlay.classList.remove('hidden');
    render(); motion.focus();
    frame = requestAnimationFrame(tick);
  }
  get('cinemaSound').addEventListener('click', () => { if (typeof toggleMute === 'function') toggleMute(); syncSound(); });
  motion.addEventListener('click', () => pause(!paused));
  next.addEventListener('click', () => step(1));
  back.addEventListener('click', () => step(-1));
  replay.addEventListener('click', () => {
    if (!current) return;
    index = 0; elapsed = 0; lastTime = null; paused = mediaQuery.matches; render();
  });
  skip.addEventListener('click', () => close());
  video.addEventListener('error', () => { if (current) { mediaFailed = true; insert.classList.add('hidden'); } });
  video.addEventListener('playing', () => { if (current && current.shots[index].video && !paused) insert.classList.add('video-ready'); });
  video.addEventListener('loadstart', () => insert.classList.remove('video-ready'));
  document.addEventListener('visibilitychange', () => {
    if (!current) return;
    if (document.visibilityState === 'hidden') { wasPlayingBeforeHidden = !paused; pause(true); }
    else if (wasPlayingBeforeHidden) { wasPlayingBeforeHidden = false; pause(false); }
  });
  mediaQuery.addEventListener?.('change', () => { if (current && mediaQuery.matches) { pause(true); insert.classList.add('hidden'); } });
  document.addEventListener('keydown', event => {
    if (!current) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key === ' ') { event.preventDefault(); if (!event.repeat) pause(!paused); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    else if (event.key === 'Tab') {
      // Tabbing pauses the scene so it cannot close while a control is being reached.
      pause(true);
      const buttons = [skip, get('cinemaSound'), replay, back, motion, next].filter(button => !button.disabled);
      if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === buttons.at(-1)) { event.preventDefault(); buttons[0].focus(); }
    }
    event.stopImmediatePropagation();
  }, true);
  document.querySelectorAll('[data-cinema]').forEach(button => button.addEventListener('click', () => play(button.dataset.cinema, null, true)));
  return { play, close, get active() { return current !== null; } };
})();
