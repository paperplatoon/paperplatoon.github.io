//return `Deal ${5 + array[index].strength} damage. Restore 5 health`
//randomize some stuff like strength and dex (maybe starting energy) to change stuff up a bit

let opponentBaseDamage = 5;
let opponentBaseBlock = 6;
let opponentBaseHeal = 6;
let opponentBaseScale = 3;
let opponentMaxHP = 5;
let opponentXPGain = 5;
let opponentGold = 5;

let opponentMonsters = {

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
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 2) + 1, index, energyChange=-5);
          return stateObj;
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
        action: (stateObj, index, array) => {
          stateObj = healOpponent(stateObj, array[index].baseHeal, index, 1)
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
        name: "Seed Explosion",
        cost: "3",
        text: (state, index, array) => {
          return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage`
        },
        minReq: 3,
        energyChange: "-3",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*3, index, -3);
          return stateObj;
        }
      },
    ]
  },

      healgymguard2: {
        name: "Heal Gym Guard",
        type: "Air",
        XPGain: opponentXPGain,
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
            action: (stateObj, index, array) => {
              stateObj = healOpponent(stateObj, array[index].baseHeal, index, 1)
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
              return `Deal ${(array[index].baseDamage*3) + array[index].strength} damage`
            },
            minReq: 2,
            energyChange: "-2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage*3), index, -2);
              return stateObj;
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
    baseHeal: opponentBaseHeal,
    avatar: "img/earthpsycho.png",
    moves: [
      {
        name: "Acid Floor",
        cost: "0",
        text: (state, index, array) => {
          //maybe scale health restore for a later fight???
          return `Deal ${(array[index].baseDamage*2) + array[index].strength} damage to ALL creatures. Heal ${(array[index].baseHeal)} health`
        },
        minReq: 0,
        energyChange: "+4",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, array[index].baseDamage*2, index, 4);
          stateObj = immer.produce(stateObj, (newState) => {
            let calculatedDamage = (array[index].baseDamage*2) + array[index].strength;
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
          })
          stateObj = healOpponent(stateObj, array[index].baseHeal, index, 4)
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
        name: "Unleash Growth",
        cost: "4",
        text: (state, index, array) => {
          return `Deal damage equal to the total amount healed this fight (${state.enemyFightHealTotal + array[index].strength})`
        },
        minReq: 4,
        energyChange: "-4",
        action: async (stateObj, index, array) => {
          stateObj = await dealPlayerDamage(stateObj, state.enemyFightHealTotal, index, -4);
          return stateObj;
        }
      },

    ]
  },      
}








