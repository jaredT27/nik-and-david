const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const model = require('../walk-model.js');
test('Free walking stays on the pavement; routes cross the safe lane', () => {
  assert.deepEqual(model.ground(-20,30),{x:8,y:78});
  assert.deepEqual(model.ground(120,110),{x:94,y:94});
  assert.deepEqual(model.route({x:53,y:72},{x:74,y:73}),[{x:53,y:82},{x:74,y:82},{x:74,y:73}]);
});
function setup() {
  const elements=new Map(), timers=new Map(), frames=new Map(); let sequence=0;
  function el() { const classes=new Set(); return {dataset:{},style:{setProperty(){}},classList:{add(...ns){ns.forEach(n=>classes.add(n))},remove(...ns){ns.forEach(n=>classes.delete(n))},toggle(n,on){on?classes.add(n):classes.delete(n)},contains(n){return classes.has(n)}},setAttribute(){},addEventListener(){},appendChild(){},replaceChildren(){},querySelector(){return {textContent:'',style:{}}},querySelectorAll(){return []}}; }
  const document={getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,addEventListener(){}};
  const state={phase:'case',activeCaseIndex:0,firstCase:{agent:'nik'}};
  const ctx=vm.createContext({document,state,WalkScenes:require('../walking-scenes.js'),WalkModel:model,performance:{now:()=>0},reducedMotion:{matches:true},getActiveDialog:()=>null,CaseCinema:{active:false},setTimeout(fn){timers.set(++sequence,fn);return sequence},clearTimeout(id){timers.delete(id)},requestAnimationFrame(fn){frames.set(++sequence,fn);return sequence},cancelAnimationFrame(id){frames.delete(id)}});
  vm.runInContext(fs.readFileSync(require.resolve('../walking.js'),'utf8')+'\nthis.walk=WalkScene',ctx);
  document.getElementById('caseTransition').classList.add('hidden');
  ctx.walk.render();
  const flush=()=>{for(const [id,fn] of [...frames]){frames.delete(id);fn(16)}for(const [id,fn] of [...timers]){timers.delete(id);fn()}};
  return {walk:ctx.walk,flush,state};
}
test('A replacement destination cancels the old interaction and fires the new one once',()=>{
  const {walk,flush}=setup();let old=0,next=0;
  walk.approach('receipts',()=>old++);walk.approach('witness',()=>next++);flush();flush();
  assert.equal(old,0);assert.equal(next,1);
});
test('Cancel, agent switch cancellation, and leaving a case discard pending actions',()=>{
  const {walk,flush,state}=setup();let count=0;
  walk.approach('receipts',()=>count++);walk.cancel();flush();
  walk.approach('receipts',()=>count++);state.phase='hq';flush();
  assert.equal(count,0);
});
test('Scanner locks input during its sequence and reset cancels its completion',()=>{
  const {walk,flush}=setup();let scans=0,clicks=0;
  walk.scan(()=>scans++);assert.equal(walk.busy,true);walk.approach('witness',()=>clicks++);flush();
  assert.equal(scans,1);assert.equal(clicks,0);assert.equal(walk.busy,false);
  walk.scan(()=>scans++);walk.reset();flush();assert.equal(scans,1);
});
