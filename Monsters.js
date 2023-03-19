//return `Deal ${5 + array[index].strength} damage. Restore 5 health`
//randomize some stuff like strength and dex (maybe starting energy) to change stuff up a bit

let opponentMonsters = {
  blockbossguard1: {
    name: "Block Gym Guard 1",
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
    baseDamage: 10,
    baseBlock: 10,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/airmask.png",
    moves: [
      {
        name: "Spreading Shield",
        cost: "0",
        text: (state, index, array) => {
          return `All enemies gain +${Math.floor((array[index].baseBlock / 2)) + array[index].dex} block. +1 energy`
        },
        minReq: 0,
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
        name: "Detonate",
        cost: "4",
        text: (state, index, array) => {
          return ` Deal ${(array[index].baseDamage * 4) + array[index].strength} damage. -4 energy`
        },
        minReq: 4,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage * 4, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

            newState.opponentMonster[index].encounterEnergy -= 4;
          })
          return toChangeState;
        }
      }
    ]
  },

  blockbossguard2: {
    name: "Block Gym Guard 2",
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
    baseDamage: 10,
    baseBlock: 10,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/airmask.png",
    moves: [
      {
        name: "Spreading Shield",
        cost: "0",
        text: (state, index, array) => {
          return `All enemies gain +${Math.floor((array[index].baseBlock / 2)) + array[index].dex} block. +1 energy`
        },
        minReq: 0,
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
        name: "Quick Detonate",
        cost: "3",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage * 3) + array[index].strength} block. -3 energy`
        },
        minReq: 3,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage * 3, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 3;
          })
          return toChangeState;
        }
      }
    ]
  },

  blockgym1: {
    name: "Block Gym Disciple",
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
    baseBlock: 10,
    baseDamage: 10,
    baseScale: 5,
    baseHeal: 0,
    avatar: "img/dracula.png",
    moves: [
      {
        name: "Take Cover",
        cost: "0",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + 5 + array[index].dex} block. +1 energy`
        },
        minReq: 0,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += (array[index].baseBlock + 5 + array[index].dex);
            newState.opponentMonster[index].encounterEnergy += 1;
          })
          return toChangeState;
        }
      },
      {
        name: "Shield Throw",
        cost: "1",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 5 + array[index].dex + array[index].strength} damage. Gain ${array[index].baseScale} dexterity. -1 energy`
        },
        minReq: 1,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, (array[index].baseDamage + 5 + array[index].dex), index);
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
    name: "Block Gym Boss",
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
    baseDamage: 10,
    baseScale: 2,
    baseBlock: 10,
    baseHeal: 0,
    avatar: "img/hugeair.png",
    moves: [
      {
        name: "Shielded Strike",
        cost: "0",
        text: (state, index, array) => {
          let damageValue = 0;
          if (state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name)) {
            damageValue += (Math.floor((array[index].baseBlock/2)) + state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name).dex)
          }
          if (state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name)) {
            damageValue += (Math.floor((array[index].baseBlock/2)) + state.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name).dex)
          }
          return `Deal ${damageValue + array[index].strength} damage. Other monsters gain ${array[index].baseScale} dexterity. +1 energy`
        },

        minReq: 0,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let damageValue = 0;
            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name)) {
              damageValue += (Math.floor((array[index].baseBlock/2)) + newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name).dex)
            }
            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name)) {
              damageValue += (Math.floor((array[index].baseBlock/2)) + newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name).dex)
            }

            let tempState = dealPlayerDamage(newState, damageValue, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name)) {
              newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard1.name).dex += array[index].baseScale;
            }
            if (newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name)) {
              newState.opponentMonster.find(monster => monster.name === opponentMonsters.blockbossguard2.name).dex += array[index].baseScale;
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
          return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage. -1 energy`
        },
        minReq: 5,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, (array[index].baseDamage*5), index);
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
    name: "Heal Gym Disciple",
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
    baseDamage: 10,
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
        name: "Shield Throw",
        cost: "3",
        text: (state, index, array) => {
          return `Deal ${Math.floor((array[index].baseDamage/2)) + array[index].strength} damage 5 times. +1 energy`
        },
        minReq: 3,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, Math.floor((array[index].baseDamage/2)), index, 5);
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
          return `Deal ${(3 * array[index].baseDamage) + array[index].strength} damage. Restore ${array[index].baseHeal * 2} health. -5 energy`
        },
        minReq: 5,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, (3 * array[index].baseDamage), index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 5;
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
    baseDamage: 10,
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
        name: "Seed Explosion",
        cost: "4",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage. -4 energy`
        },
        minReq: 4,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage*3, index);
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
    name: "Heal Gym Boss",
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
    name: "Strength Gym Disciple",
    type: "Fire",
    maxHP: 70,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 70,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 10,
    baseDamage: 10,
    baseScale: 5,
    baseHeal: 0,
    avatar: "img/firesheep.png",
    moves: [
      {
        name: "Power Strike",
        cost: "0",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage*2 + array[index].strength} damage. +1 energy`
        },
        minReq: 0,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, (array[index].baseDamage*2), index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy += 1;

          })
          return toChangeState;
        }
      },
      {
        name: "Enrage",
        cost: "1",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + 5 + array[index].dex} block. Gain ${array[index].baseScale} strength. -1 energy`
        },
        minReq: 1,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += (array[index].baseBlock + 5 + array[index].dex);
            newState.opponentMonster[index].encounterEnergy -= 1;
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
    maxHP: 50,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 50,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 0,
    baseDamage: 1,
    baseScale: 1,
    baseHeal: 0,
    avatar: "img/firebaby.png",
    moves: [
      {
        name: "Whirling Dervish",
        cost: "0",
        text: (state, index, array) => {
            let calculatedDamage = ((array[index].baseDamage-1)/5) + 1;
            return `Deal ${calculatedDamage + array[index].strength} damage 5 times. Gain 1 strength`
        },
        minReq: 0,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let calculatedDamage = ((array[index].baseDamage-1)/5) + 1;
            let tempState = dealPlayerDamage(newState, calculatedDamage, index, 5);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].strength += calculatedDamage;
          })
          return toChangeState;
        }
      }
    ]
  },

  strengthgymboss: {
    name: "Strength Gym Boss",
    type: "Fire",
    maxHP: 110,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 110,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: 10,
    baseDamage: 10,
    baseScale: 10,
    baseHeal: 0,
    avatar: "img/firebeard.png",
    moves: [
      {
        name: "Whirling Dervish",
        cost: "0",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain 10 strength. +3 energy`
        },
        minReq: 0,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, array[index].baseDamage, index);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].strength += array[index].baseScale;
            newState.opponentMonster[index].encounterEnergy += 3;
          })
          return toChangeState;
        }
      },

      {
        name: "Muscle Shield",
        cost: "5",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + array[index].strength + array[index].dex} block. Improved by strength. +4 energy`
        },
        minReq: 5,
        baseBlock: 10,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].strength + array[index].dex;
            newState.opponentMonster[index].encounterEnergy += 4;
          })
          return toChangeState;
        }
      },

      {
        name: "Body Blows",
        cost: "10",
        text: (state, index, array) => {
          return `Deal strength value (${array[index].strength}) two times. -10 energy`
        },
        minReq: 10,
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 0, index, 2);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[index].encounterEnergy -= 10;
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

let gym3 = [
  {
    opponents: [opponentMonsters.strengthgym1],
    goldReward: 25
  },

  {
    opponents: [opponentMonsters.strengthgym1, opponentMonsters.strengthgymguard],
    goldReward: 25
  },

  {
    opponents: [opponentMonsters.strengthgymguard, opponentMonsters.strengthgymboss, opponentMonsters.strengthgymguard],
    goldReward: 125,
    boss: true
  },
]

let gyms = [
  gym3,
  gym2,
  gym1
]




