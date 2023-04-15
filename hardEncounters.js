let hardEncounters = {
    h1: {
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
        XPGain: opponentXPGain,
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
        avatar: "img/littleturtle2.png",
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
              stateObj = dealPlayerDamage(stateObj, array[index].baseDamage+3, index, +1)
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
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(newState, array[index].baseDamage, index, 2);
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
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, 0, index, -5, 2);
              return stateObj;
            }
          }
        ]
      },
}