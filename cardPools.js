let improvedCardPool = {
  //energy cards
  fireenergy: {...cards.fireenergy},
  rarefireenergy: {...cards.rareFireEnergy},
  accelerate: {...cards.accelerate},
  powerup: {...cards.powerup},


  //cards that remove
  //powerup, 

  //Max HP and health gain



  //cards per turn
}


let fireCardPool = {

// -------------------------------------------------------------  23
    
    //energy - 5
    fireenergy: {...cards.fireenergy},
    rarefireenergy: {...cards.rareFireEnergy},
    accelerate: {...cards.accelerate},
    energize: {...cards.energize},
    powerup: {...cards.powerup},

    //permanent upgrades - 6
    gainstrength: {...cards.gainstrength},
    gainstrengthtemp: {...cards.gainstrengthtemp},
    gaindextemp: {...cards.gaindextemp},
    
    feast: {...cards.feast},
    hammerandtongs: {...cards.hammerandtongs},
    makeshiftforge: {...cards.makeshiftforge},
    
    //powers - 4
    sunlight: {...cards.sunlight}, //MULTI-CARD PAYOFF
    tnt: {...cards.tnt},  // BOMBS PAYOFF
    shapedcharges: {...cards.shapedcharges},  // BOMBS PAYOFF
    expand: {...cards.expand}, // CHANGE ENERGY PAYOFF
    enlightened: {...cards.enlightened}, //SELF DAMAGE PAYOFF
    lastflourish: {...cards.lastflourish},
    smokescreen: {...cards.smokescreen},
    shieldspikes: {...cards.shieldspikes},
    longlegs: {...cards.longlegs},

    

    //strength scaling - 5
    cursedritual: {...cards.cursedritual},
    ritual: {...cards.ritual},
    brandingiron: {...cards.brandingiron},
    flagellate: {...cards.flagellate},
    hypertrain: {...cards.hypertrain},
  
    //Removable Skills - 3
    expertsforge: {...cards.expertsforge},
    simpleheal: {...cards.simpleheal},
    enjoin: {...cards.enjoin},



//MISC ABILITIES
// ------------------------------------------  8
    
    
    
    //draw - 3
    darkknowledge: {...cards.darkknowledge},
    recall: {...cards.recall},
    wellspring: {...cards.wellspring},
    //destroy energy - 2
    dampen: {...cards.dampen},
    siphon: {...cards.siphon},
    //self-scaling
    ascension: {...cards.ascension},
    buildingflame: {...cards.buildingflame},
    ignite: {...cards.ignite},

  
  
//ATTACKS
// -------------------------------------------------------------  25
    //1
    // ------------------------------------------  15
    //-6
    pickoff: {...cards.pickoff},
    //heal
    vampiricstrike: {...cards.vampiricstrike},
    //return
    clawback: {...cards.clawback},
    //multi-card
    pirouettespin: {...cards.pirouettespin},
    retreatingslash: {...cards.retreatingslash},
    //scale - 5
    kindle: {...cards.kindle},
    honeclaws: {...cards.honeclaws},
    finalblow: {...cards.finalblow},
    insight: {...cards.insight},
    clarity: {...cards.clarity},
    //strength-scalers -3 
    // finisher: {...cards.flurryfinisher},
    explode: {...cards.explode},
    fireball: {...cards.fireball},
    //energy effects - 3
    fierymissiles: {...cards.fierymissiles},
    flamewhip: {...cards.flamewhip},

    // ------------------------------------------  10
    //2+ energy 
    disablingblow: {...cards.disablingblow},
    chargedblast: {...cards.chargedblast},
    //gift energy
    energyburst: {...cards.energyburst},
    //multi-hit
    sparkbarrage: {...cards.sparkbarrage},
    //3+ energy
    //multi-enemy
    bloatedbomb: {...cards.bloatedbomb},
    weightythoughts: {...cards.weightythoughts},
    bowlthrough: {...cards.bowlthrough},
    annihilation: {...cards.annihilation},
    theocho: {...cards.theocho},
    //destroy energy
    decimate: {...cards.decimate},
  
  
//BLOCK - 21
// -------------------------------------------------------------  21
    //1
    // ------------------------------------------  14
    reformingshield: {...cards.reformingshield},
    unwaveringdefense: {...cards.unwaveringdefense},
    divinefavor: {...cards.divinefavor},

    flamingcloak: {...cards.flamingcloak},
    fortify: {...cards.fortify},
    //energy effects 
    sanguineshield: {...cards.sanguineshield},
    essencedrain: {...cards.essencedrain},
    //upgrade
    bide: {...cards.bide},
    //scale
    coatofarms: {...cards.coatofarms},
    invigorate: {...cards.invigorate},
    //draw
    meditate: {...cards.meditate},
    //multi cards - 2
    puffofsmoke: {...cards.puffofsmoke},
    skipaway: {...cards.skipaway},
    //need more backstep

    //bomb
    laytrap: {...cards.laytrap},
    selfimmolate: {...cards.selfimmolate},
    spinaway: {...cards.spinaway},
  
    //2+ energy
    // ------------------------------------------  7
    mentalblock: {...cards.mentalblock},
    infuse: {...cards.infuse},
    flamedome: {...cards.flamedome},
    friendship: {...cards.friendship},
    //energy effects
    shatteringshield: {...cards.shatteringshield},
    icyfreeze: {...cards.icyfreeze,},
    wallofichor: { ...cards.wallofichor},
  }



  let waterCardPool = {
// -------------------------------------------------------------  19
    // ------------------------------------------  10
    //energy - 3
    waterenergy: {...cards.waterenergy},
    rarefireenergy: {...cards.rareFireEnergy},
    energize: {...cards.energize},
    //REMOVABLE ABILITIES - 3
    hammerandtongs: {...cards.hammerandtongs},
    expertsforge: {...cards.expertsforge},
    sunlight: {...cards.sunlight},
    shieldspikes: {...cards.shieldspikes},
    longlegs: {...cards.longlegs},
    expand: {...cards.expand},
    buildingflame: {...cards.buildingflame},
    makeshiftforge: {...cards.makeshiftforge},
    gainstrengthtemp: {...cards.gainstrengthtemp},
    gaindextemp: {...cards.gaindextemp},
    enlightened: {...cards.enlightened},
    tnt: {...cards.tnt},
    shapedcharges: {...cards.shapedcharges},
    lastflourish: {...cards.lastflourish},
    smokescreen: {...cards.smokescreen},
    
    
    //draw and recall - 4
    darkknowledge: {...cards.darkknowledge},
    recall: {...cards.recall},
    wellspring: {...cards.wellspring},
    //destroy
    dampen: {...cards.dampen},
    
    // ------------------------------------------  9
    //poison - 7
    pinprick: {...cards.pinprick},
    pocketneedle: {...cards.pocketneedle},
    poisondrain: {...cards.poisondrain},
    basicpoison: {...cards.basicpoison},
    poisonedblade: {...cards.poisonedblade},
    venomshield: {...cards.venomshield},
    testingtoxin: {...cards.testingtoxin},
    //also blockKeep
    //chokingsmog: {...cards.chokingsmog},

    //other
    huntprey: {...cards.huntprey},
    unwaveringdefense: {...cards.unwaveringdefense},

  // ----------------------------------------------------------------  20
    //attacks
    //1
    // ------------------------------------------  10
    bodyslam: {...cards.bodyslam},
    cautiousblow: {...cards.cautiousblow},
    pickoff: {...cards.pickoff},
    //multi-card
    pirouettespin: {...cards.pirouettespin},
    retreatingslash: {...cards.retreatingslash},
    clawback: {...cards.clawback},
    //self-scaling
    ascension: {...cards.ascension},
    finalblow: {...cards.finalblow},
    clarity: {...cards.clarity},
    insight: {...cards.insight},
    endingfeint: {...cards.endingfeint},
    
    //2 +
    // ------------------------------------------  10
    guardedstrike: {...cards.guardedstrike},
    energyburst: {...cards.energyburst},
    bowlthrough: {...cards.bowlthrough},
    disablingblow: {...cards.disablingblow},
    //retain and scale
    chargedblast: {...cards.chargedblast},
    //eighthdimension: {...cards.eighthdimension},
    weightythoughts: {...cards.weightythoughts},

    //3+
    bloatedbomb: {...cards.bloatedbomb},
    precisionstrike: {...cards.precisionstrike},
    annihilation: {...cards.annihilation},
    theocho: {...cards.theocho},


  // ----------------------------------------------------------------  21

    //block
    //1 
    // ------------------------------------------  9
    essencedrain: {...cards.essencedrain},
    flamingcloak: {...cards.flamingcloak},
    bide: {...cards.bide},
    fortify: {...cards.fortify},
    forgeshield: {...cards.forgeshield},
    meditate: {...cards.meditate},
    dancersgrace: {...cards.dancersgrace},
    //multi-hit
    puffofsmoke: {...cards.puffofsmoke},
    skipaway: {...cards.skipaway},
    laytrap: {...cards.laytrap},
    selfimmolate: {...cards.selfimmolate},
    spinaway: {...cards.spinaway},

    //2
    // ------------------------------------------  12
    cloakingfog: {...cards.cloakingfog},
    mentalblock: {...cards.mentalblock},
    infuse: {...cards.infuse},
    flamedome: {...cards.flamedome},

    //scale
    peacefulmind: {...cards.peacefulmind},
    throwsand: {...cards.throwsand},
    friendship: {...cards.friendship},
    invigorate: {...cards.invigorate},

    //energy effects
    shatteringshield: {...cards.shatteringshield},
    icyfreeze: {...cards.icyfreeze,},
    wallofichor: { ...cards.wallofichor},
    sabotage: {...cards.sabotage},
  }
  














