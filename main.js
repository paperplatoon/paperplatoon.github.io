




//import clone from "https://cdn.skypack.dev/clone@2.1.2";

//TO-DO
//figure out some way to render energy inside the right icon (flame/water/etc)
//add 
//figure out a way to do tooltips

//add in a monster flag that, if true, does not set block to 0 between cards
//add in a card that allows you to keep block between turns

//MANA - css images, add to cards, add costs to moves
//add css backgrounds to moves and cards based on what their type is?

//9 total
//Event - 2 per town
//fight - 4 per town
//heal shop - 1 per town
//free heal - 1 per town
//card shop - 1 per town



//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Creating the State - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
const Status = {
  ChoosingMonster: "Choose a monster",
  UpgradingCards: "Choose any card from your deck to upgrade",
  EncounterRewards: "Choose a card to add to your deck",
  OverworldMap: "choose where to go next",
  InEncounter: "in encounter",
  WonEncounter: "won encounter",
  RemovingCards: "choose a card to remove from your deck",
  Death: "You died",
  InTown: "In Town",
  DecreasingCost: "Choose a card and decrease its cost by 1",
  IncreasingBlock: "Choose a card to increase its block by 5",
  IncreasingHits: "Choose a card to hit 1 extra time",
  IncreasingAttack: "Choose an attack to deal +10 damage",
  DuplicatingCards: "Choose a card. Add a copy of it to your deck",
  DoublingAttack: "Choose a card. Double its base damage",
  DoubleUpgradeEvent: "Choose a card. Upgrade it twice",
  LevelUpEvent: "Choose a trait to permanently level up",
  ChooseRareEvent: "Choose a rare card to add to your deck",
  PaidRemovalEvent: "Choose a card to sell for 50 gold (rare cards are worth 100 gold)",
  AssassinTrainingEvent: "Remove all attacks from your deck. Add a Fatal Toxin (applies 5 poison)",
  ShowCardPool: "showing card pool",
  HealersShop: "Restore your health for a price",
  cardShop: "Buy cards to add to your deck",
  DeathScreen: "You stupid, stupid asshole! You got your Neo-Neopet killed! Refresh the page to try again",
  VictoryScreen: "You and your little Neo-Neopet have beaten all the content available in this demo! Check back soon!"
};

let gameStartState = {
  playerMonster: false,
  status: Status.ChoosingMonster,
  enemyFightHealTotal: 0,
  gymCount: 0,
  gymFightCount: 0,
  gold: 50,
  cardRemoveCost: 75,
  cardUpgradeCost: 50,
  healCost: 50,
  cardsSkipped: 0,
  eventUsed: false,
  extraHeal: 0,
  fightHealCount: 0,
  fightHealTotal: 0,
  fightEnergyGiftCount: 0,
  fightEnergyGiftTotal: 0,
  fightEnergyDrainCount: 0,
  fightEnergyDrainTotal: 0,
  selfDamageBlock: 0,
  energyGiftBlock: 0,
  energyGiftAttack: 0,
  selfDamageAttack: 0,
  cardsPerTurn: 0,
  comboPerTurn: 0,
  gainLifePerCard: 0,
  townEventChosen: false,
  townFreeHealUsed: false,
  availableCardPoolForShop: false,
  fightStarted: false,
  fightingBoss: false,
  InTown: false,
  leveledUpDuringCombat: 0,
  townMapSquares: ["hidden", "here", "hidden", "Fight", "Fight", "Fight", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "hidden", "Town", "hidden"],
  townMonsterArray: [],
  townBossEncounter: false,
  //townMapSquares: [...Array(15).keys()],
  playerHere: 1,
  townMapSet: false,
  playerXP: 0,
  playerLevel: 1
};

let levelXPRequirements = [0, 30, 70, 120, 180, 250, 330, 420, 520];

const eventsArray = [
  // {
  //   divID: "TownEvent",
  //   imgSrc: "img/wizardshop.png",
  //   divText: "ShowCardPool",
  //   newStatus: Status.ShowCardPool,
  //   eventID: 100
  // },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Choose Rare Card",
    newStatus: Status.ChooseRareEvent,
    eventID: 0
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Assassin Training",
    newStatus: Status.AssassinTrainingEvent,
    eventID: 10
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Get Paid to Remove Card",
    newStatus: Status.PaidRemovalEvent,
    eventID: 9
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Stats",
    newStatus: Status.LevelUpEvent,
    eventID: 1
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Upgrade Card 2x",
    newStatus: Status.DoubleUpgradeEvent,
    eventID: 2
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Double Card's Attack",
    newStatus: Status.DoublingAttack,
    eventID: 3
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Duplicate Card",
    newStatus: Status.DuplicatingCards,
    eventID: 4
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Card Hits",
    newStatus: Status.IncreasingHits,
    eventID: 5
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Decrease Card Cost",
    newStatus: Status.DecreasingCost,
    eventID: 6
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Card Block",
    newStatus: Status.IncreasingBlock,
    eventID: 7
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Card Attack",
    newStatus: Status.IncreasingAttack,
    eventID: 8
  },
];

//takes a stateObject and fills its map with events
function fillMapWithArray(stateObj) {
  console.log("fill Mpa with Array is being called")
  let mapFillArray = ["?", "?", "Fight", "Fight", "Fight", "Fight", "path", "path", "path", "Fight", "Shop", "Healer", "Upgrade", "Remove"];
  let shuffledMap = fisherYatesShuffle(mapFillArray);


  let easyEncounters = fisherYatesShuffle(easyEncountersMjs);
  let mediumEncounters = fisherYatesShuffle(mediumEncountersMjs)
  let bossEncounters = fisherYatesShuffle(bossEncountersMjs)

  let townMonsterEncounters = [easyEncounters[0], easyEncounters[1], mediumEncounters[0], mediumEncounters[1], mediumEncounters[2], mediumEncounters[3]];

    //fill the actual map
    stateObj = immer.produce(stateObj, (newState) => {
      newState.townMapSquares[3] = shuffledMap[0]
      newState.townMapSquares[5] = shuffledMap[1]
      for (i=6; i < 18; i++) {
          newState.townMapSquares[i] = shuffledMap[i-4];
    }

    if (stateObj.gymCount > 0) {
      newState.townMapSquares[4] = "Fight";

    }
    //newState.status = Status.InTown;
    newState.townMapSet = true;
    newState.playerHere = 1;
    newState.status = Status.OverworldMap
    newState.townMonsterArray = townMonsterEncounters;
  
     newState.townBossEncounter = bossEncounters[0];
  })
  changeState(stateObj);
  return stateObj
}

function renderMapScreen(stateObj) {
  if (stateObj.townMapSet === false) {
    stateObj = fillMapWithArray(stateObj);
  }
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  let mapDiv = document.createElement("Div");
  mapDiv.classList.add("map-div");
  //render each map square  
  stateObj.townMapSquares.forEach(function (mapSquare, squareIndex) {
    if (squareIndex === 1) {
      let mapSquareDiv = createMapSquareDiv(stateObj, squareIndex, ["Start"])
      mapSquareDiv.classList.add("completed")
      mapDiv.append(mapSquareDiv);
    } else if (squareIndex === 19) {
      let mapSquareDiv = createMapSquareDiv(stateObj, squareIndex, ["Town"])
      mapDiv.append(mapSquareDiv);
    } else {
      let newMapDiv = createMapSquareDiv(stateObj, squareIndex, [stateObj.townMapSquares[squareIndex]])
      mapDiv.append(newMapDiv);
    }
    document.getElementById("app").append(mapDiv);
  })
}


function isSquareReachable(stateObj, indexOfSquare) {
  return (
    ( stateObj.townMapSquares.length >= stateObj.playerHere+3 && indexOfSquare === stateObj.playerHere+3) ||
    (stateObj.playerHere-3 >= 0 && indexOfSquare === stateObj.playerHere-3) ||
    (stateObj.playerHere-1 >= 0  && indexOfSquare === stateObj.playerHere-1) ||
    (stateObj.townMapSquares.length >= stateObj.playerHere+1 && indexOfSquare === stateObj.playerHere+1)
  ) 
}

