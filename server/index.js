const static = require('node-static');
const http = require('http');

const file = new(static.Server)(__dirname + '/../static');

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(process.env.PORT || 8080);
