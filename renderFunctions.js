
//render the top bar with all the stats
function renderTopBarStats(stateObj) {
    let topBarDiv = document.createElement("Div")
    topBarDiv.classList.add("top-stats-bar")

    let scoreLevelDiv = document.createElement("Div")
    scoreLevelDiv.classList.add("score-level-div")
    scoreLevelDiv.classList.add("centered")

    let scoreDiv = document.createElement("Div")
    scoreDiv.classList.add("score-div")
    scoreDiv.textContent = stateObj.score;
    scoreDiv.classList.add("centered")

    let levelDiv = document.createElement("Div")
    levelDiv.classList.add("level-div")
    levelDiv.textContent = "Level " + (stateObj.currentLevel+1);
    levelDiv.classList.add("centered")

    scoreLevelDiv.append(levelDiv, scoreDiv)

    let barsDiv = document.createElement("Div")
    barsDiv.classList.add("bars-div")


    //FUEL
    let fuelDiv = document.createElement("Div")
    fuelDiv.setAttribute("id", "fuel-div");

    fuelText1Div = document.createElement("Div")
    fuelText1Div.classList.add("bars-text-div")
    fuelText1Div.setAttribute("id", "fuel-opening-text");
    fuelText1Div.textContent = "Fuel - "

    fuelText2Div = document.createElement("Div")
    fuelText2Div.classList.add("bars-text-div")
    fuelText2Div.setAttribute("id", "max-fuel-text");
    if (stateObj.fuelTankMax > 150) {
        fuelText2Div.classList.add("upgraded-stat")
    }
    fuelText2Div.textContent = Math.floor(stateObj.currentFuel) + "/" + Math.floor(stateObj.fuelTankMax)

    let emptyFuelBarDiv = document.createElement("Div");
    emptyFuelBarDiv.classList.add("empty-fuel-bar");
    emptyFuelBarDiv.setAttribute("id", "empty-fuel-bar");
    let currentFuelBarDiv = document.createElement("Div");
    currentFuelBarDiv.classList.add("current-fuel-bar");
    currentFuelBarDiv.setAttribute("id", "current-fuel-bar");
    if (stateObj.currentFuel >= stateObj.fuelTankMax/3) {
        currentFuelBarDiv.classList.add("full-fuel-bar");
    } else {
        fuelText1Div.classList.add("inventory-full");
        currentFuelBarDiv.classList.add("low-fuel-bar");
        if (stateObj.inStore === true || stateObj.sellingItems === true) {
            fuelText1Div.classList.add("flash")
            currentFuelBarDiv.classList.add("flash")
        }
    }
    let barLength = 10*(stateObj.currentFuel/stateObj.fuelTankMax)
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
    hullText1Div.textContent = "Hull - "

    hullText2Div = document.createElement("Div")
    hullText2Div.classList.add("bars-text-div")
    hullText2Div.setAttribute("id", "hull-integrity-text");
    if (stateObj.hullArmorMax > 100) {
        hullText2Div.classList.add("upgraded-stat")
    }
    hullText2Div.textContent = Math.floor(stateObj.currentHullArmor) + "/" + Math.floor(stateObj.hullArmorMax)

    let emptyHullBarDiv = document.createElement("Div");
    emptyHullBarDiv.classList.add("empty-hull-bar");
    emptyHullBarDiv.setAttribute("id", "empty-hull-bar");

    let currentHullBarDiv = document.createElement("Div");
    currentHullBarDiv.classList.add("current-hull-bar");
    currentHullBarDiv.setAttribute("id", "current-hull-bar");
    if (stateObj.currentHullArmor > stateObj.hullArmorMax/2) {
        currentHullBarDiv.classList.add("full-hull-bar");
    } else {
        currentHullBarDiv.classList.add("low-hull-bar");
        hullText1Div.classList.add("inventory-full")
        if (stateObj.inStore === true || stateObj.sellingItems === true) {
            hullText1Div.classList.add("flash")
            currentHullBarDiv.classList.add("flash")
        }
    }

    let hullBarLength = 10*(stateObj.currentHullArmor/stateObj.hullArmorMax)
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
    inventoryText1Div.textContent = "Cargo "

    let inventoryText2Div = document.createElement("Div")
    inventoryText2Div = document.createElement("Div")
    inventoryText2Div.classList.add("bars-text-div")
    inventoryText2Div.setAttribute("id", "inventory-size-text");
    if (stateObj.inventoryMax > 12) {
        inventoryText2Div.classList.add("upgraded-stat")
    }
    inventoryText2Div.textContent = "[Press 'i']"
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

    bombDiv.append(currentBombsDiv)

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
        dirtString = dirtString + " - press P to drop"
    }
    if (stateObj.dirtThresholdNeeded < 50 || stateObj.noDirtThreshold === true) {
        dirtDiv.classList.add("upgraded-stat")
    }
    dirtDiv.textContent = dirtString

    topBarDiv.append(scoreLevelDiv, cashDiv, barsDiv, weaponsDiv,dirtDiv)

    for (let i=0; i < stateObj.playerRelicArray.length; i++) {
      let relic = stateObj.playerRelicArray[i];
      let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = relic.imgPath
        weaponPriceRelicDiv.append(weaponImg)
        let idString = "relic-popup-" +i

        weaponPriceRelicDiv.addEventListener('mouseenter', function() {
          const statusText = document.getElementById(idString);
          statusText.style.display = 'block'
        });
        
        weaponPriceRelicDiv.addEventListener('mouseleave', function() {
          const statusText = document.getElementById(idString);
          statusText.style.display = 'none'
        });
  
        let relicTextDiv = document.createElement("Div");
        relicTextDiv.setAttribute("id", idString)
        relicTextDiv.classList.add("none-display")
        relicTextDiv.textContent = relic.text(stateObj)
        weaponPriceRelicDiv.appendChild(relicTextDiv);

        topBarDiv.append(weaponPriceRelicDiv)
    }

    return topBarDiv
}

