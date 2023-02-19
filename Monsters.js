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
      moves: [
        {
          name: "Hibernate",
          cost: "0",
          text: "Gain 3 energy and 4 block",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 3;
              newState.opponentMonster[monsterIndex].encounterBlock += 4;
            })
            return toChangeState;
          }
        },
        {
          name: "Fury Strike",
          cost: "3",
          text: "Spend 3 energy. Deal 7 damage",
          minReq: 3,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
              let tempState = dealPlayerDamage(newState, 7, monsterIndex);
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
      encounterEnergy: 0,
      opponentMoveIndex: false,
      maxHP: 70,
      currentHP: 70,
      strength: 0,
      dex: 0,
      moves: [
        {
          name: "Down the Drain",
          cost: "0",
          text: "Deal 10 damage. Recover 6 health. Gain 3 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 3;
              if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 6)) {
                newState.opponentMonster[monsterIndex].currentHP += 6;
              } else {
                newState.opponentMonster[monsterIndex].currentHP = newState.opponentMonster[monsterIndex].maxHP;
              };
              newState.playerMonster.currentHP -= 10;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Aqua Shield",
          cost: "6",
          text: "Deal 20 damage. Gain 5 HP. Gain 4 energy",
          minReq: 6,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 4;
              newState.opponentMonster[monsterIndex].currentHP += 5;
              newState.playerMonster.currentHP -= 20;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Aqua Blast",
          cost: "10",
          text: "Deal 35 damage. Use all energy.",
          minReq: 10,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.playerMonster.currentHP -= 35;
              newState.opponentMonster[monsterIndex].encounterEnergy = 0;
            })
            return toChangeState;
          }
        }
      ]
    },
  
    opponent3: {
      name: "test 5",
      type: "water",
      maxHP: 70,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 70,
      strength: 0,
      dex: 0,
      moves: [
        {
          name: "Down the Drain",
          cost: "0",
          text: "Deal 5 damage. Remove 2 of your energy. Gain 3 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 3;
              if (newState.playerMonster.encounterEnergy >= 2) {
                newState.playerMonster.encounterEnergy -= 2;
              } else {
                newState.playerMonster.encounterEnergy = 0;
              };
              newState.playerMonster.currentHP -= 5;
            })
            return toChangeState;
          }
        },
        {
          name: "Aqua Shield",
          cost: "6",
          text: "Deal 10 damage. Gain 10 HP. Gain 4 energy",
          minReq: 6,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 4;
              newState.opponentMonster[monsterIndex].currentHP += 10;
              newState.playerMonster.currentHP -= 10;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Aqua Blast",
          cost: "10",
          text: "Deal 35 damage. Use all energy.",
          minReq: 10,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.playerMonster.currentHP -= 35;
              newState.opponentMonster[monsterIndex].encounterEnergy = 0;
            })
            return toChangeState;
          }
        }
  
      ]
    },
  
    opponent4: {
      name: "Mrs Bubbles",
      type: "water",
      maxHP: 30,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 30,
      strength: 0,
      dex: 0,
      moves: [
        {
          name: "Charging Strike",
          cost: "0",
          text: "Deal 4 damage. Gain 1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 1;
              let tempState = dealPlayerDamage(newState, 4, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
        {
          name: "Erect Barrier",
          cost: "2",
          text: "Gain 2 energy. Deal 8 damage.",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
              let tempState = dealPlayerDamage(newState, 8, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Total Vacation",
          cost: "10",
          text: "Spend all energy. Deal 24 damage.",
          minReq: 10,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy = 0;
              let tempState = dealPlayerDamage(newState, 24, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            })
            return toChangeState;
          }
        },
      ]
    },
  
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
        fireCardPool.fireEnergy,
        fireCardPool.kindle,
        fireCardPool.devExplode,
        fireCardPool.devExplode,
        fireCardPool.gainstrength,
        fireCardPool.siphon,
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
        fireCardPool.kindle,
        fireCardPool.kindle,
        //7 attacks
        fireCardPool.explode,
        fireCardPool.gainstrength,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.fireball,
        fireCardPool.withdraw,
        fireCardPool.siphon,
      ],
    },
  
    whirlies: {
      name: "Whirlies",
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
        waterCardPool.withdraw,
        waterCardPool.tackle,
        waterCardPool.bodySlam,
        waterCardPool.gainDex
      ]
    }
  };