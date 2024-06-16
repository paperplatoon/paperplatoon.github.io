
commonEnergyGainMutation = {
    name: "Energetic+ (common)",
    text: "A move produces 1 more energy",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.energyGained > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        stateObj = await attackEnergyGainIncrease(stateObj, monsterIndex, moveIndex, 1)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  commonAggressionMutation = {
    name: "Aggression+ (common)",
    text: "An attack deals 1-2 more damage",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.damage > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        let amountToIncrease = randomIntegerInRange(1, 2)
        stateObj = await attackDamageIncrease(stateObj, monsterIndex, moveIndex, amountToIncrease)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  uncommonAggressionMutation = {
    name: "Aggression+ (uncommon)",
    text: "An attack deals 2-3 more damage",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.damage > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
        if (stateObj.selectedMutationAction) {
          let amountToIncrease = randomIntegerInRange(2, 3)
          stateObj = await attackDamageIncrease(stateObj, monsterIndex, moveIndex, amountToIncrease)
          stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
        }
      await updateState(stateObj);
    }
  }
  
  rareAggressionMutation = {
    name: "Aggression+ (rare)",
    text: "An attack deals 4-5 more damage",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.damage > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        let amountToIncrease = randomIntegerInRange(4, 5)
        stateObj = await attackDamageIncrease(stateObj, monsterIndex, moveIndex, amountToIncrease)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  rareAggressionMutation2 = {
    name: "Aggression+ (rare 2)",
    text: "Double an attack's damage",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.damage > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        let amountToIncrease = stateObj.player.fightMonsterArray[monsterIndex].moves[moveIndex].damage
        stateObj = await attackDamageIncrease(stateObj, monsterIndex, moveIndex, amountToIncrease)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  uncommonSpeedMutation = {
    name: "Speed+ (uncommon)",
    text: "An attack hits 1 more time",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.damageTimes > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        stateObj = await attackTimesIncrease(stateObj, monsterIndex, moveIndex, 1)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  rareSpeedMutation = {
    name: "Speed+ (rare)",
    text: "An attack hits 2 more times",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.damageTimes > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        stateObj = await attackTimesIncrease(stateObj, monsterIndex, moveIndex, 2)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  //HERE
  commonBulkMutation = {
    name: "HP+ (common)",
    text: "Subject gains 3-5 more HP",
    pickAttack: false,
    action: async (stateObj, mutationIndex, monsterIndex) => {
      let amountToIncrease = randomIntegerInRange(3, 5)
      stateObj = await hpIncrease(stateObj, stateObj.targetedPlayerMonster, amountToIncrease)
      stateObj = await playerUsedMutation(stateObj, mutationIndex, monsterIndex)
      await updateState(stateObj);
    }
  }
  
  uncommonBulkMutation = {
    name: "HP+ (uncommon)",
    text: "Subject gains 5-7 more HP",
    pickAttack: false,
    action: async (stateObj, mutationIndex, monsterIndex) => {
      let amountToIncrease = randomIntegerInRange(5, 8)
      stateObj = await hpIncrease(stateObj, stateObj.targetedPlayerMonster, amountToIncrease)
      stateObj = await playerUsedMutation(stateObj, mutationIndex, monsterIndex)
      await updateState(stateObj);
    }
  }
  
  rareBulkMutation = {
    name: "HP+ (rare)",
    text: "Subject gains 8-11 more HP",
    pickAttack: false,
    action: async (stateObj, mutationIndex, monsterIndex) => {
      let amountToIncrease = randomIntegerInRange(8, 11)
      stateObj = await hpIncrease(stateObj, stateObj.targetedPlayerMonster, amountToIncrease)
      stateObj = await playerUsedMutation(stateObj, mutationIndex, monsterIndex)
      await updateState(stateObj);
    }
  }
  
  commonEnergyMutation = {
    name: "Energy+ (common)",
    text: "A move costs one less energy",
    pickAttack: true,
    mutationCheck: (moveObj) => {
      return moveObj.energyReq > 0
    },
    action: async (stateObj, monsterIndex, moveIndex) => {
      if (stateObj.selectedMutationAction) {
        stateObj = await moveCostChange(stateObj, monsterIndex, moveIndex, -1)
        stateObj = await playerUsedMutation(stateObj, stateObj.selectedMutationIndex, monsterIndex)
      }
      await updateState(stateObj);
    }
  }
  
  uncommonEnergyMutation = {
    name: "Energy+ (uncommon)",
    text: "Subject starts combat with 1 extra energy",
    pickAttack: false,
    action: async (stateObj, mutationIndex, monsterIndex) => {
      stateObj = await startCombatWithEnergyIncrease(stateObj, stateObj.targetedPlayerMonster, 1)
      stateObj = await playerUsedMutation(stateObj, mutationIndex, monsterIndex)
      await updateState(stateObj);
    }
  }
  
  rareEnergyMutation = {
    name: "Energy+ (rare)",
    text: "Subject starts combat with 2 extra energy",
    pickAttack: false,
    action: async (stateObj, mutationIndex, monsterIndex) => {
      stateObj = await startCombatWithEnergyIncrease(stateObj, stateObj.targetedPlayerMonster, 2)
      stateObj = await playerUsedMutation(stateObj, mutationIndex, monsterIndex)
      await updateState(stateObj);
    }
  }
  
  //first attack deals extra damage
  //something that costs energy costs 1 less
  
  let commonMutationPool = [commonAggressionMutation, commonBulkMutation, commonEnergyMutation, commonEnergyGainMutation]
  let uncommonMutationPool = [uncommonAggressionMutation, uncommonBulkMutation, uncommonSpeedMutation, uncommonEnergyMutation]
  let rareMutationPool = [rareAggressionMutation, rareAggressionMutation2, rareBulkMutation, rareSpeedMutation, rareEnergyMutation]
  
  let startingMutationArray = [
    commonAggressionMutation, commonAggressionMutation, commonAggressionMutation, commonAggressionMutation,
    uncommonAggressionMutation, uncommonAggressionMutation, commonBulkMutation, commonBulkMutation,
    uncommonBulkMutation, uncommonBulkMutation, rareBulkMutation, rareBulkMutation,
    commonEnergyGainMutation, commonEnergyGainMutation, commonEnergyMutation, commonEnergyMutation, 
    uncommonSpeedMutation, rareAggressionMutation2]
  
//   let startingMutationArray = [ rareBulkMutation,rareBulkMutation,rareAggressionMutation2,rareAggressionMutation2,
//   ]