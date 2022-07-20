const Stage = require('stage-js/platform/web');
const Game = require('./game')

// Create new app
Stage(function(stage) {

  const game = new Game()
  // Set view box
  stage.viewbox(200, 200);

  const background = Stage.image('background').appendTo(stage);
  const jotaro = Stage.image('jotaro').appendTo(stage);
  const dio = Stage.image('dio').appendTo(stage);
  const ult = Stage.image('ult').appendTo(stage);
  const lightAttack = Stage.image('lightAttack').appendTo(stage);
  const heavyAttack = Stage.image('heavyAttack').appendTo(stage);
  const shield = Stage.image('shield').appendTo(stage);
  const heal = Stage.image('heal').appendTo(stage);
  const starPlatinum = Stage.image('starPlatinum').appendTo(stage);
  const theWorld = Stage.image('theWorld').appendTo(stage);
  const staminaBar = Stage.image('staminaBar').appendTo(stage);
  const healthBar = Stage.image('healthBar').appendTo(stage);
  const ultBar = Stage.image('ultBar').appendTo(stage);
  const ora = Stage.image('ora').appendTo(stage);
  const muda = Stage.image('muda').appendTo(stage);
 
  ult.pin({
    'scale' : 1.2,
    'alignX' : 0.5585,
    'alignY' : 0.92
  });
  lightAttack.pin({
    'scale' : 0.75,
    'alignX' : 0.45,
    'alignY' : 0.894
  });
  staminaBar.pin({
    'scale' : 0.62,
    'alignX' : 0.75,
    'alignY' : 0.98
  });
  healthBar.pin({
    'scale' : 0.64,
    'alignX' : 0.36,
    'alignY' : 0.98
  });
  ultBar.pin({
    'scale' : 0.7,
    'alignX' : 0.558,
    'alignY' : 0.98
  });
  heavyAttack.pin({
    'scale' : 0.75,
    'alignX' : 0.347,
    'alignY' : 0.89
  });
  shield.pin({
    'scale' : 0.75,
    'alignX' : 0.66,
    'alignY' : 0.897
  });
  heal.pin({
    'scale' : 0.73,
    'alignX' : 0.75,
    'alignY' : 0.89
  });
  background.pin({
    'scale' : 0.8,
    'alignX' : 1,
    'alignY' : 1
  });
  ora.pin({
    'scale' : 1,
    'alignX' : 0.1,
    'alignY' : 0.45
  });;
  muda.pin({
    'scale' : 0.8,
    'alignX' : 1,
    'alignY' : 1
  });;


  dio.pin({
    'scale' : 0.8,
    'alignX' : 0.87,
    'alignY' : 0.6
  });
  theWorld.pin({
    'scale' : 0.8,
    'alignX' : 0.86,
    'alignY' : 0.58
  });

  jotaro.pin({
    'scale' : 1.5,
    'alignX' : 0.15,
    'alignY' : 0.85
  });
  starPlatinum.pin({
    'scale' : 1.5,
    'alignX' : 0.09,
    'alignY' : 0.85
  });

  const healthScore = Stage.string('numbers').value(game.state.PlayerA.health).appendTo(healthBar)
  healthScore.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })
  const ultScore = Stage.string('numbers').value(game.state.PlayerA.ultBar).appendTo(ultBar)
  ultScore.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })

  const staminaScore = Stage.string('numbers').value(game.state.PlayerA.stamina).appendTo(staminaBar)
  staminaScore.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })

});

  

 // lightAttack.on('click', function(point) {
 //    this.action = function(player, action) {

 //    }
 // })












// Adding a texture
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

// Adding a texture
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
    ora : { x : 0, y : 0, width : 99, height : 72},
    muda : { x : 0, y : 0, width : 99, height : 72},
  }
});







