const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

function setup({ reduced = false, rejectVideo = false, muted = false, rejectAudible = false } = {}) {
  const elements = new Map(), frames = new Map();
  let now = 0, serial = 0, plays = 0;
  const document = { activeElement:null, visibilityState:'visible', listeners:{}, addEventListener(type,fn) { this.listeners[type]=fn; } };
  const query = {matches:reduced,addEventListener(type,fn){this.change=fn;}};
  function element(id) {
    const classes = new Set(id === 'cinemaOverlay' ? ['hidden'] : []);
    return {
      id, tagName:'SECTION', inert:false, isConnected:true, offsetParent:{}, dataset:{}, style:{}, attributes:{},
      disabled:false, listeners:{}, textContent:'', paused:true,
      classList:{ add:(...names)=>names.forEach(n=>classes.add(n)),remove:(...names)=>names.forEach(n=>classes.delete(n)),contains:n=>classes.has(n),toggle(n,on){if(on ?? !classes.has(n))classes.add(n);else classes.delete(n);} },
      addEventListener(type,fn){this.listeners[type]=fn;},
      getAttribute(key){return this.attributes[key] ?? null;},setAttribute(key,value){this.attributes[key]=value;},removeAttribute(key){delete this.attributes[key];},
      focus(){document.activeElement=this;},click(){if(!this.disabled)this.listeners.click?.();},
      play(){plays++;this.paused=false;return (rejectVideo || (rejectAudible && !this.muted))?Promise.reject(new Error('autoplay unavailable')):Promise.resolve();},
      pause(){this.paused=true;},load(){}
    };
  }
  document.getElementById=id=>{if(!elements.has(id))elements.set(id,element(id));return elements.get(id);};
  document.querySelectorAll=()=>[];
  const get=document.getElementById;
  document.body={children:[get('app'),get('otherDialog'),get('cinemaOverlay')]};
  get('otherDialog').inert=true;get('startButton').focus();
  const state={muted};
  const context=vm.createContext({document,state,toggleMute(){state.muted=!state.muted},window:{matchMedia:()=>query},requestAnimationFrame:fn=>{frames.set(++serial,fn);return serial;},cancelAnimationFrame:id=>frames.delete(id)});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../cutscenes.js'),'utf8')+'\nthis.cinema=CaseCinema;',context);
  function advance(ms){for(let left=ms;left>0;left-=50){now+=Math.min(left,50);const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn(now));}}
  function key(key,extra={}){document.listeners.keydown({key,preventDefault(){},stopImmediatePropagation(){},...extra});}
  return{cinema:context.cinema,get,document,advance,key,query,get plays(){return plays;}};
}
const durations={opening:[5,23000],interlude:[3,13000],charityAfter:[3,12000],towerBefore:[3,16000],ending:[4,15000]};
for(const [id,[count,ms]] of Object.entries(durations)) {
  test(`${id}: automatically ends within its advertised runtime and restores focus/inert state`,()=>{
    const {cinema,get,advance,document}=setup();let completed=0;
    cinema.play(id,()=>completed++);
    assert.equal(get('app').inert,true);
    advance(ms-200);assert.equal(cinema.active,true);
    advance(500);assert.equal(cinema.active,false);assert.equal(completed,1);
    cinema.close();assert.equal(completed,1);
    assert.equal(get('app').inert,false);assert.equal(get('otherDialog').inert,true);
    assert.equal(document.activeElement,get('startButton'));
  });
  test(`${id}: manual navigation pauses timing and completes exactly once`,()=>{
    const {cinema,get,advance}=setup();let completed=0;
    cinema.play(id,()=>completed++);get('cinemaMotion').click();
    advance(20000);assert.equal(get('cinemaProgress').textContent,`1 / ${count}`);
    for(let i=0;i<count;i++){assert.equal(get('cinemaProgress').textContent,`${i+1} / ${count}`);get('cinemaNext').click();}
    advance(20000);cinema.close();assert.equal(completed,1);
  });
}
test('Back/replay cancel the old shot clock; replacing a scene does not call its completion',()=>{
  const {cinema,get,advance}=setup();let completed=0;
  cinema.play('interlude',()=>completed++);advance(4500);
  get('cinemaBack').click();advance(20000);assert.equal(get('cinemaProgress').textContent,'1 / 3');
  get('cinemaReplay').click();advance(5000);assert.equal(get('cinemaProgress').textContent,'2 / 3');
  cinema.play('ending',()=>completed++);advance(15500);assert.equal(completed,1);
});
test('Space pauses and resumes the remaining time; key repeat never toggles twice',()=>{
  const {cinema,get,key,advance}=setup();cinema.play('interlude');advance(2050);
  key(' ');advance(10000);assert.equal(get('cinemaProgress').textContent,'1 / 3');
  key(' ',{repeat:true});assert.equal(get('cinemaMotion').textContent,'Play');
  key(' ');advance(2100);assert.equal(get('cinemaProgress').textContent,'2 / 3');
});
test('Hidden tabs do not consume story time and a manual pause survives tab switching',()=>{
  const {cinema,get,document,advance}=setup();cinema.play('interlude');advance(2050);
  document.visibilityState='hidden';document.listeners.visibilitychange();advance(30000);
  assert.equal(get('cinemaProgress').textContent,'1 / 3');
  document.visibilityState='visible';document.listeners.visibilitychange();advance(2100);
  assert.equal(get('cinemaProgress').textContent,'2 / 3');get('cinemaMotion').click();
  document.visibilityState='hidden';document.listeners.visibilitychange();document.visibilityState='visible';document.listeners.visibilitychange();
  advance(10000);assert.equal(get('cinemaProgress').textContent,'2 / 3');
});
test('Reduced motion defaults to manual captions and never starts video',()=>{
  const s=setup({reduced:true});s.cinema.play('ending');s.advance(20000);
  assert.equal(s.get('cinemaProgress').textContent,'1 / 4');assert.equal(s.plays,0);
  assert.equal(s.get('cinemaInsert').classList.contains('hidden'),true);
  s.get('cinemaMotion').click();s.advance(15500);assert.equal(s.cinema.active,false);assert.equal(s.plays,0);
});
test('Failed video playback falls back to a prop and still completes the story',async()=>{
  const s=setup({rejectVideo:true});let completed=0;s.cinema.play('ending',()=>completed++);
  await Promise.resolve();assert.equal(s.get('cinemaInsert').classList.contains('hidden'),true);
  s.advance(15500);assert.equal(completed,1);
});
test('Skip cancels the timer, Escape restores visible game focus, and Tab stays inside',()=>{
  const {cinema,get,document,key,advance}=setup();let completed=0;
  get('startButton').offsetParent=null;cinema.play('opening',()=>completed++);
  get('cinemaNext').focus();key('Tab');assert.equal(document.activeElement,get('cinemaSkip'));
  key('Tab',{shiftKey:true});assert.equal(document.activeElement,get('cinemaNext'));
  key('Escape');advance(30000);assert.equal(completed,1);assert.equal(document.activeElement,get('hintButton'));
  cinema.play('ending',()=>completed++);get('cinemaSkip').click();advance(30000);assert.equal(completed,2);
});
test('A late rejected video promise cannot hide the next scene video',async()=>{
  const s=setup({rejectVideo:true});s.cinema.play('ending');
  s.cinema.play('interlude');await Promise.resolve();
  assert.equal(s.get('cinemaProgress').textContent,'1 / 3');assert.equal(s.cinema.active,true);
});

test('Cinematic sound respects the saved mute setting and the accessible toggle',()=>{
  const s=setup({muted:true});s.cinema.play('towerBefore');
  assert.equal(s.get('cinemaVideo').muted,true);
  s.get('cinemaSound').click();assert.equal(s.get('cinemaVideo').muted,false);
  assert.equal(s.get('cinemaSound').attributes['aria-pressed'],'false');
  s.get('cinemaNext').click();assert.equal(s.get('cinemaVideo').muted,true); // silent legacy insert
  s.get('cinemaBack').click();assert.equal(s.get('cinemaVideo').muted,false);
  s.cinema.close();assert.equal(s.get('cinemaVideo').paused,true);
});

test('Audible autoplay rejection retries muted without discarding the cinematic',async()=>{
  const s=setup({rejectAudible:true});s.cinema.play('towerBefore');
  await Promise.resolve();await Promise.resolve();
  assert.equal(s.plays,2);assert.equal(s.get('cinemaVideo').muted,true);
  assert.equal(s.get('cinemaInsert').classList.contains('hidden'),false);
  s.get('cinemaVideo').listeners.playing();
  assert.equal(s.get('cinemaInsert').classList.contains('video-ready'),true);
});
