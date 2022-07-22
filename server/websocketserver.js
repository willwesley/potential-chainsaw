const { WebSocketServer, OPEN } = require('ws');
const HeartBeat = require('./heartbeat');
const Game = require('../src/game');

module.exports = function(server) {
  const wss = new WebSocketServer({ server })
  const registerHeartbeat = HeartBeat(wss);

  let game;
  let players = [];
  wss.on('connection', function connection(ws) {
    registerHeartbeat(ws);
    ws.name = 'Player ' + Math.ceil(Math.random() * 9999)
    console.log(ws.name)
    sendEveryone(makeMessage('SERVER', 'Welcome ' + ws.name))

    ws.on('message', function message(data) {
      sendEveryone(makeMessage(ws.name, data));

      try {
        const cmd = JSON.parse(data);
        if(cmd.claim && !players[cmd.claim]) {
          players[cmd.claim] = ws
          ws.player = [' ', 'x', 'o'][cmd.claim]
          ws.send(...makeMessage('GAME', '{"player":"'+ws.player+'"}'))
          if(game) {
            ws.send(...makeMessage('GAME', JSON.stringify(game.state)));
          }
          if(players[1] && players[2]) {
            game = new Game();
            sendEveryone(makeMessage('GAME', JSON.stringify(game.state)))
          }
        } else if(game && game.state.outcome != 'In Progress' && cmd.reset) {
          players = []
          sendEveryone(makeMessage('RESET', ''))
        } else if(cmd.quit) {
          chump(ws)
          sendEveryone(makeMessage('GAME', JSON.stringify(game.state)))
          game = new Game()
        } else if(game && game.state.activePlayer == ws.player) {
          game.place(cmd.place.x, cmd.place.y);
          sendEveryone(makeMessage('GAME', JSON.stringify(game.state)))
        }
      } catch (e) {
        // chat message hopefully
      }
    });

    ws.on('close', function() {
      chump(ws)
      sendEveryone(makeMessage('SERVER', 'Bye ' + ws.name))
    })

    function chump(ws) {
      game.state.winner = true
      if(ws == players[1]) {
        players[1] = undefined
        if(game) {
          game.state.outcome = 'O Wins'
          game.state.activePlayer = 'o'
        }
      } else if(ws == players[2]) {
        players[2] = undefined
        if(game) {
          game.state.outcome = 'X Wins'
          game.state.activePlayer = 'x'
        }
      }
    }
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
