const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),scenes=require('../walking-scenes.js');
test('All playable evidence, gags, and NPCs have authored walking targets',()=>{
  const context=vm.createContext({document:{getElementById(){return{addEventListener(){},setAttribute(){},classList:{toggle(){},add(){},remove(){}}}},addEventListener(){}},window:{matchMedia:()=>({matches:false}),addEventListener(){}},FirstCaseModel:require('../first-case-model.js')});
  vm.runInContext(fs.readFileSync(path.join(root,'game.js'),'utf8')+'\nthis.data={CASES,FINALE,HQ_GAGS};',context);
  for(const scene of [...context.data.CASES,context.data.FINALE]) {
    for(const item of [...scene.evidence,...scene.gags])assert.ok(scenes[scene.id][item.id],`${scene.id}/${item.id} missing target`);
    assert.ok(scenes[scene.id].owner);
    if(scene.witness)assert.ok(scenes[scene.id].witness);
  }
  for(const gag of context.data.HQ_GAGS)assert.ok(scenes.hq[gag.id]);
});
test('Every literal asset reference in shipped source exists locally',()=>{
  for(const file of fs.readdirSync(root).filter(f=>/\.(html|css|js)$/.test(f))) {
    const source=fs.readFileSync(path.join(root,file),'utf8');
    for(const match of source.matchAll(/(?:["'(])((?:assets\/)[^"')\s`]+\.(?:png|jpg|svg|mp4|webp))/g))
      assert.ok(fs.existsSync(path.join(root,match[1])),`${file}: ${match[1]}`);
  }
});
