//ANIMATIONS
//change fillMapWithArray so every act isn't just randomly shuffled 


//turn like every single function async
//animation when opponents gain energy as well as gifted/destroyed


//import clone from "https://cdn.skypack.dev/clone@2.1.2";

//TO-DO
//figure out some way to render energy inside the right icon (flame/water/etc)
//add 
//figure out a way to do tooltips

//MANA - css images, add to cards, add costs to moves
//add css backgrounds to moves and cards based on what their type is?


//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// - - - - - -  - - - - -Creating the State - - - - - -  - - - - -
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
const Status = {
  ChoosingMonster: "Choose a monster",
  UpgradingCards: "Choose a card. Upgrade it.",
  ChooseEncounterCardReward: "Choose a card. Add it to your deck",
  OverworldMap: "choose where to go next",
  InEncounter: "In Combat",
  WonEncounter: "won encounter",
  RemovingCards: "Choose a card to remove from your deck",
  Death: "You died",
  InTown: "In Town",
  DecreasingChoice: "Choose one -decrease ",
  DecreasingCost: "Choose a card. It costs 1 less",
  IncreasingCost: "Choose a card. It costs 1 more. Gain 125 gold",
  HealEndOfFightChoice: "Gain Max HP or lose but heal after fights",
  IncreasingBlock: "Choose a card. It gets +7 block",
  IncreasingHits: "Choose a card. It hits 1 extra time",
  HitsVsAttackChoice: "Choose 1 - hitsvat",
  IncreasingAttack: "Choose an attack. It deals +5 damage",
  MaxHPvsHealChoice: "Choose a health ",
  DuplicatingCards: "Choose a card. Add a copy of it to your deck",
  DuplicatingCardFiveTimes: "Choose a card. Add 7 copies to your deck",
  DuplicateChoice: "Choose one",
  DoublingAttack: "Choose a card. +50% base damage",
  DoubleUpgradeEvent: "Upgrade a card twice",
  AttackChoiceEvent: "Choose one option",
  LevelUpEvent: "Permanently increase one stat",
  ChooseRareEvent: "Choose a rare card. Add it to your deck",
  PaidRemovalEvent: "Pawn Shop. Pays 50 gold for a card (100 for a rare)",
  PaidRemovalCardList: "Choose Card To Remove",
  AssassinTrainingEvent: "Remove all attacks from your deck. Add a Fatal Toxin (applies 5 poison)",
  ShowCardPool: "showing card pool",
  HealersShop: "Restore  health for a price",
  cardShop: "Buy cards to add to your deck",
  PeekBehindTheCurtain: "peeking now",
  WealthyPacifist: "Willing to pay for peace",
  PaidAttackRemoval: "Pays 50 gold to remove an attack (100 for a rare)",
  DeathScreen: "You stupid, stupid asshole! You got your Neo-Neopet killed! Refresh the page to try again",
  VictoryScreen: "You and your little Neo-Neopet have beaten all the content available in this demo! Check back soon!"
};

let healStartCost = 50;
let cardRemoveStartCost = 50;
let cardUpgradeStartCost = 50

let gameStartState = {
  playerMonster: false,
  status: Status.ChoosingMonster,
  enemyFightHealTotal: 0,
  gymCount: 0,
  gymFightCount: 0,
  gold: 50,
  cardRemoveCost: cardRemoveStartCost,
  cardUpgradeCost: cardUpgradeStartCost,
  healCost: healStartCost,
  cardsSkipped: 0,
  eventUsed: false,
  extraHeal: 0,
  healAfterFight: 0,
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
  blockPerTurn: 0,
  cardsPerTurn: 0,
  comboPerTurn: 0,
  blockKeep: false,
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
  townBossArray: false,
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
    eventID: 1
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Get Paid to Remove Card",
    newStatus: Status.PaidRemovalEvent,
    eventID: 2
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Stats",
    newStatus: Status.LevelUpEvent,
    eventID: 3
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Attack Choice",
    newStatus: Status.AttackChoiceEvent,
    eventID: 4
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Choose One",
    newStatus: Status.WealthyPacifist,
    eventID: 5
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Duplicate Choice",
    newStatus: Status.DuplicateChoice,
    eventID: 6
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Decrease Card Cost",
    newStatus: Status.DecreasingChoice,
    eventID: 7
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Card Hits",
    newStatus: Status.HitsVsAttackChoice,
    eventID: 8
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Choose One",
    newStatus: Status.MaxHPvsHealChoice,
    eventID: 9
  },
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Choose One",
    newStatus: Status.PeekBehindTheCurtain,
    eventID: 10
  },
  //add event text
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Choose One",
    newStatus: Status.HealEndOfFightChoice,
    eventID: 10
  },
  //choose btween increasing block and incrasing attack
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Increase Card Block",
    newStatus: Status.IncreasingBlock,
    eventID: 11
  },
  //add event Text for these two
  //edit to be one upgrade or upgrade two randomly
  {
    divID: "TownEvent",
    imgSrc: "img/wizardshop.PNG",
    divText: "Upgrade Card 2x",
    newStatus: Status.DoubleUpgradeEvent,
    eventID: 12
  },
  //add the ability to retain, OR upgrade a card twice 
];

