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
    // The hand
    const hand = Stage.create().appendTo(stage);
    const numCards = game.state.hands[0].length
    for(let i in game.state.hands[0]) {
      let card = game.state.hands[0][i]
      let sprite = Stage.image(card.color + card.number).appendTo(hand);
      sprite.pin('alignY', 1)
      sprite.offset(50*(i-Math.floor(numCards/2)), 0)
      sprite.on("click", function(){
        game.playCard(0,card)
        redraw()
      })
    }
    hand.pin({
      alignX: 0.5,
      alignY: 1
    })

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





