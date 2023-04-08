
let bossMonsters = {
  deflateboss: {
      name: "Deflate Boss",
      type: "Air",
      Level: 1,
      XPGain: opponentXPGain*3,
      maxHP: opponentMaxHP*16,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*16,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      deflate: 10,
      baseDamage: opponentBaseDamage,
      baseScale: opponentBaseScale,
      baseBlock: opponentBaseBlock,
      baseHeal: 0,
      avatar: "img/icetorch.png",
      powers: [{
        name: "Power: Deflate",
        text:  `Whenever an attack deals 10 or more damage, remove 1 energy`
      }],
      moves: [
        {
          name: "Evaluate",
          cost: "0",
          energyChange: "+2",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage+1) + array[index].strength} damage. Gain ${Math.floor(array[index].baseScale/3)} strength`
          },

          minReq: 0,
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage*2), index, 2)
            stateObj = immer.produce(stateObj, (newState) => {
              newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
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
          name: "Meteor Shower",
          cost: "6",
          text: (state, index, array) => {
            return `Deal ${(Math.floor(array[index].baseDamage/5)) + array[index].strength} damage 5 times.`
          },
          minReq: 6,
          energyChange: "-6",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage/5), index, energyChange=-6, 5);
            return stateObj;
          }
        }

      ]
    },

    angryboss: {
      name: "Angry Boss",
      type: "Air",
      Level: 1,
      XPGain: opponentXPGain*3,
      maxHP: opponentMaxHP*8,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*8,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      angry: true,
      baseDamage: opponentBaseDamage,
      baseScale: opponentBaseScale,
      baseBlock: opponentBaseBlock,
      baseHeal: 0,
      avatar: "img/icetorch.png",
      powers: [{
        name: "Power: Angry",
        text:  `Whenever this creature receives unblocked attack damage, gain 1 energy`
      }],
      moves: [
        {
          name: "Icicle Spears",
          cost: "0",
          energyChange: "0",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage-2) + array[index].strength} damage 3 times`
          },

          minReq: 0,
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage-2), index, 0, 3)
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
          name: false,
        },
        {
          name: "Avalanche",
          cost: "7",
          text: (state, index, array) => {
            return `Deal ${(Math.floor(array[index].baseDamage*7)) + array[index].strength} damage`
          },
          minReq: 7,
          energyChange: "-7",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 7), index, energyChange=-7);
            return stateObj;
          }
        }

      ]
    },
}