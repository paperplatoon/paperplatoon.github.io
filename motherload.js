

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
    bronzeInventory: 0,
    silverInventory: 0,
    goldInventory: 0,
    rubyInventory: 0,
    amethystInventory: 0,
    diamondInventory: 0,
    blackDiamondInventory: 0,
    

    bankedCash: 100,
    
    numberLasers: 1,
    laserCapacity: 1,
    laserCost: 150,
    laserCapacityUpgradeCost: 750,
    
    firingLaserLeft: false,
    firingLaserRight: false,
    laserExplosion: false,
    
    //relicValues
    weaponsPriceModifier: 1,
    enemyDamageModifier: 1,
    halfDamageFullFuel: 1,
    dirtToMaxFuel: 0,
    thorns: false,
    killEnemiesHullModifier: 0,
    moneyForDirt: 0,
    killEnemiesForMoney: 0, //needs done
    killEnemiesForHealing: 0, 
    bronzeSilverBonus: 1,
    laserPiercing: false,
    silverHealing: 0,
    bronzeMaxFuel: 0,
    

    drillTime: 850,
    timeCounter: 0,
    moveToSquare: false,
    moveTimer: 0,

    //level modifiers
    isLevelCoward: false,
    isPacifist: 0,
    cheaperShops: 0,
    freeFuel: true,
    splinterCellModifier: 1,
    splinterCellOn: false,

    //states
    currentPosition: false,
    inStore: false,
    sellingItems: false,
    choosingNextLevel: false,
    inTransition: false,  
    
    currentHullIntegrity: 100,
    maxHullIntegrity: 100,
    hullUpgradeCost: 500,
    takingDamage: false,

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

    let levelDiv = document.createElement("Div")
    levelDiv.classList.add("level-div")
    levelDiv.textContent = "Level " + (stateObj.currentLevel+1);
    levelDiv.classList.add("centered")

    let barsDiv = document.createElement("Div")
    barsDiv.classList.add("bars-div")


    //FUEL
    let fuelDiv = document.createElement("Div")
    fuelDiv.setAttribute("id", "fuel-div");

    fuelText1Div = document.createElement("Div")
    fuelText1Div.classList.add("bars-text-div")
    fuelText1Div.setAttribute("id", "fuel-opening-text");
    fuelText1Div.textContent = "Fuel "

    fuelText2Div = document.createElement("Div")
    fuelText2Div.classList.add("bars-text-div")
    fuelText2Div.setAttribute("id", "max-fuel-text");
    if (stateObj.fuelCapacity > 120) {
        fuelText2Div.classList.add("upgraded-stat")
    }
    fuelText2Div.textContent = "[Max: " + stateObj.fuelCapacity + "]"

    let emptyFuelBarDiv = document.createElement("Div");
    emptyFuelBarDiv.classList.add("empty-fuel-bar");
    emptyFuelBarDiv.setAttribute("id", "empty-fuel-bar");
    let currentFuelBarDiv = document.createElement("Div");
    currentFuelBarDiv.classList.add("current-fuel-bar");
    currentFuelBarDiv.setAttribute("id", "current-fuel-bar");
    if (stateObj.currentFuel >= stateObj.fuelCapacity/3) {
        currentFuelBarDiv.classList.add("full-fuel-bar");
    } else {
        currentFuelBarDiv.classList.add("low-fuel-bar");
        fuelText1Div.classList.add("inventory-full-text")
    }
    let barLength = 10*(stateObj.currentFuel/stateObj.fuelCapacity)
    let barText = "width:" + barLength + "vw"
    currentFuelBarDiv.setAttribute("style", barText);
    emptyFuelBarDiv.append(currentFuelBarDiv);
    fuelDiv.append(fuelText1Div, emptyFuelBarDiv, fuelText2Div)

    barsDiv.append(fuelDiv)


    //HULL
    let hullDiv = document.createElement("Div")
    hullDiv.setAttribute("id", "hull-div");
    hullText1Div = document.createElement("Div")
    hullText1Div.classList.add("bars-text-div")
    hullText1Div.textContent = "Hull "

    hullText2Div = document.createElement("Div")
    hullText2Div.classList.add("bars-text-div")
    hullText2Div.setAttribute("id", "hull-integrity-text");
    if (stateObj.maxHullIntegrity > 100) {
        hullText2Div.classList.add("upgraded-stat")
    }
    hullText2Div.textContent = "[Max: " + stateObj.maxHullIntegrity + "]"

    let emptyHullBarDiv = document.createElement("Div");
    emptyHullBarDiv.classList.add("empty-hull-bar");
    emptyHullBarDiv.setAttribute("id", "empty-hull-bar");

    let currentHullBarDiv = document.createElement("Div");
    currentHullBarDiv.classList.add("current-hull-bar");
    currentHullBarDiv.setAttribute("id", "current-hull-bar");
    if (stateObj.currentHullIntegrity > stateObj.maxHullIntegrity/2) {
        currentHullBarDiv.classList.add("full-hull-bar");
    } else {
        currentHullBarDiv.classList.add("low-hull-bar");
        hullText1Div.classList.add("inventory-full-text")
    }

    let hullBarLength = 10*(stateObj.currentHullIntegrity/stateObj.maxHullIntegrity)
    let hullBarText = "width:" + hullBarLength + "vw"
    currentHullBarDiv.setAttribute("style", hullBarText);
    emptyHullBarDiv.append(currentHullBarDiv);
    hullDiv.append(hullText1Div, emptyHullBarDiv, hullText2Div)
    barsDiv.append(hullDiv)


    //INVENTORY
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.classList.add("inventory")

    let inventoryText1Div = document.createElement("Div")
    inventoryText1Div = document.createElement("Div")
    inventoryText1Div.classList.add("bars-text-div")
    inventoryText1Div.textContent = "Inventory "

    let inventoryText2Div = document.createElement("Div")
    inventoryText2Div = document.createElement("Div")
    inventoryText2Div.classList.add("bars-text-div")
    inventoryText2Div.setAttribute("id", "inventory-size-text");
    if (stateObj.inventoryMax > 12) {
        inventoryText2Div.classList.add("upgraded-stat")
    }
    inventoryText2Div.textContent = "[ Max: " + stateObj.inventoryMax + " ]"
    if (stateObj.currentInventory === stateObj.inventoryMax) {
        inventoryText2Div.classList.add("inventory-full-text")
        inventoryText1Div.classList.add("inventory-full-text")
    }

    let emptyInventoryBar = document.createElement("Div");
    emptyInventoryBar.classList.add("empty-inv-bar");
    emptyInventoryBar.setAttribute("id", "empty-inv-bar");

    let currentInventoryBar = document.createElement("Div");
    currentInventoryBar.classList.add("current-inv-bar");
    currentInventoryBar.setAttribute("id", "current-inv-bar");
    currentInventoryBar.classList.add("normal-inv-bar");
    let invBarLength = 10*(stateObj.currentInventory/stateObj.inventoryMax)
    let invBarText = "width:" + invBarLength + "vw"
    currentInventoryBar.setAttribute("style", invBarText);
    emptyInventoryBar.append(currentInventoryBar);

    inventoryDiv.append(inventoryText1Div, emptyInventoryBar, inventoryText2Div)
    barsDiv.append(inventoryDiv)

    

    let cashDiv = document.createElement("Div")
    cashDiv.setAttribute("id", "cash-div");
    cashDiv.classList.add("centered")
    cashDiv.textContent = "$" + stateObj.bankedCash;
    

    let lasersDiv = document.createElement("Div")
    lasersDiv.classList.add("weapons-div")
    let currentLasersDiv = document.createElement("Div")
    currentLasersDiv.setAttribute("id", "current-lasers-text");
    laserString = "Lasers"
    laserString = laserString + ": " + stateObj.numberLasers + "/" + stateObj.laserCapacity
    if (stateObj.numberLasers > 0) {
        laserString = laserString + " (press L to fire)"
    }
    if (stateObj.laserPiercing === true) {
        laserString = laserString + "\u00A0  [Piercing]"
    }
    currentLasersDiv.textContent = laserString
    if (stateObj.laserCapacity > 1 || stateObj.laserPiercing === true) {
        currentLasersDiv.classList.add("upgraded-stat")
    }
    

    lasersDiv.append(currentLasersDiv)

    let bombDiv = document.createElement("Div")
    bombDiv.classList.add("weapons-div")
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
    bombString2 = " \u00A0 [Distance: " + stateObj.bombDistance + "]"
    bombDistanceDiv.textContent = bombString2
    bombDistanceDiv.setAttribute("id", "bomb-distance-text");
    if (stateObj.bombDistance > 2) {
        bombDistanceDiv.classList.add("upgraded-stat")
    }

    bombDiv.append(currentBombsDiv, bombDistanceDiv)

    let weaponsDiv = document.createElement("Div")
    weaponsDiv.classList.add("all-weapons-div")
    weaponsDiv.classList.add("top-vertical-div")
    weaponsDiv.append(bombDiv, lasersDiv)


    let dirtDiv = document.createElement("Div")
    dirtDiv.classList.add("dirt-div")
    dirtDiv.classList.add("centered")
    dirtDiv.classList.add("top-vertical-div")
    dirtString = "Dirt: " + Math.round((stateObj.dirtReserves/(stateObj.dirtThresholdNeeded))*100) + "%"
    if (stateObj.dirtReserves >= (stateObj.dirtThresholdNeeded)) {
        dirtString = dirtString + " (press P to drop dirt)"
    }
    if (stateObj.dirtThresholdNeeded < 50) {
        dirtDiv.classList.add("upgraded-stat")
    }
    dirtDiv.textContent = dirtString

    topBarDiv.append(levelDiv, cashDiv, barsDiv, weaponsDiv,dirtDiv)

    if (stateObj.weaponsPriceModifier < 1) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/gun1.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseenter', function() {
            const statusText = document.querySelector("#weapons-price-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseleave', function() {
            const statusText = document.querySelector("#weapons-price-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "weapons-price-popup")
          relicTextDiv.textContent = "Weapons are " + Math.ceil((1-stateObj.weaponsPriceModifier)*100) + "% cheaper"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.thorns === true) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/thorns.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#thorns-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#thorns-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "thorns-popup")
          relicTextDiv.textContent = "Enemies who damage you die afterwards"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.enemyDamageModifier < 1) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/shield2.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#enemy-damage-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#enemy-damage-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "enemy-damage-popup")
          relicTextDiv.textContent = "Enemies deal " + Math.ceil((1-stateObj.enemyDamageModifier)*100) + "% less damage"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.halfDamageFullFuel < 1) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/gasshield.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseenter', async function() {
            const statusText = document.querySelector("#enemy-damage-fuel-popup");
                    statusText.style.display = 'block'
          });

          
          weaponPriceRelicDiv.addEventListener('mouseleave', function() {
                const statusText = document.querySelector("#enemy-damage-fuel-popup");
                statusText.style.display = 'none'
          });
    

            let relicTextDiv = document.createElement("Div");
            relicTextDiv.setAttribute("id", "enemy-damage-fuel-popup")
            relicTextDiv.textContent = "Enemies deal " + Math.ceil((1-stateObj.halfDamageFullFuel)*100) + "% less damage when your fuel is at least 50% full"
            weaponPriceRelicDiv.appendChild(relicTextDiv);
          

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.killEnemiesHullModifier > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/killhull.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#kill-enemies-fuel-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#kill-enemies-fuel-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "kill-enemies-fuel-popup")
          relicTextDiv.textContent = "Increase Hull Integrity by " + Math.ceil(stateObj.killEnemiesHullModifier) + " whenever you kill an enemy"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.killEnemiesForHealing > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/repairkill.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#kill-enemies-heal-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#kill-enemies-heal-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "kill-enemies-heal-popup")
          relicTextDiv.textContent = "Killing enemies heals your hull by " + Math.ceil(stateObj.killEnemiesForHealing)
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.silverHealing > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/silverhealing.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#silver-heal-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#silver-heal-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "silver-heal-popup")
          relicTextDiv.textContent = "Mining silver ore restores " + stateObj.silverHealing + " HP"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.bronzeMaxFuel > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/bronzemaxfuel.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#bronze-fuel-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#bronze-fuel-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "bronze-fuel-popup")
          relicTextDiv.textContent = "Mining bronze ore adds " + stateObj.bronzeMaxFuel + " maximum fuel capacity"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.killEnemiesForMoney > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/killmoney.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#kill-enemies-money-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#kill-enemies-money-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "kill-enemies-money-popup")
          relicTextDiv.textContent = "Killing an enemy gets you $" + Math.ceil(stateObj.killEnemiesForMoney)
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.laserPiercing === true) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/laserpiercing.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#laser-piercing-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#laser-piercing-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "laser-piercing-popup")
          relicTextDiv.textContent = "Laser pierces through entire row"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.bronzeSilverBonus > 1) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/bronzesilverbonus.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#bronze-silver-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#bronze-silver-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "bronze-silver-popup")
          relicTextDiv.textContent = "Bronze and silver ore sells for " + stateObj.bronzeSilverBonus + "x as much money"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.isPacifist > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/pacifist.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#pacifist-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#pacifist-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "pacifist-popup")
          relicTextDiv.textContent = "Gain $" + stateObj.isPacifist + " at the end of the level for each enemy still alive"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.dirtToMaxFuel > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/dirtmaxfuel.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#dirt-fuel-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#dirt-fuel-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "dirt-fuel-popup")
          relicTextDiv.textContent = "Gain " + Math.ceil(stateObj.dirtToMaxFuel) + " maximum fuel when dropping a dirt block"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.bombTimerMax < 5) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/artifact3.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#bomb-timer-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#bomb-timer-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "bomb-timer-popup")
          relicTextDiv.textContent = "Bomb Timer starts at " + Math.ceil(stateObj.bombTimerMax)
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.cheaperShops > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/cheapershops.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#cheaper-shops-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#cheaper-shops-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "cheaper-shops-popup")
          relicTextDiv.textContent = "Shop prices are " + Math.ceil(100*stateObj.cheaperShops) +"% cheaper for this level"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.splinterCellModifier > 1) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/splintercell.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#splinter-cell-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#splinter-cell-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "splinter-cell-popup")
          relicTextDiv.textContent = "Gems are worth " + stateObj.splinterCellModifier +"x more. Stops working after you kill an enemy."
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.freeFuel === true) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/oilwell.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#oil-well-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#oil-well-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "oil-well-popup")
          relicTextDiv.textContent = "Fuel is free on this level"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.moneyForDirt > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/moneydirt.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#money-dirt-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#money-dirt-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "money-dirt-popup")
          relicTextDiv.textContent = "Earn $" + Math.ceil(stateObj.moneyForDirt) + " every time you drop dirt"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    

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
            //18 relics
            let relicArray = ["fuelRelic", "bombDistanceRelic", "laserPiercingRelic", "dirtRelic", 
            "stopRelic", "halfDamageRelic", "moneyForDirtRelic", "bombsExplodeFasterRelic", 
            "weaponsPriceRelic", "halfDamageFullFuelRelic", "thornsRelic", "dirtToMaxFuelRelic",
            "killEnemiesHullRelic", "bronzeSilverBonusRelic", "remoteBombsRelic", "killEnemiesHealRelic",
            "silverHealingRelic", "bronzeMaxFuelRelic"]
            // relicArray = ["bronzeMaxFuelRelic"]
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
            if (stateObj.isLevelCoward === false) {
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


var enemyMovementTimer = setInterval(moveEnemies, 100); // 500 milliseconds (half a second)
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
        if (newState.takingDamage !== false) {
            if (newState.takingDamage > 0) {
                newState.takingDamage -= 1
            } else {
                console.log("able to take damage again")
                newState.takingDamage = false;
            }
            console.log('taking damage state is ' + stateObj.newState)
        }
    })
    // await updateState(stateObj)
    // console.log("number of enemies is " + stateObj.enemyMovementArray.length)
    // console.log("enemy positions are " + stateObj.enemyArray)
    if (stateObj.inStore === false && stateObj.choosingNextLevel === false && stateObj.sellingItems === false) {
        if (stateObj.timeCounter % 3 ===0) {

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


            if (stateObj.bombLocation) {
                if (stateObj.remoteBombs === false) {
                    if (stateObj.bombTimer > 0) {
                        console.log('counting down bomb timer from ' + stateObj.bombTimer)
                        stateObj = await immer.produce(stateObj, (newState) => {
                            newState.bombTimer -= 1
                        })
                    } else {
                        stateObj = await detonateBomb(stateObj, stateObj.bombLocation)
                    }
                }
            }
        }

        if (stateObj.firingLaserLeft) {
            if (stateObj.firingLaserLeft % screenwidthBlocks !== 0) {
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
            if ((stateObj.firingLaserRight+1) % screenwidthBlocks !== 0) {
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
async function renderScreen(stateObj, isMove=true) {
    //console.log("rendering Screen")

    document.getElementById("app").innerHTML = ""
    //create a mapDiv to append all your new squares to
    if (isMove) {
        topBar = await renderTopBarStats(stateObj);
        document.getElementById("app").append(topBar)
    }
    
    if (stateObj.sellingItems === true) {
        console.log("selling items is true")
        let storeDiv = document.createElement("Div")
        storeDiv.classList.add("store-div")

        let sellDiv = document.createElement("Div")
        sellDiv.classList.add("selling-items-div")
        let sellTotal = 0;

        let sellInventoryDiv = document.createElement("Div")
        sellInventoryDiv.classList.add("selling-div")
        if (stateObj.bronzeInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let bronzeSellTotal = ((25*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.bronzeInventory)
            inventoryDiv.textContent = "Bronze Ore (" + stateObj.bronzeInventory + "): $" + bronzeSellTotal 
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += bronzeSellTotal
        }
        if (stateObj.silverInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let silverSellTotal = ((50*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.silverInventory)
            inventoryDiv.textContent = "Silver Ore (" + stateObj.silverInventory + "): $" + silverSellTotal
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += silverSellTotal
        }

        if (stateObj.goldInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let tempSellTotal = ((100*stateObj.splinterCellModifier)*stateObj.goldInventory)
            inventoryDiv.textContent = "Gold Ore (" + stateObj.goldInventory + "): $" + tempSellTotal
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += tempSellTotal
        }

        if (stateObj.rubyInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let tempSellTotal = ((250*stateObj.splinterCellModifier)*stateObj.rubyInventory)
            inventoryDiv.textContent = "Rubies (" + stateObj.rubyInventory + "): " + tempSellTotal
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += tempSellTotal
        }
        if (stateObj.amethystInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let tempSellTotal = ((500*stateObj.splinterCellModifier)*stateObj.amethystInventory)
            inventoryDiv.textContent = "Amethyst (" + stateObj.amethystInventory + "): $" + tempSellTotal
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += tempSellTotal
        }
        if (stateObj.diamondInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let tempSellTotal = ((1000*stateObj.splinterCellModifier)*stateObj.diamondInventory)
            inventoryDiv.textContent = "Diamonds (" + stateObj.diamondInventory + "): $" + tempSellTotal
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += tempSellTotal
        }
        if (stateObj.blackDiamondInventory > 0) {
            let inventoryDiv = document.createElement("Div")
            inventoryDiv.classList.add("sell-row")
            let tempSellTotal = ((3000*stateObj.splinterCellModifier)*stateObj.blackDiamondInventory)
            inventoryDiv.textContent = "Black Diamonds (" + stateObj.blackDiamondInventory + "): $" + tempSellTotal
            sellInventoryDiv.append(inventoryDiv)
            sellTotal += tempSellTotal
        }

        let sellButtonDiv = document.createElement("Div")
        sellButtonDiv.classList.add("sell-button")
        sellButtonDiv.textContent = "Sell Items ($" + sellTotal + ")"
        sellButtonDiv.onclick = async function () {
            document.querySelector(".sell-button").classList.add("emphasis")
            await pause(450)
            await seeStore(stateObj, sellTotal)
        }

        sellDiv.append(sellInventoryDiv, sellButtonDiv)
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
                if ((stateObj.currentFuel < stateObj.fuelCapacity/3)) {
                    mapSquareImg.classList.add("player-img-low-fuel")
                } else if (stateObj.currentHullIntegrity <= (stateObj.maxHullIntegrity/2)) {
                    mapSquareImg.classList.add("player-img-damaged")
                } else if (stateObj.currentInventory === stateObj.inventoryMax) {
                    mapSquareImg.classList.add("player-img-full")
                } else {
                    mapSquareImg.classList.add("player-img")
                }
                mapSquareImg.src = "img/map/miner1.png"
                mapSquareDiv.append(mapSquareImg)
            }
            if (mapSquare === "stone") {
                mapSquareDiv.classList.add("stone")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("stone-img")
                mapSquareImg.src = "img/map/stone.png"
                mapSquareDiv.append(mapSquareImg)
            }
            
            if (mapSquare === "0") {
                mapSquareDiv.classList.add("dirt")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("dirt-img")
                mapSquareImg.src = "img/map/dirt.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "empty") {
                mapSquareDiv.classList.add("empty")
            } else if (mapSquare === "active-laser") {
                mapSquareDiv.classList.add("laser-effect")
            } else if (mapSquare === "exploding-1") {
                mapSquareDiv.classList.add("bomb-effect")
            } else if (mapSquare === "enemy") {
                mapSquareDiv.classList.add("enemy")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("enemy-img")
                mapSquareImg.src = "img/map/enemy1.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "1") {
                mapSquareDiv.classList.add("bronze")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("bronze-img")
                mapSquareImg.src = "img/map/bronze.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "2") {
                mapSquareDiv.classList.add("silver")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("silver-img")
                mapSquareImg.src = "img/map/silver.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "3") {
                mapSquareDiv.classList.add("gold")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("gold-img")
                mapSquareImg.src = "img/map/gold.png"
                mapSquareDiv.append(mapSquareImg)
            }  else if (mapSquare === "4") {
                mapSquareDiv.classList.add("ruby")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("ruby-img")
                mapSquareImg.src = "img/map/ruby.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "5") {
                mapSquareDiv.classList.add("amethyst")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("amethyst-img")
                mapSquareImg.src = "img/map/amethyst.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "6") {
                mapSquareDiv.classList.add("diamond")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("diamond-img")
                mapSquareImg.src = "img/map/diamond.png"
                mapSquareDiv.append(mapSquareImg)
            }  else if (mapSquare === "7") {
                mapSquareDiv.classList.add("blkdiamond")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("blkdiamond-img")
                mapSquareImg.src = "img/map/blkdiamond.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "STORE") {
                mapSquareDiv.classList.add("store")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("store-img")
                mapSquareImg.src = "img/map/store.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "EXIT") {
                mapSquareDiv.classList.add("exit")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("exit-img")
                mapSquareImg.src = "img/map/exit.jpg"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "BOMB") {
                mapSquareDiv.classList.add("bomb")
                if (stateObj.remoteBombs === false ){
                    mapSquareDiv.textContent = stateObj.bombTimer
                } else {
                    mapSquareDiv.textContent = "press B to detonate"
                }
            } else if (mapSquare === "fuelRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Fuel ++"
            } else if (mapSquare === "bombDistanceRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Bomb Distance ++"
            } else if (mapSquare === "laserPiercingRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Laser pierces through everything"
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
                mapSquareDiv.textContent = "Enemies deal 25% less damage"
            } else if (mapSquare === "bombsExplodeFasterRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Bombs explode faster"
            } else if (mapSquare === "halfDamageFullFuelRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Take less damage when fuel above 50%"
            } else if (mapSquare === "thornsRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Enemies that damage you die on impact"
            } else if (mapSquare === "bronzeSilverBonusRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Bronze and silver ore is worth more"
            } else if (mapSquare === "remoteBombsRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Trigger bombs remotely"
            } else if (mapSquare === "weaponsPriceRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Cheaper Lasers & Bombs"
            } else if (mapSquare === "killEnemiesHullRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Killing enemies improves hull integrity"
            } else if (mapSquare === "killEnemiesHealRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Killing enemies repairs your hull"
            } else if (mapSquare === "silverHealingRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Mining silver ore heals HP"
            } else if (mapSquare === "bronzeMaxFuelRelic") {
                mapSquareDiv.classList.add("relic")
                mapSquareDiv.textContent = "Mining bronze ore increases maximum fuel"
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
        fewerEnemiesDiv.textContent = "SAFE PASSAGE - The next level has fewer enemies"
        fewerEnemiesDiv.classList.add("next-level-clickable")
        fewerEnemiesDiv.onclick = function () {
            fewerEnemiesChoice(stateObj)
        }

        let moreGoldDiv = document.createElement("Div")
        moreGoldDiv.classList.add("next-level-option")
        moreGoldDiv.textContent = "PROSPECTOR - The next level has more gold ore"
        moreGoldDiv.classList.add("next-level-clickable")
        moreGoldDiv.onclick = function () {
            moreGold(stateObj)
        }

        let cowardDiv = document.createElement("Div")
        cowardDiv.classList.add("next-level-option")
        cowardDiv.textContent = "COWARD - The enemies in the next level do not move, but the level only contains bronze, silver, and gold ore"
        cowardDiv.classList.add("next-level-clickable")
        cowardDiv.onclick = function () {
            cowardChoice(stateObj)
        }

        let dirtEfficiencyDiv = document.createElement("Div")
        dirtEfficiencyDiv.classList.add("next-level-option")
        dirtEfficiencyDiv.textContent = "MINER - PERMANENT upgrade to dirt processing efficiency, letting you drop dirt blocks more often"
        dirtEfficiencyDiv.classList.add("next-level-clickable")
        dirtEfficiencyDiv.onclick = function () {
            dirtEfficiencyChoice(stateObj)
        }

        let pacifistDiv = document.createElement("Div")
        pacifistDiv.classList.add("next-level-option")
        pacifistDiv.textContent = "PACIFIST - After completing the level, gain $200 for every enemy that is still alive"
        pacifistDiv.classList.add("next-level-clickable")
        pacifistDiv.onclick = function () {
            pacifistChoice(stateObj)
        }

        let killEnemiesForMoneyDiv = document.createElement("Div")
        killEnemiesForMoneyDiv.classList.add("next-level-option")
        killEnemiesForMoneyDiv.textContent = "SCRAP METAL - Gain $50 for each enemy killed (next level only)"
        killEnemiesForMoneyDiv.classList.add("next-level-clickable")
        killEnemiesForMoneyDiv.onclick = function () {
            killEnemiesForMoneyChoice(stateObj)
        }

        let shorterDiv = document.createElement("Div")
        shorterDiv.classList.add("next-level-option")
        shorterDiv.textContent = "SPEEDY - The next level is smaller"
        shorterDiv.classList.add("next-level-clickable")
        shorterDiv.onclick = function () {
            shorterLevelChoice(stateObj)
        }

        let longerDiv = document.createElement("Div")
        longerDiv.classList.add("next-level-option")
        longerDiv.textContent = "ODYSSEY - The next level is twice as long, but has two relics"
        longerDiv.classList.add("next-level-clickable")
        longerDiv.onclick = function () {
            longerLevelChoice(stateObj)
        }

        let moreEnemiesDiv = document.createElement("Div")
        moreEnemiesDiv.classList.add("next-level-option")
        moreEnemiesDiv.textContent = "HOSTILE - The next level has more enemies, but a higher chance of rare gems"
        moreEnemiesDiv.classList.add("next-level-clickable")
        moreEnemiesDiv.onclick = function () {
            moreEnemies(stateObj)
        }

        let cheaperShopsDiv = document.createElement("Div")
        cheaperShopsDiv.classList.add("next-level-option")
        cheaperShopsDiv.textContent = "BARGAINER - The next level's shop prices are slightly cheaper"
        cheaperShopsDiv.classList.add("next-level-clickable")
        cheaperShopsDiv.onclick = function () {
            cheaperShopsChoice(stateObj)
        }

        let freeFuelDiv = document.createElement("Div")
        freeFuelDiv.classList.add("next-level-option")
        freeFuelDiv.textContent = "OIL WELL - Fuel is free for the next level"
        freeFuelDiv.classList.add("next-level-clickable")
        freeFuelDiv.onclick = function () {
            freeFuelChoice(stateObj)
        }

        let splinterCellDiv = document.createElement("Div")
        splinterCellDiv.classList.add("next-level-option")
        splinterCellDiv.textContent = "COVERT OPS - Gems are worth double for the next level. Prices revert back to normal after killing an enemy"
        splinterCellDiv.classList.add("next-level-clickable")
        splinterCellDiv.onclick = function () {
            splinterCellChoice(stateObj)
        }

        //12 choices
        let levelChoiceArray = [freeFuelDiv, fewerEnemiesDiv, moreGoldDiv, cowardDiv, dirtEfficiencyDiv, pacifistDiv, shorterDiv, longerDiv, moreEnemiesDiv, cheaperShopsDiv, killEnemiesForMoneyDiv, splinterCellDiv]
        //let levelChoiceArray = [freeFuelDiv, cheaperShopsDiv, moreEnemiesDiv]
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
        fuelText2.textContent = "$" + stateObj.fuelUpgradeCost * (1-stateObj.cheaperShops)
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
        laserText2.textContent = "$" + stateObj.laserCapacityUpgradeCost * (1-stateObj.cheaperShops)
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
          bombText2.textContent = "$" + stateObj.bombCapacityUpgradeCost * (1-stateObj.cheaperShops)
          bombUpgradeDiv.append(bombText1, bombText2)
        if (stateObj.bankedCash >= stateObj.bombCapacityUpgradeCost * (1-stateObj.cheaperShops)) {
            bombUpgradeDiv.classList.add("store-clickable")
            bombUpgradeDiv.onclick = function () {
                bombUpgrade(stateObj)
            }
          }

        let fillFuelDiv = document.createElement("Div")
        fillFuelDiv.setAttribute("id", "store-fuel-div")
        let missingFuel = Math.floor(stateObj.fuelCapacity-stateObj.currentFuel)
        let fuelPrice = Math.ceil((missingFuel * (1+stateObj.currentLevel) - (1-stateObj.cheaperShops))/2)
        if (missingFuel > 0) {
            fillFuelDiv.classList.add("store-option")
            let fillText1 = document.createElement("Div")
            fillText1.classList.add("store-option-text")
            let fillText2 = document.createElement("Div")
            fillText2.classList.add("store-option-text")
            
            if (stateObj.freeFuel === true) {
                fillText1.textContent = "Refill fuel" 
                fillText2.textContent = "Free"
            } else if (stateObj.bankedCash < fuelPrice) {
                fillText1.textContent = "Spend all money on fuel" 
                fillText2.textContent = "$" + stateObj.bankedCash
            } else {
                fillText1.textContent = "Refill fuel" 
                fillText2.textContent = "$" + fuelPrice
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
                repairText1.textContent = "Spend all money on repairs" 
                repairText2.textContent = "$" + Math.ceil(stateObj.bankedCash) * (1-stateObj.cheaperShops)
            } else {
                repairText1.textContent = "Repair hull fully " 
                repairText2.textContent = "$" +  Math.ceil(missingHull*5) * (1-stateObj.cheaperShops)
            }
            repairText2.classList.add("store-option-text")
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
        invText2.textContent = "$" + stateObj.inventoryUpgradeCost * (1-stateObj.cheaperShops)
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
        hullText2.textContent = "$" + stateObj.hullUpgradeCost * (1-stateObj.cheaperShops)
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
            laserText2.textContent = "$" + (stateObj.laserCost * stateObj.weaponsPriceModifier) * (1-stateObj.cheaperShops)
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
            bombText2.textContent = "$" + (stateObj.bombCost * stateObj.weaponsPriceModifier) * (1-stateObj.cheaperShops)
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
        bombDistText2.textContent = "$" + stateObj.bombDistanceUpgradeCost
        upgradeBombDistanceDiv.append(bombDistText1, bombDistText2)
        if (stateObj.bankedCash >= stateObj.bombDistanceUpgradeCost) {
            upgradeBombDistanceDiv.classList.add("store-clickable")
            upgradeBombDistanceDiv.onclick = function () {
                buyBombDistanceUpgrade(stateObj)
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

        storeDiv.append(fillFuelDiv, repairDiv, buyLaserDiv, laserUpgradeDiv, buyBombDiv,  
            bombUpgradeDiv, fuelUpgradeDiv, inventoryUpgradeDiv, hullUpgradeDiv, buyNothingDiv) //upgradeBombDistanceDiv,


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

async function freeFuelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.freeFuel = true;
        newState.choosingNextLevel = false;
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
        newState.isPacifist += 100;
    })
    await changeState(stateObj);
}

async function killEnemiesForMoneyChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.killEnemiesForMoney += 50;
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
            newState.dirtThresholdNeeded -= 10;
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
        newState.dirtToMaxFuel += 5;
    })
    await changeState(stateObj);
    return stateObj
}

async function halfDamageEnemiesRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.enemyDamageModifier -= 0.2;
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
        newState.halfDamageFullFuel *= 0.75;
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

async function bronzeSilverBonusRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bronzeSilverBonus += 1;
    })
    await changeState(stateObj);
    return stateObj
}

async function remoteBombsRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.remoteBombs = true;
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

async function killEnemiesHealRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.killEnemiesForHealing += 20;
    })
    await changeState(stateObj);
    return stateObj
}

