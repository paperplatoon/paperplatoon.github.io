let opponentMonsters = {
    opponent1: {
      name: "Mr Bubbles",
      type: "water",
      maxHP: 60,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 60,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/waterdevil.png",
      moves: [
        {
          name: "Hibernate",
          cost: "0",
          text: "Gain 3 energy and 15 block",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 3;
              newState.opponentMonster[monsterIndex].encounterBlock += 15;
            })
            return toChangeState;
          }
        },

        {
          name: "Fury Strike",
          cost: "3",
          text: "Spend 3 energy. Deal 20 damage",
          minReq: 3,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
              let tempState = dealPlayerDamage(newState, 20, monsterIndex);
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
      maxHP: 60,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 60,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/waterpuddle.png",
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
      maxHP: 80,
      currentHP: 80,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/earthevil.png",
      moves: [
        {
          name: "Regenerate",
          cost: "0",
          text: "Recover 10 health. Gain 1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 1;
              if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 11)) {
                newState.opponentMonster[monsterIndex].currentHP += 10;
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
          text: "Gain 20 block. Gain 2 energy",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
              newState.opponentMonster[monsterIndex].encounterBlock += 20;
            })
            return toChangeState;
          }
        },
  
        {
          name: "Eruption",
          cost: "5",
          text: "Deal 40 damage. Spend 5 energy.",
          minReq: 5,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 40, monsterIndex);
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
      maxHP: 45,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 45,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/firebaby.png",
      moves: [
        {
          name: "Backflip",
          cost: "0",
          text: "Gain 15 block. Gain 2 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 2;
              newState.opponentMonster[monsterIndex].encounterBlock += 15;
            })
            return toChangeState;
          }
        },
        {
          name: "Swift Jab",
          cost: "2",
          text: "Gain 15 block. Deal 10 damage. Gain 2 energy",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 10, monsterIndex);
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
          text: "Gain 20 block. Deal 35 damage. Spend 5 energy",
          minReq: 6,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 35, monsterIndex);
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
      maxHP: 100,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 100,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/firebeard.png",
      moves: [
        {
          name: "Coursing Flames",
          cost: "0",
          text: "Deal 10 damage. Gain 10 strength. Gain 1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[monsterIndex].encounterEnergy += 1;
              let tempState = dealPlayerDamage(newState, 10, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].strength += 10;
            })
            return toChangeState;
          }
        },
        {
          name: "Heat Discharge",
          cost: "2",
          text: "Spend 2 energy. Deal strength damage to the enemy twice. Lose all strength",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 0, monsterIndex, 2);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].encounterEnergy -= 2;
              newState.opponentMonster[monsterIndex].strength = 0;
            })
            return toChangeState;
          }
        }  
      ]
    },

    opponent6: {
      name: "Psyman",
      type: "fire",
      maxHP: 100,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 100,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/earthpsycho.png",
      moves: [
        {
          name: "Flame Up",
          cost: "0",
          text: "Deal 10 damage. Gain 2 strength.",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 10, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].strength += 2;
            })
            return toChangeState;
          }
        } 
      ]
    },

    opponent7: {
      name: "Dracula",
      type: "Air",
      maxHP: 60,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 60,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Leeching Strike",
          cost: "0",
          text: "Deal 15 damage. Any unblocked damage is gained as block. +1 energy",
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 10, monsterIndex);
              if (tempState.playerMonster.currentHP < newState.playerMonster.currentHP) {
                newState.opponentMonster[monsterIndex].encounterBlock += (newState.playerMonster.currentHP-tempState.playerMonster.currentHP);
              }
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster[monsterIndex].encounterEnergy +=1;

              
            })
            return toChangeState;
          }
        },
        
        {
          name: "Consume Flesh",
          cost: "2",
          text: "Spend 2 energy. Deal 30 damage. Restore 15 health.",
          minReq: 2,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 30, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

              if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 16)) {
                newState.opponentMonster[monsterIndex].currentHP += 15;
              } else {
                newState.opponentMonster[monsterIndex].currentHP = newState.opponentMonster[monsterIndex].maxHP;
              };  
              newState.opponentMonster[monsterIndex].encounterEnergy -= 2;
            })
            return toChangeState;
          }
        }
      ]
    },


    blockbossguard1: {
      name: "test1",
      type: "Air",
      maxHP: 60,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 60,
      strength: 0,
      dex: 3,
      drown: 0,
      hunted: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Spreading Shield",
          cost: "0",
          text: (state, index, array) => {
            return `All enemies gain +${5 + array[index].dex} block. +1 energy`
          }, 
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster.forEach(function(monsterObj, index) {
                monsterObj.encounterBlock += (5 +state.opponentMonster[monsterIndex].dex);
              })
              newState.opponentMonster[monsterIndex].encounterEnergy +=1;

              
            })
            return toChangeState;
          }
        },
        
        {
          name: "Detonate",
          cost: "4",
          text: "Deal 30 damage",
          minReq: 4,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 30, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

              newState.opponentMonster[monsterIndex].encounterEnergy -= 4;
            })
            return toChangeState;
          }
        }
      ]
    },

    blockbossguard2: {
      name: "test1",
      type: "Air",
      maxHP: 50,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 50,
      strength: 0,
      dex: 1,
      drown: 0,
      hunted: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Spreading Shield",
          cost: "0",
          text: (state, index, array) => {
            return `All enemies gain +${5 + array[index].dex} block. +1 energy`
          }, 
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster.forEach(function(monsterObj, index) {
                monsterObj.encounterBlock += (5 +state.opponentMonster[monsterIndex].dex);
              })
              newState.opponentMonster[monsterIndex].encounterEnergy +=1;

              
            })
            return toChangeState;
          }
        },
        {
          name: "Quick Detonate",
          cost: "3",
          text: "Deal 25 damage",
          minReq: 3,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 25, monsterIndex);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
            })
            return toChangeState;
          }
        }
      ]
    },

    blockgym1: {
      name: "test1",
      type: "Air",
      maxHP: 60,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 60,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Take Cover",
          cost: "0",
          text: (state, index, array) => {
            return `Gain ${15 + array[index].dex} block. +1 energy`
          }, 
          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster.forEach(function(monsterObj) {
                monsterObj.encounterBlock += (15 +array[index].dex);
              })
              newState.opponentMonster[index].encounterEnergy +=1;     
            })
            return toChangeState;
          }
        },
        {
          name: "Shield Throw",
          cost: "1",
          text: (state, index, array) => {
            return `Deal ${15 + array[index].dex + array[index].strength} damage. Gain 1 dexterity.`
          },
          minReq: 1,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, (15 + array[index].dex), index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy -= 1;
              newState.opponentMonster[index].dex +=1;
            })
            return toChangeState;
          }
        }
        
      ]
    },
  }
 // consuming flames
 // rising tide  

 let OpponentMonsterFightCountArray = [
  [
    [opponentMonsters.blockgym1],
    //[opponentMonsters.blockbossguard1, opponentMonsters.blockbossguard2]
  ],
  
  [
    [opponentMonsters.opponent1],
    [opponentMonsters.opponent2], 
    [opponentMonsters.opponent3], 
    [opponentMonsters.opponent4],
    [opponentMonsters.opponent6]
  ],

  [
    [opponentMonsters.opponent2], 
    [opponentMonsters.opponent3], 
    [opponentMonsters.opponent4],
    [opponentMonsters.opponent7]
  ],

  [
    [opponentMonsters.opponent5], 
    [opponentMonsters.opponent3, opponentMonsters.opponent4], 
    [opponentMonsters.opponent4],
    [opponentMonsters.opponent1, opponentMonsters.opponent4],
    [opponentMonsters.opponent1, opponentMonsters.opponent7]
  ],

  [
    [opponentMonsters.opponent5, opponentMonsters.opponent1], 
    [opponentMonsters.opponent2, opponentMonsters.opponent4],
    [opponentMonsters.opponent2, opponentMonsters.opponent6] 
  ],

  
  [
    [opponentMonsters.opponent2, opponentMonsters.opponent5],
    [opponentMonsters.opponent1, opponentMonsters.opponent1],
    [opponentMonsters.opponent1, opponentMonsters.opponent2],
    [opponentMonsters.opponent1, opponentMonsters.opponent2],

  ]
 ]
  

  
  
  let playerMonsters = {
    devCheat: {
      name: "Testing Mode",
      type: "fire",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      cardPool: fireCardPool,
      maxHP: 100,
      currentHP: 100,
      strength: 0,
      dex: 0,
      tempStrength: 0,
      tempDex: 0,
      turnEnergy: 3,
      avatar: "img/fireMonster.png",
      startingDeck: [
        waterCardPool.cloakingFog,
        fireCardPool.setAflame,
        fireCardPool.setAflame,
        fireCardPool.upgrade,
        fireCardPool.devExplode,
        fireCardPool.devExplode,
        fireCardPool.gainstrength,
        waterCardPool.drownTest
      ],
    },
  
    charles: {
      name: "Charles",
      type: "fire",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      cardPool: fireCardPool,
      maxHP: 100,
      currentHP: 100,
      strength: 0,
      dex: 0,
      tempStrength: 0,
      tempDex: 0,
      turnEnergy: 3,
      avatar: "img/flamingbaby.png",
      startingDeck: [
        //1 energy
        fireCardPool.fireEnergy,
        //11 attacks
        fireCardPool.explode,
        fireCardPool.gainstrength,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.tackle,
        fireCardPool.tackle,
        fireCardPool.tackle,
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
      maxHP: 100,
      currentHP: 100,
      strength: 0,
      dex: 0,
      tempStrength: 0,
      tempDex: 0,
      turnEnergy: 3,
      avatar: "img/watertongue.png",
      startingDeck: [
        //1 energy
        waterCardPool.waterEnergy,
        //11 attacks
        waterCardPool.withdraw,
        waterCardPool.withdraw,
        waterCardPool.withdraw,
        waterCardPool.withdraw,
        waterCardPool.tackle,
        waterCardPool.tackle,
        waterCardPool.tackle,
        waterCardPool.bodySlam,
        waterCardPool.gainDex,
        waterCardPool.cloakingFog,
        waterCardPool.huntPrey
      ]
    },

    waterTest: {
      name: "waterTest",
      type: "Water",
      cardPool: waterCardPool,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      maxHP: 100,
      currentHP: 100,
      strength: 0,
      dex: 0,
      tempStrength: 0,
      tempDex: 0,
      turnEnergy: 3,
      avatar: "img/watertongue.png",
      startingDeck: [
        //1 energy
        waterCardPool.waterEnergy,
        //11 attacks
        waterCardPool.drownTest,
        waterCardPool.withdraw,
        waterCardPool.withdraw,
        waterCardPool.bodySlam,
        waterCardPool.gainDex,
        waterCardPool.cloakingFog,
        waterCardPool.huntPrey
      ]
    }
  };