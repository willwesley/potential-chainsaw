const Stage = require('stage-js/platform/web');
const Game = require('./game')

module.exports = function(stage) {

  stage.viewbox(50,50).pin('handle', -0.5);
  Stage.image('bg').pin('handle', 0.5).appendTo(stage);

  let game = new Game();
  let me;
  const ws = window.ws
  ws.ongamemessage = function(data) {
    const state = JSON.parse(data.data);
    if(state.player) {
      me = state.player;
      document.querySelector('#playing').innerText = `Player ${me.toUpperCase()}`;
    } else {
      game.state = state;
      document.querySelectorAll('.title h1').forEach(c => c.innerText = game.state.outcome)
      drawBoard();
    }
  }

  // initial empty board
  const board = [];
  for(let i = 0; i < 9; i++) {
    board[i] = makeCell(x(i), y(i), clickCell(i))
  }

  function clickCell(i) {
    return function() {
      ws.send(JSON.stringify({place:{x:x(i), y: y(i)}}));
    }
  }

  function makeCell(x, y, onClick) {
    return Stage.image('-').appendTo(stage).pin({
      offsetX: (x - 1) * 10,
      offsetY: (y - 1) * 10,
      handle: 0.5
    }).on('click', onClick);
  }

  const funk = Stage.image('quit').appendTo(stage).pin({
    alignX: 0,
    alignY: 0.4,
    handle: 0.5,
    scale: 0.05
  });

  function drawBoard() {
    for(let i = 0; i < 9; i++) {
      board[i].image(game.state.board[y(i)][x(i)]).pin({ scale: 1 });
    }
    if(game.state.winner && game.state.winner.length) {
      game.state.winner.forEach(cell => board[I(...cell)].tween(200).pin({
        scale : 1.2,
      }))
    }
    if(game.state.winner && game.state.activePlayer == me) {
      document.querySelectorAll('.title h1').forEach(c => c.innerText = 'You Win!')
      funk.image('reset').on('click', resetBoard);
    } else {
      funk.image('quit').on('click', quitBoard);
    }
  }

  function resetBoard() {
    ws.send(JSON.stringify({reset: true}));
    me = false
  }

  function quitBoard() {
    if(!!me) {
      ws.send(JSON.stringify({ quit: true }))
    }
    if(ws.onquiter) {
      ws.onquiter()
    }
  }

  function x(i) {
    return i % 3;
  }

  function y(i) {
    return Math.floor(i/3);
  }
  function I(x, y) {
    return y*3 + x;
  }
}
