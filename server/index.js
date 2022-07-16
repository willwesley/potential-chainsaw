const static = require('node-static');
const http = require('http');
const { WebSocketServer } = require('ws');
const HeartBeat = require('./heartbeat');
const chatserver = require('./chatserver');

const file = new(static.Server)(__dirname + '/../static');

const server = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(process.env.PORT || 8080);

const wss = new WebSocketServer({ server })
chatserver(wss, HeartBeat);
