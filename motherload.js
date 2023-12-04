

let gameStartState = {
    gameMap: [],

    currentFuel: 100,
    fuelCapacity: 120,
    fuelUpgrades: 0,
    fuelUpgradeCost: 500,
    

    currentInventory: 0,
    inventoryMax: 12,
    inventoryUpgrades: 0,
    inventoryUpgradeCost: 500,
    

    bankedCash: 100,
    inventoryCash: 0, 
    
    numberLasers: 0,
    laserCapacity: 1,
    laserCost: 150,
    laserCapacityUpgradeCost: 750,
    laserDistance: 2,
    laserDistanceUpgradeCost: 1000,
    
    //relicValues
    weaponsPriceModifier: 1,
    enemyDamageModifier: 1,
    halfDamageFullFuel: false,
    dirtToMaxFuel: 0,
    thorns: false,
    killEnemiesHullModifier: 0,

    drillTime: 850,
    timeCounter: 0,
    moveToSquare: false,
    moveTimer: 0,

    //level modifiers
    isLevelPacifist: false,
    isScrapMetal: false,
    cheaperShops: 0,

    //states
    currentPosition: false,
    inStore: false,
    sellingItems: false,
    choosingNextLevel: false,
    inTransition: false,  
    
    currentHullIntegrity: 100,
    maxHullIntegrity: 100,
    hullUpgradeCost: 500,

    dirtReserves: 0,
    dirtThresholdNeeded: 50,
    moneyForDirt: 0,

    enemyArray: [],
    enemyMovementArray:[],
    

    bombLocation: false,
    bombTimer: false,
    bombExploding: false,
    bombTimerMax: 5,
    bombCapacity: 1,
    bombCurrentTotal: 1,
    bombCapacityUpgradeCost: 750,
    bombDistance: 2,
    bombDistanceUpgradeCost: 1000,
    bombCost: 150,


    currentLevel: 0,
    floorValues: [
        {
            barVals: [1, 1, 1, 0.997, 0.99, 0.9, 0.65],
            enemyValue: 0.97,
            bottomRowEnemies: [1, 5, 9],
            numberRows: 20,
            relicNumber: 1,
            floorNumber: 0
        },
        {
            barVals: [1, 0.999, 0.997, 0.99, 0.95, 0.80, 0.65],
            enemyValue: 0.95,
            numberRows: 30,
            bottomRowEnemies: [0, 3, 7, 9],
            relicNumber: 1,
            floorNumber: 1
        },
        {
            barVals: [1, 0.997, 0.99, 0.95, 0.85, 0.75, 0.7],
            enemyValue: 0.93,
            numberRows: 40,
            bottomRowEnemies: [1, 3, 5, 7],
            relicNumber: 1,
            floorNumber: 2
        },
        {
            barVals: [0.999, 0.99, 0.96, 0.9, 0.8, 0.72, 0.7],
            enemyValue: 0.91,
            numberRows: 50,
            bottomRowEnemies: [1, 2, 4, 5, 7],
            relicNumber: 1,
            floorNumber: 3
        },
        {
            barVals: [0.99, 0.97, 0.91, 0.85, 0.77, 0.73, 0.7],
            enemyValue: 0.88,
            numberRows: 70,
            bottomRowEnemies: [1, 2, 4, 5, 7],
            relicNumber: 1,
            floorNumber: 4
        },
        
    ],
}

fuelCapacityUpgrades = [50, 60, 70, 80, 90, 100, 110, 120, 150, 200]
inventoryMaxUpgrades = [5, 8, 12, 17, 23, 30, 38, 47, 57]




let state = {...gameStartState}

let screenwidthBlocks = 10; 

let introBlockSquare = 4
let middleBlockSquare = 16
let totalSquareNumber = screenwidthBlocks * middleBlockSquare
//let totalSquareNumber = introBlockSquare + middleBlockSquare + middleBlockSquare + middleBlockSquare

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

async function renderTopBarStats(stateObj) {
    let topBarDiv = document.createElement("Div")
    topBarDiv.classList.add("top-stats-bar")

    let fuelDiv = document.createElement("Div")
    fuelDiv.textContent = "Max Fuel: " + stateObj.fuelCapacity;
    fuelDiv.setAttribute("id", "max-fuel-text");
    if (stateObj.fuelCapacity > 120) {
        fuelDiv.classList.add("upgraded-stat")
    }

    let emptyFuelBarDiv = document.createElement("Div");
    emptyFuelBarDiv.classList.add("empty-fuel-bar");
    emptyFuelBarDiv.setAttribute("id", "empty-fuel-bar");
    let currentFuelBarDiv = document.createElement("Div");
    currentFuelBarDiv.classList.add("current-fuel-bar");
    currentFuelBarDiv.setAttribute("id", "current-fuel-bar");
    if (stateObj.currentFuel >= stateObj.fuelCapacity/4) {
        currentFuelBarDiv.classList.add("full-fuel-bar");
    } else {
        currentFuelBarDiv.classList.add("low-fuel-bar");
    }
    let barLength = 10*(stateObj.currentFuel/stateObj.fuelCapacity)
    let barText = "width:" + barLength + "vw"
    currentFuelBarDiv.setAttribute("style", barText);
    emptyFuelBarDiv.append(currentFuelBarDiv);
    fuelDiv.appendChild(emptyFuelBarDiv)
    topBarDiv.appendChild(fuelDiv)

    let hullDiv = document.createElement("Div")
    hullDiv.textContent = "Hull: " + stateObj.currentHullIntegrity + "/" + stateObj.maxHullIntegrity
    hullDiv.setAttribute("id", "hull-integrity-text");
    if (stateObj.maxHullIntegrity > 100) {
        hullDiv.classList.add("upgraded-stat")
    }
    

    let cashDiv = document.createElement("Div")
    cashDiv.textContent = "Money: " + stateObj.bankedCash
    
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.classList.add("inventory")
    if (stateObj.currentInventory === stateObj.inventoryMax) {
        inventoryDiv.textContent = "Inventory Full"
        inventoryDiv.classList.add("inventory-full")
    } else {
        inventoryDiv.textContent = "Inventory: " + Math.round((stateObj.currentInventory / stateObj.inventoryMax)*100) + "% full    (Max: " + stateObj.inventoryMax + ")"
    }
    inventoryDiv.setAttribute("id", "inventory-size-text");
    if (stateObj.inventoryMax > 12) {
        inventoryDiv.classList.add("upgraded-stat")
    }

    let lasersDiv = document.createElement("Div")
    let currentLasersDiv = document.createElement("Div")
    currentLasersDiv.setAttribute("id", "current-lasers-text");
    laserString = "Lasers: " + stateObj.numberLasers + "/" + stateObj.laserCapacity
    if (stateObj.numberLasers > 0) {
        laserString = laserString + " (press L to fire)"
    }
    currentLasersDiv.textContent = laserString
    if (stateObj.laserCapacity > 1) {
        currentLasersDiv.classList.add("upgraded-stat")
    }

    let laserDistanceDiv = document.createElement("Div")
    laserString2 = "Laser Distance: " + stateObj.laserDistance
    laserDistanceDiv.textContent = laserString2
    laserDistanceDiv.setAttribute("id", "laser-distance-text");
    if (stateObj.laserDistance > 2) {
        laserDistanceDiv.classList.add("upgraded-stat")
    }

    lasersDiv.append(currentLasersDiv, laserDistanceDiv)

    let bombDiv = document.createElement("Div")
    let currentBombsDiv = document.createElement("Div")
    currentBombsDiv.setAttribute("id", "current-bombs-text");
    bombString = "Bombs: " + stateObj.bombCurrentTotal + "/" + stateObj.bombCapacity
    if (stateObj.bombCurrentTotal > 0) {
        bombString = bombString + " (press B to drop)"
    }
    currentBombsDiv.textContent = bombString
    if (stateObj.bombCapacity > 1) {
        bombDiv.classList.add("upgraded-stat")
    }

    let bombDistanceDiv = document.createElement("Div")
    bombString2 = "Bomb Distance: " + stateObj.bombDistance
    bombDistanceDiv.textContent = bombString2
    bombDistanceDiv.setAttribute("id", "bomb-distance-text");
    if (stateObj.bombDistance > 2) {
        bombDistanceDiv.classList.add("upgraded-stat")
    }

    bombDiv.append(currentBombsDiv, bombDistanceDiv)

    let dirtDiv = document.createElement("Div")
    dirtString = "Dirt: " + Math.round((stateObj.dirtReserves/(stateObj.dirtThresholdNeeded))*100) + "%"
    if (stateObj.dirtReserves >= (stateObj.dirtThresholdNeeded)) {
        dirtString = dirtString + " (press P to drop dirt)"
    }
    if (stateObj.dirtThresholdNeeded < 50) {
        dirtDiv.classList.add("upgraded-stat")
    }
    dirtDiv.textContent = dirtString

    topBarDiv.append(fuelDiv, cashDiv, hullDiv, lasersDiv, bombDiv, dirtDiv, inventoryDiv)

    return topBarDiv
}

