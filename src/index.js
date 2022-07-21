const Stage = require('stage-js/platform/web');
const Game = require('./game')
const Textures = require('./textures')

// Create new app
Stage(function(stage) {

  const game = new Game();

  // Set view box
  stage.viewbox(500, 500);


  function redraw() {
    stage.empty()
    Stage.image('background').appendTo(stage).pin({
      scale:1
    })
    // The hand
    for(let hand in game.state.hands) {
      const handsprite = Stage.create().appendTo(stage);
      const numCards = game.state.hands[hand].length
      for(let i in game.state.hands[hand]) {
        let card = game.state.hands[hand][i]
        let sprite = Stage.image(card.color + card.number).appendTo(handsprite);
        sprite.pin('alignY', 1)
        sprite.offset(50*(i-Math.floor(numCards/2)), 0)
        sprite.on("click", function(point){
          console.log(i, numCards - 1)
          if(point.x < 50 || 1*i === (numCards - 1)) {
            game.playCard(hand*1, card)
            redraw()
          }
        })
      }
      let pin = {}
      if(hand === '0'){
        pin.alignX = 0.45
        pin.alignY = 1.0
      } else if(hand === '1'){
        pin.alignX = 0
        pin.alignY = 0.4
        pin.rotation = Math.PI/2
      } else if(hand === '2'){
        pin.alignX = 0.55
        pin.alignY = 0
        pin.rotation = Math.PI
     } else {
        pin.alignX = 1.0
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
      game.drawCard()
      redraw()
    })
  }
  redraw()
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


