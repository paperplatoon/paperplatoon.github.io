function getBestPokerHand(cards) {
    let bestHand = [];
    let bestHandRank = -1;

    let boardCardsOnly = [];
    if (cards.length  === 5) {
        boardCardsOnly = cards.slice(-3)
    } else if (cards.length === 6) {
        boardCardsOnly = cards.slice(-4)
    } else {
        boardCardsOnly = cards.slice(-5)
    }
    console.log('board cards only are ' + boardCardsOnly)

    // //sort cards from high to low to make sure that best hands start highest
    // cards.sort((a, b) => {
    //     let rankA = getCardRank(a);
    //     let rankB = getCardRank(b);
    //     return rankB - rankA;
    // });

    // Generate all combinations of 5 cards
    let cardHandLength = cards.length

    for (let i = 0; i < cardHandLength; i++) {
        for (let j = i + 1; j < cardHandLength; j++) {
            for (let k = j + 1; k < cardHandLength; k++) {
                for (let l = k + 1; l < cardHandLength; l++) {
                    for (let m = l + 1; m < cardHandLength; m++) {
                        let currentHand = [cards[i], cards[j], cards[k], cards[l], cards[m]];
                        let currentHandRank = evaluatePokerHand(currentHand);

                        if (currentHandRank > bestHandRank) {
                            bestHand = currentHand;
                            bestHandRank = currentHandRank;
                        }
                    }
                }
            }
        }
    }

    //sort best hand from high to low
    bestHand.sort((a, b) => {
        let rankA = getCardRank(a);
        let rankB = getCardRank(b);
        return rankB - rankA;
    });

    if (bestHandRank === 8 || bestHandRank === 7 || bestHandRank === 4 || bestHandRank === 3 || bestHandRank === 2) { 
        bestHand = putPairedCardsFirst(bestHand)     
    }

    let bestBoardRank = evaluatePokerHand(boardCardsOnly) 
    if (bestBoardRank === bestHandRank) {
        bestHandRank = 1
    } else if (bestBoardRank === 2 && bestHandRank === 3) {
        bestHandRank = 2
    }

    return [bestHand, bestHandRank];
}



function putPairedCardsFirst(cardArray) {
    let pairStrings = [];
    let pairRanks = []
    let nonPairStrings = [];
    let nonPairRanks = [];

    cardArray.forEach(card => {
        let cardRank = getCardRank(card);
        if (pairRanks.includes(cardRank)) {
            pairStrings.push(card)
            pairRanks.push(cardRank)
        } else if (nonPairRanks.includes(cardRank)) {
            let index = nonPairRanks.indexOf(cardRank)
            pairRanks.push(nonPairRanks[index])
            nonPairRanks.splice(index, 1)
            pairRanks.push(cardRank)
            
            pairStrings.push(nonPairStrings[index])
            nonPairStrings.splice(index, 1)
            pairStrings.push(card)
        } else {
            nonPairStrings.push(card);
            nonPairRanks.push(cardRank)
        }
    });

    let duplicates = pairStrings.sort((a, b) => {
        let rankA = getCardRank(a);
        let rankB = getCardRank(b);
        return rankB - rankA;
    });

    let nonDuplicates = nonPairStrings.sort((a, b) => {
        let rankA = getCardRank(a);
        let rankB = getCardRank(b);
        return rankB - rankA;
    });

    return duplicates.concat(nonDuplicates);
}

//check if first two cards are needed for the hand; if not, return a rank of 1
function evaluatePokerHand(hand) {

    // Sort the hand by rank - works
    hand.sort((a, b) => {
        let rankA = getCardRank(a);
        let rankB = getCardRank(b);
        return rankA - rankB;
    });

    let isFlush = false;
    let isStraight = false;
    let isHandDraw = false;

    if (hand.length === 5) {
        isFlush = isHandFlush(hand);
        isStraight = isHandStraight(hand);
    } else if (hand.length >= 4) {
        isHandDraw = isADraw(hand) 
    }
    
    let ranks = getCardRanks(hand);
    let rankCounts = getRankCounts(ranks);
    

    if (isFlush && isStraight) {
        if (ranks[0] === 10) {
            return 10; // Royal Flush
        } else {
            return 9; // Straight Flush
        }
    }
    let highestCurrentRank = 1;

    if (hasSameRankCount(rankCounts, 4)) {
        return 8; // Four of a Kind
    }

    if (hasSameRankCount(rankCounts, 3) && hasSameRankCount(rankCounts, 2)) {
        return 7; // Full House
    }

    if (isFlush) {
        return 6; // Flush
    }

    if (isStraight) {
        return 5; // Straight
    }

    if (hasSameRankCount(rankCounts, 3)) {
        return 4; // Three of a Kind
    }

    if (isTwoPair(Object.values(rankCounts))) {
        return 3; // Two Pair
    }

    if(isHandDraw) {
        return 3;
    }

    if (hasSameRankCount(rankCounts, 2)) {
        return 2; // One Pair
    }

    return 1; // High Card
}

