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
    goldOnDefeat: Math.floor(opponentGold*4),
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
    goldOnDefeat: Math.floor(opponentGold*3),
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

            
}








