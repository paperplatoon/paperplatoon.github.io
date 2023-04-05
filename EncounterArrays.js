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
  ]

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
    }
  ]
  
  let hardEncountersMjs = [
    {
      opponents: [opponentMonsters.strengthgym1, opponentMonsters.strengthgymguard],
      goldReward: 35,
      XP: 20,
    },
    {
      opponents: [easyEncounters.e4, easyEncounters.e5, easyEncounters.e4],
      goldReward: 35,
    },
    {
      opponents: [opponentMonsters.healgymguard2, opponentMonsters.healgym1],
      goldReward: 35,
      XP: 20
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
      opponents: [opponentMonsters.healgymguard1, opponentMonsters.healgym1],
      goldReward: 35,
      XP: 20
    },
    {
      opponents: [opponentMonsters.healgymguard2, opponentMonsters.strengthgym1],
      goldReward: 35,
      XP: 20
    },
  ]
  
  let bossEncountersMjs = [
    {
      opponents: [opponentMonsters.angryboss],
      goldReward: 125,
      boss: true,
      XP: 70
    },
    {
      opponents: [opponentMonsters.deflateboss],
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