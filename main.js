
//if big blind reaches player, we auto go to the flop

//action seems to stop at playing after clicking divs

//big blind's cards change after flop?
//bug when clicking callDiv as small blind -> currentBet is only 2?
//raise div doesn't work if player is big blind lmfao
//implement bet slider
//separate out top pair vs middle pair vs bottom pair for hand ranks
//give each player an individual willDraw level
//isHandDraw doesn't seem to be working, at least for flush draws....

async function updateState(newStateObj) {
    state = {...newStateObj}
    await checkForDeath(newStateObj)
    await renderScreen(state)
    return state
}

async function renderScreen(stateObj) {
    await renderPokerTable(stateObj)
}

async function startGame() {
    await newHand(state, true)
}

async function createDeckAndShuffle(stateObj) {
    console.log('shuffling')
    let fullDeck = [];
    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    let suits = ['h', 'c', 'd', 's']; // Hearts, Clubs, Diamonds, Spades

    suits.forEach(suit => {
        ranks.forEach(rank => {
            fullDeck.push(rank + suit);
        });
    });

    fullDeck = shuffle(fullDeck)
    stateObj = immer.produce(stateObj, (newState) => {
        state.currentDeck = fullDeck
    })
    await updateState(stateObj)
    return stateObj 
}

async function dealToEachPlayer(stateObj) {
    console.log("dealing")
    for (i = 0; i < stateObj.players.length; i++) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.players[i].currentHand.push(newState.currentDeck[0])
            newState.currentDeck.splice(0, 1)
        })
        await pause(100)
        await updateState(stateObj)
    }
    return stateObj
}

async function dealPublicCards(stateObj, numberCards) {
    console.log("dealing " + numberCards + " cards")
    stateObj = await makeCurrentPlayer(stateObj, "SB")

    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentBet = 0;
        if (newState.groupSuspicion > 2) {
            newState.groupSuspicion -= 2
        } else {
            newState.groupSuspicion = 0
        }
        
        newState.players.forEach(player => {
            player.currentBet = 0
            player.hasChecked = false;
            if (player.currentSuspicion > 1) {
                player.currentSuspicion -= 2
            } else {
                player.currentSuspicion = 0
            }
            if (player.name === "player") {
                if (player.currentSuspicion > 1) {
                    player.currentSuspicion -= 3
                } else {
                    player.currentSuspicion = 0
                }
            }
        })
    })
    
    for (let i=0; i < numberCards; i++) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.publicCards.push(newState.currentDeck[0])
            newState.currentDeck.splice(0, 1) 
        })
        await pause(100)
        await updateState(stateObj)     
    }
    return stateObj
}

async function playerFolds(stateObj, playerIndex) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.players[playerIndex].isStillInHand = false
    })
    await updateState(stateObj)
    return stateObj
}


async function putInBet(stateObj, playerIndex, betSize) {
    stateObj = immer.produce(stateObj, (newState) => {
        let playerBet = newState.players[playerIndex].currentBet
        let extraMoney = betSize - playerBet
        //is the player putting in all their money?
        extraMoney = (newState.players[playerIndex].stackSize >= (extraMoney)) ? extraMoney : newState.players[playerIndex].stackSize;
        newState.players[playerIndex].stackSize -= extraMoney;
        newState.players[playerIndex].currentBet += extraMoney
        //is the current bet larger
        if (newState.players[playerIndex].currentBet > newState.currentBet) {
            newState.currentBet = newState.players[playerIndex].currentBet
            newState.lastBettor = newState.players[playerIndex].currentSeat
        }
        newState.currentPot += extraMoney;
        console.log(stateObj.players[playerIndex].name + " has put in " + extraMoney)
    })
    
    await updateState(stateObj)
    document.querySelector(".pot-div").classList.add("money-in-pot")
    await pause(800)
    return stateObj;
}

async function makeCurrentPlayer(stateObj, playerIndex) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentPlayer = playerIndex
    })
    stateObj = await updateState(stateObj)
    return stateObj
}

async function putInBlinds(stateObj) {
    const SBIndex = stateObj.players.findIndex(player => player.currentSeat === "SB")
    const BBIndex = stateObj.players.findIndex(player => player.currentSeat === "BB")

    stateObj = await makeCurrentPlayer(stateObj, "SB")
    stateObj = await putInBet(stateObj, SBIndex, 1)

    stateObj = await makeCurrentPlayer(stateObj, "BB")
    stateObj = await putInBet(stateObj, BBIndex, 3)
    stateObj = await makeCurrentPlayer(stateObj, "UTG")
    return stateObj
}