function createMapSquareDiv(stateObj, indexOfSquare, classesToAdd) {
  let mapSquareDiv = document.createElement("Div");
  mapSquareDiv.classList.add("map-square");
  

  if (isSquareReachable(stateObj, indexOfSquare) === true) {
    mapSquareDiv.classList.add("clickable-square")
    mapSquareDiv.textContent = classesToAdd[0]
    mapSquareDiv.addEventListener("click", function() {
      //the state getting passed here somehow has 
      changeMapSquare(stateObj, indexOfSquare)
    })
  } else {
    mapSquareDiv.textContent = classesToAdd[0];
  }

  if (classesToAdd.includes("Remove") || classesToAdd.includes("Upgrade") || classesToAdd.includes("?")) {
    mapSquareDiv.textContent = "?"
    mapSquareDiv.classList.add("Event")
  } else if (classesToAdd.includes("Town")) {
    mapSquareDiv.textContent = "";
    let arrow = document.createElement("Div");
    arrow.classList.add("arrow-1");
    mapSquareDiv.append(arrow); 
  } else if (classesToAdd.includes("path") || classesToAdd.includes("completed") || classesToAdd.includes("Start")) {
    mapSquareDiv.textContent = "";
  } else if (classesToAdd.includes("Fight")) {
    mapSquareDiv.textContent = "";
    let pentagram = document.createElement("Div");
    pentagram.classList.add("pentagram");
    mapSquareDiv.append(pentagram); 
  } else if (classesToAdd.includes("Healer")) {
    mapSquareDiv.textContent = "";
    let heart = document.createElement("Div");
    heart.classList.add("monster-hp");
    mapSquareDiv.append(heart); 
  } else if (classesToAdd.includes("Shop")) {
    mapSquareDiv.textContent = "$";
  } else {}

  if (indexOfSquare === stateObj.playerHere) {
    mapSquareDiv.textContent = "You are here";
    mapSquareDiv.classList.add("here");
  }
  classesToAdd.forEach(function (myClass, classIndex) {
    mapSquareDiv.classList.add(myClass);
  }) 
  return mapSquareDiv;
}

function changeMapSquare(stateObj, indexToMoveTo) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerHere = indexToMoveTo
  })
    if (stateObj.townMapSquares[indexToMoveTo] === "Fight") {
      stateObj = setUpEncounter(stateObj);
      stateObj = immer.produce(stateObj, (newState) => {
        newState.Status = Status.InEncounter
      })
    } else if (stateObj.townMapSquares[indexToMoveTo] === "Shop") {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.status = Status.cardShop
      })
    }  else if (indexToMoveTo === 19) {
      console.log("clicked on a town")
      stateObj = immer.produce(stateObj, (newState) => {
        newState.status = Status.InTown;
        newState.InTown = true;
      })
    } else if (stateObj.townMapSquares[indexToMoveTo] === "?") {
      console.log("clicked on an event")
      shuffledEventsArray = fisherYatesShuffle(eventsArray);
      stateObj = immer.produce(stateObj, (newState) => {
        newState.status = shuffledEventsArray[1].newStatus;
      })
    } else if (stateObj.townMapSquares[indexToMoveTo] === "Healer") {
      console.log("clicked on an healer")
      stateObj = immer.produce(stateObj, (newState) => {
        newState.status = Status.HealersShop;
      })
    } else if (stateObj.townMapSquares[indexToMoveTo] === "Remove") {
      console.log("clicked on remove")
      stateObj = immer.produce(stateObj, (newState) => {
        newState.status = Status.RemovingCards;
      })
    } else if (stateObj.townMapSquares[indexToMoveTo] === "Upgrade") {
      console.log("clicked on upgrade")
      stateObj = immer.produce(stateObj, (newState) => {
        newState.status = Status.UpgradingCards;
      })
    } else {
      console.log("clicked on a non fight")
      stateObj = immer.produce(stateObj, (newState) => {
        newState.Status = Status.OverworldMap
      })
    }
  changeState(stateObj);
  return stateObj;
}


playerMonsterArray = Object.values(playerMonsters);
opponentMonsterArray = Object.values(opponentMonsters);
fireCardArray = Object.values(fireCardPool);
waterCardArray = Object.values(waterCardPool);

let potentialMonsterChoices = playerMonsterArray;


function changeState(newStateObj) {
  console.log("state changing: fightStarted changing from " + state.fightStarted + " to " + newStateObj.fightStarted)
  let stateObj = {...newStateObj}
  if (newStateObj.status === Status.InEncounter) {
    stateObj = handleDeaths(stateObj);
  }

  if (stateObj.status !== Status.InEncounter && newStateObj.playerXP >= levelXPRequirements[stateObj.playerLevel]) {
    stateObj = monsterLevelUp(stateObj);
  } else if (newStateObj.status === Status.InEncounter && newStateObj.playerXP >= levelXPRequirements[stateObj.playerLevel]) {
    stateObj = immer.produce(stateObj, (newState) => {
      newState.leveledUpDuringCombat = findLowestIndex(newStateObj.playerXP, levelXPRequirements);
    })
  }
  state = {...stateObj}
 
  renderScreen(stateObj);
  return stateObj
}


function findLowestIndex(numberInput, arrayInput) {
  lowestIndex = 0;
  for (i=0; i< arrayInput.length; i++) {
    if (numberInput > arrayInput[i]) {
      lowestIndex = i;
    }
  }
  return lowestIndex;
} 


let state = {...gameStartState};
renderScreen(state);

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Functions used by Cards.js and Monsters.js - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
function dealOpponentDamage(stateObj, damageNumber, attackNumber = 1, energyCost=false, all=false, specifiedIndex=false) {
  let targetIndex = (specifiedIndex) ? specifiedIndex : stateObj.targetedMonster 
  let toChangeState = immer.produce(stateObj, (newState) => {
    let calculatedDamage = ((damageNumber + newState.playerMonster.strength) * attackNumber);
    if (calculatedDamage > 0) {
      if (all===true) {
        newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
          if (monsterObj.hunted > 0) {
            calculatedDamage *=2;
          }
          if (monsterObj.encounterBlock == 0) {
            console.log("You dealt " + calculatedDamage + " to " + monsterObj.name);
            monsterObj.currentHP -= calculatedDamage;
          } else if (monsterObj.encounterBlock >= calculatedDamage) {
            console.log(monsterObj.name + " blocked for " + calculatedDamage);
            monsterObj.encounterBlock -= calculatedDamage;
          } else {
            console.log(monsterObj.name + " blocked for " + calculatedDamage + " and took " + (calculatedDamage - monsterObj.encounterBlock) + " damage");
            monsterObj.currentHP -= (calculatedDamage - monsterObj.encounterBlock);
            monsterObj.encounterBlock = 0;
          }
        })
      } else {
        if (newState.opponentMonster[targetIndex].hunted > 0) {
          calculatedDamage *=2;
        }
        if (newState.opponentMonster[targetIndex].encounterBlock == 0) {
          console.log("You dealt " + calculatedDamage + " to " + newState.opponentMonster[targetIndex].name);
          newState.opponentMonster[targetIndex].currentHP -= calculatedDamage;
        } else if (newState.opponentMonster[targetIndex].encounterBlock >= calculatedDamage) {
          console.log(newState.opponentMonster[targetIndex].name + " blocked for " + calculatedDamage);
          newState.opponentMonster[targetIndex].encounterBlock -= calculatedDamage;
        } else {
          console.log(newState.opponentMonster[targetIndex].name + " blocked for " + calculatedDamage + " and took " + (calculatedDamage - newState.opponentMonster[targetIndex].encounterBlock) + " damage");
          newState.opponentMonster[targetIndex].currentHP -= (calculatedDamage - newState.opponentMonster[targetIndex].encounterBlock);
          newState.opponentMonster[targetIndex].encounterBlock = 0;
        }
      }
    }
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost
    }
  });
  return toChangeState;
}