//takes a stateObject and fills its map with events
function fillMapWithArray(stateObj) {
  console.log("fill Mpa with Array is being called")
  let mapFillArray = ["?", "?", "Fight", "Fight", "Fight", "Fight", "path", "path", "path", "Fight", "Shop", "Healer", "Upgrade", "Remove"];
  let shuffledMap = fisherYatesShuffle(mapFillArray);

  let townMonsterEncounters = []
  if (stateObj.playerMonster.name === "Testing Mode") {
    townMonsterEncounters = [routes[0][1][3], routes[0][1][3],routes[0][1][3]]
  } else {
    for (let i=0; i <6; i++) {
      let tempArray = routes[stateObj.gymCount][i]
      townMonsterEncounters[i] = fisherYatesShuffle(tempArray)[0]
    }
  }

    //fill the actual map
    stateObj = immer.produce(stateObj, (newState) => {
      newState.townMapSquares[3] = shuffledMap[0]
      newState.townMapSquares[5] = shuffledMap[1]
      if (stateObj.playerMonster.name === "Testing Mode") {
        newState.townMapSquares[4] = "?"
      } else {
      newState.townMapSquares[4] =  "Fight";
      }
      for (let i=6; i < 18; i++) {
          newState.townMapSquares[i] = shuffledMap[i-4];
    }
    //newState.status = Status.InTown;
    newState.townMapSet = true;
    newState.playerHere = 1;
    newState.status = Status.OverworldMap
    newState.townMonsterArray = townMonsterEncounters;

    if (stateObj.townBossArray === false) {
      let bossEncounters = fisherYatesShuffle(bosses);
      newState.townBossArray = bossEncounters;
      newState.townBossEncounter = newState.townBossArray[0]
    } else {
      newState.townBossEncounter = newState.townBossArray[newState.gymCount];
    }
  
     
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
  renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
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

  if (classesToAdd.includes("?")) {
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
  } else if (classesToAdd.includes("Upgrade")) {
    mapSquareDiv.textContent = "";
    let cross = document.createElement("Div");
    cross.classList.add("cross");
    mapSquareDiv.append(cross); 
  } else if (classesToAdd.includes("Remove")) {
    mapSquareDiv.textContent = "";
    let minus = document.createElement("Div");
    minus.classList.add("minus-sign");
    mapSquareDiv.append(minus); 
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

async function changeMapSquare(stateObj, indexToMoveTo) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerHere = indexToMoveTo
  })
    if (stateObj.townMapSquares[indexToMoveTo] === "Fight") {
      console.log("clicked on a fight")
      stateObj = setUpEncounter(stateObj);
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
        let shuffledEventsArray = fisherYatesShuffle(eventsArray);
        stateObj = immer.produce(stateObj, (newState) => {
          if (stateObj.playerMonster.name === "Testing Mode") {
            newState.status = eventsArray[10].newStatus
          } else {
          newState.status = shuffledEventsArray[1].newStatus;
        }
      });
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
  await changeState(stateObj);
  return stateObj;
}


playerMonsterArray = Object.values(playerMonsters);
opponentMonsterArray = Object.values(opponentMonsters);
fireCardArray = Object.values(fireCardPool);
waterCardArray = Object.values(waterCardPool);

let potentialMonsterChoices = playerMonsterArray;

async function changeState(newStateObj) {
  let stateObj = {...newStateObj}
  if (newStateObj.status === Status.InEncounter) {
    stateObj = await handleDeaths(stateObj);
  }

  //if (stateObj.status !== Status.InEncounter && newStateObj.playerXP >= levelXPRequirements[stateObj.playerLevel]) {
  if (newStateObj.playerXP >= levelXPRequirements[stateObj.playerLevel]) {
    console.log("triggering level up")
    stateObj = await monsterLevelUp(stateObj);
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
async function dealOpponentDamage(stateObj, damageNumber, attackNumber = 1, energyCost=false, all=false, specifiedIndex=false) {
  let targetIndex = (specifiedIndex) ? specifiedIndex : stateObj.targetedMonster;
  
  document.querySelector("#playerStats .avatar").classList.add("player-windup");

  if (all===false) {
    document.querySelector(".targeted .avatar").classList.add("opponent-impact");
    await pause(50);
    document.querySelector(".targeted .avatar").classList.remove("opponent-impact");
  } else {
    stateObj.opponentMonster.forEach(function (monsterObj, index) {
      document.querySelectorAll("#opponents .avatar")[index].classList.add("opponent-impact");
    })
    await pause(50);
    stateObj.opponentMonster.forEach(function (monsterObj, index) {
      document.querySelectorAll("#opponents .avatar")[index].classList.remove("opponent-impact");
    })
    document.querySelector("#playerStats .avatar").classList.remove("player-windup");
  }

  stateObj = immer.produce(stateObj, (newState) => {
    let calculatedDamage = ((damageNumber + newState.playerMonster.strength) * attackNumber);
    if (calculatedDamage > 0) {
      if (all===true) {
        newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
          if (monsterObj.hunted > 0) {
            calculatedDamage *=2;
          }

          if (monsterObj.encounterBlock == 0) {
            console.log("You dealt " + calculatedDamage + " to " + monsterObj.name);
            newState.fightDamageCount += 1;
            newState.fightDamageTotal += calculatedDamage;

            if (monsterObj.deflate && calculatedDamage >= monsterObj.deflate && monsterObj.encounterEnergy > 0) {
              monsterObj.encounterEnergy -= 1;
            } else if (monsterObj.angry) {
              monsterObj.encounterEnergy += 1;
            } else if (monsterObj.shakedown) {
              newState.gold += monsterObj.shakedown;
            }

            monsterObj.currentHP -= calculatedDamage;
          } else if (monsterObj.encounterBlock >= calculatedDamage) {
            console.log(monsterObj.name + " blocked for " + calculatedDamage);
            monsterObj.encounterBlock -= calculatedDamage;
          } else {
            console.log(monsterObj.name + " blocked for " + calculatedDamage + " and took " + (calculatedDamage - monsterObj.encounterBlock) + " damage");
            newState.fightDamageCount += 1;
            newState.fightDamageTotal += (calculatedDamage - monsterObj.encounterBlock)

            if (monsterObj.deflate && (calculatedDamage - monsterObj.encounterBlock) >= monsterObj.deflate && monsterObj.encounterEnergy > 0) {
              newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
            } else if (monsterObj.angry) {
              monsterObj.encounterEnergy += 1;
            } else if (monsterObj.shakedown) {
              newState.gold += monsterObj.shakedown;
            }
            monsterObj.currentHP -= (calculatedDamage - monsterObj.encounterBlock);
            monsterObj.encounterBlock = 0;
          }
        })
      } else {
        let monsterObj = newState.opponentMonster[targetIndex]
        if (newState.opponentMonster[targetIndex].hunted > 0) {
          calculatedDamage *=2;
        }
        if (newState.opponentMonster[targetIndex].encounterBlock == 0) {
          console.log("You dealt " + calculatedDamage + " to " + newState.opponentMonster[targetIndex].name);
          newState.fightDamageCount += 1;
          newState.fightDamageTotal += calculatedDamage;
          if (monsterObj.deflate && calculatedDamage >= monsterObj.deflate && monsterObj.encounterEnergy > 0) {
            monsterObj.encounterEnergy -= 1;
          } else if (monsterObj.angry) {
            monsterObj.encounterEnergy += 1;
          } else if (monsterObj.shakedown) {
            newState.gold += monsterObj.shakedown;
          }
          newState.opponentMonster[targetIndex].currentHP -= calculatedDamage;
        } else if (newState.opponentMonster[targetIndex].encounterBlock >= calculatedDamage) {
          console.log(newState.opponentMonster[targetIndex].name + " blocked for " + calculatedDamage);
          newState.opponentMonster[targetIndex].encounterBlock -= calculatedDamage;
        } else {
          console.log(newState.opponentMonster[targetIndex].name + " blocked for " + calculatedDamage + " and took " + (calculatedDamage - newState.opponentMonster[targetIndex].encounterBlock) + " damage");
          newState.fightDamageCount += 1;
          newState.fightDamageTotal += (calculatedDamage - monsterObj.encounterBlock)
          if (monsterObj.deflate && (calculatedDamage - monsterObj.encounterBlock) >= monsterObj.deflate && monsterObj.encounterEnergy > 0) {
            newState.opponentMonster[newState.targetedMonster].encounterEnergy -= 1;
          } else if (monsterObj.angry) {
            monsterObj.encounterEnergy += 1;
          } else if (monsterObj.shakedown) {
            newState.gold += monsterObj.shakedown;
          }
          newState.opponentMonster[targetIndex].currentHP -= (calculatedDamage - newState.opponentMonster[targetIndex].encounterBlock);
          newState.opponentMonster[targetIndex].encounterBlock = 0;
        }
      }
    }
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost
    }
  });
  if (all === true) {
    console.log("all is true")
    for (let i = 0; i < stateObj.opponentMonster.length; i++) {
      console.log("looping for prickles at " + i)
      if (stateObj.opponentMonster[i].prickles) {
        console.log("has multiple prickle")
        stateObj = await dealPlayerDamage(stateObj, stateObj.opponentMonster[i].prickles-stateObj.opponentMonster[0].strength)
      }
    }
  } else {
    if (stateObj.opponentMonster[targetIndex].prickles) {
      console.log("has one prickle")
      stateObj = await dealPlayerDamage(stateObj, stateObj.opponentMonster[targetIndex].prickles-stateObj.opponentMonster[0].strength)
    }
  }
  return stateObj;
}

async function dealPlayerDamage(stateObj, damageNumber, monsterIndex = 0, energyChange=false, attackNumber = 1) {
  document.querySelectorAll("#opponents .avatar")[monsterIndex].classList.add("opponent-windup");
  document.querySelectorAll("#playerStats .avatar")[0].classList.add("player-impact");
  await pause(200);
  document.querySelectorAll("#opponents .avatar")[monsterIndex].classList.remove("opponent-windup");
  document.querySelectorAll("#playerStats .avatar")[0].classList.remove("player-impact");

  let reflectDamage = 0;
  
  stateObj = immer.produce(stateObj, (newState) => {
    calculatedDamage = ((damageNumber + newState.opponentMonster[monsterIndex].strength) * attackNumber);
    if (calculatedDamage > 0) {
      if (newState.playerMonster.encounterBlock == 0) {
        console.log("you took " + calculatedDamage + " damage")
        newState.playerMonster.currentHP -= calculatedDamage;
      } else if (newState.playerMonster.encounterBlock >= calculatedDamage) {
        newState.playerMonster.encounterBlock -= calculatedDamage;
        console.log("you blocked " + calculatedDamage + " damage")
        if (newState.opponentMonster[monsterIndex].offbalance) {
          reflectDamage = calculatedDamage;
        }
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
  if (reflectDamage > 0) {
    console.log("reflected")
    stateObj = await dealOpponentDamage(stateObj, reflectDamage, 1, false, false, monsterIndex)
  }
  return stateObj;
}

async function opponentDeathAnimation(toDieIndexArray) {
  toDieIndexArray.forEach(function(index) {
    let opponentAvatar = document.querySelectorAll('#opponents .avatar')[index];
    let opponentMoveDiv = document.querySelectorAll('#opponents .opponent-move-list')[index];
    let opponentHPDiv = document.querySelectorAll('#opponents .monster-hp')[index];
    opponentAvatar.classList.add("fade-out");
    opponentMoveDiv.classList.add("hidden");
    opponentHPDiv.classList.add("hidden");
    
  } )
  await pause(700);
}

async function energyGainAnimation(stateObj, all=false) {
  let index = stateObj.targetedMonster;
  if (all===true) {
    stateObj.opponentMonster.forEach(function (monsterObj, monsterIndex) {
      let opponentEnergyBar = document.querySelectorAll('.monster .monster-energy')[monsterIndex];
      opponentEnergyBar.classList.add("energy-gain");
    })
    await pause(100);
    stateObj.opponentMonster.forEach(function (monsterObj, monsterIndex) {
      let opponentEnergyBar = document.querySelectorAll('.monster .monster-energy')[monsterIndex];
      opponentEnergyBar.classList.remove("energy-gain");
    })
    
  } else {
    let opponentEnergyBar = document.querySelector('.targeted .monster-energy');
    opponentEnergyBar.classList.add("energy-gain");
    await pause(100);
    opponentEnergyBar.classList.remove("energy-gain");
  }
}


async function upgradeAnimation(stateObj, cardIndex, cardArray, upgradeTimes, divIDName="app", levelUp=false) {
  document.getElementById(divIDName).innerHTML = "";
  let newText = showChangedUpgradeText(stateObj, cardIndex, cardArray, cardArray[cardIndex], "upgrades", upgradeTimes);
  let newCost = showChangedUpgradeCost(stateObj, cardIndex, cardArray, cardArray[cardIndex], "upgrades", upgradeTimes);
  renderCard(stateObj, cardArray, cardIndex, divIDName);
  if (levelUp) {
    let levelUpText = document.createElement("P");
    levelUpText.textContent = "You leveled up and upgraded a card!"
    document.getElementById(divIDName).append(levelUpText)
  }
  let queryStringText = "#"+divIDName+ " .card-text"
  let textElement = document.querySelector(queryStringText)
  let costText = "#"+divIDName+ " .hand-card-cost"
  let costElement = document.querySelector(costText)


  textElement.classList.add("fade-out");
  costElement.classList.add("fade-out");
  await pause(500)

  textElement.textContent = newText;
  textElement.classList.remove("fade-out");
  textElement.classList.add("fade-in");

  costElement.textContent = newCost;
  costElement.classList.remove("fade-out");
  costElement.classList.add("fade-in");

  await pause(upgradeAnimationTiming)
  if (stateObj.status !== Status.InEncounter) {
    renderScreen(stateObj)
  }
    // renderScreen(stateObj);
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
  for (let x = arrayCopy.length-1; x > 0; x--) { 
    let y = Math.floor(Math.random() * (x+1)); 
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
      newState.encounterHand.push(specialCardPool.backstep)
    }
  })
  return stateObj
}

async function energyGift(stateObj, energyToGain, energyCost=false, all=false) {
  stateObj = immer.produce(stateObj, (newState) => {
    if ( (stateObj.opponentMonster[stateObj.targetedMonster].encounterEnergy += energyToGain) > 0 && energyToGain > 0) {
      newState.opponentMonster[newState.targetedMonster].encounterEnergy += energyToGain;
      newState.fightEnergyGiftCount += 1
      newState.fightEnergyGiftTotal += energyToGain
    }
    
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
  await energyGainAnimation(stateObj, all)
  return stateObj
}

async function healOpponent(stateObj, HPToGain, index=0, energyChange=false, all=false) {
  stateObj = immer.produce(stateObj, (newState) => {
    if (all === true) {
      newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
          if (monsterObj.currentHP < (monsterObj.maxHP - (HPToGain + 1))) {
            monsterObj.currentHP += HPToGain;
            newState.enemyFightHealTotal += HPToGain;
          } else {
            newState.enemyFightHealTotal += monsterObj.maxHP - monsterObj.currentHP
            monsterObj.currentHP = monsterObj.maxHP;
          };
      }) 
    } else {
      let monsterObj = newState.opponentMonster[index];
      if (monsterObj.currentHP < (monsterObj.maxHP - (HPToGain + 1))) {
        monsterObj.currentHP += HPToGain;
        newState.enemyFightHealTotal += HPToGain;
      } else {
        newState.enemyFightHealTotal += monsterObj.maxHP - monsterObj.currentHP
        monsterObj.currentHP = monsterObj.maxHP;
      };
    }
    if (energyChange) {
      newState.opponentMonster[index].encounterEnergy += energyChange
    }
  })
  return stateObj
}


async function destroyEnergy(stateObj, energyToDestroy, energyCost=false, all=false) {
  stateObj = immer.produce(stateObj, (newState) => {
    if (all === true) {
      newState.opponentMonster.forEach(function (monsterObj, monsterIndex) {
        if (monsterObj.encounterEnergy > 0 && monsterObj.encounterEnergy > energyToDestroy)  {
          monsterObj.encounterEnergy -= energyToDestroy;
          newState.fightEnergyDrainCount += 1
          newState.fightEnergyDrainTotal += energyToDestroy
        } else if (monsterObj.encounterEnergy > 0) {
          newState.fightEnergyDrainCount += 1
          newState.fightEnergyDrainTotal += monsterObj.encounterEnergy; 
          monsterObj.encounterEnergy = 0; 
        } else {}
      }) 
    } else {
      let monsterObj = newState.opponentMonster[newState.targetedMonster];
      if (monsterObj.encounterEnergy > 0 && monsterObj.encounterEnergy > energyToDestroy)  {
        monsterObj.encounterEnergy -= energyToDestroy;
        newState.fightEnergyDrainCount += 1
        newState.fightEnergyDrainTotal += energyToDestroy
      } else if (monsterObj.encounterEnergy > 0) {
        newState.fightEnergyDrainCount += 1
        newState.fightEnergyDrainTotal += monsterObj.encounterEnergy; 
        monsterObj.encounterEnergy = 0; 
      } else {}
    }
    if (energyCost) {
      newState.playerMonster.encounterEnergy -= energyCost
    }
  })
  await energyGainAnimation(stateObj, all)
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

async function changeStatus(stateObj, newStatus, countsAsEventSkipForChangeStatus=false, skipGoldGift=50) {
  //HUGE HACK, deal with this later, console.log
  document.querySelector("#playerDeckPile").classList.remove("upgrade-animation");
  stateObj = immer.produce(stateObj, (newState) => {
    if (countsAsEventSkipForChangeStatus === true) {
      newState.townMapSquares[newState.playerHere] = "completed";
      newState.gold += skipGoldGift;
    }
    newState.status = newStatus;
  })
  await changeState(stateObj);
  return stateObj;
}

async function skipCards(stateObj, isUsedForEventSkip=false) {
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

async function TownFight(stateObj) {
  stateObj = setUpEncounter(stateObj, isBoss=true)
  await changeState(stateObj);
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
      newState.gold -= newState.cardRemoveCost
      newState.cardRemoveCost += 100;
    } else {
      newState.townMapSquares[newState.playerHere] = "completed"
      newState.status = Status.OverworldMap
    }
  })
  changeState(stateObj);
  return stateObj;
}



async function paidRemoval(stateObj, index) {
  console.log("removed " + stateObj.playerDeck[index].name + " from deck")
  stateObj = immer.produce(stateObj, (newState) => {
    let goldReward = (stateObj.playerDeck[index].rare === true) ? 100 : 50;
    newState.gold += goldReward;
    newState.playerDeck.splice(index, 1);
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}




async function loseMaxHPHeal(stateObj, index) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerMonster.maxHP -= 10;
    if (newState.playerMonster.currentHP > newState.playerMonster.maxHP) {newState.playerMonster.currentHP = newState.playerMonster.maxHP};
    newState.healAfterFight += 4;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}

async function increaseMaxHP(stateObj, statusToChange, valueToPass) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerMonster.maxHP += valueToPass;
    newState.status = statusToChange
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}



async function increaseExtraHeal(stateObj, statusToChange, valueToPass) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.extraHeal += valueToPass;
    newState.status = statusToChange
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}

async function increaseGold(stateObj, statusToChange=false, valueToPass) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.gold += valueToPass;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
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
      newState.gold -= newState.cardUpgradeCost
      newState.cardUpgradeCost += 75;
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
    newState.playerDeck[index].baseDamage += 5;
    newState.eventUsed = true;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

function doubleCardAttack(stateObj, index, array) {
  let newBaseDamage = Math.floor(stateObj.playerDeck[index].baseDamage *= 2)
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseDamage = newBaseDamage;
    newState.playerDeck[index].baseCost += 1;
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
async function renderPlayerMonster(stateObj) {
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
    stateObj = await startEncounter(stateObj);
    stateObj = immer.produce(stateObj, (newState) => {
      newState.fightStarted = true;
    })
    await changeState(stateObj);
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



async function renderTownDiv(stateObj, classNameString, imgTextString, triggerCondition, functionToAdd, statusToChange=false, altText=false, valueToPass=false,) {
  let newTownDiv = document.createElement("Div");
  newTownDiv.classList.add(classNameString);
  newTownDiv.classList.add("town-div");

  let newDivText = document.createElement("H3");
  newDivText.textContent = imgTextString
  newDivText.classList.add("fight-text");

  if (triggerCondition===true) {
      newTownDiv.classList.add("clickable-town-div")
      newTownDiv.onclick = function () {
        functionToAdd(stateObj, statusToChange, valueToPass);
      }
    } else {
      newDivText.textContent = altText;
    };

    newTownDiv.append(newDivText);
    return newTownDiv
}


function renderChoiceDiv(stateObj, classesArray, imgSrcString, divTextString, triggerCondition, functionToAdd, statusToChange=false, altText=false, valueToPass=false) {
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
        functionToAdd(stateObj, statusToChange, valueToPass);
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
  if (stateObj.healAfterFight > 0) {
    stateObj = healPlayer(stateObj, stateObj.healAfterFight);
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
    newState.fightDamageCount = 0;
    newState.fightDamageTotal = 0;
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
    newState.blockPerTurn = 0;
    newState.blockKeep = false;
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
      newState.playerMonster.currentHP += 10
      newState.cardRemoveCost = cardRemoveStartCost;
      newState.cardUpgradeCost = cardUpgradeStartCost;
      newState.healCost =  healStartCost;
      console.log("You head out to face Gym # " + newState.gymCount);
      newState.townEventChosen = false;
      newState.availableCardPoolForShop = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));

      newState.townMapSet = false;
      newState.fightingBoss = false;
      newState.InTown = false;
      newState.playerHere = 1;
      
      newState.status = Status.ChooseEncounterCardReward;
    } else {
      newState.gold += newState.townMonsterArray[newState.gymFightCount].goldReward
      //newState.playerXP += newState.townMonsterArray[newState.gymFightCount].XP
      newState.gymFightCount += 1;
      newState.status = Status.ChooseEncounterCardReward;
    }
  })

  return stateObj;
}

