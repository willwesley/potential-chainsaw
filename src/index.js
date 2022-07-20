const Stage = require('stage-js/platform/web');
const Game = require('./game')
const Textures = require('./textures')

// Create new app
Stage(function(stage) {

  const game = new Game();

  // Set view box
  stage.viewbox(500, 500);

  // The hand
  const hand = Stage.create().appendTo(stage);
  const numCards = game.state.hands[0].length
  for(let i in game.state.hands[0]) {
    let card = game.state.hands[0][i]
    let sprite = Stage.image(card.color + card.number).appendTo(hand);
    sprite.pin('alignY', 1)
    sprite.offset(50*(i-Math.floor(numCards/2)), 0)
  }
  hand.pin({
    alignX: 0.5,
    alignY: 1
  })
  //const box = Stage.image(card.color + card.number).appendTo(stage);

  // // Align box to center
  // box.pin('align', 0.5);

  // // On mouse click...
  // box.on('click', function(point) {
  //   // ...tween scale values of this node
  //   this.tween(1000).ease('bounce').pin({
  //     scaleX : Math.random() + 1.022,
  //     scaleY : Math.random() + 1.0675675676621435
  //   });
  // });
});
  
// Adding a texture
Stage(Textures)