function dealPlayerDamage(stateObj, damageNumber, monsterIndex = 0, energyChange=false, attackNumber = 1) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    calculatedDamage = ((damageNumber + newState.opponentMonster[monsterIndex].strength) * attackNumber);
    if (calculatedDamage > 0) {
      if (newState.playerMonster.encounterBlock == 0) {
        console.log("you took " + calculatedDamage + " damage")
        newState.playerMonster.currentHP -= calculatedDamage;
      } else if (newState.playerMonster.encounterBlock >= calculatedDamage) {
        newState.playerMonster.encounterBlock -= calculatedDamage;
        console.log("you blocked " + calculatedDamage + " damage")
      } else {
        console.log("you blocked " + newState.playerMonster.encounterBlock + " damage and took " + (calculatedDamage - newState.playerMonster.encounterBlock) + " damage" )
        newState.playerMonster.currentHP -= (calculatedDamage - newState.playerMonster.encounterBlock);
        newState.playerMonster.encounterBlock = 0;
      }
      if (energyChange) {
        newState.opponentMonster[monsterIndex].encounterEnergy += energyChange
      }
    }
  });
  return toChangeState;
}

function healPlayer(stateObj, amountToHeal, energyCost=false) {
  amountToHeal += stateObj.extraHeal;
  let healthDiff = stateObj.playerMonster.maxHP - stateObj.playerMonster.currentHP
  stateObj = immer.produce(stateObj, (newState) => {
    if (healthDiff <= amountToHeal) {
      newState.fightHealTotal += newState.playerMonster.maxHP-newState.playerMonster.currentHP;
      newState.playerMonster.currentHP = newState.playerMonster.maxHP;
      newState.fightHealTotal += healthDiff    
      if (healthDiff > 0) {
        newState.fightHealCount += 1;
      } 
    } else {
      newState.playerMonster.currentHP += amountToHeal;
      newState.fightHealCount += 1;
      newState.fightHealTotal += amountToHeal;
    }
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost;
    }
  })
  
  return stateObj
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

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function addBackstepsToHand(stateObj, numberToAdd=1) {
  stateObj = immer.produce(stateObj, (newState) => {
    for (let i=0; i < numberToAdd; i++) {
      if (newState.encounterHand.length > 8) {
        console.log("hand was full, backstep was not added")
      } else
      newState.encounterHand.push(fireCardPool.backstep)
    }
  })
  return stateObj
}

function energyGift(stateObj, energyToGain, energyCost=false) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster[newState.targetedMonster].encounterEnergy += energyToGain;
    newState.fightEnergyGiftCount += 1
    newState.fightEnergyGiftTotal += energyToGain
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost
    }
    if (newState.energyGiftBlock > 0) {
      newState.playerMonster.encounterBlock += newState.energyGiftBlock;
    }
  })
  if (stateObj.energyGiftAttack > 0) {
    let targetIndex = Math.floor(Math.random() * (stateObj.opponentMonster.length))
    stateObj = dealOpponentDamage(stateObj, (stateObj.energyGiftAttack-stateObj.playerMonster.strength), attackNumber=1, all=true);  
  }
  return stateObj
}

function destroyEnergy(stateObj, energyToDestroy, energyCost=false) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster[newState.targetedMonster].encounterEnergy -= energyToDestroy;
    newState.fightEnergyDrainCount += 1
    newState.fightEnergyDrainTotal += energyToDestroy
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost
    }
  })
  return stateObj
}

function gainBlock(stateObj, blockToGain, energyCost=false, blockNumber=1) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.encounterBlock += (blockToGain + stateObj.playerMonster.dex)*blockNumber;
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost
    }
  })
  return stateObj
}


function dealSelfDamage(stateObj, damageToDo) {
  stateObj = immer.produce(stateObj, (newState) => {
      newState.playerMonster.currentHP -= damageToDo
      newState.fightSelfDamageCount += 1;
      newState.fightSelfDamageTotal += damageToDo;

      if (newState.selfDamageBlock > 0) {
        newState.playerMonster.encounterBlock += newState.selfDamageBlock;
      }
      if (newState.selfDamageAttack > 0) {
        let targetIndex = Math.floor(Math.random() * (newState.opponentMonster.length))
        let tempState = dealOpponentDamage(newState, (newState.selfDamageAttack-stateObj.playerMonster.strength), attackNumber=1, all=false, specifiedIndex=targetIndex);
        newState.opponentMonster[targetIndex].currentHP = tempState.opponentMonster[targetIndex].currentHP;
        newState.opponentMonster[targetIndex].encounterBlock = tempState.opponentMonster[targetIndex].encounterBlock;
      }
    });
  return stateObj; 
};


//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Rendering the Screen - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

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
    newState.playerDeck = potentialMonsterChoices[index].startingDeck;
    newState.status = Status.OverworldMap;

  })
  changeState(stateObj);
  return stateObj;
}

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Click functions to add to stuff - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

function changeStatus(stateObj, newStatus, countsAsEventSkipForChangeStatus=false, skipGoldGift=50) {
  //HUGE HACK, deal with this later, console.log
  document.querySelector("#playerDeckPile").classList.remove("upgrade-animation");
  stateObj = immer.produce(stateObj, (newState) => {
    if (countsAsEventSkipForChangeStatus === true) {
      newState.townMapSquares[newState.playerHere] = "completed";
      newState.gold += skipGoldGift;
    }
    newState.status = newStatus;
  })
  changeState(stateObj);
  return stateObj;
}

function skipCards(stateObj, isUsedForEventSkip=false) {
  stateObj = immer.produce(stateObj, (newState) => {
    if (isUsedForEventSkip) {
      newState.gold += 50
    }
    newState.cardsSkipped += 1;
    newState.gold += 5;
    newState.status = Status.OverworldMap;
  })
  changeState(stateObj);
  return stateObj;
}

function TownFight(stateObj) {
  stateObj = setUpEncounter(stateObj, isBoss=true)
  changeState(stateObj);
  return stateObj;
}

function chooseThisCard(stateObj, index, sampledCardPool) {
  console.log("added " + sampledCardPool[index].name + " to deck")
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck.push(sampledCardPool[index]); 

    if (newState.townEventChosen === 0){
      newState.eventUsed = true;
    }

    newState.status = Status.OverworldMap;   
  })
  changeState(stateObj);
  return stateObj;
}

function buyThisCard(stateObj, index, cardArray) {
  stateObj = immer.produce(stateObj, (newState) => {
    if (cardArray[index].rare === true && stateObj.gold >= 100) {
      newState.gold -= 100;
      newState.availableCardPoolForShop.splice(index, 1)
      newState.playerDeck.push(cardArray[index]); 
    } else if (stateObj.gold >= 50) {
      newState.gold -= 50;
      newState.availableCardPoolForShop.splice(index, 1)
      newState.playerDeck.push(cardArray[index]); 
    } else {
      console.log("not enough gold")
    }  
    
    newState.status = Status.cardShop;
  })

  changeState(stateObj);
  return stateObj;
}

function removeCard(stateObj, index) {
  console.log("removed " + stateObj.playerDeck[index].name + " from deck")

  
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck.splice(index, 1);

    if (stateObj.InTown === true) {
      newState.status = Status.InTown;
      newState.gold -= newState.cardUpgradeCost
      newState.cardUpgradeCost += 25;
    } else {
      newState.townMapSquares[newState.playerHere] = "completed"
      newState.status = Status.OverworldMap
    }
  })
  changeState(stateObj);
  return stateObj;
}