let simpleCardPool = {
    //energy - 5
    fireenergy: {...cards.fireenergy},
    rarefireenergy: {...cards.rareFireEnergy},
    accelerate: {...cards.accelerate},
    energize: {...cards.energize},
    powerup: {...cards.powerup},

    //Permanent Upgrades
    hammerandtongs: {...cards.hammerandtongs},
    gainstrength: {...cards.gainstrength},

    
    sunlight: {...cards.sunlight},
    
    expand: {...cards.expand},

    expertsforge: {...cards.expertsforge},

    //strength
    ritual: {...cards.ritual},
    hypertrain: {...cards.hypertrain},

    //heal
    simpleheal: {...cards.simpleheal},
    enjoin: {...cards.enjoin},
    //draw - 3
    darkknowledge: {...cards.darkknowledge},
    recall: {...cards.recall},
    wellspring: {...cards.wellspring},
    //destroy energy - 2
    dampen: {...cards.dampen},
    ignite: {...cards.ignite},
    //heal
    vampiricstrike: {...cards.vampiricstrike},
    //return
    clawback: {...cards.clawback},
    //multi-card
    pirouettespin: {...cards.pirouettespin},
    retreatingslash: {...cards.retreatingslash},
    //scale - 5
    kindle: {...cards.kindle},
    honeclaws: {...cards.honeclaws},
    clarity: {...cards.clarity},
    // generosity: {...cards.generosity},
    //strength-scalers -3 
    explode: {...cards.explode},
    fireball: {...cards.fireball},
    //energy effects - 3
    fierymissiles: {...cards.fierymissiles},
    flamewhip: {...cards.flamewhip},

    // ------------------------------------------  8
    //2+ energy 
    disablingblow: {...cards.disablingblow},
    chargedblast: {...cards.chargedblast},
    //gift energy
    energyburst: {...cards.energyburst},
    //multi-hit
    sparkbarrage: {...cards.sparkbarrage},
    //3+ energy
    //multi-enemy
    bloatedbomb: {...cards.bloatedbomb},
    bowlthrough: {...cards.bowlthrough},
    annihilation: {...cards.annihilation},
    //destroy energy
    decimate: {...cards.decimate},
  
  
//BLOCK - 21
// -------------------------------------------------------------  21
    //1
    // ------------------------------------------  14
    reformingshield: {...cards.reformingshield},
    unwaveringdefense: {...cards.unwaveringdefense},
    // divinefavor: {...cards.divinefavor},

    flamingcloak: {...cards.flamingcloak},
    fortify: {...cards.fortify},
    //energy effects 
    sanguineshield: {...cards.sanguineshield},
    essencedrain: {...cards.essencedrain},
    //upgrade
    forgeshield: {...cards.forgeshield},
    bide: {...cards.bide},
    //scale
    coatofarms: {...cards.coatofarms},
    invigorate: {...cards.invigorate},
    //draw
    meditate: {...cards.meditate},
    //multi cards - 2
    puffofsmoke: {...cards.puffofsmoke},
    skipaway: {...cards.skipaway},
  
    //2+ energy
    // ------------------------------------------  7
    mentalblock: {...cards.mentalblock},
    infuse: {...cards.infuse},
    flamedome: {...cards.flamedome},
    friendship: {...cards.friendship},
    //energy effects
    shatteringshield: {...cards.shatteringshield},
    icyfreeze: {...cards.icyfreeze,},
    wallofichor: { ...cards.wallofichor},
}
