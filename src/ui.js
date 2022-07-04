const Stage = require('stage-js/platform/web');
const Game = require('./game')

module.exports = function(stage) {

  stage.viewbox(50,50).pin('handle', -0.5);
  Stage.image('bg').pin('handle', 0.5).appendTo(stage);

  let game = new Game();

  // initial empty board
  const board = [];
  for(let i = 0; i < 9; i++) {
    board[i] = makeCell(x(i), y(i), clickCell(i))
  }

  function clickCell(i) {
    return function() {
      game.place(x(i), y(i));
      drawBoard();
    }
  }

  function makeCell(x, y, onClick) {
    return Stage.image('-').appendTo(stage).pin({
      offsetX: (x - 1) * 10,
      offsetY: (y - 1) * 10,
      handle: 0.5
    }).on('click', onClick);
  }

  function drawBoard() {
    for(let i = 0; i < 9; i++) {
      board[i].image(game.state.board[y(i)][x(i)]);
    }
  }

  function resetBoard() {
    game = new Game();
    drawBoard();
  }
  Stage.image('reset').appendTo(stage).pin({
    alignX: 0,
    alignY: 0.4,
    handle: 0.5,
    scale: 0.05
  }).on('click', resetBoard);

  function x(i) {
    return i % 3;
  }

  function y(i) {
    return Math.floor(i/3);
  }

}