function ProduceBlockSquares(arrayObj, numberRows, stateObj, isRelic=false) {
    let chosenSquare = 50000
    let floorObj = stateObj.floorValues[stateObj.currentLevel]

    if (floorObj.relicNumber > 0) {
        chosenSquareArray = []
        for (let i = 0; i < floorObj.relicNumber; i++) {
            chosenSquare = Math.floor(Math.random() * screenwidthBlocks*numberRows);
            if (chosenSquare > screenwidthBlocks) {
                chosenSquareArray.push(chosenSquare)
            } else {
                chosenSquareArray.push(chosenSquare+screenwidthBlocks)
            }
            console.log('psuhing chosen square ' + chosenSquare)
        }
    }
    
    let nextSquareEmpty = false;
    //the top row is already reserved for store and empty space
    let middleLength = (screenwidthBlocks*floorObj.numberRows) + (screenwidthBlocks);
    for (let j=screenwidthBlocks; j < middleLength; j++) {
        if (chosenSquareArray.includes(j)) {
            //12 relics
            let relicArray = ["fuelRelic", "bombDistanceRelic", "laserDistanceRelic", "dirtRelic", 
            "stopRelic", "halfDamageRelic", "moneyForDirtRelic", "bombsExplodeFasterRelic", 
            "weaponsPriceRelic", "halfDamageFullFuelRelic", "thornsRelic", "dirtToMaxFuelRelic",
            "killEnemiesHullRelic"]
            // let relicArray = ["dirtRelic"] 
            let chosenRelic = relicArray[Math.floor(Math.random() * relicArray.length)]
            arrayObj.push(chosenRelic)
        } else if (nextSquareEmpty === true){
            arrayObj.push("empty")
            nextSquareEmpty = false
        } else {
            let randomNumber = Math.random() 
            const isEnemy = Math.random()
            let enemyVal = (j < (screenwidthBlocks*3)) ? 1 : floorObj.enemyValue
            if (isEnemy > enemyVal && (j % screenwidthBlocks !== 0) && ((j+1) % screenwidthBlocks !== 0) && j-1 !== chosenSquare) {
                arrayObj.pop()
                arrayObj.push("empty")
                arrayObj.push("enemy")
                nextSquareEmpty = true;
            } else {
                if (randomNumber > floorObj.barVals[0]) {
                    arrayObj.push("7")
                } else if (randomNumber > floorObj.barVals[1]) {
                    arrayObj.push("6")
                } else if (randomNumber > floorObj.barVals[2]) {
                    arrayObj.push("5")
                } else if (randomNumber > floorObj.barVals[3]) {
                    arrayObj.push("4")
                } else if (randomNumber > floorObj.barVals[4]) {
                    arrayObj.push("3")
                } else if (randomNumber > floorObj.barVals[5]) {
                    arrayObj.push("2")
                } else if (randomNumber > floorObj.barVals[6]) {
                    arrayObj.push("1")
                } else if (randomNumber > 0.55) {
                    arrayObj.push("empty")
                } else {
                    arrayObj.push("0")
                }
            }
        }  
    }
    let tempDirection = "left";
    for (let j=0; j < (screenwidthBlocks); j++) {
        if (stateObj.floorValues[stateObj.currentLevel].bottomRowEnemies.includes(j)) {
            console.log("pushing enemy to square " + j)
            arrayObj.push("enemy")
        } else {
            arrayObj.push("empty")
        }
    }

    middleLength += screenwidthBlocks
    const exit = Math.floor(Math.random() * screenwidthBlocks)
    for (let j=0; j < (screenwidthBlocks); j++) {
        if (j === exit ) {
            arrayObj.push("EXIT")
        } else {
            arrayObj.push("stone")
        }
    }
    return arrayObj
}


async function returnArrayObject(stateObj) {
    console.log('inside returnArray')
    tempArray = ["STORE"];
    for (let i=0; i<screenwidthBlocks-1; i++ ) {
        tempArray.push("empty")
    };
    console.log('About to call produceblocksquares')
    tempArray = await ProduceBlockSquares(tempArray, middleBlockSquare, stateObj, isRelic=false)
    console.log('called produceblocksquares')    
    return tempArray
}

//takes a stateObj, and if the gameMap is not created, creates it
async function fillMapWithArray(stateObj) {
    console.log("filling the Map")
        tempArray = await returnArrayObject(stateObj)

        stateObj = await immer.produce(stateObj, (newState) => {
            newState.gameMap = tempArray;
            newState.currentPosition = 2;
        })

    await updateState(stateObj)
    let tempEnemyArray = []
    let tempEnemyMovementArray = []
    for (i = 0; i < stateObj.gameMap.length; i++) {
        if (stateObj.gameMap[i] === "enemy") {
            let direction = (Math.random() > 0.5) ? "left" : "right";
            console.log("found an enemy at square " + i + " pushing direction " + direction)
            if (stateObj.isLevelPacifist === false) {
                tempEnemyArray.push(i)
                tempEnemyMovementArray.push(direction)
            }
            
        }
    }
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.enemyArray = tempEnemyArray;
        newState.enemyMovementArray = tempEnemyMovementArray;
    })
    await updateState(stateObj)
    console.log("enemy array is " + stateObj.enemyArray)
    return stateObj
}


var enemyMovementTimer = setInterval(moveEnemies, 350); // 500 milliseconds (half a second)
//var enemyMovementTimer = setInterval(moveEnemies, 1000); // 500 milliseconds (half a second)



