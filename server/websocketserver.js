const { WebSocketServer, OPEN } = require('ws');

module.exports = function(server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', function connection(ws, req) {
    ws.isAlive = true;
    ws.on('pong', function() {
      ws.isAlive = true
    });

    ws.on('message', function message(data) {
      console.log('received: %s', data);
      sendEveryone(makeMessage(req.socket.remoteAddress, data));
    });

    sendEveryone(makeMessage('SERVER', 'Welcome ' + req.socket.remoteAddress))
    ws.on('close', function wsclose() {
      sendEveryone(makeMessage('SERVER', 'Bye ' + req.socket.remoteAddress))
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

  function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
    });
  }
  const interval = setInterval(ping, 30000);
  wss.on('close', function close() {
    clearInterval(interval);
  });
}
