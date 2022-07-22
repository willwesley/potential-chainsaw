const { OPEN } = require('ws');
const Game = require('../src/game')

module.exports = function ChatServer(wss, HeartBeat) {
  const registerHeartbeat = HeartBeat(wss);

  let game, players = ['', false, false, false, false];
  wss.on('connection', function connection(ws) {
    registerHeartbeat(ws);
    ws.name = 'Player ' + Math.ceil(Math.random() * 9999)
    console.log(ws.name)
    sendEveryone(makeMessage('SERVER', 'Welcome ' + ws.name))
    ws.send(...makeMessage('SERVER', JSON.stringify({
      players: players.map(p => !!p)
    })))

    ws.on('message', function message(data) {
      sendEveryone(makeMessage(ws.name, data));

      try {
        const cmd = JSON.parse(data);
        if(cmd.claim && !players[cmd.claim]) {
          players[cmd.claim] = ws
          ws.player = [' ', 0, 1, 2, 3][cmd.claim]
          ws.send(...makeMessage('GAME', '{"player":"'+ws.player+'"}'))
          sendPlayerStates()
          if(game) {
            ws.send(...makeMessage('GAME', JSON.stringify(game.state)));
          }
          if(!!players[1] && !!players[2] && !!players[3] && !!players[4]) {
            game = new Game();
            sendEveryoneGameState(game.state)
          }
        } else if(game && game.state.outcome != 'In Progress' && cmd.reset) {
          players = []
          sendEveryone(makeMessage('RESET', ''))
          sendPlayerStates()
        } else if(cmd.quit) {
          chump(ws)
        } else if(game && game.state.activePlayer == ws.player) {
          console.log(cmd)
          if(cmd.play) {
            game.playCard(ws.player, cmd.play)
          } else {
            game.drawCard()
          }
          sendEveryoneGameState(game.state)
        }
      } catch (e) {
        // chat message hopefully
      }
    });

    ws.on('close', function wsclose() {
      sendEveryone(makeMessage('SERVER', 'Bye ' + ws.name))
    });

  });

  function chump(ws) {
    const playerIdx = players.findIndex(p => ws == p)
    players[playerIdx] = undefined
    sendPlayerStates()
  }

  function sendPlayerStates() {
    sendEveryone(makeMessage('SERVER', JSON.stringify({
      players: players.map(p => !!p)
    })))
  }

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

  function sendEveryoneGameState(state) {
    wss.clients.forEach(function(client) {
      if (client.readyState === OPEN) {
        client.send(...makeMessage('GAME', JSON.stringify({
          ...state,
          hands: state.hands.map((hand, i) => {
            if(i !== client.player) {
              return hand.map(_ => ({
                color: 'cardback', number: ''
              }))
            }
            return hand
          })
        })))
      }
    });
  }
}
