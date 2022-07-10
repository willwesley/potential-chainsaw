const { WebSocketServer, OPEN } = require('ws');

module.exports = function(server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', function connection(ws, req) {
    ws.on('message', function message(data) {
      console.log('received: %s', data);
      sendEveryone(makeMessage(req.socket.remoteAddress, data));
    });

    ws.send(...makeMessage('SERVER', 'Hello ' + req.socket.remoteAddress));
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
    console.log(message)
        client.send(...message);
      }
    });
  }

}
