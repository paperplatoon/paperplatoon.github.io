let opponentMonsters = {
    opponent1: {
      name: "Mr Bubbles",
      type: "water",
      maxHP: 25,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 25,
      strength: 0,
      dex: 0,
      drown: 0,
      moves: [
        {
          name: "Hibernate",
          cost: "0",
          text: "Gain 3 energy and 10 block",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 3;
              newState.opponentMonster[monsterIndex].encounterBlock += 10;
            })
            return toChangeState;
          }
        },
        {
          name: "Fury Strike",
          cost: "3",
          text: "Spend 3 energy. Deal 10 damage",
          minReq: 3,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
              let tempState = dealPlayerDamage(newState, 10, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
      ]
    },

    opponent2: {
      name: "Mrs Bubbles",
      type: "water",
      maxHP: 30,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 30,
      strength: 0,
      dex: 0,
      drown: 0,
      moves: [
        {
          name: "Charging Strike",
          cost: "0",
          text: "Deal 10 damage. Gain 1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 1;
              let tempState = dealPlayerDamage(newState, 10, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
        {
          name: "Erect Barrier",
          cost: "2",
          text: "Gain 2 energy. Deal 15 damage.",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
              let tempState = dealPlayerDamage(newState, 15, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Total Vacation",
          cost: "10",
          text: "Spend 10 energy. Deal 40 damage.",
          minReq: 10,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy -= 10;
              let tempState = dealPlayerDamage(newState, 40, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
      ]
    },
  
    opponent3: {
      name: "Treesia",
      type: "Earth",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      maxHP: 40,
      currentHP: 40,
      strength: 0,
      dex: 0,
      drown: 0,
      moves: [
        {
          name: "Regenerate",
          cost: "0",
          text: "Recover 5 health. Gain 1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 1;
              if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 6)) {
                newState.opponentMonster[monsterIndex].currentHP += 5;
              } else {
                newState.opponentMonster[monsterIndex].currentHP = newState.opponentMonster[monsterIndex].maxHP;
              };
            })
            return toChangeState;
          }
        },
  
        {
          name: "Granite Skin",
          cost: "2",
          text: "Gain 15 block. Gain 2 energy",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
              newState.opponentMonster[monsterIndex].encounterBlock += 15;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Eruption",
          cost: "5",
          text: "Deal 25 damage. Spend 5 energy.",
          minReq: 5,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 25, monsterIndex);
              newState.opponentMonster[monsterIndex].encounterEnergy -= 5;
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        }
      ]
    },
  
    opponent4: {
      name: "Skydancer",
      type: "air",
      maxHP: 20,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 20,
      strength: 0,
      dex: 0,
      drown: 0,
      moves: [
        {
          name: "Backflip",
          cost: "0",
          text: "Gain 10 block. Gain 2 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
              newState.opponentMonster[monsterIndex].encounterBlock += 10;
            })
            return toChangeState;
          }
        },
        {
          name: "Swift Jab",
          cost: "2",
          text: "Gain 15 block. Deal 5 damage. Gain 2 energy",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 5, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].encounterBlock += 15;
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Roundhouse Kick",
          cost: "6",
          text: "Gain 20 block. Deal 25 damage. Spend 5 energy",
          minReq: 6,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 25, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].encounterBlock += 20;
              newState.opponentMonster[monsterIndex].encounterEnergy -= 5;
            })
            return toChangeState;
          }
        } 
      ]
    },

    opponent5: {
      name: "Sindur",
      type: "fire",
      maxHP: 50,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 50,
      strength: 0,
      dex: 0,
      drown: 0,
      moves: [
        {
          name: "Coursing Flames",
          cost: "0",
          text: "Deal 5 damage. Gain 5 strength. Gain 1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 1;
              let tempState = dealPlayerDamage(newState, 5, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].strength += 5;
            })
            return toChangeState;
          }
        },
        {
          name: "Heat Discharge",
          cost: "3",
          text: "Spend 2 energy. Deal strength damage to the enemy twice.",
          minReq: 3,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 0, monsterIndex, 2);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].encounterBlock += 5;
              newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
            })
            return toChangeState;
          }
        }  
      ]
    },
  
 // consuming flames
 // rising tide  
  
  }
  
  
  let playerMonsters = {
    devCheat: {
      name: "Testing Mode",
      type: "fire",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      cardPool: fireCardPool,
      maxHP: 50,
      currentHP: 50,
      strength: 0,
      dex: 0,
      startingDeck: [
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        fireCardPool.kindle,
        fireCardPool.devExplode,
        fireCardPool.fireball,
        fireCardPool.flamingStrike
      ],
    },
  
    charles: {
      name: "Charles",
      type: "fire",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      cardPool: fireCardPool,
      maxHP: 50,
      currentHP: 50,
      strength: 0,
      dex: 0,
      startingDeck: [
        //6 energy
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        fireCardPool.flameUp,
        fireCardPool.flameUp,
        //7 attacks
        fireCardPool.explode,
        fireCardPool.gainstrength,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.tackle,
        fireCardPool.tackle
      ],
    },
  
    whirlies: {
      name: "Swirly",
      type: "Water",
      cardPool: waterCardPool,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      maxHP: 50,
      currentHP: 50,
      strength: 0,
      dex: 0,
      startingDeck: [
        //6 energy
        waterCardPool.waterEnergy,
        waterCardPool.waterEnergy,
        waterCardPool.waterEnergy,
        waterCardPool.waterEnergy,
        waterCardPool.waterEnergy,
        waterCardPool.waterEnergy,
        //6 attacks
        waterCardPool.withdraw,
        waterCardPool.withdraw,
        waterCardPool.tackle,
        waterCardPool.tackle,
        waterCardPool.bodySlam,
        waterCardPool.gainDex,
        waterCardPool.cloakingFog,
        waterCardPool.drownTest
      ]
    }
  };