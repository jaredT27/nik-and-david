/* Puzzle gates derive from filed evidence, so pre-upgrade saves stay compatible. */
const AdventureModel = (() => {
  const puzzles = {
    charity: { id:'ledger', prerequisite:'boat', title:'Follow the donation.', tool:'Ledger Lens',
      lead:'The boat receipt supplies the vendor number. Compare it with the donation ledger.',
      source:['BOAT RECEIPT','Vendor MV-204 · Marina Vista','Sport boat · $118,000'],
      record:['DONATION LEDGER','MV-204 · “Kennel enrichment”','Transfer · $118,000'],
      question:'What did this donation actually pay for?',
      options:['Veterinary care','A sport boat','Dog food'], answer:1,
      success:'Same vendor, same amount. “Kennel enrichment” has a propeller.',
      retry:'Compare the vendor number and amount on both documents. The category label is the cover story.' },
    seniors: { id:'attendance', prerequisite:'medicare', title:'A very familiar guest list.', tool:'Roster Reader',
      lead:'Collect the billing forms, then compare them with Carl’s attendance clipboard.',
      source:['DAILY MEAL CLAIM','100 meals · identical entries','Same batch submitted every day'],
      record:['ATTENDANCE LOG','Blanche Devereaux · Dorothy Zbornak','Rose Nylund · same three signatures'],
      question:'Which finding contradicts the claim?',
      options:['A copied TV cast stands in for real diners','The handwriting is unusually neat','Lunch could have been served early'], answer:0,
      success:'A hundred meals, three sitcom characters, and a copy machine doing all the eating.',
      retry:'Compare the claimed diners with the names on the log. Neat handwriting does not establish that anyone ate here.' },
    finale: { id:'money-monitor', prerequisite:'master-ledger', title:'One account. Three fronts.', tool:'Trace the accounts',
      lead:'Read the master ledger first. Its beneficiary code identifies the destination account.',
      source:['MASTER LEDGER','Beneficiary SW-001','Swindlah Holdings · controlling owner'],
      record:['LIVE TRANSFER ROUTES','Daycare → SW-001 · Charity → SW-001','Senior meals → SW-001'],
      question:'Which account connects the entire scheme?',
      options:['Community services · CS-010','Office supplies · OS-100','Swindlah Holdings · SW-001'], answer:2,
      success:'All three routes lead to Swindlah. His screensaver defense is going to need work.',
      retry:'Match the destination code on all three transfer routes with the master ledger.' }
  };
  Object.assign(puzzles.charity, {
    instruction:'Use the Ledger Lens: select a detail on the boat receipt, then its match in the donation ledger. Connect the vendor AND the amount.',
    marks:{source:[{id:'boat-vendor',label:'Vendor · MV-204'},{id:'boat-amount',label:'Amount · $118,000'}],record:[{id:'kennel',label:'Category · Kennel enrichment'},{id:'ledger-amount',label:'Transfer · $118,000'},{id:'ledger-vendor',label:'Payee · MV-204'}]},
    links:[['boat-vendor','ledger-vendor'],['boat-amount','ledger-amount']]
  });
  Object.assign(puzzles.seniors, {
    instruction:'Use the Roster Reader: connect each check on the meal claim to the detail that contradicts it in the attendance log.',
    source:['DAILY MEAL CLAIM','100 diners · verified attendance','Fresh signatures · no copied entries'],
    record:['ATTENDANCE LOG','Only three names: Blanche, Dorothy & Rose','Same three signatures copied every day'],
    marks:{source:[{id:'hundred',label:'100 verified diners'},{id:'fresh',label:'Fresh signatures every day'}],record:[{id:'neat',label:'Very neat handwriting'},{id:'three',label:'Only three names listed'},{id:'copied',label:'Identical signatures, every day'}]},
    links:[['hundred','three'],['fresh','copied']]
  });
  Object.assign(puzzles.finale, {
    instruction:'Follow the transfer routes: connect each front to its destination in the master ledger. Trace all THREE routes.',
    source:['TRANSFER ROUTES','Three businesses. Three transfers.','One suspiciously familiar destination.'],
    record:['MASTER LEDGER','SW-001 · Swindlah Holdings','CS-010 · Community services / OS-100 · Office supplies'],
    marks:{source:[{id:'daycare-route',label:'Daycare → SW-001'},{id:'charity-route',label:'Charity → SW-001'},{id:'senior-route',label:'Senior meals → SW-001'}],record:[{id:'office',label:'OS-100 · Office supplies'},{id:'sw-daycare',label:'SW-001 · Daycare deposits'},{id:'community',label:'CS-010 · Community services'},{id:'sw-charity',label:'SW-001 · Charity deposits'},{id:'sw-seniors',label:'SW-001 · Senior meal deposits'}]},
    links:[['daycare-route','sw-daycare'],['charity-route','sw-charity'],['senior-route','sw-seniors']]
  });
  function connects(puzzle,source,record){return puzzle.links.some(([a,b])=>a===source&&b===record);}
  function gate(scene, id, found, agent) {
    const p=puzzles[scene];
    if (!p || p.id!==id || found.has(id)) return 'pass';
    if (agent!=='david') return 'agent';
    if (!found.has(p.prerequisite)) return 'prerequisite';
    return 'puzzle';
  }
  return {puzzles,gate,connects};
})();
if (typeof module !== 'undefined') module.exports=AdventureModel;
