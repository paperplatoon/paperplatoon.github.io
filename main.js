//fix player monsters reset at end of fight

const Status = {
    pickMutationReward: renderChooseMutationReward,
    inFight: createScreenDiv,
    choosingMonsterOrder: renderChooseMonsterOrder,
    choosingMoveReward: renderChooseMoveReward,
  };

state = {
    player: {
        name: "Player",
        fightMonsterArray: [],
        fullMonsterArray: [otter, snake],

        
        handMutationArray: [],
        fullMutationArray: [...startingMutationArray],
        temporaryFullMutationArray: [...startingMutationArray],
    },

    opponent: {
        name: "Opponent",
        fightMonsterArray: [chipmunk, vampireBat],
    },
    targetedMonster: 0,
    targetedPlayerMonster: 0,
    playerUsedMutationThisTurn: false,
    playerCaptureBalls: 1,
    currentLevel: 0,
    selectedMutationAction: false,
    selectedMutationIndex: false,
    doesMoveQualify: false,

    playerStartingMutations: 4,
    status: Status.inFight,
}


async function updateState(newStateObj) {
    newStateObj = await checkForDeath(newStateObj)
    state = {...newStateObj}
    newStateObj.status(state)
    return state
}

function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}

async function pause(timeValue) {
    return new Promise(res => setTimeout(res, timeValue))
}





async function dealDamage(stateObj, monsterIndex, moveIndex, isPlayer, extraDamage=0) {
    let targetOpponentIndex = Math.floor(Math.random() * stateObj.player.fightMonsterArray.length)
    stateObj = immer.produce(stateObj, (newState) => {   
        let targetMonster = (isPlayer) ? newState.opponent.fightMonsterArray[newState.targetedMonster] : newState.player.fightMonsterArray[targetOpponentIndex]
        let userMonster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
        let move = userMonster.moves[moveIndex]
        let damage = calcMonsterDamage(userMonster, move)
        damage += extraDamage
        userMonster.nextAttackDamage = 0
        targetMonster.currentHP -= (damage * move.damageTimes)  
    })
    if (isPlayer) {
        document.querySelectorAll(".player-side-div .avatar")[monsterIndex].classList.remove("player-pulse")
        document.querySelectorAll(".player-side-div .avatar")[monsterIndex].classList.add("player-windup")
        document.querySelectorAll(".opponent-side-div .avatar")[stateObj.targetedMonster].classList.add("opponent-impact")
        await pause(500)
        document.querySelectorAll(".player-side-div .avatar")[monsterIndex].classList.remove("player-windup")
        document.querySelectorAll(".opponent-side-div .avatar")[stateObj.targetedMonster].classList.remove("opponent-impact")
    } else {
        document.querySelectorAll(".opponent-side-div .avatar")[monsterIndex].classList.add("opponent-windup")
        document.querySelectorAll(".player-side-div .avatar")[targetOpponentIndex].classList.add("player-impact")
        document.querySelectorAll(".player-side-div .avatar")[targetOpponentIndex].classList.remove("player-pulse")
        await pause(800)
        document.querySelectorAll(".opponent-side-div .avatar")[monsterIndex].classList.remove("opponent-windup")
        document.querySelectorAll(".player-side-div .avatar")[targetOpponentIndex].classList.remove("player-impact")
    }
    
    return stateObj
}

