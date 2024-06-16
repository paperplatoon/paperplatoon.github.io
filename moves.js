//enemy that gains strength and last attack is a multi-hit
//enemy that deals more damage when HP is low
//enemy that gains Dex to scale too fast
//


bite = {
    name: "Bite",
    type: "attack",
    text: (monster, move)  => { 
      let textString = `Deal ${calcMonsterDamage(monster, move)} damage`;
      if (move.damageTimes > 1) {
        textString += ` ${move.damageTimes} times`
      }
      return textString
    },
    energyReq: 0,
    energyGained: 1,
    damage: 10,
    damageTimes: 1,
    upgrades: 0,
    energyCost: 0,
    action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
      stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
      stateObj = await dealDamage(stateObj, monsterIndex, moveIndex, isPlayer)
      stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
      await updateState(stateObj);
      if (!isPlayer) {
        return stateObj
      }
    }
}

coilup = {
  name: "Coil Up",
  type: "attack",
  text: (monster, move)  => { 
    let textString = `Your next attack deals 1 more damage`;
    return textString
  },
  energyReq: 0,
  energyGained: 2,
  damage: 0,
  damageTimes: 0,
  upgrades: 0,
  energyCost: 0,
  action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
    stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
    stateObj = await gainNextAttackDamage(stateObj, monsterIndex, 1, isPlayer)
    stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
    await updateState(stateObj);
    if (!isPlayer) {
      return stateObj
    }
  }
}



bloodsucker = {
    name: "Bloodsucker",
    type: "attack",
    text: (monster, move)  => { 
      let textString = `Deal ${calcMonsterDamage(monster, move)} damage `;
      if (move.damageTimes > 1) {
        textString += `${move.damageTimes} times`
      }
      textString += `. Heal ${calcMonsterDamage(monster, move)} HP`;
      return textString
    },
    energyReq: 0,
    energyGained: 1,
    damage: 5,
    damageTimes: 1,
    upgrades: 0,
    action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
      let monster = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex] : stateObj.opponent.fightMonsterArray[monsterIndex] 
      let move =  monster.moves[moveIndex]
      stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
      stateObj = await dealDamage(stateObj, monsterIndex, moveIndex, isPlayer)
      stateObj = await restoreHP(stateObj, monsterIndex, calcMonsterDamage(monster, move), isPlayer)
      await updateState(stateObj);
      if (!isPlayer) {
        return stateObj
      }
    }
}

swipe = {
  name: "Swipe",
  text: (monster, move)  => { 
    let textString = `Deal ${calcMonsterDamage(monster, move)} damage`;
    if (move.damageTimes > 1) {
      textString += ` ${move.damageTimes} times`
    }
    return textString
  },
  energyReq: 0,
  type: "attack",
  energyGained: 1,
  damage: 6,
  damageTimes: 1,
  upgrades: 0,
  action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
    stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
    stateObj = await dealDamage(stateObj, monsterIndex, moveIndex, isPlayer)
    stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
    await updateState(stateObj);
    if (!isPlayer) {
      return stateObj
    }
  },
}

claw = {
name: "Claw",
type: "attack",
text: (monster, move)  => { 
  let textString = `Deal ${calcMonsterDamage(monster, move)} damage`;
  if (move.damageTimes > 1) {
    textString += ` ${move.damageTimes} times`
  }
  return textString
},
energyReq: 0,
energyGained: 2,
damage: 2,
damageTimes: 2,
upgrades: 0,
action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
  stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
  stateObj = await dealDamage(stateObj, monsterIndex, moveIndex, isPlayer)
  stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
  await updateState(stateObj);
  if (!isPlayer) {
    return stateObj
  }
}
}

heal = {
  name: "Heal",
  type: "skill",
  text: (monster, move)  => { 
    let textString = `Heal target for ${move.heal} HP`;
    if (move.healTimes > 1) {
      textString += ` ${move.healTimes} times`
    }
    return textString
  },
  energyReq: 0,
  energyGained: 2,
  heal: 5,
  healTimes: 1,
  upgrades: 0,
  action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
    let targetIndex = (isPlayer) ? stateObj.targetedPlayerMonster : findMissingEnemyHPIndex(stateObj)
    let move = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex].moves[moveIndex] : stateObj.opponent.fightMonsterArray[monsterIndex].moves[moveIndex]
    stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
    stateObj = await restoreHP(stateObj, targetIndex, (move.heal*move.healTimes), isPlayer)
    stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
    await updateState(stateObj);
    if (!isPlayer) {
      return stateObj
    }
  }
}

energize = {
  name: "Energize",
  type: "skill",
  text: (monster, move)  => { 
    let textString = `This monster and its ally gain ${move.energyGained - move.energyReq} energy`;
    return textString
  },
  energyReq: 0,
  energyGained: 2,
  heal: 0,
  healTimes: 0,
  upgrades: 0,
  action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
    // let move = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex].moves[moveIndex] : stateObj.opponent.fightMonsterArray[monsterIndex].moves[moveIndex]
    stateObj = await gainEnergyAll(stateObj, monsterIndex, moveIndex, isPlayer);
    stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
    await updateState(stateObj);
    if (!isPlayer) {
      return stateObj
    }
  }
}

let cantripMoves = [bite, coilup, bloodsucker, swipe, claw, heal, energize]

