const ASSETS = {
  hq: "assets/hq-walkable.png",
  title: "assets/title.jpg",
  nik: "assets/nik-correct.png",
  david: "assets/david-correct.png",
  timmy: "assets/npc_timmy_trainee.jpg",
  busybody: "assets/npc_mrs_busybody.jpg",
  henderson: "assets/npc_old_man_henderson.jpg",
  carl: "assets/npc_conspiracy_carl.jpg",
  shifty: "assets/daycareowner.jpg",
  chad: "assets/businessOwner1.jpg",
  rick: "assets/fraudowner.jpg",
  swindlah: "assets/swindlah-lair-portrait.png",
  folder: "assets/icon_evidence_folder.jpg",
  invoice: "assets/icon_fake_invoice.jpg",
  magnifier: "assets/icon_magnifying_glass.jpg",
  mic: "assets/icon_microphone.jpg",
  photo: "assets/icon_photo_evidence.jpg",
  signin: "assets/icon_signin_sheet.jpg"
};

const CASES = [
  {
    id: "daycare",
    title: "Quality Learing Center",
    kicker: "Case 1",
    background: "assets/daycare-walkable.png",
    subtitle: "A daycare billing for fifty kids has no kid noise, no toys in use, and one very lonely luxury sedan.",
    owner: {
      name: "Ms. Shifty",
      avatar: ASSETS.shifty,
      x: 66,
      y: 58,
      lines: [
        { speaker: "Ms. Shifty", text: "We're closed. The kids are on a permanent field trip.", avatar: ASSETS.shifty },
        { speaker: "Nik", text: "Why is the playground still wrapped in plastic?", avatar: ASSETS.nik },
        { speaker: "Ms. Shifty", text: "We are preserving childhood. Very delicate business.", avatar: ASSETS.shifty }
      ]
    },
    witness: {
      name: "Mrs. Busybody",
      avatar: ASSETS.busybody,
      x: 18,
      y: 58,
      lines: [
        { speaker: "Mrs. Busybody", text: "Leave them alone. I see cars here all the time.", avatar: ASSETS.busybody },
        { speaker: "Nik", text: "Have you seen any children?", avatar: ASSETS.nik },
        { speaker: "Mrs. Busybody", text: "Well, no. But cars are basically children if you worry about parking enough.", avatar: ASSETS.busybody },
        { speaker: "Mrs. Busybody", text: "Though she does scribble little notes near the cubbies. Very secretive scribbles.", avatar: ASSETS.busybody },
        { speaker: "Mrs. Busybody", text: "And she paints over receipts! I saw the old writing glow under a purple party light. Ultraviolet, my nephew calls it.", avatar: ASSETS.busybody },
        { speaker: "Nik", text: "Anything else she loves besides creative accounting?", avatar: ASSETS.nik },
        { speaker: "Mrs. Busybody", text: "That sedan. Ask about the leather seats and she’ll talk until the warranty expires.", avatar: ASSETS.busybody }
      ]
    },
    gags: [
      {
        id: "gag-juice",
        name: "Juice Boxes",
        x: 33,
        y: 66,
        lines: [
          { speaker: "Nik", text: "These juice boxes expired two years ago.", avatar: ASSETS.nik },
          { speaker: "David", text: "The fruit was never punched.", avatar: ASSETS.david }
        ]
      },
      {
        id: "gag-sedan",
        name: "Luxury Sedan",
        x: 90,
        y: 82,
        lines: [
          { speaker: "David", text: "A daycare sedan with heated seats and a champagne cooler.", avatar: ASSETS.david },
          { speaker: "Nik", text: "For the imaginary carpool.", avatar: ASSETS.nik }
        ]
      },
      {
        id: "gag-crayons",
        name: "Untouched Crayons",
        x: 10,
        y: 40,
        lines: [
          { speaker: "Nik", text: "A full box of crayons. Every tip is perfect.", avatar: ASSETS.nik },
          { speaker: "David", text: "Not one has been eaten. Statistically impossible around real toddlers.", avatar: ASSETS.david }
        ]
      }
    ],
    claims: [
      {
        text: "Fifty happy children attend every single day!",
        evidence: "signin",
        win: "Then why is every signature in the same handwriting, including 'Kid McChildface'?",
        retort: "Adorable. That proves nothing."
      },
      {
        text: "Every penny goes to crayons and snacks!",
        evidence: "receipts",
        win: "Your snack vendor is Fancy Lobster Emporium.",
        retort: "You call that evidence? I call it decor."
      }
    ],
    evidence: [
      {
        id: "signin",
        name: "Fake Sign-In Sheet",
        sceneName: "Sign-in sheet",
        icon: ASSETS.signin,
        x: 44,
        y: 54,
        find: "Every signature is the same handwriting.",
        analysis: "One name is Kid McChildface. The numbers never lie, but this pen absolutely does."
      },
      {
        id: "toys",
        name: "Wrapped Playground",
        icon: ASSETS.photo,
        x: 22,
        y: 76,
        find: "The playground has factory plastic on it.",
        analysis: "If fifty children used this, the slide would look like a slide instead of a museum exhibit."
      },
      {
        id: "empty-photo",
        name: "Empty Classroom Photo",
        icon: ASSETS.photo,
        x: 54,
        y: 38,
        find: "A wall photo shows a classroom with no children and last week's date.",
        analysis: "Their publicity shot accidentally documents the crime scene."
      },
      {
        id: "receipts",
        name: "Forged Receipts",
        icon: ASSETS.invoice,
        x: 78,
        y: 68,
        find: "These receipts say crayons, but the vendor is Fancy Lobster Emporium.",
        analysis: "Unless toddlers now require shellfish catering, that is fraud."
      },
      {
        id: "note",
        name: "Confession Note",
        icon: ASSETS.folder,
        hidden: true,
        x: 69,
        y: 43,
        find: "A note reads: 'Remember to invent more children before the audit.'",
        analysis: "That is less a note and more a signed invitation to prosecution."
      }
    ],
    confront: [
      { speaker: "Nik", text: "Every signature is the same handwriting.", avatar: ASSETS.nik },
      { speaker: "David", text: "And one of them says Kid McChildface.", avatar: ASSETS.david },
      { speaker: "Ms. Shifty", text: "That's a common name.", avatar: ASSETS.shifty },
      { speaker: "Nik", text: "You're claiming $500,000 for kids who do not exist.", avatar: ASSETS.nik },
      { speaker: "David", text: "Fraud busted.", avatar: ASSETS.david }
    ],
    bust: "$500,000 in phantom daycare claims recovered. The playground is finally free to be a playground."
  },
  {
    id: "charity",
    title: "Feeding Our Furry Friends",
    kicker: "Case 2",
    background: "assets/charity-walkable.png",
    subtitle: "A charity claims two hundred rescue dogs, but the kennels are empty and the cars are not humble.",
    arrival: [
      { speaker: "Nik", text: "Claims to rescue 200 dogs. I don't hear barking.", avatar: ASSETS.nik },
      { speaker: "David", text: "And those are fancy cars for a charity. Very polished for a place with no dog hair.", avatar: ASSETS.david }
    ],
    owner: {
      name: "Chad",
      avatar: ASSETS.chad,
      x: 62,
      y: 58,
      lines: [
        { speaker: "Chad", text: "The dogs are in the way, way back. Invisible service dogs.", avatar: ASSETS.chad },
        { speaker: "Nik", text: "Your expense report says 'bought myself a boat.'", avatar: ASSETS.nik },
        { speaker: "Chad", text: "Dog boat. For dog reasons. Very advanced charity work.", avatar: ASSETS.chad }
      ]
    },
    witness: {
      name: "Old Man Henderson",
      avatar: ASSETS.henderson,
      x: 84,
      y: 45,
      lines: [
        { speaker: "Henderson", text: "Best dogs I've never seen. Immaculate vibes.", avatar: ASSETS.henderson },
        { speaker: "David", text: "Have you ever donated?", avatar: ASSETS.david },
        { speaker: "Henderson", text: "No, but I gave them emotional support by nodding at the sign.", avatar: ASSETS.henderson },
        { speaker: "Henderson", text: "They do keep a fancy gold book behind the donation sign. Never once seen it open.", avatar: ASSETS.henderson }
      ]
    },
    gags: [
      {
        id: "gag-jar",
        name: "Donation Jar",
        x: 45,
        y: 80,
        lines: [
          { speaker: "Nik", text: "The donation jar is full.", avatar: ASSETS.nik },
          { speaker: "David", text: "Of receipts. For the jar.", avatar: ASSETS.david }
        ]
      },
      {
        id: "gag-squeak",
        name: "Squeaky Toy",
        x: 78,
        y: 62,
        lines: [
          { speaker: "David", text: "This toy just made the first squeak of its life.", avatar: ASSETS.david },
          { speaker: "Nik", text: "Brand new. Like everything here except the excuses.", avatar: ASSETS.nik }
        ]
      },
      {
        id: "gag-award",
        name: "Trophy Wall",
        x: 91,
        y: 24,
        lines: [
          { speaker: "Nik", text: "'Best Charity of the Year' award.", avatar: ASSETS.nik },
          { speaker: "David", text: "Issued by themselves. To themselves. Framed by themselves.", avatar: ASSETS.david }
        ]
      }
    ],
    claims: [
      {
        text: "Two hundred real, extremely photogenic dogs live here!",
        evidence: "stock-dogs",
        win: "Your most photogenic dog also lives on three other websites.",
        retort: "Pfft. The dogs remain unbothered."
      },
      {
        text: "Every donation goes straight to the dogs!",
        evidence: "boat",
        win: "The dogs bought a sport boat?",
        retort: "That could be anyone's paperwork."
      }
    ],
    evidence: [
      {
        id: "stock-dogs",
        name: "Stock Dog Photo",
        icon: ASSETS.photo,
        x: 38,
        y: 32,
        find: "The same smiling dog photo appears on three unrelated websites.",
        analysis: "A reverse image search would bark immediately."
      },
      {
        id: "boat",
        name: "Dog Boat Receipt",
        icon: ASSETS.invoice,
        x: 67,
        y: 74,
        find: "A receipt lists one sport boat under 'kennel enrichment.'",
        analysis: "I have reviewed many budgets. Dogs rarely require nautical horsepower."
      },
      {
        id: "kennels",
        name: "Empty Kennels",
        icon: ASSETS.magnifier,
        x: 8,
        y: 68,
        find: "The kennels have cobwebs and no food bowls.",
        analysis: "No paw prints, no fur, no chew marks. The dogs are not just quiet."
      },
      {
        id: "ledger",
        name: "Donation Ledger",
        icon: ASSETS.folder,
        hidden: true,
        x: 54,
        y: 55,
        find: "Marina Vista. The same name as the frame on Chad’s trophy wall.",
        analysis: "That frame is a key box. The dogs apparently have their own slip."
      },
      {
        id: "food",
        name: "Missing Dog Food",
        icon: ASSETS.magnifier,
        x: 22,
        y: 81,
        find: "No kibble, no cans, no treats, no anything.",
        analysis: "Two hundred dogs would consume more than decorative silence."
      }
    ],
    confront: [
      { speaker: "Nik", text: "$2 million in donations. No dogs.", avatar: ASSETS.nik },
      { speaker: "David", text: "Your rescue photos are stock images.", avatar: ASSETS.david },
      { speaker: "Chad", text: "Invisible service dogs are camera shy.", avatar: ASSETS.chad },
      { speaker: "Nik", text: "The boat receipt says otherwise.", avatar: ASSETS.nik },
      { speaker: "David", text: "Fraud busted.", avatar: ASSETS.david }
    ],
    bust: "$2 million in fake rescue donations flagged. The imaginary dogs will receive imaginary treats."
  },
  {
    id: "seniors",
    title: "Sunny Days Senior Center",
    kicker: "Case 3",
    background: "assets/seniors-walkable.png",
    subtitle: "Daily meal bills keep climbing, but the kitchen looks retired from cooking.",
    arrival: [
      { speaker: "Nik", text: "Bills Medicare for 100 daily meals.", avatar: ASSETS.nik },
      { speaker: "David", text: "Kitchen has cobwebs. Even the microwave looks bored.", avatar: ASSETS.david }
    ],
    owner: {
      name: "Slick Rick",
      avatar: ASSETS.rick,
      x: 72,
      y: 52,
      lines: [
        { speaker: "Slick Rick", text: "Want some hard candy? Seniors are napping. All of them.", avatar: ASSETS.rick },
        { speaker: "Nik", text: "The bingo banner is three years old.", avatar: ASSETS.nik },
        { speaker: "Slick Rick", text: "Every night is bingo night. In spirit.", avatar: ASSETS.rick }
      ]
    },
    witness: {
      name: "Conspiracy Carl",
      avatar: ASSETS.carl,
      x: 21,
      y: 46,
      lines: [
        { speaker: "Carl", text: "The seniors are invisible. Government cloaking.", avatar: ASSETS.carl },
        { speaker: "David", text: "Or the attendance logs are fake.", avatar: ASSETS.david },
        { speaker: "Carl", text: "Both theories have paperwork, and paperwork is how they get you.", avatar: ASSETS.carl },
        { speaker: "Carl", text: "Check the clipboard by the door. The names on it are not of this world.", avatar: ASSETS.carl }
      ]
    },
    gags: [
      {
        id: "gag-bingo",
        name: "Bingo Cage",
        x: 33,
        y: 62,
        lines: [
          { speaker: "Nik", text: "The bingo cage is rusted shut.", avatar: ASSETS.nik },
          { speaker: "David", text: "B-4 anyone noticed, apparently.", avatar: ASSETS.david }
        ]
      },
      {
        id: "gag-candy",
        name: "Hard Candy Bowl",
        x: 62,
        y: 72,
        lines: [
          { speaker: "David", text: "The hard candy has fused into one mega-candy.", avatar: ASSETS.david },
          { speaker: "Nik", text: "Carbon dating might help.", avatar: ASSETS.nik }
        ]
      },
      {
        id: "gag-piano",
        name: "Player Piano",
        x: 8,
        y: 28,
        lines: [
          { speaker: "Nik", text: "A player piano with no player.", avatar: ASSETS.nik },
          { speaker: "David", text: "Like everything else in this building.", avatar: ASSETS.david }
        ]
      }
    ],
    claims: [
      {
        text: "One hundred seniors dine here every single day!",
        evidence: "attendance",
        win: "Your attendance log stars the Golden Girls.",
        retort: "Ha! Try again, junior auditor."
      },
      {
        text: "Our kitchen never stops cooking!",
        evidence: "kitchen",
        win: "The cobwebs across the serving window disagree.",
        retort: "Irrelevant. Delicious, but irrelevant."
      }
    ],
    evidence: [
      {
        id: "bingo-banner",
        name: "Old Bingo Banner",
        icon: ASSETS.photo,
        x: 58,
        y: 13,
        find: "The bingo banner is dated three years ago.",
        analysis: "A center with daily activities should not be preserved like an ancient ruin."
      },
      {
        id: "meal-trays",
        name: "Dusty Meal Trays",
        icon: ASSETS.magnifier,
        x: 70,
        y: 56,
        find: "The meal trays are dusty and stacked exactly the same.",
        analysis: "No meals served here. Just invoices with garnish."
      },
      {
        id: "medicare",
        name: "Fake Medicare Forms",
        icon: ASSETS.invoice,
        x: 45,
        y: 42,
        find: "Forms bill identical meals at identical times every day.",
        analysis: "Copy-paste is not a nutrition program."
      },
      {
        id: "attendance",
        name: "TV Character Log",
        icon: ASSETS.signin,
        hidden: true,
        x: 20,
        y: 76,
        find: "The attendance log lists Blanche, Dorothy, and Rose.",
        analysis: "Beloved sitcom characters. Terrible compliance evidence."
      },
      {
        id: "kitchen",
        name: "Cobwebbed Kitchen",
        icon: ASSETS.photo,
        x: 84,
        y: 31,
        find: "Cobwebs cross the serving window.",
        analysis: "If the kitchen served 100 meals today, the spiders are outstanding chefs."
      }
    ],
    confront: [
      { speaker: "Nik", text: "Your attendance logs have TV characters.", avatar: ASSETS.nik },
      { speaker: "David", text: "Blanche Devereaux. Dorothy Zbornak. Rose Nylund.", avatar: ASSETS.david },
      { speaker: "Slick Rick", text: "Common senior names.", avatar: ASSETS.rick },
      { speaker: "Nik", text: "The kitchen has not cooked in months.", avatar: ASSETS.nik },
      { speaker: "David", text: "Fraud busted.", avatar: ASSETS.david }
    ],
    bust: "Fake senior meal claims stopped. Carl is still investigating the microwave."
  }
];

