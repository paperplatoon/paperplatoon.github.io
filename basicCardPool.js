let upgradeAnimationTiming = 1500;

let cards = {
    icyfreeze: {
        cardID: 8,
        name: "Icy Freeze",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (6*array[index].upgrades)} block. Opponents lose ${1 + Math.floor(array[index].upgrades/2)} energy` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 3,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 16,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (6*array[index].upgrades), array[index].baseCost);
          stateObj = await destroyEnergy(stateObj, 1 + Math.floor(array[index].upgrades/2), false, true);
          return stateObj;
        }
      },

      wellspring: {
        retain: true,
        cardID: 10,
        name: "Wellspring",
        text: (state, index, array) => { 
            if (array[index].upgrades ===0) {
                return `Draw ${1+array[index].upgrades} card. Draw 1 more card for each turn retained`
            } else {
                return `Draw ${1+array[index].upgrades} cards. Draw 1 more card for each turn retained`
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
        energyGift: 2,
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = immer.produce(state, (newState) => {      
            newState.playerMonster.encounterEnergy -= array[index].baseCost 
          })
          for (let i=0; i < 1+array[index].upgrades; i++) {
            stateObj = drawACard(stateObj);
          }
          return stateObj;
        }
      },

      dampen: {
        cardID: 8,
        name: "Dampen",
        text: (state, index, array) => {
            if (array[index].upgrades ===0) {
                return `All enemies lose ${array[index].energyDestroy + Math.floor(array[index].upgrades/2)} energy.` 
            } else {
                return `All enemies lose ${array[index].energyDestroy + Math.floor(array[index].upgrades/2)} energy. Gain ${array[index].baseBlock + (array[index].upgrades*2)} block` 
            }
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 0,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 4,
        energyDestroy: 1,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = await destroyEnergy(stateObj, 1 + Math.floor(array[index].upgrades/2), false, true);
          if (array[index].upgrades > 0) {
            stateObj = gainBlock(stateObj, array[index].baseBlock + (2*array[index].upgrades), array[index].baseCost);
        }
          return stateObj;
        }
      },

      sanguineshield: {
        cardID: 13,
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
        baseBlock: 11,
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*5), array[index].baseCost);
          stateObj = energyGift(stateObj, array[index].energyGift)
          return stateObj;
        }
      },
  
      wallofichor: {
        cardID: 14,
        name: "Wall of Ichor",
        text: (state, index, array) => { return `Gift opponent ${array[index].energyGift} energy. Gain ${array[index].baseBlock + (array[index].upgrades*6)} block` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        energyGift: 3,
        baseBlock: 20,
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*6), array[index].baseCost);
          stateObj = energyGift(stateObj, array[index].energyGift)
          return stateObj;
        }
      },
  
      shatteringshield: {
        cardID: 15,
        name: "Shattering Shield",
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
        baseBlock: 12,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost);
          stateObj = await destroyEnergy(stateObj, array[index].energyDestroy)
          return stateObj;
        }
      },

      peacefulmind: {
        cardID: 7,
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
        baseBlock: 11,
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
      essencedrain: {
        cardID: 19,
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
        baseBlock: 7,
        upgrades: 0,
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost)
          if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy >= array[index].energyDrain) {
              stateObj = await destroyEnergy(stateObj, array[index].energyDrain)
          } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
            stateObj = await destroyEnergy(stateObj, stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy);
          } else {}
  
          return stateObj;
        }
      },

      energyburst: {
        cardID: 22,
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
        baseDamage: 20,
        energyGift: 2,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*4), array[index].baseHits, array[index].baseCost)
          stateObj = await energyGift(stateObj, array[index].energyGift)
          return stateObj;
        }
      },

      pirouettespin: {
        cardID: 23,
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
        baseDamage: 4,
        baseHits: 0,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades*2)), (state.cardsPerTurn + array[index].baseHits), array[index].baseCost)
          return stateObj;
        }
      },

      bigtackle: {
        cardID: 25,
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
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*5), array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },

      hugetackle: {
        cardID: 26,
        name: "Huge Tackle",
        text: (state, index, array) => { 
          if (array[index].baseHits === 1) {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*7) + state.playerMonster.strength} damage. Destroy ${array[index].energyDrain + array[index].upgrades} energy`;
          } else { 
            return `Deal ${array[index].baseDamage + (array[index].upgrades*7) + state.playerMonster.strength} damage ${array[index].baseHits} times. Destroy ${array[index].energyDrain + array[index].upgrades} energy`
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
        baseDamage: 25,
        baseHits: 1,
        energyDrain: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*7), array[index].baseHits, array[index].baseCost)
          stateObj = await destroyEnergy(stateObj, array[index].energyDrain + array[index].upgrades)
          return stateObj;
        }
      },

      thiefshield: {
        rare: true,
        cardID: 39,
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
        action: async (stateObj, index, array) => {
          let energyDrain =  (array[index].energyDrain + array[index].upgrades)
          if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy >= energyDrain) {
            stateObj = await destroyEnergy(stateObj, energyDrain); 
            stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost, array[index].energyDrain);
          } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
              energyDrain = stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy;
              stateObj = await destroyEnergy(stateObj, energyDrain); 
              stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost, array[index].energyDrain);
          } else {
            stateObj = gainBlock(stateObj, (0-array[index].dex), array[index].baseCost);
          }
          return stateObj;
        }
      },
  
      puffofsmoke: {
        cardID: 40,
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
  
      retreatingslash: {
        cardID: 42,
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
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + array[index].upgrades, array[index].baseHits, array[index].baseCost);
          for (let i=0; i < 1+array[index].upgrades; i++) {
            stateObj = addBackstepsToHand(stateObj)
          }
          return stateObj;
        }
      },

      skipaway: {
        cardID: 44,
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
        cardID: 45,
        name: "Power Up",
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        baseBlock: 4,
        cost:  (state, index, array) => {
            if (array[index].upgrades < array[index].baseCost) {
                return array[index].baseCost - array[index].upgrades;
            } else {
                return 0
            }
        },
        cardType: "ability",
        elementType: "fire",
        text: (state, index, array) => {
            if (array[index].upgrades < array[index].baseCost) {
                return `Double your mana.`
            } else {
                return `Double your mana. Gain ${(array[index].baseBlock * array[index].upgrades) + array[index].dex}`
            }
        },
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            if (array[index].upgrades < array[index].baseCost) {
                newState.playerMonster.encounterEnergy -= array[index].baseCost-array[index].upgrades;
                newState.playerMonster.encounterEnergy *= 2;
            } else {
                newState.playerMonster.encounterEnergy *= 2;
                newState.playerMonster.encounterBlock += (array[index].baseBlock * array[index].upgrades) + array[index].dex;
            } 
          })
          return toChangeState;
        }
      },

      mentalblock: {
        cardID: 47,
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
        cardID: 48,
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
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + array[index].upgrades), array[index].baseHits, array[index].baseCost);
          stateObj = immer.produce(state, (newState) => {
            newState.opponentMonster[newState.targetedMonster].strength -= 2 + array[index].upgrades
          })
          return stateObj;
        }
      },

      throwsand: {
        cardID: 49,
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
        cardID: 50,
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
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades)), array[index].baseHits, array[index].baseCost)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.fightDex += 2+array[index].upgrades;
            newState.playerMonster.dex += 2+array[index].upgrades;
          })
          return stateObj;
        }
      },
  
      friendship: {
        cardID: 51,
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

      meditate: {
        cardID: 29,
        name: "Meditate",
        text: (state, index, array) => { 
            if (array[index].upgrades ===0) {
                return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Return ${1+array[index].upgrades} card`
            } else {
                return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Return ${1+array[index].upgrades} cards`
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
        baseBlock: 5,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {    
          stateObj = await gainBlock(stateObj, (array[index].baseBlock + (2*array[index].upgrades)), array[index].baseCost);
          for (i = 0; i < (1+array[index].upgrades); i++) {
            stateObj = returnCard(stateObj);
          }
          return stateObj;
        }
      },

      recall: {
        cardID: 29,
        name: "Recall",
        text: (state, index, array) => { 
            if (array[index].upgrades ===0) {
                return `Return ${1+array[index].upgrades} card`
            } else {
                return `Return ${1+array[index].upgrades} cards`
            }
          },
        minReq: -99,
        baseCost: 0,
        cost:  0,
        upgrades: 0,
        baseBlock: 5,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {    
          for (i = 0; i < (1+array[index].upgrades); i++) {
            stateObj = await returnCard(stateObj);
          }
          return stateObj;
        }
      },

      redirect: {
        rare: true,
        cardID: 55,
        name: "Redirect",
        text: (state, index, array) => {
          if (state.status === Status.InEncounter) {
            let attackValue = array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength;
            let energyChange = state.fightEnergyDrainTotal + state.fightEnergyGiftTotal;
            if (array[index].baseHits === 1) {
                return `Deal ${attackValue} damage. Deal 1 more for each energy destroyed or gifted (${attackValue+energyChange} total)`;
            } else {
                return `Deal ${attackValue} damage. Deal 1 more for each energy destroyed or gifted (${attackValue+energyChange} total) ${array[index].baseHits} times`;
            }
          } else {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage. Deal 1 more for each energy destroyed or gifted`;
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
        action: async (stateObj, index, array) => {
            let damageTotal = array[index].baseDamage + (array[index].upgrades*3) + stateObj.fightEnergyDrainTotal + stateObj.fightEnergyGiftTotal
          stateObj = await dealOpponentDamage(stateObj, damageTotal, array[index].baseHits, array[index].baseCost);
          return stateObj;
        }
      },

      followupslap: {
        cardID: 58,
        trigger:  (stateObj, index, array) => { 
          return (stateObj.cardsPerTurn === 2);
        },
        name: "Follow-Up Slap",
        text: (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*3)
          cardDamage = (stateObj.cardsPerTurn === 2) ? (cardDamage+5+(array[index].upgrades))  : cardDamage; 
          if (array[index].baseHits === 1 && stateObj.cardsPerTurn !== 2) {
            return `Deal ${cardDamage + stateObj.playerMonster.strength} damage. 3rd card bonus: +${5+(array[index].upgrades)} damage`;
          } else if (array[index].baseHits > 1 && stateObj.cardsPerTurn !== 2) {
            return `Deal ${cardDamage + stateObj.playerMonster.strength} damage ${array[index].baseHits} times. 3rd card bonus: +${5+(array[index].upgrades)} damage`
          } else if (array[index].baseHits === 1 && stateObj.cardsPerTurn === 2) {
            return `Deal ${cardDamage + stateObj.playerMonster.strength} damage`;
          } else {
            return `Deal ${cardDamage + stateObj.playerMonster.strength} damage ${array[index].baseHits} times`
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
        action: async (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*3)
          cardDamage = (stateObj.cardsPerTurn === 2) ? cardDamage + (5+(array[index].upgrades)) : cardDamage;
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
          return stateObj;
        }
      },

      ascension: {
        cardID: 100,
        trigger:  (stateObj, index, array) => { 
          return (array[index].playCount >= 2);
        },
        name: "Ascension",
        text: (stateObj, index, array) => {
          let cardBlock = array[index].baseBlock + stateObj.playerMonster.dex + array[index].upgrades;
          let cardDamage = array[index].baseDamage + stateObj.playerMonster.strength + (array[index].upgrades*10);

          if (array[index].playCount===0 && array[index].baseHits===1) {
            return `Gain ${cardBlock} block. Play twice more: deal ${cardDamage} damage to all enemies`;
          } else if (array[index].playCount===0 && array[index].baseHits > 1) {
            return `Gain ${cardBlock} block. Play twice more: deal ${cardDamage} damage to all enemies ${array[index].baseHits} times`;
          } else if (array[index].playCount===1 && array[index].baseHits===1) {
            return `Gain ${cardBlock} block. Play once more: deal ${cardDamage} damage to all enemies`;
          } else if (array[index].playCount===1 && array[index].baseHits > 1) {
            return `Gain ${cardBlock} block. Play once more: deal ${cardDamage} damage to all enemies ${array[index].baseHits} times`;
          } else if (array[index].playCount >=2 && array[index].baseHits===1) {
            return `Gain ${cardBlock} block. Deal ${cardDamage} damage to all enemies`;
          } else if (array[index].playCount >=2 && array[index].baseHits > 1) {
            return `Gain ${cardBlock} block. Deal ${cardDamage} damage to all enemies ${array[index].baseHits} times`;
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
        baseBlock: 1,
        baseHits: 1,
        baseDamage: 50,
        playCount: 0,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.encounterHand[index].playCount += 1;
          })
          stateObj = gainBlock(stateObj, array[index].baseBlock+array[index].upgrades, array[index].baseCost)
          if (array[index].playCount >= 2) {
            stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*10), array[index].baseHits, false, all=true);
          }
          return stateObj;
        }
      },

      dancersgrace: {
        exhaust: true,
        cardID: 61,
        name: "Dancer's Grace",
        text: (state, index, array) => { 
          if (array[index].upgrades === 0) {
            return `Gain 1 Dexterity. Gain ${array[index].baseBlock} block. Remove`;
          } else {
            return `Gain ${1+array[index].upgrades} Dexterity. Gain ${array[index].baseBlock + array[index].upgrades} block.`;
          }
        },
        minReq: (stateObj, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        baseBlock: 5,
        cost:  (stateObj, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = await gainBlock(stateObj, array[index].baseBlock + array[index].upgrades, array[index].baseCost)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.tempDex += 1+array[index].upgrades;
            newState.playerMonster.dex += 1+array[index].upgrades;
          })
          return stateObj;
        }
      },

      pickoff: {
        cardID: 63,
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
        action: async (stateObj, index, array) => {
          if (stateObj.opponentMonster.length > 1) {
            stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage, array[index].baseHits, array[index].baseCost-array[index].upgrades)
          return stateObj;
        }
      },
    },

    ignite: {
        cardID: 65,
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

      annihilation: {
        cardID: 69,
        name: "Annihilation",
        text: (state, index, array) => {
          if (array[index].baseHits===1) {
            return `Gain ${array[index].baseBlock + (array[index].upgrades*5) + state.playerMonster.dex} block. Deal ${array[index].baseDamage + (array[index].upgrades*10) + state.playerMonster.strength} damage to all enemies`;
          } else {
            return `Gain ${array[index].baseBlock + (array[index].upgrades*4) + state.playerMonster.dex} block. Deal ${array[index].baseDamage + (array[index].upgrades*10) + state.playerMonster.strength} damage to all enemies ${array[index].baseHits} times`;
          }
            
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 5,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseBlock: 20,
        baseDamage: 30,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*5), array[index].baseCost);
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*10), array[index].baseHits, energyCost=false, all=true)
          return stateObj;
        }
      },
  
      bowlthrough: {
        cardID: 70,
        name: "Bowl Through",
        text: (state, index, array) => { 
          if (array[index].baseHits === 1) {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*6) + state.playerMonster.strength} damage to the front monster and the monster behind it`;
          } else { 
            return `Deal ${array[index].baseDamage + (array[index].upgrades*6) + state.playerMonster.strength} damage to the front monster and the monster behind it ${array[index].baseHits} times.`
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
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*6), array[index].baseHits, array[index].baseCost, false, 0);
          if (stateObj.opponentMonster.length > 1) {
            stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*6), array[index].baseHits, false, false, 1);
          }
          return stateObj;
        }
      },
    
      microFlames: {
        cardID: 66,
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
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.tempStrength += 2;
            newState.playerMonster.strength += 2;
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
          })
          stateObj = await destroyEnergy(stateObj, 2)
          return stateObj;
        }
      },
    
      rewindtime: {
        exhaust: true,
        cardID: 67,
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
        action: async (stateObj, index, array) => {
          if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
            stateObj = await destroyEnergy(stateObj, stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy, array[index].baseCost)
            if (array[index].upgrades > 0) {
              stateObj = await dealOpponentDamage(stateObj, 4*array[index].upgrades)
            }
          }        
          return stateObj;
        }
      },

      reformingshield: {
        rare: true,
        exhaust: true,
        cardID: 72,
        name: "Reforming Shield",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + array[index].upgrades} block at the end of each turn. Remove`;
        },
        minReq: (stateObj, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        baseBlock: 5,
        cost:  (stateObj, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
            newState.blockPerTurn += array[index].baseBlock + array[index].upgrades;
          })
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
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost)
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*3), array[index].baseHits, energyCost=false, all=true)
          return stateObj;
        }
      },
  
      unwaveringdefense: {
        cardID: 73,
        rare: true,
        name: "Unwavering Defense",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (4*array[index].upgrades)} block. Your block does not disappear at end of turn.` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 8,
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.blockKeep = true;
          })
          return stateObj;
        }
      },
  
      shutdown: {
        cardID: 74,
        exhaust: true,
        name: "Shut Down",
        text: (stateObj, index, array) => { 
            return `Gain ${array[index].baseBlock + state.playerMonster.dex + (5*array[index].upgrades)} block. Enemy loses 5 strength. Remove`;
           },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 3,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 10,
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[newState.targetedMonster].strength -= 5
          })
          return stateObj;
        }
      },
  










      fireenergy: {
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
  
      accelerate: {
        rare: true,
        cardID: 4,
        name: "Accelerate",
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
          return `Gain 1 energy. Gain ${1 + array[index].upgrades} backstep`
        },
        minReq: -99,
        cost: "energy",
        upgrades: 0,
        cardType: "fireEnergy",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = immer.produce(state, (newState) => {
            newState.playerMonster.encounterEnergy += 1 + array[index].upgrades;
          })
          stateObj = addBackstepsToHand(stateObj, (1 + array[index].upgrades))
  
          return stateObj;
        }
      },
  
      energyconversion: {
        rare: true,
        cardID: 52,
        name: "Conversion",
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
            return `Permanently gain HP equal to cards played this turn (${state.cardsPerTurn}). Remove`;
          } else {
            return `Permanently gain ${array[index].upgrades+1} HP for each card played this turn (${state.cardsPerTurn}). Remove`;
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
      tackle: {
        cardID: 24,
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
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*3), array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },

    withdraw: {
        cardID: 6,
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
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].playCount*(5+(array[index].upgrades*3))), array[index].baseHits, array[index].baseCost)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.encounterHand[index].playCount += 1;
          })
          return stateObj;
        }
      },
  
      honeclaws: {
        cardID: 29,
        name: "Hone Claws",
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
  
      clawback: {
        cardID: 29,
        name: "Claw Back",
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
            let damageValue = array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength;
            let cardHits = state.cardsSkipped + array[index].baseHits;
            return `Deal ${damageValue} damage. Repeat for each time you've skipped adding a card to your deck (${damageValue*cardHits} total)`;
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
          stateObj = await dealOpponentDamage(stateObj, (array[index].baseDamage + (array[index].upgrades)), (state.cardsSkipped + array[index].baseHits), array[index].baseCost);      
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
        baseDamage: 40,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = await dealOpponentDamage(stateObj, ( array[index].baseDamage + (array[index].upgrades*10) - (state.cardsSkipped*2) ), (array[index].baseHits), array[index].baseCost, all=true);
          return stateObj;
        }
      },
  
      sparkbarrage: {
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
  
      overcharge: {
        cardID: 18,
        name: "Overcharge",
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
        name: "Flurry",
        text: (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades) + stateObj.playerMonster.strength;
          cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? cardDamage*2 : cardDamage; 
          if (array[index].baseHits === 1) {
            return `Deal ${cardDamage} damage. Add a copy to your hand. Finisher: double damage.`;
          } else {
            return `Combo. Deal ${cardDamage} damage ${array[index].baseHits} times. Add a copy to your hand. Finisher: double damage`
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
          let cardDamage = array[index].baseDamage + (array[index].upgrades)
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
  
      buildingflame: {
          exhaust: true,
          rare: true,
          cardID: 57,
          retain: true,
          name: "Stoke Up",
          text: (stateObj, index, array) => {
            let cardDamage = array[index].baseDamage + (array[index].upgrades*2) + stateObj.playerMonster.strength;
            if (array[index].baseHits === 1) {
              return `Deal ${cardDamage} damage. Permanently increase by 1. Add a copy to your hand. Retain`;
            } else {
              return `Combo. Deal ${cardDamage} damage ${array[index].baseHits} times. Permanently increase by 1. Add a copy to your hand. Retain`
            }
        },
        minReq: (state, index, array) => {
          return array[index].baseCost + Math.floor(array[index].upgrades/20);
        },
          baseCost: 2,
          cost:  (state, index, array) => {
            return array[index].baseCost + Math.floor(array[index].upgrades/20);
          },
          upgrades: 0,
          baseDamage: 5,
          baseHits: 1,
          cardType: "attack",
          elementType: "fire",
          action: async (stateObj, index, array) => {
            let cardDamage = array[index].baseDamage + (array[index].upgrades*2)
            stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
        
            let cardClone = {...array[index]};
            cardClone.baseDamage += 1;
            stateObj = immer.produce(stateObj, (newState) => {
              newState.encounterHand.push(cardClone);
              newState.playerDeck.find(card => card.name === cardClone.name).baseDamage += 1;
             
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
        baseDamage: 6,
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
        name: "Bide",
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
          cardBlock += (stateObj.playerMonster.encounterBlock >= 5) ? (cardBlock+stateObj.playerMonster.dex) : 0; 
  
          stateObj = gainBlock(stateObj, cardBlock, array[index].baseCost)
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
        name: "Divine Favor",
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
        retain: true,
        cardID: 46,
        name: "Forged Shield",
        text: (state, index, array) => {
          let blockTotal = (array[index].baseBlock + (array[index].upgrades) + state.playerMonster.dex);
          if (state.status === Status.InEncounter) {
            const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard)
            let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
              return acc + obj["upgrades"];
            }, 0); 
            return `Gain ${blockTotal} block. Gain 1 extra block for each upgrade you have (${totalEncounterUpgrades+blockTotal} total). Retain`;
          } else {
            let totalEncounterUpgrades = state.playerDeck.reduce(function(acc, obj) {
              return acc + obj["upgrades"];
            }, 0); 
            return `Gain ${blockTotal} block. Gain 1 extra block for each upgrade you have (${totalEncounterUpgrades+blockTotal} total). Retain`;   
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
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades) + totalEncounterUpgrades, array[index].baseCost)
          return stateObj;
        }
      },
  
      //OTHER ABILITIES
  
      //upgrades - 3
      hammerandtongs: {
        rare: true,
        exhaust: true,
        cardID: 56,
        name: "Hammer & Tongs",
        text: (state, index, array) => {
          if (array[index].upgrades < array[index].baseCost) {
            return `Upgrade a random card in your deck permanently. Remove`;
          } else {
            return `Upgrade a random card in your deck permanently ${array[index].upgrades - array[index].baseCost + 1} times. Remove`;
          }
            ;
        },
        minReq: (state, index, array) => {
          if (array[index].upgrades < array[index].baseCost) {
              return array[index].baseCost - array[index].upgrades
            } else {
              return 0
            }
        },
        timeValue: upgradeAnimationTiming,
        baseCost: 3,
        cost:  (state, index, array) => {
          if (array[index].upgrades < array[index].baseCost) {
              return array[index].baseCost - array[index].upgrades
            } else {
              return 0
            }
        },
        upgrades: 0,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let randomIndex  = Math.floor(Math.random() * stateObj.playerDeck.length)
          let cardUpgrades = 1;
          if (array[index].upgrades > array[index].baseCost) {
            cardUpgrades += array[index].upgrades - array[index].baseCost
          }

  
          upgradeAnimation(stateObj, randomIndex, stateObj.playerDeck, cardUpgrades, divIDName="handContainer2")       
          
          await pause(array[index].timeValue)
          stateObj = immer.produce(stateObj, (newState) => {
            console.log('upgrading ' + newState.playerDeck[randomIndex].name)
            let cardUpgrades = 1;
            if (array[index].upgrades < array[index].baseCost) {
              newState.playerMonster.encounterEnergy -= array[index].baseCost - array[index].upgrades
            } else {
              cardUpgrades = array[index].upgrades - array[index].baseCost + 1
            }
            newState.playerDeck[randomIndex].upgrades += cardUpgrades;
  
            if (stateObj.encounterHand.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
              let handIndex = newState.encounterHand.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
              newState.encounterHand[handIndex].upgrades += cardUpgrades;
            } else if (stateObj.encounterDiscard.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
              let discardIndex = newState.encounterDiscard.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
              newState.encounterDiscard[discardIndex].upgrades += cardUpgrades;
            } else if (stateObj.encounterDraw.find(card => card.name === stateObj.playerDeck[randomIndex].name)) {
              let drawIndex = newState.encounterDraw.findIndex(card => card.name === stateObj.playerDeck[randomIndex].name)
              newState.encounterDraw[drawIndex].upgrades += cardUpgrades;
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
          if (array[index].upgrades === 0 ) {
              return `Upgrade all cards in your deck for this combat. Remove`   
          } else {
              return `Upgrade all cards in your deck for this combat ${1+array[index].upgrades} times. Remove`
          }
            
          },
        minReq: (state, index, array) => {
          return array[index].baseCost+array[index].upgrades;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost+array[index].upgrades;
        },
        cardType: "ability",
        elementType: "fire",
        exhaust: true,
        action: (stateObj, index, array) => { 
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy -= array[index].baseCost+array[index].upgrades;
            newState.encounterHand.forEach(function (cardObj) {
              cardObj["upgrades"] +=1+array[index].upgrades;
            });
            newState.encounterDraw.forEach(function (cardObj) {
              cardObj["upgrades"] +=1+array[index].upgrades;
            });
            newState.encounterDiscard.forEach(function (cardObj) {
              cardObj["upgrades"] +=1+array[index].upgrades;
            });
          })
          return stateObj;
        }
      },
  
      siphon: {
        cardID: 33,
        name: "Siphon",
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
        name: "Heal",
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
        name: "Shared Joy",
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
        name: "Cursed Pact",
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
        exhaust: true,
        text: (state, index, array) => { 
          return `Gain ${4 + (array[index].upgrades)} strength. Remove` 
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
           newState.playerMonster.fightStrength += 4 + array[index].upgrades;
            newState.playerMonster.strength += 4 + array[index].upgrades;
            newState.playerMonster.encounterEnergy -= 2;
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
        baseCost: 1,
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
        name: "Bulk Up",
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

      chargedblast: {
        rare: true,
        cardID: 70,
        retain: true,
        name: "Stoke Up",
        text: (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*10) + stateObj.playerMonster.strength;
          if (array[index].baseHits === 1) {
            return `Deal ${cardDamage} damage. Retain: gain 10 damage a turn.`;
          } else {
            return `Combo. Deal ${cardDamage} damage ${array[index].baseHits} times. Retain: gain 10 damage a turn.`
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
        baseDamage: 0,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*10)
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
          return stateObj;
        }
      },
}



//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------



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
      basePoison: 10,
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
  
    backstep: {
      cardID: 004,
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

    recycle: {
      cardID: 005,
      name: "Recycle",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex) + (3*array[index].upgrades)} block. Remove all other cards in your hand.` },
      upgrades: 0,
      baseCost: 1,
      exhaustAll: true,
      minReq: (stateObj, index, array) => {
        return array[index].baseCost;
      },
      cost: (stateObj, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 7,
      cardType: "ability",
      elementType: "fire",
      action: (stateObj, index, array) => {
        stateObj = gainBlock(stateObj, array[index].baseBlock+(array[index].upgrades*3), array[index].baseCost);
        stateObj = immer.produce(stateObj, (newState) => {
          cardClone = {...array[index]}
          newState.encounterDiscard.push(cardClone)
          newState.encounterHand = [];
        })
        return stateObj;
      }
    },
    theocho: {
      cardID: 006,
      name: "The Ocho",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*15) + state.playerMonster.strength} damage`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*15) + state.playerMonster.strength} damage ${array[index].baseHits} times.`
        }
    },
    minReq: (state, index, array) => {
      return array[index].baseCost;
    },
      baseCost: 8,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 80,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*15), array[index].baseHits, array[index].baseCost)
        return stateObj;
      }
    },

    testingtoxin: {
      rare: true,
      cardID: 007,
      name: "Testing Toxin",
      text: (state, index, array) => { return `Apply ${array[index].basePoison + (array[index].upgrades*3)} poison to the enemy.`},
      minReq: (stateObj, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 3,
      cost:  (stateObj, index, array) => {
        return array[index].baseCost;
      },
      basePoison: 15,
      cardType: "ability",
      elementType: "special",
      action: (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.opponentMonster[newState.targetedMonster].poison += array[index].basePoison+(array[index].upgrades*3);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return stateObj;
      }
    },

    
  
  }
    
   