async function moveEnemies() {
    let stateObj = {...state}
    if (stateObj.timeCounter === 0) {
        console.log("calling fillMap function")
        stateObj = await fillMapWithArray(stateObj)
        await updateState(stateObj)
    }
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.timeCounter += 1;
    })
    await updateState(stateObj)
    // console.log("number of enemies is " + stateObj.enemyMovementArray.length)
    // console.log("enemy positions are " + stateObj.enemyArray)
    if (stateObj.inStore === false && stateObj.choosingNextLevel === false && stateObj.sellingItems === false) {
        for (let i=0; i < stateObj.enemyArray.length; i++) {
            let k = stateObj.enemyArray[i]
            if (stateObj.enemyMovementArray[i] === "left") {
                    if (k % screenwidthBlocks !== 0 && stateObj.gameMap[k-1] === "empty") {
                        //console.log("enemy  " + i + " moving left at position " + k + ", now " + k-1)
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.gameMap[k-1] = "enemy";
                            newState.gameMap[k] = "empty";
                            newState.enemyArray[i] -= 1
                        })

                        
                    } else {
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.enemyMovementArray[i] = "right";
                        })
                        //console.log("enemy  " + i + " switching to right at position " + k)
                    }
            } else {
                    if ((k+1) % screenwidthBlocks !== 0 && stateObj.gameMap[k+1] === "empty") {
                        //console.log("enemy  " + i + " moving right at position " + k + ", now " + k+1)
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.gameMap[k+1] = "enemy";
                            newState.gameMap[k] = "empty";
                            newState.enemyArray[i] += 1
                        })
                    } else {
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.enemyMovementArray[i] = "left";
                        })
                        //console.log("enemy  " + i + " switching to left at position " + k)
                    }   
                }
            }

            if (stateObj.bombExploding === true) {
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.bombExploding = false
                    for (i=0; i<stateObj.gameMap.length; i++) {
                        if (stateObj.gameMap[i] === "exploding-1") {
                            newState.gameMap[i] = "empty";
                        }
                    }
                    
                })
            }


            if (stateObj.bombLocation) {
                if (stateObj.bombTimer > 0) {
                    console.log('counting down bomb timer from ' + stateObj.bombTimer)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.bombTimer -= 1
                    })
                } else {
                    stateObj = await fireLaser(stateObj, stateObj.bombLocation, isLaser=false)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[newState.bombLocation] = "empty"
                        newState.bombTimer = false;
                        newState.bombLocation = false;
                        
                    })
                }
            }

            
        await updateState(stateObj)

        if (stateObj.moveToSquare && stateObj.moveTimer === 0) {
            stateObj = await calculateMoveChange(stateObj, (stateObj.moveToSquare - stateObj.currentPosition))
        } else if (stateObj.moveTimer > 0) {
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.moveTimer -= 1;
            })
        }

        await changeState(stateObj)
        await checkForDeath(stateObj)
    }
}


