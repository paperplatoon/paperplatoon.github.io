let upgradeAnimationTiming = 1500;

//return animation

let cards = {
    icyfreeze: {
        cardID: 8,
        name: "Icy Freeze",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (4*array[index].upgrades)} block. All enemies lose ${array[index].energyDrain + Math.floor(array[index].upgrades/2)} energy` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 3,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 18,
        energyDrain: 1,
        cardType: "ability",
        elementType: "air",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (4*array[index].upgrades), array[index].baseCost);
          stateObj = await destroyEnergy(stateObj, 1 + Math.floor(array[index].upgrades/2), false, true);
          return stateObj;
        }
      },

      

      wellspring: {
        retain: true,
        cardID: 10,
        name: "Wellspring",
        text: (state, index, array) => { 
          let textString = `Draw ${1+array[index].upgrades} card`;
          if (array[index].upgrades > 0) {
              textString += 's'
          } 
          textString += '. Doesn\'t discard. Draw +1 card per turn in hand.'
          // if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
          //   textString += "<br></br><br>This card stays in your hand until you play it. Each turn it stays in your hand, it becomes more powerful</br>"
          // }
          return textString
        },
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);

          stateObj = immer.produce(state, (newState) => {      
            newState.playerMonster.encounterEnergy -= array[index].baseCost 
          })
          for (let i=0; i < 1+array[index].upgrades; i++) {
            stateObj = await drawACard(stateObj);
          }
          return stateObj;
        }
      },

      dampen: {
        cardID: 8,
        name: "Dampen",
        text: (state, index, array) => {
            if (array[index].upgrades ===0) {
                return `All enemies lose ${array[index].energyDestroy + Math.floor(array[index].upgrades/2)} energy` 
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
        baseBlock: 3,
        energyDestroy: 1,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
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
        text: (state, index, array) => { return `Enemy gains ${array[index].energyGift} energy. Gain ${array[index].baseBlock + (array[index].upgrades*3)} block` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        energyGift: 2,
        baseBlock: 10,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost);
          stateObj = await energyGift(stateObj, array[index].energyGift)
          return stateObj;
        }
      },
  
      wallofichor: {
        cardID: 14,
        name: "Wall of Ichor",
        text: (state, index, array) => { return `Enemy gains ${array[index].energyGift} energy. Gain ${array[index].baseBlock + (array[index].upgrades*4)} block` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        energyGift: 2,
        baseBlock: 15,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost);
          stateObj = await energyGift(stateObj, array[index].energyGift)
          return stateObj;
        }
      },
  
      shatteringshield: {
        cardID: 15,
        name: "Shattering Shield",
        text: (state, index, array) => { return `Enemy loses ${array[index].energyDestroy} energy. Gain ${array[index].baseBlock + (array[index].upgrades*3)} block` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        energyDestroy: 2,
        baseBlock: 9,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost);
          stateObj = await destroyEnergy(stateObj, array[index].energyDestroy)
          return stateObj;
        }
      },

      peacefulmind: {
        cardID: 7,
        name: "Peaceful Mind",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (3*array[index].upgrades)} block. Gain 2 dexterity` 
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (3*array[index].upgrades), array[index].baseCost);
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
        text: (state, index, array) => { return `Enemy loses ${array[index].energyDrain} energy. Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*3)} block` },
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
        baseBlock: 4,
        upgrades: 0,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost)
          stateObj = await destroyEnergy(stateObj, array[index].energyDrain)
          
          return stateObj;
        }
      },

      energyburst: {
        cardID: 22,
        name: "Energy Burst",
        text: (stateObj, index, array) => {
          let calculatedDamage = array[index].baseDamage + stateObj.playerMonster.strength + (array[index].upgrades*4)
          let textString = `Enemy gains ${array[index].energyGift} energy. Deal ${calculatedDamage} damage`
          if (array[index].baseHits > 1) {
            textString += ` ${(array[index].baseHits)} times`
          }
          return textString
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
          let totalBaseDamage = array[index].baseDamage + (array[index].upgrades*4);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          stateObj = await energyGift(stateObj, array[index].energyGift)
          return stateObj;
         }
      },

      pirouettespin: {
        cardID: 23,
        name: "Pirouette Spin",
        text: (stateObj, index, array) => { 
          let totalDamage = (array[index].baseDamage + array[index].upgrades + stateObj.playerMonster.strength);
          let textString = `Deal ${totalDamage} damage for each card played this turn`
          if (state.status === Status.InEncounter) {
            textString += ` (${(state.cardsPerTurn + array[index].baseHits) * totalDamage} total)`; 
          }
          return textString; 
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
        action: async (stateObj, index, array) => {
          let totalBaseDamage = array[index].baseDamage + array[index].upgrades
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength ) * (state.cardsPerTurn + array[index].baseHits);
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)

          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, (state.cardsPerTurn + array[index].baseHits), array[index].baseCost)
          return stateObj;
        }
      },

      weightythoughts: {
        cardID: 25,
        name: "Weighty Thoughts",
        text: (stateObj, index, array) => { 
          let totalDamage = (array[index].baseDamage + (array[index].upgrades*4) + stateObj.playerMonster.strength);
          let textString = `Deal ${totalDamage} damage`;
          if (array[index].baseHits > 1) {
            textString += ` ${array[index].baseHits} times`; 
          }
          textString += `. +1 for each card in your deck (${totalDamage+stateObj.playerDeck.length} total)`; 
          return textString; 
        },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseDamage: 10,
        baseHits: 1,
        cardType: "attack",
        elementType: "earth",
        action: async (stateObj, index, array) => {
          let totalBaseDamage = (array[index].baseDamage + (array[index].upgrades*4) +  stateObj.playerDeck.length);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },

      decimate: {
        cardID: 26,
        name: "Decimate",
        text: (state, index, array) => { 
          if (array[index].baseHits === 1) {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*6) + state.playerMonster.strength} damage. Enemy loses ${array[index].energyDrain + array[index].upgrades} energy`;
          } else { 
            return `Deal ${array[index].baseDamage + (array[index].upgrades*6) + state.playerMonster.strength} damage ${array[index].baseHits} times. Enemy loses ${array[index].energyDrain + array[index].upgrades} energy`
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
        baseDamage: 24,
        baseHits: 1,
        energyDrain: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let totalBaseDamage = array[index].baseDamage + (array[index].upgrades*6);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          stateObj = await destroyEnergy(stateObj, array[index].energyDrain + array[index].upgrades)
          return stateObj;
        }
      },

      sabotage: {
        name: "Sabotage",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*3)} block. Enemy loses ${array[index].energyDrain+Math.floor(array[index].upgrades/2)} energy`
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
        energyDrain: 1,
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await gainBlock(stateObj, array[index].baseBlock+ (array[index].upgrades*3), array[index].baseCost)
          stateObj = await destroyEnergy(stateObj, array[index].energyDrain + Math.floor(array[index].upgrades/2))
          return stateObj;
        }
      },

      thiefshield: {
        rare: true,
        cardID: 39,
        name: "Thief's Shield",
        text: (state, index, array) => { return `Enemy loses ${array[index].energyDrain + Math.floor(array[index].upgrades/2)} energy. Gain ${array[index].baseBlock + array[index].upgrades} block for each energy drained.` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 8,
        cardType: "ability",
        elementType: "fire",
        energyDrain: 1,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          let energyDrain =  (array[index].energyDrain + array[index].upgrades)
          if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy >= energyDrain) {
            stateObj = await destroyEnergy(stateObj, energyDrain); 
            stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost, array[index].energyDrain);
          } else if (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy > 0) {
              energyDrain = stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy;
              stateObj = await destroyEnergy(stateObj, energyDrain); 
              stateObj = gainBlock(stateObj, array[index].baseBlock, array[index].baseCost, array[index].energyDrain);
          } else {
            stateObj = gainBlock(stateObj, (0-stateObj.playerMonster.dex), array[index].baseCost);
          }
          return stateObj;
        }
      },
  
      puffofsmoke: {
        cardID: 40,
        name: "Puff Of Smoke",
        text: (state, index, array) => { 
          let textString = `Gain ${(array[index].baseBlock + state.playerMonster.dex)} block. Gain ${(1+array[index].upgrades)} Backstep card`;
          if (array[index].upgrades > 0) {
            textString += `s`;
          } 
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Backstep cards cost 0, gain 4 block, and are removed from your deck when played)</br>"
          }
          return textString
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 4,
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
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
          let textString = `Deal ${(array[index].baseDamage + state.playerMonster.strength + array[index].upgrades)} damage` 
          if (array[index].baseHits > 1) {
            textString += `${array[index].baseHits} times`;
          } 
          textString += `. Gain ${(1+array[index].upgrades)} Backstep card`;
          if (array[index].upgrades > 0) {
            textString += `s`;
          } 
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Backstep cards cost 0, gain 4 block, and are removed from your deck when played)</br>"
          }
          return textString
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
        elementType: "water",
        action: async (stateObj, index, array) => {

          let totalBaseDamage = array[index].baseDamage + array[index].upgrades;
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          for (let i=0; i < 1+array[index].upgrades; i++) {
            stateObj = addBackstepsToHand(stateObj)
          }
          return stateObj;
        }
      },

      skipaway: {
        cardID: 44,
        name: "Skip Away",
        text: (state, index, array) => { 
          let textString = `Gain ${(2+array[index].upgrades)} Backstep cards`;
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Backstep cards cost 0, gain 4 block, and are removed from your deck when played)</br>"
          }
          return textString
        },
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
        action: async (stateObj, index, array) => {
            await cardAnimationDiscard(index);
            stateObj = await addBackstepsToHand(state, (2+array[index].upgrades))
            stateObj = immer.produce(stateObj, (newState) => {
              newState.playerMonster.encounterEnergy -= array[index].baseCost;
            })
          return stateObj;
        }
      },

      powerup: {
        cardID: 45,
        name: "Power Up",
        exhaust: true,
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
                return `Double your energy. Remove`
            } else {
                return `Double your energy. Gain ${(array[index].baseBlock * array[index].upgrades) + state.playerMonster.dex} block. Remove`
            }
        },
        action: async (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            if (array[index].upgrades < array[index].baseCost) {
                newState.playerMonster.encounterEnergy -= array[index].baseCost-array[index].upgrades;
                newState.playerMonster.encounterEnergy *= 2;
            } else {
                newState.playerMonster.encounterEnergy *= 2;
                newState.playerMonster.encounterBlock += (array[index].baseBlock * array[index].upgrades) + state.playerMonster.dex;
            } 
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return toChangeState;
        }
      },

      mentalblock: {
        cardID: 47,
        name: "Mental Block",
        text: (stateObj, index, array) => { 
          let textString = `Gain block equal to your deck size`
          if (array[index].upgrades > 0) {
            textString += ` + ${array[index].upgrades*4}`
          } 
          textString += ` (${stateObj.playerDeck.length + stateObj.playerMonster.dex + array[index].baseBlock + (array[index].upgrades*4)})`;
          return textString;
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, stateObj.playerDeck.length + array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost)
          return stateObj;
        }
      },
      disablingblow: {
        cardID: 48,
        name: "Disabling Blow",
        text: (state, index, array) => { 
          if (array[index].baseHits === 1) {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage. Opponent loses ${2 + Math.floor(array[index].upgrades/2)} strength`;
          } else {
            return `Deal ${array[index].baseDamage + array[index].upgrades + state.playerMonster.strength} damage ${array[index].baseHits} times. Opponent loses ${Math.floor(array[index].upgrades/2)} strength`
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
        baseDamage: 12,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let totalBaseDamage = array[index].baseDamage + (array[index].upgrades*2);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)

          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[newState.targetedMonster].strength -= 2 + Math.floor(array[index].upgrades/2)
          })
          return stateObj;
        }
      },

      throwsand: {
        cardID: 49,
        name: "Throw Sand",
        text: (stateObj, index, array) => { 
          let textString = `Enemy loses ${4 + array[index].upgrades} strength. Gain ${(1+array[index].upgrades)} Backstep card`;
          if (array[index].upgrades > 0) {
            textString += `s`;
          } 
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Backstep cards cost 0, gain 4 block, and are removed from your deck when played)</br>"
          }
          return textString
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
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
            return `Deal ${array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength} damage. Gain ${1+array[index].upgrades} dexterity`;
          } else {
            return `Deal ${array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength} damage ${array[index].baseHits} times. Gain ${1+array[index].upgrades} dexterity`
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
          let totalBaseDamage = array[index].baseDamage + array[index].upgrades;
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.fightDex += 1+array[index].upgrades;
            newState.playerMonster.dex += 1+array[index].upgrades;
          })
          return stateObj;
        }
      },
  
      friendship: {
        cardID: 51,
        name: "Protective Aura",
        text: (state, index, array) => {
            let blockNum = array[index].baseBlock + (array[index].upgrades*4) + state.playerMonster.dex;
            let energyNum = state.fightEnergyGiftTotal + state.fightEnergyDrainTotal;
            let textString = `Gain ${blockNum+energyNum} block. Gains +1 block when you make opponents gain or lose energy.`
            return textString;
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
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
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
                return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Return the last card played to your hand`
            } else {
                return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Return the last ${1+array[index].upgrades} cards played to your hand`
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
          await cardAnimationDiscard(index); 
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
                return `Return the last card played to your hand`
            } else {
                return `Return the last ${1+array[index].upgrades} cards played to your hand`
            }
          },
        minReq: -99,
        baseCost: 0,
        cost:  0,
        upgrades: 0,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {    
          await cardAnimationDiscard(index);
          for (i = 0; i < (1+array[index].upgrades); i++) {
            stateObj = await returnCard(stateObj);
          }
          return stateObj;
        }
      },

      banish: {
        cardID: 55,
        name: "Final Blow",
        trigger:  (stateObj, index, array) => { 
          if (stateObj.status !== Status.InEncounter) {
            return false
          }
          return (stateObj.playerMonster.encounterEnergy === array[index].baseCost);
        },
        text: (state, index, array) => {
            let damageValue = array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength;
            attackValue = (state.playerMonster.encounterEnergy === array[index].baseCost && state.status === Status.InEncounter) ? (damageValue*2)  : damageValue; 
            let textString = `Deal ${attackValue} damage`
            if (array[index].baseHits > 1) {
                textString += ` ${array[index].baseHits} times`;
            } 
            if (state.playerMonster.encounterEnergy !== array[index].baseCost || state.status !== Status.InEncounter) {
              textString += `. Finale: deal ${attackValue} more`
            }
             return textString;
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
        action: async (stateObj, index, array) => {
          let damageValue = array[index].baseDamage + (array[index].upgrades*2) + stateObj.playerMonster.strength;
          let attackValue = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? (damageValue*2)  : damageValue;
          let calculatedDamage = (attackValue + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, attackValue-stateObj.playerMonster.strength, array[index].baseHits, array[index].baseCost)
          return stateObj;
        },
      },

      insight: {
        cardID: 55,
        name: "Insight",
        trigger:  (stateObj, index, array) => { 
          if (stateObj.status !== Status.InEncounter) {
            return false
          }
          return (stateObj.playerMonster.encounterEnergy === array[index].baseCost);
        },
        text: (state, index, array) => {
            let damageValue = array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength;
            let textString = `Deal ${damageValue} damage`
            if (array[index].baseHits > 1) {
                textString += ` ${array[index].baseHits} times`;
            } 
            if (state.playerMonster.encounterEnergy !== array[index].baseCost || state.status !== Status.InEncounter) {
              textString += `. Finale: `
            } else {
              textString += `. `
            }
            textString += `Draw ${2 + Math.floor(array[index].upgrades/2)} cards`
             return textString;
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
        action: async (stateObj, index, array) => {
          let damageValue = array[index].baseDamage + (array[index].upgrades*2);
          let calculatedDamage = (damageValue + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, damageValue, array[index].baseHits, array[index].baseCost)
          if (state.playerMonster.encounterEnergy !== array[index].baseCost) {
            for (let i=0; i < 2+Math.floor(array[index].upgrades/2); i++) {
              stateObj = await drawACard(stateObj);
            }
          }
          return stateObj;
        },
      },
      

      followupslap: {
        cardID: 58,
        trigger:  (stateObj, index, array) => { 
          return (stateObj.cardsPerTurn === 2);
        },
        name: "Follow-Up Slap",
        text: (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*3) + stateObj.playerMonster.strength;
          cardDamage = (stateObj.cardsPerTurn === 2 && stateObj.status === Status.InEncounter) ? (cardDamage+5+(array[index].upgrades))  : cardDamage; 
          let textString = `Deal ${cardDamage + stateObj.playerMonster.strength} damage`;
          if (array[index].baseHits > 1) {
            textString += ` ${array[index].baseHits} times`
          }
          if (stateObj.cardsPerTurn !==2) {
            textString += `. Deal ${5+(array[index].upgrades)} more if played third this turn`
          }
          return textString
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
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },

      ascension: {
        cardID: 100,
        trigger:  (stateObj, index, array) => { 
          return (array[index].playCount >= 2);
        },
        name: "Ascension",
        rare: true,
        text: (stateObj, index, array) => {
          let cardBlock = array[index].baseBlock + stateObj.playerMonster.dex + array[index].upgrades;
          let cardDamage = array[index].baseDamage + stateObj.playerMonster.strength + (array[index].upgrades*10);
          let textString = `Gain ${cardBlock} block. `
          if (stateObj.status !== Status.InEncounter) {
            textString += `Play three times: `
          }
          if (array[index].playCount===0) {
            textString += `Play twice more: `
          } else if (array[index].playCount===1) {
            textString += `Play once more: `
          }
          textString += `Deal ${cardDamage} damage to all enemies`
          if (array[index].baseHits > 1) {
            textString += ` ${array[index].baseHits} times`
          }
          return textString;
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
        baseDamage: 60,
        playCount: 0,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.encounterHand[index].playCount += 1;
          })
          stateObj = gainBlock(stateObj, array[index].baseBlock+array[index].upgrades, array[index].baseCost)
          if (array[index].playCount >= 2) {
            let totalBaseDamage = array[index].baseDamage + (10*array[index].upgrades);
            let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
            await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)        
            stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost, true)
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
            return `Gain ${array[index].baseBlock} block. Gain 1 Dexterity. Remove`;
          } else {
            return `Gain ${array[index].baseBlock + array[index].upgrades} block. Gain ${1+array[index].upgrades} Dexterity. `;
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
            
            if (array[index].upgrades > 0) {
              cardClone = {...array[index]};
              newState.encounterDiscard.push(cardClone);
            } 
          })
          if (array[index].upgrades === 0) {
            document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
            await pause(500);
            document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          } else {
            await cardAnimationDiscard(index);
          }
          return stateObj;
        }
      },

      //not currently in use
      pickoff: {
        cardID: 63,
        name: "Pick Off",
        text: (state, index, array) => {
          let textString = `Deal ${array[index].baseDamage + (3*array[index].upgrades)}`
          if (array[index].baseHits === 1) {
            textString += ` ${array[index].baseHits} times`
          }
          textString += `. If there is more than 1 opponent, deal ${25 + (5 * (1+array[index].upgrades))} more.`;
           return textString},
        minReq: (stateObj, index, array) => {
          return array[index].baseCost
        },
        trigger:  (stateObj, index, array) => { 
          if (stateObj.status !== Status.InEncounter) {
            return false;
          } else {
            return (stateObj.opponentMonster.length > 1);
          }
        },
        upgrades: 0,
        baseCost: 1,
        baseDamage: 5,
        baseHits: 1,
        cost:  (stateObj, index, array) => {
          return array[index].baseCost-array[index].upgrades;
        },
        cardType: "ability",
        elementType: "special",
        action: async (stateObj, index, array) => {
          let totalBaseDamage = array[index].baseDamage + (3*array[index].upgrades);
          if (stateObj.opponentMonster.length > 1) {
            totalBaseDamage += 25 + (5 * (1+array[index].upgrades))
          }
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },

    ignite: {
        cardID: 65,
        name: "Ignite",
        text: (state, index, array) => { return `Enemy gains ${array[index].energyGift} energy. Attacks deal +${4 + (array[index].upgrades)} damage this turn.` },
        minReq: -99,
        baseCost: 0,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        cardType: "ability",
        elementType: "fire",
        energyGift: 1,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.tempStrength += 4 + array[index].upgrades;
            newState.playerMonster.strength += 4 + array[index].upgrades;
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
            return `Gain ${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} block. Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage`;
          } else {
            return `Gain ${array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex} block. Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage ${array[index].baseHits} times`;
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
        baseDamage: 40,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost);
          let totalBaseDamage = array[index].baseDamage + (array[index].upgrades*5);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits)
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
          let totalBaseDamage = array[index].baseDamage + (6*array[index].upgrades);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, 0, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost, false, 0);
          if (stateObj.opponentMonster.length > 1) {
            await cardAnimationDamageDiscard(stateObj, 1, calculatedDamage)
            stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, false, false, 1);
          }
          return stateObj;
        }
      },
    
      microFlames: {
        cardID: 66,
        name: "Micro Flames",
        text: (state, index, array) => { return `Destroy 2 energy. Your attacks do +${(3 + array[index].upgrades)} damage this turn`},
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
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.tempStrength += 3 + array[index].upgrades;
            newState.playerMonster.strength += 3 + array[index].upgrades;
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
            return `Destroy all of your opponent's energy. Remove` 
          } else {
            return `Destroy all of your opponent's energy. Deal ${4*array[index].upgrades} damage. Remove` 
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
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");        
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
        baseBlock: 4,
        cost:  (stateObj, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
            newState.blockPerTurn += array[index].baseBlock + array[index].upgrades;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      //fix later
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
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost)

          let totalBaseDamage = array[index].baseDamage + (array[index].upgrades*2);
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, false, true)
          return stateObj;
        }
      },
  
      unwaveringdefense: {
        cardID: 73,
        rare: true,
        exhaust: true,
        name: "Unwavering Defense",
        text: (state, index, array) => { 
          return `Gain ${array[index].baseBlock + state.playerMonster.dex + (2*array[index].upgrades)} block. Your block does not disappear at end of turn. Remove` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 4,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 3,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (2*array[index].upgrades), array[index].baseCost);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.blockKeep = true;
          })
          return stateObj;
        }
      },

      whirlwind: {
        cardID: 73,
        rare: true,
        exhaust: true,
        name: "Shield Spikes",
        text: (state, index, array) => { 
          return `Backsteps also deal ${array[index].baseDamage} extra damage to all enemies. Remove` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        baseDamage: 5,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.backstepDamage += array[index].baseDamage;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      longlegs: {
        cardID: 73,
        rare: true,
        exhaust: true,
        name: "Long Legs",
        text: (state, index, array) => { 
          return `Your backsteps block for 4 extra block. Remove` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.backstepExtraBlock += 4;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      expand: {
        cardID: 73,
        rare: true,
        exhaust: true,
        name: "Expand",
        text: (state, index, array) => { 
          return `Gain ${1 + array[index].upgrades} strength whenever you make opponent gain or lose energy. Remove` 
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.gainStrengthEnergyChange += 1 + array[index].upgrades;
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },
  
      shutdown: {
        cardID: 74,
        exhaust: true,
        name: "Shut Down",
        text: (stateObj, index, array) => { 
            return `Gain ${array[index].baseBlock + stateObj.playerMonster.dex + (5*array[index].upgrades)} block. Enemy loses 5 strength. Remove`;
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
        action: async (stateObj, index, array) => {
          stateObj = gainBlock(stateObj, array[index].baseBlock + (5*array[index].upgrades), array[index].baseCost);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[newState.targetedMonster].strength -= 5
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },
  










      fireenergy: {
        cardID: 1,
        name: "",
        text: (state, index, array) => {
          return `Gain ${1 + Math.floor(array[index].upgrades/2)} energy`
        },
        minReq: -99,
        cost: "energy",
        upgrades: 0,
        cardType: "fireEnergy",
        elementType: "fire",
        action: async (state, index, array) => {
          await cardAnimationDiscard(index);
          let toChangeState = immer.produce(state, (newState) => {
            newState.playerMonster.encounterEnergy += 1 + Math.floor(array[index].upgrades/2);
    
          })
          return toChangeState;
        }
      },

      waterenergy: {
        name: "",
        text: (state, index, array) => {
          return `Gain ${1 + Math.floor(array[index].upgrades/2)} energy`
        },
        minReq: -99,
        cost: "energy",
        upgrades: 0,
        cardType: "waterEnergy",
        elementType: "water",
        action: async (state, index, array) => {
          await cardAnimationDiscard(index);
          let toChangeState = immer.produce(state, (newState) => {
            newState.playerMonster.encounterEnergy += 1 + Math.floor(array[index].upgrades/2);
          })
          return toChangeState;
        }
      },
      rareFireEnergy: {
        rare: true,
        cardID: 3,
        name: "",
        text: (state, index, array) => {
          let textString = `Gain 2 energy`;
          if (array[index].upgrades > 2) {
            textString += `. Enemy loses ${array[index].upgrades - 2} energy` 
           } else if (array[index].upgrades < 2) {
            textString += `. Enemy gains ${2-array[index].upgrades} energy`
           }
          return textString;
        },
        minReq: -99,
        cost: "energy",
        upgrades: 0,
        cardType: "fireEnergy",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await energyGift(stateObj, 2)
          let toChangeState = immer.produce(stateObj, (newState) => {
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
        minReq: (state, index, array) => {
          return array[index].baseCost
        },
        baseCost: 4,
        cost:  (state, index, array) => {
            return array[index].baseCost
        },
        cardType: "ability",
        elementType: "fire",
        text: (state, index, array) => {
            return `Gain ${7 + array[index].upgrades} energy`
        },
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
            stateObj = immer.produce(stateObj, (newState) => {
              newState.playerMonster.encounterEnergy -= array[index].baseCost;
              newState.playerMonster.encounterEnergy += 7 + array[index].upgrades;
            })
          return stateObj;
        }
      },
  
      energize: {
        cardID: 64,
        name: "Energize",
        text: (state, index, array) => {
          return `Gain ${2 + array[index].upgrades}  energy`
        },
        minReq: -99,
        cost: 1,
        upgrades: 0,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(state, (newState) => {
            newState.playerMonster.encounterEnergy += 2 + array[index].upgrades;
          })
  
          return stateObj;
        }
      },
  
      //not in use
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
            return `Permanently gain 1 HP for each card played this turn (${state.cardsPerTurn}). Remove`;
          } else {
            return `Permanently gain ${array[index].upgrades+1} HP for each card played this turn (${state.cardsPerTurn}). Remove`;
          }
        },
        minReq: -99,
        cost: 0,
        upgrades: 0,
        cardType: "ability",
        elementType: "fire",
        action: async (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.playerMonster.maxHP += (state.cardsPerTurn * (array[index].upgrades +1));
            newState.playerMonster.currentHP += (state.cardsPerTurn * (array[index].upgrades +1));
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");

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
          let calculatedDamage = array[index].baseDamage + (array[index].upgrades*3)
          await addDiscardAnimation(index)
          await addDealOpponentDamageAnimation(stateObj, calculatedDamage)
          await pause(350)
          await finishDiscardAnimation(index)
          await removeDealOpponentDamageAnimation(stateObj, calculatedDamage)

          stateObj = await dealOpponentDamage(stateObj, calculatedDamage, array[index].baseHits, array[index].baseCost)
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (3*array[index].upgrades), array[index].baseCost)
          return stateObj;
        }
      },

      //BOMBS

      laytrap: {
        cardID: 40,
        name: "Lay Trap",
        text: (state, index, array) => { 
          let textString = `Gain ${(array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades * 3))} block. Gain ${(1)} Bomb card`;
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Bombs cost 0 and deal 7 damage to EVERYONE, including you. They're removed from your deck when played)</br>"
          }
          return textString
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
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await gainBlock(stateObj, array[index].baseBlock, array[index].baseCost)
          stateObj = await addBombsToHand(stateObj)
          return stateObj;
        }
      },

      selfimmolate: {
        cardID: 40,
        name: "Self Immolate",
        text: (state, index, array) => { 
          let textString = `Gain ${(array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades * 3))} block. Gain ${(2 + (array[index].upgrades/2))} Bomb cards`;
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Bombs cost 0 and deal 7 damage to EVERYONE, including you. They're removed from your deck when played)</br>"
          }
          return textString
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 11,
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades * 3), array[index].baseCost)
          stateObj = await addBombsToHand(stateObj, 2 + (array[index].upgrades/2))
          return stateObj;
        }
      },

      spinaway: {
        cardID: 40,
        name: "Spin Away",
        text: (state, index, array) => { 
          let textString = `Gain ${3 + array[index].upgrades} backsteps. Gain ${(1 + (array[index].upgrades/2))} Bomb`;
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Bombs cost 0 and deal 7 damage to EVERYONE, including you. They're removed from your deck when played)</br>"
            textString += "<br></br><br> (Backstabs cost 0 and gain 4 block. They're removed from your deck when played)</br>"
          }
          return textString
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 11,
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await addBackstepsToHand(stateObj, 3 + array[index].upgrades)
          stateObj = await addBombsToHand(stateObj, 1 + (array[index].upgrades/2))
          return stateObj;
        }
      },

      TakeCover: {
        cardID: 40,
        name: "Take Cover",
        text: (state, index, array) => { 
          let textString = `Gain ${(array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades * 4))} block. Gain ${(3 + (array[index].upgrades/2))} Bomb cards`;
          if (state.status === Status.ChooseEncounterCardReward || state.status === Status.cardShop) {
            textString += "<br></br><br> (Bombs cost 0 and deal 7 damage to EVERYONE, including you. They're removed from your deck when played)</br>"
          }
          return textString
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
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades * 4), array[index].baseCost)
          stateObj = await addBombsToHand(stateObj, 3 + (array[index].upgrades/2))
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
          let totalBaseDamage = array[index].baseDamage +  (array[index].playCount*(5+(array[index].upgrades*3)));
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          
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
            return `Deal ${array[index].baseDamage + state.playerMonster.strength + array[index].upgrades} damage ${array[index].baseHits} times. Upgrade your top left card ${1 + Math.floor(array[index].upgrades/2)} times`
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
        baseDamage: 2,
        baseHits: 2,
        timeValue: upgradeAnimationTiming,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let totalBaseDamage = array[index].baseDamage +  array[index].upgrades;
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)
          
          upgradeAnimation(stateObj, 0, stateObj.encounterHand, 1+Math.floor(array[index].upgrades/2), divIDName="handContainer2")       
          await pause(array[index].timeValue)
          for (i = 0; i < (1+Math.floor(array[index].upgrades/2)); i++) {
            stateObj = upgradeCard(stateObj);
          }
          return stateObj;
        }
      },
  
      clawback: {
        cardID: 29,
        name: "Claw Back",
        text: (state, index, array) => { 
              return `Deal ${array[index].baseDamage + state.playerMonster.strength + array[index].upgrades} damage ${array[index].baseHits} times. Return the last 2 cards played to your hand`
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
          let totalBaseDamage = array[index].baseDamage +  array[index].upgrades;
          let calculatedDamage = (totalBaseDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, totalBaseDamage, array[index].baseHits, array[index].baseCost)  
          stateObj = returnCard(stateObj);
          stateObj = returnCard(stateObj);

          return stateObj;
        }
      },
  
      clarity: {
        rare: true,
        cardID: 34,
        name: "Clarity",
        text: (state, index, array) => {
            let damageValue = array[index].baseDamage + (array[index].upgrades) + state.playerMonster.strength;
            return `Deal ${damageValue} damage. +2 for each time you've skipped adding a card to your deck (${damageValue + (state.cardsSkipped*2)} total)`;
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
        baseDamage: 8,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj , index, array) => {
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades) + (stateObj.cardsSkipped*2), array[index].baseHits, array[index].baseCost);      
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
          let calculatedDamage = (damageValue + stateObj.playerMonster.strength) * (hitsValue)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, damageValue, hitsValue)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy = 0;
          })
          return stateObj;
        }
      },
  
    //   generosity: {
    //     cardID: 16,
    //     name: "Generosity",
    //     text: (state, index, array) => { 
    //       let totalDamage = array[index].baseDamage + state.playerMonster.strength + array[index].upgrades;
    //       let textString = "";
    //       if (state.status === Status.InEncounter) {
    //         textString += `Deal ${totalDamage} damage`
    //       } else {
    //         textString += `Deal ${totalDamage-state.playerMonster.strength} damage`
    //       }

    //       if (array[index].baseHits > 1) {
    //         textString += ` ${array[index].baseHits} times`
    //       }

    //       textString += `. +${2+ array[index].upgrades} extra for each energy filled`;
          
    //       if (state.status === Status.InEncounter) {
    //         textString += ` (${(state.fightEnergyGiftCount*3) + totalDamage} total)`
    //       }
    //       return textString
    // },
    //     minReq: (state, index, array) => {
    //       return array[index].baseCost;
    //     },
    //     upgrades: 0,
    //     baseCost: 1,
    //     cost:  (state, index, array) => {
    //       return array[index].baseCost;
    //     },
    //     baseDamage: 7,
    //     baseHits: 1,
    //     cardType: "attack",
    //     elementType: "fire",
    //     action: async (stateObj, index, array) => {
    //       stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage+array[index].upgrades + (stateObj.fightEnergyGiftCount*(2+ array[index].upgrades)), array[index].baseHits, array[index].baseCost)
    //       return stateObj
    //     }
    //   },

    endingfeint: {
      cardID: 55,
      name: "Ending Feint",
      trigger:  (stateObj, index, array) => { 
        if (stateObj.status !== Status.InEncounter) {
          return false
        }
        return (stateObj.playerMonster.encounterEnergy === array[index].baseCost);
      },
      text: (state, index, array) => {
          let damageValue = array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength;
          let textString = `Deal ${damageValue} damage`
          if (array[index].baseHits > 1) {
              textString += ` ${array[index].baseHits} times`;
          } 
          if (state.playerMonster.encounterEnergy !== array[index].baseCost) {
            textString += `. Finale: `
          } else {
            textString += `. `
          }
          textString += `Add ${2 + Math.floor(array[index].upgrades/2)} Backsteps to your hand`
           return textString;
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
      baseDamage: 7,
      cardType: "attack",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        let damageValue = array[index].baseDamage + (array[index].upgrades*3);
        let calculatedDamage = (damageValue + stateObj.playerMonster.strength) * (array[index].baseHits)
        await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
        
        if (stateObj.playerMonster.encounterEnergy === array[index].baseCost) {
          stateObj = addBackstepsToHand(stateObj, 2 + Math.floor(array[index].upgrades/2))
        }
        
        stateObj = await dealOpponentDamage(stateObj, damageValue, array[index].baseHits, array[index].baseCost)
        return stateObj;
      },
    },
  
      bloatedbomb: {
        rare: true,
        cardID: 35,
        name: "Bloated Bomb",
        text: (state, index, array) => { 
          let textString = `Deal 2 damage to all opponents for each card in your deck `;
          if (array[index].upgrades > 0) {
            textString += `+ ${array[index].upgrades*4} `;
          }
          if (array[index].baseHits > 1) {
            textString += `${array[index].baseHits} times `;
          }
          textString += `(${(array[index].baseDamage + (array[index].upgrades*4) + (state.playerDeck.length * 2) +  state.playerMonster.strength) * array[index].baseHits} total)`;
          return textString
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 3,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseHits: 1,
        baseDamage: 0,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
        let damageValue = (array[index].baseDamage + (array[index].upgrades*4) + (stateObj.playerDeck.length * 2));
        let calculatedDamage = (damageValue + stateObj.playerMonster.strength) * (array[index].baseHits)
        await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
        
        stateObj = await dealOpponentDamage(stateObj, damageValue, array[index].baseHits, array[index].baseCost, all=true)
        return stateObj;
        }
      },
  
      sparkbarrage: {
        cardID: 36,
        name: "Spark Barrage",
        text: (state, index, array) => { return `Deal ${array[index].baseDamage + state.playerMonster.strength + array[index].upgrades} damage ${array[index].baseHits} times`},
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 2,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseDamage: 4,
        baseHits: 3,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let damageValue = array[index].baseDamage + array[index].upgrades;
          let calculatedDamage = (damageValue + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          
          stateObj = await dealOpponentDamage(stateObj, damageValue, array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },
  
      //not done yet
      overcharge: {
        cardID: 18,
        name: "Overcharge",
        text: (stateObj, index, array) => {
          if (array[index].baseHits === 0) {
            return `Enemy loses ${(array[index].energyDrain + array[index].upgrades)} energy. Deal ${array[index].baseDamage + state.playerMonster.strength} for each energy drained`
          } else {
            return `Enemy loses ${(array[index].energyDrain + array[index].upgrades)} energy. Deal ${array[index].baseDamage + state.playerMonster.strength} for each energy drained + (${array[index].baseHits}) `
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
        elementType: "air",
        energyDrain: 2,
        baseDamage: 5,
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
          

      
          
          return stateObj;
        }
      },
  
      flurryfinisher: {
        exhaust: true,
        cardID: 57,
        trigger:  (stateObj, index, array) => { 
          if (stateObj.playerMonster.encounterEnergy === array[index].baseCost && stateObj.status === Status.InEncounter) {
            return true
          } else { return false}
        },
        name: "Flurry",
        text: (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades) + stateObj.playerMonster.strength;
          cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? cardDamage*2 : cardDamage;
          let textString = `Deal ${cardDamage} damage` 
          if (array[index].baseHits > 1) {
            textString += ` ${array[index].baseHits} times`
          } 
          textString += `. Add a copy to your hand. Finale: Deal double damage` 
          return textString
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
        elementType: "air",
        action: async (stateObj, index, array) => {
          let cardDamage =  array[index].baseDamage + array[index].upgrades;
          cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? cardDamage*2 : cardDamage;
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)
      
          let cardClone = {...array[index]};
          cardClone.baseCost = 1;
          stateObj = immer.produce(stateObj, (newState) => {
            newState.encounterHand.push(cardClone);
          })
          return stateObj;
        }
      },

      // flurryfinisher: {
      //   exhaust: true,
      //   cardID: 57,
      //   trigger:  (stateObj, index, array) => { 
      //     return (stateObj.playerMonster.encounterEnergy === array[index].baseCost);
      //   },
      //   name: "Flurry",
      //   text: (stateObj, index, array) => {
      //     let cardDamage = array[index].baseDamage + (array[index].upgrades) + stateObj.playerMonster.strength;
      //     cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? cardDamage*2 : cardDamage; 
      //     if (array[index].baseHits === 1) {
      //       return `Deal ${cardDamage} damage. Add a copy to your hand. Finisher: double damage.`;
      //     } else {
      //       return `Combo. Deal ${cardDamage} damage ${array[index].baseHits} times. Add a copy to your hand. Finisher: double damage`
      //     }
      // },
      // minReq: (state, index, array) => {
      //   return array[index].baseCost;
      // },
      //   baseCost: 1,
      //   cost:  (state, index, array) => {
      //     return array[index].baseCost;
      //   },
      //   upgrades: 0,
      //   baseDamage: 6,
      //   baseHits: 1,
      //   cardType: "attack",
      //   elementType: "fire",
      //   action: async (stateObj, index, array) => {
      //     let cardDamage = array[index].baseDamage + (array[index].upgrades)
      //     cardDamage = (stateObj.playerMonster.encounterEnergy === array[index].baseCost) ? ((cardDamage*2)+stateObj.playerMonster.strength) : cardDamage;
      //     stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
      
      //     let cardClone = {...array[index]};
      //     cardClone.baseCost = 1;
      //     stateObj = immer.produce(stateObj, (newState) => {
      //       newState.encounterHand.push(cardClone);
      //     })
      //     return stateObj;
      //   }
      // },

      // eighthdimension: {
      //   exhaust: true,
      //   rare: true,
      //   cardID: 57,
      //   retain: true,
      //   name: "Eigthth Dimension",
      //   text: (stateObj, index, array) => {
      //     let cardDamage =  (array[index].upgrades*2) + stateObj.playerMonster.strength;
      //     if (array[index].baseHits === 1) {
      //       return `Deal ${array[index].baseDamage} + ${cardDamage} damage. Permanently increase by 1. Add a copy to your hand. Retain`;
      //     } else {
      //       return `Deal ${array[index].baseDamage} + ${cardDamage} damage ${array[index].baseHits} times. Permanently increase by 1. Add a copy to your hand. Retain`
      //     }
      // },
      // minReq: (state, index, array) => {
      //   let costIncrease = Math.floor(array[index].baseDamage/8)
      //   return array[index].baseCost + costIncrease;
      // },
      //   baseCost: 1,
      //   cost:  (state, index, array) => {
      //     let costIncrease = Math.floor(array[index].baseDamage/8)
      //     return array[index].baseCost + costIncrease;
      //   },
      //   upgrades: 0,
      //   baseDamage: 1,
      //   baseHits: 1,
      //   cardType: "attack",
      //   elementType: "fire",
      //   action: async (stateObj, index, array) => {
      //     let costIncrease = Math.floor(array[index].baseDamage/20)
      //     let cardDamage = array[index].baseDamage + array[index].upgrades
      //     stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost + costIncrease);
      //     let cardClone = {...array[index]};
      //     cardClone.baseDamage += 1;
      //     stateObj = immer.produce(stateObj, (newState) => {
      //       newState.encounterHand.push(cardClone);
      //       newState.playerDeck.find(card => card.name === cardClone.name).baseDamage += 1;
           
      //     })
      //     return stateObj;
      //   }
      // },
  
      buildingflame: {
          rare: true,
          cardID: 57,
          name: "Building Flame",
          text: (stateObj, index, array) => {
            let cardDamage = array[index].baseDamage + (array[index].upgrades*3) + stateObj.playerMonster.strength;
            if (array[index].baseHits === 1) {
              return `Deal ${cardDamage} damage. Permanently increase by 1`;
            } else {
              return `Deal ${cardDamage} damage ${array[index].baseHits} times. Permanently increase by 1`
            }
        },
        minReq: (state, index, array) => {
          return array[index].baseCost + Math.floor(array[index].baseDamage/20);
        },
          baseCost: 1,
          cost:  (state, index, array) => {
            return array[index].baseCost + Math.floor(array[index].baseDamage/20);
          },
          upgrades: 0,
          baseDamage: 2,
          baseHits: 1,
          cardType: "attack",
          elementType: "fire",
          action: async (stateObj, index, array) => {
            let cardDamage =  array[index].baseDamage + (3*array[index].upgrades);
            let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
            await cardAnimationDamageDiscard(stateObj, index, calculatedDamage) 
            stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost);
            let cardClone = {...array[index]};
            cardClone.baseDamage += 1;
            stateObj = immer.produce(stateObj, (newState) => {
              newState.encounterHand[index].baseDamage += 1;
              newState.playerDeck.find(card => card.name === array[index].name).baseDamage += 1;
             
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
        baseDamage: 2,
        baseHits: 3,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let cardDamage =  array[index].baseDamage + array[index].upgrades;
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, energyCost=array[index].baseCost)
          return stateObj;
        }
      },
  
      fierymissiles: {
        cardID: 21,
        name: "Fiery Missiles",
        text: (state, index, array) => { return `Enemy gains ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*2))} damage ${(array[index].baseHits)} times` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseDamage: 5,
        energyGift: 2,
        baseHits: 2,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let calculatedDamage = array[index].baseDamage + (array[index].upgrades*2) + stateObj.playerMonster.strength
          await cardAnimationDamageDiscard(stateObj, index, (calculatedDamage * array[index].baseHits))

          stateObj = await energyGift(stateObj, array[index].energyGift)
          stateObj = await dealOpponentDamage(stateObj, calculatedDamage-stateObj.playerMonster.strength, array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },
      
      //done
      vampiricstrike: {
        cardID: 27,
        name: "Vampiric Strike",
        text: (state, index, array) => { 
            let calculatedDamage = array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength
            textString = `Deal ${calculatedDamage} damage`
            if (array[index].baseHits > 1) {
              textString += ` ${array[index].baseHits} times`
            }
            textString += `. Heal ${array[index].baseHeal+array[index].upgrades + state.extraHeal} per card played this turn`;
            if (state.status === Status.InEncounter) {
              textString += ` (${(array[index].baseHeal+array[index].upgrades + state.extraHeal) * state.cardsPerTurn}) total`
            }
            return textString
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
        baseHeal: 1,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let calculatedDamage = array[index].baseDamage + (array[index].upgrades*2)
          await addDiscardAnimation(index)
          await addDealOpponentDamageAnimation(stateObj, calculatedDamage)
          await pause(350)
          await finishDiscardAnimation(index)
          await removeDealOpponentDamageAnimation(stateObj, calculatedDamage)


          stateObj = await dealOpponentDamage(stateObj, calculatedDamage, array[index].baseHits, array[index].baseCost)
          let healValue = (array[index].baseHeal + array[index].upgrades) * state.cardsPerTurn;
          stateObj = await healPlayer(stateObj, healValue)
          return stateObj;
        }
      },
  
      flamewhip: {
        cardID: 71,
        name: "Flame Whip",
        text: (state, index, array) => { 
          if (array[index].baseHits === 1) {
            return `Enemy gains ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*3))} damage to all enemies` 
          } else {
            return `Enemy gains ${array[index].energyGift} energy. Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*3))} damage to all enemies ${(array[index].baseHits)} times` 
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
          let calculatedDamage = array[index].baseDamage + (array[index].upgrades*2) + stateObj.playerMonster.strength
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)
          stateObj = await dealOpponentDamage(stateObj, array[index].baseDamage + (array[index].upgrades*2), array[index].baseHits, array[index].baseCost, all=true)
          stateObj = await energyGift(stateObj, array[index].energyGift, 0, all=true)
          return stateObj;
        }
      },

      flamingcloak: {
        cardID: 28,
        name: "Flaming Cloak",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + (array[index].upgrades*2) + state.playerMonster.dex} block. Attacks deal +${array[index].upgrades+3} damage this turn`
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
        baseHits: 1,
        cardType: "ability",
        elementType: "water",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(state, (newState) => {
            newState.playerMonster.tempStrength += array[index].upgrades+3;
            newState.playerMonster.strength += array[index].upgrades+3;
          })
          stateObj = await gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*2)), array[index].baseCost)
          return stateObj;
        }
      },
  
      bide: {
        cardID: 30,
        name: "Bide",
        text: (state, index, array) => { 
          let textString = `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2)} block. Upgrade your top left card`
          if (array[index].upgrades > 0) {
            textString += ` ${1 + Math.floor(array[index].upgrades/2)} times.`
          }
          return textString;
        },
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          upgradeAnimation(stateObj, 0, stateObj.encounterHand, 1+Math.floor(array[index].upgrades/2), divIDName="handContainer2")       
          
          await pause(array[index].timeValue)
          stateObj = gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*2)), array[index].baseCost )
          for (i = 0; i < (1+Math.floor(array[index].upgrades/2)); i++) {
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
            return `Gain ${cardBlock} block. Gain ${cardBlock} more if you already have at least 5 block`
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
        baseBlock: 5,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          let block = array[index].baseBlock + stateObj.playerMonster.strength + (3*array[index].upgrades)
          stateObj = gainBlock(stateObj, block, array[index].baseCost)
          return stateObj;
        }
      },
  
      invigorate: {
        cardID: 31,
        name: "Invigorate",
        text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*3)} block. Gain ${1+Math.floor(array[index].upgrades/2)} strength.`},
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
        baseBlock: 9,
        timeValue: upgradeAnimationTiming,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, (array[index].baseBlock + (array[index].upgrades*3)), array[index].baseCost )
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.fightStrength += 1+Math.floor(array[index].upgrades/2);
            newState.playerMonster.strength += 1+Math.floor(array[index].upgrades/2);
          })
         return stateObj;
        }
      },
  
      infuse: {
        cardID: 32,
        name: "Infuse",
        text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*4)} block. Upgrade your top left card twice.`},
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
        baseBlock: 8,
        timeValue: upgradeAnimationTiming,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          upgradeAnimation(stateObj, 0, stateObj.encounterHand, 2, divIDName="handContainer2")       
          
          await pause(array[index].timeValue)
          stateObj = upgradeCard(stateObj);
          stateObj = upgradeCard(stateObj);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*4), array[index].baseCost )
          return stateObj;
        }
      },
  

      divinefavor: {
        rare: true,
        exhaust: true,
        cardID: 62,
        name: "Divine Favor",
        text: (state, index, array) => { 
          if (array[index].upgrades === 0) {
            return `Gain ${4+(array[index].upgrades*2)} block whenever you make opponent gain energy. Remove`;
          } else {
            return `Gain ${4+(array[index].upgrades*2)} block whenever you make energy`;
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
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
            newState.energyGiftBlock += 4+(array[index].upgrades*2);
            if (array[index].upgrades > 0) {
                let thisCard = {...array[index]};
                newState.encounterDiscard.push(thisCard);
            }
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },
  
      //Not in use - too complicated
      forgeshield: {
        rare: true,
        cardID: 46,
        name: "Forged Shield",
        text: (state, index, array) => {
          let blockTotal = (array[index].baseBlock + (array[index].upgrades*3) + state.playerMonster.dex);
          if (state.status === Status.InEncounter) {
            const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard)
            let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
              return acc + obj["upgrades"];
            }, 0); 
            return `Gain ${blockTotal} block. Gain 1 extra block for each card upgrade you have (${totalEncounterUpgrades+blockTotal} total)`;
          } else {
            let totalEncounterUpgrades = state.playerDeck.reduce(function(acc, obj) {
              return acc + obj["upgrades"];
            }, 0); 
            return `Gain ${blockTotal} block. Gain 1 extra block for each card upgrade you have (${totalEncounterUpgrades+blockTotal} total)`;   
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          const allCardsArray = state.encounterHand.concat(state.encounterDraw, state.encounterDiscard);
          let totalEncounterUpgrades = allCardsArray.reduce(function(acc, obj) {
              return acc + obj["upgrades"];
            }, 0); 
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3) + totalEncounterUpgrades, array[index].baseCost)
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
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);

  
          await upgradeAnimation(stateObj, randomIndex, stateObj.playerDeck, cardUpgrades, divIDName="handContainer2")       
          
          //await pause(array[index].timeValue)
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

      makeshiftforge: {
        rare: true,
        exhaust: true,
        cardID: 56,
        name: "Makeshift Forge",
        text: (state, index, array) => {
          let textString = `Upgrade a random card permanently`;
          if (array[index].upgrades > 0) {
            textString += ` ${1+array[index].upgrades} times`;
          }
          textString += `. Purge`

          if (state.status !== Status.InEncounter) {
            textString += ` \n (Purge cards are removed from your deck forever after you play them once)`
          }
          return textString;
        },
        minReq: (state, index, array) => {
              return array[index].baseCost
        },
        timeValue: upgradeAnimationTiming,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost
        },
        upgrades: 0,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let randomIndex  = Math.floor(Math.random() * stateObj.playerDeck.length)
          let cardUpgrades = 1+array[index].upgrades;
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);

  
          await upgradeAnimation(stateObj, randomIndex, stateObj.playerDeck, cardUpgrades, divIDName="handContainer2")       
          
          //await pause(array[index].timeValue)
          stateObj = immer.produce(stateObj, (newState) => {
            console.log('upgrading ' + newState.playerDeck[randomIndex].name)
            let cardUpgrades = 1+array[index].upgrades;
            newState.playerMonster.encounterEnergy -= array[index].baseCost
            newState.playerDeck[randomIndex].upgrades += cardUpgrades;

            let deckIndex = newState.playerDeck.findIndex(card =>card.name === "Makeshift Forge")
            newState.playerDeck.splice(deckIndex, 1);
            
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
              return `Upgrade all your cards. Remove`   
          } else {
              return `Upgrade all your cards ${1+array[index].upgrades} times. Remove`
          }
            
          },
        minReq: (state, index, array) => {
          return array[index].baseCost+array[index].upgrades;
        },
        upgrades: 0,
        baseCost: 4,
        cost:  (state, index, array) => {
          return array[index].baseCost+array[index].upgrades;
        },
        cardType: "ability",
        elementType: "fire",
        exhaust: true,
        action: async (stateObj, index, array) => { 
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
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },
  
      siphon: {
        cardID: 33,
        name: "Siphon",
        text: (state, index, array) => { return `Enemy loses ${array[index].energyDrain} energy. Upgrade your top left card ${2 + Math.floor(array[index].upgrades/2)} times.`},
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
          await cardAnimationDiscard(index);
          upgradeAnimation(stateObj, 0, stateObj.encounterHand, 2 + Math.floor(array[index].upgrades/2), divIDName="handContainer2")       
          
          await pause(array[index].timeValue)
          stateObj = await destroyEnergy(stateObj, array[index].energyDrain, array[index].baseCost)
          for (i = 0; i < (2 + Math.floor(array[index].upgrades/2)); i++) {
            stateObj = await upgradeCard(stateObj);
          }  
          return stateObj;
        }
      },
    
      //heal - 3
      simpleheal: {
        cardID: 9,
        name: "Heal",
        exhaust: true,
        text: (state, index, array) => { 
          return `Heal ${array[index].baseHeal + (array[index].upgrades * 2) + state.extraHeal} HP. Remove` 
      },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseHeal: 5,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = healPlayer(stateObj, array[index].baseHeal+(array[index].upgrades * 2), 1)
          return stateObj;
        }
      },
  
      enjoin: {
        cardID: 38,
        name: "Shared Joy",
        text: (state, index, array) => { return `Heal enemy for ${array[index].baseHeal + array[index].upgrades + state.extraHeal}. You heal triple that amount.` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseHeal: 2,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
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
        text: (state, index, array) => { return `For rest of fight, restore ${Math.floor(array[index].upgrades/5) + 1} health per card played. Remove` },
        minReq: (state, index, array) => {
          if (array[index].baseCost > array[index].upgrades) {
            return array[index].baseCost-array[index].upgrades;
          } else {
            return 0;
          }
          
        },
        upgrades: 0,
        baseCost: 4,
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
        action: async (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            if (array[index].baseCost > array[index].upgrades) {
              newState.playerMonster.encounterEnergy -= (array[index].baseCost-array[index].upgrades)
            }
            newState.gainLifePerCard += Math.floor(array[index].upgrades/5)+1;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return toChangeState;
        }
      },
  
      //gift/draw - 1
      darkknowledge: {
        cardID: 10,
        name: "Dark Knowledge",
        text: (state, index, array) => { 
          return `Enemy gains ${array[index].energyGift-array[index].upgrades} energy. Draw ${2+array[index].upgrades} cards` 
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(state, (newState) => {      
            newState.playerMonster.encounterEnergy -= array[index].baseCost 
          })
          for (let i=0; i < 2+array[index].upgrades; i++) {
            stateObj = await drawACard(stateObj);
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
          return `Enemy gains ${array[index].energyGift} energy. Gain ${1 + array[index].upgrades} strength` 
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
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
           newState.playerMonster.fightStrength += 1 + array[index].upgrades;
            newState.playerMonster.strength += 1 + array[index].upgrades;
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
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
           newState.playerMonster.fightStrength += 4 + array[index].upgrades;
            newState.playerMonster.strength += 4 + array[index].upgrades;
            newState.playerMonster.encounterEnergy -= 2;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },
  
      brandingiron: {
        cardID: "strength3",
        name: "Branding Iron",
        text: (stateObj, index, array) => { 
          selfDamage = (stateObj.cantSelfDamage === true) ? 0  : array[index].baseSelfDamage; 
          return `Deal ${selfDamage + array[index].upgrades} damage to yourself. Gain ${3+array[index].upgrades} strength`; 
        },
        minReq: 0,
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseSelfDamage: 2,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.fightStrength += (3+array[index].upgrades);
            newState.playerMonster.strength += (3+array[index].upgrades);
          })
          if (array[index].upgrades < array[index].baseSelfDamage) {
            stateObj = dealSelfDamage(stateObj, array[index].baseSelfDamage + array[index].upgrades);
          }
          return stateObj;
        }
      },

      flagellate: {
        cardID: "brand2",
        name: "Flagellate",
        text: (stateObj, index, array) => {
          selfDamage = (stateObj.cantSelfDamage === true) ? 0  : array[index].baseSelfDamage; 
          return `Deal ${selfDamage + array[index].upgrades} damage to yourself. Gain ${1+array[index].upgrades} strength`;
          },
        minReq: 0,
        upgrades: 0,
        baseCost: 0,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseSelfDamage: 1,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.fightStrength += (1+array[index].upgrades);
            newState.playerMonster.strength += (1+array[index].upgrades);
          })
          if (array[index].upgrades < array[index].baseSelfDamage) {
            stateObj = dealSelfDamage(stateObj, array[index].baseSelfDamage + array[index].upgrades);
          }
          return stateObj;
        }
      },

      enlightened: {
        cardID: "noselfdamage",
        name: "Enlightened",
        text: (state, index, array) => { return `Gain ${array[index].baseBlock + array[index].upgrades} block. Your cards can't damage you.` },
        minReq: 0,
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 5,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*3), array[index].baseCost)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.cantSelfDamage = true;
          })
          return stateObj;
        }
      },
  
      gainstrength: {
        rare: true,
        cardID: "strength4",
        name: "Bulk Up",
        text: (state, index, array) => {
          return `Gain 1 Strength permanently. Remove`;
        },
        minReq: (state, index, array) => {
          return (array[index].baseCost - (array[index].upgrades))
        },
        upgrades: 0,
        baseCost: 4,
        cost: (state, index, array) => {
          return (array[index].baseCost - (array[index].upgrades))
        },
        cardType: "ability",
        elementType: "fire",
        exhaust: true,
        //takes the state object, declares a toChangeState which takes immer.produce
        //and returns a new state reflecting the changes
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.strength += 1;
            newState.playerMonster.encounterEnergy -=  array[index].baseCost-(array[index].upgrades);
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      gainstrengthtemp: {
        rare: true,
        cardID: "strength4",
        name: "Leg Day",
        text: (state, index, array) => {
          return `Gain 1 Strength permanently. Purge`;
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
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.strength += 1;
            newState.playerMonster.encounterEnergy -=  array[index].baseCost-(array[index].upgrades);

            let deckIndex = newState.playerDeck.findIndex(card =>card.name === "Leg Day")
            newState.playerDeck.splice(deckIndex, 1);
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      gaindextemp: {
        rare: true,
        cardID: "strength4",
        name: "Footwork",
        text: (state, index, array) => {
          return `Gain 1 Dexterity permanently. Purge`;
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
        elementType: "water",
        exhaust: true,
        //takes the state object, declares a toChangeState which takes immer.produce
        //and returns a new state reflecting the changes
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.dex += 1;
            newState.playerMonster.encounterEnergy -=  array[index].baseCost-(array[index].upgrades);

            let deckIndex = newState.playerDeck.findIndex(card =>card.name === "Footwork")
            newState.playerDeck.splice(deckIndex, 1);
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },
  
      //need to fix so it doesn't permanently double temporary buff effects - or does it already by increasing fightStrength?
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
          let textString = `Double your strength` 
          if (array[index].upgrades > 0) {
            textString += `. Gain ${array[index].upgrades} Strength`
          }
          return textString
        },
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          let strengthToGain = stateObj.playerMonster.strength + array[index].upgrades
          stateObj = immer.produce(stateObj, (newState) => {
            newState.playerMonster.encounterEnergy -= array[index].baseCost;
            newState.playerMonster.strength += strengthToGain;
            newState.playerMonster.fightStrength += strengthToGain;
          })
          return stateObj;
        }
      },

      chargedblast: {
        rare: true,
        cardID: 70,
        retain: true,
        name: "Stoke Up",
        text: (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*10) + stateObj.playerMonster.strength;
          textString = `Deal ${cardDamage} damage`
          if (array[index].baseHits > 1) {
            textString += ` ${array[index].baseHits} times`;
          } 
          textString += `. Doesn't discard. Deals +10 each turn held`;
          return textString;
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 2,
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
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)
          return stateObj;
        }
      },