async function silverHealingRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.silverHealing += 10;
    })
    await changeState(stateObj);
    return stateObj
}

async function bronzeMaxFuelRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bronzeMaxFuel += 1;
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

async function laserPiercingRelicFunc(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserPiercing = true;
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
    let missingFuel = Math.floor(stateObj.fuelCapacity-stateObj.currentFuel)
    let fuelPrice = Math.ceil((missingFuel * (1+stateObj.currentLevel) - (1-stateObj.cheaperShops))/2)
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingFuel > 0) {
            if (newState.freeFuel === true ) {
                newState.currentFuel = newState.fuelCapacity
            } else {
                if (newState.bankedCash > fuelPrice) {
                    newState.currentFuel += missingFuel;
                    newState.bankedCash -= fuelPrice
                } else {
                    let affordableFuel = Math.ceil(newState.bankedCash/(1+stateObj.currentLevel))
                    newState.currentFuel += affordableFuel;
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
    let missingHull = stateObj.maxHullIntegrity - stateObj.currentHullIntegrity
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingHull > 0) {
            if (newState.bankedCash > (missingHull*5)) {
                newState.currentHullIntegrity = newState.maxHullIntegrity ;
                newState.bankedCash -= Math.ceil(missingHull*5) * (1-stateObj.cheaperShops)
            } else {
                newState.currentHullIntegrity += Math.ceil(newState.bankedCash/5);
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
        newState.laserCapacityUpgradeCost += 1000;
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
        newState.bombCapacityUpgradeCost += 1000;
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
        newState.fuelUpgradeCost += 1000;

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
        newState.hullUpgradeCost += 1500;

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
        } else if (event.key === "b") {
            //if (stateObj.numberLasers > 0) {
                stateObj = await dropBomb(stateObj)
                await changeState(stateObj)
            //}
        }
    }
  });

