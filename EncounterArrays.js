let mediumEncountersMjs = [
  [opponentMonsters.blockgym1],
  [opponentMonsters.strengthgym1],
  [opponentMonsters.balancegym1],
  [opponentMonsters.healgym1],
  [easyMultiEncounters.e4, easyMultiEncounters.e5, easyMultiEncounters.e4],
  [opponentMonsters.strengthgym1, opponentMonsters.strengthgymguard],

  // {
  //   opponents: [opponentMonsters.healgymguard2, opponentMonsters.blockgym1],
  //   goldReward: 35,
  //   XP: 20
  // },
  // {
  //   opponents: [opponentMonsters.strengthgymguard, opponentMonsters.blockgym1],
  //   goldReward: 35,
  //   XP: 20
  // },
  // {
  //   opponents: [opponentMonsters.strengthgymguard, opponentMonsters.healgym1],
  //   goldReward: 35,
  //   XP: 20
  // },

  // {
  //   opponents: [opponentMonsters.healgymguard2, opponentMonsters.strengthgym1],
  //   goldReward: 35,
  //   XP: 20
  // },
]


//--------------------------------------------------------------------------------------------------------------------------------
//full list of all routes
//--------------------------------------------------------------------------------------------------------------------------------
let routes = [
  //--------------------------------------------------------------------------------------------------------------------------------
  //route 1; routes[0]
  //--------------------------------------------------------------------------------------------------------------------------------
  [
    //route 1, encounter 1: routes[0][0]
    [
      [easySoloEncounters.e1],
      [easySoloEncounters.e2],
      [easySoloEncounters.e8],
      [easySoloEncounters.e9],
    ],
    //encounter 2
          
    [
      [easySoloEncounters.e3],
      //potential encounter 2: routes[0][1][1]
      [easySoloEncounters.e6],
      [easyMultiEncounters.e4, easyMultiEncounters.e5],
      [easySoloEncounters.e7],
    ],
    //encounter 3
    [
      [mediumSoloEncounters.m1],
      [mediumSoloEncounters.m2],
      [mediumSoloEncounters.m3],
      [mediumSoloEncounters.m4],
      [mediumSoloEncounters.m5],
      [mediumSoloEncounters.m6],
      [mediumSoloEncounters.mm1, mediumSoloEncounters.mm2],
      [mediumSoloEncounters.mm1, mediumSoloEncounters.mm3],
      [mediumSoloEncounters.mm2, mediumSoloEncounters.mm3],
    ],
    //encounter 4-6
    [
      [mediumSoloEncounters.m1],
      [mediumSoloEncounters.m2],
      [mediumSoloEncounters.m3],
      [mediumSoloEncounters.m4],
      [mediumSoloEncounters.m5],
      [mediumSoloEncounters.m6],
      [mediumSoloEncounters.mm1, mediumSoloEncounters.mm2],
      [mediumSoloEncounters.mm1, mediumSoloEncounters.mm3],
      [mediumSoloEncounters.mm2, mediumSoloEncounters.mm3],
    ],
    //encounter 5
    [
    [hardSoloEncounters.h1],
    [hardSoloEncounters.h2],
    [hardSoloEncounters.h3]
    ],
    //encounter 6
    [
      [hardSoloEncounters.h1],
      [hardSoloEncounters.h2],
      [hardSoloEncounters.h3]
    ],
],
  //--------------------------------------------------------------------------------------------------------------------------------
  //route 2; routes[0]
  //--------------------------------------------------------------------------------------------------------------------------------
  [ 
    //potential encounter 1
    [{
      opponents: [opponentMonsters.balanceroute2],
      goldReward: 20,
      XP: 70
    }],
    //potential encounter 2
    [{
      opponents: [bossMonsters.deflateboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
    //potential encounter 1
    [{
      opponents: [bossMonsters.angryboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
    //potential encounter 2
    [{
      opponents: [bossMonsters.deflateboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
    //potential encounter 1
    [{
      opponents: [bossMonsters.angryboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
    //potential encounter 2
    [{
      opponents: [bossMonsters.deflateboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
    //potential encounter 1
    [{
      opponents: [bossMonsters.angryboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
    //potential encounter 2
    [{
      opponents: [bossMonsters.deflateboss],
      goldReward: 125,
      boss: true,
      XP: 70
    }],
  ]
]

let bosses = [
    [bossMonsters.angryboss],
    [bossMonsters.deflateboss],
    [bossMonsters.offbalanceboss],
    [opponentMonsters.healgymboss, opponentMonsters.healgymguard2],
]


let easyEncountersMjs = [
    {
      opponents: [easySoloEncounters.e2],
      goldReward: 15,
    },
    {
      opponents: [easySoloEncounters.e1],
      goldReward: 15,
    },
    {
      opponents: [easySoloEncounters.e3],
      goldReward: 15,
    },
    {
      opponents: [easyMultiEncounters.e4, easyMultiEncounters.e5],
      goldReward: 15,
    },
    {
      opponents: [easySoloEncounters.e6],
      goldReward: 15,
    },
  ]

  
  
  
  let bossEncountersMjs = [
    {
      opponents: [bossMonsters.angryboss],
      goldReward: 125,
      boss: true,
      XP: 70
    },
    {
      opponents: [bossMonsters.deflateboss],
      goldReward: 125,
      boss: true,
      XP: 70
    },
    {
      opponents: [bossMonsters.offbalanceboss],
      goldReward: 125,
      boss: true,
      XP: 70
    },
    {
      opponents: [opponentMonsters.healgymboss, opponentMonsters.healgymguard2],
      goldReward: 125,
      boss: true,
      XP: 70
    },
    // {
    //   opponents: [opponentMonsters.deflateboss],
    //   goldReward: 125,
    //   boss: true,
    //   XP: 70
    // },
    // {
    //   opponents: [opponentMonsters.strengthgymguard, opponentMonsters.strengthgymboss, opponentMonsters.strengthgymguard],
    //   goldReward: 125,
    //   boss: true,
    //   XP: 70
    // },
  
    // {
    //   opponents: [opponentMonsters.healgymboss, opponentMonsters.healgymguard2, opponentMonsters.healgymguard1],
    //   goldReward: 125,
    //   boss: true,
    //   XP: 70
    // },
    // {
    //   opponents: [opponentMonsters.blockbossguard1, opponentMonsters.blockgymboss, opponentMonsters.blockbossguard2],
    //   goldReward: 125,
    //   boss: true,
    //   XP: 70
    // },
  ]