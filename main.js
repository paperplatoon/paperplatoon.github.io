//import clone from "https://cdn.skypack.dev/clone@2.1.2";
//NEXT STEPS
//CARDS THAT NEED A TURN COMBO COUNTER TO BE AT A CERTAIN AMOUNT BEFORE PLAYING
//PUTS DECK BUILDING LIMITATION - can only have so many multi combo cards

//TO-DO
//add card costs to Choose/remove card screens
//same with strength and dex for all monsters
//figure out some way to render energy inside the right icon (flame/water/etc)
//add 

//figure out a way to do tooltips

//add in a monster flag that, if true, does not set block to 0 between cards
//add in a card that allows you to keep block between turns

//add in gold for skipping a card; also add to button

//MANA - figure out images, add to cards, add costs to moves
//add css backgrounds to moves and cards based on what their type is?



//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Creating the State - - - - - -  - - - - -

const Status = {
  ChoosingMonster: "Choose a monster",
  UpgradingCards: "Choose any card from your deck to upgrade",
  EncounterRewards: "Choose a card to add to your deck",
  InEncounter: "in encounter",
  WonEncounter: "won encounter",
  RemovingCards: "choose a card to remove from your deck",
  Death: "You died",
  InTown: "In Town",
  DecreasingCost: "Choose a card and decrease its cost by 1",
  IncreasingBlock: "Choose a card to increase its block by 5",
  IncreasingHits: "Choose a card to hit 1 extra time",
  IncreasingAttack: "Choose an attack to deal +10 damage",
  HealersShop: "Restore your health for a price"
};

let gameStartState = {
  playerMonster: false,
  status: Status.ChoosingMonster,
  enemyFightHealTotal: 0,
  gymCount: 0,
  gymFightCount: 0,
  gold: 50,
  cardRemoveCost: 50,
  cardUpgradeCost: 50,
  healCost: 50,
  cardsSkipped: 0,
  eventUsed: false,
  extraHeal: 0,
  fightHealCount: 0,
  fightHealValue: 0,
  selfDamageCount: 0,
  selfDamageValue: 0,
  cardsPerTurn: 0
};

playerMonsterArray = Object.values(playerMonsters);
opponentMonsterArray = Object.values(opponentMonsters);
fireCardArray = Object.values(fireCardPool);
waterCardArray = Object.values(waterCardPool);

let potentialMonsterChoices = playerMonsterArray;

function dealOpponentDamage(stateObj, damageNumber, attackNumber = 1, all=false) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    let calculatedDamage = ((damageNumber + newState.playerMonster.strength) * attackNumber);
    if (all===true) {
      newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
        console.log("dealing " + calculatedDamage + " to monster at index " + monsterIndex + " with health " + monsterObj.currentHP);
        if (monsterObj.hunted > 0) {
          calculatedDamage *=2;
        }
        if (monsterObj.encounterBlock == 0) {
          monsterObj.currentHP -= calculatedDamage;
        } else if (monsterObj.encounterBlock >= calculatedDamage) {
          monsterObj.encounterBlock -= calculatedDamage;
        } else {
          monsterObj.currentHP -= (calculatedDamage - monsterObj.encounterBlock);
          monsterObj.encounterBlock = 0;
        }
      })
    } else {
      if (newState.opponentMonster[newState.targetedMonster].hunted > 0) {
        calculatedDamage *=2;
      }
      if (newState.opponentMonster[newState.targetedMonster].encounterBlock == 0) {
        newState.opponentMonster[newState.targetedMonster].currentHP -= calculatedDamage;
      } else if (newState.opponentMonster[newState.targetedMonster].encounterBlock >= calculatedDamage) {
        newState.opponentMonster[newState.targetedMonster].encounterBlock -= calculatedDamage;
      } else {
        newState.opponentMonster[newState.targetedMonster].currentHP -= (calculatedDamage - newState.opponentMonster[newState.targetedMonster].encounterBlock);
        newState.opponentMonster[newState.targetedMonster].encounterBlock = 0;
      }
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






function renderChooseMonster(stateObj) {
  document.getElementById("app").innerHTML = ""
  let monsterChoiceDiv = document.createElement("Div");
  monsterChoiceDiv.classList.add("monster-choice-window");
  document.getElementById("app").appendChild(monsterChoiceDiv);

  potentialMonsterChoices.forEach(function (monsterObj, index) {
    let monsterDiv = document.createElement("Div");
    monsterDiv.id = index;
    monsterDiv.classList.add("monster-to-choose");
    let monsterName = document.createElement("H3");

    monsterName.textContent = monsterObj.name;
    let avatar = document.createElement('img');
    avatar.classList.add("avatar");
    avatar.src = monsterObj.avatar;

    monsterDiv.addEventListener("click", function () {
      chooseThisMonster(stateObj, index);
    });

    monsterDiv.append(monsterName, avatar);
    monsterChoiceDiv.append(monsterDiv)
    document.getElementById("app").appendChild(monsterChoiceDiv);
    })
};

function chooseThisMonster(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster = potentialMonsterChoices[index];
    //newState.status = Status.InEncounter;
    newState.status = Status.InTown;
    newState.playerDeck = potentialMonsterChoices[index].startingDeck;
  })
  //stateObj = setUpEncounter(stateObj);
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

