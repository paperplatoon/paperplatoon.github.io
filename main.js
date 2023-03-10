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

//add a card that doubles your next attack value
//add a "isNextAttackDoubled" property to monsters
//add a mark that makes an enemy take 2x damage ??
//add in gold rewards for combat fights
//add in a shop 

//MANA - figure out images, add to cards, add costs to moves
//add css backgrounds to moves and cards based on what their type is?




//DONE







//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Creating Monsters & Cards - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//action for each of these takes a state and returns a new state

function dealOpponentDamage(stateObj, damageNumber, attackNumber = 1) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    let calculatedDamage = ((damageNumber + newState.playerMonster.strength) * attackNumber);
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

playerMonsterArray = Object.values(playerMonsters);
opponentMonsterArray = Object.values(opponentMonsters);
fireCardArray = Object.values(fireCardPool);
waterCardArray = Object.values(waterCardPool);

let potentialMonsterChoices = playerMonsterArray;

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Creating the State - - - - - -  - - - - -


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

function renderChooseCardReward(stateObj) {
  document.getElementById("app").innerHTML = "";

  let cardChoiceDiv = document.createElement("Div");
  cardChoiceDiv.classList.add("card-choice-window");
  document.getElementById("app").appendChild(cardChoiceDiv);


  let shuffledCardPool = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  sampledCardPool.forEach(function (cardObj, index) {
    let cardDiv = document.createElement("Div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("playable");
    cardDiv.classList.add("card-reward");

    let topCardRowDiv = document.createElement("Div");
    topCardRowDiv.classList.add("card-top-row-reward");

      let cardCost = document.createElement("H3")
      if (typeof cardObj.cost === 'function') {
        cardCost.textContent = cardObj.cost(stateObj, index, sampledCardPool);
        cardCost.classList.add("hand-card-cost");
        topCardRowDiv.append(cardCost);
      } else if (cardObj.cost !== "energy" && typeof cardObj.cost === 'string') {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else if (cardObj.minReq > 0) {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
      } else{}


      let cardName = document.createElement("H3");
      cardName.textContent = cardObj.name;
      topCardRowDiv.append(cardName);
      cardDiv.append(topCardRowDiv);

    let cardText = document.createElement("P");
    cardText.textContent = cardObj.text(stateObj, index, sampledCardPool);
    cardDiv.append(cardText);

    cardDiv.addEventListener("click", function () {
        chooseThisCard(sampledCardPool[index], stateObj, index);
      });   

    if (cardObj.cardType == "fireEnergy") {
      cardDiv.classList.add("fire-energy");
    }
    if (cardObj.cardType == "waterEnergy") {
      cardDiv.classList.add("water-energy");
    }
    document.getElementById("app").appendChild(cardDiv);
  });

  let skipButton = document.createElement("Button");
  skipButton.addEventListener("click", function () {
    skipCards(stateObj);
  }); 
  skipButton.textContent = "I don't want to add any of these to my deck";
  skipButton.classList.add("skip-button");
  document.getElementById("app").appendChild(skipButton);

  let deckPileDiv = document.createElement("Div");
  deckPileDiv.setAttribute("id", "playerDeckPile");
  deckPileDiv.classList.add("remove-pile");
  deckPileDiv.textContent = "View Current Deck";  


  let deckDiv = document.createElement("Div");
  deckDiv.setAttribute("id", "deckDiv");
  
  deckPileDiv.append(deckDiv);
  document.getElementById("app").append(deckPileDiv);

};

function skipCards(stateObj) {
  if (stateObj.gymFightCount === 0) {
    console.log("boss beaten")
    stateObj = immer.produce(stateObj, (newState) => {
      newState.status = Status.InTown;
    })
  } else {
    stateObj = immer.produce(stateObj, (newState) => {
      newState.status = Status.InEncounter;
    })
    console.log("setting up next encounter")
    stateObj = setUpEncounter(stateObj);
  }
  changeState(stateObj);
  return stateObj;
}

function skipRemove(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function skipUpgrade(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function changeStatus(stateObj, newStatus) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.status = newStatus;
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

function chooseThisCard(cardObj, stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck.push(cardObj);    
  })

  if (stateObj.gymFightCount === 0) {
    console.log("boss beaten")
    stateObj = immer.produce(stateObj, (newState) => {
      newState.status = Status.InTown;
    })
  } else {
    stateObj = immer.produce(stateObj, (newState) => {
      newState.status = Status.InEncounter;
    })
    console.log("setting up next encounter")
    stateObj = setUpEncounter(stateObj);
  }
  //stateObj = setUpEncounter(stateObj);
  changeState(stateObj);
  return stateObj;
}

function removeCard(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.gold -= newState.cardRemoveCost;
    newState.cardRemoveCost += 50;
    newState.playerDeck.splice(index, 1);
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function encounterUpgradeCard(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.gold -= newState.cardUpgradeCost;
    newState.cardUpgradeCost += 50;
    newState.playerDeck[index].upgrades +=1;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}

function decreaseCardCost(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseCost -=1;
    newState.costDecreased = true;
    newState.status = Status.InTown;
  })
  changeState(stateObj);
  return stateObj;
}




const Status = {
  ChoosingMonster: "Choose a monster",
  UpgradingCards: "Choose any card from your deck to upgrade",
  EncounterRewards: "Choose a card to add to your deck",
  InEncounter: "in encounter",
  WonEncounter: "won encounter",
  RemovingCards: "choose a card to remove from your deck",
  Death: "You died",
  InTown: "In Town",
  DecreasingCost: "decreasing card cost"
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
  costDecreased: false,
  extraHeal: 0
};






function changeState(newStateObj) {
  console.log("you're changing the state and the status is " + newStateObj.status);
  state = {...newStateObj}
  //state = { ...handleDeaths() };
  renderScreen(state);
}

function handleDeaths(stateObj) {
  let shouldUpgrade = false;
  console.log("handling deaths");
  if (stateObj.opponentMonster) {
    stateObj = immer.produce(stateObj, (newState) => {
      newState.opponentMonster.forEach(function (monster, index) {
        if (monster.drown >= monster.currentHP && monster.currentHP > 0) {
          console.log("opponent monster at index " + index + " has drowned.")
          newState.opponentMonster.splice(index, 1);
          newState.targetedMonster = 0;
        }
        if (monster.currentHP <= 0) {
          console.log("opponent monster at index " + index + " has died.")
          newState.opponentMonster.splice(index, 1);
          newState.targetedMonster = 0;
        }
      });
      if (newState.opponentMonster.length == 0) {
        console.log("all opponents dead");
        newState.playerMonster.strength -= newState.playerMonster.tempStrength;
        newState.playerMonster.dex -= newState.playerMonster.tempDex;
        newState.gold += gyms[newState.gymCount][newState.gymFightCount].goldReward

        if (gyms[newState.gymCount][newState.gymFightCount].boss) {
          newState.gymFightCount = 0;
          newState.gymCount += 1;
          newState.costDecreased = false; 
          newState.status = Status.EncounterRewards;
        } else {
          newState.gymFightCount += 1;
          newState.status = Status.EncounterRewards;
          //return newState;
        }
        //something that goes through and resets card tempUpgrades and playCount for each card
        
        //newState = resetAfterEncounter(state);
      }

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
    console.log("gym count " + newState.gymCount)
    console.log("gym fight count " + newState.gymFightCount)
    newState.opponentMonster = gyms[newState.gymCount][newState.gymFightCount].opponents;
    newState.encounterHand = [];
    newState.encounterDiscard = [];
    newState.enemyFightHealTotal = 0;
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
    if (handLength > 8 ) {
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

  let drawPileDiv = document.createElement("Div");
  drawPileDiv.setAttribute("id", "drawPile");
  drawPileDiv.classList.add("pile");
  drawPileDiv.textContent = "Draw";

  let drawDiv = document.createElement("Div");
  drawDiv.setAttribute("id", "drawDiv");
  drawPileDiv.append(drawDiv);
  topRowDiv.append(drawPileDiv);

        
  let discardPileDiv = document.createElement("Div");
  discardPileDiv.setAttribute("id", "discardPile")
  discardPileDiv.classList.add("pile")
  discardPileDiv.textContent = "Discard"

  let discardDiv = document.createElement("Div");
  discardDiv.setAttribute("id", "discardDiv")
  discardPileDiv.append(discardDiv);
  topRowDiv.append(discardPileDiv);

  let goldDiv = document.createElement("Div");
  goldDiv.setAttribute("id", "goldDiv")
  goldDiv.textContent = stateObj.gold;
  topRowDiv.append(goldDiv);

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
  <div class="flex-container" id="stats">
    <div class="flex-container" id="playerMonster">
      <div id="playerStats"> </div>
      <div id="handContainer2"> </div>
    </div>

    <div id="opponents"></div>
  </div>

  </div>
  <button id="shuffleDrawButton">Start Encounter</button>
  <button id="endTurnButton">End Turn</button>
  <!-- <button id="resetButton">Reset</button> -->

  </div>`;
  document.getElementById("shuffleDrawButton").onclick = function () {
    startEncounter(state);
  };
  document.getElementById("endTurnButton").onclick = function () {
    endTurn(state);
  };
}

function renderTown(stateObj) {
  document.getElementById("app").innerHTML = `
  <div id="town-top-row">
    <div id="playerDeckPile" class="remove-pile">View Current Deck
      <div id="deckDiv"> </div>
    </div>
  <div id="goldDiv">
    <img src="img/goldsack.png" class="bg-image"></img>
    <h3 id="goldText"></h3>
  </div>
  </div>

  <div class="flex-container" id="town">
      <div id="TownRemove" class="town-div">
        <img src="img/tavern2.png" class="bg-image"></img>
        <h3 id="removeText" class="fight-text">Remove A Card</h3> 
      </div>
      <div id="TownUpgrade" class="town-div">
        <img src="img/forge.png" class="bg-image"></img>
        <h3 id="upgradeText" class="fight-text">Upgrade A Card</h3> 
      </div>
      <div id="TownFight" class="town-div">
        <img src="img/dracula.png" class="bg-image"></img>
        <h3 class="fight-text">Fight Town Gym</h3> 
      </div>

      <div id="TownDecrease" class="town-div">
        <img src="img/dracula.png" class="bg-image"></img>
        <h3 id="decreaseText" class="fight-text">Decrease Card Cost</h3> 
      </div>
  </div>
  `;


  if (stateObj.gold >= stateObj.cardRemoveCost) {
    document.getElementById("TownRemove").classList.add("clickable-town-div")
    document.getElementById("TownRemove").onclick = function () {
      changeStatus(stateObj, Status.RemovingCards);
    }
  } else {
    document.getElementById("removeText").textContent = "Not enough gold to remove a card";
  };

  if (stateObj.costDecreased === false) {
    document.getElementById("TownDecrease").classList.add("clickable-town-div")
    document.getElementById("TownDecrease").onclick = function () {
      changeStatus(stateObj, Status.DecreasingCost);
    }
  } else {
    document.getElementById("decreaseText").textContent = "Already decreased cost of a card";
  };

  if (stateObj.gold >= stateObj.cardUpgradeCost) {
    document.getElementById("TownUpgrade").classList.add("clickable-town-div")
    document.getElementById("TownUpgrade").onclick = function () {
      changeStatus(stateObj, Status.UpgradingCards);
    };
  } else {
    document.getElementById("upgradeText").textContent = "Not enough gold to upgrade a card";
  }
  document.getElementById("TownFight").classList.add("clickable-town-div")
  document.getElementById("TownFight").onclick = function () {
    TownFight(stateObj);
    };

  document.getElementById("goldText").textContent = stateObj.gold;
}

//render player's hand
function renderHand(stateObj) {
  document.getElementById("handContainer2").innerHTML = "";
  if (stateObj.encounterHand.length > 0) {
    stateObj.encounterHand.forEach(function (cardObj, index) {
      let cardDiv = document.createElement("Div");
      cardDiv.id = index;
      cardDiv.classList.add("card");

      let topCardRowDiv = document.createElement("Div");
      topCardRowDiv.classList.add("card-top-row")
      let cardName = document.createElement("H3");
      cardName.textContent = cardObj.name;
      
      let cardCost = document.createElement("H3")
      if (typeof cardObj.cost === 'function') {
        cardCost.textContent = cardObj.cost(stateObj, index, stateObj.encounterHand);
        cardCost.classList.add("hand-card-cost");
        topCardRowDiv.append(cardCost);
      } else if (cardObj.cost !== "energy" && typeof cardObj.cost === 'string') {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else if (cardObj.minReq > 0) {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
      } else{}

      topCardRowDiv.append(cardName);

      cardDiv.append(topCardRowDiv);

      let cardText = document.createElement("P");

  
      cardText.textContent = cardObj.text(stateObj, index, stateObj.encounterHand);
      cardDiv.append(cardText);
      
      
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
      
      
     
      if (cardObj.cardType == "fireEnergy") {
        cardDiv.classList.add("fire-energy");
      }
      if (cardObj.cardType == "waterEnergy") {
        cardDiv.classList.add("water-energy");
      }
      
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
      cardDiv.classList.add("card-pile-card");
      if (cardObj.cardType == "fireEnergy") {
        cardDiv.classList.add("fire-energy");
      }
      if (cardObj.cardType == "waterEnergy") {
        cardDiv.classList.add("water-energy");
      }
      let cardName = document.createElement("H3");
      let cardText = document.createElement("P");
      cardName.textContent = cardObj.name;
      cardText.textContent = cardObj.text(state, index, cardArrayObj);
      cardDiv.append(cardName, cardText);
      document.getElementById(divStringName).appendChild(cardDiv);
    });
  }
}

function renderRemoveCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  stateObj.playerDeck.forEach(function (cardObj, index) {
    let cardDiv = document.createElement("Div");
      cardDiv.id = index;
      cardDiv.classList.add("card");
      cardDiv.classList.add("playable");
      cardDiv.classList.add("card-reward");

      let topCardRowDiv = document.createElement("Div");
      topCardRowDiv.classList.add("card-top-row")
      let cardName = document.createElement("H3");
      cardName.textContent = cardObj.name;
      
      let cardCost = document.createElement("H3")
      if (typeof cardObj.cost === 'function') {
        cardCost.textContent = cardObj.cost(stateObj, index, stateObj.playerDeck);
        cardCost.classList.add("hand-card-cost");
        topCardRowDiv.append(cardCost);
      } else if (cardObj.cost !== "energy" && cardObj.cost > 0) {
        cardCost.textContent = cardObj.cost;
        cardCost.classList.add("hand-card-cost");
        topCardRowDiv.append(cardCost);
      } else {

      }
      topCardRowDiv.append(cardName);

      cardDiv.append(topCardRowDiv);
      
      let cardText = document.createElement("P");
      cardText.textContent = cardObj.text(stateObj, index, stateObj.playerDeck);
      cardDiv.append(cardText);

      cardDiv.addEventListener("click", function () {
        removeCard(stateObj, index);
      });
      if (cardObj.cardType == "fireEnergy") {
        cardDiv.classList.add("fire-energy");
      }
      if (cardObj.cardType == "waterEnergy") {
        cardDiv.classList.add("water-energy");
      }
      document.getElementById("app").appendChild(cardDiv);
  })
  let skipButton = document.createElement("Button");
  skipButton.addEventListener("click", function () {
    skipRemove(stateObj);
  }); 
  skipButton.textContent = "I don't want to remove any of these cards from my deck";
  skipButton.classList.add("skip-button");
  document.getElementById("app").appendChild(skipButton);
  
};

function renderClickableCardList(stateObj, cardArray, divName, functionToAdd) {
  cardArray.forEach(function (cardObj, index) {
    renderCard(stateObj, cardArray, cardObj, index, divName, functionToAdd)
  })
}

stateObj, cardArray, cardObj, index, divName

// function renderClickableCardList(stateObj, cardArray, divName, functionToAdd) {
//   cardArray.forEach(function (cardObj, index) {
//     let cardDiv = document.createElement("Div");
//       cardDiv.id = index;
//       cardDiv.classList.add("card");
//       cardDiv.classList.add("playable");
//       cardDiv.classList.add("card-reward");

//       let topCardRowDiv = document.createElement("Div");
//       topCardRowDiv.classList.add("card-top-row")
//       let cardName = document.createElement("H3");
//       cardName.textContent = cardObj.name;
      
//       let cardCost = document.createElement("H3")
//       if (typeof cardObj.cost === 'function') {
//         cardCost.textContent = cardObj.cost(stateObj, index, cardArray);
//         cardCost.classList.add("hand-card-cost");
//         topCardRowDiv.append(cardCost);
//       } else if (cardObj.cost !== "energy" && cardObj.cost > 0) {
//         cardCost.textContent = cardObj.cost;
//         cardCost.classList.add("hand-card-cost");
//         topCardRowDiv.append(cardCost);
//       } else {

//       }
//       topCardRowDiv.append(cardName);

//       cardDiv.append(topCardRowDiv);
      
//       let cardText = document.createElement("P");
//       cardText.textContent = cardObj.text(stateObj, index, cardArray);
//       cardDiv.append(cardText);

//       cardDiv.addEventListener("click", function () {
//         functionToAdd(stateObj, index);
//       });
//       if (cardObj.cardType == "fireEnergy") {
//         cardDiv.classList.add("fire-energy");
//       }
//       if (cardObj.cardType == "waterEnergy") {
//         cardDiv.classList.add("water-energy");
//       }
//       document.getElementById(divName).appendChild(cardDiv);
//   })
// }



function renderUpgradeCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  renderClickableCardList(stateObj, stateObj.playerDeck, "app", encounterUpgradeCard);
 
  let skipButton = document.createElement("Button");
  skipButton.addEventListener("click", function () {
    skipUpgrade(stateObj);
  }); 
  skipButton.textContent = "I don't want to upgrade any of these cards";
  skipButton.classList.add("skip-button");
  document.getElementById("app").appendChild(skipButton);
  
};

function renderCard(stateObj, cardArray, cardObj, index, divName, functionToAdd) {
  let cardDiv = document.createElement("Div");
        cardDiv.id = index;
        cardDiv.classList.add("card");
        cardDiv.classList.add("playable");
        cardDiv.classList.add("card-reward");

        let topCardRowDiv = document.createElement("Div");
        topCardRowDiv.classList.add("card-top-row")
        let cardName = document.createElement("H3");
        cardName.textContent = cardObj.name;
        
        let cardCost = document.createElement("H3")
        if (typeof cardObj.cost === 'function') {
          cardCost.textContent = cardObj.cost(stateObj, index, cardArray);
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else if (cardObj.cost !== "energy" && cardObj.cost > 0) {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else {

        }
        topCardRowDiv.append(cardName);

        cardDiv.append(topCardRowDiv);
        
        let cardText = document.createElement("P");
        cardText.textContent = cardObj.text(stateObj, index, stateObj.playerDeck);
        cardDiv.append(cardText);

        cardDiv.addEventListener("click", function () {
          functionToAdd(stateObj, index, cardArray);
        });
        if (cardObj.cardType == "fireEnergy") {
          cardDiv.classList.add("fire-energy");
        }
        if (cardObj.cardType == "waterEnergy") {
          cardDiv.classList.add("water-energy");
        }
        document.getElementById(divName).appendChild(cardDiv);

}

function renderDecreaseCardCost(stateObj) {
  document.getElementById("app").innerHTML = ""
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseCost && typeof cardObj.baseCost === 'number') {
      let cardDiv = document.createElement("Div");
        cardDiv.id = index;
        cardDiv.classList.add("card");
        cardDiv.classList.add("playable");
        cardDiv.classList.add("card-reward");

        let topCardRowDiv = document.createElement("Div");
        topCardRowDiv.classList.add("card-top-row")
        let cardName = document.createElement("H3");
        cardName.textContent = cardObj.name;
        
        let cardCost = document.createElement("H3")
        if (typeof cardObj.cost === 'function') {
          cardCost.textContent = cardObj.cost(stateObj, index, stateObj.playerDeck);
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else if (cardObj.cost !== "energy" && cardObj.cost > 0) {
          cardCost.textContent = cardObj.cost;
          cardCost.classList.add("hand-card-cost");
          topCardRowDiv.append(cardCost);
        } else {

        }
        topCardRowDiv.append(cardName);

        cardDiv.append(topCardRowDiv);
        
        let cardText = document.createElement("P");
        cardText.textContent = cardObj.text(stateObj, index, stateObj.playerDeck);
        cardDiv.append(cardText);

        cardDiv.addEventListener("click", function () {
          decreaseCardCost(stateObj, index, stateObj.playerDeck);
        });
        if (cardObj.cardType == "fireEnergy") {
          cardDiv.classList.add("fire-energy");
        }
        if (cardObj.cardType == "waterEnergy") {
          cardDiv.classList.add("water-energy");
        }
        document.getElementById("app").appendChild(cardDiv);
    }
  })

  let skipButton = document.createElement("Button");
  skipButton.addEventListener("click", function () {
    skipUpgrade(stateObj);
  }); 
  skipButton.textContent = "I don't want to decrease the cost of any of these cards";
  skipButton.classList.add("skip-button");
  document.getElementById("app").appendChild(skipButton);
  
};

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
        console.log("movetext is function")
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
      renderCardPile(stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.RemovingCards) {
    renderRemoveCard(stateObj);
  } else if (stateObj.status == Status.UpgradingCards) {
    renderUpgradeCard(stateObj);
  } else if (stateObj.status == Status.InTown) {
    renderTown(stateObj);
    renderCardPile(stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DecreasingCost) {
    renderDecreaseCardCost(stateObj);
    renderCardPile(stateObj.playerDeck, "deckDiv")
  } else {
    renderDivs(stateObj);
    renderPlayerMonster(stateObj);
    renderHand(stateObj);
    renderCardPile(stateObj.encounterDraw, "drawDiv");
    renderCardPile(stateObj.encounterDiscard, "discardDiv");
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

