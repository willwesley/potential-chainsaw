const Stage = require('stage-js/platform/web');

const Textures = require('./textures');
Stage(Textures);

Stage(function(stage) {

  stage.viewbox(50,50).pin('handle', -0.5);
  Stage.image('bg').pin('handle', 0.5).appendTo(stage);

  // initial empty board
  const board = [];
  for(let x = 0; x < 3; x++) {
    board[x] = [];
    for(let y = 0; y < 3; y++) {
      board[x][y] = makeCell(x, y, function() {
        board[x][y].image('x');
      })
    }
  }

  function makeCell(x, y, onClick) {
    return Stage.image('-').appendTo(stage).pin({
      offsetX: (x - 1) * 10,
      offsetY: (y - 1) * 10,
      handle: 0.5
    }).on('click', onClick);
  }
});
