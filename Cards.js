 
//for fire, add more cards that use kindle
//damage for energy

//ADD SOMETHING THAT LETS YOU SEE THE ENTIRE CARD POOL


//Take Aim/Sabotage will be for air

//keyword: if energy is removed, do effect.
//evnts that let you change baseCost, baseHits, baseBlock, baseDamage, and baseHeal

//more cards that deal damage to all
//add a 0-cost card that deals damage for total self-damage dealt in a fight * 2 (rare)

//total = 30
let upgradeAnimationTiming = 1500;


let fireCardPool = {
    // ENERGY - 5
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

    fireBlockEnergy: {
      cardID: 64,
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

    energyconversion: {
      rare: true,
      cardID: 52,
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
      upgrades: 0,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (array[index].upgrades === 0) {
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
          } else {
            newState.playerMonster.encounterBlock += (4*(array[index].upgrades-1)) + newState.playerMonster.dex;
          }          
          newState.playerMonster.encounterEnergy += state.cardsPerTurn;
        })
        
        return toChangeState;
      }
    },


    //REMOVABLE ABILITIES - 1
    feast: {
      rare: true,
      exhaust: true,
      cardID: 54,
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


    //20 + 20 + 12 = 52
    //ATTACKS - 20 
    //7 + 13
    energyburst: {
      ...basicCardPool.energyburst,
    },
    pirouettespin: {
      ...basicCardPool.pirouettespin,
    },
    hugetackle: {
      ...basicCardPool.hugetackle,
    },
    bowlthrough: {
      ...basicCardPool.bowlthrough,
    },
    annihilation: {
      ...basicCardPool.annihilation,
    },
    followupslap: {
      ...basicCardPool.followupslap,
    },
    redirect: {
      ...basicCardPool.redirect,
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
      action: async(stateObj, index, array) => {
        stateObj = immer.produce(state, (newState) => {
          newState.encounterHand[index].playCount += 1;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].playCount*(5+(array[index].upgrades*3))), baseHits)
        return stateObj;
      }
    },

    upgrade: {
      cardID: 29,
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
        stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + array[index].upgrades), array[index].baseHits, array[index].baseCost);
        for (i = 0; i < (1+array[index].upgrades); i++) {
          stateObj = upgradeCard(stateObj);
        }
        return stateObj;
      }
    },

    doubleclaws: {
      cardID: 29,
      name: "Double Claws",
      text: (state, index, array) => { 
            return `Deal ${array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*2)} damage ${array[index].baseHits} times. Return 2 cards`
        },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 2,
      baseHits: 2,
      timeValue: upgradeAnimationTiming,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {    
        stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + (2*array[index].upgrades)), array[index].baseHits, array[index].baseCost);
        for (i = 0; i < (1+array[index].upgrades); i++) {
          stateObj = returnCard(stateObj);
        }
        return stateObj;
      }
    },

    clarity: {
      rare: true,
      cardID: 34,
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
      action: async (stateObj , index, array) => {
        stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades)), (state.cardsSkipped + array[index].baseHits), array[index].baseCost );      
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
      baseDamage: 6,
      baseHits: 0,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        let damageValue = (array[index].baseDamage + (2 * array[index].upgrades));
        let hitsValue = stateObj.playerMonster.encounterEnergy+array[index].baseHits;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy = 0;
        })
        stateObj = await dealOpponentDamage(stateObj, damageValue, hitsValue);
        return stateObj;
      }
    },

    generosity: {
      cardID: 16,
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
      baseDamage: 5,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage+(array[index].upgrades * 2), state.fightEnergyGiftCount + array[index].baseHits, array[index].baseCost )
        return stateObj
      }
    },

    bloatedbomb: {
      rare: true,
      cardID: 35,
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
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, ( array[index].baseDamage + (array[index].upgrades*10) - (state.cardsSkipped*2) ), (array[index].baseHits), array[index].baseCost, all=true);
        return stateObj;
      }
    },

    sparkBarrage: {
      cardID: 36,
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
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, (array[index].baseHits + array[index].upgrades), array[index].baseCost);
        return stateObj;
      }
    },

    siphon: {
      cardID: 18,
      name: "Siphon",
      text: (stateObj, index, array) => {
        if (array[index].baseHits === 0) {
          return `Destroy ${(array[index].energyDrain + array[index].upgrades)} energy. Deal ${array[index].baseDamage} for each energy destroyed`
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
      cardType: "attack",
      elementType: "fire",
      energyDrain: 2,
      baseDamage: 4,
      baseHits: 0,
      action: async (stateObj, index, array) => {
        let drainTotal = array[index].energyDrain + array[index].upgrades;
        if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > drainTotal) {
          stateObj = await destroyEnergy(stateObj, drainTotal);
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, (drainTotal + array[index].baseHits));
        } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
          drainTotal = stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy;
          stateObj = await destroyEnergy(stateObj, drainTotal);
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, (drainTotal + array[index].baseHits));
        } else {}
        
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        
        return stateObj;
      }
    },

    flurryfinisher: {
      exhaust: true,
      cardID: 57,
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
      action: async (stateObj, index, array) => {
        let cardDamage = array[index].baseDamage + (array[index].upgrades*2)
        cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? ((cardDamage*2)+stateObj.playerMonster.strength) : cardDamage;
        stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
    
        let cardClone = {...array[index]};
        cardClone.baseCost = 1;
        stateObj = immer.produce(stateObj, (newState) => {
          newState.encounterHand.push(cardClone);
        })
        return stateObj;
      }
    },

    fireball: {
      cardID: 20,
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
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, (array[index].baseHits + (array[index].upgrades)), energyCost=array[index].baseCost)
        return stateObj;
      }
    },

    fierymissiles: {
      cardID: 21,
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
      baseDamage: 7,
      energyGift: 2,
      baseHits: 2,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*2), array[index].baseHits, array[index].baseCost)
        stateObj = await energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },
    
    vampiricstrike: {
      cardID: 27,
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
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades*2)), array[index].baseHits, array[index].baseCost)
        let healValue = (array[index].baseHeal + array[index].upgrades) * state.cardsPerTurn;
        stateObj = healPlayer(stateObj, healValue)
        return stateObj;
      }
    },

    flamewhip: {
      cardID: 71,
      name: "Flame Whip",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Gift ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*3))} damage to all enemies` 
        } else {
          return `Gift ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*3))} damage to all enemies ${(array[index].baseHits)} times` 
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
      baseDamage: 9,
      energyGift: 1,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*2), array[index].baseHits, array[index].baseCost, all=true)
        stateObj = await energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    //20
    //BLOCK CARDS - 9
    //11 
    icyfreeze: {
      ...basicCardPool.icyfreeze,
    },
    sanguineshield: {
      ...basicCardPool.sanguineshield,
    },
    shatteringshield: {
      ...basicCardPool.shatteringshield,
    },
    essencedrain: {
      ...basicCardPool.essencedrain,
    },
    thiefshield: {
      ...basicCardPool.thiefshield,
    },
    puffofsmoke: {
      ...basicCardPool.puffofsmoke,
    },
    skipaway: {
      ...basicCardPool.skipaway,
    },
    mentalblock: {
      ...basicCardPool.mentalblock,
    },
    reformingshield: {
      ...basicCardPool.reformingshield,
    },
    unwaveringdefense: {
      ...basicCardPool.unwaveringdefense,
    },
    wallofichor: {
      ...basicCardPool.wallofichor,
    },
 
    flamingStrike: {
      cardID: 28,
      name: "Flaming Cloak",
      text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} block. Attacks deal +${(2*array[index].upgrades)+4} damage this turn`
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseBlock: 8,
      baseHits: 1,
      cardType: "ability",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = immer.produce(state, (newState) => {
          newState.playerMonster.tempStrength += (2*array[index].upgrades)+4;
          newState.playerMonster.strength += (2*array[index].upgrades)+4;
        })
        stateObj = await gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*3)), array[index].baseCost)
        return stateObj;
      }
    },

    rareupgrade: {
      cardID: 30,
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

    fortify: {
      cardID: 59,
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
      cardID: 60,
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

    mentalblock: {
      cardID: 31,
      name: "Mental Block",
      text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Return ${1+Math.floor(array[index].upgrades/2)} card`},
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
      baseBlock: 6,
      timeValue: upgradeAnimationTiming,
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*2)), array[index].baseCost )
        stateObj = returnCard(stateObj);
        return stateObj;
      }
    },

    invigorate: {
      cardID: 31,
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
      baseBlock: 10,
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
      cardID: 32,
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

    religiousfervor: {
      rare: true,
      exhaust: true,
      cardID: 62,
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

    forgeshield: {
      rare: true,
      cardID: 46,
      name: "Forge's Shield",
      text: (state, index, array) => {
        let blockTotal = (array[index].baseBlock + (array[index].upgrades) + state.playerMonster.dex);
        if (state.status === Status.InEncounter) {
          const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard)
          let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
            return acc + obj["upgrades"];
          }, 0); 
          return `Gain ${blockTotal} block. Gain 1 extra block for each upgrade you have (${totalEncounterUpgrades+blockTotal} total)`;
        } else {
          let totalEncounterUpgrades = state.playerDeck.reduce(function(acc, obj) {
            return acc + obj["upgrades"];
          }, 0); 
          return `Gain ${blockTotal} block. Gain 1 extra block for each upgrade you have (${totalEncounterUpgrades+blockTotal} total)`;   
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

    flamedome: {
      cardID: 68,
      name: "Flame Dome",
      text: (state, index, array) => {
        if (array[index].baseHits===1) {
          return `Gain ${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} block. Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage to all enemies`;
        } else {
          return `Gain ${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} block. Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage to all enemies ${array[index].baseHits} times`;
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
      baseBlock: 11,
      baseDamage: 4,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost)
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*3), array[index].baseHits, energyCost=false, all=true)
        return stateObj;
      }
    },

    //OTHER ABILITIES

    //upgrades - 3
    hammerandtongs: {
      rare: true,
      exhaust: true,
      cardID: 56,
      name: "Hammer and Tongs",
      text: (state, index, array) => {
        if (array[index].upgrades < 2) {
          return `Upgrade a random card in your deck permanently. Remove`;
        } else {
          return `Upgrade a random card in your deck permanently ${1+Math.floor(array[index].upgrades/3)} times. Remove`;
        }
          ;
      },
      minReq: (state, index, array) => {
        return array[index].baseCost - Math.floor(array[index].upgrades/2);
      },
      timeValue: upgradeAnimationTiming,
      baseCost: 3,
      cost:  (state, index, array) => {
        return array[index].baseCost-(Math.floor(array[index].upgrades/2));
      },
      upgrades: 1,
      cardType: "ability",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        let randomIndex  = Math.floor(Math.random() * stateObj.playerDeck.length)
        let cardIndex = 0;

        upgradeAnimation(stateObj, randomIndex, stateObj.playerDeck, 1+Math.floor(array[index].upgrades/3), divIDName="handContainer2")       
        
        await pause(array[index].timeValue)
        stateObj = immer.produce(stateObj, (newState) => {
          console.log('upgrading ' + newState.playerDeck[randomIndex].name)
          newState.playerDeck[randomIndex].upgrades += 1+Math.floor(array[index].upgrades/3);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          if (stateObj.encounterHand.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
            let handIndex = newState.encounterHand.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
            newState.encounterHand[handIndex].upgrades += 1+Math.floor(array[index].upgrades/3);
          } else if (stateObj.encounterDiscard.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
            let discardIndex = newState.encounterDiscard.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
            newState.encounterDiscard[discardIndex].upgrades += 1+Math.floor(array[index].upgrades/3);
          } else if (stateObj.encounterDraw.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
            let drawIndex = newState.encounterDraw.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
            newState.encounterDraw[drawIndex].upgrades += 1+Math.floor(array[index].upgrades/3);
          } else {
            console.log('could not find card');
          }
        });
          return stateObj;
        }
    },

    expertsforge: {
      rare: true,
      cardID: 53,
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

    refineenergy: {
      cardID: 33,
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
        stateObj = await destroyEnergy(stateObj, array[index].energyDrain, array[index].baseCost)
        for (i = 0; i < (2+array[index].upgrades); i++) {
          stateObj = await upgradeCard(stateObj);
        }  
        return stateObj;
      }
    },
  
    //heal - 3
    simpleheal: {
      cardID: 9,
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
        stateObj = healPlayer(stateObj, array[index].baseHeal+(array[index].upgrades * 2), 1)
        return stateObj;
      }
    },

    enjoin: {
      cardID: 38,
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

    sunlight: {
      rare: true,
      cardID: 43,
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

    //gift/draw - 1
    darkknowledge: {
      cardID: 10,
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

    //gain strength - 5
    cursedritual: {
      name: "Cursed Ritual",
      cardID: "strength1",
      text: (state, index, array) => { 
        return `Gift opponent ${array[index].energyGift} energy. Gain ${2 + array[index].upgrades} strength` 
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
         newState.playerMonster.fightStrength += 2 + array[index].upgrades;
          newState.playerMonster.strength += 2 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        stateObj = energyGift(stateObj, array[index].energyGift)
        return stateObj;
      }
    },

    ritual: {
      cardID: "strength2",
      name: "Ritual",
      text: (state, index, array) => { 
        return `Gain ${5 + (2*array[index].upgrades)} strength` 
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 2,
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

    brandingiron: {
      cardID: "strength3",
      name: "Branding Iron",
      text: (state, index, array) => { return `Deal ${array[index].baseSelfDamage - array[index].upgrades} damage to yourself. Gain ${3+Math.ceil(array[index].upgrades/2)} strength` },
      minReq: 0,
      upgrades: 0,
      baseCost: 0,
      cost:  0,
      baseSelfDamage: 5,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.playerMonster.fightStrength += (3+array[index].upgrades);
          newState.playerMonster.strength += (3+array[index].upgrades);
        })
        if (array[index].upgrades < array[index].baseSelfDamage) {
          stateObj = dealSelfDamage(stateObj, array[index].baseSelfDamage - array[index].upgrades);
        }
        return stateObj;
      }
    },

    gainstrength: {
      rare: true,
      cardID: "strength4",
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

    hypertrain: {
      cardID: "strength5",
      name: "Hyper Training",
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
        return `Double your strength.`
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost-Math.floor(array[index].upgrades/2);
          newState.playerMonster.strength *= 2;
          newState.playerMonster.fightStrength *= 2;
        })
        return toChangeState;
      }
    },
    
}



