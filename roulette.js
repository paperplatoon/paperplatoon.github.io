let commonRouletteChoices = [
    tankone = {
        name: "Fuel Tank +",
        rarity: "common",
        text: "Increase Fuel Tank by 1",
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += value;
                newState.currentFuel += value;
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
        text: "Increase Hull Armor by 2",
        value: 2,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += value;
                newState.currentHullArmor += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "hull"
    },

    gemone = {
        name: "Bronze Shavings",
        rarity: "common",
        text: "Add $50",
        value: 50,
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

    gemtwo = {
        name: "Bronze Nuggets",
        rarity: "common",
        text: "Add $65",
        value: 65,
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

let uncommonRouletteChoices = [
    weaponFill = {
        name: "Weapon Refill",
        rarity: "uncommon",
        text: "Randomly refill a bomb or laser",
        value: 65,
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
        text: "Increase Fuel Tank by 4",
        value: 4,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += value;
                newState.currentFuel += value;
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
        text: "Increase Hull Armor by 4",
        value: 4,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += value;
                newState.currentHullArmor += value;
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
        text: "Increase Fuel Tank by 1",
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

]

let rareRouletteChoices = [

    gemthree = {
        name: "Valuable Ore++",
        rarity: "rare",
        text: "Add $100",
        value: 100,
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
        text: "Increase Fuel Tank by 6",
        value: 6,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += value;
                newState.currentFuel += value;
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
        text: "Increase Hull Armor by 6",
        value: 6,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += value;
                newState.currentHullArmor += value;
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

]

let legendaryRouletteChoices = [
    tankthree = {
        name: "Fuel Tank ++++",
        rarity: "legendary",
        text: "Increase Fuel Tank by 8",
        value: 8,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTankMax += value;
                newState.currentFuel += value;
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
        text: "Increase Hull Armor by 10",
        value: 10,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.hullArmorMax += value;
                newState.currentHullArmor += value;
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