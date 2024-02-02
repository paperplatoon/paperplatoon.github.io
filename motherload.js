//bonuses for = eliminating all enemies
//mining a certain amount of the level
//

let gameStartState = {
    gameMap: [],
    robotPath: "img/map/miner1.png",
    score: 0,
    lossString: false,

    currentFuel: 150,
    fuelTankMax: 150,
    fuelUpgrades: 0,
    fuelUpgradeCost: 1500,

    currentHullArmor: 100,
    hullArmorMax: 100,
    hullUpgradeCost: 1500,
    takingDamage: false,

    //states
    currentPosition: false,
    inStore: false,
    sellingItems: false,
    viewingInventory: false,
    choosingNextLevel: false,
    inTransition: false, 
    lostTheGame: false,
    wonTheGame: false,
    startTheGame: false,
    choosingRobot: true,
    choosingRoulette: false,
    

    currentInventory: 0,
    inventoryMax: 12,
    inventoryUpgrades: 0,
    inventoryUpgradeCost: 1000,
    bronzeInventory: 0,
    silverInventory: 0,
    goldInventory: 0,
    rubyInventory: 0,
    amethystInventory: 0,
    diamondInventory: 0,
    blackDiamondInventory: 0,
    

    bankedCash: 10000,
    
    numberLasers: 1,
    laserCapacity: 2,
    laserCost: 150,
    laserCapacityUpgradeCost: 750,
    
    firingLaserLeft: false,
    firingLaserRight: false,
    laserExplosion: false,
    
    //relic values relicValues
    weaponsPriceModifier: 1,
    enemyDamageModifier: 1,
    halfDamageFullFuel: 1,
    dirtToMaxFuel: 0,
    thorns: false,
    killEnemiesHullModifier: 0,
    dirtRuby: false,
    killEnemiesForMoney: 0, //needs done
    killEnemiesForHealing: 0, 
    bronzeSilverBonus: 1,
    laserPiercing: false,
    silverHealing: 0,
    silverMaxFuel: 0,
    bronzeMaxHull: 0,
    goldMaxInventory: 0,
    bombRefill: 0,
    fuelToBlocks: 0,
    spareFuelTank: 0,
    fuelTeleportCost: 0,
    noDirtThreshold: false,
    magneticBlocks: false,
    bronzeSilverConverter: 0,
    dirtRefillsWeapons: false,
    laserGemRefill: 0,
    efficientGoldConverter: false,
    rubyIncrease: 0,
    overallHullModifier: 1,
    overallFuelModifier: 1,
    playerRelicArray: [],
    storeUpgradeArray: [],

    storeRelics: [],
    mapRelic1: false,
    mapRelic2: false,
    storeRelic1: false,
    storeRelic2: false,
    storeRelic3: false,
    storeRelic4: false,
    

    drillTime: 850,
    timeCounter: 0,
    moveToSquare: false,
    moveTimer: 0,

    //level modifiers
    isLevelCoward: false,
    isPacifist: 0,
    cheaperShops: 0,
    freeFuel: false,
    splinterCellModifier: 1,
    splinterCellOn: false, 
    levelTeleport: false,
    noEmptySquares: false,
    

    dirtReserves: 0,
    dirtThresholdNeeded: 50,
    

    enemyArray: [],
    enemyMovementArray:[],
    enemiesKilledPerLevel: 0,
    

    bombLocation: false,
    bombTimer: false,
    bombExploding: false,
    remoteBombs: false,
    bombTimerMax: 5,
    bombCapacity: 2,
    bombCurrentTotal: 1,
    bombCapacityUpgradeCost: 750,
    bombDistance: 2,
    bombDistanceUpgradeCost: 1000,
    bombCost: 150,


    currentLevel: 0,
    levelOreLeft: 0,
    totalLevelOre: 0,
    floorValues: [
        {
            barVals: [1, 1, 1, 0.999, 0.995, 0.95, 0.80],
            //barVals: [0.99, 0.97, 0.91, 0.85, 0.77, 0.73, 0.7],
            enemyValue: 0.98,
            bottomRowEnemies: [1, 5, 9],
            numberRows: 20,
            relicNumber: 1,
            floorNumber: 0,
            storeRelicPrice: 2500,
            rubyRelicPrice: 3,
            amethystRelicPrice: 0,
            hullGoldUpgradePrice: 5,
            rubyHullUpgradePrice: 0,
            screenwidthBlocks: 15,
            potentialRelicUpgrades: 0,
        },
        {
            barVals: [1, 0.9995, 0.998, 0.995, 0.975, 0.9, 0.85],
            enemyValue: 0.95,
            numberRows: 30,
            bottomRowEnemies: [0, 3, 7, 9],
            relicNumber: 1,
            floorNumber: 1,
            storeRelicPrice: 6000,
            rubyRelicPrice: 7,
            amethystRelicPrice: 0,
            hullGoldUpgradePrice: 10,
            rubyHullUpgradePrice: 0,
            screenwidthBlocks: 25,
            potentialRelicUpgrades: 1,
        },
        {
            barVals: [1, 0.999, 0.995, 0.97, 0.9, 0.85, 0.8],
            enemyValue: 0.93,
            numberRows: 40,
            bottomRowEnemies: [1, 3, 5, 7],
            relicNumber: 1,
            floorNumber: 2,
            storeRelicPrice: 12000,
            rubyRelicPrice: 0,
            amethystRelicPrice: 3,
            hullGoldUpgradePrice: 0,
            rubyHullUpgradePrice: 5,
            screenwidthBlocks: 30,
            potentialRelicUpgrades: 1,
        },
        {
            barVals: [0.9995, 0.995, 0.98, 0.95, 0.9, 0.8, 0.75],
            enemyValue: 0.91,
            numberRows: 50,
            screenwidthBlocks: 35,
            bottomRowEnemies: [1, 2, 4, 5, 7],
            relicNumber: 1,
            floorNumber: 3,
            storeRelicPrice: 25000,
            rubyRelicPrice: 0,
            amethystRelicPrice: 7,
            hullGoldUpgradePrice: 0,
            rubyHullUpgradePrice: 10,
            potentialRelicUpgrades: 2,
        },
        {
            barVals: [0.995, 0.98, 0.95, 0.9, 0.85, 0.77, 0.75],
            enemyValue: 0.88,
            numberRows: 70,
            screenwidthBlocks: 40,
            bottomRowEnemies: [1, 2, 4, 5, 7],
            relicNumber: 1,
            floorNumber: 4,
            storeRelicPrice: 75000,
            rubyRelicPrice: 0,
            amethystRelicPrice: 15,
            hullGoldUpgradePrice: 0,
            rubyHullUpgradePrice: 15,
            potentialRelicUpgrades: 2,
        },
        
    ],
}




let state = {...gameStartState}

//TO-DO
//change the state when the player "clears" a square; decrease  the fuel
//check so the player can't move if out of fuel
//if the player moves into a gem, change inventory AND clear the square
//edit scroll logic so it only triggers once player is at LEAST three squares up or down


//takes a state object, changes the "state" to be that, and renders the screen
async function changeState(newStateObj) {
    state = {...newStateObj};
    await renderScreen(state);
}

async function updateState(newStateObj) {
    state = {...newStateObj};
}



// function renderArrowButtons(stateObj) {

//     let arrowsDiv = document.createElement("Div")
//     arrowsDiv.classList.add("arrow-bar")

//     let leftArrowDiv = document.createElement("Div")
//     leftArrowDiv.classList.add("arrow")
//     leftArrowDiv.setAttribute("id", "left-arrow")
//     leftArrowDiv.classList.add("left")
//     leftArrowDiv.textContent= "<"
//     leftArrowDiv.onclick = function() {
//     }

//     arrowsDiv.onclick = function() {
//     }
    
//     arrowsDiv.append(leftArrowDiv)

//     return arrowsDiv
// }

