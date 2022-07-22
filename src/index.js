const Stage = require('stage-js/platform/web');
const Game = require('./game')
const Textures = require('./textures')

// Create new app
Stage(function(stage) {

  const game = new Game();
  const ws = window.ws
  ws.ongamemessage = function(data) {
    const state = JSON.parse(data.data);
    if(state.player) {
      me = state.player;
      document.querySelector('#playing').innerText = `Player ${me.toUpperCase()}`;
    } else {
      game.state = state;
      document.querySelectorAll('.title h1').forEach(c => c.innerText = game.state.outcome)
      redraw();
    }
  }

  // Set view box
  stage.viewbox(1024,768);


  function redraw() {
    stage.empty()
    Stage.image('background').appendTo(stage).pin({
      height: stage.height(),
      width: stage.width()
    })
    // The hands
    const leHands = [
      ['0','1','2','3'],
      ['1','2','3','0'],
      ['2','3','0','1'],
      ['3','0','1','2'],
    ][me]
    for(let hand in game.state.hands) {
      const handsprite = Stage.create().appendTo(stage);
      const numCards = game.state.hands[hand].length
      for(let i in game.state.hands[hand]) {
        let card = game.state.hands[hand][i]
        let sprite = Stage.image(card.color + card.number).appendTo(handsprite);
        if(card.number === 13){
          sprite.image('wild')
        }
        if(card.number === 14){
          sprite.image('plus4')
        }
        sprite.pin('alignY', 1)
        sprite.offset(50*(i-Math.floor(numCards/2)), 0)
        sprite.on("click", function(point){
          if(point.x < 50 || 1*i === (numCards - 1)) {
            if(card.number >= 13) {
              const wildPicker = Stage.create().appendTo(stage);
              for(let color in Game.COLORS) {
                Stage.image(Game.COLORS[color] + card.number)
                  .appendTo(wildPicker)
                  .offset(50*(color-2), 0)
                  .on('click', function() {
                    ws.send(JSON.stringify({
                      play: {
                        color: Game.COLORS[color],
                        number: card.number
                      }
                    }))
                  })
              }
              wildPicker.pin('align', 0.5)
            } else {
              ws.send(JSON.stringify({
                play: card
              }))
            }
          }
        })
      }
      let pin = {}

      if(hand == leHands[0]){
        pin.alignX = 0.45
        pin.alignY = 0.95
      } else if(hand === leHands[1]){
        pin.alignX = 0.05
        pin.alignY = 0.4
        pin.rotation = Math.PI/2
      } else if(hand === leHands[2]){
        pin.alignX = 0.55
        pin.alignY = 0.05
        pin.rotation = Math.PI
     } else {
        pin.alignX = 0.95
        pin.alignY = 0.55
        pin.rotation = -Math.PI/2
      }
      handsprite.pin(pin)

    }

    // Adding Discard Pile
    let topcard = game.state.topcard
    let discard = Stage.image(topcard.color + topcard.number).appendTo(stage);
       discard.pin({
       alignX: 0.5,
       alignY: 0.5
    })
   
    // Adding Draw Pile
    let drawpile = Stage.image('cardback').appendTo(stage);
    drawpile.pin({
      alignX: 0.7,
      alignY: 0.5
    })
    drawpile.on("click", function(){
      ws.send(JSON.stringify({
        draw: true
      }))
    })

    if(game.state.outcome !== 'In Progress') {
      Stage.string('winner').value(game.state.outcome).appendTo(stage).pin({
        'alignX': 0.5,
        'alignY': 0.35
      })
    }
  }
});

// Adding a texture
Stage(Textures)

// Background
Stage({
  image : 'uno_background.jpg',
  textures : {
    background: {x: 0, y:0, width: 1920, height: 1200}
  } 
})


