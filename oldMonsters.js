let playerMonsters = {

  default: {
    name: "Default",
    type: "fire",
    encounterEnergy: 0,
    opponentMoveIndex: false,
    cardPool: fireCardPool,
    maxHP: 45,
    currentHP: 45,
    strength: 0,
    dex: 0,
    tempStrength: 0,
    tempDex: 0,
    fightStrength: 0,
    fightDex: 0,
    turnEnergy: 3,
    avatar: "img/fireMonster.png",
    startingDeck: [
      //1 energy
    fireCardPool.fireEnergy,
    fireCardPool.fireEnergy,
    //5 block
    fireCardPool.essencedrain,
    fireCardPool.withdraw,
    fireCardPool.withdraw,
    fireCardPool.withdraw,
    fireCardPool.withdraw,
    // 5 attack
    fireCardPool.tackle,
    fireCardPool.energyburst,
    fireCardPool.tackle,
    fireCardPool.tackle,
    fireCardPool.tackle,

    ],
  },

  genner: {
    name: "Cards Per Turn",
    type: "fire",
    encounterEnergy: 0,
    opponentMoveIndex: false,
    cardPool: fireCardPool,
    maxHP: 45,
    currentHP: 45,
    strength: 0,
    dex: 0,
    tempStrength: 0,
    tempDex: 0,
    fightStrength: 0,
    fightDex: 0,
    turnEnergy: 3,
    avatar: "img/adorablefire.png",
    startingDeck: [
      //1 energy
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      //5 block
      fireCardPool.puffofsmoke,
      fireCardPool.withdraw,
      fireCardPool.withdraw,
      fireCardPool.withdraw,
      fireCardPool.sunlight,
      // 5 attack
      fireCardPool.tackle,
      fireCardPool.pirouettespin,
      fireCardPool.precisionstrike,
      fireCardPool.tackle,
      fireCardPool.brandingiron,
    ],
  },

    charles: {
      name: "Hard - scales over time",
      type: "fire",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      cardPool: fireCardPool,
      maxHP: 50,
      currentHP: 50,
      strength: 0,
      dex: 0,
      tempStrength: 0,
      tempDex: 0,
      fightStrength: 0,
      fightDex: 0,
      turnEnergy: 3,
      avatar: "img/flamingbaby.png",
      startingDeck: [
        //2 energy
        fireCardPool.fireEnergy,
        fireCardPool.fireEnergy,
        //5 attack
        fireCardPool.tackle,
        fireCardPool.tackle,
        fireCardPool.tackle,
        fireCardPool.gainstrength,
        fireCardPool.fierymissiles,
        //5 block
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,
        fireCardPool.withdraw,   
      ],
    },

    devCheat: {
      name: "Testing Mode",
      type: "fire",
      encounterEnergy: 0,
      opponentMoveIndex: false,
      cardPool: fireCardPool,
      maxHP: 50,
      currentHP: 50,
      strength: 0,
      dex: 0,
      tempStrength: 0,
      tempDex: 0,
      fightStrength: 0,
      fightDex: 0,
      turnEnergy: 3,
      avatar: "img/fireMonster.png",
      startingDeck: [
        fireCardPool.darkknowledge,
        fireCardPool.bloatedbomb,
        fireCardPool.hammerandtongs,
        fireCardPool.flamedome,
        specialCardPool.testkill,
        fireCardPool.setaflame
      ],
    },

    

    
  
  // swirly: {
  //   name: "Swirly",
  //   type: "Water",
  //   cardPool: waterCardPool,
  //   encounterEnergy: 0,
  //   opponentMoveIndex: false,
  //   maxHP: 100,
  //   currentHP: 100,
  //   strength: 0,
  //   dex: 0,
  //   tempStrength: 0,
  //   tempDex: 0,
  //   fightStrength: 0,
  //   fightDex: 0,
  //   turnEnergy: 3,
  //   avatar: "img/watertongue.png",
  //   startingDeck: [
  //     //1 energy
  //     waterCardPool.waterEnergy,
  //     //11 attacks
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.bodySlam,
  //     waterCardPool.gainDex,
  //     waterCardPool.cloakingFog,
  //     waterCardPool.huntPrey
  //   ]
  // },

  // poisonTest: {
  //   name: "Venom",
  //   type: "Water",
  //   cardPool: waterCardPool,
  //   encounterEnergy: 0,
  //   opponentMoveIndex: false,
  //   maxHP: 100,
  //   currentHP: 50,
  //   strength: 0,
  //   dex: 0,
  //   tempStrength: 0,
  //   tempDex: 0,
  //   fightStrength: 0,
  //   fightDex: 0,
  //   turnEnergy: 3,
  //   avatar: "img/watertongue.png",
  //   startingDeck: [
  //     //1 energy
  //     waterCardPool.waterEnergy,
  //     //11 attacks
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.withdraw,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.tackle,
  //     waterCardPool.pinprick,
  //     waterCardPool.poisonedblade,
  //     waterCardPool.venomshield

  //   ]
  // }
};

