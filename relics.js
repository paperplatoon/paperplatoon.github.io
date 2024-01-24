//mined silver doubles?

let potentialRelics = [
    //0
    spareTank = {
        name: "Spare Fuel Tank",
        varName: "spareTankRelic",
        text: (stateObj) => {
            let val = stateObj.spareFuelTank
            let tradeString = "If you run out of fuel, fully refill your fuel " 
            let tradeString2 = (val > 1) ? val + " times" : "1 time"
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.spareFuelTank += 1;
                newState.playerRelicArray.push(spareTank)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/sparetank.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,

    },

    goldMaxInventory = {
        name: "Augmented Cargo Bay",
        varName: "goldMaxInvRelic",
        text: (stateObj) => {
            let val = stateObj.goldMaxInventory
            let tradeString = "Mining gold increases Cargo Bay by " 
            let tradeString2 = (val > 1) ? val : "1"
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.goldMaxInventory += 1;
                newState.playerRelicArray.push(goldMaxInventory)
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
            let increase = 15 * stateObj.overallFuelModifier
            let tradeString = "Dropping dirt increases Fuel Tank by " 
            let tradeString2 = (val > 15) ? val*stateObj.overallFuelModifier : increase
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtToMaxFuel += 15;
                newState.playerRelicArray.push(dirtMaxFuel)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtmaxfuel.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: true,
    },

    enemiesDealLess = {
        name: "Armor Plating",
        varName: "halfDamageEnemiesRelic",
        text: (stateObj) => {
            let val = stateObj.enemyDamageModifier
            let tradeString = "Enemies deal " 
            let tradeString2 = (val === 1) ? "20% less damage" :  Math.ceil((1-val)*100) + "% less damage"
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyDamageModifier -= 0.2;
                newState.playerRelicArray.push(enemiesDealLess)
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
            let tradeString = (val === 1) ? "Take 25" : "Take " +  Math.ceil((1-val)*100) 
            let tradeString2 = "% less damage if Fuel Tank above 50%"
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.halfDamageFullFuel = Math.floor(newState.halfDamageFullFuel * 0.75);
                newState.playerRelicArray.push(halfDamageFuel)
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
            let tradeString = "Bronze and silver ore are worth " 
            let tradeString2 = (val > 2) ? val + " times as much" : " twice as much"
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverBonus += 1;
                newState.playerRelicArray.push(bronzeSilverBonusRelic)
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
            return "Trigger bombs remotely instead of on impact"
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
            let tradeString = "Weapons in the shop are  " 
            let tradeString2 = (val == 1) ? "50% cheaper" : Math.ceil((1-val)*100) 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                    newState.weaponsPriceModifier = Math.floor(0.5 * newState.weaponsPriceModifier);
                    newState.playerRelicArray.push(weaponsPriceRelic)
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
            let val = stateObj.killEnemiesHullModifier
            let tradeString = "Killing Enemies increases Hull Armor by " 
            let tradeString2 = (val === 0) ? Math.ceil(5 * stateObj.overallHullModifier) : val 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesHullModifier += 5;
                newState.playerRelicArray.push(killEnemiesHullRelic)
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
            let tradeString = "Killing Enemies repairs Hull Armor by " 
            let tradeString2 = (val === 0) ? "10 (if damaged)" : val + " (if damaged)" 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForHealing += 10;
                newState.playerRelicArray.push(killEnemiesHealRelic)
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
            let tradeString = "Mining silver ore repairs Hull Armor by " 
            let tradeString2 = (val === 0) ? "5 (if damaged)" : val + " (if damaged)" 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverHealing += 5;
                newState.playerRelicArray.push(silverHealingRelic)
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
            let tradeString = "Mining bronze ore increases hull armor by "
            let tradeString2 = (val === 0) ? 1 * Math.ceil(overallHullModifier) : val 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeMaxHull += 1;
                newState.playerRelicArray.push(bronzeMaxHullRelic)
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
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRuby = true;
                newState.playerRelicArray.push(dirtRubyRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtruby.png",
        levelRelic: true,
        shopRelic: true,
        multiplePossible: false,
    },

    //15
    bombDistanceRelic = {
        name: "Stronger Bombs",
        varName: "bombDistanceRelic",
        text: (stateObj) => {
            let val = stateObj.bombDistance
            let tradeString = "Bomb distance radius increased by "
            let tradeString2 = (val === 2) ? 1 : val-2 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombDistance += 1;
                newState.playerRelicArray.push(bombDistanceRelic)
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
            let tradeString = "Killing an enemy with a bomb refills "
            let tradeString2 = (val === 0) ? "1 bomb" : val + " bombs" 
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombRefill += 1;
                newState.playerRelicArray.push(bombRefillRelic)
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
            let val = stateObj.fuelToBlocks
            let fuelNeeded = Math.floor(((stateObj.dirtThresholdNeeded - stateObj.dirtReserves))/stateObj.fuelToBlocks)
            let tradeString = "Can spend "
            if (val === 0) {tradeString += "25 fuel to drop dirt"}
            else if (stateObj.sellingItems === true || stateObj.inStore === true) {tradeString += Math.floor(stateObj.dirtThresholdNeeded/(val+2)) + " fuel to drop dirt"} // +
            else { tradeString += fuelNeeded + " fuel to drop dirt" }
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelToBlocks += 2;
                newState.playerRelicArray.push(fuelToBlocksRelic)
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
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (newState.dirtThresholdNeeded > 15) {
                    newState.dirtThresholdNeeded -= 15;
                } else {
                    newState.dirtThresholdNeeded = 5;
                }
                newState.playerRelicArray.push(upgradeDirtBlockRelic)
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
            let tradeString = "Press T to teleport back to the shop ("
            if (val === 0) {tradeString += "40 fuel)"}
            else if (stateObj.sellingItems === true || stateObj.inStore === true) {
                let newVal = (val >= 25) ? val-15 : 0
                tradeString += newVal + " fuel)"
            } else { tradeString += val + " fuel)" }
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.playerRelicArray.push(fuelTeleporter)
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
        shopRelic: true,
        multiplePossible: false,
    },


    silverMaxFuel = {
        name: "Silver Tank",
        varName: "silverMaxFuelRelic",
        text: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining silver ore increases max fuel by "
            let tradeString2 = (val === 0) ? "1" : val
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverMaxFuel += 1;
                newState.playerRelicArray.push(silverMaxFuel)
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
        shopRelic: true,
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
        multiplePossible: true,
    },

    laserRecaptureRelic = {
        name: "Laser Recapture",
        varName: "laserRecapture",
        text: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining a gem with a laser refills "
            let tradeString2 = (val === 0) ? "1 laser" : val + " lasers"
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserGemRefill += 1;
                newState.playerRelicArray.push(laserRecaptureRelic)
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
            let tradeString = "All fuel upgrades are 50% more powerful "
            return tradeString
        },
        text: "All fuel upgrades are 50% more powerful",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallFuelModifier += 0.5;
                newState.playerRelicArray.push(fuelMult)
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
            let tradeString = "All hull upgrades are 50% more powerful "
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallHullModifier += 0.5;
                newState.playerRelicArray.push(hulllMult)
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