async function dealDamageBoth(stateObj, monsterIndex, moveIndex, isPlayer, extraDamage=0) {
    stateObj = immer.produce(stateObj, (newState) => {   
        let targetArray = (isPlayer) ? newState.opponent.fightMonsterArray : newState.player.fightMonsterArray
        let userMonster = (isPlayer) ? newState.player.fightMonsterArray[monsterIndex] : newState.opponent.fightMonsterArray[monsterIndex]
        let move = userMonster.moves[moveIndex]
        let damage = calcMonsterDamage(userMonster, move)
        damage += extraDamage
        userMonster.nextAttackDamage = 0
        for (let i = 0; i < targetArray.length; i++) {
            targetArray[i].currentHP -= (damage * move.damageTimes) 
        }
    })
    if (isPlayer) {
        document.querySelectorAll(".player-side-div .avatar")[monsterIndex].classList.remove("player-pulse")
        document.querySelectorAll(".player-side-div .avatar")[monsterIndex].classList.add("player-windup")
        for (let i = 0; i < stateObj.opponent.fightMonsterArray.length; i++) {
            document.querySelectorAll(".opponent-side-div .avatar")[i].classList.add("opponent-impact")
        }
        await pause(500)
        document.querySelectorAll(".player-side-div .avatar")[monsterIndex].classList.remove("player-windup")
        for (let i = 0; i < stateObj.opponent.fightMonsterArray.length; i++) {
            document.querySelectorAll(".opponent-side-div .avatar")[i].classList.remove("opponent-impact")
        }
    } else {
        document.querySelectorAll(".opponent-side-div .avatar")[monsterIndex].classList.add("opponent-windup")
        for (let i = 0; i < stateObj.player.fightMonsterArray.length; i++) {
            document.querySelectorAll(".player-side-div .avatar")[i].classList.add("player-impact")
            document.querySelectorAll(".player-side-div .avatar")[i].classList.remove("player-pulse")
        }
        await pause(800)
        document.querySelectorAll(".opponent-side-div .avatar")[monsterIndex].classList.remove("opponent-windup")
        for (let i = 0; i < stateObj.player.fightMonsterArray.length; i++) {
            document.querySelectorAll(".player-side-div .avatar")[i].classList.remove("player-impact")
        }
    }
    
    return stateObj
}



function calcMonsterDamage(monster, move) {
    return (move.damage + monster.nextAttackDamage + monster.strength)
}






async function playerUsedMutation(stateObj, index, monsterIndex)  {
    stateObj = immer.produce(stateObj, (newState) => {   
        newState.playerUsedMutationThisTurn = true  
        let removeIndex = newState.player.fullMutationArray.findIndex(mutation => mutation.name === newState.player.handMutationArray[index].name)
        newState.player.handMutationArray.splice(index, 1)
        newState.player.fullMutationArray.splice(removeIndex, 1)
        newState.selectedMutationAction = false;
        newState.selectedMutationIndex = false;
        newState.doesMoveQualify = false;
        newState.player.fightMonsterArray[monsterIndex].mutations += 1
      })
    return stateObj
}

function randomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min)
}



async function drawMutationCard(stateObj) {
    if (stateObj.player.fullMutationArray.length > 0) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.player.handMutationArray.push(stateObj.player.temporaryFullMutationArray[0])
            newState.player.temporaryFullMutationArray.splice(0, 1)
        })
        await updateState(stateObj)
    }
    return stateObj
}

async function resetPlayerTurn(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.playerUsedMutationThisTurn = false;
        newState.player.fightMonsterArray.forEach(monster => {
            monster.hasMoved = false;
        });
        newState.opponent.fightMonsterArray.forEach(monster => {
            monster.hasMoved = false;
        });
    })
    return stateObj
}

function pickEnemyMove(stateObj, monsterIndex) {
    let monster = stateObj.opponent.fightMonsterArray[monsterIndex]
    let currentMoveIndex = 0
    for (let i=0; i < monster.moves.length; i++) {
        if (monster.moves[i].energyReq <= monster.currentEnergy) {
            currentMoveIndex = i
        }
    }
    return currentMoveIndex
}

async function enemyTurn(stateObj) {
    for (let i =0; i < stateObj.opponent.fightMonsterArray.length; i++) {
        enemyMoveIndex = pickEnemyMove(stateObj, i)
        stateObj = await stateObj.opponent.fightMonsterArray[i].moves[enemyMoveIndex].action(stateObj, i, enemyMoveIndex, false)
    }
    stateObj = await resetPlayerTurn(stateObj)
    await updateState(stateObj)
}