function assassinTraining(stateObj) {
  let indexesToDelete = [];
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerDeck.forEach(function (cardObj, cardIndex) {
      if (cardObj.cardType === "attack") {
        indexesToDelete.push(cardIndex);
      }
    });

    indexesToDelete.reverse()
    for (let i = 0; i < indexesToDelete.length; i++) {
     newState.playerDeck.splice(indexesToDelete[i], 1)
    }
    newState.playerDeck.push(specialCardPool.fataltoxin)
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function paidRemoval(stateObj, index) {
  console.log("removed " + stateObj.playerDeck[index].name + " from deck")
  stateObj = immer.produce(stateObj, (newState) => {
    let goldReward = (stateObj.playerDeck[index].rare === true) ? 100 : 50;
    newState.gold += goldReward;
    newState.playerDeck.splice(index, 1);
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function increaseStrengthEvent(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.strength += 2;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function increaseDexEvent(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerMonster.dex += 2;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function increaseEnergyEvent(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerMonster.turnEnergy += 1;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function duplicateCard(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    let cardObj = {...newState.playerDeck[index]}
    newState.eventUsed = true;
    newState.playerDeck.push(cardObj);
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function doubleUpgradeCard(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerDeck[index].upgrades +=2;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function encounterUpgradeCard(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].upgrades +=1;

    if (stateObj.InTown === true) {
      newState.status = Status.InTown;
      newState.gold -= newState.cardRemoveCost
      newState.cardRemoveCost += 50;
    } else {
      newState.townMapSquares[newState.playerHere] = "completed"
      newState.status = Status.OverworldMap
    }
  })
  changeState(stateObj);
  return stateObj;
}

function fullHeal(stateObj) {
    if (stateObj.status === Status.HealersShop) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.playerMonster.currentHP = newState.playerMonster.maxHP;
        newState.townMapSquares[newState.playerHere] = "completed"
        newState.status = Status.OverworldMap
      })
    } else if (stateObj.status === Status.cardShop) {
      stateObj = immer.produce(stateObj, (newState) => {
        newState.gold -= newState.healCost;
        newState.healCost += 25;
        newState.playerMonster.currentHP = newState.playerMonster.maxHP;
      })
    }

    changeState(stateObj);
    return stateObj;
  } 

function cheapHeal(stateObj) {
  if (stateObj.gold >= Math.floor(stateObj.healCost/2) && stateObj.playerMonster.currentHP < stateObj.playerMonster.maxHP) {
    stateObj = immer.produce(stateObj, (newState) => {  
      newState.gold -= (Math.floor(newState.healCost/2));
      healAmount = Math.floor(newState.playerMonster.maxHP/4)
      if ((newState.playerMonster.maxHP - newState.playerMonster.currentHP) <= (healAmount + newState.extraHeal)) {
        newState.playerMonster.currentHP = newState.playerMonster.maxHP;
      } else {
        newState.playerMonster.currentHP += (healAmount + newState.extraHeal)
      }    
    })
    changeState(stateObj);
  }
  return stateObj;
}

function decreaseCardCost(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseCost -=1;
    newState.eventUsed = true;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function increaseCardBlock(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseBlock += 7;
    newState.eventUsed = true;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function increaseCardAttack(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseDamage += 6;
    newState.eventUsed = true;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function doubleCardAttack(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseDamage *= 2;
    newState.eventUsed = true;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function increaseBaseHits(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseHits += 1;
    newState.eventUsed = true;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}






//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - - Functions for Cards - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----



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

  let turnEnergyStrengthDiv = document.createElement("Div");
  turnEnergyStrengthDiv.classList.add("flex", "row", "space-evenly");
  let EnergyStrengthDiv = document.createElement("Div");
  let turnButtonDiv = document.createElement("Div");


  let endTurnButton = document.createElement("Button");
  endTurnButton.classList.add("font5vmin")
  endTurnButton.addEventListener("click", function() {
    endTurn(stateObj)
  })
  endTurnButton.textContent = "End Turn";
  turnButtonDiv.append(endTurnButton)

  let playerEnergyText = document.createElement("H4");
  playerEnergyText.classList.add("player-energy")
  let playerStrengthandDexText = document.createElement("H4");
  playerEnergyText.textContent = "Energy: " + stateObj.playerMonster.encounterEnergy;
  if (stateObj.comboPerTurn > 0) {
    playerStrengthandDexText.textContent = "Strength: " + stateObj.playerMonster.strength + "  Dex: " + stateObj.playerMonster.dex + "  Combo: " + stateObj.comboPerTurn;
  } else {
    playerStrengthandDexText.textContent = "Strength: " + stateObj.playerMonster.strength + "  Dex: " + stateObj.playerMonster.dex;
  }

  EnergyStrengthDiv.append(playerEnergyText, playerStrengthandDexText);
  turnEnergyStrengthDiv.append(EnergyStrengthDiv, turnButtonDiv);
  
  document.getElementById("playerStats").appendChild(turnEnergyStrengthDiv);

  

  let imageRowDiv = document.createElement("Div");
  imageRowDiv.classList.add("player-decks-row");

  
  //let discardPileDiv.textConte

  document.getElementById('playerStats').appendChild(imageRowDiv);
}
async function renderDivs(stateObj) {

  if (stateObj.fightStarted === false) {
    stateObj = startEncounter(stateObj);
    stateObj = immer.produce(stateObj, (newState) => {
      newState.fightStarted = true;
    })
    changeState(stateObj);
  }

  document.getElementById("app").innerHTML = ""
  let topRow = topRowDiv(stateObj, "app")
  let restOfScreen = renderFightDiv();
  document.querySelector("#app").append(restOfScreen);
  
  
  renderOpponents(stateObj);
  renderHand(stateObj);
  renderPlayerMonster(stateObj);
  renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  renderCardPile(stateObj, stateObj.encounterDraw, "drawDiv");
  renderCardPile(stateObj, stateObj.encounterDiscard, "discardDiv");
}

function renderFightDiv() {
  let fightContainer = document.createElement("Div");
  fightContainer.classList.add("flex-container");
  fightContainer.setAttribute("id", "stats");

  let playerMonsterDiv = document.createElement("Div");
  playerMonsterDiv.classList.add("flex-container");
  playerMonsterDiv.setAttribute("id", "playerMonster");

  let playerStatsDiv = document.createElement("Div");
  playerStatsDiv.setAttribute("id", "playerStats");
  let handDiv = document.createElement("Div");
  handDiv.setAttribute("id", "handContainer2");
  playerMonsterDiv.append(playerStatsDiv, handDiv);

  let opponentsDiv = document.createElement("Div");
  opponentsDiv.setAttribute("id", "opponents");
  fightContainer.append(playerMonsterDiv, opponentsDiv);

  return fightContainer;

  
}




// let monsterHP = document.createElement("H3");
//   monsterHP.textContent = stateObj.playerMonster.currentHP + "/" + stateObj.playerMonster.maxHP;
//   monsterHP.classList.add("monster-hp-town");
//   topRowDiv.appendChild(monsterHP);



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
let cheapHealDiv = renderChoiceDiv(stateObj, ["heal-div"], "img/potion.svg", `Heal 25% of your max health (${Math.floor(stateObj.playerMonster.maxHP/4)}) for ${Math.floor(stateObj.healCost/2)} gold`, (stateObj.gold >= Math.floor(stateObj.healCost/2) && stateObj.playerMonster.currentHP < stateObj.playerMonster.maxHP), cheapHeal, statusToChange=false, altText=`${Math.floor(stateObj.healCost/2)} gold required`)

function renderChoiceDiv(stateObj, classesArray, imgSrcString, divTextString, triggerCondition, functionToAdd, statusToChange=false, altText=false) {
  let newTownDiv = document.createElement("Div");
  for (i=0; i < classesArray.length; i++) {
    newTownDiv.classList.add(classesArray[i]);
  };
  let newDivImg = document.createElement("Img");
  newDivImg.src = imgSrcString;
  newDivImg.classList.add("bg-image");
  newTownDiv.append(newDivImg);

  let newDivText = document.createElement("H3");
  newDivText.textContent = divTextString
  newDivText.classList.add("fight-text");
  
  

  if (triggerCondition===true) {
      newTownDiv.classList.add("playable")
      newTownDiv.onclick = function () {
        functionToAdd(stateObj, statusToChange);
      }
    } else {
      newDivText.textContent = altText;
    };
    newTownDiv.append(newDivText);
    return newTownDiv
}


  


  

// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== Encounter Logic Functions ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== 
// ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ====== ======

function resetAfterFight(stateObj) {

  if (stateObj.playerXP >= levelXPRequirements[stateObj.playerLevel]) {
    stateObj = monsterLevelUp(stateObj);
  }

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
    newState.fightHealTotal = 0;
    newState.fightSelfDamageCount = 0;
    newState.fightSelfDamageTotal = 0;
    newState.fightEnergyDrainCount = 0;
    newState.fightEnergyDrainTotal = 0;
    newState.fightEnergyGiftCount = 0;
    newState.fightEnergyGiftTotal = 0;
    newState.enemyFightHealTotal = 0;
    newState.gainLifePerCard = 0;
    newState.selfDamageAttack = 0;
    newState.selfDamageBlock = 0;
    newState.energyGiftBlock = 0;
    newState.energyGiftAttack = 0;
    newState.cardsPerTurn = 0;
    newState.comboPerTurn = 0;
    newState.fightStarted = false;

    newState.townMapSquares[newState.playerHere] = "completed";

    

    
    
    console.log("gym count is " + newState.gymCount);
    if (newState.playerHere === 19 && newState.gymCount === 2) {
      newState.status = Status.VictoryScreen;
    } else if (newState.fightingBoss === true) {
      newState.gold += newState.townBossEncounter.goldReward
      //newState.playerXP += newState.townBossEncounter.XP
      newState.gymFightCount = 0;
      newState.gymCount += 1;
      newState.playerMonster.maxHP += 10
      console.log("increasing gym count to " + newState.gymCount);
      newState.townEventChosen = false;
      newState.availableCardPoolForShop = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));

      newState.townMapSet = false;
      newState.fightingBoss = false;
      newState.InTown = false;
      newState.playerHere = 1;
      
      newState.status = Status.EncounterRewards;
    } else {
      newState.gold += newState.townMonsterArray[newState.gymFightCount].goldReward
      //newState.playerXP += newState.townMonsterArray[newState.gymFightCount].XP
      newState.gymFightCount += 1;
      newState.status = Status.EncounterRewards;
    }
  })

  return stateObj;
}

function handleDeaths(stateObj) {
  let shouldUpgrade = false;
  if (stateObj.opponentMonster) {
    stateObj = immer.produce(stateObj, (newState) => {
      let indexesToDelete = [];
      newState.opponentMonster.forEach(function (monster, index) {
        if (monster.currentHP <= 0) {
          console.log("opponent monster at index " + index + " has died.")
          indexesToDelete.push(index);
          newState.targetedMonster = 0;
        }
      });
      indexesToDelete.reverse()
      for (let i = 0; i < indexesToDelete.length; i++) {
        newState.playerXP += newState.opponentMonster[i].XPGain
        newState.opponentMonster.splice(indexesToDelete[i], 1)
      }

      if (newState.opponentMonster.length == 0) {
        Object.assign(newState, resetAfterFight(newState))
      }

      if (newState.playerMonster.currentHP <= 0) {
        newState.status = Status.DeathScreen;
      }
    })
  }
  return stateObj;
};

// maybe don’t look at this too closely
function pause(timeValue) {
  return new Promise(res => setTimeout(res, timeValue))
}

function setUpEncounter(stateObj, isBoss=false) {

  stateObj = immer.produce(stateObj, (newState) => {
    if (isBoss) {
      newState.opponentMonster = newState.townBossEncounter.opponents;
      newState.fightingBoss = true;
    } else {
      newState.opponentMonster = newState.townMonsterArray[newState.gymFightCount].opponents;
    }
    newState.encounterHand = [];
    newState.encounterDiscard = [];
    newState.enemyFightHealTotal = 0;
    newState.fightHealCount = 0;
    newState.fightHealTotal = 0;
    newState.fightSelfDamageCount = 0;
    newState.fightSelfDamageTotal = 0;
    newState.selfDamageAttack = 0;
    newState.selfDamageBlock = 0;
    newState.energyGiftBlock = 0;
    newState.energyGiftAttack = 0;
    newState.fightEnergyDrainCount = 0;
    newState.fightEnergyDrainTotal = 0;
    newState.gainLifePerCard = 0;
    newState.comboPerTurn = 0;
    
    newState.cardsPerTurn = 0;
    if (!stateObj.playerDeck) {
      newState.playerDeck = [...stateObj.playerMonster.startingDeck];
      newState.encounterDeck = [...stateObj.playerMonster.startingDeck];
      newState.encounterDraw = [...stateObj.playerMonster.startingDeck];
    } else {
      newState.encounterDeck = [...stateObj.playerDeck];
      newState.encounterDraw = [...stateObj.playerDeck];
    }
    newState.targetedMonster = 0;
    newState.playerMonster.encounterEnergy = newState.playerMonster.turnEnergy;
  });

  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.tempStrength = 0;
    newState.playerMonster.tempDex = 0;
    newState.playerMonster.encounterBlock = 0;
    newState.opponentMonster.forEach(function (monster, index) {
      newState.opponentMonster[index].encounterEnergy = 0;
      newState.opponentMonster[index].encounterBlock = 0;
      newState.opponentMonster[index].maxHP += (newState.gymCount*20);
      newState.opponentMonster[index].currentHP += (newState.gymCount*20);
      newState.opponentMonster[index].baseDamage += (newState.gymCount*4);
      newState.opponentMonster[index].baseBlock += (newState.gymCount*4);
      newState.opponentMonster[index].baseHeal += (newState.gymCount*4);
      newState.opponentMonster[index].baseScale += (newState.gymCount*1);
      newState.opponentMonster[index].XPGain += (newState.gymCount*5);

      newState.status = Status.InEncounter
    })
  })
  return stateObj;
};

