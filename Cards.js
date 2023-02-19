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
        return `Deal ${1 + state.playcountKindle + state.playerMonster.strength} damage. Gain 1 energy. All kindles deal one more damage this combat`;
      },
      minReq: -99,
      cardType: "fireEnergy",
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, (1 + newState.playcountKindle));
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
        return `Gain five energy`
      },
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy += 5;
        })
        return toChangeState;
      }
    },
  
    explode: {
      name: "Explode",
      text: (state) => {
        return `Spend all your energy to deal ${(5 + state.playerMonster.strength) + "*" + state.playerMonster.encounterEnergy} damage.`
      },
      minReq: 0,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 5, newState.playerMonster.encounterEnergy);
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
        return `Spend all your energy to deal ${(30 + state.playerMonster.strength) + "*" + state.playerMonster.encounterEnergy} damage.`
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
      text: (state) => { return `Spend 1 energy. Gain ${(6 + state.playerMonster.dex)} block` },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (6 + state.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    mediumheal: {
      name: "Medium Heal",
      text: (state) => { return "Spend 2 energy. Gain 9 HP" },
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.currentHP += 9;
          newState.playerMonster.encounterEnergy -= 2;
        })
        return toChangeState;
      }
    },
  
  
    gainstrength: {
      name: "Gain Strength",
      text: (state) => {
        return `Spend 4 energy. Gain 1 strength permanently`;
      },
      minReq: 4,
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.strength += 1;
          newState.playerMonster.encounterEnergy -= 4;
        })
        return toChangeState;
      }
    },
  
    siphon: {
      name: "Siphon",
      text: (state) => { return "Drain 1 energy from your opponent and give it to yourself" },
      minReq: 0,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 0) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
            newState.playerMonster.encounterEnergy += 1;
  
          }
        })
        //changeState(toChangeState);
        return toChangeState;
      }
    },
  
    essencedrain: {
      name: "Essence Drain",
      text: (state) => { return "Spend 3 energy to drain 2 energy from your opponent. Draw 2 cards" },
      minReq: 3,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
          newState.playerMonster.encounterEnergy -= 3;
        })
        toChangeState = drawACard(toChangeState);
        toChangeState = drawACard(toChangeState);
        return toChangeState;
      }
    },
  
    fireball: {
      name: "Fireball",
      text: (state) => { return `Spend 2 energy. Deal ${(7 + state.playerMonster.strength)} damage twice` },
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          let tempState = dealOpponentDamage(newState, 7, 2);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
          newState.playerMonster.encounterEnergy -= 2;
        })
        return toChangeState;
      }
    }
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
        return `Spend 2 energy. Gain ${16 + state.playerMonster.dex} block`
      },
      minReq: 2,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (16 + state.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    bodySlam: {
      name: "Body Slam",
      text: (state) => {
        return `Spend 1 energy. Deal damage equal to your block`
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
        return `Spend 1 energy. Deal ${(7 + state.playerMonster.strength)} damage`
      },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterEnergy -= 1;
          let tempState = dealOpponentDamage(newState, 7, 1);
          newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
          newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        })
        return toChangeState;
      }
    },
  
    withdraw: {
      name: "Withdraw",
      text: (state) => { return `Spend 1 energy. Gain ${(6 + state.playerMonster.dex)} block` },
      minReq: 1,
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.encounterBlock += (6 + state.playerMonster.dex);
          newState.playerMonster.encounterEnergy -= 1;
        })
        return toChangeState;
      }
    },
  
    gainDex: {
      name: "Study the Way",
      text: (state) => {
        return `Spend 4 energy. Gain 1 dexterity permanently`;
      },
      minReq: 4,
      exhaust: true,
      //takes the state object, declares a toChangeState which takes immer.produce
      //and returns a new state reflecting the changes
      action: (state) => {
        let toChangeState = immer.produce(state, (newState) => {
          newState.playerMonster.dex += 1;
          newState.playerMonster.encounterEnergy -= 4;
        })
        return toChangeState;
      }
    },
  
  
  }