const FINALE = {
  id: "finale",
  title: "Swindlah Tower",
  kicker: "Finale",
  background: "assets/tower-walkable.png",
  subtitle: "Every shell company routes to one tower with very subtle dollar signs.",
  owner: {
    name: "Dr. Swindlah",
    avatar: ASSETS.swindlah,
    x: 35,
    y: 43,
    lines: [
      { speaker: "Dr. Swindlah", text: "Did you think you could stop the great Dr. Swindlah?", avatar: ASSETS.swindlah },
      { speaker: "Nik", text: "Yes. We scheduled it for this afternoon.", avatar: ASSETS.nik },
      { speaker: "David", text: "I brought folders.", avatar: ASSETS.david }
    ]
  },
  evidence: [
    {
      id: "master-ledger",
      name: "Master Ledger",
      icon: ASSETS.folder,
      x: 75,
      y: 47,
      find: "A cabinet links all three fake businesses to Swindlah Holdings. The network ledger totals $100 million.",
      analysis: "One owner, three fronts, many terrible folder labels."
    },
    {
      id: "money-monitor",
      name: "Money Monitor",
      icon: ASSETS.invoice,
      x: 55,
      y: 35,
      find: "The monitors show daycare, charity, and senior center funds flowing into one account.",
      analysis: "The charts are practically pointing at the handcuffs."
    },
    {
      id: "secret-lair",
      name: "Secret Lair Invoice",
      icon: ASSETS.signin,
      x: 52,
      y: 70,
      find: "An invoice bills 'secret lair fog' to all three businesses.",
      analysis: "A fake daycare should not need villain fog by the crate."
    }
  ],
  gags: [
    {
      id: "gag-chair",
      name: "Villain Chair",
      x: 20,
      y: 72,
      lines: [
        { speaker: "Nik", text: "A tall chair that spins toward the door.", avatar: ASSETS.nik },
        { speaker: "David", text: "Standard villain issue. Probably came with the fog.", avatar: ASSETS.david }
      ]
    },
    {
      id: "gag-fog",
      name: "Fog Machine",
      x: 88,
      y: 66,
      lines: [
        { speaker: "David", text: "The fog machine is labeled 'ambiance.'", avatar: ASSETS.david },
        { speaker: "Nik", text: "The invoice says otherwise.", avatar: ASSETS.nik }
      ]
    },
    {
      id: "gag-portrait",
      name: "Oil Portrait",
      x: 68,
      y: 14,
      lines: [
        { speaker: "Nik", text: "A portrait of him counting money.", avatar: ASSETS.nik },
        { speaker: "David", text: "Commissioned. In oil. Of fraud.", avatar: ASSETS.david }
      ]
    }
  ],
  claims: [
    {
      text: "I have never met those businesses in my life!",
      evidence: "master-ledger",
      win: "Your own filing cabinet links all three to Swindlah Holdings.",
      retort: "Circumstantial! Also, stop touching my cabinet."
    },
    {
      text: "My fortune is honest money!",
      evidence: "money-monitor",
      win: "Your monitors show all three funds flowing into one account. Yours.",
      retort: "Those monitors are for... screensavers."
    },
    {
      text: "There is no secret lair. This is a normal tower!",
      evidence: "secret-lair",
      win: "You invoiced 'secret lair fog' to a daycare.",
      retort: "Fog is a legitimate business expense!"
    }
  ],
  confront: [
    { speaker: "Nik", text: "You own all three fake businesses.", avatar: ASSETS.nik },
    { speaker: "Nik", text: "Fake daycare: $500K. Fake dogs: $2M. Fake senior meals: millions more.", avatar: ASSETS.nik },
    { speaker: "Dr. Swindlah", text: "Microscopic children. Invisible dogs. Time-traveling seniors.", avatar: ASSETS.swindlah },
    { speaker: "David", text: "Your excuses are getting worse.", avatar: ASSETS.david },
    { speaker: "Dr. Swindlah", text: "I would have gotten away with it if you had not asked questions.", avatar: ASSETS.swindlah },
    { speaker: "Officer", text: "You're under arrest for fraud and bad fashion.", avatar: ASSETS.magnifier },
    { speaker: "Nik", text: "$100 million in fraud exposed. That is a headline.", avatar: ASSETS.nik }
  ]
};

const TOTAL_EVIDENCE = CASES.reduce((total, gameCase) => total + gameCase.evidence.length, 0) + FINALE.evidence.length;
const SAVE_KEY = "nik-david-save";
const BEST_KEY = "nik-david-best";
const SAVE_VERSION = 1;
const SCORE_START = 100;
const HINT_PENALTY = 5;
const WRONG_PENALTY = 2;

