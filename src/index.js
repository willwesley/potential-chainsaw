const Stage = require('stage-js/platform/web');
const Game = require('./checkers')

// Create new app
Stage(function(stage) {

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
      redraw();
    }
  }

  // click ammends
  let from
  // Set view box
  stage.viewbox(1350, 1350);

  const game = new Game()

  // Create an image and append it to stage
  const board = Stage.image("board").appendTo(stage);
  board.pin('align', 0.5)

  const turn = Stage.image('blackturn').appendTo(stage).pin({
    // scaleToX:100,
    // scaleToY:100,
    // scaleMethod:'in',
    offsetY: 90,
    offsetX: 90
  })

  function redraw() {
    board.empty()
    if(game.state.activePlayer === 'R'){
      turn.image('redturn')
    } else {
      turn.image('blackturn')
    }    
    for(let y in game.state.board) {
      for(let x in game.state.board[y]) {
        let myX = x, myY = y;
        if(me === 'R') {
          myX = 7-x
          myY = 7-y
        }
        let piece = Stage.image(game.state.board[x][y]).appendTo(board).scaleTo(100, 100, 'in')

        piece.pin({
          offsetY: 90 + (150*myX),
          offsetX: 90 + (150*myY)
        })
        piece.on(Stage.Mouse.START, function(){
          from = [1*x,1*y]
          function Move(point){
            piece.offset(point.x - 35, point.y - 35)
          }
          function Stop(point) {
            const to = [
              Math.floor((point.y - 90)/150),
              Math.floor((point.x - 90)/150),
            ]
            if(me === 'R') {
              to[0] = 7 - to[0]
              to[1] = 7 - to[1]
            }
            console.log(from, to)
            ws.send(JSON.stringify({place: [from, to]}))
            board.off(Stage.Mouse.MOVE, Move)
            board.off(Stage.Mouse.END, Stop)
          }
          board.on(Stage.Mouse.MOVE, Move)
          board.on(Stage.Mouse.END, Stop)
        })
      }
    }
  }

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

Stage({
  image : 'BlackK.png',
  textures : {
    BK : { x : 0, y : 0, width : 200, height : 200 }
  }
});

Stage({
  image : 'RedK.png',
  textures : {
    RK : { x : 0, y : 0, width : 512, height : 512 }
  }
});

Stage({
  image : 'redturn.png',
  textures : {
    redturn : { x : 0, y : 0, width : 200, height : 200 }
  }
});

Stage({
  image : 'blackturn.png',
  textures : {
    blackturn : { x : 0, y : 0, width : 224, height : 224 }
  }
});
