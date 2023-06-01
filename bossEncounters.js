let bossMonsters = {
  boss1: {
      name: "Deflate Boss",
      type: "Air",
      Level: 1,
      XPGain: opponentXPGain*3,
      goldOnDefeat: Math.floor(opponentGold*10),
      maxHP: opponentMaxHP*25,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*25,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      deflate: 10,
      boss: true,
      baseDamage: opponentBaseDamage,
      baseScale: opponentBaseScale,
      baseBlock: opponentBaseBlock,
      baseHeal: 0,
      avatar: "img/boss/thundercloud.png",
      powers: [{
        name: "Power: Deflate",
        text:  `Loses 1 energy after taking 10+ unblocked damage at once`
      }],
      moves: [
        {
          name: "Storm Gust",
          cost: "0",
          energyChange: "+2",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage*2) + 2 + array[index].strength} damage. Gain ${Math.floor(array[index].baseScale/3)} strength`
          },

          minReq: 0,
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage*2)+2, index, 2)
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
            return `Deal ${(Math.floor(array[index].baseDamage/5)+1) + array[index].strength} damage 5 times.`
          },
          minReq: 6,
          energyChange: "-6",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage/5)+1, index, energyChange=-6, 5);
            return stateObj;
          }
        }

      ]
    },

    boss2: {
      name: "Angry Boss",
      type: "Fire",
      Level: 1,
      XPGain: opponentXPGain*3,
      goldOnDefeat: Math.floor(opponentGold*10),
      maxHP: opponentMaxHP*21,
      encounterEnergy: 0,
      opponentMoveIndex: false,
      currentHP: opponentMaxHP*21,
      strength: 0,
      dex: 0,
      drown: 0,
      hunted: 0,
      poison: 0,
      angry: true,
      boss: true,
      baseDamage: opponentBaseDamage,
      baseScale: opponentBaseScale,
      baseBlock: opponentBaseBlock,
      baseHeal: 0,
      avatar: "img/boss/firedragon.png",
      powers: [{
        name: "Power: Angry",
        text:  `Whenever this creature receives unblocked attack damage, gain 1 energy`
      }],
      moves: [
        {
          name: "Tail Swipes",
          cost: "0",
          energyChange: "0",
          text: (state, index, array) => {
            return `Deal ${(array[index].baseDamage-2) + array[index].strength} damage 4 times`
          },

          minReq: 0,
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage-2), index, 0, 4)
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
          name: "Inferno",
          cost: "7",
          text: (state, index, array) => {
            return `Deal ${(Math.floor(array[index].baseDamage*5)) + array[index].strength} damage`
          },
          minReq: 7,
          energyChange: "-7",
          action: async (stateObj, index, array) => {
            stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 5), index, energyChange=-7);
            return stateObj;
          }
        }

      ]
    },

    boss3: {
        name: "Off-balance Boss",
        type: "Air",
        Level: 1,
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*10),
        maxHP: opponentMaxHP*28,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*28,
        strength: 0,
        dex: 0,
        drown: 0,
        hunted: 0,
        poison: 0,
        offbalance: true,
        boss: true,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseBlock: opponentBaseBlock,
        baseHeal: 0,
        avatar: "img/boss/swordbird.png",
        powers: [{
          name: "Power: Double-edged",
          text:  `Whenever you fully block an attack from this monster, reflect it`
        }],
        moves: [
          {
            name: "Lunging Punch",
            cost: "0",
            energyChange: "+1",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*2)+2 + array[index].strength} damage`
            },
  
            minReq: 0,
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage*2)+2, index, 1)
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Lunging Kick",
            cost: "2",
            energyChange: "+2",
            text: (state, index, array) => {
              return `Deal ${(array[index].baseDamage*3) + 3 + array[index].strength} damage`
            },
  
            minReq: 2,
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage (stateObj, (array[index].baseDamage*3), index, 2)
              return stateObj;
            }
          },
          {
            name: false,
          },
          {
            name: "Spinning Jump Kick",
            cost: "4",
            text: (state, index, array) => {
              return `Deal ${(Math.floor(array[index].baseDamage*6)) + array[index].strength} damage`
            },
            minReq: 4,
            energyChange: "-4",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, (array[index].baseDamage * 6), index, energyChange=-4);
              return stateObj;
            }
          }
        ]
      },

      boss4: {
        name: "Strength on Block Boss",
        type: "Air",
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
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
        strengthOnBlock: 1,
        baseBlock: opponentBaseBlock,
        baseDamage: opponentBaseDamage,
        baseScale: opponentBaseScale,
        baseHeal: 0,
        avatar: "img/boss/flamingbear.png",
        powers: [{
            name: "Power: Embodied",
            text:  `Gains 1 strength whenever your monster gains block`
          }],
        moves: [
          {
            name: "Flaming Claws",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${Math.floor(array[index].baseDamage/4) + array[index].strength} damage 4 times`
            },
            minReq: -99,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, 2, 4);
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
            name: "Rear Up",
            cost: "4",
            text: (state, index, array) => {
              return `Gain ${Math.floor(array[index].baseScale/3)} strength. `
            },
            minReq: 4,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
              })
              stateObj = await opponentGainEnergy(stateObj, 1, index)
              return stateObj;
            }
          },
          {
            name: "Fire Slam",
            cost: "5",
            text: (state, index, array) => {
              return `Deal ${Math.floor(array[index].baseDamage*6) + array[index].strength} damage` 
            },
            minReq: 5,
            energyChange: "-5",
            action: async (stateObj, index, array) => {
              stateObj = dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*6), index, -5)
              return stateObj;
            }
          }
        ]
      },

      boss5: {
        name: "Air Clock Boss",
        type: "Air",
        XPGain: opponentXPGain*3,
        goldOnDefeat: Math.floor(opponentGold*5),
        Level: 1,
        maxHP: opponentMaxHP*25,
        encounterEnergy: 0,
        opponentMoveIndex: false,
        currentHP: opponentMaxHP*25,
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
        avatar: "img/boss/silverdragon.png",
        moves: [
          {
            name: "Ticking Clock",
            cost: "0",
            text: (state, index, array) => {
                return `Deal ${(array[index].baseDamage + array[index].strength) * state.combatTurnNumber} damage. Drain 1 energy`
            },
            minReq: -99,
            energyChange: "+2",
            action: async (stateObj, index, array) => {
              stateObj = await dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage/4), index, 2, 4);
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
            name: "Lightning Cloud",
            cost: "4",
            text: (state, index, array) => {
              return `Drain 2 energy`
            },
            minReq: 4,
            energyChange: "+1",
            action: async (stateObj, index, array) => {
              stateObj = immer.produce(stateObj, (newState) => {
                newState.opponentMonster[index].strength += Math.floor(array[index].baseScale/3);
              })
              stateObj = await opponentGainEnergy(stateObj, 1, index)
              return stateObj;
            }
          },
          {
            name: "Thunderstorm",
            cost: "5",
            text: (state, index, array) => {
              return `Deal ${Math.floor(array[index].baseDamage*6) + array[index].strength} damage` 
            },
            minReq: 5,
            energyChange: "-5",
            action: async (stateObj, index, array) => {
              stateObj = dealPlayerDamage(stateObj, Math.floor(array[index].baseDamage*6), index, -5)
              return stateObj;
            }
          }
        ]
      },

      healgymguard2: {
        name: "Heal Gym Guard",
        type: "Air",
        XPGain: opponentXPGain,
        Level: 1,
        maxHP: opponentMaxHP*10,
        goldOnDefeat: Math.floor(opponentGold*3),
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
    goldOnDefeat: Math.floor(opponentGold*8),
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
    avatar: "img/boss/tree1.png",
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