//renders all the map squares. 
//Can set this to 0 in exitDoor
//To-DO: Need to set values for mapDiv and each map-square, including elements
async function renderScreen(stateObj) {
    //console.log("rendering Screen")

    document.getElementById("app").innerHTML = ""
    //create a mapDiv to append all your new squares to
    topBar = await renderTopBarStats(stateObj);
    document.getElementById("app").append(topBar)
    if (stateObj.sellingItems === true) {
        console.log("selling items is true")
        let storeDiv = document.createElement("Div")
        storeDiv.classList.add("store-div")

        let sellDiv = document.createElement("Div")
        sellDiv.classList.add("store-option")
        sellDiv.classList.add("return-to-map")
        sellDiv.textContent = "Sell Items (" + stateObj.inventoryCash + ")"
        sellDiv.onclick = async function () {
            console.log("selling items")
            await seeStore(stateObj)
        }

        storeDiv.append(sellDiv)
        document.getElementById("app").append(storeDiv)

    } else if (stateObj.inStore === false && stateObj.choosingNextLevel === false) {

        let mapDiv = document.createElement("Div");
        mapDiv.classList.add("map-div");

        stateObj.gameMap.forEach(async function (mapSquare, squareIndex) {
            let mapSquareDiv = document.createElement("Div");
            mapSquareDiv.classList.add("map-square");

            if (stateObj.currentPosition === squareIndex) {
                mapSquareDiv.classList.add("player-here")
                let mapSquareImg = document.createElement("Img");
                if (stateObj.currentInventory === stateObj.inventoryMax) {
                    mapSquareImg.classList.add("player-img-full")
                } else {
                    mapSquareImg.classList.add("player-img")
                }
                mapSquareImg.src = "img/miner1.png"
                mapSquareDiv.append(mapSquareImg)
            }
            if (mapSquare === "stone") {
                mapSquareDiv.classList.add("stone")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("stone-img")
                mapSquareImg.src = "img/stone.png"
                mapSquareDiv.append(mapSquareImg)
            }
            
            if (mapSquare === "0") {
                mapSquareDiv.classList.add("dirt")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("dirt-img")
                mapSquareImg.src = "img/dirt.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "empty") {
                mapSquareDiv.classList.add("empty")
            }  else if (mapSquare === "exploding-1") {
                mapSquareDiv.classList.add("exploding-block")
            } else if (mapSquare === "enemy") {
                mapSquareDiv.classList.add("enemy")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("enemy-img")
                mapSquareImg.src = "img/enemy1.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "1") {
                mapSquareDiv.classList.add("bronze")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("bronze-img")
                mapSquareImg.src = "img/bronze.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "2") {
                mapSquareDiv.classList.add("silver")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("silver-img")
                mapSquareImg.src = "img/silver.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "3") {
                mapSquareDiv.classList.add("gold")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("gold-img")
                mapSquareImg.src = "img/gold.png"
                mapSquareDiv.append(mapSquareImg)
            }  else if (mapSquare === "4") {
                mapSquareDiv.classList.add("ruby")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("ruby-img")
                mapSquareImg.src = "img/ruby.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "5") {
                mapSquareDiv.classList.add("amethyst")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("amethyst-img")
                mapSquareImg.src = "img/amethyst.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "6") {
                mapSquareDiv.classList.add("diamond")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("diamond-img")
                mapSquareImg.src = "img/diamond.png"
                mapSquareDiv.append(mapSquareImg)
            }  else if (mapSquare === "7") {
                mapSquareDiv.classList.add("blkdiamond")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("blkdiamond-img")
                mapSquareImg.src = "img/blkdiamond.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "STORE") {
                mapSquareDiv.classList.add("store")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("store-img")
                mapSquareImg.src = "img/store.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "EXIT") {
                mapSquareDiv.classList.add("exit")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("exit-img")
                mapSquareImg.src = "img/exit.jpg"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "BOMB") {
                mapSquareDiv.classList.add("bomb")
                mapSquareDiv.textContent = stateObj.bombTimer
            } else if (mapSquare === "fuelRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Fuel ++"
            } else if (mapSquare === "bombDistanceRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Bomb Distance ++"
            } else if (mapSquare === "laserDistanceRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Laser Distance ++"
            } else if (mapSquare === "dirtRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Dirt Efficiency ++"
            } else if (mapSquare === "dirtToMaxFuelRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Dropping dirt slightly increases Fuel Capacity"
            } else if (mapSquare === "stopRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Pause Enemies"
            } else if (mapSquare === "halfDamageRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Halve Enemy Damage"
            } else if (mapSquare === "bombsExplodeFasterRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Bombs Explode Faster"
            } else if (mapSquare === "halfDamageFullFuelRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "1/2 damage when fuel above 50%"
            }  else if (mapSquare === "thornsRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Enemies that damage you die on impact"
            } else if (mapSquare === "weaponsPriceRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Cheaper Lasers/Bombs"
            }  else if (mapSquare === "killEnemiesHullRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Killing enemies improves hull integrity"
            } else if (mapSquare === "moneyForDirtRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Earn Money When Dropping Dirt"
            }

            mapSquareDiv.onclick = async function() {
                if (stateObj.currentPosition === squareIndex - 1) {
                    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition + 1] !== "empty") {
                        return stateObj
                    } else {
                        //only execute if not already on right side
                        if ((stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
                            stateObj = await calculateMoveChange(stateObj, 1)
                            // if (stateObj.gameMap[stateObj.currentPosition + 1] === "empty") {
                            //     stateObj = await calculateMoveChange(stateObj, 1)
                            //     window.scrollTo(currentWidth*scrollWidth- (scrollWidth*2), currentHeight*scrollHeight - (scrollHeight*2))
                            // } else {
                            //     stateObj = immer.produce(stateObj, (newState) => {
                            //         newState.inTransition === true
                            //         newState.moveToSquare = stateObj.currentPosition - 1
                            //         newState.moveTimer += 1;
                            //     })
                            // }
                        }
                    }
                } else if (stateObj.currentPosition === squareIndex + 1) {
                    if (stateObj.gameMap[stateObj.currentPosition - 1] === "STORE") {
                        stateObj = await calculateMoveChange(stateObj, -1)
                    }
                    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
                        return stateObj
                    }  else if (stateObj.gameMap[stateObj.currentPosition - 1] === "empty") {
                        stateObj = await calculateMoveChange(stateObj, -1)
                        return stateObj
                    }
                
                    //make sure not on left side 
                    if (stateObj.currentPosition % screenwidthBlocks !== 0 ) {
                        stateObj = await calculateMoveChange(stateObj, -1)
                        // stateObj = immer.produce(stateObj, (newState) => {
                        //     newState.inTransition === true
                        //     newState.moveToSquare = stateObj.currentPosition - 1
                        //     newState.moveTimer += 1;
                        // })
                    }
                } else if (stateObj.currentPosition === squareIndex - screenwidthBlocks) {
                    let newSquare = stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]
                    if (stateObj.currentPosition > 7 && stateObj.inTransition === false) {
                        if (newSquare=== "empty" || newSquare === "STORE") {
                            stateObj = await calculateMoveChange(stateObj, screenwidthBlocks)
                            stateObj = immer.produce(stateObj, (newState) => {
                                newState.currentFuel -= 0.25;
                            })
                        }
                    } 
                }
                await changeState(stateObj)
            }

            mapDiv.append(mapSquareDiv)
        })
        document.getElementById("app").append(mapDiv)
    } else if (stateObj.choosingNextLevel === true) {

        let storeDiv = document.createElement("Div")
        storeDiv.classList.add("store-div")

        let fewerEnemiesDiv = document.createElement("Div")
        fewerEnemiesDiv.classList.add("next-level-option")
        fewerEnemiesDiv.textContent = "Next level has fewer enemies"
        fewerEnemiesDiv.classList.add("next-level-clickable")
        fewerEnemiesDiv.onclick = function () {
            fewerEnemiesChoice(stateObj)
        }

        let moreGoldDiv = document.createElement("Div")
        moreGoldDiv.classList.add("next-level-option")
        moreGoldDiv.textContent = "PROSPECTOR - Next level has more gold ore"
        moreGoldDiv.classList.add("next-level-clickable")
        moreGoldDiv.onclick = function () {
            moreGold(stateObj)
        }

        let pacifistDiv = document.createElement("Div")
        pacifistDiv.classList.add("next-level-option")
        pacifistDiv.textContent = "COWARD - Enemies in the next level do not move, but the level only contains bronze, silver, and gold ore"
        pacifistDiv.classList.add("next-level-clickable")
        pacifistDiv.onclick = function () {
            cowardChoice(stateObj)
        }

        let dirtEfficiencyDiv = document.createElement("Div")
        dirtEfficiencyDiv.classList.add("next-level-option")
        dirtEfficiencyDiv.textContent = "MINER - PERMANENT upgrade to dirt processing efficiency, letting you drop dirt blocks more often"
        dirtEfficiencyDiv.classList.add("next-level-clickable")
        dirtEfficiencyDiv.onclick = function () {
            dirtEfficiencyChoice(stateObj)
        }

        let scrapMetalDiv = document.createElement("Div")
        scrapMetalDiv.classList.add("next-level-option")
        scrapMetalDiv.textContent = "PACIFIST - After completing the level, gain 200 gold for every enemy that is still alive"
        scrapMetalDiv.classList.add("next-level-clickable")
        scrapMetalDiv.onclick = function () {
            scrapMetalChoice(stateObj)
        }

        let shorterDiv = document.createElement("Div")
        shorterDiv.classList.add("next-level-option")
        shorterDiv.textContent = "SPEEDY - Next level is smaller"
        shorterDiv.classList.add("next-level-clickable")
        shorterDiv.onclick = function () {
            shorterLevelChoice(stateObj)
        }

        let longerDiv = document.createElement("Div")
        longerDiv.classList.add("next-level-option")
        longerDiv.textContent = "ODYSSEY - Next level is twice as long, but has two relics"
        longerDiv.classList.add("next-level-clickable")
        longerDiv.onclick = function () {
            longerLevelChoice(stateObj)
        }

        let moreEnemiesDiv = document.createElement("Div")
        moreEnemiesDiv.classList.add("next-level-option")
        moreEnemiesDiv.textContent = "HOSTILE - Next level has more enemies, but higher chance of rare gems"
        moreEnemiesDiv.classList.add("next-level-clickable")
        moreEnemiesDiv.onclick = function () {
            moreEnemies(stateObj)
        }

        let cheaperShopsDiv = document.createElement("Div")
        cheaperShopsDiv.classList.add("next-level-option")
        cheaperShopsDiv.textContent = "BARGAINER - Shop prices are slightly cheaper for the next level only"
        cheaperShopsDiv.classList.add("next-level-clickable")
        cheaperShopsDiv.onclick = function () {
            cheaperShopsChoice(stateObj)
        }

        //9 choices
        let levelChoiceArray = [fewerEnemiesDiv, moreGoldDiv, pacifistDiv, dirtEfficiencyDiv, scrapMetalDiv, shorterDiv, longerDiv, moreEnemiesDiv, cheaperShopsDiv]
        //let levelChoiceArray = [shorterDiv, cheaperShopsDiv, moreEnemiesDiv]
        let chosenLevels = []
        for (i = 0; i < 3; i++) {
            let chosenLevel = Math.floor(Math.random() * levelChoiceArray.length);
            console.log("pushing number " + chosenLevel)
            chosenLevels.push(levelChoiceArray[chosenLevel])
            levelChoiceArray.splice(chosenLevel, 1)
        }

        storeDiv.append(chosenLevels[0], chosenLevels[1], chosenLevels[2])

        document.getElementById("app").append(storeDiv)


    } else if (stateObj.inStore === true) {
        let storeDiv = document.createElement("Div")
        storeDiv.classList.add("store-div")

        let fuelUpgradeDiv = document.createElement("Div")
        fuelUpgradeDiv.setAttribute("id", "store-fuel-upgrade-div")
        fuelUpgradeDiv.classList.add("store-option")
        let fuelText1 = document.createElement("Div")
        fuelText1.classList.add("store-option-text")
        let fuelText2 = document.createElement("Div")
        fuelText2.classList.add("store-option-text")
        fuelText1.textContent = "Fuel Capacity Upgrade" 
        fuelText2.textContent = stateObj.fuelUpgradeCost * (1-stateObj.cheaperShops) + " gold"
        fuelUpgradeDiv.append(fuelText1, fuelText2)
        if (stateObj.bankedCash >= stateObj.fuelUpgradeCost * (1-stateObj.cheaperShops)) {
            fuelUpgradeDiv.classList.add("store-clickable")
            fuelUpgradeDiv.onclick = function () {
                upgradeFuel(stateObj)
            }
          }

        let laserUpgradeDiv = document.createElement("Div")
        laserUpgradeDiv.classList.add("store-option")
        laserUpgradeDiv.setAttribute("id", "store-laser-capacity-upgrade-div")
        let laserText1 = document.createElement("Div")
        laserText1.classList.add("store-option-text")
        let laserText2 = document.createElement("Div")
        laserText2.classList.add("store-option-text")
        laserText1.textContent = "Laser Capacity Upgrade" 
        laserText2.textContent = stateObj.laserCapacityUpgradeCost * (1-stateObj.cheaperShops) + " gold"
        laserUpgradeDiv.append(laserText1, laserText2)
        if (stateObj.bankedCash >= stateObj.laserCapacityUpgradeCost * (1-stateObj.cheaperShops)) {
            laserUpgradeDiv.classList.add("store-clickable")
            laserUpgradeDiv.onclick = function () {
                laserUpgrade(stateObj)
            }
          }

          let bombUpgradeDiv = document.createElement("Div")
          bombUpgradeDiv.classList.add("store-option")
          bombUpgradeDiv.setAttribute("id", "store-bomb-capacity-upgrade-div")
          let bombText1 = document.createElement("Div")
          bombText1.classList.add("store-option-text")
          let bombText2 = document.createElement("Div")
          bombText2.classList.add("store-option-text")
          bombText1.textContent = "Bomb Capacity Upgrade" 
          bombText2.textContent = stateObj.bombCapacityUpgradeCost * (1-stateObj.cheaperShops) + " gold"
          bombUpgradeDiv.append(bombText1, bombText2)
        if (stateObj.bankedCash >= stateObj.bombCapacityUpgradeCost * (1-stateObj.cheaperShops)) {
            bombUpgradeDiv.classList.add("store-clickable")
            bombUpgradeDiv.onclick = function () {
                bombUpgrade(stateObj)
            }
          }

        let fillFuelDiv = document.createElement("Div")
        fillFuelDiv.setAttribute("id", "store-fuel-div")
        let missingFuel = Math.floor((stateObj.fuelCapacity-stateObj.currentFuel)/2)
        if (missingFuel > 0) {
            fillFuelDiv.classList.add("store-option")
            let fillText1 = document.createElement("Div")
            fillText1.classList.add("store-option-text")
            let fillText2 = document.createElement("Div")
            fillText2.classList.add("store-option-text")
            
            
            if (Math.floor(missingFuel/2) > (stateObj.bankedCash * (1-stateObj.cheaperShops))) {
                fillText1.textContent = "Spend all gold on fuel" 
                fillText2.textContent = Math.ceil(stateObj.bankedCash) * (1-stateObj.cheaperShops) + " gold"
            } else {
                fillText1.textContent = "Refill fuel" 
                fillText2.textContent = Math.ceil(missingFuel) * (1-stateObj.cheaperShops) + " gold"
            }

            fillFuelDiv.append(fillText1, fillText2)
            fillFuelDiv.classList.add("store-clickable")
            fillFuelDiv.onclick = function () {
                    fillFuel(stateObj)
            }
        }
        

        let repairDiv = document.createElement("Div")
        repairDiv.setAttribute("id", "store-repair-div")
        let missingHull = stateObj.maxHullIntegrity-stateObj.currentHullIntegrity
        if (missingHull > 0) {
            repairDiv.classList.add("store-option")
            let repairText1 = document.createElement("Div")
            repairText1.classList.add("store-option-text")
            let repairText2 = document.createElement("Div")
            repairText1.classList.add("store-option-text")
            
            if ((missingHull*5) > (stateObj.bankedCash * (1-stateObj.cheaperShops))) {
                repairText1.textContent = "Spend all gold on repairs" 
                repairText2.textContent = Math.ceil(stateObj.bankedCash) * (1-stateObj.cheaperShops) + " gold"
            } else {
                repairText1.textContent = "Repair hull fully " 
                repairText2.textContent = Math.ceil(missingHull*5) * (1-stateObj.cheaperShops) + " gold"
            }
            repairDiv.append(repairText1, repairText2)
            repairDiv.classList.add("store-clickable")
            
            repairDiv.onclick = function () {
                    repairHull(stateObj)
        }
        }
        


        let inventoryUpgradeDiv = document.createElement("Div")
        inventoryUpgradeDiv.classList.add("store-option")
        inventoryUpgradeDiv.setAttribute("id", "store-inventory-upgrade-div")
        let invText1 = document.createElement("Div")
        invText1.classList.add("store-option-text")
        let invText2 = document.createElement("Div")
        invText2.classList.add("store-option-text")
        invText1.textContent = "Inventory Size Upgrade" 
        invText2.textContent = stateObj.inventoryUpgradeCost * (1-stateObj.cheaperShops) + " gold"
        inventoryUpgradeDiv.append(invText1, invText2)
        if (stateObj.bankedCash >= stateObj.inventoryUpgradeCost * (1-stateObj.cheaperShops)) {
            inventoryUpgradeDiv.classList.add("store-clickable")
            inventoryUpgradeDiv.onclick = function () {
                upgradeInventory(stateObj)
            }
        }

        let hullUpgradeDiv = document.createElement("Div")
        hullUpgradeDiv.setAttribute("id", "store-hull-upgrade-div")
        hullUpgradeDiv.classList.add("store-option")
        let hullText1 = document.createElement("Div")
        hullText1.classList.add("store-option-text")
        let hullText2 = document.createElement("Div")
        hullText2.classList.add("store-option-text")
        hullText1.textContent = "Hull Integrity Upgrade" 
        hullText2.textContent = stateObj.hullUpgradeCost * (1-stateObj.cheaperShops) + " gold"
        hullUpgradeDiv.append(hullText1, hullText2)
        if (stateObj.bankedCash >= stateObj.hullUpgradeCost * (1-stateObj.cheaperShops)) {
            hullUpgradeDiv.classList.add("store-clickable")
            hullUpgradeDiv.onclick = function () {
                upgradeHull(stateObj)
            }
        }

        let buyLaserDiv = document.createElement("Div")
        buyLaserDiv.setAttribute("id", "store-buy-laser-div")
        if (stateObj.numberLasers < stateObj.laserCapacity) {
            buyLaserDiv.classList.add("store-option")
            let laserText1 = document.createElement("Div")
            laserText1.classList.add("store-option-text")
            let laserText2 = document.createElement("Div")
            laserText2.classList.add("store-option-text")
            laserText1.textContent = "Buy a laser" 
            laserText2.textContent = (stateObj.laserCost * stateObj.weaponsPriceModifier) * (1-stateObj.cheaperShops) + " gold"
            buyLaserDiv.append(laserText1, laserText2)
            buyLaserDiv.onclick = function () {
            }
            if (stateObj.bankedCash >= stateObj.laserCost * (1-stateObj.cheaperShops)) {
                buyLaserDiv.classList.add("store-clickable")
                buyLaserDiv.onclick = function () {
                    buyLaser(stateObj)
                }
            }
        }

        let buyBombDiv = document.createElement("Div")
        buyBombDiv.setAttribute("id", "store-buy-bomb-div")
        if (stateObj.bombCurrentTotal < stateObj.bombCapacity) {
            buyBombDiv.classList.add("store-option")
            let bombText1 = document.createElement("Div")
            bombText1.classList.add("store-option-text")
            let bombText2 = document.createElement("Div")
            bombText2.classList.add("store-option-text")
            bombText1.textContent = "Buy a bomb" 
            bombText2.textContent = (stateObj.bombCost * stateObj.weaponsPriceModifier) * (1-stateObj.cheaperShops) + " gold"
            buyBombDiv.append(bombText1, bombText2)
            buyBombDiv.onclick = function () {
            }
            if (stateObj.bankedCash >= stateObj.bombCost * (1-stateObj.cheaperShops)) {
                buyBombDiv.classList.add("store-clickable")
                buyBombDiv.onclick = function () {
                    buyBomb(stateObj)
                }
            }
        }

        let upgradeBombDistanceDiv = document.createElement("Div")
        upgradeBombDistanceDiv.setAttribute("id", "store-upgrade-bomb-distance-div")
        upgradeBombDistanceDiv.classList.add("store-option")
        let bombDistText1 = document.createElement("Div")
        bombDistText1.classList.add("store-option-text")
        let bombDistText2 = document.createElement("Div")
        bombDistText2.classList.add("store-option-text")
        bombDistText1.textContent = "Bomb Distance Upgrade" 
        bombDistText2.textContent = stateObj.bombDistanceUpgradeCost + " gold"
        upgradeBombDistanceDiv.append(bombDistText1, bombDistText2)
        if (stateObj.bankedCash >= stateObj.bombDistanceUpgradeCost) {
            upgradeBombDistanceDiv.classList.add("store-clickable")
            upgradeBombDistanceDiv.onclick = function () {
                buyBombDistanceUpgrade(stateObj)
            }
        }

        let upgradeLaserDistanceDiv = document.createElement("Div")
        upgradeLaserDistanceDiv.setAttribute("id", "store-upgrade-laser-div")
        upgradeLaserDistanceDiv.classList.add("store-option")
        let laserDistText1 = document.createElement("Div")
        laserDistText1.classList.add("store-option-text")
        let laserDistText2 = document.createElement("Div")
        laserDistText2.classList.add("store-option-text")
        laserDistText1.textContent = "Laser Distance Upgrade " 
        laserDistText2.textContent = stateObj.laserDistanceUpgradeCost * (1-stateObj.cheaperShops) + " gold"
        upgradeLaserDistanceDiv.append(laserDistText1, laserDistText2)
        if (stateObj.bankedCash >= stateObj.laserDistanceUpgradeCost * (1-stateObj.cheaperShops)) {
            upgradeLaserDistanceDiv.classList.add("store-clickable")
            upgradeLaserDistanceDiv.onclick = function () {
                buyLaserDistanceUpgrade(stateObj)
            }
        }
        
    
        let buyNothingDiv = document.createElement("Div")
        buyNothingDiv.classList.add("store-option")
        buyNothingDiv.setAttribute("id", "store-return-map-div")
        buyNothingDiv.classList.add("return-to-map")
        buyNothingDiv.textContent = "Return to Map"
        buyNothingDiv.onclick = function () {
            console.log("clicked buy nothing")
            leaveStore(stateObj)
          }

        storeDiv.append(fillFuelDiv, repairDiv, buyLaserDiv, laserUpgradeDiv, upgradeLaserDistanceDiv, buyBombDiv,  bombUpgradeDiv, upgradeBombDistanceDiv, fuelUpgradeDiv, inventoryUpgradeDiv, hullUpgradeDiv, buyNothingDiv)


        let testDiv = document.createElement("Div")
        document.getElementById("app").append(storeDiv)
    }
    return stateObj
}

