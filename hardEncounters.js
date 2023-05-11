//fire -3, air 3, water 1
//hard - want 2 earth, 1 water

let hardSoloEncounters = {
    h1: {
        name: "Block Gym Boss",
        type: "Air",
        Level: 1,
        XPGain: opponentXPGain*3,
      goldOnDefeat: Math.floor(opponentGold*5),
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
        avatar: "img/hard/hugeair.png",
        moves: [
          {
            name: "Shielded Strike",
            cost: "0",
            energyChange: "+2",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage. All enemies gain ${Math.floor(array[index].baseScale/2)} strength`
            },
            minReq: 0,
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage*2), index, 2)
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster.forEach(function(monsterObj, Index) {
                    monsterObj.strength += Math.floor(array[index].baseScale/2);
                })
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
            name: false,
          },
          {
            name: false,
          },
          {
            name: "Rear Up",
            cost: "6",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage * 5) + array[index].strength} damage`
            },
            minReq: 6,
            energyChange: "-6",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 5), index, energyChange=-6);
              return stateObj;
            }
          }
        ]
      },

    h2: {
        name: "Enrage h8",
        type: "Fire",
        XPGain: opponentXPGain*3,
      goldOnDefeat: Math.floor(opponentGold*5),
        goldOnDefeat: 10,
        Level: 1,
        maxHP: opponentMaxHP*12,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*12,
        enrage: 3,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/hard/firebeard.png",
        powers: [{
          name: "Power: Enrage",
          text:  `Gains 3 strength after taking unblocked damage`
        }],
        moves: [
          {
            name: "Fiery Slap",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage.`
            },
            minReq: 0,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = dealPlayerDamage(stateObj, array[index].baseDamage+3, index, 1)
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Payback",
            cost: "2",
            text: (state, index, array) => {
                return `Deal ${Math.floor(array[index].baseDamage-2) + array[index].strength} damage for each time you've taken unblocked attack damage (${state.fightDamageCount})`
            },
            minReq: 2,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-2), index, 1, stateObj.fightDamageCount);
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
            name: "Unleash",
            cost: "5",
            text: (state, index, array) => {
                return `Deal damage equal to total unblocked attack damage taken (${state.fightDamageTotal + array[index].strength})`
            },
            minReq: 5,
            energyChange: "-5",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, stateObj.fightDamageTotal, index, -5);
              return stateObj;
            }
          },
        ]
      },

      h3: {
        name: "Strength H3",
        type: "Fire",
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
        Level: 1,
        maxHP: opponentMaxHP*14,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*14,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/hard/firemuscles.png",
        moves: [
          {
            name: "Channel Flames",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain ${array[index].baseScale*2} strength`
            },
            minReq: 0,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, 2);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].strength += array[index].baseScale*2;
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
            name: "Muscle Shield",
            cost: "4",
            text: (state, index, array) => {
              return `Gain ${array[index].baseBlock + array[index].strength + array[index].dex} block. Improved by strength`
            },
            minReq: 4,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = immer.produce(state, (newState) => {
                newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].strength + array[index].dex;
              })
              stateObj = await opponentGainEnergy(stateObj, 2, index);
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Body Blows",
            cost: "6",
            text: (state, index, array) => {
              return `Deal strength value (${array[index].strength}) two times`
            },
            minReq: 6,
            energyChange: "-6",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, 0, index, -6, 2);
              return stateObj;
            }
          }
        ]
      },

      h4: {
        name: "Off-balance H4",
        type: "Fire",
        offbalance: true,
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
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
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/hard/robocroc.png",
        powers: [{
          name: "Power: Off-balance",
          text:  `Whenever you fully block an attack from this monster, reflect it`
        }],
        moves: [
          {
            name: "Laser Beam",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage. `
            },
            minReq: 0,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*2, index, 2);
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Bombard",
            cost: "2",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage. `
            },
            minReq: 2,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, 2);
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Reload",
            cost: "4",
            text: (state, index, array) => {
              return `Gain ${array[index].baseBlock + array[index].dex} block. Gain ${Math.ceil(array[index].baseScale/2)} strength`
            },
            minReq: 4,
            energyChange: "-4",
            action: async (stateObj, index, array) => {
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].strength += Math.ceil(array[index].baseScale/2);
                newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex;
              })
              stateObj = await opponentLoseEnergy(stateObj, 4, index);
              return stateObj;
            }
          }
        ]
      },

      h5: {
        name: "Deflate",
        type: "Air",
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
        Level: 1,
        maxHP: opponentMaxHP*11,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*11,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        deflate: 5,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/hard/airdemon1.png",
        powers: [{
            name: "Power: Deflate",
            text:  `Loses 1 energy after taking 5 unblocked damage`
          }],
        moves: [
          {
            name: "Gain Altitude",
            cost: "0",
            text: (state, index, array) => {
              return `Gain ${(array[index].baseBlock*2) + array[index].dex} block. Deal ${(array[index].baseDamage) + array[index].strength} damage`
            },
            minReq: 0,
            energyChange: "+5",
            action: async (stateObj, index, array) => {
              stateObj = immer.produce(state, (newState) => {
                newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock*2)  + array[index].dex);
              })
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage), index, 5)

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
            name: false,
          },
          {
            name: "Dive Bomb",
            cost: "5",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*4) + 2 + array[index].strength} damage.`
            },
            minReq: 5,
            energyChange: "-5",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 2, index, -5);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].dex += array[index].baseScale;
              })
              return stateObj;
            }
          }
        ]
      },

      h6: {
        name: "Strength on Block",
        type: "Water",
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
        Level: 1,
        maxHP: opponentMaxHP*10,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*10,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        strengthOnBlock: 1,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/hard/poke1.png",
        powers: [{
            name: "Power: Embodied",
            text:  `Gains 1 strength whenever your monster gains block`
          }],
        moves: [
          {
            name: "Splash",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage. `
            },
            minReq: 0,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+3, index, 2);
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
            name: "Ice Shield",
            cost: "4",
            text: (state, index, array) => {
              return `Gain ${(array[index].baseBlock) + array[index].dex} block. Gain ${array[index].baseScale + 2} dexterity.`
            },
            minReq: 4,
            energyChange: "-4",
            action: async (stateObj, index, array) => {
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].encounterBlock += array[index].baseBlock + array[index].dex; 
                newState.opponentMonster[index].dex += 5;
              })
              stateObj = await opponentLoseEnergy(stateObj, 4, index)
              return stateObj;
            }
          }
        ]
      },

      h7: {
        name: "Deflate",
        type: "Air",
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
        Level: 1,
        maxHP: opponentMaxHP*14,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*14,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        deflate: 5,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/hard/airdragon2.png",
        powers: [{
            name: "Power: Deflate",
            text:  `Loses 1 energy after taking 5 unblocked damage`
          }],
        moves: [
          {
            name: "Clamp Down",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${array[index].baseDamage + 1 + array[index].strength} damage`
            },
            minReq: 0,
            energyChange: "+5",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage + 1, index, 5)
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
            name: "Shake Jaws",
            cost: "3",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage) + 6 + array[index].strength} damage`
            },
            minReq: 3,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage) + 6, index, 2)
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Crushing Bite",
            cost: "5",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*4) + 2 + array[index].strength} damage.`
            },
            minReq: 5,
            energyChange: "-5",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 2, index, -5);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].dex += array[index].baseScale;
              })
              return stateObj;
            }
          }
        ]
      },

      h8: {
        name: "Heal Full",
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
        avatar: "img/hard/evilplant.png",
        moves: [
          {
            name: "Regrow",
            cost: "0",
            text: (state, index, array) => {
              return `Heal 25 health`
            },
            minReq: 0,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await opponentGainEnergy(stateObj, 1, index)
              stateObj = await healOpponent(stateObj, 25, index)
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
            name: "Seed Eruption",
            cost: "3",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*4) + 4 + array[index].strength} damage`
            },
            minReq: 3,
            energyChange: "-3",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 4, index, -3);
              return stateObj;
            }
          },
    ]
  },

  h9: {
    name: "Energy Drain",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    maxHP: opponentMaxHP*12,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*12,
    strength: 0,
    dex: 1,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/hard/electricbee.png",
    moves: [
      {
        name: "Stinger Jab",
        cost: "0",
        energyChange: "+1",
        text: (state, index, array) => {
          return ` Deal ${(array[index].baseDamage*2) + 2 + array[index].strength} damage. Drain 1 energy`
        },
        minReq: 0,
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2) + 2, index, 1);
          stateObj = immer.produce(state, (newState) => {
            if (newState.playerMonster.encounterEnergy > 0) {
              newState.playerMonster.encounterEnergy -= 1
            }
            })
          return stateObj;
        }
      },
      {
        name: false,
      },
      {
        name: "Electrocute",
        cost: "2",
        energyChange: "+1",
        text: (state, index, array) => {
          return `Drain all of your energy. Gain 5 strength`
        },
        minReq: 2,
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage + 2), index, 1);
          stateObj = immer.produce(state, (newState) => {
            newState.playerMonster.encounterEnergy = 0;
            newState.opponentMonster[index].strength += 5;
            })
          return stateObj;
        }
      },
      {
        name: "Dive Bomb",
        cost: "3",
        energyChange: "-3",
        text: (state, index, array) => {
          return ` Deal ${(array[index].baseDamage*3) + array[index].strength} damage`
        },
        minReq: 3,
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage *3), index, -3);
          return stateObj;
        }
      }
    ]
  },

  h10: {
    name: "Energize",
    type: "Air",
    Level: 1,
    XPGain: opponentXPGain,
    goldOnDefeat: Math.floor(opponentGold*2),
    maxHP: opponentMaxHP*10,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: opponentMaxHP*10,
    strength: 0,
    dex: 1,
    drown: 0,
    hunted: 0,
    poison: 0,
    baseDamage: opponentBaseDamage,
    baseBlock: opponentBaseBlock,
    baseScale: 0,
    baseHeal: 0,
    avatar: "img/hard/evilstork.png",
    moves: [
      {
        name: "Energize",
        cost: "0",
        energyChange: "+3",
        text: (state, index, array) => {
          return `All monsters gain 3 energy`
        },
        minReq: 0,
        action: async (stateObj, index, array) => {
          
          stateObj = immer.produce(state, (newState) => {
              newState.playerMonster.encounterEnergy += 3
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
        name: "Triple Claws",
        cost: "3",
        energyChange: "-3",
        text: (state, index, array) => {
          return `Deal ${array[index].baseDamage + 3 + array[index].strength} damage 3 times`
        },
        minReq: 3,
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage + 3), index, -3);
          return stateObj;
        }
      }
    ]
  },

























      m4: {
        name: "Enrage H2",
        type: "Fire",
        XPGain: opponentXPGain*2,
        goldOnDefeat: Math.floor(opponentGold*3),
        Level: 1,
        maxHP: opponentMaxHP*9,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*9,
        enrage: 2,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/evilfirebaby.png",
        powers: [{
          name: "Power: Enrage",
          text:  `Gains 2 strength after taking unblocked damage`
        }],
        moves: [
          {
            name: "Fiery Slap",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${array[index].baseDamage + 2 + array[index].strength} damage.`
            },
            minReq: 0,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = dealPlayerDamage(stateObj, array[index].baseDamage+2, index, 1)
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
            name: "Payback",
            cost: "3",
            text: (state, index, array) => {
                return `Deal ${Math.floor(array[index].baseDamage-3) + array[index].strength} damage for each time you've taken unblocked attack damage (${state.fightDamageCount})`
            },
            minReq: 3,
            energyChange: "-3",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-3), index, -3, stateObj.fightDamageCount);
              return stateObj;
            }
          }
        ]
    },

    m6: {
      name: "Sindur M6",
      type: "fire",
      XPGain: opponentXPGain*2,
      goldOnDefeat: Math.floor(opponentGold*3),
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
      poison: 0,
      avatar: "img/watersprite.png",
      moves: [
        {
          name: "Rising Tide",
          cost: "0",
          text: (state, index, array) => {
            return `Deal ${array[index].baseDamage +3+ array[index].strength} damage. Gain ${array[index].baseScale} strength`
          },
          minReq: 0,
          energyChange: "+1",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+3, index, 1);
            stateObj = immer.produce(stateObj, (newState) => {
              newState.opponentMonster[index].strength += array[index].baseScale;
            })
            return stateObj;
          }
        },
        {
          name: false,
        },
        {
          name: "Water Jets",
          cost: "2",
          text: (state, index, array) => {
            return `Deal strength damage (${array[index].strength}) twice `
          },
          minReq: 2,
          energyChange: "+1",
          action: async (stateObj, monsterIndex, array) => {
            stateObj = await dealPlayerDamage(stateObj, 0, monsterIndex, energyChange=1, attackNumber=2);
            return stateObj;
          }
        },
        {
          name: "Sea Wall",
          cost: "3",
          text: (state, index, array) => {
            return `Gain (${1+(array[index].baseBlock*2)}) block `
          },
          minReq: 3,
          energyChange: "+1",
          action: async (stateObj, index, array) => {
            stateObj = immer.produce(stateObj, (newState) => {
              newState.opponentMonster[index].encounterBlock += 1+(array[index].baseBlock*2);
            })
            stateObj = await opponentGainEnergy(stateObj, 1, index)
            return stateObj;
          }
        },
        {
          name: "Tsunami",
          cost: "4",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 3) + array[index].strength} damage.`
          },
          minReq: 4,
          energyChange: "-4",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2), index, energyChange=-4);
            return stateObj;
          }
        },
      ]
    },

}