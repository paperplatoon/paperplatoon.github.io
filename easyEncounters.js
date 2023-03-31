let easyEncounters = {
    e1: {
        name: "Strength E1",
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
            energyChange: "+2",
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                let tempState = dealPlayerDamage(newState, Math.floor(array[index].baseDamage/4), index, 4);
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
            name: "Power Up",
            cost: "2",
            text: (state, index, array) => {
                return `Gain ${array[index].baseBlock - 2 + array[index].dex} block. Gain ${Math.floor(array[index].baseScale/3)} strength`
            },
            minReq: 2,
            energyChange: "-2",
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                newState.opponentMonster[index].encounterBlock += array[index].baseBlock - 2 + array[index].dex;
                newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
                newState.opponentMonster[index].encounterEnergy -= 2;
              })
              return toChangeState;
            }
          },
        ]
      },

      e2: {
        name: "Balance E2",
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
            energyChange: "+2",
            action: (stateObj, index, array) => {
              console.log("playing study openings")
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].encounterBlock += ((array[index].baseBlock)  + array[index].dex);
                newState.opponentMonster[index].strength += array[index].baseScale;
                newState.opponentMonster[index].encounterEnergy += 2;
              })
              return stateObj;
            }
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
            minReq: 2,
            energyChange: "-2",
            action: (stateObj, index, array) => {
              console.log("playing graceful strike")
              stateObj = dealPlayerDamage(stateObj, array[index].baseDamage, index, -2);
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].dex += Math.ceil(array[index].baseScale/2);
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
        maxHP: opponentMaxHP*7,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*7,
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
            action: (state, index, array) => {
              let toChangeState = immer.produce(state, (newState) => {
                let tempState = dealPlayerDamage(newState, (array[index].baseDamage*2)+2, index);
                newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
                newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
                newState.opponentMonster[index].encounterEnergy -= 2;
              })
              return toChangeState;
            }
          },
    ]
  },
}

let easyEncountersMjs = [
    {
      opponents: [easyEncounters.e1],
      goldReward: 15,
    },
    {
      opponents: [easyEncounters.e2],
      goldReward: 15,
    },
    {
      opponents: [easyEncounters.e3],
      goldReward: 15,
    },
  ]