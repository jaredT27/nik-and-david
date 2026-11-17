/* First-case adventure layer; the remaining cases use the existing investigation loop. */
const FirstCase = (() => {
  const $ = (id) => document.getElementById(id);
  const dock = $("agentDock");
  const bench = $("invoiceBench");
  let armed = false;
  let scanning = false;
  let scanTimer = null;
  let inertElements = [];
  let returnFocus = null;
  const goals = {
    witness: "Ask the neighbor what Ms. Shifty is hiding.",
    inspect: "David can examine the suspicious receipts.",
    distract: "Nik needs to get Ms. Shifty away from the paperwork.",
    scan: "Use David’s scanner on the suspicious receipts.",
    file: "File the restored invoice as evidence.",
    search: "Finish the interviews and evidence trail."
  };
  const hints = {
    witness: ["The neighbor watches everything. That might finally be useful.", "Nik is better at getting people to talk.", "Choose Nik, then talk to Mrs. Busybody."],
    inspect: ["A convincing lie sometimes leaves a mark on the paper.", "David knows what an altered receipt looks like.", "Choose David, click Suspicious Receipts, then Examine the ink."],
    distract: ["You need privacy, not speed. Find something the owner loves talking about.", "Nik could ask about the luxury sedan. Let her explain herself into a corner.", "Choose Nik, then click Distract Ms. Shifty. She will stay occupied."],
    scan: ["Mrs. Busybody mentioned purple light. The ink may still be there.", "David’s stapler has a surprisingly useful second function.", "Choose David, select Staple-O-Matic, click Suspicious Receipts, then use the UV filter."],
    file: ["The original vendor is visible. Now preserve the evidence.", "A restored receipt belongs in David’s folder.", "Open Suspicious Receipts and choose File restored receipt."],
    search: ["The invoice is secure. Finish checking the scene and talking to both witnesses.", "The neighbor’s cubby tip unlocks another clue. The classroom and playground also tell a story.", "Collect all five clues and interview both people. Then choose Confront Owner."]
  };
  function active() { return state.phase === "case" && state.activeCaseIndex === 0; }
  function currentStep() { return FirstCaseModel.step(state.firstCase, state.interviews.daycare.witness, state.collected.daycare.has("receipts")); }
  function searchGoal() {
    const missing = CASES[0].evidence.find(item => !state.collected.daycare.has(item.id));
    if (missing) return `Investigate ${missing.name}. Press H to reveal the objects in the room.`;
    if (!state.interviews.daycare.owner) return "Choose Nik and interview Ms. Shifty.";
    if (!state.interviews.daycare.witness) return "Choose Nik and interview Mrs. Busybody.";
    return "The evidence is complete. Confront Ms. Shifty.";
  }
  function line(speaker, text) { return { speaker, text, avatar: speaker === "Nik" ? ASSETS.nik : speaker === "David" ? ASSETS.david : ASSETS.shifty }; }

  function render() {
    const enabled = active();
    WalkScene.render();
    dock.classList.toggle("hidden", !enabled);
    $("scannerButton").classList.remove("hidden");
    $("adventureConfront").textContent = "Confront Owner";
    els.gameScreen.classList.toggle("adventure-active", enabled);
    if (!enabled) {
      armed = false;
      els.stage.classList.remove("scanner-armed", "shifty-distracted");
      Adventure.render();
      return;
    }
    const p = state.firstCase;
    $("agentNik").setAttribute("aria-pressed", String(p.agent === "nik"));
    $("agentDavid").setAttribute("aria-pressed", String(p.agent === "david"));
    $("agentGoal").textContent = currentStep() === "search" ? searchGoal() : goals[currentStep()];
    $("scannerButton").disabled = p.agent !== "david";
    $("scannerButton").setAttribute("aria-pressed", String(armed));
    $("scannerButton").textContent = armed ? "Cancel scanner" : "Staple-O-Matic";
    $("distractButton").classList.toggle("hidden", p.agent !== "nik" || !p.inspected || !state.interviews.daycare.witness || p.distracted);
    $("agentStatus").textContent = p.distracted ? "Shifty: explaining her sedan. At length." : p.agent === "nik" ? "Nik · conversation & distraction" : "David · documents & gadgets";
    const ready = state.collected.daycare.size === CASES[0].evidence.length && state.interviews.daycare.owner && state.interviews.daycare.witness;
    if (ready) $("agentGoal").textContent = "The evidence is complete. Time to confront Ms. Shifty.";
    $("adventureConfront").classList.toggle("hidden", !ready);
    els.stage.classList.toggle("scanner-armed", armed);
    els.stage.classList.toggle("shifty-distracted", p.distracted);
    const receipt = els.hotspotLayer.querySelector('[data-item-id="receipts"]');
    if (receipt && !state.collected.daycare.has("receipts")) {
      receipt.setAttribute("aria-label", armed ? "Scan suspicious receipts" : "Suspicious Receipts");
      receipt.querySelector("span").textContent = armed ? "Scan these receipts" : "Suspicious Receipts";
      receipt.classList.toggle("scanner-target", armed);
    }
  }
  function selectAgent(agent) {
    if (!WalkScene.enabled() || getActiveDialog() || CaseCinema.active || WalkScene.busy) return;
    WalkScene.cancel();
    if (typeof FieldKit !== "undefined") FieldKit.clear();
    state.firstCase.agent = agent;
    armed = false;
    render(); saveGame(); playSfx("select");
    const button = $(agent === "nik" ? "agentNik" : "agentDavid");
    button.classList.remove("agent-arrival"); void button.offsetWidth; button.classList.add("agent-arrival");
  }
  function interceptEvidence(item) {
    if (!active()) return false;
    if (armed && item.id !== "receipts") {
      showDialogue([line("David", "The stapler detects altered ink, not existential problems. Let's try the receipts.")]);
      return true;
    }
    if (item.id !== "receipts" || state.collected.daycare.has("receipts")) return false;
    if (state.firstCase.agent !== "david") {
      showDialogue([line("Nik", "Something's been written over. David does the tiny-print detective work. I do the regrettable conversations.")]);
      return true;
    }
    if (armed && !FirstCaseModel.canScan(state.firstCase, state.interviews.daycare.witness)) {
      showHint(); return true;
    }
    openBench(); return true;
  }
  function interceptTalk(role) {
    if (!active()) return false;
    if (state.firstCase.agent === "david") {
      showDialogue([line("David", "People are less cooperative than spreadsheets. Nik should handle this conversation.")]);
      return true;
    }
    if (role === "owner" && state.firstCase.inspected && state.interviews.daycare.witness && !state.firstCase.distracted) {
      distract(); return true;
    }
    return false;
  }
  function distract() {
    if (!active() || state.firstCase.agent !== "nik" || !state.firstCase.inspected || !state.interviews.daycare.witness || state.firstCase.distracted) return;
    showDialogue([
      line("Nik", "A sedan with heated seats. Is that part of the early-learning curriculum?"),
      line("Ms. Shifty", "Absolutely. The children study depreciation. Let me explain the premium leather package."),
      line("David", "Keep her on the subject of lumbar support. I'll take the receipts."),
      line("Ms. Shifty", "It started with a vision. And a very flexible definition of school supplies…")
    ], () => {
      state.firstCase.distracted = true;
      state.interviews.daycare.owner = true;
      refreshCurrentView(); saveGame();
      showToast("Ms. Shifty is occupied. No time limit—switch to David when ready.");
    });
  }
  function openBench() {
    returnFocus = document.activeElement;
    inertElements = [...document.body.children].filter(el => el !== bench && el.tagName !== "SCRIPT").map(el => [el, el.inert]);
    inertElements.forEach(([el]) => { el.inert = true; });
    bench.classList.remove("hidden");
    renderBench(); $("closeInvoice").focus();
  }
  function closeBench(restore = true) {
    WalkScene.cancel();
    clearTimeout(scanTimer); scanTimer = null; scanning = false;
    bench.classList.add("hidden"); bench.classList.remove("scanning");
    inertElements.forEach(([el, previous]) => { el.inert = previous; }); inertElements = [];
    if (restore) {
      if (returnFocus?.isConnected && returnFocus.offsetParent !== null) returnFocus.focus();
      else if (active()) $("agentDavid").focus();
    }
  }
  function renderBench() {
    const p = state.firstCase;
    bench.classList.toggle("restored", p.restored);
    $("invoiceInspect").classList.toggle("hidden", p.inspected);
    $("invoiceFilters").classList.toggle("hidden", !p.inspected || p.restored);
    $("invoiceFile").classList.toggle("hidden", !p.restored);
    $("invoiceVendor").textContent = p.restored ? "FANCY LOBSTER EMPORIUM" : "LITTLE LEARNERS SUPPLY CO.";
    $("invoiceItem").textContent = p.restored ? "Lobster tasting menu × 12" : "Crayons & classroom snacks";
    $("invoiceStatus").textContent = p.restored ? "Original ink recovered. School supplies were a cover story." : p.inspected ? "Two ink layers. The original vendor is hidden underneath." : "Something about this receipt does not add up.";
    $("invoiceInstruction").textContent = p.restored ? "Preserve the original vendor as evidence." : !p.inspected ? "David: the paper has pressure marks under the printed vendor." : !state.interviews.daycare.witness ? "Ask Mrs. Busybody about the ink before choosing a filter." : !p.distracted ? "Ms. Shifty is watching. Nik needs to keep her talking first." : !armed ? "Close this view, select Staple-O-Matic, then use it on the receipts." : "Mrs. Busybody said purple light. Choose the matching filter.";
    $("invoiceFilters").querySelectorAll("button").forEach(button => { button.disabled = !armed || !FirstCaseModel.canScan(p, state.interviews.daycare.witness) || scanning; });
  }
  function scan(filter) {
    if (scanning || !armed || !FirstCaseModel.canScan(state.firstCase, state.interviews.daycare.witness)) return;
    if (filter !== "uv") {
      $("invoiceStatus").textContent = filter === "heat" ? "David: heat would cook the evidence. I prefer my fraud medium-rare." : "David: ordinary light reveals an ordinary lie. Try the purple-light clue.";
      playSfx("select"); return;
    }
    closeBench(false);
    playSfx("scan");
    WalkScene.scan(() => {
      scanning = false; state.firstCase.restored = true;
      saveGame(); render(); openBench();
      playSfx("clue"); $("invoiceFile").focus();
    });
  }
  function showHint() {
    if (WalkScene.busy) return;
    WalkScene.cancel();
    const step = currentStep(), p = state.firstCase;
    const tier = Math.min(p.hints[step] || 0, 2);
    p.hints[step] = Math.min(tier + 1, 3); saveGame();
    const message = step === "search" ? searchGoal() : hints[step][tier];
    const target = CASES[0].evidence.find(item => message.includes(item.name));
    showDialogue([line(p.agent === "nik" ? "David" : "Nik", message)], () => { if (target) pulseHint(target.id); });
  }
  function gag(id) {
    if (!active() || id !== "gag-crayons") return;
    const burst = document.createElement("div"); burst.className = "crayon-burst"; burst.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 5; i++) { const pencil = document.createElement("i"); pencil.style.setProperty("--i", i); burst.appendChild(pencil); }
    els.sceneWorld.appendChild(burst);
    setTimeout(() => burst.remove(), 2200); playSfx("gag");
  }
  $("agentNik").addEventListener("click", () => selectAgent("nik"));
  $("agentDavid").addEventListener("click", () => selectAgent("david"));
  $("scannerButton").addEventListener("click", () => {
    if (!active()) { Adventure.tool(); return; }
    if (state.firstCase.agent !== "david" || !active() || WalkScene.busy) return;
    WalkScene.cancel();
    const nextArmed = !armed;
    if (typeof FieldKit !== "undefined") FieldKit.clear();
    armed = nextArmed; render(); if (typeof FieldKit !== "undefined") FieldKit.render(); playSfx("select");
    if (armed) showToast("Scanner ready. Tap the suspicious receipts. Select again to cancel.");
  });
  $("distractButton").addEventListener("click", () => WalkScene.approach("owner", distract));
  $("adventureConfront").addEventListener("click", AdventureAction);
  function AdventureAction() { Adventure.action(); }
  $("closeInvoice").addEventListener("click", () => closeBench());
  $("invoiceInspect").addEventListener("click", () => {
    state.firstCase.inspected = true; renderBench(); render(); saveGame(); playSfx("clue"); $("closeInvoice").focus();
  });
  $("invoiceFilters").querySelectorAll("button").forEach(button => button.addEventListener("click", () => scan(button.dataset.filter)));
  $("invoiceFile").addEventListener("click", () => {
    if (!state.firstCase.restored || scanning) return;
    closeBench(false); armed = false;
    collectEvidence(CASES[0], CASES[0].evidence.find(item => item.id === "receipts"), true);
  });
  document.addEventListener("keydown", (event) => {
    if (bench.classList.contains("hidden")) {
      if (WalkScene.enabled() && !getActiveDialog() && !CaseCinema.active && !event.metaKey && !event.ctrlKey && !event.altKey) {
        if (event.key === "1") selectAgent("nik");
        if (event.key === "2") selectAgent("david");
      }
      if (active() && armed && event.key === "Escape" && !getActiveDialog()) { armed = false; render(); }
      return;
    }
    if (event.key === "Escape") { event.preventDefault(); closeBench(); }
    if (event.key === "Tab") {
      const buttons = [...bench.querySelectorAll("button:not(:disabled)")].filter(el => el.offsetParent !== null);
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    event.stopImmediatePropagation();
  }, true);
  return { active, render, interceptEvidence, interceptTalk, showHint, gag, disarm() { armed = false; }, get armed() { return armed; }, reset() { Adventure.reset(); WalkScene.reset(); closeBench(false); armed = false; }, get busy() { return Adventure.busy || WalkScene.busy || !bench.classList.contains("hidden"); } };
})();