async function preFlopAction(stateObj) { 
    console.log('starting preflop action')
    if (stateObj.actionOnPlayer === false) {
        for (let i=0; i < stateObj.players.length; i++) {
            console.log("players are " + stateObj.players)
            console.log("current player is " + stateObj.currentPlayer)
            const playerInd = stateObj.players.findIndex(player => player.currentSeat === stateObj.currentPlayer);
            player = stateObj.players[playerInd];
            if (player.currentBet === stateObj.currentBet) { //if the current players bet has matched the current bet, then it's time for the flop
                let playersStillInHand = stateObj.players.filter(player => player.isStillInHand);
                if (playersStillInHand.length === 1) {  //if everyone's folded, player has won the pot
                    console.log("currentPlayer wins the pot as everyone folds")
                    stateObj = immer.produce(stateObj, (newState) => {
                        newState.players[playerInd].stackSize += newState.currentPot
                        newState.currentPot = 0
                    })
                    stateObj = await newHand(stateObj)
                    return stateObj
                } else { //otherwise, it's time to see a flop
                    if (player.name === "player" && player.currentSeat === "BB"){
                        console.log("as big blind, player has check option")
                        stateObj = await actionOnPlayer(stateObj, true)
                        return true
                    } else {
                        console.log("preflop action closed - time to see a flop")
                        console.log("stateObj before dealing cards" + stateObj)
                        stateObj = await dealPublicCards(stateObj, 3)
                        stateObj = await postFlopAction(stateObj)
                        return true
                    }  
                }
            } else if (player.isStillInHand === false) {
                //skip the player because they're no longer in the hand
            } else if (player.name === "player") {
                // console.log("stateObj after moving action to player cards" + JSON.stringify(stateObj))
                stateObj = await actionOnPlayer(stateObj, true)
                return true
            } else {
                //limp
                //if no raise yet
                const callThreshold = player.playerDetails['callwithJunkPreFlopPercentage']
                const callValue = Math.random()
                //console.log(player.name + " has a call value of " + callValue.toFixed(2) + " and a threshold of " + callThreshold.toFixed(2))
                const willCall = callValue < player.callwithJunkPreFlopPercentage
                let moneyIn = stateObj.currentBet
                if (stateObj.currentBet === 3) {
                    //####FIX - SHOULD INSTEAD CONSTRUCT EACH PLAYER TO HAVE A FOURBET AND RFI RANGE 
                    if (isHandInRange(player.currentHand, player.playerDetails['raiseFirstInArray'])) {
                        if (callValue < player.playerDetails['trapPreflopPercentage']) {
                            stateObj = await putInBet(stateObj, playerInd, moneyIn)
                            console.log(player.name + " is trapping")
                        } else {
                            stateObj = await putInBet(stateObj, playerInd, moneyIn*4)
                            console.log(player.name + " is raising with RFI")
                        }
                    } else if (isHandInRange(player.currentHand, player.playerDetails['limpArray'])) {
                        stateObj = await putInBet(stateObj, playerInd, moneyIn)
                        console.log(player.name + " is limping")
                    } else {
                        if (willCall) {
                            stateObj = await putInBet(stateObj, playerInd, moneyIn)
                            console.log(player.name + " is limping with crap")
                        } else {
                            console.log("player is folding preflop when bet is 3")
                            stateObj = await playerFolds(stateObj, playerInd)
                            console.log("player has folded")
                        }
                    }
                } else if (stateObj.currentBet < player.playerDetails['WontRaisewithReRaiseThreshold']) {
                    if (isHandInRange(player.currentHand, player.playerDetails['reRaisePreflopArray'])) {
                        if (callValue < player.playerDetails['trapPreflopPercentage']) {
                            console.log(player.name + " is trapping instead of re raising")
                            stateObj = await putInBet(stateObj, playerInd, moneyIn)
                        } else {
                            console.log(player.name + " is raising with re-raise range")
                            stateObj = await putInBet(stateObj, playerInd, moneyIn*4)
                        }
                    } else if (isHandInRange(player.currentHand, player.playerDetails['callRaisePreFlopArray'])) {
                        stateObj = await putInBet(stateObj, playerInd, moneyIn)
                        console.log(player.name + " is calling with their range")
                    } else if ((callValue*2 < callThreshold && stateObj.currentBet < player.playerDetails['tooRichForJunkCallPreflopThreshold'])) {
                        stateObj = await putInBet(stateObj, playerInd, moneyIn)
                        console.log(player.name + " is calling with crap cuz of cheap price")
                    } else {
                        stateObj = await playerFolds(stateObj, playerInd)
                    }
                } else if (stateObj.currentBet < player.playerDetails['WontFourBetThreshold']) {
                    if (isHandInRange(player.currentHand, player.playerDetails['fourBetPreflopArray'])) {
                        if (callValue < player.playerDetails['trapPreflopPercentage']) {
                            console.log(player.name + " is trapping with a 4bet hand")
                            stateObj = await putInBet(stateObj, playerInd, moneyIn)
                        } else {
                            console.log(player.name + " is raising with a 4bet hand")
                            stateObj = await putInBet(stateObj, playerInd, moneyIn*4)
                        }
                    } else if (isHandInRange(player.currentHand, player.playerDetails['reRaisePreflopArray'])) {
                        stateObj = await putInBet(stateObj, playerInd, moneyIn)
                        console.log(player.name + " is calling with a really good hand bc the pot is pricey")
                    }else {
                        stateObj = await playerFolds(stateObj, playerInd)
                    }
                } else {
                    if (isHandInRange(player.currentHand, player.playerDetails['fourBetPreflopArray'])) {
                        console.log(player.name + " is calling with a premium")
                            stateObj = await putInBet(stateObj, playerInd, moneyIn)
                    } else {
                            stateObj = await playerFolds(stateObj, playerInd)
                    }
                }
                stateObj = await nextPlayer(stateObj)
                await pause(500)
                stateObj = await updateState(stateObj) 
            }    
        }
    }
    return stateObj
    
}

