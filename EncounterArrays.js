let mediumEncountersMjs = [
  {
    opponents: [opponentMonsters.blockgym1],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.strengthgym1],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.balancegym1],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.healgym1],
    goldReward: 25,
  },
  {
    opponents: [easyEncounters.e4, easyEncounters.e5, easyEncounters.e4],
    goldReward: 25,
  },
  {
    opponents: [opponentMonsters.strengthgym1, opponentMonsters.strengthgymguard],
    goldReward: 35,
    XP: 20,
  },
  {
    opponents: [opponentMonsters.healgymguard2, opponentMonsters.blockgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.strengthgymguard, opponentMonsters.blockgym1],
    goldReward: 35,
    XP: 20
  },
  {
    opponents: [opponentMonsters.strengthgymguard, opponentMonsters.healgym1],
    goldReward: 35,
    XP: 20
  },

  {
    opponents: [opponentMonsters.healgymguard2, opponentMonsters.strengthgym1],
    goldReward: 35,
    XP: 20
  },
]

let hardEncounterMjs = [
  {
    opponents: [opponentMonsters.healgymguard2, opponentMonsters.healgym1],
    goldReward: 35,
    XP: 20
  },

]
//full list of all routes
let routes = [
  //route 1; routes[0]
  [
    //encounter 1 possibilities - routes[0][1]
    [
      {
        opponents: [easyEncounters.e1],
        goldReward: 15,
      },
      {
        opponents: [easyEncounters.e2],
        goldReward: 15,
      }
    ],
    //encounter 2
    [
      {
        opponents: [easyEncounters.e3],
        goldReward: 15,
      },
      {
        opponents: [easyEncounters.e6],
        goldReward: 15,
      },
      {
        opponents: [easyEncounters.e4, easyEncounters.e5],
        goldReward: 15,
      }
    ],
    //encounter 3
    [
      {
        opponents: [opponentMonsters.blockgym1],
        goldReward: 25,
      },
      {
        opponents: [opponentMonsters.strengthgym1],
        goldReward: 25,
      },
      {
        opponents: [opponentMonsters.balancegym1],
        goldReward: 25,
      },
      {
        opponents: [opponentMonsters.healgym1],
        goldReward: 25,
      }
    ],
    //encounter 4-6
    mediumEncountersMjs,
    mediumEncountersMjs,
    mediumEncountersMjs
  ],
  //route 2
  [ 
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
]


let easyEncountersMjs = [
    {
      opponents: [easyEncounters.e2],
      goldReward: 15,
    },
    {
      opponents: [easyEncounters.e1],
      goldReward: 15,
    },
    {
      opponents: [easyEncounters.e3],
      goldReward: 15,
    },
    {
      opponents: [easyEncounters.e4, easyEncounters.e5],
      goldReward: 15,
    },
    {
      opponents: [easyEncounters.e6],
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