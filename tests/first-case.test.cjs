const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const model = require('../first-case-model.js');

test('Scanning requires David, inspected ink, a witness clue, and the distraction', () => {
  const ready = { agent: 'david', inspected: true, distracted: true };
  assert.equal(model.canScan(ready, true), true);
  for (const patch of [{ agent: 'nik' }, { inspected: false }, { distracted: false }]) {
    assert.equal(Boolean(model.canScan({ ...ready, ...patch }, true)), false);
  }
  assert.equal(model.canScan(ready, false), false);
});

test('Puzzle advances logically even when inspection happens before the interview', () => {
  const p = model.normalize();
  assert.equal(model.step(p, false, false), 'witness');
  p.inspected = true;
  assert.equal(model.step(p, false, false), 'witness');
  assert.equal(model.step(p, true, false), 'distract');
  p.distracted = true;
  assert.equal(model.step(p, true, false), 'scan');
  p.restored = true;
  assert.equal(model.step(p, true, false), 'file');
  assert.equal(model.step(p, true, true), 'search');
});

test('Legacy collected receipts remain solved; malformed puzzle fields are normalized', () => {
  assert.equal(model.normalize(undefined, true).restored, true);
  const p = model.normalize({ agent: 'villain', restored: true, distracted: true, hints: { scan: 2, file: 999, other: 1 } });
  assert.equal(p.agent, 'nik');
  assert.equal(p.restored, false);
  assert.equal(p.distracted, false);
  assert.deepEqual(p.hints, { scan: 2 });
  assert.doesNotThrow(() => model.normalize(null));
});

function gameContext() {
  const nodes = new Map();
  const document = {
    getElementById(id) {
      if (!nodes.has(id)) nodes.set(id, {
        classList: { add() {}, remove() {}, toggle() {}, contains() { return true; } },
        style: { setProperty() {} }, addEventListener() {}, setAttribute() {}, textContent: ''
      });
      return nodes.get(id);
    }, addEventListener() {}
  };
  const context = vm.createContext({
    document, console, FirstCaseModel: model,
    window: { matchMedia: () => ({ matches: true }), addEventListener() {}, localStorage: { getItem: () => null } }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../game.js'), 'utf8') + '\nthis.api = { state, serializeSave, sanitizeSave, applySave };', context);
  return context.api;
}

test('Real game save round-trip retains the distraction, restored ink, investigator, and hint tier', () => {
  const { state, serializeSave, sanitizeSave, applySave } = gameContext();
  state.phase = 'case'; state.activeCaseIndex = 0;
  state.interviews.daycare.witness = true;
  state.firstCase = { agent: 'david', inspected: true, distracted: true, restored: true, hints: { scan: 2 } };
  const restored = sanitizeSave(JSON.parse(JSON.stringify(serializeSave())));
  applySave(restored);
  assert.equal(state.firstCase.agent, 'david');
  assert.equal(state.firstCase.restored, true);
  assert.equal(state.firstCase.hints.scan, 2);
  assert.equal(model.canScan(state.firstCase, state.interviews.daycare.witness), true);
  assert.equal(state.collected.daycare.has('receipts'), false, 'Scanning must not silently file evidence');
});

test('Real legacy saves without puzzle state retain existing receipt progress', () => {
  const { state, serializeSave, sanitizeSave } = gameContext();
  state.phase = 'case'; state.activeCaseIndex = 0;
  state.collected.daycare.add('receipts');
  const raw = serializeSave(); delete raw.firstCase;
  const saved = sanitizeSave(raw);
  assert.equal(saved.firstCase.restored, true);
  assert.equal(saved.collected.daycare.has('receipts'), true);
});
