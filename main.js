//import clone from "https://cdn.skypack.dev/clone@2.1.2";
//NEXT STEPS
//ONCE HAND IS DRAWN, CAN NO LONGER AFFECT PLAYER 1 HP

//TO-DO
//figure out how to set opponent block to 0
//add a card that doubles your next attack value
//add a "isNextAttackDoubled" property to monsters
//add a function that plays at end of turn that counts down poison, temp strength/dex, mark (2x)
//add a mark that makes an enemy take 2x damage ??
//

//setUpEncounter block is undefined because opponentMonster hasn't been set yet




//DONE
//changed more functions to take and return state objects instead of calling changeState
//added support for multiple enemies (targeting, cards, moves)
//


//make card order matter more like vulnerable or discard
//make players choose between more damage for energy now?
//can partially solve thru multiple enemies but will need a real game mechanic
//CARDS THAT NEED A TURN COMBO COUNTER TO BE AT A CERTAIN AMOUNT BEFORE PLAYING
//PUTS DECK BUILDING LIMITATION - can only have so many multi combo cards


//MANA - figure out images, add to cards, add costs to moves
//add css backgrounds to moves and cards based on what their type is?


//START-TURN  FUNCTION
//opponent monster gains its turnGain energy
//loop through opponent's moves to  determine which  one meets the energy reqs
//if one does, choose that move and set it as cuurrentMove in the state
//render some OpponentMove function that renders icons
//drawHand for the player

//opponentMove updates state.incomingDamage and state.upcomingEnemyBlock
//some kind of render  function that  renders  icons for both
//BUT only if greater than 0

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Creating Monsters & Cards - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//action for each of these takes a state and returns a new state

function dealOpponentDamage(stateObj, damageNumber, attackNumber = 1) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    calculatedDamage = ((damageNumber + newState.playerMonster.strength) * attackNumber);
    if (newState.opponentMonster[newState.targetedMonster].encounterBlock == 0) {
      newState.opponentMonster[newState.targetedMonster].currentHP -= calculatedDamage;
    } else if (newState.opponentMonster[newState.targetedMonster].encounterBlock >= calculatedDamage) {
      newState.opponentMonster[newState.targetedMonster].encounterBlock -= calculatedDamage;
    } else {
      newState.opponentMonster[newState.targetedMonster].currentHP -= (calculatedDamage - newState.opponentMonster[newState.targetedMonster].encounterBlock);
      newState.opponentMonster[newState.targetedMonster].encounterBlock = 0;
    }
  });
  return toChangeState;
}

function dealPlayerDamage(stateObj, damageNumber, monsterIndex = 0, attackNumber = 1) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    calculatedDamage = ((damageNumber + newState.opponentMonster[monsterIndex].strength) * attackNumber);
    if (newState.playerMonster.encounterBlock == 0) {
      newState.playerMonster.currentHP -= calculatedDamage;
    } else if (newState.playerMonster.encounterBlock >= calculatedDamage) {
      newState.playerMonster.encounterBlock -= calculatedDamage;
    } else {
      newState.playerMonster.currentHP -= (calculatedDamage - newState.playerMonster.encounterBlock);
      newState.playerMonster.encounterBlock = 0;
    }
  });
  return toChangeState;
}

