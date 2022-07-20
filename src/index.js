const Stage = require('stage-js/platform/web');
const Game = require('./checkers')

// Create new app
Stage(function(stage) {

  // Set view box
  stage.viewbox(1350, 1350);

  const game = new Game()

  // Create an image and append it to stage
  const board = Stage.image("board").appendTo(stage);
  board.pin('align', 0.5)

  //let piece = Stage.image('R').appendTo(stage).pin('align', 0.4)
  //let piece = Stage.image('B').appendTo(stage).pin('align', 0.6)
  // for(let x in game.state.board) {
  //   for(let y in game.state.board[x]) {
  //     console.log(game.state.board[x][y])
  // let piece = Stage.image(game.state.board[x][y]).appendTo(stage)
  //   }
  // }

/* 90 pixel border
150x150 places
*/

});


// Adding a texture
Stage({
  image : 'board.jfif',
  textures : {
    board : { x : 0, y : 0, width : 1350, height : 1350}
  }
});
Stage({
  image : 'red.png',
  textures : {
    R : { x : 0, y : 0, width : 65, height : 50 }
  }
});

Stage({
  image : 'black.png',
  textures : {
    B : { x : 0, y : 129, width : 65, height : 65 },
    '' : { x : 0, y : 0, width : 1, height : 1 }
  }
});