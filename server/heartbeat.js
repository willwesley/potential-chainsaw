module.exports = function HeartBeat(websocketServer) {
  function registerHeartbeat(ws) {
    ws.isAlive = true;
    ws.on('pong', function() {
      ws.isAlive = true
    });
  }
  function ping() {
    websocketServer.clients.forEach(function each(ws) {
      if (ws.isAlive === false) {
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping();
    });
  }
  const interval = setInterval(ping, 30000);
  websocketServer.on('close', function close() {
    clearInterval(interval);
  });
  return registerHeartbeat;
}