let fireCardPool = {
  fireEnergy: {
    name: "Fire Energy",
    text: (state) => {
      return `. Gain 1 energy`
    },
    minReq: -99,
    cardType: "fireEnergy",
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterEnergy += 1;

      })
      return toChangeState;
    }
  },

  kindle: {
    name: "kindle",
    text: (state) => {
      return `Deal ${1 + state.playcountKindle + state.playerMonster.strength} damage. Gain 1 energy. All kindles deal one more damage this combat`;
    },
    minReq: -99,
    cardType: "fireEnergy",
    //takes the state object, declares a toChangeState which takes immer.produce
    //and returns a new state reflecting the changes
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        let tempState = dealOpponentDamage(newState, (1 + newState.playcountKindle));
        newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
        newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        newState.playerMonster.encounterEnergy += 1;
        newState.playcountKindle += 1;
      })
      return toChangeState;
    }
  },

  test: {
    name: "Wind Up",
    minReq: -99,
    text: (state) => {
      return `Gain five energy`
    },
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterEnergy += 5;
      })
      return toChangeState;
    }
  },

  explode: {
    name: "Explode",
    text: (state) => {
      return `Spend all your energy to deal ${(30 + state.playerMonster.strength) + "*" + state.playerMonster.encounterEnergy} damage.`
    },
    minReq: 0,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        let tempState = dealOpponentDamage(newState, 30, newState.playerMonster.encounterEnergy);
        newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
        newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        newState.playerMonster.encounterEnergy = 0;
      })
      return toChangeState;
    }
  },

  withdraw: {
    name: "Withdraw",
    text: (state) => { return `Spend 1 energy. Gain ${(6 + state.playerMonster.dex)} block` },
    minReq: 1,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterBlock += (6 + state.playerMonster.dex);
        newState.playerMonster.encounterEnergy -= 1;
      })
      return toChangeState;
    }
  },

  mediumheal: {
    name: "Medium Heal",
    text: (state) => { return "Spend 2 energy. Gain 9 HP" },
    minReq: 2,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.currentHP += 9;
        newState.playerMonster.encounterEnergy -= 2;
      })
      return toChangeState;
    }
  },


  gainstrength: {
    name: "Gain Strength",
    text: (state) => {
      return `Spend 4 energy. Gain 1 strength permanently`;
    },
    minReq: 4,
    exhaust: true,
    //takes the state object, declares a toChangeState which takes immer.produce
    //and returns a new state reflecting the changes
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.strength += 1;
        newState.playerMonster.encounterEnergy -= 4;
      })
      return toChangeState;
    }
  },

  siphon: {
    name: "Siphon",
    text: (state) => { return "Drain 1 energy from your opponent and give it to yourself" },
    minReq: 0,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        if (newState.opponentMonster[newState.targetedMonster].encounterEnergy > 0) {
          newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
          newState.playerMonster.encounterEnergy += 1;

        }
      })
      //changeState(toChangeState);
      return toChangeState;
    }
  },

  essencedrain: {
    name: "Essence Drain",
    text: (state) => { return "Spend 3 energy to drain 2 energy from your opponent. Draw 2 cards" },
    minReq: 3,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 2;
        newState.playerMonster.encounterEnergy -= 3;
      })
      return toChangeState;
    }
  },

  fireball: {
    name: "Fireball",
    text: (state) => { return `Spend 2 energy. Deal ${(7 + state.playerMonster.strength)} damage twice` },
    minReq: 2,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        let tempState = dealOpponentDamage(newState, 7, 2);
        newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
        newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
        newState.playerMonster.encounterEnergy -= 2;
      })
      return toChangeState;
    }
  }
};

let waterCardPool = {
  waterEnergy: {
    name: "Water Energy",
    text: (state) => {
      return `Gain 1 energy`
    },
    minReq: -99,
    cardType: "waterEnergy",
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterEnergy += 1;
      })
      return toChangeState;
    }
  },

  cloakingFog: {
    name: "Cloaking Fog",
    text: (state) => {
      return `Spend 2 energy. Gain ${16 + state.playerMonster.dex} block`
    },
    minReq: 2,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterBlock += (16 + state.playerMonster.dex);
        newState.playerMonster.encounterEnergy -= 1;
      })
      return toChangeState;
    }
  },

  bodySlam: {
    name: "Body Slam",
    text: (state) => {
      return `Spend 1 energy. Deal damage equal to your block`
    },
    minReq: 1,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterEnergy -= 1;
        let tempState = dealOpponentDamage(newState, newState.playerMonster.encounterBlock, 1);
        newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
        newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
      })
      return toChangeState;
    }
  },

  tackle: {
    name: "Tackle",
    text: (state) => {
      return `Spend 1 energy. Deal ${(7 + state.playerMonster.strength)} damage`
    },
    minReq: 1,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterEnergy -= 1;
        let tempState = dealOpponentDamage(newState, 7, 1);
        newState.opponentMonster[newState.targetedMonster].currentHP = tempState.opponentMonster[tempState.targetedMonster].currentHP;
        newState.opponentMonster[newState.targetedMonster].encounterBlock = tempState.opponentMonster[tempState.targetedMonster].encounterBlock;
      })
      return toChangeState;
    }
  },

  withdraw: {
    name: "Withdraw",
    text: (state) => { return `Spend 1 energy. Gain ${(6 + state.playerMonster.dex)} block` },
    minReq: 1,
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.encounterBlock += (6 + state.playerMonster.dex);
        newState.playerMonster.encounterEnergy -= 1;
      })
      return toChangeState;
    }
  },

  gainDex: {
    name: "Study the Way",
    text: (state) => {
      return `Spend 4 energy. Gain 1 dexterity permanently`;
    },
    minReq: 4,
    exhaust: true,
    //takes the state object, declares a toChangeState which takes immer.produce
    //and returns a new state reflecting the changes
    action: (state) => {
      let toChangeState = immer.produce(state, (newState) => {
        newState.playerMonster.dex += 1;
        newState.playerMonster.encounterEnergy -= 4;
      })
      return toChangeState;
    }
  },


}

