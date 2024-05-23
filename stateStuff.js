state = {
    players: [],
    playerMoney: 300,
    playerHand: [],
    publicCards: [],
    groupSuspicion: 0,
    maxGroupSuspicion: 10, 
    
    currentBet: 0,
    currentPot: 0,
    currentDealer: 5,
    currentPlayer: "SB",
    actionOnPlayer: false,
    gameStarted: false,

    currentDeck: [],
    //currentScreen: "chooseVisibleCard",
    currentScreen: "chooseToSwap",

}

const possibleNames = ["Alex", "Casey", "Charlie", "Dakota", "Emerson", "Finn", "Harper", "Jamie", "Jordan", "Kai", "Morgan", "Parker", "Quinn", "Reese", "Riley", "River", "Rowan", "Skyler", "Taylor"];
createSeatPositions = [
  "SB",
  "BB",
  "UTG",
  "Lojack",
  "CO",
]

function Player() {
    this.name = false;
    this.currentHand = [];
    this.leftCardVisible = false;
    this.rightCardVisible = false;
    this.leftCardDealt = false;
    this.rightCardDealt = false;
    this.currentSeat = false;
    this.currentSuspicion = 0;
    this.maxSuspicion = 10;
    this.stackSize = 1000; // Arbitrary starting amount
    this.isStillInHand = true;
    this.currentBet = 0;
    this.hasChecked = false;

    this.callwithJunkPreFlopPercentage = Math.random() * 0.4;
    this.trapPercentage = Math.random() * 0.4
    this.callRaiseWithRFI = Math.random()
  }
  
  //pick a random player type from the array
  // Create 5 AI players
function createPlayers() {
    let players = [];
    for (let i = 0; i < 5; i++) {
      let nameIndex = Math.floor(Math.random() * possibleNames.length)
      let randomName = possibleNames[nameIndex]
      possibleNames.splice(nameIndex, 1)
      let player = new Player();
      player.name = randomName
      player.playerDetails = generatePlayerDetails();
      player.currentSeat = createSeatPositions[i]
      players.push(player);
    }
    let playerCharacter = new Player();
    playerCharacter.name = "player"
    playerCharacter.currentSeat = "Dealer"
    playerCharacter.leftCardVisible = true;
    playerCharacter.rightCardVisible = true;
    players.push(playerCharacter);
    return players
  }


  state.players = createPlayers()
  