async function postFlopAction(stateObj) {
    console.log('starting postflop action')
    if (stateObj.actionOnPlayer === false) {
        //reset bets to 0 for the flop 
        for (let i=0; i < stateObj.players.length; i++) {
            const playerInd = stateObj.players.findIndex(player => player.currentSeat === stateObj.currentPlayer);
            player = stateObj.players[playerInd];
            if ( (player.currentBet === stateObj.currentBet && stateObj.currentBet !== 0) || (player.hasChecked === true && stateObj.currentBet === 0)) {
                let playersStillInHand = stateObj.players.filter(player => player.isStillInHand);
                if (playersStillInHand.length ===1) {
                    stateObj = await determineHandWinner(stateObj)
                    stateObj = await newHand(stateObj)
                }
                if (stateObj.publicCards.length < 5) {
                    stateObj = await dealPublicCards(stateObj, 1)
                    await postFlopAction(stateObj)
                    return stateObj
                } else {
                    stateObj = await determineHandWinner(stateObj)
                    await newHand(stateObj)
                    return stateObj
                }
            } else if (player.isStillInHand === false) {
                //skip the player because they're no longer in the hand
            } else if (player.name === "player") {
                console.log("you found the player so postflop action stopped")
                // console.log("postflopoption:", JSON.stringify(stateObj));
                return stateObj
            } else {
                playerHandRank = getBestPokerHand(player.currentHand.concat(stateObj.publicCards))[1]
                console.log(player.name + " hand rank is " + playerHandRank)
                const bluffOrTrap = Math.random()
                console.log(player.name + " rank to continue on flop is " + player.playerDetails['MinRankToContinueOnFlop'] + " and rank to raise flop is " + player.playerDetails['minRankToRaiseOnFlop'] )
                if (stateObj.currentBet === 0) {
                    if (playerHandRank >= player.playerDetails['MinRankToContinueOnFlop']) {
                        //even if player has good hand, they trap sometimes
                        if (bluffOrTrap > player.playerDetails['trapFlopPercentage']) {
                            if (stateObj.currentPot >= player.playerDetails['ThresholdForFoldWithLessThanTrips']) {
                                console.log(player.name + " is betting out with a decent hand for cheap cuz pot is high ")
                                stateObj = await putInBet(stateObj, playerInd, Math.floor(stateObj.currentPot/3.5))    
                            } else {
                                console.log(player.name + " is betting out with a decent hand")
                                stateObj = await putInBet(stateObj, playerInd, stateObj.currentPot/2)
                            }
                        } else {
                            console.log(player.name + " is checking to trap")
                            stateObj = await playerChecks(stateObj, playerInd)
                        }
                    } else {
                        //if player has bad hand, they bluff at pot sometimes
                        if (bluffOrTrap < player.playerDetails['BluffFlopPercentage']) {
                            if (stateObj.currentPot >= player.playerDetails['ThresholdForFoldWithLessThanTrips']) {
                                console.log(player.name + " is bluffing cheap cuz the pot is high")
                                stateObj = await putInBet(stateObj, playerInd, Math.floor(stateObj.currentPot/3.5))    
                            } else {
                                console.log(player.name + " is bluffing")
                                stateObj = await putInBet(stateObj, playerInd, stateObj.currentPot/2)
                            }
                        } else {
                            console.log(player.name + " is checking with a bad hand")
                            stateObj = await playerChecks(stateObj, playerInd)
                        }
                    }
                } else if (stateObj.currentBet < player.playerDetails['tooRichForJunkCallFlopThreshold']) {
                    if (playerHandRank >= player.playerDetails['minRankToRaiseOnFlop']) {
                        //even if player has good hand, they trap sometimes
                        if (bluffOrTrap > player.playerDetails['trapFlopPercentage']) {
                            console.log(player.name + " is raising with a good hand")
                                stateObj = await putInBet(stateObj, playerInd, Math.floor(stateObj.currentBet * Math.floor(Math.random() * (3 - 2 + 1) + 2)))
                        } else {
                            console.log(player.name + " is trapping with a good raise hand")
                            stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                        }
                    } else if (playerHandRank >= player.playerDetails['MinRankToContinueOnFlop']) {
                        //player always calls small bet if they have a good hand but not great
                        if (playerHandRank === 1) {
                            if (bluffOrTrap < 0.5) {
                                stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                                console.log(player.name + " continuation bets with nothing cuz they're reckless")
                            } else {
                                console.log(player.name + " is checking with a bad hand, even though they're reckless")
                                stateObj = await playerFolds(stateObj, playerInd)
                            }
                        } else {
                            console.log(player.name + " is calling with a decent hand")
                            stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                        }
                    } else {
                        //if player has bad hand, they bluff at pot sometimes
                        //YOU ARE HERE
                        if ((bluffOrTrap * 3) < player.playerDetails['BluffFlopPercentage']) {
                            console.log(player.name + " is raising as a bluff with a crap hand")
                                stateObj = await putInBet(stateObj, playerInd, Math.floor(stateObj.currentBet * Math.floor(Math.random() * (3 - 2 + 1) + 2)))   
                        } else {
                            console.log(player.name + " is hero calling with a bad hand cuz the pot is cheap")
                            if (bluffOrTrap < player.playerDetails['HeroCallPercentage']) {
                                stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                            } else {
                                console.log(player.name + " is folding even tho pot is cheap")
                                stateObj = await playerFolds(stateObj, playerInd)
                            }
                        }
                    }
                } else if (stateObj.currentBet < player.playerDetails['ThresholdForFoldWithLessThanTrips']) {
                    if (playerHandRank >= player.playerDetails['minRankToRaiseOnFlop']) {
                        if (playerHandRank === 1) {
                            if (bluffOrTrap < 0.5) {
                                stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                                console.log(player.name + " calls bets with nothing cuz they're reckless")
                            } else {
                                console.log(player.name + " is folding with nothing even though they're reckless")
                                stateObj = await playerFolds(stateObj, playerInd)
                            }
                        } else {
                            console.log(player.name + " is calling with a decent hand")
                            stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                        }
                    } else if (playerHandRank >= player.playerDetails['MinRankToContinueOnFlop']) {
                        if ((bluffOrTrap * 2) < player.playerDetails['HeroCallPercentage']) {
                            console.log(player.name + " is hero calling even though the pot is big bc they have a decent hand")
                            stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                        } else {
                            console.log(player.name + " is folding even with a decent hand cuz pot is big")
                            stateObj = await playerFolds(stateObj, playerInd)
                        }
                    } else {
                        console.log(player.name + " is folding with crap")
                        stateObj = await playerFolds(stateObj, playerInd)
                    }
                } else {
                    if (playerHandRank >= player.playerDetails['minRankToRaiseOnFlop']) {
                        console.log(player.name + " is calling even tho bet is huge cuz they have a good hand")
                        stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                    } else if (playerHandRank >= player.playerDetails['MinRankToContinueOnFlop']) {
                        if ((bluffOrTrap * 4) < player.playerDetails['HeroCallPercentage']) {
                            console.log(player.name + " is hero calling with a decent hand even tho pot is huge")
                            stateObj = await putInBet(stateObj, playerInd, stateObj.currentBet)
                        } else {
                            console.log(player.name + " is folding with a decent hand cuz pot is huge")
                            stateObj = await playerFolds(stateObj, playerInd)
                        }
                    } else {
                        console.log(player.name + " is folding with crap")
                        stateObj = await playerFolds(stateObj, playerInd)
                    }
                }
                stateObj = await nextPlayer(stateObj)
                await pause(500)
                stateObj = await updateState(stateObj) 
            }
        }
        stateObj = await updateState(stateObj)
    }
    return stateObj  
}
    

