demolish = {
    name: "Demolish",
    type: "attack",
    text: (monster, move)  => { 
      let textString = `Deal ${calcMonsterDamage(monster, move)} damage`;
      if (move.damageTimes > 1) {
        textString += ` ${move.damageTimes} times`
      }
      return textString
    },
    energyReq: 2,
    energyGained: 0,
    damage: 20,
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
    }
}

diveBomb = {
    name: "Infection",
    type: "attack",
    text: (monster, move)  => { 
      let textString = `Deal ${calcMonsterDamage(monster, move)} damage `;
      if (move.damageTimes > 1) {
        textString += `${move.damageTimes} times`
      }
      textString += `. Heal ${calcMonsterDamage(monster, move)} HP`;
      return textString
    },
    energyReq: 2,
    energyGained: 0,
    damage: 15,
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
    }
}


plotRevenge = {
    name: "Plot Revenge",
    type: "skill",
    text: (monster, move)  => { 
      let missingHP = monster.maxHP - monster.currentHP
      let textString = `Your next attack deals ${missingHP} damage (increases when HP is lower)`;
      return textString
    },
    energyReq: 4,
    energyGained: 0,
    damage: 0,
    upgrades: 0,
      action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
        let monster = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex] : stateObj.opponent.fightMonsterArray[monsterIndex]
        let missingHP = monster.maxHP - monster.currentHP
        stateObj = await gainNextAttackDamage(stateObj, monsterIndex, missingHP, isPlayer)
        stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
        stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
        await updateState(stateObj);
        if (!isPlayer) {
          return stateObj
        }
      }
  }
  
  unleash = {
    name: "Unleash",
    type: "attack",
    text: (monster, move)  => { 
      let missingHP = monster.maxHP - monster.currentHP
      let textString = `Deals ${calcMonsterDamage(monster, move) + missingHP} damage (increases when HP is lower)`;
      if (move.damageTimes > 1) {
        textString += ` ${move.damageTimes} times`
      }
      return textString
    },
    energyReq: 3,
    energyGained: 0,
    damage: 8,
    damageTimes: 1,
    upgrades: 0,
    action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
      let monster = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex] : stateObj.opponent.fightMonsterArray[monsterIndex]
      let missingHP = monster.maxHP - monster.currentHP
      stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
      stateObj = await dealDamage(stateObj, monsterIndex, moveIndex, isPlayer, missingHP)
      stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
      await updateState(stateObj);
      if (!isPlayer) {
        return stateObj
      }
    }
  }

  venomstrike = {
    name: "Venom Strike",
    type: "attack",
    text: (monster, move)  => { 
      let textString = `Deal ${calcMonsterDamage(monster, move)} damage`;
      if (move.damageTimes > 1) {
        textString += ` ${move.damageTimes} times`
      }
      return textString
    },
    energyReq: 2,
    energyGained: 0,
    damage: 1,
    damageTimes: 8,
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
  
fullHeal = {
  name: "Full Heal",
  text: (monster, move)  => { 
    let textString = `Heal both your monsters back to full`;
    return textString
  },
  energyReq: 6,
  type: "attack",
  energyGained: 0,
  upgrades: 0,
  action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
    stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
    let healArray = (isPlayer) ? stateObj.player.fightMonsterArray : stateObj.opponent.fightMonsterArray
    for (let i = 0; i < healArray.length; i++) {
        stateObj = await healToFull(stateObj, i, isPlayer)
    }
    stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
    await updateState(stateObj);
    if (!isPlayer) {
        return stateObj
    }
  },
}
  
powerFeed = {
  name: "Dam Burst",
  type: "attack",
  text: (monster, move)  => { 
    let textString = `Deal ${calcMonsterDamage(monster, move)} damage to both enemies `;
    if (move.damageTimes > 1) {
        textString += `${move.damageTimes} times`
    }
    return textString
  },
  energyReq: 6,
  energyGained: 0,
  damage: 30,
  damageTimes: 1,
  upgrades: 0,
  action: async (stateObj, monsterIndex, moveIndex, isPlayer) => {
    let monster = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex] : stateObj.opponent.fightMonsterArray[monsterIndex] 
    let move =  monster.moves[moveIndex]
    stateObj = await gainEnergy(stateObj, monsterIndex, moveIndex, isPlayer);
    stateObj = await dealDamageBoth(stateObj, monsterIndex, moveIndex, isPlayer)
    stateObj = await monsterMoved(stateObj, monsterIndex, isPlayer)
    await updateState(stateObj);
    if (!isPlayer) {
        return stateObj
    }
  }
}

let powerfulMoves = [demolish, diveBomb, plotRevenge, unleash, venomstrike,fullHeal, powerFeed]