async function ProduceBlockSquares(arrayObj, stateObj) {
    let chosenSquare = 50000
    let floorObj = stateObj.floorValues[stateObj.currentLevel]
    let chosenSquareArray = []
    let mapRelic = false 

    
    let nextSquareEmpty = false;
    //the top row is already reserved for store and empty space
    let middleLength = (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*floorObj.numberRows) + (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks);
    for (let j=stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks; j < middleLength; j++) {
        if (nextSquareEmpty === true){
            arrayObj.push("empty")
            nextSquareEmpty = false
        } else {
            let randomNumber = Math.random() 
            const isEnemy = Math.random()
            let enemyVal = (j < (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*3)) ? 1 : floorObj.enemyValue
            let isRoulette = Math.random()
            if (isRoulette > 0.99) {
                arrayObj.push("crate")
            } else {
                if (isEnemy > enemyVal && (j % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) && ((j+1) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) && j-1 !== chosenSquare) {
                    arrayObj.pop()
                    arrayObj.push("empty")
                    arrayObj.push("enemy")
                    nextSquareEmpty = true;
                } else {
                    if (randomNumber > floorObj.barVals[0]) {
                        arrayObj.push("stone-7")
                    } else if (randomNumber > floorObj.barVals[1]) {
                        arrayObj.push("stone-6")
                    } else if (randomNumber > floorObj.barVals[2]) {
                        arrayObj.push("stone-5")
                    } else if (randomNumber > (floorObj.barVals[3] - (stateObj.rubyIncrease * stateObj.currentLevel))) {
                        arrayObj.push("4")
                    } else if (randomNumber > floorObj.barVals[4]) {
                        arrayObj.push("3")
                    } else if (randomNumber > floorObj.barVals[5]) {
                        arrayObj.push("2")
                    } else if (randomNumber > floorObj.barVals[6]) {
                        arrayObj.push("1")
                    } else if (randomNumber > 0.55) {
                        if (stateObj.noEmptySquares) {
                            arrayObj.push("1")
                        } else {
                        arrayObj.push("empty")
                        }
                    } else {
                        arrayObj.push("0")
                    }
                }
            }
        }  
    }
    let tempDirection = "left";
    for (let j=0; j < (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks); j++) {
        if (stateObj.floorValues[stateObj.currentLevel].bottomRowEnemies.includes(j)) {
            arrayObj.push("enemy")
        } else {
            arrayObj.push("empty")
        }
    }

    middleLength += stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks
    const exit = Math.floor(Math.random() * stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
    for (let j=0; j < (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks); j++) {
        if (j === exit ) {
            arrayObj.push("EXIT")
        } else {
            arrayObj.push("stone")
        }
    }
    return arrayObj
}


async function returnArrayObject(stateObj) {
    tempArray = ["STORE"];
    for (let i=0; i<stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks-1; i++ ) {
        tempArray.push("empty")
    };
    tempArray = await ProduceBlockSquares(tempArray, stateObj)  
    return tempArray
}

async function produceRelicSquareArray(stateObj) {
    let floorObj = stateObj.floorValues[stateObj.currentLevel]
    let chosenSquare = 50000
    let chosenSquareArray = []

    for (let i = 0; i < floorObj.relicNumber; i++) {
        chosenSquare = Math.floor(Math.random() * stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*floorObj.numberRows);
        if (chosenSquare > stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks) {
            chosenSquareArray.push(chosenSquare)
        } else {
            chosenSquareArray.push(chosenSquare+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
        }
    }
    return chosenSquareArray
}

//takes a stateObj, and if the gameMap is not created, creates it
async function fillMapWithArray(stateObj) {
    console.log("filling the Map")
        let tempArray = await returnArrayObject(stateObj)
        let relicSquareArray = await produceRelicSquareArray(stateObj)
        let relicArray = buildRelicArray(stateObj)

        let allowedOreValues = ["1", "2", "3", "4", "stone-5", "stone-6", "stone-7", "5", "6", "7"]
        let totalOres = tempArray.filter(str => allowedOreValues.includes(str))
    


        stateObj = await immer.produce(stateObj, (newState) => {
            newState.totalLevelOre = totalOres.length
            newState.gameMap = tempArray;
            newState.currentPosition = 2;
            newState.timeCounter += 1
            if (stateObj.levelTeleport === true) {
                let mapLength = stateObj.floorValues[stateObj.currentLevel].numberRows * stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks
                let randSquare = Math.floor(Math.random() * ((mapLength) - (Math.floor(mapLength/2) + 1) + Math.floor(mapLength/2)));
                newState.gameMap[randSquare] = "teleporter"
            }
            
            if (relicSquareArray.length > 0) {
                for (let i = 0; i < relicSquareArray.length; i++) {
                    relicNum = Math.floor(Math.random() * relicArray.length)
                    if (i === 0) {
                        newState.mapRelic1 = relicArray[relicNum]
                        //newState.mapRelic1 = potentialRelics[29]
                        newState.gameMap[relicSquareArray[i]] = "relic1"
                    } else {
                        newState.mapRelic2 = relicArray[relicNum]
                        newState.gameMap[relicSquareArray[i]] = "relic2"
                    }
                    if (!relicArray[relicNum].multiplePossible) {
                        relicArray.splice(relicNum, 1)
                    }
                }
                relicArray = relicArray.filter(obj => obj.shopRelic)
                relicStoreNum = Math.floor(Math.random() * relicArray.length)
                newState.storeRelic1 = relicArray[relicStoreNum]
                //newState.storeRelic1 = potentialRelics[19]
                relicArray.splice(relicStoreNum, 1)
                relicStoreNum2 = Math.floor(Math.random() * relicArray.length)
                newState.storeRelic2 = relicArray[relicStoreNum2]
                relicArray.splice(relicStoreNum2, 1)
                relicStoreNum3 = Math.floor(Math.random() * relicArray.length)
                newState.storeRelic3 = relicArray[relicStoreNum3]
                relicArray.splice(relicStoreNum3, 1)
                relicStoreNum4 = Math.floor(Math.random() * relicArray.length)
                newState.storeRelic4 = relicArray[relicStoreNum4]
                relicArray.splice(relicStoreNum4, 1)
                //newState.storeRelic2 = potentialRelics[19]
            }

        })

    await updateState(stateObj)
    let tempEnemyArray = []
    let tempEnemyMovementArray = []
    for (i = 0; i < stateObj.gameMap.length; i++) {
        if (stateObj.gameMap[i] === "enemy") {
            let direction = (Math.random() > 0.5) ? "left" : "right";
            if (!stateObj.isLevelCoward) {
                tempEnemyArray.push(i)
                tempEnemyMovementArray.push(direction)
            }
            
        }
    }
    let upgradeNum = stateObj.floorValues[stateObj.currentLevel].potentialRelicUpgrades
    let relics = stateObj.playerRelicArray.filter(obj => obj.multiplePossible)
    console.log("upgrade num is " + upgradeNum)
    console.log("relics length is " + relics.length)
    for (let i = 0; i < upgradeNum; i++) {
        let relic = Math.floor(Math.random() * relics.length)
        stateObj = await immer.produce(stateObj, (newState) => {
            console.log('pushing to upgrade array ' + relics[relic].name)
            newState.storeUpgradeArray.push(relics[relic])
            console.log("newstate array is " + newState.storeUpgradeArray.length)
        })
        relics.splice(relic, 1)
    }

    stateObj = await immer.produce(stateObj, (newState) => {
        newState.enemyArray = tempEnemyArray;
        newState.enemyMovementArray = tempEnemyMovementArray;
    })
    await updateState(stateObj)
    console.log("enemy array is " + stateObj.enemyArray)
    console.log("upgrade array is " + stateObj.storeUpgradeArray.length)
    return stateObj
}


var enemyMovementTimer = setInterval(moveEnemies, 100); // 500 milliseconds (half a second)
//var enemyMovementTimer = setInterval(moveEnemies, 1000); // 500 milliseconds (half a second)



async function moveEnemies() {
    let stateObj = {...state}
    if (stateObj.timeCounter === 0) {
        console.log("calling fillMap function")
        stateObj = await fillMapWithArray(stateObj)
    }
    stateObj.timeCounter += 1
    await updateState(stateObj)
    if (!stateObj.inStore && !stateObj.choosingRobot && !stateObj.choosingNextLevel && !stateObj.sellingItems  
        && !stateObj.viewingInventory && !stateObj.startTheGame  && !stateObj.choosingRoulette  && !stateObj.lostTheGame ) {

        stateObj = await immer.produce(stateObj, (newState) => {
            if (newState.takingDamage !== false) {
                if (newState.takingDamage > 0) {
                    newState.takingDamage -= 1
                } else {
                    console.log("able to take damage again")
                    newState.takingDamage = false;
                }
            }
        })
        if (stateObj.timeCounter % 3 ===0) {

        for (let i=0; i < stateObj.enemyArray.length; i++) {
            let k = stateObj.enemyArray[i]
            if (stateObj.enemyMovementArray[i] === "left") {
                    if (k % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
                        if (stateObj.gameMap[k-1] === "empty") {
                            stateObj = await immer.produce(stateObj, (newState) => {
                                newState.gameMap[k-1] = "enemy";
                                newState.gameMap[k] = "empty";
                                newState.enemyArray[i] -= 1
                            })
                        } else {
                            stateObj = await immer.produce(stateObj, (newState) => {
                                if (stateObj.gameMap[k-1] === "magnetic-0" || stateObj.gameMap[k-1] === "magnetic-4") {
                                    newState.enemyMovementArray[i] = "frozen"
                                } else {
                                    newState.enemyMovementArray[i] = "right";
                                }
                            })
                        }
                    }  else {
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.enemyMovementArray[i] = "right";
                        })
                    }     
            } else if (stateObj.enemyMovementArray[i] === "right")  {
                    if ((k+1) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
                        if (stateObj.gameMap[k+1] === "empty") {
                            stateObj = await immer.produce(stateObj, (newState) => {
                                newState.gameMap[k+1] = "enemy";
                                newState.gameMap[k] = "empty";
                                newState.enemyArray[i] += 1
                            })
                        } else {
                            stateObj = await immer.produce(stateObj, (newState) => {
                                if (stateObj.gameMap[k+1] === "magnetic-0" || stateObj.gameMap[k+1] === "magnetic-4") {
                                    newState.enemyMovementArray[i] = "frozen"
                                } else {
                                    newState.enemyMovementArray[i] = "left";
                                }
                            })
                        }
                    } else {
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.enemyMovementArray[i] = "left";
                        })
                    }
            }
        }
            if (stateObj.bombExploding === true || stateObj.laserExplosion === true) {
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.bombExploding = false
                    newState.laserExplosion = false
                    for (i=0; i<stateObj.gameMap.length; i++) {
                        if (stateObj.gameMap[i] === "exploding-1" || stateObj.gameMap[i] === "active-laser") {
                            newState.gameMap[i] = "empty";
                        }
                    }
                })
            }
        }
            if (stateObj.bombLocation) {
                if (stateObj.bombExploding) {
                    stateObj = await detonateBomb(stateObj, stateObj.bombLocation)
                } else {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        if (stateObj.gameMap[stateObj.bombLocation + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] !== "empty") {
                            if (stateObj.remoteBombs === false) {
                                newState.bombExploding = true;
                            }
                        } else {
                            newState.gameMap[stateObj.bombLocation] = "empty";
                            newState.gameMap[stateObj.bombLocation+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] = "BOMB";
                            newState.bombLocation += stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks
                        }
                    })
                }
            }
        //}

        if (stateObj.firingLaserLeft) {
            if (stateObj.firingLaserLeft % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
                if (stateObj.gameMap[stateObj.firingLaserLeft - 1] === "empty") {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[stateObj.firingLaserLeft - 1] = "active-laser"
                        newState.gameMap[stateObj.firingLaserLeft] = "empty"
                        newState.firingLaserLeft -= 1
                    })
                } else {
                    if (stateObj.gameMap[stateObj.firingLaserLeft - 1] !== "STORE") {
                        stateObj = await detonateBlock(stateObj, stateObj.firingLaserLeft - 1, isLaser=true )
                        stateObj = await immer.produce(stateObj, (newState) => {
                            if (stateObj.laserPiercing === false) {   
                                newState.firingLaserLeft = false;
                            } else {
                                newState.gameMap[stateObj.firingLaserLeft - 1] = "active-laser"
                                newState.gameMap[stateObj.firingLaserLeft] = "empty"
                                newState.firingLaserLeft -= 1
                            }
                        })
                    } else {
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.gameMap[stateObj.firingLaserLeft] = "empty"
                            newState.firingLaserLeft = false;
                        })
                    }
                }
            } else {
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.gameMap[stateObj.firingLaserLeft] = "empty"
                    newState.firingLaserLeft = false;
                })
            }
        }

        if (stateObj.firingLaserRight) {
            if ((stateObj.firingLaserRight+1) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
                if (stateObj.gameMap[stateObj.firingLaserRight + 1] === "empty") {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[stateObj.firingLaserRight + 1] = "active-laser"
                        newState.gameMap[stateObj.firingLaserRight] = "empty"
                        newState.firingLaserRight += 1
                    })
                } else {
                    stateObj = await detonateBlock(stateObj, stateObj.firingLaserRight + 1, isLaser=true)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        if (stateObj.laserPiercing === false) { 
                            newState.firingLaserRight = false;        
                        } else {
                            newState.gameMap[stateObj.firingLaserRight + 1] = "active-laser"
                            newState.gameMap[stateObj.firingLaserRight] = "empty"
                            newState.firingLaserRight += 1
                        }
                    })
                }
            } else {
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.gameMap[stateObj.firingLaserRight] = "empty"
                    newState.firingLaserRight = false;
                })
            }
        }
        

        await changeState(stateObj)
        await checkForDeath(stateObj)
    }
}


