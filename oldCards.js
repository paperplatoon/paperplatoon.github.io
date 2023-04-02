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
  },

  ignite: {
    cardID: 20,
    name: "Ignite",
    text: (state, index, array) => { return `Gift opponent ${array[index].energyGift} energy. Attacks deal +${5 + (array[index].upgrades*2)} damage this turn.` },
    minReq: -99,
    baseCost: 0,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    cardType: "ability",
    elementType: "fire",
    energyGift: 1,
    action: (stateObj, index, array) => {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.tempStrength += (5 + (array[index].upgrades *2));
        newState.playerMonster.strength += (5 + (array[index].upgrades *2));
      })
      stateObj = energyGift(stateObj, array[index].energyGift, array[index].baseCost)
      return stateObj;
    }
  },

  microFlames: {
    cardID: 26,
    name: "Micro Flames",
    text: (state, index, array) => { return `Destroy 2 energy. All attacks this turn do +${(3 + array[index].upgrades)}  damage`},
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    cardType: "ability",
    elementType: "fire",
    action: (stateObj, index, array) => {
      let stateObj = immer.produce(state, (newState) => {
        newState.playerMonster.tempStrength += 2;
        newState.playerMonster.strength += 2;
        newState.playerMonster.encounterEnergy -= array[index].baseCost;
      })
      stateObj = destroyEnergy(stateObj, 2)
      return stateObj;
    }
  },

  rewindtime: {
    exhaust: true,
    cardID: 49,
    name: "Rewind Time",
    text: (state, index, array) => { 
      if (array[index].upgrades === 0) {
        return `Destroy all of your opponent's energy. Remove.` 
      } else {
        return `Destroy all of your opponent's energy. Deal ${4*array[index].upgrades} damage. Remove.` 
      }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost-array[index].upgrades;
    },
    upgrades: 0,
    baseCost: 0,
    cost:  (state, index, array) => {
      return array[index].baseCost-array[index].upgrades;
    },
    upgrades: 0,
    cardType: "ability",
    elementType: "fire",
    action: (stateObj, index, array) => {
      if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
        stateObj = destroyEnergy(stateObj, stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy, array[index].baseCost)
        if (array[index].upgrades > 0) {
          stateObj = dealOpponentDamage(stateObj, 4*array[index].upgrades)
        }
      }        
      return stateObj;
    }
  },

  

  mastery: {
    rare: true,
    cardID: 52,
    name: "Mastery",
    text: (state, index, array) => {
      let totalDamage = (array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength);
      if (state.status === Status.InEncounter) {
        const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard)
        let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
          return acc + obj["upgrades"];
        }, 0); 
        return `Deal ${totalDamage} damage. +${totalDamage} for each upgrade you have (${totalEncounterUpgrades + array[index].baseHits} total)`
      } else {
        let totalEncounterUpgrades = state.playerDeck.reduce(function(acc, obj) {
          return acc + obj["upgrades"];
        }, 0); 
        return `Deal ${totalDamage} damage for each upgrade you have (${totalEncounterUpgrades + array[index].baseHits} total)`   
      }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    baseCost: 1,
    cost:  (state, index, array) => {
      return array[index].baseCost;
    },
    baseHits: 1,
    baseDamage: 4,
    cardType: "attack",
    elementType: "fire",
    energyDrain: 1,
    action: (stateObj, index, array) => {
      const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard);
      let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
          return acc + obj["upgrades"];
        }, 0); 
      stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades)), (totalEncounterUpgrades + array[index].baseHits), array[index].baseCost );
      return stateObj;
    }
  },

  rareExplode: {
    cardID: 6,
    name: "Erupt",
    text: (stateObj, index, array) => {
      let damageValue = (array[index].baseDamage + state.playerMonster.strength + (3 * array[index].upgrades));
      let hitsValue = (stateObj.status = Status.InEncounter) ? stateObj.playerMonster.encounterEnergy+array[index].baseHits : "X";
      return `Deal ${damageValue} damage ${hitsValue} times.`
    },
    minReq: 0,
    cost: "X",
    upgrades: 0,
    baseDamage: 10,
    baseHits: 0,
    rare: true,
    cardType: "attack",
    elementType: "fire",
    action: (stateObj, index, array) => {
      let damageValue = array[index].baseDamage + (3 * array[index].upgrades);
      let hitsValue = stateObj.playerMonster.encounterEnergy+array[index].baseHits;
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterEnergy = 0;
      })
      stateObj = dealOpponentDamage(stateObj, damageValue, hitsValue);
      return stateObj;
    }
  },

  bloodpact: {
    rare: true,
    exhaust: true,
    cardID: 59,
    name: "Blood Pact",
    text: (state, index, array) => { 
      if (array[index].upgrades === 0) {
        return `Whenever you gift energy, gain ${3+(array[index].upgrades*2)} block and deal ${3+(array[index].upgrades*2)} damage to all enemies. Remove`;
      } else {
        return `Whenever you gift energy, gain ${3+(array[index].upgrades*2)} block and deal ${3+(array[index].upgrades*2)} damage to all enemies.`;
      }
    },
    minReq: (stateObj, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    baseCost: 1,
    cost:  (stateObj, index, array) => {
      return array[index].baseCost;
    },
    cardType: "ability",
    elementType: "fire",
    action: (stateObj, index, array) => {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.encounterEnergy -= array[index].baseCost;
        newState.energyGiftBlock += 3+(array[index].upgrades*2);
        newState.energyGiftAttack += 3+(array[index].upgrades*2);
        if (array[index].upgrades > 0) {
            let thisCard = {...array[index]};
            newState.encounterDiscard.push(thisCard);
        }
      })
      return stateObj;
    }
  },
}