let commonRouletteChoices = [
    tankone = {
        name: "Fuel Tank +",
        rarity: "common",
        text: "Increase Fuel Tank by 5",
        value: 5,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += Math.ceil(value * newState.overallFuelModifier);;
                newState.currentFuel += Math.ceil(value * newState.overallFuelModifier);;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    hullone = {
        name: "Hull Armor +",
        rarity: "common",
        text: "Increase Hull Armor by 5",
        value: 5,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += Math.ceil(value  * newState.overallHullModifier);
                newState.currentHullArmor += Math.ceil(value  * newState.overallHullModifier)
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "hull"
    },

    cargobayzero = {
        name: "Cargo Bay",
        rarity: "common",
        text: "Increase Cargo Bay by 1",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.currentInventory += value;
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

    dirtClod = {
        name: "Concentrated Mud",
        rarity: "common",
        text: "Fill your dirt reserves",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (!stateObj.noDirtThreshold) {
                    newState.dirtReserves = newState.dirtThresholdNeeded
                } else {
                    newState.dirtReserves += newState.dirtThresholdNeeded;
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

]

let uncommonRouletteChoices = [
    weaponFill = {
        name: "Weapon Refill",
        rarity: "uncommon",
        text: "Randomly refill a bomb or laser",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.numberLasers < stateObj.laserCapacity) {
                    stateObj.numberLasers += 1;
                } else if (stateObj.bombCurrentTotal < stateObj.bombCapacity) {
                    stateObj.bombCurrentTotal += 1
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "weapon"
    },

    tanktwo = {
        name: "Fuel Tank ++",
        rarity: "uncommon",
        text: "Increase Fuel Tank by 10",
        value: 10,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += Math.ceil(value * newState.overallFuelModifier);;
                newState.currentFuel += Math.ceil(value * newState.overallFuelModifier);;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    hulltwo = {
        name: "Hull Armor ++",
        rarity: "uncommon",
        text: "Increase Hull Armor by 10",
        value: 10,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += Math.ceil(value  * newState.overallHullModifier);
                newState.currentHullArmor += Math.ceil(value  * newState.overallHullModifier);
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "hull"
    },

    cargobayone = {
        name: "Cargo Bay +",
        rarity: "uncommon",
        text: "Increase Cargo Bay by 2",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.currentInventory += value;
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

    dirtefficiencyone = {
        name: "Dirt Efficiency",
        rarity: "common",
        text: "Decrease dirt threshold by 10%",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.dirtThresholdNeeded > 0) {
                    newState.dirtThresholdNeeded -= 5
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "dirtEfficiency"
    },

]

let rareRouletteChoices = [

    gemthree = {
        name: "Valuable Ore++",
        rarity: "rare",
        text: "Add $80",
        value: 80,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bankedCash += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "gem"
    },

    tankthree = {
        name: "Fuel Tank +++",
        rarity: "rare",
        text: "Increase Fuel Tank by 15",
        value: 15,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += Math.ceil(value * newState.overallFuelModifier);
                newState.currentFuel += Math.ceil(value * newState.overallFuelModifier);;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    hullthree = {
        name: "Hull Armor +++",
        rarity: "rare",
        text: "Increase Hull Armor by 15",
        value: 15,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += Math.ceil(value  * newState.overallHullModifier);
                newState.currentHullArmor += Math.ceil(value  * newState.overallHullModifier);
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "hull"
    },

    cargobaytwo = {
        name: "Cargo Bay ++",
        rarity: "rare",
        text: "Increase Cargo Bay by 3",
        value: 3,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.currentInventory += value;
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },
    dirtefficiencyone = {
        name: "Dirt Efficiency+",
        rarity: "rare",
        text: "Decrease dirt threshold by 20%",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.dirtThresholdNeeded > 10) {
                    newState.dirtThresholdNeeded -= 10
                } else {
                    newState.dirtThresholdNeeded = 0
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "dirtEfficiency"
    },

]

let legendaryRouletteChoices = [
    tankthree = {
        name: "Fuel Tank ++++",
        rarity: "legendary",
        text: "Increase Fuel Tank by 20",
        value: 8,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += Math.ceil(value * newState.overallFuelModifier);;
                newState.currentFuel += Math.ceil(value * newState.overallFuelModifier);;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    hullfour = {
        name: "Hull Armor +++",
        rarity: "legendary",
        text: "Increase Hull Armor by 20",
        value: 10,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += Math.ceil(value  * newState.overallHullModifier);
                newState.currentHullArmor += Math.ceil(value  * newState.overallHullModifier);
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "hull"
    },
    cargobaythree = {
        name: "Cargo Bay +++",
        rarity: "legendary",
        text: "Increase Cargo Bay by 5",
        value: 5,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.currentInventory += value;
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

    gemfour = {
        name: "Valuable Ore++",
        rarity: "legendary",
        text: "Add $200",
        value: 00,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bankedCash += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "gem"
    },
]