async function handleDeaths(stateObj) {
  //push indexes of dead monsters to an array
  if (stateObj.opponentMonster) {
    let indexesToDelete = [];
    stateObj.opponentMonster.forEach(function (monster, index) {
      if (monster.currentHP <= 0) {
        console.log("opponent monster at index " + index + " has died.")
        indexesToDelete.push(index);
      }
    });
    //if a monster has died
    if (indexesToDelete.length > 0) {
      indexesToDelete.reverse()
      await opponentDeathAnimation(indexesToDelete)

      stateObj = immer.produce(stateObj, (newState) => {
        for (let i = 0; i < indexesToDelete.length; i++) {
          console.log("deleting opponent at index " + i);
          newState.playerXP += newState.opponentMonster[indexesToDelete[i]].XPGain
          newState.opponentMonster.splice(indexesToDelete[i], 1)
        }
        newState.targetedMonster = 0;
      });
    }

    if (stateObj.opponentMonster.length == 0) {
      stateObj = resetAfterFight(stateObj)
    }

    if (stateObj.playerMonster.currentHP <= 0) {
      stateObj = await changeStatus(stateObj, Status.DeathScreen) ;
    }
  }
  return stateObj;
};

// maybe don’t look at this too closely
function pause(timeValue) {
  return new Promise(res => setTimeout(res, timeValue))
}

