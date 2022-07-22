const Stage = require('stage-js/platform/web');

Stage({
  image : 'example.png',
  textures : {
    numbers:{
      '0' : { x : 1,  y : 79, width : 22, height : 31 },
      '1' : { x : 32, y : 79, width : 26, height : 34 },
      '2' : { x : 63, y : 81, width : 25, height : 29 },
      '3' : { x : 95, y : 80, width : 23, height : 31 },
      '4' : { x : 130, y : 80, width : 20, height : 33 },
      '5' : { x : 161, y : 79, width : 23, height : 31 },
      '6' : { x : 194, y : 80, width : 20, height : 33 },
      '7' : { x : 224, y : 78, width : 21, height : 32 },
      '8' : { x : 257, y : 80, width : 21, height : 31 },
      '9' : { x : 289, y : 80, width : 21, height : 31 },
    }
  }
});

Stage({
  image : 'dio.png',
  textures : {
    dio : { x : 0, y : 0, width : 35, height : 66},
    theWorld : { x : 51, y : 18, width : 49, height : 69},
  }
});

Stage({
  image : 'jotaro.png',
  textures : {
    starPlatinum : { x : 0, y : 8, width : 60, height : 75},
    jotaro : { x : 60, y : 8, width : 40, height : 73},
  }
});

Stage({
  image : 'buttons.png',
  textures : {
    heavyAttack : { x : 4, y : 1, width : 31, height : 28},
    lightAttack : { x : 35, y : 0.5, width : 31, height : 29},
    shield : { x : 53, y : 28.5, width : 33, height : 31},
    heal : { x : 66, y : 0, width : 29, height : 29},
    ult : { x : 20, y : 30, width : 30, height : 28},
    staminaBar : { x : 1, y : 58, width : 98, height : 16},
    healthBar : { x : 1, y : 73, width : 99, height : 14},
    ultBar : { x : 1, y : 86, width : 98, height : 13},
    staminaBarB : { x : 1, y : 58, width : 98, height : 16},
    healthBarB : { x : 1, y : 73, width : 99, height : 14},
    ultBarB : { x : 1, y : 86, width : 98, height : 13},
    heavyAttackB : { x : 4, y : 1, width : 31, height : 28},
    lightAttackB : { x : 35, y : 0.5, width : 31, height : 29},
    shieldB : { x : 53, y : 28.5, width : 33, height : 31},
    healB : { x : 66, y : 0, width : 29, height : 29},
    ultB : { x : 20, y : 30, width : 30, height : 28},

  }
});
Stage({
  image : 'background.png',
  textures : {
    background : { x : 0, y : 0, width : 499, height : 350 },
  }
});
Stage({
  image : 'ora.png',
  textures : {
    menacing1 : { x : 0, y : 0, width : 99, height : 72},
    menacing2 : { x : 0, y : 0, width : 99, height : 72},
    shake : [
      { x : 0, y : 0, width : 99, height : 62},
      { x : 0,  y : 3, width : 99, height : 72 }
    ]
  }
});

Stage({
  image: 'diowhiteout.png',
  textures : {
    dioWhite : { x : 0, y : 0, width : 100, height : 91},
  }
})
Stage({
  image: 'jotarowhiteout.png',
  textures : {
    jotaroWhite : { x : 0, y : 0, width : 100, height : 89},
  }
})
Stage({
  image: 'jotarowins.png',
  textures : {
    'PlayerA won' : { x : 17, y : 133, width : 662, height : 192},
  }
})
Stage({
  image: 'diowins.png',
  textures : {
    'PlayerB won' : { x : 33, y : 95, width : 645, height : 274},
  }
})