//renders all the map squares. 
//Can set this to 0 in exitDoor
//To-DO: Need to set values for mapDiv and each map-square, including elements
async function renderScreen(stateObj) {

    let storeDiv = false;
    let addTopBar = false
    if (stateObj.lostTheGame === true) {
        storeDiv = lostTheGame()
    } else if (stateObj.wonTheGame === true) {
        storeDiv = wonTheGame(stateObj)
    } else if (stateObj.choosingRobot === true) {
        storeDiv = chooseRobot(stateObj)
    } else if (stateObj.startTheGame === true) {
        storeDiv = renderStart(stateObj)
    } else if (stateObj.sellingItems === true) {
        storeDiv = renderSellingItems(stateObj)
        addTopBar = true;
    } else if (stateObj.viewingInventory === true) {
        addTopBar = true;
        storeDiv = renderInventory(stateObj)
    } else if (stateObj.choosingNextLevel === true) {
        addTopBar = true;
        storeDiv = renderNextLevelChoice(stateObj)
    } else if (stateObj.inStore === true) {
        addTopBar = true;
        storeDiv = renderStore(stateObj)
    }else if (stateObj.choosingRoulette === true) {
        addTopBar = true;
        storeDiv = renderRouletteChoices(stateObj)
    } else if (stateObj.inStore === false && stateObj.choosingNextLevel === false) {
        addTopBar = true;
        storeDiv = renderMap(stateObj)
    }


    document.getElementById("app").innerHTML = ""
    if (addTopBar) {
        topBar = await renderTopBarStats(stateObj);
        document.getElementById("app").append(topBar)
    }
    document.getElementById("app").append(storeDiv)
    return stateObj
}

async function leaveStore(stateObj) {
    stateObj.inStore = false;
    stateObj.sellingItems = false;
    stateObj.viewingInventory = false;
    await changeState(stateObj);
}

async function seeSellItems(stateObj) {
    stateObj.inStore = false;
    stateObj.sellingItems = true;
    stateObj.viewingInventory = false;
    await changeState(stateObj);
}

async function startTheGame(stateObj) {
    stateObj.startTheGame = false;
    await changeState(stateObj);
}

async function chooseRobot1(stateObj) {
    stateObj.choosingRobot = false
    stateObj.startTheGame = true;
    stateObj.robotPath = "img/map/robot1.png",
    await changeState(stateObj);
}