const HQ_GAGS = [
  {
    id: "gag-coffee",
    name: "Coffee Pot",
    x: 42,
    y: 78,
    lines: [
      { speaker: "Nik", text: "The coffee has been on since Tuesday.", avatar: ASSETS.nik },
      { speaker: "David", text: "It is not coffee anymore. It is evidence.", avatar: ASSETS.david }
    ]
  },
  {
    id: "gag-cabinet",
    name: "Filing Cabinet",
    x: 82,
    y: 55,
    lines: [
      { speaker: "David", text: "Alphabetized by crime.", avatar: ASSETS.david },
      { speaker: "Nik", text: "F is a very full drawer.", avatar: ASSETS.nik }
    ]
  },
  {
    id: "gag-window",
    name: "Office Window",
    x: 90,
    y: 28,
    lines: [
      { speaker: "Nik", text: "Nice view.", avatar: ASSETS.nik },
      { speaker: "David", text: "I count four suspicious businesses from here.", avatar: ASSETS.david }
    ]
  }
];

const state = {
  phase: "title",
  firstCase: FirstCaseModel.normalize(),
  nextCaseIndex: 0,
  activeCaseIndex: -1,
  collected: {},
  interviews: {},
  observations: {},
  finaleFound: new Set(),
  completedCases: new Set(),
  hintKeys: new Set(),
  wrongKeys: new Set(),
  finished: false,
  objectiveCollapsed: false,
  hintedItemId: null,
  hintTimerId: null,
  justFiledId: null,
  filedTimerId: null,
  muted: false,
  confront: { source: null, index: 0, isFinale: false, rejected: new Set(), locked: false },
  seconds: 0,
  timerId: null,
  dialogue: {
    lines: [],
    index: 0,
    onDone: null,
    typeId: null,
    typing: false,
    fullText: ""
  }
};

const els = {
  titleScreen: document.getElementById("titleScreen"),
  gameScreen: document.getElementById("gameScreen"),
  startButton: document.getElementById("startButton"),
  continueButton: document.getElementById("continueButton"),
  saveSummary: document.getElementById("saveSummary"),
  creditsButton: document.getElementById("creditsButton"),
  creditsPanel: document.getElementById("creditsPanel"),
  closeCredits: document.getElementById("closeCredits"),
  locationKicker: document.getElementById("locationKicker"),
  locationTitle: document.getElementById("locationTitle"),
  hintButton: document.getElementById("hintButton"),
  boardButton: document.getElementById("boardButton"),
  sceneBg: document.getElementById("sceneBg"),
  sceneWorld: document.getElementById("sceneWorld"),
  stage: document.getElementById("stage"),
  hotspotLayer: document.getElementById("hotspotLayer"),
  npcLayer: document.getElementById("npcLayer"),
  objectivePanel: document.getElementById("objectivePanel"),
  currentCount: document.getElementById("currentCount"),
  inventoryTrack: document.getElementById("inventoryTrack"),
  dialogueBox: document.getElementById("dialogueBox"),
  dialoguePortrait: document.getElementById("dialoguePortrait"),
  dialogueSpeaker: document.getElementById("dialogueSpeaker"),
  dialogueText: document.getElementById("dialogueText"),
  dialogueAnnouncement: document.getElementById("dialogueAnnouncement"),
  dialogueNext: document.getElementById("dialogueNext"),
  boardOverlay: document.getElementById("boardOverlay"),
  closeBoard: document.getElementById("closeBoard"),
  boardStats: document.getElementById("boardStats"),
  boardTrail: document.getElementById("boardTrail"),
  boardGrid: document.getElementById("boardGrid"),
  caseModal: document.getElementById("caseModal"),
  modalKicker: document.getElementById("modalKicker"),
  modalTitle: document.getElementById("modalTitle"),
  modalText: document.getElementById("modalText"),
  modalButton: document.getElementById("modalButton"),
  caseTransition: document.getElementById("caseTransition"),
  transitionKicker: document.getElementById("transitionKicker"),
  transitionTitle: document.getElementById("transitionTitle"),
  transitionText: document.getElementById("transitionText"),
  toast: document.getElementById("toast"),
  muteButton: document.getElementById("muteButton"),
  dialogueScrim: document.getElementById("dialogueScrim"),
  confrontOverlay: document.getElementById("confrontOverlay"),
  confrontPortrait: document.getElementById("confrontPortrait"),
  confrontKicker: document.getElementById("confrontKicker"),
  confrontClaim: document.getElementById("confrontClaim"),
  confrontPrompt: document.getElementById("confrontPrompt"),
  confrontChoices: document.getElementById("confrontChoices"),
  closeConfront: document.getElementById("closeConfront")
};

let audioContext = null;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const focusReturn = {};
let resizeObserver = null;

for (const gameCase of CASES) {
  state.collected[gameCase.id] = new Set();
  state.interviews[gameCase.id] = { owner: false, witness: false };
  state.observations[gameCase.id] = new Set();
}
state.observations.hq = new Set();
state.observations[FINALE.id] = new Set();

els.startButton.addEventListener("click", startNewGame);
els.continueButton.addEventListener("click", continueGame);
els.creditsButton.addEventListener("click", openCredits);
els.closeCredits.addEventListener("click", closeCredits);
els.boardButton.addEventListener("click", openBoard);
els.closeBoard.addEventListener("click", closeBoard);
els.hintButton.addEventListener("click", () => showHint(true));
els.dialogueNext.addEventListener("click", advanceDialogue);
els.dialogueBox.addEventListener("click", (event) => {
  if (event.target !== els.dialogueNext) {
    advanceDialogue();
  }
});
els.dialogueScrim.addEventListener("click", advanceDialogue);
els.muteButton.addEventListener("click", toggleMute);
els.closeConfront.addEventListener("click", closeConfront);
document.addEventListener("keydown", handleKeydown);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveGame();
});
window.addEventListener("pagehide", saveGame);

function toggleMute() {
  state.muted = !state.muted;
  els.muteButton.textContent = state.muted ? "Sound: Off" : "Sound: On";
  els.muteButton.setAttribute("aria-pressed", String(state.muted));
  saveGame();
  if (!state.muted) playSfx("select");
}

function preloadScenes() {
  const sources = new Set([
    ASSETS.hq, ASSETS.nik, ASSETS.david,
    "assets/nik-walk-sheet.png", "assets/david-walk-sheet.png", "assets/rest-npcs.png", "assets/daycare-npcs.png",
    state.phase === "finale" ? FINALE.background : CASES[state.activeCaseIndex]?.background,
    CASES[state.nextCaseIndex]?.background
  ].filter(Boolean));
  for (const src of sources) {
    const img = new Image();
    img.src = src;
  }
}

function getStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function setStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function removeStoredValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // Storage is optional; the investigation still works without it.
  }
}

function validHintKeys() {
  const keys = [];
  for (const gameCase of CASES) {
    keys.push(`${gameCase.id}:witness`);
    keys.push(`${gameCase.id}:interview:owner`, `${gameCase.id}:interview:witness`);
    for (const item of gameCase.evidence) {
      keys.push(`${gameCase.id}:evidence:${item.id}`);
    }
  }
  for (const item of FINALE.evidence) {
    keys.push(`${FINALE.id}:evidence:${item.id}`);
  }
  return new Set(keys);
}

function validWrongKeys() {
  const keys = [];
  for (const source of [...CASES, FINALE]) {
    source.claims.forEach((claim, claimIndex) => {
      for (const item of source.evidence) {
        if (item.id !== claim.evidence) {
          keys.push(`${source.id}:claim:${claimIndex}:evidence:${item.id}`);
        }
      }
    });
  }
  return new Set(keys);
}

function sanitizeSave(raw) {
  if (!raw || raw.version !== SAVE_VERSION) return null;

  const completedInput = new Set(Array.isArray(raw.completedCases) ? raw.completedCases : []);
  const completedCases = new Set();
  for (const gameCase of CASES) {
    if (!completedInput.has(gameCase.id)) break;
    completedCases.add(gameCase.id);
  }

  const collected = {};
  const interviews = {};
  const observations = {};
  for (const gameCase of CASES) {
    const validEvidence = new Set(gameCase.evidence.map((item) => item.id));
    const savedEvidence = raw.collected && Array.isArray(raw.collected[gameCase.id])
      ? raw.collected[gameCase.id]
      : [];
    collected[gameCase.id] = new Set(savedEvidence.filter((id) => validEvidence.has(id)));
    interviews[gameCase.id] = {
      owner: Boolean(raw.interviews && raw.interviews[gameCase.id] && raw.interviews[gameCase.id].owner),
      witness: Boolean(raw.interviews && raw.interviews[gameCase.id] && raw.interviews[gameCase.id].witness)
    };
    const validGags = new Set(gameCase.gags.map((gag) => gag.id));
    const savedGags = raw.observations && Array.isArray(raw.observations[gameCase.id])
      ? raw.observations[gameCase.id]
      : [];
    observations[gameCase.id] = new Set(savedGags.filter((id) => validGags.has(id)));
  }

  const hqGags = new Set(HQ_GAGS.map((gag) => gag.id));
  observations.hq = new Set(
    raw.observations && Array.isArray(raw.observations.hq)
      ? raw.observations.hq.filter((id) => hqGags.has(id))
      : []
  );
  const finaleGags = new Set(FINALE.gags.map((gag) => gag.id));
  observations[FINALE.id] = new Set(
    raw.observations && Array.isArray(raw.observations[FINALE.id])
      ? raw.observations[FINALE.id].filter((id) => finaleGags.has(id))
      : []
  );

  const validFinaleEvidence = new Set(FINALE.evidence.map((item) => item.id));
  const finaleFound = new Set(
    Array.isArray(raw.finaleFound)
      ? raw.finaleFound.filter((id) => validFinaleEvidence.has(id))
      : []
  );

  const validHints = validHintKeys();
  const validWrongs = validWrongKeys();
  const hintKeys = new Set(
    raw.stats && Array.isArray(raw.stats.hintKeys)
      ? raw.stats.hintKeys.filter((key) => validHints.has(key))
      : []
  );
  const wrongKeys = new Set(
    raw.stats && Array.isArray(raw.stats.wrongKeys)
      ? raw.stats.wrongKeys.filter((key) => validWrongs.has(key))
      : []
  );

  const nextCaseIndex = completedCases.size;
  const activeCaseIndex = CASES.findIndex((gameCase) => gameCase.id === raw.activeCaseId);
  let phase = ["hq", "case", "finale", "complete"].includes(raw.phase) ? raw.phase : "hq";
  if (phase === "case" && (activeCaseIndex !== nextCaseIndex || activeCaseIndex < 0)) {
    phase = nextCaseIndex >= CASES.length ? "finale" : "hq";
  }
  if ((phase === "finale" || phase === "complete") && nextCaseIndex < CASES.length) {
    phase = "hq";
  }
  if (phase === "complete" && finaleFound.size < FINALE.evidence.length) {
    phase = "finale";
  }

  return {
    phase,
    firstCase: FirstCaseModel.normalize(raw.firstCase, collected.daycare.has("receipts")),
    nextCaseIndex,
    activeCaseIndex: phase === "case" ? activeCaseIndex : -1,
    collected,
    interviews,
    observations,
    finaleFound,
    completedCases,
    hintKeys,
    wrongKeys,
    objectiveCollapsed: Boolean(raw.objectiveCollapsed),
    muted: Boolean(raw.muted),
    seconds: clamp(Math.floor(Number(raw.seconds) || 0), 0, 359999),
    savedAt: Number(raw.savedAt) || Date.now()
  };
}

