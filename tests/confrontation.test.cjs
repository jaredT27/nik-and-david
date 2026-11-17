const test=require('node:test'), assert=require('node:assert/strict'), vm=require('node:vm'), fs=require('node:fs');
function setup() {
  const timers=[], buttons=[];
  function element() { return {disabled:false,textContent:'',innerHTML:'',dataset:{},classList:{add(){},remove(){}},querySelector(){return{querySelector(){return null},insertAdjacentHTML(){}}},focus(){},addEventListener(type,fn){this.run=fn},appendChild(el){buttons.push(el)},querySelectorAll(){return []}}; }
  const source={id:'daycare',owner:{name:'Shifty'},claims:[{evidence:'a',win:'Read this at your own pace',retort:'Try again'},{evidence:'b',win:'Second reply'}],confront:[]};
  const state={confront:{source,index:0,isFinale:false,rejected:new Set(),locked:false},wrongKeys:new Set(),completedCases:new Set(),nextCaseIndex:0};
  let claims=0,verdicts=0;
  const ctx={state,window:{setTimeout(fn){timers.push(fn)}},document:{createElement:element},els:Object.fromEntries(['confrontChoices','confrontPrompt','confrontKicker','confrontClaim','confrontPortrait'].map(n=>[n,element()])),playSfx(){},Portraits:{set(){}},ASSETS:{nik:''},saveGame(){},renderObjective(){},showToast(){},reducedMotion:{matches:false},WRONG_PENALTY:2,CASES:[source],renderConfrontClaim(){claims++},closeConfront(){state.confront.source=null},showDialogue(lines,done){verdicts++;done?.()},completeCase(){}};
  vm.createContext(ctx);
  const code=fs.readFileSync(require('node:path').join(__dirname,'../game.js'),'utf8');
  vm.runInContext(code.slice(code.indexOf('function pickEvidence('),code.indexOf('\nfunction completeCase(')),ctx);
  return {ctx,state,source,timers,buttons,element,get claims(){return claims},get verdicts(){return verdicts}};
}
test('Successful deduction holds its reply until the player advances; one click advances one claim',()=>{
  const s=setup();s.ctx.pickEvidence({id:'a'},s.element());
  s.timers.forEach(fn=>fn());assert.equal(s.state.confront.index,0);assert.equal(s.claims,0);
  assert.equal(s.ctx.els.confrontClaim.textContent,'"Read this at your own pace"');
  s.buttons[0].run();assert.equal(s.state.confront.index,1);assert.equal(s.claims,1);
  s.buttons[0].run();assert.equal(s.claims,1);
});
test('Closing a confrontation cancels a pending verdict and rejected-card feedback cannot revive it',()=>{
  const s=setup();s.ctx.pickEvidence({id:'bad'},s.element());
  s.state.confront={source:null,index:0,locked:true};s.timers.forEach(fn=>fn());assert.equal(s.state.confront.locked,true);
  const t=setup();t.state.confront.index=1;t.ctx.pickEvidence({id:'b'},t.element());
  t.state.confront.source=null;t.buttons[0].run();assert.equal(t.verdicts,0);
});