let oldMonsters= {
opponent1: {
    name: "Mr Bubbles",
    type: "water",
    maxHP: 60,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 60,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/waterdevil.png",
    moves: [
      {
        name: "Hibernate",
        cost: "0",
        text: "Gain 3 energy and 15 block",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 3;
            newState.opponentMonster[monsterIndex].encounterBlock += 15;
          })
          return toChangeState;
        }
      },

      {
        name: "Fury Strike",
        cost: "3",
        text: "Spend 3 energy. Deal 20 damage",
        minReq: 3,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
            let tempState = dealPlayerDamage(newState, 20, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },
    ]
  },

  opponent2: {
    name: "Mrs Bubbles",
    type: "water",
    maxHP: 60,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 60,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/waterpuddle.png",
    moves: [
      {
        name: "Charging Strike",
        cost: "0",
        text: "Deal 10 damage. Gain 1 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 1;
            let tempState = dealPlayerDamage(newState, 10, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },
      {
        name: "Erect Barrier",
        cost: "2",
        text: "Gain 2 energy. Deal 15 damage.",
        minReq: 2,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 2;
            let tempState = dealPlayerDamage(newState, 15, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },

      {
        name: "Total Vacation",
        cost: "10",
        text: "Spend 10 energy. Deal 40 damage.",
        minReq: 10,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy -= 10;
            let tempState = dealPlayerDamage(newState, 40, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },
    ]
  },

  opponent3: {
    name: "Treesia",
    type: "Earth",
    encounterEnergy: 0,
    opponentMoveIndex: false,
    maxHP: 80,
    currentHP: 80,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/earthevil.png",
    moves: [
      {
        name: "Regenerate",
        cost: "0",
        text: "Recover 10 health. Gain 1 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 1;
            if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 11)) {
              newState.opponentMonster[monsterIndex].currentHP += 10;
            } else {
              newState.opponentMonster[monsterIndex].currentHP = newState.opponentMonster[monsterIndex].maxHP;
            };
          })
          return toChangeState;
        }
      },

      {
        name: "Granite Skin",
        cost: "2",
        text: "Gain 20 block. Gain 2 energy",
        minReq: 2,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 2;
            newState.opponentMonster[monsterIndex].encounterBlock += 20;
          })
          return toChangeState;
        }
      },

      {
        name: "Eruption",
        cost: "5",
        text: "Deal 40 damage. Spend 5 energy.",
        minReq: 5,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 40, monsterIndex);
            newState.opponentMonster[monsterIndex].encounterEnergy -= 5;
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      }
    ]
  },

  opponent4: {
    name: "Skydancer",
    type: "air",
    maxHP: 45,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 45,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/firebaby.png",
    moves: [
      {
        name: "Backflip",
        cost: "0",
        text: "Gain 15 block. Gain 2 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 2;
            newState.opponentMonster[monsterIndex].encounterBlock += 15;
          })
          return toChangeState;
        }
      },
      {
        name: "Swift Jab",
        cost: "2",
        text: "Gain 15 block. Deal 10 damage. Gain 2 energy",
        minReq: 2,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 10, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[monsterIndex].encounterBlock += 15;
            newState.opponentMonster[monsterIndex].encounterEnergy += 2;
          })
          return toChangeState;
        }
      },

      {
        name: "Roundhouse Kick",
        cost: "6",
        text: "Gain 20 block. Deal 35 damage. Spend 5 energy",
        minReq: 6,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 35, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[monsterIndex].encounterBlock += 20;
            newState.opponentMonster[monsterIndex].encounterEnergy -= 5;
          })
          return toChangeState;
        }
      } 
    ]
  },

  opponent5: {
    name: "Sindur",
    type: "fire",
    maxHP: 100,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 100,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/firebeard.png",
    moves: [
      {
        name: "Coursing Flames",
        cost: "0",
        text: "Deal 10 damage. Gain 10 strength. Gain 1 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 1;
            let tempState = dealPlayerDamage(newState, 10, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[monsterIndex].strength += 10;
          })
          return toChangeState;
        }
      },
      {
        name: "Heat Discharge",
        cost: "2",
        text: "Spend 2 energy. Deal strength damage to the enemy twice. Lose all strength",
        minReq: 2,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 0, monsterIndex, 2);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[monsterIndex].encounterEnergy -= 2;
            newState.opponentMonster[monsterIndex].strength = 0;
          })
          return toChangeState;
        }
      }  
    ]
  },

  opponent6: {
    name: "Psyman",
    type: "fire",
    maxHP: 100,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 100,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/earthpsycho.png",
    moves: [
      {
        name: "Flame Up",
        cost: "0",
        text: "Deal 10 damage. Gain 2 strength.",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 10, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[monsterIndex].strength += 2;
          })
          return toChangeState;
        }
      } 
    ]
  },

  opponent7: {
    name: "Dracula",
    type: "Air",
    maxHP: 60,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 60,
    strength: 0,
    dex: 0,
    drown: 0,
    hunted: 0,
    avatar: "img/dracula.png",
    moves: [
      {
        name: "Leeching Strike",
        cost: "0",
        text: "Deal 15 damage. Any unblocked damage is gained as block. +1 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 10, monsterIndex);
            if (tempState.playerMonster.currentHP < newState.playerMonster.currentHP) {
              newState.opponentMonster[monsterIndex].encounterBlock += (newState.playerMonster.currentHP-tempState.playerMonster.currentHP);
            }
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
            newState.opponentMonster[monsterIndex].encounterEnergy +=1;

            
          })
          return toChangeState;
        }
      },
      
      {
        name: "Consume Flesh",
        cost: "2",
        text: "Spend 2 energy. Deal 30 damage. Restore 15 health.",
        minReq: 2,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            let tempState = dealPlayerDamage(newState, 30, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;

            if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 16)) {
              newState.opponentMonster[monsterIndex].currentHP += 15;
            } else {
              newState.opponentMonster[monsterIndex].currentHP = newState.opponentMonster[monsterIndex].maxHP;
            };  
            newState.opponentMonster[monsterIndex].encounterEnergy -= 2;
          })
          return toChangeState;
        }
      }
    ]
  }

}
