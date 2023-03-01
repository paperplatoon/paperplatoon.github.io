//for fire, add more cards that use kindle
//also change cards to allow for multiple upgrades
//    change card title to take a state object and an index and return a text element
//    change card text to reflect upgraded values
//    create some kind of upgradeCard function that takes a stateObj and a HandIndex
//for now upgrades can be random
//for water, implement the Drown mechanic

//Take Aim/Sabotage will be for air


let fireCardPool = {
    fireEnergy: {
      name: "",
      text: (state, index, array) => {
        return `Gain ${1 + (1*array[index].upgrades)} energy`
      },
      minReq: () => {
        return -99
      },
      upgrades: 0,
      cost: "energy",
      cardType: "fireEnergy",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += (1 + (1*newState.encounterHand[index].upgrades));
  
        })
        return toChangeState;
      }
    },
  
    kindle: {
      name: "kindle",
      text: (state, index, array) => {
        return `Deal ${10 + (10*array[index].upgrades) + (array[index].playCount*10) + state.playerMonster.strength} damage. 
        Increase this card's damage by 10`;
      },
      minReq: () => {
        return -99
      },
      upgrades: 0,
      playCount: 0,
      cost: 0,
      cardType: "fire",
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (10 + (newState.encounterHand[index].playCount*10) + (newState.encounterHand[index].upgrades*10)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.encounterHand[index].playCount += 1;
        })
        return toChangeState;
      }
    },

    windUp: {
      name: "Wind Up",
      minReq: () => {
        return -99
      },
      upgrades: 0,
      cost: 0,
      text: (state, index, array) => {
        return `Gain ${2 + array[index].upgrades} energy`
      },
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 2 + array[index].upgrades;
        })
        return toChangeState;
      }
    },

    setAflame: {
      name: "Set Aflame",
      minReq: () => {
        return -99
      },
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
        return `Deal ${(20 + state.playerMonster.strength + (array[index].upgrades*15))} damage X times.`
      },
      minReq: 0,
      upgrades: 0,
      cost: "X",
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (20 + (array[index].upgrades*15)), newState.playerMonster.encounterEnergy);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy = 0;
        })
        return toChangeState;
      }
    },
  
    devExplode: {
      name: "Explode",
      text: (state) => {
        return `Deal ${(30 + state.playerMonster.strength) + "*" + state.playerMonster.encounterEnergy} damage.`
      },
      minReq: 0,
      cost: "X",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 30, newState.playerMonster.encounterEnergy);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy = 0;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      name: "Withdraw",
      text: (state, index, array) => { return `Gain ${(10 + state.playerMonster.dex + (10*array[index].upgrades))} block` },
      minReq: 0,
      upgrades: 0,
      cost: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + (10*array[index].upgrades));
        })
        return toChangeState;
      }
    },
  
    simpleheal: {
      name: "Simple Heal",
      text: (state, index, array) => { return `Spend 1 energy. Restore ${5 + (array[index].upgrades*3)} HP` },
      minReq: 1,
      upgrades: 0,
      cost: 1,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= (5 + (array[index].upgrades*3))) {
            newState.playerMonster.currentHP = newState.playerMonster.maxHP;
          } else {
            newState.playerMonster.currentHP += (5 + (array[index].upgrades*3));
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
      text: (state, index, array) => { return `Drain ${(1 + array[index].upgrades)} opponent energy. Gain ${(1 + array[index].upgrades)} energy` },
      minReq: -99,
      cost: 0,
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > (1 + array[index].upgrades)) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= (1 + array[index].upgrades);
            newState.playerMonster.encounterEnergy += (1 + array[index].upgrades);
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
            newState.playerMonster.encounterEnergy -= 1;
          } else if (newState.opponentMonster[newState.targetedMonster].encounterEnergy == 1) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
            newState.playerMonster.encounterEnergy -= 1;
          } else {
            newState.playerMonster.encounterEnergy -= 1;
          }
        })

        for (let i=0; i < 2+array[index].upgrades; i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },
  
    fireball: {
      name: "Fireball",
      text: (state, index, array) => { return `Deal ${(10 + state.playerMonster.strength)} * ${(2 + (2*array[index].upgrades))} damage` },
      minReq: 1,
      cost: 1,
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10, (2 + array[index].upgrades));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    tackle: {
      name: "Tackle",
      text: (state, index, array) => { return `Deal ${(10 + state.playerMonster.strength + (array[index].upgrades*10))} damage` },
      minReq: -99,
      cost: 0,
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (10 + (array[index].upgrades*10)));
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
      text: (state, index, array) => { return `Deal ${20 + (array[index].upgrades*20) + state.playerMonster.strength} damage. Attacks deal +5 damage this turn`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (20 + (array[index].upgrades*20)));
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
      name: "Upgrades",
      text: (state, index, array) => { return `Upgrade your top left card ${1 + (array[index].upgrades)} time`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        for (i = 0; i < (1+array[index].upgrades); i++) {
          state = upgradeCard(state);
        }
        return state;
      }
    },

    microFlames: {
      name: "Micro Flames",
      text: (state, index, array) => { return `All attacks this turn do +5 damage. Draw ${(1 + array[index].upgrades)} cards`},
      minReq: 1,
      cost: "1",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          nnewState.playerMonster.tempStrength += 5;
          newState.playerMonster.strength += 5;
          newState.playerMonster.encounterEnergy -=1;
        })
        for (i = 0; i < (1+array[index].upgrades); i++) {
          toChangeState = drawACard(toChangeState);
        }
        return toChangeState;
      }
    },

    sparkBarrage: {
      name: "Spark Barrage",
      text: (state, index, array) => { return `Spend 2 energy. Deal Deal ${10 + state.playerMonster.strength} damage ${5 + (array[index].upgrades*2)} times`},
      minReq: 2,
      cost: "2",
      upgrades: 0,
      action: (state, index, array) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10, (5 + (array[index].upgrades*2)));
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
      text: (state) => {
        return `Gain 1 energy`
      },
      minReq: -99,
      cost: "energy",
      cardType: "waterEnergy",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 1;
        })
        return toChangeState;
      }
    },
  
    cloakingFog: {
      name: "Cloaking Fog",
      text: (state) => {
        return `Spend 2 energy. Gain ${20 + state.playerMonster.dex} block`
      },
      minReq: 2,
      cost: "2",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (20 + newState.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },

    drownTest: {
      name: "Enter the Abyss",
      text: (state) => {
        return `Spend 1 energy. +20 drown`
      },
      minReq: 1,
      cost: "1",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].drown +=20;
        })
        return toChangeState;
      }
    },
  
    bodySlam: {
      name: "Body Slam",
      text: (state) => {
        return `Spend 1 energy. Deal damage equal to your block (${(state.playerMonster.encounterBlock + state.playerMonster.strength)})`
      },
      minReq: 1,
      cost: "1",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= 1;
          let tempState = dealOpponentDamage(newState, newState.playerMonster.encounterBlock, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    tackle: {
      name: "Tackle",
      text: (state) => {
        return `Spend 1 energy. Deal ${(10 + state.playerMonster.strength)} damage`
      },
      minReq: 1,
      cost: "1",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= 1;
          let tempState = dealOpponentDamage(newState, 10, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      name: "Withdraw",
      text: (state) => { return `Spend 1 energy. Gain ${(10 + state.playerMonster.dex)} block` },
      minReq: 1,
      cost: "1",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    gainDex: {
      name: "Study the Way",
      text: (state) => {
        return `Spend 3 energy. Gain 2 dexterity permanently`;
      },
      minReq: 3,
      cost: "3",
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.dex += 2;
          newState.playerMonster.encounterEnergy -= 3;
        })
        return toChangeState;
      }
    },

    cautiousBlow: {
      name: "Cautious Blow",
      text: (state) => {
        return `Spend 1 energy. Deal ${(5 + state.playerMonster.strength)} damage and gain ${(5 + state.playerMonster.dex)} block`;
      },
      minReq: 1,
      cost: "1",
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 5, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          
          newState.playerMonster.encounterBlock += (5 + newState.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    guardedStrike: {
      name: "Guarded Strike",
      text: (state) => {
        return `Spend 2 energy. Deal ${(10 + state.playerMonster.strength)} damage and gain ${(10 + state.playerMonster.dex)} block`;
      },
      minReq: 2,
      cost: "2",
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },

    huntPrey: {
      name: "Hunt Prey",
      text: (state) => {
        return `Spend 1 energy. You deal double damage to the targeted enemy this turn.`;
      },
      minReq: 1,
      cost: "1",
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].hunted = true;
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  }