function readSave() {
  const saved = getStoredValue(SAVE_KEY);
  if (!saved) return null;
  try {
    return sanitizeSave(JSON.parse(saved));
  } catch (error) {
    return null;
  }
}

function serializeSave() {
  const collected = {};
  const interviews = {};
  const observations = {};
  for (const gameCase of CASES) {
    collected[gameCase.id] = [...state.collected[gameCase.id]];
    interviews[gameCase.id] = { ...state.interviews[gameCase.id] };
    observations[gameCase.id] = [...state.observations[gameCase.id]];
  }
  observations.hq = [...state.observations.hq];
  observations[FINALE.id] = [...state.observations[FINALE.id]];

  const activeCase = CASES[state.activeCaseIndex];
  const checkpointPhase = state.phase === "case" && activeCase && state.completedCases.has(activeCase.id)
    ? "hq"
    : state.phase;

  return {
    version: SAVE_VERSION,
    firstCase: state.firstCase,
    savedAt: Date.now(),
    phase: checkpointPhase,
    nextCaseIndex: state.nextCaseIndex,
    activeCaseId: checkpointPhase === "case" && activeCase ? activeCase.id : null,
    collected,
    interviews,
    observations,
    finaleFound: [...state.finaleFound],
    completedCases: [...state.completedCases],
    objectiveCollapsed: state.objectiveCollapsed,
    muted: state.muted,
    seconds: state.seconds,
    stats: {
      hintKeys: [...state.hintKeys],
      wrongKeys: [...state.wrongKeys]
    }
  };
}

function saveGame() {
  if (state.phase === "title" || state.finished) return;
  if (setStoredValue(SAVE_KEY, JSON.stringify(serializeSave()))) {
    updateTitleSaveState();
  }
}

function applySave(saved) {
  state.phase = saved.phase;
  state.firstCase = saved.firstCase;
  state.nextCaseIndex = saved.nextCaseIndex;
  state.activeCaseIndex = saved.activeCaseIndex;
  state.collected = saved.collected;
  state.interviews = saved.interviews;
  state.observations = saved.observations;
  state.finaleFound = saved.finaleFound;
  state.completedCases = saved.completedCases;
  state.hintKeys = saved.hintKeys;
  state.wrongKeys = saved.wrongKeys;
  state.finished = false;
  state.objectiveCollapsed = saved.objectiveCollapsed;
  state.muted = saved.muted;
  state.seconds = saved.seconds;
  state.hintedItemId = null;
  state.justFiledId = null;
  state.confront = { source: null, index: 0, isFinale: false, rejected: new Set(), locked: false };
}

function readBest() {
  const saved = getStoredValue(BEST_KEY);
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    if (!Number.isFinite(parsed.score) || !Number.isFinite(parsed.seconds)) return null;
    return {
      score: clamp(Math.floor(parsed.score), 0, SCORE_START),
      seconds: clamp(Math.floor(parsed.seconds), 0, 359999),
      rank: getRank(clamp(Math.floor(parsed.score), 0, SCORE_START))
    };
  } catch (error) {
    return null;
  }
}

function saveBest() {
  const score = getScore();
  const current = readBest();
  const isBetter = !current || score > current.score || (score === current.score && state.seconds < current.seconds);
  if (isBetter) {
    setStoredValue(BEST_KEY, JSON.stringify({ score, seconds: state.seconds }));
  }
}

function describeSave(saved) {
  if (saved.phase === "case") {
    const gameCase = CASES[saved.activeCaseIndex];
    return `Saved ${gameCase.kicker}: ${gameCase.title} · ${getFoundFromSave(saved)}/${TOTAL_EVIDENCE} clues · ${formatTime(saved.seconds)}`;
  }
  if (saved.phase === "finale") {
    return `Saved at Swindlah Tower · ${saved.finaleFound.size}/${FINALE.evidence.length} tower clues · ${formatTime(saved.seconds)}`;
  }
  if (saved.phase === "complete") {
    return `Final report ready · ${formatTime(saved.seconds)}`;
  }
  return `Saved at HQ · ${saved.completedCases.size}/${CASES.length} cases closed · ${formatTime(saved.seconds)}`;
}

function getFoundFromSave(saved) {
  return CASES.reduce((total, gameCase) => total + saved.collected[gameCase.id].size, 0) + saved.finaleFound.size;
}

function updateTitleSaveState() {
  const saved = readSave();
  const best = readBest();
  els.continueButton.classList.toggle("hidden", !saved);
  if (saved) {
    els.saveSummary.textContent = describeSave(saved);
    els.saveSummary.classList.remove("hidden");
  } else if (best) {
    els.saveSummary.textContent = `Best investigation: Rank ${best.rank} · ${best.score}/100 · ${formatTime(best.seconds)}`;
    els.saveSummary.classList.remove("hidden");
  } else {
    els.saveSummary.textContent = "";
    els.saveSummary.classList.add("hidden");
  }
}

function resetWorldState() {
  FirstCase.reset();
  state.firstCase = FirstCaseModel.normalize();
  window.clearInterval(state.timerId);
  window.clearTimeout(state.hintTimerId);
  window.clearTimeout(state.filedTimerId);
  window.clearInterval(state.dialogue.typeId);
  for (const gameCase of CASES) {
    state.collected[gameCase.id] = new Set();
    state.interviews[gameCase.id] = { owner: false, witness: false };
    state.observations[gameCase.id] = new Set();
  }
  state.observations.hq = new Set();
  state.observations[FINALE.id] = new Set();
  state.finaleFound = new Set();
  state.completedCases = new Set();
  state.hintKeys = new Set();
  state.wrongKeys = new Set();
  state.finished = false;
  state.nextCaseIndex = 0;
  state.activeCaseIndex = -1;
  state.objectiveCollapsed = false;
  state.hintedItemId = null;
  state.justFiledId = null;
  state.seconds = 0;
  state.timerId = null;
  state.confront = { source: null, index: 0, isFinale: false, rejected: new Set(), locked: false };
  state.dialogue = { lines: [], index: 0, onDone: null, typeId: null, typing: false, fullText: "" };
  hideTransientUI();
}

function hideTransientUI() {
  CaseCinema.close(false);
  els.creditsPanel.classList.add("hidden");
  els.boardOverlay.classList.add("hidden");
  els.confrontOverlay.classList.add("hidden");
  els.caseModal.classList.add("hidden");
  els.caseTransition.classList.add("hidden");
  els.dialogueBox.classList.add("hidden");
  els.dialogueScrim.classList.add("hidden");
  if (typeof FieldKit !== "undefined") FieldKit.render();
  els.toast.classList.add("hidden");
  clearConfetti();
}

function enterGameShell() {
  preloadScenes();
  els.titleScreen.classList.add("hidden");
  els.gameScreen.classList.remove("hidden");
  els.muteButton.textContent = state.muted ? "Sound: Off" : "Sound: On";
  els.muteButton.setAttribute("aria-pressed", String(state.muted));
  window.requestAnimationFrame(() => {
    syncSceneGeometry();
    if (!CaseCinema.active && !getActiveDialog()) focusSceneLead();
  });
}

function startTimer() {
  window.clearInterval(state.timerId);
  state.timerId = window.setInterval(() => {
    if (CaseCinema.active || FirstCase.busy || document.visibilityState === "hidden") return;
    state.seconds += 1;
    if (state.seconds % 15 === 0) saveGame();
  }, 1000);
}

function startNewGame() {
  const saved = readSave();
  if (saved && !window.confirm("Start a new case? Your saved investigation will be replaced.")) {
    return;
  }
  removeStoredValue(SAVE_KEY);
  resetWorldState();
  state.phase = "hq";
  enterGameShell();
  startTimer();
  loadHQ();
  playSfx("phone");
}

function continueGame() {
  const saved = readSave();
  if (!saved) {
    updateTitleSaveState();
    return;
  }
  resetWorldState();
  applySave(saved);
  playSfx("select");
  enterGameShell();
  if (saved.phase !== "complete") startTimer();

  if (saved.phase === "case") {
    loadCase(saved.activeCaseIndex, false, true);
  } else if (saved.phase === "finale") {
    loadFinale(false, true);
  } else if (saved.phase === "complete") {
    loadFinale(false, true);
    state.phase = "complete";
    showEnding();
  } else {
    loadHQ(true);
  }
}

function syncSceneGeometry() {
  const rail = document.getElementById("desktopObjective");
  const objectiveParent = window.matchMedia("(min-width: 1100px)").matches ? rail : els.stage;
  if (els.objectivePanel.parentElement !== objectiveParent) objectiveParent.appendChild(els.objectivePanel);
  const width = els.stage.clientWidth;
  const height = els.stage.clientHeight;
  if (!width || !height) return;
  const ratio = ["hq", "case", "finale"].includes(state.phase) ? 16 / 9 : 1;
  const sceneWidth = Math.min(width, (height - (ratio > 1 ? 64 : 0)) * ratio);
  els.sceneWorld.style.width = `${sceneWidth}px`;
  els.sceneWorld.style.height = `${sceneWidth / ratio}px`;
}

if ("ResizeObserver" in window) {
  resizeObserver = new ResizeObserver(syncSceneGeometry);
  resizeObserver.observe(els.stage);
} else {
  window.addEventListener("resize", syncSceneGeometry);
}

function loadHQ(preservePanel = false) {
  state.phase = "hq";
  state.activeCaseIndex = -1;
  if (!preservePanel) state.objectiveCollapsed = false;
  setScene(ASSETS.hq, "Fraud Busters HQ", "Hotline Desk");
  renderHotspots(getHQHotspots().map((item) => ({ ...item, alwaysVisible: true })), HQ_GAGS, "hq");
  renderNPCs([{ role:"witness", name:"Timmy", avatar:ASSETS.timmy, x:10, y:89, action:()=>showDialogue([{speaker:"Timmy",text:"The hotline has our next lead. I would answer it, but David says the chain of custody starts with the phone cord.",avatar:ASSETS.timmy}]) }]);
  renderObjective();
  renderInventory([]);
  saveGame();
}