async function checkForDeath(stateObj) {
    if (state.sellingItems === false && state.inStore === false) {
        if (state.currentFuel < 0) {
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
}

async function doDamage(stateObj, damageAmount, enemyLocation) {
    if (stateObj.inStore === false) {
        stateObj = immer.produce(stateObj, (newState) => {
            if (newState.takingDamage === false) {
                if (newState.thorns === true) {
                    console.log("is this enemy" + newState.gameMap[newState.currentPosition+enemyLocation])
                    let enemyIndex = newState.enemyArray.indexOf(newState.currentPosition + enemyLocation);
                    console.log("enemy index is" + enemyIndex)
                    newState.enemyArray.splice(enemyIndex, 1)
                    newState.enemyMovementArray.splice(enemyIndex, 1)
                    newState.enemiesKilledPerLevel += 1;
                    
                    newState.gameMap[newState.currentPosition+enemyLocation] = "empty"
                    document.querySelectorAll(".enemy-img")[enemyIndex].classList.add("enemy-death")
                }
                if (newState.killEnemiesHullModifier > 0) {
                    newState.currentHullIntegrity += newState.killEnemiesHullModifier
                    newState.maxHullIntegrity += newState.killEnemiesHullModifier
                }
    
                if (newState.killEnemiesForMoney > 0) {
                    newState.bankedCash += newState.killEnemiesForMoney
                }

                if (newState.halfDamageFullFuel < 1 && newState.currentFuel >= (newState.fuelCapacity/2)) {
                    newState.currentHullIntegrity -= Math.floor(((damageAmount * newState.enemyDamageModifier) * 0.5));
                    newState.takingDamage = 5
                } else {
                    newState.currentHullIntegrity -= (damageAmount * newState.enemyDamageModifier);
                    newState.takingDamage = 5
                }
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
    //make sure not on left side
    if (stateObj.currentPosition % screenwidthBlocks !== 0 ) {

        if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
            if (stateObj.gameMap[stateObj.currentPosition-1] !== "STORE") {
                return stateObj
            }
        }
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*4), currentHeight*scrollHeight - (scrollHeight*2))
        stateObj = await calculateMoveChange(stateObj, -1)
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
                newState.currentFuel -= 0.5
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
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)   
    } else if (targetSquare === "1") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.bronzeInventory += 1
                if (stateObj.bronzeMaxFuel > 0) {
                    newState.currentFuel += stateObj.bronzeMaxFuel;
                    newState.fuelCapacity += stateObj.bronzeMaxFuel
                }
            })
        } 
    } else if (targetSquare === "2") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.silverInventory += 1
                if (stateObj.silverHealing > 0) {
                    if (newState.maxHullIntegrity - newState.currentHullIntegrity < newState.silverHealing) {
                        newState.currentHullIntegrity = newState.maxHullIntegrity
                    } else {
                        newState.currentHullIntegrity += newState.silverHealing
                    }
                }
            })
        } 
    } else if (targetSquare === "3") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {newState.goldInventory += 1})
        } 
    } else if (targetSquare === "4") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {newState.rubyInventory += 1})
        } 
    } else if (targetSquare === "5") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {newState.amethystInventory += 1})
        } 
    } else if (targetSquare === "6") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {newState.diamondInventory += 1})
        } 
    } else if (targetSquare === "7") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, true)
        if ((stateObj.currentInventory-1) < stateObj.inventoryMax) { 
            stateObj = await immer.produce(stateObj, (newState) => {newState.blackDiamondInventory += 1})
        } 
    } else if (targetSquare === "empty") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 1)
    } else if (targetSquare === "enemy") {
        stateObj = await doDamage(stateObj, 75)
        stateObj = await handleSquare(stateObj, targetSquareNum, 1)
    } else if (targetSquare === "STORE") {
        stateObj = await sellItemsScreen(stateObj)
    } else if (targetSquare === "EXIT") {
        stateObj = await goToNextLevel(stateObj)
    } else if (targetSquare === "fuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await upgradeFuelRelic(stateObj)  
    } else if (targetSquare === "dirtToMaxFuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await dirtToMaxFuelRelic(stateObj)  
    } else if (targetSquare === "stopRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await stopEnemiesRelic(stateObj)  
    } else if (targetSquare === "halfDamageRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await halfDamageEnemiesRelic(stateObj)  
    } else if (targetSquare === "bombsExplodeFasterRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await bombsExplodeFasterRelic(stateObj)  
    } else if (targetSquare === "halfDamageFullFuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await halfDamageFullFuel(stateObj)  
    } else if (targetSquare === "thornsRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await thornsRelic(stateObj)  
    } else if (targetSquare === "bronzeSilverBonusRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await bronzeSilverBonusRelic(stateObj)  
    } else if (targetSquare === "remoteBombsRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await remoteBombsRelic(stateObj)  
    } else if (targetSquare === "weaponsPriceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await weaponsPriceRelic(stateObj)  
    } else if (targetSquare === "killEnemiesHullRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await killEnemiesHullRelic(stateObj)  
    } else if (targetSquare === "killEnemiesHealRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await killEnemiesHealRelic(stateObj)  
    } else if (targetSquare === "silverHealingRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await silverHealingRelic(stateObj)  
    }  else if (targetSquare === "bronzeMaxFuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await bronzeMaxFuelRelic(stateObj)  
    } else if (targetSquare === "bombDistanceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await upgradeBombDistanceRelic(stateObj)  
    } else if (targetSquare === "laserPiercingRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await laserPiercingRelicFunc(stateObj)  
    } else if (targetSquare === "dirtRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await upgradeDirtBlockRelic(stateObj)  
    }  else if (targetSquare === "moneyForDirtRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2)
        stateObj = await moneyForDirtRelic(stateObj)  
    } else {
        console.log("target square hasn't been handled yet")
    }


    if (targetSquare !== "empty" && targetSquare !== "STORE") {
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

        if (newState.currentInventory === 0) {
            newState.sellingItems = false;
            newState.inStore = true;
        }
    })


    return stateObj
}

