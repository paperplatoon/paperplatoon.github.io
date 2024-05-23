premiumHands = AA.concat(KK, QQ, AKs)

let goodPocketPairs = JJ.concat(TT, _99)
let lowMediumPocketPairs = _77.concat(_88, _66, _55, _44, _33, _22)
let suitedBroadway = AQs.concat(AJs, ATs, KQs, KJs, KTs, QJs, QTs, JTs)
let offsuitBroadway = AKo.concat(AQo, AJo, ATo, KQo, KJo, KTo, QJo, QTo, JTo)
let mediumSuitedConnectors = T9s.concat(_98s, _87s, _76s, _65s)
let lowSuitedConnectors = _54s.concat(_43s, _32s)
let mediumOffsuitConnectors = T9o.concat(_98o, _87o, _76o, _65o)
let lowOffsuitConnectors = _54o.concat(_43o, _32o)
let highSingleGapSuited = J9s.concat(T8s, J8s, _97s, T7s)
let mediumSingleGapSuited = _86s.concat(_75s, _64s, _53s, _42s)

let suitedAces = A9s.concat(A8s, A7s, A6s, A5s, A4s, A3s, A2s)
let suitedKings = K9s.concat(K8s, K7s, K6s, K5s, K4s, K3s, K2s)
let suitedQueens = Q9s.concat(Q8s, Q7s, Q6s,  Q5s, Q4s, Q3s, Q2s)
let suitedJacks = J8s.concat(J7s, J6s, J5s, J4s, J3s, J2s)
let suitedTens = T6s.concat(T5s, T4s, T3s, T2s)

let highOffsuitAces = A9o.concat(A8o, A7o)
let lowOffsuitAces = A6o.concat(A5o, A4o, A3o, A2o)
let highKings = K9o.concat(K8o, K7o, Q9o)


//createPlayer to actually roll the random numbers
//at some point need to CheckForNuts
let looseAggressivePlayer = {
    
    //limp
    "limpArray": lowOffsuitConnectors.concat(suitedTens, suitedJacks),
    "callwithJunkPreFlopPercentage":  Math.random() * 0.1,
    "tooRichForJunkCallPreflopThreshold": Math.floor(Math.random() * (14 - 8 + 1) + 8),
    "trapPreflopPercentage": Math.random() * 0.2,
    //raising
    "raiseFirstInArray": premiumHands.concat(goodPocketPairs, suitedBroadway, suitedAces, offsuitBroadway, mediumSuitedConnectors, lowSuitedConnectors, lowMediumPocketPairs,
        suitedQueens, suitedKings, suitedAces, highOffsuitAces, highKings),
    "callRaisePreFlopArray": lowSuitedConnectors.concat(lowMediumPocketPairs, highSingleGapSuited, mediumSingleGapSuited, suitedQueens,suitedKings, suitedJacks, highKings, highOffsuitAces, suitedTens),
    "reRaisePreflopArray": goodPocketPairs.concat(suitedBroadway, suitedAces, offsuitBroadway, mediumSuitedConnectors),
    "WontRaisewithReRaiseThreshold": Math.floor(Math.random() * (75 - 45 + 1) + 45),
    "fourBetPreflopArray": premiumHands.concat(suitedBroadway, goodPocketPairs),
    "WontFourBetThreshold": Math.floor(Math.random() * (200 - 120 + 1) + 120),
    "wontCallRaiseThreshold": Math.floor(Math.random() * (120 - 40 + 1) + 40),
    //flop
    "MinRankToContinueOnFlop": 1,
    "trapFlopPercentage": Math.random() * 0.5,
    "tooRichForJunkCallFlopThreshold": Math.floor(Math.random() * (40 - 20 + 1) + 20),
    "BluffFlopPercentage": Math.random() * 1.2,
    "minRankToRaiseOnFlop": 3,
    "chanceOfRaisingWithDraw": Math.random(),
    "chanceofCallingWithDraw": Math.random() * 1.2,
    "ThresholdForFoldingEvenWithDraw": Math.floor(Math.random() * (200 - 100 + 1) + 100),
    "ThresholdForFoldWithLessThanTrips": Math.floor(Math.random() * (200 - 80 + 1) + 80),
    "HeroCallPercentage": Math.random() * 1.1,
}