//need to split minReq and Cost separately, because some moves can be played with negative costs; or for X-cost moves
let opponentMonsters = {
  opponent1: {
    name: "Mr Bubbles",
    type: "water",
    maxHP: 25,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 25,
    strength: 0,
    dex: 0,
    moves: [
      {
        name: "Hibernate",
        cost: "0",
        text: "Gain 3 energy and 4 block",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 3;
            newState.opponentMonster[monsterIndex].encounterBlock += 4;
          })
          return toChangeState;
        }
      },
      {
        name: "Fury Strike",
        cost: "3",
        text: "Spend 3 energy. Deal 7 damage",
        minReq: 3,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy -= 3;
            let tempState = dealPlayerDamage(newState, 7, monsterIndex);
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
    encounterEnergy: 0,
    opponentMoveIndex: false,
    maxHP: 70,
    currentHP: 70,
    strength: 0,
    dex: 0,
    moves: [
      {
        name: "Down the Drain",
        cost: "0",
        text: "Deal 10 damage. Recover 6 health. Gain 3 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 3;
            if (newState.opponentMonster[monsterIndex].currentHP < (newState.opponentMonster[monsterIndex].maxHP - 6)) {
              newState.opponentMonster[monsterIndex].currentHP += 6;
            } else {
              newState.opponentMonster[monsterIndex].currentHP = newState.opponentMonster[monsterIndex].maxHP;
            };
            newState.playerMonster.currentHP -= 10;
          })
          return toChangeState;
        }
      },

      {
        name: "Aqua Shield",
        cost: "6",
        text: "Deal 20 damage. Gain 5 HP. Gain 4 energy",
        minReq: 6,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 4;
            newState.opponentMonster[monsterIndex].currentHP += 5;
            newState.playerMonster.currentHP -= 20;
          })
          return toChangeState;
        }
      },

      {
        name: "Aqua Blast",
        cost: "10",
        text: "Deal 35 damage. Use all energy.",
        minReq: 10,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.playerMonster.currentHP -= 35;
            newState.opponentMonster[monsterIndex].encounterEnergy = 0;
          })
          return toChangeState;
        }
      }
    ]
  },

  opponent3: {
    name: "test 5",
    type: "water",
    maxHP: 70,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 70,
    strength: 0,
    dex: 0,
    moves: [
      {
        name: "Down the Drain",
        cost: "0",
        text: "Deal 5 damage. Remove 2 of your energy. Gain 3 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 3;
            if (newState.playerMonster.encounterEnergy >= 2) {
              newState.playerMonster.encounterEnergy -= 2;
            } else {
              newState.playerMonster.encounterEnergy = 0;
            };
            newState.playerMonster.currentHP -= 5;
          })
          return toChangeState;
        }
      },
      {
        name: "Aqua Shield",
        cost: "6",
        text: "Deal 10 damage. Gain 10 HP. Gain 4 energy",
        minReq: 6,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 4;
            newState.opponentMonster[monsterIndex].currentHP += 10;
            newState.playerMonster.currentHP -= 10;
          })
          return toChangeState;
        }
      },

      {
        name: "Aqua Blast",
        cost: "10",
        text: "Deal 35 damage. Use all energy.",
        minReq: 10,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.playerMonster.currentHP -= 35;
            newState.opponentMonster[monsterIndex].encounterEnergy = 0;
          })
          return toChangeState;
        }
      }

    ]
  },

  opponent4: {
    name: "Mrs Bubbles",
    type: "water",
    maxHP: 30,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    currentHP: 30,
    strength: 0,
    dex: 0,
    moves: [
      {
        name: "Charging Strike",
        cost: "0",
        text: "Deal 4 damage. Gain 1 energy",
        minReq: 0,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 1;
            let tempState = dealPlayerDamage(newState, 4, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },
      {
        name: "Erect Barrier",
        cost: "2",
        text: "Gain 2 energy. Deal 8 damage.",
        minReq: 2,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy += 2;
            let tempState = dealPlayerDamage(newState, 8, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },

      {
        name: "Total Vacation",
        cost: "10",
        text: "Spend all energy. Deal 24 damage.",
        minReq: 10,
        action: (state, monsterIndex) => {
          let toChangeState = immer.produce(state, (newState) => {
            newState.opponentMonster[monsterIndex].encounterEnergy = 0;
            let tempState = dealPlayerDamage(newState, 24, monsterIndex);
            newState.playerMonster.currentHP = tempState.playerMonster.currentHP;
            newState.playerMonster.encounterBlock = tempState.playerMonster.encounterBlock;
          })
          return toChangeState;
        }
      },
    ]
  },

}


let playerMonsters = {
  flames: {
    name: "Flames",
    type: "fire",
    encounterEnergy: 0,
    opponentMoveIndex: false,
    cardPool: fireCardPool,
    maxHP: 50,
    currentHP: 50,
    strength: 0,
    dex: 0,
    startingDeck: [
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.kindle,
      fireCardPool.simpleheal,
      fireCardPool.explode,
      fireCardPool.gainstrength,
      fireCardPool.siphon,
    ],
  },

  charles: {
    name: "Charles",
    type: "fire",
    encounterEnergy: 0,
    opponentMoveIndex: false,
    cardPool: fireCardPool,
    maxHP: 50,
    currentHP: 50,
    strength: 0,
    dex: 0,
    startingDeck: [
      //6 energy
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.fireEnergy,
      fireCardPool.kindle,
      fireCardPool.kindle,
      //7 attacks
      fireCardPool.explode,
      fireCardPool.gainstrength,
      fireCardPool.withdraw,
      fireCardPool.withdraw,
      fireCardPool.fireball,
      fireCardPool.withdraw,
      fireCardPool.siphon,
    ],
  },

  whirlies: {
    name: "Whirlies",
    type: "Water",
    cardPool: waterCardPool,
    encounterEnergy: 0,
    opponentMoveIndex: false,
    maxHP: 50,
    currentHP: 50,
    strength: 0,
    dex: 0,
    startingDeck: [
      //6 energy
      waterCardPool.waterEnergy,
      waterCardPool.waterEnergy,
      waterCardPool.waterEnergy,
      waterCardPool.waterEnergy,
      waterCardPool.waterEnergy,
      waterCardPool.waterEnergy,
      //6 attacks
      waterCardPool.withdraw,
      waterCardPool.withdraw,
      waterCardPool.withdraw,
      waterCardPool.tackle,
      waterCardPool.bodySlam,
      waterCardPool.gainDex
    ]
  }
};

playerMonsterArray = Object.values(playerMonsters);
opponentMonsterArray = Object.values(opponentMonsters);
fireCardArray = Object.values(fireCardPool);
waterCardArray = Object.values(waterCardPool);

let potentialMonsterChoices = [playerMonsters.charles, playerMonsters.whirlies];

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Creating the State - - - - - -  - - - - -


function renderChooseMonster(stateObj) {
  document.getElementById("playerStats").innerHTML = ""
  let monsterChoiceDiv = document.createElement("Div");
  monsterChoiceDiv.classList.add("monster-choice-window");
  document.getElementById("playerStats").appendChild(monsterChoiceDiv);

  potentialMonsterChoices.forEach(function (monsterObj, index) {
    let monsterDiv = document.createElement("Div");
    monsterDiv.id = index;
    monsterDiv.classList.add("monster-to-choose");
    let monsterName = document.createElement("H3");
    let monsterChoiceButton = document.createElement("Button");

    monsterName.textContent = monsterObj.name;
    monsterChoiceButton.textContent = "Choose"

    monsterChoiceButton.addEventListener("click", function () {
    chooseThisMonster(stateObj, index);
    });

    monsterDiv.append(monsterName, monsterChoiceButton);
    document.getElementById("playerStats").appendChild(monsterDiv);
    })
};

function chooseThisMonster(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster = potentialMonsterChoices[index];
    newState.status = Status.InEncounter;
  })
  stateObj = setUpEncounter(stateObj);
  changeState(stateObj);
  return stateObj;
}