//store that lets you sell individual rows
function renderSellingItems(stateObj) {
  let storeDiv = document.createElement("Div")
  let bronzeCost = 40
  let silverCost = 100
  let goldCost = 250
  let rubyCost = 600
  let amethystCost = 1500
  let diamondCost = 4000
  let blackDiamondCost = 10000

  storeDiv.classList.add("store-div")

  let sellDiv = document.createElement("Div")
  sellDiv.classList.add("selling-items-div")
  let sellTotal = 0;

  let sellInventoryDiv = document.createElement("Div")
  sellInventoryDiv.classList.add("selling-div")
  if (stateObj.bronzeInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("bronze-sell-row")
      let bronzeSellTotal = ((bronzeCost*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.bronzeInventory)
      inventoryDiv.textContent = "Bronze Ore (" + stateObj.bronzeInventory + "): $" + bronzeSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellBronze(stateObj, bronzeSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += bronzeSellTotal
  }
  if (stateObj.silverInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("silver-sell-row")
      let silverSellTotal = ((silverCost*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.silverInventory)
      inventoryDiv.textContent = "Silver Ore (" + stateObj.silverInventory + "): $" + silverSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellSilver(stateObj, silverSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += silverSellTotal
  }

  if (stateObj.goldInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("gold-sell-row")
      let tempSellTotal = ((goldCost*stateObj.splinterCellModifier)*stateObj.goldInventory)
      inventoryDiv.textContent = "Gold Ore (" + stateObj.goldInventory + "): $" + tempSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellGold(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }

  if (stateObj.rubyInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("ruby-sell-row")
      let tempSellTotal = ((rubyCost*stateObj.splinterCellModifier)*stateObj.rubyInventory)
      inventoryDiv.textContent = "Rubies (" + stateObj.rubyInventory + "): " + tempSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellRuby(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }
  if (stateObj.amethystInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("amethyst-sell-row")
      let tempSellTotal = ((amethystCost*stateObj.splinterCellModifier)*stateObj.amethystInventory)
      inventoryDiv.textContent = "Amethyst (" + stateObj.amethystInventory + "): $" + tempSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellAmethyst(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }
  if (stateObj.diamondInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("diamond-sell-row")
      let tempSellTotal = ((diamondCost*stateObj.splinterCellModifier)*stateObj.diamondInventory)
      inventoryDiv.textContent = "Diamonds (" + stateObj.diamondInventory + "): $" + tempSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellDiamond(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }
  if (stateObj.blackDiamondInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("sell-row")
      inventoryDiv.classList.add("black-diamond-sell-row")
      let tempSellTotal = ((blackDiamondCost*stateObj.splinterCellModifier)*stateObj.blackDiamondInventory)
      inventoryDiv.textContent = "Black Diamonds (" + stateObj.blackDiamondInventory + "): $" + tempSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellBlackDiamond(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }

  
  let rubyPrice = stateObj.floorValues[stateObj.currentLevel].rubyRelicPrice
  let amethystPrice = stateObj.floorValues[stateObj.currentLevel].amethystRelicPrice
  let tradeRelicRubyDiv = document.createElement("Div")
  if (stateObj.storeRelic1) {
    tradeRelicRubyDiv.classList.add("ruby-relic-div")
    tradeRelicRubyDiv.classList.add("column")
    tradeRelicRubyDiv.classList.add("trade-relic-option")

    let tradeDivTitle = document.createElement("Div")
    tradeDivTitle.classList.add("centered")
    tradeDivTitle.textContent = stateObj.storeRelic1.storeText(stateObj)

    let tradeRubyImg = document.createElement("Img")
    tradeRubyImg.classList.add("store-relic-img")
    tradeRubyImg.src = stateObj.storeRelic1.imgPath

    let costRubyDiv = document.createElement("Div")
    costRubyDiv.classList.add("centered")
    let costString = "Costs "

    if (rubyPrice > 0) {
      costString += rubyPrice + " rubies"
      if (stateObj.rubyInventory >= rubyPrice) {
        tradeRelicRubyDiv.classList.add("ruby-relic-hover")
      }
      tradeRelicRubyDiv.onclick = async function () {
        await tradeRelicRuby(stateObj)
      }
    } else if (amethystPrice > 0) {
      costString += amethystPrice + " amethysts"
      if (stateObj.amethystInventory >= amethystPrice) {
        tradeRelicRubyDiv.classList.add("diamond-relic-hover")
        tradeRelicRubyDiv.onclick = async function () {
          await tradeRelicRuby(stateObj)
        }
      }
    }
    costRubyDiv.textContent = costString

    tradeRelicRubyDiv.append(tradeDivTitle, tradeRubyImg, costRubyDiv)
  }

  let oreRelicDiv = document.createElement("Div")
  if (stateObj.storeRelic4) {
    oreRelicDiv.classList.add("ore-relic-div")
    oreRelicDiv.classList.add("relic-option")
    oreRelicDiv.classList.add("trade-relic-option")
    oreRelicDiv.classList.add("column")
    let allowedOreValues = ["1", "2", "3", "4", "stone-5", "stone-6", "stone-7", "5", "6", "7"]
    let currentOres = stateObj.gameMap.filter(str => allowedOreValues.includes(str))
    
    let tradeDiv1 = document.createElement("Div")
    let tradeString = stateObj.storeRelic4.storeText(stateObj)
    tradeDiv1.textContent = tradeString
    tradeDiv1.classList.add("centered")

    let tradeImg = document.createElement('Img')
    tradeImg.classList.add("store-relic-img")
    tradeImg.src = stateObj.storeRelic4.imgPath

    let tradeDiv2 = document.createElement("Div")
    let tradeString2 = "Mine all ore to collect: " + (stateObj.totalLevelOre-currentOres.length) + "/" + stateObj.totalLevelOre
    tradeDiv2.textContent = tradeString2
    tradeDiv2.classList.add("centered")

    if (currentOres.length === 0) {
        oreRelicDiv.classList.add("ore-relic-hover")
        oreRelicDiv.onclick = async function () {
          await buyRelic4Func(stateObj)
        }
    }
    oreRelicDiv.append (tradeDiv1, tradeImg, tradeDiv2)
  }



  let sellButtonDiv = document.createElement("Div")
  if (stateObj.currentInventory > 0) {
    sellButtonDiv.classList.add("sell-button")
    sellButtonDiv.textContent = "Sell Items ($" + sellTotal + ")"
    sellButtonDiv.onclick = async function () {
      document.querySelector(".sell-button").classList.add("mini-emphasis")
      await pause(450)
      await sellItems(stateObj, sellTotal)
    }
  }

  let sellTitleDiv = document.createElement("Div")
  sellTitleDiv.classList.add("sell-title")
  sellTitleDiv.classList.add("centered")
  sellTitleDiv.textContent = "Sell Ore"
  let sellOreDiv = document.createElement("Div")
  sellOreDiv.classList.add("sell-ore-div")
  sellOreDiv.classList.add("column")
  sellOreDiv.append(sellTitleDiv, sellInventoryDiv, sellButtonDiv)
  
  
  

  let seeStoreDiv = document.createElement("Div")
  seeStoreDiv.setAttribute("id", "sell-see-store-div")
  seeStoreDiv.classList.add("return-to-map")
  seeStoreDiv.textContent = "View Store"
  seeStoreDiv.onclick = function () {
      viewStore(stateObj)
  }

  let buyNothingDiv = document.createElement("Div")
  buyNothingDiv.setAttribute("id", "sell-return-map-div")
  buyNothingDiv.classList.add("return-to-map")
  buyNothingDiv.textContent = "Return to Map"
  buyNothingDiv.onclick = function () {
      leaveStore(stateObj)
  }
  
  let redButtonDiv = document.createElement("Div")
  redButtonDiv.classList.add("sell-red-buttons")
  redButtonDiv.classList.add("column")
  redButtonDiv.append(seeStoreDiv, buyNothingDiv)

  let tradeOreDiv = document.createElement("Div")
  tradeOreDiv.classList.add("trade-ore-div")
  tradeOreDiv.classList.add("column")
  let tradeTitle = document.createElement("Div")
  tradeTitle.classList.add("sell-title")
  tradeTitle.classList.add("centered")
  tradeTitle.textContent = "Bounty Board"
  let tradeRelicsDiv = document.createElement("Div")
  tradeRelicsDiv.classList.add("row")
  tradeRelicsDiv.classList.add("trade-relics-div")
  tradeRelicsDiv.append(oreRelicDiv, tradeRelicRubyDiv)

  let storeArr = stateObj.storeUpgradeArray
  for (let i=0; i < storeArr.length; i++) {
    let upgradeDiv = document.createElement("Div")
    upgradeDiv.classList.add("ruby-relic-div")
    upgradeDiv.classList.add("trade-relic-option")
    upgradeDiv.classList.add("column")

    let upgradeTitle = document.createElement("Div")
    upgradeTitle.classList.add("centered")
    upgradeTitle.textContent = "UPGRADE: " + storeArr[i].storeText(stateObj)

    let upgradeImg = document.createElement("Img")
    upgradeImg.classList.add("store-relic-img")
    upgradeImg.src = storeArr[i].imgPath

    let costDiv = document.createElement("Div")
    costDiv.classList.add("centered")

    let costString = "Costs "
    if (rubyPrice > 0) {
      costString += rubyPrice + " rubies"
      if (stateObj.rubyInventory >= rubyPrice) {
        upgradeDiv.classList.add("ruby-relic-hover")
      }
      upgradeDiv.onclick = async function () {
        await upgradeStoreRelic(stateObj, i, rubyPrice, false)
      }
    } else if (amethystPrice > 0) {
      costString += amethystPrice + " amethysts"
      if (stateObj.amethystInventory >= amethystPrice) {
        upgradeDiv.classList.add("diamond-relic-hover")
        upgradeDiv.onclick = async function () {
          await upgradeStoreRelic(stateObj, i, false, amethystPrice)
        }
      }
    }

    costDiv.textContent = costString
    upgradeDiv.append(upgradeTitle, upgradeImg, costString)
    tradeRelicsDiv.append(upgradeDiv)
  }

  tradeOreDiv.append(tradeTitle, tradeRelicsDiv)

  sellDiv.append(sellOreDiv, tradeOreDiv, redButtonDiv)
  storeDiv.append(sellDiv)
  
  return storeDiv
}

//lostTheGame
function lostTheGame() {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("selling-items-div")

  let lostTextDiv = document.createElement("H3")
  lostTextDiv.textContent = state.lossString

  let lostTextDiv1 = document.createElement("H3")
  lostTextDiv1.textContent = "Final Score: " + state.score;

  let lostTextDiv2 = document.createElement("H3")
  lostTextDiv2.textContent = "Press OK to try again"

  lostDiv.append(lostTextDiv, lostTextDiv1, lostTextDiv2)

  let lostButtonDiv = document.createElement("Div")
  lostButtonDiv.classList.add("sell-button")
  lostButtonDiv.textContent = "OK"
  lostButtonDiv.onclick = function() {
      location.reload(true)
  }
  lostDiv.append(lostButtonDiv)
  storeDiv.append(lostDiv)

  return storeDiv
}

function wonTheGame() {
  console.log('triggering won the game')
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("selling-items-div")

  let lostTextDiv = document.createElement("H3")
  lostTextDiv.textContent = "CONGRATULATIONS!!!!"
  let lostTextDiv1 = document.createElement("H3")
  lostTextDiv1.textContent = "You made it to the end of the demo! Great build!"
  let lostTextDiv2 = document.createElement("H3")
  lostTextDiv2.textContent = "Click the button below to try a new run"

  lostDiv.append(lostTextDiv, lostTextDiv1, lostTextDiv2)

  let lostButtonDiv = document.createElement("Div")
  lostButtonDiv.classList.add("sell-button")
  lostButtonDiv.textContent = "New Game"
  lostButtonDiv.onclick = function() {
      location.reload(true)
  }
  lostDiv.append(lostButtonDiv)
  storeDiv.append(lostDiv)

  return storeDiv
}

function chooseRobot(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("choose-robot-div")


  let robot1Div = document.createElement("Div")
  let robot1TextDiv = document.createElement("H3")
  robot1TextDiv.textContent = "Standard Model"
  let robotImageDiv1 = document.createElement("Div")
  robot1Div.classList.add("robot-div")
  let robotImg1 = document.createElement("Img");
  robotImg1.classList.add("robot-img")
  robotImg1.src = "img/map/robot1.png"
  robotImageDiv1.append(robotImg1)

  let robotDescDiv = document.createElement("Div")
  robotDescDiv.textContent = "Medium Fuel Tank"
  let robot1DescDiv = document.createElement("Div")
  robot1DescDiv.textContent = "Medium Hull Armor"
  let robot2DescDiv = document.createElement("Div")
  robot2DescDiv.textContent = "Medium Cargo Bay"

  robot1Div.onclick = function() {
      chooseRobot1(stateObj)
  }
  robot1Div.append(robot1TextDiv, robotImageDiv1, robotDescDiv, robot1DescDiv, robot2DescDiv)

  let robot2Div = document.createElement("Div")
  let robot2TextDiv = document.createElement("H3")
  robot2TextDiv.textContent = "Bronze Mini-Drone"
  let robotImageDiv2 = document.createElement("Div")
  robot2Div.classList.add("robot-div")
  let robotImg2 = document.createElement("Img");
  robotImg2.classList.add("robot-img")
  robotImg2.src = "img/map/robot2.png"
  robotImageDiv2.append(robotImg2)

  let robotDescDiv2 = document.createElement("Div")
  robotDescDiv2.textContent = "Very low Hull Armor"
  let robotDesc1Div2 = document.createElement("Div")
  robotDesc1Div2.textContent = "Hull Armor increases when mining bronze ore"
  robot2Div.onclick = function() {
      chooseRobot2(stateObj)
  }
  robot2Div.append(robot2TextDiv, robotImageDiv2, robotDescDiv2, robotDesc1Div2)

  let robot3Div = document.createElement("Div")
  let robot3TextDiv = document.createElement("H3")
  robot3TextDiv.textContent = "Light Quantum Ship"
  let robotImageDiv3 = document.createElement("Div")
  robot3Div.classList.add("robot-div")
  let robotImg3 = document.createElement("Img");
  robotImg3.classList.add("robot-img")
  robotImg3.src = "img/map/robot3.png"
  robotImageDiv3.append(robotImg3)

  let robotDescDiv3 = document.createElement("Div")
  robotDescDiv3.textContent = "Small fuel tank"
  let robotDesc1Div3 = document.createElement("Div")
  robotDesc1Div3.textContent = "Fuel-powered teleporter"
  robot3Div.onclick = function() {
      chooseRobot3(stateObj)
  }
  robot3Div.append(robot3TextDiv, robotImageDiv3, robotDescDiv3, robotDesc1Div3)

  let robot4Div = document.createElement("Div")
  let robot4TextDiv = document.createElement("H3")
  robot4TextDiv.textContent = "Light Miner"
  let robotImageDiv4 = document.createElement("Div")
  robot4Div.classList.add("robot-div")
  let robotImg4 = document.createElement("Img");
  robotImg4.classList.add("robot-img")
  robotImg4.src = "img/map/robot4.png"
  robotImageDiv4.append(robotImg4)

  let robotDescDiv4 = document.createElement("Div")
  robotDescDiv4.textContent = "Low Hull Armor"
  let robotDesc1Div4 = document.createElement("Div")
  robotDesc1Div4.textContent = "Drop dirt much faster"
  robot4Div.onclick = function() {
      chooseRobot4(stateObj)
  }
  robot4Div.append(robot4TextDiv, robotImageDiv4, robotDescDiv4, robotDesc1Div4)

  let robot5Div = document.createElement("Div")
  let robot5TextDiv = document.createElement("H3")
  robot5TextDiv.textContent = "Scrap Robot"
  let robotImageDiv5 = document.createElement("Div")
  robot5Div.classList.add("robot-div")
  let robotImg5 = document.createElement("Img");
  robotImg5.classList.add("robot-img")
  robotImg5.src = "img/map/robot5.png"
  robotImageDiv5.append(robotImg5)

  let robotDescDiv5 = document.createElement("Div")
  robotDescDiv5.textContent = "Small Cargo Bay"
  let robotDesc1Div5 = document.createElement("Div")
  robotDesc1Div5.textContent = "Gain small amounts of Hull Armor for killing enemies"
  robot5Div.onclick = function() {
      chooseRobot5(stateObj)
  }
  robot5Div.append(robot5TextDiv, robotImageDiv5, robotDescDiv5, robotDesc1Div5)


  lostDiv.append(robot1Div, robot2Div, robot3Div, robot4Div, robot5Div)
  storeDiv.append(lostDiv)

  return storeDiv
}

function renderStart(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("start-div")

  let textDiv2 = document.createElement("H3")
  textDiv2.classList.add("padding-width")
  textDiv2.textContent = "Sell and trade ore at the shop to upgrade your ship"

  let textDiv4 = document.createElement("H3")
  textDiv4.classList.add("padding-width")
  textDiv4.textContent = "View Cargo Bay Inventory with 'I'. You can convert 3 ores to 1 higher quality ore"

  let textDiv7 = document.createElement("H3")
  textDiv7.classList.add("padding-width")
  textDiv7.textContent = "Gems in stone must be hit with lasers ('L' key) or bombs ('B' key) before they can be mined"

  let textDiv6 = document.createElement("H3")
  textDiv6.classList.add("padding-width")
  textDiv6.textContent = "Press 'H' to view this screen again"

  lostDiv.append(textDiv2, textDiv4, textDiv7, textDiv6)

  let startButton = document.createElement("Div")
  startButton.classList.add("sell-button")
  startButton.textContent = "OK"
  startButton.onclick = function() {
      startTheGame(stateObj)
  }
  lostDiv.append(startButton)
  storeDiv.append(lostDiv)

  return storeDiv
}
//convert Inventory
function renderInventory(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let sellDiv = document.createElement("Div")
  sellDiv.classList.add("viewing-inv-div")

  let sellInventoryDiv = document.createElement("Div")
  sellInventoryDiv.classList.add("selling-div")
  sellInventoryDiv.classList.add("centered")

  let maxTextDiv = document.createElement("Div")
  maxTextDiv.textContent = "Current Capacity: " + stateObj.currentInventory + "/" + stateObj.inventoryMax
  sellInventoryDiv.append(maxTextDiv)

  if (stateObj.bronzeInventory > 0) {
      let inventoryDiv = document.createElement("Div")
      inventoryDiv.classList.add("inv-row")
      inventoryDiv.classList.add("bronze-convert-row")
      let textString = "Bronze Ore (" + stateObj.bronzeInventory + ")"
      if (stateObj.bronzeInventory >= 3) {
        inventoryDiv.classList.add("can-convert")
        textString += " [click to convert 3 to 1 Silver]"
        inventoryDiv.onclick = async function () {
          await convertBronze(stateObj)
        }
      }
      inventoryDiv.textContent = textString
      sellInventoryDiv.append(inventoryDiv)
  }

  if (stateObj.silverInventory > 0) {
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.classList.add("inv-row")
    inventoryDiv.classList.add("silver-convert-row")
    let textString = "Silver Ore (" + stateObj.silverInventory + ")"
    if (stateObj.silverInventory >= 3) {
      inventoryDiv.classList.add("can-convert")
      textString += " [click to convert 3 to 1 Gold]"
      inventoryDiv.onclick = async function () {
        await convertSilver(stateObj)
      }
    }
    inventoryDiv.textContent = textString
    sellInventoryDiv.append(inventoryDiv)
}

if (stateObj.goldInventory > 0) {
  let inventoryDiv = document.createElement("Div")
  inventoryDiv.classList.add("inv-row")
  inventoryDiv.classList.add("gold-convert-row")
  let textString = "Gold Ore (" + stateObj.goldInventory + ")"
  if (stateObj.efficientGoldConverter === true) {
    if (stateObj.goldInventory >= 2) {
      inventoryDiv.classList.add("can-convert")
      textString += " [click to convert 2 to 1 Ruby]"
      inventoryDiv.onclick = async function () {
        await convertGold(stateObj)
      }
    }
  } else {
    if (stateObj.goldInventory >= 3) {
      inventoryDiv.classList.add("can-convert")
      textString += " [click to convert 3 to 1 Ruby]"
      inventoryDiv.onclick = async function () {
        await convertGold(stateObj)
      }
    }
  }
  inventoryDiv.textContent = textString
  sellInventoryDiv.append(inventoryDiv)
}

if (stateObj.rubyInventory > 0) {
  let inventoryDiv = document.createElement("Div")
  inventoryDiv.classList.add("inv-row")
  inventoryDiv.classList.add("ruby-convert-row")
  let textString = "Ruby Ore (" + stateObj.rubyInventory + ")"
  if (stateObj.rubyInventory >= 3) {
    inventoryDiv.classList.add("can-convert")
    textString += " [click to convert 3 to 1 Amethyst]"
    inventoryDiv.onclick = async function () {
      await convertRuby(stateObj)
    }
  }
  inventoryDiv.textContent = textString
  sellInventoryDiv.append(inventoryDiv)
}

if (stateObj.amethystInventory > 0) {
  let inventoryDiv = document.createElement("Div")
  inventoryDiv.classList.add("inv-row")
  inventoryDiv.classList.add("amethyst-convert-row")
  let textString = "Amethyst Ore (" + stateObj.amethystInventory + ")"
  if (stateObj.amethystInventory >= 3) {
    inventoryDiv.classList.add("can-convert")
    textString += " [click to convert 3 to 1 Diamond]"
    inventoryDiv.onclick = async function () {
      await convertAmethyst(stateObj)
    }
  }
  inventoryDiv.textContent = textString
  sellInventoryDiv.append(inventoryDiv)
}

if (stateObj.diamondInventory > 0) {
  let inventoryDiv = document.createElement("Div")
  inventoryDiv.classList.add("inv-row")
  inventoryDiv.classList.add("diamond-convert-row")
  let textString = "Diamond Ore (" + stateObj.diamondInventory + ")"
  if (stateObj.diamondInventory >= 3) {
    inventoryDiv.classList.add("can-convert")
    textString += " [click to convert 3 to 1 Black Diamond]"
    inventoryDiv.onclick = async function () {
      await convertDiamond(stateObj)
    }
  }
  inventoryDiv.textContent = textString
  sellInventoryDiv.append(inventoryDiv)
}

if (stateObj.blackDiamondInventory > 0) {
  let inventoryDiv = document.createElement("Div")
  inventoryDiv.classList.add("inv-row")
  inventoryDiv.classList.add("black-diamond-convert-row")
  let textString = "Black Diamond Ore (" + stateObj.blackDiamondInventory + ")"
  inventoryDiv.textContent = textString
  sellInventoryDiv.append(inventoryDiv)
}

  let buyNothingDiv = document.createElement("Div")
  buyNothingDiv.setAttribute("id", "sell-return-map-div")
  buyNothingDiv.classList.add("return-to-map")
  buyNothingDiv.textContent = "Return to Map"
  buyNothingDiv.onclick = function () {
      leaveStore(stateObj)
  }

  sellDiv.append(sellInventoryDiv,  buyNothingDiv)
  storeDiv.append(sellDiv)
  
  return storeDiv
}

//show the full map
function renderMap(stateObj) {
  let mapDiv = document.createElement("Div");
  mapDiv.classList.add("map-div");
  //picking the 
  let screenwidthBlocks = stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks
  let currentFloor = Math.floor(stateObj.currentPosition / screenwidthBlocks)
  //starting floor position is 0 if you're not at least 4 floors deep
  let startingFloor = false;
  if (currentFloor < 4) {
    startingFloor = 0
  } else {
    if (currentFloor > (stateObj.floorValues[stateObj.currentLevel].numberRows - 4)) {
      startingFloor = stateObj.floorValues[stateObj.currentLevel].numberRows - 5
    } else {
      startingFloor = currentFloor - 4
    }
  }
  let endingFloor = false
  if (startingFloor === 0) {
    //only show 8 floors at once
    endingFloor = 9
  } else {
    //if you're near the end of the level, the ending floor range is the end of the level
    if (currentFloor > (stateObj.floorValues[stateObj.currentLevel].numberRows-4)) {
      endingFloor = stateObj.floorValues[stateObj.currentLevel].numberRows+6
    } else {
      endingFloor = currentFloor+4
    }
  }
  let currentPosition = stateObj.currentPosition - (currentFloor*(screenwidthBlocks))
  let startingPosition = false
  if (currentPosition < 4) {
    startingPosition = 0
  } else {
    if (currentPosition > (screenwidthBlocks-5)) {
      startingPosition = screenwidthBlocks - 9
    } else {
      startingPosition = currentPosition - 4
    }
  }
  let endingPosition = false
  if (startingPosition === 0) {
    endingPosition = 9
  } else {
    endingPosition = (currentPosition > (screenwidthBlocks-5))
    ? screenwidthBlocks : currentPosition + 5
  }
  // console.log("current floor is " + currentFloor)
  // console.log("starting floor is " + startingFloor)
  // console.log("ending floor is " + endingFloor)
  // console.log("current position is " + currentPosition)
  // console.log("starting position is " + startingPosition)
  // console.log("ending position is " + endingPosition)
  

  stateObj.gameMap.forEach(async function (mapSquare, squareIndex) {
    let currentMapFloor = Math.floor(squareIndex / screenwidthBlocks)
    let inFloorRange = ((currentMapFloor >= startingFloor) && (currentMapFloor < endingFloor))
    let currentMapPosition = squareIndex - (currentMapFloor*(screenwidthBlocks))
    let inPositionRange = ((currentMapPosition >= startingPosition) && (currentMapPosition < endingPosition))

    if (inFloorRange && inPositionRange) {
      let mapSquareDiv = document.createElement("Div");
      mapSquareDiv.classList.add("map-square");

      if (stateObj.currentPosition === squareIndex) {
          mapSquareDiv.classList.add("player-here")
          let mapSquareImg = document.createElement("Img");
          if ((stateObj.currentFuel < stateObj.fuelTankMax/3)) {
              mapSquareImg.classList.add("player-img-low-fuel")
          } else if (stateObj.currentHullArmor <= (stateObj.hullArmorMax/2)) {
              mapSquareImg.classList.add("player-img-damaged")
          } else if (stateObj.currentInventory === stateObj.inventoryMax) {
              mapSquareImg.classList.add("player-img-full")
          } else {
              mapSquareImg.classList.add("player-img")
          }
          if (stateObj.takingDamage > 3) {
            mapSquareImg.classList.add("taking-damage-1")
          } else if (stateObj.takingDamage > 0) {
            mapSquareImg.classList.add("taking-damage-2")
          }
          mapSquareImg.src = stateObj.robotPath
          mapSquareDiv.append(mapSquareImg)
      }
      if (mapSquare === "stone") {
          mapSquareDiv.classList.add("stone")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-img")
          mapSquareImg.src = "img/map/stone.png"
          mapSquareDiv.append(mapSquareImg)
      }
      
      if (mapSquare === "0" || mapSquare === "magnetic-0") {
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
      }  else if (mapSquare === "4" || mapSquare==="magnetic-4") {
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
      } else if (mapSquare === "stone-5") {
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-amethyst-img")
          mapSquareImg.src = "img/map/stone-amethyst.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "6") {
          mapSquareDiv.classList.add("diamond")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("diamond-img")
          mapSquareImg.src = "img/map/diamond.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "stone-6") {
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-diamond-img")
          mapSquareImg.src = "img/map/stone-diamond.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "7") {
          mapSquareDiv.classList.add("blkdiamond")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("blkdiamond-img")
          mapSquareImg.src = "img/map/blkdiamond.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "stone-7") {
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-blkdiamond-img")
          mapSquareImg.src = "img/map/stone-blkdiamond.png"
          mapSquareDiv.append(mapSquareImg)
      }  else if (mapSquare === "STORE") {
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
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("bomb-img")
          mapSquareImg.src = "img/map/bomb.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "relic1") {
          mapSquareDiv.classList.add("relic")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("relic-img")
          mapSquareImg.src = stateObj.mapRelic1.imgPath
          mapSquareDiv.append(mapSquareImg)
      }  else if (mapSquare === "relic2") {
        mapSquareDiv.classList.add("relic")
        let mapSquareImg = document.createElement("Img");
        mapSquareImg.classList.add("relic-img")
        mapSquareImg.src = stateObj.mapRelic2.imgPath
        mapSquareDiv.append(mapSquareImg)
    } else if (mapSquare === "teleporter") {
      let mapSquareImg = document.createElement("Img");
      mapSquareImg.classList.add("relic-img")
      mapSquareImg.src = "img/relics/teleporter.png"
      mapSquareDiv.append(mapSquareImg)
    } else if (mapSquare === "crate") {
      let mapSquareImg = document.createElement("Img");
      mapSquareImg.classList.add("crate-img")
      mapSquareImg.src = "img/map/crate.png"
      mapSquareDiv.append(mapSquareImg)
    } 

    if (squareIndex !== stateObj.currentPosition) {
      //mapSquareDiv.textContent = squareIndex
    }
    mapSquareDiv.classList.add("centered")
    
      mapDiv.append(mapSquareDiv)
  }
  })

  return mapDiv
}

function renderNextLevelChoice(stateObj) {
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
  pacifistDiv.textContent = "PACIFIST - After completing this next level, gain $50 for every enemy that is still alive"
  pacifistDiv.classList.add("next-level-clickable")
  pacifistDiv.onclick = function () {
      pacifistChoice(stateObj)
  }

  let killEnemiesForMoneyDiv = document.createElement("Div")
  killEnemiesForMoneyDiv.classList.add("next-level-option")
  killEnemiesForMoneyDiv.textContent = "SCRAP METAL - Gain $100 for each enemy killed (next level only)"
  killEnemiesForMoneyDiv.classList.add("next-level-clickable")
  killEnemiesForMoneyDiv.onclick = function () {
      killEnemiesForMoneyChoice(stateObj)
  }

  let shorterDiv = document.createElement("Div")
  shorterDiv.classList.add("next-level-option")
  shorterDiv.textContent = "SPEEDY - The next level is smaller, and has fewer enemies"
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
  freeFuelDiv.textContent = "OIL WELL - Fuel is free for the next level. The level is also shorter"
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

  let teleporterChoiceDiv = document.createElement("Div")
  teleporterChoiceDiv.classList.add("next-level-option")
  teleporterChoiceDiv.textContent = "TELEPORTER - Next level contains a teleporter that returns you to the store"
  teleporterChoiceDiv.classList.add("next-level-clickable")
  teleporterChoiceDiv.onclick = function () {
    teleporterChoice(stateObj)
  }

  let noEmptySquaresDiv = document.createElement("Div")
  noEmptySquaresDiv.classList.add("next-level-option")
  noEmptySquaresDiv.textContent = "EXTRA BRONZE - Next level has bronze ore instead of any empty squares"
  noEmptySquaresDiv.classList.add("next-level-clickable")
  noEmptySquaresDiv.onclick = function () {
    noEmptySquaresChoice(stateObj)
  }

  //14 choices
  let levelChoiceArray = [freeFuelDiv, fewerEnemiesDiv, moreGoldDiv, cowardDiv, dirtEfficiencyDiv, 
    noEmptySquaresDiv, pacifistDiv, shorterDiv, longerDiv, moreEnemiesDiv, 
    cheaperShopsDiv, killEnemiesForMoneyDiv, splinterCellDiv, teleporterChoiceDiv]
  //levelChoiceArray = [freeFuelDiv, noEmptySquaresDiv, teleporterChoiceDiv]
  let chosenLevels = []
  for (i = 0; i < 3; i++) {
      let chosenLevel = Math.floor(Math.random() * levelChoiceArray.length);
      chosenLevels.push(levelChoiceArray[chosenLevel])
      levelChoiceArray.splice(chosenLevel, 1)
  }

  storeDiv.append(chosenLevels[0], chosenLevels[1], chosenLevels[2])
  return storeDiv
}

function renderStore(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let laserUpgradeDiv = document.createElement("Div")
  laserUpgradeDiv.classList.add("store-option")
  laserUpgradeDiv.setAttribute("id", "store-laser-capacity-upgrade-div")
  let laserText1 = document.createElement("Div")
  laserText1.classList.add("store-option-text")
  let laserText2 = document.createElement("Div")
  laserText2.classList.add("store-option-text")
  laserText1.textContent = "Laser Capacity Upgrade" 
  laserText2.textContent = "$" + stateObj.laserCapacityUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)
  laserUpgradeDiv.append(laserText1, laserText2)
  if (stateObj.bankedCash >= stateObj.laserCapacityUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)) {
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
    bombText2.textContent = "$" + stateObj.bombCapacityUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)
    bombUpgradeDiv.append(bombText1, bombText2)
  if (stateObj.bankedCash >= stateObj.bombCapacityUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)) {
      bombUpgradeDiv.classList.add("store-clickable")
      bombUpgradeDiv.onclick = function () {
          bombUpgrade(stateObj)
      }
    }

  let fillFuelDiv = document.createElement("Div")
  fillFuelDiv.setAttribute("id", "store-fuel-div")
  let missingFuel = Math.floor(stateObj.fuelTankMax-stateObj.currentFuel)
  let fuelPrice = Math.ceil((missingFuel * Math.floor((2+stateObj.currentLevel)*0.5) - (1-stateObj.cheaperShops))/2)
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
  let missingHull = stateObj.hullArmorMax-stateObj.currentHullArmor
  if (missingHull > 0) {
      repairDiv.classList.add("store-option")
      let repairText1 = document.createElement("Div")
      repairText1.classList.add("store-option-text")
      let repairText2 = document.createElement("Div")
      repairText1.classList.add("store-option-text")
      
      if ((missingHull*5) * (stateObj.currentLevel+1) > (stateObj.bankedCash * (1-stateObj.cheaperShops))) {
          repairText1.textContent = "Spend all money on repairing Hull Armor" 
          repairText2.textContent = "$" + Math.ceil(stateObj.bankedCash)* (1-stateObj.cheaperShops)
      } else {
          repairText1.textContent = "Repair Hull Armor fully " 
          repairText2.textContent = "$" +  Math.ceil(missingHull*5  ) * (1-stateObj.cheaperShops)
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
  invText1.textContent = "Cargo Bay Upgrade" 
  invText2.textContent = "$" + stateObj.inventoryUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)
  inventoryUpgradeDiv.append(invText1, invText2)
  if (stateObj.bankedCash >= stateObj.inventoryUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)) {
      inventoryUpgradeDiv.classList.add("store-clickable")
      inventoryUpgradeDiv.onclick = function () {
          upgradeInventory(stateObj)
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
      laserText1.textContent = "Buy a laser [" + stateObj.numberLasers + "/" + stateObj.laserCapacity + "]" 
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
      bombText1.textContent = "Buy a bomb [" + stateObj.bombCurrentTotal + "/" + stateObj.bombCapacity + "]" 
      let purchaseCostBomb = Math.floor(stateObj.bombCost * stateObj.weaponsPriceModifier * (1-stateObj.cheaperShops))
      bombText2.textContent = "$" + purchaseCostBomb
      buyBombDiv.append(bombText1, bombText2)
      buyBombDiv.onclick = function () {
      }
      if (stateObj.bankedCash >= purchaseCostBomb) {
          buyBombDiv.classList.add("store-clickable")
          buyBombDiv.onclick = function () {
              buyBomb(stateObj, purchaseCostBomb)
          }
      }
  }

  let fuelUpgradeDiv = document.createElement("Div")
        fuelUpgradeDiv.setAttribute("id", "store-fuel-upgrade-div")
        fuelUpgradeDiv.classList.add("store-option")
        let fuelText1 = document.createElement("Div")
        fuelText1.classList.add("store-option-text")
        let fuelText2 = document.createElement("Div")
        fuelText2.classList.add("store-option-text")
        fuelText1.textContent = "Fuel Tank Upgrade" 
        let purchaseCost = Math.floor(stateObj.fuelUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops))
        fuelText2.textContent = "$" + purchaseCost
        fuelUpgradeDiv.append(fuelText1, fuelText2)
        if (stateObj.bankedCash >= purchaseCost) {
            fuelUpgradeDiv.classList.add("store-clickable")
            fuelUpgradeDiv.onclick = function () {
                upgradeFuel(stateObj, purchaseCost)
            }
        }

        let hullUpgradeDiv = document.createElement("Div")
        hullUpgradeDiv.setAttribute("id", "store-hull-upgrade-div")
        hullUpgradeDiv.classList.add("store-option")
        let hullText1 = document.createElement("Div")
        hullText1.classList.add("store-option-text")
        let hullText2 = document.createElement("Div")
        hullText2.classList.add("store-option-text")
        hullText1.textContent = "Hull Armor Upgrade" 
        let hullPrice = stateObj.hullUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops)
        hullText2.textContent = "$" + hullPrice
        hullUpgradeDiv.append(hullText1, hullText2)
        if (stateObj.bankedCash >= hullPrice) {
            hullUpgradeDiv.classList.add("store-clickable")
            hullUpgradeDiv.onclick = function () {
                upgradeHull(stateObj, hullPrice)
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
  let purchaseCostBombUp = Math.floor(stateObj.bombDistanceUpgradeCost * (stateObj.currentLevel+1) * (1-stateObj.cheaperShops))
  bombDistText2.textContent = "$" + purchaseCostBombUp
  upgradeBombDistanceDiv.append(bombDistText1, bombDistText2)
  if (stateObj.bankedCash >= purchaseCostBombUp) {
      upgradeBombDistanceDiv.classList.add("store-clickable")
      upgradeBombDistanceDiv.onclick = function () {
          buyBombDistanceUpgrade(stateObj)
      }
  }

  let buyRelic1Div = document.createElement("Div")
  if (stateObj.storeRelic3 !== false) {
    buyRelic1Div.setAttribute("id", "store-relic-3-div")
    buyRelic1Div.classList.add("store-option")
    buyRelic1Div.classList.add("relic-option")
      let relicText1 = document.createElement("Div")
      relicText1.classList.add("store-option-text")
      let relicText2 = document.createElement("Div")
      relicText2.classList.add("store-option-text")
      relicText1.textContent = stateObj.storeRelic3.storeText(stateObj)
      let relicPrice = Math.ceil(stateObj.floorValues[stateObj.currentLevel].storeRelicPrice * (1-stateObj.cheaperShops))
      relicText2.textContent = "$" + relicPrice
      let relicImg = document.createElement("Img");
      relicImg.classList.add("store-relic-img")
      relicImg.src = stateObj.storeRelic3.imgPath
      buyRelic1Div.append(relicText1, relicImg, relicText2)
      if (stateObj.bankedCash >= relicPrice) {
          buyRelic1Div.classList.add("store-clickable")
          buyRelic1Div.onclick = function () {
              buyRelic3Func(stateObj, relicPrice)
          }
      }
  }

  let buyRelic2Div = document.createElement("Div")
  if (stateObj.storeRelic2 !== false) {
      buyRelic2Div.setAttribute("id", "store-relic-2-div")
      buyRelic2Div.classList.add("store-option")
      buyRelic2Div.classList.add("relic-option")
      let relicText1 = document.createElement("Div")
      relicText1.classList.add("store-option-text")
      let relicText2 = document.createElement("Div")
      relicText2.classList.add("store-option-text")
      relicText1.textContent = stateObj.storeRelic2.storeText(stateObj)
      let relicPrice2 = Math.ceil(stateObj.floorValues[stateObj.currentLevel].storeRelicPrice * (1-stateObj.cheaperShops))
      relicText2.textContent = "$" + relicPrice2
      let relicImg = document.createElement("Img");
      relicImg.classList.add("store-relic-img")
      relicImg.src = stateObj.storeRelic2.imgPath
      buyRelic2Div.append(relicText1, relicImg, relicText2)
      if (stateObj.bankedCash >= relicPrice2) {
          buyRelic2Div.classList.add("store-clickable")
          buyRelic2Div.onclick = function () {
              buyRelic2Func(stateObj, relicPrice2)
          }
      }
  }

  let buyNothingDiv = document.createElement("Div")
  document.createElement("Div")
  buyNothingDiv.setAttribute("id", "store-return-map-div")
  buyNothingDiv.classList.add("return-to-map")
  buyNothingDiv.classList.add("centered")
  buyNothingDiv.textContent = "Return to Map"
  buyNothingDiv.onclick = function () {
      leaveStore(stateObj)
  }

  let returnSellDiv = document.createElement("Div")
  document.createElement("Div")
  returnSellDiv.setAttribute("id", "store-return-selling-div")
  returnSellDiv.classList.add("return-to-map")
  returnSellDiv.classList.add("centered")
  returnSellDiv.textContent = "Sell/Trade Ore"
  returnSellDiv.onclick = function () {
      seeSellItems(stateObj)
  }

  let fuelSubDiv = document.createElement("Div")
  fuelSubDiv.classList.add("store-sub-div")
  let fuelTitle = document.createElement("Div")
  fuelTitle.classList.add("row")
  fuelTitle.classList.add("store-title")
  let fuelSubTitle = document.createElement("Div")
  let fuelImgDiv = document.createElement("Div")
  fuelImgDiv.classList.add("centered")
  fuelImgDiv.classList.add("store-sub-img")
  let fuelImg = document.createElement("Img");
  fuelImg.src = "img/fueltank.png"
  fuelImg.classList.add("max-100")
  fuelImgDiv.append(fuelImg)
  fuelSubTitle.textContent = "Fueling Station"
  fuelSubTitle.classList.add("centered")
  fuelTitle.append(fuelSubTitle, fuelImgDiv)
  fuelSubDiv.append(fuelTitle, fillFuelDiv, fuelUpgradeDiv)

  let hullSubDiv = document.createElement("Div")
  hullSubDiv.classList.add("store-sub-div")
  let hullTitle = document.createElement("Div")
  hullTitle.classList.add("row")
  hullTitle.classList.add("store-title")
  let hullSubTitle = document.createElement("Div")
  let hullImgDiv = document.createElement("Div")
  hullImgDiv.classList.add("centered")
  hullImgDiv.classList.add("store-sub-img")
  let hullImg = document.createElement("Img");
  hullImg.src = "img/redshield.png"
  hullImg.classList.add("max-100")
  hullImgDiv.append(hullImg)
  hullSubTitle.textContent = "Armor Station"
  hullSubTitle.classList.add("centered")
  hullTitle.append(hullSubTitle, hullImgDiv)
  hullSubDiv.append(hullTitle, repairDiv, hullUpgradeDiv, inventoryUpgradeDiv)

  let weaponsSubDiv = document.createElement("Div")
  weaponsSubDiv.classList.add("store-sub-div")
  let weaponsTitle = document.createElement("Div")
  weaponsTitle.classList.add("row")
  weaponsTitle.classList.add("store-title")
  let weaponSubTitle = document.createElement("Div")
  let weaponImgDiv = document.createElement("Div")
  weaponImgDiv.classList.add("centered")
  weaponImgDiv.classList.add("store-sub-img")
  let weaponImg = document.createElement("Img");
  weaponImg.src = "img/missile.png"
  weaponImg.classList.add("max-100")
  weaponImgDiv.append(weaponImg)
  weaponSubTitle.textContent = "Weapons Depot"
  weaponSubTitle.classList.add("centered")
  weaponsTitle.append(weaponSubTitle, weaponImgDiv)
  weaponsSubDiv.append(weaponsTitle, buyLaserDiv, laserUpgradeDiv, buyBombDiv, bombUpgradeDiv)

  let relicsSubDiv = document.createElement("Div")
  relicsSubDiv.classList.add("store-sub-div")
  let relicTitle = document.createElement("Div")
  relicTitle.classList.add("row")
  relicTitle.classList.add("store-title")
  relicTitle.textContent = "Relic Shop"
  relicsSubDiv.append(relicTitle, buyRelic1Div, buyRelic2Div)

  
  

  storeDiv.append(fuelSubDiv, hullSubDiv, weaponsSubDiv, relicsSubDiv, returnSellDiv, buyNothingDiv)

  return storeDiv
}

function renderRouletteChoices(stateObj) {
  
  let commonArray = [...commonRouletteChoices]
  let uncommonArray = [...uncommonRouletteChoices]
  let rareArray = [...rareRouletteChoices]
  let legendaryArray = [...legendaryRouletteChoices]

  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let roulette1Rarity = Math.random()
  let roulette2Rarity = Math.random()
  let roulette3Rarity = Math.random()
  let roulette1Array = false
  let roulette2Array = false
  let roulette3Array = false
  let legendThreshold = 0.95
  let rareThreshold = 0.9
  let uncommonThreshold = 0.75
  if (roulette1Rarity > legendThreshold) {roulette1Array = legendaryArray} 
  else if (roulette1Rarity > rareThreshold) {roulette1Array = rareArray} 
  else if (roulette1Rarity > uncommonThreshold) {roulette1Array = uncommonArray} else {roulette1Array = commonArray}

  if (roulette2Rarity > legendThreshold) {roulette2Array = legendaryArray} 
  else if (roulette2Rarity > rareThreshold) {roulette2Array = rareArray} 
  else if (roulette2Rarity > uncommonThreshold) {roulette2Array = uncommonArray} else {roulette2Array = commonArray}

  if (roulette3Rarity > legendThreshold) {roulette3Array = legendaryArray} 
  else if (roulette3Rarity > rareThreshold) {roulette3Array = rareArray} 
  else if (roulette3Rarity > uncommonThreshold) {roulette3Array = uncommonArray} else {roulette3Array = commonArray}



  let rouletteNum1 = Math.floor(Math.random() * roulette1Array.length)
  let rouletteChoice1 = roulette1Array[rouletteNum1]
  roulette1Array.splice(rouletteNum1, 1)


  let choice1Div = document.createElement("Div")
  choice1Div.classList.add("next-level-option")
  choice1Div.textContent = rouletteChoice1.name + "-" + rouletteChoice1.text
  choice1Div.classList.add("next-level-clickable")
  choice1Div.onclick = function () {
      rouletteChoice1.rouletteFunc(stateObj, rouletteChoice1.value)
  }

  let rouletteNum2 = Math.floor(Math.random() * roulette2Array.length)
  let rouletteChoice2 = roulette2Array[rouletteNum2]
  roulette2Array.splice(rouletteNum2, 1)

  let choice2Div = document.createElement("Div")
  choice2Div.classList.add("next-level-option")
  choice2Div.textContent = rouletteChoice2.name + "-" + rouletteChoice2.text
  choice2Div.classList.add("next-level-clickable")
  choice2Div.onclick = function () {
      rouletteChoice2.rouletteFunc(stateObj, rouletteChoice2.value)
  }

  let rouletteNum3 = Math.floor(Math.random() * roulette3Array.length)
  let rouletteChoice3 = roulette3Array[rouletteNum3]
  roulette3Array.splice(rouletteNum3, 1)

  let choice3Div = document.createElement("Div")
  choice3Div.classList.add("next-level-option")
  choice3Div.textContent = rouletteChoice3.name + "-" + rouletteChoice3.text
  choice3Div.classList.add("next-level-clickable")
  choice3Div.onclick = function () {
      rouletteChoice3.rouletteFunc(stateObj, rouletteChoice3.value)
  }

  storeDiv.append(choice1Div, choice2Div, choice3Div)
  return storeDiv
}
  
