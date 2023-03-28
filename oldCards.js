let oldCards = {
    protectiveaura: {
    rare: true,
    cardID: 45,
    name: "Protective Aura",
    text: (state, index, array) => {
        return `Gain ${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} block. +${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} for each time you've self-damaged (${1+state.fightSelfDamageCount} total)`;
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    baseBlock: 6,
    cardType: "attack",
    elementType: "fire",
    action: (state, index, array) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterEnergy -= array[index].baseCost;
        newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (3*array[index].upgrades)) * (1+state.fightSelfDamageCount);
      
      })
      
      return toChangeState;
    }
}
}