//return `Deal ${5 + array[index].strength} damage. Restore 5 health`
//randomize some stuff like strength and dex (maybe starting energy) to change stuff up a bit

let opponentMonsters = {


    blockbossguard1: {
      name: "guard1",
      type: "Air",
      maxHP: 60,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 60,
      strength: 0,
      dex: 3,
      drown: 0,
      hunted: 0,
      poison: 0,
      baseDamage: 30,
      baseBlock: 5,
      baseScale: 0,
      baseHeal: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Spreading Shield",
          cost: "0",
          text: (state, index, array) => {
            return `All enemies gain +${array[index].baseBlock + array[index].dex} block. +1 energy`
          }, 
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster.forEach(function(monsterObj, index) {
                monsterObj.encounterBlock += (array[index].baseBlock +state.opponentMonster[monsterIndex].dex);
              })
              newState.opponentMonster[monsterIndex].encounterEnergy +=1;

              
            })
            return toChangeState;
          }
        },
        
        {
          name: "Detonate",
          cost: "4",
          text: (state, index, array) => {
            return ` Deal ${array[index].baseDamage + array[index].strength} damage. -4 energy`
          }, 
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
      name: "guard2",
      type: "Air",
      maxHP: 50,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 50,
      strength: 0,
      dex: 1,
      drown: 0,
      hunted: 0,
      poison: 0,
      baseDamage: 30,
      baseBlock: 5,
      baseScale: 0,
      baseHeal: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Spreading Shield",
          cost: "0",
          text: (state, index, array) => {
            return `All enemies gain +${array[index].baseBlock + array[index].dex} block. +1 energy`
          }, 
          minReq: 0,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster.forEach(function(monsterObj, index) {
                monsterObj.encounterBlock += (array[index].baseBlock +state.opponentMonster[monsterIndex].dex);
              })
              newState.opponentMonster[monsterIndex].encounterEnergy +=1;

              
            })
            return toChangeState;
          }
        },
        {
          name: "Quick Detonate",
          cost: "3",
          text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} block. -3 energy"`
          }, 
          minReq: 3,
          action: (state, monsterIndex) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, array[index].baseDamage, monsterIndex);
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
      poison: 0,
      baseBlock: 15,
      baseDamage: 15,
      baseScale: 5,
      baseHeal: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Take Cover",
          cost: "0",
          text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + array[index].dex} block. +1 energy`
          }, 
          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster.forEach(function(monsterObj) {
                monsterObj.encounterBlock += (array[index].baseBlock +array[index].dex);
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
            return `Deal ${array[index].baseDamage + array[index].dex + array[index].strength} damage. Gain ${array[index].baseScale} dexterity. -1 energy`
          },
          minReq: 1,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, (array[index].baseDamage + array[index].dex), index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy -= 1;
              newState.opponentMonster[index].dex += array[index].baseScale;
            })
            return toChangeState;
          }
        }
        
      ]
    },

    blockgymboss: {
      name: "boss",
      type: "Air",
      maxHP: 100,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 100,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      baseDamage: 5,
      baseScale: 1,
      baseBlock: 0,
      baseHeal: 0,
      avatar: "img/dracula.png",
      moves: [
        {
          name: "Shielded Strike",
          cost: "0",
          text: (state, index, array) => {
            let damageValue = 0;
            if (state.opponentMonster.find(monster => monster.name === "guard1")) {
              damageValue += (array[index].baseDamage + state.opponentMonster.find(monster => monster.name === "guard1").dex)
            }
            if (state.opponentMonster.find(monster => monster.name === "guard2")) {
              damageValue += (array[index].baseDamage + state.opponentMonster.find(monster => monster.name === "guard2").dex)
            }
            return `Deal ${damageValue} damage. Other monsters gain +1 dexterity. +1 energy`
          }, 

          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let damageValue = 0;
              if (newState.opponentMonster.find(monster => monster.name === "guard1")) {
                damageValue += (array[index].baseDamage + newState.opponentMonster.find(monster => monster.name === "guard1").dex)
              }
              if (newState.opponentMonster.find(monster => monster.name === "guard2")) {
                damageValue += (array[index].baseDamage + newState.opponentMonster.find(monster => monster.name === "guard2").dex)
              }

              let tempState = dealPlayerDamage(newState, damageValue, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              
              if (newState.opponentMonster.find(monster => monster.name === "guard1")) {
                newState.opponentMonster.find(monster => monster.name === "guard1").dex += array[index].baseScale;
              }
              if (newState.opponentMonster.find(monster => monster.name === "guard2")) {
                newState.opponentMonster.find(monster => monster.name === "guard2").dex += array[index].baseScale;
              }

              newState.opponentMonster[index].encounterEnergy += 1;
            })

            

            return toChangeState;
          }
        },

        {
          name: "Rear Up",
          cost: "5",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage*10) + array[index].strength} damage. -1 energy`
          },
          minReq: 5,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, array[index].baseDamage, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy -= 1;
            })
            return toChangeState;
          }
        }
    
      ]
    },

    healgym1: {
      name: "heal1",
      type: "Air",
      maxHP: 80,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 80,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      baseHeal: 10,
      baseBlock: 0,
      baseDamage: 5,
      baseScale: 0,
      avatar: "img/waterdevil.png",
      moves: [
        {
          name: "Replenish",
          cost: "0",
          text: (state, index, array) => {
            return `Restore ${array[index].baseHeal} health. +2 energy`
          }, 
          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal+1))) {
                newState.opponentMonster[index].currentHP += array[index].baseHeal;
              } else {
                newState.opponentMonster[index].currentHP = newState.opponentMonster[index].maxHP;
              }; 
              newState.opponentMonster[index].encounterEnergy += 2;    
            })
            return toChangeState;
          }
        },
        {
          name: "Shield Throw",
          cost: "3",
          text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage 5 times. +1 energy`
          },
          minReq: 3,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, array[index].baseDamage, index, 5);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy += 1;
            })
            return toChangeState;
          }
        },

        {
          name: "Mega Drain",
          cost: "5",
          text: (state, index, array) => {
            return `Deal ${(6*array[index].baseDamage) + array[index].strength} damage. Restore ${array[index].baseHeal*2} health. -5 energy`
          },
          minReq: 5,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 30, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy -= 5;
              if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal*2)+1 )) {
                newState.opponentMonster[index].currentHP += array[index].baseHeal*2;
              } else {
                newState.opponentMonster[index].currentHP = newState.opponentMonster[index].maxHP;
              }; 
              
            })
            return toChangeState;
          }
        }
        
      ]
    },

    healgymguard1: {
      name: "heal1",
      type: "Air",
      maxHP: 55,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 55,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      baseBlock: 0,
      baseDamage: 30,
      baseScale: 0,
      baseHeal: 10,
      avatar: "img/earthevil.png",
      moves: [
        {
          name: "Replenish",
          cost: "0",
          text: (state, index, array) => {
            return `Restore ${array[index].baseHeal} health. +1 energy`
          }, 
          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal+1))) {
                newState.opponentMonster[index].currentHP += array[index].baseHeal;
              } else {
                newState.opponentMonster[index].currentHP = newState.opponentMonster[index].maxHP;
              }; 
              newState.opponentMonster[index].encounterEnergy += 1;    
            })
            return toChangeState;
          }
        },

        {
          name: "Seed Explosion",
          cost: "4",
          text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage. -4 energy`
          },
          minReq: 4,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 40, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy -= 4;
            })
            return toChangeState;
          }
        },
        
      ]
    },

    healgymboss: {
      name: "healboss",
      type: "Air",
      maxHP: 100,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 100,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      baseBlock: 0,
      baseDamage: 10,
      baseScale: 1,
      baseHeal: 0,
      avatar: "img/earthpsycho.png",
      moves: [
        {
          name: "Acid Floor",
          cost: "0",
          text: (state, index, array) => {
            //maybe scale health restore for a later fight???
            return `Deal ${array[index].baseDamage + array[index].strength} damage to ALL enemies. Gain 3 energy`
          }, 
          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              calculatedDamage = array[index].baseDamage + array[index].strength;
              let tempState = dealPlayerDamage(newState, calculatedDamage, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
              newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
                if (monsterObj.encounterBlock == 0) {
                  monsterObj.currentHP -= calculatedDamage;
                } else if (monsterObj.encounterBlock >= calculatedDamage) {
                  monsterObj.encounterBlock -= calculatedDamage;
                } else {
                  monsterObj.currentHP -= (calculatedDamage - monsterObj.encounterBlock);
                  monsterObj.encounterBlock = 0;
                } 
              })     
              newState.opponentMonster[index].encounterEnergy += 3;        
          })
          return toChangeState;
        }
      },

        {
          name: "Unleash Growth",
          cost: "3",
          text: (state, index, array) => {
            return `Deal damage equal to the total amount healed this fight (${state.enemyFightHealTotal}). -3 energy`
          },
          minReq: 3,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, state.enemyFightHealTotal, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy -= 3;
            })
            return toChangeState;
          }
        },
        
      ]
    },

    strengthgym1: {
      name: "strength1",
      type: "Air",
      maxHP: 130,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: 130,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      avatar: "img/watertongue.png",
      moves: [
        {
          name: "Power Strike",
          cost: "0",
          text: (state, index, array) => {
            return `Deal ${20 + array[index].strength} damange. +2 energy`
          }, 
          minReq: 0,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              let tempState = dealPlayerDamage(newState, 20, index);
              newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
              newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock; 
              newState.opponentMonster[index].encounterEnergy +=2;     
            })
            return toChangeState;
          }
        },
        {
          name: "Enraged",
          cost: "1",
          text: (state, index, array) => {
            return `Gain ${20 + array[index].dex} block. Gain 10 strength. -2 energy. Shuffle an Enrage into your deck`
          },
          minReq: 1,
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[index].encounterEnergy -= 2;
              newState.opponentMonster[index].encounterBlock += 20;
              newState.opponentMonster[index].strength +=10;
            })
            return toChangeState;
          }
        }
        
      ]
    },
  }
 // consuming flames
 // rising tide

 let gym1 = [
  {
    opponents: [opponentMonsters.blockgym1],
    goldReward: 25
  },

  {
    opponents: [opponentMonsters.blockbossguard2, opponentMonsters.blockgym1],
    goldReward: 25
  },

  {
    opponents: [opponentMonsters.blockbossguard1, opponentMonsters.blockgymboss, opponentMonsters.blockbossguard2],
    goldReward: 125,
    boss: true
  },
 ]

 let gym2 = [
  {
    opponents: [opponentMonsters.healgym1],
    goldReward: 25
  },

  {
    opponents: [opponentMonsters.healgymguard1, opponentMonsters.healgym1],
    goldReward: 25
  },

  {
    opponents: [opponentMonsters.healgymboss, opponentMonsters.healgymguard1, opponentMonsters.healgymguard1],
    goldReward: 125,
    boss: true
  },
 ]

 let gyms = [
  gym1,
  gym2,
  gym1
 ]

 
    
  
  let playerMonsters = {
    devCheat: {
      name: "Easy Mode",
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
      fightStrength: 0,
      fightDex: 0,
      turnEnergy: 3,
      avatar: "img/fireMonster.png",
      startingDeck: [
        fireCardPool.setaflame,
        fireCardPool.darkknowledge,
        fireCardPool.darkknowledge,
        fireCardPool.sunlight,
        fireCardPool.bloatedbomb
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
      fightStrength: 0,
      fightDex: 0,
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

    genner: {
      name: "Genner (strong)",
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
      fightStrength: 0,
      fightDex: 0,
      turnEnergy: 3,
      avatar: "img/fireMonster.png",
      startingDeck: [
        fireCardPool.fireEnergy,
        fireCardPool.darkknowledge,
        fireCardPool.puffofsmoke,
        fireCardPool.retreatingslash,
        fireCardPool.sunlight,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.tackle,
        fireCardPool.tackle,
        fireCardPool.tackle,
      ],
    },
  
  // swirly: {
  //   name: "Swirly",
  //   type: "Water",
  //   cardPool: waterCardPool,
  //   encounterEnergy: 0,
  //   opponentMoveIndex: false,
  //   maxHP: 100,
  //   currentHP: 100,
  //   strength: 0,
  //   dex: 0,
  //   tempStrength: 0,
  //   tempDex: 0,
  //   fightStrength: 0,
  //   fightDex: 0,
  //   turnEnergy: 3,
  //   avatar: "img/watertongue.png",
  //   startingDeck: [
  //     //1 energy
  //     waterCardPool.waterEnergy,
  //     //11 attacks
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.bodySlam,
  //     waterCardPool.gainDex,
  //     waterCardPool.cloakingFog,
  //     waterCardPool.huntPrey
  //   ]
  // },

  // poisonTest: {
  //   name: "Venom",
  //   type: "Water",
  //   cardPool: waterCardPool,
  //   encounterEnergy: 0,
  //   opponentMoveIndex: false,
  //   maxHP: 100,
  //   currentHP: 50,
  //   strength: 0,
  //   dex: 0,
  //   tempStrength: 0,
  //   tempDex: 0,
  //   fightStrength: 0,
  //   fightDex: 0,
  //   turnEnergy: 3,
  //   avatar: "img/watertongue.png",
  //   startingDeck: [
  //     //1 energy
  //     waterCardPool.waterEnergy,
  //     //11 attacks
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.pinprick,
  //     waterCardPool.poisonedblade,
  //     waterCardPool.venomshield

  //   ]
  // }
  };