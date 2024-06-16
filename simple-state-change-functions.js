async function gainNextAttackDamage(stateObj, monsterIndex, damageToGain, isPlayer) {
    stateObj = immer.produce(stateObj, (newState) => {   
        let targetMonster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
        targetMonster.nextAttackDamage += damageToGain  
      })
    return stateObj
}

async function healToFull(stateObj, monsterIndex, isPlayer) {
    stateObj = immer.produce(stateObj, (newState) => {   
        let targetMonster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
        targetMonster.currentHP = targetMonster.maxHP  
      })
    return stateObj
}

async function attackDamageIncrease(stateObj, playerMonsterIndex, moveIndex, amountToIncrease)  {
    stateObj = immer.produce(stateObj, (newState) => {   
        newState.player.fightMonsterArray[playerMonsterIndex].moves[moveIndex].damage += amountToIncrease  
      })
    return stateObj
}

async function attackEnergyGainIncrease(stateObj, playerMonsterIndex, moveIndex, amountToIncrease)  {
    stateObj = immer.produce(stateObj, (newState) => {   
        newState.player.fightMonsterArray[playerMonsterIndex].moves[moveIndex].energyGained += amountToIncrease  
      })
    return stateObj
}

async function hpIncrease(stateObj, playerMonsterIndex, amountToIncrease)  {
    stateObj = immer.produce(stateObj, (newState) => {   
        newState.player.fightMonsterArray[playerMonsterIndex].currentHP += amountToIncrease
        newState.player.fightMonsterArray[playerMonsterIndex].maxHP += amountToIncrease  
      })
    return stateObj
}

async function startCombatWithEnergyIncrease(stateObj, playerMonsterIndex, amountToIncrease)  {
  stateObj = immer.produce(stateObj, (newState) => {   
      newState.player.fightMonsterArray[playerMonsterIndex].startCombatWithEnergyIncrease += amountToIncrease 
    })
  return stateObj
}

async function attackTimesIncrease(stateObj, playerMonsterIndex, moveIndex, amountToIncrease)  {
  stateObj = immer.produce(stateObj, (newState) => {   
      newState.player.fightMonsterArray[playerMonsterIndex].moves[moveIndex].damageTimes += amountToIncrease  
    })
  return stateObj
}

async function moveCostChange(stateObj, playerMonsterIndex, moveIndex, changeAmount)  {
  stateObj = immer.produce(stateObj, (newState) => {   
      newState.player.fightMonsterArray[playerMonsterIndex].moves[moveIndex].energyReq += changeAmount   
    })
  return stateObj
}

async function monsterMoved(stateObj, monsterIndex, isPlayer)  {
  stateObj = immer.produce(stateObj, (newState) => {   
      let targetMonster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
      targetMonster.hasMoved = true  
    })
  return stateObj
}

async function restoreHP(stateObj, monsterIndex, healNumber, isPlayer) {
  stateObj = immer.produce(stateObj, (newState) => {   
      let monster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
      let missingHP = monster.maxHP - monster.currentHP
      if (missingHP >= healNumber) {
          monster.currentHP += healNumber
      } else {
          monster.currentHP = monster.maxHP
      }
        
  })
  return stateObj
}

async function changePlayerMonster(stateObj, monIndex) {
  stateObj = immer.produce(stateObj, (newState) => {
      newState.targetedPlayerMonster = monIndex;
  })
  await updateState(stateObj)
}

async function changeEnemyMonster(stateObj, monIndex) {
  stateObj = immer.produce(stateObj, (newState) => {
      newState.targetedMonster = monIndex;
  })
  await updateState(stateObj)
}

function findMissingEnemyHPIndex(stateObj) {
  let enemyIndex = 0
  let biggestHPLoss = 0
  for (let i=0; i < stateObj.opponent.fightMonsterArray.length; i++) {
    let monster = stateObj.opponent.fightMonsterArray[i]
    let missingHP = monster.maxHP - monster.currentHP
    if (missingHP > biggestHPLoss) {
      enemyIndex = i;
      biggestHPLoss = missingHP
    }
  }
  return enemyIndex
}

async function gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer) {
  stateObj = immer.produce(stateObj, (newState) => {
      let monster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
      let move = monster.moves[moveIndex]
      monster.currentEnergy -= move.energyReq 
      monster.currentEnergy += move.energyGained
    })
    return stateObj
}

async function gainEnergyAll(stateObj, monsterIndex, moveIndex, isPlayer) {
  stateObj = immer.produce(stateObj, (newState) => {
      let monsterArray = (isPlayer) ? newState.player.fightMonsterArray : newState.opponent.fightMonsterArray
      let energyToGain = monsterArray[monsterIndex].moves[moveIndex].energyGained - monsterArray[monsterIndex].moves[moveIndex].energyReq

      for (let i = 0; i < monsterArray.length; i++) {
        monsterArray[i].currentEnergy += energyToGain
      }
    })
    return stateObj
}