//(stateObj, monsterIndex, moveIndex) 
function createDiv(classListArray, textString=false) {
    let tempDiv = document.createElement('div');
    for (let i=0; i < classListArray.length; i++) {
        tempDiv.classList.add(classListArray[i]);
    }
    if (textString) {
        tempDiv.textContent = textString
    }
    return tempDiv
}


function createMoveDiv(monster, move)  {

    const moveDiv = createDiv(["move-div", "column"])
    const moveTopRowDiv = createDiv(["move-top-row-div", "row", "space-evenly"])
    // const moveName = createDiv(["move-name-div"], move.name)
    const moveName = createDiv(["move-name-div"])
    const moveEnergyContainer = createDiv(["move-energy-cost-div", "row"])

    if (move.energyGained - move.energyReq > 0) {
        const moveEnergySign = createDiv(["gain-energy-text", "centered"], "Gain: ")
        moveEnergyContainer.append(moveEnergySign)
        for (let i=0; i < move.energyGained - move.energyReq; i++) {
            const energyDiv = createDiv(["single-energy-div", "centered"])
            moveEnergyContainer.append(energyDiv)
        }
    } else {
        const moveEnergySign = createDiv(["cost-energy-text", "centered"], "Costs: ")
        moveEnergyContainer.append(moveEnergySign)
        for (let i=0; i < move.energyReq - move.energyGained; i++) {
            const energyDiv = createDiv(["single-energy-div", "centered"])
            moveEnergyContainer.append(energyDiv)
        }
    }
    moveText = createDiv(["move-text-div"], move.text(monster, move))
    
    moveTopRowDiv.append(moveEnergyContainer, moveName)
    
    moveDiv.append(moveTopRowDiv, moveText)
    return moveDiv
}

function createEndTurnButton(stateObj) {
    const endTurnDiv = createDiv(["end-turn-button", "centered"], "End Turn")
    endTurnDiv.onclick = async function() {
        await enemyTurn(stateObj)
    }
    return endTurnDiv
}

function createMonsterDiv(stateObj, monsterIndex, isPlayer) {
    let monster = (isPlayer) ? stateObj.player.fightMonsterArray[monsterIndex] : stateObj.opponent.fightMonsterArray[monsterIndex]

    const monsterDiv = createDiv(["monster-div"])
    const monsterTopRowDiv = createDiv(["monster-top-row-div", "row", "space-evenly"])
    const monsterNameDiv = createDiv(["monster-name-div"], monster.name)
    const currentEnergyContainer = createDiv(["current-monster-energy-div", "row", "centered"])
    const currentEnergyText = createDiv(["current-monster-energy-text", "centered"], "Energy:")
    currentEnergyContainer.append(currentEnergyText)
    for (let i=0; i < monster.currentEnergy; i++) {
        const energyDiv = createDiv(["single-energy-div", "centered"])
        currentEnergyContainer.append(energyDiv)
    }
    const monsterHPDiv = createDiv(["monster-hp"], ("HP: " + monster.currentHP + "/" + monster.maxHP))
    monsterTopRowDiv.append(monsterNameDiv, monsterHPDiv)

    const monsterMovesDiv = createDiv(["monster-moves-div"])
    for (let i=0; i<monster.moves.length; i++) {
        let moveDiv = createMoveDiv(monster, monster.moves[i])
        if (stateObj.selectedMutationAction) {
            if (stateObj.doesMoveQualify(monster.moves[i]) && isPlayer) {
                moveDiv.classList.add("move-to-pick")
                moveDiv.onclick = async function() {
                    console.log("firing mutation after move click" )
                    await stateObj.selectedMutationAction(stateObj, monsterIndex, i)
                }
            }
            //change so if selectedMutationAction, is not showing player-move
        } else {
            if (isPlayer && monster.currentEnergy >= monster.moves[i].energyReq && monster.hasMoved === false) {
                moveDiv.classList.add("player-move")
                moveDiv.onclick = async function() {
                    await monster.moves[i].action(stateObj, monsterIndex, i, isPlayer)
                }
            } else if (!isPlayer) {
                let moveIndex = pickEnemyMove(stateObj, monsterIndex)
                if (moveIndex === i) {
                    moveDiv.classList.add("enemy-move")
                }
            }
        }
        monsterMovesDiv.append(moveDiv)
    }

    const avatarContainerDiv = createDiv(["avatar-container", "centered"])
    const avatarDiv = document.createElement('img');
    avatarDiv.classList.add("avatar");
    let mutationNumber = (monster.mutations > monster.avatar.length) ? monster.avatar.length : monster.mutations
    let avatar = monster.avatar[mutationNumber]
    avatarDiv.src = avatar;
    avatarDiv.setAttribute("draggable", "false")
    if (isPlayer) {
        if (monsterIndex === stateObj.targetedPlayerMonster) {
            avatarDiv.classList.add("player-targeted")
            avatarDiv.classList.add("player-pulse")
        } else {
            avatarDiv.onclick = async function() {
                await changePlayerMonster(stateObj, monsterIndex)
            }
        }
    } else {
        if (monsterIndex === stateObj.targetedMonster) {
            avatarDiv.classList.add("opponent-targeted")
        } else {
            avatarDiv.onclick = async function() {
                await changeEnemyMonster(stateObj, monsterIndex)
            }
        }
    }
    avatarContainerDiv.append(avatarDiv)
    monsterDiv.append(monsterTopRowDiv, currentEnergyContainer, avatarContainerDiv, monsterMovesDiv)
    return monsterDiv
}

