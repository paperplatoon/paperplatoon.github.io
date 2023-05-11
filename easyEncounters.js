//fire - 6
//earth - 2
//water - 2
//air - 1

let easySoloEncounters = {
    e1: {
        name: "Strength E1",
        type: "Fire",
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*2),
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
        baseDamage: opponentBaseDamage+1,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/easy/bearcub1.png",
        moves: [
          {
            name: "Flame Swipe",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${array[index].baseDamage + 4 + array[index].strength} damage.`
            },
            minReq: 0,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage + 4), index, 1);
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
                return `Gain ${array[index].baseBlock + 3 + array[index].dex} block. Gain ${Math.floor(array[index].baseScale/3)} strength`
            },
            minReq: 2,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await opponentGainEnergy(stateObj, 1, index)
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].encounterBlock += array[index].baseBlock + 3 + array[index].dex;
                newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
              })
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Blazing Claws",
            cost: "4",
            text: (state, index, array) => {
                return `Deal ${Math.floor(array[index].baseDamage/4) + array[index].strength} damage 6 times`
            },
            minReq: 4,
            energyChange: "-4",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, -4, 6);
              return stateObj;
            }
          },
        ]
      },

      e2: {
        name: "Balance E2",
        type: "Fire",
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*2),
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
        avatar: "img/easy/adorablefire.png",
        moves: [
          {
            name: "Fiery Swipe",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage+4) + array[index].strength} damage.`
            },
            minReq: 0,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+4, index, 2);
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
            name: "Rising Flames",
            cost: "4",
            text: (state, index, array) => {
              return `Gain ${(array[index].baseBlock) + array[index].dex} block. Gain ${array[index].baseScale} Strength & Dexterity`
            },
            minReq: 4,
            energyChange: "-4",
            action: async (stateObj, index, array) => {
              stateObj = await opponentLoseEnergy(stateObj, 4, index);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock)  + array[index].dex);
                newState.opponentMonster[index].strength += array[index].baseScale;
                newState.opponentMonster[index].dex += array[index].baseScale;
                //newState.opponentMonster[index].encounterEnergy -= 4;
              })
              
              return stateObj;
            }
          }    
        ]
      },

      e3: {
        name: "Heal E3",
        type: "Earth",
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*2),
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
        avatar: "img/easy/plant1.png",
        moves: [
          {
            name: "Replenish",
            cost: "0",
            text: (state, index, array) => {
              return `Restore ${array[index].baseHeal} health`
            },
            minReq: 0,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await opponentGainEnergy(stateObj, 1, index)
              stateObj = await healOpponent(stateObj, array[index].baseHeal, index)
              return stateObj;
            }
          },
          {
            name: false,
          },
    
          {
            name: "Seed Eruption",
            cost: "2",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*3) + 1 + array[index].strength} damage`
            },
            minReq: 2,
            energyChange: "-2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3) + 1, index, -2);
              return stateObj;
            }
          },
    ]
  },



  e6: {
    name: "Inflame E9",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    Level: 1,
    maxHP: opponentMaxHP*10,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*10,
    inflame: 3,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/easy/firecub1.png",
    powers: [{
      name: "Power: Inflame",
      text: (state, index, array) => {
        return `Gain ${Math.floor(array[index].baseScale)} strength per turn`
    }
    }],
    moves: [
      {
        name: "Yawn and Stretch",
        cost: "0",
        text: (state, index, array) => {
            return `Gain ${Math.floor(array[index].baseScale/3)} strength.`
        },
        minReq: 0,
        energyChange: "+3",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
            //newState.opponentMonster[index].encounterEnergy += 3;
          })
          stateObj = await opponentGainEnergy(stateObj, 3, index)
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
        name: "Fiery Swipe",
        cost: "3",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage) + array[index].strength} damage`
        },
        minReq: 3,
        energyChange: "0",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage-array[index].inflame, index)
          return stateObj;
        }
      },
    ]
  },

  e7: {
    name: "Inflame E9",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    Level: 1,
    maxHP: opponentMaxHP*10,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*10,
    inflame: opponentBaseScale*2,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: 0,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/easy/hornsfire.png",
    powers: [{
      name: "Power: Inflame",
      text: (state, index, array) => {
        return `Gain ${Math.floor(array[index].inflame)} strength per turn`
    }
    }],
    moves: [
      {
        name: "Horn Charge",
        cost: "0",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage) + array[index].strength} damage`
        },
        minReq: 0,
        energyChange: "0",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage-array[index].inflame, index)
          return stateObj;
        }
      },
    ]
  },

  e8: {
    name: "Water E8",
    type: "Water",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
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
    avatar: "img/easy/shrimp1.png",
    moves: [
      {
        name: "Reef Camouflage",
        cost: "",
        text: (state, index, array) => {
          return `Gain ${array[index].baseBlock + 3 + array[index].dex} block.`
        },
        minReq: 0,
        energyChange: "+1",
        action: async (stateObj, index, array) => {
          stateObj = immer.produce(state, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + 3 + array[index].dex;
          })
          stateObj = await opponentGainEnergy(stateObj, 1, index);
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
        name: "Mantis Punch",
        cost: "3",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage*3)+3 + array[index].strength} damage`
        },
        minReq: 3,
        energyChange: "-3",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*3)+3, index, -3)
          return stateObj;
        }
      },
    ]
  },
  e9: {
    name: "Little Plant",
    type: "Earth",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
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
    avatar: "img/easy/babyplant.png",
    moves: [
      {
        name: "Drain",
        cost: "0",
        text: (state, index, array) => {
          return `Deal 5 damage. Restore 5 health`
        },
        minReq: 0,
        energyChange: "+1",
        action: async (stateObj, index, array) => {
          stateObj = await opponentGainEnergy(stateObj, 1, index)
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, 1);
          stateObj = await healOpponent(stateObj, 5, index)
          return stateObj;
        }
      },
      {
        name: false,
      },

      {
        name: "Petal Strike",
        cost: "2",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage`
        },
        minReq: 2,
        energyChange: "-2",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2), index, -2);
          return stateObj;
        }
      },
]
},
e10: {
  name: "Energy Thief",
  type: "Air",
  Level: 1,
  XPGain: opponentXPGain,
  goldOnDefeat: Math.floor(opponentGold*2),
  maxHP: opponentMaxHP*7,
  encounterEnergy: 0,
  opponentMoveIndex: false,
  currentHP: opponentMaxHP*7,
  strength: 0,
  dex: 1,
  drown: 0,
  hunted: 0,
  poison: 0,
  baseDamage: opponentBaseDamage,
  baseBlock: opponentBaseBlock,
  baseScale: 0,
  baseHeal: 0,
  avatar: "img/easy/bee.png",
  moves: [
    {
      name: "Air Strike",
      cost: "0",
      text: (state, index, array) => {
        return `Deal ${Math.floor(array[index].baseDamage*2) + array[index].strength} damage`
      },
      minReq: 0,
      energyChange: "+3",
      action: async (stateObj, index, array) => {
        stateObj = immer.produce(stateObj, (newState) => {
          newState.opponentMonster.forEach(function (monsterObj) {
            monsterObj.encounterBlock += (Math.floor((array[index].baseBlock / 2)) + array[index].dex);
          })
        })
        stateObj = await opponentGainEnergy(stateObj, 3, index)
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
      name: "Sting",
      cost: "3",
      energyChange: "-3",
      text: (state, index, array) => {
        return ` Deal ${array[index].baseDamage + 2 + array[index].strength} damage. Lose 1 energy`
      },
      minReq: 3,
      action: async (stateObj, index, array) => {
        stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage + 2), index, -3);
        stateObj = immer.produce(state, (newState) => {
          if (newState.playerMonster.encounterEnergy > 0) {
            newState.playerMonster.encounterEnergy -= 1
          }
          })
        return stateObj;
      }
    }
  ]
},
}





































let easyMultiEncounters = {
  em1: {
    name: "Strength E4",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold),
    Level: 1,
    maxHP: (opponentMaxHP*3)+3,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: (opponentMaxHP*3)+3,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/easy/fireturtle.png",
    moves: [
      {
        name: "Shell Smack",
        cost: "0",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage) + 2 + array[index].strength} damage`
        },
        minReq: 0,
        energyChange: "+2",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage + 2), index, 2);
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
        action: async (stateObj, index, array) => {
          stateObj = await opponentLoseEnergy(stateObj, 4, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale + 1);
          })
          return stateObj;
        }
      },
    ]
  },

  em2: {
    name: "Strength E5",
    type: "Fire",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold),
    Level: 1,
    maxHP: (opponentMaxHP*3)+2,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: (opponentMaxHP*3)+2,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/easy/fireturtle1.png",
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
          stateObj = await opponentGainEnergy(stateObj, 2, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
            newState.opponentMonster[index].strength += Math.floor(array[index].baseScale + 1);
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
            return `Deal ${Math.floor(array[index].baseDamage + 2) + array[index].strength} damage`
        },
        minReq: 4,
        energyChange: "-4",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage + 2), index, -4);
          return stateObj;
        }
      }
    ]
  },

  em3: {
    name: "Clam 1",
    type: "Water",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold),
    Level: 1,
    maxHP: (opponentMaxHP*2)+4,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: (opponentMaxHP*2)+4,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/easy/waterhelmet.png",
    moves: [
      {
        name: "Helmet",
        cost: "0",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + 3 + array[index].dex} block.`
        },
        minReq: 0,
        energyChange: "+2",
        action: async (stateObj, index, array) => {
          stateObj = await opponentGainEnergy(stateObj, 2, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + 3 + array[index].dex;
          })
          return stateObj;
        }
      },
      {
        name: false,
      },
      {
        name: "Headbutt",
        cost: "2",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage + 2) + array[index].strength} damage`
        },
        minReq: 2,
        energyChange: "-2",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage + 2), index, -2);
          return stateObj;
        }
      }
    ]
  },

  em4: {
    name: "Clam 2",
    type: "Water",
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold),
    Level: 1,
    maxHP: (opponentMaxHP*2)+4,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: (opponentMaxHP*2)+4,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseBlock: opponentBaseBlock,
    baseDamage: opponentBaseDamage,
    baseScale: opponentBaseScale,
    baseHeal: 0,
    avatar: "img/easy/waterhelmet.png",
    moves: [
      {
        name: "Headbutt",
        cost: "0",
        text: (state, index, array) => {
            return `Deal ${Math.floor(array[index].baseDamage + 2) + array[index].strength} damage`
        },
        minReq: 0,
        energyChange: "2",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage + 2), index, 2);
          return stateObj;
        }
      },
      {
        name: false,
      },
      {
        name: "Helmet",
        cost: "2",
        text: (state, index, array) => {
            return `Gain ${array[index].baseBlock + 3 + array[index].dex} block.`
        },
        minReq: 2,
        energyChange: "-2",
        action: async (stateObj, index, array) => {
          stateObj = await opponentLoseEnergy(stateObj, 2, index)
          stateObj = immer.produce(stateObj, (newState) => {
            newState.opponentMonster[index].encounterBlock += array[index].baseBlock + 3 + array[index].dex;
          })
          return stateObj;
        }
      },
      
    ]
  },

  
}