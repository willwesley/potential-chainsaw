const { WebSocketServer, OPEN } = require('ws');
const HeartBeat = require('./heartbeat');
const Game = require('../src/game');

module.exports = function(server) {
  const wss = new WebSocketServer({ server })
  const registerHeartbeat = HeartBeat(wss);

  let player1, player2, game;
  wss.on('connection', function connection(ws) {
    registerHeartbeat(ws);

    if(!player1) {
      player1 = ws;
      ws.name = 'Player 1'
      ws.player = 'x'
      ws.send(...makeMessage('GAME', '{"player":"x"}'))
    } else if(!player2) {
      player2 = ws;
      ws.name = 'Player 2'
      ws.player = 'o'
      ws.send(...makeMessage('GAME', '{"player":"o"}'))
      game = new Game();
    } else {
      ws.name = 'Observer'
    }

    ws.on('message', function message(data) {
      sendEveryone(makeMessage(ws.name, data));

      try {
        const cmd = JSON.parse(data);
        if(game && game.state.outcome != 'In Progress' && cmd.reset) {
          game = new Game();
          player1.player = 'o'
          player1.send(...makeMessage('GAME', '{"player":"o"}'))
          player2.player = 'x'
          player2.send(...makeMessage('GAME', '{"player":"x"}'))
        } else if(game && game.state.activePlayer == ws.player) {
          game.place(cmd.place.x, cmd.place.y);
          sendEveryone(makeMessage('GAME', JSON.stringify(game.state)))
        } else {
          ws.send(...makeMessage('SERVER', 'Wait for the other player'))
        }
      } catch (e) {
        console.error(e)
        console.log('ignoring bad message: ' + data)
      }
    });

    sendEveryone(makeMessage('SERVER', 'Welcome ' + ws.name))
    ws.on('close', function wsclose() {
      if(ws == player1) {
        player1 = undefined
      } else if(ws == player2) {
        player2 = undefined
      }

      sendEveryone(makeMessage('SERVER', 'Bye ' + ws.name))
    })
  });

  function makeMessage(who, data) {
    return [
      JSON.stringify({
        data: `${data}`,
        who: who
      }),
      { binary: false }
    ];
  }

  function sendEveryone(message) {
    wss.clients.forEach(function(client) {
      if (client.readyState === OPEN) {
        client.send(...message);
      }
    });
  }
}
