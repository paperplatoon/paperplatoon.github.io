let easyEncounters = {
    e1: {
        name: "Strength E1",
        type: "Fire",
        XPGain: opponentXPGain,
        Level: 1,
        maxHP: opponentMaxHP*8,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*8,
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
            name: "Fiery Slap",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${array[index].baseDamage + array[index].strength} damage.`
            },
            minReq: 0,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage), index, 1);
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Inflame",
            cost: "2",
            text: (state, index, array) => {
                return `Gain ${array[index].baseBlock + array[index].dex} block. Gain ${Math.floor(array[index].baseScale/3)} strength`
            },
            minReq: 2,
            energyChange: "+1",
            action: (stateObj, index, array) => {
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
                newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
                newState.opponentMonster[index].encounterEnergy += 1;
              })
              return stateObj;
            }
          },
          {
            name: "Whirling Dervish",
            cost: "3",
            text: (state, index, array) => {
                return `Deal ${Math.floor(array[index].baseDamage/4) + array[index].strength} damage 4 times`
            },
            minReq: 3,
            energyChange: "-3",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, -3, 4);
              return stateObj;
            }
          },
        ]
      },

      e2: {
        name: "Balance E2",
        type: "Air",
        XPGain: opponentXPGain,
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
            name: "Fiery Slap",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage+1) + array[index].strength} damage.`
            },
            minReq: 0,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+1, index, 2);
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
            name: false,
          },
          {
            name: "Study Openings",
            cost: "4",
            text: (state, index, array) => {
              return `Gain ${(array[index].baseBlock) + array[index].dex} block. Gain ${array[index].baseScale} Strength & Dexterity`
            },
            minReq: 4,
            energyChange: "-4",
            action: (stateObj, index, array) => {
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock)  + array[index].dex);
                newState.opponentMonster[index].strength += array[index].baseScale;
                newState.opponentMonster[index].dex += array[index].baseScale;
                newState.opponentMonster[index].encounterEnergy -= 4;
              })
              return stateObj;
            }
          }    
        ]
      },

      e3: {
        name: "Heal E3",
        type: "Air",
        XPGain: opponentXPGain,
        Level: 1,
        maxHP: opponentMaxHP*8,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*8,
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
              return `Restore ${array[index].baseHeal} health. Gain 1 strength`
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
                newState.opponentMonster[index].strength += 1;
                newState.opponentMonster[index].encounterEnergy += 1;
              })
              return toChangeState;
            }
          },
          {
            name: false,
          },
    
          {
            name: "Seed Eruption",
            cost: "2",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*2) + 2 + array[index].strength} damage`
            },
            minReq: 2,
            energyChange: "-2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2)+2, index, -2);
              return stateObj;
            }
          },
    ]
  },

  e4: {
    name: "Strength E4",
    type: "Fire",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*5,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*5,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/littleturtle1.png",
    moves: [
      {
        name: "Shell Smack",
        cost: "0",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage) + array[index].strength} damage`
        },
        minReq: 0,
        energyChange: "+2",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage), index, 2);
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
        name: false,
      },
      {
        name: "Turtle Up",
        cost: "4",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + array[index].dex} block. Gain ${Math.floor(array[index].baseScale + 1)} strength`
        },
        minReq: 4,
        energyChange: "-4",
        action: (state, index, array) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale + 1);
            newState.opponentMonster[index].encounterEnergy -= 4;
          })
          return toChangeState;
        }
      },
    ]
  },

  e5: {
    name: "Strength E5",
    type: "Fire",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*5,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*5,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/littleturtle2.png",
    moves: [
      {
        name: "Turtle Up",
        cost: "0",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + array[index].dex} block. Gain ${Math.floor(array[index].baseScale + 1)} strength`
        },
        minReq: 0,
        energyChange: "+2",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale + 1);
            newState.opponentMonster[index].encounterEnergy += 2;
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
        name: false,
      },
      {
        name: "Shell Smack",
        cost: "4",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage) + array[index].strength} damage`
        },
        minReq: 4,
        energyChange: "-4",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage), index, -4);
          return stateObj;
        }
      }
    ]
  },

  e6: {
    name: "Prickles E6",
    type: "Fire",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*7,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*7,
    prickles: 2,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/littleturtle2.png",
    powers: [{
      name: "Power: Prickles",
      text:  `Whenever you attack this enemy, take 2 damage`
    }],
    moves: [
      {
        name: "Turtle Up",
        cost: "0",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock+1 + array[index].dex} block. Gain ${Math.floor(array[index].baseScale/3)} strength`
        },
        minReq: 0,
        energyChange: "+1",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + 1 + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
            newState.opponentMonster[index].encounterEnergy += 1;
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
        name: "Shell Smack",
        cost: "3",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage+3) + array[index].strength} damage`
        },
        minReq: 3,
        energyChange: "-3",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage+3), index, -3);
          return stateObj;
        }
      }
    ]
  },

  e7: {
    name: "Shakedown E7",
    type: "Fire",
    XPGain: opponentXPGain,
    Level: 1,
    maxHP: opponentMaxHP*7,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*7,
    shakedown: 1,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/littleturtle2.png",
    powers: [{
      name: "Power: Shakedown",
      text:  `After you deal unblocked attack damage to this enemy, gain 1 gold`
    }],
    moves: [
      {
        name: "Lunge",
        cost: "0",
        text: (state, index, array) => {
            return `Deal ${array[index].baseDamage + array[index].strength} damage.`
        },
        minReq: 0,
        energyChange: "+1",
        action: async (stateObj, index, array) => {
          stateObj = dealPlayerDamage(stateObj, array[index].baseDamage, index, +1)
          return stateObj;
        }
      },
      {
        name: false,
      },
      {
        name: "Shell Smack",
        cost: "2",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage-2) + array[index].strength} damage for each time you've taken unblocked attack damage (${state.fightDamageCount})`
        },
        minReq: 2,
        energyChange: "+2",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-2), index, +2, stateObj.fightDamageCount);
          return stateObj;
        }
      },
      {
        name: false,
      },
      {
        name: "Big Smack",
        cost: "6",
        text: (state, index, array) => {
            return `Deal damage equal to total unblocked attack damage taken (${state.fightDamageTotal})`
        },
        minReq: 6,
        energyChange: "-6",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, stateObj.fightDamageTotal, index, -6);
          return stateObj;
        }
      },
    ]
  },
}