async function chooseRobot2(stateObj) {
    stateObj.choosingRobot = false
    stateObj.startTheGame = true;
    stateObj.robotPath = "img/map/robot2.png",
    stateObj.currentHullArmor = 20;
    stateObj.hullArmorMax = 20;
    stateObj.bronzeMaxHull = 1;
    await changeState(stateObj);
}

async function chooseRobot3(stateObj) {
    stateObj.robotPath = "img/map/robot3.png",
    stateObj.choosingRobot = false
    stateObj.startTheGame = true;
    stateObj.fuelTankMax = 100;
    stateObj.currentFuel = 90;
    stateObj.fuelTeleportCost = 40;
    await changeState(stateObj);
}

async function chooseRobot4(stateObj) {
    stateObj.choosingRobot = false
    stateObj.startTheGame = true;
    stateObj.robotPath = "img/map/robot4.png",
    stateObj.currentHullArmor = 75;
    stateObj.hullArmorMax = 75;
    stateObj.dirtThresholdNeeded = 30;
    await changeState(stateObj);
}

async function chooseRobot5(stateObj) {
    stateObj.choosingRobot = false
    stateObj.startTheGame = true;
    stateObj.robotPath = "img/map/robot5.png",
    stateObj.inventoryMax = 10;
    stateObj.killEnemiesHullModifier = 5;
    await changeState(stateObj);
}

async function viewStore(stateObj) {
    stateObj.inStore = true;
    stateObj.sellingItems = false;
    await changeState(stateObj);
}

async function convertBronze(stateObj) {
    document.querySelector(".bronze-convert-row").classList.remove("mini-emphasis")
    document.querySelector(".bronze-convert-row").classList.add("mini-emphasis")
    await pause(300)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bronzeInventory -= 3;
        newState.silverInventory += 1;
        newState.currentInventory -= 2
    })
    await changeState(stateObj);
    document.querySelector(".silver-convert-row").classList.add("converted")
    await pause(300)
}

async function convertSilver(stateObj) {
    document.querySelector(".silver-convert-row").classList.remove("converted")
    document.querySelector(".silver-convert-row").classList.remove("mini-emphasis")
    document.querySelector(".silver-convert-row").classList.add("mini-emphasis")
    await pause(300)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.silverInventory -= 3;
        newState.goldInventory += 1;
        newState.currentInventory -= 2
    })
    await changeState(stateObj);
    document.querySelector(".gold-convert-row").classList.add("converted")
    await pause(300)
}

async function convertGold(stateObj) {
    document.querySelector(".gold-convert-row").classList.remove("converted")
    document.querySelector(".gold-convert-row").classList.remove("mini-emphasis")
    document.querySelector(".gold-convert-row").classList.add("mini-emphasis")
    await pause(300)
    stateObj = immer.produce(stateObj, (newState) => {
        if (stateObj.efficientGoldConverter === true) {
            newState.goldInventory -= 2;
            newState.currentInventory -= 1
        } else {
            newState.goldInventory -= 3;
            newState.currentInventory -= 2
        }
        newState.rubyInventory += 1;
    })
    await changeState(stateObj);
    document.querySelector(".ruby-convert-row").classList.add("converted")
    await pause(300)
}

async function convertRuby(stateObj) {
    document.querySelector(".ruby-convert-row").classList.remove("converted")
    document.querySelector(".ruby-convert-row").classList.remove("mini-emphasis")
    document.querySelector(".ruby-convert-row").classList.add("mini-emphasis")
    await pause(300)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.rubyInventory -= 3;
        newState.amethystInventory += 1;
        newState.currentInventory -= 2
    })
    await changeState(stateObj);
    document.querySelector(".amethyst-convert-row").classList.add("converted")
    await pause(300)
}

async function convertAmethyst(stateObj) {
    document.querySelector(".amethyst-convert-row").classList.remove("converted")
    document.querySelector(".amethyst-convert-row").classList.remove("mini-emphasis")
    document.querySelector(".amethyst-convert-row").classList.add("mini-emphasis")
    await pause(300)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.amethystInventory -= 3;
        newState.diamondInventory += 1;
        newState.currentInventory -= 2
    })
    await changeState(stateObj);
    document.querySelector(".diamond-convert-row").classList.add("converted")
    await pause(300)
}

async function convertDiamond(stateObj) {
    document.querySelector(".diamond-convert-row").classList.remove("converted")
    document.querySelector(".diamond-convert-row").classList.remove("mini-emphasis")
    document.querySelector(".diamond-convert-row").classList.add("mini-emphasis")
    await pause(300)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.diamondInventory -= 3;
        newState.blackDiamondInventory += 1;
        newState.currentInventory -= 2
    })
    await changeState(stateObj);
    document.querySelector(".black-diamond-convert-row").classList.add("converted")
    await pause(300)
}


async function buyRelic1(stateObj) {
    let relicCost = 1000
    if (stateObj.currentLevel > 0) {
        relicCost *= ((stateObj.currentLevel+1)*3)
    }
    if (stateObj.bankedCash > relicCost) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.bankedCost -= relicCost
            newState.choosingNextLevel = false;
        })
    }
        
    await changeState(stateObj);
}



//------------------------------------------------------------------------------------
//BETWEEN LEVEL CHOICES
//------------------------------------------------------------------------------------

async function fewerEnemiesChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.floorValues[newState.currentLevel].enemyValue += 0.015
        newState.choosingNextLevel = false;
    })
    await changeState(stateObj);
}

async function moreEnemies(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.floorValues[newState.currentLevel].enemyValue -= 0.02
        newState.floorValues[newState.currentLevel].barVals[0] -= 0.0005
        newState.floorValues[newState.currentLevel].barVals[1] -= 0.005
        newState.floorValues[newState.currentLevel].barVals[2] -= 0.01
        newState.floorValues[newState.currentLevel].barVals[3] -= 0.015
        newState.choosingNextLevel = false;
    })
    await changeState(stateObj);
}

async function cheaperShopsChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.cheaperShops += 0.1
        newState.choosingNextLevel = false;
    })
    await changeState(stateObj);
}

async function freeFuelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.freeFuel = true;
        newState.choosingNextLevel = false;
        newState.floorValues[newState.currentLevel].numberRows -= 10
    })
    await changeState(stateObj);
}

async function splinterCellChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.splinterCellModifier += 1;
        newState.splinterCellOn = true;
        newState.choosingNextLevel = false;
    })
    await changeState(stateObj);
    return stateObj
}

async function moreGold(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.floorValues[newState.currentLevel].barVals[4] -= 0.06
        newState.choosingNextLevel = false;
    })
    await changeState(stateObj);
}

async function cowardChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.floorValues[newState.currentLevel].barVals[0] = 1
        newState.floorValues[newState.currentLevel].barVals[1] = 1
        newState.floorValues[newState.currentLevel].barVals[2] = 1
        newState.floorValues[newState.currentLevel].barVals[3] = 1
        newState.choosingNextLevel = false;
        newState.isLevelCoward = true;
    })
    await changeState(stateObj);
}

async function pacifistChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.isPacifist += 50;
    })
    await changeState(stateObj);
}

async function teleporterChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.levelTeleport = true;
    })
    await changeState(stateObj);
}

async function noEmptySquaresChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.noEmptySquares = true;
    })
    await changeState(stateObj);
}

async function killEnemiesForMoneyChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.killEnemiesForMoney += 100;
    })
    await changeState(stateObj);
}

async function shorterLevelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.floorValues[newState.currentLevel].numberRows -= 10
        newState.floorValues[newState.currentLevel].enemyValue += 0.02
    })
    await changeState(stateObj);
}

async function longerLevelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.floorValues[newState.currentLevel].relicNumber += 1
        newState.floorValues[newState.currentLevel].numberRows *= 2
    })
    await changeState(stateObj);
}

async function dirtEfficiencyChoice(stateObj) {
    if (stateObj.dirtThresholdNeeded > 10) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.dirtThresholdNeeded -= 10;
            newState.choosingNextLevel = false;
        })
    }
    await changeState(stateObj);
}


//------------------------------------------------------------------------------------
//STORE FUNCTIONS
//------------------------------------------------------------------------------------