let tightAggressivePlayer = {
    //limp
    "limpArray": lowSuitedConnectors.concat(suitedKings, suitedQueens, highOffsuitAces, highKings, lowSuitedConnectors, highSingleGapSuited, mediumSingleGapSuited),
    "callwithJunkPreFlopPercentage":  Math.random() * 0.1,
    "tooRichForJunkCallPreflopThreshold": Math.floor(Math.random() * (9 - 3 + 1) + 3),
    "trapPreflopPercentage": Math.random() * 0.3,
    //raising
    "raiseFirstInArray": premiumHands.concat(goodPocketPairs, suitedBroadway, suitedAces, offsuitBroadway, mediumSuitedConnectors, lowMediumPocketPairs),
    "callRaisePreFlopArray": mediumSuitedConnectors.concat(lowMediumPocketPairs, suitedKings, offsuitBroadway, suitedAces),
    "reRaisePreflopArray": goodPocketPairs.concat(suitedBroadway, premiumHands),
    "WontRaisewithReRaiseThreshold": Math.floor(Math.random() * (60 - 30 + 1) + 30),
    "fourBetPreflopArray": premiumHands,
    "WontFourBetThreshold": Math.floor(Math.random() * (175 - 75 + 1) + 75),
    "wontCallRaiseThreshold": Math.floor(Math.random() * (50 - 30 + 1) + 30),
    //flop
    "MinRankToContinueOnFlop": Math.floor(Math.random() * (3 - 2 + 1) + 2),
    "trapFlopPercentage": Math.random() * 0.5,
    "tooRichForJunkCallFlopThreshold": Math.floor(Math.random() * (20 - 5 + 1) + 5),
    "BluffFlopPercentage": Math.random() * 0.6,
    "minRankToRaiseOnFlop": 4,
    "chanceOfRaisingWithDraw": Math.random() * 0.3,
    "chanceofCallingWithDraw": Math.random() * 0.75,
    "ThresholdForFoldingEvenWithDraw": Math.floor(Math.random() * (65 - 30 + 1) + 30),
    "ThresholdForFoldWithLessThanTrips": Math.floor(Math.random() * (100 - 45 + 1) + 45),
    "HeroCallPercentage": Math.random() * 0.6,
}

let loosePassivePlayer = {
    //limp
    "limpArray": lowOffsuitConnectors.concat(lowMediumPocketPairs, lowSuitedConnectors, lowOffsuitAces, highOffsuitAces, mediumSuitedConnectors,
        mediumSingleGapSuited, highSingleGapSuited, highKings, suitedAces, suitedKings, suitedQueens, suitedJacks, suitedTens),
    "callwithJunkPreFlopPercentage":  Math.random() * 0.9,
    "tooRichForJunkCallPreflopThreshold": Math.floor(Math.random() * (15 - 6 + 1) + 6),
    "trapPreflopPercentage": Math.random() * 0.5,
    //raising
    "raiseFirstInArray": premiumHands.concat(goodPocketPairs, suitedBroadway, offsuitBroadway),
    "callRaisePreFlopArray": lowOffsuitConnectors.concat(lowMediumPocketPairs, lowSuitedConnectors, lowOffsuitAces, highOffsuitAces, mediumSuitedConnectors,
        mediumSingleGapSuited, highSingleGapSuited, highKings, suitedAces, suitedKings, suitedQueens, suitedJacks, offsuitBroadway),
    "reRaisePreflopArray": suitedBroadway.concat(goodPocketPairs),
    "WontRaisewithReRaiseThreshold": Math.floor(Math.random() * (40 - 15 + 1) + 15),
    "fourBetPreflopArray": premiumHands,
    "WontFourBetThreshold": Math.floor(Math.random() * (100 - 50 + 1) + 50),
    "wontCallRaiseThreshold": Math.floor(Math.random() * (100 - 50 + 1) + 50),
    //flop
    "MinRankToContinueOnFlop": Math.floor(Math.random() * (3 - 2 + 1) + 2),
    "trapFlopPercentage": Math.random() * 1.2,
    "tooRichForJunkCallFlopThreshold": Math.floor(Math.random() * (45 - 20 + 1) + 20),
    "BluffFlopPercentage": Math.random() * 0.2,
    "minRankToRaiseOnFlop": 4,
    "chanceOfRaisingWithDraw": Math.random()* 0.1,
    "chanceofCallingWithDraw": Math.random() * 1.3,
    "ThresholdForFoldingEvenWithDraw": Math.floor(Math.random() * (200 - 90 + 1) + 90),
    "ThresholdForFoldWithLessThanTrips": Math.floor(Math.random() * (200 - 90 + 1) + 90),
    "HeroCallPercentage": Math.random() * 1.2,
}