function getCardRank(card) {
    return '23456789TJQKA'.indexOf(card[0]) + 2;
    //return 'AKQJT98765432'.indexOf(card[0]) + 2;
}

function getCardSuit(card) {
    return card[1];
}

function isHandFlush(hand) {
    let suit = getCardSuit(hand[0]);
    return hand.every(card => getCardSuit(card) === suit)
}

function isHandStraight(hand) {
    let ranks = getCardRanks(hand);
    let minRank = Math.min(...ranks);
    let maxRank = Math.max(...ranks);
    return (maxRank - minRank === 4 && new Set(ranks).size === 5);
}

function isADraw(hand) {
    // Check for 4 to a straight
    let hasStraight = false;
    for (let i = 0; i <= 1; i++) {
        //BROKEN - needs to get ranks first, and account for K, Q, J etc with array
        if (hand[i + 1] - hand[i] === 1 && hand[i + 2] - hand[i + 1] === 1 && hand[i + 3] - hand[i + 2] === 1) {
            hasStraight = true;
            break;
        }
    }

    // Check for 4 to a flush
    let suits = hand.map(card => card[1]);
    let suitCounts = {};
    suits.forEach(suit => {
        //BROKEN???
        suitCounts[suit] = suitCounts[suit] ? suitCounts[suit] + 1 : 1;
    });
    console.log("suitcounts for hand " + hand + " is " + suitCounts)
    let hasFlush = Object.values(suitCounts).some(count => count === 4);

    return hasStraight || hasFlush;
}

function getCardRanks(hand) {
    return hand.map(card => getCardRank(card));
}

function getRankCounts(ranks) {
    let counts = {};
    ranks.forEach(rank => {
        counts[rank] = counts[rank] ? counts[rank] + 1 : 1;
    });
    return counts;
}

function hasSameRankCount(rankCounts, count, excluding = 0) {
    return Object.values(rankCounts).filter(c => c !== excluding).includes(count);
}


function isTwoPair(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 2) {
            count++;
        }
    }
    return count === 2;
}

function compareHands(hand1, hand2) {
    let resultsHand1 = getBestPokerHand(hand1)
    let rankHand1 = resultsHand1[1]
    let bestHand1 = resultsHand1[0]

    let resultsHand2 = getBestPokerHand(hand2)
    let rankHand2 = resultsHand2[1]
    let bestHand2 = resultsHand2[0]

    if (rankHand1 > rankHand2) {
        return "1 wins with rank " + rankHand1;
    } else if (rankHand2 > rankHand1) {
        return "2 wins with rank " + rankHand2;

    ///NEED SPECIAL LOGIC BECAUSE JUDGING PAIR AND TWO PAIR HANDS AGAINST EACH OTHER ISN'T RIGHT LOL, PROB NOT FULL HOUSE OR THREE/FOUR OF A KIND EITHER
    } else {

        // If hands have the same rank, compare the highest cards
        let ranks1 = getCardRanks(bestHand1);
        let ranks2 = getCardRanks(bestHand2);

        for (let i = 0; i < ranks1.length; i++) {
            if (ranks1[i] > ranks2[i]) {
                return "1 wins with rank " + rankHand1;
            } else if (ranks2[i] > ranks1[i]) {
                return "2 wins with rank " + rankHand2;
            }
        }
        return "T";
    }
}


function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards
}

async function pause(timeValue) {
    return new Promise(res => setTimeout(res, timeValue))
}

function isHandInRange(playerCards, playerRange) {
    const sortedPlayerCards = playerCards.sort();

    for (let hand of playerRange) {
        // Sort the hand for comparison
        let sortedHand = hand.sort();
        if (arraysAreEqual(sortedPlayerCards, sortedHand)) {
            return true;
        }
    }
    return false;
}

// Helper function to check if two arrays are equal
function arraysAreEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

seatPositions = [
    "Dealer",
    "SB",
    "BB",
    "UTG",
    "Lojack",
    "CO"
  ]

//player at playerIndex has their .currentSeat property updated to the next in line
async function moveToNextPlayer(stateObj, playerIndex) {
    stateObj = immer.produce(stateObj, (newState) => {
        player = newState.players[playerIndex]
        const playerSeatIndex = seatPositions.findIndex(seatPosition => seatPosition === player.currentSeat)
        player.currentSeat = (playerSeatIndex === 5) ? "Dealer" : seatPositions[(playerSeatIndex+1)]
    })
    return stateObj
} 

