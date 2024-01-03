
//render the top bar with all the stats
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
    fuelText1Div.textContent = "Fuel - "

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
    hullText1Div.textContent = "Hull - "

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
        dirtString = dirtString + " - press P to drop"
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

    if (stateObj.bronzeMaxHull > 0) {
        let weaponPriceRelicDiv = document.createElement("Div")
        weaponPriceRelicDiv.classList.add("relic-div")
        let weaponImg = document.createElement("Img");
        weaponImg.classList.add("relic-img")
        weaponImg.src = "img/relics/bronzemaxhull.png"
        weaponPriceRelicDiv.append(weaponImg)
        
        weaponPriceRelicDiv.addEventListener('mouseover', function() {
            const statusText = document.querySelector("#bronze-hull-popup");
            statusText.style.display = 'block'
          });
          
          weaponPriceRelicDiv.addEventListener('mouseout', function() {
            const statusText = document.querySelector("#bronze-hull-popup");
            statusText.style.display = 'none'
          });
    
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", "bronze-hull-popup")
          relicTextDiv.classList.add("none-display")
          relicTextDiv.textContent = "Mining bronze ore adds " + stateObj.bronzeMaxHull + " hull armor"
          weaponPriceRelicDiv.appendChild(relicTextDiv);

          topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.silverMaxFuel > 0) {
      let weaponPriceRelicDiv = document.createElement("Div")
      weaponPriceRelicDiv.classList.add("relic-div")
      let weaponImg = document.createElement("Img");
      weaponImg.classList.add("relic-img")
      weaponImg.src = "img/relics/silvermaxfuel.png"
      weaponPriceRelicDiv.append(weaponImg)
      
      weaponPriceRelicDiv.addEventListener('mouseover', function() {
          const statusText = document.querySelector("#silver-fuel-popup");
          statusText.style.display = 'block'
        });
        
        weaponPriceRelicDiv.addEventListener('mouseout', function() {
          const statusText = document.querySelector("#silver-fuel-popup");
          statusText.style.display = 'none'
        });
  
        let relicTextDiv = document.createElement("Div");
        relicTextDiv.setAttribute("id", "silver-fuel-popup")
        relicTextDiv.classList.add("none-display")
        relicTextDiv.textContent = "Mining silver ore adds " + stateObj.silverMaxFuel + " fuel capacity"
        weaponPriceRelicDiv.appendChild(relicTextDiv);

        topBarDiv.append(weaponPriceRelicDiv)
  }

  if (stateObj.bronzeSilverConverter) {
    let weaponPriceRelicDiv = document.createElement("Div")
    weaponPriceRelicDiv.classList.add("relic-div")
    let weaponImg = document.createElement("Img");
    weaponImg.classList.add("relic-img")
    weaponImg.src = "img/relics/bronzesilverconverter.png"
    weaponPriceRelicDiv.append(weaponImg)
    
    weaponPriceRelicDiv.addEventListener('mouseover', function() {
        const statusText = document.querySelector("#bronze-converter-popup");
        statusText.style.display = 'block'
      });
      
      weaponPriceRelicDiv.addEventListener('mouseout', function() {
        const statusText = document.querySelector("#bronze-converter-popup");
        statusText.style.display = 'none'
      });

      let relicTextDiv = document.createElement("Div");
      relicTextDiv.setAttribute("id", "bronze-converter-popup")
      relicTextDiv.classList.add("none-display")
      relicTextDiv.textContent = "Mined bronze ore gets converted to silver"
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
          let fuelNeeded = Math.floor(((stateObj.dirtThresholdNeeded - stateObj.dirtReserves))/stateObj.fuelToBlocks)
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

    if (stateObj.fuelTeleportCost > 0) {
      let weaponPriceRelicDiv = document.createElement("Div")
      weaponPriceRelicDiv.classList.add("relic-div")
      let weaponImg = document.createElement("Img");
      weaponImg.classList.add("relic-img")
      weaponImg.src = "img/relics/teleporter.png"
      weaponPriceRelicDiv.append(weaponImg)
      
      weaponPriceRelicDiv.addEventListener('mouseover', function() {
          const statusText = document.querySelector("#fuel-teleport-popup");
          statusText.style.display = 'block'
        });
        
        weaponPriceRelicDiv.addEventListener('mouseout', function() {
          const statusText = document.querySelector("#fuel-teleport-popup");
          statusText.style.display = 'none'
        });
  
        let relicTextDiv = document.createElement("Div");
        relicTextDiv.setAttribute("id", "fuel-teleport-popup")
        relicTextDiv.classList.add("none-display")
        relicTextDiv.textContent = "Press 'T' to teleport back to the shop. Costs " + stateObj.fuelTeleportCost + " fuel"
        weaponPriceRelicDiv.appendChild(relicTextDiv);

        topBarDiv.append(weaponPriceRelicDiv)
    }

    if (stateObj.magneticBlocks) {
      let weaponPriceRelicDiv = document.createElement("Div")
      weaponPriceRelicDiv.classList.add("relic-div")
      let weaponImg = document.createElement("Img");
      weaponImg.classList.add("relic-img")
      weaponImg.src = "img/relics/magnetblocks.png"
      weaponPriceRelicDiv.append(weaponImg)
      
      weaponPriceRelicDiv.addEventListener('mouseover', function() {
          const statusText = document.querySelector("#magnet-blocks-popup");
          statusText.style.display = 'block'
        });
        
        weaponPriceRelicDiv.addEventListener('mouseout', function() {
          const statusText = document.querySelector("#magnet-blocks-popup");
          statusText.style.display = 'none'
        });
  
        let relicTextDiv = document.createElement("Div");
        relicTextDiv.setAttribute("id", "magnet-blocks-popup")
        relicTextDiv.classList.add("none-display")
        relicTextDiv.textContent = "Enemies stick to dropped dirt blocks"
        weaponPriceRelicDiv.appendChild(relicTextDiv);

        topBarDiv.append(weaponPriceRelicDiv)
    }


    

    return topBarDiv
}