function getHQHotspots() {
  return [
    {
      id: "hotline",
      name: "Tip Hotline",
      sceneName: "Answer the hotline",
      icon: ASSETS.mic,
      x: 16,
      y: 71,
      action: () => {
        const nextCase = CASES[state.nextCaseIndex];
        if (nextCase) {
          showDialogue([
            { speaker: "Timmy", text: [
              "Quality Learing Center. Fifty children on the books, and the neighbors haven’t seen one. Nik, ask Mrs. Busybody what she’s seen.",
              "Feeding Our Furry Friends claims two hundred rescue dogs. Henderson lives next door. Ask what he’s actually seen.",
              "Sunny Days claims a hundred meals a day. Carl has been watching the kitchen. Bring the Roster Reader."
            ][state.nextCaseIndex], avatar: ASSETS.timmy },
            { speaker: "David", text: [
              "An imaginary class. Finally, a field trip with available seats.",
              "Two hundred dogs. Someone should at least be complaining about the barking.",
              "If the books are cooked, I’d like to meet the chef."
            ][state.nextCaseIndex], avatar: ASSETS.david }
          ], () => showCaseTransition(nextCase, () => loadCase(state.nextCaseIndex)));
        } else {
          showDialogue([
            { speaker: "Timmy", text: "All three cases point to one address: Swindlah Tower.", avatar: ASSETS.timmy },
            { speaker: "David", text: "Then the paper trail has a penthouse.", avatar: ASSETS.david }
          ], () => showCaseTransition(FINALE, loadFinale));
        }
      }
    },
    {
      id: "board",
      name: "Evidence Board",
      icon: ASSETS.folder,
      x: 12,
      y: 37,
      action: openBoard
    }
  ];
}

function loadCase(index, showArrival = true, preservePanel = false) {
  const gameCase = CASES[index];
  if (!gameCase) {
    loadHQ();
    return;
  }
  state.phase = "case";
  state.activeCaseIndex = index;
  if (!preservePanel) state.objectiveCollapsed = true;
  setScene(gameCase.background, gameCase.kicker, gameCase.title);
  renderHotspots(getVisibleEvidence(gameCase).map((item) => ({
    ...item,
    action: () => collectEvidence(gameCase, item),
    found: state.collected[gameCase.id].has(item.id)
  })), gameCase.gags, gameCase.id);
  renderNPCs([
    {
      role: "owner",
      ...gameCase.owner,
      interviewed: state.interviews[gameCase.id].owner,
      action: () => talkTo(gameCase, "owner")
    },
    {
      role: "witness",
      ...gameCase.witness,
      interviewed: state.interviews[gameCase.id].witness,
      action: () => talkTo(gameCase, "witness")
    }
  ]);
  renderObjective();
  renderInventory(gameCase.evidence, gameCase.id);
  saveGame();
  if (showArrival && gameCase.arrival) showDialogue(gameCase.arrival);
  else if (showArrival) focusSceneLead();
}

function loadFinale(showIntro = true, preservePanel = false) {
  state.phase = "finale";
  state.activeCaseIndex = -1;
  if (!preservePanel) state.objectiveCollapsed = true;
  setScene(FINALE.background, FINALE.kicker, FINALE.title);
  renderHotspots(FINALE.evidence.map((item) => ({
    ...item,
    action: () => collectFinaleEvidence(item),
    found: state.finaleFound.has(item.id)
  })), FINALE.gags, FINALE.id);
  renderNPCs([
    { role: "owner", ...FINALE.owner, action: talkToSwindlah }
  ]);
  renderObjective();
  renderInventory(FINALE.evidence, FINALE.id);
  saveGame();
  if (showIntro) {
    showDialogue([
      { speaker: "Nik", text: "All roads lead to the tower.", avatar: ASSETS.nik },
      { speaker: "David", text: "Every fraudster loves a central filing system until someone files it against them.", avatar: ASSETS.david }
    ]);
  }
}

function setScene(src, kicker, title) {
  if (typeof FieldKit !== "undefined") FieldKit.reset();
  els.stage.style.setProperty("--scene-image", `url("${src}")`);
  els.stage.setAttribute("aria-label", `${kicker}: ${title} investigation scene`);
  if (reducedMotion.matches || !els.sceneBg.getAttribute("src")) {
    els.sceneBg.src = src;
    els.sceneBg.style.opacity = "1";
  } else {
    els.sceneBg.style.opacity = "0.35";
    window.setTimeout(() => {
      els.sceneBg.src = src;
      els.sceneBg.style.opacity = "1";
    }, 90);
  }
  els.locationKicker.textContent = kicker;
  els.locationTitle.textContent = title;
  window.requestAnimationFrame(syncSceneGeometry);
}

function getVisibleEvidence(gameCase) {
  return gameCase.evidence.filter((item) =>
    !item.hidden ||
    state.interviews[gameCase.id].witness ||
    state.collected[gameCase.id].has(item.id)
  );
}

function getSceneLead() {
  if (state.phase === "hq") {
    return { target: '[data-item-id="hotline"]', message: "Answer the hotline to pick up the next case." };
  }
  if (state.phase !== "case" || state.activeCaseIndex !== 0) return null;
  if (!state.interviews.daycare.witness) {
    return { target: ".npc-witness", message: "Talk to Mrs. Busybody. She’s been watching the daycare." };
  }
  if (state.collected.daycare.size === 0) {
    return { target: '[data-item-id="signin"]', message: "Check the sign-in sheet against the daycare’s claim." };
  }
  return null;
}

function focusSceneLead() {
  const lead = els.sceneWorld.querySelector(".scene-lead");
  (lead || els.hintButton).focus({ preventScroll: true });
}

function renderHotspots(items, gags, sceneId) {
  els.hotspotLayer.innerHTML = "";
  for (const item of items) {
    const button = document.createElement("button");
    const name = !item.found && item.sceneName ? item.sceneName : item.name;
    const hinted = item.id === state.hintedItemId && !item.found;
    button.className = `hotspot${item.found ? " found" : ""}${hinted ? " hinted" : ""}${item.alwaysVisible ? " visible" : ""}`;
    button.style.left = `${item.x}%`;
    button.style.top = `${item.y}%`;
    button.style.setProperty("--shimmer-delay", `${(item.x * 7 + item.y * 13) % 50 / 10}s`);
    button.type = "button";
    button.setAttribute("aria-label", name);
    button.dataset.itemId = item.id;
    button.innerHTML = `<img src="${item.icon}" alt="" /><span>${name}</span>`;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (typeof FieldKit !== "undefined" && FieldKit.useOnObject(item.id, name, event.detail > 1)) return;
      WalkScene.approach(item.id, item.action, event.detail > 1);
    });
    els.hotspotLayer.appendChild(button);
  }
  const observedSet = state.observations[sceneId] || new Set();
  for (const gag of gags || []) {
    const button = document.createElement("button");
    const observed = observedSet.has(gag.id);
    const marinaKey = gag.id === "gag-award" && state.collected.charity.has("ledger");
    const name = marinaKey ? "Marina key" : gag.name;
    button.className = `hotspot gag${observed ? " observed" : ""}${marinaKey ? " marina-key" : ""}`;
    button.style.left = `${gag.x}%`;
    button.style.top = `${gag.y}%`;
    button.type = "button";
    button.dataset.itemId = gag.id;
    button.setAttribute("aria-label", `${name}${observed ? ", observation logged" : ""}`);
    button.innerHTML = marinaKey ? `<b aria-hidden="true">MV-204</b><span>${name}</span>` : `<span>${name}</span>`;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (typeof FieldKit !== "undefined" && FieldKit.useOnObject(gag.id, name, event.detail > 1)) return;
      WalkScene.approach(gag.id, () => {
        playSfx(marinaKey ? "key" : "select");
        if (!marinaKey) FieldKit.gag(gag.id);
        const firstObservation = !observedSet.has(gag.id);
        if (firstObservation) {
          observedSet.add(gag.id);
          button.classList.add("observed");
          button.setAttribute("aria-label", `${name}, observation logged`);
          renderObjective();
          saveGame();
        }
        const lines = marinaKey ? [
          { speaker: "Nik", text: "Marina Vista, slip 12. There’s a paw print on the key tag.", avatar: ASSETS.nik },
          { speaker: "David", text: "Finally, a rescue with assigned parking.", avatar: ASSETS.david }
        ] : gag.lines;
        showDialogue(lines, firstObservation ? () => {
          showToast(`Field observation logged · ${observedSet.size}/${gags.length}`);
        } : null);
      }, event.detail > 1);
    });
    els.hotspotLayer.appendChild(button);
  }
}

function renderNPCs(people) {
  els.npcLayer.innerHTML = "";
  for (const person of people) {
    const button = document.createElement("button");
    button.className = `npc npc-${person.role}${person.interviewed ? " interviewed" : ""}`;
    button.style.left = `${person.x}%`;
    button.style.top = `${person.y}%`;
    button.type = "button";
    button.setAttribute("aria-label", `${person.name}${person.interviewed ? ", interview complete" : ""}`);
    button.innerHTML = `<img src="${person.avatar}" alt="" /><span>${person.name}</span>${person.interviewed ? '<i aria-hidden="true">✓</i>' : ""}`;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (typeof FieldKit !== "undefined" && FieldKit.ask(person, event.detail > 1)) return;
      WalkScene.approach(person.role, person.action, event.detail > 1);
    });
    els.npcLayer.appendChild(button);
  }
}