async function chooseEnemy(stateObj) {
    const [index1, index2] = getUniqueRandomIndexes(enemyArray, 2);

    stateObj = immer.produce(stateObj, (newState) => {
        newState.opponent.fightMonsterArray = [{...enemyArray[index1]}, {...enemyArray[index2]}];
        newState.player.fightMonsterArray = [{...newState.player.fullMonsterArray[0]}, {...newState.player.fullMonsterArray[1]}];
        let increaseBy = ((newState.currentLevel) * 10 * 2);
        for (let i = 0; i < newState.opponent.fightMonsterArray.length; i++) {
            newState.opponent.fightMonsterArray[i].maxHP += increaseBy;
            newState.opponent.fightMonsterArray[i].currentHP += increaseBy
        }
    });

    return stateObj;
}

function getUniqueRandomIndexes(array, count) {
    let indexes = [];
    while (indexes.length < count) {
        let index = Math.floor(Math.random() * array.length);
        if (!indexes.includes(index)) {
            indexes.push(index);
        }
    }
    return indexes;
}

function getRandomMutationPool() {
    const rand = Math.random();
    if (rand < 0.75) {
        return commonMutationPool;
    } else if (rand < 0.95) {
        return uncommonMutationPool;
    } else {
        return rareMutationPool;
    }
}

function pickRewardMutations() {
    const selectedMutations = [];
    const pickedMutations = new Set();

    while (selectedMutations.length < 3) {
        const mutationPool = getRandomMutationPool();
        const mutationIndex = Math.floor(Math.random() * mutationPool.length);
        const mutation = mutationPool[mutationIndex];

        if (!pickedMutations.has(mutation)) {
            selectedMutations.push(mutation);
            pickedMutations.add(mutation);
        }
    }
    return selectedMutations;
}

async function pickStartingMutations(stateObj) {
    for (let i=0; i < stateObj.playerStartingMutations; i++) {
        stateObj = await drawMutationCard(stateObj)
        await pause(300)
    }
    return stateObj
}

async function resetPlayerStats(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.targetedPlayerMonster = 0
        newState.targetedMonster = 0
        newState.playerUsedMutationThisTurn = false
        newState.player.fightMonsterArray.forEach(monster => {
            monster.hasMoved = false;
            monster.currentHP = monster.maxHP
            monster.currentEnergy = monster.startCombatWithEnergy;
            monster.nextAttackDamage = 0;
        })
        //shuffle and pick mutations
        newState.player.handMutationArray = [];
        newState.player.fullMutationArray = shuffleArray(newState.player.fullMutationArray)
        newState.player.temporaryFullMutationArray = [...newState.player.fullMutationArray]
    })
    stateObj = await pickStartingMutations(stateObj)
    return stateObj
}

async function startEncounter(stateObj) {
    stateObj = await chooseEnemy(stateObj)
    stateObj = await resetPlayerStats(stateObj)
    stateObj = await updateState(stateObj)
    return stateObj
}

async function checkForDeath(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        for (let i = newState.player.fightMonsterArray.length - 1; i >= 0; i--) {
            let monster = newState.player.fightMonsterArray[i];
            if (monster.currentHP <= 0) {
                console.log(monster.name + " fainted!");
                newState.player.fightMonsterArray.splice(i, 1);
                newState.targetedPlayerMonster = 0
            }
        }

        for (let i = newState.opponent.fightMonsterArray.length - 1; i >= 0; i--) {
            let monster = newState.opponent.fightMonsterArray[i];
            if (monster.currentHP <= 0) {
                console.log(monster.name + " fainted!");
                newState.opponent.fightMonsterArray.splice(i, 1);
                newState.targetedMonster = 0
            }
        }
    })

    if (stateObj.player.fightMonsterArray.length < 1) {
        console.log("player lost!")
        stateObj = await startEncounter(stateObj)
    } else if (stateObj.opponent.fightMonsterArray.length < 1 && stateObj.status === Status.inFight) {
        console.log("player won!")
        stateObj = immer.produce(stateObj, (newState) => {
            newState.currentLevel +=1
            
        })
        stateObj = await changeStatus(stateObj, Status.pickMutationReward)
    }
    return stateObj
}

async function changeStatus(stateObj, newStatus) {
    stateObj = immer.produce(stateObj, (newState) => {
      newState.status = newStatus;
    })
    return stateObj;
  }