//REWEITE FOR IMMER>PRODUCE
function shuffleDiscardIntoDeck(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.encounterDraw = [...newState.encounterDiscard];
    newState.encounterDiscard = [];
    newState.encounterDraw = shuffleArray(newState.encounterDraw);
  })
  
  return stateObj;
}




function drawACard(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    const handLength = newState.encounterHand.length;
    if (handLength > 7 ) {
      console.log("hand is full");
      return newState;
    }

    // if deck is empty, shuffle discard and change newState to reflect that
    if (newState.encounterDraw.length === 0) {
      Object.assign(newState, shuffleDiscardIntoDeck(newState));
    }

    let topCard = newState.encounterDraw.shift();
    if (!topCard) {
      return newState;
    }

    newState.encounterHand.push(topCard);
  })
  return stateObj;
}

function drawAHand(stateObj) {
  console.log("drawing a hand");
  stateObj = immer.produce(stateObj, (newState) => {
    for (let i = 0; i < 6; i++) {
      if (
        newState.encounterDraw.length !== 0 ||
        newState.encounterDiscard.length !== 0
      ) {
        Object.assign(newState, drawACard(newState));
      }
    }
  });
  return stateObj;
}

function upgradeCard(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.encounterHand[0].upgrades +=1;
  });
  return stateObj;
}

function monsterLevelUp(stateObj) {
  let targetIndex = Math.floor(Math.random() * (stateObj.playerDeck.length));

  stateObj = immer.produce(stateObj, (newState) => {
    
    if (stateObj.playerXP >= levelXPRequirements[newState.playerLevel+1]) {
      newState.playerDeck[targetIndex].upgrades +=2;
      newState.playerLevel += 2;
      let upgradeText = `You leveled up and upgraded the card ` + stateObj.playerDeck[targetIndex].name + ` two times`.
      alert(upgradeText);
      document.querySelector("#playerDeckPile").classList.add("upgrade-animation");
    } else if (stateObj.playerXP >= levelXPRequirements[newState.playerLevel]) {
      newState.playerDeck[targetIndex].upgrades +=1;
      newState.playerLevel += 1;
      let upgradeText = `You leveled up and upgraded the card ` + stateObj.playerDeck[targetIndex].name;
      alert(upgradeText);

    } else {}
  });
  return stateObj
}