function changeStatus(stateObj, newStatus) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.status = newStatus;
  })
  changeState(stateObj);
  return stateObj;
}

function skipCards(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    stateObj.cardsSkipped += 1;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function TownFight(stateObj) {
  stateObj = setUpEncounter(stateObj)
  stateObj = immer.produce(stateObj, (newState) => {
    newState.status = Status.InEncounter;
  })
  changeState(stateObj);
  return stateObj;
}

function chooseThisCard(stateObj, index, sampledCardPool) {
  console.log("passed for card pool " + sampledCardPool)
  console.log("passed for index " + index)
  console.log("card to add " + sampledCardPool[index])
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck.push(sampledCardPool[index]); 
    newState.status = Status.InTown;   
  })
  changeState(stateObj);
  return stateObj;
}

function removeCard(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.gold -= newState.cardRemoveCost;
    newState.cardRemoveCost += 25;
    newState.playerDeck.splice(index, 1);
    newState.status = Status.InTown
  })
  changeState(stateObj);
  return stateObj;
}

function encounterUpgradeCard(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.gold -= newState.cardUpgradeCost;
    newState.cardUpgradeCost += 25;
    newState.playerDeck[index].upgrades +=1;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function fullHeal(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.gold -= newState.healCost;
    newState.healCost += 25;
    newState.playerMonster.currentHP = newState.playerMonster.maxHP;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function cheapHeal(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.gold -= (Math.floor(newState.healCost/2));
    healAmount = Math.floor(newState.playerMonster.maxHP/4)
    if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= (healAmount + newState.extraHeal)) {
      newState.playerMonster.currentHP = newState.playerMonster.maxHP;
    } else {
      newState.playerMonster.currentHP += (healAmount + newState.extraHeal)
    }       
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function decreaseCardCost(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseCost -=1;
    newState.eventUsed = true;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function increaseCardBlock(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseBlock += 10;
    newState.eventUsed = true;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function increaseCardAttack(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseDamage += 10;
    newState.eventUsed = true;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function increaseBaseHits(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseHits += 1;
    newState.eventUsed = true;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}








function changeState(newStateObj) {
  console.log("you're changing the state and the status is " + newStateObj.status);
  state = {...newStateObj}
  //state = { ...handleDeaths() };
  renderScreen(state);
}

function resetAfterFight(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.strength -= newState.playerMonster.tempStrength;
    newState.playerMonster.dex -= newState.playerMonster.tempDex;
    newState.playerMonster.tempStrength = 0;
    newState.playerMonster.tempDex = 0;

    newState.playerMonster.strength -= newState.playerMonster.fightStrength;
    newState.playerMonster.dex -= newState.playerMonster.fightDex;
    newState.playerMonster.fightStrength = 0;
    newState.playerMonster.fightDex = 0;

    newState.playerMonster.encounterBlock = 0;

    newState.fightHealCount = 0;
    newState.fightHealValue = 0;
    newState.selfDamageCount = 0;
    newState.selfDamageValue = 0;

    newState.gold += gyms[newState.gymCount][newState.gymFightCount].goldReward
    

    if (gyms[newState.gymCount][newState.gymFightCount].boss) {
      newState.gymFightCount = 0;
      newState.gymCount += 1;
      newState.eventUsed = false; 
      newState.status = Status.EncounterRewards;
    } else {
      newState.gymFightCount += 1;
      newState.status = Status.EncounterRewards;
    }
  })

  return stateObj;
}

function handleDeaths(stateObj) {
  let shouldUpgrade = false;
  console.log("handling deaths");
  if (stateObj.opponentMonster) {
    stateObj = immer.produce(stateObj, (newState) => {
      let indexesToDelete = [];
      newState.opponentMonster.forEach(function (monster, index) {

        if (monster.drown >= monster.currentHP && monster.currentHP > 0) {
          console.log("opponent monster at index " + index + " has drowned.")
          indexesToDelete.push(index);
          newState.targetedMonster = 0;
        }
        if (monster.currentHP <= 0) {
          console.log("opponent monster at index " + index + " has died.")
          indexesToDelete.push(index);
          newState.targetedMonster = 0;
        }
      });

      indexesToDelete.reverse()
      for (let i = 0; i < indexesToDelete.length; i++) {
       newState.opponentMonster.splice(indexesToDelete[i], 1)
      }

      if (newState.opponentMonster.length == 0) {
        console.log("all opponents dead");
        Object.assign(newState, resetAfterFight(newState))
        
          //return newState;
        }
        //something that goes through and resets card tempUpgrades and playCount for each card
        
        //newState = resetAfterEncounter(state);

      if (newState.playerMonster.currentHP <= 0) {
        // all monsters are dead
        console.log("we deads");
        //newState.status = Status.lostEncounter;
        newState = resetAfterEncounter(newState);
      }
    })
  }
  // check if all opponents are dead

  return stateObj;
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
  //shuffle monster array and pick two randomly
  // let opponentMonsterArray = OpponentMonsterFightCountArray[stateObj.fightCount]
  // let potentialOpponents = fisherYatesShuffle(opponentMonsterArray);


  stateObj = immer.produce(stateObj, (newState) => {
    console.log("setting up encounter");
    newState.playerMonster.encounterBlock = 0;
    //pick first two monsters from shuffled array
    newState.opponentMonster = gyms[newState.gymCount][newState.gymFightCount].opponents;
    newState.encounterHand = [];
    newState.encounterDiscard = [];
    newState.enemyFightHealTotal = 0;
    newState.fightHealCount = 0;
    newState.fightHealValue = 0;
    newState.selfDamageCount = 0;
    newState.selfDamageValue = 0;
    newState.cardsPerTurn = 0;
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
    newState.playerMonster.encounterEnergy = newState.playerMonster.turnEnergy;
  });

  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.tempStrength = 0;
    newState.playerMonster.tempDex = 0;
    newState.opponentMonster.forEach(function (monster, index) {
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
    if (handLength > 7 ) {
      console.log("hand is full");
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
    for (let i = 0; i < 6; i++) {
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

function upgradeCard(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.encounterHand[0].upgrades +=1;
  });
  return stateObj;
}

async function playACard(stateObj, cardIndexInHand, arrayObj) {
  console.log("triggering playACard");
  stateObj = stateObj.encounterHand[cardIndexInHand].action(stateObj, cardIndexInHand, arrayObj);
  stateObj = immer.produce(stateObj, (newState) => {
    newState.cardsPerTurn += 1;
    if (stateObj.encounterHand[cardIndexInHand].exhaust == true) {
      console.log("you're exhausting " + stateObj.encounterHand[cardIndexInHand].name);
      newState.encounterHand.splice(cardIndexInHand, 1);
    } else {
      newState.encounterDiscard.push(stateObj.encounterHand[cardIndexInHand]);
      newState.encounterHand.splice(cardIndexInHand, 1);
    }

  })
  stateObj = handleDeaths(stateObj)
  changeState(stateObj);
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
//Render the player's stats
function renderPlayerMonster(stateObj) {
  document.getElementById("playerStats").innerHTML = "";
  let topRowDiv = document.createElement("Div");
  topRowDiv.classList.add("monster-top-row");

  let drawPileDiv = document.createElement("Div");
  drawPileDiv.setAttribute("id", "drawPile");
  drawPileDiv.classList.add("pile");
  drawPileDiv.textContent = "Draw";

  let drawDiv = document.createElement("Div");
  drawDiv.setAttribute("id", "drawDiv");
  drawPileDiv.append(drawDiv);
  topRowDiv.append(drawPileDiv);

  let avatar = document.createElement('img');
  avatar.classList.add("avatar");
  avatar.src = stateObj.playerMonster.avatar;
  topRowDiv.appendChild(avatar);

  let playerHP = document.createElement("H3");
  playerHP.textContent = stateObj.playerMonster.currentHP + "/" + stateObj.playerMonster.maxHP;
  playerHP.classList.add("monster-hp");

  topRowDiv.appendChild(playerHP);

  if (stateObj.playerMonster.encounterBlock > 0) {
    let playerBlock = document.createElement("H3");
    playerBlock.textContent = stateObj.playerMonster.encounterBlock;
    playerBlock.classList.add("monster-block");
    topRowDiv.appendChild(playerBlock);
  }

        
  let discardPileDiv = document.createElement("Div");
  discardPileDiv.setAttribute("id", "discardPile")
  discardPileDiv.classList.add("pile")
  discardPileDiv.textContent = "Discard"

  let discardDiv = document.createElement("Div");
  discardDiv.setAttribute("id", "discardDiv")
  discardPileDiv.append(discardDiv);
  topRowDiv.append(discardPileDiv);

  document.getElementById("playerStats").appendChild(topRowDiv);

  let playerEnergyText = document.createElement("H4");
  playerEnergyText.classList.add("player-energy")
  let playerStrengthandDexText = document.createElement("H4");
  playerEnergyText.textContent = "Energy: " + stateObj.playerMonster.encounterEnergy;
  playerStrengthandDexText.textContent = "Strength: " + (stateObj.playerMonster.strength) + " Dex: " + (stateObj.playerMonster.dex);
  document.getElementById("playerStats").appendChild(playerEnergyText)
  document.getElementById("playerStats").appendChild(playerStrengthandDexText);

  

  let imageRowDiv = document.createElement("Div");
  imageRowDiv.classList.add("player-decks-row");

  
  //let discardPileDiv.textConte

  document.getElementById('playerStats').appendChild(imageRowDiv);
}

function renderDivs(stateObj) {
  document.getElementById("app").innerHTML = `
  <div id="town-top-row">
    <p>${stateObj.status}</p>
    <button id="shuffleDrawButton">Start Encounter</button>
    <button id="endTurnButton">End Turn</button>
    <div id="playerDeckPile" class="remove-pile">View Current Deck
      <div id="deckDiv"> </div>
    </div>
    <div id="goldDiv">
      <img src="img/goldsack.png" class="bg-image"></img>
      <h3 id="goldText"></h3>
    </div>
  </div>

  <div class="flex-container" id="stats">
    <div class="flex-container" id="playerMonster">
      <div id="playerStats"> </div>
      <div id="handContainer2"> </div>
    </div>

    <div id="opponents"></div>
  </div>

  </div>
  <!-- <button id="resetButton">Reset</button> -->

  </div>`;
  document.getElementById("shuffleDrawButton").onclick = function () {
    startEncounter(state);
  };
  document.getElementById("endTurnButton").onclick = function () {
    endTurn(state);
  };
  document.getElementById("goldText").textContent = stateObj.gold;
}

let monsterHP = document.createElement("H3");
  monsterHP.textContent = stateObj.playerMonster.currentHP + "/" + stateObj.playerMonster.maxHP;
  monsterHP.classList.add("monster-hp-town");
  topRowDiv.appendChild(monsterHP);



function renderTownDiv(stateObj, idNameString, imgSrcString, imgTextString, triggerCondition, functionToAdd, statusToChange=false, altText=false) {
  let newTownDiv = document.createElement("Div");
  newTownDiv.setAttribute("id", idNameString)
  newTownDiv.classList.add("town-div");
  let newDivImg = document.createElement("Img");
  newDivImg.src = imgSrcString;
  newDivImg.classList.add("bg-image");
  newTownDiv.append(newDivImg);

  let newDivText = document.createElement("H3");
  newDivText.textContent = imgTextString
  newDivText.classList.add("fight-text");

  if (triggerCondition===true) {
      newTownDiv.classList.add("clickable-town-div")
      newTownDiv.onclick = function () {
        functionToAdd(stateObj, statusToChange);
      }
    } else {
      newDivText.textContent = altText;
    };

    newTownDiv.append(newDivText);
    return newTownDiv
}
  
  


function renderTown(stateObj, ) {

  let eventsArray = [
    {
      divID: "TownEvent",
      imgSrc: "img/wizardshop.png",
      divText: "Double Tap",
      newStatus: Status.IncreasingHits
    },

    {
      divID: "TownEvent",
      imgSrc: "img/wizardshop.png",
      divText: "Memorize",
      newStatus: Status.DecreasingCost
    },

    {
      divID: "TownEvent",
      imgSrc: "img/wizardshop.png",
      divText: "Buffer Shield",
      newStatus: Status.IncreasingBlock
    },

    {
      divID: "TownEvent",
      imgSrc: "img/wizardshop.png",
      divText: "Hone Sword",
      newStatus: Status.IncreasingAttack
    },
  ];

  let shuffledEvents = fisherYatesShuffle(eventsArray);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  let townDiv = document.createElement("Div");
  townDiv.classList.add("flex-container")
  townDiv.setAttribute("id", "town");
  

  let townHealDiv = renderTownDiv(stateObj, "TownHealer", "img/healer.png", "Visit Healer", (stateObj.gold >= Math.floor(stateObj.healCost/2)), changeStatus, Status.HealersShop, "Not enough gold");
  let townRemoveDiv = renderTownDiv(stateObj, "TownRemove", "img/tavern2.png", "Remove A Card",  (stateObj.gold >=stateObj.cardRemoveCost), changeStatus, Status.RemovingCards, `Not enough gold (${stateObj.cardRemoveCost} needed)`);
  let townUpgradeDiv = renderTownDiv(stateObj, "TownUpgrade", "img/forge.png", "Upgrade A Card", (stateObj.gold >=stateObj.cardUpgradeCost), changeStatus, Status.UpgradingCards, `Not enough gold (${stateObj.cardUpgradeCost} needed)`);
  let townGymDiv = renderTownDiv(stateObj, "TownFight", "img/dracula.png", "Fight Town Gym", true, TownFight)

  let mysteryDiv = renderTownDiv(stateObj, shuffledEvents[0].divID, shuffledEvents[0].imgSrc, shuffledEvents[0].divText, (stateObj.eventUsed == false), changeStatus, shuffledEvents[0].newStatus, "Already used");


  townDiv.append(townHealDiv, townRemoveDiv, townUpgradeDiv, townGymDiv, mysteryDiv);
  document.getElementById("app").append(townDiv);

  //     <div id="TownDecrease" class="town-div">
  //       <img src="img/wizardshop.png" class="bg-image"></img>
  //       <h3 id="decreaseText" class="fight-text">Increase Card Block</h3> 
  //     </div>
  // </div>
  // `;

}



// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== RENDERING CARDS AND CARD PILES ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
function renderHand(stateObj) {
  document.getElementById("handContainer2").innerHTML = "";
  if (stateObj.encounterHand.length > 0) {
    stateObj.encounterHand.forEach(function (cardObj, index) {
      renderCard(stateObj, stateObj.encounterHand, cardObj, index, "handContainer2", functionToAdd=false)
    });
  }
}

function renderCardPile(stateObj, cardArrayObj, divStringName) {
  document.getElementById(divStringName).innerHTML = "";
  if (cardArrayObj.length > 0) {
    cardArrayObj.forEach(function (cardObj, index) {
      renderCard(stateObj, cardArrayObj, cardObj, index, divStringName)
    });
  }
}

function topRowDiv(stateObj, divName) {
  let topRowDiv = document.createElement("Div");
  topRowDiv.setAttribute("id", "town-top-row");

  let statusTextDiv = document.createElement("Div");
  statusTextDiv.setAttribute("id", "status-text-div");

  let statusText = document.createElement("p");
  statusText.textContent = stateObj.status;
  statusTextDiv.append(statusText);
  topRowDiv.append(statusTextDiv);

  let monsterHP = document.createElement("H3");
  monsterHP.textContent = stateObj.playerMonster.currentHP + "/" + stateObj.playerMonster.maxHP;
  monsterHP.classList.add("monster-hp-town");
  topRowDiv.appendChild(monsterHP);

  let deckPileDiv = document.createElement("Div");
  deckPileDiv.setAttribute("id", "playerDeckPile");
  deckPileDiv.classList.add("remove-pile");
  deckPileDiv.textContent = "View Current Deck";
  let deckDiv = document.createElement("Div");
  deckDiv.setAttribute("id", "deckDiv");
  deckPileDiv.append(deckDiv);
  topRowDiv.append(deckPileDiv);

  let goldDiv = document.createElement("Div");
  goldDiv.setAttribute("id", "goldDiv");

  let goldImg = document.createElement("img");
  goldImg.src = "img/goldsack.png";
  goldImg.classList.add("bg-image");
  goldDiv.append(goldImg);

  let goldText = document.createElement("H3");
  goldText.setAttribute("id", "goldText");
  goldText.textContent = stateObj.gold;
  goldDiv.append(goldText)
  topRowDiv.append(goldDiv);

  document.getElementById(divName).append(topRowDiv)

  return topRowDiv
}

function divContainer(divName) {
  let removeDiv = document.createElement("Div")
  removeDiv.setAttribute("id", "remove-div")
  removeDiv.classList.add("remove-div")
  removeDiv.classList.add("screen-inner-div")

  document.getElementById(divName).append(removeDiv);

  return removeDiv
}

function skipToTownButton(stateObj, buttonString, divName, cardSkip=false) {
  let skipButton = document.createElement("Button");
  if (!cardSkip) {
    skipButton.addEventListener("click", function () {
      changeStatus(stateObj, Status.InTown);
    });
  } else {
    skipButton.addEventListener("click", function () {
      skipCards(stateObj);
    });
  }
  
  skipButton.classList.add("skip-button");
  skipButton.textContent = buttonString;
  document.getElementById(divName).append(skipButton);
  return skipButton;
}

function renderRemoveCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", removeCard, goldCost="remove");
  skipToTownButton(stateObj, "I don't want to remove any of these cards from my deck", "remove-div");
  
};

function renderChooseCardReward(stateObj) {
  let shuffledCardPool = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, sampledCardPool, "remove-div", chooseThisCard);
  skipToTownButton(stateObj, "I don't want to add any of these cards to my deck", "remove-div", cardSkip=true);

};

function renderHealer(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  document.getElementById("remove-div").classList.add("healer-div")
  
  let cheapHealButton = document.createElement("Button");
  cheapHealButton.addEventListener("click", function () {
    cheapHeal(stateObj);
  });
  cheapHealButton.classList.add("cheap-heal-button");
  cheapHealButton.classList.add("heal-button");
  cheapHealButton.textContent = `Heal 25% of your max health (${Math.floor(stateObj.playerMonster.maxHP/4)}) for ${Math.floor(stateObj.healCost/2)} gold`
  document.getElementById("remove-div").append(cheapHealButton);

  let HealButton = document.createElement("Button");
  HealButton.addEventListener("click", function () {
    fullHeal(stateObj);
  });
  HealButton.classList.add("full-heal-button");
  HealButton.classList.add("heal-button");
  HealButton.textContent = `Spend ${stateObj.healCost} gold to fully heal`
  document.getElementById("remove-div").append(HealButton);
  
  skipToTownButton(stateObj, "I don't want healing right now", "remove-div");
  
};

function renderUpgradeCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", encounterUpgradeCard, goldCost="upgrade");
  skipToTownButton(stateObj, "I don't want to upgrade any of these cards", "remove-div");
};

function renderDecreaseCardCost(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseCost && typeof cardObj.baseCost === 'number') {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", decreaseCardCost)
    }
  });
  skipToTownButton(stateObj, "I don't want to decrease the cost of any of these cards", "remove-div"); 
};

function renderIncreaseCardBlock(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseBlock && typeof cardObj.baseBlock === 'number') {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", increaseCardBlock)
    }
  });
  skipToTownButton(stateObj, "I don't want to increase the block of any of these cards", "remove-div"); 
};