async function fillFuel(stateObj) {
    let missingFuel = Math.floor(stateObj.fuelTankMax-stateObj.currentFuel)
    let fuelPrice = 1+stateObj.currentLevel
    let fuelCost = Math.ceil((missingFuel * fuelPrice - (1-stateObj.cheaperShops))/2)
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingFuel > 0) {
            if (newState.freeFuel === true ) {
                newState.currentFuel = newState.fuelTankMax
            } else {
                if (newState.bankedCash > fuelCost) {
                    newState.currentFuel += missingFuel;
                    newState.bankedCash -= fuelCost
                } else {
                    newState.currentFuel += ((newState.bankedCash/fuelPrice)*2);
                    newState.bankedCash = 0;    
                }
            }
        }
    })
    document.getElementById("current-fuel-bar").classList.add("emphasis")
    document.getElementById("store-fuel-div").classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function repairHull(stateObj) {
    let missingHull = stateObj.hullArmorMax - stateObj.currentHullArmor
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingHull > 0) {
            if (newState.bankedCash > Math.ceil(missingHull*5)* (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)) {
                newState.currentHullArmor = newState.hullArmorMax ;
                newState.bankedCash -= Math.ceil(missingHull*5)* (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)
            } else {
                newState.currentHullArmor += Math.ceil(newState.bankedCash/ (5 * (stateObj.currentLevel+1)) * (1-stateObj.cheaperShops));
                newState.bankedCash = 0;    
            }
        }
    })
    document.getElementById("store-repair-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("hull-integrity-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function laserUpgrade(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserCapacity += 1;
        newState.numberLasers += 1;
        newState.bankedCash -= stateObj.laserCapacityUpgradeCost * (stateObj.currentLevel+1)  * (1-stateObj.cheaperShops)
        newState.laserCapacityUpgradeCost += 750;
    })
    document.getElementById("store-laser-capacity-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-lasers-text").classList.add("emphasis")
    document.getElementById("current-lasers-text").classList.add("upgraded-stat")
    await pause(300)
    await changeState(stateObj);
}

async function bombUpgrade(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombCapacity += 1;
        newState.bombCurrentTotal += 1;
        newState.bankedCash -= stateObj.bombCapacityUpgradeCost * (stateObj.currentLevel+1)  * (1-stateObj.cheaperShops)
        newState.bombCapacityUpgradeCost += 750;
    })
    document.getElementById("store-bomb-capacity-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-bombs-text").classList.add("upgraded-stat")
    document.getElementById("current-bombs-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeFuel(stateObj, purchaseCost) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.fuelTankMax += Math.ceil(50 * newState.overallFuelModifier);
        newState.currentFuel += Math.ceil(50 * newState.overallFuelModifier);
        newState.fuelUpgradeCost += 500
        newState.bankedCash -= purchaseCost
        // newState.goldInventory -= stateObj.floorValues[stateObj.currentLevel].hullGoldUpgradePrice
        // newState.currentInventory -= stateObj.floorValues[stateObj.currentLevel].hullGoldUpgradePrice
        // newState.rubyInventory -= stateObj.floorValues[stateObj.currentLevel].rubyHullUpgradePrice
        // newState.currentInventory -= stateObj.floorValues[stateObj.currentLevel].rubyHullUpgradePrice
    })
    document.getElementById("store-fuel-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-fuel-bar").classList.add("emphasis")
    document.getElementById("max-fuel-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeInventory(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.inventoryMax += 6;
        newState.inventoryUpgrades +=1;
        newState.bankedCash -= stateObj.inventoryUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)
        newState.inventoryUpgradeCost += 500;

    })
    document.getElementById("store-inventory-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("inventory-size-text").classList.add("upgraded-stat")
    document.getElementById("empty-inv-bar").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeHull(stateObj, hullCost) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentHullArmor += Math.ceil(50 * newState.overallHullModifier);
        newState.hullArmorMax += Math.ceil(50 * newState.overallHullModifier);
        newState.bankedCash -= hullCost
    })
    // let goldPrice = stateObj.floorValues[stateObj.currentLevel].hullGoldUpgradePrice
    // let rubyPrice = stateObj.floorValues[stateObj.currentLevel].rubyHullUpgradePrice
    // if (goldPrice > 0) {
    //     stateObj = immer.produce(stateObj, (newState) => {
    //         newState.goldInventory -= goldPrice;
    //         newState.currentInventory -= goldPrice;
    //         newState.currentHullArmor +=50;
    //         newState.hullArmorMax +=50;
    //     })
    // } else if (rubyPrice > 0) {
    //     stateObj = immer.produce(stateObj, (newState) => {
    //         newState.rubyInventory -= rubyPrice;
    //         newState.currentInventory -= rubyPrice;
    //         newState.currentHullArmor +=50;
    //         newState.hullArmorMax +=50;
    //     })
    // }
    document.getElementById("store-hull-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-hull-bar").classList.remove("emphasis")
    document.getElementById("current-hull-bar").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
    
}