async function makeCardVisible(stateObj, player, cardNum) {
    const currentPlayerIndex = stateObj.players.findIndex(loopPlayer => loopPlayer.name === player.name)
    const playerIndex = stateObj.players.findIndex(loopPlayer => loopPlayer.name === "player")
    if (player.name !== "player") {
        stateObj = immer.produce(stateObj, (newState) => {
            let modifier = (player.isStillInHand) ? 2 : 1
            if (cardNum === 0) {
                newState.players[currentPlayerIndex].leftCardVisible = true
                newState.players[currentPlayerIndex].currentSuspicion += Math.floor(2.5 * modifier)
                newState.players[playerIndex].currentSuspicion += 1 * modifier
            } else {
                newState.players[currentPlayerIndex].rightCardVisible = true
                newState.players[currentPlayerIndex].currentSuspicion += Math.floor(2.5 * modifier)
                newState.players[playerIndex].currentSuspicion += 1 * modifier 
            }
        })
    }
    
    stateObj = await updateState(stateObj)
    return stateObj
}

async function swapHandWithDeck(stateObj, player, cardNum) {
    const currentPlayerIndex = stateObj.players.findIndex(loopPlayer => loopPlayer.name === player.name)
    const playerIndex = stateObj.players.findIndex(loopPlayer => loopPlayer.name === "player")

    stateObj = immer.produce(stateObj, (newState) => {
        randomCardIndex = Math.floor(Math.random() * stateObj.currentDeck.length)
        let modifier = (player.isStillInHand || player.name === "player") ? 2 : 1
        let playerCardToSwap = player.currentHand[cardNum]
        newState.players[currentPlayerIndex].currentHand[cardNum] = newState.currentDeck[randomCardIndex]
        newState.currentDeck[randomCardIndex] = playerCardToSwap
        newState.players[currentPlayerIndex].currentSuspicion += 2 * modifier
        newState.players[playerIndex].currentSuspicion += 1 * modifier
    })
    stateObj = await updateState(stateObj)
    return stateObj
}

