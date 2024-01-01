
//TopBarStats
function renderTopBarStats(stateObj) {
    let topBarDiv = document.createElement("Div")
    topBarDiv.classList.add("top-stats-bar")

    let levelDiv = document.createElement("Div")
    levelDiv.classList.add("level-div")
    levelDiv.textContent = "Level " + (stateObj.currentLevel+1);
    levelDiv.classList.add("centered")
    levelDiv.onclick = function() {
        console.log("clicked level div")
    }

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
    fuelText2Div.textContent = stateObj.currentFuel + "/" + stateObj.fuelCapacity

    let emptyFuelBarDiv = document.createElement("Div");
    emptyFuelBarDiv.classList.add("empty-fuel-bar");
    emptyFuelBarDiv.setAttribute("id", "empty-fuel-bar");
    let currentFuelBarDiv = document.createElement("Div");
    currentFuelBarDiv.classList.add("current-fuel-bar");
    currentFuelBarDiv.setAttribute("id", "current-fuel-bar");
    if (stateObj.currentFuel >= stateObj.fuelCapacity/3) {
        currentFuelBarDiv.classList.add("full-fuel-bar");
    } else {
        fuelText1Div.classList.add("inventory-full");
        currentFuelBarDiv.classList.add("low-fuel-bar");
        if (stateObj.inStore === true || stateObj.sellingItems === true) {
            fuelText1Div.classList.add("flash")
            currentFuelBarDiv.classList.add("flash")
        }
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
    hullText2Div.textContent = stateObj.currentHullIntegrity + "/" + stateObj.maxHullIntegrity

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
        hullText1Div.classList.add("inventory-full")
        if (stateObj.inStore === true || stateObj.sellingItems === true) {
            hullText1Div.classList.add("flash")
            currentHullBarDiv.classList.add("flash")
        }
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
          relicTextDiv.textContent = "Enemies who damage you die afterwards"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.remoteBombs === true) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/remotebomb.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#remote-bomb-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#remote-bomb-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "remote-bomb-popup")
          relicTextDiv.classList.add("none-display")
          relicTextDiv.textContent = "Can detonate bombs remotely by pressing 'B' again after dropping them "
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
          relicTextDiv.classList.add("none-display")
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
            relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
          relicTextDiv.textContent = "Mining bronze ore adds " + stateObj.bronzeMaxFuel + " maximum fuel capacity"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.bombRefill > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/bombrefill.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#bomb-refill-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#bomb-refill-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "bomb-refill-popup")
          relicTextDiv.classList.add("none-display")
          relicString = "Killing an enemy with a bomb yields " + stateObj.bombRefill + " bomb"
          if (stateObj.bombRefill > 1) {
            relicString += "s"
          }
          relicTextDiv.textContent = relicString
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.fuelToBlocks > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/fueltoblocks.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#fuel-blocks-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#fuel-blocks-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "fuel-blocks-popup")
          relicTextDiv.classList.add("none-display")
          let fuelNeeded = Math.floor(((stateObj.dirtThresholdNeeded - stateObj.dirtReserves)*2)/stateObj.fuelToBlocks)
          relicString = "Can spend " + fuelNeeded + " fuel to drop a dirt block"
          relicTextDiv.textContent = relicString
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.spareFuelTank > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/sparetank.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#spare-tank-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#spare-tank-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "spare-tank-popup")
          relicTextDiv.classList.add("none-display")
          let fuelNeeded = Math.floor(((stateObj.dirtThresholdNeeded - stateObj.dirtReserves)*2)/stateObj.fuelToBlocks)
          relicString = "Refill fuel after running out " + stateObj.spareFuelTank + " time"
          if (stateObj.spareFuelTank > 1) {
            relicString += "s"
          }
          relicTextDiv.textContent = relicString
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
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
          relicTextDiv.classList.add("none-display")
          relicTextDiv.textContent = "Fuel is free on this level"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.dirtRuby === true) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/dirtruby.png"
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
          relicTextDiv.classList.add("none-display")
          relicTextDiv.textContent = "Dropped blocks contain a ruby"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    

    return topBarDiv
}