function renderChooseMutationReward(stateObj) {
    rewardArray = pickRewardMutations()
  
    document.body.innerHTML = ""
    renderPickMutationList(stateObj, rewardArray);
    // skipToTownButton(stateObj, "I choose not to add any of these cards to my deck (+5 gold)", ".remove-div", cardSkip=true);
};

function renderPickMutationList(stateObj, mutationArray) {
    mutationArray.forEach(function (mutationObj, index) {
      renderPickMutation(stateObj, mutationArray, index)
    })
}

//await makeMonster(stateObj, index, 0)
async function makeMonster(stateObj, monsterIndex, indexToChange) {
    stateObj = immer.produce(stateObj, (newState) => {
        newMonster = newState.player.fullMonsterArray[monsterIndex]
        oldMonster = newState.player.fullMonsterArray[indexToChange]
        newState.player.fullMonsterArray[indexToChange] = newMonster
        newState.player.fullMonsterArray[monsterIndex] = oldMonster
    })
    await updateState(stateObj)
}

async function addMutation(stateObj, mutationArray, index) {
    console.log('firing add mutation')
    stateObj = immer.produce(stateObj, (newState) => {
        newState.player.fullMutationArray.push(mutationArray[index])
    })
    stateObj = await changeStatus(stateObj, Status.choosingMoveReward)
    await updateState(stateObj)
}



async function giveMonsterMove(stateObj, index, monster, potentialMove){
    console.log('firing give move')
    let findMoveIndex = 0
    for (let i=0; i < monster.moves.length; i++) {
        if (potentialMove.energyReq > monster.moves[i].energyReq) {
            findMoveIndex = i+1
        }
    }
    stateObj = immer.produce(stateObj, (newState) => {
        newState.player.fightMonsterArray[index].moves.splice(findMoveIndex, 0, potentialMove)

        for (let i=0; i < stateObj.player.fightMonsterArray.length; i++) {
            let fullArrayIndex = newState.player.fullMonsterArray.findIndex(monster => monster.id === newState.player.fightMonsterArray[i].id)
            newState.player.fullMonsterArray[fullArrayIndex] = newState.player.fightMonsterArray[i]
        }
    })
    
    await updateState(stateObj)
    stateObj = await changeStatus(stateObj, Status.inFight)
    await startEncounter(stateObj)
}

function renderChooseMonsterOrder(stateObj) {
    document.body.innerHTML = ""
    renderPickMonsterOrder(stateObj);
    returnButton = createReturnToFightDiv(stateObj)
    document.body.append(returnButton)
    // skipToTownButton(stateObj, "I choose not to add any of these cards to my deck (+5 gold)", ".remove-div", cardSkip=true);
};

function renderPickMonsterOrder(stateObj) {
    let monstersDiv = createDiv(["pick-monsters-div", "row"])
    stateObj.player.fullMonsterArray.forEach(function (monsterObj, index) {
      monstersDiv.append(renderPickMonster(stateObj, index))
    })

    document.body.append(monstersDiv)
}

function renderChooseMoveReward(stateObj) {
    document.body.innerHTML = ""
    renderPickNewMonsterMove(stateObj);
    returnButton = createReturnToFightDiv(stateObj)
    document.body.append(returnButton)
    // skipToTownButton(stateObj, "I choose not to add any of these cards to my deck (+5 gold)", ".remove-div", cardSkip=true);
};

function renderPickNewMonsterMove(stateObj) {
    let monstersDiv = createDiv(["pick-monsters-div", "row"])
    stateObj.player.fullMonsterArray.forEach(function (monsterObj, index) {
      monstersDiv.append(renderPickNewMove(stateObj, index))
    })

    document.body.append(monstersDiv)
}

async function catchTargetMonster(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.playerCaptureBalls -= 1;
        newState.player.fullMonsterArray.push(newState.opponent.fightMonsterArray[newState.targetedMonster])
        newState.opponent.fightMonsterArray.splice(newState.targetedMonster, 1)
        newState.targetedMonster = 0
    })
    await updateState(stateObj)
} 


startEncounter(state)