function setUpEncounter(stateObj, isBoss=false) {
  console.log('executing setUpEncounter')

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
    newState.fightDamageCount = 0;
    newState.fightDamageTotal = 0;
    newState.selfDamageAttack = 0;
    newState.selfDamageBlock = 0;
    newState.energyGiftBlock = 0;
    newState.energyGiftAttack = 0;
    newState.fightEnergyDrainCount = 0;
    newState.fightEnergyDrainTotal = 0;
    newState.gainLifePerCard = 0;
    newState.blockPerTurn = 0;
    newState.blockKeep = false;
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
    if (handLength > 8 ) {
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

function returnCard(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    const handLength = newState.encounterHand.length;
    if (handLength > 8 ) {
      console.log("hand is full");
      return newState;
    }
    // if (newState.encounterDiscard.length === 0) {
    //   return newState;
    // }
    let topCard = newState.encounterDiscard.pop();
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

async function monsterLevelUp(stateObj) {
  let targetIndex = Math.floor(Math.random() * (stateObj.playerDeck.length));

  if (stateObj.playerXP >= levelXPRequirements[stateObj.playerLevel+1]) {
    await upgradeAnimation(stateObj, targetIndex, stateObj.playerDeck, 2, divIDName="app", levelUp=true);
  } else {
    await upgradeAnimation(stateObj, targetIndex, stateObj.playerDeck, 1, divIDName="app", levelUp=true);
  }
  


  stateObj = immer.produce(stateObj, (newState) => {
    if (stateObj.playerXP >= levelXPRequirements[newState.playerLevel+1]) {
      newState.playerDeck[targetIndex].upgrades +=2;
      newState.playerLevel += 2;

    } else if (stateObj.playerXP >= levelXPRequirements[newState.playerLevel]) {
      newState.playerDeck[targetIndex].upgrades +=1;
      newState.playerLevel += 1;
    } else {}
  });

  console.log("upgraded card has upgrades: " + stateObj.playerDeck[targetIndex].upgrades)
  return stateObj;
}

function PlayACardImmer(stateObj, cardIndexInHand) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.cardsPerTurn += 1;
    if (stateObj.encounterHand[cardIndexInHand]) {
      if (stateObj.encounterHand[cardIndexInHand].exhaust === true) {
        console.log("you exhausted " + stateObj.encounterHand[cardIndexInHand].name);
        newState.encounterHand.splice(cardIndexInHand, 1);
      } else {
        newState.encounterDiscard.push(stateObj.encounterHand[cardIndexInHand]);
        newState.encounterHand.splice(cardIndexInHand, 1);
      }
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
  return stateObj;
}

async function playACard(stateObj, cardIndexInHand, arrayObj) {
  console.log("you played " + stateObj.encounterHand[cardIndexInHand].name);
  stateObj = await stateObj.encounterHand[cardIndexInHand].action(stateObj, cardIndexInHand, arrayObj);

  stateObj = await PlayACardImmer(stateObj, cardIndexInHand);
  stateObj = await pickOpponentMove(stateObj);
  stateObj = await changeState(stateObj);
  return stateObj;
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
      renderCard(stateObj, stateObj.encounterHand, index, "handContainer2", functionToAdd=false)
    });
  }
}