function renderObjective() {
  FirstCase.render();
  els.sceneWorld.querySelector(".scene-lead")?.classList.remove("scene-lead");
  const lead = getSceneLead();
  if (lead) els.sceneWorld.querySelector(lead.target)?.classList.add("scene-lead");
  FieldKit.render();
  const collapsedClass = state.objectiveCollapsed ? " compact" : "";
  if (state.phase === "hq") {
    const nextCase = CASES[state.nextCaseIndex];
    els.objectivePanel.className = "objective-panel";
    els.objectivePanel.innerHTML = `
      <div class="objective-top">
        <div>
          <p class="eyebrow">Headquarters</p>
          <h3>${nextCase ? "A fresh tip is waiting" : "The mastermind is exposed"}</h3>
        </div>
      </div>
      <p class="objective-copy">${nextCase ? "Answer the hotline, then head out before the paperwork dries." : "Answer the hotline and follow the trail to Swindlah Tower."}</p>
      <div class="checks">
        <div class="check-row"><span>Cases closed</span><strong>${state.completedCases.size}/3</strong></div>
        <div class="check-row"><span>Total evidence</span><strong>${getTotalFound()}/${TOTAL_EVIDENCE}</strong></div>
        <div class="check-row"><span>Field notes</span><strong>${getTotalObservations()}/${getObservationTotal()}</strong></div>
        <div class="check-row"><span>Rating</span><strong>${getScore()}/100 <span class="rank-mark">${getRank()}</span></strong></div>
      </div>
      <button id="objectiveAction" class="primary-button">${nextCase ? "Take Tip" : "Go To Tower"}</button>
    `;
    document.getElementById("objectiveAction").addEventListener("click", () => {
      const hotline = getHQHotspots()[0];
      WalkScene.approach("hotline",hotline.action);
    });
    return;
  }

  if (state.phase === "case") {
    const gameCase = CASES[state.activeCaseIndex];
    const found = state.collected[gameCase.id].size;
    const interviews = state.interviews[gameCase.id];
    const ready = found === gameCase.evidence.length && interviews.owner && interviews.witness;
    els.objectivePanel.className = `objective-panel${collapsedClass}`;
    els.objectivePanel.innerHTML = `
      <div class="objective-top">
        <div>
          <p class="eyebrow">${gameCase.kicker}</p>
          <h3>${gameCase.title}</h3>
        </div>
        <button id="objectiveToggle" class="panel-toggle" aria-label="${state.objectiveCollapsed ? "Expand case file" : "Minimize case file"}">${state.objectiveCollapsed ? "+" : "-"}</button>
      </div>
      <p class="objective-copy">${gameCase.subtitle}</p>
      <div class="checks">
        <div class="check-row"><span>Evidence</span><strong>${found}/${gameCase.evidence.length}</strong></div>
        <div class="check-row"><span>Owner interview</span><strong>${interviews.owner ? "Done" : "Open"}</strong></div>
        <div class="check-row"><span>Witness interview</span><strong>${interviews.witness ? "Done" : "Open"}</strong></div>
        <div class="check-row"><span>Field notes</span><strong>${state.observations[gameCase.id].size}/${gameCase.gags.length}</strong></div>
        <div class="check-row"><span>Rating</span><strong>${getScore()}/100 <span class="rank-mark">${getRank()}</span></strong></div>
      </div>
      <button id="confrontButton" class="primary-button" ${ready ? "" : "disabled"}>Confront Owner</button>
    `;
    bindObjectiveToggle();
    document.getElementById("confrontButton").addEventListener("click", confrontCase);
    return;
  }

  if (state.phase === "finale") {
    const found = state.finaleFound.size;
    const ready = found === FINALE.evidence.length;
    els.objectivePanel.className = `objective-panel${collapsedClass}`;
    els.objectivePanel.innerHTML = `
      <div class="objective-top">
        <div>
          <p class="eyebrow">${FINALE.kicker}</p>
          <h3>${FINALE.title}</h3>
        </div>
        <button id="objectiveToggle" class="panel-toggle" aria-label="${state.objectiveCollapsed ? "Expand case file" : "Minimize case file"}">${state.objectiveCollapsed ? "+" : "-"}</button>
      </div>
      <p class="objective-copy">${FINALE.subtitle}</p>
      <div class="checks">
        <div class="check-row"><span>Tower evidence</span><strong>${found}/${FINALE.evidence.length}</strong></div>
        <div class="check-row"><span>Closed cases</span><strong>3/3</strong></div>
        <div class="check-row"><span>Field notes</span><strong>${state.observations[FINALE.id].size}/${FINALE.gags.length}</strong></div>
        <div class="check-row"><span>Rating</span><strong>${getScore()}/100 <span class="rank-mark">${getRank()}</span></strong></div>
      </div>
      <button id="finalConfrontButton" class="primary-button" ${ready ? "" : "disabled"}>Confront Swindlah</button>
    `;
    bindObjectiveToggle();
    document.getElementById("finalConfrontButton").addEventListener("click", confrontFinale);
  }
}

function bindObjectiveToggle() {
  const toggle = document.getElementById("objectiveToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    state.objectiveCollapsed = !state.objectiveCollapsed;
    renderObjective();
    saveGame();
  });
}

function renderInventory(items, caseId) {
  const foundSet = caseId === FINALE.id ? state.finaleFound : state.collected[caseId] || new Set();
  const count = items.filter((item) => foundSet.has(item.id)).length;
  const total = items.length || 5;
  els.currentCount.textContent = `${count}/${total}`;
  document.querySelector(".inventory-head > span").textContent = items.length ? "Current Evidence" : "Case Files";
  els.inventoryTrack.innerHTML = "";

  if (!items.length) {
    els.currentCount.textContent = `${state.completedCases.size}/3`;
    for (const gameCase of CASES) {
      const card = document.createElement("article");
      const closed = state.completedCases.has(gameCase.id);
      card.className = `hq-case-card${closed ? " closed" : ""}`;
      card.innerHTML = `<small>${closed ? "CASE CLOSED" : gameCase.kicker}</small><h3>${gameCase.title}</h3>`;
      els.inventoryTrack.appendChild(card);
    }
    return;
  }

  for (const item of items) {
    els.inventoryTrack.appendChild(createSlot(item, foundSet.has(item.id)));
  }
}

function createSlot(item, found) {
  const slot = document.createElement("button");
  const fresh = found && item.id === state.justFiledId;
  slot.type = "button";
  slot.className = `inventory-slot${found ? "" : " empty"}${fresh ? " fresh" : ""}`;
  slot.dataset.evidenceId = item.id;
  slot.setAttribute("aria-label", found ? `${item.name}. Select to ask someone about it.` : "Unknown clue. Ask for a hint.");
  if (found) slot.setAttribute("aria-pressed", "false");
  slot.innerHTML = `
    <img src="${found ? item.icon : ASSETS.folder}" alt="" />
    <span>
      <strong>${found ? item.name : "Unknown clue"}</strong>
      <small>${found ? "Select to ask about it" : "Explore the room"}</small>
    </span>
  `;
  slot.addEventListener("click", () => {
    if (found) {
      if (typeof FieldKit !== "undefined") FieldKit.selectEvidence(item);
      else showToast(item.analysis || item.find || item.name);
    } else {
      showHint(true);
    }
  });
  return slot;
}

function markFreshFiled(itemId) {
  state.justFiledId = itemId;
  window.clearTimeout(state.filedTimerId);
  refreshCurrentView();
  state.filedTimerId = window.setTimeout(() => {
    if (state.justFiledId === itemId) {
      state.justFiledId = null;
      refreshCurrentView();
    }
  }, reducedMotion.matches ? 250 : 1800);
}

function collectEvidence(gameCase, item, restoredReceipt = false) {
  if (!restoredReceipt && FirstCase.interceptEvidence(item)) return;
  if (!restoredReceipt && Adventure.intercept(item, () => collectEvidence(gameCase,item,true))) return;
  if (state.collected[gameCase.id].has(item.id)) {
    showToast(`${item.name} is already filed.`);
    return;
  }
  playSfx("clue");
  state.collected[gameCase.id].add(item.id);
  saveGame();
  showDialogue([
    { speaker: "Nik", text: item.find, avatar: ASSETS.nik },
    { speaker: "David", text: item.analysis, avatar: ASSETS.david }
  ], () => {
    markFreshFiled(item.id);
    const found = state.collected[gameCase.id].size;
    if (found === gameCase.evidence.length) {
      showToast("Evidence set complete. The owner can be confronted.");
    } else {
      showToast(`${item.name} filed.`);
    }
  });
  refreshCurrentView();
}

function collectFinaleEvidence(item, verified = false) {
  if (!verified && Adventure.intercept(item, () => collectFinaleEvidence(item,true))) return;
  if (state.finaleFound.has(item.id)) {
    showToast(`${item.name} is already filed.`);
    return;
  }
  playSfx("clue");
  state.finaleFound.add(item.id);
  saveGame();
  showDialogue([
    { speaker: "Nik", text: item.find, avatar: ASSETS.nik },
    { speaker: "David", text: item.analysis, avatar: ASSETS.david }
  ], () => {
    markFreshFiled(item.id);
    if (state.finaleFound.size === FINALE.evidence.length) {
      showToast("The full fraud trail is connected.");
    } else {
      showToast(`${item.name} filed.`);
    }
  });
  refreshCurrentView();
}

function talkTo(gameCase, role) {
  if (FirstCase.interceptTalk(role)) return;
  const firstTime = !state.interviews[gameCase.id][role];
  if (!firstTime) {
    showDialogue(gameCase[role].lines);
    return;
  }

  showDialogue(gameCase[role].lines, () => {
    state.interviews[gameCase.id][role] = true;
    saveGame();
    refreshCurrentView();
    const unlockedClue = role === "witness"
      ? gameCase.evidence.find((item) => item.hidden && !state.collected[gameCase.id].has(item.id))
      : null;
    if (unlockedClue) {
      playSfx("hint");
      if (getSceneLead()) focusSceneLead();
      else pulseHint(unlockedClue.id);
      showToast(`New lead: ${unlockedClue.name} is now searchable.`);
    } else {
      showToast(`${gameCase[role].name}'s interview filed.`);
    }
  });
}

function talkToSwindlah() {
  showDialogue(FINALE.owner.lines);
}

function confrontCase() {
  const gameCase = CASES[state.activeCaseIndex];
  if (!gameCase) return;
  const interviews = state.interviews[gameCase.id];
  if (!interviews.owner || !interviews.witness) {
    showToast("Interview the owner and the witness before confronting anyone.");
    return;
  }
  if (state.collected[gameCase.id].size < gameCase.evidence.length) {
    showHint(false);
    return;
  }
  openConfront(gameCase, false);
}

function openConfront(source, isFinale) {
  rememberFocus("confront");
  state.confront = { source, index: 0, isFinale, rejected: new Set(), locked: false };
  els.confrontOverlay.classList.remove("hidden");
  renderConfrontClaim();
}

function closeConfront(restore = true) {
  els.confrontOverlay.classList.add("hidden");
  state.confront = { source: null, index: 0, isFinale: false, rejected: new Set(), locked: false };
  if (restore) restoreFocus("confront");
}

function renderConfrontClaim() {
  const { source, index } = state.confront;
  if (!source) return;
  const claim = source.claims[index];
  Portraits.set(els.confrontPortrait, source.owner.avatar);
  els.confrontKicker.textContent = `${source.owner.name} claims (${index + 1}/${source.claims.length})`;
  els.confrontClaim.textContent = `"${claim.text}"`;
  els.confrontClaim.classList.remove("countered");
  els.confrontPrompt.textContent = "Match the claim to your evidence. A rejected deduction costs 2 rating points; you can always try again.";
  els.confrontChoices.innerHTML = "";
  for (const item of source.evidence) {
    const card = document.createElement("button");
    const wrongKey = `${source.id}:claim:${index}:evidence:${item.id}`;
    const rejected = state.confront.rejected.has(item.id) || state.wrongKeys.has(wrongKey);
    card.type = "button";
    card.className = `confront-card${rejected ? " rejected" : ""}`;
    card.disabled = rejected;
    card.dataset.evidenceId = item.id;
    card.innerHTML = `<img src="${item.icon}" alt="" /><span>${item.name}${rejected ? "<small>Rejected</small>" : ""}</span>`;
    card.addEventListener("click", () => pickEvidence(item, card));
    els.confrontChoices.appendChild(card);
  }
  window.requestAnimationFrame(() => {
    const firstChoice = els.confrontChoices.querySelector("button:not(:disabled)");
    if (firstChoice) firstChoice.focus();
  });
}

