let fireCardPool = {
    fireEnergy: {
      name: "Fire Energy",
      text: (state) => {
        return `. Gain 1 energy`
      },
      minReq: -99,
      cardType: "fireEnergy",
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 1;
  
        })
        return toChangeState;
      }
    },
  
    kindle: {
      name: "kindle",
      text: (state) => {
        return `Deal ${2 + (state.playcountKindle*3) + state.playerMonster.strength + state.playerMonster.turnStrength} damage. Gain 1 energy. All kindles deal +3 damage this combat`;
      },
      minReq: -99,
      cardType: "fireEnergy",
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (5 + (newState.playcountKindle*5)));
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy += 1;
          newState.playcountKindle += 1;
        })
        return toChangeState;
      }
    },
  
    test: {
      name: "Wind Up",
      minReq: -99,
      text: (state) => {
        return `Gain 2 energy`
      },
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 2;
        })
        return toChangeState;
      }
    },

    setAflame: {
      name: "Set Aflame",
      minReq: -99,
      text: (state) => {
        return `Both you and your opponent gain 4 energy`
      },
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 4;
          newState.opponentMonster[newState.targetedMonster].encounterEnergy +=4;
        })
        return toChangeState;
      }
    },
  
    explode: {
      name: "Explode",
      text: (state) => {
        return `Spend all your energy to deal ${(10 + state.playerMonster.strength + state.playerMonster.turnStrength) + "*" + state.playerMonster.encounterEnergy} damage.`
      },
      minReq: 0,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10, newState.playerMonster.encounterEnergy);
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
        return `Spend all your energy to deal ${(30 + state.playerMonster.strength + state.playerMonster.turnStrength) + "*" + state.playerMonster.encounterEnergy} damage.`
      },
      minReq: 0,
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
      text: (state) => { return `Spend 1 energy. Gain ${(10 + state.playerMonster.dex + state.playerMonster.turnDex)} block` },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + newState.playerMonster.turnDex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    simpleheal: {
      name: "Simple Heal",
      text: (state) => { return "Spend 1 energy. Restore 5 HP" },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= 5) {
            newState.playerMonster.currentHP = newState.playerMonster.maxHP;
          } else {
            newState.playerMonster.currentHP += 5;
          }       
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
  
    gainstrength: {
      name: "Gain Strength",
      text: (state) => {
        return `Spend 3 energy. Gain 2 strength permanently`;
      },
      minReq: 3,
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.strength += 2;
          newState.playerMonster.encounterEnergy -= 3;
        })
        return toChangeState;
      }
    },
  
    siphon: {
      name: "Siphon",
      text: (state) => { return "Drain 1 energy from your opponent and give it to yourself" },
      minReq: -99,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 0) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
            newState.playerMonster.encounterEnergy += 1;
          }
        })
        return toChangeState;
      }
    },
  
    essencedrain: {
      name: "Essence Drain",
      text: (state) => { return "Spend 2 energy to remove 2 energy from your opponent. Draw 2 cards" },
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy >= 2) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
            newState.playerMonster.encounterEnergy -= 2;
          } else if (newState.opponentMonster[newState.targetedMonster].encounterEnergy == 1) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
            newState.playerMonster.encounterEnergy -= 1;
          } else {}
        })
        toChangeState = drawACard(toChangeState);
        toChangeState = drawACard(toChangeState);
        return toChangeState;
      }
    },
  
    fireball: {
      name: "Fireball",
      text: (state) => { return `Spend 2 energy. Deal ${(10 + state.playerMonster.strength + state.playerMonster.turnStrength)} damage twice` },
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10, 2);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },

    tackle: {
      name: "Tackle",
      text: (state) => { return `Spend 1 energy. Deal ${(10 + state.playerMonster.strength + state.playerMonster.turnStrength)} damage` },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    ignite: {
      name: "Ignite",
      text: (state) => { return `All attacks this turn deal +5 damage per hit` },
      minReq: -99,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.turnStrength += 5;
        })
        return toChangeState;
      }
    },

    flamingStrike: {
      name: "Flaming Strike",
      text: (state) => { return `Spend 1 energy. Deal ${10 + state.playerMonster.strength + state.playerMonster.turnStrength} damage. All attacks this turn do +5 damage`},
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10)
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 1;
          newState.playerMonster.turnStrength += 5;
        })
        return toChangeState;
      }
    },

    microFlames: {
      name: "Micro Flames",
      text: (state) => { return `Spend 1 energy. All attacks this turn do +5 damage. Draw a card`},
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.turnStrength += 5;
          newState.playerMonster.encounterEnergy -=1;
        })
        toChangeState = drawACard(toChangeState);
        return toChangeState;
      }
    },

    sparkBarrage: {
      name: "Spark Barrage",
      text: (state) => { return `Spend 2 energy. Deal Deal ${3 + state.playerMonster.strength + state.playerMonster.turnStrength} damage 5 times`},
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 3, 5);
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
      name: "Water Energy",
      text: (state) => {
        return `Gain 1 energy`
      },
      minReq: -99,
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
        return `Spend 2 energy. Gain ${20 + state.playerMonster.dex + state.playerMonster.turnDex} block`
      },
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (20 + newState.playerMonster.dex+ newState.playerMonster.turnDex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    bodySlam: {
      name: "Body Slam",
      text: (state) => {
        return `Spend 1 energy. Deal damage equal to your block (${(state.playerMonster.encounterBlock + state.playerMonster.strength + state.playerMonster.turnStrength)})`
      },
      minReq: 1,
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
        return `Spend 1 energy. Deal ${(10 + state.playerMonster.strength + state.playerMonster.turnStrength)} damage`
      },
      minReq: 1,
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
      text: (state) => { return `Spend 1 energy. Gain ${(10 + state.playerMonster.dex + state.playerMonster.turnDex)} block` },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + newState.playerMonster.turnDex);
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
        return `Spend 1 energy. Deal ${(5 + state.playerMonster.strength + state.playerMonster.turnStrength)} damage and gain ${(5 + state.playerMonster.dex + state.playerMonster.turnDex)} block`;
      },
      minReq: 1,
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 5, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          
          newState.playerMonster.encounterBlock += (5 + newState.playerMonster.dex + newState.playerMonster.turnDex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },

    guardedStrike: {
      name: "Guarded Strike",
      text: (state) => {
        return `Spend 2 energy. Deal ${(10 + state.playerMonster.strength + state.playerMonster.turnStrength)} damage and gain ${(10 + state.playerMonster.dex + state.playerMonster.turnDex)} block`;
      },
      minReq: 2,
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 10, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          
          newState.playerMonster.encounterBlock += (10 + newState.playerMonster.dex + newState.playerMonster.turnDex);
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