function renderCardPile(stateObj, cardArrayObj, divStringName) {
  document.getElementById(divStringName).innerHTML = "";
  if (cardArrayObj.length > 0) {
    cardArrayObj.forEach(function (cardObj, index) {
      renderCard(stateObj, cardArrayObj, index, divStringName)
    });
  }
}

function topRowDiv(stateObj, divName) {
  let topRowDiv = document.createElement("Div");
  topRowDiv.setAttribute("id", "town-top-row");

  let statusTextDiv = document.createElement("Div");
  statusTextDiv.setAttribute("id", "status-text-div");
  let statusText = document.createElement("p");

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

function eventText(divName, newDivName=false, eventTitleString, eventTextString) {
  let eventTextDiv = document.createElement("Div")
  if (newDivName) {
    eventTextDiv.setAttribute("id", newDivName)
  } else {
    eventTextDiv.setAttribute("id", "event-text-div")
  }
  let eventTitle= document.createElement("H2");
  eventTitle.classList.add("event-title");
  eventTitle.textContent = eventTitleString;
  eventTextDiv.append(eventTitle);

  let eventText= document.createElement("p");
  eventText.classList.add("event-text");
  eventText.textContent = eventTextString;
  eventTextDiv.append(eventText);

  document.getElementById(divName).append(eventTextDiv);
  return eventTextDiv
}

async function skipToTownButton(stateObj, buttonString, divName, cardSkip=false, isEventUsedForSkipButton=false, skipGoldGift=50) {
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
  skipToTownButton(stateObj, "Not right now", ".remove-div");
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



function renderRetainCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", retainCard);
};





function renderDoubleUpgradeCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", doubleUpgradeCard, goldCost="doubleupgrade");
  skipToTownButton(stateObj, "I don't want to upgrade any of these cards twice (+50 gold, but event disappears)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
  };

function renderChooseEncounterCardReward(stateObj) {
  let shuffledCardPool = fisherYatesShuffle(Object.values(stateObj.playerMonster.cardPool));
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, sampledCardPool, "remove-div", chooseThisCard);
  skipToTownButton(stateObj, "I choose not to add any of these cards to my deck (+5 gold)", ".remove-div", cardSkip=true);
  renderCardPile(stateObj, stateObj.playerDeck, "deckDiv");
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


//CHOOSE RARE
function renderChooseRareEvent(stateObj) {
  let cardPool = Object.values(stateObj.playerMonster.cardPool);
  let rareCards = cardPool.filter(card => card.rare);
  let shuffledCardPool = fisherYatesShuffle(rareCards);
  let sampledCardPool = shuffledCardPool.slice(0, 3);

  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  eventText("remove-div", newDivName=false, "Treasure Salvage", "Your monster starts digging furiously at the ground. It unearths a rare spell tome. As you watch, the tome's text shifts before your eyes between three different options. You realize that you can't look away - the slow rhythyms of the shifting text is casting a powerful mesmer charm on you. You can only break the charm by picking one of the three options to add to your deck. Which will you choose?");
  renderClickableCardList(stateObj, sampledCardPool, "remove-div", chooseThisCard);
 };

 function renderPeekBehindDevCurtain(stateObj) {
  let cardPool = [specialCardPool.fataltoxin, specialCardPool.theocho, specialCardPool.recycle];
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  eventText("remove-div", newDivName=false, "Peek Behind the Curtain", "Developers try pretty hard to make sure that you're only offered cards in line with your current power level. This event is the exception. You've managed to get your hands on some obscenely powerful shit. ");
  renderClickableCardList(stateObj, cardPool, "remove-div", chooseThisCard);
 };

 //ASSASSIN TRAINING
async function renderAssassinTrainingEvent(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  eventText("remove-div", newDivName=false, "Cloaked Hassassin", "At an inn for the night, you recognize a man cloaked in the garb of an Hassassin. These famous killers for hire use a signature slow-acting poison to silently dispatch their foes. You offer to cast a powerful magical shield on the man in exchange for learning some of his ways. He tells you that the way of the Hassassin is not for everyone - it requires the temporary relinquishing of all offensive power in exchange for an extremely powerful poison spell. The man informs you that if you do not wish to become a full Hassassin, he can still teach you some tricks to evade attacks and raise your dexterity. Which do you choose?");
  let removeAttacksDiv = await renderTownDiv(stateObj, "binaryChoice", "Remove all your attacks. Gain a Fatal Toxin", true, assassinTraining, Status.OverworldMap, altText=false);
  let DexDiv = await renderTownDiv(stateObj, "binaryChoice", "Gain 1 permanent Dexterity", true, increaseDexEvent, Status.OverworldMap, altText=false, 1);
  document.getElementById("remove-div").append(removeAttacksDiv, DexDiv);
  skipToTownButton(stateObj, "Not right now", ".remove-div", cardSkip=false, isEventUsedForSkipButton=false);
};

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

async function increaseDexEvent(stateObj, statusToChange=false, valueToPass) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerMonster.dex += valueToPass;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}


//PAID REMOVAL
async function renderPaidRemovalEvent(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  eventText("remove-div", newDivName=false, "Friendly Recycler", "You pass a recycling druid on the road. She's busily picking up trash. She offers to help you manage your old and unneeded spells. She either offers to pay you for an old spell you don't need, or give you a powerful recycling spell that gets rid of all other spells in your hand.");
  let paidRemovalDiv = await renderTownDiv(stateObj, "binaryChoice", "Choose a card to remove in exchange for 50 gold (100 gold for a rare)", true, changeStatus, Status.PaidRemovalCardList, altText=false);
  let recycleDiv = await renderTownDiv(stateObj, "binaryChoice", "Gain 1 Recycler spell that exhausts all other cards in hand", true, addRecycler, Status.OverworldMap, altText=false);
  document.getElementById("remove-div").append(paidRemovalDiv, recycleDiv);
  skipToTownButton(stateObj, "Not right now", ".remove-div", cardSkip=false, isEventUsedForSkipButton=false);
};

function renderPaidRemovalCardList(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", paidRemoval, goldCost="paidremoval");
};

async function addRecycler(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.playerDeck.push(specialCardPool.recycle)
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}

