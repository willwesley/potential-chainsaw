const { WebSocketServer, OPEN } = require('ws');

module.exports = function(server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', function connection(ws, req) {
    ws.on('message', function message(data) {
      console.log('received: %s', data);
      wss.clients.forEach(function(client) {
        if (client.readyState === OPEN) {
          client.send('(' + req.socket.remoteAddress + '): ' + data, { binary: false });
        }
      })
    });

    ws.send('Hello ' + req.socket.remoteAddress);
  });
}