function renderIncreaseCardAttack(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseDamage && typeof cardObj.baseDamage === 'number') {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", increaseCardAttack)
    }
  });
  skipToTownButton(stateObj, "I don't want to increase the attack of any of these cards", "remove-div"); 
};

function renderIncreaseBaseHit(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseHits && typeof cardObj.baseHits === 'number') {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", increaseBaseHits, goldCost="moreHits")
    }
  });
  skipToTownButton(stateObj, "I don't want more hits for any of these cards", "remove-div"); 
};

function renderCard(stateObj, cardArray, cardObj, index, divName, functionToAdd=false, goldCost=false) {
  let cardDiv = document.createElement("Div");
        cardDiv.id = "card-index-"+index;
        cardDiv.classList.add("card");
        let nonClickableArrays = [stateObj.encounterHand, stateObj.encounterDraw, stateObj.encounterDiscard];
        if (nonClickableArrays.includes(cardArray)) {   
        } else if (divName === "deckDiv") {
          cardDiv.classList.add("card-pile-card")
        } else {
          cardDiv.classList.add("card-reward");
          cardDiv.classList.add("playable");
        }


        let topCardRowDiv = document.createElement("Div");
        topCardRowDiv.classList.add("card-top-row")
        let cardName = document.createElement("H3");
        cardName.textContent = cardObj.name;
        
        let cardCost = document.createElement("H3")
        if (typeof cardObj.cost === 'function') {
          cardCost.textContent = cardObj.cost(stateObj, index, cardArray);
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else if (cardObj.cost !== "energy") {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else {}
        topCardRowDiv.append(cardName);

        
        
        let cardText = document.createElement("P");
        cardText.textContent = cardObj.text(stateObj, index, cardArray);
        cardText.classList.add("upgrade-text")
        
        cardDiv.append(topCardRowDiv);
        cardDiv.append(cardText);

        if (goldCost === "remove") {
          console.log("remove")
          let costText = document.createElement("P");
          costText.textContent = "(" + stateObj.cardRemoveCost+ " gold to remove)";
          costText.classList.add("invisible-cost")
          cardDiv.append(costText);
        } else if (goldCost === "upgrade") {
          cardDiv.classList.add("card-upgrade");
          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "upgrades", 1)
          altUpgradeText.classList.add("alt-upgrade-text");
          cardDiv.append(altUpgradeText);

          if (typeof cardObj.cost === 'function') {
            let cardAltCost = document.createElement("H3");
            cardAltCost.textContent = showChangedUpgradeCost(stateObj, index, cardArray, cardObj, "upgrades", 1)
            cardAltCost.classList.add("alt-cost")
            topCardRowDiv.innerHTML = "";
            topCardRowDiv.append(cardAltCost, cardCost, cardName);
          } else {

          }

          let costText = document.createElement("P");
          costText.textContent = "(" + stateObj.cardUpgradeCost + " gold to upgrade)";
          costText.classList.add("invisible-cost")
          cardDiv.append(costText);
        } else if (goldCost === "moreHits") {
          cardDiv.classList.add("card-more-hits");
          let altHitsText =  document.createElement("P");
          altHitsText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseHits", 1) + " alt"
          altHitsText.classList.add("alt-hits-text");
          cardDiv.append(altHitsText);
        }

        
        

        if (cardArray === stateObj.encounterHand) {
          console.log("looping through hand logic");
          if (typeof cardObj.minReq === 'function') {
            if (cardObj.minReq(stateObj, index, stateObj.encounterHand) <= stateObj.playerMonster.encounterEnergy) {
              cardDiv.classList.add("playable");
              cardDiv.addEventListener("click", function () {
                playACard(stateObj, index, stateObj.encounterHand);
              });
            };
          } else {
            if (cardObj.minReq <= stateObj.playerMonster.encounterEnergy) {
              cardDiv.classList.add("playable");
              cardDiv.addEventListener("click", function () {
                playACard(stateObj, index, stateObj.encounterHand);
              });
            };
          }
        }

        if (functionToAdd) {
          cardDiv.addEventListener("click", function () {
            functionToAdd(stateObj, index, cardArray);
          });
        }
        if (cardObj.cardType == "fireEnergy") {
          cardDiv.classList.add("fire-energy");
        }
        if (cardObj.cardType == "waterEnergy") {
          cardDiv.classList.add("water-energy");
        }
        if (cardObj.rare) {
          cardDiv.classList.add("rare-card")
        }
        document.getElementById(divName).appendChild(cardDiv);
}

function renderClickableCardList(stateObj, cardArray, divName, functionToAdd, goldCost=false) {
  cardArray.forEach(function (cardObj, index) {
    renderCard(stateObj, cardArray, cardObj, index, divName, functionToAdd, goldCost)
  })
}


//function that takes a card, a card property, and a change, and returns that card's text IF the change happened
function showChangedUpgradeText(stateObj, index, array, cardObj, propertyNameString, valueChange) {
  let cardClone = {...cardObj}
  let newState = immer.produce(stateObj, (draft) => {
    draft.playerDeck[index][propertyNameString] += valueChange;
  })
  console.log(newState.playerDeck[index][propertyNameString])
  return cardClone.text(newState, index, newState.playerDeck)  
}

function showChangedUpgradeCost(stateObj, index, array, cardObj, propertyNameString, valueChange) {
  let cardClone = {...cardObj}
  let newState = immer.produce(stateObj, (draft) => {
    draft.playerDeck[index][propertyNameString] += valueChange;
  })
  console.log(newState.playerDeck[index][propertyNameString])
  return cardClone.cost(newState, index, newState.playerDeck)  
}

// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 



function renderOpponents(stateObj) {
  document.getElementById("opponents").innerHTML = "";
  stateObj.opponentMonster.forEach(function (monsterObj, index) {
    let monsterDiv = document.createElement("Div");
    monsterDiv.classList.add("monster");
    monsterDiv.id = index;

    let monsterStatsDiv = document.createElement("Div");  
    monsterStatsDiv.classList.add("monster-top-row");

    let avatar = document.createElement('img');
    avatar.src = monsterObj.avatar;
    avatar.classList.add("avatar")
    monsterStatsDiv.append(avatar);

    if (stateObj.targetedMonster !== index) {
      monsterDiv.addEventListener("click", function () {
        targetThisMonster(stateObj, index);
      });
    }

    if (monsterObj.drown > 0) {
      let drownDiv = document.createElement("Div");
      drownDiv.textContent = monsterObj.drown;
      drownDiv.classList.add("fishbowl")
      monsterStatsDiv.append(drownDiv);
    }

    if (monsterObj.poison > 0) {
      let poisonDiv = document.createElement("Div");
      poisonDiv.classList.add("poison");
      poisonDiv.textContent = monsterObj.poison;
      monsterStatsDiv.append(poisonDiv);
    }

    if (monsterObj.hunted > 0) {
      let huntedDiv = document.createElement("img");
      huntedDiv.src = 'img/crosshair.png';
      huntedDiv.classList.add('hunted');
      monsterStatsDiv.append(huntedDiv)
    }

    let monsterHP = document.createElement("H3");
    monsterHP.textContent = monsterObj.currentHP + "/" + monsterObj.maxHP;
    monsterHP.classList.add("monster-hp");
    
    monsterStatsDiv.appendChild(monsterHP);

    if (monsterObj.encounterBlock > 0) {
      let monsterBlock = document.createElement("H3");
      monsterBlock.textContent = monsterObj.encounterBlock;
      monsterBlock.classList.add("monster-block");
      monsterStatsDiv.appendChild(monsterBlock);
    }
    
    monsterDiv.appendChild(monsterStatsDiv);
    

    let monsterStrengthAndDex = document.createElement("H4");
    let monsterEncounterEnergy = document.createElement("H4");
    monsterEncounterEnergy.textContent = "Energy: " + monsterObj.encounterEnergy;
    monsterEncounterEnergy.classList.add("monster-energy");
    monsterStrengthAndDex.textContent = "Strength: " + monsterObj.strength + " Dex: " + monsterObj.dex;
    monsterDiv.append(monsterEncounterEnergy, monsterStrengthAndDex);

    

    if (stateObj.targetedMonster == index) {
      monsterDiv.classList.add("targeted");
    } else {
      monsterDiv.classList.add("clickable-monster")
    }

    let opponentMoveListDiv = document.createElement("Div");

    monsterObj.moves.forEach(function (moveObj, moveIndex) {
      let moveDiv = document.createElement("Div");
      moveDiv.id = moveIndex;
      moveDiv.classList.add("move");
      if (moveIndex === monsterObj.opponentMoveIndex) {
        moveDiv.classList.add("chosen");
      }
      let moveNameCostDiv = document.createElement("Div");
      moveNameCostDiv.classList.add("move-name-cost");

      let moveName = document.createElement("H3");
      let moveCost = document.createElement("P");
      moveName.textContent = moveObj.name;
      moveCost.textContent = moveObj.cost;
      moveCost.classList.add("energy-cost");
      moveNameCostDiv.append(moveName, moveCost);

      let moveText = document.createElement("P");
      if (typeof moveObj.text === "function") {
        moveText.textContent = moveObj.text(stateObj, index, stateObj.opponentMonster);
      } else {
        moveText.textContent = moveObj.text;
      }
      
      


      moveDiv.append(moveNameCostDiv, moveText);
      opponentMoveListDiv.appendChild(moveDiv);
    });

    monsterDiv.appendChild(opponentMoveListDiv);
    document.getElementById("opponents").append(monsterDiv);

  });
}


function renderScreen(stateObj) {
  if (!stateObj.playerMonster) {
    renderChooseMonster(stateObj);
  } else if (stateObj.status == Status.EncounterRewards) {
    renderChooseCardReward(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.RemovingCards) {
    renderRemoveCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.UpgradingCards) {
    renderUpgradeCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.InTown) {
    renderTown(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DecreasingCost) {
    renderDecreaseCardCost(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.IncreasingBlock) {
    renderIncreaseCardBlock(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.IncreasingHits) {
    renderIncreaseBaseHit(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.IncreasingAttack) {
    renderIncreaseCardAttack(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.HealersShop) {
    renderHealer(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else {
    renderDivs(stateObj);
    renderPlayerMonster(stateObj);
    renderHand(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
    renderCardPile(stateObj, stateObj.encounterDraw, "drawDiv");
    renderCardPile(stateObj, stateObj.encounterDiscard, "discardDiv");
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

//document.getElementById("resetButton").onclick = resetState;




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
    stateObj = move.action(stateObj, index, stateObj.opponentMonster);
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

function endTurnIncrement(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.strength -= newState.playerMonster.tempStrength;
    newState.playerMonster.dex -= newState.playerMonster.tempDex;
    newState.playerMonster.tempStrength = 0;
    newState.playerMonster.tempDex = 0;
    newState.cardsPerTurn = 0;
    newState.opponentMonster.forEach(function (monsterObj, index) {
      if (monsterObj.hunted > 0) {
        monsterObj.hunted -=1;
      };

      if (monsterObj.poison > 0) {
        monsterObj.currentHP -= (monsterObj.poison*5)
      }
    })
    newState.turnDouble = false;
  })
  stateObj = handleDeaths(stateObj);
  return stateObj;
}

//if you flip the order of this around, discard works, but not playing the move
async function endTurn(stateObj) {
  stateObj = discardHand(stateObj);
  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      monsterObj.encounterBlock = 0;
    })
  });
  stateObj = endTurnIncrement(stateObj);
  stateObj = pickMove(stateObj);
  changeState(stateObj);
  await pause(500);
  stateObj = playOpponentMove(stateObj);
  changeState(stateObj);
  await pause(500);

  stateObj = pickMove(stateObj);
  stateObj = immer.produce(stateObj, (draft) => {
    draft.playerMonster.encounterBlock = 0;
    draft.playerMonster.encounterEnergy += draft.playerMonster.turnEnergy;
  })
  stateObj = drawAHand(stateObj);
  changeState(stateObj);

}

function animate(animationName, element) {
 
  // must match animation-duration in --active css
  const durationMS = 2000;

  // start the animation
  element.classList.add(`${animationName}--active`);

  // reset after the animation completes
  setTimeout(() => {
    element.classList.remove(`${animationName}--active`);
  }, durationMS);
}