async function leaveStore(stateObj) {
    stateObj.inStore = false;
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
        newState.isLevelPacifist = true;
    })
    await changeState(stateObj);
}

async function scrapMetalChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.isScrapMetal = true;
    })
    await changeState(stateObj);
}

async function shorterLevelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.floorValues[newState.currentLevel].numberRows -= 10
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
            newState.dirtThresholdNeeded -= 5;
            newState.choosingNextLevel = false;
        })
    }
    await changeState(stateObj);
}

//------------------------------------------------------------------------------------
//UPGRADE RELICS
//------------------------------------------------------------------------------------
async function upgradeFuelRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.fuelCapacity += 80;
        newState.currentFuel += 80;
        newState.fuelUpgrades +=1;
    })
    document.getElementById("empty-fuel-bar").classList.add("emphasis")
    document.getElementById("max-fuel-text").classList.add("emphasis")
    await pause(200)
    await changeState(stateObj);
    return stateObj
}

async function stopEnemiesRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.enemyArray = []
        newState.enemyMovementArray = [];
    })
    await changeState(stateObj);
    return stateObj
}

async function dirtToMaxFuelRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.dirtToMaxFuel += 3;
    })
    await changeState(stateObj);
    return stateObj
}

async function halfDamageEnemiesRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.enemyDamageModifier *= 0.5;
    })
    await changeState(stateObj);
    return stateObj
}