//LEVEL UP
async function renderLevelUp(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Dreams of Power", "You and your monster spend the night under a tree. You awake to see your monster playing with a powerful forest spirit. As you approach, your monster runs back to you happily, and the forest spirit melts back into the trees. You notice that your monster seems somehow stronger than the night before...");
  let strengthDiv = await renderTownDiv(stateObj, "increaseStrength", "Gain 2 permanent Strength", true, increaseStrengthEvent, Status.InTown, altText=false);
  let DexDiv = await renderTownDiv(stateObj, "increaseDex", "Gain 2 permanent Dexterity", true, increaseDexEvent, Status.InTown, altText=false, 2);
  
  document.getElementById("level-up-div").append(strengthDiv, DexDiv);
  skipToTownButton(stateObj, "Skip event (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

function increaseStrengthEvent(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.strength += 2;
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

//Attack Choice
async function renderAttackChoiceEvent(stateObj) {
  console.log("attack choice event")
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Supercharge", "You and your monster come across a leyline of magic in the woods. You know you can use this to mildly increase the attack power of a spell. You can also overcharge a spell with magical energy, doubling its attack but making it cost 1 more energy. Which do you choose?");
  let doubleDiv = await renderTownDiv(stateObj, "doubleDamage", "Double a card's attack. It costs 1 more energy", true, changeStatus, Status.DoublingAttack);
  let increaseAttackDiv = await renderTownDiv(stateObj, "increaseAttack", "Increase a card's attack by 5", true, changeStatus, Status.IncreasingAttack);
  
  document.getElementById("level-up-div").append(doubleDiv, increaseAttackDiv);
 };

function renderIncreaseCardAttack(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseDamage && typeof cardObj.baseDamage === 'number') {
      renderCard(stateObj, stateObj.playerDeck, index, "remove-div", increaseCardAttack, goldCost="increaseattack")
    }
  });
  skipToTownButton(stateObj, "I choose not to increase the attack of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

async function renderDoubleCardAttack(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseDamage && typeof cardObj.baseDamage === 'number') {
      renderCard(stateObj, stateObj.playerDeck, index, "remove-div", doubleCardAttack, goldCost="doubleattack")
    }
  });
  skipToTownButton(stateObj, "I choose not to increase the attack of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

//Wealthy Pacifist
async function renderWealthyPacifist(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Benevolent Pacifist", "You come across an old man in the woods. His clothes are simple. He offers you a spot beside his fire. He divulges that he used to be a member of The Seven Points, but has since renounced violence. He travels the world trying to spread peace. He offers to pay you handsomely to add more defensive spells to your deck instead of offensive. Seeing you hesitate, he also offers to pay you to remove an offensive spell from your deck. Something in his eyes tells you to accept one of the two offers.");
  let withdrawDiv = await renderTownDiv(stateObj, "addWithdraws", "Add 3 withdraws to your deck. Gain 300 gold", true, wealthyPacifistWithdrawEvent, Status.OverworldMap, altText=false);
  let removeDiv = await renderTownDiv(stateObj, "removeAttack", "Remove an attack. Gain 50 gold", true, changeStatus, Status.PaidAttackRemoval, altText=false);
  
  document.getElementById("level-up-div").append(withdrawDiv, removeDiv);
};

async function wealthyPacifistWithdrawEvent(stateObj, statusToChange) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.eventUsed = true;
    newState.gold += 300;
    for (let i = 0; i < 3; i++) {
      newState.playerDeck.push(starterDeck.withdraw)
    }
    newState.status = statusToChange
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}

function renderPaidAttackRemoval(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.cardType === 'attack') {
      renderCard(stateObj, stateObj.playerDeck, index, "remove-div", paidRemoval, goldCost="paidremoval")
    }
  });
  skipToTownButton(stateObj, "Not right now", ".remove-div", cardSkip=false, isEventUsedForSkipButton=false);
 };

//Duplicate Choice
async function renderDuplicateChoice(stateObj) {
  console.log("dupe choice triggfered")
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Refracting Prism", "Your monster is playing in a nearby stream. It comes back with a piece of quartz that reflects the light strangely. You realize it's a Prismatic Amplifier. You can use this to either copy a spell in your deck, or exchange some of your life force to copy it five times.");
  let OneDuplicateDiv = await renderTownDiv(stateObj, "duplicateOnce", "Add a copy of any card to your deck", true, changeStatus, Status.DuplicatingCards, altText=false);
  let sevenDuplicateDiv = await renderTownDiv(stateObj, "increaseDex", "Add 5 copies of any card to your deck. Lose 10 max HP", true, changeStatus, Status.DuplicatingCardFiveTimes, altText=false);
  
  document.getElementById("level-up-div").append(OneDuplicateDiv, sevenDuplicateDiv);
  skipToTownButton(stateObj, "Skip event (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

function renderDuplicateCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", duplicateCard);
};

function renderDuplicateCardFiveTimes(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", duplicateCardFiveTimes);
};

async function duplicateCard(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    let cardObj = {...newState.playerDeck[index]}
    newState.eventUsed = true;
    newState.playerDeck.push(cardObj);
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}

async function duplicateCardFiveTimes(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    let cardObj = {...newState.playerDeck[index]}
    newState.eventUsed = true;
    for (i=0; i < 5; i++) {
      newState.playerDeck.push(cardObj);
    }
    newState.status = Status.OverworldMap
    newState.playerMonster.maxHP -= 10;
    if (newState.playerMonster.currentHP > newState.playerMonster.maxHP) {newState.playerMonster.currentHP = newState.playerMonster.maxHP};
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  await changeState(stateObj);
  return stateObj;
}

//Decrease Card Cost Choice
async function renderDecreaseChoice(stateObj) {
  console.log("dupe choice triggfered")
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Energy Master", "A fellow traveler on the road flags you down. 'You look powerful!' he says. 'I'll help you on your journey - I can decrease the cost of any spell to be 1 energy less. Or, if you wish to demonstrate your power, I'll increase the cost of one of your cards by one, and pay you handsomely.' Which do you choose?");
  let decreaseDiv = await renderTownDiv(stateObj, "decreaseDiv", "Decrease a card's cost by one", true, changeStatus, Status.DecreasingCost, altText=false);
  let increaseDiv = await renderTownDiv(stateObj, "increaseDiv", "Increase a card's cost by 1. Gain 100 gold", true, changeStatus, Status.IncreasingCost, altText=false);
  
  document.getElementById("level-up-div").append(decreaseDiv, increaseDiv);
  skipToTownButton(stateObj, "Skip event (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

function renderDecreaseCardCost(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (typeof cardObj.cost === "function") {
      if (cardObj.cost(stateObj, index, stateObj.playerDeck) > 0) {
        renderCard(stateObj, stateObj.playerDeck, index, "remove-div", decreaseCardCost, goldCost="decreasecost")
      }
    }
  }); 
};

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

function renderIncreaseCardCost(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (typeof cardObj.baseCost === "number") {
      renderCard(stateObj, stateObj.playerDeck, index, "remove-div", IncreaseCardCost, goldCost="doubleattack")
    }
  }); 
};

function IncreaseCardCost(stateObj, index, array) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerDeck[index].baseCost +=1;
    newState.eventUsed = true;
    newState.gold += 100
    newState.status = Status.OverworldMap
    newState.townMapSquares[newState.playerHere] = "completed"
  })
  changeState(stateObj);
  return stateObj;
}

//Hits vs attack
async function renderHitsAttackChoice(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Offensive Master", "A powerful offensive wizard offers you the choice between two strong options. She can make an offensive spell hit for a second time, but only for lighter spells. Alternatively, she can increase the base damage of one of your offensive spells");
  let div1 = await renderTownDiv(stateObj, "duplicateOnce", "Choose a card that costs 1 mana or less. It hits an extra time", true, changeStatus, Status.IncreasingHits, altText=false);
  let div2 = await renderTownDiv(stateObj, "increaseDex", "Choose an attack to deal 5 extra base damage", true, changeStatus, Status.IncreasingAttack, altText=false);
  
  document.getElementById("level-up-div").append(div1, div2);
  skipToTownButton(stateObj, "Skip event (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

function renderIncreaseBaseHit(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseHits && typeof cardObj.baseHits === 'number') {
      if (typeof cardObj.cost === "function" && cardObj.cost(stateObj, index, stateObj.playerDeck) < 2)
      renderCard(stateObj, stateObj.playerDeck, index, "remove-div", increaseBaseHits, goldCost="moreHits")
    }
  });
};

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

