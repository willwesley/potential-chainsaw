const Stage = require('stage-js/platform/web');
const Game = require('./game')

// Create new app
Stage(function(stage) {

  const game = new Game()
  // Set view box
  stage.viewbox(200, 200);

  const bucket = Stage.create().appendTo(stage).pin('align', 0.5)

  const background = Stage.image('background').appendTo(stage);
  const jotaro = Stage.image('jotaro').appendTo(stage);
  const dio = Stage.image('dio').appendTo(stage);
  const ult = Stage.image('ult').appendTo(stage);
  const lightAttack = Stage.image('lightAttack').appendTo(stage);
  const heavyAttack = Stage.image('heavyAttack').appendTo(stage);
  const shield = Stage.image('shield').appendTo(stage);
  const heal = Stage.image('heal').appendTo(stage);
  // const starPlatinum = Stage.image('starPlatinum').appendTo(stage);
  //const theWorld = Stage.image('theWorld').appendTo(stage);
  const staminaBar = Stage.image('staminaBar').appendTo(stage);
  const healthBar = Stage.image('healthBar').appendTo(stage);
  const ultBar = Stage.image('ultBar').appendTo(stage);
  //const menacing1 = Stage.image('menacing1').appendTo(stage);
 // const menacing2 = Stage.image('menacing2').appendTo(stage);
  const ultB = Stage.image('ultB').appendTo(stage);
  const lightAttackB = Stage.image('lightAttackB').appendTo(stage);
  const heavyAttackB = Stage.image('heavyAttackB').appendTo(stage);
  const shieldB = Stage.image('shieldB').appendTo(stage);
  const healB = Stage.image('healB').appendTo(stage);
  const staminaBarB = Stage.image('staminaBarB').appendTo(stage);
  const healthBarB = Stage.image('healthBarB').appendTo(stage);
  const ultBarB = Stage.image('ultBarB').appendTo(stage);




  ult.pin({
    'scale' : 1.2,
    'alignX' : 0.5585,
    'alignY' : 0.92
  }).on(Stage.Mouse.CLICK, function() {
    if(game.state.PlayerA.ultBar === 100) {
      game.action('A', 'ult')
      this.tween().ease('bounce').pin ({
        scale : 1.2
      })

      jotaro.image('jotaroWhite').pin({
        alignX: 0.92,
        alignY: 0.6,
        scale:0.7

      })
      setTimeout(function() {
        jotaro.image('starPlatinum').pin({
          alignX: 0.09
        })
        Stage.anim('shake', fps = 15).appendTo(jotaro).pin({
          alignX: 0.4,
          alignY: -0.4,
          scale: 0.7
        }).play()
      }, 1000)
    }

  }).on(Stage.Mouse.START, function(){
    if(game.state.PlayerA.ultBar === 100) {
      this.tween().ease('bounce').pin ({
        scale : 1
      })
    }
  });
  lightAttack.pin({
    'scale' : 0.75,
    'alignX' : 0.45,
    'alignY' : 0.894
  }).on(Stage.Mouse.CLICK, function() {
    game.action('A', 'lightAttack')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
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
  staminaBarB.pin({
    'scale' : 0.62,
    'alignX' : 0.75,
    'alignY' : 0.04
  });
  healthBarB.pin({
    'scale' : 0.64,
    'alignX' : 0.36,
    'alignY' : 0.04
  });
  ultBarB.pin({
    'scale' : 0.7,
    'alignX' : 0.558,
    'alignY' : 0.04
  });
  heavyAttack.pin({
    'scale' : 0.75,
    'alignX' : 0.347,
    'alignY' : 0.89
  }).on(Stage.Mouse.CLICK, function() {
    game.action('A', 'heavyAttack')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });
  shield.pin({
    'scale' : 0.75,
    'alignX' : 0.66,
    'alignY' : 0.897
  }).on(Stage.Mouse.CLICK, function() {
    game.action('A', 'shield')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });
  heal.pin({
    'scale' : 0.73,
    'alignX' : 0.75,
    'alignY' : 0.89
  }).on(Stage.Mouse.CLICK, function() {
    game.action('A', 'heal')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });
  background.pin({
    'scale' : 0.8,
    'alignX' : 1,
    'alignY' : 1
  });
  // menacing1.pin({
  //   'scale' : 1,
  //   'alignX' : 0.1,
  //   'alignY' : 0.45
  // });;
  // menacing2.pin({
  //   'scale' : 0.8,
  //   'alignX' : 0.92,
  //   'alignY' : 0.45
  // });;


  dio.pin({
    'scale' : 0.8,
    'alignX' : 0.87,
    'alignY' : 0.6
  });
  // theWorld.pin({
  //   'scale' : 0.8,
  //   'alignX' : 0.86,
  //   'alignY' : 0.58,
  // });

  jotaro.pin({
    'scale' : 1.5,
    'alignX' : 0.15,
    'alignY' : 0.895
  });
  // starPlatinum.pin({
  //   'scale' : 1.5,
  //   'alignX' : 0.09,
  //   'alignY' : 0.85
  // });

  ultB.pin({
    'scale' : 1.2,
    'alignX' : 0.5585,
    'alignY' : 0.1
  }).on(Stage.Mouse.CLICK, function() {
    if(game.state.PlayerB.ultBar === 100) {
      game.action('B', 'ult')
      this.tween().ease('bounce').pin ({
        scale : 1.2
      })

      dio.image('dioWhite').pin({
        alignX: 0.92,
        alignY: 0.6,
        scale:0.7

      })
      setTimeout(function() {
        dio.image('theWorld').pin({
          alignX: 0.86
        })
        Stage.anim('shake', fps = 15).appendTo(dio).pin({
          alignX: 0.4,
          alignY: -0.9,
          scale: 0.8
        }).play()
      }, 100)
    }
  }).on(Stage.Mouse.START, function(){
    if(game.state.PlayerB.ultBar === 100) {
      this.tween().ease('bounce').pin ({
        scale : 1
      })
    }

  });
  lightAttackB.pin({
    'scale' : 0.75,
    'alignX' : 0.45,
    'alignY' : 0.1
  }).on(Stage.Mouse.CLICK, function() {
    game.action('B', 'lightAttack')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });
  heavyAttackB.pin({
    'scale' : 0.75,
    'alignX' : 0.347,
    'alignY' : 0.1
  }).on(Stage.Mouse.CLICK, function() {
    game.action('B', 'heavyAttack')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });
  shieldB.pin({
    'scale' : 0.75,
    'alignX' : 0.66,
    'alignY' : 0.1
  }).on(Stage.Mouse.CLICK, function() {
    game.action('B', 'shield')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });
  healB.pin({
    'scale' : 0.73,
    'alignX' : 0.75,
    'alignY' : 0.1
  }).on(Stage.Mouse.CLICK, function() {
    game.action('B', 'heal')
    this.tween().ease('bounce').pin ({
      scale : 0.75
    })
  }).on(Stage.Mouse.START, function(){
    this.tween().ease('bounce').pin ({
      scale : 0.70
    })
  });


















 function update() {
  bucket.empty()
  healthBar.empty()
  jotaro.empty().image('jotaro')
  dio.empty().image('dio')

  const healthScore = Stage.string('numbers').value(game.state.PlayerA.health).appendTo(healthBar)
  healthScore.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })
  ultBar.empty()
  const ultScore = Stage.string('numbers').value(game.state.PlayerA.ultBar).appendTo(ultBar)
  ultScore.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })
  staminaBar.empty()
  const staminaScore = Stage.string('numbers').value(game.state.PlayerA.stamina).appendTo(staminaBar)
  staminaScore.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })
  healthBarB.empty()
  const healthScoreB = Stage.string('numbers').value(game.state.PlayerB.health).appendTo(healthBarB)
  healthScoreB.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })
  ultBarB.empty()
  const ultScoreB = Stage.string('numbers').value(game.state.PlayerB.ultBar).appendTo(ultBarB)
  ultScoreB.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })
  staminaBarB.empty()
  const staminaScoreB = Stage.string('numbers').value(game.state.PlayerB.stamina).appendTo(staminaBarB)
  staminaScoreB.pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })

  // if(game.state.outcome != 'in progress') {
  //   // Stage.image(game.state.outcome).appendTo(bucket).pin()
  // }
 }
  update()
  game.onTurnEnd = function() {
    console.log('OlO')
    update()
  }

});











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
    dioWhite : { x : 0, y : 0, width : 100, height : 89},
  }
})