//sellingItems
function renderSellingItems(stateObj) {
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
      inventoryDiv.classList.add("bronze-sell-row")
      let bronzeSellTotal = ((25*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.bronzeInventory)
      inventoryDiv.textContent = "Bronze Ore (" + stateObj.bronzeInventory + "): $" + bronzeSellTotal 
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
      let silverSellTotal = ((50*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.silverInventory)
      inventoryDiv.textContent = "Silver Ore (" + stateObj.silverInventory + "): $" + silverSellTotal
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
      let tempSellTotal = ((100*stateObj.splinterCellModifier)*stateObj.goldInventory)
      inventoryDiv.textContent = "Gold Ore (" + stateObj.goldInventory + "): $" + tempSellTotal
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
      let tempSellTotal = ((300*stateObj.splinterCellModifier)*stateObj.rubyInventory)
      inventoryDiv.textContent = "Rubies (" + stateObj.rubyInventory + "): " + tempSellTotal
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
      let tempSellTotal = ((750*stateObj.splinterCellModifier)*stateObj.amethystInventory)
      inventoryDiv.textContent = "Amethyst (" + stateObj.amethystInventory + "): $" + tempSellTotal
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
      let tempSellTotal = ((1500*stateObj.splinterCellModifier)*stateObj.diamondInventory)
      inventoryDiv.textContent = "Diamonds (" + stateObj.diamondInventory + "): $" + tempSellTotal
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
      let tempSellTotal = ((3000*stateObj.splinterCellModifier)*stateObj.blackDiamondInventory)
      inventoryDiv.textContent = "Black Diamonds (" + stateObj.blackDiamondInventory + "): $" + tempSellTotal
      inventoryDiv.onclick = async function () {
        await sellBlackDiamond(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }

  let upgradeHullDiv = document.createElement("Div")
  upgradeHullDiv.classList.add("hull-gold-upgrade-div")
  upgradeHullDiv.textContent = "Upgrade Hull (" + (5 * ((stateObj.currentLevel*2) +1)) + " gold)"
  if (stateObj.goldInventory >= (5 * ((stateObj.currentLevel*2) +1))) {
    upgradeHullDiv.classList.add("hull-gold-upgrade-hover")
  }
  upgradeHullDiv.onclick = async function () {
      await pause(450)
      await upgradeHullGold(stateObj, sellTotal)
  }

  let sellButtonDiv = document.createElement("Div")
  if (stateObj.currentInventory > 0) {
    sellButtonDiv.classList.add("sell-button")
  } else {
    sellButtonDiv.classList.add("sell-empty")
  }
  
  sellButtonDiv.textContent = "Sell Items ($" + sellTotal + ")"
  sellButtonDiv.onclick = async function () {
      document.querySelector(".sell-button").classList.add("emphasis")
      await pause(450)
      await sellItems(stateObj, sellTotal)
  }

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

  sellDiv.append(sellInventoryDiv, sellButtonDiv, upgradeHullDiv, seeStoreDiv,  buyNothingDiv)
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
  lostTextDiv.textContent = "You lost the game! Press OK to try again"

  lostDiv.append(lostTextDiv)

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


//convert Inventory
function renderInventory(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let sellDiv = document.createElement("Div")
  sellDiv.classList.add("viewing-inv-div")

  let sellInventoryDiv = document.createElement("Div")
  sellInventoryDiv.classList.add("selling-div")

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
  if (stateObj.goldInventory >= 3) {
    inventoryDiv.classList.add("can-convert")
    textString += " [click to convert 3 to 1 Ruby]"
    inventoryDiv.onclick = async function () {
      await convertGold(stateObj)
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
  




















//old MapSquareClick stuff
// mapSquareDiv.onclick = async function() {
//   if (stateObj.currentPosition === squareIndex - 1) {
//       if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition + 1] !== "empty") {
//           return stateObj
//       } else {
//           //only execute if not already on right side
//           if ((stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
//               stateObj = await calculateMoveChange(stateObj, 1)
//           }
//       }
//   } else if (stateObj.currentPosition === squareIndex + 1) {
//       if (stateObj.gameMap[stateObj.currentPosition - 1] === "STORE") {
//           stateObj = await calculateMoveChange(stateObj, -1)
//       }
//       if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
//           return stateObj
//       }  else if (stateObj.gameMap[stateObj.currentPosition - 1] === "empty") {
//           stateObj = await calculateMoveChange(stateObj, -1)
//           return stateObj
//       }
  
//       //make sure not on left side 
//       if (stateObj.currentPosition % screenwidthBlocks !== 0 ) {
//           stateObj = await calculateMoveChange(stateObj, -1)
//       }
//   } else if (stateObj.currentPosition === squareIndex - screenwidthBlocks) {
//       let newSquare = stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]
//       if (stateObj.currentPosition > 7 && stateObj.inTransition === false) {
//           if (newSquare=== "empty" || newSquare === "STORE") {
//               stateObj = await calculateMoveChange(stateObj, screenwidthBlocks)
//               stateObj = immer.produce(stateObj, (newState) => {
//                   newState.currentFuel -= 0.25;
//               })
//           }
//       } 
//   }
//   await changeState(stateObj)
// }
