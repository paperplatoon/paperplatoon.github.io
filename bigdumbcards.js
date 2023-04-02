let bigDumbCards = {
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
  
      bigwithdraw: {
        cardID: 66,
        name: "Big Withdraw",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (5*array[index].upgrades)} block` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 14,
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost)
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

      ritual: {
        cardID: 62,
        name: "Ritual",
        text: (state, index, array) => { 
          return `Gain ${2 + array[index].upgrades} strength` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        rare: true,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "fire",
        action: (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
           newState.playerMonster.fightStrength += 2 + array[index].upgrades;
            newState.playerMonster.strength += 2 + array[index].upgrades;
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
          })
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

      loodshield: {
        cardID: 11,
        name: "Blood Shield",
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
  
      generosity: {
        cardID: 12,
        name: "Generosity",
        text: (state, index, array) => { 
          let totalDamage = array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades)
          return `Deal ${totalDamage} damage. +(${totalDamage}) extra for each time you gifted energy this game (${state.fightEnergyGiftCount + array[index].baseHits} total)` },
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
        baseDamage: 16,
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
          return `Deal ${totalDamage} damage for each card played this turn (${state.cardsPerTurn + array[index].baseHits} total)`; 
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
        baseDamage: 23,
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

      
}