async function bombsExplodeFasterRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        if (newState.bombTimerMax > 4) {
            newState.bombTimerMax -= 3;
        } else {
            newState.bombTimerMax = 1
        }
    })
    await changeState(stateObj);
    return stateObj
}

async function halfDamageFullFuel(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.halfDamageFullFuel = true;
    })
    await changeState(stateObj);
    return stateObj
}

async function thornsRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.thorns = true;
    })
    await changeState(stateObj);
    return stateObj
}

async function weaponsPriceRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        if (newState.weaponsPriceModifier > 0.2) {
            newState.weaponsPriceModifier -= 0.2;
        } else {
            newState.weaponsPriceModifier = 0.2
        }
    })
    await changeState(stateObj);
    return stateObj
}

async function killEnemiesHullRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.killEnemiesHullModifier += 10;
    })
    await changeState(stateObj);
    return stateObj
}

async function moneyForDirtRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.moneyForDirt += 300;
    })
    await changeState(stateObj);
    return stateObj
}

async function upgradeBombDistanceRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombDistance += 1;
    })
    await changeState(stateObj);
    return stateObj
}

async function upgradeLaserDistanceRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserDistance += 1;
    })
    await changeState(stateObj);
    return stateObj
}

async function upgradeDirtBlockRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        if (newState.dirtThresholdNeeded > 10) {
            newState.dirtThresholdNeeded -= 10;
        }
    })
    await changeState(stateObj);
    return stateObj
}

//------------------------------------------------------------------------------------
//STORE FUNCTIONS
//------------------------------------------------------------------------------------

async function fillFuel(stateObj) {
    let missingFuel = stateObj.fuelCapacity - stateObj.currentFuel
    let missingFuelValue = Math.floor((stateObj.fuelCapacity - stateObj.currentFuel)/2)
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingFuel > 0) {
            if (newState.bankedCash > missingFuelValue) {
                newState.currentFuel += missingFuel;
                newState.bankedCash -= missingFuelValue * (1-stateObj.cheaperShops)
            } else {
                newState.currentFuel += Math.ceil(newState.bankedCash*2);
                newState.bankedCash = 0;    
            }
        }
    })
    document.getElementById("current-fuel-bar").classList.add("emphasis")
    document.getElementById("store-fuel-div").classList.add("store-clicked")
    await pause(300)
    await changeState(stateObj);
}

async function repairHull(stateObj) {
    let missingHull = stateObj.maxHullIntegrity - stateObj.currentHullIntegrity
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingHull > 0) {
            if (newState.bankedCash > (missingHull*5)) {
                newState.currentHullIntegrity = newState.maxHullIntegrity ;
                newState.bankedCash -= Math.ceil(missingHull*5) * (1-stateObj.cheaperShops)
            } else {
                newState.currentHull += Math.ceil(newState.bankedCash/5);
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
    console.log("triggering laser upgrade")
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserCapacity += 1;
        newState.numberLasers += 1;
        newState.bankedCash -= stateObj.laserCapacityUpgradeCost * (1-stateObj.cheaperShops)
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
        newState.bankedCash -= stateObj.bombCapacityUpgradeCost * (1-stateObj.cheaperShops)
        newState.bombCapacityUpgradeCost += 750;
    })
    document.getElementById("store-bomb-capacity-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("current-bombs-text").classList.add("upgraded-stat")
    document.getElementById("current-bombs-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeFuel(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.fuelCapacity += 50;
        newState.currentFuel += 50;
        newState.fuelUpgrades +=1;
        newState.bankedCash -= stateObj.fuelUpgradeCost * (1-stateObj.cheaperShops)
        newState.fuelUpgradeCost += 500;

    })
    document.getElementById("store-fuel-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("empty-fuel-bar").classList.add("emphasis")
    document.getElementById("max-fuel-text").classList.add("emphasis")
    document.getElementById("max-fuel-text").classList.add("upgraded-stat")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeInventory(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.inventoryMax += 6;
        newState.inventoryUpgrades +=1;
        newState.bankedCash -= stateObj.inventoryUpgradeCost * (1-stateObj.cheaperShops)
        newState.inventoryUpgradeCost += 500;

    })
    document.getElementById("store-inventory-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("inventory-size-text").classList.add("upgraded-stat")
    document.getElementById("inventory-size-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function upgradeHull(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.maxHullIntegrity += 50;
        newState.currentHullIntegrity +=50;
        newState.bankedCash -= stateObj.hullUpgradeCost * (1-stateObj.cheaperShops)
        newState.hullUpgradeCost += 1000;

    })
    document.getElementById("store-hull-upgrade-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("hull-integrity-text").classList.add("upgraded-stat")
    document.getElementById("hull-integrity-text").classList.add("emphasis")
    await pause(300)
    await changeState(stateObj);
}