async function swapWithPlayerLowestCard(stateObj, player, cardNum) {
    const currentPlayerIndex = stateObj.players.findIndex(loopPlayer => loopPlayer.name === player.name)
    const playerIndex = stateObj.players.findIndex(loopPlayer => loopPlayer.name === "player")

    stateObj = immer.produce(stateObj, (newState) => {
        let playHand = newState.players[playerIndex].currentHand
        let playerCardIndex = (getCardRank(playHand[0]) > getCardRank(playHand[1])) ? 1 : 0
        let playerCardToSwap = playHand[playerCardIndex]
        let NPCCardToSwap = newState.players[currentPlayerIndex].currentHand[cardNum]

        let modifier = (player.isStillInHand || player.name === "player") ? 2 : 1
        newState.players[currentPlayerIndex].currentHand[cardNum] = playerCardToSwap
        newState.players[playerIndex].currentHand[playerCardIndex] = NPCCardToSwap
        newState.players[currentPlayerIndex].currentSuspicion += Math.floor(3 * modifier)
        newState.players[playerIndex].currentSuspicion += 2 * modifier
    })
    stateObj = await updateState(stateObj)
    return stateObj
}


async function renderPokerTable(stateObj) {
    document.body.innerHTML = ''
    screenDiv = createDiv("screen-div")
    screenDiv.classList.add("centered")

    const tableDiv = document.createElement('div');
    tableDiv.id = 'tableDiv';
    


    // Create player divs and card divs
    const positions = [
        { top: '100%', left: '35%' },
        { top: '65%', left: '-5%' },
        { top: '10%', left: '-15%' },
        { top: '-35%', left: '27%' },
        { top: '0%', left: '78%' },
        { top: '70%', left: '74%' }
    ];

    for (let i = 0; i < 6; i++) {
        if (stateObj.currentScreen === "chooseVisibleCard") {
            playerDiv = createPlayerDiv(state.players[i], positions[i].top, positions[i].left, "chooseToTurnVisible")
        } else if (stateObj.currentScreen === "chooseToSwap") {
            playerDiv = createPlayerDiv(state.players[i], positions[i].top, positions[i].left, "chooseToSwap")
        } else if (stateObj.currentScreen === "swapPlayerNPC") {
            playerDiv = createPlayerDiv(state.players[i], positions[i].top, positions[i].left, "swapPlayerNPC")
        }
        
        tableDiv.appendChild(playerDiv);
    }

    const potDiv = createPotDiv(stateObj)
    const publicCardsDiv = createPublicCardsDiv(stateObj)
    let foldDiv = createFoldDiv(stateObj)
    const callDiv = createCallDiv(stateObj)
    const betDiv = createBetDiv(stateObj)
    let RaiseDiv = createRaiseDiv(stateObj)
    const checkDiv = createCheckDiv(stateObj)

    
    const playerActionsDiv = createDiv('player-actions-div')    
    const playerIndex = stateObj.players.findIndex(player => player.name === "player") 
    if (stateObj.currentBet === 0 && stateObj.publicCards.length > 0) {
        playerActionsDiv.append(checkDiv, betDiv)
    } else if (stateObj.players[playerIndex] == "BB" && stateObj.currentBet === 3) {
        playerActionsDiv.append(checkDiv, RaiseDiv)
    } else {
        playerActionsDiv.append(foldDiv, callDiv, RaiseDiv)
    }

    const playerSpellsDiv = createDiv('player-spells-div')
    const seeCardDiv = createSeeCardDiv(stateObj)
    const swapCardDiv = createSwapCardDiv(stateObj)
    const swapPlayerNPCDiv = createSwapPlayerCardDiv(stateObj)
    playerSpellsDiv.append(seeCardDiv, swapCardDiv, swapPlayerNPCDiv)

    const topDiv = createDiv("top-screenhalf-div")
    topDiv.append(playerActionsDiv, playerSpellsDiv)

    tableDiv.append(publicCardsDiv, potDiv)

    screenDiv.append(topDiv, tableDiv)
    document.body.append(screenDiv)
}

