 
//for fire, add more cards that use kindle
//damage for energy

//ADD SOMETHING THAT LETS YOU SEE THE ENTIRE CARD POOL


//Take Aim/Sabotage will be for air

//keyword: if energy is removed, do effect.
//evnts that let you change baseCost, baseHits, baseBlock, baseDamage, and baseHeal

//more cards that deal damage to all
//add a 0-cost card that deals damage for total self-damage dealt in a fight * 2 (rare)

//total = 30

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
      name: "kindle",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + array[index].playCount*(5 + (array[index].upgrades*10)) + state.playerMonster.strength} damage. 
          Increase this card's damage by ${5 + (array[index].upgrades*10)}`;
        } else {
          return `Deal ${array[index].baseDamage + array[index].playCount*(5 + (array[index].upgrades*10)) + state.playerMonster.strength} damage ${array[index].baseHits} times. 
          Increase this card's damage by ${5 + (array[index].upgrades*10)}`
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
      baseDamage: 15,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + array[index].playCount*(5 + (array[index].upgrades*10))), array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.encounterHand[index].playCount += 1;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    windUp: {
      cardID: 3,
      name: "Wind Up",
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
      text: (state, index, array) => {
        return `Gain ${3 + array[index].upgrades} energy`
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.playerMonster.encounterEnergy += 3 + array[index].upgrades;
        })
        return toChangeState;
      }
    },

    setAflame: {
      cardID: 4,
      name: "Set Aflame",
      minReq: -99,
      upgrades: 0,
      cost: 0,
      cardType: "ability",
      elementType: "fire",
      rare: true,
      text: (state, index, array) => {
        return `You gain ${3+array[index].upgrades} energy. Your opponent gains ${3-array[index].upgrades}.`
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 3+array[index].upgrades;
          newState.opponentMonster[newState.targetedMonster].encounterEnergy +=3-array[index].upgrades;
        })
        return toChangeState;
      }
    },
  
    explode: {
      cardID: 5,
      name: "Explode",
      text: (state, index, array) => {
        return `Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*5))} damage ${state.playerMonster.encounterEnergy + array[index].baseHits} times.`
      },
      minReq: 0,
      upgrades: 0,
      cost: "X",
      baseDamage: 10,
      baseHits: 0,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*5)), newState.playerMonster.encounterEnergy+array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy = 0;
        })
        return toChangeState;
      }
    },
  
    rareExplode: {
      cardID: 6,
      name: "Erupt",
      text: (state, index, array) => {
        return `Deal ${(array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*5))} damage ${state.playerMonster.encounterEnergy + array[index].baseHits} times.`
      },
      minReq: 0,
      cost: "X",
      upgrades: 0,
      baseDamage: 20,
      baseHits: 0,
      rare: true,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*5)), newState.playerMonster.encounterEnergy+array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy = 0;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      cardID: 7,
      name: "Withdraw",
      text: (state, index, array) => { return `Gain ${(array[index].baseBlock + state.playerMonster.dex + (5*array[index].upgrades))} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseBlock: 10,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (5*array[index].upgrades));
        })
        return toChangeState;
      }
    },
  
    simpleheal: {
      cardID: 8,
      name: "Simple Heal",
      text: (state, index, array) => { return `Restore ${array[index].baseHeal + (array[index].upgrades*5) + state.extraHeal} HP` },
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
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= (array[index].baseHeal + (array[index].upgrades*5) + state.extraHeal)) {
            newState.playerMonster.currentHP = newState.playerMonster.maxHP;
            newState.fightHealCount += 1;
            newState.fightHealValue += newState.playerMonster.maxHP-newState.playerMonster.currentHP;
          } else {
            newState.playerMonster.currentHP += (array[index].baseHeal + (array[index].upgrades*5) + state.extraHeal);
            newState.fightHealCount += 1;
            newState.fightHealValue += (array[index].baseHeal + (array[index].upgrades*5) + state.extraHeal)

          }       
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    darkknowledge: {
      cardID: 9,
      name: "Dark Knowledge",
      text: (state, index, array) => { return `Self-wound ${array[index].baseSelfDamage} damage. Draw ${4+array[index].upgrades} cards` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseSelfDamage: 5,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.selfDamageCount += 1;
          newState.selfDamageValue += array[index].baseSelfDamage;  
          newState.playerMonster.currentHP -= array[index].baseSelfDamage;        
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        for (let i=0; i < 4+array[index].upgrades; i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },

    cursedritual: {
      cardID: 10,
      name: "Cursed Ritual",
      text: (state, index, array) => { return `Self-wound ${array[index].baseSelfDamage} damage. Gain ${5+(array[index].upgrades*5)} strength` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      rare: true,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseSelfDamage: 5,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.selfDamageCount += 1;
          newState.selfDamageValue += array[index].baseSelfDamage;  
          newState.playerMonster.fightStrength += 5+(array[index].upgrades*5);
          newState.playerMonster.strength += 5+(array[index].upgrades*5)
          newState.playerMonster.currentHP -= array[index].baseSelfDamage; 
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    bloodshield: {
      cardID: 11,
      name: "Blood Shield",
      text: (state, index, array) => { return `Self-wound ${array[index].baseSelfDamage + (array[index].upgrades*3)} damage. Gain ${20+(array[index].upgrades*10)} block` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseSelfDamage: 2,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.selfDamageCount += 1;
          newState.selfDamageValue += array[index].baseSelfDamage;  
          newState.playerMonster.encounterBlock += 20+(array[index].upgrades*10);
          newState.playerMonster.currentHP -= array[index].baseSelfDamage; 
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    calldemons: {
      cardID: 12,
      name: "Call Demons",
      text: (state, index, array) => { return `Deal ${array[index].baseDamage + state.playerMonster.strength + (array[index].upgrades*5)} damage for each Self-wound this game (${state.selfDamageCount})` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseDamage: 10,
      baseHits: 0,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*5)), newState.selfDamageCount+array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },
  
  
    gainstrength: {
      cardID: 13,
      name: "Gain Strength",
      text: (state, index, array) => {
        return `+1 permanent strength. Exhaust`;
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
      text: (state, index, array) => { return `Drain ${(2 + array[index].upgrades)} opponent energy. If you removed energy, gain it.` },
      minReq: -99,
      cost: 0,
      upgrades: 0,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > (2 + array[index].upgrades)) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= (2 + array[index].upgrades);
            newState.playerMonster.encounterEnergy += (2 + array[index].upgrades);
          } else if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 0) {
              newState.playerMonster.encounterEnergy += newState.opponentMonster[newState.targetedMonster].encounterEnergy;
              newState.opponentMonster[newState.targetedMonster].encounterEnergy = 0
          } else {}
        })
        return toChangeState;
      }
    },
    
  
    essencedrain: {
      cardID: 15,
      name: "Essence Drain",
      cardType: "fire",
      text: (state, index, array) => { return `Remove 2 opponent energy. Draw ${2+array[index].upgrades} cards` },
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
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy >= 2) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
          } else if (newState.opponentMonster[newState.targetedMonster].encounterEnergy == 1) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
          } else {}

          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        for (let i=0; i < 2+array[index].upgrades; i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },
  
    fireball: {
      cardID: 16,
      name: "Fireball",
      text: (state, index, array) => { return `Deal ${(array[index].baseDamage + state.playerMonster.strength)} damage ${(array[index].baseHits + (array[index].upgrades*2))} times` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 5,
      baseHits: 3,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, array[index].baseDamage, (array[index].baseHits + (array[index].upgrades*2)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    fierymissiles: {
      cardID: 31,
      name: "Fiery Missiles",
      text: (state, index, array) => { return `Self-damage ${array[index].baseSelfDamage+array[index].upgrades}. Deal ${(array[index].baseDamage + state.playerMonster.strength)} damage ${(array[index].baseHits + array[index].upgrades)} times` },
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 10,
      baseSelfDamage: 2,
      baseHits: 2,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, array[index].baseDamage, (array[index].baseHits + array[index].upgrades));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;

          newState.selfDamageCount += 1;
          newState.selfDamageValue += array[index].baseSelfDamage;  
          newState.playerMonster.currentHP -= array[index].baseSelfDamage;
        })
        return toChangeState;
      }
    },

    pirouettespin: {
      cardID: 17,
      name: "Pirouette Spin",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${(array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength)} damage for each card played this turn (${state.cardsPerTurn})`;
        } else {
          return `Deal ${(array[index].baseDamage + (array[index].upgrades*3) + state.playerMonster.strength)} damage for each card played this turn (${state.cardsPerTurn}) ${array[index].baseHits} times.`
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
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, ((array[index].baseDamage + (array[index].upgrades*3)) * newState.cardsPerTurn), array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return toChangeState;
      }
    },

    tackle: {
      cardID: 18,
      name: "Tackle",
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
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 10,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*5)), array[index].baseHits);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },

    vampiricstrike: {
      cardID: 19,
      name: "Vampiric Strike",
      text: (state, index, array) => { 
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage. Heal ${array[index].baseHeal+array[index].upgrades} per card played this turn (${state.cardsPerTurn})`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5) + state.playerMonster.strength} damage ${array[index].baseHits} times. Heal ${array[index].baseHeal+array[index].upgrades} per card played this turn (${state.cardsPerTurn})`
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
      baseDamage: 10,
      baseHeal: 3,
      baseHits: 1,
      rare: true,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*5)), array[index].baseHits);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;

          healValue = ((array[index].baseHeal + array[index].upgrades) * state.cardsPerTurn) + state.extraHeal;

          if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= healValue) {
            newState.playerMonster.currentHP = newState.playerMonster.maxHP;
            newState.fightHealCount += 1;
            newState.fightHealValue += newState.playerMonster.maxHP-newState.playerMonster.currentHP;
          } else {
            newState.playerMonster.currentHP += healValue;
            newState.fightHealCount += 1;
            newState.fightHealValue += healValue;
        }
        })
        return toChangeState;
      }
    },

    ignite: {
      cardID: 20,
      name: "Ignite",
      text: (state, index, array) => { return `Attacks deal +${(5 + (array[index].upgrades *5))} damage this turn` },
      minReq: -99,
      cost: 0,
      upgrades: 0,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.tempStrength += (5 + (array[index].upgrades *5));
          newState.playerMonster.strength += (5 + (array[index].upgrades *5));
        })
        return toChangeState;
      }
    },

    flamingStrike: {
      cardID: 21,
      name: "Flaming Strike",
      text: (state, index, array) => { return `Deal ${array[index].baseDamage + (array[index].upgrades*10) + state.playerMonster.strength} damage. Attacks deal +5 damage this turn`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 10,
      baseHits: 1,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (array[index].baseDamage + (array[index].upgrades*10)), array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          newState.playerMonster.tempStrength += 5;
          newState.playerMonster.strength += 5;
        })
        return toChangeState;
      }
    },

    upgrade: {
      cardID: 22,
      name: "Upgrade",
      text: (state, index, array) => { return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage ${array[index].baseHits} times. Upgrade your top left card ${1 + (array[index].upgrades)} time`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 1,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 5,
      baseHits: 2,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        for (i = 0; i < (1+array[index].upgrades); i++) {
          state = upgradeCard(state);
        }
        state = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, array[index].baseDamage, array[index].baseHits);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return state;
      }
    },

    rareUpgrade: {
      cardID: 23,
      rare: true,
      name: "Rare Upgrade",
      text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*10)} block. Upgrade your top left card 2 times.`},
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
      baseBlock: 5,
      action: (state, index, array) => {
        state = upgradeCard(state);
        state = upgradeCard(state);

        state = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (array[index].baseBlock + newState.playerMonster.dex + (array[index].upgrades*10));
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return state;
      }
    },

    infuse: {
      cardID: 24,
      rare: true,
      name: "Infuse",
      text: (state, index, array) => { return `Gain ${array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*10)} block. Upgrade your top left card 2 times.`},
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
      baseBlock: 15,
      action: (state, index, array) => {
        state = upgradeCard(state);
        state = upgradeCard(state);

        state = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += array[index].baseBlock + state.playerMonster.dex + (array[index].upgrades*10);
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return state;
      }
    },

    refineEnergy: {
      cardID: 25,
      name: "Refine Energy",
      text: (state, index, array) => { return `Remove 2 energy from your opponent. Upgrade your top left card ${1 + array[index].upgrades} times.`},
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
      action: (state, index, array) => {
        for (i = 0; i < (1+array[index].upgrades); i++) {
          state = upgradeCard(state);
        }
        state = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 2) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
          } else if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 0) {
              newState.opponentMonster[newState.targetedMonster].encounterEnergy = 0
          } else {}

          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        return state;
      }
    },

    microFlames: {
      cardID: 26,
      name: "Micro Flames",
      text: (state, index, array) => { return `All attacks this turn do +5 damage. Draw ${(1 + array[index].upgrades)} cards`},
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
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.tempStrength += 5;
          newState.playerMonster.strength += 5;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        for (i = 0; i < (1+array[index].upgrades); i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },

    purefocus: {
      rare: true,
      cardID: 27,
      name: "Pure Focus",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5)} damage for each time you've skipped a card (${state.cardsSkipped + array[index].baseHits})`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*5)} damage ${array[index].baseHits} times for each time you've skipped a card (${state.cardsSkipped + array[index].baseHits})`
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
      baseHits: 0,
      baseDamage: 10,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(state, (array[index].baseDamage + (array[index].upgrades*5)), (state.cardsSkipped + array[index].baseHits) );
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
        })
        
        return toChangeState;
      }
    },

    bloatedbomb: {
      rare: true,
      cardID: 28,
      name: "Bloated Bomb",
      text: (state, index, array) => {
        if (array[index].baseHits === 1) {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*25)+state.playerMonster.strength} damage to ALL enemies. -5 for each card skipped (${array[index].baseDamage + (array[index].upgrades*25) - (state.cardsSkipped*5)})`;
        } else {
          return `Deal ${array[index].baseDamage + (array[index].upgrades*25)+state.playerMonster.strength} damage to ALL enemies ${array[index].baseHits} times. -5 for each card skipped (${(state.playerMonster.strength + array[index].baseDamage + (array[index].upgrades*25) - (state.cardsSkipped*5))*array[index].baseHits})`
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
      baseDamage: 75,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          let tempState = dealOpponentDamage(state, ( array[index].baseDamage + (array[index].upgrades*25) - (state.cardsSkipped*5) ), (array[index].baseHits), all=true);
          newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
            monsterObj.currentHP = tempState.opponentMonster[monsterIndex].currentHP
            monsterObj.encounterBlock = tempState.opponentMonster[monsterIndex].encounterBlock
          })
        })
        return toChangeState;
      }
    },

    sparkBarrage: {
      cardID: 29,
      name: "Spark Barrage",
      text: (state, index, array) => { return `Deal ${array[index].baseDamage + state.playerMonster.strength} damage ${array[index].baseHits + (array[index].upgrades*2)} times`},
      minReq: (state, index, array) => {
        return array[index].baseCost;
      },
      baseCost: 2,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      upgrades: 0,
      baseDamage: 5,
      baseHits: 5,
      cardType: "attack",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, array[index].baseDamage, (array[index].baseHits + (array[index].upgrades*2)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= array[index].baseCost;
          
        })
        return toChangeState;
      }
    }, 

    brand: {
      cardID: 30,
      name: "Branding Iron",
      text: (state, index, array) => { return `Self-wound ${array[index].baseSelfDamage} damage. Gain ${3+array[index].upgrades} energy` },
      minReq: 0,
      upgrades: 0,
      baseCost: 0,
      cost:  (state, index, array) => {
        return array[index].baseCost;
      },
      baseSelfDamage: 5,
      cardType: "ability",
      elementType: "fire",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.selfDamageCount += 1;
          newState.selfDamageValue += array[index].baseSelfDamage;  
          newState.playerMonster.currentHP -= array[index].baseSelfDamage;        
          newState.playerMonster.encounterEnergy += (3+array[index].upgrades);
        })
        return toChangeState;
      }
    },
  };
  
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
        return `+1 permanent dexterity. Exhaust`;
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