function fisherYatesShuffle(arrayObj) {
  let arrayCopy = [...arrayObj];
  for (x = arrayCopy.length-1; x > 0; x--) { 
    let y = Math.floor(Math.random() * (x)); 
    let temp = arrayCopy[x] 
    arrayCopy[x] = arrayCopy[y] 
    arrayCopy[y] = temp 
 } 
 return arrayCopy;
}

function renderChooseCardReward(stateObj) {
  document.getElementById("handContainer2").innerHTML = "";
  document.getElementById("opponents").innerHTML = "";

  let cardChoiceDiv = document.createElement("Div");
  cardChoiceDiv.classList.add("card-choice-window");
  document.getElementById("handContainer2").appendChild(cardChoiceDiv);


  let shuffledCardPool = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  sampledCardPool.forEach(function (cardObj, index) {
    let cardDiv = document.createElement("Div");
    cardDiv.classList.add("card");
    let cardName = document.createElement("H3");
    let cardText = document.createElement("P");
    let chooseButton = document.createElement("Button");   
    chooseButton.addEventListener("click", function () {
        chooseThisCard(sampledCardPool[index], stateObj, index);
      });   
    chooseButton.textContent = "Choose";
    if (cardObj.cardType == "fireEnergy") {
      cardDiv.classList.add("fire-energy");
    }
    if (cardObj.cardType == "waterEnergy") {
      cardDiv.classList.add("water-energy");
    }
    cardName.textContent = cardObj.name;
    cardText.textContent = cardObj.text(stateObj, index);
    cardDiv.append(cardName, cardText, chooseButton);
    document.getElementById("handContainer2").appendChild(cardDiv);
  });

  let skipButton = document.createElement("Button");
  skipButton.addEventListener("click", function () {
    skipCards(stateObj);
  }); 
  skipButton.textContent = "Skip";
  document.getElementById("handContainer2").appendChild(skipButton);

};