//Max HP vs extraHeal
async function renderMaxHPvsExtraHeal(stateObj) {
  console.log("max HP heal triggerd")
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");
  eventText("level-up-div", newDivName=false, "Forest Sprite", "As you nap beneath an oak tree, a forest dryad cautiously emerges from within the hollow trunk. She gazes fondly at your little monster sleeping nestled in between the routes. She moves to give it a blessing. She tells you that she can either increase your monster's total life essence, or increase its ability to heal itself from all sources");
  let maxHPDiv = await renderTownDiv(stateObj, "increaseMaxHP", "Gain 15 max HP", true, increaseMaxHP, Status.OverworldMap, altText=false, 15);
  let extraHealDiv = await renderTownDiv(stateObj, "increaseExtraHeal", "Whenever you heal, heal 3 extra damage", true, increaseExtraHeal, Status.OverworldMap, altText=false, 3);
  
  document.getElementById("level-up-div").append(maxHPDiv, extraHealDiv);
  skipToTownButton(stateObj, "Skip event (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
 };

async function renderHealEndOfFightChoice(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");

  let maxHPDiv = await renderTownDiv(stateObj, "increaseMaxHP", "img/healer.PNG", "Gain 15 Max HP", true, increaseMaxHP, Status.OverworldMap, altText=false, 15);
  let loseHPDiv = await renderTownDiv(stateObj, "increaseExtraHeal", "img/wizardshop.PNG", "Lose 10 Max HP. Heal 4 after each fight", true, loseMaxHPHeal, Status.OverworldMap, altText=false);
  
  document.getElementById("level-up-div").append(maxHPDiv, loseHPDiv);
  skipToTownButton(stateObj, "Skip event (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true);
};

async function renderHealer(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app", "level-up-div");

  let healDiv = await renderTownDiv(stateObj, "healDiv", "img/potion.svg", "Heal to full", (stateObj.playerMonster.currentHP < stateObj.playerMonster.maxHP), fullHeal, Status.InTown, altText="At full health");
  let goldDiv = await renderTownDiv(stateObj, "skipDiv", "img/goldsack.PNG", "Gain 30 gold", true, increaseGold, Status.OverworldMap, altText=false, 30);
  document.getElementById("level-up-div").classList.add("healer-div");
  document.getElementById("level-up-div").append(healDiv, goldDiv);
  skipToTownButton(stateObj, "I want to come back later", ".remove-div", cardSkip=false, isEventUsedForSkipButton=false);
};






function renderUpgradeCard(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app");
  divContainer("app");
  renderClickableCardList(stateObj, stateObj.playerDeck, "remove-div", encounterUpgradeCard, goldCost="upgrade");
  skipToTownButton(stateObj, "I don't want to upgrade any of these cards", ".remove-div");
};



function renderIncreaseCardBlock(stateObj) {
  document.getElementById("app").innerHTML = ""
  topRowDiv(stateObj, "app")
  divContainer("app");
  stateObj.playerDeck.forEach(function (cardObj, index) {
    if (cardObj.baseBlock && typeof cardObj.baseBlock === 'number') {
      renderCard(stateObj, stateObj.playerDeck, index, "remove-div", increaseCardBlock, goldCost="increaseblock")
    }
  });
  skipToTownButton(stateObj, "I choose not to increase the block of any of these cards (+50 gold)", ".remove-div", cardSkip=false, isEventUsedForSkipButton=true); 
};





function renderCard(stateObj, cardArray, index, divName=false, functionToAdd=false, goldCost=false) {
  let cardObj = cardArray[index];
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
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseDamage", 5)
          altUpgradeText.classList.add("alt-card-text");
          cardDiv.append(altUpgradeText);
        } else if (goldCost === "doubleattack") {
          cardDiv.classList.add("card-change-text");

          let cardAltCost = document.createElement("H3");
          cardAltCost.textContent = showChangedUpgradeCost(stateObj, index, cardArray, cardObj, "baseCost", 1)
          cardAltCost.classList.add("alt-cost")

          let altUpgradeText =  document.createElement("P");
          altUpgradeText.textContent = showChangedUpgradeText(stateObj, index, cardArray, cardObj, "baseDamage", cardArray[index].baseDamage)
          altUpgradeText.classList.add("alt-card-text");

          cardDiv.innerHTML = "";
          topCardRowDiv.innerHTML = "";
          topCardRowDiv.append(cardAltCost, cardCost, cardName);
          cardDiv.append(topCardRowDiv, altUpgradeText, cardText);

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
        if (divName) {
          document.getElementById(divName).appendChild(cardDiv);
        }
        return cardDiv
        
}

function renderClickableCardList(stateObj, cardArray, divName, functionToAdd, goldCost=false) {
  cardArray.forEach(function (cardObj, index) {
    renderCard(stateObj, cardArray, index, divName, functionToAdd, goldCost)
  })
}


//function that takes a card, a card property, and a change, and returns that card's text IF the change happened
function showChangedUpgradeText(stateObj, index, array, cardObj, propertyNameString, valueChange) {
  let cardClone = {...cardObj}
  if (array === stateObj.playerDeck) {
    let newState = immer.produce(stateObj, (draft) => {
      draft.playerDeck[index][propertyNameString] += valueChange;
    })
    return cardClone.text(newState, index, newState.playerDeck) 
  } else {
    let newState = immer.produce(stateObj, (draft) => {
      draft.encounterHand[index][propertyNameString] += valueChange;
    })
    return cardClone.text(newState, index, newState.encounterHand) 
  }
  
   
}

function showChangedUpgradeCost(stateObj, index, array, cardObj, propertyNameString, valueChange) {
  let cardClone = {...cardObj}
  if (array === stateObj.playerDeck) {
    let newState = immer.produce(stateObj, (draft) => {
      draft.playerDeck[index][propertyNameString] += valueChange;
    })

    if (typeof cardObj.cost === "function") {
      return cardClone.cost(newState, index, newState.playerDeck)
    } else {
      return cardClone.cost;
    }

  } else {
    let newState = immer.produce(stateObj, (draft) => {
      draft.encounterHand[index][propertyNameString] += valueChange;
    })

    if (typeof cardObj.cost === "function") {
      return cardClone.cost(newState, index, newState.encounterHand)
    } else {
      return cardClone.cost;
    }
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
    opponentMoveListDiv.classList.add("opponent-move-list");

    if (monsterObj.powers) {
      monsterObj.powers.forEach(function(powerObj, powerIndex) {
        let powerDiv = document.createElement("Div");
        powerDiv.classList.add("power");

        let powerName = document.createElement("H3");
        powerName.textContent = powerObj.name;
        let powerText = document.createElement("P");
        powerText.textContent = powerObj.text
        powerDiv.append(powerName, powerText);
        opponentMoveListDiv.appendChild(powerDiv);


      })
    }

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

async function renderTown(stateObj) {
  console.log('renderin town')


    document.getElementById("app").innerHTML = ""
    topRowDiv(stateObj, "app");
    let townDiv = document.createElement("Div");
    townDiv.classList.add("flex-container")
    townDiv.setAttribute("id", "town");

  //let townHealDiv = renderTownDiv(stateObj, "TownHealer", "img/healer.PNG", "Visit Healer", (stateObj.gold >= Math.floor(stateObj.healCost/2)), changeStatus, Status.HealersShop, "Not enough gold");
  let townShopDiv = await renderTownDiv(stateObj, "TownShop", "img/healer.PNG", "Visit Shop", true, changeStatus, Status.cardShop);
  let townRemoveDiv = await renderTownDiv(stateObj, "TownRemove", "img/tavern2.PNG", `Pay ${stateObj.cardRemoveCost} gold to remove a card`,  (stateObj.gold >=stateObj.cardRemoveCost), changeStatus, Status.RemovingCards, `(${stateObj.cardRemoveCost} gold needed to remove a card)`);
  let townUpgradeDiv = await renderTownDiv(stateObj, "TownUpgrade", "img/forge.PNG", `Pay ${stateObj.cardUpgradeCost} gold to upgrade a card`, (stateObj.gold >=stateObj.cardUpgradeCost), changeStatus, Status.UpgradingCards, `(${stateObj.cardUpgradeCost} needed to upgrade a card)`);
  let townGymDiv = await renderTownDiv(stateObj, "TownFight", "img/dracula.png", "Fight Gym Boss", true, TownFight)

  townDiv.append(townShopDiv, townRemoveDiv, townUpgradeDiv, townGymDiv);
  document.getElementById("app").append(townDiv);
}


async function renderScreen(stateObj) {
  if (stateObj.status === Status.ChoosingMonster) {
    renderChooseMonster(stateObj);
  } else if (stateObj.status == Status.OverworldMap) {
    renderMapScreen(stateObj);
  } else if (stateObj.status == Status.ChooseEncounterCardReward) {
    renderChooseEncounterCardReward(stateObj);
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
  } else if (stateObj.status == Status.IncreasingCost) {
    renderIncreaseCardCost(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DecreasingChoice) {
    renderDecreaseChoice(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.IncreasingBlock) {
    renderIncreaseCardBlock(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.IncreasingHits) {
    renderIncreaseBaseHit(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.HitsVsAttackChoice) {
    renderHitsAttackChoice(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.IncreasingAttack) {
    renderIncreaseCardAttack(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.HealersShop) {
    renderHealer(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DuplicateChoice) {
    renderDuplicateChoice(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DuplicatingCards) {
    renderDuplicateCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DuplicatingCardFiveTimes) {
    renderDuplicateCardFiveTimes(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.HealEndOfFightChoice) {
    renderHealEndOfFightChoice(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DoublingAttack) {
    renderDoubleCardAttack(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.AttackChoiceEvent) {
    renderAttackChoiceEvent(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.DoubleUpgradeEvent) {
    renderDoubleUpgradeCard(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.LevelUpEvent) {
    renderLevelUp(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.MaxHPvsHealChoice) {
    renderMaxHPvsExtraHeal(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.ChooseRareEvent) {
    renderChooseRareEvent(stateObj);
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
    renderPaidRemovalEvent(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.PaidRemovalCardList) {
    renderPaidRemovalCardList(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.WealthyPacifist) {
    renderWealthyPacifist(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.PeekBehindTheCurtain) {
    renderPeekBehindDevCurtain(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.PaidAttackRemoval) {
    renderPaidAttackRemoval(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status == Status.AssassinTrainingEvent) {
    renderAssassinTrainingEvent(stateObj);
    renderCardPile(stateObj, stateObj.playerDeck, "deckDiv")
  } else if (stateObj.status === Status.InEncounter) {
    renderDivs(stateObj);
    //renderOpponents(stateObj)
  } else {
    
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
async function pickOpponentMove(stateObj) {
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


// async function playOpponentMove2(stateObj) {
//   let testMonster = stateObj.opponentMonster[0]
//   stateObj = await testMonster.moves[testMonster.opponentMoveIndex].action(stateObj, 0, stateObj.opponentMonster);
//   stateObj = await handleDeaths(stateObj);
//   return stateObj;
// }

async function playOpponentMove(stateObj) {
  //each opponent Monster plays its own move
  if (stateObj.opponentMonster.length === 3) {
    const move = stateObj.opponentMonster[0].moves[stateObj.opponentMonster[0].opponentMoveIndex];
    stateObj = await move.action(stateObj, 0, stateObj.opponentMonster);
    const move1 = stateObj.opponentMonster[1].moves[stateObj.opponentMonster[1].opponentMoveIndex];
    stateObj = await move1.action(stateObj, 1, stateObj.opponentMonster);
    const move2 = stateObj.opponentMonster[2].moves[stateObj.opponentMonster[2].opponentMoveIndex];
    stateObj = await move.action(stateObj, 2, stateObj.opponentMonster);
  } else if (stateObj.opponentMonster.length === 2) {
    const move = stateObj.opponentMonster[0].moves[stateObj.opponentMonster[0].opponentMoveIndex];
    stateObj = await move.action(stateObj, 0, stateObj.opponentMonster);
    const move1 = stateObj.opponentMonster[1].moves[stateObj.opponentMonster[1].opponentMoveIndex];
    stateObj = await move1.action(stateObj, 1, stateObj.opponentMonster);
  } else if (stateObj.opponentMonster.length === 1) {
    const move = stateObj.opponentMonster[0].moves[stateObj.opponentMonster[0].opponentMoveIndex];
    stateObj = await move.action(stateObj, 0, stateObj.opponentMonster);
  }

  return stateObj;
}

async function discardHand(stateObj) {
  const indicesToRemove = stateObj.encounterHand.map((obj, index) => obj.hasOwnProperty('retain') ? undefined : index)
                              .filter(index => index !== undefined);
  indicesToRemove.reverse()
   stateObj = immer.produce(stateObj, (newState) => {
    indicesToRemove.forEach(function(indice, index) {
      let cardToRemove = newState.encounterHand.splice(indice, 1)[0];
      console.log("removing card at index " + indice + " with name " + cardToRemove.name)
      newState.encounterDiscard.push(cardToRemove);
    })

    newState.encounterHand.forEach(function(cardObj, index) {
      cardObj.upgrades +=1
    })
  });
  return stateObj;
}

// async function discardHand(stateObj) {
//    stateObj = immer.produce(stateObj, (newState) => {
//     newState.encounterDiscard = newState.encounterDiscard.concat(newState.encounterHand)
//     newState.encounterHand = []
//   });
//   return stateObj;
// }


////ONE TURN
function shuffleDraw(stateObj) {
  let toChangeState = immer.produce(stateObj, (newState) => {
    newState.encounterDraw = shuffleArray(newState.encounterDraw);
  });
  //changeState(toChangeState);
  return toChangeState;
}

async function startEncounter(stateObj) {
  console.log('triggering start encounter');
  stateObj = await pickOpponentMove(stateObj);
  stateObj = shuffleDraw(stateObj);
  stateObj = drawAHand(stateObj);
  stateObj = immer.produce(stateObj, (newState) => {
    newState.fightStarted = true;
  })
  await changeState(stateObj);
  return stateObj
}

async function endTurnIncrement(stateObj) {
  stateObj = immer.produce(stateObj, (newState) => {
    newState.playerMonster.strength -= newState.playerMonster.tempStrength;
    newState.playerMonster.dex -= newState.playerMonster.tempDex;
    newState.playerMonster.tempStrength = 0;
    newState.playerMonster.tempDex = 0;
    newState.cardsPerTurn = 0;
    newState.comboPerTurn = 0;
    newState.playerMonster.encounterBlock += newState.blockPerTurn;
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
  stateObj = await discardHand(stateObj);
  stateObj = await endTurnIncrement(stateObj);
  stateObj = await changeState(stateObj);

  if (stateObj.opponentMonster.length === 0) {
    console.log("breaking out of function endTurn")
    return stateObj
  }

  
  stateObj = immer.produce(stateObj, (newState) => {
    newState.opponentMonster.forEach(function (monsterObj, index) {
      monsterObj.encounterBlock = 0;
    })
  });
  

  // console.log("picking opponent move");
  // stateObj = pickOpponentMove(stateObj);
  stateObj = await playOpponentMove(stateObj);
  await changeState(stateObj);
  await pause(200);

  stateObj = await pickOpponentMove(stateObj);
  stateObj = immer.produce(stateObj, (draft) => {
    if (stateObj.blockKeep === false) {
      draft.playerMonster.encounterBlock = 0;
    }
    draft.playerMonster.encounterEnergy += draft.playerMonster.turnEnergy;
  })
  stateObj = await drawAHand(stateObj);
  await changeState(stateObj);

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
