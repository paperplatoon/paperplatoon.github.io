//for fire, add more cards that use kindle
//also change cards to allow for multiple upgrades
//    change card title to take a state object and an index and return a text element
//    change card text to reflect upgraded values
//    create some kind of upgradeCard function that takes a stateObj and a HandIndex
//for now upgrades can be random
//for water, implement the Drown mechanic

//Take Aim/Sabotage will be for air

//keyword: if energy is removed, do effect.


let fireCardPool = {
    fireEnergy: {
      name: "",
      text: (state, index, array) => {
        return `Gain ${1 + array[index].upgrades} energy`
      },
      minReq: () => {
        return -99
      },
      upgrades: 0,
      cost: "energy",
      cardType: "fireEnergy",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += (1 + array[index].upgrades);
  
        })
        return toChangeState;
      }
    },
  
    kindle: {
      name: "kindle",
      text: (state, index, array) => {
        return `Deal ${15 + array[index].playCount*(5 + (array[index].upgrades*10)) + state.playerMonster.strength} damage. 
        Increase this card's damage by ${5 + (array[index].upgrades*10)}`;
      },
      minReq: 1,
      upgrades: 0,
      playCount: 0,
      cost: 1,
      cardType: "fire",
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (15 + array[index].playCount*(5 + (array[index].upgrades*10))));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.encounterHand[index].playCount += 1;
          newState.playerMonster.encounterEnergy -=1;
        })
        return toChangeState;
      }
    },

    windUp: {
      name: "Wind Up",
      minReq: 1,
      upgrades: 0,
      cost: 1,
      text: (state, index, array) => {
        return `Gain ${3 + array[index].upgrades} energy. Costs 1 to play`
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=1;
          newState.playerMonster.encounterEnergy += 3 + array[index].upgrades;
        })
        return toChangeState;
      }
    },

    setAflame: {
      name: "Set Aflame",
      minReq: -99,
      upgrades: 0,
      cost: 0,
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
      name: "Explode",
      text: (state, index, array) => {
        return `Deal ${(10 + state.playerMonster.strength + (array[index].upgrades*5))} damage X times.`
      },
      minReq: 0,
      upgrades: 0,
      cost: "X",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*5)), newState.playerMonster.encounterEnergy);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy = 0;
        })
        return toChangeState;
      }
    },
  
    rareExplode: {
      name: "Erupt",
      text: (state, index, array) => {
        return `Deal ${(20 + state.playerMonster.strength + (array[index].upgrades*5)) + "*" + state.playerMonster.encounterEnergy} damage.`
      },
      minReq: 0,
      cost: "X",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (20 + (array[index].upgrades*5)), newState.playerMonster.encounterEnergy);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy = 0;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      name: "Withdraw",
      text: (state, index, array) => { return `Gain ${(10 + state.playerMonster.dex + (5*array[index].upgrades))} block` },
      minReq: 1,
      upgrades: 0,
      cost: 1,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=1;
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + (5*array[index].upgrades));
        })
        return toChangeState;
      }
    },
  
    simpleheal: {
      name: "Simple Heal",
      text: (state, index, array) => { return `Restore ${10 + (array[index].upgrades*5)} HP` },
      minReq: 1,
      upgrades: 0,
      cost: 1,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= (10 + (array[index].upgrades*5))) {
            newState.playerMonster.currentHP = newState.playerMonster.maxHP;
          } else {
            newState.playerMonster.currentHP += (10 + (array[index].upgrades*5));
          }       
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
  
    gainstrength: {
      name: "Gain Strength",
      text: (state, index, array) => {
        return `Spend ${3 - (array[index].upgrades)} energy. Gain 1 strength permanently`;
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
          newState.playerMonster.strength += 1;
          newState.playerMonster.encounterEnergy -=  3-(array[index].upgrades);
        })
        return toChangeState;
      }
    },
  
    siphon: {
      name: "Siphon",
      text: (state, index, array) => { return `Drain ${(2 + array[index].upgrades)} opponent energy. If you removed energy, gain it.` },
      minReq: -99,
      cost: 0,
      upgrades: 0,
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
      name: "Essence Drain",
      cardType: "fire",
      text: (state, index, array) => { return `Remove 2 opponent energy. Draw ${2+array[index].upgrades} cards` },
      minReq: 1,
      cost: 1,
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy >= 2) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
          } else if (newState.opponentMonster[newState.targetedMonster].encounterEnergy == 1) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
          } else {}

          newState.playerMonster.encounterEnergy -= 1;
        })
        for (let i=0; i < 2+array[index].upgrades; i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },
  
    fireball: {
      name: "Fireball",
      text: (state, index, array) => { return `Deal ${(5 + state.playerMonster.strength)} * ${(3 + (array[index].upgrades*2))} damage` },
      minReq: 1,
      cost: 1,
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 5, (3 + (array[index].upgrades*2)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    tackle: {
      name: "Tackle",
      text: (state, index, array) => { return `Deal ${(10 + state.playerMonster.strength + (array[index].upgrades*5))} damage` },
      minReq: 1,
      cost: 1,
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*5)));
          newState.playerMonster.encounterEnergy -=1;
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },

    ignite: {
      name: "Ignite",
      text: (state, index, array) => { return `Attacks deal +${(5 + (array[index].upgrades *5))} damage this turn` },
      minReq: -99,
      cost: "0",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.tempStrength += (5 + (array[index].upgrades *5));
          newState.playerMonster.strength += (5 + (array[index].upgrades *5));
        })
        return toChangeState;
      }
    },

    flamingStrike: {
      name: "Flaming Strike",
      text: (state, index, array) => { return `Deal ${10 + (array[index].upgrades*10) + state.playerMonster.strength} damage. Attacks deal +5 damage this turn`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*10)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 1;
          newState.playerMonster.tempStrength += 5;
          newState.playerMonster.strength += 5;
        })
        return toChangeState;
      }
    },

    upgrade: {
      name: "Upgrade",
      text: (state, index, array) => { return `Deal ${10 + state.playerMonster.strength} damage. Upgrade your top left card ${1 + (array[index].upgrades)} time`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        for (i = 0; i < (1+array[index].upgrades); i++) {
          state = upgradeCard(state);
        }
        state = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -=1;
        })
        return state;
      }
    },

    rareUpgrade: {
      name: "Rare Upgrade",
      text: (state, index, array) => { return `Gain ${5 + state.playerMonster.dex + (array[index].upgrades*10)} block. Upgrade your top left card 2 times.`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        state = upgradeCard(state);
        state = upgradeCard(state);

        state = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (5 + newState.playerMonster.dex + (array[index].upgrades*10));
          newState.playerMonster.encounterEnergy -=1;
        })
        return state;
      }
    },

    infuse: {
      name: "Infuse",
      text: (state, index, array) => { return `Gain ${15 + state.playerMonster.dex + (array[index].upgrades*10)} block. Upgrade your top left card 2 times.`},
      minReq: 2,
      cost: "2",
      upgrades: 0,
      action: (state, index, array) => {
        state = upgradeCard(state);
        state = upgradeCard(state);

        state = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += 15;
          newState.playerMonster.encounterEnergy -=2;
        })
        return state;
      }
    },

    refineEnergy: {
      name: "Refine Energy",
      text: (state, index, array) => { return `Remove 2 energy from your opponent. Upgrade your top left card ${1 + array[index].upgrades} times.`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
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
        })
        return state;
      }
    },

    microFlames: {
      name: "Micro Flames",
      text: (state, index, array) => { return `All attacks this turn do +5 damage. Draw ${(2 + array[index].upgrades)} cards`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          nnewState.playerMonster.tempStrength += 5;
          newState.playerMonster.strength += 5;
          newState.playerMonster.encounterEnergy -=1;
        })
        for (i = 0; i < (2+array[index].upgrades); i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },

    sparkBarrage: {
      name: "Spark Barrage",
      text: (state, index, array) => { return `Spend 2 energy. Deal Deal ${5 + state.playerMonster.strength} damage ${5 + (array[index].upgrades*2)} times`},
      minReq: 2,
      cost: "2",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 5, (5 + (array[index].upgrades*2)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 2;
          
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
        return `Spend 2 energy. Gain ${20 + state.playerMonster.dex + (array[index].upgrades*10)} block`
      },
      minReq: 2,
      cost: "2",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (20 + newState.playerMonster.dex + (array[index].upgrades*10));
          newState.playerMonster.encounterEnergy -= 2;
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
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].drown += 15 + (array[index].upgrades*10);
          newState.playerMonster.encounterEnergy -=1
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
      cost: "2",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
            monsterObj.drown += 20 + (array[index].upgrades*10);
          })
          newState.playerMonster.encounterEnergy -=2
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
      cost: "0",
      upgrades: 0,
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
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].poison += 1 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -=1
        })
        return toChangeState;
      }
    },

    venomshield: {
      name: "Venom Shield",
      text: (state, index, array) => {
        return `Gain ${10 + (array[index].upgrades*10) + state.playerMonster.dex} block. Opponent gains +${1 + (array[index].upgrades)} poison.`
      },
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += 10 + (array[index].upgrades*10) + state.playerMonster.dex;
          newState.opponentMonster[newState.targetedMonster].poison += 1 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -=1
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
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].poison += 1 + array[index].upgrades;
          newState.playerMonster.encounterEnergy -=1
        })
        for (let i=0; i < 1+array[index].upgrades; i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },

    bait: {
      name: "Bait",
      text: (state, index, array) => { return `Gain ${(15 + state.playerMonster.dex + (10*array[index].upgrades))} block. Remove 1 opponent energy` },
      minReq: 1,
      upgrades: 0,
      cost: 1,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=1;
          newState.playerMonster.encounterBlock += (15 + newState.playerMonster.dex + (10*array[index].upgrades));
          newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    poisondrain: {
      name: "Poison Drain",
      text: (state, index, array) => { return `Apply +${1 + array[index].upgrades} poison. Remove 2 opponent energy` },
      minReq: 1,
      upgrades: 0,
      cost: 1,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=1;
          newState.opponentMonster[newState.targetedMonster].poison += 1;
          newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },

    poisonedblade: {
      name: "Poisoned Blade",
      text: (state, index, array) => { return `Deal ${(10 + state.playerMonster.strength + (10*array[index].upgrades))} damage. Apply +${1+array[index].upgrades} poison` },
      minReq: 1,
      upgrades: 0,
      cost: 1,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=1;
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*10)));
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
      cost: 2,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=2;
          newState.opponentMonster[newState.targetedMonster].poison += (3+(array[index].upgrades*2));
        })
        return toChangeState;
      }
    },

    sabotage: {
      name: "Sabotage",
      text: (state, index, array) => { return `Gain ${(20 + state.playerMonster.dex + (10*array[index].upgrades))} block. Remove 2 opponent energy` },
      minReq: 2,
      upgrades: 0,
      cost: 2,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -=2;
          newState.playerMonster.encounterBlock += (20 + newState.playerMonster.dex + (10*array[index].upgrades));
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 2) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
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
        return `Deal damage equal to ${50 + (array[index].upgrades*15)}% of your block (${Math.floor(state.playerMonster.encounterBlock + state.playerMonster.strength * (0.5 + (array[index].upgrades*0.10)))})`
      },
      minReq: 0,
      cost: "0",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (Math.floor(newState.playerMonster.encounterBlock * (0.5 + (array[index].upgrades*0.1)))), 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    tackle: {
      name: "Tackle",
      text: (state, index, array) => {
        return `Deal ${(10 + state.playerMonster.strength + (array[index].upgrades*10))} damage`
      },
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= 1;
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*10)), 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      name: "Withdraw",
      text: (state, index, array) => { return `Spend 1 energy. Gain ${(10 + state.playerMonster.dex + (array[index].upgrades*10))} block` },
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + (array[index].upgrades*10));
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    gainDex: {
      name: "Study the Way",
      text: (state, index, array) => {
        return `Spend ${3 - (array[index].upgrades)} energy. Gain 1 dexterity permanently`;
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
      minReq: 1,
      cost: "1",
      upgrades: 0,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          console.log("number of upgrades is " +array[index].upgrades )
          newState.opponentMonster[newState.targetedMonster].hunted += (1 + array[index].upgrades);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  }