async function resetHand(stateObj) {
    if (stateObj.currentPot > 0) {
        stateObj = immer.produce(stateObj, (newState) => {
            const indices = stateObj.players.map((obj, index) => obj.isStillInHand ? index : null).filter(index => index !== null);
            winnerindex = indices[Math.floor(Math.random() * indices.length)]
            newState.players[winnerindex].stackSize += newState.currentPot
            console.log (newState.currentPot + " pot given to " + newState.players[winnerindex].name)
        })
    }
    stateObj = immer.produce(stateObj, (newState) => {
        newState.players.forEach(player => {
            player.currentBet = 0
            player.isStillInHand = true
            player.currentHand = []
            player.hasChecked = false;
            player.currentSuspicion = 0;
            if (player.name !== "player") {
                player.leftCardVisible = false;
                player.rightCardVisible = false
            }
            
        })
        
        //
        newState.currentPot = 0
        newState.currentBet = 0
        newState.groupSuspicion = 0
        newState.publicCards = []
        newState.gameStarted = true
        newState.actionOnPlayer = false;
    })
    return stateObj
}


async function newHand(stateObj, firstHand=false) {

    stateObj = await resetHand(stateObj)
    if (!firstHand) {
        stateObj = await moveButton(stateObj)
    }
    stateObj = await updateState(stateObj)
    
    stateObj = await createDeckAndShuffle(stateObj)
    stateObj = await dealToEachPlayer(stateObj)
    stateObj = await dealToEachPlayer(stateObj)
    stateObj = await putInBlinds(stateObj)
    console.log("before PFA, stateObj is " + stateObj)
    await preFlopAction(stateObj)
}


startGame()