function createScreenDiv(stateObj) {
    console.log("creating screen div")
    document.body.innerHTML = ''

    const screenDiv = createDiv(["screen-div", "column", "space-evenly"])
    const monstersDiv = createDiv(["monsters-div", "row", "space-evenly"])

    const playerSideDiv = createDiv(["side-div", "player-side-div", "row", "space-evenly"])
    if (stateObj.player.fightMonsterArray) {
        for (let i=0; i < stateObj.player.fightMonsterArray.length; i++) {
            let monsterDiv = createMonsterDiv(stateObj, i, true)
            playerSideDiv.append(monsterDiv)
        }
    }

    const opponentSideDiv = createDiv(["side-div", "opponent-side-div", "row", "space-evenly"])
    for (let i=0; i < stateObj.opponent.fightMonsterArray.length; i++) {
        let monsterDiv = createMonsterDiv(stateObj, i, false)
        opponentSideDiv.append(monsterDiv)
    }
    
    const mutationsDiv = createDiv(["mutations-array-div", "row", "centered"])
    for (let i=0; i < stateObj.player.handMutationArray.length; i++) {
        mutateDiv = createMutationDiv(stateObj, stateObj.player.handMutationArray[i], i)
        mutationsDiv.append(mutateDiv)
    }
    endTurnButton = createEndTurnButton(stateObj)
    mutationsDiv.append(endTurnButton)

    monstersDiv.append(playerSideDiv, opponentSideDiv)
    screenDiv.append(monstersDiv, mutationsDiv)
    const chooseMonsterDiv = createChooseMonster(stateObj)
    document.body.append(screenDiv, chooseMonsterDiv)
    if (stateObj.playerCaptureBalls > 0 && stateObj.opponent.fightMonsterArray[stateObj.targetedMonster].currentHP <= 5) {
        let captureDiv = createUseCaptureBall(stateObj)
        document.body.append(captureDiv) 
    }

}


function createMutationDiv(stateObj, mutation, mutationArrayIndex, ) {
    const mutationDiv = createDiv(["mutation-div", "column", "centered", "space-evenly"])
    const mutationNameDiv = createDiv(["mutation-name", "centered"], mutation.name)
    const mutationTextDiv = createDiv(["mutation-text", "centered"], mutation.text)
    mutationDiv.append(mutationNameDiv, mutationTextDiv)
    if (stateObj.playerUsedMutationThisTurn === false) {
        mutationDiv.onclick = async function(){
            if (stateObj.player.handMutationArray[mutationArrayIndex].pickAttack) {
                stateObj = immer.produce(stateObj, (newState) => {
                    newState.selectedMutationAction = newState.player.handMutationArray[mutationArrayIndex].action
                    newState.selectedMutationIndex = mutationArrayIndex
                    newState.doesMoveQualify = mutation.mutationCheck
                })
                await updateState(stateObj)
            } else {
                await stateObj.player.handMutationArray[mutationArrayIndex].action(stateObj, mutationArrayIndex, stateObj.targetedPlayerMonster)
            }
            
            
        }
        mutationDiv.classList.add("mutation-div-active")
    }
    return mutationDiv
}

function renderPickMutation(stateObj, mutationArray, index) {
    const mutationDiv = createDiv(["mutation-div", "column", "centered", "space-evenly"])
    const mutationNameDiv = createDiv(["mutation-name", "centered"], mutationArray[index].name)
    const mutationTextDiv = createDiv(["mutation-text", "centered"], mutationArray[index].text)
    mutationDiv.append(mutationNameDiv, mutationTextDiv)
    mutationDiv.onclick = async function(){
        console.log("clicked mutation div")
        await addMutation(stateObj, mutationArray, index)
    }
    mutationDiv.classList.add("mutation-div-active")
    document.body.append(mutationDiv)
}