function skipCards(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.status = Status.InEncounter;
  })
  stateObj = setUpEncounter(stateObj);
  changeState(stateObj);
  return stateObj;
}

function chooseThisCard(cardObj, stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck.push(cardObj);
    newState.status = Status.InEncounter;
  })
  stateObj = setUpEncounter(stateObj);
  changeState(stateObj);
  return stateObj;
}




const Status = {
  ChoosingMonster: "Choosing monster",
  EncounterRewards: "Battle Rewards",
  InEncounter: "in encounter",
  WonEncounter: "won encounter",
  Death: "You died",
  InTown: "In Town"
};

let gameStartState = {
  playerMonster: false,
  opponentMonster: [opponentMonsters.opponent4, opponentMonsters.opponent1],
  status: Status.ChoosingMonster,
  opponentChosenMoveIndex: false,
  playcountKindle: 0
};






function changeState(newStateObj) {
  console.log("you're changing the state");
  state = { ...newStateObj };
  //state = { ...handleDeaths() };
  renderScreen(state);
}

function handleDeaths(stateObj) {
  console.log("handling deaths");
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monster, index) {
      if (monster.currentHP <= 0) {
        console.log("opponent monster at index " + index + " has died.")
        newState.opponentMonster.splice(index, 1);
        newState.targetedMonster = 0;
      }
    });
    if (newState.opponentMonster.length == 0) {
      console.log("all opponents dead");
      newState.status = Status.EncounterRewards;
      //newState = resetAfterEncounter(state);
    }

    if (newState.playerMonster.current <= 0) {
      // all monsters are dead
      console.log("we deads");
      //newState.status = Status.lostEncounter;
      newState = resetAfterEncounter(newState);
    }
  })
  // check if all opponents are dead

  return toChangeState;
};

// maybe don’t look at this too closely
function pause(timeValue) {
  return new Promise(res => setTimeout(res, timeValue))
}



//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Game Set-up  - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//Game Logic


let state = {...gameStartState};
renderScreen(state);



//Encounter Set-up
//setUpEncounter block is undefined because opponentMonster hasn't been set yet
function setUpEncounter(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    console.log("setting up encounter");
    newState.playerMonster.encounterBlock = 0;
    newState.opponentMonster = [opponentMonsters.opponent1, opponentMonsters.opponent4];
    newState.encounterHand = [];
    newState.encounterDiscard = [];
    if (!stateObj.playerDeck) {
      console.log("player has no playerDeck")
      newState.playerDeck = [...stateObj.playerMonster.startingDeck];
      newState.encounterDeck = [...stateObj.playerMonster.startingDeck];
      newState.encounterDraw = [...stateObj.playerMonster.startingDeck];
    } else {
      console.log("player had playerDeck")
      newState.encounterDeck = [...stateObj.playerDeck];
      newState.encounterDraw = [...stateObj.playerDeck];
    }
    newState.targetedMonster = 0;
    newState.playerMonster.encounterEnergy = 0;
    console.log(newState.opponentMonster);
  });

  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monster, index) {
      console.log("triggering the block/energy opponent loop")
      newState.opponentMonster[index].encounterEnergy = 0;
      newState.opponentMonster[index].encounterBlock = 0;
    })
  })

  return stateObj;
};


