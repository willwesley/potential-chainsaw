const { OPEN } = require('ws');
const Game = require('../src/game');

module.exports = function ChatServer(wss, HeartBeat) {
  const registerHeartbeat = HeartBeat(wss);

  let game;
  let players = ['',false,false];
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
          ws.player = [' ', 'PlayerA', 'PlayerB'][cmd.claim]
          ws.send(...makeMessage('GAME', '{"player":"'+ws.player+'"}'))
          sendPlayerStates()
          if(!!players[1] && !!players[2]) {
            game = new Game();
            game.onTurnEnd = function() {
              sendEveryone(makeMessage('GAME', JSON.stringify({
                ...game.state,
                turnEnd: true,
              })))
            }
            sendEveryone(makeMessage('GAME', JSON.stringify({
              ...game.state,
              turnEnd: true,
              lastActions: { A: '', B: '' }
            })))
          }
          if(game) {
            ws.send(...makeMessage('GAME', JSON.stringify(game.state)));
          }
        } else if(game && game.state.outcome != 'In Progress' && cmd.reset) {
          players = []
          sendEveryone(makeMessage('RESET', ''))
          sendPlayerStates()
        } else if(cmd.quit) {
          chump(ws)
        } else if(game) {
          game.action(ws.player.slice(-1), cmd.action)
          sendEveryone(makeMessage('GAME', JSON.stringify(game.state)))
        }
      } catch (e) {
        // chat message hopefully
      }
    });

    ws.on('close', function wsclose() {
      chump(ws)
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
      players: [ '', !!players[1], !!players[2] ]
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
}
