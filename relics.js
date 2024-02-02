//mined silver doubles?

let potentialRelics = [
    //0
    spareTank = {
        name: "Spare Fuel Tank",
        varName: "spareTankRelic",
        text: (stateObj) => {
            let val = stateObj.spareFuelTank
            let tradeString = "If you run out of fuel, fully refill your fuel " + val + " time"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.spareFuelTank
            let tradeString = "If you run out of fuel, fully refill your fuel " + (val+1) + " time"
            if (val > 1) { tradeString += "s"}
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.spareFuelTank += 1;
                if(add) {newState.playerRelicArray.push(spareTank)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/fueltank.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,

    },

    goldMaxInventory = {
        name: "Augmented Cargo Bay",
        varName: "goldMaxInvRelic",
        text: (stateObj) => {
            let val = stateObj.goldMaxInventory
            let tradeString = "Mining gold increases Cargo Bay by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.goldMaxInventory
            let tradeString = "Mining gold increases Cargo Bay by " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.goldMaxInventory += 1;
                if (add){newState.playerRelicArray.push(goldMaxInventory)}
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "rare",
        imgPath: "img/relics/goldmaxinventory.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    pauseEnemies = {
        name: "Enemy Disruptor",
        varName: "bronzeMaxFuelRelic",
        text: (stateObj) => {
            let tradeString = "Enemies on this level can't move"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyArray = []
                newState.enemyMovementArray = [];
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
        imgPath: "img/relics/stoprelic.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: false,
    },

    dirtMaxFuel = {
        name: "Dirt-Fuel Converter",
        varName: "dirtToMaxFuelRelic",
        text: (stateObj) => {
            let val = stateObj.dirtToMaxFuel
            let tradeString = "Dropping dirt increases Fuel Tank by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.dirtToMaxFuel
            let increase = Math.floor(15 * stateObj.overallFuelModifier)
            let tradeString = "Dropping dirt increases Fuel Tank by " + (val+increase)
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtToMaxFuel += 15;
                if(add){newState.playerRelicArray.push(dirtMaxFuel)}    
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtmaxfuel.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: true,
    },

    enemiesDealLess = {
        name: "Armor Plating",
        varName: "halfDamageEnemiesRelic",
        text: (stateObj) => {
            let val = stateObj.enemyDamageModifier
            let tradeString = "Enemies deal " + Math.ceil((1-val)*100) + "% less damage"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.enemyDamageModifier
            let tradeString = "Enemies deal " + Math.ceil((1-val-0.25)*100) + "% less damage"
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyDamageModifier -= 0.25;
                if (add) {newState.playerRelicArray.push(enemiesDealLess)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/shield2.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    //5
    halfDamageFuel = {
        name: "Fuel-Powered Shield",
        varName: "halfDamageFullFuelRelic",
        text: (stateObj) => {
            let val = stateObj.halfDamageFullFuel
            let tradeString = "Take " +  Math.ceil((1-val)*100) + "% less damage if Fuel Tank above 50%"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.halfDamageFullFuel
            let tradeString = "Take " +  Math.ceil(((1-val)*0.65)*100) + "% less damage if Fuel Tank above 50%"
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.halfDamageFullFuel = Math.floor(newState.halfDamageFullFuel * 0.65);
                if (add) {newState.playerRelicArray.push(halfDamageFuel)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/gasshield.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    thornsRelic = {
        name: "Spikes",
        varName: "thornsRelic",
        text: (stateObj) => {
            return "Kill enemies who damage you"
        },
        storeText: (stateObj) => {
            return "Kill enemies who damage you"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.thorns = true;
                newState.playerRelicArray.push(thornsRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/thorns.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
        
    },

    bronzeSilverBonusRelic = {
        name: "Basic Ore Refiner",
        varName: "bronzeSilverBonusRelic",
        text: (stateObj) => {
            let val = stateObj.bronzeSilverBonus
            let tradeString = "Bronze and silver ore are worth " + val + " times as much"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bronzeSilverBonus
            let tradeString = "Bronze and silver ore are worth " + (val+1) + " times as much"
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverBonus += 1;
                if(add){newState.playerRelicArray.push(bronzeSilverBonusRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzesilverbonus.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    remoteBombsRelic = {
        name: "Remote Detonator",
        varName: "remoteBombsRelic",
        text: (stateObj) => {
            return "Trigger bombs remotely instead of on impact (by pressing 'B' again)"
        },
        storeText: (stateObj) => {
            return "Trigger bombs remotely instead of on impact (by pressing 'B' again)"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.remoteBombs = true;
                newState.playerRelicArray.push(remoteBombsRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/remotebomb.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
    },

    weaponsPriceRelic = {
        name: "Weapons Merchant",
        varName: "weaponsPriceRelic",
        text: (stateObj) => {
            let val = stateObj.weaponsPriceModifier
            let tradeString = "Weapons in the shop are  " + Math.ceil((1-val)*100) + "% cheaper"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.weaponsPriceModifier
            let tradeString = "Weapons in the shop are  " + Math.ceil(((1-val)*.5)*100) + "% cheaper"
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                    newState.weaponsPriceModifier = Math.floor(0.5 * newState.weaponsPriceModifier);
                    if(add){newState.playerRelicArray.push(weaponsPriceRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        levelRelic: true,
        shopRelic: false,
        multiplePossible: true,
        imgPath: "img/relics/gun1.png",
    },

    //10
    killEnemiesHullRelic = {
        name: "Scrap to Armor",
        varName: "killEnemiesHullRelic",
        text: (stateObj) => {
            let val = Math.ceil(stateObj.killEnemiesHullModifier * stateObj.overallHullModifier)
            let tradeString = "Killing Enemies increases Hull Armor by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = Math.ceil(stateObj.killEnemiesHullModifier * stateObj.overallHullModifier)
            let tradeString = "Killing Enemies increases Hull Armor by " + (val + Math.ceil(5*stateObj.overallHullModifier))
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesHullModifier += 5;
                if(add){newState.playerRelicArray.push(killEnemiesHullRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/killhull.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
        
    },

    killEnemiesHealRelic = {
        name: "Scrap to Armor",
        varName: "killEnemiesHealRelic",
        text: (stateObj) => {
            let val = stateObj.killEnemiesForHealing
            let tradeString = "Killing Enemies repairs Hull Armor by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.killEnemiesForHealing
            let tradeString = "Killing Enemies repairs Hull Armor by " + (val + 10) 
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForHealing += 10;
                if (add) {newState.playerRelicArray.push(killEnemiesHealRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/repairkill.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    silverHealingRelic = {
        name: "Silver Wrench",
        varName: "silverHealingRelic",
        text: (stateObj) => {
            let val = stateObj.silverHealing
            let tradeString = "Mining silver ore repairs Hull Armor by " + val + ("(if damaged")
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.silverHealing
            let tradeString = "Mining silver ore repairs Hull Armor by " + (val+5) + ("(if damaged")
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverHealing += 5;
                if (add) {newState.playerRelicArray.push(silverHealingRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/silverhealing.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    bronzeMaxHullRelic = {
        name: "Bronze Armor",
        varName: "bronzeMaxHullRelic",
        text: (stateObj) => {
            let val = stateObj.bronzeMaxHull
            let tradeString = "Mining bronze ore increases hull armor by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bronzeMaxHull
            let tradeString = "Mining bronze ore increases hull armor by " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeMaxHull += 1;
                if (add) {newState.playerRelicArray.push(bronzeMaxHullRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzemaxhull.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    dirtRubyRelic = {
        name: "Ruby Producer",
        varName: "dirtRubyRelic",
        text: (stateObj) => {
            return "Dropped dirt blocks contain a ruby"
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRuby = true;
                newState.playerRelicArray.push(dirtRubyRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtruby.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: false,
    },

    //15
    bombDistanceRelic = {
        name: "Stronger Bombs",
        varName: "bombDistanceRelic",
        text: (stateObj) => {
            let val = stateObj.bombDistance
            let tradeString = "Bomb distance radius increased to " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bombDistance
            let tradeString = "Bomb distance radius increased to " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombDistance += 1;
                if(add){newState.playerRelicArray.push(bombDistanceRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bombupgrader.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    laserPiercingRelic = {
        name: "Piercing Laser",
        varName: "laserPiercingRelic",
        text: (stateObj) => {
            return "Laser pierces through entire row"
        },
        storeText: (stateObj) => {
            return "Laser pierces through entire row"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserPiercing = true;
                newState.playerRelicArray.push(laserPiercingRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/laserpiercing.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
    },

    bombRefillRelic = {
        name: "Scrap Bombmaker",
        varName: "bombRefillRelic",
        text: (stateObj) => {
            let val = stateObj.bombRefill
            let tradeString = "Killing an enemy with a bomb refills " + val + "bomb"
            if (val>1) { tradeString += "s"}
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bombRefill
            let tradeString = "Killing an enemy with a bomb refills " + (val+1) + "bomb"
            if (val>0) { tradeString += "s"}
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombRefill += 1;
                if(add){newState.playerRelicArray.push(bombRefillRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bombrefill.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    fuelToBlocksRelic = {
        name: "Dirt Producer",
        varName: "fuelToBlocksRelic",
        text: (stateObj) => {
            let fuelNeeded = Math.floor(((stateObj.dirtThresholdNeeded - stateObj.dirtReserves))/stateObj.fuelToBlocks)
            let tradeString = "Can spend " + fuelNeeded + " fuel to drop dirt"
            return tradeString
        },
        storeText: (stateObj) => {
            let fuelNeeded = Math.floor(stateObj.dirtThresholdNeeded/(stateObj.fuelToBlocks+2))
            let tradeString = "Can spend " + fuelNeeded + " fuel to drop dirt"
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelToBlocks += 2;
                if(add){newState.playerRelicArray.push(fuelToBlocksRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/fueltoblocks.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    upgradeDirtBlockRelic = {
        name: "Mining Efficiency",
        varName: "upgradeDirtBlockRelic",
        text: (stateObj) => {
            return "Can drop dirt much faster"
        },
        storeText: (stateObj) => {
            return "Can drop dirt much faster"
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (newState.dirtThresholdNeeded > 15) {
                    newState.dirtThresholdNeeded -= 15;
                } else {
                    newState.dirtThresholdNeeded = 5;
                }
                if(add){newState.playerRelicArray.push(upgradeDirtBlockRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/drillupgrade.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    //20
    fuelTeleporter = {
        name: "Fuel-powered Teleporter",
        varName: "fuelTeleporter",
        text: (stateObj) => {
            let val = stateObj.fuelTeleportCost
            let tradeString = "Press T to teleport back to the shop (Costs " + val + " fuel)"
            return tradeString
        },
        storeText: (stateObj) => {
            let val=40;
            if (stateObj.fuelTeleportCost >= 25) {
                val = (stateObj.fuelTeleportCost - 15);
            } else if (stateObj.fuelTeleportCost > 0) {
                val = 0;
            }
            let tradeString = "Press T to teleport back to the shop (Costs " + val + " fuel)"
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (add){newState.playerRelicArray.push(fuelTeleporter)}
                if (newState.fuelTeleportCost === 0) {
                    newState.fuelTeleportCost = 40;
                } else if (newState.fuelTeleportCost >= 25) {
                    newState.fuelTeleportCost -= 15;
                } else {
                    newState.fuelTeleportCost = 0;
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/teleporter.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    dirtCompactor = {
        name: "Dirt Compactor",
        varName: "dirtCompactor",
        text: (stateObj) => {
            return "Can collect infinite dirt"
        },
        storeText: (stateObj) => {
            return "Can collect infinite dirt"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.noDirtThreshold = true;
                newState.playerRelicArray.push(dirtCompactor)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/infinitedirt.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
    },

    magneticBlocks = {
        name: "Magetic Blocks",
        varName: "magneticBlocks",
        text: (stateObj) => {
            return "Enemies stick to dropped dirt blocks"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.magneticBlocks = true;
                newState.playerRelicArray.push(magneticBlocks)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/magnetblocks.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: false,
    },


    silverMaxFuel = {
        name: "Silver Tank",
        varName: "silverMaxFuelRelic",
        text: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining silver ore increases max fuel by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining silver ore increases max fuel by " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverMaxFuel += 1;
                if(add){newState.playerRelicArray.push(silverMaxFuel)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/silvermaxfuel.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    bronzeSilverConverter = {
        name: "Bronze Refiner",
        varName: "bronzeSilverRelic",
        text: (stateObj) => {
            return "Mined bronze ore gets converted to silver"
        },
        storeText: (stateObj) => {
            return "Mined bronze ore gets converted to silver"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverConverter += 1;
                newState.playerRelicArray.push(bronzeSilverConverter)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzesilverconverter.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
    },

    //25
    dirtRefiller = {
        name: "Dirt Weapons",
        varName: "dirtRefillsWeapons",
        text: (stateObj) => {
            return "Dropping dirt refills your weapons"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRefillsWeapons = true;
                newState.playerRelicArray.push(dirtRefiller)
                
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtrefillsweapons.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: false,
    },

    laserCapacityRelic = {
        name: "Laser Storage",
        varName: "laserCapacityRelic",
        text: (stateObj) => {
            return "Can carry two more lasers. Gain 2 lasers"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.numberLasers += 2;
                newState.laserCapacity += 2;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/lasercapacity.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: false,
    },

    laserRecaptureRelic = {
        name: "Laser Recapture",
        varName: "laserRecapture",
        text: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining a gem with a laser refills " + val + "laser"
            let tradeString2 = (val > 1) ? "s" :  ""
            return tradeString + tradeString2
        },
        storeText: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining a gem with a laser refills " + (val+1) + "laser"
            let tradeString2 = (val > 0) ? "s" :  ""
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserGemRefill += 1;
                if(add){newState.playerRelicArray.push(laserRecaptureRelic)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/laserrecapture.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    efficientConverter = {
        name: "Efficient Gold Converter",
        varName: "goldConverter",
        text: (stateObj) => {
            return "Can create a ruby from 2 gold ores"
        },
        storeText: (stateObj) => {
            return "Can create a ruby from 2 gold ores"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.efficientGoldConverter = true;
                newState.playerRelicArray.push(efficientConverter)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/efficientgold.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
    },

    rubyLocator = {
        name: "Ruby Locator",
        varName: "rubyLocator",
        text: (stateObj) => {
            return "Rubies are more common on every level"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.rubyIncrease += 0.01;
                newState.playerRelicArray.push(rubyLocator)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/rubyincrease.png",
        levelRelic: true,
        shopRelic: false,
        multiplePossible: false,
    },

    //30
    fuelMult = {
        name: "Fuel Multiplier",
        varName: "rubyLocator",
        text: (stateObj) => {
            let val = (1-stateObj.overallFuelModifier)*100;
            let tradeString = "All fuel upgrades are " + val + "% more powerful "
            return tradeString
        },
        storeText: (stateObj) => {
            let val = (1-stateObj.overallFuelModifier + 0.5)*100;
            let tradeString = "All fuel upgrades are " + val + "% more powerful "
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallFuelModifier += 0.5;
                if(add){newState.playerRelicArray.push(fuelMult)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/overallfuelmod.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    hulllMult = {
        name: "Hull Multiplier",
        varName: "rubyLocator",
        text: (stateObj) => {
            let val = (1-stateObj.overallhullModifier)*100;
            let tradeString = "All hull upgrades are " + Math.floor(val*100) + "% more powerful "
            return tradeString
        },
        storeText: (stateObj) => {
            let val = (1-stateObj.overallhullModifier + 0.5)*100;
            let tradeString = "All hull upgrades are " + Math.floor(val*100) + "% more powerful "
            return tradeString
        },
        relicFunc: async (stateObj, add=true) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallHullModifier += 0.5;
                if(add){newState.playerRelicArray.push(hulllMult)}
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/overallhullmod.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },
]


function buildRelicArray(stateObj) {
    let tempArray = [potentialRelics[0], potentialRelics[1], potentialRelics[2], potentialRelics[3],
    potentialRelics[4], potentialRelics[5], potentialRelics[7], potentialRelics[9], potentialRelics[10],
    potentialRelics[11], potentialRelics[12], potentialRelics[13], potentialRelics[15], potentialRelics[17],
    potentialRelics[18], potentialRelics[19], potentialRelics[20], potentialRelics[23], potentialRelics[26],
    potentialRelics[24], potentialRelics[27], potentialRelics[29], potentialRelics[30], potentialRelics[31],
    ]
    if (stateObj.laserPiercing === false) {
        tempArray.push(potentialRelics[16])
    }
    if (stateObj.thorns === false) {
        tempArray.push(potentialRelics[6])
    }
    if (stateObj.remoteBombs === false) {
        tempArray.push(potentialRelics[8])
    }
    if (stateObj.dirtRuby === false) {
        tempArray.push(potentialRelics[14])
    }
    if (stateObj.noDirtThreshold === false) {
        tempArray.push(potentialRelics[21])
    }
    if (stateObj.magneticBlocks === false) {
        tempArray.push(potentialRelics[22])
    }
    if (stateObj.dirtRefillsWeapons === false) {
        tempArray.push(potentialRelics[25])
    }
    if (stateObj.efficientGoldConverter === false) {
        tempArray.push(potentialRelics[28])
    }
    //tempArray = [ fuelToBlocksRelic, fuelToBlocksRelic, fuelToBlocksRelic, fuelToBlocksRelic]
    return tempArray
}