function pickEvidence(item, card) {
  const confrontation = state.confront;
  const { source, index, isFinale } = confrontation;
  if (!source || state.confront.locked || card.disabled) return;
  const claim = source.claims[index];
  if (item.id !== claim.evidence) {
    const wrongKey = `${source.id}:claim:${index}:evidence:${item.id}`;
    const firstPenalty = !state.wrongKeys.has(wrongKey);
    state.wrongKeys.add(wrongKey);
    state.confront.rejected.add(item.id);
    state.confront.locked = true;
    playSfx("stamp");
    card.classList.add("wrong", "rejected");
    card.disabled = true;
    const cardLabel = card.querySelector("span");
    if (cardLabel && !cardLabel.querySelector("small")) {
      cardLabel.insertAdjacentHTML("beforeend", "<small>Rejected</small>");
    }
    els.confrontChoices.querySelectorAll("button").forEach((choice) => {
      choice.disabled = true;
    });
    els.confrontPrompt.textContent = `Rejected. ${source.owner.name}: "${claim.retort}"`;
    if (firstPenalty) {
      saveGame();
      renderObjective();
      showToast(`Deduction rejected · rating -${WRONG_PENALTY}`);
    }
    window.setTimeout(() => {
      if (state.confront !== confrontation || state.confront.source !== source || state.confront.index !== index) return;
      state.confront.locked = false;
      card.classList.remove("wrong");
      els.confrontChoices.querySelectorAll("button").forEach((choice) => {
        const choiceKey = `${source.id}:claim:${index}:evidence:${choice.dataset.evidenceId}`;
        const rejectedChoice = state.confront.rejected.has(choice.dataset.evidenceId)
          || state.wrongKeys.has(choiceKey);
        choice.disabled = rejectedChoice;
      });
      const nextChoice = els.confrontChoices.querySelector("button:not(:disabled)");
      if (nextChoice) nextChoice.focus();
    }, reducedMotion.matches ? 80 : 450);
    return;
  }
  state.confront.locked = true;
  els.confrontChoices.querySelectorAll("button").forEach((choice) => {
    choice.disabled = true;
  });
  playSfx("clue");
  els.confrontKicker.textContent = "Nik fires back";
  Portraits.set(els.confrontPortrait, ASSETS.nik);
  els.confrontClaim.textContent = `"${claim.win}"`;
  els.confrontClaim.classList.add("countered");
  els.confrontPrompt.textContent = "";
  els.confrontChoices.innerHTML = "";
  const continueButton = document.createElement("button");
  continueButton.className = "primary-button";
  continueButton.textContent = index + 1 < source.claims.length ? "Next claim →" : "Deliver the verdict →";
  continueButton.addEventListener("click", () => {
    if (state.confront !== confrontation || state.confront.source !== source || state.confront.index !== index) return;
    continueButton.disabled = true;
    if (index + 1 < source.claims.length) {
      state.confront.index += 1;
      state.confront.rejected = new Set();
      state.confront.locked = false;
      renderConfrontClaim();
    } else {
      if (isFinale) {
        state.phase = "complete";
      } else {
        state.completedCases.add(source.id);
        state.nextCaseIndex = Math.max(state.nextCaseIndex, CASES.findIndex((gameCase) => gameCase.id === source.id) + 1);
      }
      saveGame();
      closeConfront(false);
      if (isFinale) {
        showDialogue(FINALE.confront, () => CaseCinema.play("ending", showEnding));
      } else {
        showDialogue(source.confront, () => completeCase(source));
      }
    }
  }, { once: true });
  els.confrontChoices.appendChild(continueButton);
  continueButton.focus();
}

function completeCase(gameCase) {
  playSfx("bust");
  state.completedCases.add(gameCase.id);
  if (state.nextCaseIndex === state.activeCaseIndex) {
    state.nextCaseIndex += 1;
  }
  saveGame();
  showModal("Fraud Busted", `${gameCase.title} closed`, `${gameCase.bust} Current rating: ${getRank()} · ${getScore()}/100.`, "Return To HQ", () => {
    loadHQ();
    CaseCinema.play({daycare:"interlude",charity:"charityAfter",seniors:"towerBefore"}[gameCase.id]);
  });
}

function confrontFinale() {
  if (state.finaleFound.size < FINALE.evidence.length) {
    showHint(false);
    return;
  }
  openConfront(FINALE, true);
}

function showEnding() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
  state.finished = true;
  saveBest();
  removeStoredValue(SAVE_KEY);
  updateTitleSaveState();
  playSfx("finale");
  showModal(
    "Nik & David Will Return",
    "$100 Million Fraud Exposed",
    `Rank ${getRank()} · ${getScore()}/100. Case closed in ${formatTime(state.seconds)} with ${state.hintKeys.size} scored hint${state.hintKeys.size === 1 ? "" : "s"}, ${state.wrongKeys.size} rejected deduction${state.wrongKeys.size === 1 ? "" : "s"}, and ${getTotalObservations()}/${getObservationTotal()} field observations. The hotline is quiet for exactly four seconds.`,
    "Back to title",
    resetGame,
    { celebrate: true }
  );
}

function showModal(kicker, title, text, buttonText, action, options = {}) {
  rememberFocus("modal");
  els.modalKicker.textContent = kicker;
  els.modalTitle.textContent = title;
  els.modalText.textContent = text;
  els.modalButton.textContent = buttonText;
  els.caseModal.classList.toggle("celebrate", Boolean(options.celebrate));
  els.caseModal.classList.remove("hidden");
  if (options.celebrate && !reducedMotion.matches) {
    spawnConfetti();
  }
  window.requestAnimationFrame(() => els.modalButton.focus());
  els.modalButton.onclick = () => {
    els.caseModal.classList.add("hidden");
    els.caseModal.classList.remove("celebrate");
    clearConfetti();
    playSfx("select");
    action();
    delete focusReturn.modal;
  };
}

function showCaseTransition(gameCase, onDone) {
  playSfx("stamp");
  els.transitionKicker.textContent = gameCase.kicker || "Case file";
  els.transitionTitle.textContent = gameCase.title;
  els.transitionText.textContent = gameCase.subtitle || "Every lead points to the tower.";
  els.caseTransition.classList.remove("hidden");
  window.setTimeout(() => {
    els.caseTransition.classList.add("hidden");
    onDone();
  }, reducedMotion.matches ? 80 : 1150);
}

function spawnConfetti() {
  clearConfetti();
  const colors = ["#f6c84c", "#f36f2a", "#2eaa5f", "#225ea8", "#ffffff"];
  for (let index = 0; index < 64; index += 1) {
    const bit = document.createElement("i");
    bit.className = "confetti-bit";
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[index % colors.length];
    bit.style.animationDelay = `${Math.random() * 0.8}s`;
    bit.style.setProperty("--drift", `${Math.round((Math.random() - 0.5) * 240)}px`);
    els.caseModal.appendChild(bit);
  }
}

function clearConfetti() {
  els.caseModal.querySelectorAll(".confetti-bit").forEach((bit) => bit.remove());
}

function resetGame() {
  removeStoredValue(SAVE_KEY);
  resetWorldState();
  state.phase = "hq";
  startTimer();
  loadHQ();
  playSfx("phone");
  focusSceneLead();
}

function refreshCurrentView() {
  if (state.phase === "case") {
    const gameCase = CASES[state.activeCaseIndex];
    renderHotspots(getVisibleEvidence(gameCase).map((item) => ({
      ...item,
      action: () => collectEvidence(gameCase, item),
      found: state.collected[gameCase.id].has(item.id)
    })), gameCase.gags, gameCase.id);
    renderNPCs([
      {
        role: "owner",
        ...gameCase.owner,
        interviewed: state.interviews[gameCase.id].owner,
        action: () => talkTo(gameCase, "owner")
      },
      {
        role: "witness",
        ...gameCase.witness,
        interviewed: state.interviews[gameCase.id].witness,
        action: () => talkTo(gameCase, "witness")
      }
    ]);
    renderInventory(gameCase.evidence, gameCase.id);
  }

  if (state.phase === "finale") {
    renderHotspots(FINALE.evidence.map((item) => ({
      ...item,
      action: () => collectFinaleEvidence(item),
      found: state.finaleFound.has(item.id)
    })), FINALE.gags, FINALE.id);
    renderInventory(FINALE.evidence, FINALE.id);
  }

  renderObjective();
  if (!els.boardOverlay.classList.contains("hidden")) {
    renderBoard();
  }
}

function openBoard() {
  if (!els.boardOverlay.classList.contains("hidden")) return;
  rememberFocus("board");
  renderBoard();
  els.boardOverlay.classList.remove("hidden");
  window.requestAnimationFrame(() => els.closeBoard.focus());
}

function closeBoard() {
  if (els.boardOverlay.classList.contains("hidden")) return;
  els.boardOverlay.classList.add("hidden");
  restoreFocus("board");
}

function renderBoard() {
  els.boardStats.innerHTML = `Rank <span class="rank-mark">${getRank()}</span> · ${getScore()}/100 · ${state.hintKeys.size} hints · ${state.wrongKeys.size} rejected`;
  const chips = [
    ...CASES.map((gameCase) => {
      const found = state.collected[gameCase.id].size;
      return `
        <div class="trail-chip">
          <strong>${gameCase.title}</strong>
          <small>${found}/${gameCase.evidence.length} clues · ${state.observations[gameCase.id].size}/${gameCase.gags.length} observations</small>
        </div>
      `;
    }),
    `
      <div class="trail-chip">
        <strong>${FINALE.title}</strong>
        <small>${state.finaleFound.size}/${FINALE.evidence.length} clues · ${state.observations[FINALE.id].size}/${FINALE.gags.length} observations</small>
      </div>
    `
  ];
  els.boardTrail.innerHTML = chips.join("");

  const allCards = [];
  for (const gameCase of CASES) {
    for (const item of gameCase.evidence) {
      allCards.push({ item, found: state.collected[gameCase.id].has(item.id), source: gameCase.title });
    }
  }
  for (const item of FINALE.evidence) {
    allCards.push({ item, found: state.finaleFound.has(item.id), source: FINALE.title });
  }
  els.boardGrid.innerHTML = allCards.map((entry, index) =>
    boardCard(entry.item, entry.found, entry.source, index)
  ).join("");
  els.boardGrid.querySelectorAll("button[data-board-index]").forEach((button) => {
    const entry = allCards[Number(button.dataset.boardIndex)];
    button.addEventListener("click", () => showToast(entry.item.analysis || entry.item.find));
  });
}

function boardCard(item, found, source, index) {
  const tag = found ? "button" : "article";
  const attributes = found
    ? `type="button" data-board-index="${index}" aria-label="${item.name}. Read analysis."`
    : "";
  return `
    <${tag} ${attributes} class="board-card${found ? "" : " locked"}">
      <img src="${found ? item.icon : ASSETS.folder}" alt="" />
      <span>
        <strong>${found ? item.name : "Unfiled clue"}</strong>
        <small>${found ? `${source}: ${item.analysis}` : source}</small>
      </span>
    </${tag}>
  `;
}