function resetAfterEncounter(stateObj) {
  let newState = { ...stateObj };
  newState.status = Status.OutOfCombat;
  newState.opponentMonster = {};

  newState.playerMonster.encounterEnergy = 0;
  newState.opponentEncounterEnergy = 0;
  newState.encounterDiscard = [];
  newState.encounterDeck = [];
  newState.encounterHand = [];

  return newState;
}

//takes an array and returns the same array but shuffled
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

//REWEITE FOR IMMER>PRODUCE
function shuffleDiscardIntoDeck(stateObj) {
  let newState = { ...stateObj };
  newState.encounterDraw = [...newState.encounterDiscard];
  newState.encounterDiscard = [];

  // shuffle deck
  newState.encounterDraw = shuffleArray(newState.encounterDraw);
  //changeState(newState);
  return newState;
}

function drawACard(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    const handLength = newState.encounterHand.length;
    if (handLength >= 10) {
      return newState;
    }

    // if deck is empty, shuffle discard and change newState to reflect that
    if (newState.encounterDraw.length === 0) {
      Object.assign(newState, shuffleDiscardIntoDeck(newState));
      console.log("shuffling");
    }

    // draw a card if possible
    let testState
    let topCard = newState.encounterDraw.shift();
    if (!topCard) {
      console.log("all cards are in play or something");
      return newState;
    }

    // put it in your hand
    newState.encounterHand.push(topCard);
  })
  return toChangeState;
}

//Need to figure out some way to make this terminate early if encounterDiscard and encounterDraw are both empty
function drawAHand(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    for (let i = 0; i < 7; i++) {
      if (
        newState.encounterDraw.length !== 0 ||
        newState.encounterDiscard.length !== 0
      ) {
        Object.assign(newState, drawACard(newState));
      }
    }
  });
  return toChangeState;
}


function playACard(stateObj, cardIndexInHand) {
  console.log("triggering playACard");
  let card = stateObj.encounterHand[cardIndexInHand];
  let toChangeState = card.action(stateObj, cardIndexInHand);
  let toChangeState2 = immer.produce(toChangeState, (newState) => {
    if (card.exhaust == true) {
      console.log("you're exhausting " + card.name);
      newState.encounterHand.splice(cardIndexInHand, 1);
    } else {
      newState.encounterDiscard.push(card);
      newState.encounterHand.splice(cardIndexInHand, 1);
    }

  })
  let toChangeState3 = handleDeaths(toChangeState2)
  changeState(toChangeState3);
}

function targetThisMonster(stateObj, monsterIndex) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.targetedMonster = monsterIndex;
  })

  changeState(toChangeState);
}

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Rendering - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
function renderJSON(stateObj) {
  document.getElementById("stateJSON").innerHTML = "";
  if (state.showJSON === true) {
    document
      .getElementById("stateJSON")
      .append(JSON.stringify(simpleState(stateObj), null, 2));
  }
}

//Render the player's stats
function renderStats(stateObj) {
  document.getElementById("playerStats").innerHTML = "";

  let playerHPText = document.createElement("H3");
  let playerEnergyText = document.createElement("H2");
  let playerStrengthText = document.createElement("H2");
  let playerBlockText = document.createElement("H2");
  playerHPText.textContent = stateObj.playerMonster.name +
    " HP: " +
    stateObj.playerMonster.currentHP +
    "/" +
    stateObj.playerMonster.maxHP;
  playerEnergyText.textContent = "Energy: " + stateObj.playerMonster.encounterEnergy;
  playerStrengthText.textContent = "Strength: " + stateObj.playerMonster.strength;
  playerBlockText.textContent = "Block: " + stateObj.playerMonster.encounterBlock;
  document.getElementById("playerStats").append(playerHPText, playerBlockText, playerEnergyText, playerStrengthText);


}

