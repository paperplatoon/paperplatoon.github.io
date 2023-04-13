let basicCardPool = {
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
                return `Draw ${1+array[index].upgrades} card`
            } else {
                return `Draw ${1+array[index].upgrades} cards`
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
        baseDamage: 18,
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
        retain: true,
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
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (5*array[index].upgrades)} block. Your block does not disappear at end of turn.` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 10,
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
  

}

let starterDeck = {
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
      minReq: -99,
      upgrades: 0,
      baseCost: 1,
      exhaustAll: true,
      cost:  (state, index, array) => {
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
  
  }
    
   