let potentialPlayerDetailsArrays = [tightAggressivePlayer, looseAggressivePlayer, loosePassivePlayer]

function generatePlayerDetails() {
    return potentialPlayerDetailsArrays[Math.floor(Math.random() * potentialPlayerDetailsArrays.length)]
}



lojackRange = AA.concat(KK, QQ, JJ, TT, _99, _88, _77, _66, _55, 
    AKs, AQs, AJs, ATs, A9s, A8s, A7s, A6s, A5s, A4s, A3s, 
    AKo, AQo, AJo, ATo, KQo, KJo, QJo, 
    KQs, KJs, KTs, K9s, K8s, QJs, QTs, Q9s, JTs, J9s, T9s)

hijackRange = lojackRange.concat(A2s, KTo, QTo, Q8s, K7s, K6s, _98s, _87s, _76s, _55)

cutoffRange = hijackRange.concat(K5s, K4s, K3s, Q7s, Q6s, J8s, T8s, T7s, _97s, _44, _33, A9o, A8o, JTo)

buttonRange = cutoffRange.concat(K2s, Q5s, Q4s, Q3s, J7s, J6s, J5s, J4s, T6s, _86s, _75s, _65s, _64s, _54s, _53s,
    K9o, K8o, Q9o, T9o, _98o, _22, A7o, A6o, A5o, A4o)

smallBlindRaiseRange = AKs.concat(ATs, A9s, A8s, A7s, A5s, KK, KJs, KTs, K8s, K5s, K3s, K2s, AQo, QQ, QJs, QTs, Q5s, Q4s, Q3s, Q2s,
    AJo, KJo, JJ, JTs, T9s, K9o, Q9o, J9s, _98o, A7o, K7o, A6o, _65s, _64s, _54s, _53s, A4o, _33, _22)



raiseFirstIn= {
    "Dealer": buttonRange,
    "SB": smallBlindRaiseRange,
    "BB": buttonRange,
    "UTG": lojackRange,
    "Lojack": hijackRange,
    "CO": cutoffRange,
}

looseLojackRange = AA.concat(KK, QQ, JJ, TT, _99, _88, _77, _66, _55, _44, _33,
    AKs, AQs, AJs, ATs, A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s,
    AKo, AQo, AJo, ATo, KQo, KJo, QJo, JTo,
    KQs, KJs, KTs, K9s, K8s, K7s, K6s, K5s, K4s, K3s, K2s,
    QJs, QTs, Q9s, JTs, J9s, T9s, _98s, _87s, _65s, _54s,)

looseHijackRange = lojackRange.concat(A2s, KTo, QTo, Q8s, K7s, K6s, _98s, _87s, _76s, _55, T9o, _98o, _87o, _43s, _32s, T8s, _97s, A9o, A8o,
    Q7s, Q6s, Q5s, Q4s, Q3s, Q2s,
    J8s, J7s, )

looseCutoffRange = hijackRange.concat(K5s, K4s, K3s, Q7s, Q6s, T8s, T7s, _86s)

looseButtonRange = cutoffRange.concat(K2s, Q5s, Q4s, Q3s, J6s, J5s, J4s, T6s, _86s, _75s, _65s, _64s, _54s, _53s,
    K9o, K8o, Q9o, T9o, _98o, _22, A7o, A6o, A5o, A4o)

looseSmallBlindRaiseRange = AKs.concat(ATs, A9s, A8s, A7s, A5s, KK, KJs, KTs, K8s, K5s, K3s, K2s, AQo, QQ, QJs, QTs, Q5s, Q4s, Q3s, Q2s,
    AJo, KJo, JJ, JTs, T9s, K9o, Q9o, J9s, _98o, A7o, K7o, A6o, _65s, _64s, _54s, _53s, A4o, _33, _22)