//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
// Poison Cards 
      pinprick: {
        name: "Pinprick",
        text: (state, index, array) => {
          return `Apply ${array[index].basePoison + (array[index].upgrades)} poison.`
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 0,
          cost:  (state, index, array) => {
            return array[index].baseCost;
          },
        upgrades: 0,
        basePoison: 2,
        cardType: "ability",
        elementType: "water",
        action: async(stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await applyPoison(stateObj, array[index].basePoison + array[index].upgrades, array[index].baseCost)
          return stateObj;
        }
      },

      basicpoison: {
        name: "Poison",
        text: (state, index, array) => {
          return `Apply ${array[index].basePoison + (array[index].upgrades)} poison.`
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 1,
          cost:  (state, index, array) => {
            return array[index].baseCost;
          },
        upgrades: 0,
        basePoison: 4,
        cardType: "ability",
        elementType: "water",
        action: async(stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await applyPoison(stateObj, array[index].basePoison + array[index].upgrades, array[index].baseCost)
          return stateObj;
        }
      },

      venomshield: {
        name: "Venom Shield",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + (array[index].upgrades*2) + state.playerMonster.dex} block. Apply ${array[index].basePoison + (array[index].upgrades)} poison to all enemies`
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 1,
          cost:  (state, index, array) => {
            return array[index].baseCost;
        },
        upgrades: 0,
        basePoison: 2,
        cardType: "ability",
        elementType: "water",
        baseBlock: 6,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (array[index].upgrades*2), array[index].baseCost)
          stateObj = await applyPoison(stateObj, array[index].basePoison + array[index].upgrades, array[index].baseCost, 1, true)
          return stateObj;
        }
      },
  
      pocketneedle: {
        name: "Pocket Needle",
        text: (state, index, array) => {
          return `Apply ${array[index].basePoison + (array[index].upgrades)} poison. Draw 1 card.`
        },
        minReq: -99,
        baseCost: 0,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "water",
        upgrades: 0,
        basePoison: 1,
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await applyPoison(stateObj, array[index].basePoison + array[index].upgrades, array[index].baseCost)
          stateObj = await drawACard(stateObj);
          return stateObj;
        }
      },
  
      poisondrain: {
        name: "Poison Drain",
        text: (state, index, array) => { return `Apply ${array[index].basePoison + array[index].upgrades} poison. Enemy loses ${array[index].destroyEnergy} energy` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        basePoison: 3,
        destroyEnergy: 2,
        cardType: "ability",
        elementType: "water",
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await applyPoison(stateObj, array[index].basePoison + array[index].upgrades, array[index].baseCost)
          stateObj = await destroyEnergy(stateObj, array[index].destroyEnergy)
          return stateObj;
        }
      },
  
      poisonedblade: {
        name: "Poisoned Blade",
        text: (state, index, array) => { 
          if (array[index].baseHits === 1) {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage. Apply ${array[index].basePoison+array[index].upgrades} poison`;
          } else {
            return `Deal ${array[index].baseDamage + (array[index].upgrades*2) + state.playerMonster.strength} damage ${array[index].baseHits} times. Apply ${array[index].basePoison+array[index].upgrades} poison`;
          }
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        baseDamage: 3,
        baseHits: 1,
        basePoison: 3,
        cardType: "attack",
        elementType: "water",
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        action: async (stateObj, index, array) => {
          let cardDamage = array[index].baseDamage + (array[index].upgrades*2);
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
  
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)
          stateObj = await applyPoison(stateObj, array[index].basePoison+array[index].upgrades)
          return stateObj;
        }
      },
  
      chokingsmog: {
        name: "Choking Smog",
        text: (state, index, array) => { return `Apply ${array[index].basePoison+(array[index].upgrades*3)} poison. Your block doesn't decrease between turns` },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 4,
        basePoison: 5,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        action: async(stateObj, index, array) => {
          stateObj = await applyPoison(stateObj, array[index].basePoison+array[index].upgrades, array[index].baseCost)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.blockKeep = true;
          })
          return stateObj;
        }
      },





      bodyslam: {
        name: "Body Slam",
        text: (stateObj, index, array) => {
          let damageToDo = stateObj.playerMonster.encounterBlock + stateObj.playerMonster.strength + array[index].baseDamage + (array[index].upgrades*3);
            let textString = `Deal damage equal to your block`;
            if (array[index].upgrades > 0 || array[index].baseDamage>0) {
              textString += ` +${(array[index].upgrades*3) + array[index].baseDamage}`      
            }
            if (array[index].baseHits > 1) {
              textString += ` ${array[index].baseHits} times`
            }
            if (stateObj.status === Status.InEncounter) {
              textString += ` (${damageToDo*array[index].baseHits} total)`
            }
          return textString
    },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        cost: (state, index, array) => {
          return array[index].baseCost;
        },
        baseCost: 1,
        baseDamage: 0,
        baseHits: 1,
        upgrades: 0,
        cardType: "attack",
        elementType: "water",
        action: async (stateObj, index, array) => {
          let cardDamage = stateObj.playerMonster.encounterBlock + array[index].baseDamage + (array[index].upgrades*3);
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)

          return stateObj;
        }
      },



      cloakingfog: {
        name: "CloakingFog",
        text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex} block. Gain ${3+array[index].upgrades} Backsteps` },
        minReq: 2,
        upgrades: 0,
        baseCost: 2,
        baseBlock: 2,
        cardType: "ability",
        elementType: "water",
        cost: (state, index, array) => {
          return array[index].baseCost;
        },
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = gainBlock(stateObj, array[index].baseBlock + (4*array[index].upgrades), array[index].baseCost)
          stateObj = addBackstepsToHand(stateObj, 3+array[index].upgrades)
          return stateObj;
        }
      },

      cautiousblow: {
        name: "Cautious Blow",
        text: (state, index, array) => {
          let blockGain = array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*2);
          let damageToDo =  state.playerMonster.strength + array[index].baseDamage + (array[index].upgrades*2);
            if (array[index].baseHits === 1) {
              return `Gain ${blockGain} block. Deal ${damageToDo} damage`        
            } else {
              return `Gain ${blockGain} block. Deal ${damageToDo} damage ${array[index].baseHits} times`
            }
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        cost: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 1,
        baseDamage: 5,
        baseBlock: 5,
        baseHits: 1,
        cardType: "attack",
        elementType: "water",
        action: async (stateObj, index, array) => {
          let blockGain = array[index].baseBlock + (array[index].upgrades*2);
          let cardDamage =  array[index].baseDamage + (array[index].upgrades*2);
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)
          stateObj = gainBlock(stateObj, blockGain);
          return stateObj;
        }
      },
  
      guardedstrike: {
        name: "Guarded Strike",
        text: (state, index, array) => {
          let blockGain = array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*3);
          let damageToDo =  state.playerMonster.strength + array[index].baseDamage + (array[index].upgrades*3);
            if (array[index].baseHits === 1) {
              return `Gain ${blockGain} block. Deal ${damageToDo} damage`        
            } else {
              return `Gain ${blockGain} block. Deal ${damageToDo} damage ${array[index].baseHits} times`
            }
        },
        minReq: (state, index, array) => {
          return array[index].baseCost;
        },
        cost: (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseCost: 2,
        baseDamage: 10,
        baseBlock: 12,
        baseHits: 1,
        cardType: "attack",
        elementType: "water",
        //takes the state object, declares a toChangeState which takes immer.produce
        //and returns a new state reflecting the changes
        action: async (stateObj, index, array) => {
          let blockGain = array[index].baseBlock + (array[index].upgrades*3);
          let cardDamage =  array[index].baseDamage + (array[index].upgrades*3);
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost)
          stateObj = gainBlock(stateObj, blockGain);
          return stateObj;
        }
      },

      huntprey: {
        name: "Hunt Prey",
        text: (state, index, array) => {
          let textString = `Deal double damage to the targeted enemy for ${1 + Math.floor(array[index].upgrades/2)} turn`
          if (array[index].upgrades > 1) {
            textString += `s`
          }
          if (array[index].upgrades > 0) {
            textString += `. Gain ${4 + (array[index].upgrades*2)} block`
          }
          return textString;
        },
        minReq: (state, index, array) => {
            return array[index].baseCost
        },
        baseCost: 1,
        Type: "ability",
        elementType: "water",
        cost:  (state, index, array) => {
            return array[index].baseCost
        },
        upgrades: 0,
        //takes the state object, declares a toChangeState which takes immer.produce
        //and returns a new state reflecting the changes
        action: async (stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[newState.targetedMonster].hunted += 1 + Math.floor(array[index].upgrades/2);
          })
          if (array[index].upgrades > 0) {
            stateObj = await gainBlock(stateObj, 4 + (array[index].upgrades*2), array[index].baseCost)
          }
          return stateObj;
        }
      },

      theocho: {
        cardID: 006,
        name: "Severing Curse",
        text: (state, index, array) => { 
          let cardDamage = array[index].baseDamage + (array[index].upgrades*10) + state.playerMonster.strength;
          let textString = `Deal ${cardDamage} damage to all enemies`;
          if (array[index].baseHits > 1) {
            textString += ` ${array[index].baseHits} times`
          } 
          return textString;
      },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
        baseCost: 7,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        upgrades: 0,
        baseDamage: 77,
        baseHits: 1,
        cardType: "attack",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          let cardDamage =  array[index].baseDamage + (array[index].upgrades*10);
          let calculatedDamage = (cardDamage + stateObj.playerMonster.strength) * (array[index].baseHits)
          await cardAnimationDamageDiscard(stateObj, index, calculatedDamage)    
          stateObj = await dealOpponentDamage(stateObj, cardDamage, array[index].baseHits, array[index].baseCost, all=true)
          return stateObj;
        }
      },

      testingtoxin: {
        rare: true,
        cardID: 007,
        name: "Testing Toxin",
        text: (state, index, array) => { return `Apply ${array[index].basePoison + (array[index].upgrades*3)} poison`},
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
        action: async(stateObj, index, array) => {
          await cardAnimationDiscard(index);
          stateObj = await applyPoison(stateObj, array[index].basePoison + (array[index].upgrades*3), array[index].baseCost)
          return stateObj;
        }
      },

      tnt: {
        cardID: "tnt",
        name: "TNT",
        text: (state, index, array) => { 
          textString =  `Bombs deal ${7 + (array[index].upgrades*3)} more damage to enemies. Remove`
          return textString},
        minReq: 0,
        upgrades: 0,
        baseCost: 1,
        exhaust: true,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 3,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          if (array[index].upgrades > 0) {
            stateObj = gainBlock(stateObj, array[index].baseBlock * array[index].upgrades)
          }
          
          stateObj = immer.produce(stateObj, (newState) => {
            newState.extraBombDamage += 7 + (array[index].upgrades*3);
            newState.playerMonster.encounterEnergy -= 1;
          })

          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      shapedcharges: {
        exhaust: true,
        name: "Shaped Charges",
        cardID: "Shaped Charges",
        text: (state, index, array) => { 
          textString =  `Gain ${array[index].baseBlock + (array[index].upgrades*2)} block whenever you play a bomb. Remove`
          return textString},
        minReq: 0,
        upgrades: 0,
        baseCost: 1,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        baseBlock: 5,
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.bombBlock += array[index].baseBlock + (array[index].upgrades*2);
            newState.playerMonster.encounterEnergy -= 1;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      lastflourish: {
        cardID: "tnt",
        name: "Last Flourish",
        text: (state, index, array) => { 
          textString =  `Whenever you remove a card, deal ${array[index].baseDamage + (array[index].upgrades*2)} damage to all enemies. Remove`
          return textString},
        minReq: 0,
        upgrades: 0,
        baseCost: 1,
        baseDamage: 4,
        exhaust: true,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          
          stateObj = immer.produce(stateObj, (newState) => {
            newState.removalAttack += array[index].baseDamage + (array[index].upgrades*2);
            newState.playerMonster.encounterEnergy -= 1;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
          return stateObj;
        }
      },

      smokescreen: {
        cardID: "Smokescreen",
        name: "Smokescreen",
        text: (state, index, array) => { 
          textString =  `Whenever you remove a card, gain ${array[index].baseBlock + (array[index].upgrades*2)} block. Remove`
          return textString},
        minReq: 0,
        upgrades: 0,
        baseCost: 1,
        baseBlock: 3,
        exhaust: true,
        cost:  (state, index, array) => {
          return array[index].baseCost;
        },
        cardType: "ability",
        elementType: "fire",
        action: async (stateObj, index, array) => {
          
          stateObj = immer.produce(stateObj, (newState) => {
            newState.removalBlock += array[index].baseBlock + (array[index].upgrades*2);
            newState.playerMonster.encounterEnergy -= 1;
          })
          document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
          await pause(500);
          document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
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
      baseCost: 2,
      cost:  (stateObj, index, array) => {
        return array[index].baseCost;
      },
      basePoison: 12,
      cardType: "ability",
      elementType: "special",
      action: async(stateObj, index, array) => {
        stateObj = await applyPoison(stateObj, array[index].basePoison + (array[index].upgrades*2), array[index].baseCost)
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

    testdamage: {
      cardID: 003,
      name: "Murder",
      text: (state, index, array) => { return `Set target monster to 10`},
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
              newState.opponentMonster[newState.targetedMonster].currentHP = 10;
            newState.playerMonster.encounterEnergy -= array[index].baseCost-array[index].upgrades;
          })
        return stateObj;
      }
    },
  
    backstep: {
      cardID: 004,
      name: "Backstep",
      text: (state, index, array) => {
        let textString = `Gain ${array[index].baseBlock + state.playerMonster.dex + (2*array[index].upgrades)+ state.backstepExtraBlock} block. `
        if (state.backstepDamage > 0 ) {
          textString += `Deal ${state.backstepDamage} damage to all enemies. `
        } 
        textString += `Remove`
        return textString
      },
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
      action: async (stateObj, index, array) => {
        stateObj = await gainBlock(stateObj, array[index].baseBlock+(array[index].upgrades*2) + stateObj.backstepExtraBlock, array[index].baseCost);
        if (stateObj.backstepDamage > 0 ) {
          await addDealOpponentDamageAnimation(stateObj, stateObj.backstepDamage)
          stateObj = await dealOpponentDamage(stateObj, stateObj.backstepDamage)
          await pause(350)
          await removeDealOpponentDamageAnimation(stateObj, stateObj.backstepDamage)
        }
        document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
        await pause(500);
        document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
        return stateObj;
      }
    },

    recycle: {
      cardID: 005,
      name: "Recycle",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex) + (3*array[index].upgrades)} block. Remove all other cards in your hand for the rest of combat` },
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
      action: async(stateObj, index, array) => {
        stateObj = await gainBlock(stateObj, array[index].baseBlock+(array[index].upgrades*3), array[index].baseCost);
        stateObj = immer.produce(stateObj, (newState) => {
          cardClone = {...array[index]}
          newState.encounterDiscard.push(cardClone)
          newState.encounterHand = [];
        })

        let cards = document.querySelectorAll("#handContainer2 .card")
        console.log(cards)
        cards.forEach((element) => {
          if (element !== cards[index])
          element.classList.add("remove");
        })
          await pause(500);
          cards.forEach((element) => {
            if (element !== cards[index])
            element.classList.remove("remove");
          })
        return stateObj;
      }
    },

    bomb: {
      cardID: 006,
      name: "Bomb",
      text: (state, index, array) => {
          bombDamage = array[index].baseDamage + (3*array[index].upgrades);
          let textString = ``;
          if (state.bombBlock > 0) {
            textString += `Gain ${state.bombBlock} block. `
          }
          textString += `Deal ${bombDamage + state.extraBombDamage} damage to all enemies`
          if (state.cantSelfDamage === false) {
            textString += ` and ${array[index].baseDamage} to yourself`
          }
          textString += `. Remove`
        return textString;
      },
      minReq: -99,
      upgrades: 0,
      baseCost: 0,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseDamage: 7,
      exhaust: true,
      cardType: "ability",
      elementType: "fire",
      action: async (stateObj, index, array) => {
        if (stateObj.bombBlock > 0) {
          stateObj = await gainBlock(stateObj, stateObj.bombBlock, array[index].baseCost);
        }
        bombDamage = array[index].baseDamage + (array[index].upgrades*3);
        await addDealOpponentDamageAnimation(stateObj, bombDamage)
        stateObj = await dealOpponentDamage(stateObj, bombDamage+stateObj.extraBombDamage, 1, false, true)
        stateObj = await dealSelfDamage(stateObj, bombDamage, true)
        
        document.querySelectorAll("#handContainer2 .card")[index].classList.add("remove");
        await pause(500);
        document.querySelectorAll("#handContainer2 .card")[index].classList.remove("remove");
        return stateObj;
      }
    },

    
    

    

    
  
  }
    
   



///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------  
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------
///-------------------------------------------------------------------------------------------------------------------