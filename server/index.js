const static = require('node-static');
const http = require('http');
const websocketserver = require('./websocketserver');

const file = new(static.Server)(__dirname + '/../static');

const server = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(process.env.PORT || 8080);

websocketserver(server);
