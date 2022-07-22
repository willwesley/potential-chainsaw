const Stage = require('stage-js/platform/web');
const Game = require('./game')
require('./textures')

Stage(function(stage) {

  let game = new Game()
  let me;
  const ws = window.ws
  ws.ongamemessage = function(data) {
    const state = JSON.parse(data.data);
    if(state.player) {
      me = state.player;
      console.log(me)
      document.querySelector('#playing').innerText = `Player ${me.toUpperCase()}`;
    } else {
      game.state = state;
      document.querySelectorAll('.title h1').forEach(c => c.innerText = game.state.outcome)
      update();
    }
  }

  stage.viewbox(200, 200);


  const background = Stage.image('background').appendTo(stage);
  const jotaro = Stage.image('jotaro').appendTo(stage);
  const dio = Stage.image('dio').appendTo(stage);
  const ult = Stage.image('ult').appendTo(stage);
  const lightAttack = Stage.image('lightAttack').appendTo(stage);
  const heavyAttack = Stage.image('heavyAttack').appendTo(stage);
  const shield = Stage.image('shield').appendTo(stage);
  const heal = Stage.image('heal').appendTo(stage);
  const staminaBar = Stage.image('staminaBar').appendTo(stage);
  const healthBar = Stage.image('healthBar').appendTo(stage);
  const ultBar = Stage.image('ultBar').appendTo(stage);
  const ultB = Stage.image('ultB').appendTo(stage);
  const bucket = Stage.create().appendTo(stage).pin('align', 0.5)

  ult.pin({
    'scale' : 1.2,
    'alignX' : 0.5585,
    'alignY' : 0.92
  }).on(Stage.Mouse.CLICK, function() {
    if(game.state[me].ultBar === 100) {
      ws.send(JSON.stringify({action: 'ult'}))

      this.tween().ease('bounce').pin ({
        scale : 1.2
      })

      jotaro.image('jotaroWhite').pin({
        alignX: 0,
        alignY: 0.8,
        scale:1.5

      })
      setTimeout(function() {
        jotaro.image('starPlatinum').pin({
          alignX: 0.1,
          alignY:0.9,
          scale:1.5
        })
        Stage.anim('shake', fps = 15).appendTo(jotaro).pin({
          alignX: 0.4,
          alignY: -0.4,
          scale: 0.8
        }).play()
      }, 100)
    }
  }).on(Stage.Mouse.START, function(){
    if(game.state[me].ultBar === 100) {
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
    ws.send(JSON.stringify({action: 'lightAttack'}))
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

  heavyAttack.pin({
    'scale' : 0.75,
    'alignX' : 0.347,
    'alignY' : 0.89
  }).on(Stage.Mouse.CLICK, function() {
    ws.send(JSON.stringify({action: 'heavyAttack'}))
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
    ws.send(JSON.stringify({action: 'shield'}))
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
    ws.send(JSON.stringify({action: 'heal'}))
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

  dio.pin({
    'scale' : 0.8,
    'alignX' : 0.87,
    'alignY' : 0.6
  });

  jotaro.pin({
    'scale' : 1.5,
    'alignX' : 0.15,
    'alignY' : 0.895
  });











  const healthScore = Stage.string('numbers').appendTo(healthBar).pin({
    'scale': 0.25,
    'alignX': .95,
    'alignY': .5
  })

  function update() {
    bucket.empty()
    jotaro.empty().image('jotaro')
    dio.empty().image('dio')

    healthScore.value(game.state[me].health);
    healthScore

    ultBar.empty()
    const ultScore = Stage.string('numbers').value(game.state[me].ultBar).appendTo(ultBar)
    ultScore.pin({
      'scale': 0.25,
      'alignX': .95,
      'alignY': .5
    })
    staminaBar.empty()
    const staminaScore = Stage.string('numbers').value(game.state[me].stamina).appendTo(staminaBar)
    staminaScore.pin({
      'scale': 0.25,
      'alignX': .95,
      'alignY': .5
    })

    if(game.state.outcome != 'in progress') {
      Stage.image(game.state.outcome).appendTo(bucket).pin({
        align:0.5,
        scale:0.4
      })
    }
  }
});