function getHintTarget() {
  if (state.phase === "hq") {
    return { key: null, message: "The hotline has the next lead.", itemId: null };
  }

  if (state.phase === "case") {
    const gameCase = CASES[state.activeCaseIndex];
    if (!gameCase) return null;
    const interviews = state.interviews[gameCase.id];
    const visible = getVisibleEvidence(gameCase);
    const missing = visible.find((item) => !state.collected[gameCase.id].has(item.id));
    if (missing) {
      return {
        key: `${gameCase.id}:evidence:${missing.id}`,
        message: `Next clue: ${missing.name} is glowing.`,
        itemId: missing.id
      };
    }
    const hiddenMissing = gameCase.evidence.some((item) =>
      item.hidden && !state.collected[gameCase.id].has(item.id)
    );
    if (hiddenMissing && !interviews.witness) {
      return {
        key: `${gameCase.id}:witness`,
        message: `New evidence is locked behind ${gameCase.witness.name}'s interview.`,
        itemId: null
      };
    }
    if (!interviews.owner) {
      return {
        key: `${gameCase.id}:interview:owner`,
        message: `Interview ${gameCase.owner.name} before the confrontation.`,
        itemId: null
      };
    }
    if (!interviews.witness) {
      return {
        key: `${gameCase.id}:interview:witness`,
        message: `Interview ${gameCase.witness.name} before the confrontation.`,
        itemId: null
      };
    }
    return { key: null, message: "The owner is ready for a confrontation.", itemId: null };
  }

  if (state.phase === "finale") {
    const missing = FINALE.evidence.find((item) => !state.finaleFound.has(item.id));
    if (missing) {
      return {
        key: `${FINALE.id}:evidence:${missing.id}`,
        message: `Next clue: ${missing.name} is glowing.`,
        itemId: missing.id
      };
    }
    return { key: null, message: "Swindlah is ready for the folder treatment.", itemId: null };
  }

  return { key: null, message: "The final report is ready.", itemId: null };
}

function showHint(penalize = true) {
  if (FirstCase.active()) { FirstCase.showHint(); return; }
  if (WalkScene.enabled()) { Adventure.hint(); return; }
  const target = getHintTarget();
  if (!target) return;
  playSfx("hint");
  let charged = false;
  if (penalize && target.key && !state.hintKeys.has(target.key)) {
    state.hintKeys.add(target.key);
    charged = true;
    saveGame();
  }
  if (target.itemId) pulseHint(target.itemId);
  showToast(`${target.message}${charged ? ` · rating -${HINT_PENALTY}` : ""}`);
  renderObjective();
  if (!els.boardOverlay.classList.contains("hidden")) renderBoard();
}

function pulseHint(itemId) {
  state.hintedItemId = itemId;
  window.clearTimeout(state.hintTimerId);
  refreshCurrentView();
  state.hintTimerId = window.setTimeout(() => {
    if (state.hintedItemId === itemId) {
      state.hintedItemId = null;
      refreshCurrentView();
    }
  }, 4200);
}

function rememberFocus(key) {
  const active = document.activeElement;
  focusReturn[key] = active instanceof HTMLElement
    && active !== document.body
    && active !== document.documentElement
    ? active
    : null;
}

function restoreFocus(key) {
  const target = focusReturn[key];
  delete focusReturn[key];
  if (target && target.isConnected && target.offsetParent !== null && typeof target.focus === "function") {
    target.focus();
  } else if (!els.gameScreen.classList.contains("hidden")) {
    els.hintButton.focus();
  } else {
    els.startButton.focus();
  }
}

function openCredits() {
  if (!els.creditsPanel.classList.contains("hidden")) return;
  rememberFocus("credits");
  els.creditsPanel.classList.remove("hidden");
  window.requestAnimationFrame(() => els.closeCredits.focus());
}

function closeCredits() {
  if (els.creditsPanel.classList.contains("hidden")) return;
  els.creditsPanel.classList.add("hidden");
  restoreFocus("credits");
}

function showDialogue(lines, onDone) {
  if (!lines || !lines.length) {
    if (onDone) onDone();
    return;
  }
  window.clearInterval(state.dialogue.typeId);
  state.dialogue.lines = lines;
  state.dialogue.index = 0;
  state.dialogue.onDone = onDone || null;
  if (els.dialogueBox.classList.contains("hidden")) rememberFocus("dialogue");
  els.dialogueBox.classList.remove("hidden");
  els.dialogueScrim.classList.remove("hidden");
  renderDialogueLine();
  window.requestAnimationFrame(() => els.dialogueNext.focus());
}

function renderDialogueLine() {
  const line = state.dialogue.lines[state.dialogue.index];
  if (!line) {
    finishDialogue();
    return;
  }

  window.clearInterval(state.dialogue.typeId);
  state.dialogue.typing = true;
  state.dialogue.fullText = line.text;
  els.dialogueNext.textContent = state.dialogue.index === state.dialogue.lines.length - 1 ? "Close" : "Next";
  els.dialogueSpeaker.textContent = line.speaker;
  if (typeof FieldKit !== "undefined") FieldKit.speaker(line.speaker);
  Portraits.set(els.dialoguePortrait, line.avatar || ASSETS.nik);
  els.dialogueText.textContent = "";
  els.dialogueAnnouncement.textContent = `${line.speaker}: ${line.text}`;

  if (reducedMotion.matches) {
    els.dialogueText.textContent = state.dialogue.fullText;
    state.dialogue.typing = false;
    return;
  }
  let cursor = 0;
  state.dialogue.typeId = window.setInterval(() => {
    cursor += 1;
    els.dialogueText.textContent = state.dialogue.fullText.slice(0, cursor);
    if (cursor >= state.dialogue.fullText.length) {
      window.clearInterval(state.dialogue.typeId);
      state.dialogue.typing = false;
    }
  }, 15);
}

function advanceDialogue() {
  if (els.dialogueBox.classList.contains("hidden")) {
    return;
  }

  if (state.dialogue.typing) {
    window.clearInterval(state.dialogue.typeId);
    els.dialogueText.textContent = state.dialogue.fullText;
    state.dialogue.typing = false;
    return;
  }

  state.dialogue.index += 1;
  if (state.dialogue.index >= state.dialogue.lines.length) {
    finishDialogue();
    return;
  }
  renderDialogueLine();
}

function finishDialogue() {
  WalkScene.cancel();
  if (typeof FieldKit !== "undefined") FieldKit.speaker(null);
  window.clearInterval(state.dialogue.typeId);
  els.dialogueBox.classList.add("hidden");
  els.dialogueScrim.classList.add("hidden");
  if (typeof FieldKit !== "undefined") FieldKit.render();
  restoreFocus("dialogue");
  const done = state.dialogue.onDone;
  state.dialogue.onDone = null;
  if (done) {
    done();
  }
}

function getActiveDialog() {
  const candidates = [
    document.getElementById("fieldPuzzle"),
    document.getElementById("invoiceBench"),
    els.caseModal,
    els.confrontOverlay,
    els.boardOverlay,
    els.dialogueBox,
    els.creditsPanel
  ];
  return candidates.find((candidate) => !candidate.classList.contains("hidden")) || null;
}

function trapDialogFocus(event) {
  const dialog = getActiveDialog();
  if (!dialog || event.key !== "Tab") return false;
  const focusable = [...dialog.querySelectorAll(
    'button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])'
  )].filter((element) => element.offsetParent !== null);
  if (!focusable.length) return false;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return true;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
    return true;
  }
  return false;
}

function canToggleBoard() {
  return !els.gameScreen.classList.contains("hidden")
    && !FirstCase.busy
    && els.dialogueBox.classList.contains("hidden")
    && els.caseModal.classList.contains("hidden")
    && els.caseTransition.classList.contains("hidden")
    && els.confrontOverlay.classList.contains("hidden");
}

function handleKeydown(event) {
  if (trapDialogFocus(event)) return;
  if (event.key === "Escape") {
    if (!els.confrontOverlay.classList.contains("hidden")) {
      closeConfront();
    } else if (!els.boardOverlay.classList.contains("hidden")) {
      closeBoard();
    } else if (!els.creditsPanel.classList.contains("hidden")) {
      closeCredits();
    }
    return;
  }
  if (event.key === "Enter" || event.key === " ") {
    const targetIsButton = event.target instanceof Element && Boolean(event.target.closest("button"));
    if (!targetIsButton && !els.dialogueBox.classList.contains("hidden")) {
      event.preventDefault();
      advanceDialogue();
    }
  }
  if (!event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "b") {
    if (!canToggleBoard() && els.boardOverlay.classList.contains("hidden")) return;
    if (els.boardOverlay.classList.contains("hidden")) {
      openBoard();
    } else {
      closeBoard();
    }
  }
}

function getTotalFound() {
  return CASES.reduce((total, gameCase) => total + state.collected[gameCase.id].size, 0) + state.finaleFound.size;
}

function getTotalObservations() {
  return Object.values(state.observations).reduce((total, observations) => total + observations.size, 0);
}

function getObservationTotal() {
  return HQ_GAGS.length
    + CASES.reduce((total, gameCase) => total + gameCase.gags.length, 0)
    + FINALE.gags.length;
}

function getScore() {
  return Math.max(
    0,
    SCORE_START - state.hintKeys.size * HINT_PENALTY - state.wrongKeys.size * WRONG_PENALTY
  );
}

function getRank(score = getScore()) {
  if (score === 100) return "S";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function playSfx(type) {
  if (state.muted) return;
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    const now = audioContext.currentTime;
    const gain = audioContext.createGain();
    gain.connect(audioContext.destination);
    gain.gain.setValueAtTime(0.0001, now);

    const patterns = {
      select: [[440, 0.04], [660, 0.05]],
      phone: [[980, 0.08], [720, 0.08], [980, 0.08], [720, 0.13]],
      key: [[1340, 0.04], [1100, 0.08]],
      hint: [[520, 0.06], [760, 0.08]],
      clue: [[620, 0.06], [880, 0.07], [1180, 0.1]],
      scan: [[220, 0.12], [330, 0.12], [440, 0.15], [660, 0.18], [880, 0.25]],
      gag: [[880, 0.06], [660, 0.06], [440, 0.06], [1100, 0.12]],
      stamp: [[170, 0.08], [120, 0.14]],
      bust: [[220, 0.08], [330, 0.08], [440, 0.16]],
      finale: [[392, 0.1], [523, 0.1], [659, 0.14], [784, 0.24]]
    };
    const notes = patterns[type] || patterns.select;
    let offset = 0;
    for (const [frequency, duration] of notes) {
      const osc = audioContext.createOscillator();
      osc.type = type === "stamp" ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(frequency, now + offset);
      osc.connect(gain);
      osc.start(now + offset);
      osc.stop(now + offset + duration);
      offset += duration + 0.025;
    }
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.12, offset + 0.05));
  } catch (error) {
    // Audio is a bonus; gameplay should never depend on it.
  }
}

let toastId = null;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  window.clearTimeout(toastId);
  toastId = window.setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 2300);
}

els.muteButton.setAttribute("aria-pressed", String(state.muted));
updateTitleSaveState();
