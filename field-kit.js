/* Transient selections never change evidence, interviews, or saved puzzle progress. */
const FieldKit = (() => {
  const world=document.getElementById('sceneWorld'), status=document.getElementById('walkStatus');
  const cancelButton=document.getElementById('cancelFieldSelection');
  let topic=null, hover=null;
  const replies={
    daycare:{
      signin:['Kid McChildface signed in five times. Busy child.','He is one of our most consistent imaginary attendees. I mean exemplary.'],
      toys:['Why is the playground still wrapped?','It is a contactless playground. Very exclusive.'],
      'empty-photo':['An empty classroom. Is this the whole class?','They are all attending remotely. From a very remote location.'],
      receipts:['Fancy Lobster Emporium. For the children?','Fine motor skills. Cracking a claw is educational.'],
      note:['“Invent more children before the audit.” Your note?','Brainstorming. We encourage imagination here.']
    },
    charity:{
      'stock-dogs':['This dog also models for three other charities.','A very entrepreneurial dog.'],
      boat:['A $118,000 sport boat. Where do the dogs sit?','First class. Obviously.'],
      kennels:['The kennels have never been used.','The dogs prefer an open-concept lifestyle.'],
      ledger:['Kennel enrichment has the same vendor as your boat.','Water therapy. The paperwork is simply ahead of the dogs.'],
      food:['No food for two hundred dogs?','Intermittent fasting. The dogs are very disciplined.']
    },
    seniors:{
      'bingo-banner':['This banner is three years old.','A classic never goes out of date.'],
      'meal-trays':['These meal trays are covered in dust.','A dry rub. Chef’s specialty.'],
      medicare:['A hundred meals billed every day?','Consistency is our strongest ingredient.'],
      attendance:['Blanche, Dorothy and Rose signed in again?','The television is a valued member of our community.'],
      kitchen:['Cobwebs across the serving window. Explain the lunch rush.','We operate a very slow food movement.']
    },
    finale:{
      'master-ledger':['Your beneficiary code is on all three businesses.','Brand consistency. Ask any consultant.'],
      'money-monitor':['Every transfer ends in your account.','It is a screensaver. An extremely profitable screensaver.'],
      'secret-lair':['You billed a secret lair as office supplies?','A villain needs a productive work environment.']
    }
  };
  function tool() {
    if(FirstCase.active() && FirstCase.armed)return {name:'Staple-O-Matic',id:'receipts'};
    const scene=WalkScene.sceneKey(),p=AdventureModel.puzzles[scene];
    return Adventure.armed && p ? {name:p.tool,id:p.id} : null;
  }
  function blocked(){return !WalkScene.enabled() || getActiveDialog() || CaseCinema.active || WalkScene.busy;}
  function clear(){
    topic=null;hover=null;FirstCase.disarm();Adventure.disarm();
    FirstCase.render();render();
  }
  function render(){
    const device=tool(), selected=Boolean(topic||device);
    els.stage.classList.toggle('topic-selected',Boolean(topic));
    cancelButton.classList.toggle('hidden',!selected);
    els.inventoryTrack.querySelectorAll('[data-evidence-id]').forEach(slot=>{
      const on=slot.dataset.evidenceId===topic?.id;slot.classList.toggle('selected-topic',on);
      if(slot.hasAttribute('aria-pressed'))slot.setAttribute('aria-pressed',String(on));
    });
    const lead = getSceneLead();
    status.dataset.idleMessage = lead?.message || 'Explore the room · choose a clue to ask about it · double-click to hurry';
    if(WalkScene.moving || getActiveDialog())return;
    if (hover && !hover.isConnected) hover = null;
    const target=hover?.getAttribute('aria-label')?.replace(/, (interview complete|observation logged)$/,'');
    if(topic)status.textContent=target && hover.classList.contains('npc') ? `Ask ${target} about ${topic.name}` : `${topic.name} selected · click a person to ask about it`;
    else if(device)status.textContent=target ? `Use ${device.name} on ${target}` : `${device.name} ready · click an object to use it`;
    else if (lead && (!hover || hover.classList.contains('scene-lead'))) status.textContent = lead.message;
    else if(target)status.textContent=`${hover.classList.contains('npc')?'Talk to':'Investigate'} ${target}`;
    else status.textContent = status.dataset.idleMessage;
  }
  function selectEvidence(item){
    if(blocked())return;
    const next=topic?.id===item.id ? null : item;WalkScene.cancel();clear();topic=next;
    if(topic){state.firstCase.agent='nik';FirstCase.render();saveGame();}
    render();playSfx('select');
  }
  function useOnObject(id,name,hurry){
    const device=tool();if(!topic&&!device)return false;if(blocked())return true;
    if(device?.id===id)return false;
    WalkScene.approach(id,()=>{
      const speaker=device?'David':'Nik';
      showDialogue([{speaker,text:device ? `${device.name} on ${name.toLowerCase()}? I admire the ambition. Let’s try the paperwork.` : 'A clue makes a better conversation starter with someone who can answer back.',avatar:device?ASSETS.david:ASSETS.nik}]);
    },hurry);return true;
  }
  function ask(person,hurry){
    const device=tool();if(!topic&&!device)return false;if(blocked())return true;
    const selected=topic;
    WalkScene.approach(person.role,()=>{
      if(device){showDialogue([{speaker:'David',text:'The gadget is for documents. Nik has the people scanner. He calls it a conversation.',avatar:ASSETS.david}]);return;}
      const scene=WalkScene.sceneKey(),entry=replies[scene]?.[selected.id];
      clear();
      const answer=person.role==='owner' ? entry?.[1] || 'An unfortunate misunderstanding. Almost all of my accounting is one.' : scene==='daycare' && selected.id==='receipts' ? 'Purple light revealed the original writing. And ask her about the sedan if you need privacy.' : scene==='charity' && selected.id==='boat' ? 'Compare that vendor number with the gold donation book. Boats leave a paper wake.' : scene==='seniors' && selected.id==='medicare' ? 'Compare those meals with the attendance log. I have a theory about the signatures.' : 'Keep that record. David will want to compare it with the rest of the paper trail.';
      showDialogue([
        {speaker:'Nik',text:entry?.[0] || `What can you tell me about ${selected.name.toLowerCase()}?`,avatar:ASSETS.nik},
        {speaker:person.name,text:answer,avatar:person.avatar},
        {speaker:'David',text:selected.analysis || selected.find,avatar:ASSETS.david}
      ]);
    },hurry);return true;
  }
  const effects={
    'gag-juice':['juice','STILL SEALED'], 'gag-sedan':['sedan','BEEP BEEP'],
    'gag-jar':['coins','JAR EXPENSES'], 'gag-squeak':['squeak','SQUEAK!'], 'gag-award':['award','SELF AWARDED'],
    'gag-bingo':['bingo','B… 404'], 'gag-candy':['candy','ONE MEGA-CANDY'], 'gag-piano':['music','♪ ♫ ♪'],
    'gag-chair':['chair','EXECUTIVE SPIN'], 'gag-fog':['fog','DRAMATIC EXPENSE'], 'gag-portrait':['portrait','HUMBLE. CLEARLY.'],
    'gag-coffee':['steam','AUDIT FUEL'], 'gag-cabinet':['papers','PAPER TRAIL'], 'gag-window':['window','CITY OF OPPORTUNITY']
  };
  function gag(id){
    if(id==='gag-crayons'){FirstCase.gag(id);return;}
    const t=WalkScenes[WalkScene.sceneKey()]?.[id],effect=effects[id];if(!t||!effect)return;
    const el=document.createElement('div');el.className=`scene-gag gag-${effect[0]}`;el.setAttribute('aria-hidden','true');
    el.style.left=`${t[0]}%`;el.style.top=`${t[1]}%`;const label=document.createElement('strong');label.textContent=effect[1];el.appendChild(label);
    for(let i=0;i<5;i++){const part=document.createElement('i');part.style.setProperty('--i',i);el.appendChild(part);}
    world.appendChild(el);playSfx('gag');setTimeout(()=>el.remove(),2200);
  }
  function speaker(name){
    world.querySelectorAll('.speaking').forEach(el=>el.classList.remove('speaking'));
    if(!name)return;
    const scene=WalkScene.sceneKey(),source=scene==='finale'?FINALE:CASES.find(c=>c.id===scene);
    const target=name==='Nik'?'.actor-nik':name==='David'?'.actor-david':name===source?.owner.name?'.npc-owner':'.npc-witness';
    world.querySelector(target)?.classList.add('speaking');
  }
  for(const event of ['pointerover','focusin'])world.addEventListener(event,e=>{hover=e.target.closest('.hotspot,.npc');render();});
  for(const event of ['pointerout','focusout'])world.addEventListener(event,e=>{if(!e.relatedTarget?.closest?.('.hotspot,.npc')){hover=null;render();}});
  cancelButton.addEventListener('click',()=>{WalkScene.cancel();clear();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!blocked()){WalkScene.cancel();clear();}});
  return {render,clear,selectEvidence,useOnObject,ask,gag,speaker,reset(){clear();speaker(null);world.querySelectorAll('.scene-gag').forEach(el=>el.remove());}};
})();
