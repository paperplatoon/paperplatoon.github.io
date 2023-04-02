 
//for fire, add more cards that use kindle
//damage for energy

//ADD SOMETHING THAT LETS YOU SEE THE ENTIRE CARD POOL


//Take Aim/Sabotage will be for air

//keyword: if energy is removed, do effect.
//evnts that let you change baseCost, baseHits, baseBlock, baseDamage, and baseHeal

//more cards that deal damage to all
//add a 0-cost card that deals damage for total self-damage dealt in a fight * 2 (rare)

//total = 30
let upgradeAnimationTiming = 3000;


let fireCardPool = {
    fireEnergy: {
      cardID: 1,
      name: "",
      text: (state, index, array) => {
        return `Gain ${1 + array[index].upgrades} energy`
      },
      minReq: -99,
      cost: "energy",
      upgrades: 0,
      cardType: "fireEnergy",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += (1 + array[index].upgrades);
  
        })
        return toChangeState;
      }
    },
  
    kindle: {
      cardID: 2,
      name: "Kindle",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + state.playerMonster.strength + (array[index].playCount*(5+(array[index].upgrades*3))) } damage. 
          Increase this card's damage by ${5+(array[index].upgrades*3)}`;
        } else {
          return `Deal ${array[index].baseDamage + state.playerMonster.strength + (array[index].playCount*(5+(array[index].upgrades*3))) } damage ${array[index].baseHits} times. 
          Increase this card's damage by ${5+(array[index].upgrades*3)}`;
        }
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      playCount: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseDamage: 7,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (stateObj, index, array) => {
        stateObj = immer.produce(state, (newState) => {
          newState.encounterHand[index].playCount += 1;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].playCount*(5+(array[index].upgrades*3))), baseHits)
        return stateObj;
      }
    },

    rareFireEnergy: {
      rare: true,
      cardID: 3,
      name: "",
      text: (state, index, array) => {
        return `Gain ${2 + array[index].upgrades} energy`
      },
      minReq: -99,
      cost: "energy",
      upgrades: 0,
      cardType: "fireEnergy",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += (2 + array[index].upgrades);
  
        })
        return toChangeState;
      }
    },

    setaflame: {
      rare: true,
      cardID: 4,
      name: "Set Aflame",
      minReq: -99,
      upgrades: 0,
      cost: 0,
      cardType: "ability",
      elementType: "fire",
      text: (state, index, array) => {
        if (array[index].upgrades < 3) {
          return `You gain ${3} energy. Your opponent gains ${3-array[index].upgrades}.`
        } else {
          return `You gain ${3+(array[index].upgrades-3)} energy`
        }
        
      },
      action: (stateObj, index, array) => {
        if (array[index].upgrades < 3) {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy += 3;
          })
          stateObj = energyGift(stateObj, 3-array[index].upgrades)
        } else {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy += 3+(array[index].upgrades-3);
          })
        }
        return stateObj;
      }
    },
  
    explode: {
      cardID: 5,
      name: "Explode",
      text: (state, index, array) => {
        let damageValue = (array[index].baseDamage + state.playerMonster.strength + (2 * array[index].upgrades));
        let hitsValue = (state.status === Status.InEncounter) ? state.playerMonster.encounterEnergy+array[index].baseHits : "X";
        return `Deal ${damageValue} damage ${hitsValue} times.`
      },
      minReq: 0,
      upgrades: 0,
      cost: "X",
      baseDamage: 7,
      baseHits: 0,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let damageValue = (array[index].baseDamage + (2 * array[index].upgrades));
        let hitsValue = stateObj.playerMonster.encounterEnergy+array[index].baseHits;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy = 0;
        })
        stateObj = dealOpponentDamage(stateObj, damageValue, hitsValue);
        return stateObj;
      }
    },
  
    withdraw: {
      cardID: 7,
      name: "Withdraw",
      text: (state, index, array) => { 
        return `Gain ${array[index].baseBlock + state.playerMonster.dex + (3*array[index].upgrades)} block` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 5,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (3*array[index].upgrades), array[index].baseCost)
        return stateObj;
      }
    },

    peacefulmind: {
      cardID: 66,
      name: "Peaceful Mind",
      text: (state, index, array) => { 
        return `Gain ${array[index].baseBlock + state.playerMonster.dex + (5*array[index].upgrades)} block. Gain 2 dexterity` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 12,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost);
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.fightDex += 2;
          newState.playerMonster.dex += 2;
        })
        return stateObj;
      }
    },

    hugewithdraw: {
      cardID: 7,
      name: "Huge Withdraw",
      text: (state, index, array) => { 
        return `Gain ${array[index].baseBlock + state.playerMonster.dex + (6*array[index].upgrades)} block` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 3,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 25,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (6*array[index].upgrades), array[index].baseCost)
        return stateObj;
      }
    },
  
    simpleheal: {
      cardID: 8,
      name: "Simple Heal",
      text: (state, index, array) => { 
        return `Restore ${array[index].baseHeal + (array[index].upgrades * 2) + state.extraHeal} HP` 
    },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseHeal: 4,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let amountToHeal = array[index].baseHeal + (array[index].upgrades * 2) + stateObj.extraHeal;
        stateObj = healPlayer(stateObj, amountToHeal, 1)
        return stateObj;
      }
    },

    darkknowledge: {
      cardID: 9,
      name: "Dark Knowledge",
      text: (state, index, array) => { 
        return `Gift opponent ${array[index].energyGift-array[index].upgrades} energy. Draw ${2+array[index].upgrades} cards` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 0,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      energyGift: 2,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(state, (newState) => {      
          newState.playerMonster.encounterEnergy -= array[index].baseCost 
        })
        for (let i=0; i < 2+array[index].upgrades; i++) {
          stateObj = drawACard(stateObj);
        }
        stateObj = energyGift(stateObj, array[index].energyGift-array[index].upgrades)
        return stateObj;
      }
    },

    cursedritual: {
      cardID: 10,
      name: "Cursed Ritual",
      text: (state, index, array) => { 
        return `Gift opponent ${array[index].energyGift} energy. Gain ${3 + array[index].upgrades} strength` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 0,
      rare: true,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      energyGift: 2,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
         newState.playerMonster.fightStrength += 3 + array[index].upgrades;
          newState.playerMonster.strength += 3 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        stateObj = energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    ritual: {
      cardID: 62,
      name: "Ritual",
      text: (state, index, array) => { 
        return `Gain ${5 + (2*array[index].upgrades)} strength` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
      rare: true,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
         newState.playerMonster.fightStrength += 5 + (2*array[index].upgrades);
          newState.playerMonster.strength += 5 + (2*array[index].upgrades);
          newState.playerMonster.encounterEnergy -= (2*array[index].upgrades);
        })
        return stateObj;
      }
    },

    sanguineshield: {
      cardID: 11,
      name: "Sanguine Shield",
      text: (state, index, array) => { return `Gift opponent ${array[index].energyGift} energy. Gain ${array[index].baseBlock + (array[index].upgrades*5)} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      energyGift: 2,
      baseBlock: 12,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*5), array[index].baseCost);
        stateObj = energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    wallofichor: {
      cardID: 68,
      name: "Wall of Ichor",
      text: (state, index, array) => { return `Gift opponent ${array[index].energyGift} energy. Gain ${array[index].baseBlock + (array[index].upgrades*7)} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      energyGift: 3,
      baseBlock: 22,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*7), array[index].baseCost);
        stateObj = energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    wallofichor: {
      cardID: 68,
      name: "Wall of Ichor",
      text: (state, index, array) => { return `Destroy ${array[index].energyDestroy} energy. Gain ${array[index].baseBlock + (array[index].upgrades*4)} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      energyDestroy: 2,
      baseBlock: 13,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost);
        stateObj = destroyEnergy(stateObj, array[index].energyDestroy)
        return stateObj;
      }
    },

    generosity: {
      cardID: 12,
      name: "Generosity",
      text: (state, index, array) => { 
        let totalDamage = array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades)
        if (state.status === Status.InEncounter) {
          return `Deal ${totalDamage} damage. +(${totalDamage}) extra for each time you gifted energy this combat (${state.fightEnergyGiftCount + array[index].baseHits} total)`
        } else {
          return `Deal ${totalDamage} damage. +(${totalDamage}) extra for each time you gifted energy this combat`
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
      baseDamage: 6,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage+(array[index].upgrades * 2), state.fightEnergyGiftCount + array[index].baseHits, array[index].baseCost )
        return stateObj
      }
    },
  
  
    gainstrength: {
      rare: true,
      cardID: 13,
      name: "Gain Strength",
      text: (state, index, array) => {
        return `+1 permanent strength. Remove`;
      },
      minReq: (state, index, array) => {
        return (array[index].baseCost - (array[index].upgrades))
      },
      upgrades: 0,
      baseCost: 3,
      cost: (state, index, array) => {
        return (array[index].baseCost - (array[index].upgrades))
      },
      cardType: "ability",
      elementType: "fire",
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.strength += 1;
          newState.playerMonster.encounterEnergy -=  array[index].baseCost-(array[index].upgrades);
        })
        return toChangeState;
      }
    },
  
    siphon: {
      cardID: 14,
      name: "Siphon",
      text: (stateObj, index, array) => {
        if (array[index].baseHits === 0) {
          return `Destroy ${(array[index].energyDrain + array[index].upgrades)} 2 energy. Deal ${array[index].baseDamage} for each energy destroyed`
        } else {
          return `Destroy ${(array[index].energyDrain + array[index].upgrades)} energy. Deal ${array[index].baseDamage} for each energy destroyed + (${array[index].baseHits}) `
        }  
      },
      minReq: (state, index, array) => {
        return array[index].baseCost
      },
      baseCost: 1,
      cost: (state, index, array) => {
        return array[index].baseCost
      },
      upgrades: 0,
      cardType: "ability",
      elementType: "fire",
      energyDrain: 2,
      baseDamage: 4,
      baseHits: 0,
      action: (stateObj, index, array) => {
        let drainTotal = array[index].energyDrain + array[index].upgrades;
        if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > drainTotal) {
          stateObj = destroyEnergy(stateObj, drainTotal);
          stateObj = dealOpponentDamage(stateObj, array[index].baseDamage, (drainTotal + array[index].baseHits));
        } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
          drainTotal = stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy;
          stateObj = destroyEnergy(stateObj, drainTotal);
          stateObj = dealOpponentDamage(stateObj, array[index].baseDamage, (drainTotal + array[index].baseHits));
        } else {}
        
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        
        return stateObj;
      }
    },
    
  
    essencedrain: {
      cardID: 15,
      name: "Essence Drain",
      cardType: "fire",
      text: (state, index, array) => { return `Destroy ${array[index].energyDrain} energy. Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*3)} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "fire",
      energyDrain: 1,
      baseBlock: 8,
      upgrades: 0,
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost)
        if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy >= array[index].energyDrain) {
            stateObj = destroyEnergy(stateObj, array[index].energyDrain)
        } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
          stateObj = destroyEnergy(stateObj, stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy);
        } else {}

        return stateObj;
      }
    },
  
    fireball: {
      cardID: 16,
      name: "Fireball",
      text: (state, index, array) => { return `Deal ${(array[index].baseDamage + state.playerMonster.strength)} damage ${(array[index].baseHits + (array[index].upgrades))} times` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 3,
      baseHits: 3,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage, (array[index].baseHits + (array[index].upgrades)), energyCost=array[index].baseCost)
        return stateObj;
      }
    },

    fierymissiles: {
      cardID: 31,
      name: "Fiery Missiles",
      text: (state, index, array) => { return `Gift ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*2))} damage ${(array[index].baseHits)} times` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 6,
      energyGift: 2,
      baseHits: 2,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*2), array[index].baseHits, array[index].baseCost)
        stateObj = energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    energyburst: {
      cardID: 63,
      name: "Energy Burst",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Gift ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*4))} damage`;
        } else {
          return `Gift ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*4))} damage ${(array[index].baseHits)} times`
        } 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 21,
      energyGift: 2,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*4), array[index].baseHits, array[index].baseCost)
        stateObj = energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    pirouettespin: {
      cardID: 17,
      name: "Pirouette Spin",
      text: (stateObj, index, array) => { 
        let totalDamage = (array[index].baseDamage + (array[index].upgrades*2) + stateObj.playerMonster.strength);
        if (state.status === Status.InEncounter) {
          return `Deal ${totalDamage} damage for each card played this turn (${state.cardsPerTurn + array[index].baseHits} total)`; 
        } else {
          return `Deal ${totalDamage} damage for each card played this turn`; 
        }

        
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 3,
      baseHits: 0,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades*2)), (state.cardsPerTurn + array[index].baseHits), array[index].baseCost)
        return stateObj;
      }
    },

    tackle: {
      cardID: 18,
      name: "Tackle",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength} damage`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength} damage ${array[index].baseHits} times.`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 5,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*3), array[index].baseHits, array[index].baseCost)
        return stateObj;
      }
    },

    bigtackle: {
      cardID: 64,
      name: "Big Tackle",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage ${array[index].baseHits} times.`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 15,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*5), array[index].baseHits, array[index].baseCost)
        return stateObj;
      }
    },

    hugetackle: {
      cardID: 65,
      name: "Huge Tackle",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*7) + state.playerMonster.strength} damage`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*7) + state.playerMonster.strength} damage ${array[index].baseHits} times.`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 3,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 26,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*7), array[index].baseHits, array[index].baseCost)
        return stateObj;
      }
    },

    vampiricstrike: {
      cardID: 19,
      name: "Vampiric Strike",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage. Heal ${array[index].baseHeal+array[index].upgrades} per card played this turn (${state.cardsPerTurn})`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage ${array[index].baseHits} times. Heal ${array[index].baseHeal+(array[index].upgrades)} per card played this turn (${state.cardsPerTurn})`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 8,
      baseHeal: 2,
      baseHits: 1,
      rare: true,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades*2)), array[index].baseHits, array[index].baseCost)
        let healValue = (array[index].baseHeal + array[index].upgrades) * state.cardsPerTurn;
        stateObj = healPlayer(stateObj, healValue)
        return stateObj;
      }
    },


    flamingStrike: {
      cardID: 21,
      name: "Flaming Strike",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength} damage. Attacks deal +${(2*array[index].upgrades)+4} damage this turn`
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength} damage ${array[index].baseHits} times.. Attacks deal +${(2*array[index].upgrades)+4} damage this turn`
        }
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 7,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(state, (newState) => {
          newState.playerMonster.tempStrength += (2*array[index].upgrades)+4;
          newState.playerMonster.strength += (2*array[index].upgrades)+4;
        })
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades*3)), array[index].baseHits, array[index].baseCost)
        return stateObj;
      }
    },

    upgrade: {
      cardID: 22,
      name: "Upgrade",
      text: (state, index, array) => { 
        if (array[index].upgrades === 0) {
            return `Deal ${array[index].baseDamage + state.playerMonster.strength + array[index].upgrades} damage ${array[index].baseHits} times. Upgrade your top left card`
        } else {
          return `Deal ${array[index].baseDamage + state.playerMonster.strength + array[index].upgrades} damage ${array[index].baseHits} times. Upgrade your top left card ${1 + (array[index].upgrades)} times`
        }
        },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 4,
      baseHits: 2,
      timeValue: upgradeAnimationTiming,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        upgradeAnimation(stateObj, 0, stateObj.encounterHand, 1+array[index].upgrades, divIDName="handContainer2")       
        
        await pause(array[index].timeValue)
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + array[index].upgrades), array[index].baseHits, array[index].baseCost);
        for (i = 0; i < (1+array[index].upgrades); i++) {
          stateObj = upgradeCard(stateObj);
        }
        return stateObj;
      }
    },

    rareupgrade: {
      cardID: 23,
      rare: true,
      name: "Rare Upgrade",
      text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Upgrade your top left card ${2+array[index].upgrades} times.`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "fire",
      upgrades: 0,
      baseBlock: 7,
      timeValue: upgradeAnimationTiming,
      action: async (stateObj, index, array) => {
        upgradeAnimation(stateObj, 0, stateObj.encounterHand, 2+array[index].upgrades, divIDName="handContainer2")       
        
        await pause(array[index].timeValue)
        stateObj = gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*2)), array[index].baseCost )
        for (i = 0; i < (2+array[index].upgrades); i++) {
          stateObj = upgradeCard(stateObj);
        }
       return stateObj;
       
      }
    },

    invigorate: {
      cardID: 67,
      rare: true,
      name: "Invigorate",
      text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Gain ${2+array[index].upgrades} strength.`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "fire",
      upgrades: 0,
      baseBlock: 11,
      timeValue: upgradeAnimationTiming,
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*2)), array[index].baseCost )
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.fightStrength += 2+array[index].upgrades;
          newState.playerMonster.strength += 2+array[index].upgrades;
        })
        
       return stateObj;
       
      }
    },


    infuse: {
      cardID: 24,
      rare: true,
      name: "Infuse",
      text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*6)} block. Upgrade your top left card 2 times.`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      cardType: "ability",
      elementType: "fire",
      baseBlock: 12,
      timeValue: upgradeAnimationTiming,
      action: async (stateObj, index, array) => {
        upgradeAnimation(stateObj, 0, stateObj.encounterHand, 2, divIDName="handContainer2")       
        
        await pause(array[index].timeValue)
        stateObj = upgradeCard(stateObj);
        stateObj = upgradeCard(stateObj);
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*6), array[index].baseCost )
        return stateObj;
      }
    },

    refineenergy: {
      cardID: 25,
      name: "Refine Energy",
      text: (state, index, array) => { return `Destroy ${array[index].energyDrain} energy. Upgrade your top left card ${2 + array[index].upgrades} times.`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      energyDrain: 2,
      timeValue: upgradeAnimationTiming,
      cardType: "ability",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        upgradeAnimation(stateObj, 0, stateObj.encounterHand, 2+array[index].upgrades, divIDName="handContainer2")       
        
        await pause(array[index].timeValue)
        stateObj = destroyEnergy(stateObj, array[index].energyDrain, array[index].baseCost)
        for (i = 0; i < (2+array[index].upgrades); i++) {
          stateObj = upgradeCard(stateObj);
        }  
        return stateObj;
      }
    },

    

    clarity: {
      rare: true,
      cardID: 27,
      name: "Clarity",
      text: (state, index, array) => {
        if (state.status === Status.InEncounter) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength} damage. +${array[index].baseDamage + (array[index].upgrades*2)+ state.playerMonster.strength} for each time you've skipped a card (${state.cardsSkipped + array[index].baseHits} total)`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength} damage. +${array[index].baseDamage + (array[index].upgrades*2)+ state.playerMonster.strength} for each time you've skipped a card`; 
        }
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseHits: 1,
      baseDamage: 6,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj , index, array) => {
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades)), (state.cardsSkipped + array[index].baseHits), array[index].baseCost );      
        return stateObj;
      }
    },

    bloatedbomb: {
      rare: true,
      cardID: 28,
      name: "Bloated Bomb",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*10)+state.playerMonster.strength} damage to ALL enemies. -2 for each card skipped (${array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*10) - (state.cardsSkipped*2)})`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*10)+state.playerMonster.strength} damage to ALL enemies ${array[index].baseHits} times. -2 for each card skipped (${(state.playerMonster.strength + array[index].baseDamage + (array[index].upgrades*10) - (state.cardsSkipped*2))*array[index].baseHits})`
        }
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 4,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseHits: 1,
      baseDamage: 35,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, ( array[index].baseDamage + (array[index].upgrades*10) - (state.cardsSkipped*2) ), (array[index].baseHits), array[index].baseCost, all=true);
        return stateObj;
      }
    },

    sparkBarrage: {
      cardID: 29,
      name: "Spark Barrage",
      text: (state, index, array) => { return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage ${array[index].baseHits + array[index].upgrades} times`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 3,
      baseHits: 5,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage, (array[index].baseHits + array[index].upgrades), array[index].baseCost);
        return stateObj;
      }
    }, 

    brand: {
      cardID: 30,
      name: "Branding Iron",
      text: (state, index, array) => { return `Deal ${array[index].baseSelfDamage - array[index].upgrades} damage to yourself. Gain ${3+Math.ceil(array[index].upgrades/2)} energy` },
      minReq: 0,
      upgrades: 0,
      baseCost: 0,
      cost:  0,
      baseSelfDamage: 2,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy += (3+array[index].upgrades);
        })
        if (array[index].upgrades < array[index].baseSelfDamage) {
          stateObj = dealSelfDamage(stateObj, array[index].baseSelfDamage - array[index].upgrades);
        }
        return stateObj;
      }
    },

    enjoin: {
      cardID: 32,
      name: "Enjoin",
      text: (state, index, array) => { return `Restore ${array[index].baseHeal + array[index].upgrades + state.extraHeal} enemy HP. You restore triple the amount gained` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseHeal: 3,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let opponentHeal = array[index].baseHeal + array[index].upgrades;
        let opponentHealthDiff = stateObj.opponentMonster[stateObj.targetedMonster].maxHP - stateObj.opponentMonster[stateObj.targetedMonster].currentHP
        let playerHealthDiff  = stateObj.playerMonster.maxHP - stateObj.playerMonster.currentHP;
        let toHealOpponent = 0;
        let toHealPlayer = 0;
          if (opponentHealthDiff >= opponentHeal) {
            toHealOpponent += opponentHeal;             

            if (playerHealthDiff >= (opponentHeal * 3)) {
              toHealPlayer += (opponentHeal * 3)
            } else if (playerHealthDiff > 0) {
              toHealPlayer = playerHealthDiff
            } else {}

          } else if (opponentHealthDiff > 0) {
            toHealOpponent = opponentHealthDiff

            if (playerHealthDiff >= (opponentHealthDiff * 3)) {
              toHealPlayer = (opponentHealthDiff * 3);
            } else if (playerHealthDiff > 0) {
              toHealPlayer = playerHealthDiff;
            } else {}

          } else {}

        stateObj = healPlayer(stateObj, toHealPlayer, array[index].baseCost);
        stateObj = immer.produce(stateObj, (newState) => {
          newState.opponentMonster[newState.targetedMonster].currentHP += toHealOpponent
          if (toHealOpponent > 0) {
            newState.fightHealCount += 1;
            newState.fightHealTotal += toHealOpponent;
          }
        })  
        
        return stateObj;
      }
    },

    thiefshield: {
      rare: true,
      cardID: 33,
      name: "Thief's Shield",
      text: (state, index, array) => { return `Destroy ${array[index].energyDrain + Math.floor(array[index].upgrades/2)} energy. Gain ${array[index].baseBlock + array[index].upgrades} block for each energy drained.` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 9,
      cardType: "ability",
      elementType: "fire",
      energyDrain: 1,
      action: (stateObj, index, array) => {
        let energyDrain =  (array[index].energyDrain + array[index].upgrades)
        if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy >= energyDrain) {
          stateObj = destroyEnergy(stateObj, energyDrain); 
          stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost, array[index].energyDrain);
        } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
            energyDrain = stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy;
            stateObj = destroyEnergy(stateObj, energyDrain); 
            stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost, array[index].energyDrain);
        } else {
          stateObj = gainBlock(stateObj, (0-array[index].dex), array[index].baseCost);
        }
        return stateObj;
      }
    },

    puffofsmoke: {
      cardID: 34,
      name: "Puff Of Smoke",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex)} block. Add ${(1+array[index].upgrades)} Backstep cards to your hand` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 6,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost)
        for (let i=0; i < 1+array[index].upgrades; i++) {
          stateObj = addBackstepsToHand(stateObj)
        }
        return stateObj;
      }
    },

    backstep: {
      cardID: 35,
      name: "Backstep",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex) + (2*array[index].upgrades)} block. Remove` },
      minReq: -99,
      upgrades: 0,
      baseCost: 0,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 4,
      exhaust: true,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock+(array[index].upgrades*3), array[index].baseCost);
        return stateObj;
      }
    },

    retreatingslash: {
      cardID: 36,
      name: "Retreating Slash",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1 && array[index].upgrades === 0) {
          return `Deal ${(array[index].baseDamage + state.playerMonster.strength + array[index].upgrades)} damage. Add ${(1+array[index].upgrades)} Backstep card to your hand`;
        } else if (array[index].baseHits === 1 && array[index].upgrades > 0) {
          return `Deal ${(array[index].baseDamage + state.playerMonster.strength + array[index].upgrades)} damage. Add ${(1+array[index].upgrades)} Backstep cards to your hand`;
        } else if (array[index].baseHits > 1 && array[index].upgrades === 0) {
          return `Deal ${(array[index].baseDamage + state.playerMonster.strength + array[index].upgrades)} damage ${array[index].baseHits} times. Add ${(1+array[index].upgrades)} Backstep card to your hand`
        } else if (array[index].baseHits > 1 && array[index].upgrades > 0) {
          return `Deal ${(array[index].baseDamage + state.playerMonster.strength + array[index].upgrades)} damage ${array[index].baseHits} times. Add ${(1+array[index].upgrades)} Backstep cards to your hand`
        }
        return `` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseDamage: 7,
      baseHits: 1,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, array[index].baseDamage + array[index].upgrades, array[index].baseHits, array[index].baseCost);
        for (let i=0; i < 1+array[index].upgrades; i++) {
          stateObj = addBackstepsToHand(stateObj)
        }
        return stateObj;
      }
    },

    sunlight: {
      rare: true,
      cardID: 37,
      name: "Sunlight",
      text: (state, index, array) => { return `Restore ${Math.floor(array[index].upgrades/3) + 1} health per card played for rest of combat. Remove` },
      minReq: (state, index, array) => {
        if (array[index].baseCost > array[index].upgrades) {
          return array[index].baseCost-array[index].upgrades;
        } else {
          return 0;
        }
        
      },
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        if (array[index].baseCost > array[index].upgrades) {
          return array[index].baseCost-array[index].upgrades;
        } else {
          return 0;
        }
      },
      exhaust: true,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (array[index].baseCost > array[index].upgrades) {
            newState.playerMonster.encounterEnergy -= (array[index].baseCost-array[index].upgrades)
          }
          newState.gainLifePerCard += Math.floor(array[index].upgrades/3)+1;
        })
        return toChangeState;
      }
    },

    skipaway: {
      cardID: 38,
      name: "Skip Away",
      text: (state, index, array) => { return `Add ${(2+array[index].upgrades)} Backstep cards to your hand` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
          stateObj = addBackstepsToHand(state, (2+array[index].upgrades))
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
          })
        return stateObj;
      }
    },

    powerup: {
      cardID: 39,
      name: "Power Up",
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost - Math.floor(array[index].upgrades/2);
      },
      cardType: "ability",
      elementType: "fire",
      text: (state, index, array) => {
        return `Double your mana.`
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost-Math.floor(array[index].upgrades/2);
          newState.playerMonster.encounterEnergy *= 2;
        })
        return toChangeState;
      }
    },

    forgeshield: {
      rare: true,
      cardID: 40,
      name: "Forge's Shield",
      text: (state, index, array) => {
        if (state.status === Status.InEncounter) {
          const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard)
          let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
            return acc + obj["upgrades"];
          }, 0); 
          return `Gain ${(array[index].baseBlock + (array[index].upgrades) + state.playerMonster.dex)} block for each upgrade you have (${totalEncounterUpgrades})`
        } else {
          let totalEncounterUpgrades = state.playerDeck.reduce(function(acc, obj) {
            return acc + obj["upgrades"];
          }, 0); 
          return `Gain ${(array[index].baseBlock + (array[index].upgrades) + state.playerMonster.dex)} block for each upgrade you have (${totalEncounterUpgrades})`   
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
      baseHits: 0,
      baseBlock: 3,
      cardType: "ability",
      elementType: "fire",
      energyDrain: 1,
      action: (stateObj, index, array) => {
        const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard);
        let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
            return acc + obj["upgrades"];
          }, 0); 
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades), array[index].baseCost, totalEncounterUpgrades)
        return stateObj;
      }
    },

    mentalblock: {
      cardID: 41,
      name: "Mental Block",
      text: (stateObj, index, array) => { 
        if (array[index].upgrades === 0) {
          return `Gain block equal to your deck size (${stateObj.playerDeck.length + array[index].baseBlock + state.playerMonster.dex})`;
        } else {
          return `Gain block equal to deck size + ${array[index].upgrades*4} (${stateObj.playerDeck.length + state.playerMonster.dex + array[index].baseBlock + (array[index].upgrades*4)})`;
        }
         },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 0,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, stateObj.playerDeck.length + array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost)
        return stateObj;
      }
    },

    disablingblow: {
      cardID: 42,
      name: "Disabling Blow",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + array[index].upgrades + state.playerMonster.strength} damage. Opponent loses ${2 + array[index].upgrades} strength`;
        } else {
          return `Deal ${array[index].baseDamage + array[index].upgrades + state.playerMonster.strength} damage ${array[index].baseHits} times. Opponent loses ${2 + array[index].upgrades} strength`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 13,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + array[index].upgrades), array[index].baseHits, array[index].baseCost);
        stateObj = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].strength -= 2 + array[index].upgrades
        })
        return stateObj;
      }
    },

    throwsand: {
      cardID: 43,
      name: "Throw Sand",
      text: (stateObj, index, array) => { 
        if (array[index].upgrades === 0) {
          return `Enemy loses 4 strength. Add 1 Backstep to your hand.`;
        } else {
          return `Enemy loses ${4 + array[index].upgrades} strength. Add ${1 + array[index].upgrades} Backsteps to your hand.`;
        }
         },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 0,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.opponentMonster[newState.targetedMonster].strength -= 4+array[index].upgrades;
        })
        stateObj = addBackstepsToHand(stateObj, 1+array[index].upgrades);
        return stateObj;
      }
    },

    precisionstrike: {
      cardID: 44,
      name: "Precision Strike",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength} damage. Gain ${2+array[index].upgrades} dexterity`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength} damage ${array[index].baseHits} times. Gain ${2+array[index].upgrades} dexterity`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 3,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 21,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades)), array[index].baseHits, array[index].baseCost)
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.fightDex += 2+array[index].upgrades;
          newState.playerMonster.dex += 2+array[index].upgrades;
        })
        return stateObj;
      }
    },

    friendship: {
      rare: true,
      cardID: 45,
      name: "Protective Aura",
      text: (state, index, array) => {
        if (state.status === Status.InEncounter) {
          return `Gain ${array[index].baseBlock + (array[index].upgrades*4) + state.playerMonster.dex} block. Add total energy gifted and drained this fight (${state.fightEnergyGiftTotal + state.fightEnergyDrainTotal} total)`;
        } else {
          return `Gain ${array[index].baseBlock + (array[index].upgrades*4) + state.playerMonster.dex} block. Add total energy gifted and drained this fight`;
        }
          
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseBlock: 13,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let block = array[index].baseBlock + (array[index].upgrades*4) + state.fightEnergyGiftTotal + state.fightEnergyDrainTotal;
        stateObj = gainBlock(stateObj, block, array[index].baseCost)
        return stateObj;
      }
    },

    energyconversion: {
      rare: true,
      cardID: 46,
      name: "Energy Conversion",
      text: (state, index, array) => {
        if (array[index].upgrades < 2) {
          return `Gain 1 energy for each card played this turn`;
        } else {
          return `Gain 1 energy for each card played this turn. Gain ${4*(array[index].upgrades-1)} block.` 
        }
          
      },
      minReq: (state, index, array) => {
        if (array[index].upgrades === 0) {
          return array[index].baseCost
        } else {
          return 0
        }
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        if (array[index].upgrades === 0) {
          return array[index].baseCost
        } else {
          return 0
        }
      },
      upgrades: 2,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (array[index].upgrades < 2) {
            newState.playerMonster.encounterEnergy -= array[index].baseCost-array[index].upgrades;
          } else {
            newState.playerMonster.encounterBlock += (4*(array[index].upgrades-1)) + newState.playerMonster.dex;
          }          
          newState.playerMonster.encounterEnergy += state.cardsPerTurn;
        })
        
        return toChangeState;
      }
    },

    expertsforge: {
      rare: true,
      cardID: 47,
      name: "Expert's Forge",
      text: (state, index, array) => {
          return `Upgrade all cards in your deck for this combat. Remove`   
        },
      minReq: (state, index, array) => {
        return array[index].baseCost-array[index].upgrades;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost-array[index].upgrades;
      },
      cardType: "ability",
      elementType: "fire",
      exhaust: true,
      action: (stateObj, index, array) => { 
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost-array[index].upgrades;
          newState.encounterHand.forEach(function (cardObj) {
            cardObj["upgrades"] +=1;
            console.log(cardObj["upgrades"])
          });
          newState.encounterDraw.forEach(function (cardObj) {
            cardObj["upgrades"] +=1;
            console.log(cardObj["upgrades"])
          });
          newState.encounterDiscard.forEach(function (cardObj) {
            cardObj["upgrades"] +=1;
            console.log(cardObj["upgrades"])
          });
        })
        return stateObj;
      }
    },

    feast: {
      rare: true,
      exhaust: true,
      cardID: 48,
      name: "Feast",
      text: (state, index, array) => { 
        if (array[index].upgrades === 0) {
          return `Permanently gain max HP equal to cards played this turn (${state.cardsPerTurn}). Remove`;
        } else {
          return `Permanently gain ${array[index].upgrades+1} max HP for each card played this turn (${state.cardsPerTurn}). Remove`;
        }
      },
      minReq: -99,
      cost: 0,
      upgrades: 0,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.maxHP += (state.cardsPerTurn * (array[index].upgrades +1));
          newState.playerMonster.currentHP += (state.cardsPerTurn * (array[index].upgrades +1));
        })
        return toChangeState;
      }
    },


    redirect: {
      rare: true,
      cardID: 50,
      name: "Redirect",
      text: (state, index, array) => {
        if (state.status === Status.InEncounter) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage. +${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} for each energy destroyed this combat (${state.fightEnergyDrainTotal + array[index].baseHits} total)`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage. +${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} for each energy destroyed this combat`;
        }
          
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseHits: 1,
      baseDamage: 5,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades*2)), (state.fightEnergyDrainTotal + array[index].baseHits), array[index].baseCost );
        return stateObj;
      }
    },

    hammerandtongs: {
      rare: true,
      exhaust: true,
      cardID: 51,
      name: "Hammer and Tongs",
      text: (state, index, array) => {
        if (array[index].upgrades === 0) {
          return `Upgrade a random card in your deck permanently. Remove`;
        } else {
          return `Upgrade a random card in your deck permanently ${1+array[index].upgrades} times. Remove`;
        }
          ;
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      timeValue: upgradeAnimationTiming,
      baseCost: 3,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      cardType: "ability",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        let randomIndex  = Math.floor(Math.random() * stateObj.playerDeck.length)
        let cardIndex = 0;

        upgradeAnimation(stateObj, randomIndex, stateObj.playerDeck, 1+array[index].upgrades, divIDName="handContainer2")       
        
        await pause(array[index].timeValue)
        stateObj = immer.produce(stateObj, (newState) => {
          console.log('upgrading ' + newState.playerDeck[randomIndex].name)
          newState.playerDeck[randomIndex].upgrades += (1+array[index].upgrades);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          if (stateObj.encounterHand.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
            let handIndex = newState.encounterHand.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
            newState.encounterHand[handIndex].upgrades += (1+array[index].upgrades)
          } else if (stateObj.encounterDiscard.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
            let discardIndex = newState.encounterDiscard.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
            newState.encounterDiscard[discardIndex].upgrades += (1+array[index].upgrades)
          } else if (stateObj.encounterDraw.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
            let drawIndex = newState.encounterDraw.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
            newState.encounterDraw[drawIndex].upgrades += (1+array[index].upgrades)
          } else {
            console.log('could not find card');
          }
        });
          return stateObj;
        }
    },

    finalblow: {
      rare: true,
      exhaust: true,
      cardID: 53,
      trigger:  (stateObj, index, array) => { 
        return (stateObj.playerMonster.encounterEnergy === array[index].baseCost);
      },
      name: "Flurry Finisher",
      text: (stateObj, index, array) => {
        let cardDamage = array[index].baseDamage + (array[index].upgrades*2) + stateObj.playerMonster.strength;
        cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? cardDamage*2 : cardDamage; 
        if (array[index].baseHits === 1) {
          return `Deal ${cardDamage} damage. Copies. Finisher: double damage`;
        } else {
          return `Combo. Deal ${cardDamage} damage ${array[index].baseHits} times. Finisher: double damage`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 6,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let cardDamage = array[index].baseDamage + (array[index].upgrades*2)
        cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? ((cardDamage*2)+stateObj.playerMonster.strength) : cardDamage;
        stateObj = dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
    
        let cardClone = {...array[index]};
        cardClone.baseCost = 1;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.encounterHand.push(cardClone);
        })
        return stateObj;
      }
    },

    followupslap: {
      cardID: 54,
      trigger:  (stateObj, index, array) => { 
        return (stateObj.cardsPerTurn === 2);
      },
      name: "Follow-Up Slap",
      text: (stateObj, index, array) => {
        let cardDamage = array[index].baseDamage + (array[index].upgrades*3)
        cardDamage = (stateObj.cardsPerTurn === 2) ? (cardDamage+5+(array[index].upgrades))  : cardDamage; 
        if (array[index].baseHits === 1) {
          return `Deal ${cardDamage + stateObj.playerMonster.strength} damage. 3rd card bonus: +${5+(array[index].upgrades)} damage`;
        } else {
          return `Combo. Deal ${cardDamage + stateObj.playerMonster.strength} damage ${array[index].baseHits} times. 3rd card bonus: +${5+(array[index].upgrades)} damage`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 8,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let cardDamage = array[index].baseDamage + (array[index].upgrades*3)
        cardDamage = (stateObj.cardsPerTurn === 2) ? cardDamage + (5+(array[index].upgrades)) : cardDamage;
        stateObj = dealOpponentDamage(newState, cardDamage, array[index].baseHits, array[index].baseCost);
        return stateObj;
      }
    },

    fortify: {
      cardID: 55,
      name: "Fortify",
      text: (stateObj, index, array) => {
        let cardBlock = (array[index].baseBlock + stateObj.playerMonster.dex + (2*array[index].upgrades));
        cardBlock = (stateObj.playerMonster.encounterBlock >= 5) ? cardBlock*2 : cardBlock; 
        if (stateObj.playerMonster.encounterBlock >= 5) {
          return `Gain ${cardBlock} block`
        } else {
          return `Gain ${cardBlock} block. Gain twice as much if you already have 5 block`
        }
      },
      minReq: (stateObj, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      trigger:  (stateObj, index, array) => { 
        return (stateObj.playerMonster.encounterBlock >= 5);
      },
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 6,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let cardBlock = (array[index].baseBlock + (2*array[index].upgrades));
        cardBlock = (stateObj.playerMonster.encounterBlock >= 5) ? (cardBlock*2)+array[index].dex : cardBlock; 

        stateObj = gainBlock(stateObj, cardBlock, array[index].baseCost )
        return stateObj;
      }
    },

    coatofarms: {
      cardID: 56,
      name: "Coat of Arms",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex + state.playerMonster.strength + (3*array[index].upgrades))} block. Increased by strength` },
      minReq: (stateObj, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (stateObj, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 8,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        let block = array[index].baseBlock + stateObj.playerMonster.strength + (3*array[index].upgrades)
        stateObj = gainBlock(stateObj, block, array[index].baseCost)
        return stateObj;
      }
    },

    dancersgrace: {
      rare: true,
      exhaust: true,
      cardID: 57,
      name: "Dancer's Grace",
      text: (state, index, array) => { 
        if (array[index].upgrades === 0) {
          return `Gain ${2+array[index].upgrades} Dexterity. Remove`;
        } else {
          return `Gain ${2+array[index].upgrades} Dexterity.`;
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
          newState.playerMonster.tempDex += 2+array[index].upgrades;
          newState.playerMonster.dex += 2+array[index].upgrades;
          if (array[index].upgrades > 0) {
              let thisCard = {...array[index]};
              newState.encounterDiscard.push(thisCard);
          }
        })
        return stateObj;
      }
    },

    religiousfervor: {
      rare: true,
      exhaust: true,
      cardID: 58,
      name: "Religious Fervor",
      text: (state, index, array) => { 
        if (array[index].upgrades === 0) {
          return `For the rest of combat, gain ${4+(array[index].upgrades*2)} block when you gift energy. Remove`;
        } else {
          return `For the rest of combat, gain ${4+(array[index].upgrades*2)} block when you gift energy`;
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
          newState.energyGiftBlock += 4+(array[index].upgrades*2);
          if (array[index].upgrades > 0) {
              let thisCard = {...array[index]};
              newState.encounterDiscard.push(thisCard);
          }
        })
        return stateObj;
      }
    },


    
    pickoff: {
      rare: true,
      cardID: 60,
      name: "Pick Off",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `If there is more than 1 opponent, deal ${array[index].baseDamage} damage to target monster`;
        } else {
          return `If there is more than 1 opponent, deal ${array[index].baseDamage} damage to target monster ${array[index].baseHits} times`
        }
         return },
      minReq: (stateObj, index, array) => {
        return array[index].baseCost-array[index].upgrades;
      },
      trigger:  (stateObj, index, array) => { 
        if (stateObj.status !== Status.InEncounter) {
          return false;
        } else {
          return (stateObj.opponentMonster.length > 1);
        }
      },
      upgrades: 0,
      baseCost: 4,
      baseDamage: 40,
      baseHits: 1,
      cost:  (stateObj, index, array) => {
        return array[index].baseCost-array[index].upgrades;
      },
      cardType: "ability",
      elementType: "special",
      action: (stateObj, index, array) => {
        if (stateObj.opponentMonster.length > 1) {
          stateObj = dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, array[index].baseCost-array[index].upgrades)
        return stateObj;
      }
    },
  },

    fireBlockEnergy: {
      rare: true,
      cardID: 61,
      name: "",
      text: (state, index, array) => {
        return `Gain ${1 + array[index].upgrades} energy. Gain ${1 + array[index].upgrades} backstep`
      },
      minReq: -99,
      cost: "energy",
      upgrades: 0,
      cardType: "fireEnergy",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += (1 + array[index].upgrades);
        })
        stateObj = addBackstepsToHand(stateObj, (1 + array[index].upgrades))

        return stateObj;
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
        stateObj = immer.produce(stateObj, (newState) => {
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

}


let specialCardPool = {
  fataltoxin: {
    rare: true,
    cardID: 001,
    name: "Fatal Toxin",
    text: (state, index, array) => { return `Apply ${array[index].basePoison + (array[index].upgrades*2)} poison to the enemy.`},
    minReq: (stateObj, index, array) => {
      return array[index].baseCost;
    },
    upgrades: 0,
    baseCost: 1,
    cost:  (stateObj, index, array) => {
      return array[index].baseCost;
    },
    basePoison: 5,
    cardType: "ability",
    elementType: "special",
    action: (stateObj, index, array) => {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.opponentMonster[newState.targetedMonster].poison += array[index].basePoison+(array[index].upgrades*2);
        newState.playerMonster.encounterEnergy -= array[index].baseCost;
      })
      return stateObj;
    }
  },

  pickoff: {
    rare: true,
    cardID: 002,
    name: "Pick Off",
    text: (state, index, array) => { return `If there is more than 1 opponent, kill targeted monster`},
    minReq: (stateObj, index, array) => {
      return array[index].baseCost;
    },
    trigger:  (stateObj, index, array) => { 
      if (stateObj.status !== Status.InEncounter) {
        return false;
      } else {
        return (stateObj.opponentMonster.length > 1);
      }
    },
    upgrades: 0,
    baseCost: 4,
    cost:  (stateObj, index, array) => {
      return array[index].baseCost;
    },
    cardType: "ability",
    elementType: "special",
    action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
          if (stateObj.opponentMonster.length > 1) {
            newState.opponentMonster[newState.targetedMonster].currentHP = 0;
          }
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
      return stateObj;
    }
  },

  testkill: {
    cardID: 003,
    name: "Murder",
    text: (state, index, array) => { return `Kill targeted monster`},
    minReq: (stateObj, index, array) => {
      return array[index].baseCost - array[index].upgrades;
    },
    upgrades: 0,
    baseCost: 1,
    cost:  (stateObj, index, array) => {
      return array[index].baseCost - array[index].upgrades;
    },
    cardType: "ability",
    elementType: "special",
    action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[newState.targetedMonster].currentHP = 0;
          newState.playerMonster.encounterEnergy -= array[index].baseCost-array[index].upgrades;
        })
      return stateObj;
    }
  },

}
  
  let waterCardPool = {
    waterEnergy: {
      name: "",
      text: (state, index, array) => {
        return `Gain ${(1 + array[index].upgrades)} energy`
      },
      minReq: -99,
      cost: "energy",
      upgrades: 0,
      cardType: "waterEnergy",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += (1 + array[index].upgrades);
        })
        return toChangeState;
      }
    },
  
    cloakingFog: {
      name: "Cloaking Fog",
      text: (state, index, array) => {
        return `Spend 2 energy. Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*10)} block`
      },
      minReq: 2,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseBlock: 20,
      cardType: "ability",
      elementType: "water",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (array[index].upgrades*10));
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    drownTest: {
      name: "Pull Under",
      text: (state, index, array) => {
        return `Opponent gains ${15 + (array[index].upgrades*10)} drown`
      },
      minReq: 1,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].drown += 15 + (array[index].upgrades*10);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    enterAbyss: {
      name: "Tsunami",
      text: (state, index, array) => {
        return `All opponents gain ${20 + (array[index].upgrades*10)} drown`
      },
      minReq: 2,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "water",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
            monsterObj.drown += 20 + (array[index].upgrades*10);
          })
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    pinprick: {
      name: "Pinprick",
      text: (state, index, array) => {
        return `Opponent gains +${1 + (array[index].upgrades)} poison.`
      },
      minReq: 0,
      cost: 0,
      upgrades: 0,
      cardType: "ability",
      elementType: "water",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].poison += 1 + array[index].upgrades;
        })
        return toChangeState;
      }
    },

    basicpoison: {
      name: "Poison",
      text: (state, index, array) => {
        return `Opponent gains +${2 + (array[index].upgrades)} poison.`
      },
      minReq: 1,
      baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
      upgrades: 0,
      cardType: "ability",
      elementType: "water",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].poison += 2 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    venomshield: {
      name: "Venom Shield",
      text: (state, index, array) => {
        return `Gain ${array[index].baseBlock + (array[index].upgrades*5) + state.playerMonster.dex} block. Opponent gains +${1 + (array[index].upgrades)} poison.`
      },
      minReq: 1,
      baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
      },
      upgrades: 0,
      cardType: "ability",
      elementType: "water",
      baseBlock: 10,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += array[index].baseBlock + (array[index].upgrades*10) + state.playerMonster.dex;
          newState.opponentMonster[newState.targetedMonster].poison += 1 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    pocketneedle: {
      name: "Pocket Needle",
      text: (state, index, array) => {
        return `Opponent gains +${1 + (array[index].upgrades)} poison. Draw ${1 + (array[index].upgrades)} card.`
      },
      minReq: 1,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      cardType: "ability",
      elementType: "water",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].poison += 1 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        for (let i=0; i < 1+array[index].upgrades; i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },

    bait: {
      name: "Bait",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex + (10*array[index].upgrades))} block. Remove 1 opponent energy` },
      minReq: 1,
      upgrades: 0,
      baseBlock: 15,
      cardType: "ability",
      elementType: "water",
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=1;
          newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (10*array[index].upgrades));
          newState.opponentMonster[newState.targetedMonster].encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    poisondrain: {
      name: "Poison Drain",
      text: (state, index, array) => { return `Apply +${1 + array[index].upgrades} poison. Remove 2 opponent energy` },
      minReq: 1,
      upgrades: 0,
      baseCost: 1,
      cardType: "ability",
      elementType: "water",
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=array[index].baseCost;
          newState.opponentMonster[newState.targetedMonster].poison += 1+ array[index].upgrades;
          newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },

    poisonedblade: {
      name: "Poisoned Blade",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage. Apply ${1+array[index].upgrades} poison`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage ${array[index].baseHits} times. Apply ${1+array[index].upgrades} poison`;
        }
      },
      minReq: 1,
      upgrades: 0,
      baseCost: 1,
      baseDamage: 10,
      baseHits: 1,
      cardType: "attack",
      elementType: "water",
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*5)), array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.opponentMonster[newState.targetedMonster].poison += (1+array[index].upgrades);
        })
        return toChangeState;
      }
    },

    chokingsmog: {
      name: "Choking Smog",
      text: (state, index, array) => { return `Apply +${3+(array[index].upgrades*2)} poison` },
      minReq: 2,
      upgrades: 0,
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.opponentMonster[newState.targetedMonster].poison += (3+(array[index].upgrades*2));
        })
        return toChangeState;
      }
    },

    sabotage: {
      name: "Sabotage",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex + (10*array[index].upgrades))} block. Remove ${2+array[index].upgrades} opponent energy` },
      minReq: 2,
      upgrades: 0,
      baseCost: 2,
      baseBlock: 20,
      cardType: "ability",
      elementType: "water",
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (10*array[index].upgrades));
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > (2+array[index].upgrades)) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= (2+array[index].upgrades);
          } else {
              newState.opponentMonster[newState.targetedMonster].encounterEnergy = 0
          }
        })
        return toChangeState;
      }
    },
  
    bodySlam: {
      name: "Body Slam",
      text: (state, index, array) => {
        if (state.status !== Status.InEncounter) {
          if (array[index].baseHits === 1) {
            return `Deal damage equal to ${50 + (array[index].upgrades*50)}% of your block`        
          } else {
            return `Deal damage equal to ${50 + (array[index].upgrades*50)}% of your block ${array[index].baseHits} times`
          }
        } else {
        if (array[index].baseHits === 1) {
          return `Deal damage equal to ${50 + (array[index].upgrades*50)}% of your block (${Math.floor((state.playerMonster.encounterBlock * (0.5 + (array[index].upgrades*0.5))) + state.playerMonster.strength + array[index].baseDamage)})`        
        } else {
          return `Deal damage equal to ${50 + (array[index].upgrades*50)}% of your block (${Math.floor((state.playerMonster.encounterBlock * (0.5 + (array[index].upgrades*0.5))) + state.playerMonster.strength + array[index].baseDamage)}) ${array[index].baseHits} times`
        }
      }
      },
      minReq: 0,
      cost: 0,
      upgrades: 0,
      baseDamage: 0,
      baseHits: 1,
      cardType: "attack",
      elementType: "water",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (Math.floor(newState.playerMonster.encounterBlock * (0.5 + (array[index].upgrades*0.5))) + array[index].baseDamage), 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    tackle: {
      name: "Tackle",
      text: (state, index, array) => {
        return `Deal ${(10 + state.playerMonster.strength + (array[index].upgrades*5))} damage`
      },
      minReq: 1,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      cardType: "attack",
      elementType: "water",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*5)), 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      name: "Withdraw",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*5))} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      baseBlock: 10,
      cardType: "ability",
      elementType: "water",
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (array[index].upgrades*5));
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },
  
    gainDex: {
      name: "Gymnastics",
      text: (state, index, array) => {
        return `+1 permanent dexterity. Remove`;
      },
      minReq: (state, index, array) => {
        return (3 - (array[index].upgrades))
      },
      upgrades: 0,
      cost: (state, index, array) => {
        return (3 - (array[index].upgrades))
      },
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.dex += 1;
          newState.playerMonster.encounterEnergy -= 3-(array[index].upgrades);
        })
        return toChangeState;
      }
    },

    cautiousBlow: {
      name: "Cautious Blow",
      text: (state, index, array) => {
        return `Spend 1 energy. Deal ${(10 + state.playerMonster.strength + (array[index].upgrades*5))} damage and gain ${(10 + state.playerMonster.dex + (array[index].upgrades*5))} block`;
      },
      minReq: 1,
      cost: "1",
      upgrades: 0,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*5)), 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + (array[index].upgrades*5));
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    guardedStrike: {
      name: "Guarded Strike",
      text: (state, index, array) => {
        return `Spend 2 energy. Deal ${(20 + state.playerMonster.strength) + (array[index].upgrades*10)} damage and gain ${(15 + state.playerMonster.dex + (array[index].upgrades*10))} block`;
      },
      minReq: 2,
      cost: "2",
      upgrades: 0,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (20 + (array[index].upgrades*10)), 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          
          newState.playerMonster.encounterBlock += (15 + newState.playerMonster.dex + (array[index].upgrades*10));
          newState.playerMonster.encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },

    huntPrey: {
      name: "Hunt Prey",
      text: (state, index, array) => {
        return `Deal double damage to the targeted enemy for ${(1 + array[index].upgrades)} turn.`;
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      Type: "ability",
      elementType: "water",
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].hunted += (1 + array[index].upgrades);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },
  }