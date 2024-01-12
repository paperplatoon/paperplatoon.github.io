let potentialRouletteChoices = [
    //0
    tankone = {
        name: "Fuel Tank +",
        rarity: "common",
        text: "Increase Fuel Tank by 1",
        value: 1,
        rouletteFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelCapacity += 1;
                newState.currentFuel += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    tanktwo = {
        name: "Fuel Tank ++",
        rarity: "uncommon",
        text: "Increase Fuel Tank by 2",
        value: 2,
        rouletteFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelCapacity += 2;
                newState.currentFuel += 2;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    tankthree = {
        name: "Fuel Tank +++",
        rarity: "rare",
        text: "Increase Fuel Tank by 5",
        value: 5,
        rouletteFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelCapacity += 5;
                newState.currentFuel += 5;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "tank"
    },

    tankthree = {
        name: "Fuel Tank ++++",
        rarity: "legendary",
        text: "Increase Fuel Tank by 8",
        value: 5,
        rouletteFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelCapacity += 8;
                newState.currentFuel += 8;
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
        value: 1,
        rouletteFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelCapacity += 1;
                newState.currentFuel += 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "hull"
    },
]