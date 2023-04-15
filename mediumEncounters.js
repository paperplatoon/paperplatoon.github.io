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
        avatar: "img/waterdevil.png",
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
              return `Deal ${Math.floor((array[index].baseDamage/2)) + array[index].strength} damage 5 times`
            },
            minReq: 4,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor((array[index].baseDamage/2)), index, 2, 5);
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
        avatar: "img/dracula.png",
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
            name: "Balloon Shield",
            cost: "0",
            text: (state, index, array) => {
              return `Gain ${(array[index].baseBlock*2) + array[index].dex} block`
            },
            minReq: 0,
            energyChange: "+2",
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock*2)  + array[index].dex);
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
            name: "Explosion",
            cost: "4",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*4) + 2 + array[index].strength} damage.`
            },
            minReq: 4,
            energyChange: "-4",
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
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*3),
        goldOnDefeat: 10,
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
        avatar: "img/littleturtle2.png",
        powers: [{
          name: "Power: Enrage",
          text:  `Gains 2 strength after taking unblocked damage`
        }],
        moves: [
          {
            name: "Fiery Slap",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${array[index].baseDamage + 1 + array[index].strength} damage.`
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
}






















let mediumMultiEncounters = {
    wind1: {
        name: "Multi-enemy 1",
        type: "Air",
        Level: 1,
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*3),
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
        avatar: "img/airmask.png",
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

      wind2: {
        name: "Wind2",
        type: "Air",
        Level: 1,
        XPGain: opponentXPGain,
        goldOnDefeat: Math.floor(opponentGold*3),
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
        avatar: "img/airmask.png",
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

}