async function buyBombDistanceUpgrade(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombDistance += 1;
        newState.bankedCash -= stateObj.bombDistanceUpgradeCost * (1-stateObj.cheaperShops)
        newState.bombDistanceUpgradeCost += 1000;

    })
    document.getElementById("store-upgrade-bomb-distance-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("bomb-distance-text").classList.add("upgraded-stat")
    document.getElementById("bomb-distance-text").classList.add("emphasis")
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

async function buyLaserDistanceUpgrade(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserDistance += 1;
        newState.bankedCash -= stateObj.laserDistanceUpgradeCost * (1-stateObj.cheaperShops)
        newState.laserDistanceUpgradeCost += 1000;

    })
    document.getElementById("store-upgrade-laser-div").classList.add("store-clicked")
    await pause(300)
    document.getElementById("laser-distance-text").classList.add("emphasis")
    document.getElementById("laser-distance-text").classList.add("upgraded-stat")
    await pause(300)
    await changeState(stateObj);
}

async function buyBomb(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombCurrentTotal += 1;
        newState.bankedCash -= (stateObj.bombCost * newState.weaponsPriceModifier) * (1-stateObj.cheaperShops)
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
    let currentHeight = Math.floor(stateObj.currentPosition/screenwidthBlocks)
    let currentWidth = Math.floor(stateObj.currentPosition % screenwidthBlocks)
    let scrollHeight = Math.floor(viewportHeight * 0.1);
    let scrollWidth = Math.floor(viewportWidth * 0.1);
    if (stateObj.inTransition === false && stateObj.inStore === false) {
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
            //if (stateObj.numberLasers > 0) {
                stateObj = await dropBlock(stateObj)
                await changeState(stateObj)
            //}
        }else if (event.key === "b") {
            //if (stateObj.numberLasers > 0) {
                stateObj = await dropBomb(stateObj)
                await changeState(stateObj)
            //}
        }
    }
  });

async function checkForDeath(stateObj) {
    if (stateObj.currentFuel < 0) {
        await loseTheGame("You've run out of fuel!");
    }

    if (stateObj.gameMap[stateObj.currentPosition-1] === "enemy" && stateObj.currentPosition % screenwidthBlocks !== 0) {
        stateObj = await doDamage(stateObj, 50, -1)
    } else if (stateObj.gameMap[stateObj.currentPosition+1] === "enemy" && (stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
        stateObj = await doDamage(stateObj, 50, 1)
    } else if (stateObj.gameMap[stateObj.currentPosition+screenwidthBlocks] === "enemy") {
        stateObj = await doDamage(stateObj, 50, screenwidthBlocks)
    } else if (stateObj.gameMap[stateObj.currentPosition-screenwidthBlocks] === "enemy") {
        stateObj = await doDamage(stateObj, 50, -screenwidthBlocks)
    }

    await changeState(stateObj)

    if (stateObj.currentHullIntegrity <= 0) {
        await loseTheGame("Your miner took too much damage and exploded!");
    }
}

async function doDamage(stateObj, damageAmount, enemyLocation) {
    if (stateObj.inStore === false) {
        stateObj = immer.produce(stateObj, (newState) => {
            if (newState.halfDamageFullFuel === true) {
                newState.currentHullIntegrity -= Math.floor(((damageAmount * newState.enemyDamageModifier) * 0.5));
            } else {
                newState.currentHullIntegrity -= (damageAmount * newState.enemyDamageModifier);
            }
            
            if (newState.thorns === true) {
                console.log("is this enemy" + newState.gameMap[newState.currentPosition+enemyLocation])
                let enemyIndex = newState.enemyArray.indexOf(newState.currentPosition + enemyLocation);
                console.log("enemy index is" + enemyIndex)
                newState.enemyArray.splice(enemyIndex, 1)
                newState.enemyMovementArray.splice(enemyIndex, 1)
                
                newState.gameMap[newState.currentPosition+enemyLocation] = "empty"

                document.querySelectorAll(".enemy-img")[enemyIndex].classList.add("enemy-death")
            }

        })
    }
    if (stateObj.thorns === true) {
        await pause (100)
    }
    await changeState(stateObj)
    return stateObj
}

async function LeftArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {   
    if (stateObj.gameMap[stateObj.currentPosition - 1] === "STORE") {
        stateObj = await calculateMoveChange(stateObj, -1)
    }
    //make sure not drilling in midair
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
        return stateObj
    //make sure not on left side
    }  else if (stateObj.currentPosition % screenwidthBlocks !== 0) {
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*4), currentHeight*scrollHeight - (scrollHeight*2))
        stateObj = await calculateMoveChange(stateObj, -1)
        return stateObj
    }
    return stateObj
}

//7, 15, 23
async function RightArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    //do nothing if you're in the air and space to your left isn't air
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition + 1] !== "empty") {
        return stateObj
    } else {
        //only execute if not already on right side
        if ((stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
            stateObj = await calculateMoveChange(stateObj, 1)
            // if (stateObj.gameMap[stateObj.currentPosition + 1] === "empty") {
            //     stateObj = await calculateMoveChange(stateObj, 1)
            //     window.scrollTo(currentWidth*scrollWidth- (scrollWidth*2), currentHeight*scrollHeight - (scrollHeight*2))
            // } else {
            //     stateObj = immer.produce(stateObj, (newState) => {
            //         newState.inTransition === true
            //         newState.moveToSquare = stateObj.currentPosition - 1
            //         newState.moveTimer += 1;
            //     })
            // }
        }
    }
    return stateObj
}

//calculate move change takes stateObj & direction
//checkIfCanMove does all the calculations to see if you CAN move there
//check target square figures out 

async function UpArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    let newSquare = stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]
    if (stateObj.currentPosition > 7 && stateObj.inTransition === false) {
        if (newSquare=== "empty" || newSquare === "STORE") {
            window.scrollTo(currentWidth*scrollWidth- (scrollWidth*3), currentHeight*scrollHeight - (scrollHeight*2))
            stateObj = await calculateMoveChange(stateObj, -screenwidthBlocks)
            stateObj = immer.produce(stateObj, (newState) => {
                newState.currentFuel -= 0.25;
            })
        }
    } 
    return stateObj
}

async function DownArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    if (stateObj.currentPosition < (stateObj.gameMap.length-screenwidthBlocks) && stateObj.gameMap[stateObj.currentPosition+screenwidthBlocks] !== "stone") {
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*3), currentHeight*scrollHeight - (scrollHeight))
        stateObj = await calculateMoveChange(stateObj, screenwidthBlocks)
    }
    return stateObj
}