async function playACard(stateObj, cardIndexInHand, arrayObj) {
  console.log("you played " + stateObj.encounterHand[cardIndexInHand].name);
  stateObj = stateObj.encounterHand[cardIndexInHand].action(stateObj, cardIndexInHand, arrayObj);
  stateObj = immer.produce(stateObj, (newState) => {
    newState.cardsPerTurn += 1;
    if (stateObj.encounterHand[cardIndexInHand].exhaust == true) {
      console.log("you exhausted " + stateObj.encounterHand[cardIndexInHand].name);
      newState.encounterHand.splice(cardIndexInHand, 1);
    } else {
      newState.encounterDiscard.push(stateObj.encounterHand[cardIndexInHand]);
      newState.encounterHand.splice(cardIndexInHand, 1);
    }
    //trigger if life gain
    if (newState.gainLifePerCard > 0) {
      //trigger if player is not at full health
      if (newState.playerMonster.currentHP < newState.playerMonster.maxHP) {
        //if the lifegain is less than total HP loss, do heal to full, otherwise, heal per card
        if (newState.playerMonster.maxHP-newState.playerMonster.currentHP > 0 && newState.playerMonster.maxHP-newState.playerMonster.currentHP < newState.gainLifePerCard) {
          newState.fightHealTotal += newState.playerMonster.maxHP-newState.playerMonster.currentHP;
          newState.playerMonster.currentHP = newState.playerMonster.maxHP;
          newState.fightHealCount +=1;
        } else if (newState.playerMonster.maxHP-newState.playerMonster.currentHP >= newState.gainLifePerCard) {
          newState.fightHealTotal += newState.gainLifePerCard;
          newState.playerMonster.currentHP += newState.gainLifePerCard;
          newState.fightHealCount +=1;
        }
      }
    }

  })
  
  
  stateObj = pickOpponentMove(stateObj);
  stateObj = changeState(stateObj);
  return stateObj
}

function targetThisMonster(stateObj, monsterIndex) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.targetedMonster = monsterIndex;
  })
  changeState(stateObj);
  return stateObj;
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

  if (stateObj.status === Status.InTown || stateObj.status === Status.InEncounter) {
    statusText.textContent = `Gym: ${stateObj.gymCount}   Fight: ${stateObj.gymFightCount}/3`
  } else {
    statusText.textContent = stateObj.status;
  }
  
  statusTextDiv.append(statusText);
  topRowDiv.append(statusTextDiv);

  let monsterXP = document.createElement("H3");
  let calcXP = stateObj.playerXP - levelXPRequirements[stateObj.playerLevel-1]; 
  let newXP = levelXPRequirements[stateObj.playerLevel] - levelXPRequirements[stateObj.playerLevel-1]
  monsterXP.textContent = `Level: ${stateObj.playerLevel}` + "      "+ calcXP + "/" + newXP;
  monsterXP.classList.add("monster-xp");
  topRowDiv.appendChild(monsterXP);

  let monsterXPBar = document.createElement("Div");
  monsterXPBar.classList.add("empty-xp-bar");
  let monsterCurrentXPBar = document.createElement("Div");
  monsterCurrentXPBar.classList.add("current-xp-bar");
  let barLength = 0;
  
  if (calcXP/newXP > 1) {
     barLength = 10;
  } else {
     barLength = 10*(calcXP/newXP)
  }
  let barText = "width:" + barLength + "vw"

  monsterCurrentXPBar.setAttribute("style", barText);
  monsterXPBar.append(monsterCurrentXPBar);
  topRowDiv.appendChild(monsterXPBar)
  


  let gymCountText = document.createElement("H3");
  gymCountText.textContent = `Gym ${stateObj.gymCount+1}`;
  gymCountText.classList.add("gym-text");
  topRowDiv.appendChild(gymCountText);

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
  goldImg.src = "img/goldsack.PNG";
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

function divContainer(divName, newDivName=false) {
  let removeDiv = document.createElement("Div")
  if (newDivName) {
    removeDiv.setAttribute("id", newDivName)
  } else {
    removeDiv.setAttribute("id", "remove-div")
  }
  removeDiv.classList.add("remove-div")
  removeDiv.classList.add("screen-inner-div")
  document.getElementById(divName).append(removeDiv);
  return removeDiv
}

function skipToTownButton(stateObj, buttonString, divName, cardSkip=false, isEventUsedForSkipButton=false, skipGoldGift=50) {
  let skipButton = document.createElement("Button");
  if (!cardSkip) {
    skipButton.addEventListener("click", function () {
      if (stateObj.InTown == true) {
        changeStatus(stateObj, Status.InTown, isEventUsedForSkipButton, skipGoldGift);
      } else {
        changeStatus(stateObj, Status.OverworldMap, isEventUsedForSkipButton, skipGoldGift);
      }
    });
  } else {
    skipButton.addEventListener("click", function () {
      skipCards(stateObj, isEventUsedForSkipButton);
    });
  }
  
  skipButton.classList.add("skip-button");
  skipButton.textContent = buttonString;
  document.querySelector(divName).append(skipButton);
  return skipButton;
}

function renderRemoveCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", removeCard, goldCost="remove");
  skipToTownButton(stateObj, "I don't want to remove any of these cards from my deck", ".remove-div");
};

function renderPaidRemoval(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", paidRemoval, goldCost="paidremoval");
  skipToTownButton(stateObj, "I choose not to remove any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderAssassinTraining(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  let removeAttacksButton = document.createElement("Button");
  removeAttacksButton.addEventListener("click", function () {
    assassinTraining(stateObj);
  });
  removeAttacksButton.classList.add("assassin-training-button");
  removeAttacksButton.classList.add("heal-button");
  removeAttacksButton.textContent = `Remove all your attacks. Gain a Fatal Toxin`
  document.getElementById("remove-div").append(removeAttacksButton);
  skipToTownButton(stateObj, "I choose not to trade my attacks for a Fatal Toxin (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderWinLoseScreen(stateObj) {
  document.getElementById("app").innerHTML = `
  <div id="death" class="win-lose">
    <p class="win-loss-text">${stateObj.status}</p>
    <button onClick="window.location.reload();">Try Again</button>
  </div>`
};

function renderCardPool(stateObj, cardPool) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, Object.values(fireCardPool), "remove-div");
  skipToTownButton(stateObj, "I don't want to remove any of these cards from my deck", ".remove-div");
};

function renderDuplicateCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", duplicateCard);
  skipToTownButton(stateObj, "I choose not to duplicate any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderDoubleUpgradeCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", doubleUpgradeCard, goldCost="doubleupgrade");
  skipToTownButton(stateObj, "I choose not to upgrade any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderChooseCardReward(stateObj) {
  let shuffledCardPool = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, sampledCardPool, "remove-div", chooseThisCard);
  skipToTownButton(stateObj, "I choose not to add any of these cards to my deck (+5 gold)", ".remove-div", cardSkip=true);
};

function renderShop(stateObj) {
  if (stateObj.availableCardPoolForShop === false) {
    stateObj = immer.produce(stateObj, (newState) => {
      console.log("setting cards for shop")
      newState.availableCardPoolForShop = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));
    }) 
  }
  
  let sampledCardPool = stateObj.availableCardPoolForShop.slice(0, 3);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "shop-div");
  renderClickableCardList(stateObj, sampledCardPool, "shop-div", buyThisCard, goldCost="cardshop");
  let healthDiff = stateObj.playerMonster.maxHP - stateObj.playerMonster.currentHP;
  
  let cheapHealDiv = renderChoiceDiv(stateObj, ["heal-div"], "img/potion.svg", 
  `Spend ${Math.floor(stateObj.healCost/2)} gold to heal 25% of your max health (${Math.floor(stateObj.playerMonster.maxHP/4)}) gold`, 
  (stateObj.gold >= Math.floor(stateObj.healCost/2) && healthDiff > 0), 
  cheapHeal, statusToChange=false, altText=`Costs ${Math.floor(stateObj.healCost/2)} to heal ${Math.floor(stateObj.playerMonster.maxHP/4)}`);
  document.getElementById("shop-div").append(cheapHealDiv);

  let fullHealDiv = renderChoiceDiv(stateObj, ["heal-div"], "img/potion.svg", `Spend ${stateObj.healCost} gold to fully heal`, 
  ((stateObj.gold >= stateObj.healCost) && healthDiff > 0), 
  fullHeal, statusToChange=false, altText=`Costs ${stateObj.healCost} to fully heal`);

  document.getElementById("shop-div").append(fullHealDiv);
  skipToTownButton(stateObj, "I don't want to buy anything right now", "#shop-div");
  
};
  
  

