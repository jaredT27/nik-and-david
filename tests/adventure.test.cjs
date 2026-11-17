const test=require('node:test'),assert=require('node:assert/strict');
const {puzzles,gate}=require('../adventure-model.js');
const scenes=require('../walking-scenes.js');
for(const [scene,p] of Object.entries(puzzles)) {
  test(`${scene}: prerequisite and agent gate, including legacy collected evidence`,()=>{
    assert.equal(gate(scene,p.id,new Set(),'nik'),'agent');
    assert.equal(gate(scene,p.id,new Set(),'david'),'prerequisite');
    assert.equal(gate(scene,p.id,new Set([p.prerequisite]),'david'),'puzzle');
    assert.equal(gate(scene,p.id,new Set([p.id]),'nik'),'pass');
    assert.equal(gate(scene,p.prerequisite,new Set(),'nik'),'pass');
    assert.ok(p.options[p.answer]);
  });
}
test('Every location has safe approach marks and visible prop rectangles',()=>{
  assert.deepEqual(Object.keys(scenes).sort(),['charity','daycare','finale','hq','seniors']);
  for(const targets of Object.values(scenes)) for(const [id,t] of Object.entries(targets)) {
    assert.ok(t[2]>=8 && t[2]<=94,`${id} approach x`);
    assert.ok(t[3]>=70 && t[3]<=94,`${id} approach y`);
    assert.ok(t[0]>=0 && t[0]<=100 && t[1]>=0 && t[1]<=100,`${id} visible`);
    if(!['owner','witness'].includes(id))assert.ok(t[4]>0 && t[5]>0,`${id} has hit area`);
  }
});