//store that lets you sell individual rows
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
      let bronzeSellTotal = ((20*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.bronzeInventory)
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
      let silverSellTotal = ((50*stateObj.bronzeSilverBonus*stateObj.splinterCellModifier)*stateObj.silverInventory)
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
      let tempSellTotal = ((125*stateObj.splinterCellModifier)*stateObj.goldInventory)
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
      let tempSellTotal = ((300*stateObj.splinterCellModifier)*stateObj.rubyInventory)
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
      let tempSellTotal = ((750*stateObj.splinterCellModifier)*stateObj.amethystInventory)
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
      let tempSellTotal = ((1800*stateObj.splinterCellModifier)*stateObj.diamondInventory)
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
      let tempSellTotal = ((4500*stateObj.splinterCellModifier)*stateObj.blackDiamondInventory)
      inventoryDiv.textContent = "Black Diamonds (" + stateObj.blackDiamondInventory + "): $" + tempSellTotal + " [click to sell all]"
      inventoryDiv.onclick = async function () {
        await sellBlackDiamond(stateObj, tempSellTotal)
      }
      sellInventoryDiv.append(inventoryDiv)
      sellTotal += tempSellTotal
  }

  let upgradeHullDiv = document.createElement("Div")
  let goldPrice = stateObj.floorValues[stateObj.currentLevel].hullGoldUpgradePrice
  let rubyPrice = stateObj.floorValues[stateObj.currentLevel].rubyHullUpgradePrice
  let tradeString = "Upgrade Hull (Costs "
  upgradeHullDiv.classList.add("hull-gold-upgrade-div")
  if (goldPrice > 0) {
    tradeString += goldPrice + " gold)"
    if (stateObj.goldInventory >= goldPrice) {
      upgradeHullDiv.classList.add("hull-gold-upgrade-hover")
      upgradeHullDiv.onclick = async function () {
        await upgradeHullGold(stateObj)
      }
    }
  } else if (rubyPrice > 0) {
    tradeString += rubyPrice + " rubies)"
    if (stateObj.rubyInventory >= rubyPrice) {
      upgradeHullDiv.classList.add("ruby-relic-hover")
      upgradeHullDiv.onclick = async function () {
        await upgradeHullGold(stateObj)
      }
    } 
  }
  upgradeHullDiv.textContent = tradeString

  let upgradeFuelDiv = document.createElement("Div")
  let fuelString = "Upgrade Fuel Capacity (Costs "
  upgradeFuelDiv.classList.add("fuel-gold-upgrade-div")
  if (goldPrice > 0) {
    fuelString += goldPrice + " gold)"
    if (stateObj.goldInventory >= goldPrice) {
      upgradeFuelDiv.classList.add("fuel-gold-upgrade-hover")
      upgradeFuelDiv.onclick = async function () {
        await upgradeFuelGold(stateObj)
      }
    }
  } else if (rubyPrice > 0) {
    fuelString += rubyPrice + " rubies)"
    if (stateObj.rubyInventory >= rubyPrice) {
      upgradeFuelDiv.classList.add("ruby-relic-hover")
      upgradeFuelDiv.onclick = async function () {
        await upgradeFuelGold(stateObj)
      }
    } 
  }
  upgradeFuelDiv.textContent = fuelString
  

  let tradeRelicRubyDiv = document.createElement("Div")
  if (stateObj.storeRelic1) {
    tradeRelicRubyDiv.classList.add("ruby-relic-div")
    let rubyPrice = stateObj.floorValues[stateObj.currentLevel].rubyRelicPrice
    let diamondPrice = stateObj.floorValues[stateObj.currentLevel].diamondRelicPrice
    let tradeString = stateObj.storeRelic1.name + " - " + stateObj.storeRelic1.text + " (Costs "
    if (rubyPrice > 0) {
      tradeString += rubyPrice + " rubies)"
      if (stateObj.rubyInventory >= rubyPrice) {
        tradeRelicRubyDiv.classList.add("ruby-relic-hover")
      }
      tradeRelicRubyDiv.onclick = async function () {
        await tradeRelicRuby(stateObj)
      }
    } else if (diamondPrice > 0) {
      tradeString += diamondPrice + " diamonds)"
      if (stateObj.diamondInventory >= diamondPrice) {
        tradeRelicRubyDiv.classList.add("diamond-relic-hover")
      }
      tradeRelicRubyDiv.onclick = async function () {
        await tradeRelicRuby(stateObj)
      }
    }
    tradeRelicRubyDiv.textContent = tradeString
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

  sellDiv.append(sellInventoryDiv, sellButtonDiv, upgradeHullDiv, upgradeFuelDiv, tradeRelicRubyDiv, seeStoreDiv,  buyNothingDiv)
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

function renderStart(stateObj) {
  console.log("rendering start function triggered")
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("start-div")

  let textDiv1 = document.createElement("H3")
  textDiv1.classList.add("padding-width")
  textDiv1.textContent = "Move with arrow keys or WASD"

  let textDiv2 = document.createElement("H3")
  textDiv2.classList.add("padding-width")
  textDiv2.textContent = "Sell ore at the shop"

  let textDiv3 = document.createElement("H3")
  textDiv3.classList.add("padding-width")
  textDiv3.textContent = "Mine or buy relics to gain powers"

  let textDiv4 = document.createElement("H3")
  textDiv4.classList.add("padding-width")
  textDiv4.textContent = "View Inventory with 'I'. Convert ores here"

  let textDiv5 = document.createElement("H3")
  textDiv5.classList.add("padding-width")
  textDiv5.textContent = "Shoot lasers with 'L' and drop bombs with 'B'"

  let textDiv7 = document.createElement("H3")
  textDiv7.classList.add("padding-width")
  textDiv7.textContent = "Gems in stone must be hit with lasers or bombs first"

  let textDiv6 = document.createElement("H3")
  textDiv6.classList.add("padding-width")
  textDiv6.textContent = "Press 'H' at any time to see this screen again"

  lostDiv.append(textDiv1, textDiv2, textDiv3, textDiv4, textDiv5, textDiv7, textDiv6)

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

//show the full map
function renderMap(stateObj) {
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
    } 
      mapDiv.append(mapSquareDiv)
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
  pacifistDiv.textContent = "PACIFIST - After completing this next level, gain $100 for every enemy that is still alive"
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
  laserText2.textContent = "$" + stateObj.laserCapacityUpgradeCost * (stateObj.currentLevel+1)* (1-stateObj.cheaperShops)
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
      
      if ((missingHull*5) * (stateObj.currentLevel+1) > (stateObj.bankedCash * (1-stateObj.cheaperShops))) {
          repairText1.textContent = "Spend all money on repairs" 
          repairText2.textContent = "$" + Math.ceil(stateObj.bankedCash)* (1-stateObj.cheaperShops)
      } else {
          repairText1.textContent = "Repair hull fully " 
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
  invText1.textContent = "Inventory Size Upgrade" 
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

  let buyRelic2Div = document.createElement("Div")
  if (stateObj.storeRelic2 !== false) {
      buyRelic2Div.setAttribute("id", "store-relic-2-div")
      buyRelic2Div.classList.add("store-option")
      buyRelic2Div.classList.add("relic-option")
      let relicText1 = document.createElement("Div")
      relicText1.classList.add("store-option-text")
      let relicText2 = document.createElement("Div")
      relicText2.classList.add("store-option-text")
      relicText1.textContent = stateObj.storeRelic2.name + " - " + stateObj.storeRelic2.text
      relicText2.textContent = "$" + stateObj.floorValues[stateObj.currentLevel].storeRelicPrice
      buyRelic2Div.append(relicText1, relicText2)
      if (stateObj.bankedCash >= stateObj.floorValues[stateObj.currentLevel].storeRelicPrice) {
          buyRelic2Div.classList.add("store-clickable")
          buyRelic2Div.onclick = function () {
              buyRelic2Func(stateObj)
          }
      }
  }

  let buyNothingDiv = document.createElement("Div")
  buyNothingDiv.classList.add("store-option")
  buyNothingDiv.setAttribute("id", "store-return-map-div")
  buyNothingDiv.classList.add("return-to-map")
  buyNothingDiv.textContent = "Return to Map"
  buyNothingDiv.onclick = function () {
      leaveStore(stateObj)
  }

  storeDiv.append(fillFuelDiv, repairDiv, buyLaserDiv, laserUpgradeDiv, buyBombDiv,  
      bombUpgradeDiv, inventoryUpgradeDiv, buyRelic2Div, buyNothingDiv)

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