async function seeStore(stateObj, sellTotal) {
    console.log("inside seeStore")
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
        newState.sellingItems = false
        newState.inStore = true;
        })
    }
    stateObj = await changeState(stateObj)
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

async function handleSquare(stateObj, squareIndexToMoveTo, fuelToLose, isGem=false) {
    let oldPosition = stateObj.currentPosition
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentFuel -= fuelToLose;
        newState.currentPosition = squareIndexToMoveTo;
        newState.moveToSquare = false;
        newState.inTransition = false;

        if (newState.dirtReserves < (stateObj.dirtThresholdNeeded) && newState.gameMap[squareIndexToMoveTo] !== "empty") {
            newState.dirtReserves += 1;
        }

        if (isGem) {
            if (newState.currentInventory < newState.inventoryMax) {
                newState.currentInventory += 1;
            } else {
                console.log("inventory is full")
            }
        }    
    }) 
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

    for (i=0; i < numberBlocks-1+1; i++) {
        upBlocksToBlast = i;
        if ((detonatePosition-(screenwidthBlocks*(i+1))) < 0) {
            break;
        }
    }

    for (i=0; i < numberBlocks-1+1; i++) {
        downBlocksToBlast = i;
        if ((detonatePosition+(screenwidthBlocks*(i+1))) > (stateObj.gameMap.length-screenwidthBlocks) ) {
            console.log("breaking down")
            break;
        }
    }

    for (i=1; i < leftBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition-i)
    }

    for (i=1; i < rightBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition+i)
    }

    for (i=1; i < upBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition-(screenwidthBlocks*i))
    }

    for (i=1; i < downBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition+(screenwidthBlocks*i))
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
                newState.currentHullIntegrity += newState.killEnemiesHullModifier
                newState.maxHullIntegrity += newState.killEnemiesHullModifier
            }

            if (newState.killEnemiesForMoney > 0) {
                newState.bankedCash += newState.killEnemiesForMoney
            }
            if (newState.killEnemiesForHealing > 0) {
                if (newState.maxHullIntegrity - newState.currentHullIntegrity < newState.killEnemiesForHealing) {
                    newState.currentHullIntegrity = newState.maxHullIntegrity
                } else {
                    newState.currentHullIntegrity += newState.killEnemiesForHealing
                }
            }


            if (newState.splinterCellModifier > 1) {
                newState.splinterCellModifier = 1;
            }
        }
        if (newState.gameMap[blockPosition] !== "STORE" && newState.gameMap[blockPosition] !== "stone") {
            newState.gameMap[blockPosition] = "exploding-1"
            if (isLaser) {
                newState.laserExplosion = true
            }
            // if (isLaser) {
            //     newState.gameMap[blockPosition] = "empty"
            // } else {
            //     newState.gameMap[blockPosition] = "exploding-1"
            // }
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
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.bombLocation === false) {
        stateObj = await immer.produce(stateObj, (newState) => {
            if (newState.bombCurrentTotal > 0) {
                newState.gameMap[stateObj.currentPosition+screenwidthBlocks] = "BOMB";
                newState.bombCurrentTotal -= 1;
                newState.bombLocation = stateObj.currentPosition+screenwidthBlocks
                newState.bombTimer = newState.bombTimerMax;
            }
        })
    } else if (stateObj.bombLocation !== false && stateObj.remoteBombs === true) {
        stateObj = await detonateBomb(stateObj, stateObj.bombLocation)
    }
    return stateObj
}