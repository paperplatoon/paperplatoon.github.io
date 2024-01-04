let potentialRelics = [
    spareTank = {
        name: "Spare Fuel Tank",
        varName: "spareTankRelic",
        text: "Fully refills your fuel once if you run our of fuel",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.spareFuelTank += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/sparetank.png",
    },

    bronzeMaxHull = {
        name: "Bronze Armor",
        varName: "bronzeMaxHullRelic",
        text: "Mining bronze ore increases max armor",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeMaxHull += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzemaxhull.png",
    },

    pauseEnemies = {
        name: "Enemy Disruptor",
        varName: "bronzeMaxFuelRelic",
        text: "Enemies on this level can't move",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyArray = []
                newState.enemyMovementArray = [];
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/stoprelic.png",
    },

    dirtMaxFuel = {
        name: "Dirt-Fuel Converter",
        varName: "dirtToMaxFuelRelic",
        text: "Increase maximum fuel when dropping dirt",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtToMaxFuel += 10;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtmaxfuel.png",
    },

    enemiesDealLess = {
        name: "Armor Plating",
        varName: "halfDamageEnemiesRelic",
        text: "Take less damage from enemies",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyDamageModifier -= 0.2;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/shield2.png",
    },

    //6
    halfDamageFuel = {
        name: "Fuel-Powered Shield",
        varName: "halfDamageFullFuelRelic",
        text: "Take less damage from enemies if fuel above 50%",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.halfDamageFullFuel *= 0.75;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/gasshield.png",
    },

    thornsRelic = {
        name: "Spikes",
        varName: "thornsRelic",
        text: "Kill enemies who damage you",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.thorns = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/thorns.png",
    },

    bronzeSilverBonusRelic = {
        name: "Basic Ore Refiner",
        varName: "bronzeSilverBonusRelic",
        text: "Bronze and silver ore is worth more",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverBonus += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzesilverbonus.png",
    },

    remoteBombsRelic = {
        name: "Remote Detonator",
        varName: "remoteBombsRelic",
        text: "Explode bombs remotely",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.remoteBombs = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/remotebomb.png",
    },

    weaponsPriceRelic = {
        name: "Weapons Merchant",
        varName: "weaponsPriceRelic",
        text: "Weapons are cheaper in the shop",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (newState.weaponsPriceModifier > 0.2) {
                    newState.weaponsPriceModifier -= 0.2;
                } else {
                    newState.weaponsPriceModifier = 0
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/gun1.png",
    },

    //11
    killEnemiesHullRelic = {
        name: "Scrap to Armor",
        varName: "killEnemiesHullRelic",
        text: "Killing Enemies increases max hull integrity",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesHullModifier += 5;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/killhull.png",
    },

    killEnemiesHealRelic = {
        name: "Scrap to Armor",
        varName: "killEnemiesHealRelic",
        text: "Killing Enemies repairs your hull if damaged",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForHealing += 15;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/repairkill.png",
    },

    silverHealingRelic = {
        name: "Silver Wrench",
        varName: "silverHealingRelic",
        text: "Mining silver repairs your hull if damaged",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverHealing += 10;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/silverhealing.png",
    },

    bronzeMaxFuelRelic = {
        name: "Bronze Tank",
        varName: "bronzeMaxFuelRelic",
        text: "Mining bronze ore increases max fuel",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeMaxFuel += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzemaxfuel.png",
    },

    dirtRubyRelic = {
        name: "Ruby Producer",
        varName: "dirtRubyRelic",
        text: "Dropped dirt blocks contain a ruby",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRuby = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtruby.png",
    },

    //16
    bombDistanceRelic = {
        name: "Stronger Bombs",
        varName: "bombDistanceRelic",
        text: "Bomb explosion radius is larger",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombDistance += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bombupgrader.png",
    },

    laserPiercingRelic = {
        name: "Piercing Laser",
        varName: "laserPiercingRelic",
        text: "Laser pierces through entire row",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserPiercing = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/laserpiercing.png",
    },

    bombRefillRelic = {
        name: "Scrap Bombmaker",
        varName: "bombRefillRelic",
        text: "Killing an enemy with a bomb refills that bomb slot",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombRefill += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bombrefill.png",
    },

    fuelToBlocksRelic = {
        name: "Fuel Compactor",
        varName: "fuelToBlocksRelic",
        text: "Can use fuel to drop blocks (costs a lot of fuel!)",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelToBlocks += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/fueltoblocks.png",
    },

    upgradeDirtBlockRelic = {
        name: "Mining Efficiency",
        varName: "upgradeDirtBlockRelic",
        text: "Can drop blocks much more quickly",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (newState.dirtThresholdNeeded > 15) {
                    newState.dirtThresholdNeeded -= 15;
                    console.log("dirt threshold is now " + newState.dirtThresholdNeeded)
                }
            })
            await changeState(stateObj);
            console.log("dirth threshold is now " + stateObj.dirtThresholdNeeded)
            return stateObj
        },
        imgPath: "img/relics/drillupgrade.png",
    },

    //21
    fuelTeleporter = {
        name: "Fuel-powered Teleporter",
        varName: "fuelTeleporter",
        text: "Can press T to spend 50 fuel to teleport back to the shop",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (newState.fuelTeleportCost === 0) {
                    newState.fuelTeleportCost = 50;
                } else if (newState.fuelTeleportCost >= 20) {
                    newState.fuelTeleportCost -= 20;
                } else {
                    newState.fuelTeleportCost = 0;
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/teleporter.png",
    },

    dirtCompactor = {
        name: "Dirt Compactor",
        varName: "dirtCompactor",
        text: "Can collect infinite dirt",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.noDirtThreshold = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/infinitedirt.png",
    },

    magneticBlocks = {
        name: "Magetic Blocks",
        varName: "magneticBlocks",
        text: "Enemies stick to dropped dirt blocks",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.magneticBlocks = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/magnetblocks.png",
    },

    silverMaxFuel = {
        name: "Silver Tank",
        varName: "silverMaxFuelRelic",
        text: "Mining silver ore increases max fuel",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverMaxFuel += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/silvermaxfuel.png",
    },

    bronzeSilverConverter = {
        name: "Bronze Refiner",
        varName: "bronzeSilverRelic",
        text: "Mined bronze ore gets converted to silver",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverConverter = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzesilverconverter.png",
    },

    //26
    dirtRefiller = {
        name: "Dirt Weapons",
        varName: "dirtRefillsWeapons",
        text: "Dropping dirt refills your weapons",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRefillsWeapons = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtrefillsweapons.png",
    },

    laserCapacityRelic = {
        name: "Laser Storage",
        varName: "laserCapacityRelic",
        text: "Can carry two more lasers",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.numberLasers += 2;
                newState.laserCapacity += 2;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/lasercapacity.png",
    },

    laserRecaptureRelic = {
        name: "Laser Recapture",
        varName: "laserRecapture",
        text: "Mining a gem with a laser refills your lasers",
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserGemRefill += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/laserrecapture.png",
    },
]



