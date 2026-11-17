/* Serializable puzzle rules, shared by the game and dependency-free tests. */
const FirstCaseModel = (() => {
  function normalize(raw = {}, receiptFiled = false) {
    raw = raw && typeof raw === "object" ? raw : {};
    return {
      agent: raw.agent === "david" ? "david" : "nik",
      inspected: receiptFiled || raw.inspected === true,
      distracted: receiptFiled || (raw.inspected === true && raw.distracted === true),
      restored: receiptFiled || (raw.inspected === true && raw.distracted === true && raw.restored === true),
      hints: Object.fromEntries(Object.entries(raw.hints || {}).filter(([key, value]) =>
        ["witness", "inspect", "distract", "scan", "file", "search"].includes(key) && Number.isInteger(value) && value >= 0 && value <= 3))
    };
  }
  function step(puzzle, witness, receiptFiled) {
    if (receiptFiled) return "search";
    if (!witness) return "witness";
    if (!puzzle.inspected) return "inspect";
    if (!puzzle.distracted) return "distract";
    return puzzle.restored ? "file" : "scan";
  }
  function canScan(puzzle, witness) {
    return puzzle.agent === "david" && puzzle.inspected && puzzle.distracted && witness;
  }
  return { normalize, step, canScan };
})();
if (typeof module !== "undefined") module.exports = FirstCaseModel;