function renderPickMonster(stateObj, index) {
    let monster = stateObj.player.fullMonsterArray[index]
    const monsterDiv = createDiv(["monster-div"])
    const monsterTopRowDiv = createDiv(["monster-top-row-div", "row", "space-evenly"])
    const monsterNameDiv = createDiv(["monster-name-div"], monster.name)
    const monsterHPDiv = createDiv(["monster-hp"], ("HP: " + monster.currentHP + "/" + monster.maxHP))
    monsterTopRowDiv.append(monsterNameDiv, monsterHPDiv)

    const monsterMovesDiv = createDiv(["monster-moves-div"])
    for (let i=0; i<monster.moves.length; i++) {
        let moveDiv = createMoveDiv(monster, monster.moves[i])
        moveDiv.classList.add("player-move")
        monsterMovesDiv.append(moveDiv)
    }


     const avatarContainerDiv = createDiv(["avatar-container", "centered"])
    const avatarDiv = document.createElement('img');
    avatarDiv.classList.add("avatar");
    let mutationNumber = (monster.mutations > monster.avatar.length) ? monster.avatar.length : monster.mutations
    let avatar = monster.avatar[mutationNumber]
    avatarDiv.src = avatar;
    avatarDiv.setAttribute("draggable", "false")
    avatarContainerDiv.append(avatarDiv)
    button1 = createDiv(["choose-monster-button"], "Make Monster 1")
    button1.onclick = async function(){
        await makeMonster(stateObj, index, 0)
    }
    button2 = createDiv(["choose-monster-button"], "Make Monster 2")
    button2.onclick = async function(){
        await makeMonster(stateObj, index, 1)
    }

    monsterDiv.append(monsterTopRowDiv, avatarContainerDiv, monsterMovesDiv)
    if (index >= 2) {
        monsterDiv.append(button1, button2)
    }
    return monsterDiv
}

// renderPickNewMove
function renderPickNewMove(stateObj, index) {
    let monster = stateObj.player.fightMonsterArray[index]
    const monsterDiv = createDiv(["monster-div"])
    const monsterTopRowDiv = createDiv(["monster-top-row-div", "row", "space-evenly"])
    const monsterNameDiv = createDiv(["monster-name-div"], monster.name)
    const monsterHPDiv = createDiv(["monster-hp"], ("HP: " + monster.currentHP + "/" + monster.maxHP))
    monsterTopRowDiv.append(monsterNameDiv, monsterHPDiv)

    const monsterMovesDiv = createDiv(["monster-moves-div"])
    for (let i=0; i<monster.moves.length; i++) {
        let moveDiv = createMoveDiv(monster, monster.moves[i])
        moveDiv.classList.add("player-move")
        monsterMovesDiv.append(moveDiv)
    }
    let potentialMoves = [...cantripMoves, ...powerfulMoves]
    let potentialMove = potentialMoves[Math.floor(Math.random() * potentialMoves.length)]
    const newMoveDiv = createMoveDiv(monster, potentialMove)
    monsterMovesDiv.append(newMoveDiv)

    const avatarDiv = document.createElement('img');
    avatarDiv.classList.add("avatar");
    let mutationNumber = (monster.mutations > monster.avatar.length) ? monster.avatar.length : monster.mutations
    let avatar = monster.avatar[mutationNumber]
    avatarDiv.src = avatar;
    avatarDiv.setAttribute("draggable", "false")
    button1 = createDiv(["choose-monster-button"], "Choose This Upgrade")
    button1.onclick = async function(){
        await giveMonsterMove(stateObj, index, monster, potentialMove)
    }
    monsterDiv.append(monsterTopRowDiv, avatarDiv, monsterMovesDiv)
    monsterDiv.append(button1)
    return monsterDiv
}

function createReturnToFightDiv(stateObj) {
    const returnDiv = createDiv(["change-status-button"], "Return to Fight")
    returnDiv.onclick = async function(){
        stateObj = await changeStatus(stateObj, Status.inFight)
        await updateState(stateObj)
    }
    return returnDiv
}

function createUseCaptureBall(stateObj) {
    const returnDiv = createDiv(["change-status-button"], "Catch Target Pokemon (" + stateObj.playerCaptureBalls + ")")
    returnDiv.onclick = async function(){
        stateObj = await catchTargetMonster(stateObj)
        await updateState(stateObj)
    }
    return returnDiv
}

function createChooseMonster(stateObj) {
    const returnDiv = createDiv(["change-status-button"], "Choose Monster Order")
    returnDiv.onclick = async function(){
        console.log("clicked choose Monster")
        stateObj = await changeStatus(stateObj, Status.choosingMonsterOrder)
        await updateState(stateObj)
    }
    return returnDiv
}