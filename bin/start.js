var dotenv = require('dotenv');
dotenv.config({ path: './bin/.env' });

var debug = require('debug')('server:start');
var http = require('http');

var app = require('../app');
var error = require('./error');

var socket = require('../socket');

var port = normalizePort(process.env.PORT || 3000);

app.set('port', port);
var server = http.createServer(app);

var io = require('socket.io')(server);
io.on('connection', socket(io));

server.listen(port, '0.0.0.0'); // The 0s are for web hosting
server.on('error', error(port)); // Error uses closure to generate listeners
server.on('listening', onListening);

/**
 * Turns port from int || string into its specific value,
 * if string, returns string,
 * if int returns int within range of server.
 * @param  {String|Number} val - what the server is listening on
 * @return {String|Number} pipe or port
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

/**
 * Runs on start of server.
 * Uses a debug message, to enable, do in env debug = 'server:start'
 * or append to whatever is there already
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ', bind);
}