function renderChooseRareCard(stateObj) {
  let cardPool = Object.values(stateObj.playerMonster.cardPool);
  let rareCards = cardPool.filter(card => card.rare);
  let shuffledCardPool = fisherYatesShuffle(rareCards);
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, sampledCardPool, "remove-div", chooseThisCard);
  skipToTownButton(stateObj, "I choose not to add any of these cards to my deck (+50 gold)", ".remove-div", cardSkip=true,  isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderHealer(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  document.getElementById("remove-div").classList.add("healer-div")
  

  let HealButton = document.createElement("Button");
  HealButton.addEventListener("click", function () {
    fullHeal(stateObj);
  });
  HealButton.classList.add("full-heal-button");
  HealButton.classList.add("heal-button");
  HealButton.textContent = `Let me heal you back to full for free!`
  document.getElementById("remove-div").append(HealButton);
  
  skipToTownButton(stateObj, "You don't need healing? Wow, you're tough! Take this 30 gold as a token of my esteem", ".remove-div", cardSkip=false,  isEventUsedForSkipButton=true, 30);
  
};

function renderLevelUp(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");

  let strengthDiv = renderTownDiv(stateObj, "increaseStrength", "img/forge.PNG", "+2 permanent Strength", true, increaseStrengthEvent, Status.InTown, altText=false);
  let DexDiv = renderTownDiv(stateObj, "increaseDex", "img/forge.PNG", "+2 permanent Dexterity", true, increaseDexEvent, Status.InTown, altText=false);
  let energyDiv = renderTownDiv(stateObj, "increaseEnergy", "img/forge.PNG", "+1 energy per turn", true, increaseEnergyEvent, Status.InTown, altText=false);
  
  document.getElementById("level-up-div").append(strengthDiv, DexDiv, energyDiv);
  
  
  skipToTownButton(stateObj, "I choose not to level up for some reason even though I probably should (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
  
};

function renderUpgradeCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", encounterUpgradeCard, goldCost="upgrade");
  skipToTownButton(stateObj, "I don't want to upgrade any of these cards", ".remove-div");
};

function renderDecreaseCardCost(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseCost && cardObj.baseCost > 0) {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", decreaseCardCost, goldCost="decreasecost")
    }
  });
  skipToTownButton(stateObj, "I choose not to decrease the cost of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true); 
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderIncreaseCardBlock(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseBlock && typeof cardObj.baseBlock === 'number') {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", increaseCardBlock, goldCost="increaseblock")
    }
  });
  skipToTownButton(stateObj, "I choose not to increase the block of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true); 
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
};

function renderIncreaseCardAttack(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseDamage && typeof cardObj.baseDamage === 'number') {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", increaseCardAttack, goldCost="increaseattack")
    }
  });
  skipToTownButton(stateObj, "I choose not to increase the attack of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div"); 
};

function renderDoubleCardAttack(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseDamage && cardObj.baseDamage > 0) {
      renderCard(stateObj, stateObj.playerDeck, cardObj, index, "remove-div", doubleCardAttack, goldCost="doubleattack")
    }
  });
  skipToTownButton(stateObj, "I choose not to double the attack of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div"); 
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
  skipToTownButton(stateObj, "I choose not to make any of these cards hit another time (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true); 
  //skipToTownButton(stateObj, "I don't want to choose right now; I want to go back to town (event disappears after you beat the boss!)", ".remove-div");
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
        cardText.classList.add("card-text")
        
        cardDiv.append(topCardRowDiv);
        cardDiv.append(cardText);

        if (goldCost === "remove") {
          if (stateObj.InTown === true) {
            let costText = document.createElement("P");
            costText.textContent = "(" + stateObj.cardRemoveCost+ " gold to remove)";
            costText.classList.add("invisible-cost")
            cardDiv.append(costText);
          }
        } else if (goldCost === "paidremoval") {
          let removalpayment = (cardObj.rare === true) ? 100 : 50;
          let costText = document.createElement("P");
          costText.textContent = "(Get paid " + removalpayment + " gold to remove)";
          costText.classList.add("paid-invisible-cost")
          cardDiv.append(costText);
        } else if (goldCost === "upgrade") {
          cardDiv.classList.add("card-change-text");
          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "upgrades", 1)
          altUpgradeText.classList.add("alt-card-text");
          cardDiv.append(altUpgradeText);
          if (stateObj.InTown === true) {
            let costText = document.createElement("P");
            costText.textContent = "(" + stateObj.cardUpgradeCost+ " gold to upgrade)";
            costText.classList.add("invisible-cost")
            cardDiv.append(costText);
          }

          if (typeof cardObj.cost === 'function') {
            let cardAltCost = document.createElement("H3");
            cardAltCost.textContent = showChangedUpgradeCost(stateObj, index, cardArray, cardObj, "upgrades", 1)
            cardAltCost.classList.add("alt-cost")
            cardDiv.innerHTML = "";
            topCardRowDiv.innerHTML = "";
            topCardRowDiv.append(cardAltCost, cardCost, cardName);
            cardDiv.append(topCardRowDiv, altUpgradeText, cardText);
          }  else {}

          // let costText = document.createElement("P");
          // costText.textContent = "(" + stateObj.cardUpgradeCost + " gold to upgrade)";
          // costText.classList.add("invisible-cost")
          // cardDiv.append(costText);
        } else if (goldCost === "moreHits") {
          cardDiv.classList.add("card-change-text");
          let altHitsText =  document.createElement("P");
          altHitsText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseHits", 1)
          altHitsText.classList.add("alt-card-text");
          cardDiv.append(altHitsText);
        } else if (goldCost === "doubleupgrade") {
          cardDiv.classList.add("card-change-text");
          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "upgrades", 2)
          altUpgradeText.classList.add("alt-card-text");
          cardDiv.append(altUpgradeText);

          if (typeof cardObj.cost === 'function') {
            let cardAltCost = document.createElement("H3");
            cardAltCost.textContent = showChangedUpgradeCost(stateObj, index, cardArray, cardObj, "upgrades", 2)
            cardAltCost.classList.add("alt-cost")
            topCardRowDiv.innerHTML = "";
            topCardRowDiv.append(cardAltCost, cardCost, cardName);
          }  else {}
        } else if (goldCost === "increaseblock") {
          cardDiv.classList.add("card-change-text");
          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseBlock", 7)
          altUpgradeText.classList.add("alt-card-text");
          cardDiv.append(altUpgradeText);
        } else if (goldCost === "increaseattack") {
          cardDiv.classList.add("card-change-text");
          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseDamage", 6)
          altUpgradeText.classList.add("alt-card-text");
          cardDiv.append(altUpgradeText);
        } else if (goldCost === "doubleattack") {
          cardDiv.classList.add("card-change-text");
          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseDamage", cardArray[index].baseDamage)
          altUpgradeText.classList.add("alt-card-text");
          cardDiv.append(altUpgradeText);
        } else if (goldCost === "decreasecost") {
          cardDiv.classList.add("card-change-text");
            let cardAltCost = document.createElement("H3");
            cardAltCost.textContent = showChangedUpgradeCost(stateObj, index, cardArray, cardObj, "baseCost", -1)
            cardAltCost.classList.add("alt-cost")

            cardDiv.classList.add("card-change-text");
            let altUpgradeText =  document.createElement("P");
            altUpgradeText.textContent = cardObj.text(stateObj, index, cardArray)
            altUpgradeText.classList.add("alt-card-text");

            cardDiv.innerHTML = "";
            topCardRowDiv.innerHTML = "";
            topCardRowDiv.append(cardAltCost, cardCost, cardName);
            cardDiv.append(topCardRowDiv, altUpgradeText, cardText);
        } else if (goldCost === "cardshop") {
          let costText = document.createElement("P");
          if (cardObj.rare && stateObj.gold >= 100) {
            costText.textContent = "(100 gold to buy)";
          } else if (cardObj.rare && stateObj.gold < 100) {
            costText.textContent = "Not enough gold (100)";
            cardDiv.classList.remove("playable");
            costText.classList.add("non-buyable-card")
          } else if (stateObj.gold >= 50) {
            costText.textContent = "(50 gold to buy)";
          } else {
            costText.textContent = "Not enough gold (50)";
            cardDiv.classList.remove("playable");
            costText.classList.add("non-buyable-card")
          }
          
          costText.classList.add("invisible-cost")
          cardDiv.append(costText);
        }
        
        //if cardArray is the hand, add playable class to the cards if energy > card.minReq
        if (cardArray === stateObj.encounterHand) {
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
        } else if (cardObj.cardType == "waterEnergy") {
          cardDiv.classList.add("water-energy");
        } else if (cardObj.cardType == "attack") {
          cardDiv.classList.add("attack-card");
        } else if (cardObj.cardType == "ability") {
          cardDiv.classList.add("ability-card");
        }

        if (cardObj.rare) {
          cardDiv.classList.add("rare-card")
        }
        if (cardObj.trigger && cardObj.trigger(stateObj, index, cardArray)) {
          cardDiv.classList.add("trigger-condition-met")
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
  return cardClone.text(newState, index, newState.playerDeck)  
}