async function tradeRelicRuby(stateObj) {
    let rubyPrice = stateObj.floorValues[stateObj.currentLevel].rubyRelicPrice
    let amethystPrice = stateObj.floorValues[stateObj.currentLevel].diamondRelicPrice
    if (rubyPrice > 0 && stateObj.rubyInventory >= rubyPrice) {
        stateObj = await stateObj.storeRelic1.relicFunc(stateObj)
        stateObj = immer.produce(stateObj, (newState) => {
            newState.storeRelic1 = false;
            newState.rubyInventory -= rubyPrice;
            newState.currentInventory -= rubyPrice;
        }) 
    } else if (amethystPrice > 0 && stateObj.amethystInventory >= amethystPrice) {
        stateObj = await stateObj.storeRelic1.relicFunc(stateObj)
        stateObj = immer.produce(stateObj, (newState) => {
            newState.storeRelic1 = false;
            newState.amethystInventory -= amethystPrice;
            newState.currentInventory -= amethystPrice;
        }) 
    }
    document.querySelector(".ruby-relic-div").classList.add("mini-emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function buyRelic1Func(stateObj, relicPrice) {
    stateObj = await stateObj.storeRelic1.relicFunc(stateObj)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bankedCash -= relicPrice
        newState.storeRelic1 = false;

    })
    document.getElementById("store-relic-1-div").classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function buyRelic2Func(stateObj, relicPrice) {
    stateObj = await stateObj.storeRelic2.relicFunc(stateObj)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bankedCash -= relicPrice
        newState.storeRelic2 = false;

    })
    document.getElementById("store-relic-2-div").classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function buyRelic3Func(stateObj, relicPrice) {
    stateObj = await stateObj.storeRelic3.relicFunc(stateObj)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bankedCash -= relicPrice
        newState.storeRelic3 = false;

    })
    document.getElementById("store-relic-3-div").classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function buyRelic4Func(stateObj) {
    stateObj = await stateObj.storeRelic4.relicFunc(stateObj)
    stateObj = immer.produce(stateObj, (newState) => {
        newState.storeRelic4 = false;

    })
    document.querySelector(".ore-relic-div").classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeStoreRelic(stateObj, index, rubyPrice=false, amethystPrice=false) {
    stateObj = await stateObj.storeUpgradeArray[index].relicFunc(stateObj, false)
    stateObj = immer.produce(stateObj, (newState) => {
        if (rubyPrice) {
            newState.rubyInventory -= rubyPrice
            newState.currentInventory -= rubyPrice
        } else if (amethystPrice) {
            newState.amethystInventory -= amethystPrice
            newState.currentInventory -= amethystPrice
        }

    })
    document.querySelectorAll(".upgrade-relic-div")[index].classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function buyLaser(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.numberLasers += 1;
        newState.bankedCash -= (stateObj.laserCost * newState.weaponsPriceModifier) * (1-stateObj.cheaperShops)
    })
    document.getElementById("store-buy-laser-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-lasers-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function buyBomb(stateObj, purchaseCost) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombCurrentTotal += 1;
        newState.bankedCash -= purchaseCost
    })
    document.getElementById("store-buy-bomb-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-bombs-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

//listen for key presses
document.addEventListener('keydown', async function(event) {
    let stateObj = {...state};
    let viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    let currentHeight = Math.floor(stateObj.currentPosition/stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
    let currentWidth = Math.floor(stateObj.currentPosition % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
    let scrollHeight = Math.floor(viewportHeight * 0.1);
    let scrollWidth = Math.floor(viewportWidth * 0.1);
    if (stateObj.inTransition === false && stateObj.inStore === false && stateObj.viewingInventory===false 
        && stateObj.choosingRobot === false && stateObj.choosingRoulette === false && stateObj.lostTheGame === false) {
        if (event.key === 'ArrowUp' || event.key ==="w") {
            // Execute your function for the up arrow key
            stateObj = await UpArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowDown' || event.key ==="s") {
            // Execute your function for the down arrow key
            stateObj = await DownArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowLeft' || event.key ==="a") {
            // Execute your function for the left arrow key
            stateObj = await LeftArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowRight' || event.key ==="d") {
            // Execute your function for the right arrow key
            stateObj = await RightArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === "l") {
              if (stateObj.numberLasers > 0) {
                  stateObj = await fireLaser(stateObj, stateObj.currentPosition)
                  await changeState(stateObj)
              }
          } else if (event.key === "p") {
                stateObj = await dropBlock(stateObj)
                await changeState(stateObj)
        } else if (event.key === "b") {
                stateObj = await dropBomb(stateObj)
                await changeState(stateObj)
        } else if (event.key === "i") {
                stateObj = await inventoryKey(stateObj)
                await changeState(stateObj)
        } else if (event.key === "t") {
            stateObj = await fuelTeleport(stateObj)
            window.scrollTo(0, 0);
            await changeState(stateObj)
        }  else if (event.key === "h") {
            stateObj = await viewHelpScreen(stateObj)
            await changeState(stateObj)
        } 
    }
  });

async function checkForDeath(stateObj) {
    if (stateObj.sellingItems === false && stateObj.inStore === false) {
        

        if (stateObj.gameMap[stateObj.currentPosition-1] === "enemy" && stateObj.currentPosition % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
            stateObj = await doDamage(stateObj, 50, -1)
        } else if (stateObj.gameMap[stateObj.currentPosition+1] === "enemy" && (stateObj.currentPosition+1) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
            stateObj = await doDamage(stateObj, 50, 1)
        } else if (stateObj.gameMap[stateObj.currentPosition+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "enemy") {
            stateObj = await doDamage(stateObj, 50, stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
        } else if (stateObj.gameMap[stateObj.currentPosition-stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "enemy") {
            stateObj = await doDamage(stateObj, 50, -stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
        }
    
        await changeState(stateObj)

        if (stateObj.currentFuel < 0) {
            //await loseTheGame("You've run out of fuel!");
            if (stateObj.spareFuelTank > 0) {
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.spareFuelTank -= 1
                    newState.currentFuel = newState.fuelTankMax
                })
                await changeState(stateObj)
            } else {
                await loseTheGame("You've run out of fuel!");
            }
            
        }

        if (stateObj.currentHullArmor <= 0) {
            await loseTheGame("Your miner took too much damage and exploded!");
        }
    } 
}

async function doDamage(stateObj, damageAmount, enemyLocation) {
    if (stateObj.inStore === false) {
        stateObj = immer.produce(stateObj, async (newState) => {
            if (newState.takingDamage === false) {
                if (newState.thorns === true) {
                    let enemyIndex = newState.enemyArray.indexOf(newState.currentPosition + enemyLocation);
                    newState.enemyArray.splice(enemyIndex, 1)
                    newState.enemyMovementArray.splice(enemyIndex, 1)
                    newState.enemiesKilledPerLevel += 1;
                    
                    newState.gameMap[newState.currentPosition+enemyLocation] = "empty"
                }
                if (newState.killEnemiesHullModifier > 0) {
                    newState.currentHullArmor += Math.ceil(newState.killEnemiesHullModifier * newState.overallHullModifier)
                    newState.hullArmorMax += Math.ceil(newState.killEnemiesHullModifier * newState.overallHullModifier)
                }
    
                if (newState.killEnemiesForMoney > 0) {
                    newState.bankedCash += newState.killEnemiesForMoney
                }

                if (newState.halfDamageFullFuel < 1 && newState.currentFuel >= (newState.fuelTankMax/2)) {
                    newState.currentHullArmor -= Math.floor(((damageAmount * newState.enemyDamageModifier) * 0.5));
                    newState.takingDamage = 7
                } else {
                    newState.currentHullArmor -= (damageAmount * newState.enemyDamageModifier);
                    newState.takingDamage = 7
                }

                    document.querySelector(".player-here").classList.add("taking-damage")
        
                //document.querySelector(".player-img").classList.remove("taking-damage")

            }           

        })
    }
    if (stateObj.thorns === true) {
        await pause (100)
    }
    await changeState(stateObj)
    return stateObj
}

async function LeftArrow(stateObj) {   
    //make sure not on left side
    if (stateObj.currentPosition % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0 ) {

        if (stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
            if (stateObj.gameMap[stateObj.currentPosition-1] !== "STORE") {
                return stateObj
            }
        } 
        if (stateObj.gameMap[stateObj.currentPosition - 1] === "stone-5" || stateObj.gameMap[stateObj.currentPosition - 1] === "stone-6"
        || stateObj.gameMap[stateObj.currentPosition - 1] === "stone-7") {
            return stateObj
        }
        stateObj = await calculateMoveChange(stateObj, -1)
        
    return stateObj
    } else {
        return stateObj
    }
}

//7, 15, 23
async function RightArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    //do nothing if you're in the air and space to your left isn't air
    if (stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition + 1] !== "empty") {
        return stateObj
    } 
    if (stateObj.gameMap[stateObj.currentPosition + 1] === "stone-5" || stateObj.gameMap[stateObj.currentPosition + 1] === "stone-6"
    || stateObj.gameMap[stateObj.currentPosition + 1] === "stone-7") {
        return stateObj
    } else {
        //only execute if not already on right side
        if ((stateObj.currentPosition+1) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks !== 0) {
            stateObj = await calculateMoveChange(stateObj, 1)
        }
    }
    return stateObj
}

//calculate move change takes stateObj & direction
//checkIfCanMove does all the calculations to see if you CAN move there
//check target square figures out 

async function UpArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    let newSquare = stateObj.gameMap[stateObj.currentPosition - stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks]
    if (stateObj.currentPosition > 7 && stateObj.inTransition === false) {
        if (newSquare=== "empty" || newSquare === "STORE" || newSquare === "teleporter") {
            stateObj = await calculateMoveChange(stateObj, -stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
            stateObj = immer.produce(stateObj, (newState) => {
            })
        }   
    } 
    return stateObj
}

async function DownArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    if (stateObj.currentPosition < (stateObj.gameMap.length-stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks) && stateObj.gameMap[stateObj.currentPosition+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] !== "stone") {
        if (stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "stone-5" || stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "stone-6"
        || stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "stone-7") {
            return stateObj
        }
        stateObj = await calculateMoveChange(stateObj, stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks)
    }
    return stateObj
}

async function calculateMoveChange(stateObj, squaresToMove) {
    targetSquareNum = stateObj.currentPosition + squaresToMove

    targetSquare = stateObj.gameMap[targetSquareNum];

    //check if target square has an enemy nearby
    
    if (targetSquare === "0" || targetSquare === "magnetic-0") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)   
    } else if (targetSquare === "1") {
        if ((stateObj.currentInventory) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.currentInventory +=1
                if (stateObj.bronzeSilverConverter > 0) {
                    newState.silverInventory += stateObj.bronzeSilverConverter
                    newState.score += 100
                } else {
                    newState.bronzeInventory += 1
                    newState.score += 40
                }
                
                if (stateObj.bronzeMaxHull > 0) {
                    newState.currentHullArmor += Math.ceil(stateObj.bronzeMaxHull * newState.overallHullModifier);
                    newState.hullArmorMax += Math.ceil(stateObj.bronzeMaxHull * newState.overallHullModifier)
                }
            })
        } 
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        
    } else if (targetSquare === "2") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        if ((stateObj.currentInventory) < stateObj.inventoryMax) {  
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.silverInventory += 1
                newState.score += 100
                newState.currentInventory +=1
                if (stateObj.silverHealing > 0) {
                    if (newState.hullArmorMax - newState.currentHullArmor < newState.silverHealing) {
                        newState.currentHullArmor = newState.hullArmorMax
                    } else {
                        newState.currentHullArmor += newState.silverHealing
                    }
                }
                if (stateObj. silverMaxFuel > 0) {
                    newState.currentFuel += Math.ceil(stateObj.silverMaxFuel * newState.overallFuelModifier);
                    newState.fuelTankMax += Math.ceil(stateObj.silverMaxFuel * newState.overallFuelModifier);
                }
            })
        } 
    } else if (targetSquare === "3") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        if ((stateObj.currentInventory) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.goldInventory += 1
                newState.score += 250
                newState.currentInventory +=1
                if (stateObj.goldMaxInventory > 0) {
                    newState.inventoryMax += stateObj.goldMaxInventory;
                }
            })
        } 
    } else if (targetSquare === "4" || targetSquare === "magnetic-4") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        if ((stateObj.currentInventory) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.currentInventory +=1
                newState.score += 600
                newState.rubyInventory += 1})
        } 
    } else if (targetSquare === "5") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        if ((stateObj.currentInventory) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.currentInventory +=1
                newState.score += 1500
                newState.amethystInventory += 1})
        } 
    } else if (targetSquare === "6") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        if ((stateObj.currentInventory) < stateObj.inventoryMax) {  
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.currentInventory +=1
                newState.score += 4000
                newState.diamondInventory += 1})
        } 
    } else if (targetSquare === "7") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        if ((stateObj.currentInventory) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.currentInventory +=1
                newState.score += 10000
                newState.blackDiamondInventory += 1})
        } 
    } else if (targetSquare === "empty") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 1)
    } else if (targetSquare === "teleporter") {
        stateObj = await levelTeleport(stateObj)
    } else if (targetSquare === "crate") {
        stateObj = await chooseRoulette(stateObj)
    } else if (targetSquare === "enemy") {
        stateObj = await doDamage(stateObj, 75)
        stateObj = await handleSquare(stateObj, targetSquareNum, 1)
    } else if (targetSquare === "STORE") {
        stateObj = await sellItemsScreen(stateObj)
    } else if (targetSquare === "EXIT") {
        stateObj = await goToNextLevel(stateObj)
    } else if (targetSquare === "relic1") {
        console.log("collecting relic 1")
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await stateObj.mapRelic1.relicFunc(stateObj)
    } else if (targetSquare === "relic2") {
        console.log("collecting relic 2")
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await stateObj.mapRelic2.relicFunc(stateObj)
    } else {
        console.log("target square hasn't been handled yet")
    }


    if (targetSquare !== "empty" && targetSquare !== "STORE" && targetSquare !== "teleporter") {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.gameMap[targetSquareNum] = "empty"
        })
        
    }
    return stateObj
}

