/* The remaining locations share the scene controls; each has its own document puzzle. */
const Adventure = (() => {
  const $=id=>document.getElementById(id), panel=$('fieldPuzzle');
  let current=null, done=null, inert=[], previousFocus=null, armed=false, selectedMark=null, marked=new Set();
  function source() { return state.phase==='finale'?FINALE:CASES[state.activeCaseIndex]; }
  function found() { return state.phase==='finale'?state.finaleFound:state.collected[source()?.id]; }
  function line(text) { return [{speaker:'David',text,avatar:ASSETS.david}]; }
  function goal() {
    if (state.phase==='hq') return state.nextCaseIndex<CASES.length ? 'Answer the red hotline to take the next case.' : 'The fronts are closed. Answer the hotline for Swindlah Tower.';
    const s=source(); if (!s) return '';
    const f=found(), p=AdventureModel.puzzles[s.id];
    if (state.phase==='case' && !state.interviews[s.id].witness) return `Talk to ${s.witness.name}. They know where the records are hidden.`;
    if (p && !f.has(p.id)) {
      if (!f.has(p.prerequisite)) return p.lead;
      return `Choose David, then use ${p.tool} on ${s.evidence.find(e=>e.id===p.id).name}.`;
    }
    const missing=s.evidence.find(item=>!f.has(item.id));
    if (missing) return `Investigate ${missing.name}. Press H to reveal the objects in the room.`;
    if (state.phase==='case' && !state.interviews[s.id].owner) return `Interview ${s.owner.name} before confronting them.`;
    return state.phase==='finale' ? 'The entire paper trail is filed. Confront Dr. Swindlah.' : 'The evidence is complete. Confront the owner.';
  }
  function render() {
    const enabled=WalkScene.enabled(); $('agentDock').classList.toggle('hidden',!enabled);
    els.gameScreen.classList.toggle('adventure-active',enabled);
    if (!enabled) return;
    const agent=state.firstCase.agent, s=source(), p=AdventureModel.puzzles[s?.id];
    $('agentNik').setAttribute('aria-pressed',String(agent==='nik')); $('agentDavid').setAttribute('aria-pressed',String(agent==='david'));
    $('agentStatus').textContent=agent==='nik'?'Nik · interviews & deductions':'David · records & gadgets';
    $('agentGoal').textContent=goal(); $('distractButton').classList.add('hidden');
    $('scannerButton').classList.toggle('hidden',!p || found()?.has(p.id));
    $('scannerButton').textContent=armed ? `Put away ${p.tool}` : p?.tool || 'Field tools'; $('scannerButton').disabled=agent!=='david'; $('scannerButton').setAttribute('aria-pressed',String(armed));
    els.stage.classList.toggle('gadget-armed',armed);
    const ready=state.phase==='hq' ? state.nextCaseIndex>0 : (s && found().size===s.evidence.length && (state.phase==='finale' || (state.interviews[s.id].owner && state.interviews[s.id].witness)));
    $('adventureConfront').classList.toggle('hidden',!ready);
    $('adventureConfront').textContent=state.phase==='hq'?(state.nextCaseIndex<CASES.length?'Answer hotline':'Go to Swindlah Tower'):state.phase==='finale'?'Confront Swindlah':'Confront Owner';
  }
  function action() {
    if (getActiveDialog() || CaseCinema.active || WalkScene.busy) return;
    if (state.phase==='hq') { const phone=getHQHotspots()[0]; WalkScene.approach('hotline',phone.action); }
    else WalkScene.approach('owner',state.phase==='finale'?confrontFinale:confrontCase);
  }
  function tool() {
    if (getActiveDialog() || CaseCinema.active || WalkScene.busy) return;
    const s=source(),p=AdventureModel.puzzles[s?.id]; if (!p || state.firstCase.agent!=='david') return;
    const nextArmed=!armed;
    if (typeof FieldKit !== 'undefined') FieldKit.clear();
    armed=nextArmed; render(); playSfx('select');
    if (typeof FieldKit !== 'undefined') FieldKit.render();
  }
  function intercept(item, file) {
    const s=source(), f=found(); if (!s || !f) return false;
    const gate=AdventureModel.gate(s.id,item.id,f,state.firstCase.agent), p=AdventureModel.puzzles[s.id];
    if (gate==='pass') return false;
    if (gate==='agent') { showDialogue(line('Let me compare the records. Switch to David and I’ll put the numbers under a little pressure.')); return true; }
    if (gate==='prerequisite') { showDialogue(line(p.lead)); return true; }
    if (!armed) { showDialogue(line(`Choose ${p.tool} in the field kit, then click ${item.name} to use it.`)); return true; }
    if (state.phase==='case' && !state.interviews[s.id].witness) { showDialogue(line(`Ask ${s.witness.name} about the hidden records first.`)); return true; }
    armed=false; render(); if (typeof FieldKit !== 'undefined') FieldKit.render();
    WalkScene.scan(()=>open(p,file),'auditing-scene'); return true;
  }
  function open(p,onDone) {
    current=p;done=onDone; previousFocus=document.activeElement;
    inert=[...document.body.children].filter(el=>el!==panel && el.tagName!=='SCRIPT').map(el=>[el,el.inert]); inert.forEach(([el])=>el.inert=true);
    selectedMark=null;marked=new Set();
    $('fieldTitle').textContent=p.title; $('fieldQuestion').textContent=p.question;
    $('fieldInstruction').textContent=p.instruction;
    $('fieldFeedback').textContent='Take your time. Experiments carry no penalty.';
    for (const [id,lines] of [['fieldSource',p.source],['fieldRecord',p.record]]) {
      const el=$(id); el.replaceChildren(); lines.forEach((text,index)=>{const row=document.createElement(index?'p':'h3');row.textContent=text;el.appendChild(row);});
      const choices=p.marks[id==='fieldSource'?'source':'record'];
      const group=document.createElement('div');group.className='record-marks';
      choices.forEach(mark=>{const button=document.createElement('button');button.textContent=mark.label;button.dataset.mark=mark.id;button.dataset.side=id==='fieldSource'?'source':'record';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>markRecord(button,mark));group.appendChild(button);});el.appendChild(group);
    }
    $('fieldChoices').replaceChildren();
    $('fieldFile').classList.add('hidden'); panel.classList.remove('solved','hidden'); $('closeField').focus();
  }
  function markRecord(button,mark) {
    if(!current || marked.has(mark.id) || panel.classList.contains('solved'))return;
    if(button.dataset.side==='source') {
      selectedMark=mark.id; $('fieldSource').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      $('fieldFeedback').textContent=`${mark.label} selected. Find its connection in the other record.`;playSfx('select');return;
    }
    if(!selectedMark){$('fieldFeedback').textContent='Choose a detail in the left record first.';return;}
    if(!AdventureModel.connects(current,selectedMark,mark.id)){$('fieldFeedback').textContent=current.retry;playSfx('select');return;}
    const sourceButton=$('fieldSource').querySelector(`[data-mark="${selectedMark}"]`);
    marked.add(selectedMark);marked.add(mark.id); sourceButton.classList.add('matched');button.classList.add('matched');sourceButton.disabled=true;button.disabled=true;button.setAttribute('aria-pressed','true');
    selectedMark=null;playSfx('clue');
    const complete=current.links.every(([a,b])=>marked.has(a)&&marked.has(b));
    if(complete)choose(current.answer);else $('fieldFeedback').textContent=`Connection confirmed. ${current.links.length-marked.size/2} more to find.`;
  }
  function choose(index) {
    if (!current || panel.classList.contains('solved')) return;
    if (index!==current.answer) { $('fieldFeedback').textContent=current.retry; playSfx('select'); return; }
    panel.classList.add('solved'); $('fieldFeedback').textContent=current.success;
    panel.querySelectorAll('.record-marks button').forEach(b=>b.disabled=true); $('fieldFile').classList.remove('hidden'); $('fieldFile').focus(); playSfx('clue');
  }
  function close(restore=true) {
    panel.classList.add('hidden'); current=null;done=null; WalkScene.cancel();
    inert.forEach(([el,was])=>el.inert=was);inert=[];
    if (restore) { if(previousFocus?.isConnected && previousFocus.offsetParent!==null)previousFocus.focus();else $('agentDavid').focus(); }
  }
  $('closeField').addEventListener('click',()=>close());
  $('fieldFile').addEventListener('click',()=>{if(!panel.classList.contains('solved'))return;const callback=done;close(false);callback?.();});
  document.addEventListener('keydown',event=>{
    if(panel.classList.contains('hidden'))return;
    if(event.key==='Escape'){event.preventDefault();close();}
    if(event.key==='Tab')trapDialogFocus(event);
    event.stopImmediatePropagation();
  },true);
  function hint() {
    if(WalkScene.busy || getActiveDialog())return;
    WalkScene.cancel();
    const message=goal(), s=source();
    const target=s?.evidence.find(item=>message.includes(item.name));
    showDialogue(line(message),()=>{ if(target) pulseHint(target.id); });
  }
  return {render,action,tool,intercept,hint,disarm(){armed=false;},get armed(){return armed;},reset(){armed=false;close(false);},get busy(){return !panel.classList.contains('hidden');}};
})();