//all players have their .currentSeat property updated to next in line
async function moveButton(stateObj) {
    for (i=0; i < stateObj.players.length; i++) {
        stateObj = await moveToNextPlayer(stateObj, i)
    }
    await updateState(stateObj)
    return stateObj
}

//state.currentPlayer goes to the next player
async function nextPlayer(stateObj) {
    stateObj = immer.produce(stateObj, async (newState) => {
        //find the seatPositions index of the current Player
        let currentPlayerIndex = seatPositions.findIndex(seatPosition => seatPosition === newState.currentPlayer)
        newState.currentPlayer = (currentPlayerIndex === 5) ? "Dealer" : seatPositions[(currentPlayerIndex+1)] 
    })
    return stateObj
}

async function makeCurrentPlayer(stateObj, seatToMake) {
    stateObj = immer.produce(stateObj, async (newState) => {
        newState.currentPlayer = seatToMake 
    })
    await updateState(stateObj)
    return stateObj
}

async function playerChecks(stateObj, indexToCheck) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.players[indexToCheck].hasChecked = true 
    })
    await updateState(stateObj)
    return stateObj
}

async function actionOnPlayer(stateObj, changeStatus) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.actionOnPlayer = changeStatus 
    })
    await updateState(stateObj)
    return stateObj
}

async function playerFolds(stateObj, playerIndex) {
    stateObj = immer.produce(stateObj, async (newState) => {
        newState.players[playerIndex].isStillInHand = false
        newState.players[playerIndex].currentSuspicion = 0
        console.log(newState.players[playerIndex].name + " folds") 
    })
    await updateState(stateObj)
    return stateObj
}
//need to 
async function determineHandWinner(stateObj) {
    let playersStillInHand = stateObj.players.filter(player => player.isStillInHand);
    stateObj = immer.produce(stateObj, (newState) => {
        for (let i =0; i < playersStillInHand.length; i++) {
            const index = stateObj.players.findIndex(loopPlayer => loopPlayer.name === playersStillInHand[i].name)
            newState.players[index].leftCardVisible = true;
            newState.players[index].rightCardVisible = true;
        }
    })
    while (playersStillInHand.length > 1) {
        const player1Hand = playersStillInHand[0].currentHand.concat(stateObj.publicCards)
        const player2Hand = playersStillInHand[1].currentHand.concat(stateObj.publicCards)
        let compareResult = compareHands(player1Hand, player2Hand)

        if (compareResult[0] === "1") {
            playersStillInHand.splice(1, 1)
        } else if (compareResult[0] === "2") {
            playersStillInHand.splice(0, 1)
        } else {
            if (playersStillInHand.length === 2) {
                console.log("tie = pot should be split!")
                break
            } else {
                const tiedPlayer = playersStillInHand.shift()
                playersStillInHand.push(tiedPlayer)
                console.log("tie - moving player to end")
            }
        }
    }
    const winnerIndex = stateObj.players.findIndex(player => player.name === playersStillInHand[0].name)
    stateObj = immer.produce(stateObj, (newState) => {
        winnerStats =  getBestPokerHand(newState.players[winnerIndex].currentHand.concat(newState.publicCards))
        newState.players[winnerIndex].stackSize += newState.currentPot
        console.log (newState.players[winnerIndex].name + " wins " + newState.currentPot + " with " + winnerStats[0] )
        newState.currentPot = 0;
        newState.currentPlayer = stateObj.players[winnerIndex].currentSeat
    })
    await updateState(stateObj)
    await pause(6000)
    return stateObj
}

//winner should flash animation
async function givePotToPlayer(stateObj, playerIndex) {
    console.log(stateObj.players[playerIndex].name +  " has won the pot - everyone folds")
    stateObj = immer.produce(stateObj, (newState) => {
        newState.players[playerIndex].stackSize += newState.currentPot
        newState.currentPot = 0
    })
    pause(1000)
    await updateState(stateObj)
    return stateObj;
}

async function checkForDeath(stateObj) {
    if (stateObj.groupSuspicion >= stateObj.maxGroupSuspicion) {
        alert("The group as a whole became too suspicious! You lost. Click OK to try again");
        window.location.reload();
    }
    stateObj.players.forEach(player => {
        if (player.currentSuspicion >= player.maxSuspicion) {
            alert(player.name + " became too suspicious! You lost. Click OK to try again");
            window.location.reload();
        }
    })
}

async function changeCurrentScreen(stateObj, screenString) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentScreen = screenString
    })
    await updateState(stateObj)
}
