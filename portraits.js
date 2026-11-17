/* Display atlas crops without baking a background into the character artwork. */
const Portraits = {
  set(el, src) {
    const rest={ 'assets/businessOwner1.jpg':0, 'assets/npc_old_man_henderson.jpg':1, 'assets/fraudowner.jpg':2, 'assets/npc_conspiracy_carl.jpg':3, 'assets/npc_timmy_trainee.jpg':5 };
    const daycare={ 'assets/daycareowner.jpg':0, 'assets/npc_mrs_busybody.jpg':1 };
    el.style.backgroundColor='#183442'; el.style.backgroundRepeat='no-repeat';
    if (src in rest) {
      const i=rest[src];el.style.backgroundImage='url("assets/rest-npcs.png")';el.style.backgroundSize='600% 400%';el.style.backgroundPosition=`${10+(i%3)*40}% ${i<3?0:66.667}%`;
    } else if(src in daycare) {
      el.style.backgroundImage='url("assets/daycare-npcs.png")';el.style.backgroundSize='400% 200%';el.style.backgroundPosition=`${daycare[src]?83.333:16.667}% 0%`;
    } else { el.style.backgroundImage=`url("${src}")`;el.style.backgroundSize='cover';el.style.backgroundPosition='center'; }
  }
};