function pause(timeValue) {
    return new Promise(res => setTimeout(res, timeValue))
}

async function sellItemsScreen(stateObj, emptyInv=false) {
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.sellingItems = true;
    })
    return stateObj
}

async function sellItems(stateObj, sellTotal) {
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory = 0;
            newState.bronzeInventory = 0;
            newState.silverInventory = 0;
            newState.goldInventory = 0;
            newState.rubyInventory = 0;
            newState.amethystInventory = 0;
            newState.diamondInventory = 0;
            newState.blackDiamondInventory = 0;
            if (sellTotal) {
                newState.bankedCash += sellTotal;
            }
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellBronze(stateObj, sellTotal) {
    document.querySelector(".bronze-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.bronzeInventory;
            newState.bronzeInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellSilver(stateObj, sellTotal) {
    document.querySelector(".silver-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.silverInventory;
            newState.silverInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellGold(stateObj, sellTotal) {
    document.querySelector(".gold-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.goldInventory;
            newState.goldInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellRuby(stateObj, sellTotal) {
    document.querySelector(".ruby-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.rubyInventory;
            newState.rubyInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellAmethyst(stateObj, sellTotal) {
    document.querySelector(".amethyst-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.amethystInventory;
            newState.amethystInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellDiamond(stateObj, sellTotal) {
    document.querySelector(".diamond-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.diamondInventory;
            newState.diamondInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function sellBlackDiamond(stateObj, sellTotal) {
    document.querySelector(".black-diamond-sell-row").classList.add("mini-emphasis")
    await pause(300)
    if (sellTotal) {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.currentInventory -= newState.blackDiamondInventory;
            newState.blackDiamondInventory = 0;
            newState.bankedCash += sellTotal;
        })
    }
    stateObj = await changeState(stateObj)
    return stateObj
}

async function inventoryKey(stateObj) {
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.viewingInventory = true;
    })
    return stateObj
}

async function viewHelpScreen(stateObj) {
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.startTheGame = true;
    })
    return stateObj
}

async function goToNextLevel(stateObj) {
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.currentLevel += 1;
        newState.timeCounter = 0;
        newState.isLevelCoward = false;
        newState.freeFuel = false;
        newState.killEnemiesForMoney = 0;
        newState.enemiesKilledPerLevel = 0;
        newState.splinterCellOn = false;
        newState.splinterCellModifier = 1;
        if (newState.currentLevel > 4) {
            // console.log("current level is " + )
            newState.wonTheGame = true;
        }


        if (stateObj.isPacifist > 0) {
            const countEnemyOccurrences = newState.gameMap.reduce((acc, currentValue) => {
                if (currentValue === 'enemy') {
                  return acc + 1;
                }
                return acc;
              }, 0);

            newState.bankedCash += (stateObj.isPacifist*countEnemyOccurrences)
        }
        newState.isPacifist = 0;
        newState.cheaperShops = 0;
    })
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.currentPosition = 5;
        newState.choosingNextLevel = true;
    })
    //window.scrollTo(0, 0)
    stateObj = await changeState(stateObj)
    return stateObj
}

async function triggerHandleSquare(stateObj, squareIndexToMoveTo, fuelToLose) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.movementSquare = squareIndexToMoveTo 
    })
    await changeState(stateObj)
    return stateObj;
}

async function handleSquare(stateObj, squareIndexToMoveTo, fuelToLose) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentFuel -= fuelToLose;
        newState.currentPosition = squareIndexToMoveTo;
        newState.moveToSquare = false;
        newState.inTransition = false;

        if (newState.gameMap[squareIndexToMoveTo] !== "empty") {
            if (newState.noDirtThreshold) {
                newState.dirtReserves += 1;
            } else if (newState.dirtReserves < stateObj.dirtThresholdNeeded) {
                newState.dirtReserves += 1;
            }
        }  
    }) 
    return stateObj
}

async function loseTheGame(textString) {
    state.lostTheGame = true;
    state.takingDamage = false;
    state.lossString = textString
    clearInterval(enemyMovementTimer)
    window.scrollTo(0, 0)
    await changeState(state)
}

async function fireLaser(stateObj, detonatePosition) {
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.firingLaserLeft = detonatePosition;
        newState.firingLaserRight = detonatePosition;
        newState.numberLasers -= 1;
    })
    return stateObj
}

