/* Prop rectangles and safe approach marks in percent of each 16:9 scene. */
const WalkScenes = {
  daycare: {
    signin: [39,43,37,73,7,9,'the sign-in sheet'],
    toys: [14,55,26,78,22,25,'the wrapped playground'],
    'empty-photo': [59.5,40,53,72,9,10,'the classroom photo'],
    receipts: [57,53,53,72,8,7,'the suspicious receipts'],
    note: [79,44,74,73,8,11,'the cubbies'],
    'gag-juice': [31,52,33,74,7,9,'the juice boxes'],
    'gag-crayons': [64,52,59,73,6,7,'the crayons'],
    'gag-sedan': [94,58,77,78,10,16,'the luxury sedan'],
    owner: [70,72,62,78,0,0,'Ms. Shifty'],
    witness: [10,88,23,88,0,0,'Mrs. Busybody']
  },
  charity: {
    'stock-dogs':[50,40,47,74,11,13,'the dog photo'], boat:[50,51,47,74,6,7,'the boat receipt'],
    kennels:[18,47,25,78,25,24,'the empty kennels'], ledger:[54,52,55,75,6,6,'the donation ledger'],
    food:[37,45,35,76,10,20,'the empty food shelves'],
    'gag-jar':[61,49,65,75,6,10,'the donation jar'], 'gag-squeak':[37.5,57,41,77,7,6,'the squeaky toy'],
    'gag-award':[82,40,79,77,13,17,'the trophy display'], owner:[71,83,63,86,0,0,'Chad'], witness:[10,90,23,90,0,0,'Henderson']
  },
  seniors: {
    'bingo-banner':[42,16,40,74,30,13,'the old bingo banner'], 'meal-trays':[80,40,73,75,12,9,'the meal trays'],
    medicare:[52,45,49,75,7,7,'the billing forms'], attendance:[28,32,27,76,6,11,'the attendance clipboard'],
    kitchen:[78,28,76,76,20,18,'the kitchen window'], 'gag-bingo':[33,43,36,77,7,10,'the bingo cage'],
    'gag-candy':[93,46,87,78,6,8,'the candy bowl'], 'gag-piano':[12,48,17,78,18,20,'the piano'],
    owner:[60,86,53,88,0,0,'Slick Rick'], witness:[8,91,21,91,0,0,'Carl']
  },
  finale: {
    'master-ledger':[83,41,77,76,7,12,'the master ledger'], 'money-monitor':[57,22,58,76,30,24,'the account monitor'],
    'secret-lair':[35,44,38,75,7,11,'the lair invoice'], 'gag-chair':[12,43,17,76,18,25,'the villain chair'],
    'gag-fog':[95,58,88,78,10,13,'the fog machine'], 'gag-portrait':[30,19,30,75,12,23,'the oil portrait'],
    owner:[10,85,23,87,0,0,'Dr. Swindlah']
  },
  hq: {
    hotline:[49,41,47,76,9,9,'the hotline'], board:[25,25,26,75,25,25,'the evidence board'],
    'gag-coffee':[83,35,80,77,7,11,'the coffee pot'], 'gag-cabinet':[94,40,89,78,9,23,'the filing cabinet'],
    'gag-window':[64,19,59,75,24,22,'the window'], witness:[10,89,23,89,0,0,'Timmy']
  }
};
if (typeof module !== 'undefined') module.exports = WalkScenes;
