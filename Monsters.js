//return `Deal ${5 + array[index].strength} damage. Restore 5 health`
//randomize some stuff like strength and dex (maybe starting energy) to change stuff up a bit

let opponentBaseDamage = 6;
let opponentBaseBlock = 8;
let opponentBaseHeal = 7;
let opponentBaseScale = 3;
let opponentMaxHP = 7;
let opponentXPGain = 5

let opponentMonsters = {
  blockbossguard1: {
    name: "Block Gym Guard 1",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    maxHP: opponentMaxHP*7,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*7,
    strength: 0,
    dex: 2,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/airmask.png",
    moves: [
      {
        name: "Spreading Shield",
        cost: "0",
        text: (state, index, array) => {
          return `All enemies gain +${Math.floor((array[index].baseBlock / 2)) + array[index].dex} block`
        },
        minReq: 0,
        energyChange: "+1",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster.forEach(function (monsterObj) {
              monsterObj.encounterBlock += (Math.floor((array[index].baseBlock / 2)) + array[index].dex);
            })
            newState.opponentMonster[index].encounterEnergy += 1;


          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },

      {
        name: "Detonate",
        cost: "3",
        energyChange: "-3",
        text: (state, index, array) => {
          return ` Deal ${(array[index].baseDamage * 4) + array[index].strength} damage`
        },
        minReq: 3,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage * 4, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

            newState.opponentMonster[index].encounterEnergy -= 3;
          })
          return toChangeState;
        }
      }
    ]
  },

  blockbossguard2: {
    name: "Block Gym Guard 2",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    maxHP: opponentMaxHP*6,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*6,
    strength: 0,
    dex: 2,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/airmask.png",
    moves: [
      {
        name: "Spreading Shield",
        cost: "0",
        text: (state, index, array) => {
          return `All enemies gain +${Math.floor((array[index].baseBlock / 2)) + array[index].dex} block`
        },
        minReq: 0,
        energyChange: "+2",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster.forEach(function (monsterObj) {
              monsterObj.encounterBlock += (Math.floor((array[index].baseBlock / 2)) + array[index].dex);
            })
            newState.opponentMonster[index].encounterEnergy += 2;


          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Quick Detonate",
        cost: "5",
        text: (state, index, array) => {
          return `Deal ${((array[index].baseDamage * 2) + 1) + array[index].strength} damage`
        },
        minReq: 5,
        energyChange: "-5",
        action: (stateObj, index, array) => {
          stateObj = dealPlayerDamage(stateObj, (array[index].baseDamage * 2) + 1, index, energyChange=-5);
          return stateObj;
        }
      }
    ]
  },

  blockgym1: {
    name: "Block Gym Disciple",
    type: "Air",
    XPGain: opponentXPGain*2,
    Level: 1,
    maxHP: opponentMaxHP*9,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*9,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/dracula.png",
    moves: [
      {
        name: "Take Cover",
        cost: "0",
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock*2) + array[index].dex} block`
        },
        minReq: 0,
        energyChange: "+3",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock*2)  + array[index].dex);
            newState.opponentMonster[index].encounterEnergy += 3;
          })
          return toChangeState;
        }
      },

      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Shield Throw",
        cost: "3",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + array[index].dex + array[index].strength} damage. Gain ${array[index].baseScale} dexterity`
        },
        minReq: 3,
        energyChange: "-3",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, ((array[index].baseDamage*2) + array[index].dex), index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 3;
            newState.opponentMonster[index].dex += array[index].baseScale;
          })
          return toChangeState;
        }
      }

    ]
  },

  blockgymboss: {
    name: "Block Gym Boss",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain*3,
    maxHP: opponentMaxHP*12,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*12,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseHeal: 0,
    avatar: "img/hugeair.png",
    moves: [
      {
        name: "Shielded Strike",
        cost: "0",
        energyChange: "+2",
        text: (state, index, array) => {
          let damageValue = 0;
          if (state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name)) {
            damageValue += Math.floor(array[index].baseBlock + state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name).dex)
          }
          if (state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name)) {
            damageValue += Math.floor(array[index].baseBlock + state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name).dex)
          }
          return `Deal ${damageValue + array[index].strength} damage. Other monsters gain ${Math.floor(array[index].baseScale/2)} dexterity`
        },

        minReq: 0,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let damageValue = 0;
            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name)) {
              damageValue += Math.floor(array[index].baseBlock + newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name).dex)
            }
            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name)) {
              damageValue += Math.floor(array[index].baseBlock + newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name).dex)
            }

            let tempState = dealPlayerDamage(newState, damageValue, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name)) {
              newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name).dex += Math.floor(array[index].baseScale/2);
            }
            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name)) {
              newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name).dex += Math.floor(array[index].baseScale/2);
            }

            newState.opponentMonster[index].encounterEnergy += 2;
          })



          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Rear Up",
        cost: "7",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage`
        },
        minReq: 6,
        energyChange: "-7",
        action: (stateObj, index, array) => {
          stateObj = dealPlayerDamage(stateObj, (array[index].baseDamage * 5), index, energyChange=-7);
          return stateObj;
        }
      }

    ]
  },

  healgym1: {
    name: "Heal Gym Disciple",
    type: "Air",
    XPGain: opponentXPGain*2,
    Level: 1,
    maxHP: opponentMaxHP*12,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*12,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseHeal: opponentBaseHeal+1,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    avatar: "img/waterdevil.png",
    moves: [
      {
        name: "Replenish",
        cost: "0",
        text: (state, index, array) => {
          return `Restore ${array[index].baseHeal} health`
        },
        minReq: 0,
        energyChange: "+2",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal + 1))) {
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
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Shield Throw",
        cost: "4",
        text: (state, index, array) => {
          return `Deal ${Math.floor((array[index].baseDamage/2)) + array[index].strength} damage 5 times`
        },
        minReq: 4,
        energyChange: "+2",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, Math.floor((array[index].baseDamage/2)), index, 5);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy += 2;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      },

      {
        name: "Mega Drain",
        cost: "6",
        text: (state, index, array) => {
          return `Deal ${(3 * array[index].baseDamage) + array[index].strength} damage. Restore ${array[index].baseHeal * 2} health`
        },
        minReq: 6,
        energyChange: "-6",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, (3 * array[index].baseDamage), index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 6;
            if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal * 2) + 1)) {
              newState.opponentMonster[index].currentHP += array[index].baseHeal * 2;
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
    name: "Heal Gym Guard",
    type: "Air",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*6,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*6,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    baseHeal: opponentBaseHeal,
    avatar: "img/earthevil.png",
    moves: [
      {
        name: "Replenish",
        cost: "0",
        text: (state, index, array) => {
          return `Restore ${array[index].baseHeal} health`
        },
        minReq: 0,
        energyChange: "+1",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal + 1))) {
              newState.opponentMonster[index].currentHP += array[index].baseHeal;
              newState.enemyFightHealTotal += array[index].baseHeal;
            } else {
              newState.enemyFightHealTotal += (newState.opponentMonster[index].maxHP - newState.opponentMonster[index].currentHP)
              newState.opponentMonster[index].currentHP = newState.opponentMonster[index].maxHP;
            };
            newState.opponentMonster[index].encounterEnergy += 1;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },

      {
        name: "Seed Explosion",
        cost: "3",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage`
        },
        minReq: 3,
        energyChange: "-3",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage*3, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 3;
          })
          return toChangeState;
        }
      },
    ]
  },

      healgymguard2: {
        name: "Heal Gym Guard",
        type: "Air",
        XPGain: opponentXPGain,
        Level: 1,
        maxHP: opponentMaxHP*6,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*6,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        baseBlock: 0,
        baseDamage: opponentBaseDamage,
        baseScale: 0,
        baseHeal: opponentBaseHeal,
        avatar: "img/earthevil.png",
        moves: [
          {
            name: "Replenish",
            cost: "0",
            text: (state, index, array) => {
              return `Restore ${array[index].baseHeal} health`
            },
            minReq: 0,
            energyChange: "+1",
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                if (array[index].currentHP < (array[index].maxHP - (array[index].baseHeal + 1))) {
                  newState.opponentMonster[index].currentHP += array[index].baseHeal;
                  newState.enemyFightHealTotal += array[index].baseHeal;
                } else {
                  newState.enemyFightHealTotal += (newState.opponentMonster[index].maxHP - newState.opponentMonster[index].currentHP)
                  newState.opponentMonster[index].currentHP = newState.opponentMonster[index].maxHP;
                };
                newState.opponentMonster[index].encounterEnergy += 1;
              })
              return toChangeState;
            }
          },
          {
            name: false,
          },
          {
            name: false,
          },
    
          {
            name: "Seed Eruption",
            cost: "2",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage`
            },
            minReq: 2,
            energyChange: "-2",
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                let tempState = dealPlayerDamage(newState, (array[index].baseDamage*3), index);
                newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
                newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
                newState.opponentMonster[index].encounterEnergy -= 2;
              })
              return toChangeState;
            }
          },
    ]
  },

  healgymboss: {
    name: "Heal Gym Boss",
    type: "Air",
    XPGain: opponentXPGain*3,
    Level: 1,
    maxHP: opponentMaxHP*18,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*18,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 0,
    baseDamage: opponentBaseDamage,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/earthpsycho.png",
    moves: [
      {
        name: "Acid Floor",
        cost: "0",
        text: (state, index, array) => {
          //maybe scale health restore for a later fight???
          return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage to ALL enemies`
        },
        minReq: 0,
        energyChange: "+4",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let calculatedDamage = array[index].baseDamage + array[index].strength;
            let tempState = dealPlayerDamage(newState, array[index].baseDamage, index);
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
            newState.opponentMonster[index].encounterEnergy += 4;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Unleash Growth",
        cost: "4",
        text: (state, index, array) => {
          return `Deal damage equal to the total amount healed this fight (${state.enemyFightHealTotal})`
        },
        minReq: 4,
        energyChange: "-4",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, state.enemyFightHealTotal, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 4;
          })
          return toChangeState;
        }
      },

    ]
  },

  strengthgym1: {
    name: "Strength Gym Disciple",
    type: "Fire",
    XPGain: opponentXPGain*2,
    Level: 1,
    maxHP: opponentMaxHP*7,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*7,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/firesheep.png",
    moves: [
      {
        name: "Power Strike",
        cost: "0",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage*2 + array[index].strength} damage`
        },
        minReq: 0,
        energyChange: "+3",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, (array[index].baseDamage*2), index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy += 3;

          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Enrage",
        cost: "3",
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock*2) + array[index].dex} block. Gain ${array[index].baseScale} strength`
        },
        minReq: 3,
        energyChange: "-3",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock*2) + array[index].dex);
            newState.opponentMonster[index].encounterEnergy -= 3;
            newState.opponentMonster[index].strength += array[index].baseScale;
          })
          return toChangeState;
        }
      }
    ]
  },

  strengthgymguard: {
    name: "Strength Gym Guard",
    type: "Fire",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*6,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*6,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/firebaby.png",
    moves: [
      {
        name: "Whirling Dervish",
        cost: "0",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage/4) + array[index].strength} damage 4 times`
        },
        minReq: 0,
        energyChange: "+1",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, Math.floor(array[index].baseDamage/4), index, 4);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy += 1;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: "Power Up",
        cost: "2",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock - 2 + array[index].dex} block. Gain ${Math.floor(array[index].baseScale/3)} strength`
        },
        minReq: 2,
        energyChange: "-1",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock - 2 + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].encounterEnergy -= 1;
          })
          return toChangeState;
        }
      },
    ]
  },

  strengthgymboss: {
    name: "Strength Gym Boss",
    type: "Fire",
    XPGain: opponentXPGain*3,
    Level: 1,
    maxHP: opponentMaxHP*20,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*20,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/firebeard.png",
    moves: [
      {
        name: "Roll Up",
        cost: "0",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain ${array[index].baseScale*2} strength`
        },
        minReq: 0,
        energyChange: "+2",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].strength += array[index].baseScale*2;
            newState.opponentMonster[index].encounterEnergy += 2;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Muscle Shield",
        cost: "3",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + array[index].strength + array[index].dex} block. Improved by strength`
        },
        minReq: 3,
        energyChange: "+2",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].strength + array[index].dex;
            newState.opponentMonster[index].encounterEnergy += 2;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Body Blows",
        cost: "5",
        text: (state, index, array) => {
          return `Deal strength value (${array[index].strength}) two times`
        },
        minReq: 5,
        energyChange: "-5",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 0, index, 2);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 5;
          })
          return toChangeState;
        }
      }
    ]
  },

  randomencounter1: {
    name: "Sindur",
    type: "fire",
    XPGain: opponentXPGain*2,
    Level: 1,
    maxHP: 40,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 40,
    strength: 0,
    baseScale: opponentBaseScale,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/firebeard.png",
    moves: [
      {
        name: "Coursing Flames",
        cost: "0",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage - 2 + array[index].strength} damage. Gain ${array[index].baseScale} strength`
        },
        minReq: 0,
        energyChange: "+1",
        action: (stateObj, index, array) => {
          stateObj = dealPlayerDamage(stateObj, array[index].baseDamage-2, index);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterEnergy += 1;
            newState.opponentMonster[index].strength += array[index].baseScale;
          })
          return stateObj;
        }
      },
      {
        name: false,
      },
      {
        name: "Heat Discharge",
        cost: "2",
        text: (state, index, array) => {
          return `Deal strength damage (${array[index].strength}) twice `
        },
        minReq: 2,
        energyChange: "+2",
        action: (stateObj, monsterIndex, array) => {
          stateObj = dealPlayerDamage(stateObj, 0, monsterIndex, energyChange=2, attackNumber=2,);
          return stateObj;
        }
      },
      {
        name: false,
      },  
      {
        name: "Heat Shield",
        cost: "4",
        text: (state, index, array) => {
          return `Gain (${1+(array[index].baseBlock*2)}) block `
        },
        minReq: 4,
        energyChange: "+2",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += 1+(array[index].baseBlock*2);
            newState.opponentMonster[index].encounterEnergy += 2;
          })
          return toChangeState;
        }
      },
      {
        name: false,
      }, 
      {
        name: "River of Flames",
        cost: "6",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage.`
        },
        minReq: 6,
        energyChange: "-6",
        action: (stateObj, index, array) => {
          stateObj = dealPlayerDamage(stateObj, (array[index].baseDamage*2), index, energyChange=-6);
          console.log()
          return stateObj;
        }
      },
    ]
  },

  balancegym1: {
    name: "Block Gym Disciple",
    type: "Air",
    XPGain: opponentXPGain*2,
    Level: 1,
    maxHP: opponentMaxHP*9,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*9,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/earthpsycho.png",
    moves: [
      {
        name: "Study Openings",
        cost: "0",
        text: (state, index, array) => {
          return `Gain ${(array[index].baseBlock) + array[index].dex} block. Gain ${array[index].baseScale} strength`
        },
        minReq: 0,
        energyChange: "+3",
        action: (stateObj, index, array) => {
          console.log("playing study openings")
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock)  + array[index].dex);
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].encounterEnergy += 3;
          })
          return stateObj;
        }
      },

      {
        name: false,
      },
      {
        name: false,
      },
      {
        name: "Graceful Strike",
        cost: "3",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage) + array[index].strength} damage. Gain ${Math.ceil(array[index].baseScale/2)} dexterity`
        },
        minReq: 3,
        energyChange: "-3",
        action: (stateObj, index, array) => {
          console.log("playing graceful strike")
          stateObj = dealPlayerDamage(stateObj, array[index].baseDamage, index, -3);
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].dex += Math.ceil(array[index].baseScale/2);
          })
          return stateObj;
        }
      }

    ]
  },



}



let mediumEncountersMjs = [
  {
    opponents: [opponentMonsters.blockgym1],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.strengthgym1],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.balancegym1],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.healgym1],
    goldReward: 25,
  },
]

let hardEncountersMjs = [

  {
    opponents: [opponentMonsters.strengthgym1, opponentMonsters.strengthgymguard],
    goldReward: 35,
    XP: 20,
  },
  {
    opponents: [opponentMonsters.healgymguard2, opponentMonsters.healgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.blockbossguard2, opponentMonsters.blockgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.strengthgymguard, opponentMonsters.blockgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.strengthgymguard, opponentMonsters.healgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.blockbossguard2, opponentMonsters.healgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.blockbossguard2, opponentMonsters.strengthgym1],
    goldReward: 35,
    XP: 20
  },
]

let bossEncountersMjs = [
  {
    opponents: [opponentMonsters.strengthgymguard, opponentMonsters.strengthgymboss, opponentMonsters.strengthgymguard],
    goldReward: 125,
    boss: true,
    XP: 70
  },

  {
    opponents: [opponentMonsters.healgymboss, opponentMonsters.healgymguard2, opponentMonsters.healgymguard1],
    goldReward: 125,
    boss: true,
    XP: 70
  },
  {
    opponents: [opponentMonsters.blockbossguard1, opponentMonsters.blockgymboss, opponentMonsters.blockbossguard2],
    goldReward: 125,
    boss: true,
    XP: 70
  },
]