async function detonateBomb(stateObj, detonatePosition) {
    let rightBlocksToBlast = 0;
    let leftBlocksToBlast = 0;
    let upBlocksToBlast = 0;
    let downBlocksToBlast = 0;
    let numberBlocks = stateObj.bombDistance
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.bombExploding = true;
        newState.gameMap[newState.bombLocation] = "empty";
        newState.bombLocation = false;
        newState.bombTimer = false
    })
    for (i=0; i < numberBlocks; i++) {
        leftBlocksToBlast = i;
        if ((detonatePosition-i) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks === 0) {
            break;
        }
    }
    for (i=0; i < numberBlocks; i++) {
        rightBlocksToBlast = i;
        if ((detonatePosition+i+1) % stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks === 0) {
            break;
        }
    }

    for (i=0; i < numberBlocks; i++) {
        upBlocksToBlast = i;
        if ((detonatePosition-(stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*(i+1))) < 0) {
            break;
        }
    }

    for (i=0; i < numberBlocks; i++) {
        downBlocksToBlast = i;
        if ((detonatePosition+(stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*(i+1))) > (stateObj.gameMap.length-stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks) ) {
            break;
        }
    }    
    stateObj = await detonateBlock(stateObj, detonatePosition)

    for (i=1; i < leftBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition-i)
    }

    for (i=1; i < rightBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition+i)
    }

    for (i=1; i < upBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition-(stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*i))
    }

    for (i=1; i < downBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition+(stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*i))
    }

    if (leftBlocksToBlast > 0 && upBlocksToBlast > 0) {
        for (i=1; i < numberBlocks+1; i++) {
            if ((leftBlocksToBlast >= i)) {
                for (j=1; j < numberBlocks+1; j++) {
                    if (upBlocksToBlast >= j) {
                        stateObj = await detonateBlock(stateObj, detonatePosition - (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*j)-i)
                    }    
                }
            }
        }
    }

    if (leftBlocksToBlast > 0 && downBlocksToBlast > 0) {
        for (i=1; i < numberBlocks+1; i++) {
            if ((leftBlocksToBlast >= i)) {
                for (j=1; j < downBlocksToBlast+1; j++) {
                    if (upBlocksToBlast >= j) {
                        stateObj = await detonateBlock(stateObj, detonatePosition + (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*j)-i)
                    }    
                }
            }
        }
    }

    if (rightBlocksToBlast > 0 && upBlocksToBlast > 0) {
        for (i=1; i < numberBlocks+1; i++) {
            if ((rightBlocksToBlast >= i)) {
                for (j=1; j < numberBlocks+1; j++) {
                    if (upBlocksToBlast >= j) {
                        stateObj = await detonateBlock(stateObj, detonatePosition - (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*j)+i)
                    }    
                }
            }
        }
    }

    if (rightBlocksToBlast > 0 && downBlocksToBlast > 0) {
        for (i=1; i < numberBlocks+1; i++) {
            if ((rightBlocksToBlast >= i)) {
                for (j=1; j < numberBlocks+1; j++) {
                    if (downBlocksToBlast >= j) {
                        stateObj = await detonateBlock(stateObj, detonatePosition + (stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks*j)+i)
                    }    
                }
            }
        }
    }

    return stateObj
}

async function detonateBlock(stateObj, blockPosition, isLaser=false) {
    stateObj = immer.produce(stateObj, (newState) => {
        if (newState.enemyArray.includes(blockPosition)) {
            const enemyIndex = newState.enemyArray.indexOf(blockPosition)
            newState.enemyArray.splice(enemyIndex, 1);
            newState.enemyMovementArray.splice(enemyIndex, 1);
            newState.enemiesKilledPerLevel += 1;
            if (newState.killEnemiesHullModifier > 0) {
                newState.currentHullArmor += newState.killEnemiesHullModifier
                newState.hullArmorMax += Math.ceil(newState.killEnemiesHullModifier  * newState.overallHullModifier)
            }

            if (newState.killEnemiesForMoney > 0) {
                newState.bankedCash += newState.killEnemiesForMoney
            }
            if (newState.killEnemiesForHealing > 0) {
                if (newState.hullArmorMax - newState.currentHullArmor < newState.killEnemiesForHealing) {
                    newState.currentHullArmor = newState.hullArmorMax
                } else {
                    newState.currentHullArmor += newState.killEnemiesForHealing
                }
            }

            if (isLaser === false && stateObj.bombRefill > 0 && newState.bombCurrentTotal < newState.bombCapacity) {
                newState.bombCurrentTotal += stateObj.bombRefill;
            }

            if (isLaser === true && stateObj.laserGemRefill > 0 && newState.numberLasers < newState.laserCapacity)

            if (newState.splinterCellModifier > 1) {
                newState.splinterCellModifier = 1;
            }
        }
        if (newState.gameMap[blockPosition] !== "STORE" && newState.gameMap[blockPosition] !== "stone") {
            if (newState.gameMap[blockPosition] === "stone-5") {
                newState.gameMap[blockPosition] = "5"
                if (isLaser === true && stateObj.laserGemRefill > 0 && newState.numberLasers < newState.laserCapacity) {
                    newState.numberLasers += newState.laserGemRefill
                }
            } else if (newState.gameMap[blockPosition] === "stone-6") {
                newState.gameMap[blockPosition] = "6"
                if (isLaser === true && stateObj.laserGemRefill > 0 && newState.numberLasers < newState.laserCapacity) {
                    newState.numberLasers += newState.laserGemRefill
                }
            } else if (newState.gameMap[blockPosition] === "stone-7") {
                newState.gameMap[blockPosition] = "7"
                if (isLaser === true && stateObj.laserGemRefill > 0 && newState.numberLasers < newState.laserCapacity) {
                    newState.numberLasers += newState.laserGemRefill
                }
            } else {
                newState.gameMap[blockPosition] = "exploding-1"
            }
            

            if (isLaser) {
                newState.laserExplosion = true
            } 
        }
        
    })
    return stateObj
}

async function dropBlock(stateObj) {
    let dirtNeeded = stateObj.dirtThresholdNeeded - stateObj.dirtReserves;
    if (stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "empty") {
        if (stateObj.dirtReserves >= stateObj.dirtThresholdNeeded || (stateObj.fuelToBlocks > 0) &&  stateObj.currentFuel > Math.floor((dirtNeeded)/stateObj.fuelToBlocks)) {
            let mapText = (stateObj.magneticBlocks) ? "magnetic-" : ""
            if (stateObj.dirtRuby === true) {
                mapText += "4"
            } else {
                mapText += "0"
            }
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += Math.ceil(newState.dirtToMaxFuel * newState.overallFuelModifier);
                if (newState.dirtReserves >= newState.dirtThresholdNeeded) {
                    newState.dirtReserves -= newState.dirtThresholdNeeded;
                } else if (newState.currentFuel > Math.floor((dirtNeeded)/newState.fuelToBlocks)) {
                    newState.dirtReserves = 0;
                    newState.currentFuel -= Math.floor(dirtNeeded/newState.fuelToBlocks)
                }
                if (mapText) {
                    newState.gameMap[stateObj.currentPosition+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] = mapText;
                }
                
                if (stateObj.dirtRefillsWeapons) {
                    newState.bombCurrentTotal = newState.bombCapacity
                    newState.numberLasers = newState.laserCapacity
                }
            }) 

        }
    }
    return stateObj
}

async function dropBomb(stateObj) {
    if (stateObj.gameMap[stateObj.currentPosition + stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] === "empty" && stateObj.bombLocation === false) {
        stateObj = await immer.produce(stateObj, (newState) => {
            if (newState.bombCurrentTotal > 0) {
                newState.gameMap[stateObj.currentPosition+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks] = "BOMB";
                newState.bombCurrentTotal -= 1;
                newState.bombLocation = stateObj.currentPosition+stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks
                newState.bombTimer = newState.bombTimerMax;
            }
        })
    } else if (stateObj.bombLocation !== false && stateObj.remoteBombs === true) {
        stateObj = await detonateBomb(stateObj, stateObj.bombLocation)
    }
    return stateObj
}

async function fuelTeleport(stateObj) {
    if (stateObj.currentFuel >= Math.floor(stateObj.fuelTeleportCost) && stateObj.fuelTeleportCost > 0) {
        stateObj = await immer.produce(stateObj, (newState) => {
            newState.currentPosition = 1;
            newState.currentFuel -= newState.fuelTeleportCost
        })
    }
    return stateObj
}

async function levelTeleport(stateObj) {
        stateObj = await immer.produce(stateObj, (newState) => {
            newState.currentPosition = 1;
        })
        window.scrollTo(0, 0);
    return stateObj
}

async function chooseRoulette(stateObj) {
    console.log("firing choose roulette")
        stateObj = await immer.produce(stateObj, (newState) => {
            newState.choosingRoulette = true;
        })
        return stateObj;
}


renderScreen(gameStartState)