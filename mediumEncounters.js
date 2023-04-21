let mediumSoloEncounters = {
      m1: {
        name: "Heal Gym Disciple",
        type: "Air",
        XPGain: opponentXPGain*2,
        goldOnDefeat: Math.floor(opponentGold*3),
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
        avatar: "img/cuteearthbad.png",
        moves: [
          {
            name: "Replenish",
            cost: "0",
            text: (stateObj, index, array) => {
              return `Restore ${array[index].baseHeal} health`
            },
            minReq: 0,
            energyChange: "+2",
            action: (stateObj, index, array) => {
              stateObj = healOpponent(stateObj, array[index].baseHeal, index, 2)
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
            name: "Shield Throw",
            cost: "4",
            text: (state, index, array) => {
              return `Deal ${Math.floor(array[index].baseDamage*2) + 2 + array[index].strength} damage`
            },
            minReq: 4,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*2) + 2, index, 2);
              return stateObj;
            }
          },
          {
            name: false,
          },
    
          {
            name: "Mega Drain",
            cost: "6",
            text: (state, index, array) => {
              return `Deal ${(3 * array[index].baseDamage) + array[index].strength} damage. Restore ${array[index].baseHeal} health`
            },
            minReq: 6,
            energyChange: "-6",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (3 * array[index].baseDamage), index, -6);
              stateObj = healOpponent(stateObj, array[index].baseHeal, index)
              return stateObj;
            }
          }
        ]
      },

      m2: {
        name: "Block Gym Disciple",
        type: "Air",
        XPGain: opponentXPGain*2,
        goldOnDefeat: Math.floor(opponentGold*3),
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
        avatar: "img/airmask.png",
        moves: [
          {
            name: "Balloon Shield",
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
            name: "Explosive Pop",
            cost: "3",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*2) + array[index].dex + array[index].strength} damage. Gain ${array[index].baseScale} dexterity. Increases off Dexterity`
            },
            minReq: 3,
            energyChange: "-3",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, ((array[index].baseDamage*2) + array[index].dex), index, -3);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].dex += array[index].baseScale;
              })
              return stateObj;
            }
          }
        ]
      },

      m3: {
        name: "Block Deflate",
        type: "Air",
        XPGain: opponentXPGain*2,
        goldOnDefeat: Math.floor(opponentGold*3),
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
        deflate: 5,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/dracula.png",
        powers: [{
            name: "Power: Deflate",
            text:  `Loses 1 energy after taking 5 unblocked damage`
          }],
        moves: [
          {
            name: "Spiked Shield",
            cost: "0",
            text: (state, index, array) => {
              return `Deal ${array[index].baseDamage+1 + array[index].strength} damage`
            },
            minReq: 0,
            energyChange: "+5",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage+1, index, 5)
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
            name: "Explosion",
            cost: "5",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*3) + 3 + array[index].strength} damage.`
            },
            minReq: 5,
            energyChange: "-5",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*4) + 2, index, -4);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].dex += array[index].baseScale;
              })
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
        maxHP: opponentMaxHP*10,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*10,
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
              stateObj = dealPlayerDamage(stateObj, array[index].baseDamage+2, index, +1)
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
            cost: "2",
            text: (state, index, array) => {
                return `Deal ${Math.floor(array[index].baseDamage-3) - array[index].strength} damage for each time you've taken unblocked attack damage (${state.fightDamageCount})`
            },
            minReq: 2,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-3), index, 1, stateObj.fightDamageCount);
              return stateObj;
            }
          }
        ]
    },

    m5: {
      name: "Strength m5",
      type: "Fire",
      XPGain: opponentXPGain*2,
      goldOnDefeat: Math.floor(opponentGold*3),
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
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*2), index, 3);
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
            return `Deal ${array[index].baseDamage + array[index].strength} damage. Gain ${array[index].baseScale} strength`
          },
          minReq: 0,
          energyChange: "+1",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, 1);
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
            stateObj = await dealPlayerDamage(stateObj, 0, monsterIndex, 1, attackNumber=2);
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
          action: (state, index, array) => {
            let toChangeState = immer.produce(state, (newState) => {
              newState.opponentMonster[index].encounterBlock += 1+(array[index].baseBlock*2);
              newState.opponentMonster[index].encounterEnergy += 1;
            })
            return toChangeState;
          }
        },
        {
          name: "Tsunami",
          cost: "4",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage * 2) + array[index].strength} damage.`
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

    m7: {
      name: "Balance M7",
      type: "Air",
      XPGain: opponentXPGain*2,
      goldOnDefeat: Math.floor(opponentGold*3),
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
      avatar: "img/firedeviant.png",
      moves: [
        {
          name: "Fiery Slap",
          cost: "0",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage. Gain ${Math.ceil(array[index].baseScale/2)} dexterity`
          },
          minReq: 0,
          energyChange: "+1",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*2, index, 2);
            stateObj = immer.produce(stateObj, (newState) => {
              newState.opponentMonster[index].dex += Math.ceil(array[index].baseScale/2);
            })
            return stateObj;
          }
        },
        {
          name: false,
        },
        {
          name: "Channel",
          cost: "2",
          text: (state, index, array) => {
            return `Gain ${(array[index].baseBlock) + array[index].dex} block. Gain ${array[index].baseScale} Strength & Dexterity`
          },
          minReq: 2,
          energyChange: "+2",
          action: (stateObj, index, array) => {
            stateObj = immer.produce(stateObj, (newState) => {
              newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock)  + array[index].dex);
              newState.opponentMonster[index].strength += array[index].baseScale;
              newState.opponentMonster[index].dex += array[index].baseScale;
              newState.opponentMonster[index].encounterEnergy -= 4;
            })
            return stateObj;
          }
        }  ,
        {
          name: false,
        },
        {
          name: "Burning Lance",
          cost: "4",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage. You lose 1 dexterity`
          },
          minReq: 4,
          energyChange: "-4",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*2, index, -4);
            stateObj = immer.produce(stateObj, (newState) => {
              newState.playerMonster.dex -= 1;
            })
            return stateObj;
          }
        }    
      ]
    },

    m8: {
      name: "Prickles E6",
      type: "Fire",
      XPGain: opponentXPGain*2,
      goldOnDefeat: Math.floor(opponentGold*3),
      Level: 1,
      maxHP: opponentMaxHP*10,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*10,
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
      avatar: "img/turtle3.png",
      powers: [{
        name: "Power: Prickles",
        text:  `Take 2 damage when attacking this enemy`
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
  
    m9: {
      name: "Shakedown E7",
      type: "Fire",
      XPGain: opponentXPGain*2,
      goldOnDefeat: Math.floor(opponentGold*3),
      Level: 1,
      maxHP: opponentMaxHP*10,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*10,
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
        text:  `Gain 1 gold each time you deal unblocked attack damage to this enemy`
      }],
      moves: [
        {
          name: "Fiery Slap",
          cost: "0",
          text: (state, index, array) => {
              return `Deal ${array[index].baseDamage+1 + array[index].strength} damage.`
          },
          minReq: 0,
          energyChange: "+1",
          action: async (stateObj, index, array) => {
            stateObj = dealPlayerDamage(stateObj, array[index].baseDamage+1, index, +1)
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
              return `Deal ${Math.floor(array[index].baseDamage-2) + array[index].strength} damage for each time this enemy has lost HP (${state.fightDamageCount}).`
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
          name: "Golden Claw",
          cost: "5",
          text: (state, index, array) => {
              return `Deal ${array[index].baseDamage + array[index].strength} damage 3 times. Steal 20 gold`
          },
          minReq: 5,
          energyChange: "-5",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage, index, -5, 3);
            stateObj = immer.produce(staetObj, (newState) => {
              if (stateObj.gold > 20) {
                newState.gold -= 20
              } else {
                newState.gold = 0
              }
            })
            return stateObj;
          }
        },
      ]
    },
  
    m10: {
      name: "Enrage E8",
      type: "Fire",
      XPGain: opponentXPGain*2,
      goldOnDefeat: Math.floor(opponentGold*3),
      Level: 1,
      maxHP: opponentMaxHP*10,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*10,
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
      avatar: "img/cat1.png",
      powers: [{
        name: "Power: Enrage",
        text:  `Gains 2 strength after taking unblocked damage`
      }],
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
            stateObj = dealPlayerDamage(stateObj, array[index].baseDamage, index, +1)
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
              return `Deal ${Math.floor(array[index].baseDamage-2)} damage for each time taking unblocked damage (${state.fightDamageCount}). Unaffected by strength`
          },
          minReq: 2,
          energyChange: "+1",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage-2) - array[index].strength, index, 1, stateObj.fightDamageCount);
            return stateObj;
          }
        },
        {
          name: false,
        },
        {
          name: "Unleash",
          cost: "4",
          text: (state, index, array) => {
              return `Deal damage equal to total HP lost (${state.fightDamageTotal}). Unaffected by strength`
          },
          minReq: 4,
          energyChange: "-4",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, stateObj.fightDamageTotal-array[index].strength, index, -4);
            return stateObj;
          }
        },
      ]
    },
}






















let mediumMultiEncounters = {
    mm1: {
        name: "Wind MM1",
        type: "Air",
        Level: 1,
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*2),
        maxHP: opponentMaxHP*7,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*7,
        strength: 0,
        dex: 3,
        drown: 0,
        hunted: 0,
        poison: 0,
        baseDamage: opponentBaseDamage,
        baseBlock: opponentBaseBlock,
        baseScale: 0,
        baseHeal: 0,
        avatar: "img/bird1.png",
        moves: [
          {
            name: "Wind Shield",
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
            name: "Gust",
            cost: "2",
            energyChange: "-2",
            text: (state, index, array) => {
              return ` Deal ${(array[index].baseDamage * 2) + 3 + array[index].strength} damage`
            },
            minReq: 2,
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 2) + 3, index, -2);
              return stateObj;
            }
          }
        ]
      },

      mm2: {
        name: "Wind MM2",
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
        avatar: "img/icetorch.png",
        moves: [
          {
            name: "Wind Shield",
            cost: "0",
            text: (state, index, array) => {
              return `All enemies gain +${Math.floor((array[index].baseBlock)) + array[index].dex} block`
            },
            minReq: 0,
            energyChange: "+1",
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                newState.opponentMonster.forEach(function (monsterObj) {
                  monsterObj.encounterBlock += (Math.floor(array[index].baseBlock) + array[index].dex);
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
            name: "Windstorm",
            cost: "3",
            energyChange: "-3",
            text: (state, index, array) => {
              return ` Deal ${array[index].baseDamage + 3 + array[index].strength} damage. Lose 1 dexterity`
            },
            minReq: 3,
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 2) + 3, index, -3);
              stateObj = immer.produce(state, (newState) => {
                newState.playerMonster.dex -= 1;
                })
              return stateObj;
            }
          }
        ]
      },

      mm3: {
        name: "Strength MM3",
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
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, 1, 4);
              return stateObj;
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
}