//render player's hand
function renderHand(stateObj) {
  document.getElementById("handContainer2").innerHTML = "";
  if (stateObj.encounterHand.length > 0) {
    stateObj.encounterHand.forEach(function (cardObj, index) {
      let cardDiv = document.createElement("Div");
      cardDiv.id = index;
      cardDiv.classList.add("card");
      let cardName = document.createElement("H3");
      let cardText = document.createElement("P");
      let cardButton = document.createElement("Button");
      if (cardObj.minReq <= stateObj.playerMonster.encounterEnergy) {
        cardButton.addEventListener("click", function () {
          playACard(stateObj, index);
        });
      };
      if (cardObj.minReq <= stateObj.playerMonster.encounterEnergy) {
        cardButton.textContent = "Play";
        cardDiv.classList.add("playable")
      };
      if (cardObj.cardType == "fireEnergy") {
        cardDiv.classList.add("fire-energy");
      }

      if (cardObj.cardType == "waterEnergy") {
        cardDiv.classList.add("water-energy");
      }
      cardName.textContent = cardObj.name;
      cardText.textContent = cardObj.text(stateObj, index);
      cardDiv.append(cardName, cardText, cardButton);
      document.getElementById("handContainer2").appendChild(cardDiv);
    });
  }
}

function renderCardPile(cardArrayObj, divStringName) {
  document.getElementById(divStringName).innerHTML = "";
  if (cardArrayObj.length > 0) {
    cardArrayObj.forEach(function (cardObj, index) {
      let cardDiv = document.createElement("Div");
      cardDiv.id = index;
      cardDiv.classList.add("card");
      if (cardObj.cardType == "fireEnergy") {
        cardDiv.classList.add("fire-energy");
      }
      if (cardObj.cardType == "waterEnergy") {
        cardDiv.classList.add("water-energy");
      }
      let cardName = document.createElement("H3");
      let cardText = document.createElement("P");
      cardName.textContent = cardObj.name;
      cardText.textContent = cardObj.text(state, index);
      cardDiv.append(cardName, cardText);
      document.getElementById(divStringName).appendChild(cardDiv);
    });
  }
}

function renderOpponents(stateObj) {
  document.getElementById("opponents").innerHTML = "";
  stateObj.opponentMonster.forEach(function (monsterObj, index) {
    let monsterDiv = document.createElement("Div");
    monsterDiv.classList.add("monster");
    monsterDiv.id = index;

    let monsterStatsDiv = document.createElement("Div");
    let monsterName = document.createElement("H2");
    let monsterHP = document.createElement("H3");
    let monsterEncounterEnergy = document.createElement("H3");
    let monsterEncounterBlock = document.createElement("H3");
    monsterEncounterBlock.textContent = "Block: " + monsterObj.encounterBlock;
    monsterName.textContent = monsterObj.name;
    monsterHP.textContent = " HP: " +
      monsterObj.currentHP +
      "/" +
      monsterObj.maxHP;
    monsterEncounterEnergy.textContent = "Energy: " + monsterObj.encounterEnergy;
    monsterStatsDiv.append(monsterName, monsterHP, monsterEncounterEnergy, monsterEncounterBlock);
    if (stateObj.targetedMonster == index) {
      monsterDiv.classList.add("targeted");
    } else {
      let targetButton = document.createElement("Button");
      targetButton.textContent = "Target";
      targetButton.addEventListener("click", function () {
        targetThisMonster(stateObj, index);
      });
      monsterStatsDiv.append(targetButton);
    }
    monsterDiv.append(monsterStatsDiv);

    let opponentMoveListDiv = document.createElement("Div");

    monsterObj.moves.forEach(function (moveObj, index) {
      let moveDiv = document.createElement("Div");
      moveDiv.id = index;
      moveDiv.classList.add("move");
      if (index === monsterObj.opponentMoveIndex) {
        moveDiv.classList.add("chosen");
      }
      let moveName = document.createElement("H3");
      let moveText = document.createElement("P");
      let moveCost = document.createElement("P");
      moveName.textContent = moveObj.name;
      moveText.textContent = moveObj.text;
      moveCost.textContent = "Energy cost: " + moveObj.cost;
      moveCost.classList.add("energy-cost");
      moveDiv.append(moveName, moveText, moveCost);
      opponentMoveListDiv.appendChild(moveDiv);
    });

    monsterDiv.appendChild(opponentMoveListDiv);
    document.getElementById("opponents").append(monsterDiv);

  });
}


function renderScreen(stateObj) {
  if (!stateObj.playerMonster) {
    renderChooseMonster(stateObj);
    document.getElementById("opponents").innerHTML = "";
  } else if (stateObj.status == Status.EncounterRewards) {
      renderChooseCardReward(stateObj);
  } else {
    renderStats(stateObj);
    renderJSON(stateObj);
    renderHand(stateObj);
    renderCardPile(stateObj.encounterDraw, "drawDiv");
    renderCardPile(stateObj.encounterDiscard, "discardDiv");
    renderCardPile(stateObj.playerDeck, "deckDiv");
    renderOpponents(stateObj);
  }
}