async function calculateMoveChange(stateObj, squaresToMove) {
    targetSquareNum = stateObj.currentPosition + squaresToMove

    targetSquare = stateObj.gameMap[targetSquareNum];

    //check if target square has an enemy nearby
    
    if (targetSquare === "0") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime/2)
            
    } else if (targetSquare === "1") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 25, stateObj.drillTime)
    } else if (targetSquare === "2") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 50, stateObj.drillTime)
    } else if (targetSquare === "3") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 125, stateObj.drillTime)
    } else if (targetSquare === "4") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 300, stateObj.drillTime)
    } else if (targetSquare === "5") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 750, stateObj.drillTime)
    } else if (targetSquare === "6") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 1500, stateObj.drillTime)
    } else if (targetSquare === "empty") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 1, 0)
    } else if (targetSquare === "enemy") {
        stateObj = await doDamage(stateObj, 75)
        stateObj = await handleSquare(stateObj, targetSquareNum, 1, 0)
    } else if (targetSquare === "STORE" && stateObj.currentInventory === 0) {
        console.log("should see store calulate")
        stateObj = await seeStore(stateObj)
    } else if (targetSquare === "STORE" && stateObj.currentInventory > 0) {
        stateObj = await sellItemsScreen(stateObj)
    } else if (targetSquare === "EXIT") {
        stateObj = await goToNextLevel(stateObj)
    } else if (targetSquare === "fuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeFuelRelic(stateObj)  
    } else if (targetSquare === "dirtToMaxFuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await dirtToMaxFuelRelic(stateObj)  
    } else if (targetSquare === "stopRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await stopEnemiesRelic(stateObj)  
    } else if (targetSquare === "halfDamageRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await halfDamageEnemiesRelic(stateObj)  
    } else if (targetSquare === "bombsExplodeFasterRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await bombsExplodeFasterRelic(stateObj)  
    } else if (targetSquare === "halfDamageFullFuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await halfDamageFullFuel(stateObj)  
    } else if (targetSquare === "thornsRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await thornsRelic(stateObj)  
    } else if (targetSquare === "weaponsPriceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await weaponsPriceRelic(stateObj)  
    } else if (targetSquare === "killEnemiesHullRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await killEnemiesHullRelic(stateObj)  
    } else if (targetSquare === "bombDistanceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeBombDistanceRelic(stateObj)  
    } else if (targetSquare === "laserDistanceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeLaserDistanceRelic(stateObj)  
    } else if (targetSquare === "dirtRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeDirtBlockRelic(stateObj)  
    }  else if (targetSquare === "moneyForDirtRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await moneyForDirtRelic(stateObj)  
    } else {
        console.log("target square hasn't been handled yet")
    }


    if (targetSquare !== "empty" && targetSquare !== "STORE") {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.gameMap[targetSquareNum] = "empty"
        })
        
    }
    console.log("fuel at " + stateObj.currentFuel)

    return stateObj
}

function pause(timeValue) {
    return new Promise(res => setTimeout(res, timeValue))
}

async function sellItemsScreen(stateObj) {
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.sellingItems = true;
    })
    return stateObj
}

async function seeStore(stateObj) {
    console.log("inside seeStore")
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.bankedCash += newState.inventoryCash;
        newState.inventoryCash = 0;
        newState.currentInventory = 0;
        newState.sellingItems = false
        newState.inStore = true;
    })
    stateObj = await changeState(stateObj)
    return stateObj
}

async function goToNextLevel(stateObj) {
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.currentLevel += 1;
        newState.timeCounter = 0;
        newState.isLevelPacifist = false;

        if (stateObj.isScrapMetal === true) {
            const countEnemyOccurrences = newState.gameMap.reduce((acc, currentValue) => {
                if (currentValue === 'enemy') {
                  return acc + 1;
                }
                return acc;
              }, 0);

            newState.bankedCash += (200*countEnemyOccurrences)
        }
        newState.isScrapMetal = false;
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

async function triggerHandleSquare(stateObj, squareIndexToMoveTo, fuelToLose, goldToGain, pauseDuration=0) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.movementSquare = squareIndexToMoveTo 
    })
    await changeState(stateObj)
    return stateObj;
}

async function handleSquare(stateObj, squareIndexToMoveTo, fuelToLose, goldToGain, pauseDuration=0) {
    let oldPosition = stateObj.currentPosition
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentFuel -= fuelToLose;
        newState.currentPosition = squareIndexToMoveTo;
        newState.moveToSquare = false;
        newState.inTransition = false;

        if (newState.dirtReserves < (stateObj.dirtThresholdNeeded) && newState.gameMap[squareIndexToMoveTo] !== "empty") {
            newState.dirtReserves += 1;
        }

        if (goldToGain > 0) {
            if (newState.currentInventory < newState.inventoryMax) {
                newState.inventoryCash += goldToGain;
                newState.currentInventory += 1;
            } else {
                console.log("inventory is full")
            }
        }    
    }) 

    if (pauseDuration > 0) {
        state.inTransition = true;

        // document.querySelectorAll(".map-square")[stateObj.currentPosition].classList.add("change-empty")
        // await pause(pauseDuration)   
        // document.querySelectorAll(".map-square")[stateObj.currentPosition].classList.remove("change-empty")
        stateObj = immer.produce(stateObj, (newState) => {
            newState.inTransition = false;
        })    
    }
    return stateObj
}

async function loseTheGame(textString) {
    let confirmText = textString + ` Reload the page to try again`
    var confirmation = confirm(confirmText);

  if (confirmation) {
    setTimeout(function(){
        location.reload(true);
      }, 100);
  }
}

async function fireLaser(stateObj, detonatePosition, isLaser=true) {
    let rightBlocksToBlast = 0;
    let leftBlocksToBlast = 0;
    let numberBlocks = (isLaser === true) ? stateObj.laserDistance : stateObj.bombDistance
    for (i=0; i < numberBlocks+1; i++) {
        leftBlocksToBlast = i;
        if ((detonatePosition-i) % screenwidthBlocks === 0) {
            break;
        }
    }
    for (i=0; i < numberBlocks+1; i++) {
        rightBlocksToBlast = i;
        if ((detonatePosition+i+1) % screenwidthBlocks === 0) {
            break;
        }
    }
    
    for (i=1; i < leftBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition-i)
        //document.querySelectorAll(".map-square")[detonatePosition-i].classList.add("exploding-block")
        
    }

    for (i=1; i < rightBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition+i)
    }


    if (isLaser) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.numberLasers -= 1;
        })
    }
    return stateObj
}

async function detonateBlock(stateObj, blockPosition) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombExploding = true;
        if (newState.enemyArray.includes(blockPosition)) {
            const enemyIndex = newState.enemyArray.indexOf(blockPosition)
            newState.enemyArray.splice(enemyIndex, 1)
            newState.enemyMovementArray.splice(enemyIndex, 1)
            if (newState.killEnemiesHullModifier > 0) {
                newState.currentHullIntegrity += newState.killEnemiesHullModifier
                newState.maxHullIntegrity += newState.killEnemiesHullModifier
            }
        }
        if (newState.gameMap[blockPosition] !== "STORE") {
            newState.gameMap[blockPosition] = "exploding-1"
        }
        
    })
    return stateObj
}

async function dropBlock(stateObj) {
    console.log("dropping block")
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty") {
        stateObj = await immer.produce(stateObj, (newState) => {
            newState.bankedCash += newState.moneyForDirt
            newState.fuelCapacity += newState.dirtToMaxFuel
            if (newState.dirtReserves >= (newState.dirtThresholdNeeded)) {
                newState.gameMap[stateObj.currentPosition+screenwidthBlocks] = "0";
                newState.dirtReserves = 0;
            }
            
        })
    }
    return stateObj
}

async function dropBomb(stateObj) {
    console.log("dropping bomb")
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty") {
        stateObj = await immer.produce(stateObj, (newState) => {
            if (newState.bombCurrentTotal > 0) {
                newState.gameMap[stateObj.currentPosition+screenwidthBlocks] = "BOMB";
                newState.bombCurrentTotal -= 1;
                newState.bombLocation = stateObj.currentPosition+screenwidthBlocks
                newState.bombTimer = newState.bombTimerMax;
            }
        })
    }
    console.log("bomb timer set to " + stateObj.bombTimer)
    return stateObj
}