function showChangedUpgradeCost(stateObj, index, array, cardObj, propertyNameString, valueChange) {
  let cardClone = {...cardObj}
  let newState = immer.produce(stateObj, (draft) => {
    draft.playerDeck[index][propertyNameString] += valueChange;
  })
  if (typeof cardObj.cost === "function") {
    return cardClone.cost(newState, index, newState.playerDeck)
  } else {
    return cardClone.cost;
  }
    
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
      huntedDiv.src = 'img/crosshair.PNG';
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

      if (moveIndex === monsterObj.opponentMoveIndex) {
        moveDiv.classList.add("chosen");
      }

      if (moveObj.name) {
        moveDiv.id = moveIndex;
        moveDiv.classList.add("move");
        let moveNameCostDiv = document.createElement("Div");
        moveNameCostDiv.classList.add("move-name-cost");

        let moveName = document.createElement("H3");
        let moveCost = document.createElement("P");
        moveName.textContent = moveObj.name;
        moveCost.textContent = moveObj.energyChange;
        moveCost.classList.add("energy-cost");
        moveNameCostDiv.append(moveName, moveCost);

        let moveText = document.createElement("P");
        if (typeof moveObj.text === "function") {
          moveText.textContent = moveObj.text(stateObj, index, stateObj.opponentMonster);
        } else {
          moveText.textContent = moveObj.text;
        }

        if (moveIndex < monsterObj.opponentMoveIndex) {
          moveDiv.classList.add("not-chosen");
        }
        
        moveDiv.append(moveNameCostDiv, moveText);
      } else {
        moveDiv.classList.add("fake-move-div");
        if (moveIndex <= monsterObj.encounterEnergy) {
          moveDiv.classList.add("energy-filled");
        }
      }

      
      opponentMoveListDiv.appendChild(moveDiv);
    });

    monsterDiv.appendChild(opponentMoveListDiv);
    document.getElementById("opponents").append(monsterDiv);

  });
}

function renderTown(stateObj) {
  console.log('renderin town')


    document.getElementById("app").innerHTML = ""
    topRowDiv(stateObj, "app");
    let townDiv = document.createElement("Div");
    townDiv.classList.add("flex-container")
    townDiv.setAttribute("id", "town");

  

  //let townHealDiv = renderTownDiv(stateObj, "TownHealer", "img/healer.PNG", "Visit Healer", (stateObj.gold >= Math.floor(stateObj.healCost/2)), changeStatus, Status.HealersShop, "Not enough gold");
  let townShopDiv = renderTownDiv(stateObj, "TownShop", "img/healer.PNG", "Visit Shop", true, changeStatus, Status.cardShop);
  let townRemoveDiv = renderTownDiv(stateObj, "TownRemove", "img/tavern2.PNG", "Pay to remove A Card",  (stateObj.gold >=stateObj.cardRemoveCost), changeStatus, Status.RemovingCards, `Not enough gold (${stateObj.cardRemoveCost} needed)`);
  let townUpgradeDiv = renderTownDiv(stateObj, "TownUpgrade", "img/forge.PNG", "Pay to upgrade A Card", (stateObj.gold >=stateObj.cardUpgradeCost), changeStatus, Status.UpgradingCards, `Not enough gold (${stateObj.cardUpgradeCost} needed)`);
  let townGymDiv = renderTownDiv(stateObj, "TownFight", "img/dracula.png", "Fight Gym Boss", true, TownFight)


  townDiv.append(townShopDiv, townRemoveDiv, townUpgradeDiv, townGymDiv);
  document.getElementById("app").append(townDiv);


}


function renderScreen(stateObj) {
  if (stateObj.status === Status.ChoosingMonster) {
    renderChooseMonster(stateObj);
  } else if (stateObj.status == Status.OverworldMap) {
    renderMapScreen(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
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
  } else if (stateObj.status == Status.DuplicatingCards) {
    renderDuplicateCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DoublingAttack) {
    renderDoubleCardAttack(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DoubleUpgradeEvent) {
    renderDoubleUpgradeCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.LevelUpEvent) {
    renderLevelUp(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.ChooseRareEvent) {
    renderChooseRareCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.ShowCardPool) {
    renderCardPool(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DeathScreen || stateObj.status == Status.VictoryScreen) {
    renderWinLoseScreen(stateObj);
  } else if (stateObj.status == Status.cardShop) {
    renderShop(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.PaidRemovalEvent) {
    renderPaidRemoval(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.AssassinTrainingEvent) {
    renderAssassinTraining(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else {
    renderDivs(stateObj);
    //renderOpponents(stateObj)
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
function pickOpponentMove(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      for (var i = 0; i < monsterObj.moves.length; i++) {
        if (monsterObj.encounterEnergy >= monsterObj.moves[i].minReq) {
          newState.opponentMonster[index].opponentMoveIndex = i;
        }
      }
    //console.log(monsterObj.name + " picked " + monsterObj.moves[monsterObj.opponentMoveIndex]);  
    });
  });
  
  //changeState(toChangeState);
  return toChangeState;
}


function playOpponentMove(stateObj) {
  //each opponent Monster plays its own move
  stateObj.opponentMonster.forEach(function (monsterObj, index) {
    console.log(monsterObj.name + " uses " + monsterObj.moves[monsterObj.opponentMoveIndex].name);
    const move = monsterObj.moves[monsterObj.opponentMoveIndex];
    //move.action also take a state object and returns a state object, so newState gets updated
    stateObj = move.action(stateObj, index, stateObj.opponentMonster);
  });

  stateObj = handleDeaths(stateObj);
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
  console.log('triggering start encounter');
  stateObj = pickOpponentMove(stateObj);
  stateObj = shuffleDraw(stateObj);
  stateObj = drawAHand(stateObj);
  stateObj = immer.produce(stateObj, (newState) => {
    newState.fightStarted = true;
  })
  changeState(stateObj);
  return stateObj
}

function endTurnIncrement(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.strength -= newState.playerMonster.tempStrength;
    newState.playerMonster.dex -= newState.playerMonster.tempDex;
    newState.playerMonster.tempStrength = 0;
    newState.playerMonster.tempDex = 0;
    newState.cardsPerTurn = 0;
    newState.comboPerTurn = 0;
    newState.opponentMonster.forEach(function (monsterObj, index) {
      if (monsterObj.hunted > 0) {
        monsterObj.hunted -=1;
      };

      if (monsterObj.poison > 0) {
        monsterObj.currentHP -= (monsterObj.poison*3)
      }
    })
    newState.turnDouble = false;
  })
  return stateObj;
}

//if you flip the order of this around, discard works, but not playing the move
async function endTurn(stateObj) {
  console.log("endTurn start: fightStarted changing from " + state.fightStarted + " to " + stateObj.fightStarted)
  stateObj = discardHand(stateObj);
  console.log("endTurn post-discard: fightStarted changing from " + stateObj.fightStarted + " to " + stateObj.fightStarted)
  stateObj = endTurnIncrement(stateObj);
  console.log("endTurn post-Increment: fightStarted changing from " + stateObj.fightStarted + " to " + stateObj.fightStarted)
  stateObj = changeState(stateObj);
  await pause(200);

  if (stateObj.opponentMonster.length === 0) {
    console.log("breaking out of function endTurn")
    return stateObj
  }

  
  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      monsterObj.encounterBlock = 0;
    })
  });
  

  console.log("picking opponent move");
  stateObj = pickOpponentMove(stateObj);
  stateObj = playOpponentMove(stateObj);
  changeState(stateObj);
  await pause(200);

  stateObj = pickOpponentMove(stateObj);
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
};