//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Function Assignment - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

//assign function to button
function resetState() {
  let newState = gameStartState;
  changeState(newState);
}


//GAME LOGIC - should only execute if in the "encounter" screen
document.getElementById("shuffleDrawButton").onclick = function () {
  startEncounter(state);
};
document.getElementById("startTurnButton").onclick = function () {
  startTurn(state);
};

document.getElementById("endTurnButton").onclick = function () {
  endTurn(state);
};
document.getElementById("resetButton").onclick = resetState;
//document.getElementById("drawHandButton").onclick = drawAHand;




//needs to return when it reaches the first playable move to prevent it from always playing the last move
//chooses a random number based on the length of the opponent' moves and highlights it
function pickMove(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      for (var i = 0; i < monsterObj.moves.length; i++) {
        if (monsterObj.encounterEnergy >= monsterObj.moves[i].minReq) {
          newState.opponentMonster[index].opponentMoveIndex = i;
          console.log(monsterObj.name + " picks " + monsterObj.moves[i].name);
        }
      }
    });
  });
  //changeState(toChangeState);
  return toChangeState;
}


function playOpponentMove(stateObj) {
  //each opponent Monster plays its own move
  stateObj.opponentMonster.forEach(function (monsterObj, index) {
    const move = monsterObj.moves[monsterObj.opponentMoveIndex];
    //move.action also take a state object and returns a state object, so newState gets updated
    stateObj = move.action(stateObj, index);
  });
  return stateObj;
}

function playOpponentMove2(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      const move = monsterObj.moves[monsterObj.opponentMoveIndex];
      //move.action also take a state object and returns a state object, so newState gets updated
      newState = move.action(newState, index);
    })
  });
  return toChangeState;
}


function discardHand(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.encounterDiscard = newState.encounterDiscard.concat(newState.encounterHand);
    newState.encounterHand = [];
  });
  return toChangeState;
}


////ONE TURN
function startTurn(stateObj) {
  let state1 = pickMove(stateObj);
  state1 = immer.produce(state1, (draft) => {
    draft.playerMonster.encounterBlock = 0;
  })
  let toChangeState = drawAHand(state1);
  changeState(toChangeState);
}

function shuffleDraw(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.encounterDraw = shuffleArray(newState.encounterDraw);
  });
  //changeState(toChangeState);
  return toChangeState;
}

function startEncounter(stateObj) {
  let state1 = pickMove(stateObj);
  let state2 = shuffleDraw(state1);
  let toChangeState = drawAHand(state2);
  changeState(toChangeState);
}

//if you flip the order of this around, discard works, but not playing the move
async function endTurn(stateObj) {
  stateObj = discardHand(stateObj);
  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      monsterObj.encounterBlock = 0;
    })
  });
  stateObj = pickMove(stateObj);
  changeState(stateObj);
  await pause(500);
  stateObj = playOpponentMove(stateObj);
  changeState(stateObj);
  await pause(500);

  stateObj = pickMove(stateObj);
  stateObj = immer.produce(stateObj, (draft) => {
    draft.playerMonster.encounterBlock = 0;
  })
  stateObj = drawAHand(stateObj);
  changeState(stateObj);

}


//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Setting Everything Up - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

//so what's appening is that shuffling discard into deck is not working, but only when
//discard actually has cards in it
// function renderMoves(stateObj) {
//   document.getElementById("playerMoveList").innerHTML = "";
//   stateObj.playerMonster.moves.forEach(function (moveObj, index) {
//     let moveDiv = document.createElement("Div");
//     moveDiv.id = index;
//     moveDiv.classList.add("move");
//     let moveName = document.createElement("H3");
//     let moveText = document.createElement("P");
//     let moveCost = document.createElement("P");
//     let moveButton = document.createElement("Button");
//     if (state.playerEncounterEnergy >= moveObj.minReq) {
//       moveButton.addEventListener("click", function () {
//         playMove(stateObj, index);
//       });
//       moveButton.textContent = "Play";
//     }
//     moveName.textContent = moveObj.name;
//     moveText.textContent = moveObj.text;
//     moveCost.textContent = moveObj.cost;
//     moveDiv.append(moveName, moveText, moveCost, moveButton);
//     document.getElementById("playerMoveList").appendChild(moveDiv);
//   });
// }
