const test=require('node:test'),assert=require('node:assert/strict');
const {puzzles,connects}=require('../adventure-model.js');
for(const [scene,p] of Object.entries(puzzles)) {
  test(`${scene}: each clue connects to one authored fact and decoys do not solve it`,()=>{
    const source=p.marks.source.map(m=>m.id),record=p.marks.record.map(m=>m.id);
    assert.equal(new Set([...source,...record]).size,source.length+record.length);
    for(const a of source) {
      const matches=record.filter(b=>connects(p,a,b));
      assert.equal(matches.length,1,`A source fact must have exactly one matching record: ${a}`);
      assert.equal(connects(p,matches[0],a),false,'The direction matters; record details cannot stand in for source facts');
    }
    assert.ok(record.some(b=>source.every(a=>!connects(p,a,b))),'There is a plausible decoy to compare');
    assert.equal(connects(p,'missing','missing'),false);
  });
}
