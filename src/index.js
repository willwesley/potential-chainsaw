const Stage = require('stage-js/platform/web');
const Game = require('./checkers')

// Create new app
Stage(function(stage) {
  // click ammends
  let from
  // Set view box
  stage.viewbox(1350, 1350);

  const game = new Game()

  // Create an image and append it to stage
  const board = Stage.image("board").appendTo(stage);
  board.pin('align', 0.5)


  function redraw() {
    board.empty()
    for(let y in game.state.board) {
      for(let x in game.state.board[y]) {
        let piece = Stage.image(game.state.board[x][y]).appendTo(board).scaleTo(100, 100, 'in')
        piece.pin({
          offsetY: 90 + (150*x),
          offsetX: 90 + (150*y)
        })
        piece.on(Stage.Mouse.CLICK, function(){
          if(!from){
            from = [1*x,1*y]
          } else {
            game.place(game.state.activePlayer,from,[1*x,1*y])
            from = false 
            redraw()
          }
        })
      }
    }
  }
  redraw()

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
    R : { x : 0, y : 0, width : 600, height : 600 }
  }
});

Stage({
  image : 'black.png',
  textures : {
    B : { x : 0, y : 0, width : 600, height : 600 },
    ' ' : { x : 0, y : 0, width : 1, height : 1 }
  }
});